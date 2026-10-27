# Miro lector: que Claude entienda tus tableros de Miro

Le pasás a Claude el link de un tablero de Miro y lo entiende como lo ves vos:

- **Jerarquía:** frames, formas que agrupan cosas y lo que hay adentro.
- **Orden:** columnas, filas, grillas y en qué orden se lee.
- **Flujos:** qué flecha va a dónde y con qué texto.
- **Colores:** qué colores se usan y en qué.
- **Diseño:** una imagen de cada frame y, si se puede, capturas reales de Miro.

Funciona con **Claude Code** (terminal, app de escritorio o la extensión de VS Code).

## Instalación (una sola vez, ~5 minutos)

### 1. Copiar la skill

Copiá esta carpeta entera (`miro-lector`) a tu carpeta de skills personales:

- **Mac / Linux:** `~/.claude/skills/miro-lector`
- **Windows:** `C:\Users\TU_USUARIO\.claude\skills\miro-lector`

Si la carpeta `skills` no existe, creala. Tiene que quedar `.../skills/miro-lector/SKILL.md`.

> Si preferís que sea solo de un proyecto, copiala a `.claude/skills/miro-lector` dentro de ese proyecto.

### 2. Instalar Playwright (para las imágenes)

```bash
pip install playwright
```

Si tenés Google Chrome instalado, usa ese. Si no, corré también `python3 -m playwright install chromium`.

Sin Playwright igual funciona, pero Claude solo recibe el texto y la estructura, sin imágenes.

### 3. Conectar tu cuenta de Miro

1. Entrá a <https://miro.com/app/settings/user-profile/apps>.
2. Tocá **Create new app**. Si te pide crear un equipo de desarrollador, crealo (es gratis).
3. En la app, sección **Permissions**, tildá **boards:read**.
4. Tocá **Install app and get OAuth token** y elegí el equipo donde están tus tableros.
5. Copiá el token y corré en tu terminal:

```bash
python3 ~/.claude/skills/miro-lector/scripts/leer_tablero.py configurar
```

Pegá el token cuando te lo pida (no se ve mientras lo pegás). El script lo verifica y lo guarda en `~/.miro-lector/token`, solo en tu computadora.

> El token solo da acceso a los tableros del equipo donde instalaste la app. Si tenés tableros en otro equipo, repetí el paso 4 eligiendo ese equipo.

### 4. (Opcional) Capturas reales de Miro

Las imágenes que arma la skill reconstruyen el tablero con los datos de la API: posiciones, colores, flechas y textos. Si además querés capturas de Miro tal cual se ve (tipografías, íconos, dibujos), elegí una de estas opciones:

- Compartí el tablero como **"Anyone with the link → can view"**.
- O iniciá sesión una vez desde tu computadora. Se abre un navegador, entrás a Miro y apretás Enter:

```bash
python3 ~/.claude/skills/miro-lector/scripts/leer_tablero.py login
```

## Uso

En Claude Code, pegá el link y pedí lo que necesites:

> Analizá este tablero y decime cómo está armado el embudo: https://miro.com/app/board/uXjV.../

> Usá este tablero de Miro como contexto para escribir la secuencia de mails: https://miro.com/app/board/...

Claude corre la skill sola, lee el mapa, mira las imágenes y te responde.

También podés correr el script a mano:

```bash
python3 ~/.claude/skills/miro-lector/scripts/leer_tablero.py "LINK" --salida mi-tablero
```

Genera:

| Archivo | Qué es |
|---|---|
| `tablero.md` | El mapa: jerarquía, orden de lectura, flechas, grupos y colores |
| `capturas/general.png` | Todo el tablero reconstruido |
| `capturas/frame-XX-*.png` | Un frame por imagen, con los números de cada elemento |
| `capturas/reales/*.png` | Capturas de Miro tal cual se ve (si hay acceso) |
| `imagenes/` | Las imágenes que estaban pegadas en el tablero |
| `tablero.json` | Todos los datos, crudos y procesados |

## Compartirla

Pasá la carpeta `miro-lector` comprimida en un .zip. Cada persona sigue los pasos de instalación con **su propio** token. No compartas tu token: da acceso de lectura a tus tableros.

## Problemas comunes

| Mensaje | Qué hacer |
|---|---|
| "Falta el token de Miro" | Hacé el paso 3 |
| "Miro rechazó el token (401)" | El token venció o está mal copiado: volvé a correr `configurar` |
| "Sin permiso (403)" / "No encontré el tablero (404)" | El tablero es de un equipo donde no instalaste la app (paso 3.4), o el link está mal |
| "No hay capturas reales" | Normal si el tablero es privado. Hacé el paso 4 o ignoralo: las imágenes reconstruidas igual están |
| "No encontré un navegador" | Instalá Google Chrome o corré `python3 -m playwright install chromium` |

## Requisitos

- Python 3.8 o más nuevo.
- `playwright` (opcional, para las imágenes). No usa otras librerías.
