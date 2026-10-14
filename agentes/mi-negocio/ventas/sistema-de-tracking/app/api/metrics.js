// Métricas del lanzamiento (punto 11 de la especificación).

const { requiere } = require("../lib/auth");
const store = require("../lib/store");
const R = require("../lib/rules");
const { OPCIONES } = require("../lib/fields");
const { fuenteDe } = require("../lib/fuente");

module.exports = async function handler(req, res) {
  if (!requiere(req, res)) return;
  try {
    const [leads, settings, manu, visitas] = await Promise.all([
      store.listLeads(), store.getSettings(), store.cargaManu(), store.getVisitas().catch(() => ({}))
    ]);

    const etapa = (l) => l.fields.etapa || "Nuevo";
    const total = leads.length;
    const contactados = leads.filter(l => etapa(l) !== "Nuevo").length;
    const enConversacion = leads.filter(l => !["Nuevo", "Contactado", "Sin respuesta"].includes(etapa(l))).length;
    const calificados = leads.filter(l => R.calificaGenesis(l.fields)).length;
    const agendadosPre = leads.filter(l => etapa(l) === "Agendado con Manu (pre-venta)").length;
    const agendadosPost = leads.filter(l => l.fields.agendo === "Sí").length;
    const confirmados = leads.filter(l => l.fields.confirmo_clase === "Sí").length;
    const asistieron = leads.filter(l => l.fields.asistio === "Sí").length;
    const presentados = leads.filter(l => l.fields.se_presento === "Sí").length;

    const ventas = [];
    for (const l of leads) {
      try {
        const v = JSON.parse(l.fields.venta_json || "null");
        if (v) ventas.push({ lead: l.nombre, ...v });
      } catch (e) {}
    }
    const suma = (arr) => arr.reduce((a, b) => a + b, 0);
    const porOferta = {};
    for (const v of ventas) {
      const o = porOferta[v.oferta] || (porOferta[v.oferta] = { cantidad: 0, total: 0, cobrado: 0 });
      o.cantidad++;
      o.total += suma(v.pagos.map(p => p.monto));
      o.cobrado += suma(v.pagos.filter(p => p.pagado).map(p => p.monto));
    }


    const grupos = { "1": 0, "2": 0, "3": 0 };
    for (const l of leads) {
      const g = l.fields.grupo || R.grupoDelLead(l);
      if (grupos[g] != null) grupos[g]++;
    }

    // Distribuciones para los gráficos: cuenta por opción, en el orden del formulario.
    const contar = (key, opciones) => {
      const c = Object.fromEntries(opciones.map(o => [o, 0]));
      let sinDato = 0;
      for (const l of leads) {
        const v = key === "etapa" ? etapa(l) : l.fields[key];
        if (!v) sinDato++;
        else if (c[v] != null) c[v]++;
        else c["Otro"] = (c["Otro"] || 0) + 1;
      }
      return { valores: Object.entries(c).map(([op, n]) => ({ op, n })), sinDato };
    };
    const intentos = { "0": 0, "1": 0, "2": 0, "3": 0, "4+": 0 };
    for (const l of leads) {
      const n = parseInt(l.fields.intentos || "0", 10) || 0;
      intentos[n >= 4 ? "4+" : String(n)]++;
    }
    const ORIGEN = { "optin-19-10": "Opt-in de la landing", "agenda-directa": "Agenda directa (link 1)", "quiero-contacto": "Quiero que me contacten (link 2)" };
    const origen = Object.fromEntries(Object.values(ORIGEN).map(o => [o, 0]));
    for (const l of leads) for (const t of l.tags || []) if (ORIGEN[t]) origen[ORIGEN[t]]++;

    // Leads por anuncio (UTMs que guarda la landing en «Origen (UTM)»).
    // "Califica" = el mismo criterio que el Lead del píxel (inversión en Meta de 100 dólares por día
    // o más; los leads viejos, facturación de 30M para arriba).
    const anuncios = {};
    for (const l of leads) {
      let o = {};
      try { o = JSON.parse(l.fields.origen || "{}") || {}; } catch (e) {}
      // Solo anuncios de Meta: lo orgánico (bio, reels, historias) va en «Por fuente».
      if (fuenteDe(o) !== "Anuncios de Meta") continue;
      const nombre = o.utm_content || (o.ad_id ? `Anuncio ${o.ad_id}` : "Anuncio sin nombre");
      const a = anuncios[nombre] || (anuncios[nombre] = { anuncio: nombre, campana: o.utm_campaign || "", conjunto: o.utm_term || "", leads: 0, califican: 0, ventas: 0, lista: [] });
      const califica = R.calificaOptin(l.fields);
      a.leads++;
      if (califica) a.califican++;
      if (l.fields.venta_json) a.ventas++;
      a.lista.push({ id: l.id, nombre: l.nombre || "", creado: l.creado || null, facturacion: l.fields.inversion_meta ? l.fields.inversion_meta + " por día" : (l.fields.facturacion || ""),
        etapa: l.fields.etapa || "Nuevo", califica, venta: Boolean(l.fields.venta_json), conjunto: o.utm_term || "" });
    }
    // Por fuente: visitas a la landing (aprox.) contra registros del opt-in.
    const fuentes = {};
    const f = (n) => fuentes[n] || (fuentes[n] = { fuente: n, visitas: 0, registros: 0, califican: 0 });
    // Claves "día|fuente|ab" (las viejas eran solo la fuente).
    for (const [k, v] of Object.entries(visitas || {})) { const p = k.split("|"); f(p.length >= 2 ? p[1] : k).visitas += v; }
    for (const l of leads) {
      if (!(l.tags || []).includes("optin-19-10")) continue;
      let o = {};
      try { o = JSON.parse(l.fields.origen || "{}") || {}; } catch (e) {}
      const x = f(fuenteDe(o));
      x.registros++;
      if (R.calificaOptin(l.fields)) x.califican++;
    }
    const porFuente = Object.values(fuentes).sort((a, b) => b.registros - a.registros || b.visitas - a.visitas);

    for (const a of Object.values(anuncios)) a.lista.sort((x, y) => String(y.creado).localeCompare(String(x.creado)));
    const porAnuncio = Object.values(anuncios).sort((x, y) => y.califican - x.califican || y.leads - x.leads);

    // Opt-ins por día (hora de Argentina), desde el primero hasta hoy, máximo 30 días.
    const diaAR = (iso) => new Date(new Date(iso).getTime() - 3 * 3600e3).toISOString().slice(0, 10);
    const porDiaMapa = {};
    for (const l of leads) if (l.creado) { const d = diaAR(l.creado); porDiaMapa[d] = (porDiaMapa[d] || 0) + 1; }
    const hoy = diaAR(new Date().toISOString());
    const primero = Object.keys(porDiaMapa).sort()[0] || hoy;
    const porDia = [];
    for (let t = Date.parse(hoy + "T12:00:00Z"); porDia.length < 30; t -= 864e5) {
      const d = new Date(t).toISOString().slice(0, 10);
      porDia.unshift({ dia: d, n: porDiaMapa[d] || 0 });
      if (d <= primero && porDia.length >= 7) break;
    }

    return res.status(200).json({
      distribucion: {
        inversion_meta: contar("inversion_meta", OPCIONES.inversion_meta),
        facturacion: contar("facturacion", OPCIONES.facturacion),
        ciclo: contar("ciclo", OPCIONES.ciclo),
        inversion: contar("inversion", OPCIONES.inversion),
        etapa: contar("etapa", OPCIONES.etapa),
        intentos: Object.entries(intentos).map(([op, n]) => ({ op, n })),
        origen: Object.entries(origen).map(([op, n]) => ({ op, n }))
      },
      porDia, porAnuncio, porFuente,
      ok: true,
      embudo: { total, contactados, enConversacion, calificados, agendadosPre, agendadosPost, confirmados, asistieron, presentados, ventas: ventas.length },
      porOferta, grupos,
      manu,
      genesis: { vendidos: (porOferta["Génesis"] || {}).cantidad || 0, lugares: settings.genesisLugares },
      cierre: settings.cierre
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
