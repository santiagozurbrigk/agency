#!/usr/bin/env node
// proponer-cortes.mjs — Primer borrador de edicion.json: saca los silencios.
//
//   node proponer-cortes.mjs <carpeta-del-reel>
//
// Junta las palabras en tramos y corta donde hay un silencio más largo que
// cortes.silencioMax (estilo.md). Las tomas repetidas NO las saca: eso lo decide
// Claude leyendo el texto de cada tramo, que queda escrito en el campo "texto", y en
// tramos.txt con el segundo de cada palabra.
import fs from "node:fs";
import path from "node:path";
import {fallar, leerEstilo, leerJson, escribirJson} from "./comun.mjs";

const [carpeta] = process.argv.slice(2);
if (!carpeta) fallar("Uso: node proponer-cortes.mjs <carpeta-del-reel>");
const fp = path.join(carpeta, "palabras.json");
if (!fs.existsSync(fp)) fallar("Falta palabras.json: corré primero preparar.mjs");
const {palabras, duracion} = leerJson(fp);
const {cortes} = leerEstilo();

const tramos = [];
let actual = null;
for (const w of palabras) {
  if (actual && w.s - actual.fin <= cortes.silencioMax) {
    actual.fin = w.e;
    actual.palabras.push(w.w);
    actual.det.push(w);
  } else {
    if (actual) tramos.push(actual);
    actual = {ini: w.s, fin: w.e, palabras: [w.w], det: [w]};
  }
}
if (actual) tramos.push(actual);

const segmentos = tramos.map((t, i) => ({
  n: i + 1,
  in: +Math.max(0, t.ini - cortes.aireAntes).toFixed(2),
  out: +Math.min(duracion, t.fin + cortes.aireDespues).toFixed(2),
  texto: t.palabras.join(" "),
}));

const salida = path.join(carpeta, "edicion.json");
if (fs.existsSync(salida) && !process.argv.includes("--pisar")) fallar("Ya hay un edicion.json en esa carpeta. Si querés empezar de cero: --pisar");
escribirJson(salida, {
  toma: "toma.mp4",
  segmentos,
  planos: [{cue: null, t: 0, plano: "cam", por: "arranque"}],
  zooms: [],
  hook: null,
  cta: null,
});
// tramos.txt: cada palabra con el segundo en que arranca, para recortar una toma repetida
// adentro de un tramo (el "in" nuevo es el segundo de la palabra donde arranca la buena).
fs.writeFileSync(
  path.join(carpeta, "tramos.txt"),
  tramos.map((t, i) => `## ${i + 1}  ${segmentos[i].in.toFixed(2)}-${segmentos[i].out.toFixed(2)}\n` + t.det.map((w) => `[${w.s.toFixed(2)}] ${w.w}`).join(" ")).join("\n\n") + "\n",
);
const queda = segmentos.reduce((a, s) => a + s.out - s.in, 0);
console.error(`  ✅ ${segmentos.length} tramos · la toma dura ${duracion.toFixed(1)} s y quedan ${queda.toFixed(1)} s sin silencios`);
for (const s of segmentos) console.log(`${String(s.n).padStart(3)}  ${s.in.toFixed(2)}-${s.out.toFixed(2)}  ${s.texto}`);
