# Agentes de IA del campus Génesis: inventario para el webinar del 17/11

Lista de los 50 agentes posibles para el campus, para elegir cuáles se comunican como bonus en los scripts. Manu está armando el campus en paralelo: este archivo **no** dice qué existe. Dice qué podría existir y de dónde sale.

- **1 a 25:** salen de la oferta de Génesis (los 12 entregables del Método B.A.S.E.).
- **26 a 50:** ecommerce en general (producto, validación, tienda, contenido y números). Suman al campus, pero no son el núcleo de la oferta.

**Estados**
- `CONFIRMADO`: el equipo ya sabe que va a estar.
- `BASE`: hay algo armado en el repo que sirve de punto de partida.
- `CANDIDATO`: sale de un entregable de Génesis, pero falta que Manu confirme que lo arma.
- `DESCARTADO`: se deja asentado por qué no va.

**Regla para los scripts:** un agente entra a un guion cuando está `CONFIRMADO` y tiene nombre, promesa y qué entra y qué sale. La captura puede llegar después (`[IMAGEN PENDIENTE]`). Si Manu le cambia el nombre, se corrige acá y los scripts se actualizan desde acá.

---

## 1. Diagnóstico · La Cuenta del CPA

| # | Agente (nombre provisional) | Cargás → te devuelve | Ataca | Entregable | Estado |
|---|---|---|---|---|---|
| 1 | **Auditor de números** | Ventas, costos, pauta y envíos del último trimestre → margen real por pedido, CPA real y en qué punto estás en breakeven | Márgenes ("7 lucas de ganancia") | 1 | CANDIDATO |
| 2 | **Calculadora de techo** | Margen por pedido y recompra → techo de pauta con compra única vs. con suscripción, y el punto operativo (la cuenta 30.000 / 90.000 / 75.000) | Sube el CPA | 1 | CANDIDATO |
| 3 | **Detector de ciclo de reposición** | Exportación de pedidos de Tiendanube → cada cuántos días vuelve a comprar el cliente, por producto | "Arranco en cero el 1" | 2 | CANDIDATO |
| 4 | **Selector de producto para suscripción** | Catálogo con márgenes y recompra → qué SKU conviene pasar primero a suscripción y por qué | Migración sin frenar | 2 | CANDIDATO |

> Ojo con el 1 y el 2: el diagnóstico es el entregable 1 y es pago, no se regala en la call. Como agente del campus (para los que entran) no hay problema. Como **regalo por asistir**, no van.

## 2. S · Suscripción al lado de la compra única

| # | Agente | Cargás → te devuelve | Ataca | Entregable | Estado |
|---|---|---|---|---|---|
| 5 | **Armado de ofertas de suscripción** | Producto, margen y ciclo → la oferta completa: precio, descuento, frecuencia, beneficios y cómo se presenta al lado de la compra única | Márgenes / objeción "se suscriben por el descuento y se dan de baja" | 2 | **CONFIRMADO** |
| 6 | **Diseñador de variante** | Producto actual → variantes de formato, dosis, tamaño o ciclo para la suscripción, sin tocar lo que ya vende | Migración sin frenar | 2 | CANDIDATO |
| 7 | **Armado de landings** | Oferta + avatar → la landing de suscripción completa (estructura, copy, bloques), lista para montar en Tiendanube | Ventaja Invisible ("me copian la landing") | 3 | **CONFIRMADO** |
| 8 | **Copy de ficha de producto y checkout** | Producto + oferta → el bloque de suscripción en la ficha, el selector y los textos del checkout | Conversión de la tienda | 3 | CANDIDATO |
| 9 | **Asistente de instalación en Tiendanube** | Tus dudas o el error que te aparece → el paso a paso para dejar el cobro recurrente andando | "Me rompen lo que funciona" | 3 + 12 | CANDIDATO |
| 10 | **Borrador de condiciones de suscripción** | Oferta → textos de baja, pausa, cambio de frecuencia y cobro (para revisar con tu contador o abogado) | Objeción "en Argentina no están acostumbrados" | 3 | CANDIDATO |

## 3. B · Base que cobra sola

| # | Agente | Cargás → te devuelve | Ataca | Entregable | Estado |
|---|---|---|---|---|---|
| 11 | **Segmentador de la base** | Base de clientes → a quién ofrecerle la suscripción primero (recompradores, última compra, ticket) y en qué orden | Metadependencia | 4 | CANDIDATO |
| 12 | **Flujos de migración por email y WhatsApp** | Oferta + segmentos → la secuencia completa para pasar a los que ya te compraron a suscriptores | Metadependencia | 4 | BASE: `mi-negocio/agentes/creador-flujos-wsp.md` y el Bonus 3 del 19/10 |
| 13 | **Bienvenida y onboarding del suscriptor** | Oferta → mensajes de los primeros 30 días para que el suscriptor no se dé de baja en el primer cobro | Objeción "se dan de baja" | 6 | CANDIDATO |
| 14 | **Cobros fallidos** | Plataforma de cobro → la secuencia para recuperar tarjetas rechazadas y cobros vencidos | Churn | 6 | CANDIDATO |
| 15 | **Retención y recuperación de bajas** | Motivos de baja → encuesta de baja, ofertas de pausa o cambio de frecuencia, y la secuencia de recuperación | Churn (el 1,28% de Manu) | 6 | CANDIDATO |
| 16 | **Atención al suscriptor** | Preguntas frecuentes de tus clientes → respuestas listas para el equipo de soporte o para cargar en un bot | Operación | 6 + 12 | CANDIDATO |

## 4. A + E · Adquirís al costo y escalás con el CAC nuevo

| # | Agente | Cargás → te devuelve | Ataca | Entregable | Estado |
|---|---|---|---|---|---|
| 17 | **Ángulos de anuncios para suscripción** | Producto, avatar y dolores → ángulos para vender la suscripción (no la compra) | Sube el CPA | 5 | CANDIDATO |
| 18 | **Guiones de creativos** | Ángulo elegido → guiones de video (UGC, talking head, demo), con hook y variantes | Sube el CPA | 5 | CANDIDATO |
| 19 | **Copy de anuncios** | Ángulo + creativo → textos primarios, titulares y descripciones | Sube el CPA | 5 | CANDIDATO |
| 20 | **Estructura de campañas al CPA nuevo** | Techo nuevo + presupuesto → campañas, conjuntos y presupuestos recalculados con tu LTV | Sube el CPA / "competir por el modelo" | 5 | CANDIDATO |

## 5. Operación y números · Piso de Facturación

| # | Agente | Cargás → te devuelve | Ataca | Entregable | Estado |
|---|---|---|---|---|---|
| 21 | **Proyección de stock y reposición** | Suscriptores activos + ciclo + tiempos del proveedor → cuánto comprar y cuándo | Migración sin frenar | 7 | CANDIDATO |
| 22 | **Proyección de caja** | Cobros recurrentes + compra única + costos → caja mes a mes y el piso de facturación | "Arranco en cero el 1" | 7 / 8 | CANDIDATO |
| 23 | **Analista del tablero semanal** | Datos de la semana (activos, altas, bajas, recompra) → qué cambió, qué mirar y qué hacer | Piso de Facturación | 8 | CANDIDATO |
| 24 | **Cuenta de formalización** | Margen por cliente y base de suscriptores → en qué punto te cierra pasar a RI, con IVA y ganancias adentro | Margen Formalizable (blanqueo) | 9 | CANDIDATO |
| 25 | **Generador de SOPs** | Cómo hacés hoy una tarea → el SOP escrito para que la haga el equipo | Operación | 12 | CANDIDATO |

---

# Ecommerce en general (26 a 50)

> **Ojo con cómo se nombra esta parte.** Génesis "no es para el que busca producto ganador", y a Gonza lo frena justamente que sea "otro curso de producto ganador" (ya pagó dos). En los scripts, los agentes de producto **nunca** se presentan como "encontrar tu producto ganador". Se presentan como **elegir y validar qué sumar a tu línea de suscripción**: productos con reposición, que el cliente que ya tenés vuelva a comprar.

## 6. Producto: búsqueda y validación

| # | Agente | Cargás → te devuelve | Para qué | Estado |
|---|---|---|---|---|
| 26 | **Buscador de producto complementario** | Tu catálogo y tu cliente → productos con reposición para sumar a la línea, ordenados por ciclo y margen | Subir el ticket de la suscripción | CANDIDATO |
| 27 | **Validador de demanda** | Idea de producto → volumen de búsqueda, competencia, anuncios activos y un veredicto: avanzar, ajustar o descartar | No invertir en un producto sin demanda | CANDIDATO |
| 28 | **Analista de competencia** | Marcas competidoras → sus precios, ofertas, landings, si venden suscripción y en qué podés diferenciarte | Ventaja Invisible | CANDIDATO |
| 29 | **Lector de la Biblioteca de Anuncios** | Competidores o categoría → qué ángulos y formatos llevan más tiempo activos (los que les funcionan) | Arrancar los ads sin testear de cero | CANDIDATO |
| 30 | **Calculadora de costeo y precio** | Costo, envío, comisiones, pauta e impuestos → precio mínimo, precio recomendado y margen de contribución real | Márgenes | CANDIDATO |
| 31 | **Minero de reseñas** | Reseñas de tus productos y de la competencia → dolores, deseos, objeciones y frases textuales del cliente | Copy y ángulos con palabras reales | CANDIDATO |
| 32 | **Test de preventa** | Producto nuevo → landing de prueba, oferta de preventa y criterio de corte antes de fabricar stock | Validar sin inmovilizar plata | CANDIDATO |
| 33 | **Investigación de avatar** | Encuestas, DMs o entrevistas a clientes → avatar, nivel de consciencia y mapa de dolores | Base de todo el copy | CANDIDATO (hay base: `agentes/M3-bases/analisis-investigacion.md`) |
| 34 | **Naming y brief de packaging** | Producto + avatar → opciones de nombre, claims y brief para el diseñador | Lanzar un producto nuevo | CANDIDATO |
| 35 | **Buscador de proveedores** | Producto → tipos de proveedor y preguntas para pedir cotización | — | DESCARTADO por ahora: proveedores y fabricación están fuera del alcance de Génesis a propósito |

## 7. Tienda y conversión

| # | Agente | Cargás → te devuelve | Para qué | Estado |
|---|---|---|---|---|
| 36 | **Auditor de tienda** | URL de tu tienda → lo que frena la conversión (home, ficha, carrito, checkout, velocidad, confianza), ordenado por impacto | Convertir más con la misma pauta | CANDIDATO |
| 37 | **Fichas de producto** | Producto → título, descripción, beneficios, FAQs y bloques de confianza para la compra única | Conversión | CANDIDATO |
| 38 | **Armado de bundles y kits** | Catálogo y márgenes → combos que suben el ticket sin romper el margen | Subir el ticket promedio | CANDIDATO |
| 39 | **Upsell y cross-sell** | Catálogo → ofertas para el carrito y para después de la compra, con su copy | Más margen por pedido | CANDIDATO |
| 40 | **Carrito abandonado** | Tienda + oferta → la secuencia de email y WhatsApp para recuperar carritos | Recuperar ventas ya pagadas en pauta | CANDIDATO |
| 41 | **Pedido de reseñas y UGC** | Producto y ciclo → mensajes para pedir reseñas, fotos y videos al momento justo | Prueba social para la tienda y los ads | CANDIDATO |
| 42 | **Estrategia de envíos** | Tarifas, zonas y ticket → envío gratis o no, desde qué monto y cómo cambia con la suscripción | Márgenes | CANDIDATO |

## 8. Contenido y adquisición

| # | Agente | Cargás → te devuelve | Para qué | Estado |
|---|---|---|---|---|
| 43 | **Generador de hooks** | Ángulo o dolor → 20 hooks para probar en ads y orgánico | Sube el CPA | CANDIDATO |
| 44 | **Brief para creadores UGC** | Producto + ángulo → el brief que se le manda al creador: tomas, frases, qué evitar | Producir creativos sin grabarlos vos | CANDIDATO |
| 45 | **Guiones de contenido orgánico** | Producto y avatar → guiones para TikTok y Reels de la marca | Metadependencia (tráfico que no depende de la pauta) | CANDIDATO (hay base: `agentes/M4-webinar-organico/agente-guiones-reels.md`) |
| 46 | **Analista de creativos** | Métricas de tus anuncios → qué escalar, qué cortar y qué ángulo probar después | Sube el CPA | CANDIDATO |
| 47 | **Programa de influencers y afiliados** | Producto y margen → a quién contactar, el mensaje, la comisión y el código | Adquirir sin depender solo de Meta | CANDIDATO |

## 9. Números del negocio

| # | Agente | Cargás → te devuelve | Para qué | Estado |
|---|---|---|---|---|
| 48 | **Rentabilidad por SKU** | Ventas y costos por producto → cuáles dejan plata, cuáles la pierden y cuáles cortar | Márgenes | CANDIDATO |
| 49 | **Análisis de cohortes** | Pedidos históricos → recompra y LTV real por mes de entrada, por producto y por canal | La cuenta del LTV con datos propios | CANDIDATO |
| 50 | **Cierre del mes** | Números del mes → el reporte para tu socio o tu contador: facturación, margen, pauta, suscriptores y caja | "No sé con cuánto voy a cerrar" | CANDIDATO |

---

## Cómo se comunican en los scripts

Nombrar 50 agentes en un guion no le dice nada a Gonza. Se comunican **por paquete y por dolor**, y se muestran 1 o 2 como demo.

| Paquete | Frase base para el guion (borrador, en la voz de Manu) | Agentes |
|---|---|---|
| **La cuenta** | "Cargás tus números y te dice cuánto podés pagar por cliente. Con compra única y con suscripción, las dos cuentas una al lado de la otra." | 1 a 4 |
| **La suscripción armada** | "Te arma la oferta y la landing de suscripción de tu producto. La ponés al lado de la compra única, sin tocar lo que ya vende." | 5 a 10 |
| **La base que cobra** | "Te arma los flujos para pasar a los que ya te compraron a suscriptores, y los que los mantienen adentro." | 11 a 16 |
| **Los anuncios al CPA nuevo** | "Ángulos, guiones y campañas recalculadas con tu LTV. Dejás de buscar la compra y buscás al cliente." | 17 a 20 |
| **Los números de todos los meses** | "Stock, caja y tablero semanal. El 1 del mes sabés con cuánto arrancás." | 21 a 25, 48 a 50 |
| **Qué sumar a tu línea** | "Antes de sumar un producto, lo validás: demanda, competencia, costeo y una preventa. Y elegís el que el cliente que ya tenés vuelve a comprar." | 26 a 34 |
| **La tienda que convierte** | "Te audita la tienda y te arma fichas, combos, upsells y la recuperación de carritos. Más margen por cada pedido que ya pagaste en pauta." | 36 a 42 |
| **Los creativos sin grabarlos vos** | "Hooks, briefs para creadores, guiones orgánicos y el análisis de qué anuncio escalar." | 43 a 47 (se suma al paquete de anuncios) |

Si hace falta un número para el pitch ("50 agentes"), conviene usarlo una sola vez y bajarlo enseguida a los paquetes. El número solo suena a acumulación; lo que vende es qué te resuelve cada paquete.

Reglas de voz para estas frases (salen de `CONTEXTO.md`):
- Nada de "secreto", "hack", "revolucionario" ni "te garantizo".
- Cada agente se presenta con lo que entra y lo que sale, no con adjetivos.
- Si un agente no está terminado, no se muestra la pantalla. Se describe y la captura queda pendiente.

---

## Para la reunión con Manu

1. Pasar fila por fila y marcar cada una: `CONFIRMADO`, `CANDIDATO` (para más adelante) o `DESCARTADO`.
2. De los confirmados, cerrar un **nombre definitivo** y una **fecha para la primera captura**. La fecha tiene que caer antes de grabar los ads y el VSL del 17/11.
3. Elegir **1 o 2 agentes para la demo en vivo**. Los más fuertes para mostrar en pantalla son los que hacen una cuenta (2, 22, 24) o los que arman algo visible (5, 7).
4. Definir si los agentes van como **regalo por asistir** (se nombran en ads y registro) o como **bonus por entrar a Génesis** (solo en el pitch). En los webinars del 19 y del 24/10 eran cosas separadas.
5. Decidir si los agentes de producto (26 a 34) entran al campus. Si entran, confirmar el encuadre "qué sumar a tu línea de suscripción" y no "producto ganador".
6. Confirmar que "campus con agentes" no contradice la oferta: Génesis es 1:1 y Done For You. Los agentes se presentan como lo que el alumno usa entre sesiones, no como un reemplazo de Manu.
