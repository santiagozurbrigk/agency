# Script WhatsApp API — Clase privada del martes 17/11 · Capa 3 (carga en GHL)

Hecho con el agente `../../agentes/creador-flujos-wsp.md` (07/11/2026). Son los prompts para cargar el flujo de la capa 2 (`script-wsp-api-clase-17nov-V2-mensajes.md`) en GoHighLevel con **Claude en Chrome**.

## Cómo se usa

- **Dónde:** en Claude Cowork (recomendado para la carga larga) o en Claude Code con Claude en Chrome. En los dos casos Claude trabaja sobre tu Chrome, con tu sesión de GHL abierta.
- **Una conversación por prompt.** Al principio de cada una se pega el **Prompt 0** y debajo el prompt que toca.
- **Todo queda en borrador.** Ningún workflow se publica hasta que se haga la prueba con 3 números (Prompt 12).
- **Orden:** 1 → 2 (las plantillas primero, porque Meta tarda) → 3 → 12 (prueba del registro) → 4 a 9 → 10 → 11 → publicar.

| Prompt | Qué carga |
|---|---|
| 0 | Contexto (va al principio de todas las conversaciones) |
| 1 | Valores personalizados y tags |
| 2 | Las 17 plantillas, en 4 tandas |
| 3 | Workflow W01 · Registro |
| 4 | Workflow W02 · Nutrición (los 6 días en un solo workflow) |
| 5 a 9 | Los bloques de cada día dentro de W02 (D1 a D6) |
| 10 | Workflow W03 · Día de la clase |
| 11 | Workflow W04 · Post-clase y W05 · Respondió |
| 12 | Prueba con 3 números y publicación |

## Estado de la carga (07/11/2026)

- **Prompt 1, pasos 1 y 2: hecho a medias.** Los 17 valores personalizados `cl17_*` están creados (12 con el texto PENDIENTE). Los tags y las smart lists todavía no.
- **Prompt 2: hecho.** Las 17 plantillas están mandadas a Meta: 16 aprobadas y `cl17_post_mie_repeticion` pendiente.
- **Cambio de nombre:** la plantilla 15 se llamaba `cl17_post_mie_nopudo`. Meta la recibió, pero GHL no la sincronizó y no aparece en la lista, así que se volvió a crear como `cl17_post_mie_repeticion`. La vieja queda huérfana en Meta y no se usa.
- **Archivos de muestra:** `muestras/video_test_negro.mp4` y `muestras/foto_test_negro.jpg`. El video y la foto reales se eligen en cada workflow.
- **Prompt 3 (W01): armado en borrador.** Sin publicar.
- **Valores nuevos:** `cl17_video_i1` y `cl17_foto_i2` (los archivos del encabezado de I.1 e I.2) y `cl17_link_agendar` (el link de Google Calendar de los mails). Para poner el video y la foto reales de Manu alcanza con cambiar esos valores.

### Cómo quedó W01 distinto de este doc

- **Disparador:** tag `optin-17-11` agregado (lo pone el workflow del webhook de la landing), no un webhook propio.
- **No hay mensajes de texto libre en GHL.** Las acciones de WhatsApp de un workflow son: plantilla, interactivo con 1 a 3 botones, botón de link o archivo. Decisión de Santi: **los mensajes cortos se unen al siguiente y los links van en un botón «Ver…»**. Por eso:
  - «No lo encuentro» de I.2 → un solo mensaje con el botón «Ver los flujos».
  - I.5 → la línea del perfil y el roadmap van juntas, con el botón «Ver el roadmap».
  - I.6 → dos mensajes con botón: «Ver el simulador» y «Ver los flujos».
  - Noche → «Sí, lo vi» responde con el botón «Agendar la clase» (`cl17_link_agendar`); «Todavía no» con «Ver el roadmap».
- **«¿Es 17/11?»** se resuelve con «Current Day of month ≥ 17»; I.6 con «≥ 12». GHL no tiene condición de fecha completa.
- **Timeouts sin respuesta:** I.2 (24 h) e I.3 (24 h) → directo a W02. I.4 (2 h) → sigue igual a I.5.

### Cómo quedó W02 (distinto del Prompt 4)

Armar W02 en un solo workflow obligaba a unir con «Ir a» cada rama de cada botón antes del mensaje siguiente: unos 90 saltos. Por eso W02 se partió en dos niveles:

- **«cl17 · W02 · Nutrición» (columna, hecha en borrador):** sin disparador propio (entra desde W01). Solo esperas y «Añadir al flujo de trabajo», sin ramas. Para cada envío: «Esperar hasta fecha/hora» (D1 12:00, D1 19:30, D2 12:00 … D5 **11:00** …) → «Añadir al flujo» del bloque. Si la fecha ya pasó (el que se registra tarde), la espera tiene «Vaya a un paso específico» → la espera del envío siguiente. Al final → W03.
- **Un workflow por envío: «cl17 · W02 · D1A» … «D6A» (hechos) y «D1B» … «D6B» (hechos).** Cada A: ¿fuera de nutrición? → tag env → ¿ventana abierta? → abierta: pregunta interactiva; cerrada: si ya tiene `cl17-reactivacion-pendiente` → tag `cl17-fuera-nutricion`; si no → tag `cl17-reactivacion-pendiente` + plantilla del día. Los botones de la plantilla saltan con «Ir a» a las mismas ramas del interactivo.
- **Cada botón:** tags (respuesta + toco-) → **un solo mensaje con botón de link**: la respuesta del botón + el recurso, con el pie «Clase: martes 17, 18hs» (menos D6A, que no lo lleva).
- **Dos links en un recurso (D2 simulador + Loom, D4 flujos + Loom):** el principal va en el botón y el Loom queda escrito en el texto (`cl17_loom_simulador` / `cl17_loom_flujos`).
- **Timeout de las preguntas A:** 7 h (GHL no deja «hasta las 19:25»; la columna manda la B a las 19:30 igual).
- **Los B («D1B» … «D6B», hechos):** sin filtro de fuera de nutrición. Tag env → ¿ventana abierta? → abierta: pregunta interactiva (timeout 16 h); cerrada: termina. No llevan plantilla.
- **Fotos de los B por valor personalizado:** `cl17_foto_d1b`, `cl17_foto_d2b_hoy`, `cl17_foto_d4b`, `cl17_foto_d6b` (hoy todas con la foto de muestra). `cl17_foto_d2b_antes` no se usa: D2B une el antes y el después en **una sola imagen compuesta** (`cl17_foto_d2b_hoy`).
- **B sin link propio (D1B):** la respuesta va con el botón «Agendar la clase».
- **D3B:** respuesta + el video de la objeción en el mismo mensaje, botón «Ver el video» (`cl17_video_r5`), sin foto.
- **D4B:** respuesta + «Así está hoy mi panel» con la foto `cl17_foto_d4b` y el botón «Escribirle a Manu» (`cl17_link_manu`).
- **D5B:** 2 botones («Sí, ya lo usé» / «Todavía no»). Sí → «Escribirle a Manu»; Todavía no → «Abrir el simulador» (`cl17_link_simulador`).
- **D6B:** 1 botón «Sí, mandámelo» con la foto `cl17_foto_d6b` → tags `cl17-quiere-link` + `toco-d6b` → «Dale, mañana te lo paso por acá. Si querés, dejala agendada así no se te pasa:» con «Agendar la clase». **Ojo:** `cl17-quiere-link` es la lista para mandarle el link de la clase en W03.

### Cómo quedó W03 (distinto del Prompt 10)

- **Misma lógica que W02:** «cl17 · W03 · Día de la clase» es una columna de esperas (17/11 10:00, 12:00, 15:00, 17:00, 17:45, 17:55, 18:00, 18:05, 18:10, 18:15, 18:20, 18:25, 18:30 y 19:35) que mete al contacto en un workflow por envío («cl17 · W03 · D7-10», «D7-12», «D7-15», «1700», «1745», «1755» … «1830»). Cada espera, si ya pasó, salta a la siguiente. **Falta:** después de la espera de las 19:35, el «Añadir al flujo» de W04 (W04 todavía no existe).
- **Fotos por valor personalizado:** `cl17_foto_d7_1000`, `_1500`, `_1700`, `_1745`, `_1800`, `_1810`, `_1820`, `_1830` (hoy con la foto de muestra).
- **Cuenta regresiva:** cada envío es un botón «Entrar a la clase» (`cl17_link_clase`). Con la ventana cerrada solo salen las plantillas de 17:00, 17:45 y 18:00; el resto no se manda.
- **17:30 se unió a 17:45** (regla «unir»): «En 15 min arrancamos. Cerrá lo que tengas pendiente. Link para entrar 👇».
- **17:00 no lleva link:** va como pregunta de 1 botón («Ya estoy listo») con la foto.
- **Las respuestas de D7-10, D7-12 y D7-15 ya mandan el link de la clase** con el botón «Entrar a la clase» y el pie «Clase: hoy, 18hs» (antes decían «a las 17:45 te paso el link»; el D7-10 ya prometía mandarlo).
- **D7-10:** tags `cl17-confirma` / `cl17-tarde` + `toco-d7-10`. Con la ventana cerrada va la plantilla `cl17_d7_1000`; sus botones saltan con «Ir a» a las mismas ramas.
- **D7-12 y D7-15:** solo `toco-d7-12` / `toco-d7-15`.
- **Ya conectado a W04:** después de la espera de las 19:35, «→ W04 · Post-clase».

### Cómo quedó W04 (distinto del Prompt 11)

- **Misma lógica de columna:** «cl17 · W04 · Post-clase» (sin disparador, reingreso desactivado) arranca con el filtro (tag `aplico` o `cliente` → termina) y mete al contacto en un workflow por envío: «cl17 · W04 · POST», «MIE12 estuvo», «MIE12 repeticion», «MIE1930», «VIE20», «SAB21».
- **Esperas:** POST sale apenas entra (19:35). Después: 18/11 12:00 → If/Else por `cl17-estuvo` (sí → MIE12 estuvo; no → MIE12 repeticion, que salta con «Ir a» a la espera siguiente) → 18/11 19:30 → 20/11 12:00 → 21/11 12:00. Cada espera, si ya pasó, salta a la siguiente; la del sábado, si ya pasó, saca al contacto.
- **Tags `aplico` y `cliente`:** no existían; los creé. **Falta definir quién los pone** (la aplicación, el SDR o el cierre), si no el filtro nunca corta.
- **POST · «Sí, estuve»** → `cl17-estuvo` + `toco-post` → botón «Escribirle a Manu» (agradecimiento + los 3 agentes) y después botón «Aplicar a Génesis» (sale tanto si abre el link como si no).
- **POST · «No pude» (cambio):** en GHL no hay espera de respuesta libre dentro de un mensaje con botones, así que «Contame para qué lo aplicarías en tu marca» va con 3 botones: **Vender más / Mejorar margen / Otra cosa** (espera 15 h, hasta el miércoles 11:00). Cualquiera → `cl17-pidio-replay` → botón «Ver la repetición». **Revisar los textos de los botones.**
- **MIE12 estuvo y VIE20:** «Quiero aplicar» → `cl17-quiere` + toco → «Aplicar a Génesis»; «Tengo dudas» → `cl17-dudas` + toco → notificación a Manu + «Escribirle a Manu».
- **VIE20:** el link de aplicación no entra en un mensaje con botones de respuesta, así que el texto dice «tocá abajo» y el link sale cuando toca «Quiero aplicar». La plantilla `cl17_post_vie20` (ventana cerrada) sí lleva el link.
- **MIE12 repeticion:** «Sí, la vi» → `cl17-vio-replay` + toco → «Aplicar a Génesis»; «Todavía no» → toco → «Ver la repetición».
- **MIE1930 (solo ventana abierta):** «Sí, escribime» → `cl17-hablar` + toco → notificación a Manu + «Escribirle a Manu»; «Por ahora no» → toco → «De una. Si te surge algo me escribís por acá» con el botón a Manu.
- **Ventana cerrada:** plantillas `cl17_post_pudiste`, `cl17_post_mie_estuvo`, `cl17_post_mie_repeticion`, `cl17_post_vie20`, `cl17_post_sab21`; sus botones saltan con «Ir a» a las mismas ramas.

### Cómo quedó W05

- «cl17 · W05 · Respondió»: disparador «El cliente ha respondido», canal WhatsApp, con el tag `optin-17-11` → quita `cl17-reactivacion-pendiente`. Reingreso activado.
- **Filtro con `optin-17-11` y no `cl17-registrado`:** W01 ya arranca con `optin-17-11` (lo pone el webhook de la landing), así que W05 usa el mismo. `cl17-registrado` quedó creado pero sin uso.

## Cambios respecto de la capa 2

1. **La noche (B) solo sale si la ventana está abierta.** El que no tocó el mediodía ya recibió su plantilla de reactivación; no se le paga otra esa noche. Por eso no hay plantillas de las B.
2. **El martes 17, las de las 12:00 y las 15:00 también salen solo con la ventana abierta.** El de las 10:00 sí tiene plantilla: si el lead la toca, el resto del día sale gratis.
3. **Las preguntas arrancan con «Che [nombre],»** en el mensaje gratis y en la plantilla, para que el texto sea el mismo en los dos (Meta no deja el nombre al principio).
4. **Los links que todavía no existen van como valores personalizados.** Cuando aparezcan (la clase, la aplicación, la repetición, los videos de Manu) se cargan una vez en Configuración y todos los workflows los toman solos.
5. **La foto de I.2 es una sola imagen** con el asunto del mail y las 3 bandejas: una plantilla acepta un solo archivo de encabezado.

---

## Prompt 0 · Contexto (pegalo al principio de cada conversación)

```
Vas a cargar en GoHighLevel (GHL) un flujo de WhatsApp API para un lanzamiento. Trabajás en mi Chrome, con mi sesión de GHL abierta, en la subcuenta "Genesis OS". El número de WhatsApp es +1 555 498 9069 (ya conectado, nombre visible "Manuel Dominguez").

Reglas:
1. Usá los textos EXACTOS que te paso. No corrijas, no resumas, no agregues signos de apertura (¿ ¡) ni emojis.
2. No publiques ni actives nada. Todo workflow queda en borrador (Draft). No mandes mensajes a ningún contacto.
3. Si la interfaz no coincide con lo que te describo, o una acción no existe con ese nombre, frená y preguntame. No inventes un camino alternativo.
4. Antes de empezar, confirmá que la zona horaria de la subcuenta es America/Argentina/Buenos_Aires (Configuración > Perfil de empresa). Si no lo es, frená y avisame.
5. [nombre] en los textos = {{contact.first_name}}.
6. Prefijo de todo lo que crees: "cl17". Workflows dentro de una carpeta llamada "Clase 17-11 · WhatsApp API".
7. Al terminar, pasame una lista de lo que creaste y de lo que no pudiste hacer.

Cómo funciona la ventana de 24 hs:
- Si el contacto respondió en las últimas 24 hs, se le puede escribir gratis con un mensaje interactivo (con botones).
- Si no, solo con una plantilla aprobada (paga).
- Antes de cada envío que no es respuesta a un botón va la acción "Customer Service Window Check". Rama "abierta" → acción "Interactive Messages" (gratis). Rama "cerrada" → la plantilla que te indique (o nada, si te digo "solo con ventana abierta").

Cómo se arma un BLOQUE DE PREGUNTA (lo vas a ver muchas veces):
1. Acción "Add Tag": env-[código del bloque].
2. "Customer Service Window Check".
3. Rama abierta: "Interactive Messages" con el texto de la pregunta y los botones (respuesta rápida, máx. 3, el texto del botón exacto).
4. Una rama por botón. En cada rama: "Add Tag" con el tag del botón + "Add Tag" toco-[código]; después "Send WhatsApp message" con la primera línea de ese botón; después el mensaje del recurso (igual para todos los botones).
5. Si la acción de mensajes interactivos no crea ramas por botón, usá "Wait" → "Wait for contact reply" + "If/Else" por el texto de la respuesta. Si tampoco existe, frená y preguntame.
6. Rama sin respuesta (timeout): termina el bloque y el workflow sigue con el próximo paso.
```

---

## Prompt 1 · Valores personalizados y tags

```
Paso 1 · Valores personalizados (Configuración > Valores personalizados). Creá estos. Donde dice PENDIENTE, cargá literalmente el texto PENDIENTE (lo reemplazo yo cuando tenga el link):

cl17_link_grupo = https://chat.whatsapp.com/HBbSIYz620WJgSQp0ZuVDJ
cl17_link_roadmap = https://claude.ai/artifact/UWdokPpLb9w1SfZxjyrksQ?sk=3d0SiGnNdAxLPNaVG-ELHA
cl17_link_simulador = https://claude.ai/artifact/Da322JsJroGQQVhEQMDPHm?sk=M53fse_xVzsmn2nVJZzDCQ
cl17_link_flujos = https://claude.ai/artifact/DKfo3RdvAohQnNeRZJT1rh?sk=QQcZZBQAZC6GwJnOvBXs8A
cl17_link_manu = https://wa.link/ouqu06
cl17_link_clase = PENDIENTE
cl17_link_aplicacion = PENDIENTE
cl17_link_replay = PENDIENTE
cl17_lugares = PENDIENTE
cl17_video_r2 = PENDIENTE
cl17_loom_simulador = PENDIENTE
cl17_video_lucas = PENDIENTE
cl17_video_r4 = PENDIENTE
cl17_video_r5 = PENDIENTE
cl17_loom_flujos = PENDIENTE
cl17_video_r7 = PENDIENTE
cl17_video_r8 = PENDIENTE

Paso 2 · Tags (Configuración > Tags). Creá todos:

Estado: cl17-registrado, cl17-reactivacion-pendiente, cl17-fuera-nutricion, cl17-quiere-link, cl17-estuvo, cl17-no-pudo, cl17-pidio-replay, cl17-quiere, cl17-dudas, cl17-hablar, cl17-vio-replay, cl17-confirma, cl17-tarde
Registro: cl17-sin-mail, cl17-perfil-ya, cl17-perfil-nunca, cl17-perfil-probo, cl17-urg-mes, cl17-urg-1a3, cl17-urg-nose
Día 1: cl17-rec-nada, cl17-rec-algo, cl17-rec-nose, cl17-meta-nada, cl17-meta-mitad, cl17-meta-igual
Día 2: cl17-mg-nada, cl17-mg-bajo, cl17-mg-alto, cl17-dia-bueno, cl17-dia-semanas, cl17-dia-meses
Día 3: cl17-cpa-subio, cl17-cpa-igual, cl17-cpa-nose, cl17-cac-no, cl17-cac-dep, cl17-cac-ya
Día 4: cl17-obj-cultura, cl17-obj-bajas, cl17-obj-romper, cl17-ciclo-30, cl17-ciclo-60, cl17-ciclo-mas
Día 5: cl17-ltv-1, cl17-ltv-2a3, cl17-ltv-nose, cl17-sim-si, cl17-sim-no
Día 6: cl17-quiere-escalar, cl17-quiere-margen, cl17-quiere-sus
Medición (env = se mandó, toco = respondió): env-I1, toco-I1, env-I2, toco-I2, env-I3, toco-I3, env-I4, toco-I4, env-noche, toco-noche, y env-/toco- para D1A, D1B, D2A, D2B, D3A, D3B, D4A, D4B, D5A, D5B, D6A, D6B, D7-10, D7-12, D7-15, POST, MIE12, MIE1930, VIE20

Paso 3 · Smart lists (Contactos > Smart Lists), filtradas por tag:
"cl17 · Registrados" (cl17-registrado)
"cl17 · Prioridad" (cl17-perfil-ya O cl17-urg-mes)
"cl17 · Fuera de nutrición" (cl17-fuera-nutricion)
"cl17 · Estuvieron" (cl17-estuvo)
"cl17 · No pudieron" (cl17-no-pudo)
"cl17 · Dudas o hablar" (cl17-dudas O cl17-hablar)
```

---

## Prompt 2 · Plantillas (17, en 4 tandas)

Se cargan en GHL → Configuración → WhatsApp → Plantillas. Una conversación por tanda, siempre con el Prompt 0 arriba.

**Encabezado común de las 4 tandas:**

```
Creá estas plantillas de WhatsApp en Configuración > WhatsApp > Plantillas y mandalas a aprobación.
- Idioma: Spanish (ARG) / es_AR. Si no existe, Spanish / es.
- Categoría: Marketing.
- {{1}}, {{2}}… son variables. En "muestra" poné lo que te indico.
- Los botones son de respuesta rápida (Quick reply), con el texto exacto.
- Si una plantilla lleva imagen o video, subí como muestra cualquier archivo del tipo pedido (te lo paso yo o usá uno de prueba). El archivo real se elige después en cada workflow.
- Si Meta rechaza alguna, no la edites: anotá el motivo y seguí con la próxima.
- Al final, pasame el estado de cada una (En revisión / Aprobada / Rechazada).
```

### Tanda 1 · Registro y día 1 (4)

```
1) Nombre: cl17_i1_bienvenida
Encabezado: VIDEO (muestra: cualquier .mp4 de menos de 16 MB)
Cuerpo:
Buenas {{1}}, te grabé este video rápido para que entiendas cómo va a funcionar todo hasta la clase del martes 17 a las 18hs

Por las dudas si todavía NO te sumaste al grupo, te dejo el link acá:
https://chat.whatsapp.com/HBbSIYz620WJgSQp0ZuVDJ

Tipo:
el grupo es para todos, ahí suelto la data de cada día y el link de la clase
este chat es solo tuyo, acá te mando cosas según TU caso

Lo único: cada mensaje te llega con botones. Con que toques uno me alcanza para seguir mandándote cosas por acá, sin eso literalmente se me corta el chat

Arrancá con este 👇
Muestra {{1}}: Juan
Botón: Dale, entendido

2) Nombre: cl17_i2_mail
Encabezado: IMAGEN (muestra: cualquier .jpg)
Cuerpo:
Otra cosa, te acaba de llegar un mail mío con el asunto "Todavía NO estás adentro ⚠️"

Ojo que puede caer en principal, en promociones o en spam, te dejo la foto así lo encontrás

Respondelo con la palabra SUSCRIPCIÓN y te llega al toque el flujo de retención completo que uso en mi marca. Y de paso los mails de la semana te caen en principal y no se te pierden
Botones: Ya lo respondí | No lo encuentro

3) Nombre: cl17_d1a
Cuerpo:
Che {{1}}, una pregunta

De los clientes que te compraron el mes pasado, cuántos te volvieron a comprar este mes?
Muestra {{1}}: Juan
Botones: Casi ninguno | Algunos | No lo sé

4) Nombre: cl17_d2a
Cuerpo:
Che {{1}}, cuánto te deja cada venta hoy, después de pagar la pauta?
Muestra {{1}}: Juan
Botones: Casi nada | Menos del 15% | Más del 15%
```

### Tanda 2 · Días 3 a 6 (4)

```
5) Nombre: cl17_d3a
Cuerpo:
Che {{1}}, cuánto te cambió el CPA en el último año?
Muestra {{1}}: Juan
Botones: Me subió mucho | Más o menos igual | No lo tengo claro

6) Nombre: cl17_d4a
Cuerpo:
Che {{1}}, qué es lo que más te frena de la suscripción?
Muestra {{1}}: Juan
Botones: Nadie se suscribe | Se dan de baja | Romper lo que anda

7) Nombre: cl17_d5a
Cuerpo:
Che {{1}}, cuántas veces te compra el mismo cliente?
Muestra {{1}}: Juan
Botones: Una sola vez | 2 o 3 veces | No lo sé

8) Nombre: cl17_d6a
Cuerpo:
Che {{1}}, qué querés llevarte de la clase de mañana?
Muestra {{1}}: Juan
Botones: Escalar la pauta | Ordenar el margen | Armar suscripción
```

### Tanda 3 · Día de la clase (4)

```
9) Nombre: cl17_d7_1000
Encabezado: IMAGEN (muestra: cualquier .jpg)
Cuerpo:
Buen diaa {{1}}, hoy es el día

🇦🇷 18:00 · 🇺🇾 18:00 · 🇨🇱 18:00 · 🇨🇴 16:00 · 🇲🇽 15:00 · 🇪🇸 22:00

Te muestro en vivo:

✅ Cómo hago más de 270 millones por mes con suscripción
✅ Cómo escalar tu ecommerce a +100 millones por mes migrando de compra única a suscripción
✅ Mis números reales, sin filtro
✅ Los 3 agentes de IA de regalo para los que se quedan hasta el final

Vas a estar? Tocá uno y te mando el link por acá
Muestra {{1}}: Juan
Botones: Ahí estaré | Llego tarde

10) Nombre: cl17_d7_1700
Encabezado: IMAGEN (muestra: cualquier .jpg)
Cuerpo:
Falta 1 hora ⏰ ya estoy armando todo. Buscá un lugar tranquilo y algo para anotar. En un rato te paso el link

11) Nombre: cl17_d7_1745
Encabezado: IMAGEN (muestra: cualquier .jpg)
Cuerpo:
En 15 min arrancamos. Link para entrar:
{{1}}

Nos vemos adentro
Muestra {{1}}: https://zoom.us/j/123456789

12) Nombre: cl17_d7_1800
Encabezado: IMAGEN (muestra: cualquier .jpg)
Cuerpo:
🔴 Arrancamos. Entrá ahora:
{{1}}

Te espero adentro
Muestra {{1}}: https://zoom.us/j/123456789
```

### Tanda 4 · Post-clase (5)

```
13) Nombre: cl17_post_pudiste
Cuerpo:
Che {{1}}, pudiste estar en la clase?
Muestra {{1}}: Juan
Botones: Sí, estuve | No pude

14) Nombre: cl17_post_mie_estuvo
Cuerpo:
Che {{1}}, cómo te quedó la clase de ayer? Qué querés hacer?
Muestra {{1}}: Juan
Botones: Quiero aplicar | Tengo dudas

15) Nombre: cl17_post_mie_repeticion
Cuerpo:
Che {{1}}, pudiste ver la repetición?
Muestra {{1}}: Juan
Botones: Sí, la vi | Todavía no

16) Nombre: cl17_post_vie20
Cuerpo:
Che {{1}}, quedan {{2}} lugares para Génesis

Si querés entrar o ver si sirve para tu marca, aplicá acá:
{{3}}

Cualquier duda me escribís
Muestras: {{1}} Juan · {{2}} 4 · {{3}} https://applygenesis.com/aplicacion
Botones: Quiero aplicar | Tengo dudas

17) Nombre: cl17_post_sab21
Cuerpo:
Che {{1}}, hoy a la noche cierro los lugares de Génesis

Si querés entrar o simplemente ver si sirve para tu marca, es AHORA:
{{2}}

Después de hoy no hay más lugares
Muestras: {{1}} Juan · {{2}} https://applygenesis.com/aplicacion
```

> Las plantillas 9 a 17 nombran la clase del martes 17 o el cierre: no se reusan. Las 1 a 8 sí, cambiando solo la 1 (dice «martes 17 a las 18hs»).

---

## Prompt 3 · Workflow W01 · Registro

Antes de este prompt hay que saber **qué workflow recibe hoy el registro de la landing** (llega por un «Inbound Webhook» desde applygenesis.com, el mismo que dispara los mails). Ese workflow tiene que terminar con la acción «Add Tag: cl17-registrado». El prompt lo verifica.

```
Paso 0 · Buscá en Automatización > Workflows el workflow que tiene como disparador un "Inbound Webhook" y manda los mails de la clase del 17/11 (puede llamarse "Registro", "Optin 17-11" o parecido). No lo cambies todavía: decime cómo se llama, qué pasos tiene y si ya pone algún tag. Esperá mi OK.

Con mi OK: agregale al final la acción "Add Tag: cl17-registrado". Revisá también que el teléfono del contacto quede con el código de país (+54…). Si queda sin código, frená y avisame.

Paso 1 · Creá el workflow "cl17 · W01 · Registro" (borrador).
Disparador: "Contact Tag" → Tag Added = cl17-registrado.
Configuración: permitir reingreso = NO.

Paso 2 · Filtros de salida (al principio):
- If/Else: el contacto tiene alguno de estos tags: cliente, aplico → Remove from workflow (terminar).
- Remove from workflow: los workflows de WhatsApp de clases anteriores, si existen (buscá los que empiecen con "cl24" o "lz").

Paso 3 · I.1
- Add Tag: env-I1.
- Send WhatsApp template: cl17_i1_bienvenida. Video: el archivo de Manu (por ahora, el de prueba; lo cambio yo). Variable {{1}} = {{contact.first_name}}.
- Rama del botón "Dale, entendido": Add Tag toco-I1 → seguí al Paso 4 con I.2 como MENSAJE INTERACTIVO.
- Sin respuesta en 30 minutos: seguí al Paso 4 con I.2 como PLANTILLA (cl17_i2_mail).

Paso 4 · I.2 (con la imagen del asunto y las bandejas; archivo de prueba por ahora)
- Add Tag: env-I2.
- Interactivo (si vino del botón) o plantilla cl17_i2_mail (si no respondió). Texto (para el interactivo):
Otra cosa, te acaba de llegar un mail mío con el asunto "Todavía NO estás adentro ⚠️"

Ojo que puede caer en principal, en promociones o en spam, te dejo la foto así lo encontrás

Respondelo con la palabra SUSCRIPCIÓN y te llega al toque el flujo de retención completo que uso en mi marca. Y de paso los mails de la semana te caen en principal y no se te pierden
Botones: Ya lo respondí | No lo encuentro
- Rama "Ya lo respondí": Add Tag toco-I2 → mensaje: Buenisimo, ahí te llega
- Rama "No lo encuentro": Add Tags toco-I2 y cl17-sin-mail → mensaje:
Nada, te lo paso directo por acá así no lo andás buscando:
{{custom_values.cl17_link_flujos}}

Igual buscá el mail en promociones o spam y respondelo, así lo que te mando en la semana te cae en principal
- Sin respuesta en 24 hs: saltá al Paso 9 (pasar a la nutrición).

Paso 5 · Si la fecha actual es 17/11/2026 → saltá al Paso 9 (el que se registra el día de la clase no recibe las preguntas).

Paso 6 · I.3 (mensaje interactivo)
- Add Tag: env-I3.
- Texto:
Dos preguntas rápidas. Con lo que me respondas elijo qué mandarte a vos, no lo mismo que a todos

Dónde estás hoy con la suscripción?
Botones: Ya vendo suscripción | Nunca la probé | La probé, no anduvo
- Cada rama: Add Tag toco-I3 + el tag del perfil (cl17-perfil-ya / cl17-perfil-nunca / cl17-perfil-probo). Guardá en qué rama entró: lo usás en el Paso 8.

Paso 7 · I.4 (interactivo)
- Add Tag: env-I4.
- Texto: Y cuándo te gustaría tenerla andando en tu marca?
Botones: Este mes | En 1 a 3 meses | No sé todavía
- Cada rama: Add Tag toco-I4 + cl17-urg-mes / cl17-urg-1a3 / cl17-urg-nose → mensaje: Dale, anotado

Paso 8 · I.5 (sin botones). Primero la primera línea según el perfil (If/Else por tag):
- cl17-perfil-ya: Bien. Lo que si, tener suscripción no es lo mismo que tener una base que te cobra sola todos los meses. Ahí está la diferencia
- cl17-perfil-nunca: Yo también pensaba que en Argentina no se suscribe nadie. Hoy tengo 3.943 suscriptores activos
- cl17-perfil-probo: Casi siempre no anda por cómo se armó (el precio, el ciclo, a quién se la ofreciste), no porque la gente no se suscriba
Después, para todos:
Te dejo el roadmap que seguí para pasar mi marca de compra única a suscripción. Es lo primero que tenés que ver antes del martes

{{custom_values.cl17_link_roadmap}}

Paso 8b · I.6 · solo si la fecha actual es 12/11/2026 o posterior:
Y como entraste con la semana arrancada, te dejo lo que ya pasé en el grupo y no vas a ver:

🎁 Mi simulador de suscripciones: cargás tus números y ves cuánto ganarías con suscripción contra lo que ganás hoy
{{custom_values.cl17_link_simulador}}

🎁 Los flujos de retención de email y WhatsApp que uso en mi marca
{{custom_values.cl17_link_flujos}}

Paso 8c · Noche · solo si la hora actual es antes de las 19:30:
- Wait hasta las 19:30 de hoy.
- Add Tag env-noche. Customer Service Window Check → solo con ventana abierta (cerrada: no mandar nada).
- Interactivo: Pudiste pegarle una mirada al roadmap?
Botones: Sí, lo vi | Todavía no
- "Sí, lo vi": Add Tag toco-noche → Buenisimo amigo. El martes a las 18 te muestro cómo se aplica con números reales
- "Todavía no": Add Tag toco-noche → Dale dale, cuando tengas 5 min. Te lo dejo de nuevo así no lo buscás: {{custom_values.cl17_link_roadmap}}

Paso 9 · Si la fecha actual es 17/11/2026: "Add to workflow: cl17 · W03 · Día de la clase". Si no: "Add to workflow: cl17 · W02 · Nutrición". (Si esos workflows todavía no existen, dejá la acción preparada y avisame.)
```

---

## Prompt 4 · Workflow W02 · Nutrición (la estructura)

```
Creá el workflow "cl17 · W02 · Nutrición" (borrador). Disparador: ninguno (los contactos entran desde W01 con "Add to workflow"). Reingreso: NO.

Son 6 bloques de día, uno detrás del otro: D1 (miércoles 11/11), D2 (12/11), D3 (13/11), D4 (14/11), D5 (15/11), D6 (16/11). Al final: "Add to workflow: cl17 · W03 · Día de la clase".

Cada bloque de día tiene esta forma (los textos te los paso en los prompts que siguen, uno por día):

1. If/Else "¿la hora actual es antes de [día] [hora del A]?" (el A es a las 12:00, salvo el D5, que es a las 11:00).
   - NO → saltá al próximo bloque de día (el contacto se registró después: ese día lo cubrió el registro).
   - SÍ → seguí.
2. If/Else: tiene el tag cl17-fuera-nutricion → saltá directo al final (Add to workflow W03).
3. Wait hasta [día] [hora del A].
4. EL A:
   - Customer Service Window Check.
   - Abierta → bloque de pregunta normal (mensaje interactivo).
   - Cerrada → If/Else: tiene el tag cl17-reactivacion-pendiente?
       - SÍ (ya se le mandó una reactivación y no respondió) → Add Tag cl17-fuera-nutricion → saltá al final (Add to workflow W03).
       - NO → Add Tag cl17-reactivacion-pendiente → mandá la PLANTILLA del día (cl17_d1a, cl17_d2a…) con {{1}} = {{contact.first_name}}. Las ramas de los botones son las mismas que en el interactivo.
   - Las ramas de los botones de la plantilla y del interactivo hacen lo mismo (te lo paso por día). Timeout de la pregunta: hasta las 19:25 de ese día.
5. Wait hasta [día] 19:30.
6. EL B: Customer Service Window Check → SOLO con ventana abierta. Cerrada: no mandar nada.
   Timeout de la pregunta: hasta las 11:55 del día siguiente.
7. Próximo bloque de día.

No cargues todavía los textos: armá el esqueleto con los 6 bloques y las esperas, con notas que digan "D1-A", "D1-B", etc. Después te paso un prompt por día.
```

---

## Prompts 5 a 9 · Los textos de cada día (dentro de W02)

Cada uno se pega con el Prompt 0 arriba y esta línea antes: **«Abrí el workflow "cl17 · W02 · Nutrición" y completá el bloque del día X con estos textos. Cada pregunta es un BLOQUE DE PREGUNTA (ver contexto). Después de cada recurso, mandá un mensaje aparte: "Clase: martes 17, 18hs" (salvo en el día 6).»**

### Prompt 5 · Día 1 · miércoles 11/11

```
D1-A · 12:00 · código D1A · plantilla si la ventana está cerrada: cl17_d1a
Pregunta:
Che [nombre], una pregunta

De los clientes que te compraron el mes pasado, cuántos te volvieron a comprar este mes?
Botones y tags:
- Casi ninguno → cl17-rec-nada → Por ende cada mes arrancás de cero. Le vendés a cada cliente una sola vez y la próxima venta la volvés a pagar con pauta
- Algunos → cl17-rec-algo → Bien, ya tenés recompra. Lo que si, la estás pagando de nuevo con pauta cada vez que vuelve
- No lo sé → cl17-rec-nose → Tranqui, casi nadie lo mira. Y es el número que más te cambia la cuenta
Recurso (para todos):
Te paso antes que al grupo el video de hoy. Son 3 min y es la base de todo lo que voy a soltar en la semana: por qué cada venta te cuesta lo mismo que la anterior

{{custom_values.cl17_video_r2}}

D1-B · 19:30 · código D1B · solo con ventana abierta
Pregunta:
Otra. Si mañana apagás la pauta, cuánto facturás ese mes?
Botones y tags:
- Casi nada → cl17-meta-nada → Osea dependés de que la campaña de hoy no se caiga. Yo estaba igual
- La mitad → cl17-meta-mitad → Esa mitad que te queda es tu base. El tema es que se cobre sola, sin que la tengas que empujar
- Casi lo mismo → cl17-meta-igual → Ya tenés base. El paso que sigue es usarla para pagar más por cada cliente nuevo que tu competencia
Recurso (para todos), con la captura de facturación y suscriptores como imagen (archivo de prueba por ahora):
Yo facturaba 60 millones por mes con compra única. Y en breakeven: cada venta me dejaba casi lo mismo que me costaba

Hoy son más de 270 millones por mes, con 3.943 suscriptores que me compran todos los meses sin que vuelva a pautarles

El martes a las 18 te muestro cómo
```

### Prompt 6 · Día 2 · jueves 12/11

```
D2-A · 12:00 · código D2A · plantilla: cl17_d2a
Pregunta:
Che [nombre], cuánto te deja cada venta hoy, después de pagar la pauta?
Botones y tags:
- Casi nada → cl17-mg-nada → Ahí está el problema: estás comprando cada venta de nuevo
- Menos del 15% → cl17-mg-bajo → Con ese margen te sube un poco el CPA y quedás en breakeven
- Más del 15% → cl17-mg-alto → Bien. Con ese margen podés pagar por cada cliente más que tu competencia
Recurso:
Te paso antes que al grupo mi simulador de suscripciones. Cargás los números de tu marca y ves cuánto ganarías con suscripción contra lo que ganás hoy

{{custom_values.cl17_link_simulador}}

Acá te muestro cómo usarlo, paso a paso: {{custom_values.cl17_loom_simulador}}

D2-B · 19:30 · código D2B · solo con ventana abierta
Pregunta:
Hace cuánto no tenés un día bueno?
Botones y tags:
- Esta semana tuve → cl17-dia-bueno → Buenisimo. La pregunta es si mañana se repite o depende de que la campaña no se caiga
- Hace semanas → cl17-dia-semanas → Es textual lo que me dijo Lucas la primera vez que hablamos: "hace mucho que no tenemos un día bueno"
- Hace meses → cl17-dia-meses → Lucas, que hoy trabaja conmigo, estaba igual
Recurso (3 mensajes seguidos):
1) Imagen 1 (archivo de prueba) + texto:
Así venían Lucas y Santi

1,3 millones por día, con 2,4% de margen
A la semana salieron 4 marcas a competir con un producto casi igual. Les subió el CPA y se fueron a pérdida. Una noche iban 600k abajo y apagaron todo

Y no tenían un mal producto. Estaban comprando cada venta de nuevo
2) Imágenes 2 y 3 (archivos de prueba) + texto:
Hoy vienen así 👇

2,8 millones por día, con 40% de margen
3) {{custom_values.cl17_video_lucas}}
```

### Prompt 7 · Día 3 · viernes 13/11

```
D3-A · 12:00 · código D3A · plantilla: cl17_d3a
Pregunta:
Che [nombre], cuánto te cambió el CPA en el último año?
Botones y tags:
- Me subió mucho → cl17-cpa-subio → Es la cadena de siempre: escalás, te salen competidores, te suben los CPM, por ende sube el CPA. Y ahí bajarlo es la pelea equivocada
- Más o menos igual → cl17-cpa-igual → Que esté igual no alcanza si cada venta te deja lo mismo que te cuesta
- No lo tengo claro → cl17-cpa-nose → Anotalo antes del martes, es lo primero que vamos a mirar
Recurso:
Te paso antes que al grupo el video de hoy, lo dibujé en el Miro: por qué bajar el CPA no es la solución y cómo podés pagar más por cada cliente y aun así tener más margen

{{custom_values.cl17_video_r4}}

D3-B · 19:30 · código D3B · solo con ventana abierta
Pregunta:
Si un cliente nuevo te costara el doble que hoy, lo pagarías?
Botones y tags:
- Ni en pedo → cl17-cac-no → Con compra única tenés razón, no te da la cuenta. Con un cliente que te compra varias veces, cambia todo
- Depende → cl17-cac-dep → Depende de una sola cosa: cuántas veces te vuelve a comprar
- Ya lo pago → cl17-cac-ya → Entonces la pregunta es si a ese cliente lo cobrás una vez o todos los meses
Recurso:
Es la pregunta que más me hacen: "sí Manu, pero el suscriptor me va a salir mucho más caro"

Te lo explico en un minuto 👇

{{custom_values.cl17_video_r5}}
```

### Prompt 8 · Día 4 · sábado 14/11

```
D4-A · 12:00 · código D4A · plantilla: cl17_d4a
Pregunta:
Che [nombre], qué es lo que más te frena de la suscripción?
Botones y tags:
- Nadie se suscribe → cl17-obj-cultura → Tengo 3.943 suscriptores activos en Argentina. No es cultura, es cómo se arma
- Se dan de baja → cl17-obj-bajas → Se quedan si tenés buenos procesos de retención. Te paso los míos
- Romper lo que anda → cl17-obj-romper → Nono, va al lado de la compra única, sin tocarla. Seguís vendiendo igual que hoy
Recurso:
Te paso antes que al grupo los flujos de retención de email y WhatsApp que uso en mi marca, para que el cliente que ya te compró no se vaya con tu competencia

{{custom_values.cl17_link_flujos}}

En este video te muestro cómo implementarlos y cómo armar una buena oferta de suscripción: {{custom_values.cl17_loom_flujos}}

D4-B · 19:30 · código D4B · solo con ventana abierta
Pregunta:
Cada cuánto se le termina el producto a tu cliente?
Botones y tags:
- Menos de 30 días → cl17-ciclo-30 → Es el ciclo ideal, tu cliente vuelve todos los meses
- Entre 30 y 60 días → cl17-ciclo-60 → Entra. La frecuencia se arma según tu ciclo, no al revés
- Más de 60 días → cl17-ciclo-mas → Entra igual, con otra frecuencia y otra oferta
Recurso, con la captura del panel de suscriptores como imagen (archivo de prueba por ahora):
Así está hoy mi panel 👇

Si querés que lo mire con tu producto, escribime por privado y te contesto yo:
{{custom_values.cl17_link_manu}}
```

### Prompt 9 · Días 5 y 6 · domingo 15/11 y lunes 16/11

```
D5-A · 11:00 (OJO: este día el A es a las 11:00, no a las 12:00) · código D5A · plantilla: cl17_d5a
Pregunta:
Che [nombre], cuántas veces te compra el mismo cliente?
Botones y tags:
- Una sola vez → cl17-ltv-1 → Entonces tu techo de pauta es lo que te deja esa venta. Si te compra tres veces, es el triple
- 2 o 3 veces → cl17-ltv-2a3 → Ya tenés la recompra. Te falta cobrarla sin volver a pautarla
- No lo sé → cl17-ltv-nose → Es el número que más te cambia la cuenta. Fijate por qué 👇
Recurso:
Te paso antes que al grupo el video de hoy, es todo lo de la semana en una sola cuenta:

Tu competencia, con compra única, puede pagar hasta 30.000 por cliente. Vos, si el cliente te compra tres veces, hasta 90.000. Operando en 75.000, pagás 2,5 veces más y te sigue quedando plata

{{custom_values.cl17_video_r7}}

D5-B · 19:30 · código D5B · solo con ventana abierta
Pregunta:
Ya cargaste tus números en el simulador?
Botones y tags:
- Sí, ya lo usé → cl17-sim-si → mensaje:
Buenisimo. Mandame por privado el número que te dio, una captura alcanza:
{{custom_values.cl17_link_manu}}

Así el martes llegás con tu cuenta hecha
- Todavía no → cl17-sim-no → mensaje:
Dale, son 5 min. Te lo dejo acá:
{{custom_values.cl17_link_simulador}}

Hacelo antes del martes así llegás con tu número
(En este bloque no hay recurso común: cada botón tiene su mensaje completo.)

D6-A · 12:00 · código D6A · plantilla: cl17_d6a
Pregunta:
Che [nombre], qué querés llevarte de la clase de mañana?
Botones y tags:
- Escalar la pauta → cl17-quiere-escalar → Mañana vas a ver cómo pagar más por cliente que tu competencia y que te siga quedando plata
- Ordenar el margen → cl17-quiere-margen → Mañana vas a ver de dónde sale el margen que hoy se lleva tu competencia
- Armar suscripción → cl17-quiere-sus → Mañana vas a ver cómo se arma, al lado de la compra única, sin romper lo que hoy vende
Recurso (sin la línea "Clase: martes 17, 18hs"):
Te paso un spoiler antes que al grupo 👀

{{custom_values.cl17_video_r8}}

Mañana no vas a ver otro curso de testear productos ni de cómo pegar un winner. Te muestro mis sistemas, mis operaciones y cómo lo podés replicar en tu marca

D6-B · 19:30 · código D6B · solo con ventana abierta
Mensaje interactivo, con la imagen de la slide de los agentes (archivo de prueba por ahora):
Y algo que te tengo que contar

A los que se queden hasta el final de la clase les regalo 3 de mis más de 30 agentes de IA, a elección, para que los copies y los pegues en tu marca

Es solo para los que estén en vivo hasta el final

Mañana a las 18. Te mando el link por acá así no lo andás buscando?
Botón:
- Sí, mandámelo → cl17-quiere-link + toco-D6B → Dale, mañana te lo paso por acá
```

---

## Prompt 10 · Workflow W03 · Día de la clase

```
Creá el workflow "cl17 · W03 · Día de la clase" (borrador). Disparador: ninguno (entran desde W01 o W02). Reingreso: NO.

10:00 · código D7-10
- Wait hasta 17/11/2026 10:00 (si ya pasó, sigue de largo).
- Si la hora actual es después de las 11:00 → saltá al paso de las 12:00.
- Window Check. Abierta → interactivo. Cerrada → plantilla cl17_d7_1000 ({{1}} = nombre). En los dos: imagen de Manu con la presentación (archivo de prueba).
Texto del interactivo:
Buen diaa [nombre], hoy es el día

🇦🇷 18:00 · 🇺🇾 18:00 · 🇨🇱 18:00 · 🇨🇴 16:00 · 🇲🇽 15:00 · 🇪🇸 22:00

Te muestro en vivo:

✅ Cómo hago más de 270 millones por mes con suscripción
✅ Cómo escalar tu ecommerce a +100 millones por mes migrando de compra única a suscripción
✅ Mis números reales, sin filtro
✅ Los 3 agentes de IA de regalo para los que se quedan hasta el final

Vas a estar? Tocá uno y te mando el link por acá
Botones:
- Ahí estaré → cl17-confirma + toco-D7-10 → Buenisimo, nos vemos a las 18
- Llego tarde → cl17-tarde + toco-D7-10 → Dale, entrá igual cuando puedas. Lo de los agentes es al final

12:00 · código D7-12 · SOLO con ventana abierta
- Wait hasta 12:00. Window Check → cerrada: nada.
Interactivo:
Liberate de 18 a 19:30. Compu, no celular, algo para anotar que voy a soltar MUCHA data

Y si hiciste la cuenta en el simulador, tenela a mano

Ya lo tenés bloqueado en el calendario?
Botón: Sí, ya lo bloqueé → toco-D7-12 → Ahí va, nos vemos en un rato

15:00 · código D7-15 · SOLO con ventana abierta · con la imagen de la slide de los agentes
Interactivo:
Faltan 3 horas ⏰

Esto se llevan los que se quedan hasta el final: 3 de mis más de 30 agentes de IA, a elección
Botones:
- Ya me liberé → toco-D7-15 → Ahí va. A las 17:45 te paso el link
- Llego justo → toco-D7-15 → Dale, a las 17:45 te paso el link así entrás directo

Cuenta regresiva · 11 envíos sin botones. En cada uno: Wait hasta la hora → Window Check.
- Abierta → mensaje normal (con la imagen cuando dice "Foto").
- Cerrada → solo en los marcados con PLANTILLA; en el resto, nada.
#1 17:00 · Foto · PLANTILLA cl17_d7_1700 · Falta 1 hora ⏰ ya estoy armando todo. Buscá un lugar tranquilo y algo para anotar. En un rato te paso el link
#2 17:30 · Texto · Media hora. Cerrá lo que tengas pendiente que arrancamos
#3 17:45 · Foto · PLANTILLA cl17_d7_1745 ({{1}} = {{custom_values.cl17_link_clase}}) · En 15 min arrancamos. Link para entrar: {{custom_values.cl17_link_clase}}
#4 17:55 · Texto · Estamos entrando 🔴 {{custom_values.cl17_link_clase}}
#5 18:00 · Foto · PLANTILLA cl17_d7_1800 ({{1}} = {{custom_values.cl17_link_clase}}) · 🔴 Arrancamos. Entrá ahora: {{custom_values.cl17_link_clase}}
#6 18:05 · Texto · Ya arrancó, entrá que todavía estás a tiempo: {{custom_values.cl17_link_clase}}
#7 18:10 · Foto · Los 3 agentes son solo para los que se quedan hasta el final 🎁 {{custom_values.cl17_link_clase}}
#8 18:15 · Texto · Si recién llegás, entrá igual: lo más importante todavía no pasó {{custom_values.cl17_link_clase}}
#9 18:20 · Foto · Estoy mostrando mis números de este mes 👀 {{custom_values.cl17_link_clase}}
#10 18:25 · Texto · Después se hace difícil engancharla, entrá ahora: {{custom_values.cl17_link_clase}}
#11 18:30 · Foto · Mirá cómo está el chat 🔥 {{custom_values.cl17_link_clase}}

Al final: Wait hasta 19:35 → "Add to workflow: cl17 · W04 · Post-clase".
```

---

## Prompt 11 · Workflows W04 · Post-clase y W05 · Respondió

```
PARTE 1 · Creá "cl17 · W04 · Post-clase" (borrador). Disparador: ninguno (entran desde W03). Reingreso: NO.

Filtro al principio: si tiene el tag aplico o cliente → terminar.

Paso 1 · 17/11 ~19:35 · código POST
Window Check. Abierta → interactivo. Cerrada → plantilla cl17_post_pudiste.
Texto: Che [nombre], pudiste estar en la clase?
Botones:
- Sí, estuve → cl17-estuvo + toco-POST → 2 mensajes:
  1)
Gracias por quedarte hasta el final 🙏

Para los 3 agentes de IA:

1. Escribime por privado qué fue lo más útil de la clase
{{custom_values.cl17_link_manu}}

2. Elegí tus 3 y te los paso
  2)
Y si querés que lo apliquemos en tu marca con mi equipo, aplicá acá y te contactamos:
{{custom_values.cl17_link_aplicacion}}
- No pude → cl17-no-pudo + toco-POST → mensaje:
Que paja que no llegaste a estar

Contame en un mensaje para qué lo aplicarías en tu marca y te mando la repetición
  → Wait for contact reply (hasta 18/11 11:00). Si responde: Add Tag cl17-pidio-replay → mensaje:
Dale, te la paso antes que al grupo. Mirala ya que no queda mucho tiempo arriba:
{{custom_values.cl17_link_replay}}

Paso 2 · Mié 18/11 12:00 · código MIE12
If/Else por tag:
- cl17-estuvo → Window Check. Abierta → interactivo. Cerrada → plantilla cl17_post_mie_estuvo.
  Texto: Che [nombre], cómo te quedó la clase de ayer? Qué querés hacer?
  Botones: Quiero aplicar | Tengo dudas
- cl17-no-pudo, o sin ninguno de los dos tags → Window Check. Abierta → interactivo. Cerrada → plantilla cl17_post_mie_repeticion.
  Texto: Che [nombre], pudiste ver la repetición?
  Botones: Sí, la vi | Todavía no
Respuestas (todas con toco-MIE12):
- Quiero aplicar → cl17-quiere → Buenisimo. Aplicá acá y mi equipo te contacta: {{custom_values.cl17_link_aplicacion}}
- Tengo dudas → cl17-dudas → Dale, escribime por acá y lo hablamos: {{custom_values.cl17_link_manu}} → + Notificación interna a Manu: "[nombre] tiene dudas sobre Génesis" con el link al contacto.
- Sí, la vi → cl17-vio-replay → Buenisimo. Si querés que lo apliquemos en tu marca, aplicá acá: {{custom_values.cl17_link_aplicacion}}
- Todavía no → Te la dejo de nuevo, no queda mucho tiempo arriba: {{custom_values.cl17_link_replay}}

Paso 3 · Mié 18/11 19:30 · código MIE1930 · SOLO con ventana abierta
Texto: Quedó algo de la clase que quieras hablar conmigo?
Botones:
- Sí, escribime → cl17-hablar + toco-MIE1930 → Dale, escribime acá y lo vemos: {{custom_values.cl17_link_manu}} → + Notificación interna a Manu: "[nombre] quiere hablar" con el link al contacto.
- Por ahora no → toco-MIE1930 → De una. Si te surge algo me escribís

Paso 4 · Vie 20/11 12:00 · código VIE20
Window Check. Abierta → interactivo. Cerrada → plantilla cl17_post_vie20 ({{1}} nombre, {{2}} {{custom_values.cl17_lugares}}, {{3}} {{custom_values.cl17_link_aplicacion}}).
Texto:
Che [nombre], quedan {{custom_values.cl17_lugares}} lugares para Génesis

Si querés entrar o ver si sirve para tu marca, aplicá acá:
{{custom_values.cl17_link_aplicacion}}

Cualquier duda me escribís
Botones: Quiero aplicar | Tengo dudas (mismas respuestas que el Paso 2)

Paso 5 · Sáb 21/11 12:00
Window Check. Abierta → mensaje normal. Cerrada → plantilla cl17_post_sab21 ({{1}} nombre, {{2}} {{custom_values.cl17_link_aplicacion}}).
Texto:
Che [nombre], hoy a la noche cierro los lugares de Génesis

Si querés entrar o simplemente ver si sirve para tu marca, es AHORA:
{{custom_values.cl17_link_aplicacion}}

Después de hoy no hay más lugares

PARTE 2 · Creá "cl17 · W05 · Respondió" (borrador).
Disparador: "Customer Replied" → canal WhatsApp, con filtro: el contacto tiene el tag cl17-registrado.
Acción: Remove Tag cl17-reactivacion-pendiente.
(Sirve para que el que respondió cualquier cosa vuelva a recibir la reactivación si después se queda callado.)
```

---

## Prompt 12 · Prueba con 3 números y publicación

```
Vamos a probar el flujo antes de publicarlo. No publiques nada sin mi OK.

1. Pasame la lista de los 5 workflows (W01 a W05) y de las 17 plantillas, con su estado.
2. Si alguna plantilla de las que usa W01 (cl17_i1_bienvenida, cl17_i2_mail) no está aprobada, frená: sin eso no se puede probar.
3. Con mi OK, publicá SOLO W01 y W05.
4. Creá 3 contactos de prueba con los teléfonos que te paso (uno de Argentina, uno de otro país y uno que no toque ningún botón) y poneles el tag cl17-registrado a mano.
5. Decime qué ves en la conversación de cada uno: qué mensajes salieron, si salieron como plantilla o como interactivo, y en qué paso quedaron.
6. Frená ahí. W02 a W04 se publican después, cuando yo revise la prueba.
```

---

## Antes de cargar: lo que falta

| Qué | Para qué | Bloquea |
|---|---|---|
| Video de bienvenida de Manu (V1) | Plantilla 1 y W01 | **No:** la plantilla se aprueba con cualquier video y el real se elige en el workflow |
| Imagen del asunto del mail + bandejas | Plantilla 2 y W01 | No (archivo de prueba) |
| Saber qué workflow recibe hoy el webhook del registro | W01, paso 0 | Lo averigua el Prompt 3 |
| Links de videos, clase, aplicación, repetición y lugares | Valores personalizados | No: se cargan cuando estén |
| 3 teléfonos para la prueba | Prompt 12 | Solo la prueba |
