# Guía de estilo — Recursos personalizados Génesis

Cómo se escribe y cómo se ve cada recurso que se le manda a un lead. Si algo de acá choca con `genesis-contexto.md`, manda `genesis-contexto.md`.

## Qué es un recurso

Un documento corto (2 a 4 páginas A4) que se manda por WhatsApp como PDF antes de la llamada con el closer. Se siente **armado para él**: su marca, su producto, sus palabras y, si los tenemos, sus números. Sale del material de la Skool de Manu, aplicado a su caso.

Lo que tiene que pensar el lead al leerlo: *"Esto lo hicieron mirando mi marca. Ya entendí por qué me pasa. Quiero ver el resto con mis números en la llamada."*

## La estructura (siempre en este orden)

| # | Sección | Qué va | Largo |
| --- | --- | --- | --- |
| 1 | **Portada** | "Preparado para [nombre] · [marca]", el título del recurso (el problema dicho como resultado, en su idioma) y la fecha | — |
| 2 | **Lo que nos contaste** | Sus respuestas textuales, entre comillas: el objetivo, lo que lo frena y qué probó. Una línea de lectura nuestra al final | 4 a 6 líneas |
| 3 | **Lo que está pasando de verdad** | El problema detrás del síntoma: no es el creativo ni la pauta, es el modelo (la unidad de venta es la compra, no el cliente). Cadena causal en presente, con el número adentro | 1 a 2 párrafos |
| 4 | **La cuenta con tus números** | Una sola cuenta, la que corresponde a su problema, en tabla. Con sus números si los dio; si no, con la cuenta canónica y aclarado como ejemplo | 1 tabla + 2 líneas |
| 5 | **El orden para salir** | Los pasos del SOP de la Skool que corresponde, nombrados y explicados en el qué y el por qué (no el cómo completo). Máximo 4 | 1 lista |
| 6 | **Lo que podés hacer esta semana** | **Una** acción concreta del SOP, aplicada a su marca, que pueda hacer sin nosotros | 1 caja |
| 7 | **Lo que vemos en la llamada** | Qué falta para su caso (la variante, el techo nuevo, el orden de la migración) y que eso se hace con sus números en la llamada con [closer] el [día] | 3 a 4 líneas |
| 8 | **Firma** | Manu + bloque de autoridad | — |

**Títulos de portada que funcionan** (el resultado, con su problema adentro):
- CPA: "Cuánto podés pagar por cliente en [marca]"
- Margen: "Dónde se te va el margen en cada venta de [marca]"
- Metadependencia: "Cómo hacer que [marca] facture aunque se caiga Meta"
- Vender constante: "Por qué [marca] arranca cada mes en cero"

## Cómo se escribe

- **Voseo estricto** y la voz de Manu: directo, técnico, coloquial argentino. Un operador hablándole a otro.
- **"Vos" para su cuenta, "nosotros" para las marcas de Manu.**
- **Cada dolor con su número.** Nunca "te sube el costo": decís cuánto.
- **Frases cortas.** Un párrafo, una idea. Nada de introducciones ("En este documento vas a encontrar...").
- **Remates secos** al final de una idea: "y ya está", "y listo".
- **Apunta al modelo, nunca a la persona:** "no es tu creativo, es tu modelo". Nunca lo hacés sentir que hizo todo mal.
- **Las palabras del lead van textuales**, con sus errores de tipeo incluidos si los hay.
- **Vocabulario técnico sin explicar:** CPA, CAC, LTV, breakeven, churn, margen de contribución, ciclo de reposición.
- **Prohibido:** tu mejor versión, secreto, hack, transformación, revolucionario, mindset, libertad financiera, escalar a 6 cifras, te garantizo, vas a facturar X, piloto, programa, presupuesto, precio, cuotas.

## Cómo se ve (lo resuelve la plantilla)

La plantilla `plantilla-recurso.html` ya tiene todo el diseño. Se usa tal cual: se reemplazan los textos y se repiten o se borran bloques, **nunca se toca el CSS**.

| Elemento | Valor |
| --- | --- |
| Negro | `#0B0B0C` (portada, títulos) |
| Hueso | `#F2EDE4` (fondo de cajas y de la portada clara) |
| Naranja | `#F26A1B` (un solo acento por bloque: el número clave, la barra de las citas, la acción de la semana) |
| Tinta | `#17181C` (texto) |
| Títulos | Inter Tight, 700 a 800, interletrado apretado |
| Cuerpo | Inter, 400 a 600 |
| Símbolo | Dos círculos que se cruzan con la lente al medio en naranja (compra única · suscripción · el cliente que vuelve) |

**Reglas visuales:**
- El naranja marca **lo que importa**, no decora. Si todo es naranja, nada es naranja.
- Los números van en tabla o en la caja destacada, nunca enterrados en un párrafo.
- Una tabla por recurso, como mucho dos.
- Sin fotos, sin íconos de stock, sin emojis.

## Bloques de la plantilla

| Clase | Para qué |
| --- | --- |
| `.portada` | Primera página, fondo negro |
| `.cita` | Las palabras textuales del lead |
| `.cuenta` | La tabla de la cuenta; la fila clave lleva `class="clave"` |
| `.destacado` | Un número o una frase que tiene que quedar (máximo uno por página) |
| `.pasos` | El orden para salir (lista numerada) |
| `.accion` | Lo que puede hacer esta semana |
| `.llamada` | El puente a la llamada |
| `.nota` | Aclaraciones ("cuenta de ejemplo con el margen canónico") |

## El mensaje de WhatsApp para mandarlo

Lo escribe Claude debajo del documento, en este formato (es el del guion del SDR):

> Como te dije, acá va lo que te armé para tu caso: [título del recurso]. Es sobre [su problema, con sus palabras]. Fijate sobre todo [la sección que más le sirve]. Después contame qué te pareció.

## Cómo pasarlo a PDF

1. En el artefacto, **Descargar** (o copiar el código y guardarlo como `.html`).
2. Abrirlo en Chrome → **Imprimir** → **Guardar como PDF** · tamaño A4 · márgenes "Ninguno" · activar **"Gráficos de fondo"**.
3. Nombre del archivo: `Genesis - [Marca] - [tema].pdf`.
