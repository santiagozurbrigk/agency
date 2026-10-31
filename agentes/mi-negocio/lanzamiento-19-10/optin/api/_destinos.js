// A dónde reenvía la landing cada evento (registro, visita, grupo, aplicación).
// No es una ruta: Vercel no publica los archivos de api/ que empiezan con "_".
//
// Variables de entorno de Vercel (las URLs terminan en /optin; el resto se deriva
// cambiando el final por /visita, /grupo o /aplicacion):
//   TRACKING_OPTIN_URL    tracker viejo: https://tracking-genesis.vercel.app/api/public/optin
//   CAMPUS_INGEST_URL     campus:        https://zanwrwysbmvgytfzymaz.supabase.co/functions/v1/ingest/optin
//   GENESIS_INGEST_SECRET secreto del campus (va en el header X-Genesis-Secret, solo al campus,
//                         junto con x-region: sa-east-1)
// Mientras estén las dos URLs, cada evento va a los dos lados. Para cortar el tracker viejo,
// se borra TRACKING_OPTIN_URL.

function destinos(evento) {
  const lista = [];
  const viejo = process.env.TRACKING_OPTIN_URL;
  const campus = process.env.CAMPUS_INGEST_URL;
  if (viejo) lista.push({ nombre: "tracker", url: viejo.replace(/\/optin\/?$/, "/" + evento), headers: {} });
  if (campus) {
    // La base del campus está en São Paulo: forzar la región de la Edge Function baja
    // la respuesta de ~450 ms a ~100 ms (importa en /aplicacion, el lead espera el WhatsApp).
    const headers = { "x-region": "sa-east-1" };
    if (process.env.GENESIS_INGEST_SECRET) headers["X-Genesis-Secret"] = process.env.GENESIS_INGEST_SECRET;
    lista.push({ nombre: "campus", url: campus.replace(/\/optin\/?$/, "/" + evento), headers });
  }
  return lista;
}

// POST JSON a un destino. Devuelve { ok, data } y nunca tira error.
async function enviar(d, body) {
  try {
    const r = await fetch(d.url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...d.headers },
      body: JSON.stringify(body)
    });
    const data = await r.json().catch(() => ({}));
    return { ok: r.ok && data.ok !== false, data };
  } catch (e) {
    return { ok: false, data: {} };
  }
}

function leerBody(req) {
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { return null; } }
  return body || {};
}

module.exports = { destinos, enviar, leerBody };
