# Funnel hacking: Brandon van Mierlo (@mrbrandowner)

Relevado el 27/11/2026. Board estilo Miro: https://claude.ai/artifact/NdwaEKFKYqvDr9evMSDfLR

Brandon vende lo mismo que Génesis: crecimiento de marcas ecom con suscripción (MRR). Su prueba es su propia marca de suplementos (Everkind, con su socio Remo): $10,5M en 2025, $1,7M neto.

## El funnel en una línea

50 ads (31 creativos) → visitas al perfil de IG + DM "MRR" / comentá "PLAYBOOK" → mrbrandowner.com (VSL de 5 min + Typeform de 11 preguntas) → si factura menos de $50k/mes o tiene menos de $2.000, checkout de Whop ($6.999); si no, Calendly de 30 min → MRR Mastery Programme, 1:1, cohorte Q4 de $25.000, mastermind en Bali.

## Lo más importante que encontramos

- **Ningún ad va a una landing.** Los 50 son reels de fundador con objetivo "visitar perfil de Instagram". Cuando uno funciona lo resube como ad nuevo (hasta 4 veces).
- **Ganadores (30+ días):** "Si hacés ecom sin suscripciones en 2026, jugás en modo difícil" (85 días), "Estás trabado en 50k/mes y no sabés por qué" (86), "This is Jordan, $600k en 30 días" (78), "Skill issue" (42).
- **Todos los ads están inactivos.** El último terminó el 27/10/2026.
- **Páginas ocultas en su web** (están en el código, no enlazadas): `/application-v2` y `/application-v3` con un quiz de 7 preguntas y 4 rutas (1:1, Programme, Curso, Nurture → YouTube), story pages por alumno (`/stories/benjamin`, `/faiz`, `/andrei`), `/webinar` y `/bali`.
- **Webinar:** el real fue el miércoles 4/11 a las 19:00 CET ("$100k MRR Live Masterclass", registro con email y teléfono). La página `/masterclass` que dice "sábado 28 de noviembre" es simulada: el código pone siempre el próximo sábado a las 19:00, los cupos suben solos y el formulario no envía nada. **Hoy no hubo webinar para grabar.**

## Qué hay en esta carpeta

| Ruta | Qué es |
|---|---|
| `board/` | El board completo para abrir local (`index.html` necesita un servidor: `python3 -m http.server` dentro de la carpeta). Incluye los 31 videos de ads, el VSL, los 6 testimonios y capturas de todas las páginas. |
| `datos/ads-con-guion.json` | Los 50 ads: fechas, copy, duración y guion con tiempos. |
| `datos/transcripciones-ads/`, `datos/transcripciones-vsl/` | Transcripción de cada video (Whisper, en inglés). |
| `datos/typeform-aplicacion.json` | La definición completa del Typeform, con la lógica de saltos. |
| `datos/paginas-texto/` | El texto de cada página capturada. |
| `datos/youtube-*.txt` | Los 31 videos largos y los 431 shorts con vistas. |

## Lo que quedó pendiente

- **Slides del webinar:** no hubo vivo. Si anuncian otra fecha real, registrarse en `/webinar` con un email de prueba y grabarlo.
- **Emails:** no nos registramos en ningún formulario (decisión de Santi).
- **Perfil, destacadas y respuesta del DM:** Instagram pide login. Mandar "MRR" desde una cuenta de prueba y capturar.
- **20 ads más viejos:** la biblioteca de Meta dice 70 y solo devuelve los 50 más recientes.
- **Descripciones de YouTube:** bloqueadas desde el servidor donde se hizo el relevamiento.
