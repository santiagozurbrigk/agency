# Equipo · Génesis OS

_Última actualización: 28/11/2026 · Responsable: Santiago [CONFIRMAR]_

Acá vive **la parte interna del equipo comercial**: cómo entra alguien, cómo se lo evalúa, cómo se lo sigue y cómo se lo corrige. **No** está cómo se vende (eso está en [`../ventas/`](../ventas/): proceso, guion del SDR, guion y manual de la llamada).

Sale de las 4 clases del Módulo 8 de Limitless (transcriptas en [`../teoria-sops/equipo/`](../teoria-sops/equipo/)) bajadas a Génesis con lo que ya está en el repo. La regla madre sigue siendo **todo verdad**: lo que no está definido figura como `[PENDIENTE]`, lo que hay que validar como `[CONFIRMAR]` y lo que es una propuesta nuestra (no un dato) como `[PROPUESTA]`.

## Cómo está armada la carpeta

| Archivo | Qué es | Para quién |
|---|---|---|
| [`00-sistema-del-equipo.md`](00-sistema-del-equipo.md) | Las reglas comunes a los 3 roles: onboarding, período de prueba, control (canales, tracker, reportes, reuniones), feedback, consecuencias y SOPs | Dirección y responsables de ventas |
| [`roles/sdr.md`](roles/sdr.md) | El SDR: qué es acá, estándares, período de prueba, reportes, reunión del día cero, plan de 30 días y SOPs | El que contrata y evalúa al SDR |
| [`roles/setter.md`](roles/setter.md) | El setter: lo mismo, para el rol de setteo | El que contrata y evalúa al setter |
| [`roles/closer.md`](roles/closer.md) | El closer: lo mismo, para la llamada de venta | El que contrata y evalúa al closer |
| [`contratacion/`](contratacion/README.md) | El proceso de contratación: de abrir la búsqueda a la oferta. Avisos y formularios que se usaron para el 17/11 (SDR y closer), filtro, entrevista con role play, mensajes y banco de candidatos | Mati y Santi |
| [`indice-sops.md`](indice-sops.md) | Índice único de SOPs de ventas por área: cuál existe, cuál falta, dueño y fecha | Todos |
| [`templates/`](templates/) | Evaluación del período de prueba, reportes (SDR, setter, closer, semanal), agendas de reuniones, agenda del día cero y template de SOP | Todos |
| [`pendientes.md`](pendientes.md) | Lo que falta definir para que esto quede operativo | Santi, Mati y Manu |

Agente relacionado: [`../agentes-propios/generador-sops.md`](../agentes-propios/generador-sops.md) (convierte la transcripción de una grabación de pantalla en un SOP con nuestro formato).

## El sistema en una página

0. **Contratación:** aviso → formulario → filtro → entrevista con role play → oferta por escrito ([proceso](contratacion/README.md)).
1. **Antes de que entre:** existe el documento de negocio ([`../negocio/onboarding-equipo-genesis-os.docx`](../negocio/onboarding-equipo-genesis-os.docx)), el anexo de ventas ([`../ventas/`](../ventas/)), los números del rol escritos y los 2-3 SOPs con los que arranca.
2. **Día cero:** reunión de 60-90 min en 3 bloques (repaso del documento, visión y misión, su rol). Se le comunica el período de prueba por escrito.
3. **Primera semana:** yo lo hago → lo hacemos → lo hacés, con 3-5 tareas.
4. **Período de prueba:** se mide en ejecuciones, con tope de 15-30 días. Check semanal, revisión formal a la mitad, decisión al cierre con el flujo (actitud → muestra → proceso → resultado).
5. **Después:** daily, weekly de ventas, monthly (cierre de lanzamiento) y uno a uno. Reportes que hace el que ejecuta y que van a marketing.

## Qué rol hace qué (resumen)

| Rol | Entra en | Recibe de | Entrega a |
|---|---|---|---|
| **SDR** | Apenas el lead completa el opt-in o la aplicación | Formulario (reparto 50/50) | Closer: lead calificado, agendado y con el traspaso escrito en el grupo |
| **Setter** | Después de que hay agenda, y en las conversaciones que entran por las cuentas de Manu `[CONFIRMAR alcance]` | SDR / mensajes entrantes a Manu | Closer: lead confirmado, con las 3 piezas y presentado con el audio de Manu |
| **Closer** | En la llamada de venta | El grupo de WhatsApp con el traspaso | Equipo: venta cargada en el tracker con seña y Fathom, o "no se cerró" con la razón y el seguimiento |
