# Sistema de tracking de leads · Clase 19/10

App web del equipo de ventas. Se monta sobre GHL: todo lo que se carga acá se escribe en la subcuenta. La especificación completa está en `../especificacion.md`.

## Qué tiene

| Página | Qué es |
| --- | --- |
| `/` | La app del equipo: colas, grupos, fichas, ventas, métricas, configuración. Pide login. |
| `/agendar` | Formulario público de **Agenda directa** (link 1 de la clase). Decide solo si muestra el calendario de Manu o el de Diego. |
| `/contacto` | Formulario público de **Quiero que me contacten** (link 2 de la clase). |
| `/api/public/optin` | Endpoint para la landing de registro: crea el lead, guarda ciclo y facturación y reparte dueño (Braian/Diego de a uno). |
| `/api/webhook` | Recibe los avisos de GHL (cita creada o cancelada) y actualiza al lead. |

**Modo demo:** sin `GHL_API_TOKEN` ni `GHL_LOCATION_ID`, la app corre con datos de ejemplo (clave de acceso: cualquier email + «demo»). Sirve para mirar, no para operar: en Vercel la memoria no persiste.

## Deploy en Vercel

1. Crear un proyecto nuevo en Vercel apuntando a esta carpeta (`agentes/mi-negocio/ventas/sistema-de-tracking/app`). Sin framework, sin build: son archivos estáticos + funciones en `api/`.
2. Cargar las variables de entorno (abajo).
3. Para los comprobantes: en el proyecto, **Storage → Create → Blob**, con acceso **Private**, y conectalo al proyecto. El SDK se autentica solo (OIDC), no hace falta token.

### Variables de entorno

| Variable | Qué es |
| --- | --- |
| `GHL_API_TOKEN` | Token de integración privada de GHL (Settings → Private Integrations). Permisos: contactos, campos personalizados, custom values, tags, calendarios y eventos (ver/editar). |
| `GHL_LOCATION_ID` | ID de la subcuenta. |
| `SESSION_SECRET` | Una cadena larga aleatoria (por ejemplo `openssl rand -hex 32`). |
| `USERS_JSON` | Los 5 usuarios: `[{"email":"...","name":"Santiago","pass":"..."},...]` con claves fuertes. |
| `WEBHOOK_SECRET` | Otra cadena aleatoria. Va en la URL del webhook que se configura en GHL. |
| `BLOB_STORE_ID` | La crea Vercel al conectar el Blob store privado (comprobantes). |

## Puesta en marcha en GHL (una vez)

1. **Campos personalizados:** entrar a la app, pestaña **Configuración → «Crear los campos en GHL (setup)»**. Crea todos los campos que usa el sistema (los de `lib/fields.js`).
2. **Calendarios** (a mano en GHL, la API no los crea con los horarios de cada uno):
   - «Sesión con Manu · pre-venta» — con las 4 preguntas del formulario de pre-venta como preguntas del calendario.
   - «Sesión de diagnóstico · Manu» (post-clase).
   - «Sesión de diagnóstico · Diego».
   Después pegar el **ID** y el **link** de cada uno en **Configuración** dentro de la app. El ID del calendario aparece en la URL al editarlo en GHL.
3. **Webhook de citas:** en GHL, un workflow con disparador «Appointment» (creada / cancelada, de los 3 calendarios) y acción webhook →
   `https://<proyecto>.vercel.app/api/webhook?key=<WEBHOOK_SECRET>`.
   Con eso el sistema marca solo quién agendó, con quién, libera reservas y detecta si se pasa el tope de Manu.
4. **Opt-in:** la landing de registro tiene que postear a `https://<proyecto>.vercel.app/api/public/optin` con `{nombre, email, telefono, ciclo, facturacion, tracking}`. (Hoy la landing manda a un webhook de GHL y le faltan las 2 preguntas nuevas: está en `../pendientes.md`.)

## Decisiones de diseño

- **La etapa vive en un campo personalizado** («Etapa del proceso»), no en un pipeline de GHL: la API v2 no crea pipelines y el equipo opera desde esta app. Si después quieren el pipeline visual en GHL, se crea a mano y se agrega el espejo.
- **La configuración** (tope de Manu, lugares de Génesis, fechas, calendarios) se guarda en el custom value `trk_settings`.
- **Ventas y pagos** viven en el campo «Venta (interno, no tocar)» del contacto, como JSON; los comprobantes en un Blob store **privado** de Vercel (en el JSON queda la ruta; se ven solo logueado, por `/api/comprobante?path=...`).

## Rendimiento (noche de la clase)

GHL permite 100 pedidos cada 10 segundos por subcuenta. Para no acercarse a ese límite:

- **Foto de leads en caché** (`lib/cache.js`): memoria de la instancia + Vercel Runtime Cache compartida. Se sirve al instante si tiene menos de 15 s; si es más vieja se devuelve igual y se rehace en segundo plano. Los 5 usuarios comparten una sola lectura de GHL.
- **Write-through**: cada escritura actualiza la foto al instante, así el cambio se ve sin esperar.
- **Escrituras de 1 pedido**: las acciones de la ficha reusan la ficha ya leída (antes 3-5 pedidos, ahora 2).
- **Formularios de la clase**: responden en milisegundos con lo que hay en caché y guardan en GHL en segundo plano (`waitUntil`). Medido con una ráfaga simulada de 30 formularios en el mismo segundo: respuesta en ~11 ms, 10 a Manu y 20 a Diego (tope respetado), las 30 guardadas en GHL en ~6 s, nunca más de 25 pedidos cada 10 s.
- **Tope de Manu sin carreras**: decidir Manu/Diego y reservar el lugar se hace de a uno por instancia. Entre instancias distintas queda la red de seguridad «Excede el tope de Manu».
- **Reservas de 3 minutos** en la caché compartida (no en GHL).
- **Balde de fichas** en `lib/ghl.js`: hasta 25 pedidos de golpe y 6 por segundo después; ante un 429, reintento con espera creciente.
- La app refresca cada 30 s solo con la pestaña a la vista, y al volver a ella.
- **El historial** de cada lead (quién hizo qué y cuándo) está en «Historial (interno, no tocar)».

## Probar en local

```bash
node test/flujo.test.js   # corre el flujo completo en modo demo, incluida una ráfaga contra el tope de Manu
```

Dependencias: `@vercel/blob` (comprobantes) y `@vercel/functions` (caché compartida); Vercel las instala solo. Sin ellas (local, tests) el sistema funciona con caché en memoria. Cualquier archivo de `api/` es una función de Vercel con la misma firma que `register.js` del opt-in.
