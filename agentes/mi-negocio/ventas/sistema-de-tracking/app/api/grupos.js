// Arma los tres grupos la noche de la clase: calcula el grupo de cada lead
// activo y lo escribe en su ficha. Se puede correr más de una vez:
// respeta los grupos corregidos a mano solo si se pasa respetarManuales=true.

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
    const counts = { "1": 0, "2": 0, "3": 0, fuera: 0, sinCambio: 0 };
    for (const l of leads) {
      const g = R.grupoDelLead(l);
      if (g == null) { counts.fuera++; continue; }
      if (respetarManuales && l.fields.grupo && l.fields.grupo !== g) { counts.sinCambio++; counts[l.fields.grupo]++; continue; }
      if (l.fields.grupo !== g) {
        await store.registrar(l.id, user.name, `Grupo → ${g} (armado automático)`, { grupo: g, asistio: l.fields.asistio || (g === "3" ? "No" : l.fields.asistio) });
      }
      counts[g]++;
    }
    return res.status(200).json({ ok: true, counts });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
