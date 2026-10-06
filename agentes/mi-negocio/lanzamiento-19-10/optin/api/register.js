// Función serverless de Vercel: recibe el registro de la optin y lo reenvía
// al sistema de tracking (TRACKING_OPTIN_URL) y, si está configurado, también
// al webhook de GHL (GHL_WEBHOOK_URL) para los workflows de emails.
// Las URLs viven en variables de entorno, nunca en el HTML.
//   TRACKING_OPTIN_URL = https://tracking-genesis.vercel.app/api/public/optin
module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Método no permitido" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { return res.status(400).json({ ok: false, error: "JSON inválido" }); }
  }
  if (!body || !body.email) {
    return res.status(400).json({ ok: false, error: "Falta el email" });
  }

  const destinos = [process.env.TRACKING_OPTIN_URL, process.env.GHL_WEBHOOK_URL].filter(Boolean);
  if (!destinos.length) {
    return res.status(500).json({ ok: false, error: "Falta TRACKING_OPTIN_URL" });
  }

  const resultados = await Promise.all(destinos.map(async (url) => {
    try {
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      return r.ok;
    } catch (e) {
      return false;
    }
  }));

  // Alcanza con que uno reciba el registro: el lead no se pierde.
  if (!resultados.some(Boolean)) {
    return res.status(502).json({ ok: false, error: "Ningún destino recibió el registro" });
  }
  return res.status(200).json({ ok: true });
};
