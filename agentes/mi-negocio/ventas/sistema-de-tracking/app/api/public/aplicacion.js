// Formulario público de aplicación (applygenesis.com/aplication).
// Une la aplicación con el lead del optin: lo busca primero con los datos con los que se registró
// (`optin`: los guarda la landing en el navegador, o vienen en el link) y después con lo que escribió.
// Guarda todas las respuestas en la ficha, con el tag aplicacion-19-10, sin pisar el email ni el
// WhatsApp del optin (si escribió otros, quedan en el historial). Si no hay optin, crea el lead.
// Como los otros formularios: responde al instante y guarda en GHL en segundo plano.

const store = require("../../lib/store");
const P = require("../../lib/post");

const TAG = "aplicacion-19-10";
const PREGUNTAS = [
  ["objetivo", "Objetivo a 6 meses"], ["freno", "Qué lo frena"], ["hace_cuanto", "Hace cuánto y qué probó"],
  ["ciclo", "Ciclo"], ["facturacion", "Facturación"], ["inversion", "Inversión"]
];

const limpio = (v) => String(v || "").trim();
const mismoTel = (a, b) => store.normTel(a) === store.normTel(b);

// Busca el lead: primero con los datos del optin, después con los que escribió en la aplicación.
async function buscar(optin, telefono, email) {
  const intentos = [[optin.telefono, optin.email], [telefono, email]].filter(([t, e]) => t || e);
  for (const [t, e] of intentos) {
    const c = await store.enFoto(t, e);
    if (c) return { conocido: c };
  }
  for (const [t, e] of intentos) {
    const l = await store.findLead(t, e);
    if (l) return { lead: l };
  }
  return {};
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Método no permitido" });
  }
  try {
    let body = req.body;
    if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { return res.status(400).json({ ok: false, error: "JSON inválido" }); } }
    body = body || {};
    const nombre = limpio(body.nombre), email = limpio(body.email).toLowerCase(), telefono = limpio(body.telefono);
    if (!telefono || !email) return res.status(400).json({ ok: false, error: "Falta el WhatsApp o el email" });
    const optin = { telefono: limpio(body.optin && body.optin.telefono), email: limpio(body.optin && body.optin.email).toLowerCase() };
    const tracking = body.tracking && typeof body.tracking === "object" && Object.keys(body.tracking).length ? body.tracking : null;
    const link = body.tracking_link && typeof body.tracking_link === "object" ? body.tracking_link : {};

    // Menos de USD 1.000 → "Por el momento no podemos ayudarte" + Próximo ciclo (regla 5.4).
    const rechazado = body.inversion === "Menos de USD 1.000";
    const encontrado = await buscar(optin, telefono, email);
    // Proceso post webinar: SDR fijo por persona (50/50 entre Mati y Santi). El formulario termina
    // en el WhatsApp de ese SDR.
    const previo = (encontrado.conocido || encontrado.lead || {}).fields || {};
    const sdr = P.SDRS.includes(previo.sdr) ? previo.sdr : P.sdrPara(email, telefono);
    const settings = await store.getSettings();
    const wa = rechazado ? "" : (sdr === "Mati" ? settings.sdrMatiWa : settings.sdrSantiWa) || "";

    await store.enSegundoPlano(async () => {
      const lead = encontrado.lead || (encontrado.conocido ? await store.getLead(encontrado.conocido.id) : null);
      await store.asegurarCampos(["aplico_at", "sdr", "post_estado"]).catch(e => console.error("campos:", e.message));
      const fields = { aplico_at: new Date().toISOString() };
      if (!rechazado) {
        fields.sdr = sdr;
        const f0 = (lead && lead.fields) || {};
        if (!f0.post_estado && !String(f0.etapa || "").startsWith("Venta")) fields.post_estado = "Nuevo lead";
      }
      for (const [k] of PREGUNTAS) if (limpio(body[k])) fields[k] = limpio(body[k]);

      // Historial: todas las respuestas juntas, y por dónde llegó a la aplicación.
      const via = Object.keys(link).length ? ` · vía ${[link.utm_source, link.utm_medium, link.utm_content].filter(Boolean).join(" / ")}` : "";
      const lineas = [`Completó la aplicación${via}${rechazado ? "" : ` · SDR: ${sdr}`}`];
      if (rechazado) lineas[0] += " → inversión < USD 1.000 → Próximo ciclo";
      for (const [k, t] of PREGUNTAS) if (fields[k]) lineas.push(`${t}: ${fields[k]}`);

      if (rechazado) fields.etapa = "Próximo ciclo";
      else if (lead && (lead.fields || {}).etapa === "Próximo ciclo") fields.etapa = "En conversación";

      if (lead) {
        const f = lead.fields || {};
        if (!f.etapa && !fields.etapa) { fields.etapa = "Nuevo"; fields.intentos = "0"; }
        if (!f.origen && tracking) fields.origen = JSON.stringify(tracking);
        // Los datos del optin mandan: solo se completan si faltaban.
        const patch = { fields, addTags: [TAG] };
        if (!limpio(lead.nombre) && nombre) patch.nombre = nombre;
        if (!lead.email) patch.email = email;
        else if (lead.email.toLowerCase() !== email) lineas.push(`Email en la aplicación: ${email}`);
        if (!lead.telefono) patch.telefono = telefono;
        else if (!mismoTel(lead.telefono, telefono)) lineas.push(`WhatsApp en la aplicación: ${telefono}`);
        patch.fields.historial_json = store.historialCon(lead, "Sistema", lineas.join("\n"));
        await store.updateLead(lead.id, patch, lead);
      } else {
        lineas[0] += " (sin optin previo: no se encontró con este email ni WhatsApp)";
        await store.createLead({
          nombre, email, telefono,
          fields: { etapa: "Nuevo", intentos: "0", posible_duplicado: "Sí", ...fields,
            ...(tracking || Object.keys(link).length ? { origen: JSON.stringify(tracking || link) } : {}),
            historial_json: store.historialCon(null, "Sistema", lineas.join("\n")) },
          tags: [TAG]
        });
      }
    });

    return res.status(200).json({ ok: true, ruta: rechazado ? "rechazado" : "aplicado", sdr: rechazado ? "" : sdr, wa });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
