// La thank you avisa cuando alguien toca «Entrar al grupo» (una vez por sesión, con el
// email del registro). Se marca el lead: «Tocó Entrar al grupo» = Sí y la hora.
// El registro recién hecho puede tardar unos segundos en existir en GHL: se reintenta.

const store = require("../../lib/store");
const cache = require("../../lib/cache");

const espera = (ms) => new Promise(r => setTimeout(r, ms));

async function marcar(email) {
  for (let i = 0; i < 4; i++) {
    const lead = await store.findLead(null, email).catch(() => null);
    if (lead) {
      if (lead.fields && lead.fields.toco_grupo === "Sí") return true;
      await store.registrar(lead.id, "Landing", "Tocó «Entrar al grupo» en la thank you", {
        toco_grupo: "Sí", toco_grupo_at: new Date().toISOString()
      }, lead);
      return true;
    }
    await espera(5000);
  }
  return false;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const email = String((body && body.email) || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return res.status(200).json({ ok: false, error: "Sin email" });
  if (store.DEMO) { const ok = await marcar(email); return res.status(200).json({ ok }); }
  cache.waitUntil(marcar(email));
  return res.status(200).json({ ok: true });
};
