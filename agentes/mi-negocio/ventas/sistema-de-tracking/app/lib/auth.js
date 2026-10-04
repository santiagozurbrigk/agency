// Sesiones con cookie firmada (HMAC con SESSION_SECRET).
// Usuarios en la variable de entorno USERS_JSON:
//   [{"email":"santi@...","name":"Santiago","pass":"una-clave-fuerte"}, ...]
// En modo demo (sin USERS_JSON) entra cualquiera con la clave "demo".

const crypto = require("crypto");

const SECRET = process.env.SESSION_SECRET || "demo-secret-cambiame";
const DIAS = 30;

function usuarios() {
  try { return JSON.parse(process.env.USERS_JSON || "[]"); } catch (e) { return []; }
}

function firmar(payload) {
  return crypto.createHmac("sha256", SECRET).update(payload).digest("base64url");
}

function login(email, pass) {
  email = String(email || "").trim().toLowerCase();
  const lista = usuarios();
  let user = null;
  if (lista.length) {
    const u = lista.find(u => String(u.email).toLowerCase() === email);
    if (u && u.pass && timingSafeEq(String(u.pass), String(pass || ""))) user = { email, name: u.name || email };
  } else if (pass === "demo" && email) {
    user = { email, name: email.split("@")[0] };
  }
  if (!user) return null;
  const exp = Date.now() + DIAS * 24 * 60 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify({ e: user.email, n: user.name, x: exp })).toString("base64url");
  return { user, cookie: `trk=${payload}.${firmar(payload)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${DIAS * 86400}` };
}

function timingSafeEq(a, b) {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

function sesion(req) {
  const raw = (req.headers.cookie || "").split(/;\s*/).find(c => c.startsWith("trk="));
  if (!raw) return null;
  const [payload, sig] = raw.slice(4).split(".");
  if (!payload || !sig || firmar(payload) !== sig) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (data.x < Date.now()) return null;
    return { email: data.e, name: data.n };
  } catch (e) { return null; }
}

// Para endpoints internos: corta con 401 si no hay sesión.
function requiere(req, res) {
  const s = sesion(req);
  if (!s) { res.status(401).json({ ok: false, error: "Sesión vencida. Entrá de nuevo." }); return null; }
  return s;
}

const COOKIE_LOGOUT = "trk=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0";

module.exports = { login, sesion, requiere, COOKIE_LOGOUT };
