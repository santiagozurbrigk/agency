// Las reglas del proceso, tal como quedaron en especificacion.md.

const FACT_ORDEN = ["Más de 100M", "Entre 50M y 100M", "Entre 30M y 50M", "Entre 10M y 30M", "Menos de 10M"];

// Opt-in desde el 14-oct: una sola pregunta, inversión diaria en Meta.
// De orden mayor a menor; califican los que invierten 100 dólares por día o más.
const INV_META_ORDEN = ["Más de 1.000 dólares", "De 500 a 1.000 dólares", "De 200 a 500 dólares", "De 100 a 200 dólares", "Menos de 100 dólares", "0, todavía no tengo marca"];
const INV_META_OK = INV_META_ORDEN.slice(0, 4);

function invierteMetaOk(v) {
  return INV_META_OK.includes(v);
}

function esConsumible(ciclo) {
  return Boolean(ciclo) && ciclo !== "No se termina, se compra una vez y listo";
}

function factura30oMas(facturacion) {
  return ["Entre 30M y 50M", "Entre 50M y 100M", "Más de 100M"].includes(facturacion);
}

function factura50oMas(facturacion) {
  return ["Entre 50M y 100M", "Más de 100M"].includes(facturacion);
}

function invierte3000oMas(inversion) {
  return ["Entre USD 3.000 y USD 6.000", "Más de USD 6.000"].includes(inversion);
}

// Califica en el opt-in (el mismo criterio que el Lead del píxel).
// Leads nuevos: inversión diaria en Meta. Leads viejos (sin esa respuesta): facturación de 30M o más.
function calificaOptin(f) {
  return f.inversion_meta ? invierteMetaOk(f.inversion_meta) : factura30oMas(f.facturacion);
}

// Regla 5.1: califica para Génesis.
function calificaGenesis(f) {
  if (f.inversion_meta) return invierteMetaOk(f.inversion_meta);
  return esConsumible(f.ciclo) && factura30oMas(f.facturacion);
}

// Regla 5.2: a qué calendario va el lead de la Agenda directa.
// manuLibre = Manu tiene menos de 10 llamadas post-clase (contando reservas vivas).
function rutaAgendaDirecta(f, manuLibre) {
  if (f.inversion === "Menos de USD 1.000") return "rechazado";
  const paraManu = esConsumible(f.ciclo) && factura50oMas(f.facturacion) && invierte3000oMas(f.inversion);
  return paraManu && manuLibre ? "manu" : "diego";
}

// Orden por tamaño: más facturación (o más inversión en Meta), más arriba. Sin dato, al final.
// Equivalencia aproximada entre las dos escalas para mezclar leads viejos y nuevos.
const RANGO_INV_META = [0, 1, 2, 3, 4, 5];
const RANGO_FACT = [0, 1, 3, 4, 5];
function rangoTamano(f) {
  const im = INV_META_ORDEN.indexOf(f.inversion_meta);
  if (im !== -1) return RANGO_INV_META[im];
  const fa = FACT_ORDEN.indexOf(f.facturacion);
  return fa === -1 ? 99 : RANGO_FACT[fa];
}
function porFacturacion(a, b) {
  return rangoTamano(a.fields) - rangoTamano(b.fields);
}

// Regla 5.6 + lo acordado: a qué grupo va cada lead después de la clase.
// Devuelve null si no entra a ningún grupo (pre-venta ya agendada, venta hecha, próximo ciclo, descartado).
function grupoDelLead(l) {
  const f = l.fields;
  const etapa = f.etapa || "";
  if (etapa === "Próximo ciclo") return null;
  if (etapa.startsWith("Venta")) return null;
  if (etapa === "Agendado con Manu (pre-venta)") return null;  // ya está en el núcleo
  if (f.agendo === "Sí" || etapa === "Llamada agendada") return "1";
  if (f.form_agenda === "Sí") return "2";                       // completó Agenda directa sin agendar → 1° del Grupo 2
  if (f.form_contacto === "Sí") return "2";
  if (f.asistio === "Sí") return "2";
  return "3";                                                    // está en el opt-in y no asistió
}

// Orden dentro del Grupo 2: 1° Agenda directa sin agendar, 2° Quiero que me contacten
// (por facturación), 3° asistió sin completar nada. Señal de compra desempata dentro de cada bloque.
function ordenGrupo2(a, b) {
  const bloque = (l) => l.fields.form_agenda === "Sí" ? 0 : l.fields.form_contacto === "Sí" ? 1 : 2;
  const ba = bloque(a), bb = bloque(b);
  if (ba !== bb) return ba - bb;
  const sa = a.fields.senal_compra === "Sí" ? 0 : 1;
  const sb = b.fields.senal_compra === "Sí" ? 0 : 1;
  if (sa !== sb) return sa - sb;
  return porFacturacion(a, b);
}

// Cola de primer contacto: primero los que califican para Génesis,
// después por facturación, después los más viejos primero.
function ordenPrimerContacto(a, b) {
  const ca = calificaGenesis(a.fields) ? 0 : 1;
  const cb = calificaGenesis(b.fields) ? 0 : 1;
  if (ca !== cb) return ca - cb;
  const pf = porFacturacion(a, b);
  if (pf !== 0) return pf;
  return new Date(a.creado || 0) - new Date(b.creado || 0);
}

module.exports = {
  esConsumible, factura30oMas, factura50oMas, invierte3000oMas,
  invierteMetaOk, calificaOptin, calificaGenesis, rutaAgendaDirecta, grupoDelLead,
  porFacturacion, ordenGrupo2, ordenPrimerContacto
};
