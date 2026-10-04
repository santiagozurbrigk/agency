// Las reglas del proceso, tal como quedaron en especificacion.md.

const FACT_ORDEN = ["Más de 100M", "Entre 50M y 100M", "Entre 30M y 50M", "Entre 10M y 30M", "Menos de 10M"];

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

// Regla 5.1: califica para Génesis.
function calificaGenesis(f) {
  return esConsumible(f.ciclo) && factura30oMas(f.facturacion);
}

// Regla 5.2: a qué calendario va el lead de la Agenda directa.
// manuLibre = Manu tiene menos de 10 llamadas post-clase (contando reservas vivas).
function rutaAgendaDirecta(f, manuLibre) {
  if (f.inversion === "Menos de USD 1.000") return "rechazado";
  const paraManu = esConsumible(f.ciclo) && factura50oMas(f.facturacion) && invierte3000oMas(f.inversion);
  return paraManu && manuLibre ? "manu" : "diego";
}

// Orden por facturación: más facturación, más arriba. Sin facturación, al final.
function porFacturacion(a, b) {
  const ia = FACT_ORDEN.indexOf(a.fields.facturacion);
  const ib = FACT_ORDEN.indexOf(b.fields.facturacion);
  return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
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
  calificaGenesis, rutaAgendaDirecta, grupoDelLead,
  porFacturacion, ordenGrupo2, ordenPrimerContacto
};
