// Lee el informe de asistentes de Zoom (versión completa, con las secciones
// "Detalles del anfitrión / panelista / asistente") y arma una ficha por persona.
// Sigue el SOP "Sacar los asistentes de un webinar de Zoom y cruzarlos con los opt-ins":
//   - una fila por persona, no por sesión: se agrupa por mail (corrigiendo typos de dominio);
//     las filas sin mail se pegan a la persona con el mismo nombre, si hay una sola;
//   - los minutos vistos son la UNIÓN de los intervalos, no la suma;
//   - el anfitrión y los panelistas no cuentan como asistentes (aunque también aparezcan ahí);
//   - los bots de notas (Notetaker, Fireflies, Otter…) se descartan.
// Las horas del informe están en la hora de Argentina (UTC-3).

const TYPOS_DOMINIO = {
  "gamil.com": "gmail.com", "gmial.com": "gmail.com", "gmil.com": "gmail.com", "gmai.com": "gmail.com",
  "gmail.con": "gmail.com", "gmail.co": "gmail.com", "gmail.clm": "gmail.com", "gmail.cm": "gmail.com",
  "gmaill.com": "gmail.com", "hotmial.com": "hotmail.com", "hotmail.con": "hotmail.com", "hotmai.com": "hotmail.com",
  "yaoo.com": "yahoo.com", "yahoo.con": "yahoo.com", "outlook.con": "outlook.com"
};
const BOT = /notetaker|fireflies|otter\.ai|read\.ai|fathom|tl;dv|tldv|grain|bot\b/i;

function normEmail(e) {
  e = String(e || "").trim().toLowerCase();
  const i = e.lastIndexOf("@");
  if (i < 1) return e;
  let dom = e.slice(i + 1);
  dom = TYPOS_DOMINIO[dom] || dom.replace(/\.(con|cpm|clm|vom|comm)$/, ".com");
  return e.slice(0, i + 1) + dom;
}
// Nombre para comparar: sin tildes, sin signos, en minúscula.
function normNombre(n) {
  return String(n || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/[^a-z0-9ñ ]+/g, " ").replace(/\s+/g, " ").trim();
}
// "Nombre y apellido": al menos dos palabras de 2+ letras, sin números (descarta "iPhone", "91378246"…).
function nombreCompleto(n) {
  const p = normNombre(n).split(" ").filter(w => w.length >= 2 && !/\d/.test(w));
  return p.length >= 2 && !/^(iphone|samsung|android|ipad|admin)/.test(normNombre(n));
}

// CSV con comillas y comas adentro.
function filasCsv(txt) {
  const out = []; let fila = [], campo = "", comillas = false;
  txt = String(txt || "").replace(/^﻿/, "");
  for (let i = 0; i < txt.length; i++) {
    const c = txt[i];
    if (comillas) {
      if (c === '"') { if (txt[i + 1] === '"') { campo += '"'; i++; } else comillas = false; }
      else campo += c;
    } else if (c === '"') comillas = true;
    else if (c === ",") { fila.push(campo); campo = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && txt[i + 1] === "\n") i++;
      fila.push(campo); out.push(fila); fila = []; campo = "";
    } else campo += c;
  }
  if (campo || fila.length) { fila.push(campo); out.push(fila); }
  return out.map(f => f.map(x => x.trim()));
}

// "19/10/2026 07:03:37 PM" (hora de Argentina) → ms. Acepta también 24 h.
function fecha(s) {
  const m = String(s || "").match(/(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*([AaPp]\.?\s*[Mm]\.?)?/);
  if (!m) return null;
  let h = +m[4];
  const pm = m[7] && /p/i.test(m[7]), am = m[7] && /a/i.test(m[7]);
  if (pm && h < 12) h += 12;
  if (am && h === 12) h = 0;
  return Date.UTC(+m[3], +m[2] - 1, +m[1], h + 3, +m[5], +(m[6] || 0)); // UTC-3 → UTC
}

// Minutos de la unión de intervalos [a, b] en ms.
function unionMin(iv) {
  const s = iv.filter(x => x[0] != null && x[1] != null && x[1] >= x[0]).sort((a, b) => a[0] - b[0]);
  let total = 0, ini = null, fin = null;
  for (const [a, b] of s) {
    if (ini == null) { ini = a; fin = b; continue; }
    if (a <= fin) fin = Math.max(fin, b);
    else { total += fin - ini; ini = a; fin = b; }
  }
  if (ini != null) total += fin - ini;
  return Math.round(total / 60000);
}

function leerInforme(txt) {
  const filas = filasCsv(txt);
  const meta = { tema: "", inicio: null, duracion: null, exclusivos: null, totales: null };
  let seccion = null, cab = null;
  const staff = new Set(), sesiones = [];
  for (let i = 0; i < filas.length; i++) {
    const f = filas[i];
    const c0 = (f[0] || "").toLowerCase();
    if (!f.some(Boolean)) continue;
    if (c0.startsWith("tema") && f.some(x => /inicio real/i.test(x))) {
      const v = filas[i + 1] || [];
      const col = (re) => f.findIndex(x => re.test(x));
      meta.tema = v[col(/^tema/i)] || "";
      meta.inicio = fecha(v[col(/inicio real/i)]);
      meta.duracion = parseInt(v[col(/duraci/i)], 10) || null;
      meta.exclusivos = parseInt(v[col(/exclusivos/i)], 10) || null;
      meta.totales = parseInt(v[col(/usuarios totales/i)], 10) || null;
      i++; continue;
    }
    if (c0.startsWith("detalles del anfitri")) { seccion = "staff"; cab = null; continue; }
    if (c0.startsWith("detalles de panelista")) { seccion = "staff"; cab = null; continue; }
    if (c0.startsWith("detalles de asistente")) { seccion = "asistente"; cab = null; continue; }
    if (!seccion) continue;
    if (!cab) {
      if (f.some(x => /correo/i.test(x))) {
        const idx = (re) => f.findIndex(x => re.test(x));
        cab = { nombre: idx(/nombre de usuario/i), email: idx(/correo/i), entra: idx(/incorporaci/i),
          sale: idx(/salida/i), pais: idx(/pa[ií]s/i) };
      }
      continue;
    }
    const email = normEmail(f[cab.email]), nombre = f[cab.nombre] || "";
    if (seccion === "staff") { if (email) staff.add(email); continue; }
    sesiones.push({ nombre, email, crudo: String(f[cab.email] || "").trim().toLowerCase(), entra: fecha(f[cab.entra]), sale: fecha(f[cab.sale]), pais: f[cab.pais] || "" });
  }

  // Agrupar: por mail; las filas sin mail, por nombre (pegadas a la persona con ese nombre si hay una sola).
  const bots = [], porEmail = new Map(), sinMail = [];
  let filasStaff = 0;
  for (const s of sesiones) {
    if (s.email && staff.has(s.email)) { filasStaff++; continue; }
    if (BOT.test(s.nombre)) { bots.push(s.nombre); continue; }
    if (!s.email) { sinMail.push(s); continue; }
    if (!porEmail.has(s.email)) porEmail.set(s.email, []);
    porEmail.get(s.email).push(s);
  }
  const personas = [...porEmail.entries()].map(([email, ss]) => ({ email, ss }));
  const unidosPorNombre = [];
  for (const s of sinMail) {
    const n = normNombre(s.nombre);
    const mismas = personas.filter(p => p.ss.some(x => normNombre(x.nombre) === n));
    if (n && mismas.length === 1) { mismas[0].ss.push(s); unidosPorNombre.push(s.nombre); continue; }
    const otra = personas.find(p => !p.email && normNombre(p.ss[0].nombre) === n);
    if (otra) otra.ss.push(s); else personas.push({ email: "", ss: [s] });
  }

  const fin = meta.inicio && meta.duracion ? meta.inicio + meta.duracion * 60000 : null;
  const aMin = (ms) => meta.inicio != null && ms != null ? Math.max(0, Math.round((ms - meta.inicio) / 60000)) : null;
  const lista = personas.map(p => {
    const entra = Math.min(...p.ss.map(s => s.entra).filter(x => x != null));
    const sale = Math.max(...p.ss.map(s => s.sale).filter(x => x != null));
    const nombres = [...new Set(p.ss.map(s => s.nombre).filter(Boolean))];
    // El nombre "más completo" (más palabras) es el que se muestra.
    const nombre = nombres.slice().sort((a, b) => normNombre(b).split(" ").length - normNombre(a).split(" ").length)[0] || "";
    let minutos = unionMin(p.ss.map(s => [s.entra, s.sale]));
    if (meta.duracion) minutos = Math.min(minutos, meta.duracion);
    const paises = p.ss.map(s => s.pais).filter(Boolean);
    return {
      email: p.email, emails: [...new Set(p.ss.map(s => s.email).filter(Boolean))], nombre, nombres,
      minutos, veces: p.ss.length, entro: Number.isFinite(entra) ? entra : null, salio: Number.isFinite(sale) ? sale : null,
      entroMin: aMin(entra), salioMin: aMin(sale), hastaElFinal: fin != null && Number.isFinite(sale) && sale >= fin - 3 * 60000,
      pais: paises.sort((a, b) => paises.filter(x => x === b).length - paises.filter(x => x === a).length)[0] || ""
    };
  });

  // Mails crudos distintos + filas sin mail: así cuenta Zoom los "espectadores exclusivos".
  const deStaff = (s) => s.email && staff.has(s.email);
  const crudos = new Set(sesiones.filter(s => s.crudo && !deStaff(s)).map(s => s.crudo));
  const zoomCuenta = crudos.size + sesiones.filter(s => !s.crudo).length;
  // Mails escritos con typo que se unieron a la persona con el mail bien escrito.
  const typos = [...crudos].filter(e => normEmail(e) !== e);
  return {
    meta: { ...meta, filas: sesiones.length, filasStaff, staff: [...staff], bots, unidosPorNombre, typos,
      personasZoom: zoomCuenta, mailsCrudos: crudos.size, personas: lista.length, fin },
    personas: lista.sort((a, b) => b.minutos - a.minutos)
  };
}

module.exports = { leerInforme, normEmail, normNombre, nombreCompleto, unionMin, fecha, filasCsv };
