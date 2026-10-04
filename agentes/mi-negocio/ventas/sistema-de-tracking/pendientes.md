# Pendientes del sistema de tracking · Clase 19/10

Lo que queda para resolver más adelante. Se va sumando a medida que aparece. La especificación está en `especificacion.md`.

## Zoom

| # | Qué falta | Por qué importa |
| --- | --- | --- |
| 1 | **Plan de Zoom**: Pro (hasta 100 personas), Pro con Large Meetings o Webinar. Se define en la etapa de adquisición, según cuántos registros entren. | El reporte de asistentes (nombre, email, hora de entrada y salida, minutos) existe desde el plan Pro. La lista en tiempo real requiere Business. |
| 2 | **Cómo se une cada asistente de Zoom con su lead.** Todos entran por el mismo link del grupo de WhatsApp. Opciones: registro de Zoom (pide nombre y email antes de entrar) o cruce por nombre más una lista de «no encontrados» que se resuelve a mano esa noche. | Sin esto no se puede separar automáticamente a los asistentes sin acción (Grupo 2) de los que no asistieron (Grupo 3). |
| 3 | **Acceso a la API de Zoom**: una app «Server-to-Server OAuth» en el Marketplace de Zoom, con su Account ID, Client ID y Client Secret. Solo si se decide bajar el reporte de forma automática. | Para traer la asistencia sin descargarla a mano. |

## Para poder construir

| # | Qué falta | Quién |
| --- | --- | --- |
| 4 | Crear el proyecto en Vercel apuntando a `app/` y cargar las variables del `app/README.md` (`GHL_API_TOKEN`, `GHL_LOCATION_ID`, `SESSION_SECRET`, `USERS_JSON`, `WEBHOOK_SECRET`). | Santiago |
| 5 | Crear a mano los 3 calendarios en GHL con los horarios de Manu (pre-venta y post-clase) y de Diego, y pegar ID y link en Configuración dentro de la app. | Santiago |
| 6 | Emails y claves de los cinco usuarios para `USERS_JSON` (Santiago, Matías, Manu, Diego, Braian). | Santiago |
| 7 | ~~Dónde se guardan los comprobantes~~ Resuelto: Vercel Blob (Storage → Blob en el proyecto). | Hecho |
| 8 | Probar con la subcuenta real: el prefill del calendario embebido (Agenda directa, paso 2), el setup de campos y el webhook de citas. | Al conectar GHL |
| 8b | Actualizar la landing del opt-in (`lanzamiento-19-10/optin/`): sumarle ciclo y facturación y que postee a `/api/public/optin` del sistema. | Claude |

## Cosas que vienen del mapa de ventas y siguen abiertas

| # | Qué falta |
| --- | --- |
| 9 | Los recursos de la IA de la Skool de Manu (figura como `[recurso]` en el mapa). |
| 10 | Los links de pago en pesos y en dólares. |

## Actualizar el mapa y los guiones para que coincidan con lo definido

| # | Qué cambia |
| --- | --- |
| 11 | **Fase 01**: el opt-in tiene 5 preguntas (nombre, email, WhatsApp, ciclo, facturación). |
| 12 | **Fase 02**: el link de la pre-venta es un calendario de GHL de Manu (no Calendly), con el formulario de 4 preguntas. |
| 13 | **Fase 04**: las señales de compra las marcan Santiago y Matías (sale José). Los dos links de la clase son Agenda directa y Quiero que me contacten. |
| 14 | **Fase 05 · Grupo 1**: el filtro Manu / closer ya no lo hacen Matías y Santiago a mano. Lo resuelve el formulario (consumible + 50M o más + USD 3.000 o más + Manu con menos de 10), con corrección manual. |
| 15 | **Fase 05 · Grupo 2**: si califica para Génesis, agenda con Manu o con Diego según la carga de Manu. Si no califica, el SDR (Braian o Diego) vende la Mentoría en la misma cold call. |
| 16 | **Fase 05 · Grupo 2**: entra quien completó Quiero que me contacten, más quien asistió sin completar nada. Primero los del formulario, por facturación; después los que solo asistieron. |
| 17 | **En todo el mapa**: el closer es Diego (también SDR). Braian es solo SDR. |
| 18 | **Ofertas**: «Menos de USD 1.000» en los formularios de la clase lleva a «Próximo ciclo». |
