# El sistema del equipo · Génesis OS

_Última actualización: 28/11/2026 · Dueño: Santiago y Matías (responsables de ventas) · Aprueba: Manu_

Las reglas que valen igual para SDR, setter y closer. Lo específico de cada rol está en [`roles/`](roles/). Teoría completa en [`../teoria-sops/equipo/`](../teoria-sops/equipo/).

> Gestionar no es controlar: es poner las reglas del juego, dar la visión y correrse del medio. Este sistema es el esqueleto; lo que lo mueve es que el equipo compre la visión de Génesis.

---

## 1. Lo que tiene que existir antes de que entre alguien

No se contrata a nadie si falta una de estas cosas:

| # | Qué | Dónde está | Estado |
|---|---|---|---|
| 1 | **Documento de negocio** (igual para todos, 6 bloques) | [`../negocio/onboarding-equipo-genesis-os.docx`](../negocio/onboarding-equipo-genesis-os.docx) | Armado el 29/10. Tiene `[PENDIENTE]` en 5.4 (métricas esperadas), 6.2 (canales internos, reuniones), 6.4 (feedback) |
| 2 | **Anexo de ventas** (lo lee cualquiera que entre a ventas) | [`../ventas/`](../ventas/): proceso, guion del SDR, guion y manual de llamada, objeciones | Armado para la clase del 19/10. Falta actualizarlo al mapa de ventas ([`../ventas/pendientes.md`](../ventas/pendientes.md)) |
| 3 | **Los números del rol, por escrito** | En cada archivo de [`roles/`](roles/) | `[PENDIENTE]`: hay propuestas, faltan validar |
| 4 | **Los 2-3 SOPs con los que arranca** | [`indice-sops.md`](indice-sops.md) | Parcial |
| 5 | **Contrato firmado y accesos creados** | Fuera del repo. Las contraseñas van por el gestor de contraseñas `[PENDIENTE: cuál]`, nunca por chat ni por documento | — |

**Regla:** un estándar definido después de ver el resultado no es un estándar, es una justificación. Los números van escritos antes del día cero.

**Qué NO va en el documento de negocio:** nada de una persona (responsabilidades, métricas individuales, plan de 30 días). Eso va en la reunión del día cero y en el archivo del rol.

---

## 2. Onboarding

### El objetivo

Que la persona **compre la visión de Génesis y entienda el negocio al 100%**. Aprender las tareas es la consecuencia.

### Orden

| Cuándo | Qué | Quién |
|---|---|---|
| Antes del día cero | Contrato firmado, accesos creados, documento de negocio enviado | Santi / Mati |
| Antes del día cero | La persona lee el documento entero y el anexo de ventas, y trae dudas anotadas | La persona |
| Día cero | Reunión de 60-90 min ([agenda](templates/agenda-dia-cero.md)) | Manu (bloque 2) + responsable de ventas (bloques 1 y 3) `[CONFIRMAR]` |
| Semana 1 | 3-5 tareas con **yo lo hago → lo hacemos → lo hacés** | Responsable de ventas |
| Semanas 2-4 | Se suman tareas a medida que suelta las primeras | Responsable de ventas |

### La reunión del día cero, en 3 bloques

1. **Repaso del documento (20-30 min).** Por arriba, sin leerlo. Se suma lo que no está escrito (por qué el precio es ese, qué se probó y falló) y se chequea comprensión:
   - "¿Cómo le explicarías a un amigo qué hace Génesis?"
   - "¿Quién es nuestro cliente ideal y a quién no le vendemos?"
   - "¿Por qué alguien nos elegiría en vez de a otra agencia o curso?"
2. **Visión y misión (15-20 min).** Lo cuenta Manu en primera persona: por qué existe Génesis, a dónde va en 2-3 años, por qué eligió a esta persona. No se delega a un archivo.
3. **Su rol y sus primeras tareas (25-35 min).** Responsabilidades (2-3), cómo se mide (1-2 métricas), plan de 30 días, visión del rol con números reales, los primeros SOPs abiertos y explicados en la call. Sale del archivo de su rol.

En esta misma reunión se comunica **por escrito** el período de prueba (sección 3).

### Yo lo hago, lo hacemos, lo hacés

1. **Yo lo hago:** el responsable hace la tarea compartiendo pantalla y explica en voz alta cada decisión y por qué.
2. **Lo hacemos:** la hace la persona compartiendo pantalla, y el responsable corrige en vivo.
3. **Lo hacés:** la hace sola; al terminar se revisa y se da feedback. Se repite hasta que deja de fallar. Ahí se suelta y no se revisa más.

**Para ventas, la versión concreta:** el nuevo escucha llamadas grabadas en Fathom y llamadas en vivo (yo lo hago) → hace llamadas con el responsable escuchando y corrigiendo por chat interno (lo hacemos) → hace sus llamadas solo y se revisan las grabaciones (lo hacés).

**Métrica de éxito del onboarding:** a los 30 días se lo pudo soltar en sus tareas principales. Autonomía, no perfección.

---

## 3. Período de prueba

### Las reglas

- **La decisión por defecto es que NO se queda.** Se queda si demostró que sí.
- **Se mide en ejecuciones, no en días.** Tope de calendario de 15 a 30 días. El tope es un máximo: si en el día 8 es evidente que no va, no se espera.
- **No se mide el resultado estadístico, se mide cómo trabaja.** Con 10 llamadas no sabés el close rate; sí sabés si sigue la estructura.
- **Tres dimensiones, siempre:** resultado, proceso, encaje y actitud. **Proceso y actitud pesan más que el resultado.** Buen resultado sin proceso es suerte con fecha de vencimiento.

### Ejecuciones y tope por rol `[PROPUESTA: validar con Manu y Mati]`

| Rol | Una ejecución es | Cuántas | Tope |
|---|---|---|---|
| SDR | Un lead trabajado de punta a punta en la primera llamada (apertura → calificación → agenda o ruta a la clase) | 30 primeras llamadas, y un día de clase con sus 3 grupos | 30 días |
| Setter | Un día completo de setteo con reporte | 2 semanas de setteo (10 días hábiles) | 15-21 días |
| Closer | Una llamada de venta tomada, con seguimiento | 10-15 llamadas | 30 días |

**El problema propio de Génesis:** el volumen llega por lanzamientos. Si la persona entra en una semana sin ventana de venta, no va a tener muestra. Por eso el ingreso se planifica **para que el período de prueba cruce una ventana de venta** (de la clase al cierre). Si igual no hubo volumen, es falta de muestra y se extiende (ver abajo).

### Los hitos

| Hito | Qué pasa | Formato |
|---|---|---|
| Día cero | Se comunica: que hay período de prueba, cuánto dura, qué se evalúa (con los números de su rol), cada cuánto se habla y qué pasa al final | Por escrito, en la reunión del día cero |
| Cierre de cada semana | Check de 15-30 min: cómo viene, qué costó, qué se corrige | Uno a uno con el responsable |
| Mitad de las ejecuciones | Revisión formal de las 3 dimensiones, por escrito. Se le dice exactamente dónde está parado | [Evaluación](templates/evaluacion-periodo-prueba.md) parcial |
| Cierre | La decisión | [Evaluación](templates/evaluacion-periodo-prueba.md) completa |

**La revisión de la mitad no se saltea.** Si en la llamada 5 le decís qué falla, tiene otras 5 para corregirlo.

### Las señales de las primeras dos semanas

| Buenas | Malas |
|---|---|
| Pregunta cuando no entiende | Pregunta cosas que están en el documento o en el guion |
| El mismo error no aparece dos veces | Repite el error corregido |
| Propone mejoras al proceso | Discute o justifica cada corrección |
| Lee lo que se le manda sin recordatorio | Aparece y desaparece: hay que buscarlo |
| Avisa en el momento cuando algo se traba | Entrega tarde sin avisar |
| | Habla mal de trabajos anteriores o de compañeros |

Tres o cuatro malas en la semana 2: se habla ya, no se espera al cierre.

### La decisión: el flujo

Se responde en orden. La primera que frena define la salida.

1. **¿Actitud y encaje son buenos?** No → **se va** (la actitud no se enseña). Sí → seguí.
2. **¿Hubo muestra suficiente?** No, por causa ajena (no hubo lanzamiento, enfermedad) → **se extiende**. No, porque no produjo → **se va**. Sí → seguí.
3. **¿Sigue el proceso?** No → **se va**, aunque el resultado sea bueno. Sí → seguí.
4. **¿Cumplió el resultado?** Sí → **se queda**. No, pero proceso y actitud sólidos y el bajón se explica por el plazo corto → **se queda**. No y sin señal de que vaya a rendir → **se va**.

Validación final: **sabiendo lo que sé hoy, ¿la volvería a contratar?** y **¿sube o baja el promedio del equipo?**

### Extender

Solo por falta de muestra. **Una sola vez, plazo fijo (máximo 30 días), con lo que falta escrito** ("necesito ver X, Y y Z"). Nunca para no tener la conversación.

### Las tres salidas

- **Se queda:** se le dice de forma explícita, no por omisión. Se definen objetivos del próximo trimestre y hacia dónde crece el rol.
- **Se va:** se ejecuta la salida. `[PENDIENTE: proceso de offboarding — accesos de GHL, WhatsApp, tracker, grupos de leads abiertos y su reasignación]`.
- **Se extiende:** con las tres condiciones de arriba.

---

## 4. Control y seguimiento: las tres capas

| Capa | Te dice | En Génesis |
|---|---|---|
| 1 · Ambiente | Si la persona está | Oficina virtual + canales |
| 2 · Registro | Si hizo | Tracker (tareas) + reportes |
| 3 · Conversación | Por qué pasó y qué se hace | Daily, weekly, monthly, uno a uno |

### Capa 1 · Oficina virtual y canales

- **Oficina virtual:** el equipo conectado en una sala de voz durante su horario. No es para vigilar: es para resolver en 30 segundos lo que por chat lleva dos horas y para tener una lectura del pulso del equipo. `[PENDIENTE: herramienta (Discord, Meet, otra) y horario]`.
- **Canales mínimos** `[PROPUESTA]`:
  - `#general`: comunicados a todo el equipo.
  - `#ventas`: el día a día del área (SDR, setter, closer, Santi, Mati).
  - `#reportes-ventas`: el reporte diario del SDR y del setter, y el reporte por llamada del closer. Lo lee marketing.
  - `#ventas-cerradas`: cada venta con su comprobante de seña y el link de Fathom.
  - Con leads y clientes: WhatsApp, un grupo por lead con el closer (ya definido en el proceso).
- **Urgente** `[PROPUESTA]`: un lead caliente que no se puede atender, un problema con el formulario, el Calendly o el link de pago, una seña que no se acredita. Eso va por llamada o mención directa, no por mensaje suelto.

### Capa 2 · El tracker

Ya existe: todas las tareas viven en el tracker (sección Tareas). **Si no está en el tracker, no existe.**

- Cada tarea lleva: responsable, área, fecha límite, qué se espera (entregable) y estado.
- **Estados:** Pendiente / En curso / Entregada / Aprobada / Trabada.
- **Toda tarea lleva fecha límite.**
- El tracker se revisa en las reuniones, no cada dos horas.

### Capa 2 · Los reportes

Un reporte **no es un parte de actividad**: es información que cambia una decisión. Tres reglas:

1. **Tiene lector definido.** Si nadie lo lee, se elimina.
2. **Lo hace el que ejecuta**, no Santi ni Mati yendo a buscar números a GHL.
3. **Trae señal, no solo números:** qué vio, qué le llamó la atención, qué cree que está pasando.

| Rol | Reporte | Cuándo | Lector | Template |
|---|---|---|---|---|
| SDR | Diario | Al cierre del día | Responsable de ventas + marketing | [reporte-diario-sdr.md](templates/reporte-diario-sdr.md) |
| Setter | Diario | Al cierre del día | Responsable de ventas + marketing | [reporte-diario-setter.md](templates/reporte-diario-setter.md) |
| Closer | Por llamada | Apenas corta | Responsable de ventas + marketing | [reporte-llamada-closer.md](templates/reporte-llamada-closer.md) |
| Closer | Semanal | Antes de la weekly | Responsable de ventas | [reporte-semanal-closer.md](templates/reporte-semanal-closer.md) |
| Responsable de ventas | Semanal de área | Antes de la weekly | Manu | [reporte-semanal-ventas.md](templates/reporte-semanal-ventas.md) |

**Los reportes de ventas son materia prima de marketing.** Los dolores con palabras textuales del lead y las objeciones reales van a los anuncios, las historias, los mails y la próxima clase. Si se archivan sin cruzarlos, se tira la mejor investigación de mercado que tenemos. `[PROPUESTA: quién de marketing los lee y cada cuánto se vuelcan a la base del avatar.]`

### Capa 3 · Las reuniones

Una reunión existe si tiene **objetivo, resultado esperado, conclusión y roadmap**. Si falta una, era un mensaje. Toda reunión: agenda previa (la manda el que convoca), un líder, el objetivo repetido al empezar y los últimos 5 minutos para "quién hace qué, para cuándo".

| Reunión | Cuándo | Quién | Duración | Agenda |
|---|---|---|---|---|
| **Daily de ventas** | Todos los días a primera hora durante la ventana de venta; `[PROPUESTA: fuera de ventana, lunes, miércoles y viernes]` | SDR, setter, closer, Santi, Mati | 15-30 min | [agenda-daily.md](templates/agenda-daily.md) |
| **Weekly de ventas** | `[PENDIENTE: día y hora]` | Equipo de ventas. Presenta Santi o Mati | 45-60 min | [agenda-weekly.md](templates/agenda-weekly.md) |
| **Monthly / cierre de lanzamiento** | `[PROPUESTA]` Al cerrar cada ventana de venta, y una por mes si no hubo lanzamiento | Todo el equipo | 60-90 min | [agenda-monthly.md](templates/agenda-monthly.md) |
| **Uno a uno** | Semanal durante el período de prueba; después quincenal | Responsable + una persona | 20-30 min | Sin agenda de tareas |

- **La daily:** cada uno responde qué tiene hoy, cómo viene con la semana y **qué lo está trabando**. Lo complejo se agenda aparte con los involucrados.
- **La weekly:** el responsable llega con los números, su hipótesis de por qué dieron así y 3-5 prioridades propuestas. Si llega sin eso, se reagenda.
- **La monthly:** la única donde se discute estrategia. ¿Qué fue el cuello de botella del lanzamiento? ¿Qué fue el motor? ¿Qué aprendimos?
- **El uno a uno:** cómo está la persona, qué la motiva, qué le cuesta, cómo ve su crecimiento. Si termina en revisión de pendientes, fracasó.

**Cuándo no hacer una reunión:** si es para informar (mensaje o Loom), si no hay agenda, si faltan los números o si lleva un mes sin producir una decisión.

### Qué mira cada uno

- **Santi y Mati (responsables de ventas):** el detalle del área. Números diarios, reportes individuales, grabaciones, corrección del trabajo de SDR, setter y closer.
- **Manu (dirección):** los números de salida de ventas (agendas, show, cierres, caja), las trabas que cruzan áreas (lo que ventas necesita de contenido o de ads) y a los responsables de ventas. Su uno a uno es con Santi y Mati.

`[CONFIRMAR]` Santi y Mati hoy también hacen de SDR. Mientras sea así, la evaluación de un SDR nuevo la hace el que no comparte la tarea con él ese ciclo, o Manu.

---

## 5. Feedback

Se da **en el momento**, no en la evaluación de fin de mes. Cinco pasos, para positivo y negativo:

1. **Reconocé lo bueno.** Algo concreto que hizo bien.
2. **Preguntá, no acuses.** "¿Qué pasó con esta llamada? Contame tu lectura." Muchas veces el problema era otro: un acceso, un guion desactualizado, una prioridad contradictoria.
3. **Dale el feedback.** Claro y concreto, con el minuto de la grabación o el mensaje puntual.
4. **Recordá el porqué.** Conectalo con la regla del documento o del guion que aplica y con lo que le cuesta al negocio.
5. **Poné fecha de revisión.** "Lo miramos de nuevo en las llamadas del jueves."

**Dónde queda:** `[PROPUESTA, viene del documento de negocio 6.4]` las correcciones de llamadas y mensajes se dejan como comentario en el tracker (o en el reporte de esa llamada) con qué cambiar y por qué, así queda el historial para la evaluación del período de prueba.

**Cómo se le avisa al que entra:** desde el día cero sabe que se le va a corregir el trabajo y que es normal. La corrección es entrenamiento, no una amenaza.

---

## 6. Consecuencias

Un sistema de control sin consecuencias es teatro.

- **Si supera sus objetivos:** premio. No siempre plata: reconocimiento frente al equipo, más autonomía, tomar las llamadas de los leads más calificados, entrenar al próximo. `[PENDIENTE: esquema de comisiones y bonos por rol]`.
- **Si no cumple de forma consistente:** conversación, plan de mejora con plazo, ajuste de rol y, si no cambia, la salida.
- **Para todos igual:** nadie tiene inmunidad por antigüedad ni queda exento por ser nuevo. Y aplica también para la dirección.

El nivel del equipo tiende a igualarse con el de su integrante más débil, y también sube hasta el nivel del mejor.

---

## 7. SOPs

- **Un solo lugar:** [`indice-sops.md`](indice-sops.md) lista todos con link, dueño y fecha. Organizados por área, no por persona.
- **Seis partes:** encabezado (fecha, dueño, ejecuta), objetivo, qué necesitás antes, paso a paso (una acción por paso, variantes donde ocurren), errores comunes ("si pasa X → Y"), resultado esperado (verificable con sí o no). [Template](templates/template-sop.md).
- **Cómo se escriben rápido:** grabarse haciendo la tarea narrando (10-15 min) → transcribir → pasarlo por el [generador de SOPs](../agentes-propios/generador-sops.md) → corregir el borrador → adjuntar el video.
- **Lo escribe el experto en la tarea, unos días antes de delegarla.** Nunca el que recién entra.
- **Se delega la tarea, no la responsabilidad:** el dueño del SOP controla que se haga bien y lo actualiza.
- **El test:** se lo das a alguien que nunca hizo la tarea y lo mirás ejecutar sin hablar. Cada duda es un agujero.
- **Mantenimiento:** se toca el mismo día que cambia el proceso, cuando aparece una pregunta que no responde y cuando algo sale mal. Revisión completa cada 3 meses. El que ejecuta propone cambios, el dueño aprueba.

---

## 8. La semana completa

**Todos los días:** equipo en la oficina virtual en su horario · daily a primera hora · el SDR y el setter mandan su reporte al cierre · el closer manda el reporte apenas corta cada llamada · el tracker se actualiza a medida que se completa algo.

**Una vez por semana:** Santi o Mati preparan números, análisis y prioridades · weekly de ventas · reporte semanal del closer · uno a uno con quien corresponda.

**Al cerrar cada lanzamiento (o una vez por mes):** monthly con todo el equipo · se revisan los objetivos del trimestre · se actualizan el documento de negocio y el anexo de ventas con lo aprendido.
