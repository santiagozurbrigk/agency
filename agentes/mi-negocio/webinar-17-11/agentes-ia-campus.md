# Agentes de IA del campus Génesis: inventario para el webinar del 17/11

Lista de los 130 agentes posibles para el campus, para elegir cuáles se comunican como bonus en los scripts. Manu está armando el campus en paralelo: este archivo **no** dice qué existe. Dice qué podría existir.

El campus acompaña todo el camino del ecommerce, no solo la suscripción. El enfoque está en la suscripción, pero el que recién arranca no la mete de entrada. El orden general es:

**buscar producto → validarlo → lanzarlo → escalar la compra única → pasar a suscripción → ordenar la operación.**

Resumen: 130 agentes · 2 confirmados · 7 con base en el repo · 121 candidatos.

**Estados**
- `CONFIRMADO`: el equipo ya sabe que va a estar.
- `BASE`: hay algo armado (en el repo o como bonus de un webinar anterior) que sirve de punto de partida.
- `CANDIDATO`: tiene sentido para el campus, pero falta que Manu confirme que lo arma.

**Regla para los scripts:** un agente entra a un guion cuando está `CONFIRMADO` y tiene nombre, promesa y qué entra y qué sale. La captura puede llegar después (`[IMAGEN PENDIENTE]`). Si Manu le cambia el nombre, se corrige acá y los scripts se actualizan desde acá.

## Dos cosas a decidir antes de escribir los scripts

1. **A quién le habla el webinar.** Según `CONTEXTO.md`, Génesis "no es para el que arranca de cero" ni "para el que busca producto ganador", y el avatar (Gonza, 30 a 80M/mes) ya pagó dos mentorías de producto ganador y le escapa a eso. Si el webinar del 17/11 sigue apuntando a Gonza, el pitch arranca por la fase 3 y las fases 1 y 2 se presentan como "para tu próximo producto" o "para tu equipo". Nunca como "encontrar tu producto ganador".
2. **Si el campus cambia la oferta.** La consultoría 1:1 deja afuera a propósito proveedores, ANMAT y equipo. Que el campus los cubra está bien, pero hay que decir claro qué es del campus y qué es del 1:1. Si Génesis se abre a gente que arranca de cero, cambia el avatar y hay que actualizar `CONTEXTO.md`.

---

# Fase 1 · Arrancar

_De cero a las primeras ventas_

## Nicho y modelo

| # | Agente | Cargás → te devuelve | Para qué | Estado |
|---|---|---|---|---|
| 1 | **Elegidor de nicho** | Tus intereses, capital y experiencia → 3 nichos de consumibles con recompra, con pros y contras de cada uno | Arrancar en un mercado donde el cliente vuelve | CANDIDATO |
| 2 | **Calculadora de capital inicial** | Producto, ticket y presupuesto de test → cuánta plata necesitás para arrancar y cuántos días aguantás testeando | No quedarte sin caja a mitad del test | CANDIDATO |
| 3 | **Analista de modelo de negocio** | Tu idea y tu capital → si te conviene dropshipping, reventa o marca propia, y en qué orden | Elegir el modelo según tu plata y tu margen | CANDIDATO |
| 4 | **Mapa de mercado** | Una categoría → tamaño, estacionalidad, jugadores principales y rangos de precio | Saber dónde te metés | CANDIDATO |
| 5 | **Analista de tendencias** | Una categoría → qué está subiendo en búsquedas, TikTok y anuncios | Entrar antes de que se sature | CANDIDATO |
| 6 | **Investigación de avatar** | Encuestas, DMs o entrevistas → avatar, nivel de consciencia y mapa de dolores | La base de todo el copy | BASE (agentes/M3-bases/analisis-investigacion.md) |
| 7 | **Plan de los primeros 90 días** | Dónde estás hoy → los hitos semana a semana hasta las primeras ventas | Saber qué hacer cada semana | CANDIDATO |

## Buscar producto

| # | Agente | Cargás → te devuelve | Para qué | Estado |
|---|---|---|---|---|
| 8 | **Buscador de productos con recompra** | Un nicho → productos consumibles ordenados por ciclo de reposición y margen | Elegir un producto que se pueda pasar a suscripción después | CANDIDATO |
| 9 | **Lector de la Biblioteca de Anuncios** | Competidores o categoría → qué productos, ángulos y formatos llevan más tiempo activos | Ver qué ya le funciona a otros | CANDIDATO |
| 10 | **Rastreador de productos en TikTok** | Una categoría → productos con tracción orgánica y cómo los están vendiendo | Encontrar demanda que todavía no está en Meta | CANDIDATO |
| 11 | **Analista de marketplaces** | Una categoría de Mercado Libre o Amazon → los más vendidos, precios, reseñas y huecos | Medir demanda real con ventas reales | CANDIDATO |
| 12 | **Minero de reseñas** | Reseñas propias y de la competencia → dolores, deseos, objeciones y frases textuales del cliente | Copy con las palabras del cliente | CANDIDATO |
| 13 | **Detector de huecos** | Competidores de la categoría → lo que el cliente pide y nadie resuelve | Diferenciarte desde el producto | CANDIDATO |
| 14 | **Buscador de producto complementario** | Tu catálogo y tu cliente → productos para sumar a la línea que el mismo cliente vuelve a comprar | Subir el ticket sin salir a buscar clientes nuevos | CANDIDATO |
| 15 | **Comparador de candidatos** | 3 a 5 productos posibles → tabla con margen, demanda, competencia, recompra y riesgo, y un ranking | Decidir con números y no por intuición | CANDIDATO |

## Validar producto

| # | Agente | Cargás → te devuelve | Para qué | Estado |
|---|---|---|---|---|
| 16 | **Validador de demanda** | Una idea de producto → búsquedas, competencia, anuncios activos y un veredicto: avanzar, ajustar o descartar | No invertir en un producto sin demanda | CANDIDATO |
| 17 | **Analista de competencia** | Marcas competidoras → precios, ofertas, landings, si venden suscripción y dónde diferenciarte | Saber contra quién peleás | CANDIDATO |
| 18 | **Calculadora de viabilidad** | Costo, precio y CPA esperado → si la cuenta cierra antes de comprar stock | No comprar stock de un producto que no deja plata | CANDIDATO |
| 19 | **Plan de test de producto** | Producto y presupuesto → días, presupuesto y métricas de corte (CTR, CPA máximo) para decidir | Testear con reglas claras | CANDIDATO |
| 20 | **Lector de resultados del test** | Métricas del test → seguir, ajustar o matar, y qué cambiar si ajustás | No matar un producto por el creativo | CANDIDATO |
| 21 | **Test de preventa** | Producto nuevo → landing de prueba, oferta de preventa y criterio de corte | Validar sin inmovilizar plata | CANDIDATO |
| 22 | **Encuesta de validación** | Avatar y producto → las preguntas y dónde mandarlas para validar antes de lanzar | Escuchar al cliente antes de fabricar | CANDIDATO |
| 23 | **Checklist regulatorio** | Un producto → qué habilitaciones suele pedir la categoría y qué preguntarle al profesional | No lanzar algo que después te bajan | CANDIDATO (Orientativo: no reemplaza al profesional. La consultoría 1:1 no cubre ANMAT.) |

## Proveedor, costeo y precio

| # | Agente | Cargás → te devuelve | Para qué | Estado |
|---|---|---|---|---|
| 24 | **Buscador de proveedores** | Un producto → tipos de proveedor, dónde buscarlos y qué preguntarles | Encontrar con quién fabricar o comprar | CANDIDATO (La consultoría 1:1 no cubre proveedores; el campus sí puede.) |
| 25 | **Pedido de cotización** | Producto y volumen → el mensaje para proveedores y un comparador de las respuestas | Comparar cotizaciones parejas | CANDIDATO |
| 26 | **Negociador con proveedores** | Una cotización → contrapropuesta de precio, mínimos y plazos de pago | Mejorar el margen desde la compra | CANDIDATO |
| 27 | **Control de muestras** | Las muestras recibidas → qué evaluar y una ficha de control de calidad | No descubrir el problema con el cliente | CANDIDATO |
| 28 | **Calculadora de costeo y precio** | Costo, envío, comisiones, pauta e impuestos → precio mínimo, precio recomendado y margen de contribución real | Saber cuánto te deja cada venta | CANDIDATO |
| 29 | **Estrategia de precios** | Competencia y margen → precio de lista, precio de lanzamiento y descuentos que no rompen el margen | Vender sin regalar el margen | CANDIDATO |
| 30 | **Primer pedido de stock** | Resultado del test y ventas esperadas → cuánto comprar al arrancar y cuándo reponer | Ni quiebre de stock ni plata parada | CANDIDATO |

## Marca y tienda

| # | Agente | Cargás → te devuelve | Para qué | Estado |
|---|---|---|---|---|
| 31 | **Naming y brief de packaging** | Producto y avatar → opciones de nombre, claims y brief para el diseñador | Lanzar con marca, no con un genérico | CANDIDATO |
| 32 | **Identidad de marca** | Avatar y posicionamiento → tono, mensajes clave, paleta y brief de logo | Que la marca se reconozca | CANDIDATO |
| 33 | **Armado de ofertas** | Producto, margen y avatar → la oferta completa: precio, bundle, garantía, bonus y cómo se presenta | Que la oferta venda sola | CONFIRMADO (También arma la oferta de suscripción (ver fase 3).) |
| 34 | **Armado de landings** | Oferta y avatar → la landing completa: estructura, copy y bloques, lista para montar | Convertir el tráfico que pagás | CONFIRMADO (También arma la landing de suscripción (ver fase 3).) |
| 35 | **Armador de tienda en Tiendanube** | Producto y marca → estructura de la tienda, páginas, menú, apps y checklist de configuración | Tener la tienda lista sin perder semanas | CANDIDATO |
| 36 | **Fichas de producto** | Producto → título, descripción, beneficios, FAQs y bloques de confianza | Que la ficha responda antes de que pregunten | CANDIDATO |
| 37 | **Políticas de la tienda** | Cómo operás → borrador de cambios, devoluciones, envíos y privacidad | Dar confianza y evitar reclamos | CANDIDATO (Borrador: revisar con un profesional.) |
| 38 | **Página de marca y confianza** | Tu historia y tu producto → la página 'quiénes somos' y los bloques de confianza | Que no parezcas una tienda más | CANDIDATO |
| 39 | **Optimización de perfil de Instagram** | Tu perfil actual → bio, destacadas, link y posteos fijados | Que el perfil convierta las visitas | BASE (agentes/M4-webinar-organico/agente-optimizacion-perfil.md) |

## Lanzamiento y primeras ventas

| # | Agente | Cargás → te devuelve | Para qué | Estado |
|---|---|---|---|---|
| 40 | **Estrategia de lanzamiento** | Producto y presupuesto → el plan: preventa, orgánico, pauta e influencers, día por día | Lanzar con ventas desde el día uno | CANDIDATO |
| 41 | **Configurador de la primera campaña** | Producto y presupuesto → la campaña de test en Meta: estructura, públicos y presupuesto | Arrancar la pauta bien armada | CANDIDATO |
| 42 | **Píxel y eventos** | Tu tienda → checklist de píxel, API de conversiones y eventos | Que Meta optimice con datos reales | CANDIDATO |
| 43 | **Primeros 100 clientes** | Producto y avatar → cómo conseguir los primeros clientes sin depender de la pauta | Validar con ventas y no con likes | CANDIDATO |
| 44 | **Kit para microinfluencers** | Producto → lista de perfiles, mensaje y propuesta de canje | Contenido y ventas con poco presupuesto | CANDIDATO |
| 45 | **Lanzamiento por WhatsApp** | Base de interesados → la secuencia de mensajes para el día del lanzamiento | Vender a los que ya levantaron la mano | CANDIDATO |
| 46 | **Diagnóstico de la primera semana** | Métricas de la semana → qué está fallando: creativo, landing, oferta o precio | Saber qué tocar primero | CANDIDATO |

# Fase 2 · Escalar la compra única

_Más ventas, más ticket, más recompra_

## Creativos y contenido

| # | Agente | Cargás → te devuelve | Para qué | Estado |
|---|---|---|---|---|
| 47 | **Ángulos de anuncios** | Producto, avatar y dolores → ángulos para probar, ordenados por fuerza | No quedarte sin ideas de anuncios | CANDIDATO |
| 48 | **Generador de hooks** | Ángulo o dolor → 20 hooks para probar en ads y orgánico | Frenar el scroll | CANDIDATO |
| 49 | **Guiones de creativos** | Ángulo elegido → guiones de video (UGC, talking head, demo) con hook y variantes | Creativos listos para grabar | CANDIDATO |
| 50 | **Copy de anuncios** | Ángulo y creativo → textos primarios, titulares y descripciones | Copy que acompaña al video | CANDIDATO |
| 51 | **Brief para creadores UGC** | Producto y ángulo → el brief para el creador: tomas, frases y qué evitar | Producir sin grabarlos vos | CANDIDATO |
| 52 | **Iterador de ganadores** | Un anuncio ganador → 10 variaciones de hook, formato, actor y oferta | Estirar la vida del creativo que funciona | CANDIDATO |
| 53 | **Brief de fotos de producto** | Producto → la lista de tomas para el fotógrafo o para generar con IA | Fotos que venden | CANDIDATO |
| 54 | **Guiones de contenido orgánico** | Producto y avatar → guiones para TikTok y Reels de la marca | Tráfico que no depende de la pauta | BASE (agentes/M4-webinar-organico/agente-guiones-reels.md) |
| 55 | **Secuencias de historias** | Objetivo de la semana → secuencias de historias de Instagram | Vender desde las historias | BASE (agentes/M4-webinar-organico/agente-secuencias-historias.md) |
| 56 | **Calendario de contenido** | Marca y objetivos → el calendario del mes con temas y formatos | Publicar sin improvisar | CANDIDATO |

## Pauta y escalado

| # | Agente | Cargás → te devuelve | Para qué | Estado |
|---|---|---|---|---|
| 57 | **Calculadora de CPA objetivo** | Margen por pedido → CPA de breakeven y CPA objetivo en compra única | Saber cuánto podés pagar hoy | CANDIDATO |
| 58 | **Analista de creativos** | Métricas de tus anuncios → qué escalar, qué cortar y qué probar después | Decidir con datos | CANDIDATO |
| 59 | **Analista de la cuenta publicitaria** | Exportación del Ads Manager → diagnóstico de la cuenta: fatiga, saturación y estructura | Encontrar dónde se va la plata | CANDIDATO |
| 60 | **Escalado de campañas** | Métricas de las campañas → cuándo y cuánto subir presupuesto, duplicar o abrir públicos | Escalar sin romper lo que funciona | CANDIDATO |
| 61 | **Estructura por etapa** | Presupuesto total → reparto entre prospección, retargeting y clientes | Que cada peso tenga una función | CANDIDATO |
| 62 | **Plan anti-baneo** | Tu cuenta → buenas prácticas, cuentas de respaldo y qué hacer si cae | Que un ban no te frene el negocio | CANDIDATO |
| 63 | **Diversificación de canales** | Tu situación → dónde abrir después de Meta: TikTok, Google o influencers, y en qué orden | Depender menos de una sola plataforma | CANDIDATO |
| 64 | **Programa de influencers y afiliados** | Producto y margen → a quién contactar, el mensaje, la comisión y el código | Adquirir más allá de Meta | CANDIDATO |
| 65 | **Reporte semanal de pauta** | Datos de la semana → el resumen de inversión, CPA, ROAS y qué cambiar | Mirar la pauta en 5 minutos | CANDIDATO |

## Conversión y ticket

| # | Agente | Cargás → te devuelve | Para qué | Estado |
|---|---|---|---|---|
| 66 | **Auditor de tienda** | URL de tu tienda → lo que frena la conversión, ordenado por impacto | Convertir más con la misma pauta | CANDIDATO |
| 67 | **Tests A/B** | Una página → hipótesis y variantes para testear, con prioridad | Mejorar con pruebas y no con opiniones | CANDIDATO |
| 68 | **Armado de bundles y kits** | Catálogo y márgenes → combos que suben el ticket sin romper el margen | Subir el ticket promedio | CANDIDATO |
| 69 | **Upsell y cross-sell** | Catálogo → ofertas para el carrito y para después de la compra, con su copy | Más margen por pedido | CANDIDATO |
| 70 | **Carrito abandonado** | Tienda y oferta → la secuencia de email y WhatsApp para recuperar carritos | Recuperar ventas ya pagadas en pauta | CANDIDATO |
| 71 | **FAQs y objeciones** | Preguntas de tus clientes → bloques de FAQs y respuestas a objeciones para la tienda | Que no se vayan con la duda | CANDIDATO |
| 72 | **Checkout y confianza** | Tu checkout → textos de medios de pago, cuotas, garantía y envío | Menos abandonos en el último paso | CANDIDATO |
| 73 | **Pedido de reseñas y UGC** | Producto y ciclo → mensajes para pedir reseñas, fotos y videos en el momento justo | Prueba social para la tienda y los ads | CANDIDATO |
| 74 | **Estrategia de envíos** | Tarifas, zonas y ticket → envío gratis o no, desde qué monto, y cómo cambia con la suscripción | Que el envío no se coma el margen | CANDIDATO |

## Retención y recompra

| # | Agente | Cargás → te devuelve | Para qué | Estado |
|---|---|---|---|---|
| 75 | **Flujos post-compra** | Producto → la secuencia después de la compra: uso, resultados y próxima compra | Que la primera compra no sea la última | CANDIDATO |
| 76 | **Recordatorio de recompra** | Ciclo de reposición → el mensaje justo cuando se le está por terminar el producto | Recompra sin pagar pauta | CANDIDATO |
| 77 | **Campañas a la base** | Calendario y catálogo → las campañas de email del mes | Vender a los que ya te conocen | CANDIDATO |
| 78 | **Difusiones de WhatsApp** | Objetivo y segmento → los mensajes de difusión y cuándo mandarlos | WhatsApp como canal de venta | CANDIDATO |
| 79 | **Reactivación de inactivos** | Clientes que no volvieron → la secuencia para recuperarlos | Ventas de una base que ya pagaste | CANDIDATO |
| 80 | **Programa de referidos** | Producto y margen → la mecánica, el incentivo y los mensajes | Clientes nuevos al costo de un regalo | CANDIDATO |
| 81 | **Programa de fidelidad** | Catálogo y margen → puntos, niveles y beneficios que no rompen el margen | Que vuelvan a comprarte a vos | CANDIDATO |

# Fase 3 · Pasar a suscripción

_El Método B.A.S.E._

## La cuenta: diagnóstico

| # | Agente | Cargás → te devuelve | Para qué | Estado |
|---|---|---|---|---|
| 82 | **Auditor de números** | Ventas, costos, pauta y envíos del trimestre → margen real por pedido, CPA real y en qué punto estás en breakeven | Saber dónde estás parado | CANDIDATO (Es el entregable 1, pago: no va como regalo por asistir.) |
| 83 | **Calculadora de techo** | Margen por pedido y recompra → techo de pauta con compra única vs. con suscripción, y el punto operativo | Ver cuánto más podés pagar por cliente | CANDIDATO (Es el entregable 1, pago: no va como regalo por asistir.) |
| 84 | **Simulador de suscripción** | Los números de tu marca → cohortes, margen mes a mes, tres escenarios y el CAC que podés pagar | Ver tu marca con suscripción antes de hacerla | BASE (Bonus 2 del webinar del 19/10.) |
| 85 | **Roadmap de migración** | Tu base, audiencia y anuncios ganadores → el paso a paso para migrar a suscripción con lo que ya tenés | Saber por dónde empezar | BASE (Bonus 1 del webinar del 19/10.) |
| 86 | **Detector de ciclo de reposición** | Exportación de pedidos → cada cuántos días vuelve a comprar el cliente, por producto | Definir la frecuencia de la suscripción | CANDIDATO |
| 87 | **Selector de producto para suscripción** | Catálogo con márgenes y recompra → qué SKU pasar primero a suscripción y por qué | Arrancar por el producto correcto | CANDIDATO |
| 88 | **Análisis de cohortes** | Pedidos históricos → recompra y LTV real por mes de entrada, producto y canal | La cuenta del LTV con datos propios | CANDIDATO |

## S · Suscripción al lado de la compra única

| # | Agente | Cargás → te devuelve | Para qué | Estado |
|---|---|---|---|---|
| 89 | **Oferta de suscripción** | Producto, margen y ciclo → precio, descuento, frecuencia y beneficios al lado de la compra única | Una suscripción que conviene a los dos lados | CANDIDATO (Puede ser un modo del agente Armado de ofertas.) |
| 90 | **Landing de suscripción** | Oferta de suscripción → la landing o el bloque de suscripción, listo para Tiendanube | Explicar la suscripción y que se suscriban | CANDIDATO (Puede ser un modo del agente Armado de landings.) |
| 91 | **Diseñador de variante** | Producto actual → variantes de formato, dosis, tamaño o ciclo para la suscripción | Migrar sin tocar lo que ya vende | CANDIDATO |
| 92 | **Copy de ficha y checkout de suscripción** | Producto y oferta → el selector de suscripción y los textos del checkout | Que elijan la suscripción en la ficha | CANDIDATO |
| 93 | **Comparador de herramientas de cobro** | Tu tienda → qué herramienta de cobro recurrente usar y por qué | Elegir la herramienta una sola vez | CANDIDATO |
| 94 | **Asistente de instalación en Tiendanube** | Tus dudas o el error que aparece → el paso a paso para dejar el cobro recurrente andando | Instalar sin romper lo que funciona | CANDIDATO |
| 95 | **Condiciones de suscripción** | Oferta → textos de baja, pausa, cambio de frecuencia y cobro | Reglas claras desde el día uno | CANDIDATO (Borrador: revisar con un profesional.) |
| 96 | **Objeciones a la suscripción** | Dudas de tus clientes → copy y FAQs para 'en Argentina no están acostumbrados' y similares | Que la objeción no frene el alta | CANDIDATO |

## B · Base que cobra sola

| # | Agente | Cargás → te devuelve | Para qué | Estado |
|---|---|---|---|---|
| 97 | **Segmentador de la base** | Base de clientes → a quién ofrecerle la suscripción primero y en qué orden | Arrancar por los que más compran | CANDIDATO |
| 98 | **Flujos de migración por email y WhatsApp** | Oferta y segmentos → la secuencia para pasar a los que ya compraron a suscriptores | Cientos de suscriptores desde la base actual | BASE (mi-negocio/agentes/creador-flujos-wsp.md y el Bonus 3 del 19/10.) |
| 99 | **Bienvenida y onboarding** | Oferta → mensajes de los primeros 30 días | Que no se den de baja en el primer cobro | CANDIDATO |
| 100 | **Cobros fallidos** | Herramienta de cobro → la secuencia para recuperar tarjetas rechazadas y cobros vencidos | Churn que no es baja de verdad | CANDIDATO |
| 101 | **Retención y recuperación de bajas** | Motivos de baja → ofertas de pausa o cambio de frecuencia y la secuencia de recuperación | Bajar el churn | CANDIDATO |
| 102 | **Análisis de motivos de baja** | Respuestas de la encuesta de baja → por qué se van y qué cambiar en el producto o la oferta | Arreglar la causa y no el síntoma | CANDIDATO |
| 103 | **Beneficios del suscriptor** | Producto y margen → beneficios exclusivos que no son descuento | Que quedarse valga más que irse | CANDIDATO |
| 104 | **Atención al suscriptor** | Preguntas frecuentes → respuestas listas para soporte o para cargar en un bot | Atender sin que se te vaya el día | CANDIDATO |

## A + E · Adquirís al costo y escalás

| # | Agente | Cargás → te devuelve | Para qué | Estado |
|---|---|---|---|---|
| 105 | **Ángulos para vender la suscripción** | Producto, avatar y dolores → ángulos que venden la recurrencia y no la compra | Buscar al cliente y no la venta | CANDIDATO |
| 106 | **Creativos de suscripción** | Ángulo elegido → guiones que explican la suscripción en 30 segundos | Que el anuncio ya venda la recurrencia | CANDIDATO |
| 107 | **Estructura de campañas al CPA nuevo** | Techo nuevo y presupuesto → campañas, conjuntos y presupuestos recalculados con tu LTV | Competir por el modelo | CANDIDATO |
| 108 | **Presupuesto al CAC nuevo** | Techo y caja disponible → cuánto podés invertir por mes y a cuántos suscriptores llegás | Escalar sin quedarte sin caja | CANDIDATO |
| 109 | **Retargeting a compradores únicos** | Lista de compradores → anuncios para pasarlos a suscriptores | Convertir la base también con pauta | CANDIDATO |
| 110 | **LTV por canal y campaña** | Pedidos y fuente de cada cliente → qué canal y qué campaña traen los clientes que más vuelven | Poner la plata donde vuelve | CANDIDATO |

# Fase 4 · Operar y ordenar

_Logística, números y equipo_

## Operación, logística y atención

| # | Agente | Cargás → te devuelve | Para qué | Estado |
|---|---|---|---|---|
| 111 | **Proyección de stock y reposición** | Ventas, suscriptores y tiempos del proveedor → cuánto comprar y cuándo | Sin quiebres de stock | CANDIDATO |
| 112 | **Logística y fulfillment** | Volumen y zonas → opciones de logística y fulfillment comparadas | Despachar más sin más caos | CANDIDATO |
| 113 | **Seguimiento de envíos** | Estados del envío → los mensajes automáticos de cada estado | Menos consultas de '¿dónde está mi pedido?' | CANDIDATO |
| 114 | **Atención al cliente** | Preguntas frecuentes → respuestas y macros para el equipo o un bot | Responder rápido y siempre igual | CANDIDATO |
| 115 | **Reclamos y devoluciones** | Casos típicos → el protocolo y los mensajes para cada caso | Resolver sin perder al cliente | CANDIDATO |
| 116 | **Vendedor por WhatsApp** | Consultas típicas de tus clientes → el flujo de respuestas que contesta, recomienda y cierra la venta | Vender en el chat sin estar pegado al celular | CANDIDATO |
| 117 | **Generador de SOPs** | Cómo hacés hoy una tarea → el SOP escrito para que la haga otro | Sacarte tareas de encima | CANDIDATO |

## Números y finanzas

| # | Agente | Cargás → te devuelve | Para qué | Estado |
|---|---|---|---|---|
| 118 | **Punto de equilibrio** | Costos fijos y margen → cuánto tenés que vender por mes para no perder | Saber tu piso | CANDIDATO |
| 119 | **Rentabilidad por SKU** | Ventas y costos por producto → cuáles dejan plata, cuáles la pierden y cuáles cortar | Vender lo que deja plata | CANDIDATO |
| 120 | **Proyección de caja** | Cobros, ventas y costos → caja mes a mes y el piso de facturación | Que el 1 del mes no arranque en cero | CANDIDATO |
| 121 | **Tablero semanal** | Datos de la semana → qué cambió, qué mirar y qué hacer | Decidir cada lunes con números | CANDIDATO |
| 122 | **Cierre del mes** | Números del mes → el reporte para tu socio o tu contador | Saber con cuánto cerraste | CANDIDATO |
| 123 | **Presupuesto anual** | Objetivos → plan de facturación, pauta, stock y caja mes a mes | Crecer con un plan | CANDIDATO |
| 124 | **Monotributo o RI** | Facturación y margen → comparación orientativa de cuánto pagás en cada régimen | Llegar al contador con la cuenta hecha | CANDIDATO (Orientativo: revisar con el contador.) |
| 125 | **Cuenta de formalización** | Margen por cliente y base de suscriptores → en qué punto te cierra pasar a RI, con IVA y ganancias adentro | Blanquear sin que deje de cerrar | CANDIDATO |

## Equipo y procesos

| # | Agente | Cargás → te devuelve | Para qué | Estado |
|---|---|---|---|---|
| 126 | **Qué delegar primero** | Tus tareas de la semana → qué delegar, a quién y en qué orden | Dejar de hacer todo vos | CANDIDATO (La consultoría 1:1 no cubre equipo; el campus sí puede.) |
| 127 | **Búsqueda de colaboradores** | El rol → descripción, aviso y preguntas de entrevista | Contratar bien la primera vez | CANDIDATO |
| 128 | **Onboarding del equipo** | El rol y tus SOPs → el plan de la primera semana | Que rinda rápido | CANDIDATO |
| 129 | **KPIs por rol** | Tu equipo → qué mide cada uno y la reunión semanal | Que cada uno sepa qué número mueve | CANDIDATO |
| 130 | **Brief para agencias y freelancers** | Lo que necesitás → el brief y cómo evaluar las propuestas | Tercerizar sin perder plata | CANDIDATO |

---

## Cómo se comunican en los scripts

Nombrar 130 agentes en un guion no le dice nada a nadie. Se comunican por fase, siguiendo el camino del negocio, y se muestran 1 o 2 en vivo. Si se usa el número ("130 agentes"), va una sola vez y se baja enseguida a las fases.

Frase de entrada (borrador, en la voz de Manu): *"Buscás el producto, lo validás, lo escalás y lo pasás a suscripción. Para cada paso hay un agente que te lo arma con tus números."*

| Fase | Frase base | Agentes |
|---|---|---|
| **Si estás arrancando** | "Te ayuda a elegir el producto, validarlo antes de comprar stock, armar la oferta y la landing, y lanzar." | 1 a 46 |
| **Si ya vendés** | "Creativos, pauta, tienda y recompra. Más ventas y más margen por cada cliente que ya pagaste en pauta." | 47 a 81 |
| **Si querés dejar de arrancar el mes en cero** | "La cuenta, la suscripción armada al lado de la compra única, la base que cobra sola y los anuncios al CPA nuevo." | 82 a 110 |
| **Para ordenar el negocio** | "Stock, logística, caja, tablero semanal, formalización y equipo." | 111 a 130 |

Reglas de voz (salen de `CONTEXTO.md`): nada de "secreto", "hack", "revolucionario" ni "te garantizo". Cada agente se presenta con lo que entra y lo que sale. Si no está terminado, no se muestra la pantalla: se describe y la captura queda pendiente.

## Para la reunión con Manu

1. Pasar fase por fase y marcar cada agente: `CONFIRMADO`, `CANDIDATO` (para más adelante) o sacarlo.
2. De los confirmados, cerrar nombre definitivo y fecha de la primera captura, antes de grabar los ads y el VSL del 17/11.
3. Elegir 1 o 2 para la demo en vivo. Los más fuertes en pantalla son los que hacen una cuenta (calculadora de techo, simulador, proyección de caja) o los que arman algo visible (ofertas, landings).
4. Definir si los agentes van como regalo por asistir (se nombran en ads y registro) o como bonus por entrar (solo en el pitch). El auditor de números y la calculadora de techo no pueden ser regalo: el diagnóstico es el entregable 1, pago.
5. Decidir a quién le habla el webinar y si el campus cambia la oferta (ver arriba).
6. Confirmar el encuadre: Génesis es 1:1 y Done For You. Los agentes son lo que el alumno usa entre sesiones, no un reemplazo de Manu.
