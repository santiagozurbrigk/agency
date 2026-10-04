// Sube el comprobante de un pago a Vercel Blob y lo ata al pago del lead.
// Necesita la variable BLOB_READ_WRITE_TOKEN (se crea sola al agregar un Blob store al proyecto en Vercel).
// POST { id, n, filename, contentType, dataBase64 }

const { requiere } = require("../lib/auth");
const store = require("../lib/store");

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

module.exports = async function handler(req, res) {
  const user = requiere(req, res);
  if (!user) return;
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Método no permitido" });
  }
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return res.status(500).json({ ok: false, error: "Falta el Blob store: en Vercel, Storage → Create → Blob, y conectalo al proyecto." });
  }
  try {
    let body = req.body;
    if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
    const { id, n, filename, contentType, dataBase64 } = body || {};
    if (!id || !n || !dataBase64) return res.status(400).json({ ok: false, error: "Faltan datos" });

    const buf = Buffer.from(dataBase64, "base64");
    if (buf.length > MAX_BYTES) return res.status(400).json({ ok: false, error: "El archivo pasa los 8 MB" });

    const limpio = String(filename || "comprobante").replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
    const path = `comprobantes/${id}/pago-${n}-${limpio}`;
    const up = await fetch(`https://blob.vercel-storage.com/${path}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "x-api-version": "7",
        "x-content-type": contentType || "application/octet-stream",
        "x-add-random-suffix": "1"
      },
      body: buf
    });
    const data = await up.json().catch(() => ({}));
    if (!up.ok || !data.url) {
      return res.status(502).json({ ok: false, error: "No se pudo subir el archivo: " + JSON.stringify(data).slice(0, 200) });
    }

    // Ata la URL al pago.
    const lead = await store.getLead(id);
    if (!lead) return res.status(404).json({ ok: false, error: "Lead no encontrado" });
    let venta;
    try { venta = JSON.parse(lead.fields.venta_json || "null"); } catch (e) { venta = null; }
    if (!venta) return res.status(400).json({ ok: false, error: "Este lead no tiene una venta registrada" });
    const pago = venta.pagos.find(p => p.n === Number(n));
    if (!pago) return res.status(400).json({ ok: false, error: "Pago inexistente" });
    pago.comprobante = data.url;
    await store.registrar(id, user.name, `Comprobante del pago ${n} subido`, { venta_json: JSON.stringify(venta) });

    return res.status(200).json({ ok: true, url: data.url });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
