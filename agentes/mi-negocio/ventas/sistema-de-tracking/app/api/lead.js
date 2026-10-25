// Ficha de un lead y todas las acciones del equipo sobre él.
// GET  /api/lead?id=...
// POST /api/lead { id, action, data }

const { requiere, esAdmin } = require("../lib/auth");
const store = require("../lib/store");

const V = require("../lib/ventas");
const P = require("../lib/post");

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

      // Responsable de la llamada (Jose o Manu). Es solo una guía visual: no cambia
      // reglas, colas ni el último contacto. Vacío = sin responsable.
      case "responsable": {
        const valor = String(data.responsable || "");
        if (valor && !["Jose", "Manu"].includes(valor)) return res.status(400).json({ ok: false, error: "Responsable inválido" });
        await store.asegurarCampos(["responsable"]);
        updated = await store.registrar(id, quien, valor ? `Responsable → ${valor}` : "Sin responsable", { responsable: valor }, lead);
        break;
      }

      // Responsable del seteo: quién contactó al lead (Mati o Santi). Es el mismo campo que el SDR
      // del proceso post webinar. Solo visual: no cambia reglas ni colas. Vacío = sin asignar.
      case "seteo": {
        const valor = String(data.seteo || "");
        if (valor && !P.SDRS.includes(valor)) return res.status(400).json({ ok: false, error: "Responsable de seteo inválido" });
        await store.asegurarCampos(["sdr"]);
        updated = await store.registrar(id, quien, valor ? `Seteo → ${valor}` : "Seteo sin asignar", { sdr: valor }, lead);
        break;
      }

      // Estado de la llamada («No contestó», «Llamar de nuevo», o un texto libre). Solo visual,
      // como el responsable: no cambia reglas, colas ni el último contacto. Vacío = sin estado.
      case "estado_llamada": {
        const valor = String(data.estado_llamada || "").trim().slice(0, 60);
        await store.asegurarCampos(["estado_llamada"]);
        updated = await store.registrar(id, quien, valor ? `Estado → ${valor}` : "Sin estado", { estado_llamada: valor }, lead);
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
        if (data.campo === "llamado_apl") await store.asegurarCampos(["llamado_apl"]);
        const texto = data.campo === "llamado_apl"
          ? (data.valor === "Sí" ? "Aplicación: ya lo llamé" : "Aplicación: vuelve a «por llamar»")
          : `${data.campo} → ${data.valor}`;
        updated = await store.registrar(id, quien, texto, {
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

      // Registrar la venta: oferta + forma de pago. Arma el plan de pagos con sus vencimientos.
      // Con forma «Personalizado» las cuotas vienen a mano en data.montos.
      case "venta": {
        const { venta, error } = V.armarVenta(data, quien);
        if (error) return res.status(400).json({ ok: false, error });
        await store.asegurarOpciones();
        const fields = { venta_json: JSON.stringify(venta), etapa: V.ETAPA_VENTA[venta.oferta] };
        // En el proceso post webinar, la venta lo pasa a «Cliente · falta onboarding».
        if (lead.fields.post_estado && lead.fields.post_estado !== "Cliente") fields.post_estado = "Cliente · falta onboarding";
        updated = await store.registrar(id, quien, `Venta ${venta.oferta} · ${venta.forma} · vendió ${venta.vendedor}`, fields, lead);
        break;
      }

      // Marcar un pago como pagado (con o sin comprobante ya subido).
      case "pago": {
        const venta = V.leerVenta(lead);
        if (!venta) return res.status(400).json({ ok: false, error: "Este lead no tiene una venta registrada" });
        const p = venta.pagos.find(p => p.n === data.n);
        if (!p) return res.status(400).json({ ok: false, error: "Pago inexistente" });
        p.pagado = Boolean(data.pagado);
        p.fecha = data.pagado ? (V.fechaDia(data.fecha) || new Date().toISOString()) : null;
        if (data.comprobante) p.comprobante = data.comprobante;
        updated = await store.registrar(id, quien,
          `Pago ${p.n} de ${venta.pagos.length} ${p.pagado ? "cobrado" : "desmarcado"} (${venta.oferta})`,
          { venta_json: JSON.stringify(venta) }, lead);
        break;
      }

      // Editar la venta a mano: monto, vencimiento de cada cuota, si está cobrada y el día que pagó,
      // agregar o quitar cuotas, la fecha de cierre y la nota. Los comprobantes se mantienen por número de cuota.
      case "editar_venta": {
        const venta = V.leerVenta(lead);
        if (!venta) return res.status(400).json({ ok: false, error: "Este lead no tiene una venta registrada" });
        const pagos = Array.isArray(data.pagos) ? data.pagos : null;
        const montos = pagos && V.montosValidos(pagos.map(p => p && p.monto));
        if (!montos) return res.status(400).json({ ok: false, error: "Revisá los montos: tienen que ser números mayores a 0 (de 1 a 24 cuotas)" });
        if (data.fecha !== undefined) venta.fecha = V.fechaDia(data.fecha) || venta.fecha;
        const previos = venta.pagos || [];
        venta.pagos = pagos.map((p, i) => {
          const pagado = Boolean(p.pagado);
          const fecha = pagado ? (V.fechaDia(p.fecha) || (previos[i] && previos[i].fecha) || new Date().toISOString()) : null;
          const vence = V.fechaDia(p.vence) || (previos[i] && previos[i].vence) || V.sumarMeses(venta.fecha, i);
          return { n: i + 1, monto: montos[i], vence, pagado, fecha, comprobante: (previos[i] && previos[i].comprobante) || null };
        });
        const preset = (V.PRECIOS[venta.oferta] || {})[venta.forma];
        if (!preset || preset.join() !== montos.join()) venta.forma = "Personalizado";
        if (data.nota !== undefined) venta.nota = String(data.nota || "").trim();
        updated = await store.registrar(id, quien, `Venta editada a mano (${venta.oferta} · ${venta.pagos.length} cuota${venta.pagos.length === 1 ? "" : "s"})`,
          { venta_json: JSON.stringify(venta) }, lead);
        break;
      }

      // Datos del cliente: los de contacto (nombre, email, WhatsApp) van al contacto de GHL;
      // marca, Instagram, web, documento y país, a la venta.
      case "cliente": {
        const venta = V.leerVenta(lead);
        if (!venta) return res.status(400).json({ ok: false, error: "Este lead no tiene una venta registrada" });
        venta.cliente = V.limpiarCliente({ ...(venta.cliente || {}), ...(data.cliente || {}) });
        updated = await store.updateLead(id, {
          nombre: data.nombre, email: data.email, telefono: data.telefono,
          fields: { venta_json: JSON.stringify(venta), historial_json: store.historialCon(lead, quien, "Editó los datos del cliente") }
        }, lead);
        break;
      }

      // Proceso post webinar: cada paso del mapa de ventas (fases 1 a 7).
      case "post": {
        await store.asegurarCampos(["sdr", "post_estado", "post_json"]);
        const p = P.leer(lead);
        const ahora = new Date().toISOString();
        const fields = {};
        let que;
        switch (data.op) {
          case "sdr": {
            if (!P.SDRS.includes(data.sdr)) return res.status(400).json({ ok: false, error: "SDR inválido" });
            fields.sdr = data.sdr; que = `SDR → ${data.sdr}`;
            break;
          }
          case "llamada": {
            const atendio = Boolean(data.atendio);
            p.llamadas.push({ t: ahora, atendio, q: quien });
            const sinRespuesta = p.llamadas.filter(x => !x.atendio).length;
            que = atendio ? "Llamada: atendió" : `Llamada sin respuesta (${sinRespuesta})`;
            // A la tercera sin respuesta pasa solo a «No atendió».
            const estado = lead.fields.post_estado || "Nuevo lead";
            if (!atendio && sinRespuesta >= P.LLAMADAS_MAX && estado === "Nuevo lead") { fields.post_estado = "No atendió"; que += " → No atendió"; }
            break;
          }
          case "audio": {
            p.audio = Boolean(data.valor); que = p.audio ? "Audio enviado" : "Audio desmarcado";
            break;
          }
          case "seguimiento": {
            const nota = String(data.nota || "").trim().slice(0, 500);
            p.seguimientos.push({ t: ahora, q: quien, nota });
            que = `Seguimiento #${p.seguimientos.length}${nota ? ": " + nota : ""}`;
            break;
          }
          case "agendar": {
            if (!P.OFERTAS.includes(data.oferta)) return res.status(400).json({ ok: false, error: "Elegí la oferta a la que califica" });
            const callAt = V.fechaHora(data.call_at);
            if (!callAt) return res.status(400).json({ ok: false, error: "Poné el día y la hora de la llamada con el closer" });
            p.oferta = data.oferta; p.closer = String(data.closer || "").trim().slice(0, 60); p.call_at = callAt;
            fields.post_estado = "Agendado";
            que = `Agendado con ${p.closer || "el closer"} · ${data.oferta} · ${P.nombreGrupo(lead, callAt).split(" / ").slice(1).join(" ")}`;
            break;
          }
          case "tilde": {
            const fase = data.fase, clave = data.clave;
            const textos = fase === "setteo" ? { confirmo: "Confirmó fecha y hora", grupo: "Grupo creado" } : P.TILDES[fase];
            if (!textos || !textos[clave]) return res.status(400).json({ ok: false, error: "Paso inválido" });
            if (fase === "setteo") p[clave] = Boolean(data.valor); else p[fase][clave] = Boolean(data.valor);
            que = `${textos[clave]}${data.valor ? "" : " (desmarcado)"}`;
            break;
          }
          case "no_cerro": {
            const razon = String(data.razon || "").trim().slice(0, 500);
            if (!razon) return res.status(400).json({ ok: false, error: "Escribí la razón" });
            p.cierre = { razon, fathom: String(data.fathom || "").trim().slice(0, 500), t: ahora };
            fields.post_estado = "No se cerró";
            que = `No se cerró: ${razon}`;
            break;
          }
          case "estado": {
            if (!P.ESTADOS.includes(data.estado)) return res.status(400).json({ ok: false, error: "Estado inválido" });
            fields.post_estado = data.estado; que = `Estado post webinar → ${data.estado}`;
            break;
          }
          default:
            return res.status(400).json({ ok: false, error: "Paso desconocido: " + data.op });
        }
        if (!lead.fields.post_estado && !fields.post_estado) fields.post_estado = "Nuevo lead";
        if (!lead.fields.sdr && !fields.sdr) fields.sdr = P.sdrPara(lead.email, lead.telefono);
        fields.post_json = JSON.stringify(p);
        updated = await store.registrar(id, quien, que, fields, lead);
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
