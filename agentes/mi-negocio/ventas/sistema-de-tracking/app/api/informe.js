// Datos crudos para un informe de anuncios: el panel de Anuncios (Meta cruzado con los leads),
// la lista de leads de pauta con su UTM y si califican, y los creativos de cada anuncio.
// Entra con sesión o con la clave de informes (header x-informe-key = INFORME_KEY). Solo lectura.
// ?desde=AAAA-MM-DD&hasta=AAAA-MM-DD

const { sesion, sesionInterna, claveInforme } = require("../lib/auth");
const store = require("../lib/store");
const meta = require("../lib/meta");
const anuncios = require("./anuncios");
const { fuenteDe } = require("../lib/fuente");
const { calificaOptin } = require("../lib/rules");

// Llama a otro endpoint por dentro y devuelve lo que respondió.
function llamar(handler, query) {
  return new Promise((ok, mal) => {
    const res = { statusCode: 200, setHeader() {}, status(c) { this.statusCode = c; return this; },
      json(d) { ok(d); return this; }, end() { ok(null); return this; } };
    Promise.resolve(handler({ method: "GET", query, headers: { cookie: sesionInterna() } }, res)).catch(mal);
  });
}

module.exports = async function handler(req, res) {
  if (!sesion(req) && !claveInforme(req)) return res.status(401).json({ ok: false, error: "Sin acceso" });
  try {
    const query = {};
    for (const k of ["desde", "hasta"]) if (/^\d{4}-\d{2}-\d{2}$/.test(req.query[k] || "")) query[k] = req.query[k];
    const [panel, todos, creativos] = await Promise.all([
      llamar(anuncios, query), store.listLeads(), meta.enabled() ? meta.creativos().catch(e => ({ error: e.message })) : null
    ]);
    const leads = todos.filter(l => (l.tags || []).includes("optin-19-10")).map(l => {
      let o = {};
      try { o = JSON.parse(l.fields.origen || "{}") || {}; } catch (e) {}
      const f = l.fields;
      return { id: l.id, nombre: l.nombre || "", creado: l.creado || null, dia: l.creado ? store.diaAR(l.creado) : null,
        tags: (l.tags || []).filter(t => /optin|aplicacion|cliente/.test(t)), fuente: fuenteDe(o), califica: calificaOptin(f),
        utm: { campana: o.utm_campaign || "", conjunto: o.utm_term || "", anuncio: o.utm_content || "", adId: o.ad_id || "" },
        inversion_meta: f.inversion_meta || "", facturacion: f.facturacion || "", etapa: f.etapa || "Nuevo",
        asistio: f.asistio === "Sí", agendo: f.agendo === "Sí", toco_grupo: f.toco_grupo === "Sí",
        aplico: Boolean(f.aplico_at), inversion: f.inversion || "", venta: Boolean(f.venta_json) };
    });
    return res.status(200).json({ ok: true, panel, leads, creativos });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
