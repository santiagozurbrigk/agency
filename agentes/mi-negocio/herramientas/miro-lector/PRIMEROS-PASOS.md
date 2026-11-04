# Probar Miro lector desde cero

Esta guía es para alguien que nunca usó Claude Code ni la terminal. Toma unos 20 minutos la primera vez. Después, usarla es pegar un link.

**Qué necesitás:**
- una cuenta paga de Claude (Pro o Max);
- una cuenta de Miro;
- el archivo `miro-lector.zip`.

---

## Paso 1. Abrir la terminal

La terminal es una ventana donde se escriben comandos. Copiá cada comando de esta guía, pegalo y apretá **Enter**.

- **Mac:** apretá `Cmd + Espacio`, escribí **Terminal** y Enter.
- **Windows:** tocá Inicio, escribí **PowerShell** y abrilo.

## Paso 2. Instalar Claude Code

Si ya lo tenés, saltá al paso 3.

- **Mac:**
  ```
  curl -fsSL https://claude.ai/install.sh | bash
  ```
- **Windows (PowerShell):**
  ```
  irm https://claude.ai/install.ps1 | iex
  ```

Cerrá la terminal y abrila de nuevo. Escribí `claude` y Enter. La primera vez te pide iniciar sesión con tu cuenta de Claude: seguí lo que dice la pantalla. Para salir de Claude, escribí `/exit`.

## Paso 3. Tener Python

Python es lo que ejecuta la herramienta. Fijate si ya lo tenés:

- **Mac:** `python3 --version`
- **Windows:** `python --version`

Si aparece algo como `Python 3.12.1`, ya está. Si da error, bajalo de <https://www.python.org/downloads/> e instalalo.

> **En Windows:** en la primera pantalla del instalador, tildá la casilla **"Add python.exe to PATH"**. Si te la salteaste, desinstalalo e instalalo de nuevo tildándola.

Después cerrá la terminal, abrila de nuevo y repetí el comando para confirmar.

## Paso 4. Instalar la skill

Hay dos formas. Elegí una.

### Forma fácil: que lo haga Claude

1. Dejá `miro-lector.zip` en tu carpeta de Descargas.
2. En la terminal escribí `claude` y Enter.
3. Pegale esto:

   > Instalá la skill que está en Descargas/miro-lector.zip: descomprimila en mi carpeta de skills personales (~/.claude/skills/miro-lector, que adentro quede directamente el SKILL.md) e instalá Playwright con pip. Si no tengo Google Chrome, instalá también el Chromium de Playwright.

4. Cuando Claude pida permiso para ejecutar algo, aceptá.
5. Cuando termine, escribí `/exit`.

### Forma manual

1. Descomprimí el zip. Queda una carpeta `miro-lector`.
2. Movela a tu carpeta de skills:
   - **Mac:** en la terminal corré `mkdir -p ~/.claude/skills && open ~/.claude/skills`. Se abre una carpeta: arrastrá `miro-lector` adentro.
   - **Windows:** en el Explorador de archivos, pegá `%USERPROFILE%\.claude` en la barra de direcciones. Creá adentro una carpeta `skills` (si no existe) y poné `miro-lector` dentro de esa.
3. Revisá que quede `skills/miro-lector/SKILL.md`. Ojo con que no quede `miro-lector/miro-lector/`.
4. Instalá Playwright (sirve para las imágenes):
   - **Mac:** `python3 -m pip install playwright`
   - **Windows:** `python -m pip install playwright`
5. Si **no** tenés Google Chrome instalado, corré también:
   - **Mac:** `python3 -m playwright install chromium`
   - **Windows:** `python -m playwright install chromium`

## Paso 5. Conectar tu Miro

Esto le da permiso a la herramienta para **leer** tus tableros. No puede modificarlos.

1. Entrá a <https://miro.com/app/settings/user-profile/apps> con tu cuenta de Miro.
2. Tocá **Create new app**. Ponele cualquier nombre, por ejemplo "Claude". Si te pide crear un "Developer team", crealo: es gratis.
3. En la página de la app, bajá hasta **Permissions** y tildá **boards:read**.
4. Tocá **Install app and get OAuth token**. Elegí el equipo donde están tus tableros y confirmá.
5. Aparece un código largo: es tu **token**. Copialo.
6. En la terminal corré:
   - **Mac:** `python3 ~/.claude/skills/miro-lector/scripts/leer_tablero.py configurar`
   - **Windows:** `python $HOME\.claude\skills\miro-lector\scripts\leer_tablero.py configurar`
7. Pegá el token y apretá Enter. **No se ve mientras lo pegás; es normal.**
8. Si dice **"Listo: token verificado y guardado"**, ya está conectado.

> El token es como una contraseña: no lo compartas ni lo mandes por chat.

## Paso 6. Armar un tablero de prueba

Para la primera prueba conviene un tablero chico donde sepas qué hay. En Miro creá un tablero nuevo y poné:

- un **frame** (tecla `F`) llamado "Embudo";
- dentro, tres **rectángulos** uno al lado del otro, con los textos "Atraer", "Convencer" y "Vender";
- dentro de cada rectángulo, dos o tres **notas adhesivas** (tecla `N`), de colores distintos;
- **flechas** (tecla `L`) de un rectángulo al siguiente, y una con texto, por ejemplo "si compra".

Copiá el link del tablero: es la dirección que aparece arriba en el navegador (`https://miro.com/app/board/...`).

## Paso 7. Probarlo

1. Creá una carpeta para la prueba y abrí Claude ahí:
   - **Mac:** `mkdir -p ~/prueba-miro && cd ~/prueba-miro && claude`
   - **Windows:** `mkdir $HOME\prueba-miro; cd $HOME\prueba-miro; claude`
2. Pegale:

   > Analizá este tablero de Miro y explicame cómo está armado: (pegá acá el link)

3. Claude va a pedir permiso para ejecutar la herramienta: aceptá. Tarda entre unos segundos y un par de minutos.
4. **Qué deberías ver:**
   - Claude te explica el tablero con sus secciones en orden ("Atraer → Convencer → Vender"), qué notas hay en cada una, qué flechas las unen y qué podrían significar los colores.
   - En `prueba-miro` aparece una carpeta con:
     - `tablero.md`: el mapa del tablero, se abre con cualquier editor;
     - `capturas/`: imágenes del tablero.

Si eso funciona, ya está. Desde ahora pegale a Claude el link de cualquier tablero y pedile lo que necesites: resumirlo, criticarlo, usarlo de contexto para escribir algo, pasarlo a un documento, etc.

## Paso 8 (opcional). Capturas reales de Miro

La herramienta siempre dibuja una imagen del tablero con los datos de Miro. Si además querés capturas idénticas a lo que ves en pantalla, elegí una:

- En Miro tocá **Share** y poné **Anyone with the link → Can view**.
- O corré esto una vez. Se abre un navegador, iniciás sesión en Miro, volvés a la terminal y apretás Enter:
  - **Mac:** `python3 ~/.claude/skills/miro-lector/scripts/leer_tablero.py login`
  - **Windows:** `python $HOME\.claude\skills\miro-lector\scripts\leer_tablero.py login`

---

## Si algo sale mal

| Qué pasa | Qué hacer |
|---|---|
| `command not found: claude` | Cerrá y abrí la terminal. Si sigue, repetí el paso 2. |
| `command not found: python3` o `python` | Instalá Python (paso 3). En Windows, tildá "Add python.exe to PATH". |
| Claude no usa la herramienta | Revisá que exista `~/.claude/skills/miro-lector/SKILL.md` (paso 4.3). Cerrá Claude con `/exit` y abrilo de nuevo. |
| "Falta el token de Miro" | Hacé el paso 5. |
| "Miro rechazó el token (401)" | Copiaste mal el token o venció. Repetí el paso 5 desde el punto 4. |
| "No encontré el tablero (404)" o "Sin permiso (403)" | El tablero es de otro equipo de Miro. Repetí el paso 5.4 eligiendo ese equipo. |
| "No hay capturas reales" | Es normal si el tablero es privado. Mirá el paso 8, o ignoralo: el resto funciona igual. |
| "No encontré un navegador" | Instalá Google Chrome, o corré el comando del paso 4.5. |

Si no lo podés resolver, pedíselo a Claude: *"intenté usar la skill miro-lector y me dio este error: (pegá el error)"*. Él lo revisa y te guía.
