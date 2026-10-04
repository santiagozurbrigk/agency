// Capa de datos: GHL cuando hay token, demo en memoria cuando no.
// Todos los endpoints del API pasan por acá.
//
// Para la noche de la clase, las lecturas salen de una foto en caché (lib/cache.js)
// y cada escritura actualiza esa foto al instante (write-through). GHL sigue siendo
// la fuente de verdad: la foto se rehace sola cada pocos segundos.

const ghl = require("./ghl");
const demo = require("./demo");
const cache = require("./cache");

const DEMO = !ghl.enabled;

const SETTINGS_KEY = "trk_settings";
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

// Frescura de cada cosa en caché.
const POL_LEADS = { frescoMs: 15000, viejoMs: 10 * 60000, ttlSeg: 1800 };
const POL_SETTINGS = { frescoMs: 60000, viejoMs: 30 * 60000, ttlSeg: 3600 };
const POL_CITAS = { frescoMs: 20000, viejoMs: 2 * 60000, ttlSeg: 600 };

/* ---------- Settings ---------- */

async function getSettings() {
  if (DEMO) return { ...DEFAULTS, ...(demo.db().settings || {}) };
  try {
    const v = await cache.swr("settings", async () => {
      const cv = await ghl.getCustomValue(SETTINGS_KEY);
      return cv && cv.value ? JSON.parse(cv.value) : {};
    }, POL_SETTINGS);
    return { ...DEFAULTS, ...(v || {}) };
  } catch (e) { return { ...DEFAULTS }; }
}

async function saveSettings(patch) {
  const actual = await getSettings();
  const next = { ...actual, ...patch };
  if (DEMO) { demo.db().settings = next; return next; }
  await ghl.setCustomValue(SETTINGS_KEY, JSON.stringify(next));
  await cache.set("settings", next, POL_SETTINGS.ttlSeg);
  await cache.del("manu_citas");
  return next;
}

/* ---------- Leads ---------- */

// El sistema solo trabaja los leads del lanzamiento: los que entraron por el
// opt-in o por los formularios de la clase. Los contactos viejos de la
// subcuenta (sin estos tags) no aparecen en ninguna lista.
const TAGS_LANZAMIENTO = ["optin-19-10", "agenda-directa", "quiero-contacto"];
const esDelLanzamiento = (l) => (l.tags || []).some(t => TAGS_LANZAMIENTO.includes(String(t).toLowerCase()));

// La foto no lleva el historial (pesa y solo se usa al abrir una ficha).
function liviano(l) {
  const { historial_json, ...fields } = l.fields || {};
  return { ...l, fields };
}
const copia = (l) => ({ ...l, tags: [...(l.tags || [])], fields: { ...l.fields } });

async function fotoLeads() {
  return cache.swr("leads", async () => {
    const todos = await ghl.listContacts();
    return todos.filter(esDelLanzamiento).map(liviano);
  }, POL_LEADS);
}

// La lista de contactos de GHL tarda en reflejar los cambios recientes (minutos a
// veces), así que cada escritura del sistema se guarda además como "reciente" y se
// aplica por encima de la foto durante RECIENTE_MS. Así un refresco de la foto con
// datos atrasados de GHL no puede deshacer lo que el equipo acaba de cambiar.
const RECIENTE_MS = 10 * 60 * 1000;
let cadenaRecientes = Promise.resolve();

async function leerRecientes() {
  const r = (await cache.get("recientes")) || {};
  const limite = Date.now() - RECIENTE_MS;
  for (const id of Object.keys(r)) if (r[id].t < limite) delete r[id];
  return r;
}

function guardarReciente(lead) {
  const p = cadenaRecientes.then(async () => {
    const r = await leerRecientes();
    r[lead.id] = { l: liviano(lead), t: Date.now() };
    await cache.set("recientes", r, Math.ceil(RECIENTE_MS / 1000) + 60);
  });
  cadenaRecientes = p.catch(() => {});
  return p;
}

async function listLeads() {
  if (DEMO) return demo.db().leads.map(l => liviano(copia(l)));
  const [foto, recientes] = await Promise.all([fotoLeads(), leerRecientes()]);
  const lista = foto.map(copia);
  for (const { l } of Object.values(recientes)) {
    const i = lista.findIndex(x => x.id === l.id);
    if (esDelLanzamiento(l)) { if (i >= 0) lista[i] = copia(l); else lista.push(copia(l)); }
    else if (i >= 0) lista.splice(i, 1);
  }
  return lista;
}

// Pone la versión nueva de un lead en la foto (o lo agrega si es nuevo) y la marca como reciente.
async function actualizarFoto(lead) {
  if (DEMO || !lead) return;
  await guardarReciente(lead);
  const foto = await cache.get("leads");
  if (!foto) return; // no hay foto todavía: la próxima lectura la arma completa
  const l = liviano(lead);
  const i = foto.findIndex(x => x.id === l.id);
  if (esDelLanzamiento(l)) { if (i >= 0) foto[i] = l; else foto.push(l); }
  else if (i >= 0) foto.splice(i, 1);
  await cache.set("leads", foto, POL_LEADS.ttlSeg);
}

// La ficha completa (con historial) se lee siempre de GHL.
async function getLead(id) {
  if (DEMO) {
    const l = demo.db().leads.find(l => l.id === id);
    return l ? copia(l) : null;
  }
  return ghl.getContact(id);
}

// Busca un lead por WhatsApp o email. Primero en la foto (sin pedirle nada a GHL);
// si no está, en toda la subcuenta (puede ser un contacto viejo sin el tag).
// Devuelve la ficha completa.
async function findLead(telefono, email) {
  const tel = normTel(telefono);
  const mail = String(email || "").trim().toLowerCase();
  const coincide = (l) => (tel && normTel(l.telefono) === tel) || (mail && (l.email || "").toLowerCase() === mail);
  if (DEMO) {
    const l = demo.db().leads.find(coincide);
    return l ? copia(l) : null;
  }
  const enFoto = (await listLeads()).find(coincide);
  if (enFoto) return ghl.getContact(enFoto.id);
  return ghl.findByPhoneOrEmail(telefono, email);
}

// Busca solo en la foto en caché (sin pedirle nada a GHL). Devuelve la versión liviana.
async function enFoto(telefono, email) {
  const tel = normTel(telefono);
  const mail = String(email || "").trim().toLowerCase();
  const coincide = (l) => (tel && normTel(l.telefono) === tel) || (mail && (l.email || "").toLowerCase() === mail);
  const lista = DEMO ? demo.db().leads : await listLeads();
  const l = lista.find(coincide);
  return l ? liviano(copia(l)) : null;
}

// Corre `fn` después de responder (Vercel mantiene viva la función hasta que termine).
// En modo demo se espera, para que todo sea determinista.
async function enSegundoPlano(fn) {
  if (DEMO) return fn();
  cache.waitUntil(Promise.resolve().then(fn).catch(e => console.error("segundo plano:", e.message)));
}

// `base` = la ficha completa que ya tenemos, para ahorrar lecturas a GHL.
async function updateLead(id, patch, base) {
  if (DEMO) {
    const l = demo.db().leads.find(l => l.id === id);
    if (!l) return null;
    if (patch.nombre) l.nombre = patch.nombre;
    if (patch.email) l.email = patch.email;
    if (patch.telefono) l.telefono = patch.telefono;
    if (patch.fields) Object.assign(l.fields, patch.fields);
    if (patch.addTags) l.tags = Array.from(new Set([...(l.tags || []), ...patch.addTags]));
    return copia(l);
  }
  const nuevo = await ghl.updateContact(id, patch, base);
  await actualizarFoto(nuevo);
  return nuevo;
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
    return copia(l);
  }
  const nuevo = await ghl.createContact({ nombre, email, telefono, fields, tags });
  await actualizarFoto(nuevo);
  return nuevo;
}

// Devuelve el historial del lead con una línea más (quién, cuándo, qué), como JSON.
function historialCon(lead, quien, que) {
  let hist = [];
  try { hist = JSON.parse((lead && lead.fields && lead.fields.historial_json) || "[]"); } catch (e) {}
  hist.push({ t: new Date().toISOString(), q: quien, a: que });
  if (hist.length > 200) hist = hist.slice(-200);
  return JSON.stringify(hist);
}

// Suma una línea al historial y, en el mismo pedido, los campos de `fieldsExtra`.
// Con `base` (ficha completa ya leída) es 1 solo pedido a GHL.
async function registrar(id, quien, que, fieldsExtra, base) {
  const lead = base || await getLead(id);
  if (!lead) return null;
  return updateLead(id, {
    fields: { ...(fieldsExtra || {}), historial_json: historialCon(lead, quien, que) }
  }, lead);
}

function normTel(t) {
  return String(t || "").replace(/\D/g, "").replace(/^0+/, "");
}

/* ---------- Reservas del lugar de Manu (Agenda directa) ---------- */
// Son de 3 minutos: viven en la caché compartida, no en GHL.

async function getReservas() {
  let lista = [];
  if (DEMO) lista = demo.db().reservas;
  else lista = (await cache.get("reservas_manu")) || [];
  const ahora = Date.now();
  return lista.filter(r => r.hasta > ahora);
}

async function saveReservas(lista) {
  if (DEMO) { demo.db().reservas = lista; return; }
  await cache.set("reservas_manu", lista, 15 * 60);
}

// Todo lo que lee y escribe las reservas pasa de a uno por vez (en la instancia),
// para que una ráfaga de formularios no vea a Manu libre a la vez y se pase del tope.
let cadena = Promise.resolve();
function deAUno(fn) {
  const p = cadena.then(fn, fn);
  cadena = p.catch(() => {});
  return p;
}

// Decide Manu o Diego y, si es Manu, le reserva el lugar en el mismo paso.
// `clave` identifica la reserva (el id del lead, o "tel:<número>" si todavía no existe).
// `quiereManu(manuLibre)` aplica la regla 5.2 y devuelve "manu" o "diego".
function decidirYReservar(clave, quiereManu) {
  return deAUno(async () => {
    const carga = await cargaManu();
    const yaReservado = (await getReservas()).some(r => r.leadId === clave);
    const libre = yaReservado || carga.total < carga.tope;
    const ruta = quiereManu(libre);
    if (ruta === "manu" && !yaReservado) {
      const vivas = await getReservas();
      vivas.push({ leadId: clave, hasta: Date.now() + RESERVA_MIN * 60 * 1000 });
      await saveReservas(vivas);
    }
    return ruta;
  });
}

// Cuando el lead se crea después de reservar, la reserva pasa a su id.
function renombrarReserva(desde, hacia) {
  if (desde === hacia) return Promise.resolve();
  return deAUno(async () => {
    const vivas = await getReservas();
    const r = vivas.find(x => x.leadId === desde);
    if (!r) return;
    r.leadId = hacia;
    await saveReservas(vivas);
  });
}

function reservarManu(leadId) {
  return deAUno(async () => {
    const vivas = (await getReservas()).filter(r => r.leadId !== leadId);
    vivas.push({ leadId, hasta: Date.now() + RESERVA_MIN * 60 * 1000 });
    await saveReservas(vivas);
  });
}

function liberarReserva(leadId) {
  return deAUno(async () => {
    const vivas = await getReservas();
    if (!vivas.some(r => r.leadId === leadId)) return;
    await saveReservas(vivas.filter(r => r.leadId !== leadId));
  });
}

/* ---------- Carga de Manu ---------- */

// Cuántos lugares post-clase de Manu están ocupados: citas vigentes + reservas vivas.
// Las citas se cuentan en el calendario de GHL (en caché 20 s; el webhook la invalida
// en cada alta o cancelación). Sin calendario configurado, se cuentan desde los leads.
async function cargaManu({ fresco } = {}) {
  const s = await getSettings();
  const reservas = (await getReservas()).length;
  let citas = null;
  if (!DEMO && s.calManuPostId) {
    if (fresco) await cache.del("manu_citas");
    try {
      citas = await cache.swr("manu_citas", () => {
        const desde = Date.now() - 24 * 3600 * 1000;
        const hasta = new Date(s.cierre).getTime() + 14 * 24 * 3600 * 1000;
        return ghl.countAppointments(s.calManuPostId, desde, hasta);
      }, POL_CITAS);
    } catch (e) { citas = null; }
  }
  if (citas == null) {
    const leads = await listLeads();
    citas = leads.filter(l => l.fields.llamada_con === "Manu" && l.fields.agendo === "Sí"
      && l.fields.etapa !== "Agendado con Manu (pre-venta)").length;
  }
  return { citas, reservas, total: citas + reservas, tope: s.manuTope };
}

async function invalidarCitasManu() {
  if (!DEMO) await cache.del("manu_citas");
}

module.exports = {
  DEMO, RESERVA_MIN,
  getSettings, saveSettings,
  listLeads, getLead, findLead, enFoto, enSegundoPlano, updateLead, createLead, registrar, historialCon,
  getReservas, reservarManu, liberarReserva, decidirYReservar, renombrarReserva,
  cargaManu, invalidarCitasManu,
  normTel
};
