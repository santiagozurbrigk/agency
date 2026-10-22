# Prompt para Claude Cowork · Workflow de mails de la clase del sábado 24/10 en GHL

> Copiá todo lo que está debajo de la línea y pegalo en Cowork, con GHL abierto en Chrome y la sesión iniciada en la subcuenta de Génesis.

---

Necesito que armes un workflow de mails en GoHighLevel (GHL), en la subcuenta de Génesis que tengo abierta en Chrome. Trabajá en mi navegador, en GHL.

## Reglas
- Usá los textos EXACTOS de abajo: no reescribas, no resumas, no agregues nada.
- Guardá todo como borrador. **No publiques el workflow ni lo actives**: cuando termines, avisame y lo publico yo.
- **No agregues contactos al workflow** ni toques ningún otro workflow, contacto o configuración.
- Si la pantalla de GHL no coincide con lo que te describo (otro nombre de menú, una opción que no existe), frená y preguntame antes de seguir.
- Zona horaria de todos los Wait: Argentina (GMT-3, America/Argentina/Buenos_Aires). Si el Wait no deja elegir zona, revisá en la configuración del workflow que la zona sea la de Argentina y avisame cuál es.
- Remitente de todos los mails: nombre «Manu Dominguez». Usá el email de envío que ya está configurado por defecto en la subcuenta; si no hay uno, frená y preguntame.

## El workflow
1. Andá a **Automation → Workflows → Create Workflow → Start from scratch**.
2. Nombre del workflow: **Clase sábado 24/10 · mails**.
3. **Trigger:** «Contact Tag» → condición: tag añadido (**Tag Added**) = **optin-19-10**. Nombre del trigger: «Registro a la clase».
4. Después del trigger, 11 pares de acciones en este orden: **Wait** (tipo «Wait until a specific date/time» / «Event/Date») → **Send Email**. Los datos de cada par están abajo.
5. En CADA Wait, en la opción «If this date has already passed», elegí **«Skip all outbound communication actions till next wait or event start date action»**. Esto es lo más importante: así el que se registra el viernes no recibe de golpe los mails del jueves.
6. Antes del paso 8 (el primer mail del domingo), agregá una acción **If/Else**: rama «Ya compró» si el campo personalizado **«Etapa del proceso»** es igual a **«Venta Génesis»** → acción **Remove from workflow / Exit**. La otra rama sigue con el paso 8.
7. Guardá (Save), sin publicar.

## Los 11 pasos

### Paso 1 · M-1

- **Wait until:** 2026-10-22 08:30 (hora de Argentina, GMT-3) · si la fecha ya pasó: «Skip all outbound communication actions till next wait or event start date action»
- **Email · nombre de la acción:** M-1 · Por qué cada venta te cuesta lo mismo que la anterior
- **Asunto:** Por qué cada venta te cuesta lo mismo que la anterior
- **Preheader:** No es tu creativo. Sábado 24, 18 hs.
- **Cuerpo** (texto plano, respetando los párrafos; los links como links):

```
Hola,

Te anotaste a la clase en vivo privada del sábado 24 a las 18 hs. Te voy a mostrar cómo podés escalar tu ecom a más de 100 millones de pesos por mes con el modelo de suscripción. Es la última vez que la doy en vivo.

Antes quiero dejarte una idea, porque es la base de todo lo que vamos a ver.

Yo facturaba 60 millones por mes con un consumible. Compra única. Cada venta me costaba lo mismo que la anterior. Tenía una fórmula buena y cara, 12.000 el pote, contra marcas que vendían a 4.500. Y creía lo mismo que cree todo el mundo: que en Argentina nadie se suscribe.

Lo que me cambió no fue el producto, ni el creativo, ni bajar el precio. Fue dejar de buscar la compra y empezar a buscar al cliente.

En compra única pagás la pauta en cada venta. En suscripción la pagás una sola vez por cliente: la segunda, la tercera y la cuarta compra entran con el margen entero.

Hoy tengo más de 3.500 suscriptores activos, con menos de 5% de churn.

En el grupo de WhatsApp te voy dejando el resto de la cuenta hasta el sábado. Y ojo con esto: el link para entrar a la clase lo paso solo por el grupo, 15 minutos antes. No llega por mail. Si no estás adentro, no podés entrar.

[Entrar al grupo →] https://chat.whatsapp.com/HBbSIYz620WJgSQp0ZuVDJ

A la tarde te mando por qué bajar el CPA es la pelea equivocada.

Manu
```

### Paso 2 · M-2

- **Wait until:** 2026-10-22 18:00 (hora de Argentina, GMT-3) · si la fecha ya pasó: «Skip all outbound communication actions till next wait or event start date action»
- **Email · nombre de la acción:** M-2 · Tu competencia paga 50. ¿Y vos?
- **Asunto:** Tu competencia paga 50. ¿Y vos?
- **Preheader:** La subasta no la gana el que paga menos.
- **Cuerpo** (texto plano, respetando los párrafos; los links como links):

```
Hola,

"Los CPAs nos empezaron a reventar."

Me lo dijo un dueño de ecommerce en una llamada. Y después: "salieron 7 personas a pautar un producto muy parecido al nuestro".

La cadena es siempre la misma. Largás un producto, lo escalás, te salen 5 competidores, te suben los CPM, por ende te suben los CPA. Saliste con 10 dólares de CPA y ahora tenés 20. Y ya dejás de ser rentable.

¿Qué hace todo el mundo? Pelear para bajarlo. Otro creativo, otro ángulo, otro producto.

El problema es que la subasta no premia al que paga menos. Premia al que puede pagar más.

Si tu competencia puede gastar 50 dólares para adquirir un cliente, y vos podés gastar 75, y listo: ya no tenés competencia.

¿Cómo podés pagar 75? Porque ese cliente te compra tres veces, no una. Eso es lo que te muestro el sábado 24 a las 18 hs, en vivo.

Mañana: qué pasa con tu margen cuando el mismo cliente te compra tres veces.

Manu

PD: el link de la clase llega solo por el grupo de WhatsApp, 15 minutos antes. Si todavía no entraste: https://chat.whatsapp.com/HBbSIYz620WJgSQp0ZuVDJ
```

### Paso 3 · M-3

- **Wait until:** 2026-10-23 08:30 (hora de Argentina, GMT-3) · si la fecha ya pasó: «Skip all outbound communication actions till next wait or event start date action»
- **Email · nombre de la acción:** M-3 · "7 lucas de ganancia. Sobreviviendo."
- **Asunto:** "7 lucas de ganancia. Sobreviviendo."
- **Preheader:** Y el miedo que yo tenía antes de hacerlo.
- **Cuerpo** (texto plano, respetando los párrafos; los links como links):

```
Hola,

"7 lucas de ganancia. Sobreviviendo."

Eso le deja la venta a mucha gente que factura bien. Y no es por vender poco: es porque pagás la pauta en cada venta.

En compra única tenés un CPA: lo pagás cada vez. En suscripción tenés un CAC: se paga una vez. La segunda, la tercera y la cuarta compra entran con el margen de contribución entero. En mi ecommerce, cada cliente compra tres veces como mínimo.

Pero yo tenía un miedo, y seguro vos también:

"En Argentina no están acostumbrados a la suscripción."
"Se suscriben para que la primera les salga más barata y se dan de baja."

Hoy tengo más de 3.500 suscriptores activos en Argentina. Menos de 5% de churn. No se van.

No es cultura. Es cómo se arma la suscripción. Eso lo vemos mañana, sábado 24, a las 18 hs.

A la tarde: el tercer problema, el que más asusta. Qué pasa si Meta te baja la cuenta.

Manu

PD: el link de la clase llega solo por el grupo de WhatsApp. Si todavía no entraste: https://chat.whatsapp.com/HBbSIYz620WJgSQp0ZuVDJ
```

### Paso 4 · M-4

- **Wait until:** 2026-10-23 18:00 (hora de Argentina, GMT-3) · si la fecha ya pasó: «Skip all outbound communication actions till next wait or event start date action»
- **Email · nombre de la acción:** M-4 · Si mañana Meta te baja la cuenta
- **Asunto:** Si mañana Meta te baja la cuenta
- **Preheader:** Los 3 problemas de tu ecommerce son uno solo.
- **Cuerpo** (texto plano, respetando los párrafos; los links como links):

```
Hola,

"Ayer íbamos 600 lucas abajo… apagamos. Manotazo ahogado."

Si vendés con Meta, sabés de qué hablo. Y sabés lo otro: el 1 del mes arrancás en cero.

Tengo una marca que, con la pauta apagada, sigue cobrando recurrencias con un 50% de margen. Pauta apagada. Y cobra igual.

Ahora mirá los tres juntos:

- Te sube el CPA.
- Te queda poco margen.
- Dependés de Meta.

Parecen tres problemas. Es uno: tu unidad de venta es la compra, no el cliente.

Cuando la unidad es el cliente, la base cobra sola todos los meses y Meta solo suma suscriptores nuevos. A eso le digo Método B.A.S.E.: crecer con los clientes que ya entraron, no saliendo a comprar más.

Mañana, sábado 24, a las 18 hs te muestro el paso a paso en vivo. Es la última vez que la doy en vivo. Y a los que se queden hasta el final les regalo:

- El roadmap para migrar tu ecommerce a suscripción con tu base de compradores.
- El Simulador de Suscripción, para cargar tus números.
- La IA que te escribe los flujos de email de tu suscripción para Klaviyo.

Para que te sirva el doble, traé 4 números: tu CPA, tu margen por pedido, tu ticket promedio y cada cuánto se termina tu producto.

Manu

PD: el link de la clase llega solo por el grupo de WhatsApp, 15 minutos antes. Si todavía no entraste: https://chat.whatsapp.com/HBbSIYz620WJgSQp0ZuVDJ
```

### Paso 5 · M-5

- **Wait until:** 2026-10-24 08:30 (hora de Argentina, GMT-3) · si la fecha ya pasó: «Skip all outbound communication actions till next wait or event start date action»
- **Email · nombre de la acción:** M-5 · Hoy a las 18 hs
- **Asunto:** Hoy a las 18 hs
- **Preheader:** Clase en vivo privada. La última vez en vivo.
- **Cuerpo** (texto plano, respetando los párrafos; los links como links):

```
Hola,

Hoy es el día. A las 18 hs doy la clase en vivo privada donde te muestro cómo podés escalar tu ecom a más de 100 millones de pesos por mes con el modelo de suscripción.

Esto es lo que vas a ver:

- Por qué cada venta te cuesta lo mismo que la anterior (y por qué no es tu creativo).
- El Método B.A.S.E., paso a paso.
- La cuenta con mis números reales: cuánto podés pagar por cliente con suscripción.
- Cómo se pone al lado de la compra única, sin tocar lo que hoy vende.

Es sábado, ya sé. Por eso: bloqueá de 18 a 19:30. Es la última vez que la doy en vivo.

A las 17:45 dejo el link para entrar en el grupo de WhatsApp. Es el único lugar donde lo paso. Si todavía no estás adentro, entrá ahora:

[Entrar al grupo →] https://chat.whatsapp.com/HBbSIYz620WJgSQp0ZuVDJ

Manu
```

### Paso 6 · M-6

- **Wait until:** 2026-10-24 17:00 (hora de Argentina, GMT-3) · si la fecha ya pasó: «Skip all outbound communication actions till next wait or event start date action»
- **Email · nombre de la acción:** M-6 · En 1 hora: el link está en el grupo
- **Asunto:** En 1 hora: el link está en el grupo
- **Preheader:** A las 17:45 lo dejo en el grupo de WhatsApp.
- **Cuerpo** (texto plano, respetando los párrafos; los links como links):

```
Hola,

En una hora arrancamos.

Buscá un lugar sin ruido, algo para anotar y tené a mano tus números: CPA, margen por pedido, ticket promedio y cada cuánto se termina tu producto.

A las 17:45 dejo el link para entrar en el grupo de WhatsApp. No llega por mail. Si no estás en el grupo, entrá ahora:

[Entrar al grupo →] https://chat.whatsapp.com/HBbSIYz620WJgSQp0ZuVDJ

Los regalos son para los que se quedan hasta el final.

Nos vemos a las 18.

Manu
```

### Paso 7 · M-7

- **Wait until:** 2026-10-24 17:55 (hora de Argentina, GMT-3) · si la fecha ya pasó: «Skip all outbound communication actions till next wait or event start date action»
- **Email · nombre de la acción:** M-7 · Estamos entrando
- **Asunto:** Estamos entrando
- **Preheader:** Arrancamos en 5 minutos.
- **Cuerpo** (texto plano, respetando los párrafos; los links como links):

```
Estamos entrando. 🔴

El link para entrar está en el grupo de WhatsApp:

[Ir al grupo →] https://chat.whatsapp.com/HBbSIYz620WJgSQp0ZuVDJ

Manu
```

### Paso 8 · P-1

- **Wait until:** 2026-10-25 09:00 (hora de Argentina, GMT-3) · si la fecha ya pasó: «Skip all outbound communication actions till next wait or event start date action»
- **Email · nombre de la acción:** P-1 · La repetición de anoche
- **Asunto:** La repetición de anoche
- **Preheader:** Miralo con tus números al lado.
- **Cuerpo** (texto plano, respetando los párrafos; los links como links):

```
Hola,

Acá está la repetición de la clase de anoche:

[Ver la repetición →] https://applygenesis.com/replay

Si no llegaste, miralo con tus números al lado: margen por pedido, CPA y cada cuánto se le termina el producto a tu cliente. Es la cuenta que vas a querer hacer.

Y si al terminar sentís que es para tu ecommerce: Génesis está abierto hasta hoy a las 23:59. Es 1 a 1 conmigo, y la suscripción la instalamos nosotros, al lado de lo que ya vendés. Antes de entrar lo vemos con tus números en una llamada.

Manu

PD: para agendar la llamada: https://applygenesis.com/aplication?utm_source=email&utm_medium=post-clase&utm_campaign=genesis-24-10
```

### Paso 9 · P-2

- **Wait until:** 2026-10-25 14:00 (hora de Argentina, GMT-3) · si la fecha ya pasó: «Skip all outbound communication actions till next wait or event start date action»
- **Email · nombre de la acción:** P-2 · "¿Y si rompo lo que hoy vende?"
- **Asunto:** "¿Y si rompo lo que hoy vende?"
- **Preheader:** La pregunta que más me hicieron después de la clase.
- **Cuerpo** (texto plano, respetando los párrafos; los links como links):

```
Hola,

La pregunta que más me hicieron después de la clase fue esta:

"¿Y si toco el modelo y rompo lo que hoy vende?"

No se toca. La suscripción va al lado de la compra única. Vos seguís vendiendo exactamente igual, y nosotros instalamos la suscripción al costado.

Lo que cambia es que el cliente que ya te compró te vuelve a pagar sin que lo pautes de nuevo. Y por ende podés pagar más por cada cliente nuevo que tu competencia.

La segunda que más me hicieron: "¿y si mi producto no se termina todos los meses?". No hace falta. Se arma con tu ciclo de reposición real: si dura 60 días, se cobra cada 60. Lo que sí hace falta es que se termine.

Si querés verlo con tu ecommerce, agendá la llamada:

[Agendar la llamada →] https://applygenesis.com/aplication?utm_source=email&utm_medium=post-clase&utm_campaign=genesis-24-10

Génesis cierra hoy a las 23:59.

Manu
```

### Paso 10 · P-3

- **Wait until:** 2026-10-25 20:00 (hora de Argentina, GMT-3) · si la fecha ya pasó: «Skip all outbound communication actions till next wait or event start date action»
- **Email · nombre de la acción:** P-3 · Quedan 4 lugares
- **Asunto:** Quedan 4 lugares
- **Preheader:** Génesis cierra hoy a las 23:59.
- **Cuerpo** (texto plano, respetando los párrafos; los links como links):

```
Hola,

Quedan 4 lugares en Génesis.

Son pocos a propósito: es 1 a 1 y lo hacemos nosotros.

Si Meta te baja la cuenta, los suscriptores se siguen cobrando. Y la landing te la copian en 48 horas. Tu base de suscriptores, no.

Si lo estás pensando, la llamada es para eso: ves tu cuenta con tus números y decidís.

[Agendar la llamada →] https://applygenesis.com/aplication?utm_source=email&utm_medium=post-clase&utm_campaign=genesis-24-10

Cierra hoy a las 23:59.

Manu
```

### Paso 11 · P-4

- **Wait until:** 2026-10-25 22:30 (hora de Argentina, GMT-3) · si la fecha ya pasó: «Skip all outbound communication actions till next wait or event start date action»
- **Email · nombre de la acción:** P-4 · Cierra en una hora y media
- **Asunto:** Cierra en una hora y media
- **Preheader:** A las 23:59 se cierra Génesis.
- **Cuerpo** (texto plano, respetando los párrafos; los links como links):

```
Hola,

A las 23:59 se cierra Génesis.

Si todavía estás pensando si es para tu ecommerce, agendá ahora y lo vemos con tus números:

[Agendar la llamada →] https://applygenesis.com/aplication?utm_source=email&utm_medium=post-clase&utm_campaign=genesis-24-10

Manu
```


## Al terminar
Mandame un resumen con: el nombre del workflow, el trigger, la lista de los 11 Wait con su fecha y hora tal como quedaron, la opción elegida en cada uno para «si la fecha ya pasó», y cualquier cosa que no hayas podido hacer. No lo publiques.
