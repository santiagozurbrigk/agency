// Proceso de ventas post webinar (clase del 24/10): el mapa de 7 fases, del formulario al onboarding.
// El estado vive en el campo «Estado post webinar» y el detalle de cada fase, como JSON,
// en «Proceso post webinar (interno, no tocar)»:
// { sdr, llamadas: [{ t, atendio, q }], audio, seguimientos: [{ t, q, nota }],
//   oferta, closer, call_at, confirmo, grupo, recursos: { vsl, testimonio, doc },
//   handoff: { manu, closer }, recordatorios: { h3, m30, m10 },
//   cierre: { razon, fathom, t }, onboarding: { bienvenida, discord, skool, canal } }

const ESTADOS = ["Nuevo lead", "No atendió", "Agendado", "No se cerró", "Cliente · falta onboarding", "Cliente"];
const SDRS = ["Mati", "Santi"];
// WhatsApp de cada SDR: el formulario de aplicación termina ahí. Se pueden cambiar en Configuración.
const WA_SDR = { Mati: "https://wa.link/9xcaz0", Santi: "https://wa.link/xqbxzd" };
const OFERTAS = ["Génesis", "OS Fast", "Subscriptions"];
const LLAMADAS_MAX = 3;

// Los pasos que son solo un tilde (fase → clave → texto).
const TILDES = {
  recursos: { vsl: "VSL de su oferta", testimonio: "Testimonio", doc: "Documento a medida" },
  handoff: { manu: "Audio de handoff de Manu", closer: "Audio del closer presentándose" },
  recordatorios: { h3: "Audio 2–3 h antes", m30: "Mensaje 30 min antes", m10: "Link 10 min antes" },
  onboarding: { bienvenida: "Mensaje de bienvenida", discord: "Link al Discord", skool: "Acceso a Skool", canal: "Canal 1 a 1 en Discord" }
};

function leer(lead) {
  let p = null;
  try { p = JSON.parse((lead && lead.fields && lead.fields.post_json) || "null"); } catch (e) { p = null; }
  p = p && typeof p === "object" ? p : {};
  p.llamadas = Array.isArray(p.llamadas) ? p.llamadas : [];
  p.seguimientos = Array.isArray(p.seguimientos) ? p.seguimientos : [];
  for (const k of Object.keys(TILDES)) p[k] = p[k] && typeof p[k] === "object" ? p[k] : {};
  p.cierre = p.cierre && typeof p.cierre === "object" ? p.cierre : {};
  return p;
}

// Reparto 50/50 entre los SDR, fijo por persona (el mismo email o WhatsApp siempre cae en el mismo).
function sdrPara(email, telefono) {
  const clave = String(email || "").trim().toLowerCase() || String(telefono || "").replace(/\D/g, "");
  let h = 0;
  for (const c of clave) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return SDRS[h % SDRS.length];
}

// "Lucas / 1000 a 3000": cómo se agenda el contacto en el celular del SDR.
function nombreAgenda(lead) {
  const nombre = String((lead && lead.nombre) || "").trim().split(/\s+/)[0] || "Lead";
  const f = (lead && lead.fields) || {};
  const rango = String(f.inversion || f.facturacion || "")
    .replace(/^Entre\s+/i, "").replace(/USD\s*/gi, "").replace(/\s+y\s+/i, " a ").replace(/\./g, "").trim();
  return rango ? `${nombre} / ${rango}` : nombre;
}

// "Santino / 19hs / 20/10": nombre del grupo de WhatsApp con el lead y el closer.
function nombreGrupo(lead, callAt) {
  const nombre = String((lead && lead.nombre) || "").trim().split(/\s+/)[0] || "Lead";
  if (!callAt) return nombre;
  const d = new Date(callAt);
  if (isNaN(d)) return nombre;
  const ar = new Date(d.getTime() - 3 * 3600e3);
  const hh = ar.getUTCHours(), mm = ar.getUTCMinutes();
  const hora = `${hh}${mm ? ":" + String(mm).padStart(2, "0") : ""}hs`;
  return `${nombre} / ${hora} / ${ar.getUTCDate()}/${ar.getUTCMonth() + 1}`;
}

module.exports = { ESTADOS, SDRS, WA_SDR, OFERTAS, LLAMADAS_MAX, TILDES, leer, sdrPara, nombreAgenda, nombreGrupo };
