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
  r=await call(lead,{method:"POST",cookie,body:{id:"demo-pablo",action:"reasignar",data:{llamada_con:"Equipo"}}});
  ok(r.body.lead.fields.llamada_con==="Equipo","reasignar llamada");

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
  ok(r.body.ruta==="diego","agenda directa: Lucía → equipo");

  // Agenda directa: menos de 1000 → rechazado + próximo ciclo
  r=await call(agenda,{method:"POST",body:{telefono:"+5491155550004",ciclo:"Más de 90 días",
    facturacion:"Menos de 10M",inversion:"Menos de USD 1.000"}});
  ok(r.body.ruta==="rechazado","agenda directa: <1000 USD rechazado");
  const getPablo=await call(lead,{cookie,query:{id:"demo-pablo"}});
  ok(getPablo.body.lead.fields.etapa==="Próximo ciclo","Pablo quedó en Próximo ciclo");
  // Vuelve a completar con otra inversión → se reactiva
  r=await call(agenda,{method:"POST",body:{telefono:"+5491155550004",ciclo:"Más de 90 días",
    facturacion:"Menos de 10M",inversion:"Entre USD 1.000 y USD 3.000"}});
  ok(r.body.ruta==="diego","Pablo reintenta y va al equipo");
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

  // Aplicación (applygenesis.com/aplication)
  const aplicacion=h("api/public/aplicacion.js");
  r=await call(aplicacion,{method:"POST",body:{nombre:"Rocío Paz",email:"rocio@marca.com",telefono:"+5491166660003",
    objetivo:"Mejorar mis márgenes por cada venta",freno:"Otro: no tengo equipo",hace_cuanto:"Hace un año",
    ciclo:"En menos de 30 días",facturacion:"Entre 30M y 50M",inversion:"Entre USD 3.000 y USD 6.000",tracking:{utm_source:"ig"}}});
  ok(r.body.ok&&r.body.ruta==="aplicado","aplicación ok");
  r=await call(aplicacion,{method:"POST",body:{nombre:"Tomás Ruiz",email:"tomas@marca.com",telefono:"+5491166660004",inversion:"Menos de USD 1.000"}});
  ok(r.body.ok&&r.body.ruta==="rechazado","aplicación con inversión < USD 1.000 → rechazado");
  r=await call(aplicacion,{method:"POST",body:{nombre:"Sin datos"}});
  ok(r.statusCode===400,"aplicación sin WhatsApp ni email → 400");
  {
    const t=await call(leads,{cookie});
    const rocio=t.body.leads.find(l=>l.email==="rocio@marca.com");
    ok(rocio&&rocio.tags.includes("aplicacion-19-10")&&rocio.fields.facturacion==="Entre 30M y 50M"&&rocio.fields.freno==="Otro: no tengo equipo","aplicación guarda respuestas y tag en la ficha");
    ok(rocio&&JSON.parse(rocio.fields.origen||"{}").utm_source==="ig","aplicación guarda el origen");
    ok((t.body.leads.find(l=>l.email==="tomas@marca.com")||{fields:{}}).fields.etapa==="Próximo ciclo","aplicación < USD 1.000 → Próximo ciclo");
  }
  // Aplicación de alguien que ya hizo el optin, con otro email y WhatsApp: se une por los datos del optin
  r=await call(aplicacion,{method:"POST",body:{nombre:"Pablo R",email:"pablo.otro@marca.com",telefono:"+5491177770000",
    optin:{email:"pablo@demo.com",telefono:"+5491155550004"},tracking_link:{utm_source:"whatsapp",utm_medium:"grupo"},
    objetivo:"Tener un piso de facturación todos los meses",freno:"El CPA me sube todos los meses",hace_cuanto:"Desde junio",
    ciclo:"Entre 30 y 60 días",facturacion:"Entre 50M y 100M",inversion:"Más de USD 6.000"}});
  ok(r.body.ok&&r.body.ruta==="aplicado","aplicación con datos del optin ok");
  {
    const t=await call(leads,{cookie});
    const pablo=t.body.leads.find(l=>l.id==="demo-pablo");
    ok(pablo.tags.includes("aplicacion-19-10")&&pablo.fields.facturacion==="Entre 50M y 100M"&&pablo.fields.hace_cuanto==="Desde junio","aplicación unida al lead del optin (no crea otro)");
    ok(pablo.email==="pablo@demo.com"&&pablo.telefono==="+5491155550004"&&pablo.nombre==="Pablo Ruiz","no pisa email, WhatsApp ni nombre del optin");
    ok(!t.body.leads.some(l=>l.email==="pablo.otro@marca.com"),"no se crea un lead duplicado");
    const lead1=h("api/lead.js");
    const fi=await call(lead1,{cookie,query:{id:"demo-pablo"}});
    const hist=JSON.stringify((fi.body.lead||fi.body).fields||{});
    ok(/vía whatsapp \/ grupo/.test(hist)&&/WhatsApp en la aplicación: \+5491177770000/.test(hist)&&/Email en la aplicación/.test(hist),"historial con la aplicación, la vía y los datos distintos");
    r=await call(lead1,{method:"POST",cookie,body:{id:"demo-pablo",action:"marcar",data:{campo:"llamado_apl",valor:"Sí"}}});
    const t2=await call(leads,{cookie});
    ok(t2.body.leads.find(l=>l.id==="demo-pablo").fields.llamado_apl==="Sí","marcar «Ya lo llamé» en una aplicación");
    const fi2=await call(lead1,{cookie,query:{id:"demo-pablo"}});
    ok(/Aplicación: ya lo llamé/.test(JSON.stringify((fi2.body.lead||fi2.body).fields||{})),"«Ya lo llamé» queda en el historial");
    ok(t2.body.colas.aplicaciones.includes("demo-pablo"),"Pablo en la cola de aplicaciones");
    r=await call(lead1,{method:"POST",cookie,body:{id:"demo-pablo",action:"responsable",data:{responsable:"Jose"}}});
    const t3=await call(leads,{cookie}); const pb=t3.body.leads.find(l=>l.id==="demo-pablo");
    ok(r.body.ok&&pb.fields.responsable==="Jose","asignar responsable Jose");
    ok(pb.fields.ultimo_contacto===t2.body.leads.find(l=>l.id==="demo-pablo").fields.ultimo_contacto,"el responsable no toca el último contacto");
    r=await call(lead1,{method:"POST",cookie,body:{id:"demo-pablo",action:"responsable",data:{responsable:"Diego"}}});
    ok(r.statusCode===400,"responsable inválido → 400");
    r=await call(lead1,{method:"POST",cookie,body:{id:"demo-pablo",action:"responsable",data:{responsable:""}}});
    ok(r.body.ok&&(await call(leads,{cookie})).body.leads.find(l=>l.id==="demo-pablo").fields.responsable==="","sacar responsable");
    { const pab=()=>call(leads,{cookie}).then(x=>x.body.leads.find(l=>l.id==="demo-pablo"));
      const antes=(await pab()).fields.sdr||"";
      r=await call(lead1,{method:"POST",cookie,body:{id:"demo-pablo",action:"seteo",data:{seteo:"Mati"}}});
      const ps=await pab();
      ok(r.body.ok&&ps.fields.sdr==="Mati"&&ps.fields.ultimo_contacto===t2.body.leads.find(l=>l.id==="demo-pablo").fields.ultimo_contacto,"seteo: asignar Mati (no toca el último contacto)");
      r=await call(lead1,{method:"POST",cookie,body:{id:"demo-pablo",action:"seteo",data:{seteo:"Jose"}}});
      ok(r.statusCode===400,"seteo inválido → 400");
      r=await call(lead1,{method:"POST",cookie,body:{id:"demo-pablo",action:"seteo",data:{seteo:""}}});
      ok(r.body.ok&&(await pab()).fields.sdr==="","seteo: sacar");
      if(antes) await call(lead1,{method:"POST",cookie,body:{id:"demo-pablo",action:"seteo",data:{seteo:antes}}}); }
    r=await call(lead1,{method:"POST",cookie,body:{id:"demo-pablo",action:"estado_llamada",data:{estado_llamada:"No contestó"}}});
    ok(r.body.ok&&(await call(leads,{cookie})).body.leads.find(l=>l.id==="demo-pablo").fields.estado_llamada==="No contestó","estado de la llamada");
    r=await call(lead1,{method:"POST",cookie,body:{id:"demo-pablo",action:"estado_llamada",data:{estado_llamada:"  Quiere que lo llamen el jueves a la tarde porque está de viaje hasta el miércoles  "}}});
    const est=(await call(leads,{cookie})).body.leads.find(l=>l.id==="demo-pablo").fields.estado_llamada;
    ok(est.length===60&&est.startsWith("Quiere"),"estado libre recortado a 60 caracteres");
  }

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
  r=await call(lead,{method:"POST",cookie,body:{id:"demo-martin",action:"venta",data:{oferta:"Génesis",forma:"Personalizado",montos:[]}}});
  ok(r.statusCode===400,"venta personalizada sin montos rechazada");
  // Venta editada a mano: pagó una parte, el resto en otra cuota, con día de pago y nota
  r=await call(lead,{method:"POST",cookie,body:{id:"demo-martin",action:"editar_venta",data:{
    pagos:[{monto:1500,pagado:true,fecha:"2026-10-10"},{monto:2000,pagado:false},{monto:2500,pagado:false}],nota:"Paga el resto a fin de mes"}}});
  { const v=JSON.parse(r.body.lead.fields.venta_json);
    ok(v.pagos.length===3&&v.pagos[0].monto===1500&&v.pagos[0].pagado&&new Date(v.pagos[0].fecha).toLocaleDateString("en-CA",{timeZone:"America/Argentina/Buenos_Aires"})==="2026-10-10","editar venta: monto y día de pago a mano");
    ok(v.forma==="Personalizado"&&v.nota==="Paga el resto a fin de mes","editar venta: forma Personalizado y nota"); }
  r=await call(lead,{method:"POST",cookie,body:{id:"demo-martin",action:"editar_venta",data:{pagos:[{monto:0}]}}});
  ok(r.statusCode===400,"editar venta con monto 0 rechazada");

  // Informe de anuncios: con sesión o con la clave INFORME_KEY.
  { const informe=h("api/informe.js");
    let x=await call(informe,{});
    ok(x.statusCode===401,"informe sin sesión ni clave → 401");
    process.env.INFORME_KEY="clave-de-prueba-de-mas-de-24";
    x=await call(informe,{query:{}}); x=await (async()=>{const req={method:"GET",query:{},headers:{"x-informe-key":"otra"}};const res=mkRes();await informe(req,res);return res;})();
    ok(x.statusCode===401,"informe con clave mala → 401");
    x=await (async()=>{const req={method:"GET",query:{},headers:{"x-informe-key":"clave-de-prueba-de-mas-de-24"}};const res=mkRes();await informe(req,res);return res;})();
    ok(x.statusCode===200&&x.body.ok&&x.body.panel&&x.body.panel.ok&&Array.isArray(x.body.leads),"informe con clave: panel de anuncios y leads");
    x=await call(informe,{cookie});
    ok(x.statusCode===200&&x.body.ok,"informe con sesión");
    x=await call(informe,{cookie,query:{buscar:"no-existe@x.com"}});
    ok(x.statusCode===200&&x.body.buscados.length===1&&x.body.buscados[0].encontrado===false,"informe: buscar un email que no está");
    delete process.env.INFORME_KEY; }

  // Métricas
  const metrics=h("api/metrics.js");
  r=await call(metrics,{cookie});
  ok(r.body.ok&&r.body.porOferta["Génesis"].cantidad===1,"métricas: 1 Génesis");
  ok(r.body.porOferta["Génesis"].cobrado===1500&&r.body.porOferta["Génesis"].total===6000,"métricas: cobrado 1500 de 6000 (venta editada a mano)");
  ok(r.body.porPersona===undefined,"métricas: sin «por persona» (ya no hay dueños)");
  { const hoy=new Date(Date.now()-3*3600e3).toISOString().slice(0,10);
    const mh=(await call(metrics,{cookie,query:{desde:hoy,hasta:hoy}})).body;
    ok(mh.ok&&mh.rango.desde===hoy&&mh.porOferta["Génesis"].cantidad===1&&mh.embudo.total>0,"métricas con rango de hoy: cuentan los leads y la venta de hoy");
    const mv=(await call(metrics,{cookie,query:{desde:"2020-01-01",hasta:"2020-01-31"}})).body;
    ok(mv.ok&&mv.embudo.total===0&&mv.embudo.ventas===0&&!mv.porOferta["Génesis"]&&mv.genesis.vendidos===1&&mv.porDia.length===31,"métricas con rango viejo: vacías, pero los lugares de Génesis cuentan el total"); }
  { const visita=h("api/public/visita.js"), bio={utm_source:"instagram",utm_medium:"bio",utm_campaign:"genesis-19-10"};
    let v=await call(visita,{method:"POST",body:JSON.stringify({tracking:bio})});
    ok(v.body.fuente==="Instagram · bio","visita desde la bio → fuente Instagram · bio");
    { const { fuenteDe }=require("../lib/fuente");
      ok(fuenteDe({utm_source:"instagram",utm_medium:"historia",fbclid:"x"})==="Instagram · historia","historia con fbclid → Instagram · historia (no anuncios)");
      ok(fuenteDe({utm_source:"facebook",utm_medium:"Instagram_Reels"})==="Anuncios de Meta"&&fuenteDe({fbclid:"x"})==="Anuncios de Meta","anuncios → Anuncios de Meta"); }
    await call(visita,{method:"POST",body:{tracking:bio}});
    await call(h("api/public/optin.js"),{method:"POST",body:{nombre:"Bio Test",email:"bio@test.com",telefono:"+5491100009999",ciclo:"Entre 30 y 60 días",facturacion:"Entre 50M y 100M",tracking:bio}});
    const m2=(await call(metrics,{cookie})).body; const fb=(m2.porFuente||[]).find(x=>x.fuente==="Instagram · bio");
    ok(fb&&fb.visitas===2&&fb.registros===1&&fb.califican===1,"por fuente: 2 visitas, 1 registro, 1 califica (bio)"); }
  { // Anuncios: visitas de pauta, registro de pauta, clic en el grupo y facturación confirmada
    const ad={utm_source:"facebook",utm_medium:"Instagram_Reels",utm_campaign:"Génesis 19/10",utm_content:"VSL-hook-CPA",ad_id:"123"};
    for(let i=0;i<4;i++) await call(h("api/public/visita.js"),{method:"POST",body:{tracking:{...ad,ab:i%2?"B":"A"}}});
    await call(h("api/public/optin.js"),{method:"POST",body:{nombre:"Ad Test",email:"ad@test.com",telefono:"+5491100008888",ciclo:"Entre 30 y 60 días",facturacion:"Más de 100M",tracking:{...ad,ab:"A"}}});
    const g=await call(h("api/public/grupo.js"),{method:"POST",body:JSON.stringify({email:"ad@test.com"})});
    ok(g.body.ok,"clic en «Entrar al grupo» marca al lead");
    const an=(await call(h("api/anuncios.js"),{cookie})).body;
    ok(an.ok&&an.resumen.leadsPauta>=1&&an.resumen.visitasPauta===4&&an.resumen.convLandingPauta===25,"anuncios: 4 visitas de pauta, 1 lead → 25% de conversión");
    ok(an.resumen.tocaronGrupo>=1,"anuncios: cuenta a los que tocaron el grupo"); ok(an.porDia.length>=1&&an.porDia.every(d=>/^\d{4}-\d{2}-\d{2}$/.test(d.dia)),"anuncios: serie por día");
    ok(an.ab&&an.ab[0].version==="A"&&an.ab[0].visitantes===2&&an.ab[0].leads===1,"anuncios: test A/B con visitantes y leads por versión");
    const hoy=new Date(Date.now()-3*3600e3).toISOString().slice(0,10);
    const an2=(await call(h("api/anuncios.js"),{cookie,query:{desde:hoy,hasta:hoy}})).body;
    ok(an2.porDia.length===1&&an2.desde===hoy,"anuncios: filtro de un día");
    const largo=(await call(h("api/anuncios.js"),{cookie,query:{desde:"2025-01-01",hasta:hoy}})).body;
    ok(largo.hasta===hoy&&largo.porDia.length===120&&largo.porDia[119].dia===hoy&&largo.resumen.leadsTotal>=1,"anuncios: rango largo se queda con los días más recientes (incluye hoy)");
    ok(an.meta===null,"anuncios: sin variables de Meta, meta = null");
    ok(an.respuestas&&an.respuestas.pais.some(p=>p.op==="Argentina")&&an.origen.some(o=>o.op==="Anuncios de Meta"),"anuncios: país por prefijo y origen de los opt-ins");
    ok(an.ab.some(v=>v.version==="B")&&an.ab[0].porDia.length===an.porDia.length&&an.test&&"ganador" in an.test,"anuncios: test A/B con serie por día y ganador");
    // Inicio del lanzamiento: «Todo el lanzamiento» arranca ahí
    const st=h("api/settings.js");
    const malo=await call(st,{method:"POST",cookie,body:{inicioLanzamiento:"no-es-fecha"}}); ok(malo.statusCode===400,"inicio del lanzamiento inválido rechazado");
    await call(st,{method:"POST",cookie,body:{inicioLanzamiento:hoy}});
    const an3=(await call(h("api/anuncios.js"),{cookie})).body; ok(an3.desde===hoy&&an3.inicio===hoy,"anuncios: «Todo el lanzamiento» arranca en el inicio configurado");
    await call(st,{method:"POST",cookie,body:{inicioLanzamiento:""}});
    // Meta Ads con respuestas simuladas
    process.env.META_ACCESS_TOKEN="TOKEN_SECRETO"; process.env.META_AD_ACCOUNT_ID="act_42";
    const fetchReal=global.fetch; let pedidos=[];
    global.fetch=async(url)=>{ pedidos.push(String(url)); const u=new URL(url);
      const json=(d)=>({json:async()=>d});
      if(u.pathname.endsWith("/ads")) return json({data:[{id:"123",effective_status:"ACTIVE"},{id:"999",effective_status:"PAUSED"}]});
      if(u.searchParams.get("level")==="ad") return json({data:[
        {campaign_id:"c1",campaign_name:"Génesis 19/10",adset_id:"s1",adset_name:"Dueños de marca",ad_id:"123",ad_name:"VSL-hook-CPA",spend:"100",impressions:"10000",inline_link_clicks:"200",reach:"8000",frequency:"1.25",actions:[{action_type:"landing_page_view",value:"150"}]},
        {campaign_id:"c1",campaign_name:"Génesis 19/10",adset_id:"s1",adset_name:"Dueños de marca",ad_id:"999",ad_name:"Otro",spend:"50",impressions:"5000",inline_link_clicks:"100",reach:"4000",frequency:"1.25",actions:[{action_type:"landing_page_view",value:"70"}]}]});
      if(u.searchParams.get("time_increment")) return json({data:[{date_start:hoy,spend:"150",impressions:"15000",inline_link_clicks:"300",actions:[{action_type:"landing_page_view",value:"220"}]}]});
      return json({data:[{spend:"150",impressions:"15000",inline_link_clicks:"300",reach:"12000",frequency:"1.25",actions:[{action_type:"landing_page_view",value:"220"}]}]});
    };
    try {
      const err0=global.fetch; global.fetch=async()=>({json:async()=>({error:{message:"Token TOKEN_SECRETO inválido"}})});
      const e=(await call(h("api/anuncios.js"),{cookie,query:{desde:hoy,hasta:hoy}})).body;
      ok(e.ok&&e.meta&&/^Meta:/.test(e.meta.error)&&!e.meta.error.includes("TOKEN_SECRETO"),"meta: error de Meta se muestra sin el token y el panel sigue");
      global.fetch=err0;
      const mt=(await call(h("api/anuncios.js"),{cookie})).body.meta;
      ok(mt&&mt.resumen.inversion===150&&mt.resumen.ctr===2&&mt.resumen.clicALanding===73.3,"meta: inversión, CTR y clic → landing");
      ok(mt.resumen.cpl===Math.round(150/mt.resumen.leads*100)/100&&mt.resumen.leads>=1,"meta: CPL real = inversión / leads de pauta");
      const a123=mt.anuncios.find(x=>x.adId==="123"), a999=mt.anuncios.find(x=>x.adId==="999");
      ok(a123&&a123.leads>=1&&a123.activo&&a999&&!a999.activo&&a999.leads===0,"meta: leads cruzados al anuncio por ad_id, activo/apagado");
      ok(pedidos.every(u=>u.includes("act_42/")&&!u.includes("act_act_")),"meta: cuenta con o sin «act_»");
    } finally { global.fetch=fetchReal; delete process.env.META_ACCESS_TOKEN; delete process.env.META_AD_ACCOUNT_ID; } }
  { // Opt-in nuevo (14-oct): una sola pregunta, inversión diaria en Meta
    const ad={utm_source:"facebook",utm_medium:"Instagram_Reels",utm_content:"Ad-inversion",ad_id:"456"};
    await call(h("api/public/optin.js"),{method:"POST",body:{nombre:"Inv Si",email:"invsi@test.com",telefono:"+5491100007777",inversion_meta:"De 100 a 200 dólares",tracking:ad}});
    await call(h("api/public/optin.js"),{method:"POST",body:{nombre:"Inv No",email:"invno@test.com",telefono:"+5491100006666",inversion_meta:"Menos de 100 dólares",tracking:ad}});
    const m3=(await call(metrics,{cookie})).body; const a3=(m3.porAnuncio||[]).find(x=>x.anuncio==="Ad-inversion");
    ok(a3&&a3.leads===2&&a3.califican===1,"opt-in nuevo: 100 dólares por día califica, menos de 100 no");
    ok(a3&&a3.lista.some(x=>x.facturacion==="De 100 a 200 dólares por día"),"opt-in nuevo: la lista muestra la inversión por día");
    const todos=(await call(leads,{cookie})).body.leads; const tg=e=>(todos.find(l=>l.email===e)||{}).tags||[];
    ok(tg("invsi@test.com").includes("optin-19-10")&&tg("invsi@test.com").includes("optin-calificado-19-10"),"opt-in nuevo: el que califica lleva las dos etiquetas");
    ok(tg("invno@test.com").includes("optin-19-10")&&!tg("invno@test.com").includes("optin-calificado-19-10"),"opt-in nuevo: el que no califica lleva solo la de optin");
    const im=m3.distribucion.inversion_meta; ok(im&&im.valores.find(x=>x.op==="De 100 a 200 dólares").n===1,"opt-in nuevo: distribución de inversión diaria en Meta"); }
  { const e=await call(lead,{method:"POST",cookie,body:{id:"demo-pablo",action:"eliminar"}});
    const t=(await call(leads,{cookie})).body;
    ok(e.body.eliminado&&!t.leads.some(l=>l.id==="demo-pablo")&&!t.colas.primerContacto.includes("demo-pablo"),"eliminar lead: sale de la lista y de las colas"); }
  { const a=(r.body.porAnuncio||[]).find(x=>x.anuncio==="VSL-hook-CPA");
    ok(a&&a.leads===2&&a.califican===1&&a.campana==="Génesis 19/10","métricas: leads por anuncio (2 leads, 1 califica)"); }

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
  ok(rafaga.filter(r=>r.body.ruta==="diego").length===6,"el resto de la ráfaga → equipo");
  await call(settingsApi,{method:"POST",cookie,body:{manuTope:10}});

  // Zoom: cruce de asistentes con los opt-ins (SOP)
  {
    const Z=require(path.join(APP,"lib/zoom.js"));
    const csv=[
      "Informe de asistentes",
      "Tema,Identificación del seminario web,Hora de inicio real,Duración real (minutos),Espectadores exclusivos,Usuarios totales,Vistas simultáneas máximas,Habilitar registro",
      '"Clase",123,"19/10/2026 06:50:00 PM",100,6,9,5,No',
      "Detalles del anfitrión",
      "Asistió,Nombre de usuario (nombre original),Correo electrónico,Hora de incorporación,Hora de salida,Tiempo en la sesión (minutos),Es invitado,Nombre de país/región",
      'Sí,Manu,manu@host.com,"19/10/2026 06:50:00 PM","19/10/2026 08:30:00 PM",100,No,Argentina',
      "Detalles de panelista",
      "Asistió,Nombre de usuario (nombre original),Correo electrónico,Hora de incorporación,Hora de salida,Tiempo en la sesión (minutos),Es invitado,Nombre de país/región",
      'Sí,Equipo,equipo@host.com,"19/10/2026 06:51:00 PM","19/10/2026 08:30:00 PM",99,Sí,Argentina',
      "Detalles de asistente",
      "Asistió,Nombre de usuario (nombre original),Correo electrónico,Hora de incorporación,Hora de salida,Tiempo en la sesión (minutos),Es invitado,Nombre de país/región",
      // Martín: compu y celular a la vez (se superponen) → la unión, no la suma
      'Sí,Martín,martin@demo.com,"19/10/2026 07:00:00 PM","19/10/2026 08:30:00 PM",90,Sí,Argentina',
      'Sí,iPhone,martin@demo.com,"19/10/2026 07:10:00 PM","19/10/2026 08:00:00 PM",50,Sí,Argentina',
      // Lucía: mail con typo de dominio
      'Sí,Lu,lucia@demo.con,"19/10/2026 07:20:00 PM","19/10/2026 07:50:00 PM",30,Sí,Uruguay',
      // Sofía: otro mail, pero nombre y apellido únicos → cruza por nombre
      'Sí,Sofía Nuñez,otra@mail.com,"19/10/2026 07:05:00 PM","19/10/2026 08:10:00 PM",65,Sí,Argentina',
      // Pablo suelto con otro mail → NO se cruza (solo nombre)
      'Sí,Pablo,pablito@mail.com,"19/10/2026 07:05:00 PM","19/10/2026 07:40:00 PM",35,Sí,Argentina',
      // el panelista también aparece como asistente, y un bot
      'Sí,Equipo,equipo@host.com,"19/10/2026 06:51:00 PM","19/10/2026 06:52:00 PM",1,Sí,Argentina',
      "Sí,Lautaro's Notetaker,,\"19/10/2026 07:06:40 PM\",\"19/10/2026 07:16:38 PM\",10,Sí,Estados Unidos",
      // fila sin mail de alguien que ya está con mail → se une por nombre
      'Sí,Pablo,,"19/10/2026 07:45:00 PM","19/10/2026 07:50:00 PM",5,Sí,Argentina'
    ].join("\n");
    const inf=Z.leerInforme(csv);
    ok(inf.meta.personas===4,"zoom: 4 personas (sin anfitrión, panelista ni bot)");
    const mt=inf.personas.find(p=>p.email==="martin@demo.com");
    ok(mt.minutos===90&&mt.veces===2,"zoom: minutos = unión de intervalos, no la suma");
    ok(mt.hastaElFinal===true&&mt.salioMin===100,"zoom: se quedó hasta el final");
    ok(inf.personas.find(p=>p.email==="lucia@demo.com"),"zoom: typo de dominio corregido");
    ok(inf.personas.find(p=>p.email==="pablito@mail.com").minutos===40,"zoom: fila sin mail unida por nombre");
    ok(inf.meta.personasZoom===6||inf.meta.personasZoom===5,"zoom: cuenta como Zoom (mails crudos + filas sin mail)");
    const zoomApi=h("api/zoom.js");
    r=await call(zoomApi,{method:"POST",cookie,body:{csv}});
    ok(r.body.ok&&r.body.zoom.identificados===3&&r.body.zoom.viaNombre===1,"zoom: 3 cruzados (2 por mail, 1 por nombre)");
    ok(r.body.zoom.sinIdentificar.length===1&&r.body.zoom.sinIdentificar[0].e==="pablito@mail.com","zoom: «Pablo» suelto queda sin identificar");
    const t=await call(leads,{cookie});
    const L=id=>t.body.leads.find(l=>l.id===id)||{fields:{}};
    const zm=JSON.parse(L("demo-martin").fields.zoom_json||"{}");
    ok(zm.m===90&&zm.v===2&&zm.f===1&&L("demo-martin").fields.asistio==="Sí","zoom: ficha de Martín con minutos, veces y asistió");
    ok(JSON.parse(L("demo-sofia").fields.zoom_json||"{}").via==="nombre","zoom: Sofía cruzada por nombre");
    ok(!L("demo-pablo").fields.zoom_json,"zoom: Pablo (otro mail, sin apellido) no se toca");
    r=await call(zoomApi,{method:"POST",cookie,body:{hitos:{apertura:"19:00",oferta:"70",precio:"85",qa:"95"}}});
    ok(r.body.ok&&r.body.zoom.hitos.precio===85&&r.body.zoom.identificados===3,"zoom: hitos guardados sin perder el cruce");
    r=await call(zoomApi,{cookie});
    ok(r.body.ok&&r.body.zoom.hitos.oferta===70,"zoom: GET devuelve el último cruce");
    r=await call(zoomApi,{method:"POST",body:{csv}});
    ok(r.statusCode===401,"zoom: sin sesión → 401");
  }

  // Clientes: fecha de cierre, vencimientos, datos del cliente y alta manual
  { const lead=h("api/lead.js"), clientesApi=h("api/clientes.js"), V=h("lib/ventas.js");
    const dia=iso=>new Date(iso).toLocaleDateString("en-CA",{timeZone:"America/Argentina/Buenos_Aires"});
    ok(dia(V.sumarMeses("2026-01-31T15:00:00.000Z",1))==="2026-02-28","vencimientos: el 31 pasa al último día del mes");
    let r=await call(clientesApi,{method:"POST",cookie,body:{nombre:"Carla Cliente",telefono:"+54 9 11 5555 0999",email:"carla@cliente.com",
      oferta:"Génesis",forma:"3 cuotas",fecha:"2026-10-23",cliente:{marca:"Limpia Ya",instagram:"@limpiaya",otro:"x"}}});
    ok(r.statusCode===200&&!r.body.existia&&(r.body.lead.tags||[]).includes("cliente-genesis"),"alta manual: crea el contacto con tag cliente-genesis");
    const idC=r.body.lead.id; let v=JSON.parse(r.body.lead.fields.venta_json);
    ok(r.body.lead.fields.etapa==="Venta Génesis"&&dia(v.fecha)==="2026-10-23","alta manual: etapa de venta y fecha de cierre");
    ok(v.pagos.map(p=>dia(p.vence)).join()==="2026-10-23,2026-11-23,2026-12-23","alta manual: cuota 1 vence al cierre y las demás cada mes");
    ok(v.cliente.marca==="Limpia Ya"&&v.cliente.otro===undefined,"alta manual: datos del cliente, sin campos de más");
    r=await call(clientesApi,{method:"POST",cookie,body:{nombre:"Carla",email:"carla@cliente.com",oferta:"Génesis",forma:"PIF"}});
    ok(r.statusCode===409,"alta manual: si ya tiene una venta, no la pisa");
    r=await call(clientesApi,{method:"POST",cookie,body:{nombre:"Sin datos",oferta:"Génesis",forma:"PIF"}});
    ok(r.statusCode===400,"alta manual: sin WhatsApp ni email rechazada");
    r=await call(lead,{method:"POST",cookie,body:{id:idC,action:"editar_venta",data:{fecha:"2026-10-20",
      pagos:[{monto:2000,vence:"2026-10-20",pagado:true,fecha:"2026-10-21"},{monto:2000,vence:"2026-11-05"},{monto:2000}]}}});
    v=JSON.parse(r.body.lead.fields.venta_json);
    ok(dia(v.fecha)==="2026-10-20"&&dia(v.pagos[1].vence)==="2026-11-05"&&dia(v.pagos[2].vence)==="2026-12-23","editar venta: fecha de cierre y vencimientos a mano (vacío conserva el anterior)");
    r=await call(lead,{method:"POST",cookie,body:{id:idC,action:"cliente",data:{email:"carla@nuevo.com",cliente:{web:"limpiaya.com"}}}});
    v=JSON.parse(r.body.lead.fields.venta_json);
    ok(r.body.lead.email==="carla@nuevo.com"&&v.cliente.web==="limpiaya.com"&&v.cliente.marca==="Limpia Ya","datos del cliente: contacto y marca/web sin perder lo anterior");
    r=await call(lead,{method:"POST",cookie,body:{id:"demo-martin",action:"venta",data:{oferta:"Mentoría",forma:"PIF"}}});
    v=JSON.parse(r.body.lead.fields.venta_json);
    ok(v.pagos[0].vence&&dia(v.pagos[0].vence)===dia(v.fecha),"venta sin fecha: cierre hoy y la cuota vence hoy");
  }

  // Calendario de llamadas: horario desde el webhook y citas por rango
  { const webhookApi=h("api/webhook.js"), cal=h("api/calendario.js"), lead=h("api/lead.js");
    let r=await call(webhookApi,{method:"POST",query:{cal:"diego"},body:{type:"AppointmentCreate",appointment:{contactId:"demo-lucia",startTime:"2026-10-23 16:00:00",endTime:"2026-10-23T16:45:00-03:00"}}});
    const lu=(await call(lead,{cookie,query:{id:"demo-lucia"}})).body.lead;
    ok(r.body.ok&&lu.fields.cita_at==="2026-10-23T19:00:00.000Z"&&lu.fields.cita_fin==="2026-10-23T19:45:00.000Z","webhook: guarda el horario de la cita (sin zona = hora de Argentina)");
    const d=Date.parse("2026-10-19T03:00:00Z");
    r=await call(cal,{cookie,query:{desde:String(d),hasta:String(d+7*864e5)}});
    const c=r.body.citas.find(x=>x.leadId==="demo-lucia");
    ok(c&&c.con==="Equipo"&&c.tipo==="Venta"&&c.inicio==="2026-10-23T19:00:00.000Z","calendario: la cita aparece en su semana, con el equipo");
    r=await call(cal,{cookie,query:{desde:String(d+7*864e5),hasta:String(d+14*864e5)}});
    ok(!r.body.citas.some(x=>x.leadId==="demo-lucia"),"calendario: fuera del rango no aparece");
    r=await call(cal,{cookie,query:{desde:"0",hasta:"1"}});
    ok(r.statusCode===400,"calendario: rango inválido rechazado");
    r=await call(cal,{query:{desde:String(d),hasta:String(d+864e5)}});
    ok(r.statusCode===401,"calendario: sin sesión → 401");
    await call(webhookApi,{method:"POST",query:{cal:"diego"},body:{type:"AppointmentDelete",appointment:{contactId:"demo-lucia"}}});
    r=await call(cal,{cookie,query:{desde:String(d),hasta:String(d+7*864e5)}});
    ok(!r.body.citas.some(x=>x.leadId==="demo-lucia"),"calendario: la cita cancelada desaparece");
  }

  // Proceso post webinar: aplicación → SDR 50/50 → llamadas → agenda → setteo → cierre → onboarding
  { const lead=h("api/lead.js"), apl=h("api/public/aplicacion.js"), leadsApi=h("api/leads.js"), settingsApi=h("api/settings.js"), P=h("lib/post.js");
    await call(settingsApi,{method:"POST",cookie,body:{postDesde:"2026-01-01",sdrMatiWa:"https://wa.link/mati",sdrSantiWa:"https://wa.link/santi",closers:"Diego, Jose"}});
    let r=await call(apl,{method:"POST",body:{nombre:"Lucas Post",email:"lucas@post.com",telefono:"+54 9 11 7777 0001",objetivo:"x",freno:"y",hace_cuanto:"z",ciclo:"Entre 30 y 60 días",facturacion:"Entre 30M y 50M",inversion:"Entre USD 1.000 y USD 3.000"}});
    const sdr=P.sdrPara("lucas@post.com","+54 9 11 7777 0001");
    ok(r.body.ok&&r.body.sdr===sdr&&r.body.wa===(sdr==="Mati"?"https://wa.link/mati":"https://wa.link/santi"),"aplicación: devuelve el SDR (50/50) y su walink");
    let all=await call(leadsApi,{cookie});
    const lu=all.body.leads.find(l=>l.email==="lucas@post.com");
    ok(lu&&lu.fields.post_estado==="Nuevo lead"&&lu.fields.sdr===sdr&&all.body.colas.post.includes(lu.id),"aplicación: entra al proceso como Nuevo lead con su SDR");
    ok(P.nombreAgenda(lu)==="Lucas / 1000 a 3000","se agenda como «Lucas / 1000 a 3000»");
    const reparto=Array.from({length:200},(_,i)=>P.sdrPara(`x${i}@m.com`)).filter(x=>x==="Mati").length;
    ok(reparto>70&&reparto<130,"reparto entre Mati y Santi cerca de 50/50 ("+reparto+"/200)");
    const id=lu.id, post=(data)=>call(lead,{method:"POST",cookie,body:{id,action:"post",data}});
    for(let i=0;i<2;i++) await post({op:"llamada",atendio:false});
    r=await post({op:"llamada",atendio:false});
    ok(r.body.lead.fields.post_estado==="No atendió","3 llamadas sin respuesta → No atendió");
    r=await post({op:"seguimiento",nota:"audio + mensaje"});
    ok(JSON.parse(r.body.lead.fields.post_json).seguimientos.length===1,"seguimiento anotado");
    r=await post({op:"agendar",oferta:"OS Fast",closer:"Diego",call_at:"2026-10-27T19:00"});
    let pj=JSON.parse(r.body.lead.fields.post_json);
    ok(r.body.lead.fields.post_estado==="Agendado"&&pj.oferta==="OS Fast"&&pj.call_at==="2026-10-27T22:00:00.000Z","agendado: oferta, closer y hora de Argentina");
    ok(P.nombreGrupo(r.body.lead,pj.call_at)==="Lucas / 19hs / 27/10","nombre del grupo «Lucas / 19hs / 27/10»");
    r=await post({op:"agendar",oferta:"Otra",call_at:"2026-10-27T19:00"});
    ok(r.statusCode===400,"agendar con oferta inválida rechazado");
    r=await post({op:"tilde",fase:"setteo",clave:"confirmo",valor:true});
    r=await post({op:"tilde",fase:"recursos",clave:"vsl",valor:true});
    pj=JSON.parse(r.body.lead.fields.post_json);
    ok(pj.confirmo===true&&pj.recursos.vsl===true,"setteo y recursos tildados");
    r=await post({op:"tilde",fase:"recursos",clave:"nada",valor:true});
    ok(r.statusCode===400,"tilde inválido rechazado");
    r=await call(lead,{method:"POST",cookie,body:{id,action:"venta",data:{oferta:"OS Fast",forma:"Personalizado",montos:[500,500],sena:200,fathom:"https://fathom.video/x"}}});
    const v=JSON.parse(r.body.lead.fields.venta_json);
    ok(r.body.lead.fields.post_estado==="Cliente · falta onboarding"&&r.body.lead.fields.etapa==="Venta OS Fast"&&v.sena===200&&v.fathom==="https://fathom.video/x","venta: Cliente · falta onboarding, etapa de la oferta, seña y Fathom");
    r=await call(lead,{method:"POST",cookie,body:{id,action:"venta",data:{oferta:"Subscriptions",forma:"PIF"}}});
    ok(r.statusCode===400,"oferta sin precio fijo: solo con montos a mano");
    r=await post({op:"estado",estado:"Cliente"});
    ok(r.body.lead.fields.post_estado==="Cliente","onboarding terminado → Cliente");
    all=await call(leadsApi,{cookie});
    ok(all.body.colas.ventas.includes(id),"el cliente aparece en Ventas y Clientes");
    { await call(settingsApi,{method:"POST",cookie,body:{sdrMatiWa:"",sdrSantiWa:""}});
      const r2=await call(apl,{method:"POST",body:{nombre:"Nuevo",email:"nuevo@post.com",telefono:"+54 9 11 7777 0003",inversion:"Más de USD 6.000",conoce_manu:"Hace menos de 1 mes",por_que_ahora:"El CPA se fue al doble"}});
      ok(r2.body.wa===P.WA_SDR[r2.body.sdr],"sin walink en Configuración usa el de Mati o Santi por defecto");
      const nu=(await call(leadsApi,{cookie})).body.leads.find(l=>l.email==="nuevo@post.com");
      ok(nu.fields.conoce_manu==="Hace menos de 1 mes"&&nu.fields.por_que_ahora==="El CPA se fue al doble","aplicación: guarda hace cuánto conoce a Manu y por qué ahora"); }
    r=await call(apl,{method:"POST",body:{nombre:"Bajo",email:"bajo@post.com",telefono:"+54 9 11 7777 0002",inversion:"Menos de USD 1.000"}});
    ok(r.body.ruta==="rechazado"&&!r.body.wa,"inversión < USD 1.000: sin walink");
    all=await call(leadsApi,{cookie});
    ok(!all.body.colas.post.includes(all.body.leads.find(l=>l.email==="bajo@post.com").id),"el rechazado no entra al proceso");
  }

  // Registro a la clase del sábado: tag propio, también para el que ya estaba registrado a la del lunes
  { const optinApi=h("api/public/optin.js"), lead=h("api/lead.js");
    let r=await call(optinApi,{method:"POST",body:{nombre:"Martín",email:"martin@demo.com",telefono:"+5491155550001"}});
    const m=(await call(lead,{cookie,query:{id:r.body.id}})).body.lead;
    ok(r.body.repetido&&(m.tags||[]).includes("optin-24-10"),"re-registro: el que ya estaba suma optin-24-10 (dispara el workflow de mails)");
    r=await call(optinApi,{method:"POST",body:{nombre:"Nueva",email:"nueva24@x.com",telefono:"+5491170009999"}});
    const n=(await call(lead,{cookie,query:{id:r.body.id}})).body.lead;
    ok((n.tags||[]).includes("optin-19-10")&&(n.tags||[]).includes("optin-24-10"),"registro nuevo: optin-19-10 y optin-24-10");
  }

  console.log(fallas?`\n${fallas} FALLAS`:"\nTodo verde ✓");
  process.exit(fallas?1:0);
})().catch(e=>{console.error("ERROR:",e);process.exit(1);});
