#!/usr/bin/env node
// medir-referencia.mjs — Mide un reel que te gusta, para copiarle el estilo con números.
//
//   node medir-referencia.mjs <video> <nombre>
//
// Deja en estilo/referencias/<nombre>/:
//   medidas.md   cortes por minuto, largo de cada plano, ritmo de habla, el hook dicho
//   hoja-01.jpg… un cuadro cada medio segundo (6 por fila), para MIRAR subtítulos, planos y zooms
//   palabras.json la transcripción, si hay clave
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import {SKILL, clave, fallar, ffmpeg, probe, escribirJson} from "./comun.mjs";

const [video, nombre] = process.argv.slice(2);
if (!video || !nombre) fallar("Uso: node medir-referencia.mjs <video> <nombre>");
if (!fs.existsSync(video)) fallar(`No existe el video: ${video}`);
const dir = path.join(SKILL, "estilo", "referencias", nombre.replace(/[^\w.-]+/g, "-"));
fs.mkdirSync(dir, {recursive: true});
const info = probe(video);

// 1. Cortes: dónde cambia la imagen de golpe. Umbral bajo para que entren los cortes
//    "de salto" (misma cara, mismo fondo), que son los más comunes en un reel a cámara.
const UMBRAL = Number(process.env.UMBRAL || 0.12);
const r = ffmpeg(["-i", video, "-an", "-vf", `scale=270:-2,select='gt(scene,${UMBRAL})',showinfo`, "-f", "null", "-"]);
const cortes = [...r.stderr.matchAll(/pts_time:([\d.]+)/g)].map((m) => +(+m[1]).toFixed(2)).filter((t, i, a) => i === 0 || t - a[i - 1] > 0.25);
const bordes = [0, ...cortes, info.duracion];
const planos = bordes.slice(1).map((t, i) => +(t - bordes[i]).toFixed(2));
const ord = [...planos].sort((a, b) => a - b);
const mediana = ord.length ? ord[Math.floor(ord.length / 2)] : info.duracion;

// 2. Hojas de contacto: 2 cuadros por segundo, 6 por fila, 5 filas = 15 s por hoja.
for (const f of fs.readdirSync(dir)) if (/^hoja-\d+\.jpg$/.test(f)) fs.rmSync(path.join(dir, f));
ffmpeg(["-i", video, "-an", "-vf", "fps=2,scale=200:-2,tile=6x5:padding=4:color=white", "-q:v", "4", path.join(dir, "hoja-%02d.jpg")]);
const hojas = fs.readdirSync(dir).filter((f) => /^hoja-\d+\.jpg$/.test(f)).sort();

// 3. Transcripción (si hay clave): ritmo de habla y qué dice en el hook.
let habla = null;
const groq = clave("GROQ_API_KEY");
if (groq) {
  const audio = path.join(os.tmpdir(), `ref-${Date.now()}.mp3`);
  ffmpeg(["-i", video, "-vn", "-ac", "1", "-ar", "16000", "-b:a", "48k", audio]);
  const form = new FormData();
  form.append("file", new Blob([fs.readFileSync(audio)], {type: "audio/mpeg"}), "audio.mp3");
  form.append("model", "whisper-large-v3-turbo");
  form.append("response_format", "verbose_json");
  form.append("timestamp_granularities[]", "word");
  form.append("timestamp_granularities[]", "segment");
  const res = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {method: "POST", headers: {Authorization: `Bearer ${groq}`}, body: form});
  fs.rmSync(audio, {force: true});
  if (res.ok) {
    const j = await res.json();
    const palabras = (j.words || []).map((w) => ({w: w.word.trim(), s: w.start, e: w.end}));
    escribirJson(path.join(dir, "palabras.json"), {idioma: j.language, duracion: info.duracion, palabras});
    const hablado = palabras.length ? palabras.at(-1).e - palabras[0].s : 0;
    habla = {
      porMinuto: hablado ? Math.round((palabras.length / hablado) * 60) : 0,
      arranca: palabras[0]?.s ?? null,
      hook: palabras.filter((w) => w.s < 3).map((w) => w.w).join(" "),
    };
  } else {
    console.error(`  ⚠️  No se pudo transcribir (Groq ${res.status}). Sigue sin texto.`);
  }
}

const f1 = (x) => x.toFixed(1).replace(".", ",");
const md = `# Referencia: ${nombre}

Video: \`${path.basename(video)}\` · ${f1(info.duracion)} s · ${info.ancho}x${info.alto}

## Lo medido (lo cuenta el script, no se estima)

| Qué | Valor |
|---|---|
| Cortes | ${cortes.length} |
| Cortes por minuto | ${f1((cortes.length / info.duracion) * 60)} |
| Un corte cada (mediana) | ${f1(mediana)} s |
| Plano más largo | ${f1(Math.max(...planos))} s |
| Primer corte | ${cortes.length ? f1(cortes[0]) + " s" : "no corta"} |
${habla ? `| Palabras por minuto | ${habla.porMinuto} |\n| Empieza a hablar a los | ${f1(habla.arranca)} s |\n| Lo que dice en los primeros 3 s | "${habla.hook}" |\n` : ""}
Cortes en: ${cortes.map(f1).join(" · ") || "—"}

> El detector cuenta un corte cuando la imagen cambia de golpe. Un zoom seco también cuenta
> como corte, y un fundido lento puede no contar. Confirmarlo mirando las hojas.

## Lo que se ve (lo completa Claude mirando las hojas, con el alumno)

Hojas: ${hojas.join(", ")} — cada cuadro es medio segundo, de izquierda a derecha y de arriba
abajo; cada hoja son 15 segundos.

- Subtítulos (fuente, tamaño, color, dónde van, cuántas palabras, si resalta la palabra):
- Planos (cámara sola, mitad y mitad, pantalla completa de lo que muestra):
- Zooms (cuándo, cuánto, sobre qué frase):
- Hook (qué hay en pantalla además de la cara en el primer segundo):
- CTA (cómo se ve el cierre):
- Otros (stickers, emojis, flechas, sonido):

## Lo que le gusta al alumno de esta referencia

(Se escribe con sus palabras. Solo esto pasa a estilo.md.)
`;
fs.writeFileSync(path.join(dir, "medidas.md"), md);
console.error(`  ✅ ${cortes.length} cortes · ${hojas.length} hojas → ${dir}`);
console.log(dir);
