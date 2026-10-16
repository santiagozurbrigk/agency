// Meta Ads (Marketing API), solo lectura: inversión, impresiones, clics y vistas de la landing.
// Variables: META_ACCESS_TOKEN (token de usuario del sistema con ads_read) y
// META_AD_ACCOUNT_ID (número de la cuenta publicitaria, con o sin «act_»).
// Opcional: META_API_VERSION (por defecto v24.0).
//
// Los días son los de la zona horaria de la cuenta publicitaria en Meta.
// Se guarda en memoria 5 minutos por rango, para no pegarle a Meta en cada recarga.

const VERSION = process.env.META_API_VERSION || "v24.0";
const TTL = 5 * 60 * 1000;
const cache = new Map(); // clave -> { at, v }

// Acepta el número solo, «act_123», «act=123» o la URL del Administrador de anuncios.
function config() {
  const token = String(process.env.META_ACCESS_TOKEN || "").trim();
  const crudo = String(process.env.META_AD_ACCOUNT_ID || "");
  const m = crudo.match(/act[_=](\d+)/) || crudo.match(/\d{5,}/g);
  const cuenta = m ? (m[1] && /act/.test(m[0]) ? m[1] : m[0]) : "";
  return { token, cuenta, hayToken: Boolean(token), hayCuenta: Boolean(crudo.trim()) };
}
function enabled() {
  const { token, cuenta } = config();
  return Boolean(token && cuenta);
}
// Por qué no está conectado (null si no hay nada cargado: Meta todavía no se usa).
function problema() {
  const c = config();
  if (enabled() || (!c.hayToken && !c.hayCuenta)) return null;
  if (!c.hayToken) return "Falta META_ACCESS_TOKEN en Vercel (o no se aplicó: hace falta un deploy después de cargarla).";
  if (!c.hayCuenta) return "Falta META_AD_ACCOUNT_ID en Vercel (o no se aplicó: hace falta un deploy después de cargarla).";
  return "META_AD_ACCOUNT_ID no tiene un número de cuenta publicitaria válido. Tiene que ser el número que aparece después de act= en el Administrador de anuncios.";
}

// GET a la Graph API siguiendo la paginación. El token nunca aparece en los errores.
async function get(ruta, params) {
  const { token } = config();
  const qs = new URLSearchParams({ ...params, access_token: token });
  let url = `https://graph.facebook.com/${VERSION}/${ruta}?${qs}`;
  const filas = [];
  for (let paginas = 0; url && paginas < 20; paginas++) {
    let d;
    try {
      const r = await fetch(url);
      d = await r.json();
    } catch (e) {
      throw new Error("No se pudo conectar con Meta");
    }
    if (d.error) throw new Error(`Meta: ${String(d.error.message || "error").split(token).join("…")}`);
    filas.push(...(d.data || []));
    url = d.paging && d.paging.next;
  }
  return filas;
}

const num = (v) => { const n = Number(v); return Number.isFinite(n) ? n : 0; };
const accion = (fila, tipo) => num(((fila.actions || []).find(a => a.action_type === tipo) || {}).value);

// Normaliza una fila de insights.
function fila(f) {
  return {
    inversion: num(f.spend), impresiones: num(f.impressions), clics: num(f.inline_link_clicks),
    alcance: num(f.reach), frecuencia: num(f.frequency) || null, lpv: accion(f, "landing_page_view")
  };
}

// Todo lo de Meta para un rango de días (AAAA-MM-DD).
async function datos(desde, hasta) {
  const { cuenta } = config();
  const clave = `${cuenta}|${desde}|${hasta}`;
  const c = cache.get(clave);
  if (c && Date.now() - c.at < TTL) return c.v;

  const rango = JSON.stringify({ since: desde, until: hasta });
  const base = "spend,impressions,inline_link_clicks,actions";
  const act = `act_${cuenta}`;
  const [total, dias, ads, estados] = await Promise.all([
    get(`${act}/insights`, { level: "account", time_range: rango, fields: base + ",reach,frequency" }),
    get(`${act}/insights`, { level: "account", time_range: rango, time_increment: "1", fields: base, limit: "500" }),
    get(`${act}/insights`, { level: "ad", time_range: rango, limit: "500",
      fields: base + ",reach,frequency,campaign_id,campaign_name,adset_id,adset_name,ad_id,ad_name" }),
    get(`${act}/ads`, { fields: "id,effective_status", limit: "500" }).catch(() => [])
  ]);

  const estadoDe = Object.fromEntries(estados.map(a => [a.id, a.effective_status]));
  const v = {
    total: fila(total[0] || {}),
    porDia: dias.map(d => ({ dia: d.date_start, ...fila(d) })),
    anuncios: ads.map(a => ({
      campanaId: a.campaign_id, campana: a.campaign_name || "", conjuntoId: a.adset_id, conjunto: a.adset_name || "",
      adId: a.ad_id, anuncio: a.ad_name || "", activo: estadoDe[a.ad_id] === "ACTIVE", ...fila(a)
    }))
  };
  cache.set(clave, { at: Date.now(), v });
  return v;
}

module.exports = { enabled, problema, datos };
