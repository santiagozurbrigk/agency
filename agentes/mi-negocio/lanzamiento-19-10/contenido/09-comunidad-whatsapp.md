# Comunidad de WhatsApp de registrados · configuración

Versión 1, 9-oct-2026. Es el canal único de los registrados: no hay mails (decisión del 02/10), así que por acá llegan la nutrición (`05-nutricion-whatsapp.md`), los 12 toques del día del vivo con el link de la clase (`07-dia-del-vivo.md`) y el carrito (`08-post-vivo-whatsapp.md`).

> **Hay que dejarla lista hoy (9/10).** El registro abre mañana, sábado 10/10, con el anuncio, y la thank you necesita el link de la comunidad desde el primer registrado.

## Por qué comunidad y no grupo

| | Grupo común | Comunidad (grupo de avisos) |
|---|---|---|
| Tope de miembros | 1.024 | Hasta 5.000 en el grupo de avisos (verificalo en la app al crearla: WhatsApp cambia estos topes) |
| Quién escribe | Hay que cerrarlo a mano | Solo admins, de fábrica |
| Teléfonos de los miembros | Los ve todo el grupo | Solo los ven los admins y quien ya te tenía agendado |
| Si se llena | Hay que abrir un segundo grupo y duplicar cada mensaje | Entra todo en un solo lugar |

Con ads de adquisición corriendo del 10 al 18/10, pasar de 1.024 registrados es posible, y un segundo grupo duplica el trabajo del día del vivo justo cuando más importa. Además son dueños de marca: que su número no quede expuesto a 1.000 desconocidos (y a la competencia) suma confianza.

**Regla del lanzamiento que se mantiene:** el grupo de avisos emite, no conversa. Los únicos otros grupos de la comunidad son los de cada lead con su llamada (paso 5c); no hay grupos de charla abiertos.

---

## Paso a paso (WhatsApp Business del número de Manu)

### 1 · Crear la comunidad
1. WhatsApp Business → pestaña **Comunidades** (en Android, arriba; en iPhone, abajo) → **Nueva comunidad**.
2. Nombre, descripción y foto: copiá los textos de la sección "Textos para pegar".
3. Cuando te pida agregar grupos, **no agregues ninguno** (o saltealo). Solo queda el grupo de avisos, que se crea solo.

### 2 · Configuración de la comunidad
Comunidad → tocá el nombre → **Configuración de la comunidad**:

| Ajuste | Valor | Por qué |
|---|---|---|
| Quién puede agregar grupos | **Solo admins** | Solo el equipo crea los grupos de cada lead |
| Invitar miembros / link | Activo | Es el link que va en la thank you |

### 3 · Configuración del grupo de avisos
Grupo de avisos → tocá el nombre:

| Ajuste | Valor | Por qué |
|---|---|---|
| Enviar mensajes | **Solo admins** (viene así) | El grupo emite |
| Editar info del grupo | **Solo admins** | Que nadie cambie nombre ni foto |
| Aprobar nuevos miembros | **Desactivado** | Es gratis: cualquier fricción entre la thank you y el grupo es un registrado que no recibe el link de la clase |
| Mensajes temporales | **Desactivados** | Los videos de nutrición y el link tienen que quedar |
| Reacciones | Activas | Las interacciones del plan son con emoji (🔥, ✅) |

### 4 · Admins
- **Manu:** dueño de la comunidad (creada desde su número, así los mensajes salen con su nombre y foto).
- **SDR (¿José?):** admin. Es quien modera el vivo según `ventas/proceso-de-ventas-clase-19-10.md` y quien manda los mensajes si Manu está en el estudio el 19/10. `[CONFIRMAR: quién]`
- Nadie más. Cada admin de más es alguien que puede borrar o mandar algo por error.

### 5 · Link de invitación
1. Comunidad → **Invitar miembros** → **Copiar link**. Ese es el `[LINK GRUPO]`.
2. Pegalo en `lanzamiento-19-10/optin/thank-you.html`, en `CONFIG.WHATSAPP_URL` (hoy está en `"#"`, que oculta los botones del grupo).
3. Pegalo también donde dice `[LINK GRUPO]` en la slide de regalos de la clase (`clase/v2/05-pitch-qa-cierre.md`) y armá el QR de esa slide con el mismo link.
4. **No restablezcas el link** después de publicarlo: el viejo deja de funcionar y la thank you queda rota.

### 5b · Lo que ve el que entra
En la comunidad, la tarjeta del grupo de avisos es fija de WhatsApp ("¡Te damos la bienvenida a la comunidad!" + "Ver información de la comunidad") y no se puede editar. Lo propio se pone en dos lugares:
1. **La descripción de la comunidad:** se ve en la pantalla previa al tocar el link de invitación y en "Ver información de la comunidad". Arranca con la línea gancho.
2. **El primer aviso, fijado:** es lo primero con texto propio que aparece debajo de la tarjeta (paso 6).

### 5c · Grupos por lead (llamadas)
Se pueden crear dentro de la comunidad (Comunidad → **Agregar grupo** → **Crear grupo nuevo**), pero:
- **Los miembros de la comunidad pueden ver los grupos de los que no son parte** y pedir unirse (probalo desde un teléfono que no sea admin apenas crees el primero). Nombre sin la marca del lead (ej: **Llamada · 0412** en vez de "[Marca] · Equipo Manu Dominguez") y, en cada grupo, **Aprobar nuevos miembros: activado**.
- La comunidad tiene tope de grupos (100 hoy; verificalo en la app). Al terminar el carrito (22/10), sacá de la comunidad los grupos cerrados para liberar lugar.
- El lead que entra a su grupo queda también en el grupo de avisos: bien, recibe el link de la clase.

### 6 · Mensaje fijado (apenas la creás)
Mandá el mensaje "Fijado de bienvenida" de abajo y fijalo (mantener apretado → **Fijar** → 30 días). WhatsApp no le muestra a los que entran los mensajes viejos: el que entra el jueves no ve el video del miércoles. Lo que sí ve siempre es la descripción y lo fijado; por eso el fijado dice todo lo que necesita.

### 7 · Prueba antes de publicar
- [ ] Desde un teléfono que no sea admin: abrir el link desde la thank you, entrar y comprobar que no puede escribir y que ve el fijado.
- [ ] Comprobar que el botón de la thank you abre la comunidad, en iPhone y en Android.
- [ ] Desde ese mismo teléfono, salir y volver a entrar con el link (simula al que se fue sin querer).

---

## Textos para pegar

### Nombre
> **Génesis · Clase en vivo 19/10**

(Coincide con el "Grupo Génesis" de la notificación de la thank you. Sin "webinar", "masterclass" ni "lanzamiento".)

### Foto
Foto de Manu (la misma del perfil de IG) o el logo de Génesis, cuadrada, 640×640. Se ve chiquita: cara o logo, sin texto.

### Descripción de la comunidad
> 🔴 Lunes 19/10, 19 hs: leé esto antes de la clase 🔴
>
> Clase en vivo privada: **lunes 19/10, 19 hs (Argentina)**.
>
> Cómo pasé mi marca de consumibles de 60 millones a 156.798.062 por mes con el modelo de suscripción: el paso a paso para poder pagar 2,5 veces más por cada cliente que tu competencia, sin frenar lo que hoy vendés.
>
> Acá te llega todo: los videos de antes de la clase y, el lunes, el link para entrar. No llega por mail.
>
> Solo escribo yo, un par de mensajes por día. Si me querés decir algo, escribime al privado: [WA PRIVADO]
>
> — Manu

### Fijado de bienvenida (desde el 10/10)
> Bienvenido. Soy Manu.
>
> Te anotaste a la clase en vivo privada del **lunes 19 a las 19 hs** (Argentina).
>
> Ese día te muestro cómo pasé mi marca de 60 millones a 156.798.062 por mes con el modelo de suscripción. Con mis números reales, paso a paso.
>
> Cómo funciona este grupo:
> ✅ Desde el miércoles 14 te dejo acá lo que necesitás para llegar con la cabeza lista. Un par de mensajes por día, nada de ruido.
> ✅ El lunes 19, 15 minutos antes, te mando acá el link para entrar. No llega por mail.
> ✅ Activá las notificaciones de este grupo para no perderte el link.
>
> Nos vemos el lunes.

### Cambios del fijado durante el lanzamiento
| Cuándo | Qué se fija |
|---|---|
| 10/10 | Fijado de bienvenida |
| Sáb 17/10, después del video resumen | El video resumen del D4 (es el que pone al día al que entró tarde) |
| Lun 19/10, 18:45 | El mensaje del momento 8 con `[LINK CLASE]` |
| Mar 20/10, 09:00 | El mensaje del replay con `[LINK REPLAY]` |

---

## Ajustes que esto pide en otras piezas

- **Del 10 al 13/10 el grupo está callado** (la nutrición arranca el 14). El fijado cubre esos días: el que entra ve qué es y cuándo arranca. Si querés sumar algo antes del 14, que sea un mensaje corto el domingo 11 con la fecha y nada más.
- **La bienvenida del D1 (`05-nutricion-whatsapp.md`, 14/10 10:00)** dice "Bienvenido": para ese día ya hay gente adentro desde el 10. Sugerencia: arrancarla con "Arrancamos." en vez de "Bienvenido."
- **La slide de regalos de la clase** dice "Entrá al grupo de WhatsApp… contame ahí qué fue lo más útil". En la comunidad no pueden escribir. Cambiar a: "Entrá al grupo y respondeme al privado qué fue lo más útil de hoy" (desde la comunidad pueden tocar el mensaje → **Responder en privado**).
- **Ojo con la thank you:** promete "SOPs y recursos EXCLUSIVOS" en el grupo, pero los 3 regalos son por asistir y el plan de nutrición no tiene ningún recurso hasta el 17/10 (`[PENDIENTE]` del D4). O se manda algo chico al grupo antes del 19, o se ajusta esa frase.

## Datos que faltan

1. `[LINK GRUPO]` — sale del paso 5. Va en la thank you y en la slide de regalos.
2. `[WA PRIVADO]` — wa.link de Manu, para la descripción.
3. Quién es el segundo admin (¿José?).
