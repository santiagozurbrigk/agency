# Agentes de IA del campus Génesis: inventario para el webinar del 17/11

Lista de todos los agentes posibles para el campus, para elegir cuáles se comunican como bonus en los scripts. Manu está armando el campus en paralelo: este archivo **no** dice qué existe. Dice qué podría existir y de qué entregable sale.

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

## Cómo se comunican en los scripts

Nombrar 25 agentes en un guion no le dice nada a Gonza. Se comunican **por paquete y por dolor**, y se muestran 1 o 2 como demo.

| Paquete | Frase base para el guion (borrador, en la voz de Manu) | Agentes |
|---|---|---|
| **La cuenta** | "Cargás tus números y te dice cuánto podés pagar por cliente. Con compra única y con suscripción, las dos cuentas una al lado de la otra." | 1 a 4 |
| **La suscripción armada** | "Te arma la oferta y la landing de suscripción de tu producto. La ponés al lado de la compra única, sin tocar lo que ya vende." | 5 a 10 |
| **La base que cobra** | "Te arma los flujos para pasar a los que ya te compraron a suscriptores, y los que los mantienen adentro." | 11 a 16 |
| **Los anuncios al CPA nuevo** | "Ángulos, guiones y campañas recalculadas con tu LTV. Dejás de buscar la compra y buscás al cliente." | 17 a 20 |
| **Los números de todos los meses** | "Stock, caja y tablero semanal. El 1 del mes sabés con cuánto arrancás." | 21 a 25 |

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
5. Confirmar que "campus con agentes" no contradice la oferta: Génesis es 1:1 y Done For You. Los agentes se presentan como lo que el alumno usa entre sesiones, no como un reemplazo de Manu.
