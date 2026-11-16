// Lo que comparten todos los scripts de la skill: rutas, la clave, el estilo y ffmpeg.
import fs from "node:fs";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";

export const SKILL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const MOTOR = path.join(SKILL, "motor");
export const ESTILO_MD = path.join(SKILL, "estilo.md");

export function fallar(msg) {
  console.error(`\n  ❌ ${msg}\n`);
  process.exit(1);
}

// Lee el .env de la skill sin mostrar nada en pantalla.
export function clave(nombre) {
  const f = path.join(SKILL, ".env");
  if (!fs.existsSync(f)) return null;
  for (const linea of fs.readFileSync(f, "utf8").split("\n")) {
    const m = linea.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m && m[1] === nombre && m[2]) return m[2].replace(/^["']|["']$/g, "");
  }
  return null;
}

// Los números del estilo viven en el primer bloque ```json de estilo.md.
export function leerEstilo() {
  if (!fs.existsSync(ESTILO_MD)) fallar(`No encuentro ${ESTILO_MD}`);
  const md = fs.readFileSync(ESTILO_MD, "utf8");
  const m = md.match(/```json\s*\n([\s\S]*?)```/);
  if (!m) fallar("estilo.md no tiene el bloque ```json con los números. Volvé a ponerlo (está en la plantilla).");
  try {
    return JSON.parse(m[1]);
  } catch (e) {
    fallar(`El bloque json de estilo.md está mal escrito: ${e.message}`);
  }
}

export function hay(cmd) {
  const r = spawnSync(cmd, ["-version"], {stdio: "ignore", shell: process.platform === "win32"});
  return r.status === 0;
}

export function ffmpeg(args, {silencioso = true} = {}) {
  if (!hay("ffmpeg")) fallar("Falta ffmpeg. Pedile a Claude que lo instale (está en INSTALACION.md, Paso 0).");
  const r = spawnSync("ffmpeg", ["-hide_banner", "-y", ...args], {encoding: "utf8", maxBuffer: 1 << 28});
  if (r.status !== 0 && !silencioso) console.error(r.stderr);
  return r;
}

export function probe(archivo) {
  const r = spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration:stream=codec_type,codec_name,width,height", "-of", "json", archivo], {encoding: "utf8"});
  if (r.status !== 0) fallar(`No pude leer el video ${archivo}`);
  const j = JSON.parse(r.stdout);
  const v = (j.streams || []).find((s) => s.codec_type === "video");
  return {duracion: Number(j.format.duration), codec: v?.codec_name, ancho: v?.width, alto: v?.height};
}

export const leerJson = (f) => JSON.parse(fs.readFileSync(f, "utf8"));
export const escribirJson = (f, o) => fs.writeFileSync(f, JSON.stringify(o, null, 2) + "\n");
