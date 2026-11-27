Tus archivos propios (agentes que modificaste, notas, outputs). Limitless nunca toca esta carpeta.

**Último lanzamiento: clase del martes 17/11/2026, 18 hs.** Para retomar el trabajo, leé [`lanzamientos/2026-11-17-webinar/ESTADO.md`](lanzamientos/2026-11-17-webinar/ESTADO.md).

## Mapa de la carpeta

| Carpeta | Qué va |
|---|---|
| [`bases/`](bases/) | **Las bases del negocio rearmadas con los 9 SOPs (19/11):** avatar, perfil, ecosistema de contenido, ventas → marketing, reels, historias, precio y vender sin vender. Empezar por su [README](bases/README.md). |
| [`teoria-sops/`](teoria-sops/) | La teoría: los 9 SOPs de la formación, transcritos completos. |
| [`negocio/`](negocio/) | Lo que no cambia de un lanzamiento a otro: brief de Génesis, marca personal, avatar, onboarding del equipo y recursos del campus. |
| [`agentes-propios/`](agentes-propios/) | Los agentes que armamos nosotros (los de Limitless están en `../agentes/`). |
| [`lanzamientos/`](lanzamientos/) | Una carpeta por lanzamiento, con fecha adelante y las mismas subcarpetas. Ver su [README](lanzamientos/README.md). |
| [`ventas/`](ventas/) | Guiones y manual de llamada, objeciones, proceso de ventas y el proyecto de Claude para recursos personalizados. |
| [`evergreen/`](evergreen/) | Piezas que viven fuera de un lanzamiento: VSL de chat, funnel de YouTube, perfil de Instagram. |
| [`referencias/`](referencias/) | Material de terceros que usamos de modelo (Naza). |
| [`testimonios/`](testimonios/) | Capturas de resultados de alumnos. |
| [`herramientas/`](herramientas/) | Skills y utilidades propias (Miro lector). |
| [`landing/`](landing/) | **La landing en producción (applygenesis.com):** registro, thank you, aplicación, replay y `/data`. Vercel la despliega desde esta carpeta (Root Directory `agentes/mi-negocio/landing`): no moverla sin cambiar eso en Vercel. Todo lo que está acá adentro es público; las notas van en el lanzamiento. |

## Agentes propios

| Agente | Qué hace | Prompt |
|---|---|---|
| Creador de webinars | Arma el deck completo del webinar (~95 slides, 90 min): hook, 3 terceras con 3 pitches, oferta, objeciones, time check y compliance. | [`creador-webinars.md`](agentes-propios/creador-webinars.md) |

Para usarlo en Claude Code: *"usá el agente de `mi-negocio/agentes-propios/creador-webinars.md`"*. Completa la CONFIGURACIÓN con `CONTEXTO.md` y `negocio/brief-genesis.md`.

## Herramientas

| Herramienta | Qué hace | Carpeta |
|---|---|---|
| Miro lector | Skill para que Claude entienda tableros de Miro completos: jerarquía, columnas, flechas, colores, imágenes y capturas. Se instala copiando la carpeta a `~/.claude/skills/` (ver su README). | [`herramientas/miro-lector/`](herramientas/miro-lector/) |

## Referencias

| Archivo | Qué es |
|---|---|
| [`referencias/funnel-hacking-mrbrandowner/`](referencias/funnel-hacking-mrbrandowner/) | Funnel hacking de Brandon van Mierlo (@mrbrandowner, MRR para ecom): 50 ads con guion, landing, VSL, aplicación, quiz oculto, webinar, productos y qué nos llevamos para Génesis. Board: https://claude.ai/artifact/NdwaEKFKYqvDr9evMSDfLR |
| [`referencias/naza-grupo-whatsapp.md`](referencias/naza-grupo-whatsapp.md) | Cómo maneja Naza Gamero su grupo de WhatsApp de lanzamiento: cómo escribe, la forma de cada tanda, la escalera del día de la clase, lo que enseña Limitless (7 toques del día del vivo) y qué tomar para Manu. Leerlo antes de armar cualquier nutrición de WhatsApp. |
