---
name: editar-reel
description: Edita reels a cámara con el estilo del usuario (cortes de silencios y tomas repetidas, planos, zooms, subtítulos, hook y CTA) usando Remotion, y aprende ese estilo de reels de referencia y de cada corrección. Usar cuando el usuario pida editar una toma o un reel ("editá este reel", "editá la toma", "cortá los silencios"), cuando pase un reel que le gusta para copiarle el estilo ("mirá esta referencia", "quiero que edite como este"), o cuando corrija una edición ("no me gustó el zoom", "los subtítulos más grandes").
---

# Editar reel

La skill tiene tres modos. Antes de cualquiera, leer **`estilo.md`** (el estilo del usuario, manda)
y **`criterio.md`** (la base, se usa donde `estilo.md` no dice nada). Las dos están en esta carpeta.

`<SKILL>` = la carpeta donde está este archivo (típico: `~/.claude/skills/editar-reel`). Usar
siempre la ruta absoluta real. Los scripts se corren con `node "<SKILL>/scripts/<script>.mjs"`.

Si algo falla porque falta Node, ffmpeg, el motor o la clave: seguir `INSTALACION.md`.

---

## Modo A · Aprender un estilo (una referencia)

El usuario pasa un reel que le gusta (un archivo, o el link si tiene cómo bajarlo).

1. Medirlo: `node "<SKILL>/scripts/medir-referencia.mjs" <video> <nombre-corto>`
2. Abrir `medidas.md` y **mirar las hojas** (`hoja-01.jpg`…): cada cuadro es medio segundo. Completar
   la sección "Lo que se ve": subtítulos (fuente parecida, tamaño, color, posición, palabras por
   línea, si resalta), planos, zooms, hook, CTA, extras.
3. Mostrarle al usuario lo medido en 6-8 líneas y **preguntarle qué le gusta de este reel**. No
   copiar todo: copiar lo que él dice que le gusta. Si dice "todo", repreguntar qué es lo primero que
   le llamó la atención.
4. Escribir en `estilo.md`:
   - en "Mis referencias", el nombre del reel y qué le gusta, con sus palabras;
   - en la sección que corresponda, la regla en criollo ("subtítulos de dos palabras, amarillos");
   - en el bloque json, los números que cambian (tamaño, color, posición, zoom, silencio).
5. Si hay más de una referencia y se contradicen, preguntar cuál manda en eso. Nunca promediar.

Medir es contar: lo que dice `medidas.md` sale del script. Lo que no se pudo medir se escribe como
"a ojo", nunca como un número.

---

## Modo B · Editar una toma

1. **Carpeta.** Una carpeta por reel donde el usuario trabaje (`reels/AAAA-MM-DD_tema/`). Todo lo
   que use el reel (la toma, lo que va arriba) tiene que estar adentro.
2. **Preparar:** `node "<SKILL>/scripts/preparar.mjs" <toma> <carpeta>` → `toma.mp4` + `palabras.json`.
3. **Cortes:** `node "<SKILL>/scripts/proponer-cortes.mjs" <carpeta>` → `edicion.json` con los tramos
   sin silencios, cada uno con su texto.
4. **Sacar las tomas repetidas** leyendo el texto de los tramos (`criterio.md` §1): borrar los tramos
   de las versiones descartadas, recortar `in`/`out` si un tramo arranca con un pedazo repetido.
   Contarle al usuario qué sacó, en una lista corta.
5. **Planos y zooms.** Leer el texto que quedó frase por frase y decidir la función de cada una
   (hook, muestra, prueba, dolor, giro, CTA) con la tabla de `criterio.md` §2 y lo que diga
   `estilo.md`. Cada plano y cada zoom lleva `"por"` con el motivo. Si no hay material para arriba,
   preguntar si tiene una grabación de pantalla o una imagen; si no, todo cámara + zoom.
5b. **Motion graphics.** Donde una frase dice algo que se puede VER (una cifra, un crecimiento,
   una lista de pasos, el arranque de una sección), proponer un gráfico en `graficos` con su
   `"por"`, siguiendo la sección "Motion graphics" de `estilo.md`. Pocos y con motivo: un reel de
   30-60 s lleva 2 a 4, no uno por frase. No pisar dos gráficos ni poner zoom debajo de una placa.
6. **Hook y CTA:** `hook.texto` corto, con lo mismo que dice en los primeros segundos.
   `cta.texto` = la palabra clave, si el reel tiene una.
7. **Borrador y fotos:** `node "<SKILL>/scripts/render.mjs" <carpeta> --fotos 0.3,<cada cambio>,<cada zoom>`
   y MIRAR las fotos (`criterio.md` §6). Arreglar lo que esté mal antes de renderizar entero.
8. **Subtítulos:** leer el texto entero que quedó y corregir en `palabras.json` los nombres, marcas
   y números mal transcriptos.
9. **Render:** `node "<SKILL>/scripts/render.mjs" <carpeta>` → `reel-editado.mp4`. Leer los avisos que
   imprime (zoom en un conector, hook sin nada visual) y resolverlos.
10. **Entregar** con: la ruta del video, cuánto dura, qué se sacó, la lista de planos y zooms con su
    porqué, y una pregunta: **"¿qué no te gustó?"**.

### Cómo se escribe `edicion.json`

```json
{
  "toma": "toma.mp4",
  "segmentos": [{"n": 1, "in": 0.42, "out": 3.10, "texto": "..."}],
  "planos": [
    {"t": 0, "plano": "split", "broll": "pantalla.mp4", "por": "hook: el logo arriba"},
    {"cue": "y lo mejor", "plano": "cam", "por": "giro"},
    {"cue": "fijate acá", "plano": "broll", "broll": "pantalla.mp4", "por": "muestra la demo"}
  ],
  "zooms": [{"cue": "lo mejor es que", "por": "giro", "zoom": 1.15}],
  "graficos": [
    {"tipo": "cifra", "cue": "pasamos de cincuenta", "dur": 3, "valores": ["$50K", "$100K", "$200K"], "etiqueta": "Facturación", "por": "prueba: la cifra"},
    {"tipo": "pasos", "cue": "fueron cuatro cosas", "hasta": "y el crecimiento", "texto": "Las 4 claves",
     "items": [{"titulo": "Marketing", "icono": "megafono", "estrellas": 5}, {"titulo": "Ventas", "icono": "dinero"}], "por": "lista"},
    {"tipo": "crecimiento", "cue": "el crecimiento vino", "puntos": [1, 1.3, 2.4, 4.5], "etiqueta": "Crecimiento", "numeroFondo": "2026", "por": "muestra la subida"},
    {"tipo": "titulo", "cue": "la primera parte", "dur": 2.5, "texto": "La ventaja", "sub": "Parte 1", "por": "arranca sección"},
    {"tipo": "rotulo", "cue": "no fue magia", "dur": 1.5, "icono": "cruz", "texto": "No fue magia", "por": "giro"}
  ],
  "hook": {"texto": "Esto edita solo"},
  "cta": {"cue": "comentá", "texto": "\"EDITAR\""}
}
```

- `segmentos` están en segundos de la toma original. Todo lo demás está en el tiempo del video ya
  editado: con `cue` (la frase, tal como se dice) el script lo encuentra solo. Los `cue` de los planos
  se buscan en orden, uno después del otro.
- `plano`: `cam` (la cara sola), `split` (arriba lo que mostrás, abajo la cara), `broll` (lo que
  mostrás en pantalla completa, la voz sigue). `broll` es un video o una imagen dentro de la carpeta.
- Un zoom sin `dur` dura hasta el final de la frase. `zoom` sin valor usa el de `estilo.md`.
- `graficos`: arrancan en `cue` (o `t`) y duran `dur` segundos, o hasta que se dice `hasta`, o
  `graficos.duracion` de `estilo.md`. Los tipos:
  - `cifra`: tarjeta con `valores` que van cambiando (uno por tramo igual) y `etiqueta` arriba.
    Desenfoca la cámara atrás.
  - `crecimiento`: línea punteada que sube por `puntos`, con `etiqueta` y `numeroFondo` gigante.
    Desenfoca la cámara.
  - `pasos`: placa a pantalla completa con 2 a 5 `items` (`titulo`, `icono`, `estrellas`) unidos
    por una línea; `texto` opcional arriba. Tapa la cámara y apaga los subtítulos.
  - `titulo`: título de sección a pantalla completa (`texto`, `sub`). Tapa la cámara.
  - `rotulo`: cajita con `icono` y `texto` corto sobre la cámara, sin taparla.
  - Íconos: dinero, caja, persona, grafico, chat, megafono, engranaje, rayo, check, estrella,
    objetivo, cruz.
- Los colores, la fuente, el desenfoque y el brillo salen de `graficos` en `estilo.md`.
- Si Remotion no puede bajar su navegador (red cerrada), correr con
  `REMOTION_CHROME=/ruta/a/chrome node render.mjs ...`.

---

## Modo C · Una corrección (así se entrena)

Cada vez que el usuario dice algo que no le gustó:

1. Entender qué es exactamente. Si es vago ("está raro"), sacar la foto de ese segundo y preguntar.
2. **Escribirlo en `estilo.md` ANTES de tocar el reel:** la regla en la sección que corresponde, el
   número en el bloque json si es un número, y una línea en "Correcciones" (fecha · qué no le gustó ·
   qué regla quedó).
3. Recién ahí corregir el reel y volver a renderizar.

Arreglar el reel sin escribir la regla está prohibido: es lo que hace que la próxima edición vuelva
a salir igual. Si la corrección es solo para este reel ("acá no, pero en general sí"), anotarla en
el reel y no en `estilo.md`, y decirlo.

---

## Reglas

- `estilo.md` gana siempre. Lo que no está ahí, sale de `criterio.md`. Lo que no está en ninguno, se
  pregunta o se decide con la regla madre: si no se puede escribir el porqué, no va.
- Una toma = un reel = una carpeta. No mezclar.
- El video del usuario no se sube a ningún lado salvo el audio a la transcripción.
- La clave vive en el `.env` de esta carpeta: nunca pedirla ni mostrarla en el chat.
- Nunca entregar sin haber mirado las fotos del paso 7.
