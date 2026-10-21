// Citas de las llamadas (pre-venta y venta) para el calendario de la sección Llamadas.
// GET /api/calendario?desde=<ms>&hasta=<ms>   (máximo 45 días)

const { requiere } = require("../lib/auth");
const store = require("../lib/store");

module.exports = async function handler(req, res) {
  if (!requiere(req, res)) return;
  try {
    const desde = Number(req.query.desde), hasta = Number(req.query.hasta);
    if (!(desde > 0) || !(hasta > desde) || hasta - desde > 45 * 864e5) {
      return res.status(400).json({ ok: false, error: "Rango inválido" });
    }
    const citas = await store.citasRango(desde, hasta);
    return res.status(200).json({ ok: true, citas });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
