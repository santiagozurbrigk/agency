// Formulario público de Agenda directa (link 1 de la clase).
// Guarda las respuestas, decide Manu o Diego (regla 5.2), reserva el lugar de Manu
// 3 minutos y devuelve el link del calendario con los datos precargados.
//
// Es el camino más cargado de la noche de la clase (todos agendan a la vez):
// responde al instante con lo que hay en caché (la foto de leads, la carga de Manu,
// la configuración) y guarda en GHL en segundo plano.

const store = require("../../lib/store");
const R = require("../../lib/rules");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Método no permitido" });
  }
  try {
    let body = req.body;
    if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { return res.status(400).json({ ok: false, error: "JSON inválido" }); } }
    const { telefono, objetivo, freno, hace_cuanto, ciclo, facturacion, inversion } = body || {};
    if (!telefono) return res.status(400).json({ ok: false, error: "Falta el WhatsApp" });

    const [s, conocido] = await Promise.all([store.getSettings(), store.enFoto(telefono, null)]);

    const respuestas = {
      objetivo: objetivo || "", freno: freno || "", hace_cuanto: hace_cuanto || "",
      ciclo: ciclo || "", facturacion: facturacion || "", inversion: inversion || "",
      form_agenda: "Sí", asistio: "Sí"
    };

    // Guarda en GHL: lee la ficha completa (o la busca en toda la subcuenta) y escribe todo junto.
    const guardar = (fields, que, clave) => store.enSegundoPlano(async () => {
      const lead = conocido ? await store.getLead(conocido.id) : await store.findLead(telefono, null);
      let final;
      if (lead) {
        if (fields.etapa === undefined && (lead.fields || {}).etapa === "Próximo ciclo") fields = { ...fields, etapa: "En conversación" };
        final = await store.updateLead(lead.id, {
          fields: { ...fields, historial_json: store.historialCon(lead, "Sistema", que) },
          addTags: ["agenda-directa"]
        }, lead);
      } else {
        final = await store.createLead({
          nombre: body.nombre || "", telefono,
          fields: { etapa: "Nuevo", ...fields, posible_duplicado: "Sí", intentos: "0",
            historial_json: store.historialCon(null, "Sistema", que) },
          tags: ["agenda-directa"]
        });
      }
      if (clave && final) await store.renombrarReserva(clave, final.id);
    });

    // Menos de USD 1.000 → "Por el momento no podemos ayudarte" + Próximo ciclo (regla 5.4).
    if (inversion === "Menos de USD 1.000") {
      if (conocido) await store.liberarReserva(conocido.id);
      await guardar({ ...respuestas, etapa: "Próximo ciclo" }, "Agenda directa: inversión < USD 1.000 → Próximo ciclo", null);
      return res.status(200).json({ ok: true, ruta: "rechazado" });
    }

    // Regla 5.2 con el tope de Manu (citas + reservas vivas). La decisión y la
    // reserva se hacen juntas y de a una, para no pasarse del tope en una ráfaga.
    const clave = conocido ? conocido.id : "tel:" + store.normTel(telefono);
    const ruta = await store.decidirYReservar(clave, (manuLibre) =>
      R.rutaAgendaDirecta({ ciclo, facturacion, inversion }, manuLibre));
    const con = ruta === "manu" ? "Manu" : "Diego";

    await guardar({ ...respuestas, llamada_con: con }, `Agenda directa completada → calendario de ${con}`,
      ruta === "manu" ? clave : null);

    // Datos precargados para el widget del calendario de GHL.
    const base = ruta === "manu" ? s.calManuPostLink : s.calDiegoLink;
    let link = base || "";
    if (link) {
      const u = new URL(link);
      const nombre = (conocido && conocido.nombre) || body.nombre || "";
      if (nombre) {
        const p = nombre.trim().split(/\s+/);
        u.searchParams.set("first_name", p.shift());
        if (p.length) u.searchParams.set("last_name", p.join(" "));
      }
      if (conocido && conocido.email) u.searchParams.set("email", conocido.email);
      u.searchParams.set("phone", (conocido && conocido.telefono) || telefono);
      link = u.toString();
    }

    return res.status(200).json({
      ok: true, ruta, link,
      reservaMin: ruta === "manu" ? store.RESERVA_MIN : null,
      sinCalendario: !base
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
