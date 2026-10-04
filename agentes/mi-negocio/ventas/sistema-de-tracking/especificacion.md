# Sistema de tracking de leads · Especificación · Clase 19/10

Qué hace el sistema, con qué datos y con qué reglas. Se construye recién cuando esta especificación esté validada. Lo que todavía no está resuelto vive en `pendientes.md`.

Fuente: el mapa de ventas (`../mapa-de-ventas.html`) más las definiciones acordadas con Santiago el 03/10 y el 04/10.

---

## 1. Qué es y qué no es

- Una app web donde el equipo de ventas trabaja los leads de punta a punta. Corre en Vercel.
- **Se monta sobre GHL, no lo reemplaza.** Todo dato que se carga en el sistema se escribe en GHL (contacto, campos personalizados, tags, pipeline, calendarios). Si el sistema se cae, la información sigue entera en GHL.
- **Todos ven todo.** No hay vistas por rol: los cinco usuarios ven a todos los leads en todas las fases.
- **No reemplaza la guía de los SDR.** El sistema no sugiere mensajes ni abre WhatsApp. Los mensajes y las llamadas salen del celular de cada SDR, y en el sistema se marcan solo los resultados.

## 2. Usuarios

| Usuario | Qué hace en el proceso |
| --- | --- |
| **Santiago** | Supervisa. Marca señales de compra en la clase. Puede corregir la asignación Manu / Diego. |
| **Matías** | Igual que Santiago. |
| **Manu** | Toma las llamadas de la pre-venta y las de los más calificados después de la clase (tope de 10). |
| **Diego** | SDR y closer. Hace primer contacto y cold calls, y toma todas las llamadas de venta que no van a Manu. |
| **Braian** | Solo SDR. Primer contacto y cold calls. Puede vender la Mentoría en la cold call del Grupo 2. No toma llamadas de venta. |

Cada uno entra con su email y su contraseña.

## 3. Fechas y ofertas

- **Clase:** lunes 19/10 a las 19:00 (hora de Argentina), por Zoom.
- **Cierre de la ventana de venta:** jueves 22/10 a las 23:59.
- **Génesis** (consultoría): USD 5.000 · 2 × 2.850 · 3 × 2.000.
- **Mentoría:** USD 2.000 · 2 × 1.100.
- **Lugares de Génesis:** 10 marcas 1 a 1 con Manu. El total se puede editar por si se abren más lugares.

## 4. Los cuatro formularios

### 4.1 Opt-in · landing de registro (antes de la clase)

1. Nombre
2. Email
3. WhatsApp (con selector de código de país)
4. ¿Cada cuánto se le termina el producto a tu cliente?
   - En menos de 30 días
   - Entre 30 y 60 días
   - Entre 60 y 90 días
   - Más de 90 días
   - No se termina, se compra una vez y listo
5. ¿Cuánto está facturando tu marca mensualmente?
   - Menos de 10M · Entre 10M y 30M · Entre 30M y 50M · Entre 50M y 100M · Más de 100M

Hoy el opt-in del repo (`../../lanzamiento-19-10/optin/`) pide solo nombre, email y WhatsApp. Hay que sumarle las preguntas 4 y 5.

### 4.2 Pre-venta · calendario de Manu (antes de la clase)

El SDR le manda el link a los leads que calificaron en la llamada. Va **siempre al calendario de Manu**, sin tope.

1. Tu WhatsApp con código de país (ej: +54 9 11 2345 6789)
2. ¿Qué querés lograr con tu marca en los próximos 6 meses?
   - Tener un piso de facturación todos los meses · Mejorar mis márgenes por cada venta · Poder pagar más por cada cliente y seguir siendo rentable · Otro: ___
3. ¿Qué es lo que más te frena hoy para llegar a eso?
   - El CPA me sube todos los meses · Vendo, pero cada venta me deja poco margen · Dependo de Meta: si me bajan la cuenta, se frena todo · Todavía no logro vender de forma constante · Otro: ___
4. ¿Hace cuánto te pasa y qué probaste hasta ahora para resolverlo? (libre)

Facturación y ciclo ya vienen del opt-in.

### 4.3 Agenda directa · link 1 de la clase → Grupo 1

1. Tu WhatsApp con código de país
2. ¿Qué querés lograr con tu marca en los próximos 6 meses? (mismas opciones que 4.2)
3. ¿Qué es lo que más te frena hoy para llegar a eso? (mismas opciones que 4.2)
4. ¿Hace cuánto te pasa y qué probaste hasta ahora para resolverlo? (libre)
5. ¿Cada cuánto se le termina el producto a tu cliente? (mismas opciones que el opt-in)
6. ¿Cuánto está facturando tu marca mensualmente? (mismas opciones que el opt-in)
7. Si vemos que encaja con tu marca, ¿con cuánto contás hoy para invertir en resolverlo?
   - Menos de USD 1.000 · Entre USD 1.000 y USD 3.000 · Entre USD 3.000 y USD 6.000 · Más de USD 6.000

Al enviarlo, el sistema decide si se muestra el calendario de **Manu** o el de **Diego** (regla 5.2).

**Cómo funciona la página:** es una sola página con dos pasos y el lead no sabe que hay dos calendarios.

1. **Paso 1, el formulario.** El lead completa las 7 preguntas y toca «Siguiente».
2. **El sistema decide, en menos de un segundo:**
   - busca al lead en GHL por el WhatsApp y le guarda las respuestas;
   - cuenta en GHL las citas vigentes del calendario post-clase de Manu;
   - aplica la regla 5.2.
3. **Paso 2, la agenda.** En la misma página aparece el calendario de GHL que corresponde, de Manu o de Diego, embebido. Nombre, email y WhatsApp vienen precargados desde el opt-in, así el lead no los vuelve a escribir. Elige el horario y queda agendado en el momento.
   - Si eligió «Menos de USD 1.000», en lugar del calendario aparece la pantalla de la regla 5.4.

**Para que el tope no se pase:** si dos leads completan el formulario al mismo tiempo cuando Manu tiene 9 de 10, los dos podrían terminar con Manu. Para evitarlo, cuando el sistema muestra el calendario de Manu le reserva ese lugar durante 15 minutos. Si en ese tiempo el lead no agenda, el lugar se libera.

### 4.4 Quiero que me contacten · link 2 de la clase → Grupo 2

1. Nombre
2. Tu WhatsApp con código de país
3. ¿Qué te falta para dar el paso hoy?
   - Entender cómo se aplica a mi marca en particular · Saber si mi producto sirve para suscripción · Tengo dudas con la inversión · No sé si tengo tiempo para implementarlo ahora · Lo tengo que hablar con mi socio · Otro: ___
4. ¿Cada cuánto se le termina el producto a tu cliente? (mismas opciones que el opt-in)
5. ¿Cuánto está facturando tu marca mensualmente? (mismas opciones que el opt-in, incluida «Más de 100M»)
6. Si vemos que encaja con tu marca, ¿con cuánto contás hoy para invertir en resolverlo? (mismas opciones que 4.3)

Sin calendario: el lead queda esperando que lo contacte un SDR. La respuesta a «¿Qué te falta para dar el paso hoy?» queda en la ficha como la objeción.

Los formularios 4.3 y 4.4 los sirve el sistema, en páginas propias en Vercel, igual que el opt-in. Así puede contar las llamadas de Manu y aplicar la regla del «Menos de USD 1.000».

## 5. Reglas

### 5.1 Calificación para Génesis

- **Consumible:** cualquier respuesta del ciclo salvo «No se termina, se compra una vez y listo».
- **Califica para Génesis:** consumible **y** factura más de 30M («Entre 30M y 50M», «Entre 50M y 100M» o «Más de 100M»).
- Si no califica para Génesis, se le ofrece la Mentoría.
- En las llamadas, lo decide quien está hablando con el lead. Los datos del formulario son el punto de partida.

### 5.2 Manu o Diego (Agenda directa)

Al enviar el formulario 4.3:

- **Calendario de Manu** si se cumplen las cuatro condiciones:
  - vende consumible,
  - factura 50M o más,
  - puede invertir USD 3.000 o más,
  - Manu tiene menos de 10 llamadas post-clase agendadas.
- **Calendario de Diego**, en cualquier otro caso. Incluye a los que no califican para Génesis: Diego les ofrece la Mentoría.

**Corrección manual:** Santiago y Matías pueden cambiar a cualquier lead de Manu a Diego o al revés, por ejemplo si ven algo raro en las respuestas. El sistema mueve la cita al calendario del otro. Si esa persona no está libre a esa hora, la cita queda marcada como «a reagendar».

### 5.3 Tope de Manu

- **10 llamadas, contando solo las de después de la clase.** Suman las del Grupo 1 y las de los Grupos 2 y 3 que se agendan con Manu.
- Las de la pre-venta no cuentan.
- Cuenta solo las citas vigentes: si una se cancela, el lugar se libera.
- El contador **«Manu: X de 10»** está visible en todo momento.

### 5.4 «Menos de USD 1.000» (formularios 4.3 y 4.4)

- El lead ve la pantalla **«Por el momento no podemos ayudarte»**, con la opción de volver a completar el formulario.
- Si lo vuelve a completar con otra respuesta, sigue el camino normal.
- Si no, pasa a **«Próximo ciclo»**: sale de todas las listas de trabajo de este lanzamiento, incluido el Grupo 2 aunque haya asistido a la clase. No se da por perdido.

### 5.5 Reparto de leads

- Cada opt-in nuevo se asigna **de a uno entre Braian y Diego**. El dueño sigue al lead de punta a punta.
- Las llamadas de venta que no toma Manu las toma **Diego**, aunque el lead sea de Braian.
- Santiago y Matías pueden reasignar cualquier lead.

### 5.6 Los tres grupos (después de la clase)

| Grupo | Quién entra | Orden en la lista |
| --- | --- | --- |
| **Grupo 1** | Completó la Agenda directa (4.3) | Por facturación, de mayor a menor |
| **Grupo 2** | Completó Quiero que me contacten (4.4), más los que asistieron y no completaron ningún formulario | 1° los que completaron el formulario 4.4, por facturación de mayor a menor · 2° los que asistieron sin completar ningún formulario |
| **Grupo 3** | Está en el opt-in y no asistió | Por facturación, de mayor a menor |

- **Quien ya agendó en la pre-venta no entra a ningún grupo:** ya está en el núcleo.
- **Si completa los dos formularios de la clase, gana el Grupo 1.**
- **El formulario manda sobre la asistencia.** Si completó un formulario y Zoom no lo registra como asistente, igual va al grupo del formulario.
- **Los formularios de la clase se unen con la ficha del opt-in por el WhatsApp.** Si el número no coincide con ningún lead, se crea uno nuevo y se marca «posible duplicado» para que Santiago o Matías lo revisen.
- **Grupos 2 y 3:** si el lead califica para Génesis, el SDR le manda el link del calendario de Manu o el de Diego, mirando el contador de Manu.

### 5.7 Cierre de la ventana

El 22/10 a las 23:59, todo lead que no compró pasa a **«Próximo ciclo»** con todo lo que se sabe de él. El sistema queda listo para reusarlo en el próximo lanzamiento: otra fecha de clase, con los mismos leads cargados.

## 6. El recorrido del lead (etapas del pipeline en GHL)

**Antes de la clase**
1. **Nuevo**: entró el opt-in.
2. **Contactado**: se le mandó el mensaje inicial.
3. **En conversación**: contestó por chat o atendió la llamada.
4. **Sin respuesta**: en la cadencia hasta la clase.
5. **Califica · pre-venta**: califica y se le ofrece la llamada con Manu.
6. **Agendado con Manu (pre-venta)**: pasa al núcleo.
7. **No califica · ruta a la clase**: se le educa y se le manda el recurso.
8. **Confirmado para la clase**: dio el ok.

**Día de la clase**
- **Asistió / No asistió**, y la etiqueta **Señal de compra** (la marcan Santiago y Matías).

**Después de la clase**
- **Grupo 1**, **Grupo 2** o **Grupo 3** (regla 5.6).

**Núcleo, hasta la llamada de venta**
1. **Llamada agendada** (con Manu o con Diego).
2. **Se presentó** o **No se presentó · a reagendar**.
3. **Cerró** o **No cerró · seguimiento**.

**Finales**
- **Venta Génesis** · **Venta Mentoría** · **Próximo ciclo**.

## 7. La ficha del lead

- **Opt-in:** nombre, email, WhatsApp, ciclo, facturación, fecha de registro, origen (UTM).
- **Dueño:** Braian o Diego.
- **De la llamada del SDR:** qué vende y por dónde, cuánto le queda, dolor principal, qué probó, el **«por qué ahora»** textual, notas.
- **De los formularios:** objetivo a 6 meses, freno, hace cuánto y qué probó, inversión disponible, qué le falta para dar el paso.
- **Clase:** asistió o no, señal de compra, grupo.
- **Recurso:** enviado (sí o no), visto (sí o no), qué le resonó.
- **Llamada de venta:** con quién (Manu o Diego), fecha, se presentó o no, resultado, objeción que quedó viva.
- **Venta:** ver punto 9.
- **Contador de intentos de contacto** y fecha del último contacto.
- **Historial:** quién cambió qué y cuándo.

## 8. Qué registran Braian y Diego

Solo los resultados que mueven al lead:

- contestó o atendió,
- califica o no,
- agendó,
- confirmó la clase,
- recurso enviado o visto,
- resultado de la llamada,
- venta y cuotas.

Más un botón **«+1 intento»** cada vez que lo contactan sin respuesta. Los mensajes y llamadas sueltos no se cargan.

## 9. Ventas y cobros

- **Cada venta registra:** oferta (Génesis o Mentoría), forma de pago, quién vendió y fecha.
- **Formas de pago:**
  - Génesis: un solo pago (PIF) de USD 5.000 · 2 × 2.850 · 3 × 2.000.
  - Mentoría: un solo pago (PIF) de USD 2.000 · 2 × 1.100.
- **Cada pago registra:** monto, vencimiento, si está pagado, fecha de pago y **su comprobante adjunto**.
  - Si pagó todo junto (PIF), es un pago con un comprobante.
  - Si paga en cuotas, cada cuota lleva su propio comprobante cuando se paga.
- **El link de pago** lo manda quien tomó la llamada.
- **Contador visible:** «Génesis: X de 10 lugares».

## 10. Pantallas

1. **Cola de primer contacto**: opt-ins sin contactar. Primero los que califican para Génesis, después por facturación de mayor a menor y por antigüedad.
2. **Seguimiento antes de la clase**: en cadencia, ruta a la clase, confirmados.
3. **Día de la clase**: lista para marcar señales de compra y la carga de la asistencia.
4. **Grupos 1, 2 y 3**: cada uno con su orden (regla 5.6).
5. **Llamadas de venta**: agenda de Manu y de Diego, con la ficha completa de cada lead.
6. **Ventas y cuotas**: cuotas por vencer y vencidas.
7. **Métricas**: ver punto 11.
8. **Buscador** de leads por nombre, email o WhatsApp.

## 11. Métricas

- **Embudo:** opt-ins → contactados → en conversación → calificados → agendados (pre-venta y post-clase) → se presentaron → ventas.
- **Asistencia a la clase:** asistentes sobre registrados y sobre confirmados.
- **Tamaño de cada grupo** y conversión de cada uno.
- **Por persona** (Braian, Diego, Manu): contactos, calificados, agendas, presentados, cierres, facturación.
- **Ingresos:** por oferta, cobrado y por cobrar.
- **Contadores:** Manu X de 10 · Génesis X de 10 lugares.
- **Cuenta regresiva** al cierre del 22/10.

## 12. Qué se arma en GHL (la subcuenta hoy está vacía)

- **Campos personalizados:** todos los del punto 7 y los de los formularios.
- **Tags:** señal de compra, grupo 1, grupo 2, grupo 3, asistió, posible duplicado, próximo ciclo.
- **Un pipeline** con las etapas del punto 6.
- **Tres calendarios:** Manu pre-venta (con el formulario 4.2), Manu post-clase y Diego.
- **Webhooks de GHL al sistema:** opt-in nuevo, cita agendada, cita cancelada.

Lo que la API de GHL permita se crea por script. Lo que no, se documenta paso a paso para hacerlo a mano.

## 13. Fuera de alcance en este lanzamiento

- La integración de WhatsApp con GHL. Se usa el celular de cada SDR.
- Mensajes sugeridos o botones que abren WhatsApp.
- Asistencia de Zoom: pendiente, ver `pendientes.md`.
