// Métricas del lanzamiento (punto 11 de la especificación).

const { requiere } = require("../lib/auth");
const store = require("../lib/store");
const R = require("../lib/rules");

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

    return res.status(200).json({
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
