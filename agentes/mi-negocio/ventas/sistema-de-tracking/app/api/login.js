const { login, COOKIE_LOGOUT } = require("../lib/auth");

module.exports = async function handler(req, res) {
  if (req.method === "DELETE") {
    res.setHeader("Set-Cookie", COOKIE_LOGOUT);
    return res.status(200).json({ ok: true });
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, DELETE");
    return res.status(405).json({ ok: false, error: "Método no permitido" });
  }
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const r = login(body.email, body.pass);
  if (!r) return res.status(401).json({ ok: false, error: "Email o clave incorrectos" });
  res.setHeader("Set-Cookie", r.cookie);
  return res.status(200).json({ ok: true, user: r.user });
};
