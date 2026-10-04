// Formulario público de Agenda directa (link 1 de la clase).
// POST paso 1: guarda las respuestas, decide Manu o Diego (regla 5.2),
// reserva el lugar de Manu 3 minutos y devuelve el link del calendario con los datos precargados.

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

    // Une con la ficha del opt-in por el WhatsApp; si no está, crea el lead como posible duplicado.
    let lead = await store.findLead(telefono, null);
    const fields = {
      objetivo: objetivo || "", freno: freno || "", hace_cuanto: hace_cuanto || "",
      ciclo: ciclo || "", facturacion: facturacion || "", inversion: inversion || "",
      form_agenda: "Sí", asistio: "Sí"
    };
    if (!lead) {
      lead = await store.createLead({
        nombre: body.nombre || "", telefono,
        fields: { ...fields, etapa: "Nuevo", posible_duplicado: "Sí", intentos: "0" },
        tags: ["agenda-directa"]
      });
    } else {
      await store.updateLead(lead.id, { fields, addTags: ["agenda-directa"] });
    }

    // Menos de USD 1.000 → "Por el momento no podemos ayudarte" + Próximo ciclo (regla 5.4).
    if (inversion === "Menos de USD 1.000") {
      await store.registrar(lead.id, "Sistema", "Agenda directa: inversión < USD 1.000 → Próximo ciclo", {
        etapa: "Próximo ciclo"
      });
      await store.liberarReserva(lead.id);
      return res.status(200).json({ ok: true, ruta: "rechazado" });
    }
    // Si vuelve a mandar el formulario con otra respuesta, se reactiva solo.
    if ((lead.fields || {}).etapa === "Próximo ciclo") {
      await store.updateLead(lead.id, { fields: { etapa: "En conversación" } });
    }

    // Regla 5.2 con el tope de Manu (citas + reservas vivas).
    const carga = await store.cargaManu();
    const manuLibre = carga.total < carga.tope;
    const ruta = R.rutaAgendaDirecta({ ciclo, facturacion, inversion }, manuLibre);

    const s = await store.getSettings();
    const base = ruta === "manu" ? s.calManuPostLink : s.calDiegoLink;
    if (ruta === "manu") await store.reservarManu(lead.id);

    await store.registrar(lead.id, "Sistema", `Agenda directa completada → calendario de ${ruta === "manu" ? "Manu" : "Diego"}`, {
      llamada_con: ruta === "manu" ? "Manu" : "Diego"
    });

    // Datos precargados para el widget del calendario de GHL (pendiente #8: validar el prefill).
    let link = base || "";
    if (link) {
      const u = new URL(link);
      if (lead.nombre) {
        const p = lead.nombre.trim().split(/\s+/);
        u.searchParams.set("first_name", p.shift());
        if (p.length) u.searchParams.set("last_name", p.join(" "));
      }
      if (lead.email) u.searchParams.set("email", lead.email);
      u.searchParams.set("phone", lead.telefono || telefono);
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
