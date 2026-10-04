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
3. Para los comprobantes: en el proyecto, **Storage → Create Database → Blob**. Eso crea sola la variable `BLOB_READ_WRITE_TOKEN`.

### Variables de entorno

| Variable | Qué es |
| --- | --- |
| `GHL_API_TOKEN` | Token de integración privada de GHL (Settings → Private Integrations). Permisos: contactos, campos personalizados, custom values, tags, calendarios y eventos (ver/editar). |
| `GHL_LOCATION_ID` | ID de la subcuenta. |
| `SESSION_SECRET` | Una cadena larga aleatoria (por ejemplo `openssl rand -hex 32`). |
| `USERS_JSON` | Los 5 usuarios: `[{"email":"...","name":"Santiago","pass":"..."},...]` con claves fuertes. |
| `WEBHOOK_SECRET` | Otra cadena aleatoria. Va en la URL del webhook que se configura en GHL. |
| `BLOB_READ_WRITE_TOKEN` | La crea Vercel al agregar el Blob store (comprobantes). |

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
- **La reserva de 3 minutos** del lugar de Manu se guarda en un custom value de GHL (`trk_reservas_manu`). Si dos leads la pelean en el mismo segundo puede colarse uno de más: la red de seguridad es la marca «Excede el tope de Manu», que aparece sola y se resuelve con «Llamada con → Diego» en la ficha.
- **La configuración** (tope de Manu, lugares de Génesis, fechas, calendarios) se guarda en el custom value `trk_settings`.
- **Ventas y pagos** viven en el campo «Venta (interno, no tocar)» del contacto, como JSON; los comprobantes en Vercel Blob (la URL queda en ese JSON).
- **El historial** de cada lead (quién hizo qué y cuándo) está en «Historial (interno, no tocar)».

## Probar en local

```bash
node test/flujo.test.js   # corre el flujo completo en modo demo: 44 chequeos
```

No hay dependencias: Node 18+ alcanza (usa `fetch` nativo). Cualquier archivo de `api/` es una función de Vercel con la misma firma que `register.js` del opt-in.
