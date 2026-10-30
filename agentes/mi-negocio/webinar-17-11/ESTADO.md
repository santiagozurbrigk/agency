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
| Promesa | «Te voy a revelar cómo hago +280M/mes con el modelo de suscripciones sin depender del CPA ni de Meta.» |
| Los 3 entregables (iguales en todas las piezas) | 1. Cómo hago +280M/mes con el modelo de suscripciones. 2. Cómo escalar tu ecommerce a +100M/mes migrando tu modelo de compra única al modelo de suscripción. 3. Te regalo 3 de mis +30 sistemas de backend, operaciones e IA a elección para que copies y pegues en tu marca. |
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
- **El que paga no es solo el que ya tiene marca y pauta fuerte.** Núñez importa y Lopo vende en Mercado Libre; Lopo pagó el ticket más alto. Ojo: `CONTEXTO.md` todavía dice que el que vende solo en Mercado Libre no es avatar; esa definición está en revisión.
- Tres de los cuatro vienen quemados por otra mentoría. El enemigo está validado.
- El dolor que cierra es la **inestabilidad** («hace mucho que no tenemos un día bueno»), más que el CPA aislado. Nadie habló de miedo al ban.
- **La lista de creencias limitantes y los 9 ángulos nuevos (A a I) son la base de toda la nutrición** (ads de nutrición, mails, WhatsApp). Decisión de Santi del 30/10. A, C e I ya se usan en los ads de adquisición (N8, N9 y N2).
- **Herbora autorizó** que se cuente su caso (30/10). Es el único caso de tercero.

## Estado de cada pieza

| Pieza | Archivo | Estado |
| --- | --- | --- |
| Narrativa y bonus | `contexto.md` | Hecho. |
| Tareas del lanzamiento | `tareas.md` + tracker | Cargadas. El estado real de cada tarea está en el tracker, no acá. |
| 18 guiones de ads de adquisición | `ads-adquisicion.md` | Hechos. N2, N8 y N9 se reescribieron el 30/10 con los ángulos nuevos. Hay una tabla de datos a confirmar con Manu al principio. |
| Google Doc de los ads | [Ads de adquisición · clase del 17/11](https://docs.google.com/document/d/1kOiR6hRm74WGMM0HV8ERJ8WCq6mMhVvzX6rspGLJ438/edit) (Drive de santiagozurbrigkwork@gmail.com) | **Desactualizado:** tiene las versiones viejas de N2, N8 y N9. Para editarlo hace falta el conector de Google Docs, o crear uno nuevo. |
| Análisis de ventas calificadas | `analisis-ventas-calificadas.md` | Hecho. |
| Calendario de nutrición por WhatsApp (estrategia) | `calendario-nutricion-whatsapp.md` | Hecho. 7 días, del mié 11/11 al mar 17/11. |
| Contenido de WhatsApp días 1 a 6 | `contenido-nutricion-dias-1-6.md` | Hecho, con los números de Manu como `$X` (ver abajo). |
| WhatsApp día 7 (el día de la clase) | — | **Pendiente.** Agente: `limitless-mensajes-dia-webinar`. |
| Emails de nutrición (16) | `emails-nutricion.md` · [Google Doc v2](https://docs.google.com/document/d/1L3AYIE-jLrMxgrvYl-glPB1wOSRUQE8AGe_YgqC6fcE/edit) (Drive de genesisos.ecom@gmail.com; el [v1](https://docs.google.com/document/d/1mNeFgad-LBiGDg8r8s1CBgI8NmN9jGYqWoGlHaj0Hs8/edit) tiene la versión anterior) | Rehechos con la forma de los mails de ejemplo de Santi (confirmación + 6 + escalera de 9), con las creencias y ángulos de Fathom y sin nombres de otras marcas. Antes: 6 mails (días 1 a 6, uno por día del calendario) + escalera de 9 mails del día de la clase. Números de Manu como `$X`; faltan los links y confirmar si hay replay. |
| Ads de nutrición (10) | `ads-nutricion.md` | **Borrador a revisar.** Se escribieron con la estructura del SOP antes del calendario nuevo: usan los números de la campaña (+280M, +3.600) en vez de `$X`, los casos son solo de Manu (sin Herbora) y no salen de los 9 ángulos de `analisis-ventas-calificadas.md`. |
| Resto (historias, mails, landing, VSL, thank you, reminders, post-webinar, B:52) | `tareas.md` | Ver el tracker. |
| Tracker de ventas y tareas | `../ventas/sistema-de-tracking/app/` | Funcionando en Vercel. Tests: `node test/flujo.test.js` (tiene que dar «Todo verde ✓»). |

## Datos pendientes (no inventar: preguntar)

| Dato | Dónde impacta | Estado |
| --- | --- | --- |
| **Números de Manu** (facturación hoy, suscriptores, margen, facturación con compra única) | Contenido de WhatsApp (marcados `$X`, `X suscriptores`, `X%`, `$Y`) y ads (+280M, +3.600, +40%, 60M). `CONTEXTO.md` todavía dice 156,8M y 2.200 suscriptores. | A definir por Santi. Va el que tenga captura. Cuando se defina, reemplazar en todos los archivos a la vez. |
| Link de la Cuenta del CPA (regalo del día 5 de WhatsApp) | `contenido-nutricion-dias-1-6.md`, donde dice `[LINK DE LA CUENTA DEL CPA]` | El regalo está confirmado; falta el link. |
| Período de los «casi dos palos de ganancia» de Herbora | Día 3 de WhatsApp | Confirmar con Manu si fue en un día o en otro período. |
| Link de la clase | WhatsApp día 7, reminders | Pendiente. |
| Quién maneja el grupo durante la clase, caso que se muestra, regalo que se anuncia, slide de precio | WhatsApp día 7 | Pendiente. |
| Datos de la tabla «Antes de grabar» de los ads | `ads-adquisicion.md` | Confirmar con Manu (incluye permiso de Lucas para el caso de los 400 clientes de N9: Herbora ya autorizó). |
| Llamada de Andy Kette | `analisis-ventas-calificadas.md` | Falta el link correcto de Fathom. |
| Mensajes reales de Manu a un grupo | Voz del contenido de WhatsApp | Si aparecen, pasar el contenido por esa voz antes de programar. |

## Inconsistencias conocidas

- `README.md` dice que la nutrición dura 5 días (12/11 al 16/11). El calendario de WhatsApp que se armó usa la estructura del agente: **7 días, del 11/11 al 17/11**. Si se quiere arrancar el 12, hay que comprimir los días 1 y 2.
- `CONTEXTO.md` tiene los números viejos de Manu y excluye a los vendedores de Mercado Libre del avatar. No se tocó porque solo se edita si lo pide Santi.

## Reglas de copy que valen para todo

- Una pieza = un dolor + un ángulo + un CTA.
- No se spoilea la clase: se dice qué se lleva, nunca cómo. El Método B.A.S.E. se nombra, no se explica.
- Nunca se dice «webinar», «programa», «funnel» ni «lead». Se dice clase privada, en vivo y gratis.
- Mostrar > decir: todo número va con su captura. Sin captura no hay número. No inventar números, casos ni frases.
- Iteraciones: cambian una sola variable por vez.
- Voz de Manu: voseo, cadena causal con el número entre guiones, remates secos («y ya está», «y listo», «al pedo»), «por ende», «literalmente». Nunca «ustedes», nunca lenguaje de gurú. Detalle en `CONTEXTO.md` → Voz y marca.
- En el grupo de WhatsApp el personaje emite y el grupo no conversa: todo va al privado de Manu, https://wa.link/ouqu06
