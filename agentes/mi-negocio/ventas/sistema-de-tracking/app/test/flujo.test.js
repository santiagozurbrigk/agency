// Prueba del flujo completo en modo demo (sin GHL). Correr: node test/flujo.test.js
// Smoke test del flujo completo en modo demo, simulando req/res de Vercel.
const path = require("path");
const APP = path.join(__dirname, "..");
function h(p){ return require(path.join(APP, p)); }

function mkRes(){
  const res = { headers:{}, statusCode:0, body:null };
  res.setHeader=(k,v)=>res.headers[k]=v;
  res.status=(c)=>{res.statusCode=c;return res;};
  res.json=(d)=>{res.body=d;return res;};
  res.end=()=>res;
  return res;
}
async function call(handler,{method="GET",body,query={},cookie}={}){
  const req={method,body,query,headers:{cookie:cookie||""}};
  const res=mkRes();
  await handler(req,res);
  return res;
}
let fallas=0;
function ok(cond,msg){ if(cond){console.log("  ✓",msg);}else{console.log("  ✗ FALLA:",msg);fallas++;} }

(async()=>{
  // Login demo
  const login=h("api/login.js");
  let r=await call(login,{method:"POST",body:{email:"santi@demo.com",pass:"demo"}});
  ok(r.statusCode===200&&r.body.ok,"login demo");
  const cookie=(r.headers["Set-Cookie"]||"").split(";")[0];

  r=await call(login,{method:"POST",body:{email:"x@x.com",pass:"mala"}});
  ok(r.statusCode===401,"login con clave mala rechazado");

  // Sin sesión → 401
  const leads=h("api/leads.js");
  r=await call(leads,{});
  ok(r.statusCode===401,"leads sin sesión → 401");

  // Leads con sesión
  r=await call(leads,{cookie});
  ok(r.statusCode===200&&r.body.leads.length===5,"leads demo (5)");
  ok(r.body.colas.primerContacto.length===1&&r.body.colas.primerContacto[0]==="demo-pablo","cola primer contacto = Pablo (Nuevo)");
  ok(r.body.manu.tope===10,"tope de Manu = 10");
  const martin=r.body.leads.find(l=>l.id==="demo-martin");
  ok(martin.calc.califica===true,"Martín califica Génesis");
  const carla=r.body.leads.find(l=>l.id==="demo-carla");
  ok(carla.calc.califica===false,"Carla (compra única) no califica");

  // Opt-in público: crea lead y reparte dueño
  const optin=h("api/public/optin.js");
  r=await call(optin,{method:"POST",body:{nombre:"Nuevo Lead",email:"nuevo@x.com",telefono:"+5491155559999",ciclo:"Entre 30 y 60 días",facturacion:"Más de 100M"}});
  ok(r.statusCode===200&&r.body.ok,"opt-in crea lead");
  r=await call(optin,{method:"POST",body:{nombre:"Nuevo Lead",email:"nuevo@x.com",telefono:"+5491155559999"}});
  ok(r.body.repetido===true,"opt-in repetido no duplica");

  // El nuevo lead (Más de 100M, consumible) va primero en la cola
  r=await call(leads,{cookie});
  ok(r.body.colas.primerContacto[0]!=="demo-pablo","nuevo lead calificado pasa a Pablo en la cola");

  // Acciones sobre el lead
  const lead=h("api/lead.js");
  r=await call(lead,{method:"POST",cookie,body:{id:"demo-pablo",action:"intento"}});
  ok(r.body.ok&&r.body.lead.fields.intentos==="1","+1 intento");
  r=await call(lead,{method:"POST",cookie,body:{id:"demo-pablo",action:"etapa",data:{etapa:"Contactado"}}});
  ok(r.body.lead.fields.etapa==="Contactado","cambio de etapa");
  r=await call(lead,{method:"POST",cookie,body:{id:"demo-pablo",action:"reasignar",data:{llamada_con:"Diego"}}});
  ok(r.body.lead.fields.llamada_con==="Diego","reasignar llamada");

  // Agenda directa: lead calificado para Manu
  const agenda=h("api/public/agenda.js");
  r=await call(agenda,{method:"POST",body:{telefono:"+5491155550003",objetivo:"X",freno:"Y",hace_cuanto:"Z",
    ciclo:"En menos de 30 días",facturacion:"Entre 50M y 100M",inversion:"Más de USD 6.000"}});
  ok(r.body.ok&&r.body.ruta==="manu","agenda directa: Sofía → Manu");
  ok(r.body.reservaMin===3,"reserva de 3 minutos");

  // Carga de Manu ahora tiene 1 reserva
  r=await call(leads,{cookie});
  ok(r.body.manu.reservas===1,"reserva viva cuenta en la carga de Manu");

  // Agenda directa: no calificado → Diego
  r=await call(agenda,{method:"POST",body:{telefono:"+5491155550002",objetivo:"X",freno:"Y",hace_cuanto:"Z",
    ciclo:"Entre 30 y 60 días",facturacion:"Entre 10M y 30M",inversion:"Entre USD 1.000 y USD 3.000"}});
  ok(r.body.ruta==="diego","agenda directa: Lucía → Diego");

  // Agenda directa: menos de 1000 → rechazado + próximo ciclo
  r=await call(agenda,{method:"POST",body:{telefono:"+5491155550004",ciclo:"Más de 90 días",
    facturacion:"Menos de 10M",inversion:"Menos de USD 1.000"}});
  ok(r.body.ruta==="rechazado","agenda directa: <1000 USD rechazado");
  const getPablo=await call(lead,{cookie,query:{id:"demo-pablo"}});
  ok(getPablo.body.lead.fields.etapa==="Próximo ciclo","Pablo quedó en Próximo ciclo");
  // Vuelve a completar con otra inversión → se reactiva
  r=await call(agenda,{method:"POST",body:{telefono:"+5491155550004",ciclo:"Más de 90 días",
    facturacion:"Menos de 10M",inversion:"Entre USD 1.000 y USD 3.000"}});
  ok(r.body.ruta==="diego","Pablo reintenta y va a Diego");
  const getPablo2=await call(lead,{cookie,query:{id:"demo-pablo"}});
  ok(getPablo2.body.lead.fields.etapa!=="Próximo ciclo","Pablo se reactivó");

  // Teléfono desconocido → posible duplicado
  r=await call(agenda,{method:"POST",body:{telefono:"+5491144440000",ciclo:"En menos de 30 días",
    facturacion:"Entre 30M y 50M",inversion:"Entre USD 3.000 y USD 6.000"}});
  ok(r.body.ok,"agenda directa con teléfono nuevo");
  let all=await call(leads,{cookie});
  const dup=all.body.leads.find(l=>l.telefono==="+5491144440000");
  ok(dup&&dup.fields.posible_duplicado==="Sí","lead nuevo marcado posible duplicado");

  // Quiero que me contacten
  const contacto=h("api/public/contacto.js");
  r=await call(contacto,{method:"POST",body:{nombre:"Lucía Gómez",telefono:"+5491155550002",
    que_falta:"Tengo dudas con la inversión",ciclo:"Entre 30 y 60 días",facturacion:"Entre 10M y 30M",inversion:"Entre USD 1.000 y USD 3.000"}});
  ok(r.body.ok&&r.body.ruta==="contacto","quiero que me contacten ok");

  // Grupos: marcar asistencia y armar
  await call(lead,{method:"POST",cookie,body:{id:"demo-carla",action:"marcar",data:{campo:"asistio",valor:"Sí"}}});
  const grupos=h("api/grupos.js");
  r=await call(grupos,{method:"POST",cookie,body:{}});
  ok(r.body.ok,"armar grupos corre");
  all=await call(leads,{cookie});
  const lucia=all.body.leads.find(l=>l.id==="demo-lucia");
  ok(lucia.fields.grupo==="2","Lucía (form contacto) → Grupo 2");
  ok(all.body.leads.find(l=>l.id==="demo-carla").fields.grupo==="2","Carla (asistió sin forms) → Grupo 2");
  ok(all.body.leads.find(l=>l.id==="demo-martin").fields.grupo!=="1","Martín (pre-venta) fuera de los grupos");
  // Orden del grupo 2: Sofía/Pablo (form agenda sin agendar) antes que Lucía (contacto), Carla última
  const g2=all.body.colas.grupo2.map(id=>all.body.leads.find(l=>l.id===id).nombre);
  console.log("   orden G2:",g2.join(" · "));
  ok(g2.indexOf("Carla Méndez")===g2.length-1,"Carla (solo asistió) al final del G2");
  ok(g2.indexOf("Lucía Gómez")>g2.indexOf("Sofía Núñez"),"dentro del primer bloque manda la facturación");

  // Venta y pagos
  r=await call(lead,{method:"POST",cookie,body:{id:"demo-martin",action:"venta",data:{oferta:"Génesis",forma:"3 cuotas",vendedor:"Manu"}}});
  ok(r.body.lead.fields.etapa==="Venta Génesis","venta registrada → etapa Venta Génesis");
  r=await call(lead,{method:"POST",cookie,body:{id:"demo-martin",action:"pago",data:{n:1,pagado:true}}});
  const venta=JSON.parse(r.body.lead.fields.venta_json);
  ok(venta.pagos[0].pagado===true&&venta.pagos[1].pagado===false,"pago 1 cobrado, pago 2 pendiente");
  r=await call(lead,{method:"POST",cookie,body:{id:"demo-martin",action:"venta",data:{oferta:"Mentoría",forma:"3 cuotas"}}});
  ok(r.statusCode===400,"Mentoría en 3 cuotas rechazada");

  // Métricas
  const metrics=h("api/metrics.js");
  r=await call(metrics,{cookie});
  ok(r.body.ok&&r.body.porOferta["Génesis"].cantidad===1,"métricas: 1 Génesis");
  ok(r.body.porOferta["Génesis"].cobrado===2000&&r.body.porOferta["Génesis"].total===6000,"métricas: cobrado 2000 de 6000");
  ok(r.body.porPersona["Manu"].cierres===1,"métricas: cierre de Manu");

  // Webhook: cita creada en el calendario de Manu post
  const settingsApi=h("api/settings.js");
  await call(settingsApi,{method:"POST",cookie,body:{calManuPostId:"CAL_MANU",calDiegoId:"CAL_DIEGO",calManuPreventaId:"CAL_PRE"}});
  const webhook=h("api/webhook.js");
  r=await call(webhook,{method:"POST",query:{},body:{type:"AppointmentCreate",appointment:{calendarId:"CAL_MANU",contactId:"demo-sofia"}}});
  ok(r.body.ok,"webhook cita creada");
  const sofia=(await call(lead,{cookie,query:{id:"demo-sofia"}})).body.lead;
  ok(sofia.fields.agendo==="Sí"&&sofia.fields.etapa==="Llamada agendada"&&sofia.fields.llamada_con==="Manu","Sofía agendada con Manu vía webhook");
  all=await call(leads,{cookie});
  ok(all.body.manu.reservas===0,"la reserva de Sofía se liberó al agendar");
  ok(all.body.colas.grupo1.includes("demo-sofia"),"Sofía ahora en Grupo 1");
  ok((sofia.tags||[]).join()==="agenda-directa","ya tenía tag del lanzamiento → no se le agrega otro");
  // Pre-venta agendada directo en el calendario de Manu: etapa y tag propio
  let sinTag=(await call(leads,{cookie})).body;
  sinTag=Object.values(sinTag).filter(Array.isArray).flat().find(l=>!(l.tags||[]).length);
  r=await call(webhook,{method:"POST",query:{cal:"manu_pre",type:"create"},body:{contact_id:sinTag.id}});
  const pre=(await call(lead,{cookie,query:{id:sinTag.id}})).body.lead;
  ok(r.body.ok&&pre.fields.etapa==="Agendado con Manu (pre-venta)"&&(pre.tags||[]).includes("pre-venta-manu"),"pre-venta directa sin tag → etapa y tag pre-venta-manu");
  // Workflow mal filtrado: llega con ?cal=manu_post pero la cita es del calendario de pre-venta → manda el ID
  r=await call(webhook,{method:"POST",query:{cal:"manu_post",type:"create"},body:{contact_id:sinTag.id,calendar:{id:"CAL_PRE"}}});
  ok((await call(lead,{cookie,query:{id:sinTag.id}})).body.lead.fields.etapa==="Agendado con Manu (pre-venta)","el ID del calendario le gana al ?cal= del workflow");
  r=await call(webhook,{method:"POST",body:{type:"AppointmentDelete",appointment:{calendarId:"CAL_MANU",contactId:"demo-sofia"}}});
  ok((await call(lead,{cookie,query:{id:"demo-sofia"}})).body.lead.fields.agendo==="No","cancelación vía webhook");

  // Settings
  r=await call(settingsApi,{method:"POST",cookie,body:{genesisLugares:12}});
  ok(r.body.settings.genesisLugares===12,"editar lugares de Génesis");

  // Ráfaga: muchos formularios a la vez no pueden pasar el tope de Manu.
  const cargaAntes=(await call(leads,{cookie})).body.manu;
  await call(settingsApi,{method:"POST",cookie,body:{manuTope:cargaAntes.total+2}});
  const rafaga=await Promise.all(Array.from({length:8},(_,i)=>call(agenda,{method:"POST",body:{
    telefono:"+54911666600"+i,ciclo:"En menos de 30 días",facturacion:"Más de 100M",inversion:"Más de USD 6.000"}})));
  const aManu=rafaga.filter(r=>r.body.ruta==="manu").length;
  ok(aManu===2,`ráfaga de 8 con 2 lugares libres → 2 a Manu (fueron ${aManu})`);
  ok(rafaga.filter(r=>r.body.ruta==="diego").length===6,"el resto de la ráfaga → Diego");
  await call(settingsApi,{method:"POST",cookie,body:{manuTope:10}});

  console.log(fallas?`\n${fallas} FALLAS`:"\nTodo verde ✓");
  process.exit(fallas?1:0);
})().catch(e=>{console.error("ERROR:",e);process.exit(1);});
