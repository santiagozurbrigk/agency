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
| 4 | Token de integración privada de GHL y el ID de la subcuenta, cargados en Vercel (`GHL_API_TOKEN`, `GHL_LOCATION_ID`). | Santiago |
| 5 | Horarios disponibles de Manu (pre-venta y post-clase) y de Diego, para armar los calendarios de GHL. | Santiago |
| 6 | Emails de los cinco usuarios (Santiago, Matías, Manu, Diego, Braian). | Santiago |
| 7 | Dónde se guardan los comprobantes de venta: en un campo de archivo de GHL o en el almacenamiento de Vercel. | Se define al construir |
| 8 | Probar que el calendario de GHL embebido acepte nombre, email y WhatsApp precargados desde la URL (Agenda directa, paso 2). | Se valida al construir |

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
| 16 | **Fase 05 · Grupo 2**: entra quien completó Quiero que me contacten, más quien asistió sin completar nada. Se ordena por facturación. |
| 17 | **En todo el mapa**: el closer es Diego (también SDR). Braian es solo SDR. |
| 18 | **Ofertas**: «Menos de USD 1.000» en los formularios de la clase lleva a «Próximo ciclo». |
