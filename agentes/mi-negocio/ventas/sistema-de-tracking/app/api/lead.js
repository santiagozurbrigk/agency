// Ficha de un lead y todas las acciones del equipo sobre él.
// GET  /api/lead?id=...
// POST /api/lead { id, action, data }

const { requiere, esAdmin } = require("../lib/auth");
const store = require("../lib/store");

const PRECIOS = {
  "Génesis": { PIF: [5000], "2 cuotas": [2850, 2850], "3 cuotas": [2000, 2000, 2000] },
  "Mentoría": { PIF: [2000], "2 cuotas": [1100, 1100] }
};

// Montos de cuotas cargados a mano: de 1 a 24, números mayores a 0 (redondeados a centavos).
function montosValidos(lista) {
  if (!Array.isArray(lista) || lista.length < 1 || lista.length > 24) return null;
  const montos = lista.map(m => Math.round(Number(m) * 100) / 100);
  return montos.every(m => Number.isFinite(m) && m > 0) ? montos : null;
}

// Día de pago elegido a mano. «AAAA-MM-DD» se guarda al mediodía de Argentina
// para que no se corra de día al mostrarlo. Devuelve null si no es una fecha.
function fechaPago(v) {
  if (!v) return null;
  const s = String(v);
  const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(s) ? s + "T12:00:00-03:00" : s);
  return isNaN(d) ? null : d.toISOString();
}

module.exports = async function handler(req, res) {
  const user = requiere(req, res);
  if (!user) return;

  try {
    if (req.method === "GET") {
      const lead = await store.getLead(req.query.id);
      if (!lead) return res.status(404).json({ ok: false, error: "Lead no encontrado" });
      return res.status(200).json({ ok: true, lead });
    }

    let body = req.body;
    if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
    const { id, action, data = {} } = body || {};
    if (!id || !action) return res.status(400).json({ ok: false, error: "Faltan id o action" });

    const lead = await store.getLead(id);
    if (!lead) return res.status(404).json({ ok: false, error: "Lead no encontrado" });
    const quien = user.name;

    // Eliminar: borra el contacto de GHL (no se puede deshacer).
    if (action === "eliminar") {
      if (!esAdmin(user)) return res.status(403).json({ ok: false, error: "Solo Santiago y Matías pueden eliminar leads" });
      await store.deleteLead(id);
      console.log("lead eliminado", JSON.stringify({ id, nombre: lead.nombre, email: lead.email, por: quien }));
      return res.status(200).json({ ok: true, eliminado: true });
    }

    let updated;
    switch (action) {

      // Editar campos de la ficha (incluye datos de contacto).
      case "campos": {
        const { nombre, email, telefono, ...fields } = data;
        updated = await store.updateLead(id, {
          nombre, email, telefono,
          fields: { ...fields, historial_json: store.historialCon(lead, quien, "Editó la ficha") }
        }, lead);
        break;
      }

      // +1 intento de contacto sin respuesta.
      case "intento": {
        const n = (parseInt(lead.fields.intentos || "0", 10) || 0) + 1;
        updated = await store.registrar(id, quien, `Intento de contacto #${n}`, {
          intentos: String(n), ultimo_contacto: new Date().toISOString()
        }, lead);
        break;
      }

      // Cambiar la etapa del proceso.
      case "etapa": {
        updated = await store.registrar(id, quien, `Etapa → ${data.etapa}`, {
          etapa: data.etapa, ultimo_contacto: new Date().toISOString()
        }, lead);
        break;
      }

      // Marcar sí/no: confirmo_clase, recurso_enviado, recurso_visto, asistio,
      // senal_compra, agendo, se_presento, excede_tope...
      case "marcar": {
        updated = await store.registrar(id, quien, `${data.campo} → ${data.valor}`, {
          [data.campo]: data.valor, ultimo_contacto: new Date().toISOString()
        }, lead);
        break;
      }

      // Reasignar dueño o quién toma la llamada.
      case "reasignar": {
        const fields = {};
        if (data.dueno) fields.dueno = data.dueno;
        if (data.llamada_con) { fields.llamada_con = data.llamada_con; fields.excede_tope = "No"; }
        updated = await store.registrar(id, quien,
          `Reasignado: ${[data.dueno && "dueño → " + data.dueno, data.llamada_con && "llamada → " + data.llamada_con].filter(Boolean).join(" · ")}`,
          fields, lead);
        break;
      }

      // Forzar el grupo (corrección manual).
      case "grupo": {
        updated = await store.registrar(id, quien, `Grupo → ${data.grupo}`, { grupo: data.grupo }, lead);
        break;
      }

      // Registrar la venta: oferta + forma de pago. Arma el plan de pagos.
      // Con forma «Personalizado» las cuotas vienen a mano en data.montos.
      case "venta": {
        const { oferta, forma, vendedor } = data;
        if (!PRECIOS[oferta]) return res.status(400).json({ ok: false, error: "Oferta inválida" });
        const montos = forma === "Personalizado" ? montosValidos(data.montos) : PRECIOS[oferta][forma];
        if (!montos) return res.status(400).json({ ok: false, error: "Forma de pago o montos inválidos" });
        const venta = {
          oferta, forma, vendedor: vendedor || quien,
          fecha: new Date().toISOString(),
          nota: String(data.nota || "").trim(),
          pagos: montos.map((m, i) => ({ n: i + 1, monto: m, pagado: false, fecha: null, comprobante: null }))
        };
        updated = await store.registrar(id, quien, `Venta ${oferta} · ${forma} · vendió ${venta.vendedor}`, {
          venta_json: JSON.stringify(venta),
          etapa: oferta === "Génesis" ? "Venta Génesis" : "Venta Mentoría"
        }, lead);
        break;
      }

      // Marcar un pago como pagado (con o sin comprobante ya subido).
      case "pago": {
        let venta;
        try { venta = JSON.parse(lead.fields.venta_json || "null"); } catch (e) { venta = null; }
        if (!venta) return res.status(400).json({ ok: false, error: "Este lead no tiene una venta registrada" });
        const p = venta.pagos.find(p => p.n === data.n);
        if (!p) return res.status(400).json({ ok: false, error: "Pago inexistente" });
        p.pagado = Boolean(data.pagado);
        p.fecha = data.pagado ? (fechaPago(data.fecha) || new Date().toISOString()) : null;
        if (data.comprobante) p.comprobante = data.comprobante;
        updated = await store.registrar(id, quien,
          `Pago ${p.n} de ${venta.pagos.length} ${p.pagado ? "cobrado" : "desmarcado"} (${venta.oferta})`,
          { venta_json: JSON.stringify(venta) }, lead);
        break;
      }

      // Editar la venta a mano: monto de cada cuota, si está cobrada y el día que pagó,
      // agregar o quitar cuotas, y la nota. Los comprobantes se mantienen por número de cuota.
      case "editar_venta": {
        let venta;
        try { venta = JSON.parse(lead.fields.venta_json || "null"); } catch (e) { venta = null; }
        if (!venta) return res.status(400).json({ ok: false, error: "Este lead no tiene una venta registrada" });
        const pagos = Array.isArray(data.pagos) ? data.pagos : null;
        const montos = pagos && montosValidos(pagos.map(p => p && p.monto));
        if (!montos) return res.status(400).json({ ok: false, error: "Revisá los montos: tienen que ser números mayores a 0 (de 1 a 24 cuotas)" });
        const previos = venta.pagos || [];
        venta.pagos = pagos.map((p, i) => {
          const pagado = Boolean(p.pagado);
          const fecha = pagado ? (fechaPago(p.fecha) || (previos[i] && previos[i].fecha) || new Date().toISOString()) : null;
          return { n: i + 1, monto: montos[i], pagado, fecha, comprobante: (previos[i] && previos[i].comprobante) || null };
        });
        const preset = (PRECIOS[venta.oferta] || {})[venta.forma];
        if (!preset || preset.join() !== montos.join()) venta.forma = "Personalizado";
        if (data.nota !== undefined) venta.nota = String(data.nota || "").trim();
        updated = await store.registrar(id, quien, `Venta editada a mano (${venta.oferta} · ${venta.pagos.length} cuota${venta.pagos.length === 1 ? "" : "s"})`,
          { venta_json: JSON.stringify(venta) }, lead);
        break;
      }

      // Anular la venta (vuelve a seguimiento).
      case "anular_venta": {
        updated = await store.registrar(id, quien, "Venta anulada", {
          venta_json: "", etapa: "No cerró · seguimiento"
        }, lead);
        break;
      }

      default:
        return res.status(400).json({ ok: false, error: "Acción desconocida: " + action });
    }

    return res.status(200).json({ ok: true, lead: updated || (await store.getLead(id)) });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
