// Reenvía al sistema de tracking la aplicación de /aplication.
// Usa TRACKING_OPTIN_URL (…/api/public/optin) → …/api/public/aplicacion
module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Método no permitido" });
  }
  const base = process.env.TRACKING_OPTIN_URL;
  if (!base) return res.status(500).json({ ok: false, error: "Falta TRACKING_OPTIN_URL" });
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { return res.status(400).json({ ok: false, error: "JSON inválido" }); } }
  if (!body || !body.email || !body.telefono) return res.status(400).json({ ok: false, error: "Falta el WhatsApp o el email" });
  try {
    const r = await fetch(base.replace(/\/optin\/?$/, "/aplicacion"), {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body)
    });
    const d = await r.json().catch(() => ({ ok: false }));
    if (!r.ok || !d.ok) return res.status(502).json({ ok: false, error: "No se pudo enviar. Probá de nuevo." });
    return res.status(200).json({ ok: true, ruta: d.ruta });
  } catch (e) {
    return res.status(502).json({ ok: false, error: "No se pudo enviar. Probá de nuevo." });
  }
};
