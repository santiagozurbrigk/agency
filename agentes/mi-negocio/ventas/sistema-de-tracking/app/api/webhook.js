// Webhook entrante de GHL. Se configura en GHL un workflow por evento de cita:
//   URL: https://<proyecto>.vercel.app/api/webhook?key=<WEBHOOK_SECRET>
// Eventos que entiende: cita creada / cita cancelada (AppointmentCreate / AppointmentDelete
// o el payload del workflow con {type, appointment:{calendarId, contactId}}).

const store = require("../lib/store");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Método no permitido" });
  }
  const secret = process.env.WEBHOOK_SECRET;
  if (secret && req.query.key !== secret) {
    return res.status(401).json({ ok: false, error: "Clave inválida" });
  }
  try {
    let body = req.body;
    if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
    body = body || {};

    const appt = body.appointment || body.calendar || body;
    const contactId = appt.contactId || body.contactId || body.contact_id
      || (body.contact && body.contact.id) || null;
    const calendarId = appt.calendarId || body.calendarId || body.calendar_id
      || (body.calendar && body.calendar.id) || null;
    const tipo = String(body.type || body.eventType || req.query.type || "").toLowerCase();
    const cancelada = tipo.includes("delete") || tipo.includes("cancel")
      || ["cancelled", "canceled"].includes(String(appt.appointmentStatus || appt.status || "").toLowerCase());

    if (!contactId) {
      return res.status(200).json({ ok: true, ignorado: true, motivo: "Sin contactId" });
    }

    const s = await store.getSettings();
    // El calendario puede venir en la URL (?cal=manu_pre|manu_post|diego), que es
    // lo más simple de configurar en el workflow de GHL, o por su ID en el payload.
    // Si el aviso trae el ID de uno de los tres calendarios, manda el ID: así un
    // workflow mal filtrado (que se dispara con citas de otro calendario) no confunde
    // una pre-venta con una llamada de venta. Si no lo trae, se usa ?cal=.
    const porId = { [s.calManuPostId]: "manu_post", [s.calManuPreventaId]: "manu_pre", [s.calDiegoId]: "diego" };
    const cal = (calendarId && porId[calendarId]) || String(req.query.cal || "").toLowerCase();
    console.log("webhook", JSON.stringify({ q: req.query.cal || null, calendarId, usado: cal, tipo, contactId }));
    const esManuPost = cal === "manu_post";
    const esManuPre = cal === "manu_pre";
    const esDiego = cal === "diego";
    if (!esManuPost && !esManuPre && !esDiego) {
      return res.status(200).json({ ok: true, ignorado: true, motivo: "Calendario ajeno al proceso" });
    }

    const lead = await store.getLead(contactId);
    if (!lead) return res.status(200).json({ ok: true, ignorado: true, motivo: "Lead no encontrado" });

    // Horario de la cita (los workflows de GHL lo mandan con distintos nombres).
    const fecha = (v) => {
      if (!v) return "";
      const s = String(v).trim().replace(" ", "T");
      // Sin zona horaria: es hora de Argentina.
      const d = new Date(/T\d{2}:\d{2}(:\d{2})?(\.\d+)?$/.test(s) ? s + "-03:00" : s);
      return isNaN(d) ? "" : d.toISOString();
    };
    const inicio = fecha(appt.startTime || appt.start_time || body.startTime || body.start_time || (body.calendar && body.calendar.startTime));
    const fin = fecha(appt.endTime || appt.end_time || body.endTime || body.end_time || (body.calendar && body.calendar.endTime));
    await store.asegurarCampos(["cita_at", "cita_fin"]);

    if (cancelada) {
      await store.registrar(contactId, "GHL", "Cita cancelada", {
        agendo: "No", cita_at: "", cita_fin: "",
        etapa: "Canceló · a reagendar"
      }, lead);
      if (esManuPost) await store.invalidarCitasManu();
      return res.status(200).json({ ok: true });
    }

    // Cita creada.
    await store.liberarReserva(contactId);
    // Si agendó directo en el calendario sin pasar por un formulario, no tiene tag
    // del lanzamiento y no aparecería en el sistema: se le agrega uno.
    const tags = store.esDelLanzamiento(lead) ? [] : [esManuPre ? "pre-venta-manu" : "calendario-ghl"];
    if (esManuPre) {
      await store.registrar(contactId, "GHL", "Agendó la pre-venta con Manu", {
        etapa: "Agendado con Manu (pre-venta)", llamada_con: "Manu", agendo: "Sí",
        ...(inicio ? { cita_at: inicio, cita_fin: fin } : {})
      }, lead, tags);
    } else {
      const con = esManuPost ? "Manu" : "Equipo";
      const fields = { etapa: "Llamada agendada", llamada_con: con, agendo: "Sí", ...(inicio ? { cita_at: inicio, cita_fin: fin } : {}) };
      // Red de seguridad del tope: si la cita de Manu entra por encima de 10, se marca.
      // Se cuenta fresco (sin caché) porque acaba de entrar una cita.
      if (esManuPost) {
        const carga = await store.cargaManu({ fresco: true });
        if (carga.citas > carga.tope) fields.excede_tope = "Sí";
      }
      await store.registrar(contactId, "GHL", `Agendó la llamada de venta con ${con}`, fields, lead, tags);
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
