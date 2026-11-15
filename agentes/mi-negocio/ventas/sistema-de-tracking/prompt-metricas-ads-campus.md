Quiero sumar al panel de Métricas del campus todo lo que medía el tracker viejo sobre la pauta y el embudo, incluida la conexión con Meta Ads. Antes de tocar nada mostrame el plan: qué tablas, funciones, migraciones y pantallas vas a crear. Trabajá en una rama nueva y no publiques sin mi OK. Las métricas de SDR y closer (`crm_team_metrics`) ya existen: no las dupliques, reusalas.

## Datos que ya hay en Supabase (proyecto genesis-platform, zanwrwysbmvgytfzymaz)

- `landing_visits` (launch_id, day, source, variant, visits): visitas a la landing por día (fecha de Argentina), fuente y versión del test. Fuentes: «Anuncios de Meta», «Directo / sin UTM», «Instagram · bio», etc. Ignorá la fuente «Test».
- `lead_launches`: un registro por lead y lanzamiento. Columnas útiles:
  - `optin_at`, `inversion_meta`, `califica`, `variant` (1/2/3), `source`, `stage`
  - `contact_attempts`, `answered`, `real_conversation`, `sdr_qualified`, `agendo`, `toco_grupo`
  - `tracking` (jsonb con ab, ad_id, fbclid, utm_source, utm_medium, utm_campaign, utm_term, utm_content, utm_id)
- `leads`: tiene el teléfono, que se usa para sacar el país.
- `sales_calls`, `payments`, `lead_events`: lo que ya usa `crm_team_metrics`.
- `launches` y `current_launch`: el lanzamiento activo.

## Definiciones (las mismas del tracker viejo)

- **Pauta:** source = «Anuncios de Meta». Sale de los UTM o del fbclid/ad_id. Si hay un utm_source propio distinto de facebook, manda la UTM aunque haya fbclid.
- **Calificado:** `califica` = true (invierte 100 dólares por día o más en Meta).
- **Contactado:** contact_attempts > 0 o stage distinto de nuevo.
- **Contestó:** `answered`.
- **Pickup:** contestaron sobre contactados.
- **Tasa de agenda:** agendaron sobre calificados.
- **Calificación real:** `sdr_qualified` sobre calificados.
- **Entró al grupo:** `toco_grupo`.
- **Días:** en hora de Argentina (UTC-3).
- **Filtros de todo el panel:** lanzamiento y rango desde/hasta. Sin rango = todo el lanzamiento.
- **País:** sale del prefijo del teléfono, probando el prefijo más largo primero: 598 Uruguay, 595 Paraguay, 593 Ecuador, 591 Bolivia, 507 Panamá, 506 Costa Rica, 502 Guatemala, 503 El Salvador, 504 Honduras, 505 Nicaragua, 54 Argentina, 52 México, 57 Colombia, 34 España, 56 Chile, 51 Perú, 58 Venezuela, 55 Brasil, 53 Cuba, 1 EEUU/Canadá. Si no coincide ninguno, «Otros»; si no hay teléfono, «Sin teléfono».

## Fase 1: con los datos que ya están (sin Meta)

Una función SQL tipo `crm_ads_metrics(p_launch, p_from, p_to)`, security definer y solo para admin, con estos bloques:

1. **Resumen:**
   - Opt-ins totales, de pauta y sin anuncio
   - Calificados de pauta y totales
   - % calificados de pauta
   - Visitas de pauta y visitas totales
   - Conversión de la landing (opt-ins de pauta / visitas de pauta)
   - Calificados por visita
   - Entraron al grupo (todos y de pauta, cantidad y %)
   - Tasa de contacto
   - Pickup
   - % que contestaron
   - Calificación real
   - Tasa de agenda
2. **Por día:** el mismo resumen para cada día del rango. En pantalla, la flecha de hoy contra ayer: verde si mejora, rojo si empeora.
3. **Test de versiones (1/2/3):**
   - **Por versión:**
     - Visitantes
     - Opt-ins
     - Opt-ins por visitante (la métrica que manda)
     - Calificados
     - % calificados
     - Calificados por visitante
     - Entraron al grupo
     - % grupo
     - Serie por día
   - Si hay datos de alguna versión, mostrá las 3 aunque alguna esté en 0.
   - **Ganador y % de confianza** entre las dos mejores: prueba z de dos proporciones con p = opt-ins / visitantes. La confianza es (1 − p-valor) en %.
4. **De dónde vienen los opt-ins:** por fuente, con visitas, opt-ins, calificados y entraron al grupo.
5. **Qué respondieron (solo pauta):**
   - Reparto por `inversion_meta`, con cuántos califican en cada opción
   - Reparto por país, con cuántos califican en cada uno
6. **Embudo del equipo:**
   - Opt-ins → contactados → contestaron → calificados → agendaron → se presentaron → ventas
   - Reparto por stage
   - Reparto por intentos de contacto (0, 1, 2, 3, 4+)
7. **Ventas:**
   - Por oferta/programa: cantidad, vendido y cobrado
   - Cuotas vencidas, con su monto
   - Cuotas que vencen en los próximos 7 días

## Fase 2: Meta Ads (Graph API v24.0)

**Conexión y secretos:**
- Supabase Edge Function `meta-ads`. El token NUNCA va al frontend ni aparece en errores ni en logs: reemplazalo por «…» en cualquier mensaje.
- Secrets de la función: `META_ACCESS_TOKEN` y `META_AD_ACCOUNT_ID`. El ID es el número después de act= en el Administrador de anuncios; aceptá que lo peguen con o sin «act_».
- Si falta alguno, que el panel muestre qué falta y el resto siga andando.
- Solo pueden llamarla los admin: validá el JWT y `is_superadmin`.

**Pedidos a Meta** para el rango (`time_range` {since, until}), siguiendo `paging.next`:
- `act_X/insights` level=account con `spend, impressions, inline_link_clicks, actions, reach, frequency`: los totales.
- Lo mismo con `time_increment=1`: la serie por día.
- level=ad con `spend, impressions, inline_link_clicks, actions, reach, frequency, campaign_id, campaign_name, adset_id, adset_name, ad_id, ad_name`, limit 500.
- level=ad con `time_increment=1` y ad_id: la serie por anuncio.
- `act_X/ads` (id, effective_status), `act_X/adsets` y `act_X/campaigns` (id, effective_status, daily_budget). El presupuesto viene en centavos: dividí por 100.

**Cómo leer lo que devuelve Meta:**
- Visitas a la landing (lpv) = la acción `landing_page_view` dentro de `actions`.
- Estados de entrega:
  - ACTIVE = Activo
  - IN_PROCESS, PENDING_REVIEW y PREAPPROVED = En revisión
  - DISAPPROVED = Rechazado
  - WITH_ISSUES = Con problemas
  - el resto = Apagado

**Caché:** guardá la respuesta 5 minutos por cuenta y rango, en una tabla, para no pegarle a Meta en cada carga.

**Cruce de cada lead de pauta con su anuncio:**
1. Por `tracking.ad_id` = ad_id. Si no hay, por `utm_content` = nombre del anuncio, sin importar mayúsculas ni espacios.
2. Si quedan varios candidatos, desempatá por `utm_term` = nombre o id del conjunto, y después por `utm_campaign` = nombre o id de la campaña.
3. Los que no cruzan cuentan como «sin cruzar» y se muestran.

**Métricas** (para el total, por día y por anuncio, conjunto y campaña):
- Inversión
- Impresiones
- Alcance
- Frecuencia
- Clics al link
- Visitas a la landing
- CPL = inversión / opt-ins
- CPL calificado = inversión / calificados
- CPM = inversión / impresiones × 1000
- CTR del link = clics / impresiones
- Clic → landing = lpv / clics
- Conversión de la landing = opt-ins / lpv
- Anuncios activos, en revisión y rechazados

**Pantalla «Anuncios»,** como el Administrador de anuncios pero con lo que pasa después del clic:
- Pestañas campaña / conjunto / anuncio, en árbol desplegable.
- Filtro todos / activos / apagados, buscador y orden por cualquier columna.
- Fila «Total de la cuenta».
- Menú «Columnas» que recuerde la elección.
- Columnas:
  - Entrega
  - Presupuesto diario
  - Importe gastado
  - Opt-ins
  - Calificados
  - CPL
  - CPL calificado
  - % calificado
  - % que entra al grupo
  - CTR link
  - CPM
  - Clic → landing
  - Conversión de la landing
  - Frecuencia
  - Agendas
  - Ventas
- Por defecto se muestran todas menos Calificados, CPM, Clic → landing, Conversión de la landing y Frecuencia.
- Al abrir un anuncio, la lista de sus leads: nombre, fecha, inversión, stage, si califica y si compró.

**«Cómo baja el tráfico» (solo pauta):** embudo impresiones → clics → visitas a la landing → opt-ins → calificados → entran al grupo, con el % que sigue de cada paso al siguiente.

**Creativos:**
- `act_X/ads` de a 25 (con más, Meta corta), con `id, name, campaign{name}, adset{name}, creative.thumbnail_width(640).thumbnail_height(640){id, thumbnail_url, image_url, video_id, object_type}`, para mostrar la miniatura de cada anuncio.
- Las URLs de Meta vencen: no las guardes como permanentes.

**Series por día:** sumá a los gráficos inversión, clics, lpv, CPL, CPL calificado, CPM y CTR.

## Pantalla

Todo dentro de Métricas, en este orden:
1. Cómo viene la pauta
2. Cómo baja el tráfico
3. Anuncios
4. Test de versiones
5. De dónde vienen los opt-ins
6. Qué respondieron
7. Después del registro
8. Ventas

Cada número lleva un ⓘ con su definición en una línea, como en las métricas de SDR y closer. Solo lo ven los admin.

## Fuera de alcance por ahora

La asistencia de Zoom: importar el CSV y los hitos de la clase. Va en otra tanda.

Cuando termines, probalo con los datos reales del lanzamiento actual y mostrame los números de la Fase 1 antes de conectar Meta.
