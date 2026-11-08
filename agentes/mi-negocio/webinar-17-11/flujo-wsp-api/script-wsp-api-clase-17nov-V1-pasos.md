# Script WhatsApp API — Clase privada del martes 17/11 · Capa 1 (pasos)

Hecho con el agente `../../agentes/creador-flujos-wsp.md` (07/11/2026), sobre la base del flujo del 24/10 (`../../repesca-24-10/flujo-wsp-api/`), que quedó descartado porque la cuenta no llegó a aprobarse.

- **Clase:** martes 17 de noviembre, **18:00 hs ARG**, en vivo. Termina ~19:30.
- **Promesa:** cómo Manu hace +270M por mes con el modelo de suscripción sin depender del CPA ni de Meta, y cómo escalar tu ecommerce a +100M por mes migrando de compra única a suscripción.
- **Modo: lanzamiento completo, sin preventa** (decisión de Santi, 07/11). Las 2 preguntas de cada día son de valor. Los 3 agentes de IA **no** se ofrecen por el chat: son el bonus para los que se quedan hasta el final de la clase, como dicen los ads, los mails y el grupo. Sin flujo de calificados.
- **Horario fijo de la nutrición:** 12:00 y 19:30 ARG.
- **Quién firma:** Manu. **Prefijo de tags:** `cl17-`.
- **Post-clase:** al **formulario de aplicación** (nunca «agendá»). Los 3 agentes se piden por el privado de Manu.
- **Cuenta de WhatsApp API:** en trámite (07/11). Si no está aprobada para el mediodía del miércoles 11, el que se registró recibe el registro cuando se apruebe y entra al día del calendario en que esté.

Esta capa es el esqueleto: cada envío con su día, hora, pregunta, botones y recurso. **Sin copy.** El texto exacto va en la capa 2, cuando esta se apruebe.

## Índice

1. Calendario y coherencia con el grupo y los mails
2. Registro
3. Día 1 · miércoles 11 · Buscás la compra, no el cliente
4. Día 2 · jueves 12 · Lucas estaba igual que vos
5. Día 3 · viernes 13 · Bajar el CPA no es la solución
6. Día 4 · sábado 14 · El margen está en tu base
7. Día 5 · domingo 15 · Cómo ganarle a toda tu competencia
8. Día 6 · lunes 16 · Mañana a las 18
9. Día de la clase · martes 17
10. Post-clase · del martes 17 al sábado 21
11. Casos borde
12. Recursos: lo que ya está y lo que falta
13. Reglas cuando la ventana está cerrada
14. Decisiones que tomé y datos que faltan

---

## 1. Calendario y coherencia con el grupo y los mails

| Día | Tema (= el del grupo) | 12:00 · A | 19:30 · B |
|---|---|---|---|
| Dom 08 a mar 10 | Antes de la nutrición | Solo el registro | Pregunta liviana (si se registró antes de las 19:30) |
| Mié 11 | Buscás la compra, no el cliente | Recompra → video «por qué cada venta te cuesta lo mismo» | Si apagás la pauta → el antes y el después de Manu |
| Jue 12 | Lucas estaba igual que vos | Cuánto te deja cada venta → simulador | Hace cuánto no tenés un día bueno → caso Lucas |
| Vie 13 | Bajar el CPA no es la solución | Cómo te cambió el CPA → video del Miro | Cuánto podrías pagar por cliente → video «el suscriptor sale más caro» |
| Sáb 14 | El margen está en tu base | Qué te frena de la suscripción → flujos de retención | Cada cuánto se termina tu producto → el dato de los suscriptores |
| Dom 15 | Cómo ganarle a toda tu competencia | Cuántas veces te compra el mismo cliente → video «cómo ganarle» | Usaste el simulador → simulador + «mandame tu número» |
| Lun 16 | Mañana a las 18 | Qué querés llevarte de la clase → video spoiler | Los regalos de la clase + «te mando el link por acá?» |
| Mar 17 | **CLASE 18:00** | 10:00 · 12:00 · 15:00 con botones | Cuenta regresiva 17:00 a 18:30, sin botones |
| Mar 17 noche a sáb 21 | Post-clase | Pudiste estar · día +1 · cierre | — |

**Cómo convive con el grupo:** el grupo manda la pieza del día a las 13:00. El chat manda **el mismo recurso a las 12:00**, una hora antes, como respuesta a la pregunta: «a vos te lo paso antes». El chat nunca adelanta nada que el grupo no muestre ese día. Y como un miembro nuevo del grupo no ve los mensajes anteriores, el chat es por donde el que entra tarde recupera lo que se perdió (ver caso borde «entró tarde»).

**Coherencia con los mails:** el mail 0 pide responder **SUSCRIPCIÓN** y manda los flujos de retención. I.2 pide la misma palabra.

---

## 2. Registro (todos, el día que entran)

| Paso | Cuándo | Qué va | Botones | Tags |
|---|---|---|---|---|
| I.1 | Al registrarse · **plantilla con video selfie** | Para qué es este chat (solo tuyo, cosas según TU caso) y para qué es el grupo (data general, las piezas de cada día y el link de la clase). Link al grupo «por las dudas si aún no te sumaste». «Cada mensaje te llega con botones, con que toques uno sigo mandándote cosas, sin eso se me corta el chat». | [Dale, entendido] | `cl17-registrado` · `env-I1` · `toco-I1` |
| I.2 | Después de I.1 · si no tocó, a los 30 min como plantilla | **Foto del asunto del mail 0** («Todavía NO estás adentro ⚠️») + foto de las 3 bandejas. Respondelo con **SUSCRIPCIÓN** y te llegan los flujos de retención; así los mails de la semana te caen en principal. | [Ya lo respondí] [No lo encuentro] | `env-I2` · `toco-I2` · `cl17-sin-mail` |
| I.2b | Si tocó «No lo encuentro» | Revisá promociones y spam; si no está, el link de los flujos directo por acá. | — | — |
| I.3 | Seguido · «dos preguntas rápidas, con lo que me respondas elijo qué mandarte a vos» | **Perfil:** dónde estás con la suscripción. | [Ya vendo suscripción] [Nunca la probé] [La probé, no anduvo] | `cl17-perfil-ya` · `cl17-perfil-nunca` · `cl17-perfil-probo` |
| I.4 | Seguido | **Urgencia:** cuándo querés tener la suscripción andando. | [Este mes] [En 1 a 3 meses] [No sé todavía] | `cl17-urg-mes` (prioridad) · `cl17-urg-1a3` · `cl17-urg-nose` |
| I.5 | Seguido | **Recurso de bienvenida (R1): el roadmap de suscripciones**, con la primera línea según I.3. | — | `env-I5` |
| Noche | 19:30 · solo si se registró antes de las 19:30 | Pregunta liviana sin oferta: «pudiste pegarle una mirada al roadmap?» | [Sí, lo vi] [Todavía no] | `toco-noche` |

**Primera línea de I.5 según I.3:**

| Botón | Por dónde va la primera línea |
|---|---|
| Ya vendo suscripción | Tener suscripción no es lo mismo que tener una base que cobra sola: lo que se mira es cuánto se quedan y cuánto podés pagar por cliente. |
| Nunca la probé | El que nunca la probó cree que en Argentina nadie se suscribe. Manu también lo creía: hoy 3.943 suscriptores activos. |
| La probé, no anduvo | Casi siempre no anda por cómo se armó (precio, ciclo, la base), no porque la gente no se suscriba. |

> Se pregunta por la suscripción y no por la facturación ni la pauta: eso ya lo pregunta el formulario de registro (calificado = USD 100 por día o más en Meta). **Confirmar** qué preguntas tiene hoy el formulario para no repetir ninguna.

---

## 3. Día 1 · miércoles 11 · Buscás la compra, no el cliente

### D1-A · 12:00 · Recompra → recurso

- **Pregunta:** de los clientes del mes pasado, cuántos te volvieron a comprar este mes.
- **Botones:** [Casi ninguno] [Algunos] [No lo sé]
- **Tags:** `cl17-rec-nada` · `cl17-rec-algo` · `cl17-rec-nose` · `env-D1A` · `toco-D1A`
- **Recurso (R2):** video corto (3 min) «Por qué cada venta te cuesta lo mismo que la anterior» (el del grupo de las 13:00).

| Botón | Por dónde va la primera línea |
|---|---|
| Casi ninguno | Por ende cada mes arrancás de cero: le vendés a cada cliente una sola vez. |
| Algunos | Ya tenés recompra, pero la pagás de nuevo con pauta cada vez. |
| No lo sé | Es el número que más cambia tu cuenta, y casi nadie lo mira. |

### D1-B · 19:30 · Si apagás la pauta → recurso

- **Pregunta:** si mañana apagás la pauta, cuánto facturás ese mes.
- **Botones:** [Casi nada] [La mitad] [Casi lo mismo]
- **Tags:** `cl17-meta-nada` · `cl17-meta-mitad` · `cl17-meta-igual` · `env-D1B` · `toco-D1B`
- **Recurso:** sin video. El antes y el después de Manu con captura: 60M por mes con compra única, en breakeven → $275M por mes y 3.943 suscriptores.

| Botón | Por dónde va la primera línea |
|---|---|
| Casi nada | Dependés de que la campaña de hoy no se caiga. Manu estaba igual. |
| La mitad | La mitad que queda es tu base: el punto es que se cobre sola. |
| Casi lo mismo | Ya tenés base. El paso siguiente es usarla para pagar más por cada cliente nuevo. |

---

## 4. Día 2 · jueves 12 · Lucas estaba igual que vos

### D2-A · 12:00 · Cuánto te deja cada venta → recurso

- **Pregunta:** cuánto te deja cada venta hoy, después de la pauta.
- **Botones:** [Casi nada] [Menos del 15%] [Más del 15%]
- **Tags:** `cl17-mg-nada` · `cl17-mg-bajo` · `cl17-mg-alto` · `env-D2A` · `toco-D2A`
- **Recurso (R3):** el simulador de suscripciones + el Loom de cómo usarlo (el del grupo de las 13:00).

| Botón | Por dónde va la primera línea |
|---|---|
| Casi nada | Estás comprando cada venta de nuevo. El simulador te muestra cuánto cambia eso. |
| Menos del 15% | Con ese margen, una suba del CPA te deja en breakeven. |
| Más del 15% | Tenés margen para pagar más por cliente que tu competencia. |

### D2-B · 19:30 · Hace cuánto no tenés un día bueno → recurso

- **Pregunta:** hace cuánto no tenés un día bueno.
- **Botones:** [Esta semana tuve] [Hace semanas] [Hace meses]
- **Tags:** `cl17-dia-bueno` · `cl17-dia-semanas` · `cl17-dia-meses` · `env-D2B` · `toco-D2B`
- **Recurso:** el caso de Lucas y Santi: 1,3 millones por día con 2,4% de margen, 600k abajo en una noche → 2,8 millones por día con 40% de margen (imágenes 1 a 3 del grupo + el video burbuja de 1 min).

| Botón | Por dónde va la primera línea |
|---|---|
| Esta semana tuve | Bien. La pregunta es si mañana se repite o depende de que la campaña no se caiga. |
| Hace semanas | Es la frase textual de Lucas: «hace mucho que no tenemos un día bueno». |
| Hace meses | Lucas estaba igual, y no tenía un mal producto ni malos creativos. |

> **Regla para no mentir:** el caso de Lucas va sin «suscripción», «suscriptores» ni «Método B.A.S.E.» al lado. Es prueba de que el equipo se mete en la marca y los números se mueven.

---

## 5. Día 3 · viernes 13 · Bajar el CPA no es la solución

### D3-A · 12:00 · Cómo te cambió el CPA → recurso

- **Pregunta:** cuánto te cambió el CPA en el último año.
- **Botones:** [Me subió mucho] [Más o menos igual] [No lo tengo claro]
- **Tags:** `cl17-cpa-subio` · `cl17-cpa-igual` · `cl17-cpa-nose` · `env-D3A` · `toco-D3A`
- **Recurso (R4):** video del Miro (5 a 7 min): por qué bajar el CPA no es la solución y cómo pagar más por cliente con más margen.

| Botón | Por dónde va la primera línea |
|---|---|
| Me subió mucho | La cadena: te salen competidores, suben los CPM, por ende sube el CPA. Bajarlo es la pelea equivocada. |
| Más o menos igual | Que esté igual no alcanza si cada venta te deja lo mismo que te cuesta. |
| No lo tengo claro | Es lo primero que se mira el martes. |

### D3-B · 19:30 · Cuánto podrías pagar por cliente → recurso

- **Pregunta:** si un cliente nuevo te costara el doble, lo pagarías.
- **Botones:** [Ni loco] [Depende] [Ya lo pago]
- **Tags:** `cl17-cac-no` · `cl17-cac-dep` · `cl17-cac-ya` · `env-D3B` · `toco-D3B`
- **Recurso (R5):** el video burbuja de la duda del día («sí Manu, pero el suscriptor me va a salir más caro»).

| Botón | Por dónde va la primera línea |
|---|---|
| Ni loco | Con compra única, tenés razón. Con un cliente que te compra varias veces, cambia la cuenta. |
| Depende | Depende de una sola cosa: cuántas veces te vuelve a comprar. |
| Ya lo pago | Entonces la pregunta es si ese cliente te lo cobrás una vez o todos los meses. |

---

## 6. Día 4 · sábado 14 · El margen está en tu base

### D4-A · 12:00 · Qué te frena de la suscripción → recurso

- **Pregunta:** qué te frena más de la suscripción.
- **Botones:** [Nadie se suscribe] [Se dan de baja] [Romper lo que anda]
- **Tags:** `cl17-obj-cultura` · `cl17-obj-bajas` · `cl17-obj-romper` · `env-D4A` · `toco-D4A`
- **Recurso (R6):** los flujos de retención de email y WhatsApp + el Loom de cómo implementarlos (el del grupo de las 13:00).

| Botón | Por dónde va la primera línea |
|---|---|
| Nadie se suscribe | 3.943 suscriptores activos en Argentina. No es cultura, es cómo se arma. |
| Se dan de baja | Se quedan si tenés buenos procesos de retención. Estos son los míos. |
| Romper lo que anda | Va al lado de la compra única, sin tocarla. Seguís vendiendo igual. |

> El que respondió SUSCRIPCIÓN al mail 0 ya tiene los flujos. La primera línea igual sirve; lo nuevo es el Loom.

### D4-B · 19:30 · Cada cuánto se termina tu producto → recurso

- **Pregunta:** cada cuánto se le termina el producto a tu cliente.
- **Botones:** [Menos de 30 días] [Entre 30 y 60 días] [Más de 60 días]
- **Tags:** `cl17-ciclo-30` · `cl17-ciclo-60` · `cl17-ciclo-mas` · `env-D4B` · `toco-D4B`
- **Recurso:** sin video. La respuesta es si su ciclo entra en suscripción + la captura del panel de suscriptores. Cierra con «si querés que lo mire con tu producto, escribime al privado» (wa.link de Manu, como en el grupo).

| Botón | Por dónde va la primera línea |
|---|---|
| Menos de 30 días | Es el ciclo ideal: tu cliente vuelve todos los meses. |
| Entre 30 y 60 días | Entra: la frecuencia se ajusta al ciclo, no al revés. |
| Más de 60 días | Entra igual, con otra frecuencia y otra oferta. |

---

## 7. Día 5 · domingo 15 · Cómo ganarle a toda tu competencia

### D5-A · 12:00 · Cuántas veces te compra el mismo cliente → recurso

- **Pregunta:** cuántas veces te compra el mismo cliente.
- **Botones:** [Una sola vez] [2 o 3 veces] [No lo sé]
- **Tags:** `cl17-ltv-1` · `cl17-ltv-2a3` · `cl17-ltv-nose` · `env-D5A` · `toco-D5A`
- **Recurso (R7):** video «Cómo ganarle a toda tu competencia» (10 min, el del grupo de las 12:00). La cuenta: 30.000 con compra única → 90.000 con tres compras → operar en 75.000.

| Botón | Por dónde va la primera línea |
|---|---|
| Una sola vez | Tu techo de pauta es lo que te deja esa venta. Con tres compras, es el triple. |
| 2 o 3 veces | Ya tenés la recompra: falta cobrarla sin volver a pautarla. |
| No lo sé | Es el número que más cambia la cuenta. Acá ves por qué. |

> El grupo manda este video a las 12:00, a la misma hora. Opción: correr el D5-A a las 11:00. Ver decisión 6.

### D5-B · 19:30 · Usaste el simulador → recurso

- **Pregunta:** ya cargaste tus números en el simulador.
- **Botones:** [Sí, ya lo usé] [Todavía no]
- **Tags:** `cl17-sim-si` · `cl17-sim-no` · `env-D5B` · `toco-D5B`
- **Recurso:** «Sí» → «mandame el número que te dio y llegás al martes con tu cuenta hecha». «Todavía no» → el simulador de nuevo.

---

## 8. Día 6 · lunes 16 · Mañana a las 18

### D6-A · 12:00 · Qué querés llevarte de la clase → recurso

- **Pregunta:** qué querés llevarte de la clase de mañana.
- **Botones:** [Escalar la pauta] [Ordenar el margen] [Armar suscripción]
- **Tags:** `cl17-quiere-escalar` · `cl17-quiere-margen` · `cl17-quiere-sus` · `env-D6A` · `toco-D6A`
- **Recurso (R8):** el video spoiler preparando la clase (1 a 2 min, el del grupo de las 13:00). Sirve también al closer: sabe qué vino a buscar cada uno.

| Botón | Por dónde va la primera línea |
|---|---|
| Escalar la pauta | Mañana ves cómo pagar más por cliente que tu competencia y que te siga quedando plata. |
| Ordenar el margen | Mañana ves de dónde sale el margen que hoy se lleva tu competencia. |
| Armar suscripción | Mañana ves cómo se arma, al lado de la compra única, sin romper lo que vende. |

### D6-B · 19:30 · Los regalos + el link

- **Qué va:** los regalos de la clase: 3 de los +30 agentes de IA, a elección, **solo para los que se quedan hasta el final** (la slide de los agentes, imagen 7 del grupo). No se ofrecen ni se piden acá: se anuncian.
- **Cierre:** «mañana a las 18. te mando el link por acá así no lo andás buscando?» → **[Sí, mandámelo]** (`cl17-quiere-link`). Ese botón deja gratis los recordatorios del martes.

---

## 9. Día de la clase · martes 17

| Hora | Qué va | Botones | Tags |
|---|---|---|---|
| 10:00 | **Con foto** de Manu con la presentación. «hoy es el día» + hora (18:00 ARG) + lista con ✅ de lo que se ve en vivo. | [Ahí estaré] [Llego tarde] | `cl17-confirma` · `cl17-tarde` |
| 12:00 | «liberate de 18 a 19:30, compu y no celular, algo para anotar» + traé tu número del simulador + «ya lo tenés bloqueado en el calendario?» | [Sí, ya lo bloqueé] | `toco-D7-12` |
| 15:00 | **Con foto** de la slide de los agentes: faltan 3 horas, esto se llevan los que se quedan hasta el final. | [Ya me liberé] [Llego justo] | `toco-D7-15` |
| 17:00 a 18:30 | **11 envíos sin botones**, foto y texto alternados (nunca dos del mismo formato seguidos). Link desde las 17:45. Cada 5 min en la primera media hora. | — | — |

**La cuenta regresiva (11 envíos):**

| # | Hora | Formato | Qué dice | Link |
|---|---|---|---|---|
| 1 | 17:00 | Foto (preparando todo) | Falta 1 hora | — |
| 2 | 17:30 | Texto | Media hora, buscá un lugar tranquilo | — |
| 3 | 17:45 | Foto (frente a la cámara) | 15 minutos | ✓ |
| 4 | 17:55 | Texto | Estamos entrando | ✓ |
| 5 | 18:00 | Foto (la sala con gente adentro) | 🔴 Arrancamos | ✓ |
| 6 | 18:05 | Texto | Ya arrancó, entrá ahora | ✓ |
| 7 | 18:10 | Foto (la slide de los agentes) | Los regalos son para los que se quedan hasta el final | ✓ |
| 8 | 18:15 | Texto | Si recién llegás, entrá igual: lo más importante todavía no pasó | ✓ |
| 9 | 18:20 | Foto (los números de Manu en pantalla) | Manu está mostrando sus números | ✓ |
| 10 | 18:25 | Texto | Después se hace difícil engancharla | ✓ |
| 11 | 18:30 | Foto (captura del chat) | Mirá lo que está pasando | ✓ |

> **Ventana cerrada todo el día** (no tocó nada desde el lunes): solo 3 recordatorios pagos: 17:00 (falta 1 hora), 17:45 (15 min + link) y 18:00 (arrancamos + link).
>
> Ese día no hay preguntas de valor: la venta es la clase.

---

## 10. Post-clase · del martes 17 al sábado 21

El llamado a la acción es **aplicar** (el formulario). Nunca «agendá». Los 3 agentes se piden por el **privado de Manu** (wa.link/ouqu06), como propone `../mejoras-whatsapp-cruce-naza.md`.

| Cuándo | Qué va | Botones | Tags |
|---|---|---|---|
| Al terminar (~19:35) | «pudiste estar en la clase?» | [Sí, estuve] [No pude] | `cl17-estuvo` · `cl17-no-pudo` |
| Si estuvo | Los agentes en 2 pasos: 1) escribime al privado qué fue lo más útil de la clase, 2) elegí tus 3. + «si querés que lo apliquemos en tu marca, aplicá acá» con el link de aplicación. | — | `cl17-pidio-agentes` (lo marca el equipo) |
| Si no pudo | «contame para qué la aplicarías y te mando la repetición» → **responde con texto libre** → la repetición, con hasta cuándo está. | (texto libre) | `cl17-pidio-replay` |
| Mié 18 · 12:00 | Estuvo: dos caminos. No pudo: «pudiste ver la repetición?» | [Quiero aplicar] [Tengo dudas] / [Sí, la vi] [Todavía no] | `cl17-quiere` · `cl17-dudas` · `cl17-vio-replay` |
| Mié 18 · 19:30 | «quedó algo de la clase que quieras hablar conmigo?» | [Sí, escribime] [Por ahora no] | `cl17-hablar` → aviso al equipo |
| Vie 20 · 12:00 | Quedan [N] lugares (solo con el número real) + aplicación. | [Quiero aplicar] [Tengo dudas] | `cl17-quiere` · `cl17-dudas` |
| Sáb 21 · 12:00 | «hoy a la noche cierro los lugares de Génesis. si querés entrar o ver si sirve para tu marca, es AHORA» + aplicación. | — | — |

**Qué pasa en cada rama:**

| Rama | Qué pasa |
|---|---|
| [Quiero aplicar] | El link del formulario. Si no aplicó en 24 hs, se le avisa al equipo. |
| [Tengo dudas] / [Sí, escribime] | Aviso al equipo + «te escribo por privado». Ver decisión 3. |
| [Todavía no] (la repetición) | El link de nuevo, con hasta cuándo está. |

---

## 11. Casos borde

| Caso | Qué pasa |
|---|---|
| Se registra del domingo 08 al martes 10 | Registro + la pregunta liviana de la noche. Entra a la nutrición el miércoles 11 (el D1-A le sale como plantilla, porque la ventana ya se cerró). |
| Se registra durante la nutrición, antes de las 19:30 | Registro + la pregunta liviana esa noche. Al día siguiente entra al día del calendario. |
| Se registra después de las 19:30 | Solo el registro. La ventana le queda abierta para el mediodía siguiente. |
| **Entró tarde y se perdió piezas** | El grupo no le muestra los mensajes anteriores. El registro le manda el roadmap (I.5); el simulador y los flujos le llegan en los días 4 y 5. Opción: un paso I.6 con «lo que te perdiste» (ver decisión 7). |
| Se registra el martes 17 | I.1 + I.2 y directo a los recordatorios de la clase. |
| No toca ningún botón | Al día siguiente, una sola plantilla de reactivación (la pregunta del día). Si tampoco toca, sale de la nutrición y solo recibe los 3 recordatorios pagos del martes. |
| Estaba en el flujo de la clase del 19/10 o del 24/10 | El registro nuevo lo saca de cualquier workflow viejo. |
| Ya es cliente o ya aplicó | Se excluye del flujo (tag del tracker o etapa del pipeline). |
| Prioridad (`cl17-perfil-ya` o `cl17-urg-mes`) | El equipo le escribe después de la clase aunque no toque nada. |

---

## 12. Recursos: lo que ya está y lo que falta

### Videos selfie y fotos

| # | Qué es | Dónde va | Día | Estado |
|---|---|---|---|---|
| V1 | Video selfie de bienvenida (30 a 45 s): este chat es solo tuyo, el grupo es para todos, tocá los botones | I.1 | Registro | **Falta grabar** |
| F1 | Foto del asunto del mail 0 y de las 3 bandejas | I.2 | Registro | **Falta** (se saca cuando el mail esté cargado) |
| F2 | Captura del antes y el después de Manu (60M → $275M, panel de suscriptores) | D1-B, D4-B | Mié 11, sáb 14 | Confirmar cuál se usa (las del grupo) |
| F3 | Imágenes 1 a 3 del caso Lucas | D2-B | Jue 12 | Listas en el Google Doc del grupo |
| F4 | Foto de Manu con la presentación | Martes 10:00 | Mar 17 | **Falta** |
| F5 | Slide de los +30 agentes de IA | D6-B, martes 15:00 y 18:10 | Lun 16, mar 17 | La misma del grupo (imagen 7) |
| F6 a F9 | Preparando, frente a la cámara, la sala, el chat | Cuenta regresiva | Mar 17 | Se sacan en el momento |

### Links

| # | Qué es | Dónde va | Estado |
|---|---|---|---|
| R1 | Roadmap de suscripciones | I.5 | ✅ [Genesis OS · Roadmap](https://claude.ai/artifact/UWdokPpLb9w1SfZxjyrksQ?sk=3d0SiGnNdAxLPNaVG-ELHA) |
| R2 | Video «Por qué cada venta te cuesta lo mismo» (3 min) | D1-A | **Falta link** (YouTube oculto o Loom) |
| R3 | Simulador + Loom de cómo usarlo | D2-A, D5-B | ✅ [Calculadora de Suscripciones](https://claude.ai/artifact/Da322JsJroGQQVhEQMDPHm?sk=M53fse_xVzsmn2nVJZzDCQ) · **falta el Loom** |
| R4 | Video del Miro, el CPA (5 a 7 min) | D3-A | **Falta link** |
| R5 | Video burbuja «el suscriptor sale más caro» | D3-B | **Falta link** |
| R6 | Flujos de retención + Loom | D4-A, I.2b | ✅ [Genesis OS · Flows de email](https://claude.ai/artifact/DKfo3RdvAohQnNeRZJT1rh?sk=QQcZZBQAZC6GwJnOvBXs8A) · **falta el Loom** |
| R7 | Video «Cómo ganarle a toda tu competencia» (10 min) | D5-A | **Falta link** |
| R8 | Video spoiler preparando la clase | D6-A | **Falta link** |
| L1 | Grupo de WhatsApp | I.1 | El del mail 0: `chat.whatsapp.com/HBbSIYz620WJgSQp0ZuVDJ`. **Confirmar** que es el del 17/11 (la thank you todavía tiene el viejo). |
| L2 | Link de la clase | Cuenta regresiva | **Falta** |
| L3 | Formulario de aplicación | Post-clase | **Falta** |
| L4 | Repetición y hasta cuándo está | Post-clase | **Falta** |
| L5 | Privado de Manu | D4-B, post-clase | ✅ https://wa.link/ouqu06 |

---

## 13. Reglas cuando la ventana está cerrada

- Antes de cada envío que no es respuesta a un botón va el **Customer Service Window Check**. Abierta → mensaje interactivo (gratis). Cerrada → la plantilla aprobada con el mismo texto (paga).
- Plantillas que hacen falta (todas nuevas): I.1 (con video), I.2 (con foto), las 12 de reactivación (D1-A a D6-B), martes 10:00 (con foto), 12:00, 15:00 (con foto), los 3 recordatorios pagos (17:00, 17:45, 18:00), «pudiste estar?», viernes 20 y cierre del sábado 21.
- **Ninguna plantilla nombra la fecha** salvo las del martes y las del post-clase, así se reusan en el próximo evento.
- Máximo 3 botones, 20 caracteres por botón. Todos los botones de este script están dentro del límite.
- El nombre nunca al principio ni al final de la plantilla («che {{1}},» / «buenas {{1}},»).
- **Cuenta en trámite:** las plantillas se mandan a aprobar el mismo día que se apruebe la cuenta. Si el miércoles 11 no están aprobadas, ese día corre solo para los que tienen la ventana abierta.

---

## 14. Decisiones que tomé y datos que faltan

**Decisiones (confirmalas o cambialas):**

1. **Sin preventa** (Santi, 07/11). Los agentes se anuncian el lunes 16 y el martes, pero no se piden por el chat hasta después de la clase.
2. **El recurso de cada A es la pieza del grupo de ese día, una hora antes.** Para el lead del chat se siente personal («a vos te lo paso antes»), y no hace falta producir recursos nuevos.
3. **Quién atiende a los derivados del post-clase** ([Tengo dudas], [Sí, escribime], prioridad, los que piden los agentes): **el privado de Manu**, como en el grupo. Si lo atiende Mati o el closer desde su número, cambia el texto de esas ramas.
4. **Perfiles:** ya vende con suscripción / nunca la probó / la probó y no anduvo. El avatar ampliado (vende en Mercado Libre o importa) entra en «nunca la probé».
5. **Números:** 3.943 suscriptores y $275M (los confirmados el 02/11). El grupo usa «+3.500» y «menos del 5% de churn»; el dato confirmado es **7,2% de cancelaciones**, así que el chat no menciona el churn.
6. **D5-A a las 12:00** choca con el video del grupo, que sale a la misma hora. Propongo correrlo a las 11:00 ese día.
7. **«Lo que te perdiste»:** propongo sumar un I.6 para el que se registra desde el jueves 12, con el simulador y los flujos en un mensaje, porque en el grupo no los va a ver.
8. **Repetición:** el grupo la manda abierta el miércoles 18. En el chat, el que no pudo la recibe la noche del martes contando para qué la usaría, antes que el grupo.

**Datos que faltan para la capa 2 (mensajes):**

1. Links de los videos R2, R4, R5, R7 y R8, y los Looms del simulador y de los flujos.
2. Link de la clase, del formulario de aplicación y de la repetición (con hasta cuándo está).
3. Confirmar que el grupo del mail 0 es el del 17/11.
4. Qué preguntas tiene el formulario de registro, para no repetirlas en I.3 e I.4.
5. Quién carga el flujo en GHL y con qué número sale (¿el de Manu?).
6. 5 a 10 mensajes reales de Manu por WhatsApp, para calcar la voz en la capa 2 (pendiente desde el 30/09).
7. Si hay audiencia fuera de Argentina, para los horarios con banderas del martes.
