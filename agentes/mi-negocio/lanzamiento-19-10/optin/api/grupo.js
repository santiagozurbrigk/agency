// Reenvía al sistema de tracking el clic en «Entrar al grupo» de la thank you.
// Usa TRACKING_OPTIN_URL (…/api/public/optin) → …/api/public/grupo
module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  const base = process.env.TRACKING_OPTIN_URL;
  if (!base) return res.status(200).json({ ok: false, error: "Falta TRACKING_OPTIN_URL" });
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  try {
    await fetch(base.replace(/\/optin\/?$/, "/grupo"), {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: (body && body.email) || "" })
    });
  } catch (e) {}
  return res.status(200).json({ ok: true });
};
