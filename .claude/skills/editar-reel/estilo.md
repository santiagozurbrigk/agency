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
    "fuente": "Montserrat",
    "peso": 800,
    "tamano": 66,
    "color": "#FFFFFF",
    "resaltado": "#FFD400",
    "borde": "#000000",
    "grosorBorde": 8,
    "caja": null,
    "mayusculas": false,
    "palabrasPorLinea": 3,
    "sinPuntuacion": true,
    "posicionCam": 0.70,
    "posicionSplit": 0.50
  },
  "cortes": {
    "silencioMax": 0.35,
    "aireAntes": 0.08,
    "aireDespues": 0.12
  },
  "zoom": {
    "cuanto": 1.15,
    "origenY": 0.40
  },
  "hook": {
    "fuente": "Montserrat",
    "fondo": "#FFFFFF",
    "color": "#000000",
    "tamano": 60,
    "posicionY": 0.14,
    "duracion": 3
  },
  "cta": {
    "fuente": "Playfair Display",
    "tamano": 150,
    "color": "#FFFFFF",
    "posicionY": 0.25
  },
  "split": {
    "fondo": "#0B0B0F",
    "encuadreCam": 0.35,
    "ajusteBroll": "contain"
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

## Mis referencias

(Cada reel que te gusta y QUÉ te gusta de él, con tus palabras. Las medidas completas quedan en
`estilo/referencias/<nombre>/medidas.md`.)

- **guia-infoproductos** (video de YouTube de 31 min, "Guía definitiva para hacer +$100.000 USD en
  2026 con Infoproductos"). Le gusta: "los motion graphics y animaciones y estilo". Es horizontal y
  largo: de acá se copia la estética de los gráficos, no el ritmo ni el formato.

## Cómo corto

## Cuándo cambio de plano

## Cuándo hago zoom

## El hook

## Motion graphics

(De guia-infoproductos. Todo a ojo: el motor todavía no dibuja estos gráficos.)

- Paleta negro + rojo con brillo. Blanco solo para puntos y líneas finas. Nada de otros colores,
  salvo un verde puntual para un logro.
- Cuando hay un gráfico encima de la cámara, la cámara se desenfoca y se oscurece atrás.
- Números y cifras en tarjetas rojas con degradé y borde fino.
- Conceptos en placas sobre fondo negro con viñeta roja: tarjetas con íconos de línea unidas por
  una línea blanca con nodos, que aparecen de a una.
- Crecimiento = línea punteada roja que sube, con puntos blancos y una etiqueta con borde rojo.
- Títulos de sección: mayúsculas, sans muy gruesa, roja con glow.
- Las animaciones entran suave (deslizan y aparecen); nada rebota.

## Los subtítulos

## Lo que no quiero nunca

## Correcciones

(Una línea por corrección, la más nueva arriba: fecha · qué no te gustó · qué regla quedó escrita
y en qué sección.)
