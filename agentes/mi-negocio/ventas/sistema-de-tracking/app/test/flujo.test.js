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

  // Métricas
  const metrics=h("api/metrics.js");
  r=await call(metrics,{cookie});
  ok(r.body.ok&&r.body.porOferta["Génesis"].cantidad===1,"métricas: 1 Génesis");
  ok(r.body.porOferta["Génesis"].cobrado===1500&&r.body.porOferta["Génesis"].total===6000,"métricas: cobrado 1500 de 6000 (venta editada a mano)");
  ok(r.body.porPersona===undefined,"métricas: sin «por persona» (ya no hay dueños)");
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
    ok(an.meta===null,"anuncios: sin variables de Meta, meta = null");
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

  console.log(fallas?`\n${fallas} FALLAS`:"\nTodo verde ✓");
  process.exit(fallas?1:0);
})().catch(e=>{console.error("ERROR:",e);process.exit(1);});
