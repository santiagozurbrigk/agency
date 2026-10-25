// Creativos de los anuncios de Meta (miniatura o primer frame), para informes. Solo lectura.
const { requiere } = require("../lib/auth");
const meta = require("../lib/meta");

module.exports = async function handler(req, res) {
  if (!requiere(req, res)) return;
  if (!meta.enabled()) return res.status(200).json({ ok: false, error: meta.problema() || "Meta Ads no está conectado" });
  try {
    return res.status(200).json({ ok: true, creativos: await meta.creativos() });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
