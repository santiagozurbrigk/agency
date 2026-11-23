import json,re
W=json.load(open('palabras_raw.json'))
out=[]
for w in W:
    x=re.sub(r'[.,;:?¿]+','',w['w'])
    s,e=w['s'],w['e']
    if x=='Nuoblid':
        m=(s+e)/2; out+= [{'w':'nuevo','s':s,'e':m},{'w':'lead','s':m,'e':e}]; continue
    if x=='de' and abs(s-35.5)<0.05: continue
    if x=='o' and abs(s-35.78)<0.05: continue
    x={'gastos':'datos','la':'le' if abs(s-35.0)<0.05 else 'la','resuelva':'resuelve','gestiones':'objeciones','Apenas':'apenas','Entonces':'entonces','Pero':'pero','A':'a','Por':'por'}.get(x,x)
    out.append({'w':x,'s':s,'e':e})
# "10 por ciento" -> "10%"
i=[k for k,w in enumerate(out) if w['w']=='10'][0]
out[i]={'w':'10%','s':out[i]['s'],'e':out[i+2]['e']}; del out[i+1:i+3]
# "5 minutos"
K={'webhook','disparador','vendedor','abandonado','automatiza','notificación','lead','contacto','producto','ticket','5','minutos','llamarlo','comisión','teléfono','10%','recuperación','buenísimo'}
first=set()
for w in out:
    if w['w'] in K and (w['w'] not in ('vendedor','webhook','abandonado') or w['w'] not in first):
        w['k']=True
    first.add(w['w'])
P={"duracion":45.3,"cam":"cam.mp4",
 "colores":{"acento":"#F26A1B","fondo":"#EEEAE3","claro":"#F2EDE4","tarjeta":"#FFFFFF","tinta":"#0B0B0C"},
 "modos":[{"t0":0,"t1":21.9,"modo":"split"},{"t0":21.9,"t1":23.95,"modo":"cam"},{"t0":23.95,"t1":28.95,"modo":"split"},
          {"t0":28.95,"t1":35.0,"modo":"cam"},{"t0":35.0,"t1":42.5,"modo":"split"},{"t0":42.5,"t1":43.75,"modo":"cam"},{"t0":43.75,"t1":45.3,"modo":"placa"}],
 "encabezados":[{"t0":0,"t1":5.55,"texto":"El vendedor que","caja":"recupera carritos"},
   {"t0":5.55,"t1":11.1,"texto":"A cada","caja":"carrito abandonado"},
   {"t0":11.1,"t1":21.9,"texto":"Le llega","caja":"una alerta"},
   {"t0":23.95,"t1":28.95,"texto":"Lo llama en","caja":"menos de 5 min"},
   {"t0":35.0,"t1":38.1,"texto":"Cobra solo","caja":"si vende"},
   {"t0":38.1,"t1":42.5,"texto":"El sistema","caja":"completo"}],
 "tarjetas":[
   {"t0":0,"t1":11.1,"tipo":"flujo","etiqueta":"automatización · webhook","nodos":[
      {"icono":"carrito","titulo":"Carrito abandonado","t":5.92},{"icono":"rayo","titulo":"Webhook","t":0.64},{"icono":"telefono","titulo":"Vendedor","t":3.58}]},
   {"t0":11.1,"t1":21.9,"tipo":"aviso","etiqueta":"notificación interna","tituloAviso":"Nuevo lead","tAviso":11.5,
    "campos":[{"texto":"Contacto","t":17.68},{"texto":"Producto","t":19.68},{"texto":"Ticket","t":20.98}]},
   {"t0":23.95,"t1":28.95,"tipo":"contador","etiqueta":"tiempo de respuesta","chip":"Lo llama en menos de","desde":0,"hasta":5,"tc0":26.5,"tc1":27.3,"unidad":"min"},
   {"t0":35.0,"t1":38.1,"tipo":"contador","etiqueta":"comisión","chip":"Por cada venta que cierra","desde":0,"hasta":10,"tc0":36.4,"tc1":37.5,"unidad":"%"},
   {"t0":38.1,"t1":42.5,"tipo":"veredicto","etiqueta":"recuperación de pedidos","filas":[
      {"nombre":"Alerta","texto":"al instante","marca":"ok","t":38.62},
      {"nombre":"Llamada","texto":"menos de 5 min","marca":"ok","t":39.84},
      {"nombre":"Comisión","texto":"10% por venta","marca":"ok","t":40.82}]}],
 "palabras":out,"cortes":[],
 "zooms":[{"t0":21.9,"t1":23.95,"z":1.12},{"t0":32.4,"t1":35.0,"z":1.1},{"t0":42.5,"t1":45.3,"z":1.08}],
 "cta":{"t0":43.75,"t1":45.3,"arriba":"comentá","abajo":"OPERACIONES"},
 "camSplit":{"y":900,"escala":1}}
P['fuentes']=json.load(open('fonts/fonts.json'))
json.dump(P,open('props.json','w'),ensure_ascii=False,indent=1)
print(" ".join(w['w'].upper() if w.get('k') else w['w'] for w in out))
