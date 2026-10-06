// Formulario público "Quiero que me contacten" (link 2 de la clase) → Grupo 2 con prioridad.
// Como la Agenda directa: responde al instante y guarda en GHL en segundo plano.

const store = require("../../lib/store");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Método no permitido" });
  }
  try {
    let body = req.body;
    if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { return res.status(400).json({ ok: false, error: "JSON inválido" }); } }
    const { nombre, telefono, que_falta, ciclo, facturacion, inversion } = body || {};
    if (!telefono) return res.status(400).json({ ok: false, error: "Falta el WhatsApp" });

    const rechazado = inversion === "Menos de USD 1.000";
    const conocido = await store.enFoto(telefono, null);

    await store.enSegundoPlano(async () => {
      const lead = conocido ? await store.getLead(conocido.id) : await store.findLead(telefono, null);
      const fields = {
        que_falta: que_falta || "", objecion: que_falta || "",
        ciclo: ciclo || "", facturacion: facturacion || "", inversion: inversion || "",
        form_contacto: "Sí", asistio: "Sí"
      };
      let que;
      if (rechazado) {
        // Menos de USD 1.000 → pantalla de "no podemos ayudarte" + Próximo ciclo (regla 5.4).
        fields.etapa = "Próximo ciclo";
        que = "Quiero que me contacten: inversión < USD 1.000 → Próximo ciclo";
      } else {
        if (lead && (lead.fields || {}).etapa === "Próximo ciclo") fields.etapa = "En conversación";
        que = "Completó Quiero que me contacten → Grupo 2 con prioridad";
      }
      if (lead) {
        await store.updateLead(lead.id, {
          nombre,
          fields: { ...fields, historial_json: store.historialCon(lead, "Sistema", que) },
          addTags: ["quiero-contacto"]
        }, lead);
      } else {
        await store.createLead({
          nombre: nombre || "", telefono,
          fields: { etapa: "Nuevo", ...fields, posible_duplicado: "Sí", intentos: "0",
            historial_json: store.historialCon(null, "Sistema", que) },
          tags: ["quiero-contacto"]
        });
      }
    });

    return res.status(200).json({ ok: true, ruta: rechazado ? "rechazado" : "contacto" });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
