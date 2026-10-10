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

    // Por persona: dueño para la gestión, vendedor para los cierres.
    const porPersona = {};
    const p = (n) => porPersona[n] || (porPersona[n] = { leads: 0, contactados: 0, calificados: 0, agendas: 0, cierres: 0, facturado: 0 });
    for (const l of leads) {
      const d = l.fields.dueno;
      if (d) {
        const x = p(d);
        x.leads++;
        if (etapa(l) !== "Nuevo") x.contactados++;
        if (R.calificaGenesis(l.fields)) x.calificados++;
        if (l.fields.agendo === "Sí" || etapa(l) === "Agendado con Manu (pre-venta)") x.agendas++;
      }
    }
    for (const v of ventas) {
      const x = p(v.vendedor || "—");
      x.cierres++;
      x.facturado += suma(v.pagos.map(p2 => p2.monto));
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
    // "Califica" = facturación de 30M para arriba, el mismo criterio que el Lead del píxel.
    const FACT_OK = ["Entre 30M y 50M", "Entre 50M y 100M", "Más de 100M"];
    const anuncios = {};
    for (const l of leads) {
      let o = {};
      try { o = JSON.parse(l.fields.origen || "{}") || {}; } catch (e) {}
      const nombre = o.utm_content || (o.ad_id ? `Anuncio ${o.ad_id}` : (l.tags || []).includes("optin-19-10") ? "Sin datos de anuncio" : null);
      if (!nombre) continue;
      const a = anuncios[nombre] || (anuncios[nombre] = { anuncio: nombre, campana: o.utm_campaign || "", conjunto: o.utm_term || "", leads: 0, califican: 0, ventas: 0 });
      a.leads++;
      if (FACT_OK.includes(l.fields.facturacion)) a.califican++;
      if (l.fields.venta_json) a.ventas++;
    }
    // Por fuente: visitas a la landing (aprox.) contra registros del opt-in.
    const fuentes = {};
    const f = (n) => fuentes[n] || (fuentes[n] = { fuente: n, visitas: 0, registros: 0, califican: 0 });
    for (const [n, v] of Object.entries(visitas || {})) f(n).visitas = v;
    for (const l of leads) {
      if (!(l.tags || []).includes("optin-19-10")) continue;
      let o = {};
      try { o = JSON.parse(l.fields.origen || "{}") || {}; } catch (e) {}
      const x = f(fuenteDe(o));
      x.registros++;
      if (FACT_OK.includes(l.fields.facturacion)) x.califican++;
    }
    const porFuente = Object.values(fuentes).sort((a, b) => b.registros - a.registros || b.visitas - a.visitas);

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
      porOferta, porPersona, grupos,
      manu,
      genesis: { vendidos: (porOferta["Génesis"] || {}).cantidad || 0, lugares: settings.genesisLugares },
      cierre: settings.cierre
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
