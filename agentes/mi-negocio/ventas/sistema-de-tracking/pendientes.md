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
| 4 | ~~Proyecto en Vercel y variables~~ Hecho: `tracking-genesis.vercel.app`. | Hecho |
| 5 | ~~Calendarios en GHL~~ Hecho: los 3 creados y cargados en Configuración, más los 6 workflows del webhook de citas. | Hecho |
| 6 | Rotar la clave de Santiago en `USERS_JSON` (viajó por el chat) y borrar los contactos de prueba «Prueba Sistema» y «Prueba Landing» en GHL. | Santiago |
| 7 | ~~Dónde se guardan los comprobantes~~ Resuelto: Vercel Blob (Storage → Blob en el proyecto). | Hecho |
| 8 | ~~Probar con la subcuenta real~~ Hecho (04/10): setup de campos, opt-in → sistema, ruteo de la agenda directa, prefill del calendario y webhook de alta y cancelación. | Hecho |
| 8b | ~~Landing del opt-in~~ Hecho: `optin-genesis.vercel.app`, pide ciclo y facturación y reenvía al sistema. Thank you rediseñada (06/10): el link de la clase llega por el grupo de WhatsApp, no por mail. VSL de registro y de thank you cargados (09/10). Link del grupo de WhatsApp cargado (10/10). Falta: la foto de Manu (`manu.jpg`), el píxel de Meta y Hyros, y dominio propio. | Santiago |
| 8c | ~~Blob store privado~~ Hecho (04/10): comprobantes probados, solo se ven logueado. | Hecho |

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
