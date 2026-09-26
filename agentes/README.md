# Agentes Limitless — Webinar Launchpad

Todos los agentes de las clases de tu plan (**22 agentes**), listos para usar. Cada uno es el prompt que se instala en la clase, ya extraído: no tenés que ir a buscarlo.

> Este repo es de uso exclusivo de clientes de Limitless. No lo compartas ni lo hagas público.

## Cómo usar un agente

**Opción A · Claude (claude.ai)**
1. Creá un proyecto nuevo en Claude con el nombre del agente.
2. Abrí el archivo del agente (`agentes/<módulo>/<agente>.md`) y pegá todo el contenido en las instrucciones del proyecto.
3. Completá la sección **[COMPLETÁ ESTO]** con los datos de tu negocio (podés copiarlos desde `CONTEXTO.md`) y pedile lo que dice la clase.

**Opción B · Claude Code**
1. Abrí esta carpeta en tu IDE con Claude Code.
2. Los agentes ya están cargados como skills en `.claude/skills/`. Pedile a Claude, por ejemplo: *"usá el agente de Análisis de investigación"*.
3. Si falta algo de la sección [COMPLETÁ ESTO], el agente te lo pregunta.

## Cómo recibir agentes nuevos

Este repo se actualiza solo cuando Limitless publica una clase con agente nuevo o cambia uno existente (ver `CHANGELOG.md`). Como lo copiaste como plantilla, para traer las novedades:

```bash
git remote add upstream <URL-del-repo-plantilla>   # solo la primera vez
git pull upstream main --allow-unrelated-histories
```

Regla para que no haya conflictos: **`agentes/` y `.claude/skills/` los maneja Limitless (no los edites). Todo lo tuyo va en `CONTEXTO.md` y en `mi-negocio/`.** Si querés modificar un agente, copialo a `mi-negocio/` y editá la copia.

## Índice

### M3 · Bases

| Agente | Clase | Prompt |
|---|---|---|
| Análisis de investigación | [Investigación externa a seguidores](https://campus-limitless-app.vercel.app/wiki-investigacion-externa.html) · [Investigación interna a clientes](https://campus-limitless-app.vercel.app/wiki-investigacion-interna.html) · [Cómo definir tu avatar](https://campus-limitless-app.vercel.app/wiki-definir-avatar.html) | [`analisis-investigacion.md`](agentes/M3-bases/analisis-investigacion.md) |
| Investigación de mercado | [Investigación de mercado](https://campus-limitless-app.vercel.app/wiki-research.html) | [`analista-research.md`](agentes/M3-bases/analista-research.md) |
| Arquitecto de Oferta | [Cómo definir tu oferta](https://campus-limitless-app.vercel.app/wiki-oferta.html) | [`arquitecto-oferta.md`](agentes/M3-bases/arquitecto-oferta.md) |
| Cómo crear tu producto | [Cómo crear tu producto](https://campus-limitless-app.vercel.app/wiki-producto-mvp.html) | [`arquitecto-producto-mvp.md`](agentes/M3-bases/arquitecto-producto-mvp.md) |
| Validación de oferta | [Validación de oferta](https://campus-limitless-app.vercel.app/wiki-validacion-bases.html) | [`diagnostico-validacion.md`](agentes/M3-bases/diagnostico-validacion.md) |

### M4 · Webinar orgánico

| Agente | Clase | Prompt |
|---|---|---|
| Mastering Copy | [Mastering Copy](https://campus-limitless-app.vercel.app/wiki-masterclass-copy.html) | [`agente-copy.md`](agentes/M4-webinar-organico/agente-copy.md) |
| Reels | [Reels](https://campus-limitless-app.vercel.app/wiki-reels.html) | [`agente-guiones-reels.md`](agentes/M4-webinar-organico/agente-guiones-reels.md) |
| Optimización de perfil | [Optimización de perfil](https://campus-limitless-app.vercel.app/wiki-optimizacion-perfil.html) | [`agente-optimizacion-perfil.md`](agentes/M4-webinar-organico/agente-optimizacion-perfil.md) |
| Plataforma para webinar | [Plataforma para webinar](https://campus-limitless-app.vercel.app/wiki-plataforma-webinar.html) | [`agente-sala.md`](agentes/M4-webinar-organico/agente-sala.md) |
| Historias | [Historias](https://campus-limitless-app.vercel.app/wiki-historias.html) | [`agente-secuencias-historias.md`](agentes/M4-webinar-organico/agente-secuencias-historias.md) |
| VSL de chat | [VSL de chat](https://campus-limitless-app.vercel.app/wiki-vsl-chat.html) | [`agente-vsl-chat.md`](agentes/M4-webinar-organico/agente-vsl-chat.md) |
| Narrativa y calendario | [Narrativa y calendario](https://campus-limitless-app.vercel.app/wiki-narrativa-calendario.html) | [`calendario-historias.md`](agentes/M4-webinar-organico/calendario-historias.md) |
| Calendario nutrición WhatsApp | [Calendario nutrición WhatsApp](https://campus-limitless-app.vercel.app/wiki-calendario-nutricion.html) | [`calendario-nutricion.md`](agentes/M4-webinar-organico/calendario-nutricion.md) |
| Cómo hacer un día de nutrición | [Cómo hacer un día de nutrición](https://campus-limitless-app.vercel.app/wiki-dia-nutricion.html) | [`contenido-dia-nutricion.md`](agentes/M4-webinar-organico/contenido-dia-nutricion.md) |
| Recordatorio WhatsApp | [Recordatorio WhatsApp](https://campus-limitless-app.vercel.app/wiki-reminders-wsp.html) | [`mensajes-dia-webinar.md`](agentes/M4-webinar-organico/mensajes-dia-webinar.md) |

### M5 · Webinar pago

| Agente | Clase | Prompt |
|---|---|---|
| Ads Reminder — Configuración | [Configuración](https://campus-limitless-app.vercel.app/wiki-ads-reminder-configuracion.html) | [`ads-reminder-configuracion.md`](agentes/M5-webinar-pago/ads-reminder-configuracion.md) |
| Ads Reminder — Copy | [Estrategia](https://campus-limitless-app.vercel.app/wiki-ads-reminder.html) | [`ads-reminder-copy.md`](agentes/M5-webinar-pago/ads-reminder-copy.md) |
| VSL Lanzamiento | [VSL Lanzamiento](https://campus-limitless-app.vercel.app/wiki-vsl-lanzamiento.html) | [`agente-vsl-registro.md`](agentes/M5-webinar-pago/agente-vsl-registro.md) |
| Ads de adquisición — Configuración | [Configuración](https://campus-limitless-app.vercel.app/wiki-ads-configuracion.html) | [`configurador-ads.md`](agentes/M5-webinar-pago/configurador-ads.md) |
| Crear una página de registro | [Crear una página de registro](https://campus-limitless-app.vercel.app/wiki-crear-optin.html) | [`constructor-optin.md`](agentes/M5-webinar-pago/constructor-optin.md) |
| Crear una thank you page | [Crear una thank you page](https://campus-limitless-app.vercel.app/wiki-crear-thank-you-page.html) | [`constructor-thank-you.md`](agentes/M5-webinar-pago/constructor-thank-you.md) |
| Video thank you page | [Video thank you page](https://campus-limitless-app.vercel.app/wiki-video-typ.html) | [`guionista-typ.md`](agentes/M5-webinar-pago/guionista-typ.md) |
