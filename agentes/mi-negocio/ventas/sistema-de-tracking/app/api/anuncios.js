// Atribución de anuncios: números del período y series por día (hora de Argentina).
// Fase 1: todo lo que sale de los leads y de las visitas a la landing.
// Fase 2 (Meta Ads): inversión, CPL, CPM y panel de anuncios se suman acá.
//
// Definiciones:
//   pauta       = fuente «Anuncios de Meta» (UTMs / fbclid del anuncio)
//   calificado  = invierte 100 dólares por día o más en Meta (leads viejos: facturación de 30M o más);
//                 mismo criterio que el Lead del píxel
//   contactado  = tiene algún intento o ya salió de «Nuevo»
//   contestó    = llegó a «En conversación» o a una etapa posterior
//   agendó      = pre-venta con Manu o llamada de venta
//   calif. real = el SDR confirmó la facturación («Facturación confirmada» = Sí)

const { requiere } = require("../lib/auth");
const store = require("../lib/store");
const { fuenteDe } = require("../lib/fuente");
const { calificaOptin } = require("../lib/rules");
const meta = require("../lib/meta");

const SIN_CONTESTAR = ["Nuevo", "Contactado", "Sin respuesta"];
const PAUTA = "Anuncios de Meta";
const DIA_RE = /^\d{4}-\d{2}-\d{2}$/;

function diasEntre(desde, hasta) {
  const out = [];
  for (let t = Date.parse(desde + "T12:00:00Z"); out.length < 120; t += 864e5) {
    const d = new Date(t).toISOString().slice(0, 10);
    if (d > hasta) break;
    out.push(d);
  }
  return out;
}
const pct = (a, b) => (b ? Math.round((a / b) * 1000) / 10 : null);

const div = (a, b) => (b ? Math.round((a / b) * 100) / 100 : null);
const norm = (x) => String(x || "").trim().toLowerCase();

// Une los números de Meta con los leads de pauta.
// Cada lead se asigna a un anuncio por ad_id; si no, por el nombre del anuncio (utm_content),
// desempatando por conjunto (utm_term) y campaña (utm_campaign).
function cruzarMeta(d, pauta, porDia) {
  const ads = d.anuncios.map(a => ({ ...a, leads: 0, calif: 0, agendas: 0, ventas: 0 }));
  let sinCruzar = 0;
  for (const l of pauta) {
    const u = l.utm;
    let c = ads.filter(a => (u.adId && a.adId === u.adId) || (u.anuncio && (norm(a.anuncio) === norm(u.anuncio) || a.adId === u.anuncio)));
    if (c.length > 1 && u.conjunto) { const x = c.filter(a => norm(a.conjunto) === norm(u.conjunto) || a.conjuntoId === u.conjunto); if (x.length) c = x; }
    if (c.length > 1 && u.campana) { const x = c.filter(a => norm(a.campana) === norm(u.campana) || a.campanaId === u.campana); if (x.length) c = x; }
    if (!c.length) { sinCruzar++; continue; }
    const a = c[0];
    a.leads++; if (l.calif) a.calif++; if (l.agendo) a.agendas++; if (l.venta) a.ventas++;
  }
  const metricas = (x) => ({
    cpl: div(x.inversion, x.leads), cplCalif: div(x.inversion, x.calif),
    cpm: x.impresiones ? Math.round((x.inversion / x.impresiones) * 100000) / 100 : null,
    ctr: pct(x.clics, x.impresiones), clicALanding: pct(x.lpv, x.clics), convLanding: pct(x.leads, x.lpv)
  });
  const t = d.total, leads = pauta.length, calif = pauta.filter(l => l.calif).length;
  const resumen = { ...t, leads, calif, ...metricas({ ...t, leads, calif }) };
  const dia = Object.fromEntries(d.porDia.map(x => [x.dia, x]));
  const serie = porDia.map(p => {
    const x = dia[p.dia] || { inversion: 0, impresiones: 0, clics: 0, lpv: 0 };
    return { dia: p.dia, inversion: x.inversion, ...metricas({ ...x, leads: p.leadsPauta, calif: p.califPauta }) };
  });
  return {
    resumen, porDia: serie, sinCruzar,
    anuncios: ads.map(a => ({ ...a, ...metricas(a) }))
  };
}

module.exports = async function handler(req, res) {
  if (!requiere(req, res)) return;
  try {
    const [todos, visitasRaw] = await Promise.all([store.listLeads(), store.getVisitas().catch(() => ({}))]);
    const hoy = store.diaAR();

    // Leads del opt-in, clasificados una vez.
    const leads = todos.filter(l => (l.tags || []).includes("optin-19-10")).map(l => {
      let o = {};
      try { o = JSON.parse(l.fields.origen || "{}") || {}; } catch (e) {}
      const f = l.fields, etapa = f.etapa || "Nuevo";
      const calif = calificaOptin(f);
      return {
        dia: l.creado ? store.diaAR(l.creado) : hoy,
        pauta: fuenteDe(o) === PAUTA, calif,
        contactado: (parseInt(f.intentos || "0", 10) || 0) > 0 || etapa !== "Nuevo",
        contesto: !SIN_CONTESTAR.includes(etapa),
        agendo: f.agendo === "Sí" || etapa === "Agendado con Manu (pre-venta)" || etapa === "Llamada agendada",
        confirmada: f.facturacion_confirmada === "Sí",
        grupo: f.toco_grupo === "Sí",
        venta: Boolean(f.venta_json),
        utm: { campana: o.utm_campaign || "", conjunto: o.utm_term || "", anuncio: o.utm_content || "", adId: o.ad_id || "" },
        ab: /^[a-z0-9-]{1,20}$/i.test(o.ab || "") ? o.ab : ""
      };
    });

    // Visitas: claves "día|fuente|ab".
    const visitas = [];
    for (const [k, n] of Object.entries(visitasRaw || {})) {
      const p = k.split("|");
      if (p.length >= 2 && DIA_RE.test(p[0])) visitas.push({ dia: p[0], pauta: p[1] === PAUTA, ab: p[2] || "", n });
    }

    // Rango: ?desde=AAAA-MM-DD&hasta=AAAA-MM-DD; sin rango = todo el lanzamiento.
    let desde = DIA_RE.test(req.query.desde || "") ? req.query.desde : null;
    let hasta = DIA_RE.test(req.query.hasta || "") ? req.query.hasta : hoy;
    if (!desde) {
      const primeros = leads.map(l => l.dia).concat(visitas.map(v => v.dia)).sort();
      desde = primeros[0] || hoy;
    }
    if (desde > hasta) [desde, hasta] = [hasta, desde];
    const dias = diasEntre(desde, hasta);
    if (dias.length) desde = dias[0];
    const enRango = (d) => d >= desde && d <= (dias[dias.length - 1] || hasta);
    const L = leads.filter(l => enRango(l.dia));
    const V = visitas.filter(v => enRango(v.dia));

    const cuenta = (arr, fn) => arr.reduce((a, x) => a + (fn(x) ? 1 : 0), 0);
    const sumaV = (arr, fn) => arr.reduce((a, v) => a + (fn(v) ? v.n : 0), 0);
    function resumen(ls, vs) {
      const P = ls.filter(l => l.pauta), C = ls.filter(l => l.calif);
      const contactados = cuenta(ls, l => l.contactado);
      const visPauta = sumaV(vs, v => v.pauta);
      return {
        leadsTotal: ls.length, leadsPauta: P.length, leadsSinAnuncio: ls.length - P.length,
        califPauta: cuenta(P, l => l.calif), califTodos: C.length,
        pctCalifPauta: pct(cuenta(P, l => l.calif), P.length),
        visitasPauta: visPauta, visitasTodas: sumaV(vs, () => true),
        convLandingPauta: pct(P.length, visPauta), convCalifPauta: pct(cuenta(P, l => l.calif), visPauta),
        tocaronGrupo: cuenta(ls, l => l.grupo), tocaronGrupoPauta: cuenta(P, l => l.grupo),
        pctGrupoTodos: pct(cuenta(ls, l => l.grupo), ls.length), pctGrupoPauta: pct(cuenta(P, l => l.grupo), P.length),
        tasaContacto: pct(contactados, ls.length), pickup: pct(cuenta(ls, l => l.contactado && l.contesto), contactados),
        pctContestaron: pct(cuenta(ls, l => l.contesto), ls.length),
        califReal: pct(cuenta(C, l => l.confirmada), C.length),
        tasaAgenda: pct(cuenta(C, l => l.agendo), C.length)
      };
    }

    const porDia = dias.map(d => ({ dia: d, ...resumen(L.filter(l => l.dia === d), V.filter(v => v.dia === d)) }));

    // Test del titular: A/B o landing por dolor (cpa, margen, meta). Solo si hay datos con versión.
    let ab = null;
    const versiones = [...new Set(L.map(l => l.ab).concat(V.map(v => v.ab)).filter(Boolean))].sort();
    if (versiones.length) {
      ab = versiones.map(x => {
        const ls = L.filter(l => l.ab === x), vis = sumaV(V, v => v.ab === x), cal = cuenta(ls, l => l.calif);
        return { version: x, visitantes: vis, leads: ls.length, conversion: pct(ls.length, vis), calificados: cal, pctCalif: pct(cal, ls.length), califPorVisitante: pct(cal, vis) };
      });
    }

    // Fase 2: Meta Ads. Si falla, el resto del panel sigue andando y se muestra el error.
    let m = null;
    if (meta.enabled()) {
      try {
        m = cruzarMeta(await meta.datos(desde, dias[dias.length - 1] || hasta), L.filter(l => l.pauta), porDia);
      } catch (e) {
        m = { error: e.message };
      }
    }

    return res.status(200).json({ ok: true, desde, hasta: dias[dias.length - 1] || hasta, resumen: resumen(L, V), porDia, ab, meta: m });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
