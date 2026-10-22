// Devuelve todos los leads con las colas ya calculadas y ordenadas,
// más la carga de Manu y los contadores.

const { requiere } = require("../lib/auth");
const store = require("../lib/store");
const R = require("../lib/rules");
const P = require("../lib/post");

module.exports = async function handler(req, res) {
  if (!requiere(req, res)) return;
  try {
    const [leads, manu, settings] = await Promise.all([
      store.listLeads(), store.cargaManu(), store.getSettings()
    ]);

    for (const l of leads) {
      const calculado = R.grupoDelLead(l);
      l.calc = {
        califica: R.calificaGenesis(l.fields),
        consumible: R.esConsumible(l.fields.ciclo),
        // El grupo guardado (armado o corregido a mano) manda, salvo que el lead
        // haya agendado después: agendar siempre lo pasa al Grupo 1.
        grupo: calculado === "1" ? "1" : (l.fields.grupo || calculado)
      };
    }

    const etapa = (l) => l.fields.etapa || "Nuevo";
    const activo = (l) => etapa(l) !== "Próximo ciclo" && !etapa(l).startsWith("Venta");

    // Proceso post webinar: los que aplicaron desde postDesde (hora de Argentina) o ya tienen estado.
    const postDesde = settings.postDesde ? new Date(settings.postDesde + "T00:00:00-03:00").getTime() : 0;
    const enPost = (l) => Boolean(l.fields.post_estado) ||
      ((l.tags || []).includes("aplicacion-19-10") && l.fields.etapa !== "Próximo ciclo" &&
        new Date(l.fields.aplico_at || 0).getTime() >= postDesde);

    const colas = {
      primerContacto: leads.filter(l => activo(l) && etapa(l) === "Nuevo")
        .sort(R.ordenPrimerContacto).map(l => l.id),

      seguimiento: leads.filter(l => activo(l) &&
        ["Contactado", "En conversación", "Sin respuesta", "Califica · pre-venta",
         "Ruta a la clase", "Confirmado para la clase"].includes(etapa(l)))
        .sort(R.ordenPrimerContacto).map(l => l.id),

      grupo1: leads.filter(l => activo(l) && l.calc.grupo === "1")
        .sort(R.porFacturacion).map(l => l.id),

      grupo2: leads.filter(l => activo(l) && l.calc.grupo === "2")
        .sort(R.ordenGrupo2).map(l => l.id),

      grupo3: leads.filter(l => activo(l) && l.calc.grupo === "3" && l.fields.asistio === "No")
        .sort(R.porFacturacion).map(l => l.id),

      llamadas: leads.filter(l => activo(l) &&
        (l.fields.agendo === "Sí" || ["Agendado con Manu (pre-venta)", "Llamada agendada",
          "Canceló · a reagendar", "No se presentó · a reagendar", "No cerró · seguimiento"].includes(etapa(l))))
        .sort(R.porFacturacion).map(l => l.id),

      ventas: leads.filter(l => etapa(l).startsWith("Venta")).map(l => l.id),

      aplicaciones: leads.filter(l => (l.tags || []).includes("aplicacion-19-10"))
        .sort((a, b) => String(b.fields.aplico_at || b.creado || "").localeCompare(String(a.fields.aplico_at || a.creado || "")))
        .map(l => l.id),

      proximoCiclo: leads.filter(l => etapa(l) === "Próximo ciclo").map(l => l.id),

      post: leads.filter(enPost)
        .sort((a, b) => (P.ESTADOS.indexOf(a.fields.post_estado || "Nuevo lead") - P.ESTADOS.indexOf(b.fields.post_estado || "Nuevo lead"))
          || String(b.fields.aplico_at || b.creado || "").localeCompare(String(a.fields.aplico_at || a.creado || "")))
        .map(l => l.id)
    };

    const genesisVendidos = leads.filter(l => etapa(l) === "Venta Génesis").length;

    return res.status(200).json({
      ok: true, leads, colas, manu, settings,
      contadores: { genesisVendidos, genesisLugares: settings.genesisLugares }
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
