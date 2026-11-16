#!/usr/bin/env node
// render.mjs — Arma el reel a partir de edicion.json.
//
//   node render.mjs <carpeta-del-reel>                 → reel-editado.mp4
//   node render.mjs <carpeta-del-reel> --borrador      → a mitad de resolución, para mirar rápido
//   node render.mjs <carpeta-del-reel> --fotos 0.3,8,21 → solo fotos de esos segundos (para revisar)
//
// Los tiempos de planos, zooms y CTA son del video YA EDITADO. En vez de un número se puede
// poner "cue": "la frase" y el script busca cuándo se dice esa frase en lo que quedó.
import fs from "node:fs";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {MOTOR, fallar, leerEstilo, leerJson, escribirJson} from "./comun.mjs";

const args = process.argv.slice(2);
const arg = args.find((a) => !a.startsWith("--") && !/^[\d.,]+$/.test(a));
// Absoluta: Remotion corre parado en motor/ y una ruta relativa no la encuentra.
const carpeta = arg && path.resolve(arg);
if (!carpeta) fallar("Uso: node render.mjs <carpeta-del-reel> [--borrador] [--fotos 1,5,9]");
const iFotos = args.indexOf("--fotos");
const fotos = iFotos >= 0 ? args[iFotos + 1].split(",").map(Number) : null;
const borrador = args.includes("--borrador");

if (!fs.existsSync(path.join(MOTOR, "node_modules", "remotion"))) fallar("El motor no está instalado. Corré: cd motor && npm install");
const ed = leerJson(path.join(carpeta, "edicion.json"));
const {palabras} = leerJson(path.join(carpeta, "palabras.json"));
const estilo = leerEstilo();
if (!fs.existsSync(path.join(carpeta, ed.toma))) fallar(`No encuentro la toma ${ed.toma} en la carpeta`);

// 1. Los tramos pegados uno atrás del otro.
let reloj = 0;
const segmentos = ed.segmentos.map((s) => {
  if (!(s.out > s.in)) fallar(`El tramo ${s.n ?? "?"} tiene out <= in`);
  const seg = {in: s.in, out: s.out, desde: +reloj.toFixed(3)};
  reloj += s.out - s.in;
  return seg;
});
const duracion = +reloj.toFixed(3);

// 2. Las palabras que quedaron, en el tiempo del video editado.
const quedan = [];
for (const s of segmentos) {
  for (const w of palabras) {
    if (w.s >= s.in - 0.02 && w.e <= s.out + 0.05) {
      quedan.push({w: w.w, s: +(s.desde + w.s - s.in).toFixed(3), e: +(s.desde + Math.min(w.e, s.out) - s.in).toFixed(3)});
    }
  }
}

const norm = (x) => x.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9ñ ]/g, "").trim();
const quedanN = quedan.map((w) => norm(w.w));

// Devuelve el índice de la primera palabra de la frase, buscando desde el segundo `desde`.
function buscar(frase, desde = 0) {
  const p = norm(frase).split(/\s+/).filter(Boolean);
  for (let i = 0; i < quedan.length; i++) {
    if (quedan[i].s < desde - 0.01) continue;
    if (p.every((x, k) => quedanN[i + k] === x)) return i;
  }
  return -1;
}

function resolver(item, desde, que) {
  if (item.cue) {
    const i = buscar(item.cue, desde);
    if (i < 0) fallar(`${que}: no encontré la frase "${item.cue}" en lo que quedó del video (después de ${desde.toFixed(1)} s)`);
    return {t: quedan[i].s, i};
  }
  if (typeof item.t !== "number") fallar(`${que}: le falta "t" o "cue"`);
  return {t: item.t, i: quedan.findIndex((w) => w.e > item.t)};
}

// Fin de la frase: la próxima pausa de más de 0,3 s o un punto.
function finDeFrase(i) {
  for (let k = i; k < quedan.length - 1; k++) {
    if (/[.?!]$/.test(quedan[k].w) || quedan[k + 1].s - quedan[k].e > 0.3) return quedan[k].e;
  }
  return duracion;
}

// 3. Planos.
let ultimo = 0;
const planos = (ed.planos || []).map((p, n) => {
  const {t} = resolver(p, ultimo, `plano ${n + 1}`);
  ultimo = t;
  if (p.plano !== "cam" && !p.broll) fallar(`plano ${n + 1} (${p.plano}) necesita "broll": el archivo de lo que va arriba`);
  if (p.broll && !fs.existsSync(path.join(carpeta, p.broll))) fallar(`No encuentro ${p.broll} en la carpeta del reel`);
  return {t: +t.toFixed(3), plano: p.plano, broll: p.broll};
});

// 4. Zooms. Sin "dur", el zoom dura hasta el final de la frase.
const CONECTORES = new Set(["y", "que", "o", "pero", "entonces", "bueno", "osea", "o sea", "porque", "como", "el", "la", "los", "las", "un", "una", "de", "en", "es"]);
const avisos = [];
ultimo = 0;
const zooms = (ed.zooms || []).map((z, n) => {
  const {t, i} = resolver(z, 0, `zoom ${n + 1}`);
  const t1 = typeof z.dur === "number" ? t + z.dur : finDeFrase(Math.max(0, i));
  if (i >= 0 && CONECTORES.has(quedanN[i])) avisos.push(`el zoom ${n + 1} arranca en "${quedan[i].w}", que es un conector`);
  return {t0: +t.toFixed(3), t1: +t1.toFixed(3), zoom: z.zoom || estilo.zoom.cuanto};
});

// 5. Hook y CTA.
const primerCambio = planos.find((p) => p.t > 0.5)?.t ?? 3;
const hook = ed.hook ? {texto: ed.hook.texto, desde: ed.hook.desde ?? 0, hasta: ed.hook.hasta ?? Math.min(primerCambio, estilo.hook.duracion ?? 3)} : null;
const cta = ed.cta ? {texto: ed.cta.texto, desde: resolver(ed.cta, 0, "cta").t} : null;
if (!hook && (planos[0]?.plano ?? "cam") === "cam") avisos.push("el arranque es solo tu cara: no hay texto ni nada visual en el hook");

// 6. Subtítulos en líneas.
const sub = estilo.subtitulos;
const lineas = [];
let cur = [];
const cerrar = () => {
  if (cur.length) lineas.push({t0: cur[0].s, t1: cur[cur.length - 1].e + 0.2, palabras: cur});
  cur = [];
};
quedan.forEach((w, k) => {
  const prev = quedan[k - 1];
  if (cur.length && (cur.length >= sub.palabrasPorLinea || (prev && w.s - prev.e > 0.3))) cerrar();
  cur.push({w: sub.sinPuntuacion === false ? w.w : w.w.replace(/[.,;:]+$/, ""), s: w.s, e: w.e});
  if (/[.?!]$/.test(w.w)) cerrar();
});
cerrar();
for (let k = 0; k < lineas.length - 1; k++) lineas[k].t1 = Math.min(lineas[k].t1, lineas[k + 1].t0);

const props = {toma: ed.toma, duracion, segmentos, planos, zooms, lineas, hook, cta, estilo};
const dirRender = path.join(carpeta, ".render");
fs.mkdirSync(dirRender, {recursive: true});
const fprops = path.join(dirRender, "props.json");
escribirJson(fprops, props);

// Resumen: lo que hay que mirar antes de abrir el video.
const porPlano = {};
planos.forEach((p, k) => {
  const fin = planos[k + 1]?.t ?? duracion;
  porPlano[p.plano] = (porPlano[p.plano] || 0) + fin - p.t;
});
console.error(`  Duración: ${duracion.toFixed(1)} s · ${segmentos.length} tramos · ${zooms.length} zooms · ${planos.length} planos`);
console.error("  Tiempo por plano: " + Object.entries(porPlano).map(([k, v]) => `${k} ${Math.round((v / duracion) * 100)}%`).join(" · "));
for (const a of avisos) console.error(`  ⚠️  ${a}`);

const npx = process.platform === "win32" ? "npx.cmd" : "npx";
const comun = [`--props=${fprops}`, `--public-dir=${path.resolve(carpeta)}`, "--log=error"];
const correr = (a) => {
  const r = spawnSync(npx, ["remotion", ...a, ...comun], {cwd: MOTOR, stdio: "inherit", shell: process.platform === "win32"});
  if (r.status !== 0) fallar("El render falló. Mirá el error de arriba.");
};

if (fotos) {
  const dirFotos = path.join(carpeta, "fotos");
  fs.mkdirSync(dirFotos, {recursive: true});
  for (const s of fotos) {
    const frame = Math.min(Math.round(s * 30), Math.round(duracion * 30) - 1);
    const out = path.join(dirFotos, `t${s.toFixed(1)}.png`);
    correr(["still", "src/index.ts", "Reel", out, `--frame=${frame}`]);
    console.log(out);
  }
} else {
  const out = path.join(carpeta, borrador ? "reel-borrador.mp4" : "reel-editado.mp4");
  correr(["render", "src/index.ts", "Reel", out, ...(borrador ? ["--scale=0.5"] : []), "--crf=18"]);
  console.error(`  ✅ ${out}`);
  console.log(out);
}
