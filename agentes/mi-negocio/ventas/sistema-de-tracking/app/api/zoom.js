// Cruce de los asistentes de Zoom con los opt-ins (SOP "Sacar los asistentes de un webinar de Zoom
// y cruzarlos con los opt-ins").
//
//   GET                      → el último cruce (verificación, sin identificar, hitos de la clase).
//   POST { csv }             → lee el informe de asistentes, cruza cada persona con su lead y le guarda
//                              en la ficha cuánto vio, cuándo entró y se fue, cuántas veces entró y el país
//                              (zoom_json), y la marca «Asistió a la clase».
//   POST { hitos }           → guarda en qué minuto empezó la oferta, se dijo el precio y se abrió el Q&A.
//
// Cruce: primero por mail (corrigiendo typos de dominio de los dos lados). Si no hay match por mail,
// por nombre, pero SOLO si tiene nombre y apellido y aparece una sola vez en los opt-ins y en Zoom.
// Mejor sin identificar que un teléfono equivocado en manos de un closer.

const { requiere } = require("../lib/auth");
const store = require("../lib/store");
const Z = require("../lib/zoom");

const num = (v) => { const n = parseInt(v, 10); return Number.isFinite(n) && n >= 0 ? n : null; };

async function enParalelo(items, n, fn) {
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => {
    while (i < items.length) { const k = i++; await fn(items[k]); }
  }));
}

module.exports = async function handler(req, res) {
  const user = requiere(req, res);
  if (!user) return;
  try {
    if (req.method === "GET") return res.status(200).json({ ok: true, zoom: await store.getZoom() });
    if (req.method !== "POST") {
      res.setHeader("Allow", "GET, POST");
      return res.status(405).json({ ok: false, error: "Método no permitido" });
    }
    let body = req.body;
    if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { return res.status(400).json({ ok: false, error: "JSON inválido" }); } }
    body = body || {};

    // Hitos de la clase (minutos desde el inicio real de la sesión de Zoom).
    if (body.hitos) {
      const actual = (await store.getZoom()) || {};
      const h = body.hitos;
      const apertura = /^\d{1,2}:\d{2}$/.test(String(h.apertura || "")) ? String(h.apertura) : "";
      const zoom = await store.saveZoom({ ...actual, hitos: { apertura, oferta: num(h.oferta), precio: num(h.precio), qa: num(h.qa) } });
      return res.status(200).json({ ok: true, zoom });
    }

    if (!body.csv || String(body.csv).length < 50) return res.status(400).json({ ok: false, error: "Falta el informe de asistentes (CSV)" });
    const inf = Z.leerInforme(String(body.csv));
    if (!inf.personas.length) return res.status(400).json({ ok: false, error: "No encontré asistentes. ¿Es el informe de asistentes completo, con las secciones «Detalles de asistente»?" });

    // Índices de los opt-ins: por mail normalizado y por nombre (solo nombres únicos).
    const leads = await store.listLeads();
    const porMail = new Map(), porNombre = new Map();
    for (const l of leads) {
      if (l.email) porMail.set(Z.normEmail(l.email), l);
      const n = Z.normNombre(l.nombre);
      if (n) porNombre.set(n, porNombre.has(n) ? null : l); // null = repetido, no se usa
    }
    const nombresZoom = new Map();
    for (const p of inf.personas) for (const n of new Set(p.nombres.map(Z.normNombre))) nombresZoom.set(n, (nombresZoom.get(n) || 0) + 1);

    const cruces = [], sinIdentificar = [];
    let viaMail = 0, viaNombre = 0;
    for (const p of inf.personas) {
      let lead = null, via = "";
      for (const e of [p.email, ...p.emails]) { const l = e && porMail.get(Z.normEmail(e)); if (l) { lead = l; via = "mail"; break; } }
      if (!lead) {
        for (const nom of p.nombres) {
          const n = Z.normNombre(nom);
          if (Z.nombreCompleto(nom) && porNombre.get(n) && nombresZoom.get(n) === 1) { lead = porNombre.get(n); via = "nombre"; break; }
        }
      }
      if (lead && cruces.some(c => c.lead.id === lead.id)) lead = null; // dos personas de Zoom al mismo lead: no se adivina
      if (!lead) {
        sinIdentificar.push({ n: p.nombre, e: p.email, m: p.minutos, s: p.salioMin, i: p.entroMin, v: p.veces, p: p.pais, f: p.hastaElFinal ? 1 : 0 });
        continue;
      }
      via === "mail" ? viaMail++ : viaNombre++;
      cruces.push({ lead, p, via });
    }

    // Escribe en cada ficha solo si cambió algo (1 pedido a GHL por lead, sin releer la ficha).
    await store.asegurarCampos(["zoom_json"]);
    let escritos = 0;
    const errores = [];
    await enParalelo(cruces, 4, async ({ lead, p, via }) => {
      const zj = JSON.stringify({ m: p.minutos, i: p.entroMin, s: p.salioMin, v: p.veces, p: p.pais, f: p.hastaElFinal ? 1 : 0, n: p.nombre, via });
      const f = lead.fields || {};
      if (f.zoom_json === zj && f.asistio === "Sí") return;
      try { await store.updateLead(lead.id, { fields: { zoom_json: zj, asistio: "Sí" } }, lead); escritos++; }
      catch (e) { errores.push(`${lead.nombre || lead.id}: ${e.message}`); }
    });

    const m = inf.meta;
    const pct = Math.round(sinIdentificar.length / inf.personas.length * 100);
    const zoom = {
      at: new Date().toISOString(), por: user.nombre || user.email || "",
      tema: m.tema, inicio: m.inicio, duracion: m.duracion, fin: m.fin,
      verificacion: {
        exclusivos: m.exclusivos, cuentaZoom: m.personasZoom, coincide: m.exclusivos == null || m.exclusivos === m.personasZoom,
        personas: m.personas, typos: m.typos, unidosPorNombre: m.unidosPorNombre, bots: m.bots,
        staff: m.staff, filas: m.filas, filasStaff: m.filasStaff
      },
      identificados: cruces.length, viaMail, viaNombre, pctSinIdentificar: pct, sinIdentificar,
      hitos: ((await store.getZoom()) || {}).hitos || { apertura: "", oferta: null, precio: null, qa: null }
    };
    await store.saveZoom(zoom);
    return res.status(200).json({ ok: true, zoom, escritos, errores });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
