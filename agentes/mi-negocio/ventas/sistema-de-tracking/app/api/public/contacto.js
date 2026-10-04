// Formulario público "Quiero que me contacten" (link 2 de la clase) → Grupo 2 con prioridad.

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

    let lead = await store.findLead(telefono, null);
    const fields = {
      que_falta: que_falta || "", objecion: que_falta || "",
      ciclo: ciclo || "", facturacion: facturacion || "", inversion: inversion || "",
      form_contacto: "Sí", asistio: "Sí"
    };
    if (!lead) {
      lead = await store.createLead({
        nombre: nombre || "", telefono,
        fields: { ...fields, etapa: "Nuevo", posible_duplicado: "Sí", intentos: "0" },
        tags: ["quiero-contacto"]
      });
    } else {
      await store.updateLead(lead.id, { nombre, fields, addTags: ["quiero-contacto"] });
    }

    // Menos de USD 1.000 → pantalla de "no podemos ayudarte" + Próximo ciclo (regla 5.4).
    if (inversion === "Menos de USD 1.000") {
      await store.registrar(lead.id, "Sistema", "Quiero que me contacten: inversión < USD 1.000 → Próximo ciclo", {
        etapa: "Próximo ciclo"
      });
      return res.status(200).json({ ok: true, ruta: "rechazado" });
    }
    if ((lead.fields || {}).etapa === "Próximo ciclo") {
      await store.updateLead(lead.id, { fields: { etapa: "En conversación" } });
    }

    await store.registrar(lead.id, "Sistema", "Completó Quiero que me contacten → Grupo 2 con prioridad");
    return res.status(200).json({ ok: true, ruta: "contacto" });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
