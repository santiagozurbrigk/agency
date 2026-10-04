// Endpoint público del opt-in (la landing de registro le pega acá).
// Crea o actualiza el lead en GHL, guarda ciclo y facturación
// y le asigna dueño (Braian o Diego, de a uno).

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

    const existente = await store.findLead(telefono, email);
    if (existente) {
      await store.updateLead(existente.id, {
        nombre, email, telefono,
        fields: {
          ...(ciclo ? { ciclo } : {}), ...(facturacion ? { facturacion } : {}),
          ...(tracking ? { origen: JSON.stringify(tracking) } : {})
        }
      });
      return res.status(200).json({ ok: true, id: existente.id, repetido: true });
    }

    // Reparto de a uno: el dueño nuevo es el que tiene menos leads.
    const leads = await store.listLeads();
    const braian = leads.filter(l => l.fields.dueno === "Braian").length;
    const diego = leads.filter(l => l.fields.dueno === "Diego").length;
    const dueno = braian <= diego ? "Braian" : "Diego";

    const lead = await store.createLead({
      nombre, email, telefono,
      fields: {
        ciclo: ciclo || "", facturacion: facturacion || "",
        etapa: "Nuevo", dueno, intentos: "0",
        ...(tracking ? { origen: JSON.stringify(tracking) } : {})
      },
      tags: ["optin-19-10"]
    });
    return res.status(200).json({ ok: true, id: lead.id });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
