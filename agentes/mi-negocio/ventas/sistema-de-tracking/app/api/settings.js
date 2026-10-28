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
      if (body.inicioLanzamiento != null) {
        const d = String(body.inicioLanzamiento).trim();
        if (d && !/^\d{4}-\d{2}-\d{2}$/.test(d)) return res.status(400).json({ ok: false, error: "El inicio del lanzamiento tiene que ser una fecha" });
        patch.inicioLanzamiento = d;
      }
      if (body.postDesde != null) {
        const d = String(body.postDesde).trim();
        if (d && !/^\d{4}-\d{2}-\d{2}$/.test(d)) return res.status(400).json({ ok: false, error: "El inicio del proceso post webinar tiene que ser una fecha" });
        patch.postDesde = d;
      }
      if (body.tareasWebinar != null) {
        const d = String(body.tareasWebinar).trim();
        if (d && !/^\d{4}-\d{2}-\d{2}$/.test(d)) return res.status(400).json({ ok: false, error: "La fecha del webinar (tareas) tiene que ser una fecha" });
        patch.tareasWebinar = d;
      }
      for (const k of ["cierre", "clase", "calManuPreventaId", "calManuPreventaLink",
                        "calManuPostId", "calManuPostLink", "calDiegoId", "calDiegoLink",
                        "sdrMatiWa", "sdrSantiWa", "closers"]) {
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
