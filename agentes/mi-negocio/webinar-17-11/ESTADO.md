# Estado del webinar 17/11 · leé esto primero

Resumen para retomar el trabajo sin haber estado en las conversaciones anteriores. Dice qué se decidió, qué está hecho, qué falta y qué tener en cuenta antes de pedirle algo a Claude. Actualizado al **30/10/2026**.

## Cómo trabajar con Claude en este repo

1. Abrí Claude Code en `proyectos/agency/agentes` y pedile que lea, en este orden: `CLAUDE.md`, `CONTEXTO.md`, `mi-negocio/webinar-17-11/ESTADO.md` (este archivo) y el archivo de la tarea que vas a hacer.
2. Reglas del repo (`CLAUDE.md`): no se edita nada dentro de `agentes/agentes/` ni `.claude/skills/` (lo pisa Limitless); todo lo que se genera va en `mi-negocio/`; `CONTEXTO.md` solo se edita si lo pide Santi.
3. Cada tarea tiene su agente (skill). Está en la columna «Agente» de `tareas.md`. Pedile a Claude que lo use: *«usá el agente `limitless-agente-copy` para…»*.
4. Forma de trabajo de Santi: Claude trabaja en una rama `claude/…`, mergea a `main` y pushea. El push a GitHub a veces lo bloquea el sistema de permisos; en ese caso, en el chat: `! cd C:/Users/santi/proyectos/agency/agentes && git push origin main`.
5. Todo el texto en español rioplatense, con voseo.

## La clase en una pantalla

| | |
| --- | --- |
| Quién | Manu Dominguez (Manu Domzz). Empresa: Génesis. Método: **B.A.S.E.** |
| Cuándo | **Martes 17/11/2026, 18 hs** (no 19 hs; lo confirmó Santi el 30/10) |
| Promesa | «Te voy a revelar cómo hago +270M/mes con el modelo de suscripciones sin depender del CPA ni de Meta.» |
| Los 3 entregables (iguales en todas las piezas) | 1. Cómo hago +270M/mes con el modelo de suscripciones. 2. Cómo escalar tu ecommerce a +100M/mes migrando tu modelo de compra única al modelo de suscripción. 3. Te regalo 3 de mis +30 sistemas de backend, operaciones e IA a elección para que copies y pegues en tu marca. |
| Enemigo | Los mentores que te enseñan a escalar compra única sin pensar a largo plazo ni en la marca. **Nunca se nombra a nadie.** |
| Oferta | Génesis 1:1, USD 6.000 (detalle en `CONTEXTO.md`). En el grupo y en los ads no se habla de precio ni de «programa». |
| Equipo | Santi, Mati y Manu. Manu graba. El reparto está en el tracker. |

## Las conclusiones que cambian cómo se hace todo

### Del primer webinar (19/10 y 24/10) · `../conclusiones-webinar-19-24-10/conclusiones.md`
- **Calificado** = invierte USD 100 por día o más en Meta. La métrica que manda en los ads es el **CPL calificado**.
- Winners: **D4_V3** (CPL calificado USD 27,01, 30% califica) y **D3_V6** (USD 31,10, 16% califica). Solo el 20% de los leads calificó; 151 dijeron «todavía no tengo marca».
- Se escala lo que dé menos de USD 30; se apaga el creativo que gasta USD 100 sin traer un calificado.

### De las llamadas de los clientes que más pagaron · `analisis-ventas-calificadas.md`
Herbora, Alan, Santi Núñez y Thiago Lopo (falta la de Andy Kette: el link que se pasó era el de Herbora).
- **El que paga no es solo el que ya tiene marca y pauta fuerte.** Núñez importa y Lopo vende en Mercado Libre; Lopo pagó el ticket más alto. `CONTEXTO.md` ya los incluye como «avatar ampliado» (30/10).
- Tres de los cuatro vienen quemados por otra mentoría. El enemigo está validado.
- El dolor que cierra es la **inestabilidad** («hace mucho que no tenemos un día bueno»), más que el CPA aislado. Nadie habló de miedo al ban.
- **La lista de creencias limitantes y los 9 ángulos nuevos (A a I) son la base de toda la nutrición** (ads de nutrición, mails, WhatsApp). Decisión de Santi del 30/10. A, C e I ya se usan en los ads de adquisición (N8, N9 y N2).
- **Herbora autorizó** que se cuente su caso (30/10). Es el único caso de tercero.

## Google Docs vigentes (02/11, segunda vuelta)

Los Docs son copias: si se cambia un .md, hay que volver a subirlo. Todos los anteriores quedaron obsoletos.

**Regla (02/11):** cuando Manu habla de una de sus marcas, en cualquier pieza, se usan sus números: facturación $275.225.343 (en la promesa, «más de 270 millones»), 3.943 suscriptores y 7,2% de cancelaciones. El «220 millones sin Meta» de D3_V6 pasó a 275 millones. En WhatsApp y YouTube la marca cliente es «una marca que trabaja conmigo», sin nombre ni producto, y la pizarra es el iPad.

| Pieza | Para Manu (grabar) | Completo (igual al .md) |
| --- | --- | --- |
| Ads de adquisición | [Guiones para grabar · v5, N1/N4/N8 detrás de escena](https://docs.google.com/document/d/1sCfgd94mjVFdkTI6TN0Jm0MAhuopwGbxxb8bpwmouGo/edit) | [Ads de adquisición · v4](https://docs.google.com/document/d/133-it-ioZNkiVu4RpexUcVVSHdFrqM4D4I8rxHKV83Y/edit) (falta subir v5 con el formato detrás de escena; el md local ya los tiene) |
| Ads de nutrición (sin fecha, con José como testimonio principal, 03/11) | [Guiones para grabar · v7](https://docs.google.com/document/d/1JJS0PY9RpGSYClk8eI6s-KzUVH4cphUm7qhh4m6v3G4/edit) | [Ads de nutrición · v6](https://docs.google.com/document/d/1lRvEdZokbQcBRhQ-zTFp7_QSrUyuFLGMjUDAFf-s9oU/edit) (todavía sin José; el v7 completo está en `ads-nutricion.md`) |
| Historias de IG del lanzamiento (05/11 al 20/11) | — | [Historias del lanzamiento](https://docs.google.com/document/d/1SU5sKJsl7Fmp41iT7d0wVnsOXdUrHKlpXbFFvlk17qU/edit) |
| VSL de la landing + video de la thank you | [Guiones para grabar](https://docs.google.com/document/d/1svX0gjmCQXpbWVaPl1AZ-bgUaAf3Nhk8NzIkQCbK6Gw/edit) | [VSL y thank you](https://docs.google.com/document/d/1EY_dtnBtwYbNsmy5ggZ7wENmYsNAZX1BSWl5BiTp0js/edit) (sin cambios en la segunda vuelta) |
| WhatsApp días 1 a 6 | — | [Contenido del grupo · v2](https://docs.google.com/document/d/1cFFWDFTfZJQU_4bEXuUSBmMf-AhomlHxiIvw6gaQw44/edit) |
| Funnel de YouTube (YT-1 y YT-9) | — | [Plan y guiones · v3](https://docs.google.com/document/d/1sOmPwq3InIxWxXxGtN8gIELALKfS6BPOL_SnZWU17sE/edit) |
| Perfil de Instagram (`../perfil-ig/optimizacion-perfil.md`) | — | [Optimización de perfil](https://docs.google.com/document/d/1m_Sv6sRd_74-NBhKt2lfY63RbC7AeZPvGXp3GMNSB0k/edit) |
| VSL oculto de YouTube, estructura en bullets (`../youtube/vsl-oculto-yt1.md`) | [Estructura YT-1](https://docs.google.com/document/d/1A8Ht-Q_DrmP34SJg1HbeCP_S8m-oWJd1y2hI8titUxc/edit) (Manu arma el guion con esto) | — |

## Estado de cada pieza

| Pieza | Archivo | Estado |
| --- | --- | --- |
| Narrativa y bonus | `contexto.md` | Hecho. |
| Tareas del lanzamiento | `tareas.md` + tracker | Cargadas. El estado real de cada tarea está en el tracker, no acá. |
| 18 guiones de ads de adquisición | `ads-adquisicion.md` | Hechos. N2, N8 y N9 se reescribieron el 30/10 con los ángulos nuevos. Hay una tabla de datos a confirmar con Manu al principio. |
| Google Docs de los ads de adquisición (01/11) | [completo para el equipo](https://docs.google.com/document/d/1QDbLSxEyBMnLx9DUKiYtpzbQ876St6TidIFIPrZVQvo/edit) · [guiones para que grabe Manu](https://docs.google.com/document/d/1FUg5xIdLvADErKRzYi-rZKGG9zthBCcq3AR3r0LTG_Q/edit) (fuente: `ads-adquisicion-guiones-manu.html`) | Al día con el .md: los 9 nuevos (D) con tono de amigo, sin productos nombrados, un look por video e iPad/monitor en vez de pizarra y fichas. A, B y C mantienen el texto de los winners para no romper la comparación. El Doc viejo ([Ads de adquisición · clase del 17/11](https://docs.google.com/document/d/1kOiR6hRm74WGMM0HV8ERJ8WCq6mMhVvzX6rspGLJ438/edit)) quedó obsoleto. |
| Análisis de ventas calificadas | `analisis-ventas-calificadas.md` | Hecho. |
| Calendario de nutrición por WhatsApp (estrategia) | `calendario-nutricion-whatsapp.md` | Hecho. 7 días, del mié 11/11 al mar 17/11. |
| Contenido de WhatsApp días 1 a 6 | `contenido-nutricion-dias-1-6.md` · [Google Doc solo con los mensajes](https://docs.google.com/document/d/12VzwU1pn0xkFe_REvCokagKKriSfpDSN5bDAH1tjPi0/edit) · [Google Doc completo, con guiones y notas](https://docs.google.com/document/d/19422YdmMFaexgW6TYUd_gUP2q77iX2WbJJD8hkDQxzk/edit) | **Pulido el 31/10** y alineado con los mails finales: la pieza exclusiva de cada día se entrega en el grupo, «Lucas» sin nombre de marca, números +280M / $30M / +3.500. Faltan: la cuenta del video del día 3, los links del roadmap y de los flujos, y el bonus en vivo. |
| Nutrición de WhatsApp (versión final) | `whatsapp-nutricion.md` · [Google Doc](https://docs.google.com/document/d/1x8CJHwV6ziyYEgWR0Y9JvwesD0hUlyMgsgLyypkocTI/edit) · sincronización con los mails en `sincronizacion-mails-whatsapp.md` | **Versión final de Santi (01/11).** Faltan: link de la clase, link de la replay, fecha de cierre y lugares. |
| Cruce del WhatsApp con el grupo de Naza | `mejoras-whatsapp-cruce-naza.md` · referencia en `../referencias/naza-grupo-whatsapp.md` | Hecho el 02/11. 17 propuestas; las más urgentes son del día de la clase: falta el «ya está abierto» con el link de aplicación y falta cómo pedir los 3 agentes. A decidir por Santi. |
| Funnel de YouTube | `../youtube/funnel-youtube.md` | Hecho el plan: mapa TOF/MOF/BOF de 10 videos, configuración del canal y los 2 videos pre-webinar (YT-1 y YT-9) guionados. Packaging modelado sobre los outliers que pasó Santi el 30/10. Mapa en Google Docs: [Funnel de YouTube · Mapa de 10 videos (packaging)](https://docs.google.com/document/d/1dHq5AJy5OnWu7hFFOD3wYpQDZZ6SECbMnCH-UqDObXw/edit) (el Doc anterior, sin packaging, quedó viejo). |
| Landing de registro (test A/B/C por `/clase`) | `../lanzamiento-19-10/optin/index.html` | Actualizada el 30/10: modo claro, martes 17/11 18 hs, promesa de +270M/mes, los 3 entregables y el regalo de 3 de los +30 sistemas. **Falta:** el VSL nuevo (el embed de vTurb sigue siendo el del 19/10) y confirmar los números (+280M, +3.600, +40%). La thank you ya está en modo claro, con la fecha y el regalo nuevos, pero el link del grupo de WhatsApp (`WHATSAPP_URL`) sigue siendo el del grupo viejo. |
| Guiones de los VSL de la landing (2) | `vsl-registro.md` | Hechos el 02/11 con `limitless-agente-vsl-registro`, sobre el VSL del 19/10. **VSL A** = el del 19/10 actualizado; **VSL B** = el mismo más un bloque de filtro («esto es para vos si ya vendés y pautás»), para probar si baja el CPL calificado. Manu graba A entero y el bloque extra en la misma toma. Falta confirmar los números y si el SDR escribe por WhatsApp. |
| Guion del video de la thank you | `vsl-thank-you.md` | Hecho el 02/11 con `limitless-guionista-typ`, sobre el del 19/10. Un solo paso (el grupo), con la Cuenta del CPA como gancho. **Falta:** el link nuevo del grupo en `thank-you.html`, el link de la Cuenta del CPA y qué recibe el que entra al grupo entre el 08 y el 10/11. |
| Ads de nutrición (13) | `ads-nutricion.md` · Google Docs (v3, 01/11): [completo para el equipo](https://docs.google.com/document/d/1sRripPZJYmY08_RvytcGGajliC5PKPXU9WR-oxTjBJ0/edit) · [guiones para que grabe Manu](https://docs.google.com/document/d/1bp7xUQBoDqJ8f7Ql1x_L9OHqFt3B0Cm9I02W6WCqrs4/edit) (fuente: `ads-nutricion-guiones-manu.html`). Los Docs son copias: si se cambia el .md, hay que actualizarlos. | Guiones hechos: 2 de promesa, 5 de caso (C4 y C5 son de José, el caso más fuerte), 5 de objeción y W1 (días buenos, ya fija), sobre las creencias y los ángulos de `analisis-ventas-calificadas.md`, con los testimonios del doc TESTIMONIOS. **Falta:** la tabla «Antes de grabar» (capturas, permisos, consentimiento de los padres de Carlitos, si cada captura de José es de un día y si José usa suscripción, el mes de los 220M). |
| Secuencias de historias de IG (ADQ-01, NUT-01, WEB-01, POST-02) | `historias-lanzamiento.md` | Hechas el 04/11 con los agentes de calendario y de secuencias de historias, en el formato del tablero de Naza: 3 de hype (05 a 07/11), el anuncio el 08/11, una por día hasta el 16/11, la escalera de 12 del día de la clase y el esqueleto del post-clase. Keyword ADENTRO. **Falta:** las capturas y grabaciones marcadas `[CARGAR]`, el link de registro, los permisos de los testimonios y los datos del post-clase (replay, CTA, lugares y cierre real). |
| Ads de reminder (4 piezas) | `ads-reminder.md` · [Google Doc final](https://docs.google.com/document/d/1TcTGZueyI3Cb2Vh1R1oLnec0A-iBJRw146ht7HtJcOw/edit) | **Listos para grabar y diseñar (01/11):** 2 videos, 2 imágenes y la campaña. Margen de Lucas y Santi 2,4%; el bonus son los 3 agentes a elección; la audiencia no tiene nombre. |
| Ads post-clase (2) | `ads-post-webinar.md` · [Google Doc final](https://docs.google.com/document/d/1nCWIuEvMJFTF-9EYR98ZZzUvIHf7OCF1EhGlVLDSdLQ/edit) | **Versión final de Santi (02/11).** Oferta, 10 lugares y cierre el sábado 21/11 cargados en `CONTEXTO.md`. Faltan los links (aplicación y replay). |
| Emails de nutrición (16) | `emails-nutricion.md` | **Versión final de Santi (31/10).** Confirmación + 6 días + escalera de 9. Antes de programar: regalos repetidos (flujo de retención en mails 0 y 4, simulador en mails 2 y 5), `[LINK CLASE]` en los mails 12 a 15, mail 14 sin terminar y errores de tipeo (lista en el archivo). |
| Resto (landing, VSL, thank you, B:52) | `tareas.md` | Ver el tracker. |
| Tracker de ventas y tareas | `../ventas/sistema-de-tracking/app/` | Funcionando en Vercel. Tests: `node test/flujo.test.js` (tiene que dar «Todo verde ✓»). |

## Datos pendientes (no inventar: preguntar)

| Dato | Dónde impacta | Estado |
| --- | --- | --- |
| **Números de Manu** | Todos los guiones, la landing y los Docs. | **Confirmados por Santi el 02/11 y ya reemplazados:** facturación **$275.225.343 por mes** (en la promesa se dice «más de 270 millones»; en los winners de D4_V3, «275 millones el mes pasado»), **3.943 suscriptores activos** y **7,2% de cancelaciones**. **Siguen a definir:** el margen (`X%`; los ads dicen «más de un 40%») y la facturación con compra única (`$Y` / 60M). `CONTEXTO.md` todavía guarda el dato de septiembre (156,8M, 2.200 suscriptores, 1,28%): solo se cambia si lo pide Santi. |
| Link de la Cuenta del CPA (regalo del día 5 de WhatsApp) | `contenido-nutricion-dias-1-6.md`, donde dice `[LINK DE LA CUENTA DEL CPA]` | El regalo está confirmado; falta el link. |
| Período de los «casi dos palos de ganancia» de Herbora | Día 3 de WhatsApp | Confirmar con Manu si fue en un día o en otro período. |
| Link de la clase | WhatsApp día 7, reminders | Pendiente. |
| Quién maneja el grupo durante la clase, caso que se muestra, regalo que se anuncia, slide de precio | WhatsApp día 7 | Pendiente. |
| Datos de la tabla «Antes de grabar» de los ads | `ads-adquisicion.md` | Confirmar con Manu (incluye permiso de Lucas para el caso de los 400 clientes de N9: Herbora ya autorizó). |
| Llamada de Andy Kette | `analisis-ventas-calificadas.md` | Falta el link correcto de Fathom. |
| Mensajes reales de Manu a un grupo | Voz del contenido de WhatsApp | Si aparecen, pasar el contenido por esa voz antes de programar. |

## Inconsistencias conocidas

- `README.md` dice que la nutrición dura 5 días (12/11 al 16/11). El calendario de WhatsApp que se armó usa la estructura del agente: **7 días, del 11/11 al 17/11**. Si se quiere arrancar el 12, hay que comprimir los días 1 y 2.
## Reglas de copy que valen para todo

- Una pieza = un dolor + un ángulo + un CTA.
- No se spoilea la clase: se dice qué se lleva, nunca cómo. El Método B.A.S.E. se nombra, no se explica.
- Nunca se dice «webinar», «programa», «funnel» ni «lead». Se dice clase privada, en vivo y gratis.
- Mostrar > decir: todo número va con su captura. Sin captura no hay número. No inventar números, casos ni frases.
- **Guiones a cámara (01/11):** tono de amigo, sin palabras sofisticadas; **nunca se nombra un producto** (ni de clientes ni de Manu) **ni la marca de un cliente**; cada video con otra remera o buzo, con o sin auriculares y en otro lugar.
- **El único caso con suscripción es el de Manu (sus marcas).** Herbora y los testimonios del doc [TESTIMONIOS](https://docs.google.com/document/d/1voN9EdJ4hCxUEcVHasYcwvxcqyvL70k579-rLWFSRCI/edit) no la usan. Se usan como prueba de que «nos metemos en tu marca y los números se mueven», nunca al lado de «suscripción», «suscriptores», «recompra» ni «Método B.A.S.E.». Detalle en `ads-nutricion.md` → «la regla para no mentir». Decisión de Santi del 01/11.
- Iteraciones: cambian una sola variable por vez.
- Voz de Manu: voseo, cadena causal con el número entre guiones, remates secos («y ya está», «y listo», «al pedo»), «por ende», «literalmente». Nunca «ustedes», nunca lenguaje de gurú. Detalle en `CONTEXTO.md` → Voz y marca.
- En el grupo de WhatsApp el personaje emite y el grupo no conversa: todo va al privado de Manu, https://wa.link/ouqu06
