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
    const calendarId = appt.calendarId || body.calendarId || body.calendar_id || null;
    const tipo = String(body.type || body.eventType || req.query.type || "").toLowerCase();
    const cancelada = tipo.includes("delete") || tipo.includes("cancel")
      || ["cancelled", "canceled"].includes(String(appt.appointmentStatus || appt.status || "").toLowerCase());

    if (!contactId) {
      return res.status(200).json({ ok: true, ignorado: true, motivo: "Sin contactId" });
    }

    const s = await store.getSettings();
    // El calendario puede venir en la URL (?cal=manu_pre|manu_post|diego), que es
    // lo más simple de configurar en el workflow de GHL, o por su ID en el payload.
    const cal = String(req.query.cal || "").toLowerCase();
    const esManuPost = cal === "manu_post" || calendarId === s.calManuPostId;
    const esManuPre = cal === "manu_pre" || calendarId === s.calManuPreventaId;
    const esDiego = cal === "diego" || calendarId === s.calDiegoId;
    if (!esManuPost && !esManuPre && !esDiego) {
      return res.status(200).json({ ok: true, ignorado: true, motivo: "Calendario ajeno al proceso" });
    }

    const lead = await store.getLead(contactId);
    if (!lead) return res.status(200).json({ ok: true, ignorado: true, motivo: "Lead no encontrado" });

    if (cancelada) {
      await store.registrar(contactId, "GHL", "Cita cancelada", {
        agendo: "No",
        etapa: esManuPre ? "Califica · pre-venta" : "No se presentó · a reagendar"
      });
      return res.status(200).json({ ok: true });
    }

    // Cita creada.
    await store.liberarReserva(contactId);
    if (esManuPre) {
      await store.registrar(contactId, "GHL", "Agendó la pre-venta con Manu", {
        etapa: "Agendado con Manu (pre-venta)", llamada_con: "Manu", agendo: "Sí"
      });
    } else {
      const con = esManuPost ? "Manu" : "Diego";
      const fields = { etapa: "Llamada agendada", llamada_con: con, agendo: "Sí" };
      // Red de seguridad del tope: si la cita de Manu entra por encima de 10, se marca.
      if (esManuPost) {
        const carga = await store.cargaManu();
        if (carga.citas > carga.tope) fields.excede_tope = "Sí";
      }
      await store.registrar(contactId, "GHL", `Agendó la llamada de venta con ${con}`, fields);
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
