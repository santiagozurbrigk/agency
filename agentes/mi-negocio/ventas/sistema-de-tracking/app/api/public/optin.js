// Endpoint público del opt-in (la landing de registro le pega acá).
// Crea o actualiza el lead en GHL, guarda ciclo y facturación
// (Sin dueños: todo el equipo trabaja todos los leads.)

const store = require("../../lib/store");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Método no permitido" });
  }
  try {
    let body = req.body;
    if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { return res.status(400).json({ ok: false, error: "JSON inválido" }); } }
    const { nombre, email, telefono, ciclo, facturacion, tracking } = body || {};
    if (!email && !telefono) return res.status(400).json({ ok: false, error: "Falta email o teléfono" });

    const datos = {
      ...(ciclo ? { ciclo } : {}), ...(facturacion ? { facturacion } : {}),
      ...(tracking ? { origen: JSON.stringify(tracking) } : {})
    };

    const existente = await store.findLead(telefono, email);
    if (existente) {
      // Puede ser un contacto viejo de la subcuenta: se suma al lanzamiento con el tag,
      // y si todavía no tenía etapa, se le asigna.
      const f = existente.fields || {};
      const extra = {};
      if (!f.etapa) { extra.etapa = "Nuevo"; extra.intentos = "0"; }
      await store.updateLead(existente.id, {
        nombre, email, telefono,
        fields: { ...datos, ...extra },
        addTags: ["optin-19-10"]
      }, existente);
      return res.status(200).json({ ok: true, id: existente.id, repetido: true });
    }

    const lead = await store.createLead({
      nombre, email, telefono,
      fields: { ...datos, etapa: "Nuevo", intentos: "0" },
      tags: ["optin-19-10"]
    });
    return res.status(200).json({ ok: true, id: lead.id });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
