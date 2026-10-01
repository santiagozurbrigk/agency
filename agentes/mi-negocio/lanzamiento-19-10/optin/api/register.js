// Función serverless de Vercel: recibe el registro de la optin y lo reenvía al webhook de GHL.
// La URL del webhook vive en la variable de entorno GHL_WEBHOOK_URL, nunca en el HTML.
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

  const url = process.env.GHL_WEBHOOK_URL;
  if (!url) {
    return res.status(500).json({ ok: false, error: "Falta GHL_WEBHOOK_URL" });
  }

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!r.ok) return res.status(502).json({ ok: false, error: "El webhook respondió " + r.status });
  } catch (e) {
    return res.status(502).json({ ok: false, error: "No se pudo contactar el webhook" });
  }

  return res.status(200).json({ ok: true });
};
