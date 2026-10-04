// Capa de datos: GHL cuando hay token, demo en memoria cuando no.
// Todos los endpoints del API pasan por acá.

const ghl = require("./ghl");
const demo = require("./demo");

const DEMO = !ghl.enabled;

const SETTINGS_KEY = "trk_settings";
const RESERVAS_KEY = "trk_reservas_manu";
const RESERVA_MIN = 3; // minutos que se reserva el lugar de Manu en la Agenda directa

const DEFAULTS = {
  manuTope: 10,            // llamadas post-clase de Manu
  genesisLugares: 10,      // lugares de Génesis (editable si se abren más)
  cierre: "2026-10-22T23:59:00-03:00",
  clase: "2026-10-19T19:00:00-03:00",
  // IDs y links de los calendarios de GHL (se cargan en Configuración):
  calManuPreventaId: "", calManuPreventaLink: "",
  calManuPostId: "", calManuPostLink: "",
  calDiegoId: "", calDiegoLink: ""
};

/* ---------- Settings ---------- */

async function getSettings() {
  if (DEMO) return { ...DEFAULTS, ...(demo.db().settings || {}) };
  try {
    const v = await ghl.getCustomValue(SETTINGS_KEY);
    return { ...DEFAULTS, ...(v && v.value ? JSON.parse(v.value) : {}) };
  } catch (e) { return { ...DEFAULTS }; }
}

async function saveSettings(patch) {
  const actual = await getSettings();
  const next = { ...actual, ...patch };
  if (DEMO) { demo.db().settings = next; return next; }
  await ghl.setCustomValue(SETTINGS_KEY, JSON.stringify(next));
  return next;
}

/* ---------- Leads ---------- */

// El sistema solo trabaja los leads del lanzamiento: los que entraron por el
// opt-in o por los formularios de la clase. Los contactos viejos de la
// subcuenta (sin estos tags) no aparecen en ninguna lista.
const TAGS_LANZAMIENTO = ["optin-19-10", "agenda-directa", "quiero-contacto"];

async function listLeads() {
  if (DEMO) return demo.db().leads.map(l => ({ ...l, fields: { ...l.fields } }));
  const todos = await ghl.listContacts();
  return todos.filter(l => (l.tags || []).some(t => TAGS_LANZAMIENTO.includes(String(t).toLowerCase())));
}

async function getLead(id) {
  if (DEMO) {
    const l = demo.db().leads.find(l => l.id === id);
    return l ? { ...l, fields: { ...l.fields } } : null;
  }
  return ghl.getContact(id);
}

async function findLead(telefono, email) {
  if (DEMO) {
    const tel = normTel(telefono);
    return demo.db().leads.find(l =>
      (tel && normTel(l.telefono) === tel) ||
      (email && l.email && l.email.toLowerCase() === String(email).toLowerCase())
    ) || null;
  }
  return ghl.findByPhoneOrEmail(telefono, email);
}

async function updateLead(id, patch) {
  if (DEMO) {
    const l = demo.db().leads.find(l => l.id === id);
    if (!l) return null;
    if (patch.nombre) l.nombre = patch.nombre;
    if (patch.email) l.email = patch.email;
    if (patch.telefono) l.telefono = patch.telefono;
    if (patch.fields) Object.assign(l.fields, patch.fields);
    if (patch.addTags) l.tags = Array.from(new Set([...(l.tags || []), ...patch.addTags]));
    return { ...l, fields: { ...l.fields } };
  }
  return ghl.updateContact(id, patch);
}

async function createLead({ nombre, email, telefono, fields, tags }) {
  if (DEMO) {
    const d = demo.db();
    const l = {
      id: "demo-nuevo-" + d.nextId++,
      nombre: nombre || "", email: email || "", telefono: telefono || "",
      tags: tags || [], creado: new Date().toISOString(), fields: { ...(fields || {}) }
    };
    d.leads.push(l);
    return { ...l, fields: { ...l.fields } };
  }
  return ghl.createContact({ nombre, email, telefono, fields, tags });
}

// Suma una línea al historial del lead (quién, cuándo, qué).
async function registrar(id, quien, que, fieldsExtra) {
  const lead = await getLead(id);
  if (!lead) return null;
  let hist = [];
  try { hist = JSON.parse(lead.fields.historial_json || "[]"); } catch (e) {}
  hist.push({ t: new Date().toISOString(), q: quien, a: que });
  if (hist.length > 200) hist = hist.slice(-200);
  return updateLead(id, { fields: { ...(fieldsExtra || {}), historial_json: JSON.stringify(hist) } });
}

function normTel(t) {
  return String(t || "").replace(/\D/g, "").replace(/^0+/, "");
}

/* ---------- Reservas del lugar de Manu (Agenda directa) ---------- */

async function getReservas() {
  let lista = [];
  if (DEMO) lista = demo.db().reservas;
  else {
    try {
      const v = await ghl.getCustomValue(RESERVAS_KEY);
      lista = v && v.value ? JSON.parse(v.value) : [];
    } catch (e) { lista = []; }
  }
  const ahora = Date.now();
  return lista.filter(r => r.hasta > ahora);
}

async function saveReservas(lista) {
  if (DEMO) { demo.db().reservas = lista; return; }
  await ghl.setCustomValue(RESERVAS_KEY, JSON.stringify(lista));
}

async function reservarManu(leadId) {
  const vivas = await getReservas();
  const sinEste = vivas.filter(r => r.leadId !== leadId);
  sinEste.push({ leadId, hasta: Date.now() + RESERVA_MIN * 60 * 1000 });
  await saveReservas(sinEste);
}

async function liberarReserva(leadId) {
  const vivas = await getReservas();
  await saveReservas(vivas.filter(r => r.leadId !== leadId));
}

/* ---------- Carga de Manu ---------- */

// Cuántos lugares post-clase de Manu están ocupados: citas vigentes + reservas vivas.
// Si el calendario no está configurado todavía, cuenta los leads con llamada_con=Manu y agendo=Sí.
async function cargaManu() {
  const s = await getSettings();
  const reservas = (await getReservas()).length;
  let citas = null;
  if (!DEMO && s.calManuPostId) {
    const desde = Date.now() - 24 * 3600 * 1000;
    const hasta = new Date(s.cierre).getTime() + 14 * 24 * 3600 * 1000;
    try { citas = await ghl.countAppointments(s.calManuPostId, desde, hasta); } catch (e) { citas = null; }
  }
  if (citas == null) {
    const leads = await listLeads();
    citas = leads.filter(l => l.fields.llamada_con === "Manu" && l.fields.agendo === "Sí"
      && l.fields.etapa !== "Agendado con Manu (pre-venta)").length;
  }
  return { citas, reservas, total: citas + reservas, tope: s.manuTope };
}

module.exports = {
  DEMO, RESERVA_MIN,
  getSettings, saveSettings,
  listLeads, getLead, findLead, updateLead, createLead, registrar,
  getReservas, reservarManu, liberarReserva, cargaManu,
  normTel
};
