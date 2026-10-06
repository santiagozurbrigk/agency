// Modo demo: datos de ejemplo en memoria para probar el sistema sin GHL.
// Se activa solo cuando faltan GHL_API_TOKEN o GHL_LOCATION_ID.
// Ojo: en Vercel la memoria no persiste entre instancias; el demo es para mirar, no para operar.

let _db = null;

function seed() {
  const hoy = new Date().toISOString();
  const leads = [
    {
      id: "demo-martin", nombre: "Martín Pereyra", email: "martin@demo.com", telefono: "+5491155550001",
      tags: [], creado: hoy,
      fields: {
        ciclo: "Entre 30 y 60 días", facturacion: "Entre 30M y 50M", dueno: "Diego",
        etapa: "Agendado con Manu (pre-venta)", que_vende: "Productos de limpieza para el hogar",
        por_donde: "Tiendanube y Mercado Libre", dolor: "El CPA le sube todos los meses",
        por_que_ahora: "Si sigo así, para fin de año estoy pagando por vender.",
        objetivo: "Poder pagar más por cada cliente y seguir siendo rentable",
        freno: "El CPA me sube todos los meses",
        hace_cuanto: "Desde mitad de año. Más creativos, cambiamos de agencia… y nada.",
        recurso_enviado: "Sí", intentos: "2", confirmo_clase: "Sí"
      }
    },
    {
      id: "demo-lucia", nombre: "Lucía Gómez", email: "lucia@demo.com", telefono: "+5491155550002",
      tags: [], creado: hoy,
      fields: {
        ciclo: "Entre 30 y 60 días", facturacion: "Entre 10M y 30M", dueno: "Braian",
        etapa: "Confirmado para la clase", que_vende: "Limpieza ecológica",
        dolor: "Sus clientas compran una vez y no vuelven", recurso_enviado: "Sí",
        confirmo_clase: "Sí", intentos: "1"
      }
    },
    {
      id: "demo-sofia", nombre: "Sofía Núñez", email: "sofia@demo.com", telefono: "+5491155550003",
      tags: [], creado: hoy,
      fields: {
        ciclo: "En menos de 30 días", facturacion: "Entre 50M y 100M", dueno: "Diego",
        etapa: "Confirmado para la clase", que_vende: "Cosmética", confirmo_clase: "Sí",
        inversion: "Más de USD 6.000"
      }
    },
    {
      id: "demo-pablo", nombre: "Pablo Ruiz", email: "pablo@demo.com", telefono: "+5491155550004",
      tags: [], creado: hoy,
      fields: { ciclo: "Más de 90 días", facturacion: "Menos de 10M", dueno: "Braian", etapa: "Nuevo" }
    },
    {
      id: "demo-carla", nombre: "Carla Méndez", email: "carla@demo.com", telefono: "+5491155550005",
      tags: [], creado: hoy,
      fields: {
        ciclo: "No se termina, se compra una vez y listo", facturacion: "Entre 30M y 50M",
        dueno: "Diego", etapa: "Sin respuesta", intentos: "3", ultimo_contacto: hoy
      }
    }
  ];
  return {
    leads,
    settings: null,   // usa los defaults de store.js
    reservas: [],
    nextId: 1
  };
}

function db() {
  if (!globalThis.__trkDemo) globalThis.__trkDemo = seed();
  _db = globalThis.__trkDemo;
  return _db;
}

module.exports = { db };
