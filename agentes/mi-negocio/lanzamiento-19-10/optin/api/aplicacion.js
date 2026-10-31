// Reenvía a los trackers la aplicación de /aplication (ver _destinos.js).
// La respuesta (ruta y WhatsApp del SDR) sale del tracker viejo mientras esté configurado;
// si falla o ya no está, sale del campus.
const { destinos, enviar, leerBody } = require("./_destinos");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Método no permitido" });
  }
  const body = leerBody(req);
  if (!body) return res.status(400).json({ ok: false, error: "JSON inválido" });
  if (!body.email || !body.telefono) return res.status(400).json({ ok: false, error: "Falta el WhatsApp o el email" });

  const lista = destinos("aplicacion");
  if (!lista.length) return res.status(500).json({ ok: false, error: "Falta TRACKING_OPTIN_URL o CAMPUS_INGEST_URL" });

  const resultados = await Promise.all(lista.map((d) => enviar(d, body)));
  const bueno = resultados.find((r) => r.ok);
  if (!bueno) return res.status(502).json({ ok: false, error: "No se pudo enviar. Probá de nuevo." });
  return res.status(200).json({ ok: true, ruta: bueno.data.ruta, wa: bueno.data.wa || "" });
};
