# Mi estilo de edición

> Este archivo es TU estilo. La skill lo lee antes de cada edición y le gana a `criterio.md`
> cuando dicen cosas distintas. Arranca casi vacío a propósito: se llena de dos maneras,
> mirando reels que te gustan (las referencias) y corrigiendo lo que no te gustó de cada edición.
> Lo podés abrir y cambiar a mano cuando quieras.

## Los números (esto es lo que lee el motor)

Cambiá los valores, no los nombres. Si rompés el formato, la skill te avisa.

```json
{
  "subtitulos": {
    "fuente": "Inter Tight",
    "peso": 800,
    "tamano": 66,
    "color": "#F2EDE4",
    "resaltado": "#F26A1B",
    "borde": "#0B0B0C",
    "grosorBorde": 8,
    "caja": null,
    "mayusculas": false,
    "palabrasPorLinea": 3,
    "sinPuntuacion": true,
    "posicionCam": 0.7,
    "posicionSplit": 0.5
  },
  "cortes": {
    "silencioMax": 0.35,
    "aireAntes": 0.08,
    "aireDespues": 0.12
  },
  "zoom": {
    "cuanto": 1.15,
    "origenY": 0.4
  },
  "hook": {
    "fuente": "Inter Tight",
    "fondo": "#0B0B0C",
    "color": "#F2EDE4",
    "tamano": 60,
    "posicionY": 0.14,
    "duracion": 3,
    "borde": "#F26A1B"
  },
  "cta": {
    "fuente": "Inter Tight",
    "tamano": 150,
    "color": "#F26A1B",
    "posicionY": 0.25
  },
  "split": {
    "fondo": "#0B0B0C",
    "encuadreCam": 0.35,
    "ajusteBroll": "contain"
  },
  "graficos": {
    "acento": "#F26A1B",
    "fondo": "#0B0B0C",
    "claro": "#F2EDE4",
    "fuente": "Inter Tight",
    "desenfoque": 18,
    "oscurecer": 0.45,
    "brillo": 0.6,
    "entrada": 0.45,
    "duracion": 3.5
  }
}
```

Qué es cada cosa:

- `subtitulos.fuente`: cualquier fuente de Google Fonts, escrita igual que en fonts.google.com.
- `resaltado`: el color de la palabra que se está diciendo. `null` para que no resalte.
- `caja`: un color de fondo detrás del subtítulo (por ejemplo `"#000000"`). `null` sin caja.
- `posicionCam` / `posicionSplit`: a qué altura va el subtítulo, de 0 (arriba) a 1 (abajo).
  En mitad y mitad conviene 0.50, justo en la costura.
- `cortes.silencioMax`: un silencio más largo que esto (en segundos) se corta.
- `aireAntes` / `aireDespues`: cuánto se deja antes y después de cada palabra para que el corte
  no se coma el principio o el final.
- `zoom.cuanto`: 1.15 es 15% más cerca. `origenY` es hacia dónde se acerca (0.40 = un poco
  arriba del centro, donde suele estar la cara).
- `split.encuadreCam`: qué parte de tu cara queda en la mitad de abajo (0 = la parte de arriba
  de la toma, 1 = la de abajo).
- `ajusteBroll`: `contain` muestra lo de arriba entero, `cover` lo recorta para llenar.
- `hook.borde`: color del borde de la caja del hook (con brillo). `null` para la caja redonda sin borde.
- `graficos`: los motion graphics. `acento` es el color que brilla (el naranja de Genesis),
  `fondo` el negro de las placas, `claro` el de los puntos, líneas y textos chicos.
  `desenfoque` (en píxeles) y `oscurecer` (0 a 1) son cuánto se apaga la cámara atrás de un
  gráfico. `brillo` (0 a 1) es cuánto glow tiene el acento. `entrada` es cuánto tarda en
  aparecer (segundos) y `duracion` cuánto dura un gráfico si no se dice otra cosa.

## Mis referencias

(Cada reel que te gusta y QUÉ te gusta de él, con tus palabras. Las medidas completas quedan en
`estilo/referencias/<nombre>/medidas.md`.)

- **guia-infoproductos** (video de YouTube de 31 min, "Guía definitiva para hacer +$100.000 USD en
  2026 con Infoproductos"). Le gusta: "los motion graphics y animaciones y estilo". Es horizontal y
  largo: de acá se copia la estética de los gráficos, no el ritmo ni el formato. La referencia es
  roja y negra, pero **se usa con la paleta de Genesis**: naranja #F26A1B, negro #0B0B0C y hueso
  #F2EDE4, con Inter Tight (la guía de estilo de la marca).

- **reel-ig-mg** (reel de Instagram De4XVvXPTWY, 35 s). Pidió "editá así, en este estilo de
  motion graphics" (23/11/2026). Se copia el armado: encabezado con caja + tarjeta-ventana arriba,
  cara abajo, subtítulos de 1 a 3 palabras con la clave en itálica serif. **Con el naranja de
  Genesis** (en vez del azul de la referencia) y **fondo claro como la referencia** (hueso
  #EEEAE3, tarjetas blancas, texto negro). Como las tomas de Manu tienen fondo negro, en mitad y
  mitad la cara va en un recuadro redondeado con borde naranja. Se edita con la composición `ReelMG` del motor (props a mano por reel).

## Cómo corto

## Cuándo cambio de plano

## Cuándo hago zoom

## El hook

## Motion graphics

(De guia-infoproductos, con la paleta de Genesis. Se piden en `edicion.json` → `graficos`.)

- Paleta negro + naranja Genesis con brillo. Hueso solo para puntos, líneas finas y textos
  chicos. Nada de otros colores.
- Cuando hay un gráfico encima de la cámara, la cámara se desenfoca y se oscurece atrás.
- Números y cifras en tarjetas rojas con degradé y borde fino.
- Conceptos en placas sobre fondo negro con viñeta roja: tarjetas con íconos de línea unidas por
  una línea blanca con nodos, que aparecen de a una.
- Crecimiento = línea punteada roja que sube, con puntos blancos y una etiqueta con borde rojo.
- Títulos de sección: mayúsculas, sans muy gruesa, roja con glow.
- Las animaciones entran suave (deslizan y aparecen); nada rebota. **Excepción (24/11/2026): en
  los reels con motion graphics para retención va "más dopamínico":** algo se mueve siempre
  (fondo vivo con puntos y manchas naranjas que derivan, barra de progreso arriba), cada cambio de
  plano entra con destello + golpe de zoom, las palabras entran con un pop chico, los números
  terminan en una explosión de partículas, y en los tramos a cámara de más de 2 s aparece algo
  encima (una pastilla, un sticker, un contador) para que nunca haya más de ~2 s sin una
  animación nueva. Todo con la paleta Genesis; el pop es corto (exceso de escala ≤ 15 %).
- (De reel-ig-mg) Formato por defecto: arriba encabezado (línea chica que se tipea + caja naranja
  con una palabra en itálica serif) y una tarjeta tipo ventana con borde naranja que brilla; abajo
  la cara (fondo claro, la cara en un recuadro redondeado con borde naranja). Lo que se dice se arma adentro de la tarjeta a medida que se dice (una fórmula pieza por
  pieza, barras, un contador, filas con ✓ ~ ✕). Alternar con la cara a pantalla completa en los
  momentos a cámara.
- Un gráfico va donde la frase dice algo que se puede VER: una cifra, un crecimiento, una lista
  de pasos, el arranque de una sección. Si no se puede escribir el porqué, no va.

## Los subtítulos

- Inter Tight, blancos hueso con borde negro, la palabra que se está diciendo en naranja Genesis.
- Se apagan mientras hay una placa a pantalla completa (pasos, título).
- (De reel-ig-mg) En los reels con motion graphics: 1 a 3 palabras, aparecen al decirse; las
  palabras clave van solas, en itálica serif naranja (Playfair Display) y más grandes.

## Música y sonidos

- (24/11/2026) Los reels con motion graphics llevan música: base electrónica/pop de ~120 BPM,
  bajita debajo de la voz (se agacha sola cuando Manu habla; la voz siempre manda). La música
  corta un instante antes de la cifra fuerte y vuelve con un golpe.
- Sonidos cortos sincronizados con lo que aparece: whoosh en cada cambio de plano, pop en cada
  pieza que entra, campanita en las notificaciones, tic en los contadores, caja registradora en
  la plata. Siempre por debajo de la voz.
- La música es generada para el reel (sin derechos de terceros). Si el usuario quiere un tema de
  tendencia, se lo pone él en Instagram al subir.

## Lo que no quiero nunca

## Correcciones

(Una línea por corrección, la más nueva arriba: fecha · qué no te gustó · qué regla quedó escrita
y en qué sección.)

- 24/11/2026 · "más animaciones y motion graphics así queda más dopamínico, mejora la retención y
  el espectador no se aburre, y metele música" · Motion graphics: excepción de ritmo para reels de
  retención (algo nuevo cada ~2 s, destellos, pops, partículas) · Música y sonidos: sección nueva.

- 23/11/2026 · "mantené el naranja pero usá el fondo claro como la referencia" · Motion graphics:
  fondo claro, tarjetas blancas, cara en recuadro redondeado; el CTA puede ir en una placa clara si
  la última toma no mira a cámara (Mis referencias / Motion graphics).
