// Endpoint público del opt-in (la landing de registro le pega acá).
// Crea o actualiza el lead en GHL, guarda la inversión diaria en Meta (y ciclo y facturación, si vienen)
// (Sin dueños: todo el equipo trabaja todos los leads.)

const store = require("../../lib/store");
const { calificaOptin } = require("../../lib/rules");

// Etiquetas en GHL (se usan para los públicos de Meta):
//   optin-19-10            → TODOS los registrados: público de los anuncios de nutrición.
//   optin-calificado-19-10 → solo los que califican (invierten 100 dólares por día o más en Meta).
//   optin-24-10            → los que se registran para la clase del sábado 24/10. Dispara el workflow de
//                            mails de esa clase: el que ya tenía optin-19-10 (se anotó a la del lunes) igual
//                            recibe este tag nuevo al volver a registrarse, y el workflow arranca.
const TAG_OPTIN = "optin-19-10";
const TAG_CLASE = "optin-24-10";
const TAG_CALIFICADO = "optin-calificado-19-10";

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
    const { nombre, email, telefono, ciclo, facturacion, inversion_meta, tracking } = body || {};
    if (!email && !telefono) return res.status(400).json({ ok: false, error: "Falta email o teléfono" });

    const datos = {
      ...(ciclo ? { ciclo } : {}), ...(facturacion ? { facturacion } : {}),
      ...(inversion_meta ? { inversion_meta } : {}),
      ...(tracking ? { origen: JSON.stringify(tracking) } : {})
    };

    const tags = calificaOptin(datos) ? [TAG_OPTIN, TAG_CLASE, TAG_CALIFICADO] : [TAG_OPTIN, TAG_CLASE];

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
        addTags: tags
      }, existente);
      return res.status(200).json({ ok: true, id: existente.id, repetido: true });
    }

    const lead = await store.createLead({
      nombre, email, telefono,
      fields: { ...datos, etapa: "Nuevo", intentos: "0" },
      tags
    });
    return res.status(200).json({ ok: true, id: lead.id });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
