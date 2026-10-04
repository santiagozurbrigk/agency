// Métricas del lanzamiento (punto 11 de la especificación).

const { requiere } = require("../lib/auth");
const store = require("../lib/store");
const R = require("../lib/rules");
const { OPCIONES } = require("../lib/fields");

module.exports = async function handler(req, res) {
  if (!requiere(req, res)) return;
  try {
    const [leads, settings, manu] = await Promise.all([
      store.listLeads(), store.getSettings(), store.cargaManu()
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
      porDia,
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
