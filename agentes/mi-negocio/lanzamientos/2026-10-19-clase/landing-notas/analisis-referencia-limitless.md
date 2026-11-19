# Análisis de diseño — optin de referencia (webinar.applylimitless.com)

1-oct-2026. Revisada en celular (390 px) y desktop (1440 px), con el HTML y el CSS de la página.

## La idea que ordena todo: la página es un "board" de Miro/Figma

No es una landing con secciones: es un lienzo de trabajo colaborativo. Cada detalle visual sale de esa metáfora:

| Elemento | Cómo está hecho | Qué logra |
|---|---|---|
| Fondo | Negro casi puro (`#0a0a0c`) con grilla de puntos (`rgba(255,255,255,.10)`) y un resplandor naranja difuso detrás del hero | Se lee como el canvas de Miro. El brillo guía el ojo al titular |
| Barra superior | Logo + "Board: $115k con 1.700 seguidores" + punto "En vivo" + avatares de colaboradores (A, L, +9) + botón "Reservar lugar" | Parece la barra de un archivo compartido. El nombre del archivo ya es la prueba. Los avatares sugieren gente adentro |
| Titular | Encerrado en una **caja de selección** (borde naranja de 1 px, 4 manijas cuadradas en las esquinas) con una etiqueta "Webinar Limitless" como el nombre de un frame | El titular "está seleccionado": es lo que importa del board |
| Resaltados | Números clave con fondo naranja tipo marcador (`1.700 seguidores`, `$115.000`, `PRIMER WEBINAR`) y un efecto "shine" animado en "TODO" | Los números se leen primero, aunque no leas la frase |
| Tags | "AGENTES DE IA · SOFTWARE · PROCESOS · SOPS" con un cuadradito de color, como las etiquetas de Miro | Dice qué se lleva en 4 palabras |
| Sticky notes | Post-its girados (blanco, negro, naranja), con cinta adhesiva arriba, sombra fuerte, esquina doblada y letra manuscrita (Caveat): "Incluye #1 El funnel y los ads exactos", "Incluye #2 Mis agentes de IA y SOPs", "Incluye #3 Tu primer webinar". Se pueden arrastrar | Los bonus aparecen como notas pegadas alrededor del hero, sin ocupar una sección. Arrastrarlas es un juguete que retiene |
| Cursores | Cursores de colaboradores animados (flotan) con nombre: "VOS" (naranja) y "Equipo Limitless" | Sensación de que hay gente en vivo trabajando en el board. "VOS" mete al lector adentro |
| Toolbar | Barra flotante abajo al centro, fija: selector, nota, lápiz, frame, comentario, "100%" | Cierra la ilusión de herramienta. Es decorativa |
| Secciones | Cada una es un **frame** con borde punteado y etiqueta: "FRAME 01 · LA PRUEBA", "FRAME 02 · QUÉ INCLUYE", "FRAME 04 · TU ANFITRIÓN", "FRAME 05 · TU LUGAR" | Orden y ritmo sin títulos de sección pesados |
| Kickers | Arriba de cada H2, una línea manuscrita naranja con flecha: "esto es lo que hicimos con webinars ↓", "tu anfitrión →", "último paso ↓" | Tono de anotación personal, como si el autor escribiera sobre su propio board |
| Pruebas | Capturas de Whop (gross revenue) y de otras landings, montadas como **polaroids** con cinta y una leyenda manuscrita | La prueba se ve "pegada a mano", no como un banner |
| Anfitrión | Foto en polaroid girada con leyenda "el que está detrás del sistema" (en desktop queda sticky al scrollear) + bio larga con números en negrita + 3 stats como notas (la primera naranja) | La bio larga se aguanta porque la foto acompaña |

## Estructura y orden

1. Barra superior (board) + barra naranja con countdown en texto: "La clase empieza en 05D 23H 32M 34S".
2. Hero: pill con la fecha ("MIÉRCOLES 7 DE OCTUBRE", con glow pulsante) → titular seleccionado → tags → subtítulo → VSL → botón blanco "QUIERO RESERVAR MI LUGAR" (solo en mobile, entre video y form) → chips (fecha · hora con banderas de AR, CO, MX, US, ES · "100% gratis y en vivo").
3. Form como una **hoja hueso pegada con cinta** sobre el board: título manuscrito "Completá tus datos y reservá tu lugar", nombre, email, WhatsApp con bandera y código, pregunta de calificación ("¿Cuánto está facturando tu negocio por mes?", 5 rangos), botón con degradado naranja, nota, consentimiento legal.
4. Countdown grande en 4 tarjetas (naranja, hueso, negro, hueso), levemente giradas.
5. Frame 01 · La prueba: "Más de $2,000,000 en Webinars resumidos en 90 minutos" + 2 capturas.
6. Frame 02 · Qué incluye: 3 tarjetas giradas (oscura, hueso, oscura) numeradas 01-03, con una captura real adentro de cada una y una frase.
7. Frame 03 · Prueba de mercado: 4 polaroids con landings de Hormozi, Gadzhi, Brez y Sapp.
8. Frame 04 · Anfitrión.
9. Frame 05 · Tu lugar: cierre con nota "una sola vez", H2, fecha, botón naranja.
10. Footer con datos legales, privacidad y términos.

Entre frames, un botón blanco "QUIERO RESERVAR MI LUGAR" con glow (aparece 5 veces).

## Sistema visual

- **Colores:** negro `#0a0a0c`, tarjetas `#101013`, blanco puro para texto, gris `#8a8a8f`, naranja `#E15D12` (más oscuro `#C24E0D`, más claro `#F07A35`), degradado del botón `#8F3C09 → #E15D12`, hueso para papeles (form, notas, polaroids) y tinta `#17181c` sobre hueso.
- **Tipografía:** títulos en Neue Haas Grotesk Display (cae a Helvetica), cuerpo en Inter, manuscrita Caveat para notas, kickers y leyendas. Tres voces: la del producto (grotesk), la de lectura (Inter) y la "humana" (Caveat).
- **Botones:** dos tipos. El principal, naranja con degradado y glow pulsante, solo en el form y el cierre. El secundario, blanco con borde naranja y glow, entre frames. El blanco resalta más sobre negro que otro naranja.
- **Rotación:** casi todo lo "de papel" está girado entre 1 y 3 grados. Nada es perfectamente recto, salvo el texto.
- **Animación:** 8 keyframes, todos sutiles: pulso del punto en vivo, glow del pill, cursores que flotan, shine en "TODO", pulso de los CTAs.
- **Mobile:** el hero se reordena en columna, las notas y los cursores se esconden o achican, los chips bajan de tamaño, y el botón entre video y form aparece solo ahí.

## Mecánica de conversión

- **El form está arriba:** en desktop arranca a la altura del primer scroll, y todo lo demás es refuerzo. Es una página de "una acción" con 6 botones apuntando al mismo form.
- **Pregunta de calificación** por facturación en USD (5 rangos). Sirve para segmentar y para mandar el Lead con valor.
- **Prueba antes del anfitrión:** primero los números (Frame 01), después qué incluye, después la prueba de mercado, y recién al final quién es.
- **Un detalle de copy en el form:** "Sin costo. En vivo y gratis, una sola vez." No usa "cupos limitados".
- **Técnico:** A/B del titular 50/50 fijado por navegador (`?v=a` / `?v=b` para forzarlo), VSL de ConverteAI con "Tu video ya empezó / Tocá para escuchar", píxel de Meta con Lead, fuentes propias precargadas.

## Qué tomar para Génesis

La metáfora del board le calza a Manu mejor que a Limitless: su hábitat ya es la pantalla compartida en Miro haciendo la cuenta, y la marca usa pizarra y fibrón.

**Tomar tal cual:**
1. Fondo negro con grilla de puntos y resplandor naranja detrás del titular.
2. Titular dentro de una caja de selección con manijas y etiqueta de frame.
3. Números resaltados con fondo naranja tipo marcador: `60 a 156 millones`, `2.200 suscriptores`, `1,28% de churn`.
4. Los 3 regalos como sticky notes alrededor del hero: "Incluye #1 Tu roadmap", "Incluye #2 El Simulador de Suscripción", "Incluye #3 Los sistemas de email y WhatsApp". Hoy la optin no muestra los regalos; así entran sin sumar una sección.
5. Form como hoja hueso con cinta y título manuscrito.
6. Secciones como frames numerados con kicker manuscrito.
7. Pruebas como polaroids: el panel de suscriptores, el reporte de facturación y la marca con la pauta apagada.
8. Anfitrión con polaroid y 3 stats como notas.
9. Botón blanco entre secciones y naranja en el form.
10. Countdown grande en tarjetas debajo del form.

**Adaptar:**
- **El nombre del board:** "Board" está bien (no es "tablero", que no se dice en público). Por ejemplo: "Board: de 60M a 156M con suscripción".
- **Cursores:** "VOS" y "Manu", en vez de "Equipo Limitless".
- **Pregunta de calificación** en pesos y con los rangos del avatar: menos de 30M, 30 a 80M, más de 80M por mes. Filtra al que arranca de cero (no es el avatar). Si se suma, el Lead se dispara con valor desde el botón y no por la URL de la thank you.
- **Hora:** solo Argentina, porque la campaña es solo para Argentina. Sin banderas de otros países.

**No tomar:**
- **"Una sola vez"** (nota del cierre y nota del form). Hay replay: no se puede decir. Va "en vivo, privada y gratis".
- **Frame 03 (landings de Hormozi y compañía):** no aplica. El equivalente sería mostrar marcas que ya cobran con suscripción (Grüns, AG1), pero eso es contenido de la clase.
- **La toolbar decorativa:** en mobile tapa contenido y no suma. Si se usa, solo en desktop.
- **Las notas arrastrables:** son lindas, pero pesan en JS y en mobile se esconden igual. Se pueden dejar estáticas.
- **Palabras:** el sitio dice "webinar" y "masterclass"-adyacentes. En Génesis sigue siendo "clase".

## Lo que hace falta para armarlo

- Foto de Manu para la polaroid.
- Capturas: panel de suscriptores (2.200 / 1,28% / LTV), reporte 60M → 156.798.062 y la marca con la pauta apagada. Sin captura no va el número.
- Una imagen por regalo para las notas o tarjetas, si se quieren como las de Limitless (opcional: las notas pueden ser solo texto).
- Logo de Génesis (hoy el footer usa texto).
- Decisión sobre la pregunta de calificación.
