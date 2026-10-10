// Visitas a la landing, por fuente. La landing avisa una vez por sesión (a través de su
// propio /api/visita) y acá se cuentan.
//
// Para no escribir en GHL en cada visita, cada instancia junta las visitas en memoria y
// las suma al contador guardado (custom value "trk_visitas") cada ~20 segundos. Si dos
// instancias guardan justo a la vez se puede perder alguna visita: el número es aproximado.

const store = require("../../lib/store");
const { fuenteDe } = require("../../lib/fuente");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const fuente = fuenteDe((body && body.tracking) || {});
  store.sumarVisita(fuente);
  return res.status(200).json({ ok: true, fuente });
};
