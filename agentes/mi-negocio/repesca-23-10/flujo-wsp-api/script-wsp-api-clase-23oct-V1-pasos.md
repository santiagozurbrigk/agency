# Script WhatsApp API — Clase privada del viernes 23/10 · Capa 1 (pasos)

Hecho con el agente `../../agentes/creador-flujos-wsp.md` (21-oct-2026).

- **Clase:** viernes 23 de octubre, **18:00 hs ARG**, en vivo, por Zoom. Duración ~90 min (termina ~19:30).
- **Promesa:** "Cómo escalé mi ecom de químicos a +$250.000.000 con el modelo de suscripciones". Es la última vez que se da en vivo.
- **Modo: clase corta, sin preventa.** Las 2 preguntas de cada día son de valor. Sin flujo de calificados.
- **Horario fijo de la nutrición:** 12:00 y 19:30 ARG.
- **Quién firma:** Manu. **Prefijo de tags:** `cl23-`.
- **Para el lead es otra clase privada.** Las palabras "repesca", "segunda vuelta" o "la del lunes" no aparecen en ningún mensaje.

Esta capa es el esqueleto: cada envío con su día, hora, pregunta, botones y recurso. **Sin copy.** El texto exacto va en la capa 2, cuando esta se apruebe.

## Índice

1. Calendario
2. Registro
3. Día 1 · miércoles 21 · El CPA
4. Día 2 · jueves 22 · El margen y Meta
5. Día de la clase · viernes 23
6. Post-clase
7. Casos borde
8. Recursos: lo que ya está y lo que falta
9. Reglas cuando la ventana está cerrada
10. Decisiones que tomé y datos que faltan

---

## 1. Calendario

| Día | Tema del día (= el del grupo) | 12:00 · A | 19:30 · B |
|---|---|---|---|
| Mié 21/10 | El CPA: "no ganás bajándolo, ganás pudiendo pagar más" | Pregunta del CPA → video | Pregunta de recompra → video |
| Jue 22/10 | El margen y Meta: "la base cobra sola" | Pregunta de "si apagás la pauta" → video | Pregunta de la objeción + "te mando el link por acá?" |
| Vie 23/10 | **CLASE 18:00** | 10:00 · 12:00 · 15:00 con botones | Cuenta regresiva 17:00 a 18:30, sin botones |
| Vie 23/10 noche y después | Post-clase | Al terminar · día +1 · día del cierre | — |

> El día 1 corre solo si el flujo está cargado y las plantillas aprobadas antes del mediodía del miércoles. Si no llega, el que se registra el miércoles recibe el registro y arranca directo en el día 2. Como los días son aislados, no se rompe nada.

---

## 2. Registro (todos, el día que entran)

| Paso | Cuándo | Qué va | Botones | Tags |
|---|---|---|---|---|
| I.1 | Al registrarse · **plantilla con video selfie** | Para qué es este chat (solo tuyo, cosas según TU caso) y para qué es el grupo (data general y el link de la clase). Link al grupo "por las dudas si aún no te sumaste". "Cada mensaje te llega con botones, con que toques uno sigo mandándote cosas, sin eso se me corta el chat". | [Dale, entendido] | `cl23-registrado` · `env-I1` · `toco-I1` |
| I.2 | Después de I.1 · si no tocó, a los 30 min como plantilla | **Reemplaza al mail del opt-in** (este lanzamiento no tiene mails). Confirmar que entró al grupo, porque ahí llega el link de la clase. | [Ya estoy adentro] [No lo encuentro] | `env-I2` · `toco-I2` · `cl23-sin-grupo` si toca "No lo encuentro" |
| I.2b | Si tocó "No lo encuentro" | El link del grupo de nuevo. | — | — |
| I.3 | Seguido · "dos preguntas rápidas, con lo que me respondas elijo qué mandarte a vos" | **Perfil:** dónde estás con la suscripción. | [Ya vendo suscripción] [Nunca la probé] [La probé, no anduvo] | `cl23-perfil-ya` · `cl23-perfil-nunca` · `cl23-perfil-probo` |
| I.4 | Seguido | **Urgencia:** cuándo querés tener la suscripción andando. | [Este mes] [En 1 a 3 meses] [No sé todavía] | `cl23-urg-mes` (prioridad) · `cl23-urg-1a3` · `cl23-urg-nose` |
| I.5 | Seguido | **Recurso de bienvenida** (R1) con la primera línea según I.3. | — | `env-I5` |
| Noche | 19:30 · solo si se registró antes de las 19:30 | Pregunta liviana sin oferta: "pudiste mirar el video?" | [Sí, lo vi] [Todavía no] | `toco-noche` |

**Primera línea de I.5 según I.3:**

| Botón | Por dónde va la primera línea |
|---|---|
| Ya vendo suscripción | Tener suscripción no es lo mismo que tener una base que cobra sola: lo que mirás es el churn y cuánto podés pagar por cliente. |
| Nunca la probé | El que nunca la probó cree que en Argentina nadie se suscribe. Manu también lo creía: hoy 2.200 activos, 1,28% de churn. |
| La probé, no anduvo | Casi siempre no anda por cómo se armó (precio, ciclo, la base), no porque la gente no se suscriba. |

> **Prioridad para el equipo (Jose / Manu):** `cl23-perfil-ya` o `cl23-urg-mes`. Manu o Jose les escriben desde su número en el post-clase aunque no toquen nada (en el tracker van como responsable).

---

## 3. Día 1 · miércoles 21 · El CPA

### D1-A · 12:00 · Pregunta del CPA → recurso

- **Pregunta:** cuánto te cambió el CPA en el último año.
- **Botones:** [Me subió mucho] [Más o menos igual] [No lo tengo claro]
- **Tags:** `cl23-cpa-subio` · `cl23-cpa-igual` · `cl23-cpa-nose` · `env-D1A` · `toco-D1A`
- **Recurso (R2):** video "Por qué cada venta te cuesta lo mismo que la anterior" (el video largo del grupo del 14/10, ~10 min).
- **Primera línea por botón:**

| Botón | Por dónde va |
|---|---|
| Me subió mucho | La cadena: te salen competidores, suben los CPM, por ende sube el CPA. Bajarlo es la pelea equivocada. |
| Más o menos igual | Que esté igual no alcanza si cada venta te deja lo mismo: el problema es que lo pagás en cada venta. |
| No lo tengo claro | Antes de la clase vale saber ese número: es lo primero que se mira el viernes. |

### D1-B · 19:30 · Pregunta de recompra → recurso

- **Pregunta:** cuántas veces te compra el mismo cliente.
- **Botones:** [Una sola vez] [2 o 3 veces] [No lo sé]
- **Tags:** `cl23-ltv-1` · `cl23-ltv-2a3` · `cl23-ltv-nose` · `env-D1B` · `toco-D1B`
- **Recurso (R3):** "50 vs 75": el que cobra la segunda compra sin pauta puede pagar más por la primera (video corto o reel R4/R6 del lanzamiento; ver recursos).
- **Primera línea por botón:**

| Botón | Por dónde va |
|---|---|
| Una sola vez | Con una compra, tu techo de pauta es lo que te deja esa venta. Con LTV 3, es el triple. |
| 2 o 3 veces | Ya tenés recompra: falta cobrarla sin volver a pautarla. |
| No lo sé | Es el número que más cambia la cuenta. En la clase se ve cómo sacarlo. |

---

## 4. Día 2 · jueves 22 · El margen y Meta

### D2-A · 12:00 · "Si apagás la pauta" → recurso

- **Pregunta:** si mañana apagás la pauta, cuánto facturás ese mes.
- **Botones:** [Casi nada] [La mitad] [Casi lo mismo]
- **Tags:** `cl23-meta-nada` · `cl23-meta-mitad` · `cl23-meta-igual` · `env-D2A` · `toco-D2A`
- **Recurso (R4):** video "Los 3 problemas de tu marca son uno solo" (el video resumen del grupo del 17/10, ~10 min), con la marca que cobra recurrencias con la pauta apagada al 50% de margen.
- **Primera línea por botón:**

| Botón | Por dónde va |
|---|---|
| Casi nada | El 1 del mes arrancás en cero. "Ayer íbamos 600 lucas abajo, apagamos." |
| La mitad | La mitad que queda es tu base: el punto es que se cobre sola, sin que la empujes. |
| Casi lo mismo | Ya tenés base. El siguiente paso es usarla para pagar más por cada cliente nuevo. |

### D2-B · 19:30 · La objeción + el link

- **Pregunta:** qué te frena más de la suscripción.
- **Botones:** [Nadie se suscribe] [Se dan de baja] [Romper lo que anda]
- **Tags:** `cl23-obj-cultura` · `cl23-obj-bajas` · `cl23-obj-romper` · `env-D2B` · `toco-D2B`
- **Recurso:** sin video. La respuesta es el dato (2.200 activos, 1,28% de churn; la suscripción va al lado de la compra única, sin tocarla).
- **Primera línea por botón:**

| Botón | Por dónde va |
|---|---|
| Nadie se suscribe | 2.200 suscriptores activos en Argentina. No es cultura, es cómo se arma. |
| Se dan de baja | 1,28% de churn. No se suscriben por el descuento y se van: se quedan. |
| Romper lo que anda | Va al lado de la compra única, sin tocarla. Seguís vendiendo igual. |

- **Cierre del D2-B:** "mañana a las 18. te mando el link por acá así no lo andás buscando?" → **[Sí, mandámelo]** (`cl23-quiere-link`). Ese botón deja gratis los recordatorios del viernes.

---

## 5. Día de la clase · viernes 23

| Hora | Qué va | Botones | Tags |
|---|---|---|---|
| 10:00 | **Con foto** de Manu en el estudio con la pizarra. "hoy es el día" + horario por país + lista con ✅ de lo que se ve en vivo. | [Ahí estaré] [Llego tarde] | `cl23-confirma` · `cl23-tarde` |
| 12:00 | "liberate de 18 a 19:30, sin ruido y con algo para anotar" + traé tus 4 números (CPA, margen por pedido, ticket, ciclo de reposición) + "ya lo tenés bloqueado en el calendario?" | [Sí, ya lo bloqueé] | `toco-D3-12` |
| 15:00 | **Con foto** de los 3 regalos: faltan 3 horas, esto se llevan los que estén en vivo. | [Ya me liberé] [Llego justo] | `toco-D3-15` |
| 17:00 a 18:30 | **11 envíos sin botones**, foto y texto alternados (nunca dos del mismo formato seguidos). Link desde las 17:45. Cada 5 min en la primera media hora. | — | — |

**La cuenta regresiva (11 envíos):**

| # | Hora | Formato | Qué dice | Link |
|---|---|---|---|---|
| 1 | 17:00 | Foto (setup armándose) | Falta 1 hora | — |
| 2 | 17:30 | Texto | Media hora, buscá un lugar tranquilo | — |
| 3 | 17:45 | Foto (frente a la cámara) | 15 minutos | ✓ |
| 4 | 17:55 | Texto | Estamos entrando | ✓ |
| 5 | 18:00 | Foto (captura del vivo) | 🔴 Arrancamos | ✓ |
| 6 | 18:05 | Texto | Ya está arrancando, entrá ahora | ✓ |
| 7 | 18:10 | Foto (los regalos) | Los regalos son solo para los que están adentro | ✓ |
| 8 | 18:15 | Texto | Después se hace difícil engancharla | ✓ |
| 9 | 18:20 | Foto (captura del chat) | Mirá lo que está pasando | ✓ |
| 10 | 18:25 | Texto | Si recién llegás, entrá igual | ✓ |
| 11 | 18:30 | Foto (pizarra con la cuenta) | Estoy haciendo la cuenta en vivo | ✓ |

> **Ventana cerrada todo el día** (no tocó nada desde el jueves): solo 3 recordatorios pagos: 17:00 (falta 1 hora), 17:45 (15 min + link) y 18:00 (arrancamos + link).
>
> Ese día no hay preguntas de valor: la venta es la clase.

---

## 6. Post-clase

El llamado a la acción es **agendar la llamada** (como en el carrito del 19), no Instagram. Ver decisión 4.

| Cuándo | Qué va | Botones | Tags |
|---|---|---|---|
| Al terminar (~19:35) | "pudiste estar en la clase?" | [Sí, estuve] [No pude] | `cl23-estuvo` · `cl23-no-pudo` |
| Si estuvo | Los regalos: cómo se reciben (ver decisión 5) + "agendá la llamada y lo vemos con tus números" con el link de la agenda. | — | — |
| Si no pudo | "no íbamos a dar la grabación, pero contame para qué la aplicarías y si te suma te la mando" → **responde con texto libre** → la repetición con su link y cuánto dura. | (texto libre) | `cl23-pidio-replay` |
| Sáb 24 · 12:00 | Estuvo: dos caminos, "quiero arrancar" (agenda) y "tengo dudas" (le escribe Jose o Manu). No pudo: "pudiste ver la repetición?" | [Quiero arrancar] [Tengo dudas] / [Sí, la vi] [Todavía no] | `cl23-quiere` · `cl23-dudas` · `cl23-vio-replay` |
| Sáb 24 · 19:30 | "quedó algo de la clase que quieras hablar conmigo?" | [Sí, escribime] [Por ahora no] | `cl23-hablar` → aviso a Jose/Manu |
| Día del cierre | "hoy a la noche cierro los lugares de Génesis. si querés entrar o ver si sirve para tu ecommerce, es AHORA" + agenda. | — | — |

---

## 7. Casos borde

| Caso | Qué pasa |
|---|---|
| Se registra antes de las 19:30 | Registro + esa noche la pregunta liviana ("pudiste mirar el video?"). |
| Se registra después de las 19:30 | Solo el registro. La ventana le queda abierta para el mediodía siguiente. |
| Se registra el viernes 23 | I.1 + I.2 y directo a los recordatorios de la clase. |
| No toca ningún botón | Al día siguiente, una sola plantilla de reactivación (la pregunta del día). Si tampoco toca, sale de la nutrición y solo recibe los 3 recordatorios pagos del viernes. |
| Ya estaba registrado a la clase del 19 | El registro nuevo lo saca de cualquier workflow de la clase del 19 (si no, le llega el cierre del carrito del 22 de nuevo). |
| Ya es cliente o tiene llamada agendada | Se excluye del flujo (tag del tracker o etapa «Venta» / «Llamada agendada»). |
| Prioridad (`cl23-perfil-ya` o `cl23-urg-mes`) | Jose o Manu le escriben después de la clase aunque no toque nada. |

---

## 8. Recursos: lo que ya está y lo que falta

### Videos selfie y fotos

| # | Qué es | Dónde va | Día | Estado |
|---|---|---|---|---|
| V1 | Video selfie de bienvenida (30-45 s): este chat es solo tuyo, el grupo es para todos, tocá los botones | I.1 | Registro | **Falta grabar** |
| F1 | Foto de Manu en el estudio con la pizarra | Viernes 10:00 | Vie 23 | Falta (o reusar del 19) |
| F2 | Foto de los 3 regalos | Viernes 15:00 y 18:10 | Vie 23 | Listo: `lanzamiento-19-10/optin/bonus/bonus-1/2/3.webp` (hay que unirlas en una imagen) |
| F3 | Setup armándose | Viernes 17:00 | Vie 23 | Se saca en el momento |
| F4 | Frente a la cámara | Viernes 17:45 | Vie 23 | Se saca en el momento |
| F5 | Captura del vivo y del chat | Viernes 18:00 y 18:20 | Vie 23 | Se saca en el momento (o reusar `optin/replay-assets/`) |
| F6 | Pizarra con la cuenta | Viernes 18:30 | Vie 23 | Se saca en el momento |

### Links y datos

| # | Qué es | Dónde va | Estado |
|---|---|---|---|
| R1 | Recurso de bienvenida: video corto de la historia de Manu (60M en compra única → base de suscriptores) | I.5 | **Falta link** (puede ser un video de YouTube del plan V7 "caso Manu de A a B") |
| R2 | Video "Por qué cada venta te cuesta lo mismo que la anterior" (~10 min) | D1-A | Grabado para el grupo del 14/10. **Falta link** (YouTube oculto o Loom) |
| R3 | Video corto "50 vs 75" / "competimos por el modelo" | D1-B | **Falta link** (reel R4 o R6 del lanzamiento) |
| R4 | Video "Los 3 problemas de tu marca son uno solo" (~10 min) | D2-A | Grabado para el grupo del 17/10. **Falta link** |
| L1 | Link del grupo de WhatsApp de la clase del 23 | I.1, I.2b | **Falta** |
| L2 | Link de Zoom del viernes | Cuenta regresiva | **Falta** |
| L3 | Link de la agenda (calendario de GHL) | Post-clase | Está en Configuración del tracker; confirmar cuál va |
| L4 | Link de la repetición y cuánto dura | Post-clase, "no pude" | **Falta** (la página `/replay` existe) |
| D1 | Lo que se ve en vivo (lista con ✅) | Viernes 10:00 | Sale de la clase v2: los 3 errores, el Método B.A.S.E. paso a paso, la cuenta con números reales, los casos |
| D2 | Fecha y hora del cierre de Génesis para este grupo | Post-clase | **Falta** |

---

## 9. Reglas cuando la ventana está cerrada

- Antes de cada envío que no es respuesta a un botón va el **Customer Service Window Check**. Abierta → mensaje interactivo (gratis). Cerrada → la plantilla aprobada con el mismo texto (paga).
- Plantillas que hacen falta (todas nuevas: no hay plantillas aprobadas de la clase del 19, que se trabajó solo por el grupo): I.1 (con video), I.2, reactivación D1-A, D1-B, D2-A, D2-B, viernes 10:00 (con foto), 12:00, 15:00 (con foto), los 3 recordatorios pagos (17:00, 17:45, 18:00), "pudiste estar?", cierre.
- **Ninguna plantilla nombra la fecha** salvo las del viernes, así se reusan en el próximo evento.
- Máximo 3 botones, 20 caracteres por botón. Todos los botones de este script están dentro del límite.
- El nombre nunca al principio ni al final de la plantilla ("che {{1}}," / "buenas {{1}},").

---

## 10. Decisiones que tomé y datos que faltan

**Decisiones (confirmalas o cambialas):**

1. **Modo clase corta, sin preventa.** Sin recurso especial ni flujo de calificados: el que pide más se lo lleva el post-clase.
2. **Días 21 y 22 de nutrición.** Si el flujo no llega a estar cargado el miércoles al mediodía, el día 1 se saltea (ver calendario).
3. **I.2 sin mail.** El lanzamiento no tiene mails (decisión del 02/10), así que el paso del mail del opt-in pasa a ser "confirmá que estás en el grupo".
4. **El post-clase va a la agenda de la llamada, no a Instagram.** Así se trabajó el carrito del 19 y el tracker ya tiene los calendarios y el calendario de llamadas. Si preferís llevarlos al IG de Manu como hace Naza, cambio esa parte.
5. **Los regalos se entregan por el grupo de WhatsApp**, como dice el cierre de la clase v2. Falta confirmar si se mandan también por este chat.
6. **Perfiles del avatar:** ya vende con suscripción / nunca la probó / la probó y no anduvo. Son los equivalentes a "ya hace webinars / todavía no / probó y no le funcionó".
7. **Recursos:** los 2 videos largos del grupo del 19 (el 14/10 y el 17/10). Este lead no los vio.

**Datos que faltan para la capa 2 (mensajes):**

1. Link del grupo de WhatsApp de la clase del 23 y link de Zoom.
2. Links de los 4 videos (R1 a R4): dónde están subidos.
3. Cierre de Génesis para este grupo: día y hora.
4. Cuánto dura la repetición de la clase del 23.
5. 5 a 10 mensajes reales de Manu por WhatsApp para calcar la voz (sigue pendiente desde el 30/09).
6. Quién carga el flujo en GHL y con qué número sale.
7. Si hay audiencia fuera de Argentina (para los horarios con banderas del viernes).
