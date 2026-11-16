#!/usr/bin/env node
// configurar.mjs — Guarda la clave de Groq en el .env de la skill, de forma segura.
//
// Uso:  node configurar.mjs
//
// Lo que se escribe NO se ve en pantalla y NO queda en el historial de la terminal:
// pensado para configurar la skill mientras se comparte pantalla en una clase.

import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ENV_PATH = path.join(__dirname, ".env");

// ---------- Entrada oculta (sin eco en pantalla) ----------
function preguntarOculto(etiqueta) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    process.stdout.write(etiqueta);
    rl.stdoutMuted = true;
    rl._writeToOutput = function (s) {
      if (!rl.stdoutMuted) rl.output.write(s);
    };
    rl.question("", (valor) => {
      rl.close();
      process.stdout.write("\n");
      resolve(valor.trim());
    });
  });
}

// ---------- Validación contra la API real ----------
async function validarGroq(key) {
  const r = await fetch("https://api.groq.com/openai/v1/models", {
    headers: { Authorization: `Bearer ${key}` },
  });
  if (r.status === 401) return { ok: false, msg: "la clave no es válida" };
  if (!r.ok) return { ok: false, msg: `Groq respondió ${r.status}` };
  return { ok: true, msg: "clave activa" };
}

// ---------- Pedir + validar, con reintentos ----------
async function pedir(nombre, etiqueta, prefijo, validar) {
  for (let intento = 1; ; intento++) {
    const valor = await preguntarOculto(etiqueta);

    if (!valor) {
      console.log("   ⚠️  No pegaste nada. Probá de nuevo.\n");
      continue;
    }
    if (prefijo && !valor.startsWith(prefijo)) {
      console.log(`   ⚠️  Eso no parece un ${nombre}: tiene que empezar con "${prefijo}". Probá de nuevo.\n`);
      continue;
    }

    process.stdout.write("   verificando...");
    let res;
    try {
      res = await validar(valor);
    } catch (e) {
      res = { ok: false, msg: `no se pudo verificar (${e.message}). ¿Hay internet?` };
    }

    if (res.ok) {
      console.log(`\r   ✅ ${nombre} OK — ${res.msg}\n`);
      return valor;
    }
    console.log(`\r   ❌ ${res.msg}\n`);
    if (intento >= 3) {
      console.log("   Revisá el paso de INSTALACION.md donde se saca la clave y volvé a correr: node configurar.mjs\n");
      process.exit(1);
    }
  }
}

async function main() {
  console.log("\n  Configuración de la skill — Editar reel");
  console.log("  ───────────────────────────────────────");
  console.log("  Pegá la clave y apretá Enter.");
  console.log("  NO se va a ver en pantalla: es a propósito, por seguridad.\n");

  if (!process.stdin.isTTY) {
    console.error("  ERROR: este script necesita una terminal interactiva.");
    console.error("  Abrí la terminal y corré:  node configurar.mjs\n");
    process.exit(1);
  }

  const groq = await pedir("clave de Groq", "  Clave de Groq (gsk_...): ", "gsk_", validarGroq);

  fs.writeFileSync(ENV_PATH, `GROQ_API_KEY=${groq}\n`, { mode: 0o600 });
  try {
    fs.chmodSync(ENV_PATH, 0o600); // en Windows no aplica, no importa
  } catch {}

  const gitignore = path.join(__dirname, ".gitignore");
  if (!fs.existsSync(gitignore)) fs.writeFileSync(gitignore, ".env\nmotor/node_modules/\n");

  console.log("  ───────────────────────────────────────");
  console.log("  ✅ Listo. La clave quedó guardada en:");
  console.log(`     ${ENV_PATH}`);
  console.log("     (solo tu usuario puede leer ese archivo)\n");
}

main().catch((e) => {
  console.error(`\n  Error: ${e.message}\n`);
  process.exit(1);
});
