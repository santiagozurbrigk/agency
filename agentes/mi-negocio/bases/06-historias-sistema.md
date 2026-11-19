# Base 06 — Historias: sistema semanal y métricas

Aplicación a Génesis del SOP 06 (`../teoria-sops/sop-06-historias-interes-compuesto.md`). Actualizado 19/11/2026.

> Cómo leer este archivo. Lo que va entre « » es textual de una llamada, un formulario, el SOP o un archivo del repo, y lleva su fuente (ruta relativa a `mi-negocio/`, o `CONTEXTO.md`). `[HIP]` = hipótesis sin validar. `[PENDIENTE: …]` = dato que no está en el repo y alguien lo tiene que dar. `[CONFIRMAR MANU]` = frase personal que solo vale si a Manu le pasó así; si no, se reescribe con lo que le pasó. `[CARGAR]` = captura o foto real que hay que conseguir; sin ella, la historia no sale. Los términos del SOP se usan tal cual los dice el autor: secuencia, depósito del 1 %, la misma persona, la cadena de cuatro días, el hilo, la barra (carga / descarga), hypear, los cuatro trabajos (nutrición, conexión y perspectiva, atracción, CTA), CTA de tráfico, romper el patrón, caída entre historias, respuestas sobre visitas, tu vara. La base de todo es el avatar nuevo (`bases/01-avatar.md`): subavatares S1, S2, S3, mapa de dolores 1–10 y ángulos A–I.

---

## Resumen en una pantalla

1. **Las historias de Génesis hoy existen solo para lanzamientos.** No hay ni una secuencia escrita para los días sin lanzamiento, y no hay ni un número de historias registrado en todo el repo (visitas, caída, respuestas). Para el SOP las dos cosas son graves: «no se trata de hacer la mejor estructura… se trata de **no cortar el depósito**», y sin datos no se puede «crear sobre el dato». Esta base arma el sistema evergreen (fuera de lanzamiento) y la planilla para medirlo.
2. **Una secuencia por día, todos los días, con un solo trabajo** (nutrición, conexión y perspectiva, atracción o CTA). Antes de subir, una línea: «qué quiero que se lleven». Si no se puede escribir, no se sube. (Esto ya se hacía en los v3 con «Al terminar tiene que pensar»: se mantiene.)
3. **Un dolor por semana (el hilo), sacado de las llamadas de la semana anterior.** Semana A (23 al 29/11): **S1, dolor 1 "no hay estabilidad"** («hace mucho que no tenemos un día bueno»). Semana B (30/11 al 6/12): **S2, dolor 9 "mi producto no es para suscripción"**. Es la "semana por subavatar" que ya decidió la base 01 (§5.4). Si las llamadas del 18 al 21/11 traen otro motivo de no cierre, ese manda.
4. **La cadena de cuatro días cierra cada semana** (jueves valor y dejarlo picando → viernes pedido → sábado objeción → domingo prueba), con **tres días de carga antes** (conexión, nutrición, atracción). Resultado: **2 pedidos en 14 días**, contra 12 secuencias con pedido planificadas entre el 9 y el 18/11 (`lanzamientos/2026-11-17-webinar/historias/historias-v3-*.md`). El dato del SOP: «los meses en los que más plata hicimos son los meses en los que menos pedidos tiramos».
5. **CTA de tráfico ≠ CTA de calificación.** Semana A: CTA de tráfico, palabra **FLUJOS** (los flujos de retención de Manu), tres historias, cero valor en el medio. Semana B: CTA de calificación, palabra **TRATAMIENTO**, filtra a S2. ADENTRO queda solo para lanzamientos.
6. **Las hace Manu, con su voz.** El SOP es tajante: «se nota cuando las arma otro, siempre». Hoy las arma el equipo en Figma y Manu no graba desde el 12/11. Decisión: Santi (el growth) da estructura y datos (este archivo y la ficha diaria); Manu escribe el texto final, elige la foto y sube desde su celular. Las fotos con texto sirven (el SOP muestra historias de «una sola foto y una sola frase»), pero el texto tiene que ser de él. Es la contradicción más fuerte entre el SOP y cómo se viene trabajando.
7. **Registro de escritura: lógica, riesgo y resultado** (Génesis le vende a negocios). La conexión toca identidad sin cambiar de registro. El documento del avatar se abre al escribir cada secuencia.
8. **Se miran 3 números, en este orden:** caída entre historias (~5 % normal, ≥10 % alarma), visitas (termómetro), **respuestas sobre visitas** (1–5 % sano, 7–10 % muy bueno). Los likes no juzgan una secuencia. La vara es el promedio de las últimas 10 secuencias de Manu, no un benchmark. Planilla al final (§Métricas).

---

## Paso 0 — De dónde parte Génesis (el plan de acción del SOP, aplicado)

El plan de acción del SOP [pantalla 23:20] tiene 5 pasos. Así quedan con lo que hay en el repo:

| # | Paso del SOP | Lo que se puede contestar hoy | Lo que falta |
|---|---|---|---|
| 1 | «Mirá tus últimos siete días de historias y contá cuántas tenían una idea adentro y cuántas subiste para cumplir.» | Lo **planificado** del 12 al 18/11 (v3): las 17 secuencias y sueltas tienen escrito «Al terminar tiene que pensar», o sea una idea adentro. Ninguna está planificada "para cumplir". | Lo que **se subió de verdad**, si se subió como estaba escrito y qué se subió fuera de plan [PENDIENTE: Santi/Mati, exportar del archivo de historias de IG del 12 al 18/11]. |
| 2 | «Contá cuántos pedidos tiraste este mes y cuántos días de valor hubo entre uno y otro.» | Planificado del 9 al 18/11: **12 secuencias con pedido** (ADQ-1, ADQ-2, NUT-1, NUT-2, NUT-4, ADQ-3, NUT-5, NUT-6 noche, CLASE-1, CLASE-4, CLASE-5, POST-1) y **un solo día sin pedido** (13/11: NUT-3, «valor, sin CTA»). Más el anuncio del 08/11 (`_archivo/historias-lanzamiento.md`). | Lo publicado real, y qué hubo del 23/10 al 04/11 (entre la repesca y el hype del 17/11) [PENDIENTE: Santi, del archivo de IG]. Si en ese hueco no se subió nada, es el «Síndrome del Que Solo Aparece a Pedir». |
| 3 | «Pedile a tu equipo de ventas (o sacá de tus chats) los dos motivos por los que no cerraron las últimas llamadas. Esos son tus próximos dos días de historias.» | Motivos de no cierre del lanzamiento del 19/10: 7 aplicaron y 0 compraron desde anuncios (`lanzamientos/2026-10-19-clase/analisis/conclusiones.md`), sin motivo registrado. Lo que más frena, según el banco: «no quiero romper lo que funciona» (B2B-11: «Es lo que más frena a este avatar») y «mi producto no es para suscripción» (B2B-08: «casi deja a Alan afuera»). | Los motivos reales de las llamadas del 17/11 [PENDIENTE: closer, anotar por llamada «por qué no cerró / qué lo frenó / qué se dijo antes de decidir» y pasárselo a Santi el domingo 22/11]. Hasta tenerlos, los dos días de objeción del calendario (A6 y B6) usan B2B-07 y B2B-11. |
| 4 | «Armá una cadena de cuatro días sobre un solo dolor: valor, pedido, objeción, prueba.» | Hecho abajo: dos cadenas (§4 y §5). | — |
| 5 | «Medí las tres métricas de la sección ocho durante dos semanas y anotá cuál fue tu mejor secuencia y por qué.» | Planilla lista (§Métricas). Las dos semanas del calendario son esas dos semanas. | Cargar los números de cada secuencia a las 24 h [Santi]. |

**Lo que se lee de esto:** el planificado de noviembre es una semana de pedido casi diario. El SOP no habla de lanzamientos en particular, pero lo pone en la lista de errores: «Desaparecés durante días y reaparecés cuando necesitás algo: un CTA, **un lanzamiento**, un recordatorio» [pantalla 21:35]. Lo que se juega en el próximo lanzamiento depende de lo que se suba entre este y el próximo.

---

## Paso 1 — Los principios del SOP, traducidos a reglas de Génesis

| Principio del SOP | Qué significa en Génesis | Regla operativa |
|---|---|---|
| **Ninguna historia vende: lo que vende es la suma** («+1% por día» hasta que «esa persona te escribe») | El dueño de una marca de consumibles no escribe por una historia. Escribe el día que junta suficientes pedacitos: la cuenta, el tablero, que Manu "se mete en los números". | Una secuencia por día, todos los días, también fuera de lanzamiento. Cortar es perder la venta «sin enterarte: no aparece en ninguna métrica». |
| **Constante con propósito** | No subir "algo de Génesis" para cumplir. | La ficha diaria (§6) no se sube sin la línea de «qué quiero que se lleven». |
| **Una secuencia es una llamada de venta** («veinte secuencias en un mes son veinte llamadas con todos los que te siguen») | Cada secuencia hace con todos los seguidores lo que el closer hace con uno: problema → lo que pierde → cómo se resuelve → un paso. | La cadena de la semana sigue el orden de la llamada: dolor (A2/B1) → valor (A4/B4) → pedido (A5/B5) → objeción (A6/B6) → prueba (A7/B7). |
| **Las tenés que hacer vos** | El que habla es Manu: el personaje es «tu amigo que tiene marcas… y te abre sus números» (`negocio/marca-personal.md`). Si el texto lo escribe otro, se nota. | Santi arma estructura y datos; Manu escribe y sube (§2.1). |
| **Muchas secuencias para una sola persona** | La misma persona (S1 de la semana) ve el lunes la conexión, el martes la cuenta y el viernes el pedido. | Cada secuencia se escribe sabiendo qué vio ayer. El calendario dice en cada día qué recuerda de antes. |
| **El mejor seguimiento es una historia** | El que pidió FLUJOS y no contestó más no recibe un mensaje de "¿pudiste verlo?": ve la objeción del sábado y la prueba del domingo. | Los días 3 y 4 de la cadena cierran con «si me escribiste y quedó ahí, contestame acá». |
| **La barra (carga / descarga)** | Los 12 pedidos de noviembre descargaron una barra que casi no se cargó. | Por cada pedido, al menos tres días que den antes. Hypear el pedido el día anterior (A4, B4). |
| **La secuencia moldea creencias; las llamadas son el guion** | Lo que dijeron Herbora, Alan, Núñez y Lopo es el guion (`analisis-ventas-calificadas.md`). | Cada domingo el closer pasa los motivos de no cierre de la semana; el lunes se elige el dolor (§7.2). |
| **El copy no vende por palabras lindas** | «Si le vendés a negocios, decide por lógica, riesgo y resultado». Génesis le vende a negocios. | Registro: la cuenta, el margen, lo que arriesga. Palabras del avatar, no lemas (base 01, §1.3). |
| **Creá sobre el dato** | No hay datos de historias. | Primero dos semanas midiendo (§Métricas); después se optimiza una variable por vez. |
| **Romper el patrón** (pero «el que vive rompiendo el patrón también genera un patrón») | Desde el 11/11 todas las secuencias arrancan igual: «texto grande entre comillas» con la creencia (v3). A la tercera, la audiencia ya sabe qué viene. | La creencia entre comillas queda para nutrición y objeción; la atracción y el CTA de tráfico cambian de fondo y formato (§3.3, A5). |
| **No hay molde, hay criterio** | El calendario de abajo es un punto de partida, no una plantilla para repetir igual cada dos semanas. | Si una secuencia de 8 historias sostiene la retención, vale. Lo que se repite es lo que la planilla dice que funcionó. |

---

## Paso 2 — Preparación (una vez y después cada semana)

### 2.1 Quién crea (SOP §5.0.1)

| Rol | Qué hace | Qué no hace |
|---|---|---|
| **Manu (el creador)** | Escribe el texto final de cada historia con sus palabras (la columna «Texto» de abajo es un borrador para que la reescriba), elige la foto del día o se saca una, la sube desde su celular, contesta los DMs. Tiempo: el SOP habla de «una hora de tu día». | No sube una secuencia que no entienda o que no diría así. |
| **Santi (growth)** | Elige el dolor de la semana con lo que reporta ventas, arma la ficha diaria (trabajo, una línea, qué toca, qué captura hace falta), consigue las capturas, carga la planilla a las 24 h y le pasa a Manu qué funcionó. | No escribe las historias por Manu a largo plazo: «te terminás quemando vos». El SOP permite que **al principio** las haga el growth, y después delegar. Las dos semanas de este calendario son ese "principio": a partir de la tercera semana, Manu arma la secuencia desde la ficha. |
| **Closer / setter** | Contesta las palabras clave (FLUJOS, TRATAMIENTO) y anota los motivos de no cierre de cada llamada. | — |

**Sobre las fotos con texto (desde el 12/11 Manu no graba):** el SOP no exige video. Muestra historias de «una sola foto y una sola frase» que «generaron muchísima más conexión que secuencias enteras», y pone como formatos de conexión «selfies hablando, fotos más personales». Se puede sostener con fotos. Lo que no se puede, según el SOP, es que el texto lo escriba otro. [PENDIENTE: Manu decide si vuelve a hablar a cámara en conexión; si vuelve, las historias de conexión pasan a selfie hablando.]

### 2.2 El documento del avatar, abierto (SOP §5.0.2)

«Tené el documento de tu avatar abierto mientras escribís. No de adorno: abierto.» Para las historias, esta es la versión de bolsillo (de `bases/01-avatar.md`); el completo se abre igual.

| Pregunta del SOP | S1 · "Gonza", la marca en breakeven (semana A) | S2 · El fundador del tratamiento (semana B) |
|---|---|---|
| **¿Qué le interesa?** | Saber cuánto entra el mes que viene; volver a breakeven y de ahí subir («primeramente como el respirar… vamos a break-even al menos», Herbora) | Que el producto en el que cree se sostenga; que el cliente termine el tratamiento |
| **¿Qué le incomoda?** | Los días malos, la noche a pérdida («íbamos 600 lucas abajo… manotazo ahogado»), renovar creativos todos los días, que lo copien | Que le digan que el producto no sirve («varios me dijeron capaz que el producto no es bueno», Alan); la competencia que promete curar en 7 días |
| **¿Qué lo motiva?** | Estabilidad: «cerrar diciembre con algo estable» (Lopo, S3, mismo deseo) | «Le tengo mucha fe al producto» (Alan) |
| **¿Qué cree?** | «En Argentina no se suscribe nadie», «la solución es más creativos», «cuando encuentre la campaña que se estabilice, ya está» | «Mi producto no es para suscripción», «para vender hay que prometer más fuerte», «si es para una afección, van a cancelar más» (Herbora) |
| **Palabras que lo hacen sentir entendido** | día bueno · manotazo ahogado · renovar · 7 lucas · sobreviviendo · volver a cero | tratamiento · fe en el producto · «es totalmente mentira» |
| **Palabras que le suenan a humo** | promesas en días · «venís bien» · facturación sin ganancia · las prohibidas de `CONTEXTO.md` | lo mismo, y cualquier "cura" |

### 2.3 Registro de escritura (SOP §5.0.3)

**Lógica, riesgo y resultado.** Génesis le vende a dueños de negocio y Manu «explica con cuentas, no con motivación» (`CONTEXTO.md` → Voz y marca). Cada historia de nutrición tiene un número o una cuenta adentro; cada objeción se rompe con un dato o con lo que arriesga el que no cambia. La conexión toca identidad (el que «sabe una banda y no se la cree»), pero sin pasar al registro emocional de la venta a personas.

Forma del texto (se mantiene de los v3, porque es como Manu escribe y no hay dato de que no funcione): **minúscula, sin ¿ ni ¡, nunca «ustedes»**, voseo. Prohibidas en historias: webinar, programa, secreto, hack, transformación, mindset, «te garantizo», precio. Al lado de un caso de tercero no van nunca «suscripción», «recompra», «el 1 del mes» ni «Método B.A.S.E.» (regla de `lanzamientos/2026-11-17-webinar/ads/ads-nutricion.md`).

### 2.4 Congruencia reels ↔ historias (SOP §5.0.4)

«Si no te ven las historias… entran por un reel de una cosa y se encuentran con otra, y eso es incongruencia.»

| Por dónde entra la gente hoy | De qué le hablan | Qué tienen que encontrar en historias |
|---|---|---|
| Ads N1–N9 y D3_V6 / D4_V3 (`lanzamientos/2026-11-17-webinar/ads/ads-adquisicion.md`) | 270 millones, el ban de Meta, días buenos, copias, recompra y margen | Los mismos dolores, en el mismo lenguaje: semana A (días buenos) y semana B (el producto en el que cree) están en el mapa de dolores de la base 01 |
| Bio de IG (`evergreen/perfil-ig/optimizacion-perfil.md`) | «3.943 suscriptores · 7,2% churn», palabra SUSCRIPCIÓN | Los mismos dos números, siempre con captura |
| Reels orgánicos | [PENDIENTE: no hay plan de reels orgánicos en el repo; lo define la base 05] | Cuando exista, el dolor de la semana de historias tiene que ser el mismo que el de los reels de esa semana |

**Riesgo concreto:** los ads con el ban como dolor central (N7, D3_V6) traen al seguidor ideal; si en historias solo se habla de suscripción y LTV, el que entró por "me bajan la cuenta" no encuentra lo que vino a buscar. Por eso la atracción de la semana A (A3) toca el mes que arranca cobrado, que es la otra cara del ban.

### 2.5 Si el growth toma una cuenta (SOP §5.0.5): analizar el archivo antes de cambiar nada

Santi es el growth detrás de la marca de Manu. El SOP pide, antes de cambiar nada: «abrí el archivo de sus historias y de sus reels, desarmá todo, ponelo en un Miro, armá por qué funcionó y por qué no, encontrá los patrones del creador y replicalos».

[PENDIENTE: Santi — exportar del archivo de IG todas las secuencias desde el 01/10 (capturas + Insights de cada historia: vistas, respuestas, salidas, toques en el sticker), pasarlas a un tablero y cargarlas en la planilla de §Métricas. Es la única forma de tener "tu vara" desde el día 1 en vez de esperar 10 secuencias nuevas.]

Mientras tanto, lo que este calendario **no cambia** de lo que se venía haciendo, porque es lo que hay y no hay dato en contra: la foto de Manu con texto en minúscula, la creencia entre comillas como hook de las nutriciones, los loops con respuestas reales («si nadie contestó, esa historia no sale»), las capturas tapadas y la línea final de «qué tiene que pensar».

---

## Paso 3 — Los cuatro trabajos de una secuencia, aplicados a Génesis

«No todas las secuencias hacen lo mismo, y confundirlas es lo que hace que ninguna funcione.» [pantalla 09:10]

### Tabla de los cuatro trabajos (la del SOP, con el material de Génesis)

| Trabajo | Objetivo (SOP) | Formato en Génesis | Largo / texto | Qué NO buscar | Material de Génesis que lo alimenta |
|---|---|---|---|---|---|
| **Nutrición** | Que se lleven una idea adentro; subir consciencia | Creencia del avatar entre comillas → por qué tiene sentido → reencuadre → la cuenta o el dato que lo sostiene. Armada «de atrás para adelante como un reel» | Larga: 6 a 8 historias, mucho texto, fricción a propósito | Alcance o respuestas | Las 11 creencias limitantes (`analisis-ventas-calificadas.md`), la cuenta canónica 30.000 / 90.000 / 75.000 (`CONTEXTO.md`), el test del piso (`lanzamientos/2026-10-24-repesca/historias/historias.md`, H-3) |
| **Conexión y perspectiva** | Cercanía; moldear creencias «sin enseñar» | Foto de Manu en su día (mate, depósito, escritorio, Mar del Plata), su opinión, lo que aprendió en sus marcas, el behind the scenes de stock y packaging (`negocio/marca-personal.md` → Cómo se muestra) | Libre | Que parezca clase | Historia de origen: 60 millones con compra única, fórmula a 12.000 contra 4.500, «creía que en Argentina nadie se suscribe» (`marca-personal.md`) |
| **Atracción** | Levantar visitas; romper el patrón para que la próxima secuencia tenga más alcance | POV, foto con una frase, opinión corta, algo del momento, secuencia estética del día | Corta: 1 a 3 historias | — | Behind the scenes de sus marcas; el panel con las recurrencias del día [CARGAR] |
| **CTA** | Respuestas al pedido | Promesa del recurso + prueba o detalle + «respondé [PALABRA] y te lo paso». Otro fondo que el resto de la semana | Mínimo: 2 o 3 historias. «Cuanta menos fricción, más respuestas» | Romper paradigmas, meter texto, valor en el medio (si es de tráfico) | Recursos que ya existen: los flujos de retención de mail y WhatsApp (regalados en el grupo el 14/11), la Cuenta del CPA (CTA «mandame CUENTA» en `evergreen/youtube/funnel-youtube.md`), la biblioteca de agentes (`lanzamientos/2026-11-17-webinar/bonus-agentes/`) |

### 3.1 Nutrición en Génesis

- **Idea concreta y bien empaquetada:** una creencia por secuencia, y una sola cuenta o dato que la rompa. «Primero sabés qué vas a expresar (qué creencia vas a romper, qué objeción vas a resolver, de qué los vas a hacer conscientes), desde qué ángulo y en base a qué.»
- **En base a qué:** en Génesis, siempre a una cuenta o una captura (regla de `CONTEXTO.md`: «sin captura no hay número»).
- **Ejemplo ya hecho que cumple el trabajo:** NUT-3 del 13/11 («tengo que conseguir clientes más baratos» → la cuenta de lo máximo que podés pagar, sin CTA) y H-1 de la repesca («¿cuánto podés pagar por un cliente?», 8 historias de cuenta, sin CTA).

### 3.2 Conexión y perspectiva en Génesis

- «Acá es donde más moldeás creencias, porque la persona no siente que le estás enseñando: siente que te conoce.»
- Para Manu: lo que mira primero el lunes, lo que le pasaba cuando facturaba 60 millones con compra única, la fórmula cara, la reposición de stock, lo que aprendió esta semana con una marca (sin nombrarla). Lo que **no** se muestra: viajes, autos, lujo (`marca-personal.md`: «el avatar no le compra "al que viaja", le compra "al que tiene el tablero"»).
- **Hoy casi no existe:** en los v3, lo personal aparece solo como fondo de la historia 2 («foto en la cocina con el mate») de secuencias que son de nutrición o de venta. No hay ni una secuencia cuyo trabajo sea conectar. «Si tu semana es solo nutrir y pedir, nutrir y pedir, tu audiencia encuentra el patrón y deja de interesarle.»

### 3.3 Atracción en Génesis

- «Si no metés atracción en el medio, te quedás siempre en los mismos números.» Va una por semana, el día antes de la cadena (para que el día 1 y el pedido lleguen a más gente), y cada vez que las visitas vengan bajando (§Métricas, diagnóstico).
- Formato: POV o foto con una frase, sin explicación. El autor: «van por sobre la media porque también van de conexión».
- Hooks gastados que no se usan en este nicho [HIP: consciencia alta en e-commerce]: «mi competencia me va a matar por esto», «nadie te cuenta esto», «el secreto de…».

### 3.4 CTA en Génesis

- **CTA de tráfico** (semana A, FLUJOS): busca volumen de respuestas. Todo apunta al recurso. Tres historias.
- **CTA de calificación** (semana B, TRATAMIENTO): el SOP permite «CTAs que nutran en el medio, pero entonces no son de tráfico: son las que buscan más calificación, un dolor puntual o validar algo». Pide datos (qué vende, cuánto tarda en hacer efecto, cada cuánto se termina) y filtra a S2.
- **Palabras clave:** una por recurso, siempre en mayúscula y resaltada. ADENTRO queda para registros de lanzamiento; SUSCRIPCIÓN es la de la bio. [PENDIENTE: Santi — ¿hay automatización que conteste la palabra clave por DM? Si no, la contesta el setter a mano en menos de [HORAS] y lo anota en la planilla.]
- **Lo que no se ofrece en un CTA:** la auditoría de números (es el entregable 1 de Génesis, pago, `CONTEXTO.md`), ni precio.

---

## Paso 4 — La cadena de cuatro días, aplicada a Génesis

Texto del SOP [pantalla 06:20]: día uno «aportás valor y lo dejás picando» → día dos «el pedido» → día tres «rompés una objeción» → día cuatro «testimonios». «En cuatro días lo hiciste pasar de ser consciente de un problema a estar convencido de tu solución. Y no le mandaste un solo mensaje de seguimiento.»

| Día de la cadena | Qué hacés (SOP) | Qué pasa en la persona (SOP) | En Génesis |
|---|---|---|---|
| **Día uno** | «Le hablás de un problema que tiene y le decís que mañana vas a subir un video explicando exactamente cómo lo resolviste.» | «se queda con la expectativa» | Un problema del dolor de la semana + «mañana te paso [el recurso] que uso yo». Como Manu no graba, el "video" es el recurso que ya existe (los flujos, la cuenta) o la respuesta por chat. Es el hype del pedido. |
| **Día dos** | «Tirás el CTA. Entra al chat.» | «Entra al chat.» | 2–3 historias, palabra clave. El setter contesta y anota. |
| **Día tres** | «La persona que entró al chat y se colgó ve esa historia, se siente identificada y vuelve a contestar sola.» | «vuelve a contestar sola» | La objeción que más frena a ese subavatar (banco B2B), rota con un dato de Manu. Cierra con «si me escribiste y quedó ahí, contestame con lo que te frenó». |
| **Día cuatro** | «El que seguía dudando ve que el mecanismo funciona, y el que ya agendó llega a la llamada habiendo visto la prueba.» Audio: también «mostrar mi programa por dentro». | «llega a la llamada habiendo visto la prueba» | Caso con captura (Herbora, con las reglas de terceros) o el tablero de Manu, y Génesis por dentro (llamadas 1 a 1, chat con Manu, campus) sin precio. |

**La condición es el hilo:** las cuatro piezas (y los tres días de carga de antes) giran alrededor del **mismo dolor**. Si el jueves es inestabilidad, el sábado no se rompe la objeción del ban.

**Cuándo se pide en Génesis fuera de lanzamiento** [PENDIENTE: Santi y Manu — ¿después del 20/11 Génesis sigue vendiéndose por aplicación o llamada, o queda cerrado hasta el próximo lanzamiento?]. Los dos CTA del calendario están pensados para que funcionen en los dos casos: piden una respuesta por DM (recurso o situación), y el setter decide si sigue a llamada. Si Génesis queda cerrado, el día 4 muestra cómo se trabaja por dentro sin decir que hay lugares.

---

## Paso 5 — Calendario evergreen de 2 semanas (fuera de lanzamiento)

**Fechas:** lunes 23/11 al domingo 6/12 [HIP: que no arranque otro lanzamiento antes; si arranca, la semana B pasa al calendario del lanzamiento]. **Hora:** una secuencia por día, en el mismo bloque horario [HIP: 13 hs, como la nutrición v3; [PENDIENTE: confirmar con Insights → Actividad de la audiencia]]. Cada secuencia se sube completa de una vez.

### 5.1 Vista de las dos semanas

| Día | ID | Trabajo | Día de la cadena | Qué toca (siempre del hilo) | Qué recuerda la persona de ayer | CTA / palabra |
|---|---|---|---|---|---|---|
| **Semana A · S1 "Gonza" · Dolor 1: no hay estabilidad** (ángulo A, «hace mucho que no tenés un día bueno» → Piso de Facturación) | | | | | | |
| Lun 23/11 | A1 | Conexión y perspectiva | Carga | Lo primero que mira Manu el lunes, antes y ahora | — (arranca la semana) | — |
| Mar 24/11 | A2 | Nutrición | Carga | «Cuando encuentre la campaña que se estabilice, ya está» → lo estable es el cliente que vuelve + el test del piso | Que Manu antes también arrancaba la semana a ciegas | — |
| Mié 25/11 | A3 | Atracción (rompe el patrón) | Carga | POV: el mes que viene ya arrancó cobrado | Su piso (si hizo el test) | — |
| Jue 26/11 | A4 | Nutrición corta + hype | **Día uno** | El que te compró en octubre no recibió nada tuyo → «mañana te paso los flujos» | El POV de ayer | — (picando) |
| Vie 27/11 | A5 | CTA de tráfico | **Día dos** | Los flujos que hacen que el cliente vuelva | Que ayer le prometieron los flujos | **FLUJOS** |
| Sáb 28/11 | A6 | Nutrición (objeción) | **Día tres** | «En Argentina no se suscribe nadie» (B2B-07) | Pidió los flujos y se colgó | Contestar sin palabra |
| Dom 29/11 | A7 | Nutrición (prueba) | **Día cuatro** | Herbora: «hace mucho que no tenemos un día bueno» → 40% de margen | La objeción rota | — |
| **Semana B · S2 El fundador del tratamiento · Dolor 9: «mi producto no es para suscripción»** (ángulos G y H) | | | | | | |
| Lun 30/11 | B1 | Nutrición | Carga | «Te lo curamos en 7 días»: si tarda 3 meses, vender 1 unidad es lo que no tiene sentido | La prueba del domingo | — |
| Mar 01/12 | B2 | Conexión y perspectiva | Carga | La fórmula a 12.000 contra 4.500: nunca fue el producto | Que el tratamiento necesita más de una unidad | Encuesta (no es pedido) |
| Mié 02/12 | B3 | Atracción (rompe el patrón) | Carga | POV: tu cliente terminó el pote y nadie le escribió | Que a Manu también le dijeron que su producto era caro | — |
| Jue 03/12 | B4 | Nutrición corta + hype | **Día uno** | ¿Cuántos de los que te compraron terminaron el tratamiento? → «mañana abro el chat para los que venden un tratamiento» | El POV del pote vacío | — (picando) |
| Vie 04/12 | B5 | CTA de calificación | **Día dos** | Contame tu tratamiento y te digo cómo lo armaría | Que ayer le dijeron que hoy abre el chat | **TRATAMIENTO** |
| Sáb 05/12 | B6 | Nutrición (objeción) | **Día tres** | «Si lo paso a suscripción, rompo lo que hoy vende» (B2B-11) | Mandó TRATAMIENTO y quedó ahí | Contestar sin palabra |
| Dom 06/12 | B7 | Nutrición (prueba) + por dentro | **Día cuatro** | Tablero de Manu + preguntas reales de la semana + cómo se trabaja por dentro | La objeción rota | — |

**Cuenta de la barra:** 14 secuencias → 2 pedidos (A5, B5), 4 días de conexión o atracción, 8 de nutrición (incluidas objeción y prueba). Antes de cada pedido hay al menos 3 días de carga y el día uno lo hypea.

**Reglas de las dos semanas:**
- Los números de Manu son siempre $275.225.343 por mes («más de 270 millones»), 3.943 suscriptores activos y 7,2% de cancelaciones, con su captura (`CONTEXTO.md`).
- No se repite el mismo recurso visual dos días seguidos.
- Las preguntas de los stickers vuelven al día siguiente con las respuestas reales; si nadie contestó, esa historia no sale (regla de los v3).
- Cada día: **una línea** arriba de la ficha. Si Manu no la puede decir con sus palabras, no se sube.

---

### SEMANA A · S1 "Gonza" · el hilo: «hace mucho que no tenés un día bueno»

Por qué este dolor: es el que tienen **los 4** que más pagaron y el que cierra («nunca lo podía mantener», Alan; «hace mucho que no tenemos un día bueno», Herbora) (`analisis-ventas-calificadas.md` → Dolores que se repiten). S1 es el subavatar que se prioriza por el filtro de congruencia (base 01, Paso 6). Todo lo que se sube esta semana se tiene que poder rastrear a «nada dura».

#### A1 · Lun 23/11 · Conexión y perspectiva · «lo primero que miro el lunes»

**Una línea:** Manu antes arrancaba la semana igual que yo; hoy la arranca sabiendo qué entró.
**Congruencia:** foto real del día, luz de mañana, música tranquila [Manu elige]. Sin pedido.

| # | Texto (borrador para que Manu lo diga a su manera) | Qué se muestra | Trabajo de la historia |
|---|---|---|---|
| 1 | «lunes. lo primero que miro ya no es el ads manager.» | Foto de Manu a la mañana, en la cocina o en el escritorio, celular en la mano | Hook: abre la pregunta "¿y qué mira?" |
| 2 | «es esto. cuántas recurrencias entraron el fin de semana.» | Captura del panel de suscripciones de ese día, marca y producto tapados [CARGAR] | Cercanía: muestra su día real, con prueba |
| 3 | «cuando facturaba 60 millones con compra única, el lunes era abrir campañas y fijarme si el fin de semana se había caído todo.» [CONFIRMAR MANU: que el lunes era así; si no, lo que le pasaba de verdad] | Foto de su depósito o de stock, sin marca visible [CARGAR]; si no hay, fondo negro | Perspectiva: "yo estuve donde estás" (S1 se reconoce) |
| 4 | «no es que trabaje menos. cambió desde dónde arranca la semana.» | Selfie | Cierre: moldea la creencia sin enseñar (lo estable no es trabajar más) |

#### A2 · Mar 24/11 · Nutrición · «la campaña que se estabiliza»

**Creencia a romper:** «cuando encuentre la campaña que se estabilice, ya está» (la creencia de ADQ-1; sale de «nunca se estabilizaba… nunca lo podía mantener», Alan).
**Una línea:** lo estable no es la campaña: es el cliente que vuelve sin que lo pagues de nuevo.
**Ángulo:** A. **Base (en qué se apoya):** el test del piso (H-3 de la repesca), que se puede hacer con los propios pedidos. Larga a propósito: fricción.

| # | Texto | Qué se muestra | Trabajo de la historia |
|---|---|---|---|
| 1 | «"hace mucho que no tenemos un día bueno."» Abajo, chico: «me lo dijo el dueño de una marca que factura bien.» | Fondo negro, texto grande entre comillas | Hook: la frase textual de Herbora (sin nombrarlo) |
| 2 | «y casi siempre lo que viene después es: "tengo que encontrar la campaña que se estabilice".» | Fondo negro | Nombrar la creencia en sus palabras |
| 3 | «tiene lógica. a veces una campaña te anda dos semanas y decís "es esta". pero si cada venta la tenés que volver a comprar, el mes que viene arrancás de cero igual.» | Foto de Manu en el escritorio | Por qué tiene sentido + la cadena causal (patrón de frase 1 de Manu) |
| 4 | «lo estable no es la campaña. es el cliente que vuelve sin que lo pagues de nuevo.» | Fondo negro, una línea | Reencuadre (la idea que se tienen que llevar) |
| 5 | «hacé esta cuenta, te lleva 5 minutos. 1) abrí los pedidos del último mes. 2) separá los de clientes que ya te habían comprado antes.» | Captura del panel de pedidos de Tiendanube o Shopify con el filtro de recurrentes, de una marca de Manu, tapada [CARGAR] | La base: algo que puede hacer con sus números |
| 6 | «3) facturación de esos ÷ facturación total. ese % es tu piso: lo que entra aunque apagues meta.» | iPad, escrito a mano: «recurrentes ÷ total = tu piso» [CARGAR: foto del iPad] | La base (sigue) |
| 7 | «si te da casi cero, no te falta una campaña. te falta que vuelvan.» | Selfie | Remate seco (patrón 3); deja la idea adentro. Sin CTA, sin sticker |

#### A3 · Mié 25/11 · Atracción · POV

**Una línea:** con suscripción, a fin de mes ya sabés con cuánto arranca el que viene.
**Rompe el patrón:** sí. Es el único día de la semana sin fondo negro ni comillas. Una sola historia (opcional una segunda).

| # | Texto | Qué se muestra | Trabajo de la historia |
|---|---|---|---|
| 1 | «pov: 25 de noviembre y ya sabés cuánto entra en diciembre.» [CONFIRMAR MANU: que en sus marcas es así] | Foto o clip corto del depósito armando pedidos de reposición, packaging sin marca visible, con música [CARGAR] | Atracción: frena el dedo, la ve gente que no sigue la cuenta, sube las visitas para el jueves |
| 2 (opcional) | Sin texto, o «armando diciembre.» | Otra foto del mismo momento (cajas, etiquetas) | Secuencia estética del día (conexión de paso) |

#### A4 · Jue 26/11 · Cadena, día uno · valor y dejarlo picando

**Una línea:** el que me compró en octubre no recibió nada mío desde entonces, y por eso mi semana buena no dura.
**Ángulo:** A con C (la plata sentada en la base). **Hype del pedido de mañana.**

| # | Texto | Qué se muestra | Trabajo de la historia |
|---|---|---|---|
| 1 | «el que te compró en octubre. qué recibió de vos desde entonces?» | Fondo negro, pregunta sola | Hook: le hace ver un problema que no nombra (dolor 7 del mapa) |
| 2 | «si la respuesta es nada, todos los meses le vendés a gente nueva. y por eso la semana buena no dura.» | Foto de Manu | Une el problema al hilo de la semana |
| 3 | «esto le llega hoy a cada cliente que me compra. es lo que hace que vuelva sin pagar pauta otra vez.» | Captura de sus flujos de mail y WhatsApp, de lejos, sin que se lean (la de NUT-4) [CARGAR] | Valor: muestra que existe una forma, sin explicar el cómo |
| 4 | «mañana te paso estos flujos. los mismos que uso yo. atento.» | Selfie | **Lo deja picando:** expectativa para el pedido |

#### A5 · Vie 27/11 · Cadena, día dos · CTA de tráfico · FLUJOS

**Una línea:** los flujos que hacen que mi cliente vuelva están a una palabra.
**Rompe el patrón:** sí: fondo blanco, letras grandes (como el «EL DIA LLEGÓ» del SOP). **Sin valor en el medio.**
**Recurso:** los flujos de retención de mail y WhatsApp que se regalaron en el grupo el 14/11 [PENDIENTE: Santi — dejar el archivo o link listo para mandar por DM fuera del grupo].

| # | Texto | Qué se muestra | Trabajo de la historia |
|---|---|---|---|
| 1 | «LOS FLUJOS QUE HACEN QUE MI CLIENTE VUELVA» | Fondo blanco, solo texto, en mayúscula | Promesa del recurso (hook del CTA) |
| 2 | «mail + whatsapp. los mismos que uso en mis marcas.» | Captura de la lista de flujos (otra que la de ayer), tapada [CARGAR] | Detalle que le da valor al recurso |
| 3 | «respondé **FLUJOS** y te los paso.» | Fondo blanco, la palabra resaltada | El pedido. Nada más |

> Setter: contesta cada FLUJOS con el recurso y una sola pregunta: «qué vendés y cada cuánto se le termina a tu cliente?» (la F5 del formulario). Anota en la planilla cuántos FLUJOS llegaron y cuántos contestaron la pregunta.

#### A6 · Sáb 28/11 · Cadena, día tres · rompés una objeción

**Objeción:** «en Argentina no se suscribe nadie» (B2B-07; es la creencia a romper primero en S1, base 01 §5.2). Si el closer reporta el domingo 22/11 otro motivo de no cierre más repetido, ese reemplaza a este.
**Una línea:** Manu también creía que en Argentina nadie se suscribe, y hoy tiene 3.943.

| # | Texto | Qué se muestra | Trabajo de la historia |
|---|---|---|---|
| 1 | «"está bueno, pero en argentina no se suscribe nadie."» | Fondo negro, entre comillas | Hook: la objeción con la que se colgó en el chat |
| 2 | «lo pensé años. tenía una fórmula a 12.000 el pote contra marcas a 4.500, y estaba seguro de que nadie se iba a suscribir.» | Foto de Manu | Por qué tiene sentido; él la tuvo (`marca-personal.md`) |
| 3 | «3.943 activos. en argentina.» | Captura del panel, producto tapado [CARGAR] | Prueba |
| 4 | «se me va el 7,2%. el resto se queda.» | Captura de cancelaciones, tapada [CARGAR] | Prueba (rompe también «se suscriben por el descuento y se van») |
| 5 | «si ayer me pediste los flujos y quedó ahí, contestame con lo que te frenó.» | Selfie | **Vuelve a contestar solo** (el seguimiento es la historia) |

#### A7 · Dom 29/11 · Cadena, día cuatro · prueba

**Una línea:** a una marca que hacía meses no tenía un día bueno no le sumamos creativos: le ordenamos los números.
**Caso:** Herbora (autorizó contar el caso el 30/10, `CONTEXTO.md`). Reglas de terceros: «una marca que trabaja conmigo», marca y producto tapados, y al lado **no** va «suscripción». Números de NUT-2 (imágenes 1, 2 y 3 del doc del grupo).

| # | Texto | Qué se muestra | Trabajo de la historia |
|---|---|---|---|
| 1 | «1,3M por día. 2,4% de margen.» | Captura del antes, tapada [CARGAR: imagen 1] | Hook con número |
| 2 | «lucas y santi, de una marca que trabaja conmigo, me dijeron: "hace mucho que no tenemos un día bueno."» | Fondo negro | Es la frase del martes: la misma persona la reconoce |
| 3 | «no sacamos más creativos. nos metimos en la marca y ordenamos los números.» | Foto de Manu en el escritorio | El mecanismo, sin explicar el cómo |
| 4 | «hoy: 2,8M por día. 40% de margen.» | Capturas del después, tapadas [CARGAR: imágenes 2 y 3] | Prueba |
| 5 | «si me escribiste esta semana, lo que te contesté sale de acá.» | Selfie | El que ya está en el chat llega con la prueba vista. Sin pedido nuevo |

> [PENDIENTE: Manu — período de las capturas de Herbora (`CONTEXTO.md` dice «período a confirmar»). Sin período, no se dice «en X meses».]

---

### SEMANA B · S2 el fundador del tratamiento · el hilo: «mi producto no es para suscripción»

Por qué este dolor: es la creencia que casi deja a Alan afuera de la clase (B2B-08) y la objeción que el análisis de ventas pide «trabajar antes de la llamada» (`analisis-ventas-calificadas.md` → Qué cambiaría). S2 es el segundo de la prueba "una semana por subavatar" de la base 01. La semana siguiente (desde el 07/12) le toca a S3 [PENDIENTE: no hay recurso ni renglón de oferta para S3 todavía, base 01 §7 dolor 8].

#### B1 · Lun 30/11 · Nutrición · «te lo curamos en 7 días»

**Creencia a romper:** «para vender hay que prometer más fuerte que la competencia» (Alan) y, abajo, «mi producto no es para suscripción».
**Una línea:** si tu tratamiento tarda 3 meses en hacer efecto, lo que no tiene sentido es vender una sola unidad.
**Ángulo:** G. **Base:** la frase de Alan y la pregunta de B2B-08.

| # | Texto | Qué se muestra | Trabajo de la historia |
|---|---|---|---|
| 1 | «"te lo curamos en 7 días."» Abajo, chico: «lo dice todo tu mercado.» | Fondo negro, entre comillas | Hook |
| 2 | «tu cliente lo escuchó tantas veces que ya no le cree a nadie. tampoco a vos.» | Fondo negro | El problema (escepticismo de mercado) |
| 3 | «uno de los que trabajan conmigo vende un producto para una afección. me dijo: "todos te venden de 7 a 15 días. es totalmente mentira."» | Foto de Manu | La frase textual de Alan, sin nombrarlo (sin «suscripción» al lado del tercero) |
| 4 | «y tiene razón. si tarda 3 meses en hacer efecto, cuántas unidades necesita tu cliente para ver el resultado?» | Fondo negro | La pregunta de B2B-08 |
| 5 | «3. entonces la venta de una unidad es la que no tiene sentido.» | Fondo negro, el «3» grande | Reencuadre |
| 6 | «prometés 7 días → compra 1, no ve resultado, no vuelve. vendés el tratamiento entero → compra 3, ve el resultado, se queda.» | iPad, escrito a mano en dos columnas [CARGAR: foto del iPad] | La base, para pausar |
| 7 | «no le prometas más rápido que tu competencia. vendele lo que de verdad tarda.» | Selfie | Remate. Sin CTA |

#### B2 · Mar 01/12 · Conexión y perspectiva · «nunca fue el producto»

**Una línea:** a Manu también le dijeron que su producto no iba a vender, y el problema nunca fue el producto.
**Congruencia:** foto de Manu con stock o packaging de su marca, sin marca visible.

| # | Texto | Qué se muestra | Trabajo de la historia |
|---|---|---|---|
| 1 | «1 de diciembre. armando reposición.» [CONFIRMAR MANU: que sea real ese día] | Foto de Manu en el depósito o con cajas [CARGAR] | Hook cotidiano (cercanía) |
| 2 | «cuando arranqué, mi fórmula costaba 12.000 el pote. la competencia vendía a 4.500.» | Foto del producto sin marca, o fondo negro | Perspectiva: su historia de origen |
| 3 | «más de uno me dijo que con ese precio no iba a vender nada. yo sabía que era bueno.» [CONFIRMAR MANU: que se lo dijeron; si no, «yo mismo dudaba»] | Selfie | Identificación con H («le tenés fe a tu producto, pero todos te dicen que capaz no es bueno») |
| 4 | «el producto nunca fue el problema. el problema era que cada cliente me compraba una vez.» | Selfie | La creencia que se moldea, sin clase |
| 5 | Sticker de encuesta: «alguna vez te dijeron "capaz tu producto no es bueno"?» · «sí, varias» / «nunca» | Fondo negro | Loop: el resultado vuelve el jueves (B4). No es un pedido |

#### B3 · Mié 02/12 · Atracción · POV

**Una línea:** el cliente que termina el tratamiento y no recibe nada se va.
**Rompe el patrón:** sí: foto con humor del nicho, sin texto largo.

| # | Texto | Qué se muestra | Trabajo de la historia |
|---|---|---|---|
| 1 | «pov: tu cliente terminó el pote y nadie le escribió.» | Foto de un pote vacío en una mesada, sin marca [CARGAR] | Atracción: frena el dedo, levanta visitas antes del jueves |

#### B4 · Jue 03/12 · Cadena, día uno · valor y dejarlo picando

**Una línea:** el que compró una unidad de un tratamiento de 3 meses lo abandonó a la mitad, y por eso no vuelve.

| # | Texto | Qué se muestra | Trabajo de la historia |
|---|---|---|---|
| 1 | «el martes te pregunté. mirá.» | Resultado real de la encuesta de B2 [CARGAR]. Si nadie votó, esta historia no sale | Loop cerrado (la misma persona) |
| 2 | «de los que te compraron una vez, cuántos terminaron el tratamiento?» | Fondo negro | Valor: la pregunta que nunca se hizo (B2B-08) |
| 3 | «si compró una unidad de algo que tarda 3 meses, lo dejó a la mitad. no vio el resultado. y no vuelve.» | Foto de Manu | El problema, en cadena |
| 4 | «por eso "mi producto no es para suscripción" casi siempre es al revés: un tratamiento es el producto que más necesita que el cliente vuelva.» | Fondo negro | Reencuadre |
| 5 | «mañana abro el chat solo para los que venden un tratamiento. te digo cómo lo pensaría con tu ciclo.» | Selfie | **Lo deja picando** |

#### B5 · Vie 04/12 · Cadena, día dos · CTA de calificación · TRATAMIENTO

**Una línea:** si vendés un tratamiento, contame cuánto tarda y te digo cómo lo armaría.
**Tipo:** CTA de calificación (no de tráfico): pide datos a propósito para filtrar a S2.
[PENDIENTE: Santi y Manu — confirmar que «te digo cómo lo armaría» por DM no choca con «el diagnóstico es pago» (`CONTEXTO.md`). La respuesta es corta y general (unidades por tratamiento, plan de 90 días); la cuenta con sus números queda para la llamada.]

| # | Texto | Qué se muestra | Trabajo de la historia |
|---|---|---|---|
| 1 | «VENDÉS UN TRATAMIENTO?» | Fondo blanco, solo texto | Hook del CTA, filtra |
| 2 | «contame qué vendés, cuánto tarda en hacer efecto y cada cuánto se le termina al cliente.» | Fondo blanco | Lo que tiene que mandar (fricción buscada) |
| 3 | «respondé **TRATAMIENTO** y te digo cómo lo armaría.» | Fondo blanco, la palabra resaltada | El pedido |

> Setter: con cada TRATAMIENTO anota subavatar (S1/S2/S3/fuera) y si pauta. Los que califican pasan a la conversación de setting.

#### B6 · Sáb 05/12 · Cadena, día tres · rompés una objeción

**Objeción:** «si lo paso a suscripción, rompo lo que hoy me vende» (B2B-11, «lo que más frena a este avatar»). Si llegan por DM otras objeciones más repetidas en la semana, va la más repetida.
**Una línea:** no tocás nada de lo que hoy vende: va al lado.

| # | Texto | Qué se muestra | Trabajo de la historia |
|---|---|---|---|
| 1 | «"si lo paso a suscripción, rompo lo que hoy me vende."» | Fondo negro, entre comillas | Hook: la objeción del que se colgó |
| 2 | «tiene sentido tenerle miedo. es lo que más escucho en las llamadas.» | Foto de Manu | Validación (dato del banco de objeciones) |
| 3 | «no tocás nada. va al lado de la compra única. el que quiere comprar una vez, sigue comprando una vez.» | Fondo negro | Reencuadre (B2B-11) |
| 4 | «así se ve en una de mis marcas.» | Captura de una tienda de Manu con las dos opciones (compra única / suscripción), producto tapado [CARGAR] | Prueba |
| 5 | «si me mandaste TRATAMIENTO y quedó ahí, contestame con lo que te frenó.» | Selfie | **Vuelve a contestar solo** |

#### B7 · Dom 06/12 · Cadena, día cuatro · prueba y cómo se trabaja por dentro

**Una línea:** las preguntas de esta semana tienen respuesta, y así se trabaja con Manu por dentro.
[PENDIENTE: caso de S2 con permiso (Alan). Sin permiso, la prueba es el tablero de Manu: no se repite Herbora una semana después del mismo recurso.]

| # | Texto | Qué se muestra | Trabajo de la historia |
|---|---|---|---|
| 1 | «esta semana me escribieron esto.» | 2 o 3 DMs reales de TRATAMIENTO, nombres y productos tapados [CARGAR]. Si no hay, esta historia no sale | Prueba social real (loop) |
| 2 | «3.943 activos en mis marcas. 7,2% de cancelaciones.» | Captura del panel [CARGAR] | Prueba del mecanismo (de Manu, no de un tercero) |
| 3 | «así trabajo con cada marca: me meto en la tienda y en los números, con vos al lado.» | Captura del campus por dentro, sin que se lea (la de POST-3) [CARGAR] | Por dentro (el «mostrar mi programa por dentro» del SOP, sin la palabra «programa» ni precio) |
| 4 | «si me escribiste, te contesto todos. si no, el lunes arranco con otra cosa.» | Selfie | Cierra la cadena sin nuevo pedido |

---

## Paso 6 — Cómo se arma cada secuencia del día (la ficha)

Santi la llena; Manu la convierte en historias. Es el procedimiento §5.2 del SOP en una hoja.

```
FICHA · [ID] · [día y fecha]
1. Trabajo (uno solo): nutrición / conexión y perspectiva / atracción / CTA
2. Una línea — qué quiero que se lleven: ………………  (si no se puede escribir, no se sube)
3. Hilo: dolor de la semana [n.º del mapa] → ¿se rastrea hasta ahí? sí / no
4. Subavatar: S1 / S2 / S3 · registro: lógica, riesgo y resultado
5. Qué vio ayer la misma persona: ………………
6. Construcción según el trabajo:
   - nutrición: idea/creencia → ángulo → base (cuenta, captura, frase real)
   - conexión: momento real del día + aprendizaje u opinión
   - atracción: POV / foto + frase / algo del momento
   - CTA: recurso + detalle + «respondé [PALABRA]»; tráfico o calificación
7. Historia 1 = hook (ahí se va ~¼ de la gente)
8. Una idea por historia; < 3 s por pantalla (salvo nutrición larga a propósito)
9. ¿Rompo el patrón hoy? sí (atracción / CTA de tráfico / visitas bajando) / no
10. Imagen, música y texto van para el mismo lado: sí / no
11. Capturas que hacen falta [CARGAR]: ………………
12. ¿El texto final lo escribió Manu?: sí / no
```

---

## Paso 7 — Publicar y sostener

### 7.1 Todos los días

1. **Se sube todos los días, con propósito** («no cortes el depósito»). Si un día no hay ficha, se sube conexión: una foto real del día con una frase que vaya para el hilo. Nunca nada.
2. **Una secuencia completa por día**, en el bloque horario fijo, desde el celular de Manu.
3. **Los DMs los contesta Manu o el setter el mismo día**, y se anotan en la planilla (las respuestas son la métrica que más se mira).
4. **A las 24 h,** Santi carga los números de la secuencia en la planilla (§Métricas).

### 7.2 Cada semana

| Cuándo | Qué | Quién |
|---|---|---|
| Domingo | Pasa los motivos de no cierre de la semana: por qué cerraron, por qué no, qué los frenó, qué se dijeron antes de decidir (las 4 preguntas del SOP) | Closer → Santi |
| Lunes, antes de subir | Elige **un dolor** para la semana con esos motivos y el mapa de dolores de la base 01; llena las 7 fichas; revisa que haya conexión y atracción, no solo nutrir y pedir | Santi |
| Lunes | Revisa la planilla de la semana anterior: mejor secuencia y por qué; historias con caída ≥10 % (no se repiten); promedio de las últimas 10 | Santi, y se lo pasa a Manu |
| Cada día | Escribe y sube | Manu |

### 7.3 Durante un lanzamiento

El SOP no da reglas aparte para lanzamientos, pero sus principios aplican igual. Para el próximo:
- **Cargar antes de descargar:** antes del anuncio, por lo menos una semana del sistema evergreen (no aparecer el día del anuncio después de días sin subir).
- **Un hilo por semana también en lanzamiento:** las creencias de cada día cuelgan del mismo dolor de la semana.
- **Separar trabajos:** las secuencias con ADENTRO son CTA de tráfico: 2–3 historias directas, sin creencia-reencuadre-prueba en el medio (es el «error típico» del SOP [12:49]: «el pedido llega a poca gente»). La creencia y la prueba van en las secuencias de nutrición de los días anteriores.
- **Después del cierre, no desaparecer:** el lunes siguiente vuelve el sistema evergreen.

---

## Qué cambia respecto de lo que hay hoy en el repo

| Archivo / práctica | Qué queda viejo o contradice esta base | Qué hacer |
|---|---|---|
| **No hay historias fuera de lanzamiento** (todos los archivos de historias están en `lanzamientos/`) | El SOP: «no cortar el depósito»; el error n.º 1, «el que solo aparece a pedir» | Este calendario es el primero evergreen. Al terminar el 06/12, Manu arma las siguientes con la ficha |
| **Sin métricas de historias en ningún archivo**; el tracker se dio de baja el 18/11 y el campus trackea registros y ventas (`ESTADO.md`) | El SOP mide 3 números por secuencia contra tu propio promedio | Planilla de §Métricas; cargar también el archivo desde el 01/10 (§2.5) |
| **Desde el 12/11 «Manu no graba más»; las placas las arma el equipo en Figma** (`historias-v3-*.md`) | «Se nota cuando las arma otro, siempre… la voz y lo que se cuenta tienen que ser tuyos» | Manu escribe el texto final y sube. Las fotos con texto se mantienen |
| **Criterio v3: «creencias, no dolores», una creencia distinta cada día** (CPA, copias, clientes baratos, recompra, competencia, clase gratis) | «Cambiar de tema todos los días… no hay hilo». Solución del SOP: «un dolor por semana» | Las creencias se siguen usando como hook de nutrición, pero todas cuelgan del dolor de la semana |
| **Secuencias de venta de 5 a 8 historias con creencia → reencuadre → prueba → ADENTRO** (ADQ-1 a 3, NUT-1, 2, 4, 5) | Para un CTA de tráfico (registro), el SOP lo marca como error: valor en el medio → «el pedido llega a poca gente» | CTA de tráfico de 2–3 historias; la nutrición va los días anteriores (§7.3) |
| **12 secuencias con pedido en 10 días** (9 al 18/11, planificado) | «Los meses en los que más plata hicimos son los meses en los que menos pedidos tiramos»; la barra | 2 pedidos cada 14 días fuera de lanzamiento; medir si sube respuestas/visitas |
| **No hay secuencias de conexión ni de atracción**: lo personal aparece solo como fondo de la historia 2 | «Si tu semana es solo nutrir y pedir… tu audiencia encuentra el patrón»; «si no metés atracción… te quedás siempre en los mismos números» | 2 de conexión y 2 de atracción cada 14 días |
| **Todas las nutriciones v3 arrancan igual** (fondo negro, creencia entre comillas) | «Tu cabeza aprende por repetición» | Se mantiene para nutrición y objeción; atracción y CTA cambian de fondo |
| **Palabras clave mezcladas:** la bio dice «DM SUSCRIPCIÓN: te hago la cuenta» (`optimizacion-perfil.md`); `_archivo/historias-lanzamiento.md` dice que ADENTRO «es la de siempre (bio, YouTube, grupo de WhatsApp)»; YouTube usa CUENTA por WhatsApp (`funnel-youtube.md`) | Contradicción entre archivos; y «te hago la cuenta» choca con «el diagnóstico es pago, no se regala» | Una palabra por recurso. [PENDIENTE: Santi decide la de la bio y si «te hago la cuenta» se cambia] |
| `lanzamientos/2026-10-19-clase/calendario-historias.md` y `lanzamientos/2026-10-24-repesca/historias/historias.md` | Números viejos (156.798.062 / 2.200 / 1,28 %; +250M / +3.500 / <5 %), DFY | Quedan como historial; no se reutiliza ningún número de ahí |
| `lanzamientos/2026-11-17-webinar/_archivo/historias-*.md` (hechas con los agentes de calendario y de secuencias de Limitless y el formato de Naza) | No es teoría de este SOP | Quedan como historial; el sistema evergreen es este |
| Caso Herbora: «4» marcas copiaron en el grupo y «7» en la llamada (`historias-v3-nutricion.md` → Para confirmar) | Dato contradictorio | A7 no da el número. [PENDIENTE: Manu] |

---

## Checklist final del SOP

**Diario (antes de subir)** — está en la ficha (Paso 6) y aplicado en las 14 secuencias:
- [x] ¿Qué trabajo tiene esta secuencia? Uno solo — cada secuencia del calendario tiene uno.
- [x] ¿Puedo escribir en una línea qué quiero que se lleven? — las 14 tienen su línea.
- [x] ¿Se rastrea hasta el dolor de la semana (el hilo)? — semana A: dolor 1; semana B: dolor 9.
- [x] ¿La hice como si la viera una sola persona que vio todo lo de ayer? — columna «Qué recuerda de ayer» (§5.1).
- [x] ¿Es específica y en el registro correcto? — lógica, riesgo y resultado; frases textuales del avatar.
- [x] ¿La primera historia funciona como hook? — marcada en cada secuencia.
- [x] ¿Una idea por historia, < 3 s por pantalla (salvo nutrición larga)? — salvo A2 y B1, a propósito.
- [ ] ¿Imagen, música y texto van para el mismo lado? — **falta:** la música y la foto final las elige Manu al subir.
- [x] Si es CTA: mínima fricción, palabra clave clara, sin valor en el medio (si es de tráfico) — A5 (tráfico) y B5 (calificación, a propósito).
- [x] Si es CTA: ¿hubo días de carga antes? ¿Lo hypeé? — 3 días de carga + día uno que deja picando.
- [x] ¿Necesito romper el patrón hoy? — A3, A5, B3, B5.
- [ ] ¿La voz es del creador? — **falta:** Manu reescribe los textos (son borradores). Es la condición del SOP.

**Semanal:**
- [ ] Recogí de ventas/chats los motivos de no cierre → **falta:** los del 17/11 (closer → Santi, domingo 22/11). Hoy se usa el banco de objeciones.
- [x] Elegí un dolor por semana.
- [x] Planifiqué la cadena: valor (+ «mañana…») → pedido → objeción → prueba (las dos semanas).
- [x] Hay conexión y atracción en la semana.
- [ ] Revisé el calendario por niveles de consciencia — **no aplica todavía:** el SOP lo manda a otra clase («Calendario por niveles de consciencia») que no está entre los 9 SOPs del repo. El orden se armó solo con la cadena y la barra.

**Medición:**
- [ ] Registré caída entre historias (marqué las ≥10 %) — **falta:** planilla lista, se carga desde el 23/11 (Santi).
- [ ] Registré visitas — ídem.
- [ ] Registré respuestas/visitas — ídem.
- [ ] Registré % que llega al final y caída tras la 1.ª — ídem.
- [ ] Actualicé mi promedio de las últimas 10 secuencias — **falta:** 10 secuencias medidas, o el archivo desde el 01/10 (§2.5).
- [ ] Anoté la mejor secuencia y por qué; busqué patrones; optimicé una variable — **falta:** después de la semana A.

**Si sos growth tomando un creador:**
- [ ] Pregunté visitas promedio, congruencia con seguidores, respuestas por CTA, mejores/peores — **falta:** ver §Métricas, evaluación (Santi).
- [ ] Analicé su archivo de historias y reels antes de tocar nada — **falta** (§2.5, Santi).
- [x] Le di estructura y datos para que él cree (no las creo yo a largo plazo) — ficha + este calendario; desde la semana 3, Manu arma.

**Plan de acción del SOP:** paso 1 y 2 hechos con lo planificado (falta lo publicado real); paso 3 [PENDIENTE: motivos del 17/11]; paso 4 hecho; paso 5 empieza el 23/11.

**Checkpoint:** en vez de comunidad del curso, esta base se revisa con **Santi y Manu** antes del lunes 23/11 (Manu tiene que leer las 14 líneas y decir cuáles diría así y cuáles no).

---

## Métricas a medir

### Las 3 principales, en este orden (SOP §8.1)

| # | Métrica | Cómo se calcula en Génesis | Dónde se mira | Lectura → qué hacer |
|---|---|---|---|---|
| 1 | **La caída entre historias (drop off)** | Para cada historia: 1 − (vistas de la historia siguiente ÷ vistas de esta) | Instagram → la historia → Insights (o desde el archivo), las vistas de cada historia de la secuencia | **~5 % es normal.** **≥10 %: esa historia hizo algo mal** («falta de congruencia con la anterior, o simplemente que no era interesante») → se marca en la planilla y esa historia / esa forma no se repite |
| 2 | **Las visitas** | Vistas de la historia 1 de la secuencia | Insights de la historia 1 | **Termómetro, no vanidad.** Si vienen cayendo semana a semana: hace rato que no se rompe el patrón, se está apareciendo solo para pedir, o no se habla de lo que le interesa al avatar → meter atracción, más días de valor, y revisar el dolor contra la base 01 |
| 3 | **Las respuestas sobre visitas** — «la que más miro» | Respuestas a la secuencia (DMs que responden a cualquier historia + palabras clave) ÷ vistas de la historia 1 | DMs de Instagram (contar los que llegan como respuesta a la historia) + lo que anota el setter | **1–5 % sano. 7–10 % muy bueno** («yo siempre estoy arriba del siete»). Se compara con el promedio propio, no con el del SOP |

> Definición de "visitas" para el cálculo: el SOP dice «respuestas sobre visitas» de la secuencia y no aclara de qué historia. Acá se toma la historia 1 (es la que más gente ve) y se usa siempre la misma, para que el promedio sea comparable. [HIP de método]

### Las 3 referencias (para ubicarse, no para obsesionarse) (SOP §8.2)

| Referencia | Cómo se calcula | Benchmark del SOP | Qué hacer |
|---|---|---|---|
| **Cuánta gente llega al final** | Vistas de la última ÷ vistas de la primera | «Habitual en Instagram 55–75 %; arriba del 70 ya es bueno; cuentas chicas con audiencia fiel pasan el 90» | Si una secuencia larga de nutrición (A2, B1) llega muy abajo de tu promedio, partirla en dos días |
| **Dónde se te va la gente** | La caída más grande de la secuencia | «Siempre después de la primera historia: en promedio cerca de una cuarta parte» | Si la caída de la 1 a la 2 es mucho más que ¼: la historia 1 no hizo de hook → cambiar el hook, no la secuencia |
| **Cuánto avanzan rápido** | Toques hacia adelante en cada historia [HIP: la mejor aproximación que da Insights] | «Entre la mitad y dos tercios de la gente pasa de largo cada historia sin leerla entera» | Por eso < 3 s por pantalla y una idea por historia; si una historia de texto largo pierde más que las demás, acortarla |

### Lo que no se mira para juzgar (SOP §8.3)

- **Los likes:** «en historias no te dicen nada». Se anotan las interacciones con stickers (encuestas, preguntas) porque sirven para medir «la interacción o empatía que tuvieron sobre algo», pero no juzgan la secuencia.
- **Las visitas solas:** «Las visitas te dicen cuánta gente entró, no qué pasó adentro. Una secuencia con menos gente y más respuestas es mejor secuencia.»
- Los benchmarks de internet: «lo que te tiene que interesar es superarte a vos».

### Tu vara (SOP §8.4)

«Anotá los de tus últimas diez secuencias, sacá tu promedio y usalo como vara.» En la planilla, la fila «Promedio últimas 10» se recalcula cada lunes. [PENDIENTE: hasta tener 10 secuencias medidas, no hay vara; se acelera cargando el archivo desde el 01/10 (§2.5).]

### Evaluación del creador (SOP §8.5) — Manu, hoy

| Pregunta del SOP | Respuesta con lo que hay |
|---|---|
| ¿Cuántas visitas tienen sus historias? ¿Es congruente con la cantidad de seguidores? | [PENDIENTE: visitas promedio de historias y seguidores de IG al 19/11 (base 01 también lo pide)] |
| Cuando tira un CTA, ¿cuántas personas le contestan? | [PENDIENTE: cantidad de DMs con ADENTRO por día del 08 al 17/11; existe un collage de esos DMs para NUT-6] |
| ¿Cuáles fueron sus mejores y peores historias? ¿Cuánto promedia? | [PENDIENTE: del archivo, §2.5] |
| Lectura del SOP | «100 visitas por historia y 0–1 respuestas por CTA» es «jodido remontarlo». Si Manu está ahí, el SOP pide **reconstrucción de la comunicación**: reeducar a la audiencia, meter gente sana al ecosistema (los ads de adquisición ya lo hacen) o encontrar formatos que llamen la atención |

### Diagnóstico rápido (SOP §8.6, con la acción en Génesis)

| Síntoma | Causa probable (SOP) | Acción en Génesis |
|---|---|---|
| Caída ≥10 % en una historia | Falta de congruencia con la anterior o no era interesante | Marcarla; no repetir esa historia ni esa forma. Revisar si cambió de tema respecto de la anterior |
| Visitas cayendo | No rompés el patrón hace rato / aparecés solo para pedir / no hablás de lo que interesa | Meter una atracción esa semana; revisar cuántos pedidos hubo en los últimos 14 días; chequear el dolor contra la base 01 |
| No te ven las historias | Incongruencia reels ↔ historias | Revisar §2.4: ¿el dolor de la semana es el de los ads y reels que están corriendo? |
| CTA llega a poca gente | Valor/paradigmas en medio del CTA; sin carga previa | CTA de 2–3 historias; revisar que hubo 3 días de carga y que el día uno lo hypeó |
| Mucha caída en la 1.ª historia | 1.ª pantalla subestimada | Tratarla como hook: una frase del avatar o un número con captura, nunca un párrafo |

### Planilla de seguimiento

Una fila por secuencia. Se carga a las 24 h de subida. [PENDIENTE: Santi decide dónde vive (Google Sheet o el campus); estas son las columnas.]

| Columna | Qué va | Cómo se obtiene |
|---|---|---|
| ID | A1, A2… | Del calendario |
| Fecha y hora | — | — |
| Trabajo | Nutrición / Conexión / Atracción / CTA (tráfico o calificación) | Ficha |
| Día de la cadena | Carga / Día 1 / 2 / 3 / 4 | Ficha |
| Subavatar y dolor | S1 · dolor 1, etc. | Ficha |
| Una línea | Lo que se tenían que llevar | Ficha |
| N.º de historias | — | — |
| Rompe el patrón | sí / no | Ficha |
| ¿Texto de Manu? | sí / no | Manu |
| Vistas de cada historia | v1, v2, v3… | Insights de cada historia |
| **Visitas (v1)** | Vistas de la historia 1 | Insights |
| **Caída por historia** | 1 − v(n+1)/v(n), para cada paso | Fórmula |
| **Historias con caída ≥10 %** | n.º de la historia y % | Fórmula |
| Mayor caída | Entre cuáles | Fórmula |
| % llega al final | v(última)/v1 | Fórmula |
| Respuestas | DMs que responden a la secuencia + palabras clave | DMs / setter |
| **Respuestas / visitas** | Respuestas ÷ v1 | Fórmula |
| Interacción con stickers | Votos / respuestas de caja (no juzga) | Insights |
| Palabra clave | FLUJOS, TRATAMIENTO… y cuántas | Setter |
| Calificados del CTA | Cuántos de los que respondieron son S1/S2/S3 que pautan | Setter (no es métrica del SOP: conecta las historias con el cash collected, que es la tesis del SOP) |
| Por qué funcionó / no funcionó | Una línea | Santi, el lunes |

**Filas fijas de resumen (se recalculan cada lunes):** promedio de las últimas 10 secuencias (visitas, % llega al final, caída 1→2, respuestas/visitas) · promedio por trabajo (las de CTA no se comparan con las de nutrición: la nutrición «no busca respuestas») · mejor secuencia de la semana y por qué · historias marcadas para no repetir.

**Ejemplo de carga (vacío hasta el 23/11):**

| ID | Fecha | Trabajo | Cadena | Subav. · dolor | Hist. | v1 | Caída 1→2 | Caídas ≥10 % | % al final | Resp. | Resp./visitas | Palabra | Por qué |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A1 | 23/11 | Conexión | Carga | S1 · 1 | 4 | | | | | | | — | |
| A2 | 24/11 | Nutrición | Carga | S1 · 1 | 7 | | | | | | | — | |
| A3 | 25/11 | Atracción | Carga | S1 · 1 | 1–2 | | | | | | | — | |
| A4 | 26/11 | Nutrición + hype | Día 1 | S1 · 1/7 | 4 | | | | | | | — | |
| A5 | 27/11 | CTA tráfico | Día 2 | S1 · 1 | 3 | | | | | | | FLUJOS | |
| A6 | 28/11 | Objeción | Día 3 | S1 · 1 | 5 | | | | | | | — | |
| A7 | 29/11 | Prueba | Día 4 | S1 · 1 | 5 | | | | | | | — | |
| B1 | 30/11 | Nutrición | Carga | S2 · 9 | 7 | | | | | | | — | |
| B2 | 01/12 | Conexión | Carga | S2 · 9 | 5 | | | | | | | — | |
| B3 | 02/12 | Atracción | Carga | S2 · 9 | 1 | | | | | | | — | |
| B4 | 03/12 | Nutrición + hype | Día 1 | S2 · 9 | 5 | | | | | | | — | |
| B5 | 04/12 | CTA calificación | Día 2 | S2 · 9 | 3 | | | | | | | TRATAMIENTO | |
| B6 | 05/12 | Objeción | Día 3 | S2 · 9 | 5 | | | | | | | — | |
| B7 | 06/12 | Prueba + por dentro | Día 4 | S2 · 9 | 4 | | | | | | | — | |
| **Promedio últimas 10** | | | | | | | | | | | | | |

---

## Pendientes para el equipo

**Manu**
1. Leer las 14 líneas y las secuencias, y reescribir con sus palabras los textos que suba (condición del SOP: «la voz y lo que se cuenta tienen que ser tuyos»). Desde la semana del 07/12, armar él la secuencia desde la ficha.
2. Confirmar las frases marcadas `[CONFIRMAR MANU]` (A1 historia 3, A3, B2 historias 1 y 3) o cambiarlas por lo que le pasó de verdad.
3. Decidir si vuelve a hablar a cámara en las secuencias de conexión.
4. Período de los números de Herbora; cuántas marcas los copiaron (4 o 7).
5. Pedirle a Alan permiso para usar su nombre (o su caso) en la semana B.

**Santi (growth)**
1. Exportar el archivo de historias desde el 01/10 con sus Insights y armar la vara (§2.5). Incluye lo publicado real del 12 al 18/11 y qué hubo del 23/10 al 04/11.
2. Armar la planilla y cargarla a las 24 h de cada secuencia.
3. Dejar listo el recurso de FLUJOS para mandar por DM (fuera del grupo) y confirmar si hay automatización de palabras clave.
4. Decidir la palabra clave de la bio (SUSCRIPCIÓN con «te hago la cuenta» choca con el diagnóstico pago) y unificar con YouTube.
5. Confirmar si Génesis se vende fuera de lanzamiento después del 20/11 (cambia qué dice el día 4 de cada cadena).
6. Conseguir las capturas `[CARGAR]` de las dos semanas antes del 23/11 (panel del día, cancelaciones, pedidos con filtro de recurrentes, flujos, tienda con las dos opciones, campus por dentro, Herbora 1–3, fotos del depósito y del pote vacío).
7. Confirmar el horario fijo con Insights → actividad de la audiencia.
8. Revisión de esta base con Manu antes del lunes 23/11.

**Closer / setter**
1. Domingo 22/11: los motivos de no cierre de las llamadas del 17/11 (las 4 preguntas del SOP). Si son otros que B2B-07 y B2B-11, reemplazan A6 y B6.
2. Contestar FLUJOS (27/11) y TRATAMIENTO (04/12) el mismo día y anotar cantidad, subavatar y si pauta.
3. Desde ahora, cada domingo, los motivos de la semana.
