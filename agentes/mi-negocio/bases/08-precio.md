# Base 08 — Precio y valor percibido

> **Actualización 20/11:** el precio vigente es **Genesis OS USD 5.000** (4 meses) y **Genesis Lite USD 2.000**, que no se comunica y solo ofrece el closer en la llamada si el lead no califica para OS. Donde este archivo dice USD 6.000, vale OS 5.000.

Aplicación a Génesis del SOP 08 (`../teoria-sops/sop-08-subir-precio.md`). Actualizado 19/11/2026.

> Cómo leer este archivo. Lo que va entre comillas « » es textual de un archivo del repo o de una llamada y lleva su fuente (ruta relativa a `mi-negocio/`, o `CONTEXTO.md`). `[HIP]` = hipótesis sin validar. `[PENDIENTE: …]` = dato que no está en el repo y alguien lo tiene que dar. Los términos del SOP se usan tal cual los dice el autor (las 3 variables, fricción sana, valor percibido, arriba/abajo, congruencia, ROI de la transformación, condición innegociable, ticket bajo/medio/alto, gaps de mercado, PIF, ancla, semáforo, checkpoint). "Transformación" es palabra prohibida en el copy de Manu (`CONTEXTO.md` → Voz y marca): acá aparece solo como término del SOP, nunca en una pieza. Se apoya en la base 01 (`01-avatar.md`): S1 "Gonza" (marca en breakeven), S2 (fundador del tratamiento), S3 (vende pero no construye).

---

## Resumen en una pantalla

1. **Prerrequisito del SOP no cumplido del todo: hoy Génesis no tiene UN precio, tiene cinco.** USD 6.000 (`CONTEXTO.md`, `ESTADO.md`), USD 5.000 (manual de llamada, script B2B, banco de objeciones, proceso de ventas), USD 4.000 (piloto), lo que se cobró de verdad (4.000 PIF, 5.000 en 2 pagos sin recargo, 5.000 PIF) y una página de oferta sin precio pero con un **«Bonus: −USD 3.000 de descuento»** (`ventas/oferta-genesis.html`). También choca la duración (3 meses en `CONTEXTO.md`, 4 meses en la página de oferta y en el proceso del 19/10). El SOP dice: «el precio se le pone a una promesa concreta». **Decisión 1: antes de mover nada, Santi fija el precio vigente y se alinean todas las piezas** (lista en "Qué cambia").
2. **Diagnóstico con las 3 señales: hoy NO se está cobrando por debajo (0 de 3 sí, 1 sin dato).** Hay fricción sana: 2 de 4 compradores pidieron pagar en 2 partes, llamadas de 73 y 91 minutos, «los 5.000 dólares no los tenemos líquidos». El que sí estaba barato era el 1a1 viejo de USD 1.800–2.100, que «se vendía sola» (`negocio/brief-genesis.md`): esa señal ya se corrigió subiendo de nivel.
3. **Ninguna venta documentada a USD 6.000.** Lo más alto que pagó alguien son USD 5.000 (Lopo, PIF). El salto 5.000 → 6.000 tiene una sola de las 4 razones legítimas del SOP a favor (el producto mejoró: grupales, campus, agentes de IA, Puentify) y le falta la que más pesa: **casos de éxito de terceros con suscripción** (hoy el único es Manu, `ESTADO.md`). **Decisión 2: USD 6.000 queda quieto hasta leer el semáforo con las ventas del 17/11; no se sube ni se baja antes.**
4. **El cálculo de ROI (10–20% del retorno anual) depende de un dato que nadie mide: cuántos clientes nuevos mete el avatar por mes.** Con la cuenta canónica (15.000 ARS que quedan vivos por cliente), USD 6.000 cae en el rango del SOP si el cliente mete **300 a 500 clientes nuevos por mes**; con la lectura de `CONTEXTO.md` (45.000 de capacidad extra por cliente), con **100 a 200**. **Decisión 3: esa pregunta pasa al formulario de aplicación y a la calificación; con menos volumen que eso, el avatar no es de Génesis a 6.000 (cambiar avatar u oferta, nunca "cobrar menos").**
5. **Valor percibido: meta 4–5× = USD 24.000–30.000 percibidos.** El único "stack de valor" escrito (clase del 19/10) suma «[VALOR A DEFINIR: USD 16.000]», 2,7×, con valores inventados y anclado a "lo que te cobrarían distintos proveedores" (ancla falsa). **Los 3 puntos más flojos:** (a) no hay prueba social de tercero con suscripción; (b) los materiales se contradicen (precio, duración, DFY/DWY, descuento); (c) lo que de verdad decide la compra («me meto en tu tienda», la financiación, el baúl de agentes) no está nombrado en la oferta escrita.
6. **Congruencia arriba-abajo con dos brechas abiertas:** arriba se promete «+$100M al mes» y «suscripción», y abajo el único resultado con suscripción es el de Manu; y a S3 se le prometió «buscar producto con él» cuando eso está fuera de alcance. **Decisión 4: la primera brecha a cerrar es el primer cliente de Génesis con su primer cobro recurrente documentado (S1, reposición ≤ 30 días).**
7. **Escalera de ofertas con los 4 niveles del SOP:** Empezar = Genesis Lite / Mentoría (USD 2.000) · Consistencia = Génesis (USD 6.000: "dejar de arrancar en cero") · Escalar sin romperme y No depender de mí = nivel de Manu hoy, **sin oferta hasta tener capacidad real probada en clientes** (aviso de criterio del SOP).
8. **Guion de precio en la llamada:** total primero ("son USD 6.000"), silencio, PIF, y las cuotas solo al final de la rama Plata. Se saca el «¿Alguna duda de cómo funciona?» pegado al precio (rompe el silencio), se elimina el "descuento de USD 3.000" y la financiación flexible se ordena como último recurso, no como argumento de venta.
9. **Semáforo cada 5–10 ventas** (ventas ÷ llamadas con precio presentado): verde > 75% subilo, amarillo 50–75% quieto, rojo < 50% revisar proceso antes que precio. Con el 19/10 (7 aplicaron, 0 compraron desde anuncios) el problema era de proceso y avatar, no de precio.
10. **Checkpoint:** en vez de Discord, cálculo de ROI + 3 señales + auditoría + precio definido se revisan con **Santi y Manu** antes de tocar el precio.

---

## Paso 0 — ¿Hay oferta clara? (el "cuándo NO usarlo" del SOP)

El SOP [pantalla 01:30]: «No es para vos si todavía no tenés la oferta clara. El precio se le pone a una promesa concreta; si la promesa es difusa, cualquier número que pongas va a estar mal.»

**La promesa sí es concreta:** «Escalo tu ecomm de consumibles a +$100M al mes convirtiéndolo a modelo de suscripción, sin depender del CPA ni dejar de vender» (`CONTEXTO.md`). El mecanismo (Método B.A.S.E.) y la cuenta canónica (30.000 → 90.000 → 75.000) también.

**Lo que no es concreto es la oferta tal como la ve el lead.** Inventario de todo lo que dice el repo sobre precio y forma:

| Fuente | Precio Génesis | Cuotas | Duración / forma | Cupo |
|---|---|---|---|---|
| `CONTEXTO.md` (fuente de verdad) | **USD 6.000** contado | 2 × 3.375 = 6.750 · 3 × 2.550 = 7.650 | 3 meses, DWY | Tabla: 20 lugares "por ahora"; texto de la oferta 17/11: **10 lugares** |
| `CONTEXTO.md` (piloto, cerrado) | USD 4.000 «anclado a lista 6.000» | 2 × 2.250 · 3 × 1.700 | — | 5 marcas; «los 3 del piloto cerraron» |
| `lanzamientos/2026-11-17-webinar/ESTADO.md` | «Génesis 1:1, USD 6.000» | — | — | 10 lugares, cierre sábado 21/11 (`ads/ads-post-webinar.md`) vs viernes 20/11 (`CONTEXTO.md`) |
| `ventas/manual-llamada-de-venta-genesis.md` | **USD 5.000** | 2 × 2.850 · 3 × 2.000 | — | — |
| `ventas/llamadas-b2b-b2c/01-script-llamada-b2b-genesis.md`, `03-banco-de-objeciones.md`, `README.md` | **USD 5.000** «[CONFIRMAR cuotas y cupos para la clase del 17/11]» | 2 × 2.850 · 3 × 2.000 | «lo instalamos nosotros» (DFY) | — |
| `ventas/proceso-de-ventas-clase-19-10.md` | USD 5.000 | 2 × 2.850 · 3 × 2.000 | **4 meses** | — |
| `negocio/brief-genesis.md` (webinar 19/10) | USD 6.000, "Génesis DFY" | — | 3 meses | 10 cupos |
| `ventas/oferta-genesis.html` (Genesis OS) | **Sin precio**: «La inversión la vemos en la llamada» + **Bonus 3: «−USD 3.000 de descuento. Solo para los 10 cupos. Se descuenta de la inversión de Genesis OS»** | — | **4 meses**, DWY, «Sesiones 1 a 1 ilimitadas», 4 grupales por semana (64) | 10 marcas |
| `lanzamientos/2026-11-17-webinar/ventas-y-tracking/formulario-closer.md` | «tickets desde USD 2.000 hasta USD 6.000» | — | — | — |
| **Lo que se cobró de verdad** (`analisis-ventas-calificadas.md`) | Herbora USD 4.000 PIF · Alan USD 2.000 + 3.000 · Núñez USD 2.500 + 2.500 · Lopo USD 5.000 PIF | Ninguna venta siguió el plan de cuotas escrito: los dos pagos de Alan y Núñez suman 5.000, **sin recargo** | — | — |
| Mentoría / Genesis Lite | USD 2.000 (2 × 1.100) | seña USD 200–400 | 3 meses, grupal | 10 |

**Contradicciones fuertes (para que Santi resuelva antes de cualquier otro paso):**

1. **5.000 vs 6.000.** Todo el material de ventas (lo que el closer tiene en la mano) dice 5.000; la fuente de verdad dice 6.000. Ya estaba marcado en `ventas/llamadas-b2b-b2c/README.md` y en `bases/01-avatar.md` §5.5 y sigue abierto.
2. **El "descuento de USD 3.000"** de la página de oferta contradice tres reglas escritas: «No se baja de precio en ningún momento» (`CONTEXTO.md`), «El precio de Génesis no se baja nunca. Ni un descuento» (manual de llamada) y «Ancla de precio: No se usa: no hay un precio anterior real más alto» (`ads/ads-post-webinar.md`). Si el precio de lista fuera USD 9.000 y el de los 10 cupos 6.000, eso no está escrito en ningún lado; si es 6.000 − 3.000 = 3.000, contradice todo lo demás. Además el SOP dice que el precio se sube "para los nuevos y listo", sin anunciarlo: un descuento anunciado es lo contrario. [PENDIENTE: Santi — ¿qué precio ve el lead cuando abre la página y de dónde sale el −3.000?]
3. **3 meses vs 4 meses**, y «chequeo semanal 1a1» (`CONTEXTO.md`, renglón 10) vs «Sesiones 1 a 1 ilimitadas» (`oferta-genesis.html`). El precio no se puede calcular contra una entrega que cambia según el archivo.
4. **Plan de cuotas escrito vs cobrado.** El escrito tiene recargo (6.000 → 6.750 / 7.650); lo cobrado fueron dos pagos sin recargo. El SOP ataca justo eso: cuotas de entrada «vas a seguir cerrando de 1.000 o menos» [24:04].

**Decisión:** se trabaja esta base con **USD 6.000 contado como precio vigente** porque es lo que dice `CONTEXTO.md` y lo que se comunicó en el webinar del 17/11. Si Santi confirma 5.000, los números de las Fases D, G y H se recalculan con 5.000 (se indica dónde).

---

## FASE A — Diagnóstico: ¿se está cobrando por debajo?

### Paso 1 — Las 3 señales, con los números reales

| Señal del SOP [pantalla 02:40] | Génesis hoy (USD 4.000–6.000) | ¿Sí? | Génesis antes (1a1 USD 1.800–2.100) |
|---|---|---|---|
| **1. ¿Nadie te discute el precio?** | Sí lo discuten, con fricción sana: «Los 5.000 dólares no los tenemos líquidos, pero podemos ver cómo hacemos» (Núñez); 2 de 4 pagaron en 2 partes (Alan, Núñez); Alan «pidió plata prestada» para sostener la marca; llamadas de 73 y 91 min (Alan, Herbora). Lopo pagó USD 5.000 PIF en 48 min y Núñez cerró en 23: llegaron decididos, pero no sin pensarlo. En la Mentoría: «es el doble de lo que estábamos pensando» (Franco, B2C-01). | **No** | **Sí:** «se vendía sola» (`negocio/brief-genesis.md`). Cero fricción = «es una señal, no un logro». |
| **2. ¿Demasiados clientes para lo que facturás?** | 10 cupos por apertura; «el modelo no es de hacer mucho volumen» (`brief-genesis.md`). [PENDIENTE: Manu/José — cuántos clientes activos hay hoy entre Génesis y Lite, y cuántas horas por semana se les dedica] | **No** [con dato pendiente] | Mejor mes «USD 15.000 sin ads, setters ni closers» con un ticket de 1.800–2.100 ≈ 7 a 8 clientes 1a1 en un mes, más el grupal de USD 500: el patrón del SOP («50 ventas 1 a 1 por mes… no tiene ningún sentido»). |
| **3. ¿Te llega gente que negocia todo y no ejecuta nada?** | Negociación: sí sobre la forma de pago («lo que tengas ahora y después completás el pago con lo que ganes con la marca», `analisis-ventas-calificadas.md`), nunca sobre el precio. Ejecución: **[PENDIENTE: Manu — de los clientes actuales, ¿quién ejecuta y quién no? ¿quién ya hizo su primer cobro recurrente?]** | **Sin dato** | [PENDIENTE] |

**Criterio del SOP: 2 de 3 = estás cobrando por debajo.** Génesis hoy: **0 de 3 sí, 1 sin dato → no está cobrando por debajo.** El 1a1 viejo daba 2 de 2 con dato: estaba barato, y se resolvió subiendo de nivel (Fase F), no subiendo el número.

Ojo con la lectura: que no esté barato **no quiere decir que 6.000 esté validado**. Ninguna de estas señales se midió a 6.000 (todas son ventas a 4.000–5.000). Se vuelven a contestar con las llamadas del 17/11.

### Paso 2 — La creencia (variable 3: "cuánto te animás vos a cobrar")

El SOP: «Todo es creencia» [05:27]. Lo que el repo deja ver de cómo se decide el precio en Génesis, separado entre lo que está escrito y lo que se deduce:

| "Creo que…" | Dónde aparece | Qué dice el SOP |
|---|---|---|
| "Si digo el precio antes de la llamada, no aplica nadie" [HIP] | El precio no aparece en la clase, ni en el VSL, ni en YouTube, ni en la página de oferta: «La inversión te la paso en la llamada, con tus números adelante» (clase 19/10, slide 143); «Sin precio en la descripción» (`brief-genesis.md`) | Caso del autor [33:24]: «todos los que agendaban llamada sabían los rangos de precio; en consecuencia cerraron tickets más caros». No es regla, es un caso; se propone como prueba (Fase G). |
| "Tengo que dar algo para que entren" [HIP] | El «−USD 3.000 de descuento» como bonus; la financiación «con lo que ganes con la marca» | «Bajar el precio no ayuda a más personas. Ayuda peor a más personas.» El precio es un filtro. |
| "El avatar puede pagar 2.000–5.000" | «Capacidad de inversión demostrada: USD 2.000–5.000 en formación» (`CONTEXTO.md`) | Es un dato del ticket anterior. «La persona que te compra algo de $500 no es la misma que te compra algo de $5.000» [pantalla 18:35]. |
| "No hay casos de terceros, así que no puedo cobrar más" [HIP] | «El único caso con suscripción es el de Manu» (`ESTADO.md`) | Es cierto que falta, y el SOP lo resuelve construyendo, no justificando: «¿qué me falta construir para que no haga falta justificarlo?» [pantalla 31:45]. |
| Lo que ya está bien puesto | «No se baja de precio en ningún momento» (`CONTEXTO.md`); «El precio de Génesis no se baja nunca… Bajar el precio confirma ese miedo» (manual) | Coincide con el Error 4 del SOP. Se mantiene. |

[PENDIENTE: Manu — contestar en el checkpoint, con su cabeza: ¿qué número te da miedo decir? ¿por qué no se dice el precio en la clase? ¿de quién fue la idea del −3.000?]

El "ruido mental a favor" que pide el SOP («si mis alumnos ganan esto… ¿cómo le voy a cobrar esto?») hoy Manu lo puede tener solo con su propia marca (275.225.343 ARS/mes, 3.943 suscriptores, 7,2% de cancelaciones). Con clientes, todavía no: falta el caso (Fase C).

---

## FASE B — Valor percibido

### Paso 3 — Meta de brecha: 4 a 5 veces lo que pagan

| Precio | Valor percibido objetivo (4–5×) |
|---|---|
| USD 6.000 (vigente según `CONTEXTO.md`) | **USD 24.000 – 30.000** |
| USD 5.000 (si Santi confirma 5.000) | USD 20.000 – 25.000 |
| USD 2.000 (Genesis Lite / Mentoría) | USD 8.000 – 10.000 |

**Lo que hay escrito hoy:** el único stack de valor es el de la clase del 19/10 (`lanzamientos/2026-10-19-clase/clase/v2/05-pitch-qa-cierre.md`, slides 127–139): 12 renglones con «[VALOR A DEFINIR: USD 1.500]», «[… USD 1.200]»… y «Total: [VALOR A DEFINIR: USD 16.000]». Tres problemas según el SOP:

1. 16.000 / 6.000 = **2,7×**, abajo del 4–5×.
2. Los valores no tienen fuente: son placeholders. Regla del repo: «todo verdad».
3. Están anclados a «si armaras cada una de estas piezas por separado, con distintos proveedores» = el costo de hacerlo con otros (competencia/horas), que es justo el ancla falsa del Paso 6. El valor que el SOP manda mostrar es el **retorno** (Paso 7), no lo que costaría el servicio por partes.

**Decisión:** el valor percibido de Génesis se arma con el cálculo del Paso 7 hecho con los números del lead (como ya pide el manual: «que vea su número, no el de Manu») y no con un stack de precios por renglón. Si se quiere un stack, cada valor tiene que salir de un dato real [PENDIENTE: Santi decide si se mantiene].

### Paso 4 — Auditoría de los 5 componentes y las 4 decisiones de pricing ocultas

> El SOP pide mirar perfil, últimos contenidos y materiales **como si fueras tu avatar**, marcar los 3 puntos más flojos y pedir otros puntos de vista [30:43]. Esta auditoría la armó Claude desde los archivos del repo; **no vio el perfil en vivo** (Instagram lo bloquea: `evergreen/perfil-ig/optimizacion-perfil.md` §1). La tienen que repetir Manu y Santi con el teléfono en la mano, mirando como "Gonza" (S1), y sumar la mirada de un cliente actual.

| Componente [pantalla 06:30] | Qué tiene Génesis (con fuente) | Lectura como "Gonza" | Nota |
|---|---|---|---|
| **Contenido** | Mucho y con cuentas: 18 ads de adquisición, 13 de nutrición, 16 mails, WhatsApp, funnel de YouTube de 10 videos; la cuenta canónica en pantalla; ángulos sacados de llamadas reales (`ESTADO.md`) | Me habla con mis palabras («hace mucho que no tenemos un día bueno», «7 lucas», «renovar»). | Fuerte |
| **Visual** | Estudio en Mar del Plata, pizarra/iPad, tablero de Scalify en pantalla, remera lisa (`CONTEXTO.md`); página de oferta con diseño propio (`oferta-genesis.html`). Bio auditada el 26-sep: «+3M con mis marcas | Fundador de Genesis OS», sin tilde, autoridad por facturación (`optimizacion-perfil.md`) | [PENDIENTE: ver el perfil de hoy] | Sin auditar en vivo |
| **Forma de comunicar** | Voz definida: operador a operador, cadena causal con el número entre guiones, remate seco (`CONTEXTO.md`). Riesgo: «Génesis», «Genesis OS», «Genesis Lite», «Génesis DFY», «Método B.A.S.E.», «la Mentoría» conviven para nombrar dos ofertas | Me confunde qué es qué y cuánto sale | Media |
| **Prueba social** | Manu: 275.225.343 ARS/mes, 3.943 suscriptores, 7,2% (con captura, `oferta-genesis.html` → `manu-dashboard.webp`). José: «458,7M, +72%, 8.361 pedidos». Herbora autorizó el caso, pero **no usa suscripción**; los testimonios «se usan como prueba de que "nos metemos en tu marca y los números se mueven", nunca al lado de "suscripción"» (`ESTADO.md`). La página dice «+$3 B generados para clientes» [PENDIENTE: fuente y captura; sin captura no hay número] | "Le funciona a él. ¿A alguien como yo?" | **Débil en lo que importa** |
| **Cómo la hacés sentir** | Lo que decidió la compra: que Manu «se meta en la tienda y en los números» contra el mentor que dice «venís bien», la cuenta hecha en vivo con sus números (Alan), cupos limitados (`analisis-ventas-calificadas.md`) | "Este tipo ve algo que yo no veo" — **pero eso pasa en la llamada, no antes** | Fuerte en la llamada, flojo antes |

Las 4 decisiones de pricing ocultas [pantalla 07:50]:

| Decisión | Génesis |
|---|---|
| 1. **Cómo se ve lo que hacés** ("la señal más rápida y más barata") | Estudio, pizarra, página de oferta cuidada. Contra: bio vieja con «+3M» sin moneda; capturas pendientes en varias piezas («[CARGAR]», «[IMAGEN PENDIENTE]» en `ESTADO.md` y en la clase). Cada `[CARGAR]` que sale sin la captura comunica descuido. |
| 2. **Cómo comunicás** ("no cuánto sabés: cómo lo transmitís") | Bien: la cuenta canónica es simple y se repite igual en todos lados («la única que se usa en cámara, pizarra y calculadora»). |
| 3. **Qué mostrás sin decirlo** (aura, prueba) | Los tableros reales (Scalify, panel de suscripciones), el equipo, la comunidad presencial (`oferta-genesis.html`). Lo que se muestra sin decirlo y resta: el descuento de 3.000 y un precio que cambia según el archivo («que el precio cambie según quién lo atienda» es justo lo que frena al avatar, `CONTEXTO.md`). |
| 4. **Cómo la hacés sentir** ("el más difícil de medir, el que más pesa") | Entendido, sí (las frases textuales). Vendido: riesgo en el lenguaje de cupos y cierre (Fase E). Comparado «como alguien más»: el enemigo «mentor que dice venís bien» lo separa bien. |

**Los 3 puntos más flojos (lo que pide el SOP):**

1. **Prueba social de tercero con suscripción: no existe.** Es el componente que más sostiene un ticket alto (Paso 10: el ticket medio y alto «necesita más prueba social») y el que alimenta el ciclo de valor percibido. → Se cierra en la Fase C (primer cobro recurrente de un cliente, con captura).
2. **Materiales que se contradicen** (precio, cuotas, duración, DFY/DWY, descuento, nombres de la oferta). → Se cierra con la lista de "Qué cambia".
3. **Lo que decide la compra no está escrito antes de la llamada:** «me meto en tu tienda» no tiene nombre ni renglón propio en la oferta (`01-avatar.md`, dolor 6), y el valor se construye recién en la llamada. → Nombre de marketing para el dolor 6 (pendiente de Manu en la base 01) y una pieza de contenido que muestre una auditoría real (clips de llamadas de auditoría, `negocio/marca-personal.md`).

**Hábito del autor aplicado** [09:54]: el autor no delega sus secuencias de historias porque cada una suma al valor percibido. En Génesis las secuencias las arma el equipo con agentes (`_archivo/historias-lanzamiento.md`). [PENDIENTE: Manu decide si graba él, sin guion cerrado, al menos la secuencia del día de la clase y la del cierre.]

---

## FASE C — Congruencia "como es arriba, es abajo"

### Paso 5 — Revisión en las dos direcciones

**Arriba (marketing) por encima de abajo (producto) → riesgo de "valor percibido inflado":**

| Lo que se promete arriba | Lo que hay abajo | Brecha |
|---|---|---|
| «Escalo tu ecomm de consumibles a +$100M al mes convirtiéndolo a modelo de suscripción» | El único resultado con suscripción documentado es el de Manu. «Período entre los 60M y hoy: [PENDIENTE]». Ningún cliente con primer cobro recurrente registrado (`01-avatar.md` §6) | **Abierta.** `CONTEXTO.md` ya lo aclara: «+$100M/mes… es el punto final del mecanismo, no un resultado a 90 días». Se mantiene así en todo el copy. |
| «+$3 B generados para clientes» (`oferta-genesis.html`) | Sin fuente en el repo | [PENDIENTE: Santi — fuente o se saca] |
| «Sesiones 1 a 1 ilimitadas», 4 meses (`oferta-genesis.html`) | «Chequeo semanal 1a1», 3 meses (`CONTEXTO.md`) | Abierta: una de las dos está mal |
| «Lo instalamos nosotros» (B2B-16) / «La Instalación, hecha por nosotros» (manual) | Done With You: «la marca lo aplica con Manu y el equipo al lado; no se hace por el cliente» (`CONTEXTO.md`, corregido 02/11) | Abierta en los guiones de venta: el cliente que compra DFY y recibe DWY siente que le prometieron más |
| A Lopo (S3): «que Manu y José hagan la búsqueda de producto con él» | «Búsqueda de producto ganador» fuera de alcance (`CONTEXTO.md`) | Abierta (pendiente de Manu en la base 01) |

**Abajo por encima de arriba → "nada más frustrante que tener un producto excelente que nadie compra":**

| Lo que hay abajo | Cómo aparece arriba |
|---|---|
| Manu y José adentro de la tienda y los números (lo que más decidió la compra) | No nombrado como pieza; aparece recién en la llamada |
| Baúl de más de 30 agentes de IA (lo que más le interesó a Núñez) | Sí, desde el 17/11 (regalo de 3 agentes, campus) |
| Financiación flexible | Se comunica en la llamada como argumento («con lo que ganes con la marca»). El SOP la pone al final (Fase G) |
| Comunidad con encuentro presencial mensual | Solo en `oferta-genesis.html` |

**Práctica del autor para asegurar resultado abajo** [12:29]: la primera clase que ve el cliente dice que «la responsabilidad es 100% suya». En Génesis: [PENDIENTE: José — ¿el onboarding del campus tiene esa clase? Si no, se suma como primera pieza del módulo Fundamentos]. Va de la mano con DWY: el cliente lo aplica, Manu y José al lado.

### El ciclo de valor percibido en Génesis (diagrama del SOP [pantalla 13:40])

Supera lo prometido → Cliente motivado → Mejores resultados → **Casos de éxito + boca en boca** → Más valor percibido → Precio más alto → Menos clientes, mejor atendidos → Producto todavía mejor.

| Nodo | Génesis hoy |
|---|---|
| Supera lo prometido | [PENDIENTE: no hay medición de satisfacción de clientes] |
| Cliente motivado | [PENDIENTE] |
| Mejores resultados | Herbora: «de pérdida a 40% de margen», «casi dos palos de profit» (período a confirmar), sin suscripción |
| **Casos de éxito + boca en boca** | **El nodo roto.** «Un caso de éxito, con nombre y número, vale más que meses de contenido» [pantalla 14:30]. No hay caso de tercero con suscripción; Herbora no se puede poner al lado de «suscripción» |
| Más valor percibido / precio más alto | Se subió el precio (4.000 → 5.000 → 6.000) antes de cerrar el nodo anterior: es el Error 3 del SOP si no se cierra |
| Menos clientes, mejor atendidos | Sí: 10 cupos |

**Decisión de congruencia:** antes de cualquier suba, el primer caso a construir es **un cliente S1 con reposición ≤ 30 días que haga su primer cobro recurrente**, documentado con captura (días desde que entró, suscriptores, churn). Es el subavatar más rápido según el filtro de congruencia de la base 01 (§6).

---

## FASE D — El cálculo real

### Paso 6 — Las dos anclas falsas, en Génesis

| Ancla falsa | Dónde aparece en Génesis | Qué se hace |
|---|---|---|
| **Competencia** | El precio de los mentores nivel 1–2 y de Bulacio no está en el repo (`brief-genesis.md` → Competencia), y está bien que no esté: «Anclar tu precio al de otro es delegarle a un desconocido la decisión más importante de tu negocio». El riesgo real es el inverso: que "lo que pagó por la mentoría anterior" (USD 2.000–5.000) funcione como ancla del avatar | No se nombra ni se compara precio con nadie. Si el lead compara, se vuelve a su cuenta (Paso 7) |
| **Horas** | El stack del 19/10 vale cada renglón por "lo que te cobraría un proveedor"; «Sesión 1 a 1 con Manu a pedido… Valor: USD 2.400»; la oferta se describe por cantidad de llamadas y grupales («64 clases grupales») | El SOP: «Un dueño de negocio cobra por resultado». La cantidad de grupales es entrega, no valor: se dice, pero el precio no se apoya ahí |

Nota del SOP [16:29]: una oferta más cara no necesita «más cosas»; puede valer más porque resuelve un **cuello de botella más costoso**. En Génesis el cuello es el techo de pauta: con compra única el avatar puede pagar 30.000 por cliente; con suscripción, 75.000. Eso es lo que vale, no la cantidad de llamadas.

### Paso 7 — Precio anclado al ROI (la fórmula del SOP, completada)

```
Retorno anual = (resultado anual del avatar DESPUÉS) − (resultado anual HOY)
Precio = 10% a 20% × Retorno anual
```

**Datos reales que entran** (`CONTEXTO.md` → la cuenta canónica):

| Variable | Valor | Fuente |
|---|---|---|
| Margen de contribución por pedido | 30.000 ARS | Cuenta canónica |
| Techo con compra única | 30.000 ARS por cliente (breakeven en la primera venta) | Cuenta canónica |
| LTV con suscripción | 3 pedidos | Cuenta canónica |
| Techo con suscripción / punto operativo | 90.000 / **75.000** ARS por cliente | Cuenta canónica |
| Lo que queda vivo por cliente en el punto operativo | **15.000 ARS** | 90.000 − 75.000 |
| Capacidad extra de compra por cliente | **45.000 ARS** | 75.000 − 30.000 (la que usa `CONTEXTO.md` para justificar el precio) |
| Tipo de cambio implícito | 1 USD ≈ 1.500 ARS | «USD 6.000 ≈ 9.000.000 ARS» (`CONTEXTO.md`) y «USD 5.000 son unos 7,5 millones» (manual) |
| **N = clientes nuevos que mete el avatar por mes** | **[PENDIENTE]** | No se pregunta en ningún formulario. Sí está en el banco: «¿Cuántos clientes nuevos metés por mes hoy?» (B2B-01) |
| B = compradores actuales que ya recompraron | Caso real: «400 clientes que recompraron ya» (Lucas, Herbora). En general [PENDIENTE] | `analisis-ventas-calificadas.md` |

**HOY (compra única en breakeven):** cada cliente nuevo deja ≈ 0 después de pagar el CPA («breakeven en la primera venta»). Resultado anual de la adquisición ≈ 0. (Con datos reales puede ser negativo: «7 lucas de ganancia», «60 lucas abajo», «600 lucas abajo» en un día, Herbora.)

**DESPUÉS, lectura A (conservadora: la ganancia que queda):** cada cliente nuevo deja 15.000 ARS vivos operando en 75.000. Retorno anual = N × 12 × 15.000 ARS. No cuenta que, al poder pagar más, el avatar compra más clientes (no hay dato para estimarlo).

**DESPUÉS, lectura B (la de `CONTEXTO.md`: capacidad extra de compra):** retorno anual = N × 12 × 45.000 ARS. Ojo: 45.000 es margen para pujar más en la subasta, no ganancia en el bolsillo; sobreestima el retorno si el avatar usa toda la capacidad para comprar más caro.

| N clientes nuevos/mes | Retorno anual A (USD) | Precio SOP A (10–20%) | Retorno anual B (USD) | Precio SOP B (10–20%) |
|---|---|---|---|---|
| 100 | 12.000 | USD 1.200 – 2.400 | 36.000 | USD 3.600 – 7.200 |
| 200 | 24.000 | USD 2.400 – 4.800 | 72.000 | USD 7.200 – 14.400 |
| 300 | 36.000 | USD 3.600 – 7.200 | 108.000 | USD 10.800 – 21.600 |
| 500 | 60.000 | USD 6.000 – 12.000 | 180.000 | USD 18.000 – 36.000 |

*(Tabla de sensibilidad hecha con la cuenta canónica; los N son escenarios, no datos de clientes. Conversión a 1.500 ARS/USD.)*

**Componente extra — la base que ya tiene (renglón 4, conversión de la base):** B recompradores × (LTV − 1) × 30.000 ARS, una vez en el año. Ejemplo con el dato real de Lucas y el margen canónico (no el de Lucas, que no está en el repo): 400 × 2 × 30.000 = 24.000.000 ARS ≈ **USD 16.000** → suma USD 1.600 – 3.200 al rango. [HIP: que esos 400 pasen a suscripción con LTV 3.]

**Comparado con lo que se cobra hoy (y la diferencia anotada, como pide el SOP):**

- Para que **USD 6.000** quede dentro del 10–20%: el avatar tiene que meter **≥ 250 clientes nuevos por mes** (lectura A, extremo 20%) o **≥ 84** (lectura B). Para estar cómodo en el medio del rango (15%): ~330 (A) o ~110 (B).
- La cuenta que usa hoy el equipo («se paga con ~200 clientes adquiridos al techo nuevo», `CONTEXTO.md`) es un **cálculo de recupero** (precio = 100% del retorno de 200 clientes), no el del SOP. Con el SOP, esos 200 clientes tienen que ser 1.000 a 2.000 en el año: el precio es una décima o una quinta parte de lo que le vuelve.
- **Diferencia anotada:** con un avatar de **N ≈ 100/mes**, USD 6.000 está **arriba** del rango en la lectura A (1.200–2.400) y **adentro** en la B (3.600–7.200). Con **N ≈ 300/mes** está adentro en la A y **USD 4.800–15.600 por debajo** del rango en la B. El número que decide si Génesis está caro o barato para cada lead es N, y hoy no se mide.

**Decisión:** el precio de lista no cambia por esta cuenta (no hay N real). Lo que cambia: **N entra al formulario de aplicación y a la calificación** (pregunta F7, abajo), y en la llamada la cuenta se hace con el N del lead (el manual ya lo pide en la fase 4 con el Simulador).

> F7 (formulario de aplicación, nueva): «¿Cuántos clientes nuevos te compran por mes, aproximadamente?» · Menos de 50 · 50 a 150 · 150 a 300 · Más de 300 · No sé.

### Paso 7b — Lo que no es monetario

«¿Cuánto pagaría por dejar de tener este problema?» [pantalla 17:35]. Los dolores de Génesis que no entran en la fórmula, con su evidencia:

| Problema | Evidencia real | Pregunta para la llamada |
|---|---|---|
| Vivir en alerta: «es cuestión de que pase un día y irme a pérdida» | Nico (B2C); «600 lucas abajo… manotazo ahogado» (Herbora) | «¿Cuánto vale para vos saber el 1 del mes cuánto entra?» |
| Poner plata propia o prestada | «Lo que hice de ganancia en septiembre fue para cubrir todo lo que pedí prestado» (Alan) | «¿Cuánto pusiste de tu bolsillo este año para sostener la marca?» |
| No poder blanquear | «Si paso a RI no cierra» (`CONTEXTO.md`) | «¿Qué te cuesta seguir en monotributo un año más?» |

Estas preguntas no reemplazan la cuenta: la completan, y van **antes** del precio (fase de Consecuencia del manual).

### Paso 8 — Condición innegociable: el avatar tiene que poder pagarlo

| Dato | Valor | Fuente |
|---|---|---|
| Capacidad demostrada | USD 2.000–5.000 en formación | `CONTEXTO.md` |
| Lo que pagaron los 4 que más pagaron | 4.000 · 5.000 · 5.000 · 5.000; 2 de 4 en dos pagos; uno «no líquido» | `analisis-ventas-calificadas.md` |
| Ventas documentadas a USD 6.000 | **0** | — |
| Leads del 19/10 | 151 de 341 «0, todavía no tengo marca»; 53 invierten menos de USD 100/día en Meta | `conclusiones.md` |
| Pregunta de plata del formulario | «Menos de USD 2.000 · Entre USD 2.000 y 5.000 · Más de USD 5.000» | `proceso-de-ventas-clase-19-10.md` |

**Lectura:** el que pagó 5.000 demuestra que el ticket de 5.000 es pagable para S1, S2 y S3. 6.000 todavía no se probó. Y el formulario no lo puede detectar: «Más de USD 5.000» mete en la misma bolsa al que tiene 5.500 y al que tiene 20.000.

**Si después del 17/11 resulta que el avatar no llega a 6.000, los dos caminos honestos del SOP:**
- **Cambiar de avatar:** priorizar al S1 con N alto (Paso 7) y facturación validada, y al S3 con capital (Lopo pagó PIF).
- **Cambiar de oferta:** que la oferta para el que no llega sea Genesis Lite (otra oferta, otro nivel), no Génesis con descuento.
- **No hay tercero:** "cobrar menos y esperar que funcione" no es opción (y ya es regla de `CONTEXTO.md`).

Cambio al formulario: «¿Cuánto podés invertir para resolverlo?» → «Menos de USD 2.000 · 2.000 a 4.000 · 4.000 a 6.000 · Más de 6.000». [PENDIENTE: Santi]

---

## FASE E — Cuando sube el ticket

### Paso 9 y 10 — Es una persona distinta: el perfil de cada ticket de Génesis

| | Ticket bajo | Ticket medio | Ticket alto |
|---|---|---|---|
| Perfil del SOP [pantalla 19:00] | Alta urgencia, decide rápido, lenguaje de rapidez y facilidad | Compara opciones, necesita más prueba social, tarda más | Busca algo profundo, valora exclusividad y acceso, proceso largo |
| Génesis antes | Grupal USD 500 | 1a1 USD 1.800–2.100 («se vendía sola») | — |
| Génesis hoy | — | **Genesis Lite / Mentoría USD 2.000** (B2C: «es el doble de lo que estábamos pensando», compara con lo que traía) | **Génesis USD 6.000**: llamadas de 73–91 min con el avatar de siempre, socio en 2 de 4, pago en 2 partes, valora el acceso («me meto en tu tienda», chat 1a1, cupos) |

Criterio del SOP [19:08]: si el proceso de decisión es largo, el ticket está alto «y está bien que lo sea». En Génesis, el que llega de la clase decidido cierra en 23–48 min (Núñez, Lopo); el que no, en 73–91. Las dos cosas son esperables a este ticket.

### Paso 11 — ¿Le seguís hablando al avatar del precio anterior?

Síntoma del SOP: «Sigue usando el lenguaje de rapidez, apuntando a la urgencia [a los cupos]».

| Lo que hay en el repo | ¿Es lenguaje del ticket anterior? |
|---|---|
| «Son 10 lugares y se cierra el jueves 22 a las 23:59… Cada lugar que se ocupa, se ocupa» (clase 19/10); carrito de 3 días; «fast-action: instalación prioritaria 48 h» (`brief-genesis.md`); «Son únicamente 10 lugares y cierra el sábado 21» (`ads-post-webinar.md`) | **Sí, en parte.** Los cupos son reales («la agenda real de José y mía») y eso es exclusividad, que el ticket alto valora. Lo que es de ticket bajo es la **presión de tiempo** (48 h, «no lo dejes para el jueves a la noche»). El manual ya marca el tono: «nada de presión, urgencia falsa ni "este precio es solo hoy"» (`formulario-closer.md`). |
| Hooks de velocidad | No: «Velocidad (no plazo)… se calcula por cliente; no hay número por defecto» (`CONTEXTO.md`). Bien puesto. |
| Calificación por «USD 100 por día en Meta» | Es el filtro de un avatar más chico; no mide si puede pagar 6.000 ni su N (Paso 7) |
| Formulario «Más de USD 5.000» | Rango pensado para 5.000 |

**Ajuste (a quién, cómo, qué demostrar) [pantalla 19:55]:**
- **A quién:** S1 con N alto y reposición ≤ 30 días (prioridad de la base 01), que decide con socio → el socio en la llamada desde el principio.
- **Cómo:** exclusividad y acceso (10 marcas porque es 1 a 1 con Manu y José), no apuro. La fecha de cierre se dice una vez, con el día con nombre; sin «quedan 24 horas».
- **Qué demostrar antes de que decida:** la cuenta con sus números (N incluido), una auditoría real en video (cómo es «meterse en tu tienda»), y en cuanto exista, el caso de tercero con suscripción.

---

## FASE F — Gaps de mercado y niveles (escalera de ofertas)

### Paso 12 — El escalón de Génesis en el ciclo

«Cada solución instalada genera un problema nuevo» [pantalla 20:10]. Los 4 niveles del SOP, en el nicho de Génesis (se apoya en la escalera de la base 01, §4.1):

| Nivel del SOP | En Génesis | Oferta | Precio | Competencia | Estado |
|---|---|---|---|---|---|
| **Empezar** | No vende, o vende sin marca de recompra: «buscar el producto, validarlo, lanzarlo, escalarlo» | **Genesis Lite / Mentoría** (grupal, 3 meses, lo implementa él) | USD 2.000 | Mucha: mentores nivel 1–2, producto ganador (`brief-genesis.md`) | Existe; **no se comunica** (solo en la llamada) |
| **Consistencia** | Marca de consumible que vende pero no se sostiene: «hace mucho que no tenemos un día bueno», «el 1 arranco en cero» | **Génesis** (1 a 1, DWY): pasar la unidad de venta de la compra al cliente | USD 6.000 | Nadie desde el modelo; Bulacio desde lo fiscal y el email | Es la oferta principal |
| **Escalar sin romperme** | Ya tiene suscriptores: churn, stock sobre la base, caja, pasar a RI | — [HIP: oferta futura] | — | Nadie en Argentina [HIP] | Es donde está Manu hoy (3.943 suscriptores, 7,2%) |
| **No depender de mí** | Varias marcas o una marca grande operada por sistemas, equipo y agentes de IA | — [HIP] | — | — | Insinuado en el baúl de +30 agentes y en lo que le interesó a Núñez |

Leyenda del SOP: **especificidad ↑ · competencia ↓ · precio ↑**. Se cumple: Lite pelea con muchos a USD 2.000; Génesis pelea casi solo a USD 6.000.

### Paso 13 — Camino para cobrar más: subir el número o subir de nivel

- **Ya se hizo el camino 2 (subir de nivel):** del 1a1 genérico de USD 1.800–2.100 al modelo de suscripción a USD 4.000–6.000. Ahí no se cobró más por lo mismo: se vende otra cosa. Es lo que el SOP llama «mucho más sólido».
- **El camino 1 (subir el número de Génesis) hoy no corresponde:** 0 de 3 señales y 1 de 4 razones legítimas (Fase H).
- **El próximo camino 2 posible** = una oferta de "Escalar sin romperme" (retención, churn, stock, RI para el que ya tiene suscriptores). Pregunta del plan: «¿Podés resolver un problema más específico y más avanzado del que estás resolviendo hoy?» → **Para tu propia marca, sí (3.943 suscriptores, 7,2%). Para clientes, todavía no está probado.**

### Paso 14 — Aviso de criterio

«La escalera se sube con capacidad real, no con posicionamiento.» Aplicado:

- No se arma oferta del nivel 3 hasta que **al menos un cliente** tenga suscriptores activos y Manu le haya bajado el churn o resuelto el stock. Antes: es meta, no oferta.
- En el nivel 2 tampoco se promete lo que no se logró en clientes: el «+$100M al mes» se dice como el punto final del mecanismo con la cuenta (30M × LTV 3), nunca como resultado de un cliente.
- «Qué hace Manu concretamente para el 7,2% de cancelaciones» sigue pendiente en `brief-genesis.md`: es justo la capacidad que hay que tener escrita para subir de nivel.

**Regla de multi-nivel en la llamada** [pantalla 24:45]: si hay dos niveles, se muestra primero el más caro. Ya es así en el manual (Génesis primero; Lite solo al final de la rama Plata, «nunca como "Génesis barato"»). Se mantiene. Lo que **no** se hace es la variante "pochoclos" (dos niveles con poca diferencia): Lite y Génesis son productos distintos, no tamaños.

---

## FASE G — Cómo se presenta el precio

### Paso 15 — Guion de presentación del precio en la llamada de Génesis

Diferencias con lo que dice hoy el manual (`ventas/manual-llamada-de-venta-genesis.md` → El precio, y `01-script-llamada-b2b-genesis.md`):

| Hoy | SOP | Cambio |
|---|---|---|
| «La inversión es de USD 5.000, para que pases tu marca a suscripción y puedas pagar por cada cliente más que tu competencia. ¿Alguna duda de cómo funciona?» | «Ok, te paso a comentar los precios, el precio quedaría en tanto» — y callarse. «El que habla primero después de decir el precio pierde.» | Se saca la justificación pegada al número y la pregunta final: las dos rompen el silencio. La pregunta de dudas va **antes** del precio |
| USD 5.000 | Precio vigente | USD 6.000 (o el que confirme Santi) |
| Cuotas «solo dentro de la objeción de plata» | PIF primero; cuotas como último recurso | Se mantiene |
| Financiación «lo que tengas ahora y después completás con lo que ganes con la marca» como algo que «inclinó la compra» | La cuota aparece «cuando la persona ya está en el último estado» | Va al final de la rama Plata, con el plan escrito (no se improvisan pagos) |
| Página de oferta con «−USD 3.000» | Sin descuentos; «se sube para los nuevos y listo» | Se saca de la página |

**El guion (Génesis, ticket alto):**

1. **Antes del número — terminar de dar el valor y vaciar preguntas.** Después del pitch (roadmap de 3 fases con sus frases textuales y la cuenta con sus números):
   > «Con esto que te mostré: ¿te queda alguna duda de cómo trabajamos, de qué hacemos nosotros y qué hacés vos?»
   Si hay dudas, se responden. Si no, se sigue. (Es el «asegurate de que la persona no tenga preguntas» del SOP [25:37].)
2. **Anclar con el total.**
   > «Bien. Te paso la inversión: Génesis son USD 6.000.»
3. **Callarse.** Nada más. Ni «para que pases tu marca…», ni «incluye…», ni «sé que es mucho». El silencio queda del lado de su evaluación. Si el closer siente la necesidad de justificar, el SOP lo dice: «o no hiciste bien el trabajo de valor antes, o estás denotando inseguridad».
4. **Buscar el PIF.** Si responde con interés («ok», «¿cómo seguimos?»):
   > «Perfecto. Lo dejamos hoy así arrancás con la auditoría esta semana. ¿Transferencia o tarjeta?»
   Sin mencionar cuotas. «Si no ofrecés de entrada otra opción, la persona va a hacer todo por pagarte… y la mayoría te va a pagar PIF» [24:31].
5. **Si aparece la objeción de plata** → rama Plata del manual, en este orden: ¿si tuvieras los fondos, esto te funciona? → la cuenta con su N («¿cuántos clientes nuevos metés por mes? Con 45.000 más por cliente…») → profundizar el dolor («¿cuánto pusiste de tu bolsillo este año?») → fuentes (socio, tarjeta, préstamo que él proponga) → **recién ahí** el plan de pagos:
   > «Si hoy no llegás con todo, se puede en 2 pagos de USD 3.375 o en 3 de USD 2.550. La tienda con suscripción arranca después del segundo pago.»
   [PENDIENTE: Santi — ¿el plan de pagos es el de `CONTEXTO.md` (con recargo) o los dos pagos sin recargo que se cobraron en octubre? Tiene que haber uno solo, escrito, y el closer no lo cambia.]
6. **Si califica, quiere y no llega ni en cuotas:** Genesis Lite, presentada como otro nivel (Fase F), nunca como Génesis barato. USD 2.000; y en Lite se repite el mismo guion (total, silencio, cuotas al final).
7. **Nunca:** descuento, «te lo dejo en…», bonus agregado después del precio para destrabar, segunda llamada salvo la del socio.

**Variante en la clase (prueba propuesta, no regla) [HIP]:** el caso del autor [33:24] es que los que agendaban ya conocían los rangos de precio y se cerraron tickets más caros. Propuesta para el próximo lanzamiento: el formulario de aplicación dice «La inversión de Génesis arranca en USD 6.000» antes de la pregunta de plata. Medir si baja la cantidad de aplicaciones y si sube el % de cierre (semáforo). [PENDIENTE: decisión de Santi y Manu.]

---

## FASE H — Cuándo y cómo moverlo

### Paso 16 — La métrica principal y el semáforo, definidos para Génesis

El SOP no define bien numerador y denominador; se lee como «el % de personas a las que les presentás el precio que efectivamente pagan» (nota del SOP §10). Para Génesis:

**Semáforo = ventas cerradas ÷ llamadas en las que se dijo el precio de Génesis, cada 5–10 ventas.**

| Semáforo | Rango | Lectura | Acción en Génesis |
|---|---|---|---|
| Verde | > 75% | «La gente paga sin fricción. Estás barato.» | Subir para los nuevos (Paso 19), revisando antes qué cambió del otro lado |
| Amarillo | 50–75% | «Rango sano» | Quieto (o tantear un escalón chico en la próxima apertura) |
| Rojo | < 50% | «Hay un problema» | No se toca el precio: orden del Paso 17 |

**Lectura con lo que hay (insuficiente para el semáforo):**

| Dato | Valor | Fuente |
|---|---|---|
| Piloto | «los 3 del piloto cerraron» de 5 cupos; llamadas con precio: [PENDIENTE] | `CONTEXTO.md` |
| 19/10, desde anuncios | 7 aplicaron → 0 compraron | `conclusiones.md` |
| Las 4 llamadas analizadas | 4 de 4 cerraron, pero se eligieron **porque** pagaron (sesgo) | `analisis-ventas-calificadas.md` |
| Mentoría (B2C) | 1 de 2 (Nico sí, Franco no) | `00-analisis-llamadas-fathom.md` |
| 17/11 | [PENDIENTE: Santi — aplicaciones, llamadas con precio, ventas, PIF/cuotas, desde el campus] | — |

**Métrica de apoyo del SOP — PIF vs plan de pagos:** 2 de 4 PIF (Herbora, Lopo). Cobrado en el primer pago: 4.000 + 2.000 + 2.500 + 5.000 = **USD 13.500 de USD 19.000 vendidos (71%)**. [PENDIENTE: Santi — ¿se cobraron los segundos pagos de Alan y Núñez?] Si en el 17/11 el PIF baja de la mitad, revisar si las cuotas se están ofreciendo antes de tiempo (Paso 15).

**Planilla para llenar cada 5–10 ventas** (en el campus, donde se trackea desde el 18/11):

| Bloque | Llamadas con precio | Ventas | % (semáforo) | PIF | En cuotas | Precio | Subavatar (S1/S2/S3) | N del lead | Decisión |
|---|---|---|---|---|---|---|---|---|---|
| 17/11 – 1 | | | | | | 6.000 | | | |

### Paso 17 — Si da rojo: el orden antes de tocar el precio

«Volumen de conversaciones → ejecución del proceso → claridad de la explicación → recién ahí avatar y precio.» En Génesis:

1. **Volumen de conversaciones:** ¿cuántas aplicaciones llegaron a llamada? (19/10: 7 aplicaciones desde anuncios; la clase se pierde después de la clase: «la venta se pierde después de la clase: ahí está la palanca», `conclusiones.md`.)
2. **Ejecución del proceso:** ¿el closer siguió el manual? (descubrimiento antes del pitch, compromiso antes de consecuencia, precio y silencio, cuotas al final). En B2C ya se vio lo contrario: José habló 20 min antes de la primera pregunta y ofreció cuotas antes de la objeción (Franco).
3. **Claridad de la explicación:** ¿el lead entendió la cuenta con sus números? ¿le quedó claro DWY (no DFY)?
4. **Avatar:** ¿qué subavatar era? ¿con qué N y qué capital? (F1 y F7 del formulario.)
5. **Precio:** recién acá. Y si aun así se cree que es el precio, se adapta el "Loom al Discord" del SOP: **Santi arma un Loom para Manu** explicando por qué bajaría el precio y por qué el cuello no está en 1–4, con las llamadas grabadas de Fathom.

### Paso 18 — Las 4 razones legítimas para subir, evaluadas hoy (para el salto a USD 6.000)

| Razón [pantalla 27:20] | Génesis | ¿Se cumple? |
|---|---|---|
| 1. Nadie te discute el precio | Lo discuten (Fase A) | No |
| 2. Más demanda de la que podés atender bien | 10 cupos; [PENDIENTE: cuántas aplicaciones calificadas hubo el 17/11 contra 10 lugares] | Sin dato |
| 3. Tu producto mejoró de verdad | Desde el piloto se sumaron: llamadas con José, 4 grupales por semana, campus con SOPs y +30 agentes de IA, Puentify, Red Génesis (`CONTEXTO.md`, oferta del 17/11) | **Sí** [a confirmar que todo existe y se entrega: «verificar con Manu que existan antes de decirlos», `brief-genesis.md`] |
| 4. Casos de éxito que respaldan la promesa | No hay de terceros con suscripción | No |

«"Necesito más plata este mes" no es una de ellas.» **Conclusión:** la suba a 6.000 tiene una razón legítima y le falta la 4. Por eso no se vuelve a subir hasta tener casos, y si el 17/11 da rojo, primero se revisa el proceso (Paso 17).

### Paso 19 — Cómo subirlo cuando toque

- **Se sube para los nuevos y listo**, sin anunciarlo: en la próxima apertura el precio nuevo está en todos los guiones y en la página el mismo día.
- **Nunca con "descuento"** que haga ver el precio viejo como regalo (el −3.000 actual es el caso a evitar).
- A los que ya pagaron no se les toca nada.
- **Antes de cada suba, se anota qué cambió del otro lado** (Error 3): caso nuevo con captura, pieza nueva de la entrega, resultado medido. Si no se puede anotar nada, no se sube.

---

## Errores comunes del SOP, revisados en Génesis

| Error | ¿Pasa en Génesis? | Qué se hace |
|---|---|---|
| **1. Síndrome del precio amable** | Pasó con el 1a1 viejo (USD 1.800–2.100, «se vendía sola», mejor mes USD 15.000). Riesgo actual: el descuento de 3.000 y la financiación «con lo que ganes con la marca» como argumento | Cálculo de ROI (Paso 7); descuento afuera |
| **2. Anclar el precio a la competencia** | No (no hay precios de competencia en el repo). Riesgo indirecto: el stack «lo que te cobrarían distintos proveedores» | Anclar al retorno con sus números |
| **3. Subir el precio sin subir el valor percibido** | **Riesgo alto:** 4.000 → 5.000 → 6.000 en dos meses, con el nodo "casos de éxito" vacío. Si aparecen objeciones nuevas en el 17/11, la conclusión equivocada sería «6.000 no funciona en mi mercado» | Fase C: el primer caso de tercero; anotar qué cambió antes de cada suba |
| **4. Bajar el precio como primera reacción** | No: regla escrita «no se baja nunca». Ojo con que el descuento de la página no sea una bajada disfrazada | Orden del Paso 17 |

---

## Checkpoint (adaptado: revisión con Santi y Manu)

El SOP pide subir al canal 1 a 1 de Discord el cálculo de ROI, las 3 señales, la auditoría de valor percibido y el precio definido con su justificación, y no mover el precio sin esa revisión. En Génesis:

- **Quién:** Santi y Manu, en una llamada. [PENDIENTE: fecha; propuesta: la misma del checkpoint de la base 01, después del cierre del 20/21/11 y con los números del 17/11 en la mano.]
- **Qué se lleva:** Paso 0 (precio vigente único), Fase A (3 señales), Fase B (auditoría hecha con el teléfono, mirando como Gonza, más la opinión de un cliente), Paso 7 (la tabla con el N real de los compradores del 17/11), Fase H (primer bloque del semáforo).
- **Qué sale:** el precio vigente escrito en un solo lugar (`CONTEXTO.md`, si Santi lo pide), el plan de pagos único, y la decisión de subir / dejar quieto / revisar proceso.
- **Pregunta de cierre del SOP para Manu:** no «¿cómo justifico 6.000?», sino **«¿qué me falta construir para que no haga falta justificarlo?»**. Respuesta de esta base: el caso de tercero con suscripción y una oferta escrita que no se contradiga.

---

## Qué cambia respecto de lo que hay hoy en el repo

| Archivo / pieza | Qué queda viejo o contradice esta base | Qué hacer |
|---|---|---|
| `ventas/manual-llamada-de-venta-genesis.md` | USD 5.000 y cuotas 2 × 2.850 / 3 × 2.000; «La Instalación, hecha por nosotros» (DFY); frase de precio con justificación y pregunta pegadas; «Génesis es USD 5.000: se cierra en una llamada» | Precio y plan de pagos vigentes; guion del Paso 15; DWY |
| `ventas/llamadas-b2b-b2c/01-script-llamada-b2b-genesis.md`, `03-banco-de-objeciones.md`, `README.md` | USD 5.000, «170 clientes», «lo instalamos nosotros» (B2B-16) | Ídem; la cuenta de B2B-01 se rehace con 6.000 (≈ 9M ARS → 200 clientes) y con el N del lead |
| `ventas/proceso-de-ventas-clase-19-10.md` | USD 5.000, 4 meses; pregunta de plata «Más de USD 5.000» | Rango nuevo (Paso 8) y F7 (Paso 7) |
| `ventas/oferta-genesis.html` | **Bonus «−USD 3.000 de descuento»**; 4 meses; «Sesiones 1 a 1 ilimitadas»; «+$3 B generados para clientes» sin fuente; nombres «Genesis OS / Lite» que no figuran en `CONTEXTO.md` | Sacar el descuento; alinear duración y sesiones con `CONTEXTO.md`; fuente o se saca el «+$3 B» |
| `lanzamientos/2026-10-19-clase/clase/v2/05-pitch-qa-cierre.md` (stack de valor) | Valores por renglón «[VALOR A DEFINIR]», total 16.000 (2,7×), anclados a costo de proveedores | No reusar en la próxima clase: el valor se muestra con el retorno (Paso 7) |
| `CONTEXTO.md` → Oferta | Tabla dice «20 lugares ("por ahora")» y el texto, 10; cierre viernes 20/11 vs sábado 21/11 en `ads-post-webinar.md`; la «cuenta que justifica el precio» es de recupero, no de ROI | No se edita sin pedido de Santi. Proponerle: un solo cupo, una sola fecha, y sumar la cuenta del Paso 7 al lado de la de recupero |
| `CONTEXTO.md` → «Capacidad de inversión demostrada: USD 2.000–5.000» | Es el dato del ticket anterior | Actualizar con lo que se cobró el 17/11 (si Santi lo pide) |
| `bases/01-avatar.md` §5.5 | Dejaba abierta la contradicción 5.000/6.000 «antes de la base de precio» | Sigue abierta: esta base trabaja con 6.000 y marca el pendiente |
| Criterio de calificación (USD 100/día en Meta) | No mide N ni capital | Sumar F7 (clientes nuevos por mes) y el rango de plata nuevo |

---

## Checklist final del SOP

- [ ] Tengo oferta clara con promesa concreta — **parcial:** la promesa sí; la oferta tiene 5 versiones de precio y 2 de duración (Paso 0). Falta: Santi fija precio, plan de pagos, duración y cupo.
- [x] Respondí las 3 señales; anoté cuántas dan "sí": 0 de 3 sí, 1 sin dato (Fase A). Falta el dato de ejecución de clientes (Manu).
- [x] Listé las creencias sobre el precio (Paso 2) — **falta** que Manu las confirme o corrija con su cabeza.
- [x] Calculé el ROI anualizado de la transformación (hoy vs después) — en forma de fórmula y tabla de sensibilidad; **falta** el N real de los clientes.
- [x] Saqué el rango 10–20% (tabla del Paso 7) y armé lo no monetario (Paso 7b).
- [x] Comparé con lo que cobro hoy y anoté la diferencia (Paso 7).
- [ ] Verifiqué que mi avatar puede pagarlo — **parcial:** 5.000 sí; 6.000 sin venta documentada. Falta: ventas del 17/11 (Santi).
- [ ] Audité perfil, últimos contenidos y materiales como si fuera mi avatar; marqué los 3 puntos más flojos — **parcial:** auditoría desde el repo y 3 puntos marcados; falta hacerla con el perfil en vivo y pedir otras perspectivas (Manu, Santi, un cliente).
- [x] Revisé congruencia arriba-abajo en las dos direcciones; la brecha a cerrar primero está definida (Fase C). **Falta** cerrarla (primer caso con suscripción: Manu/José).
- [ ] Mi valor percibido apunta a 4–5× el precio — **no:** el único stack escrito da 2,7× y sin fuente. Se reemplaza por la cuenta con sus números (Fase B).
- [x] Mi comunicación corresponde al perfil del ticket nuevo — revisado (Paso 11); **falta** aplicar los ajustes en la próxima apertura (Santi).
- [x] Identifiqué mi escalón (Consistencia) y si puedo resolver uno más avanzado con capacidad real (Fase F: para la marca propia sí, para clientes todavía no).
- [x] Elegí camino: camino 2 ya hecho; camino 1 no corresponde hoy; próximo camino 2 condicionado a capacidad real.
- [x] Tengo el guion de presentación: valor → sin preguntas → total → silencio → PIF → plan de pagos al final; multi-nivel con el más caro primero (Paso 15). **Falta** pasarlo al manual (Santi).
- [ ] Configuré la medición de cobranza sobre facturación cada 5–10 ventas con el semáforo — **definida y con planilla** (Paso 16); falta cargarla en el campus (Santi).
- [x] Si subo: 4 razones evaluadas (1 de 4 hoy), solo para nuevos, sin anunciarlo, anotando qué cambió (Pasos 18–19).
- [x] Si estoy en rojo: orden de revisión adaptado a Génesis (Paso 17).
- [ ] Checkpoint (en vez de Discord: revisión con Santi y Manu) con cálculo de ROI, 3 señales, auditoría y precio con justificación — **falta** agendar.

---

## Métricas a medir

| Métrica del SOP | Cómo se mide en Génesis | Dónde | Lectura → qué hacer |
|---|---|---|---|
| **Cuánto cobrás sobre cuánto facturás** (semáforo, la principal) | Ventas ÷ llamadas con precio dicho, cada 5–10 ventas | Campus (planilla del Paso 16) | > 75%: subir para los nuevos · 50–75%: quieto · < 50%: Paso 17, no tocar precio |
| **Fricción ante el precio** | Qué dijo el lead después del número (objeción, silencio, «¿cómo pago?») | Fathom + nota del closer | Cero fricción en varias seguidas = barato. Objeciones nuevas que antes no estaban = la brecha se achicó (Error 3) |
| **Duración del proceso de decisión** | Minutos de llamada y días entre aplicación y pago. Hoy: 23 / 48 / 73 / 91 min | Fathom + campus | Largo = ticket alto, está bien. Si todos deciden en minutos sin dudar, revisar señal 1 |
| **Clientes vs facturación** | Clientes activos (Génesis + Lite) vs facturación del mes y horas de Manu y José | Campus [PENDIENTE: que se registre] | Muchos clientes para poca facturación = señal 2 |
| **Ejecución / compromiso de los clientes** | % de clientes que completan la auditoría y la variante en tiempo; días hasta el primer cobro recurrente (R1 de la base 01) | Onboarding / campus | No ejecutan = el precio filtra mal o el avatar no es; revisar calificación antes que precio |
| **Demanda vs capacidad** | Aplicaciones calificadas por apertura contra 10 lugares | Campus | Si sobran calificados apertura tras apertura = razón legítima 2 para subir |
| **Casos de éxito acumulados** (con nombre y número) | Cantidad de clientes con primer cobro recurrente documentado con captura | Carpeta de casos [PENDIENTE: crear] | El primero habilita mostrar suscripción en tercero; varios = razón legítima 4 |
| **Brecha de valor percibido** | ¿Recomiendan solos? Referidos por cliente; respuesta a «¿qué te hizo decir que sí?» (C4 del onboarding, base 01) | Onboarding + campus | Referidos espontáneos = brecha grande. Sin referidos = valor percibido apenas por encima del precio |
| **PIF vs plan de pagos** | % de ventas PIF y cobrado al cierre ÷ vendido. Hoy: 2 de 4 PIF, 71% cobrado al primer pago | Campus | Si baja el PIF: ¿se ofrecen las cuotas antes de tiempo? (Paso 15) |
| **N del lead** (propia de esta base) | Respuesta a F7 y dato confirmado en la llamada | Formulario + llamada | Con N chico, 6.000 queda arriba del 10–20%: revisar si es avatar de Génesis o de Lite |

---

## Pendientes para el equipo

**Santi**
1. Fijar el precio vigente (5.000 o 6.000), el plan de pagos único (con o sin recargo), la duración (3 o 4 meses), el cupo (10 o 20) y la fecha de cierre (20 o 21/11). Decidir si se escribe en `CONTEXTO.md`.
2. Explicar o sacar el «−USD 3.000 de descuento» de `ventas/oferta-genesis.html`; fuente del «+$3 B generados para clientes» o sacarlo.
3. Exportar del campus los números del 17/11: aplicaciones, llamadas con precio, ventas, PIF/cuotas, subavatar → primer bloque del semáforo.
4. Confirmar si se cobraron los segundos pagos de Alan y Núñez.
5. Cambiar el formulario de aplicación: F7 (clientes nuevos por mes) y rango de plata nuevo (hasta «más de 6.000»). Decidir la prueba de mostrar «arranca en USD 6.000» antes de la pregunta de plata.
6. Pasar el guion del Paso 15 al manual, al script B2B y al banco (y DFY → DWY).
7. Agendar el checkpoint con Manu.

**Manu**
1. Contestar las creencias del Paso 2 con su cabeza (por qué no se dice el precio en la clase, qué número le da miedo decir, el descuento).
2. Decir, por cliente actual, quién ejecuta y quién no, y quién ya hizo su primer cobro recurrente y en cuántos días.
3. Elegir el primer cliente S1 (reposición ≤ 30 días) para documentar como caso de tercero con suscripción.
4. Confirmar que todo lo que se suma a la oferta existe y se entrega (grupales, campus, agentes, Puentify, Red Génesis, sesiones 1 a 1).
5. Escribir qué hace concretamente para el 7,2% de cancelaciones (capacidad real para un nivel siguiente).
6. Hacer la auditoría de valor percibido con el teléfono, mirando como Gonza, y decidir si graba él las secuencias de historias clave.

**José / equipo de entrega**
1. ¿El onboarding tiene la clase de «la responsabilidad es 100% tuya»? Si no, sumarla.
2. Registrar por cliente: fecha de entrada, ciclo de reposición, fecha del primer cobro recurrente, suscriptores y churn (R1 de la base 01).

**Closer**
1. Usar el guion del Paso 15: total, silencio, PIF, cuotas al final; sin descuentos ni justificación pegada al número.
2. Preguntar siempre N («¿cuántos clientes nuevos metés por mes?») antes del precio y hacer la cuenta con ese número.
3. Anotar en cada llamada: precio dicho (sí/no), reacción, resultado, PIF o cuotas, subavatar y N.
