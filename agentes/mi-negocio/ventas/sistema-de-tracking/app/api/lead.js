// Ficha de un lead y todas las acciones del equipo sobre él.
// GET  /api/lead?id=...
// POST /api/lead { id, action, data }

const { requiere } = require("../lib/auth");
const store = require("../lib/store");

const PRECIOS = {
  "Génesis": { PIF: [5000], "2 cuotas": [2850, 2850], "3 cuotas": [2000, 2000, 2000] },
  "Mentoría": { PIF: [2000], "2 cuotas": [1100, 1100] }
};

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

    let updated;
    switch (action) {

      // Editar campos de la ficha (incluye datos de contacto).
      case "campos": {
        const { nombre, email, telefono, ...fields } = data;
        updated = await store.updateLead(id, { nombre, email, telefono, fields });
        updated = await store.registrar(id, quien, "Editó la ficha");
        break;
      }

      // +1 intento de contacto sin respuesta.
      case "intento": {
        const n = (parseInt(lead.fields.intentos || "0", 10) || 0) + 1;
        updated = await store.registrar(id, quien, `Intento de contacto #${n}`, {
          intentos: String(n), ultimo_contacto: new Date().toISOString()
        });
        break;
      }

      // Cambiar la etapa del proceso.
      case "etapa": {
        updated = await store.registrar(id, quien, `Etapa → ${data.etapa}`, {
          etapa: data.etapa, ultimo_contacto: new Date().toISOString()
        });
        break;
      }

      // Marcar sí/no: confirmo_clase, recurso_enviado, recurso_visto, asistio,
      // senal_compra, agendo, se_presento, excede_tope...
      case "marcar": {
        updated = await store.registrar(id, quien, `${data.campo} → ${data.valor}`, {
          [data.campo]: data.valor, ultimo_contacto: new Date().toISOString()
        });
        break;
      }

      // Reasignar dueño o quién toma la llamada.
      case "reasignar": {
        const fields = {};
        if (data.dueno) fields.dueno = data.dueno;
        if (data.llamada_con) { fields.llamada_con = data.llamada_con; fields.excede_tope = "No"; }
        updated = await store.registrar(id, quien,
          `Reasignado: ${[data.dueno && "dueño → " + data.dueno, data.llamada_con && "llamada → " + data.llamada_con].filter(Boolean).join(" · ")}`,
          fields);
        break;
      }

      // Forzar el grupo (corrección manual).
      case "grupo": {
        updated = await store.registrar(id, quien, `Grupo → ${data.grupo}`, { grupo: data.grupo });
        break;
      }

      // Registrar la venta: oferta + forma de pago. Arma el plan de pagos.
      case "venta": {
        const { oferta, forma, vendedor } = data;
        const montos = (PRECIOS[oferta] || {})[forma];
        if (!montos) return res.status(400).json({ ok: false, error: "Oferta o forma de pago inválida" });
        const venta = {
          oferta, forma, vendedor: vendedor || quien,
          fecha: new Date().toISOString(),
          pagos: montos.map((m, i) => ({ n: i + 1, monto: m, pagado: false, fecha: null, comprobante: null }))
        };
        updated = await store.registrar(id, quien, `Venta ${oferta} · ${forma} · vendió ${venta.vendedor}`, {
          venta_json: JSON.stringify(venta),
          etapa: oferta === "Génesis" ? "Venta Génesis" : "Venta Mentoría"
        });
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
        p.fecha = data.pagado ? (data.fecha || new Date().toISOString()) : null;
        if (data.comprobante) p.comprobante = data.comprobante;
        updated = await store.registrar(id, quien,
          `Pago ${p.n} de ${venta.pagos.length} ${p.pagado ? "cobrado" : "desmarcado"} (${venta.oferta})`,
          { venta_json: JSON.stringify(venta) });
        break;
      }

      // Anular la venta (vuelve a seguimiento).
      case "anular_venta": {
        updated = await store.registrar(id, quien, "Venta anulada", {
          venta_json: "", etapa: "No cerró · seguimiento"
        });
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
