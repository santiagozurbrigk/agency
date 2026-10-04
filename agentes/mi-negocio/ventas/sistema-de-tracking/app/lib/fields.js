// Definición de los campos personalizados que el sistema usa en GHL.
// El setup (/api/setup) crea en GHL los que falten, con estos nombres.
// La "key" es como se llama el campo dentro del sistema; "name" es el nombre visible en GHL.

const OPCIONES = {
  ciclo: [
    "En menos de 30 días",
    "Entre 30 y 60 días",
    "Entre 60 y 90 días",
    "Más de 90 días",
    "No se termina, se compra una vez y listo"
  ],
  facturacion: [
    "Menos de 10M",
    "Entre 10M y 30M",
    "Entre 30M y 50M",
    "Entre 50M y 100M",
    "Más de 100M"
  ],
  inversion: [
    "Menos de USD 1.000",
    "Entre USD 1.000 y USD 3.000",
    "Entre USD 3.000 y USD 6.000",
    "Más de USD 6.000"
  ],
  objetivo: [
    "Tener un piso de facturación todos los meses",
    "Mejorar mis márgenes por cada venta",
    "Poder pagar más por cada cliente y seguir siendo rentable",
    "Otro"
  ],
  freno: [
    "El CPA me sube todos los meses",
    "Vendo, pero cada venta me deja poco margen",
    "Dependo de Meta: si me bajan la cuenta, se frena todo",
    "Todavía no logro vender de forma constante",
    "Otro"
  ],
  que_falta: [
    "Entender cómo se aplica a mi marca en particular",
    "Saber si mi producto sirve para suscripción",
    "Tengo dudas con la inversión",
    "No sé si tengo tiempo para implementarlo ahora",
    "Lo tengo que hablar con mi socio",
    "Otro"
  ],
  etapa: [
    "Nuevo",
    "Contactado",
    "En conversación",
    "Sin respuesta",
    "Califica · pre-venta",
    "Agendado con Manu (pre-venta)",
    "Ruta a la clase",
    "Confirmado para la clase",
    "Llamada agendada",
    "No se presentó · a reagendar",
    "No cerró · seguimiento",
    "Venta Génesis",
    "Venta Mentoría",
    "Próximo ciclo"
  ],
  dueno: ["Braian", "Diego"],
  llamada_con: ["Manu", "Diego"],
  grupo: ["1", "2", "3"],
  si_no: ["Sí", "No"]
};

// dataType de GHL: TEXT, LARGE_TEXT, NUMERICAL, SINGLE_OPTIONS, DATE
const FIELDS = [
  { key: "ciclo",            name: "Ciclo de reposición",            type: "SINGLE_OPTIONS", options: OPCIONES.ciclo },
  { key: "facturacion",      name: "Facturación mensual",            type: "SINGLE_OPTIONS", options: OPCIONES.facturacion },
  { key: "inversion",        name: "Inversión disponible",           type: "SINGLE_OPTIONS", options: OPCIONES.inversion },
  { key: "objetivo",         name: "Objetivo a 6 meses",             type: "TEXT" },
  { key: "freno",            name: "Qué lo frena",                   type: "TEXT" },
  { key: "hace_cuanto",      name: "Hace cuánto y qué probó",        type: "LARGE_TEXT" },
  { key: "que_falta",        name: "Qué le falta para dar el paso",  type: "TEXT" },
  { key: "que_vende",        name: "Qué vende",                      type: "TEXT" },
  { key: "por_donde",        name: "Por dónde vende",                type: "TEXT" },
  { key: "cuanto_queda",     name: "Cuánto le queda",                type: "TEXT" },
  { key: "dolor",            name: "Dolor principal",                type: "TEXT" },
  { key: "por_que_ahora",    name: "Por qué ahora (textual)",        type: "LARGE_TEXT" },
  { key: "objecion",         name: "Objeción real",                  type: "TEXT" },
  { key: "falto_clase",      name: "Qué le faltó de la clase",       type: "LARGE_TEXT" },
  { key: "resono",           name: "Qué le resonó del recurso",      type: "LARGE_TEXT" },
  { key: "notas",            name: "Notas del equipo",               type: "LARGE_TEXT" },
  { key: "etapa",            name: "Etapa del proceso",              type: "SINGLE_OPTIONS", options: OPCIONES.etapa },
  { key: "dueno",            name: "Dueño del lead",                 type: "SINGLE_OPTIONS", options: OPCIONES.dueno },
  { key: "llamada_con",      name: "Llamada de venta con",           type: "SINGLE_OPTIONS", options: OPCIONES.llamada_con },
  { key: "grupo",            name: "Grupo post-clase",               type: "SINGLE_OPTIONS", options: OPCIONES.grupo },
  { key: "asistio",          name: "Asistió a la clase",             type: "SINGLE_OPTIONS", options: OPCIONES.si_no },
  { key: "senal_compra",     name: "Señal de compra",                type: "SINGLE_OPTIONS", options: OPCIONES.si_no },
  { key: "confirmo_clase",   name: "Confirmó la clase (ok)",         type: "SINGLE_OPTIONS", options: OPCIONES.si_no },
  { key: "recurso_enviado",  name: "Recurso enviado",                type: "SINGLE_OPTIONS", options: OPCIONES.si_no },
  { key: "recurso_visto",    name: "Recurso visto",                  type: "SINGLE_OPTIONS", options: OPCIONES.si_no },
  { key: "form_agenda",      name: "Completó Agenda directa",        type: "SINGLE_OPTIONS", options: OPCIONES.si_no },
  { key: "form_contacto",    name: "Completó Quiero que me contacten", type: "SINGLE_OPTIONS", options: OPCIONES.si_no },
  { key: "agendo",           name: "Agendó llamada de venta",        type: "SINGLE_OPTIONS", options: OPCIONES.si_no },
  { key: "se_presento",      name: "Se presentó a la llamada",       type: "SINGLE_OPTIONS", options: OPCIONES.si_no },
  { key: "excede_tope",      name: "Excede el tope de Manu",         type: "SINGLE_OPTIONS", options: OPCIONES.si_no },
  { key: "posible_duplicado",name: "Posible duplicado",              type: "SINGLE_OPTIONS", options: OPCIONES.si_no },
  { key: "intentos",         name: "Intentos de contacto",           type: "NUMERICAL" },
  { key: "ultimo_contacto",  name: "Último contacto",                type: "TEXT" },
  { key: "origen",           name: "Origen (UTM)",                   type: "LARGE_TEXT" },
  { key: "venta_json",       name: "Venta (interno, no tocar)",      type: "LARGE_TEXT" },
  { key: "historial_json",   name: "Historial (interno, no tocar)",  type: "LARGE_TEXT" }
];

module.exports = { FIELDS, OPCIONES };
