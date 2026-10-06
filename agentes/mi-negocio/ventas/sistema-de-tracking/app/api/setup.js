// Crea en GHL los campos personalizados que falten. Correr una vez al conectar la subcuenta.

const { requiere } = require("../lib/auth");
const store = require("../lib/store");
const ghl = require("../lib/ghl");

module.exports = async function handler(req, res) {
  if (!requiere(req, res)) return;
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Método no permitido" });
  }
  if (store.DEMO) {
    return res.status(200).json({ ok: true, demo: true, mensaje: "Modo demo: no hay GHL conectado. Cargá GHL_API_TOKEN y GHL_LOCATION_ID en Vercel." });
  }
  try {
    const report = await ghl.ensureCustomFields();
    return res.status(200).json({ ok: true, report });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
