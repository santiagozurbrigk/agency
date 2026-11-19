// Función serverless de Vercel: recibe el registro de la optin y lo reenvía
// a los trackers (tracker viejo y campus, ver _destinos.js) y, si está configurado,
// al webhook de GHL (GHL_WEBHOOK_URL) para los workflows de emails.
// Las URLs viven en variables de entorno, nunca en el HTML.
const { destinos, enviar, leerBody } = require("./_destinos");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Método no permitido" });
  }

  const body = leerBody(req);
  if (!body) return res.status(400).json({ ok: false, error: "JSON inválido" });
  if (!body.email) return res.status(400).json({ ok: false, error: "Falta el email" });

  const lista = destinos("optin");
  if (process.env.GHL_WEBHOOK_URL) lista.push({ nombre: "ghl", url: process.env.GHL_WEBHOOK_URL, headers: {} });
  if (!lista.length) {
    return res.status(500).json({ ok: false, error: "Falta TRACKING_OPTIN_URL o CAMPUS_INGEST_URL" });
  }

  const resultados = await Promise.all(lista.map((d) => enviar(d, body)));

  // Alcanza con que uno reciba el registro: el lead no se pierde.
  if (!resultados.some((r) => r.ok)) {
    return res.status(502).json({ ok: false, error: "Ningún destino recibió el registro" });
  }
  return res.status(200).json({ ok: true });
};
