// Tareas del equipo (lanzamiento del webinar): crear, asignar y seguir entre Mati, Santi y Manu.
//
// Las tareas no son leads, así que no van a GHL: viven en un solo JSON en el Blob store
// privado (tareas/tareas.json). Cada escritura lleva el ETag de lo que se leyó (ifMatch):
// si otro guardó en el medio, se vuelve a leer y se aplica el cambio sobre la versión nueva.
// En modo demo (o sin @vercel/blob) quedan en memoria, con el mismo control de versión.

const path = require("path");
const store = require("./store");

let blob = null;
try { blob = require("@vercel/blob"); } catch (e) { /* sin el paquete: memoria */ }

const ARCHIVO = "tareas/tareas.json";
const INTENTOS = 6;

const PERSONAS = ["Mati", "Santi", "Manu"];
const ESTADOS = ["Por hacer", "En curso", "En revisión", "Hecha", "Bloqueada"];
// Fase → prefijo del id y días respecto del webinar para la fecha límite por defecto
// (null = sin fecha). Con el webinar el 17/11: adquisición y sistemas el 07/11 (arranca el 08),
// nutrición el 11/11 (arranca el 12), lo del día del webinar el 16/11, bonus el 14/11
// y post-webinar y B:52 el 17/11 (arrancan el 18).
const FASES = [
  { nombre: "Adquisición", prefijo: "ADQ", dias: -10 },
  { nombre: "Nutrición", prefijo: "NUT", dias: -6 },
  { nombre: "Webinar", prefijo: "WEB", dias: -1 },
  { nombre: "Post-webinar", prefijo: "POST", dias: 0 },
  { nombre: "B:52", prefijo: "B52", dias: 0 },
  { nombre: "Bonus", prefijo: "BON", dias: -3 },
  { nombre: "Sistemas", prefijo: "SIS", dias: -10 },
  { nombre: "Equipo", prefijo: "EQ", dias: null },
  { nombre: "Extras", prefijo: "EXT", dias: null }
];
const FASE = Object.fromEntries(FASES.map(f => [f.nombre, f]));
const DIA_RE = /^\d{4}-\d{2}-\d{2}$/;

const sinTildes = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

// El nombre de USERS_JSON decide quién sos: «Matías» → Mati, «Santiago» → Santi, «Manuel» → Manu.
function personaDe(nombre) {
  const n = sinTildes(nombre).trim();
  if (/^(mati|matias)\b/.test(n)) return "Mati";
  if (/^(santi|santiago)\b/.test(n)) return "Santi";
  if (/^(manu|manuel)\b/.test(n)) return "Manu";
  return null;
}

function venceDefault(fase, webinar) {
  const f = FASE[fase];
  if (!f || f.dias == null || !DIA_RE.test(webinar || "")) return "";
  return new Date(Date.parse(webinar + "T12:00:00Z") + f.dias * 864e5).toISOString().slice(0, 10);
}

/* ---------- Guardado ---------- */

class Conflicto extends Error {}
// Error de validación: el endpoint lo devuelve con este status.
class ErrorTarea extends Error { constructor(msg, status) { super(msg); this.status = status || 400; } }

const usaBlob = () => Boolean(blob) && !store.DEMO;
let MEM = { doc: { tareas: [] }, etag: "0" };
let ANTES_DE_ESCRIBIR = null; // tests: simula otra instancia que guarda entre la lectura y la escritura

async function leer() {
  if (!usaBlob()) return { doc: JSON.parse(JSON.stringify(MEM.doc)), etag: MEM.etag };
  const r = await blob.get(ARCHIVO, { access: "private", useCache: false }).catch(e => {
    if (e instanceof blob.BlobNotFoundError) return null;
    throw e;
  });
  if (!r || r.statusCode !== 200 || !r.stream) return { doc: { tareas: [] }, etag: null };
  const txt = await new Response(r.stream).text();
  let doc;
  try { doc = JSON.parse(txt); } catch (e) { doc = null; }
  return { doc: doc && Array.isArray(doc.tareas) ? doc : { tareas: [] }, etag: r.blob.etag };
}

async function escribir(doc, etag) {
  if (!usaBlob()) {
    if (ANTES_DE_ESCRIBIR) { const f = ANTES_DE_ESCRIBIR; ANTES_DE_ESCRIBIR = null; f(); }
    if (etag !== MEM.etag) throw new Conflicto();
    MEM = { doc: JSON.parse(JSON.stringify(doc)), etag: String(Number(MEM.etag) + 1) };
    return;
  }
  try {
    await blob.put(ARCHIVO, JSON.stringify(doc), {
      access: "private", addRandomSuffix: false, contentType: "application/json",
      // La primera vez no hay archivo: si otro lo creó en el medio, falla y se reintenta.
      ...(etag ? { allowOverwrite: true, ifMatch: etag } : { allowOverwrite: false })
    });
  } catch (e) {
    if (e instanceof blob.BlobPreconditionFailedError || /already exists|precondition/i.test(e.message)) throw new Conflicto();
    throw e;
  }
}

// Aplica `fn` sobre la última versión y guarda; si otro guardó en el medio, reintenta.
// Dentro de una instancia los cambios van de a uno, así casi nunca hace falta reintentar.
let cola = Promise.resolve();
function cambiar(fn) {
  const p = cola.then(async () => {
    for (let i = 0; i < INTENTOS; i++) {
      const { doc, etag } = await leer();
      const out = fn(doc);
      try { await escribir(doc, etag); return out; } catch (e) {
        if (!(e instanceof Conflicto)) throw e;
        await new Promise(r => setTimeout(r, 40 * (i + 1) + Math.random() * 60));
      }
    }
    throw new ErrorTarea("Hubo muchos cambios a la vez. Probá de nuevo.", 409);
  });
  cola = p.catch(() => {});
  return p;
}

async function listar() {
  return (await leer()).doc.tareas;
}

/* ---------- Validación ---------- */

const texto = (v, max) => String(v == null ? "" : v).trim().slice(0, max);

// Normaliza los campos editables de una tarea. `parcial` = solo los que vinieron.
function limpiar(data, parcial) {
  const out = {};
  const hay = (k) => !parcial || data[k] !== undefined;
  if (hay("titulo")) {
    out.titulo = texto(data.titulo, 200);
    if (!out.titulo) throw new ErrorTarea("Falta el título");
  }
  if (hay("fase")) {
    out.fase = texto(data.fase, 40);
    if (!FASE[out.fase]) throw new ErrorTarea("Fase inválida");
  }
  if (hay("cantidad")) {
    out.cantidad = parseInt(data.cantidad, 10);
    if (!(out.cantidad >= 1 && out.cantidad <= 999)) out.cantidad = 1;
  }
  if (hay("responsable")) {
    out.responsable = texto(data.responsable, 20);
    if (out.responsable && !PERSONAS.includes(out.responsable)) throw new ErrorTarea("Responsable inválido: tiene que ser Mati, Santi o Manu");
  }
  if (hay("estado")) {
    out.estado = texto(data.estado, 20) || "Por hacer";
    if (!ESTADOS.includes(out.estado)) throw new ErrorTarea("Estado inválido");
  }
  if (hay("vence")) {
    out.vence = texto(data.vence, 10);
    if (out.vence && !DIA_RE.test(out.vence)) throw new ErrorTarea("La fecha límite tiene que ser una fecha");
  }
  if (hay("agente")) out.agente = texto(data.agente, 300);
  if (hay("referencia")) out.referencia = texto(data.referencia, 600);
  if (hay("link")) {
    out.link = texto(data.link, 500);
    if (out.link && !/^https?:\/\//i.test(out.link)) throw new ErrorTarea("El link tiene que empezar con http:// o https://");
  }
  if (hay("notas")) out.notas = texto(data.notas, 4000);
  return out;
}

function nuevoId(tareas, fase) {
  const pre = FASE[fase].prefijo;
  const re = new RegExp(`^${pre}-(\\d+)$`);
  const max = tareas.reduce((m, t) => { const x = re.exec(t.id); return x ? Math.max(m, Number(x[1])) : m; }, 0);
  return `${pre}-${String(max + 1).padStart(2, "0")}`;
}

const ahora = () => new Date().toISOString();
const anotar = (t, quien, que) => { (t.historial || (t.historial = [])).push({ quien, cuando: ahora(), que }); };

// Qué cambió, en palabras, para el historial.
function describir(antes, despues) {
  const out = [];
  if (despues.estado !== undefined && despues.estado !== antes.estado) out.push(`Estado: ${antes.estado} → ${despues.estado}`);
  if (despues.responsable !== undefined && despues.responsable !== antes.responsable)
    out.push(despues.responsable ? `Asignó a ${despues.responsable}` : `Sacó a ${antes.responsable || "nadie"} como responsable`);
  if (despues.vence !== undefined && despues.vence !== antes.vence) out.push(despues.vence ? `Fecha límite: ${despues.vence}` : "Sacó la fecha límite");
  const otros = ["titulo", "fase", "cantidad", "agente", "referencia", "link", "notas"].filter(k => despues[k] !== undefined && despues[k] !== antes[k]);
  const NOMBRE = { titulo: "título", fase: "fase", cantidad: "cantidad", agente: "agente", referencia: "referencia", link: "link", notas: "notas" };
  if (otros.length) out.push("Editó " + otros.map(k => NOMBRE[k]).join(", "));
  return out;
}

/* ---------- Operaciones ---------- */

async function crear(data, quien) {
  const campos = limpiar(data || {}, false);
  const { tareasWebinar } = await store.getSettings();
  return cambiar(doc => {
    const t = {
      id: nuevoId(doc.tareas, campos.fase), ...campos,
      vence: campos.vence || venceDefault(campos.fase, tareasWebinar),
      comentarios: [], historial: [], creadoPor: quien, creado: ahora(), actualizado: ahora(), actualizadoPor: quien
    };
    anotar(t, quien, "Creó la tarea");
    doc.tareas.push(t);
    return t;
  });
}

async function editar(id, cambios, quien) {
  const campos = limpiar(cambios || {}, true);
  return cambiar(doc => {
    const t = doc.tareas.find(x => x.id === id);
    if (!t) throw new ErrorTarea("La tarea no existe (¿la borró alguien?)", 404);
    const que = describir(t, campos);
    if (!que.length) return t;
    Object.assign(t, campos, { actualizado: ahora(), actualizadoPor: quien });
    for (const q of que) anotar(t, quien, q);
    return t;
  });
}

async function comentar(id, txt, quien) {
  const limpio = texto(txt, 2000);
  if (!limpio) throw new ErrorTarea("El comentario está vacío");
  return cambiar(doc => {
    const t = doc.tareas.find(x => x.id === id);
    if (!t) throw new ErrorTarea("La tarea no existe (¿la borró alguien?)", 404);
    (t.comentarios || (t.comentarios = [])).push({ quien, cuando: ahora(), texto: limpio });
    t.actualizado = ahora(); t.actualizadoPor = quien;
    return t;
  });
}

async function borrar(id) {
  return cambiar(doc => {
    const i = doc.tareas.findIndex(x => x.id === id);
    if (i < 0) throw new ErrorTarea("La tarea no existe (¿la borró alguien?)", 404);
    doc.tareas.splice(i, 1);
    return true;
  });
}

/* ---------- Importación desde tareas.md ---------- */

// Fase según el título de la sección («## Adquisición (10 días)», «## B:52 emails…»).
function faseDeTitulo(t) {
  const n = sinTildes(t);
  if (n.startsWith("adquisicion")) return "Adquisición";
  if (n.startsWith("nutricion")) return "Nutrición";
  if (n.startsWith("webinar")) return "Webinar";
  if (n.startsWith("post")) return "Post-webinar";
  if (n.startsWith("b:52") || n.startsWith("b52")) return "B:52";
  if (n.startsWith("bonus")) return "Bonus";
  if (n.startsWith("sistemas")) return "Sistemas";
  if (n.startsWith("equipo")) return "Equipo";
  if (n.startsWith("extras")) return "Extras";
  return null;
}

// Las rutas del .md son relativas a su carpeta: se pasan a rutas del repo, que es lo que
// se busca en Claude Code («../lanzamiento-19-10/x.md» → «mi-negocio/lanzamiento-19-10/x.md»).
function rutasDelRepo(celda, base) {
  return celda.replace(/`([^`]+)`/g, (_, r) =>
    /^\.{1,2}\/|\.(md|html|js|txt)$|\/$/.test(r) ? path.posix.join(base, r) + (r.endsWith("/") ? "/" : "") : r);
}

// Devuelve las tareas de las tablas del .md (las columnas son las de tareas.md).
function parsearMd(md, base) {
  base = base || "mi-negocio/webinar-17-11";
  const out = [];
  let fase = null;
  for (const linea of String(md || "").split(/\r?\n/)) {
    const tit = /^##\s+(.+)$/.exec(linea);
    if (tit) { fase = faseDeTitulo(tit[1]); continue; }
    if (!fase || !linea.trim().startsWith("|")) continue;
    const c = linea.trim().replace(/^\||\|$/g, "").split("|").map(x => x.trim());
    if (c.length < 6 || !/^[A-Z0-9]+-\d+$/.test(c[0])) continue; // encabezado, separador o fila rara
    const vacio = (x) => (x === "—" || x === "-" ? "" : x);
    out.push({
      id: c[0], titulo: c[1], fase, cantidad: parseInt(c[2], 10) || 1,
      agente: vacio(rutasDelRepo(c[3], base)).replace(/`/g, ""),
      referencia: vacio(rutasDelRepo(c[4], base)).replace(/`/g, ""),
      responsable: PERSONAS.includes(c[5]) ? c[5] : ""
    });
  }
  return out;
}

async function importar(md, quien, base) {
  const filas = parsearMd(md, base);
  if (!filas.length) throw new ErrorTarea("No encontré tareas en el archivo. Tiene que ser un tareas.md con las tablas por fase.");
  const { tareasWebinar } = await store.getSettings();
  return cambiar(doc => {
    const ids = new Set(doc.tareas.map(t => t.id));
    let creadas = 0, existentes = 0;
    for (const f of filas) {
      if (ids.has(f.id)) { existentes++; continue; }
      const t = { ...f, estado: "Por hacer", vence: venceDefault(f.fase, tareasWebinar), link: "", notas: "",
        comentarios: [], historial: [], creadoPor: quien, creado: ahora(), actualizado: ahora(), actualizadoPor: quien };
      anotar(t, quien, "Importó la tarea de tareas.md");
      doc.tareas.push(t); ids.add(f.id); creadas++;
    }
    return { creadas, existentes };
  });
}

// Para los tests.
function _reset() { MEM = { doc: { tareas: [] }, etag: "0" }; cola = Promise.resolve(); ANTES_DE_ESCRIBIR = null; }
// Otra instancia guarda `t` justo antes de la próxima escritura de esta (solo en memoria).
function _otraInstanciaGuarda(t) {
  ANTES_DE_ESCRIBIR = () => { MEM = { doc: { tareas: [...MEM.doc.tareas, t] }, etag: String(Number(MEM.etag) + 1) }; };
}

module.exports = {
  PERSONAS, ESTADOS, FASES, ErrorTarea,
  personaDe, venceDefault, parsearMd,
  listar, crear, editar, comentar, borrar, importar, _reset, _otraInstanciaGuarda
};
