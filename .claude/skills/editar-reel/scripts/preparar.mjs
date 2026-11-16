#!/usr/bin/env node
// preparar.mjs — Deja la toma lista para editar.
//
//   node preparar.mjs <video> <carpeta-del-reel>
//
// 1. Copia la toma a la carpeta como toma.mp4 (si viene del iPhone en HEVC la pasa a H.264,
//    que es lo que lee el motor en cualquier computadora).
// 2. Saca el audio y lo transcribe palabra por palabra → palabras.json
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import {clave, fallar, ffmpeg, probe, escribirJson} from "./comun.mjs";

const [video, carpeta] = process.argv.slice(2);
if (!video || !carpeta) fallar("Uso: node preparar.mjs <video> <carpeta-del-reel>");
if (!fs.existsSync(video)) fallar(`No existe el video: ${video}`);
fs.mkdirSync(carpeta, {recursive: true});

const info = probe(video);
console.error(`  Toma: ${info.duracion.toFixed(1)} s · ${info.ancho}x${info.alto} · ${info.codec}`);
if (info.alto < info.ancho) console.error("  ⚠️  La toma es horizontal. El reel sale vertical: se va a recortar el centro.");

const toma = path.join(carpeta, "toma.mp4");
if (path.resolve(video) !== path.resolve(toma)) {
  if (info.codec === "h264" && /\.mp4$/i.test(video)) {
    fs.copyFileSync(video, toma);
  } else {
    console.error("  Convirtiendo a H.264 (tarda más o menos lo mismo que dura la toma)...");
    const r = ffmpeg(["-i", video, "-map", "0:v:0", "-map", "0:a:0", "-c:v", "libx264", "-preset", "veryfast", "-crf", "18", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", toma], {silencioso: false});
    if (r.status !== 0) fallar("No pude convertir la toma.");
  }
}

// Audio liviano para la transcripción (Groq acepta hasta 25 MB: así entra una hora).
const audio = path.join(os.tmpdir(), `editar-reel-${Date.now()}.mp3`);
if (ffmpeg(["-i", toma, "-vn", "-ac", "1", "-ar", "16000", "-b:a", "48k", audio]).status !== 0) fallar("No pude sacar el audio.");

const idioma = process.env.IDIOMA || "es";
let palabras;
const groq = clave("GROQ_API_KEY");
const deepgram = clave("DEEPGRAM_API_KEY");
if (groq) {
  console.error("  Transcribiendo con Groq...");
  const form = new FormData();
  form.append("file", new Blob([fs.readFileSync(audio)], {type: "audio/mpeg"}), "audio.mp3");
  form.append("model", "whisper-large-v3-turbo");
  form.append("language", idioma);
  form.append("response_format", "verbose_json");
  form.append("timestamp_granularities[]", "word");
  form.append("timestamp_granularities[]", "segment");
  const r = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {method: "POST", headers: {Authorization: `Bearer ${groq}`}, body: form});
  if (!r.ok) fallar(`Groq respondió ${r.status}: ${(await r.text()).slice(0, 300)}`);
  const j = await r.json();
  palabras = (j.words || []).map((w) => ({w: w.word.trim(), s: w.start, e: w.end}));
} else if (deepgram) {
  console.error("  Transcribiendo con Deepgram...");
  const r = await fetch(`https://api.deepgram.com/v1/listen?model=nova-3&language=${idioma}&smart_format=true&punctuate=true`, {method: "POST", headers: {Authorization: `Token ${deepgram}`, "Content-Type": "audio/mpeg"}, body: fs.readFileSync(audio)});
  if (!r.ok) fallar(`Deepgram respondió ${r.status}: ${(await r.text()).slice(0, 300)}`);
  const j = await r.json();
  palabras = j.results.channels[0].alternatives[0].words.map((w) => ({w: w.punctuated_word || w.word, s: w.start, e: w.end}));
} else {
  fallar("Falta la clave de Groq. Corré: node configurar.mjs");
}
fs.rmSync(audio, {force: true});

escribirJson(path.join(carpeta, "palabras.json"), {idioma, duracion: info.duracion, palabras});
console.error(`  ✅ ${palabras.length} palabras → ${path.join(carpeta, "palabras.json")}`);
console.log(palabras.map((w) => w.w).join(" "));
