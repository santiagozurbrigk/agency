Tus archivos propios (agentes que modificaste, notas, outputs). Limitless nunca toca esta carpeta.

## Agentes propios

| Agente | Qué hace | Prompt |
|---|---|---|
| Creador de webinars | Arma el deck completo del webinar (~95 slides, 90 min): hook, 3 terceras con 3 pitches, oferta, objeciones, time check y compliance. | [`creador-webinars.md`](agentes/creador-webinars.md) |

Para usarlo en Claude Code: *"usá el agente de `mi-negocio/agentes/creador-webinars.md`"*. Completa la CONFIGURACIÓN con `CONTEXTO.md` y `brief-genesis.md`.

## Herramientas

| Herramienta | Qué hace | Carpeta |
|---|---|---|
| Miro lector | Skill para que Claude entienda tableros de Miro completos: jerarquía, columnas, flechas, colores, imágenes y capturas. Se instala copiando la carpeta a `~/.claude/skills/` (ver su README). | [`herramientas/miro-lector/`](herramientas/miro-lector/) |
