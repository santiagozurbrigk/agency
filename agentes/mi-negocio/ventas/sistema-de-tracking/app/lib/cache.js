// Caché del sistema para no pegarle a GHL en cada pedido.
//
// Dos capas:
//   1. Memoria de la instancia (instantáneo; con Fluid compute varias personas comparten instancia).
//   2. Vercel Runtime Cache (compartido entre todas las instancias de la región).
// Si la Runtime Cache no está disponible (local, tests), funciona solo con memoria.
//
// La foto de los leads se sirve "stale-while-revalidate": si tiene menos de FRESCO
// se usa tal cual; si es más vieja pero menos que VIEJO, se devuelve al instante y
// se refresca en segundo plano. Una sola recarga a la vez (single-flight).

let runtime = null;
let waitUntil = (p) => { p.catch(() => {}); };
try {
  const vf = require("@vercel/functions");
  if (process.env.VERCEL) runtime = vf.getCache({ namespace: "trk" });
  if (vf.waitUntil) waitUntil = (p) => { try { vf.waitUntil(p.catch(() => {})); } catch (e) { p.catch(() => {}); } };
} catch (e) { /* sin @vercel/functions: solo memoria */ }

const mem = new Map();          // key -> { v, at }
const enVuelo = new Map();      // key -> Promise (single-flight)

async function rcGet(key) {
  if (!runtime) return null;
  try { return (await runtime.get(key)) || null; } catch (e) { return null; }
}
async function rcSet(key, entry, ttlSeg) {
  if (!runtime) return;
  try { await runtime.set(key, entry, { ttl: ttlSeg, name: key }); } catch (e) { /* >2 MB o caído: queda en memoria */ }
}
async function rcDel(key) {
  if (!runtime) return;
  try { await runtime.delete(key); } catch (e) {}
}

// Devuelve el valor de `key`, recalculándolo con `fn` según la política de frescura.
async function swr(key, fn, { frescoMs, viejoMs, ttlSeg }) {
  const ahora = Date.now();
  let entry = mem.get(key);
  if (!entry || ahora - entry.at > frescoMs) {
    const rc = await rcGet(key);
    if (rc && (!entry || rc.at > entry.at)) { entry = rc; mem.set(key, rc); }
  }
  const recargar = () => {
    if (enVuelo.has(key)) return enVuelo.get(key);
    const p = (async () => {
      const v = await fn();
      const nueva = { v, at: Date.now() };
      mem.set(key, nueva);
      await rcSet(key, nueva, ttlSeg);
      return nueva;
    })().finally(() => enVuelo.delete(key));
    enVuelo.set(key, p);
    return p;
  };
  if (entry && ahora - entry.at <= frescoMs) return entry.v;
  if (entry && ahora - entry.at <= viejoMs) { waitUntil(recargar()); return entry.v; }
  return (await recargar()).v;
}

// Escribe un valor (write-through) en las dos capas.
async function set(key, v, ttlSeg) {
  const entry = { v, at: Date.now() };
  mem.set(key, entry);
  await rcSet(key, entry, ttlSeg);
}

async function get(key) {
  const m = mem.get(key);
  const rc = await rcGet(key);
  if (rc && (!m || rc.at > m.at)) { mem.set(key, rc); return rc.v; }
  return m ? m.v : null;
}

async function del(key) {
  mem.delete(key);
  await rcDel(key);
}

// Para los tests: limpia la memoria.
function _reset() { mem.clear(); enVuelo.clear(); }

module.exports = { swr, set, get, del, waitUntil, _reset, hayRuntime: () => Boolean(runtime) };
