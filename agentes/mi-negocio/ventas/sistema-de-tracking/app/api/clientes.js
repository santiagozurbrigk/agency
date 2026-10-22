// Alta manual de un cliente: para los que cerraron por fuera de las colas (repesca, DM,
// referido). Busca el contacto por WhatsApp o email; si no existe, lo crea.
// POST { nombre, email, telefono, oferta, forma, montos?, fecha?, nota?, vendedor?, cliente? }

const { requiere } = require("../lib/auth");
const store = require("../lib/store");
const V = require("../lib/ventas");

module.exports = async function handler(req, res) {
  const user = requiere(req, res);
  if (!user) return;
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Método no permitido" });
  }
  try {
    let body = req.body;
    if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
    const data = body || {};
    const nombre = String(data.nombre || "").trim();
    const email = String(data.email || "").trim();
    const telefono = String(data.telefono || "").trim();
    if (!nombre) return res.status(400).json({ ok: false, error: "Falta el nombre" });
    if (!telefono && !email) return res.status(400).json({ ok: false, error: "Falta el WhatsApp o el email" });

    const { venta, error } = V.armarVenta(data, user.name);
    if (error) return res.status(400).json({ ok: false, error });

    const existente = await store.findLead(telefono, email);
    if (existente && V.leerVenta(existente)) {
      return res.status(409).json({ ok: false, error: `${existente.nombre || "Ese contacto"} ya tiene una venta registrada. Abrí su ficha para editarla.`, id: existente.id });
    }

    await store.asegurarOpciones();
    const que = `Cliente cargado a mano · ${venta.oferta} · ${venta.forma} · vendió ${venta.vendedor}`;
    const fields = {
      venta_json: JSON.stringify(venta),
      etapa: V.ETAPA_VENTA[venta.oferta]
    };
    let lead;
    if (existente) {
      lead = await store.updateLead(existente.id, {
        nombre, email, telefono,
        fields: { ...fields, historial_json: store.historialCon(existente, user.name, que) },
        addTags: ["cliente-genesis"]
      }, existente);
    } else {
      lead = await store.createLead({
        nombre, email, telefono, tags: ["cliente-genesis"],
        fields: { ...fields, historial_json: store.historialCon(null, user.name, que) }
      });
    }
    return res.status(200).json({ ok: true, lead, existia: Boolean(existente) });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
