// Formulario público de aplicación (applygenesis.com/aplication).
// Guarda las respuestas en la ficha del lead (lo busca por WhatsApp o email; si no existe, lo crea)
// con el tag aplicacion-19-10. Como los otros formularios: responde al instante y guarda en GHL en segundo plano.

const store = require("../../lib/store");

const TAG = "aplicacion-19-10";

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
    const { nombre, email, telefono, objetivo, freno, hace_cuanto, ciclo, facturacion, inversion, tracking } = body || {};
    if (!telefono || !email) return res.status(400).json({ ok: false, error: "Falta el WhatsApp o el email" });

    // Menos de USD 1.000 → "Por el momento no podemos ayudarte" + Próximo ciclo (regla 5.4).
    const rechazado = inversion === "Menos de USD 1.000";
    const conocido = await store.enFoto(telefono, email);

    await store.enSegundoPlano(async () => {
      const lead = conocido ? await store.getLead(conocido.id) : await store.findLead(telefono, email);
      const fields = {
        objetivo: objetivo || "", freno: freno || "", hace_cuanto: hace_cuanto || "",
        ciclo: ciclo || "", facturacion: facturacion || "", inversion: inversion || ""
      };
      let que;
      if (rechazado) {
        fields.etapa = "Próximo ciclo";
        que = "Completó la aplicación: inversión < USD 1.000 → Próximo ciclo";
      } else {
        if (lead && (lead.fields || {}).etapa === "Próximo ciclo") fields.etapa = "En conversación";
        que = `Completó la aplicación (${facturacion || "sin facturación"} · ${inversion || "sin inversión"})`;
      }
      if (lead) {
        const f = lead.fields || {};
        if (!f.etapa && !fields.etapa) { fields.etapa = "Nuevo"; fields.intentos = "0"; }
        if (!f.origen && tracking) fields.origen = JSON.stringify(tracking);
        await store.updateLead(lead.id, {
          nombre, email, telefono,
          fields: { ...fields, historial_json: store.historialCon(lead, "Sistema", que) },
          addTags: [TAG]
        }, lead);
      } else {
        await store.createLead({
          nombre: nombre || "", email, telefono,
          fields: { etapa: "Nuevo", intentos: "0", ...fields,
            ...(tracking ? { origen: JSON.stringify(tracking) } : {}),
            historial_json: store.historialCon(null, "Sistema", que) },
          tags: [TAG]
        });
      }
    });

    return res.status(200).json({ ok: true, ruta: rechazado ? "rechazado" : "aplicado" });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
