// Comprobantes de pago en un Blob store PRIVADO de Vercel.
//   POST { id, n, filename, contentType, dataBase64 } → sube el archivo y lo ata al pago n del lead.
//   GET  ?path=comprobantes/...                       → lo sirve, solo a usuarios logueados.
// En Vercel el SDK se autentica solo (OIDC) cuando el store está conectado al proyecto.

const { Readable } = require("node:stream");
const { requiere } = require("../lib/auth");
const store = require("../lib/store");

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

let blob = null;
try { blob = require("@vercel/blob"); } catch (e) { /* sin el paquete: se avisa abajo */ }

module.exports = async function handler(req, res) {
  const user = requiere(req, res);
  if (!user) return;
  if (!blob) return res.status(500).json({ ok: false, error: "Falta el paquete @vercel/blob" });

  try {
    // Ver un comprobante.
    if (req.method === "GET") {
      const path = String(req.query.path || "");
      if (!path.startsWith("comprobantes/") || path.includes("..")) {
        return res.status(400).json({ ok: false, error: "Ruta inválida" });
      }
      const r = await blob.get(path, { access: "private" });
      if (!r || r.statusCode !== 200 || !r.stream) return res.status(404).json({ ok: false, error: "No encontrado" });
      res.setHeader("Content-Type", r.blob.contentType || "application/octet-stream");
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Cache-Control", "private, no-store");
      res.statusCode = 200;
      Readable.fromWeb(r.stream).pipe(res);
      return;
    }

    if (req.method !== "POST") {
      res.setHeader("Allow", "GET, POST");
      return res.status(405).json({ ok: false, error: "Método no permitido" });
    }

    // Subir un comprobante.
    let body = req.body;
    if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
    const { id, n, filename, contentType, dataBase64 } = body || {};
    if (!id || !n || !dataBase64) return res.status(400).json({ ok: false, error: "Faltan datos" });

    const buf = Buffer.from(dataBase64, "base64");
    if (buf.length > MAX_BYTES) return res.status(400).json({ ok: false, error: "El archivo pasa los 8 MB" });

    const lead = await store.getLead(id);
    if (!lead) return res.status(404).json({ ok: false, error: "Lead no encontrado" });
    let venta;
    try { venta = JSON.parse(lead.fields.venta_json || "null"); } catch (e) { venta = null; }
    if (!venta) return res.status(400).json({ ok: false, error: "Este lead no tiene una venta registrada" });
    const pago = venta.pagos.find(p => p.n === Number(n));
    if (!pago) return res.status(400).json({ ok: false, error: "Pago inexistente" });

    const limpio = String(filename || "comprobante").replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
    const subido = await blob.put(`comprobantes/${id}/pago-${n}-${limpio}`, buf, {
      access: "private",
      addRandomSuffix: true,
      contentType: contentType || "application/octet-stream"
    });

    pago.comprobante = subido.pathname;
    await store.registrar(id, user.name, `Comprobante del pago ${n} subido`, { venta_json: JSON.stringify(venta) }, lead);
    return res.status(200).json({ ok: true, path: subido.pathname });
  } catch (e) {
    const msg = /store|token|BLOB|OIDC|credential/i.test(e.message)
      ? "El Blob store no está conectado a este proyecto en Vercel (Storage → Blob → Connect)."
      : e.message;
    return res.status(500).json({ ok: false, error: msg });
  }
};
