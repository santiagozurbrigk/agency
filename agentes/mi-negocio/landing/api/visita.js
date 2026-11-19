// Reenvía a los trackers el aviso de visita de la landing (una por sesión). Ver _destinos.js.
const { destinos, enviar, leerBody } = require("./_destinos");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  const body = leerBody(req) || {};
  const lista = destinos("visita");
  if (!lista.length) return res.status(200).json({ ok: false, error: "Falta TRACKING_OPTIN_URL o CAMPUS_INGEST_URL" });
  await Promise.all(lista.map((d) => enviar(d, { tracking: body.tracking || {} })));
  return res.status(200).json({ ok: true });
};
