// Cliente de la API v2 de GHL (LeadConnector).
// Token de integración privada en GHL_API_TOKEN, subcuenta en GHL_LOCATION_ID.
// Si faltan las dos variables, el sistema corre en modo demo (ver store.js).

const { FIELDS } = require("./fields");

const BASE = "https://services.leadconnectorhq.com";
const TOKEN = process.env.GHL_API_TOKEN;
const LOCATION = process.env.GHL_LOCATION_ID;

const enabled = Boolean(TOKEN && LOCATION);

// Límite de GHL: 100 pedidos cada 10 segundos por subcuenta.
// Cada instancia usa un "balde de fichas": puede largar hasta 25 pedidos de golpe
// (las ráfagas de la clase salen al instante) y después recarga 6 por segundo,
// así nunca supera ~85 cada 10 s. Si GHL igual responde 429, se reintenta con espera creciente.
const BALDE = 25, RECARGA_POR_SEG = 6;
let fichas = BALDE, ultimaRecarga = Date.now(), colaTurnos = Promise.resolve();
function turno() {
  const p = colaTurnos.then(async () => {
    for (;;) {
      const ahora = Date.now();
      fichas = Math.min(BALDE, fichas + ((ahora - ultimaRecarga) / 1000) * RECARGA_POR_SEG);
      ultimaRecarga = ahora;
      if (fichas >= 1) { fichas -= 1; return; }
      await new Promise(r => setTimeout(r, ((1 - fichas) / RECARGA_POR_SEG) * 1000));
    }
  });
  colaTurnos = p.catch(() => {});
  return p;
}

async function api(path, opts = {}) {
  for (let intento = 0; ; intento++) {
    await turno();
    const r = await fetch(BASE + path, {
      ...opts,
      headers: {
        Authorization: "Bearer " + TOKEN,
        Version: "2021-07-28",
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(opts.headers || {})
      },
      body: opts.body ? JSON.stringify(opts.body) : undefined
    });
    if (r.status === 429 && intento < 4) {
      const ra = parseFloat((r.headers.get && r.headers.get("retry-after")) || "");
      await new Promise(res => setTimeout(res, (ra > 0 ? ra * 1000 : 1000 * 2 ** intento) + Math.random() * 300));
      continue;
    }
    const text = await r.text();
    let data = {};
    try { data = text ? JSON.parse(text) : {}; } catch (e) { data = { raw: text }; }
    if (!r.ok) {
      const err = new Error(`GHL ${opts.method || "GET"} ${path} → ${r.status}: ${text.slice(0, 300)}`);
      err.status = r.status;
      throw err;
    }
    return data;
  }
}

/* ---------- Campos personalizados ---------- */

let _fieldCache = null; // { byKey: {nuestraKey -> {id, fieldKey}}, byId: {id -> nuestraKey}, at }

function slug(name) {
  return name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

async function loadFieldMap(force) {
  if (_fieldCache && !force && Date.now() - _fieldCache.at < 10 * 60 * 1000) return _fieldCache;
  const data = await api(`/locations/${LOCATION}/customFields`);
  const list = data.customFields || [];
  const byKey = {}, byId = {};
  for (const f of FIELDS) {
    const wanted = slug(f.name);
    const found = list.find(cf => slug(cf.name || "") === wanted);
    if (found) { byKey[f.key] = { id: found.id, fieldKey: found.fieldKey }; byId[found.id] = f.key; }
  }
  _fieldCache = { byKey, byId, at: Date.now(), raw: list };
  return _fieldCache;
}

// Crea en GHL los campos que falten. Devuelve un reporte.
async function ensureCustomFields() {
  const map = await loadFieldMap(true);
  const report = { creados: [], existentes: [], actualizados: [], errores: [] };
  for (const f of FIELDS) {
    if (map.byKey[f.key]) {
      report.existentes.push(f.name);
      // Si el campo es de opciones y le faltan opciones nuevas, se actualiza la lista.
      if (f.options) {
        const actual = (map.raw || []).find(cf => cf.id === map.byKey[f.key].id) || {};
        const tiene = (actual.picklistOptions || actual.options || []).map(o => (typeof o === "string" ? o : o.label || o.key || o.name));
        const faltan = f.options.filter(o => !tiene.includes(o));
        if (faltan.length) {
          try {
            await api(`/locations/${LOCATION}/customFields/${actual.id}`, {
              method: "PUT", body: { name: f.name, options: f.options }
            });
            report.actualizados.push(`${f.name} (+${faltan.join(", ")})`);
          } catch (e) {
            report.errores.push(`${f.name}: ${e.message}`);
          }
        }
      }
      continue;
    }
    try {
      const body = { name: f.name, dataType: f.type };
      if (f.options) body.options = f.options;
      await api(`/locations/${LOCATION}/customFields`, { method: "POST", body });
      report.creados.push(f.name);
    } catch (e) {
      report.errores.push(`${f.name}: ${e.message}`);
    }
  }
  await loadFieldMap(true);
  return report;
}

/* ---------- Contactos ---------- */

function contactToLead(c, map) {
  const lead = {
    id: c.id,
    nombre: [c.firstName, c.lastName].filter(Boolean).join(" ") || c.contactName || "",
    email: c.email || "",
    telefono: c.phone || "",
    tags: c.tags || [],
    creado: c.dateAdded || c.createdAt || null,
    fields: {}
  };
  const cfs = c.customFields || c.customField || [];
  for (const cf of cfs) {
    const key = map.byId[cf.id];
    if (key) lead.fields[key] = cf.value != null ? cf.value : cf.fieldValue;
  }
  return lead;
}

function fieldsToCustom(fields, map) {
  const out = [];
  for (const [key, value] of Object.entries(fields || {})) {
    const f = map.byKey[key];
    if (f) out.push({ id: f.id, value: value == null ? "" : String(value) });
  }
  return out;
}

// Lista con GET /contacts/ y no con /contacts/search: el search no devuelve
// los campos personalizados, y todas las colas dependen de ellos.
async function listContacts() {
  const map = await loadFieldMap();
  const leads = [];
  let url = `/contacts/?locationId=${LOCATION}&limit=100`;
  for (let page = 0; page < 300 && url; page++) { // hasta 30.000 contactos
    const data = await api(url);
    const items = data.contacts || [];
    for (const c of items) leads.push(contactToLead(c, map));
    const meta = data.meta || {};
    url = null;
    if (items.length === 100) {
      if (meta.nextPageUrl) {
        const u = new URL(meta.nextPageUrl);
        url = u.pathname + u.search;
      } else if (meta.startAfterId) {
        url = `/contacts/?locationId=${LOCATION}&limit=100&startAfterId=${meta.startAfterId}${meta.startAfter ? "&startAfter=" + meta.startAfter : ""}`;
      }
    }
  }
  return leads;
}

async function getContact(id) {
  const map = await loadFieldMap();
  const data = await api(`/contacts/${id}`);
  return contactToLead(data.contact || data, map);
}

async function findByPhoneOrEmail(phone, email) {
  const tryQuery = async (q) => {
    if (!q) return null;
    const data = await api("/contacts/search", {
      method: "POST",
      body: { locationId: LOCATION, pageLimit: 5, query: q }
    });
    const c = (data.contacts || [])[0];
    // El search no trae los campos personalizados: se busca la ficha completa.
    return c ? getContact(c.id) : null;
  };
  return (await tryQuery(phone)) || (await tryQuery(email));
}

// Actualiza el contacto. Si se pasa `base` (la ficha que ya tenemos), no vuelve a
// leer el contacto: devuelve la ficha resultante armada localmente (1 pedido en vez de 2-3).
async function updateContact(id, { nombre, email, telefono, fields, addTags }, base) {
  const map = await loadFieldMap();
  const actual = base || (addTags && addTags.length ? await getContact(id) : null);
  const body = {};
  if (nombre) { const p = nombre.trim().split(/\s+/); body.firstName = p.shift(); body.lastName = p.join(" "); }
  if (email) body.email = email;
  if (telefono) body.phone = telefono;
  if (fields) body.customFields = fieldsToCustom(fields, map);
  let tags = actual ? (actual.tags || []) : null;
  if (addTags && addTags.length) {
    tags = Array.from(new Set([...(tags || []), ...addTags]));
    body.tags = tags;
  }
  await api(`/contacts/${id}`, { method: "PUT", body });
  if (!actual) return getContact(id);
  return {
    ...actual,
    nombre: nombre ? nombre.trim() : actual.nombre,
    email: email || actual.email,
    telefono: telefono || actual.telefono,
    tags: tags || actual.tags,
    fields: { ...actual.fields, ...(fields || {}) }
  };
}

async function createContact({ nombre, email, telefono, fields, tags }) {
  const map = await loadFieldMap();
  const body = { locationId: LOCATION };
  if (nombre) { const p = nombre.trim().split(/\s+/); body.firstName = p.shift(); body.lastName = p.join(" "); }
  if (email) body.email = email;
  if (telefono) body.phone = telefono;
  if (fields) body.customFields = fieldsToCustom(fields, map);
  if (tags) body.tags = tags;
  const data = await api("/contacts/", { method: "POST", body });
  return contactToLead(data.contact || data, await loadFieldMap());
}

/* ---------- Custom values (mini KV para settings y reservas) ---------- */

async function getCustomValue(name) {
  const data = await api(`/locations/${LOCATION}/customValues`);
  const list = data.customValues || [];
  return list.find(v => v.name === name) || null;
}

async function setCustomValue(name, value) {
  const existing = await getCustomValue(name);
  if (existing) {
    await api(`/locations/${LOCATION}/customValues/${existing.id}`, { method: "PUT", body: { name, value } });
  } else {
    await api(`/locations/${LOCATION}/customValues`, { method: "POST", body: { name, value } });
  }
}

/* ---------- Calendario ---------- */

// Citas vigentes (no canceladas) de un calendario entre dos fechas (ms).
async function countAppointments(calendarId, desdeMs, hastaMs) {
  if (!calendarId) return null;
  const qs = new URLSearchParams({
    locationId: LOCATION,
    calendarId,
    startTime: String(desdeMs),
    endTime: String(hastaMs)
  });
  const data = await api(`/calendars/events?${qs}`);
  const events = data.events || [];
  return events.filter(e => !["cancelled", "canceled", "noshow", "invalid"].includes(String(e.appointmentStatus || "").toLowerCase())).length;
}

module.exports = {
  enabled,
  api,
  loadFieldMap,
  ensureCustomFields,
  listContacts,
  getContact,
  findByPhoneOrEmail,
  updateContact,
  createContact,
  getCustomValue,
  setCustomValue,
  countAppointments
};
