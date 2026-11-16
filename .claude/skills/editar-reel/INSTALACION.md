# Instalación guiada — Skill "Editar reel"

> Claude: seguí estos pasos para instalar esta skill en la máquina del usuario. Puede ser una
> persona NO técnica: hablale simple, un paso a la vez, y confirmá antes de avanzar. Adaptá las
> rutas y comandos a su sistema (Windows o Mac). No muestres ni repitas su clave en el chat.

La skill necesita cuatro cosas: **Node** (corre los scripts), **ffmpeg** (prepara y mide los
videos), **el motor de Remotion** (arma el video) y **una clave de Groq** (transcribe, gratis).
Las tres primeras las instalás vos. La clave la saca él con tu guía.

## Paso 0 — Node instalado y andando (SIEMPRE primero)

**Esto lo verificás y lo resolvés vos, sin pedirle nada.** No le preguntes si tiene Node: no
tiene por qué saberlo. Corré vos:

```bash
node --version
```

**Regla dura: no avances hasta que esto conteste `v18` o más.**

> **Ojo:** Claude Code se puede instalar sin Node (instalación nativa). Que te esté hablando desde
> Claude Code **no** garantiza que tenga Node.

### Si falta, instalalo vos

Decile esto y esperá que te conteste, porque el sistema le puede pedir la contraseña:

> *"Antes de empezar te faltan un par de programas que necesita la skill. Te los instalo yo
> ahora, tarda unos minutos. Si te salta un cartel pidiendo la contraseña de tu computadora,
> ponela tranquilo, es para instalarlos."*

Corré, en este orden, hasta que uno funcione:

**Mac**

```bash
brew install node
```

```bash
curl -o /tmp/node.pkg https://nodejs.org/dist/v24.21.0/node-v24.21.0.pkg && open /tmp/node.pkg
```

**Windows**

```powershell
winget install OpenJS.NodeJS.LTS
```

```powershell
curl -o "$env:TEMP\node.msi" https://nodejs.org/dist/v24.21.0/node-v24.21.0-x64.msi ; Start-Process "$env:TEMP\node.msi"
```

Los dos últimos abren un instalador con ventana: decile que apriete siguiente hasta el final.

> Si algún link da 404, la versión cambió: mirá <https://nodejs.org/dist/index.json>, buscá la
> primera con `"lts"` y armá el link con ese número.

Si después de instalar `node --version` sigue sin contestar, probá `/usr/local/bin/node --version`
o `/opt/homebrew/bin/node --version`. Si alguna contesta, está instalado: **pedile que cierre
Claude Code y lo vuelva a abrir**, y retomás acá.

## Paso 1 — ffmpeg

Corré `ffmpeg -version`. Si contesta, seguí. Si no:

**Mac:** `brew install ffmpeg` (si no tiene Homebrew, instalalo primero con el comando de
<https://brew.sh> y avisale que le va a pedir la contraseña).

**Windows:** `winget install Gyan.FFmpeg`, y después pedile que cierre y abra Claude Code para que
aparezca en el `PATH`.

> Remotion trae su propio ffmpeg, pero no alcanza: le faltan los filtros que usa
> `medir-referencia.mjs`. Por eso se instala el del sistema.

## Paso 2 — Copiar la skill

1. Carpeta de skills de Claude Code:
   - Mac/Linux: `~/.claude/skills/`
   - Windows: `%USERPROFILE%\.claude\skills\`
   (creala si no existe).
2. Copiá TODA la carpeta `editar-reel` ahí dentro. Anotá la ruta absoluta final: es `<SKILL>` en
   el `SKILL.md`.

## Paso 3 — Instalar el motor (Remotion)

```bash
cd ~/.claude/skills/editar-reel/motor && npm install
```

Tarda uno o dos minutos y ocupa cerca de 1 GB (Remotion trae su propio navegador para dibujar
cada cuadro). Si termina sin `ERR!`, está.

> **Licencia de Remotion:** es gratis para personas y para empresas de hasta 3 empleados. Una
> agencia más grande necesita la licencia de empresa (remotion.pro). Contáselo en una línea.

## Paso 4 — La clave de Groq (transcribe, gratis)

Guialo por el chat:
1. Entrar a **https://console.groq.com** y crear cuenta (con Google es lo más rápido). No pide tarjeta.
2. Menú **API Keys** → **Create API Key** → ponerle un nombre → copiar la clave (empieza con
   **`gsk_`**). Se muestra una sola vez.

> Si ya instaló la skill de analizar competidores, **es la misma clave**: puede copiarla de esa
> carpeta o crear otra.

### Cargarla (NUNCA por el chat)

> **Regla que no se rompe:** la clave **no se pega en este chat**. Queda en el historial y se ve en
> pantalla. Hay un script que la pide de forma oculta.

Decile:

> *"Abrí la terminal y corré este comando. Te va a pedir la clave. Mientras la pegás no vas a ver
> nada en pantalla, está bien, es a propósito."*

```bash
# Mac / Linux
node ~/.claude/skills/editar-reel/configurar.mjs

# Windows (PowerShell)
node "$env:USERPROFILE\.claude\skills\editar-reel\configurar.mjs"
```

La terminal se abre con **Ctrl+\`**. El script verifica la clave contra Groq, escribe el `.env` con
permisos `600` y crea el `.gitignore`.

## Paso 5 — Probar que funciona

Con un video cualquiera de él hablando a cámara (alcanza con 20 segundos grabados con el celular):

```bash
mkdir -p ~/reels/prueba
node ~/.claude/skills/editar-reel/scripts/preparar.mjs <video> ~/reels/prueba
node ~/.claude/skills/editar-reel/scripts/proponer-cortes.mjs ~/reels/prueba
node ~/.claude/skills/editar-reel/scripts/render.mjs ~/reels/prueba --borrador
```

Tiene que quedar `~/reels/prueba/reel-borrador.mp4`. Abríselo. La primera vez el render tarda más
porque Remotion prepara su navegador.

## Paso 6 — Cerrar

Decile: *"cerrá y volvé a abrir Claude Code para que aparezca la skill. Lo primero que conviene
hacer es pasarle un reel que te guste: **mirá esta referencia, quiero editar así** y le pasás el
video. Después: **editá esta toma** y le pasás tu grabación."*

## Problemas comunes

| Error | Causa | Solución |
|---|---|---|
| `command not found: node` | No tiene Node | Paso 0 |
| `command not found: ffmpeg` / "falta ffmpeg" | No tiene ffmpeg o la terminal quedó vieja | Paso 1, y cerrar y abrir Claude Code |
| `Cannot find module 'remotion'` | No se corrió el `npm install` | Paso 3 |
| `401` de Groq | Clave mal pegada | Crear otra en console.groq.com y correr `configurar.mjs` |
| `413` de Groq | El audio pasa los 25 MB (toma de más de una hora) | Cortar la toma en partes |
| "no encontré la frase…" | Un `cue` de `edicion.json` no coincide con lo transcripto | Mirar en `palabras.json` cómo quedó escrita y copiarla igual |
| El render tarda varios minutos | Normal: dibuja cada cuadro | Usar `--borrador` mientras se prueba |
| `configurar.mjs` dice "necesita una terminal interactiva" | Se corrió desde el chat | Abrir la terminal (Ctrl+\`) y correrlo ahí |
