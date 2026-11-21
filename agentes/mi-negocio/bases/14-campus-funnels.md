# Campus por funnels: estrategia e implementación

Para el agente de Claude conectado al campus. Objetivo: que el panel de admin deje de ser «el panel del webinar» y pase a tener **funnels separados** (webinars, evergreen orgánico y los que vengan), con las **tareas**, el **contenido** y el **proceso de ventas** del evergreen adentro. Escrito el 20/11/2026 con el esquema real de la base (proyecto de Supabase `zanwrwysbmvgytfzymaz`, esquema `public`), leído ese día en solo lectura. No se cambió nada en el campus.

Contexto del negocio: `agentes/CONTEXTO.md` (oferta, avatar, voz) y `mi-negocio/bases/` (11 = avatar y comunicación; 12 = plan de acción evergreen; 13 = semana puente 21–28/11).

---

## 1. Cómo está hoy (lo que se leyó)

- **`launches`** (1 fila: `clase-17-11`, `is_current = true`, `cash_goal`, `sales_close_at`). Todo cuelga de acá.
- **`leads`** (404) + **`lead_launches`** (404, único por `lead_id, launch_id`): el estado del lead vive en `lead_launches`, con campos de webinar (`toco_grupo`, `class_confirmed_at`, `post_class_status`, `inversion_meta`, `califica`, `application`, `route`, cadencias de seguimiento).
- **`lead_events`** (2.086; tipos: optin, grupo, contacto, sdr, dial, aplicacion, agenda, asistencia, resultado, final, no_cuenta…), **`lead_pending_events`**, **`landing_visits`** y **`landing_visit_log`**, todos con `launch_id`.
- **`sales_calls`** (4; `lead_launch_id`, `program`, `result`, montos) → **`payments`** → **`clients`** (`program`: Genesis OS, Genesis Lite, Fast Subscription).
- **Ingesta:** Edge Function `ingest` (`/optin`, `/visita`, `/grupo`, `/aplicacion`) que llama a `ingest_optin`, `ingest_visita`, `ingest_grupo`, `ingest_aplicacion(p jsonb)`. La landing (`mi-negocio/landing/api/`) le pega con el header `X-Genesis-Secret`.
- **CRM:** ~30 funciones `crm_*`. Varias reciben `p_launch` (`crm_ads_metrics`, `crm_team_metrics`, `crm_launch_progress`, `crm_distribute`); el resto opera sobre un `lead_launch` o una llamada. `crm_create_lead` no recibe lanzamiento: hay que ver a cuál lo asigna.
- **Tareas:** `tasks` (67, id con forma `PREFIJO-NN`, `phase` → `task_phases.name`, estados Por hacer / En curso / En revisión / Hecha / Bloqueada, `version` para control de concurrencia), `task_phases` (9 fases del webinar: ADQ, NUT, WEB, POST, B52, BON, SIS, EQ, EXT), `task_people` (Mati, Santi, Manu, José), `task_comments`, `task_events`, y las funciones `task_create`, `task_update`, `task_delete`, `task_comment`. **No tienen ninguna noción de funnel ni de lanzamiento.**
- **Otros:** `vsl_players`/`vsl_daily` (vTurb), `landing_tests`, `meta_ads_cache`, `crm_resources`, `sops`.

Lo que no se leyó y el agente tiene que auditar antes de tocar: el código del frontend del campus, el cuerpo de la Edge Function `ingest` y de las funciones `crm_*`/`ingest_*`, y las políticas RLS.

---

## 2. Estrategia

**Un funnel es un contenedor permanente; un lanzamiento es un ciclo dentro de un funnel.** Hoy la base ya está partida por `launch_id` en todas las tablas que importan. Entonces no se reescribe nada: se agrega una capa arriba.

```
funnels (webinar · evergreen-organico · el próximo)
   └── launches (ciclos: clase-19-10, clase-17-11 … | evergreen: un ciclo abierto por trimestre)
          └── lead_launches, lead_events, landing_visits, sales_calls, tasks, contenido
```

Decisiones de diseño:

1. **Tabla `funnels` + `launches.funnel_id`.** El webinar del 17/11 pasa a ser un ciclo del funnel `webinar`. El evergreen es otro funnel, con un ciclo abierto (`evergreen-2026-q4`) y uno nuevo por trimestre `[HIP: o mensual; lo decide Santi]`, para poder comparar períodos sin mezclar.
2. **Nada se migra ni se borra.** Los 404 leads, sus eventos y las 67 tareas quedan en el funnel `webinar`. Solo se les pone la etiqueta.
3. **Un lead es una persona; puede estar en varios funnels.** Ya funciona así: `leads` es único y `lead_launches` es su paso por cada ciclo. Un registrado del webinar que después escribe CUENTA tiene dos filas en `lead_launches` y un solo historial.
4. **Lo específico de cada funnel se configura, no se hardcodea.** Etapas del pipeline, campos visibles y métricas del tablero salen de una configuración por funnel (`funnels.config jsonb`). Sumar un funnel = insertar una fila y su configuración, no tocar el código.
5. **«Actual» deja de ser global.** `launches.is_current` pasa a ser «el ciclo actual **de ese funnel**» (un actual por funnel).
6. **El panel tiene un selector de funnel arriba** (Todos · Webinars · Evergreen orgánico). Todas las vistas de leads, llamadas, métricas y tareas se filtran por ese selector. «Todos» muestra el consolidado de caja y ventas.
7. **Tres cosas nuevas para el evergreen**, que el webinar no tenía: el **registro de contenido** (cada pieza con su subavatar, dolor, palabra y métricas), el **reporte de ventas por fases** (SOP 04) y los **campos de calificación nuevos** (subavatar, palabra, video que lo trajo, capital, carril OS/Lite).
8. **Tareas con funnel.** `tasks` y `task_phases` ganan `funnel_id`. Las 67 actuales quedan en `webinar`; las 123 del plan evergreen entran en `evergreen-organico` (carga en `campus-tareas-evergreen.json`).

---

## 3. Infraestructura (modelo de datos)

SQL orientativo. El agente lo ajusta al estilo de las migraciones del campus, y toda tabla nueva lleva RLS con el mismo criterio que sus vecinas (`leads`, `tasks`).

### 3.1 Funnels y ciclos

```sql
create table funnels (
  id text primary key check (id ~ '^[a-z0-9-]+$'),
  name text not null,
  kind text not null check (kind in ('webinar','evergreen','otro')),
  active boolean not null default true,
  sort integer not null default 0,
  config jsonb not null default '{}',   -- etapas, campos y métricas del funnel (ver 3.6)
  created_at timestamptz not null default now()
);
insert into funnels (id,name,kind,sort) values
  ('webinar','Webinars','webinar',1),
  ('evergreen-organico','Evergreen orgánico','evergreen',2);

alter table launches add column funnel_id text references funnels(id) on update cascade;
update launches set funnel_id = 'webinar';
alter table launches alter column funnel_id set not null;
-- un "actual" por funnel
create unique index launches_current_per_funnel on launches(funnel_id) where is_current;

insert into launches (id,name,funnel_id,is_current) values
  ('evergreen-2026-q4','Evergreen orgánico · Q4 2026','evergreen-organico',true);
```

Si ya existe un índice o una regla que obliga a un solo `is_current` global, se reemplaza por el de arriba.

### 3.2 Leads del evergreen: campos nuevos en `lead_launches`

Todos opcionales, para no romper el webinar.

```sql
alter table lead_launches
  add column subavatar text check (subavatar in ('S1','S2','S3','sin_capital','afuera')),
  add column entry_keyword text,            -- CUENTA, PISO, CICLO, TRATAMIENTO, CPA…
  add column entry_content_id uuid,         -- la pieza que lo trajo (FK a content_pieces, 3.3)
  add column entry_channel text check (entry_channel in ('instagram_dm','instagram_comentario','whatsapp','youtube','tiktok','otro')),
  add column pain integer check (pain between 1 and 10),   -- dolor del mapa (bases/01 y 11)
  add column quote text,                    -- frase textual del lead
  add column sells_today boolean,           -- ¿vende hoy?
  add column sells_what text,
  add column repurchase_cycle text,         -- cada cuánto se termina el producto
  add column capital text,                  -- con cuánto capital cuenta
  add column wanted_when text,
  add column lane text check (lane in ('os','lite','sin_llamada'));  -- carril
```

- **Calificado en evergreen** = `sells_today = true` y capital para Genesis OS. No se usa `inversion_meta` ni `califica` del webinar para esto: el campo `califica` se sigue llenando, pero con esta regla cuando el ciclo es del funnel evergreen.
- **Etapas:** `lead_launches.stage` hoy es texto libre (valores: Nuevo, Próximo ciclo) y `post_class_status` tiene un CHECK de webinar. Para el evergreen se usa `stage` con las etapas de la configuración del funnel (3.6): `Palabra recibida → En conversación → Calificado → Aplicó → Llamada agendada → Cerró OS / Cerró Lite / No cerró / Nutrición / No califica`. `post_class_status` queda solo para el webinar.
- **`lead_events.kind`** suma tipos: `palabra` (escribió una palabra clave), `recurso` (se le mandó un video o recurso), `calificacion` (el setter completó la ficha), `reporte` (se cargó el reporte por fases).

### 3.3 Registro de contenido

```sql
create table content_weeks (
  id uuid primary key default gen_random_uuid(),
  funnel_id text not null references funnels(id),
  week_start date not null,                 -- lunes
  pain integer check (pain between 1 and 10),
  subavatar text,
  thread text not null default '',          -- el hilo: el dolor de la semana en una frase
  ask text not null default '',             -- el pedido de la semana y su palabra
  ritual_notes text not null default '',    -- lo que salió del ritual del sábado
  unique (funnel_id, week_start)
);

create table content_pieces (
  id uuid primary key default gen_random_uuid(),
  funnel_id text not null references funnels(id),
  launch_id text references launches(id) on update cascade,
  week_id uuid references content_weeks(id) on delete set null,
  publish_at timestamptz,
  format text not null check (format in ('youtube','flywheel','reel','trial_reel','historias','tiktok','short','mail','whatsapp','post','otro')),
  job text check (job in ('atraccion','nutricion','conversion','conexion')),
  title text not null,                      -- hook o título textual
  subavatar text check (subavatar in ('S1','S2','S3','raiz','seguidor')),
  pain integer check (pain between 1 and 10),
  angle text,                               -- A–I
  keyword text,                             -- palabra de ManyChat
  cta text,
  source_video text,                        -- de qué video largo sale el corte
  variant_of uuid references content_pieces(id) on delete set null,  -- trial reel: la pieza base
  variable text,                            -- qué variable cambia el trial
  status text not null default 'idea' check (status in ('idea','guion','grabado','editado','programado','publicado','descartado')),
  url text,
  responsible_name text not null default '',
  task_id text references tasks(id) on delete set null,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table content_metrics (
  id uuid primary key default gen_random_uuid(),
  piece_id uuid not null references content_pieces(id) on delete cascade,
  cut text not null check (cut in ('48h','7d','30d')),
  measured_at timestamptz not null default now(),
  views integer, reach integer, shares integer, saves integer, comments integer, likes integer,
  qualified_comments integer,               -- comentarios de S1/S2/S3
  new_followers integer, qualified_followers integer,
  story_drop_pct numeric,                   -- caída entre historias (historias)
  story_replies integer,                    -- respuestas (historias)
  avg_view_pct numeric,                     -- retención (YouTube)
  keyword_conversations integer,            -- conversaciones que abrió su palabra
  unique (piece_id, cut)
);

alter table lead_launches
  add constraint lead_launches_entry_content_fk
  foreign key (entry_content_id) references content_pieces(id) on delete set null;
```

Las conversaciones calificadas, las aplicaciones y la caja por pieza **no se cargan a mano**: salen de `lead_launches.entry_content_id` cruzado con `sales_calls` y `payments` (una vista `content_results`).

### 3.4 Reporte de ventas por fases (SOP 04)

```sql
create table sales_reports (
  id uuid primary key default gen_random_uuid(),
  lead_launch_id uuid not null references lead_launches(id) on delete cascade,
  sales_call_id uuid references sales_calls(id) on delete set null,
  author_id uuid references profiles(id) on delete set null,
  author_name text not null,
  -- Fase 1: antes de la llamada
  first_touch text, last_touch text,        -- primer y último contacto / pieza
  entry_quote text,                         -- cómo llegó, con sus palabras
  -- Fase 2: triage / setting
  pain integer check (pain between 1 and 10),
  pain_quote text,                          -- el dolor, textual
  beliefs text,                             -- creencias que trajo
  -- Fase 3: después de la llamada
  buy_reason text,                          -- por qué compró (textual)
  no_close_reason text,                     -- por qué no cerró (textual)
  objections text,
  lane text check (lane in ('os','lite','ninguno')),
  goes_to text not null default '',         -- a qué pieza va cada dato (obligatorio al cerrar)
  created_at timestamptz not null default now()
);
```

Regla de producto: una llamada no se puede marcar `realizada` sin su reporte.

### 3.5 Tareas por funnel

```sql
alter table task_phases add column funnel_id text references funnels(id) on update cascade;
update task_phases set funnel_id = 'webinar';
alter table task_phases alter column funnel_id set not null;

alter table tasks add column funnel_id text references funnels(id) on update cascade;
update tasks set funnel_id = 'webinar';
alter table tasks alter column funnel_id set not null;
alter table tasks add column launch_id text references launches(id) on update cascade on delete set null;
update tasks set launch_id = 'clase-17-11';
```

- `task_phases.name` es la clave y `prefix` es único: las fases del evergreen tienen nombres y prefijos propios (PTE, DEC, EV0, COR, EV1, EV2, ESC, PEN), así no chocan con las del webinar.
- `task_create` y `task_update` tienen que aceptar `funnel_id` (y `launch_id`); si no viene, toman el del funnel elegido en el panel.
- `task_people`: hoy son Mati, Santi, Manu y José. El plan tiene tareas del **setter**, el **closer** y el **editor**. `[PENDIENTE: Santi]` sumarlos como personas (con o sin usuario) o dejar esas tareas sin responsable.
- **Rituales** (martes 10:00, sábado 11:00, lectura a 48 h y 7 días): tareas recurrentes. Si el módulo no soporta recurrencia, agregar `recurrence text` (`semanal:mar`, `semanal:sab`) y un job que cree la tarea de la semana siguiente al cerrar la actual. `[HIP]` Primera versión: crearlas a mano por 8 semanas.

### 3.6 Configuración del funnel (`funnels.config`)

```json
{
  "stages": ["Palabra recibida","En conversación","Calificado","Aplicó","Llamada agendada","Cerró OS","Cerró Lite","No cerró","Nutrición","No califica"],
  "lead_fields": ["subavatar","entry_keyword","entry_content_id","pain","quote","sells_today","sells_what","repurchase_cycle","capital","wanted_when","lane"],
  "qualified_rule": "sells_today = true y capital para OS",
  "kpis": ["conversaciones_por_palabra","conversaciones_calificadas","aplicaciones","llamadas","cierres_os","cierres_lite","cash"],
  "programs": [{"id":"Genesis OS","price_usd":5000,"public":true},{"id":"Genesis Lite","price_usd":2000,"public":false}],
  "keywords": ["CUENTA","PISO","CICLO","TRATAMIENTO","CPA"]
}
```

El funnel `webinar` guarda en su `config` lo que hoy está hardcodeado (etapas de `post_class_status`, criterio `inversion_meta`), para que el panel lea todo del mismo lugar.

### 3.7 Ingesta

- La Edge Function `ingest` y las funciones `ingest_*` aceptan un campo opcional **`funnel`** (o `launch_id`) en el cuerpo. Sin ese campo, se comportan como hoy (ciclo actual del funnel `webinar`), para no romper la landing.
- Ruta nueva **`/palabra`** → `ingest_palabra(p jsonb)`: la llama ManyChat (o el setter desde el panel) cuando alguien escribe una palabra clave. Cuerpo: `nombre`, `instagram` o `telefono`, `keyword`, `canal`, `content_url` (opcional). Crea o encuentra el lead, crea su `lead_launches` en el ciclo actual del evergreen con `entry_keyword`, resuelve `entry_content_id` por palabra + fecha, y registra un `lead_events` de tipo `palabra`.
- `leads` hoy identifica por email y teléfono. Los que entran por Instagram no traen ninguno de los dos: agregar `leads.instagram text` y sumarlo a la deduplicación.
- `mi-negocio/landing/api/aplicacion.js` manda el funnel cuando la aplicación viene del evergreen (parámetro `?f=evergreen` o un UTM) `[HIP]`.

### 3.8 Vistas y métricas

- `funnel_overview(p_funnel, p_from, p_to)`: leads nuevos, calificados, aplicaciones, llamadas, cierres por programa, caja.
- `content_results`: por pieza, conversaciones, calificadas, aplicaciones, ventas y caja (desde `entry_content_id`).
- `subavatar_results(p_funnel, p_from, p_to)`: por subavatar, lo mismo. Es la validación del SOP 01 (una semana por subavatar: plata, interés y entrada).
- `keyword_results`: por palabra, conversaciones y calificadas por semana.
- `crm_team_metrics`, `crm_ads_metrics` y `crm_launch_progress` ya reciben `p_launch`: sumarles `p_funnel` (todos los ciclos de ese funnel).

---

## 4. El panel

| Módulo | Qué cambia |
|---|---|
| **Selector de funnel** (arriba, persistente) | Todos · Webinars · Evergreen orgánico. Dentro de un funnel, selector de ciclo. Se guarda la última elección por usuario |
| **Inicio** | Con «Todos»: caja y ventas consolidadas, una tarjeta por funnel. Con un funnel: sus KPIs (`funnels.config.kpis`) |
| **Leads / CRM** | Filtrado por funnel. Columnas, etapas y ficha según `config`. En evergreen la ficha muestra subavatar, palabra, video que lo trajo, dolor, frase textual y las 4 preguntas de calificación |
| **Llamadas** | Igual que hoy, más el carril (OS / Lite) y el reporte por fases obligatorio al cerrar |
| **Contenido** (nuevo, solo evergreen al principio) | Vista **Semana** (grilla lunes a domingo por formato, con el hilo y el pedido de la semana), vista **Lista** (filtros por formato, subavatar, dolor, estado) y ficha de pieza con métricas a 48 h y 7 días. Vista **Resultados**: por pieza, por palabra y por subavatar |
| **Reportes de ventas** (nuevo) | Lista de reportes, filtro por dolor, subavatar y motivo de no cierre. Es el insumo del ritual del sábado |
| **Tareas** | Filtradas por funnel; fases del funnel elegido; la vista «Mis tareas» muestra todos los funnels |
| **Métricas del webinar** (landing, VSL, tests, ads) | Quedan como están, visibles solo en el funnel Webinars |

---

## 5. Plan de implementación, paso a paso

Cada paso deja el campus funcionando. No avanzar al siguiente sin verificar el anterior. Trabajar en una rama y con una rama de base de datos de Supabase si está disponible; si no, probar cada migración antes en una copia.

**Paso 0 · Auditoría (sin cambios).** Leer el frontend, la Edge Function `ingest`, el cuerpo de `ingest_*`, `crm_create_lead`, `crm_distribute`, `crm_team_metrics`, `crm_ads_metrics`, `crm_launch_progress`, `task_*` y las políticas RLS. Listar cada lugar donde se usa `is_current` o un `launch_id` fijo. Entregable: lista de puntos a tocar. Si algo de este documento no coincide con el código, manda el código y se avisa a Santi.

**Paso 1 · Funnels y ciclos (3.1).** Crear `funnels`, `launches.funnel_id`, el índice de un actual por funnel y el ciclo `evergreen-2026-q4`. Verificar: el panel sigue mostrando el webinar igual que antes; `select funnel_id, count(*) from launches group by 1` da 1 y 1.

**Paso 2 · Tareas por funnel (3.5).** Columnas `funnel_id` y `launch_id` en `tasks` y `task_phases`, relleno con `webinar`, y `task_create`/`task_update` aceptando el funnel. Verificar: las 67 tareas siguen visibles y editables.

**Paso 3 · Selector de funnel en el panel.** Agregar el selector y filtrar Tareas por funnel. Es el primer cambio visible y el que destraba el trabajo del equipo.

**Paso 4 · Cargar las tareas del evergreen.** Insertar las 8 fases y las 123 tareas de `mi-negocio/bases/campus-tareas-evergreen.json` con `funnel_id = 'evergreen-organico'` (detalle en la sección 6). Verificar: 123 tareas en el funnel evergreen, ninguna del webinar tocada.

**Paso 5 · Filtrar leads, llamadas y métricas por funnel.** Pasar `p_funnel` / `p_launch` a las vistas y funciones del CRM. Con el funnel Webinars elegido, los números tienen que ser idénticos a los de hoy (comparar antes y después: 404 leads, 4 llamadas).

**Paso 6 · Leads del evergreen (3.2 y 3.6).** Campos nuevos en `lead_launches`, `leads.instagram`, `funnels.config` de los dos funnels, etapas y ficha del lead por configuración. `crm_create_lead` recibe el funnel. Verificar creando un lead de prueba en evergreen y borrándolo.

**Paso 7 · Ingesta (3.7).** Campo `funnel` opcional en `ingest` y ruta `/palabra` con `ingest_palabra`. Verificar con un POST de prueba y revisando `ingest_log`. La landing actual tiene que seguir entrando sin cambios.

**Paso 8 · Contenido (3.3).** Tablas, módulo Contenido (Semana, Lista, ficha con métricas) y carga inicial de la semana puente y de la semana del 30/11 desde `13-semana-puente-21-28.md` y `12-plan-de-accion-evergreen.md` §5.

**Paso 9 · Reporte de ventas por fases (3.4).** Tabla, formulario al cerrar la llamada (obligatorio) y lista de reportes.

**Paso 10 · Resultados (3.8).** Vistas `content_results`, `keyword_results`, `subavatar_results` y `funnel_overview`, y la pantalla Resultados.

**Paso 11 · Rituales y cierre.** Tareas recurrentes (o cargadas por 8 semanas), documentar en el README del campus cómo se suma un funnel nuevo (insertar en `funnels` con su `config`, crear su primer ciclo, crear sus fases de tareas) y probarlo creando y borrando un funnel `prueba`.

**Orden si hay poco tiempo:** los pasos 1 a 4 alcanzan para que el equipo trabaje el lunes 23/11 con las tareas del evergreen separadas. Los pasos 6 y 7 hacen falta apenas empiecen a entrar palabras (martes 24/11). El 8, 9 y 10 pueden entrar durante la semana.

**Reglas para el agente:**
- No borrar ni reescribir datos existentes. Toda migración es aditiva; cada columna nueva en tablas con datos entra nullable, se rellena y recién después se pone `not null`.
- No cambiar el contrato de la landing: los POST actuales a `/optin`, `/visita`, `/grupo` y `/aplicacion` tienen que seguir funcionando igual.
- RLS en todas las tablas nuevas. Nada de claves ni secretos en el frontend.
- Genesis Lite no aparece en nada público: en el panel es solo un programa interno del carril de la llamada.
- Antes de cada migración sobre producción, mostrarle a Santi el SQL y esperar su ok.
- Al terminar cada paso, anotar en la tarea correspondiente del módulo de Tareas qué se hizo.

---

## 6. Carga de tareas del evergreen

Archivo: `mi-negocio/bases/campus-tareas-evergreen.json`. Trae `funnel`, 8 `phases` y 123 `tasks`.

| Fase | Prefijo | Tareas | De dónde sale |
|---|---|---|---|
| Evergreen · Semana puente 21-28/11 | PTE | 12 | `13-semana-puente-21-28.md` §6 |
| Evergreen · Decisiones | DEC | 13 | Decisiones D1–D13 del plan |
| Evergreen · Semana 0 · Alinear | EV0 | 17 | Fase S0 del plan |
| Evergreen · Correcciones de materiales | COR | 19 | §6 del plan |
| Evergreen · Semanas 1-2 · Montar | EV1 | 20 | Fase S1 del plan |
| Evergreen · Semanas 3-8 · Operar | EV2 | 14 | Fase S2 del plan |
| Evergreen · Escalar | ESC | 5 | Fase Escalar del plan |
| Evergreen · Datos pendientes | PEN | 23 | Pendientes del plan |

Cómo cargarlas:

1. Insertar las fases en `task_phases` (`name`, `prefix`, `sort`, `funnel_id`, `offset_days` nulo).
2. Por cada tarea, llamar a `task_create` (o insertar con el mismo formato) con: `id`, `title`, `phase`, `funnel_id`, `status` «Por hacer», `quantity` 1, `due_date` (puede venir nulo), `notes`, `reference`, y `agent` y `link` vacíos.
3. **Responsable:** `responsible_name` trae Santi, Mati, Manu o José cuando el plan nombra a uno; resolver `responsible_id` con `task_people`. Cuando el plan nombra a varios o a un rol (setter, closer, editor), viene vacío y el texto original queda en `quien_texto`: copiarlo al principio de `notes` («Quién: …»).
4. **Fecha:** `due_date` viene en 88 de las 123. Para el resto, `cuando_texto` trae lo que decía el plan («diario», «cada sábado»…): copiarlo a `notes` («Cuándo: …»). Las diarias y semanales son candidatas a tarea recurrente (paso 11).
5. `quien_texto` y `cuando_texto` no son columnas de `tasks`: no insertarlas como tales.
6. Si un id ya existe, no pisarlo.
7. Las 19 correcciones (COR) vienen asignadas a Mati con fecha 22/11 como propuesta `[HIP]`: Santi las reasigna en el pre-weekly del sábado.

---

## 7. Pendientes para Santi antes de arrancar

- ¿El ciclo del evergreen es trimestral o mensual?
- ¿Setter, closer y editor entran como personas del módulo de tareas?
- ¿ManyChat puede hacer un POST a `/palabra`, o las palabras las carga el setter a mano desde el panel en la primera versión?
- ¿El funnel `webinar` agrupa también la clase del 19/10 y la repesca del 24/10 (hoy no están en el campus), o solo de acá en adelante?
- Quién aprueba cada migración sobre producción.
