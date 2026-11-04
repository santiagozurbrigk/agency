---
name: miro-lector
description: Lee y entiende tableros de Miro completos (jerarquía de frames y contenedores, columnas y filas, flechas y flujos, grupos, colores, imágenes y el diseño visual) usando la API de Miro y capturas. Usala siempre que el usuario pase un link de miro.com/app/board o pida analizar, resumir, revisar o usar como contexto un tablero de Miro.
---

# Miro lector

Con esta skill entendés un tablero de Miro como lo ve una persona: qué hay, dónde está, qué contiene a qué, qué está conectado con qué y cómo se ve. No te quedes solo con el texto de los elementos.

El script `scripts/leer_tablero.py` (en la carpeta de esta skill) hace el trabajo pesado:

- trae todo el tablero por la API de Miro;
- reconstruye la jerarquía: frames, formas que encierran otros elementos (contenedores) y elementos;
- detecta columnas, filas y grillas;
- arma los recorridos de las flechas;
- dibuja una imagen por frame;
- si puede, saca capturas reales de Miro.

## Paso 1: correr el script

```bash
python3 <carpeta-de-esta-skill>/scripts/leer_tablero.py "LINK_DEL_TABLERO" --salida <carpeta>
```

- Para `--salida` usá una carpeta con sentido dentro del proyecto, por ejemplo `miro/<nombre-del-tablero>`. Si el proyecto tiene reglas sobre dónde guardar lo generado (un CLAUDE.md, por ejemplo), seguilas.
- Si el usuario solo quiere el contenido y el tablero es enorme, podés sumar `--sin-capturas-reales`, que es lo más lento.

**Si falla porque falta el token o el token no sirve:** no inventes el contenido del tablero. Explicale al usuario cómo sacar el token. Las instrucciones aparecen en el mensaje de error y en el README de esta skill: crear una app en Miro con el permiso `boards:read` e instalarla en su equipo. Después tiene dos opciones:

- **(recomendada)** correr él mismo, en su terminal, `python3 <carpeta>/scripts/leer_tablero.py configurar`. Así el token no queda en la conversación.
- pasarte el token. En ese caso corré `python3 <carpeta>/scripts/leer_tablero.py configurar --token TOKEN` y avisale que el token quedó escrito en el chat.

Si falta Playwright, el script igual genera `tablero.md` sin imágenes. Sugerile al usuario instalarlo con `pip install playwright` para tener las capturas.

## Paso 2: leer en este orden

1. **`tablero.md` completo.** Es el mapa:
   - cada elemento tiene un número (`e1`, `e2`…) en orden de lectura;
   - la sangría es la jerarquía;
   - _Disposición_ dice si los hijos forman columnas, filas o una grilla;
   - al final están las flechas (como recorridos), los grupos y los colores usados.
2. **`capturas/general.png`** (con la herramienta Read). Te da la forma del tablero entero: zonas, tamaños relativos, qué está lejos de qué.
3. **La imagen de cada frame**, `capturas/frame-XX-….png`. Los números `eN` dibujados en la imagen son los mismos del `.md`, así cruzás texto e imagen.
4. **Capturas reales** (`capturas/reales/…`), si existen. Son el diseño tal cual se ve en Miro, con tipografías, íconos, dibujos a mano y estilo.
5. **Imágenes pegadas en el tablero** (`imagenes/eN.png`), cuando sean relevantes para lo que pide el usuario. El `.md` indica qué elemento es cada una.
6. **`tablero.json`**, solo si necesitás un dato que no está en lo anterior: el texto completo de un elemento muy largo, coordenadas exactas o propiedades crudas de Miro.

Si el tablero es grande, no hace falta abrir todas las imágenes de entrada. Primero leé el `.md` y la vista general, y después abrí los frames que importan para la pregunta.

## Paso 3: interpretar

Antes de responder, armá en tu cabeza (o por escrito, si el usuario pidió un análisis):

- **Propósito:** qué es este tablero (embudo, mapa de procesos, brainstorming, roadmap, wireframes, mapa de cliente…).
- **Estructura:** las secciones (frames y contenedores), en qué orden se leen y qué rol cumple cada una.
- **Flujos:** qué recorridos marcan las flechas, dónde se bifurcan (los textos de las flechas suelen ser las condiciones) y si hay ciclos.
- **Código de colores:** usá la tabla del `.md` para inferir qué significa cada color, por ejemplo "rojo = problema". Presentalo como inferencia, no como hecho.
- **Diseño:** jerarquía visual, tamaños, lo que está destacado y lo que quedó suelto o sin terminar, según las capturas.
- **Huecos:** frames vacíos, notas sueltas fuera de los frames y flechas que no llevan a ningún lado.

Después respondé lo que el usuario pidió de verdad (resumen, crítica, plan, copiar la estructura a otro lado, etc.). Cuando cites algo del tablero, nombralo por su texto y su sección, por ejemplo «"Mensaje 2" en la columna MOFU». Los números `eN` no le dicen nada al usuario.

## Límites

- La jerarquía por contención es una inferencia geométrica: si una nota está encima de una forma, se toma como "dentro". Si la imagen muestra otra cosa, gana la imagen.
- Las capturas reconstruidas no copian tipografías, íconos ni dibujos a mano. Para eso están las capturas reales.
- Las capturas reales solo salen si el tablero se puede ver sin iniciar sesión ("cualquiera con el link puede ver") o si el usuario corrió `leer_tablero.py login` una vez en su computadora.
- La API no expone algunos tipos de Miro, como tablas, Docs y Slides. Si las capturas muestran contenido que no está en el `.md`, decíselo al usuario.
