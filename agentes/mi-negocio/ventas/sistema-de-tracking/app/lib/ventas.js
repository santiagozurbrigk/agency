// Ventas y clientes: precios, plan de pagos con vencimientos y datos del cliente.
// La venta vive como JSON en el campo «Venta (interno, no tocar)» del contacto:
// { oferta, forma, vendedor, fecha (cierre), nota, fathom, sena (USD), cliente: {...}, pagos: [{ n, monto, vence, pagado, fecha, comprobante }] }

const PRECIOS = {
  "Génesis": { PIF: [5000], "2 cuotas": [2850, 2850], "3 cuotas": [2000, 2000, 2000] },
  "Mentoría": { PIF: [2000], "2 cuotas": [1100, 1100] },
  // Ofertas del proceso post webinar sin precio fijo: se cargan con montos a mano.
  "OS Fast": {},
  "Subscriptions": {}
};
const ETAPA_VENTA = { "Génesis": "Venta Génesis", "Mentoría": "Venta Mentoría", "OS Fast": "Venta OS Fast", "Subscriptions": "Venta Subscriptions" };

// Datos del cliente que no son del contacto de GHL (nombre, email y WhatsApp sí lo son).
const CAMPOS_CLIENTE = ["marca", "instagram", "web", "documento", "pais"];

// Montos de cuotas cargados a mano: de 1 a 24, números mayores a 0 (redondeados a centavos).
function montosValidos(lista) {
  if (!Array.isArray(lista) || lista.length < 1 || lista.length > 24) return null;
  const montos = lista.map(m => Math.round(Number(m) * 100) / 100);
  return montos.every(m => Number.isFinite(m) && m > 0) ? montos : null;
}

// Día elegido a mano. «AAAA-MM-DD» se guarda al mediodía de Argentina
// para que no se corra de día al mostrarlo. Devuelve null si no es una fecha.
function fechaDia(v) {
  if (!v) return null;
  const s = String(v);
  const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(s) ? s + "T12:00:00-03:00" : s);
  return isNaN(d) ? null : d.toISOString();
}

// La misma fecha, n meses después (el 31 pasa al último día del mes si hace falta).
function sumarMeses(iso, n) {
  const d = new Date(iso);
  const dia = d.getUTCDate();
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() + n);
  const ultimo = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  d.setUTCDate(Math.min(dia, ultimo));
  return d.toISOString();
}

function limpiarCliente(c) {
  const out = {};
  for (const k of CAMPOS_CLIENTE) out[k] = String((c && c[k]) || "").trim().slice(0, 200);
  return out;
}

// Arma la venta nueva. Con forma «Personalizado» las cuotas vienen en data.montos.
// La primera cuota vence el día del cierre y cada una de las siguientes, un mes después.
// Devuelve { venta } o { error }.
function armarVenta(data, quien) {
  const { oferta, forma, vendedor } = data || {};
  if (!PRECIOS[oferta]) return { error: "Oferta inválida" };
  const montos = forma === "Personalizado" ? montosValidos(data.montos) : PRECIOS[oferta][forma];
  if (!montos) return { error: "Forma de pago o montos inválidos" };
  const cierre = fechaDia(data.fecha) || new Date().toISOString();
  return {
    venta: {
      oferta, forma, vendedor: vendedor || quien,
      fecha: cierre,
      nota: String(data.nota || "").trim(),
      fathom: String(data.fathom || "").trim().slice(0, 500),
      sena: Math.max(0, Math.round(Number(data.sena) * 100) / 100 || 0),
      cliente: limpiarCliente(data.cliente),
      pagos: montos.map((m, i) => ({ n: i + 1, monto: m, vence: sumarMeses(cierre, i), pagado: false, fecha: null, comprobante: null }))
    }
  };
}

// Día y hora elegidos a mano («AAAA-MM-DDTHH:MM» de un input datetime-local): hora de Argentina.
function fechaHora(v) {
  if (!v) return null;
  const s = String(v);
  const d = new Date(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(s) ? s + ":00-03:00" : s);
  return isNaN(d) ? null : d.toISOString();
}

function leerVenta(lead) {
  try { return JSON.parse((lead && lead.fields && lead.fields.venta_json) || "null"); } catch (e) { return null; }
}

module.exports = { PRECIOS, ETAPA_VENTA, CAMPOS_CLIENTE, montosValidos, fechaDia, fechaHora, sumarMeses, limpiarCliente, armarVenta, leerVenta };
