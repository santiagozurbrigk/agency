# Instrucciones para Claude Code en este repo

Este repo es la copia de los agentes de Limitless para tu negocio.

1. **Nunca edites ni crees archivos dentro de `agentes/` ni `.claude/skills/`.** Limitless los gestiona y los sobrescribe en cada `git pull upstream main`; cualquier cambio ahí se pierde. Si el usuario quiere modificar un agente, copiá ese `.md` a `mi-negocio/` y editá la copia ahí.
2. **Todo lo que generes** (el resultado de correr un agente, borradores, notas) guardalo dentro de `mi-negocio/`, no en la raíz del repo ni dentro de `agentes/`. Si no hay una carpeta clara para el tema, creá una nueva subcarpeta en `mi-negocio/`.
3. Si la sección **[COMPLETÁ ESTO]** de un agente está vacía, leé `CONTEXTO.md` primero; si falta el dato ahí, preguntaselo al usuario antes de asumir nada.
4. No edites `CONTEXTO.md` salvo que el usuario te lo pida explícitamente — es la fuente de verdad sobre su negocio.
