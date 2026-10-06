// Arma los tres grupos la noche de la clase: calcula el grupo de cada lead
// activo y lo escribe en su ficha. Se puede correr más de una vez:
// respeta los grupos corregidos a mano solo si se pasa respetarManuales=true.
//
// Sale de la foto en caché y escribe solo los leads que cambian de grupo,
// con 1 pedido a GHL por lead (sin releer la ficha).

const { requiere } = require("../lib/auth");
const store = require("../lib/store");
const R = require("../lib/rules");

module.exports = async function handler(req, res) {
  const user = requiere(req, res);
  if (!user) return;
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Método no permitido" });
  }
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const respetarManuales = body && body.respetarManuales;

  try {
    const leads = await store.listLeads();
    const counts = { "1": 0, "2": 0, "3": 0, fuera: 0, sinCambio: 0, escritos: 0 };
    for (const l of leads) {
      const g = R.grupoDelLead(l);
      if (g == null) { counts.fuera++; continue; }
      if (respetarManuales && l.fields.grupo && l.fields.grupo !== g) { counts.sinCambio++; counts[l.fields.grupo]++; continue; }
      const asistio = l.fields.asistio || (g === "3" ? "No" : l.fields.asistio);
      if (l.fields.grupo !== g || (asistio && l.fields.asistio !== asistio)) {
        // Solo se escriben estos campos: el historial del lead en GHL no se toca.
        await store.updateLead(l.id, { fields: { grupo: g, ...(asistio ? { asistio } : {}) } }, l);
        counts.escritos++;
      }
      counts[g]++;
    }
    return res.status(200).json({ ok: true, counts });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
