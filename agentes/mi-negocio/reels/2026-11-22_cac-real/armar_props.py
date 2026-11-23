import json,re
W=json.load(open('palabras_raw.json'))
out=[]
for w in W:
    if (w['w']=='en' and abs(w['s']-15.56)<0.05) or (w['w']=='como' and abs(w['s']-28.48)<0.05): continue
    x=re.sub(r'[.,;:]+$','',w['w'])
    x={'3':'tres','super':'súper','CAC':'CAC'}.get(x,x)
    out.append({'w':x,'s':w['s'],'e':w['e']})
out.append({'w':'chau','s':48.02,'e':48.45})
K={'fórmula','tres','pauta','costo','dividido','clientes','adquiridos','adquisición','real','CAC','contribución','marginal','performance','trimestral','rentable','sacar','ajustes','buenísimo','chau'}
for w in out:
    if w['w'] in K: w['k']=True
# "pauta" la primera vez y "costo de adquisición" sí; "clientes" de 20.96 no
for w in out:
    if w['w']=='clientes' and w['s']>20: w.pop('k',None)
    if w['w']=='costo' and w['s']>19: w.pop('k',None)
    if w['w']=='sacar' and w['s']<5: w.pop('k',None)
P={"duracion":50.0,"cam":"cam.mp4",
 "colores":{"acento":"#F26A1B","fondo":"#0B0B0C","claro":"#F2EDE4","tarjeta":"#141416"},
 "modos":[{"t0":0,"t1":21.35,"modo":"split"},{"t0":21.35,"t1":25.1,"modo":"cam"},{"t0":25.1,"t1":34.65,"modo":"split"},
          {"t0":34.65,"t1":42.6,"modo":"cam"},{"t0":42.6,"t1":48.6,"modo":"split"},{"t0":48.6,"t1":50,"modo":"cam"}],
 "encabezados":[{"t0":0,"t1":6.6,"texto":"Cómo medir","caja":"cada equipo"},
   {"t0":6.6,"t1":21.35,"texto":"La fórmula del","caja":"CAC real"},
   {"t0":25.1,"t1":28.4,"texto":"Lo que deja","caja":"cada equipo"},
   {"t0":28.4,"t1":34.65,"texto":"Cada cuánto","caja":"se mide"},
   {"t0":42.6,"t1":48.6,"texto":"Cómo queda","caja":"el trimestre"}],
 "tarjetas":[
   {"t0":0,"t1":6.6,"tipo":"video","src":"board.mp4","etiqueta":"pizarra · 3 equipos creativos"},
   {"t0":6.6,"t1":21.35,"tipo":"formula","etiqueta":"costo de adquisición real","pasos":[
      {"t":6.72,"que":"pauta"},{"t":10.72,"que":"mas"},{"t":12.68,"que":"costo"},{"t":14.96,"que":"linea"},
      {"t":16.44,"que":"clientes"},{"t":18.7,"que":"igual"},{"t":19.92,"que":"cac"}]},
   {"t0":25.1,"t1":28.4,"tipo":"barras","etiqueta":"rendimiento por equipo","titulo":"Contribución marginal",
    "barras":[{"nombre":"Equipo A","valor":0.92,"t":26.46},{"nombre":"Equipo B","valor":0.5,"t":26.7},{"nombre":"Equipo C","valor":0.16,"t":26.94}]},
   {"t0":28.4,"t1":34.65,"tipo":"contador","etiqueta":"cada cuánto se hace la cuenta","chip":"Análisis de performance","desde":0,"hasta":90,"tc0":32.6,"tc1":34.1,"unidad":"días"},
   {"t0":42.6,"t1":48.6,"tipo":"veredicto","etiqueta":"resultado del trimestre","filas":[
      {"nombre":"Equipo A","texto":"buenísimo","marca":"ok","t":43.38},
      {"nombre":"Equipo B","texto":"más o menos","marca":"medio","t":45.42},
      {"nombre":"Equipo C","texto":"chau","marca":"no","t":47.76}]}],
 "palabras":out,"cortes":[],
 "zooms":[{"t0":21.55,"t1":25.1,"z":1.12},{"t0":39.55,"t1":42.6,"z":1.15},{"t0":48.6,"t1":50,"z":1.08}],
 "cta":{"t0":48.6,"t1":50,"arriba":"comentá","abajo":"OPERACIONES"},
 "camSplit":{"y":700,"escala":1}}
P['fuentes']=json.load(open('fonts/fonts.json'))
json.dump(P,open('props.json','w'),ensure_ascii=False,indent=1)
print(" ".join(w['w'].upper() if w.get('k') else w['w'] for w in out))
