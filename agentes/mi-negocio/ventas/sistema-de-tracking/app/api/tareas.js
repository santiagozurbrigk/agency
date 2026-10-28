// Tareas del equipo (lib/tareas.js). Cualquier usuario logueado puede hacer todo.
//   GET                                        → { tareas, personas, fases, estados, yo, faltan }
//   POST { op:"crear", tarea }                 → { tarea }
//   POST { op:"editar", id, cambios }          → { tarea }   (estado, responsable, fecha, texto…)
//   POST { op:"comentar", id, texto }          → { tarea }
//   POST { op:"borrar", id }                   → {}
//   POST { op:"importar", md, base? }          → { creadas, existentes }  (tareas.md; no pisa ids que ya están)

const { requiere, usuarios } = require("../lib/auth");
const T = require("../lib/tareas");

module.exports = async function handler(req, res) {
  const user = requiere(req, res);
  if (!user) return;
  try {
    if (req.method === "GET") {
      // Si falta alguno de los tres en USERS_JSON no puede entrar ni tener «Mis tareas».
      const lista = usuarios();
      const estan = new Set(lista.map(u => T.personaDe(u.name)).filter(Boolean));
      const faltan = lista.length ? T.PERSONAS.filter(p => !estan.has(p)) : [];
      return res.status(200).json({ ok: true, tareas: await T.listar(), personas: T.PERSONAS,
        fases: T.FASES.map(f => f.nombre), estados: T.ESTADOS, yo: T.personaDe(user.name), faltan });
    }
    if (req.method !== "POST") {
      res.setHeader("Allow", "GET, POST");
      return res.status(405).json({ ok: false, error: "Método no permitido" });
    }
    let body = req.body;
    if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
    body = body || {};
    const id = String(body.id || "");
    switch (body.op) {
      case "crear": return res.status(200).json({ ok: true, tarea: await T.crear(body.tarea, user.name) });
      case "editar": return res.status(200).json({ ok: true, tarea: await T.editar(id, body.cambios, user.name) });
      case "comentar": return res.status(200).json({ ok: true, tarea: await T.comentar(id, body.texto, user.name) });
      case "borrar": await T.borrar(id); return res.status(200).json({ ok: true });
      case "importar": return res.status(200).json({ ok: true, ...(await T.importar(body.md, user.name, body.base)) });
      default: return res.status(400).json({ ok: false, error: "Operación inválida" });
    }
  } catch (e) {
    if (e instanceof T.ErrorTarea) return res.status(e.status).json({ ok: false, error: e.message });
    const msg = /store|token|BLOB|OIDC|credential/i.test(e.message)
      ? "El Blob store no está conectado a este proyecto en Vercel (Storage → Blob → Connect)."
      : e.message;
    return res.status(500).json({ ok: false, error: msg });
  }
};
