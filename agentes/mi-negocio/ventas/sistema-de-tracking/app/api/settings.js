// Configuración: tope de Manu, lugares de Génesis, fechas, calendarios de GHL.

const { requiere } = require("../lib/auth");
const store = require("../lib/store");

module.exports = async function handler(req, res) {
  if (!requiere(req, res)) return;
  try {
    if (req.method === "GET") {
      return res.status(200).json({ ok: true, settings: await store.getSettings() });
    }
    if (req.method === "POST") {
      let body = req.body;
      if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
      const patch = {};
      for (const k of ["manuTope", "genesisLugares"]) {
        if (body[k] != null) patch[k] = Math.max(0, parseInt(body[k], 10) || 0);
      }
      for (const k of ["cierre", "clase", "calManuPreventaId", "calManuPreventaLink",
                        "calManuPostId", "calManuPostLink", "calDiegoId", "calDiegoLink"]) {
        if (body[k] != null) patch[k] = String(body[k]).trim();
      }
      const settings = await store.saveSettings(patch);
      return res.status(200).json({ ok: true, settings });
    }
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ ok: false, error: "Método no permitido" });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
