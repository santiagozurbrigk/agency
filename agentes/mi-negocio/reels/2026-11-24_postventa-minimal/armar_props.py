# Reel "postventa: 3 a 8 tickets cada 100 pedidos" en formato ReelMin (referencia reel-ig-minimal).
#   python3 armar_props.py  ->  props.json
import json

W = json.load(open('palabras_w.json'))
pal = []
for w in W:
    x = w['w'].strip(',.;:')
    if not x:
        continue
    x = {'tiquete': 'tickets', 'ocho': '8', 'Si': 'si', 'Es': 'es', 'La': 'la', 'O': 'o'}.get(x, x)
    # la transcripción oye "si" donde Manu dice "pobre" (bajito); el "si tenemos" real arranca en 11,6
    if x == 'si' and abs(w['s'] - 11.08) < 0.05:
        pal.append({'w': 'pobre', 's': 10.98, 'e': 11.45})
        pal.append({'w': 'si', 's': 11.62, 'e': 12.2})
        continue
    if x == 'a' and abs(w['s'] - 20.56) < 0.05:  # resto del "o sea" cortado
        continue
    pal.append({'w': x, 's': w['s'], 'e': w['e']})

FIN = 29.8
CTA = 2.2
cortes = json.load(open('cortes.json'))['cortes']
P = {
    'duracion': round(FIN + CTA, 2),
    'cam': 'cam.mp4',
    'acento': '#F26A1B',
    'camara': {'escala': 0.78, 'top': 1040, 'zoomFinal': 1.08},
    'bpm': 100,
    'cortes': cortes,
    'palabras': pal,
    'grandes': [
        {'t0': 0.0, 't1': 1.5, 'chica': 'de cada', 'grande': '100'},
        {'t0': 1.5, 't1': 4.0, 'chica': 'tickets de contacto', 'grande': '3 a 8', 'tam': 175},
        {'t0': 4.05, 't1': 6.25, 'chica': '3 tickets es', 'grande': 'élite', 'bueno': True},
        {'t0': 6.25, 't1': 11.5, 'chica': '8 tickets es', 'grande': 'pobre', 'malo': True},
        {'t0': 11.55, 't1': 15.7, 'chica': 'de cada 100 pedidos', 'grande': '+8'},
        {'t0': 15.7, 't1': 19.7, 'chica': 'preguntan porque les falta', 'grande': 'info'},
        {'t0': 19.7, 't1': 20.6, 'chica': 'cuello de', 'grande': 'botella'},
        {'t0': 20.6, 't1': 24.1, 'chica': 'la mitad pregunta', 'grande': '50%'},
        {'t0': 24.1, 't1': FIN, 'chica': 'un buen sistema de', 'grande': 'postventa', 'tam': 165, 'bueno': True},
    ],
    'escenas': [
        {'t0': 0.0, 't1': 4.0, 'tipo': 'grilla', 'titulo': '100 personas',
         'pasos': [{'t': 1.52, 'desde': 0, 'hasta': 3, 'color': 'acento'}, {'t': 2.26, 'desde': 3, 'hasta': 8, 'color': 'blanco'}]},
        {'t0': 4.0, 't1': 11.5, 'tipo': 'escala', 'titulo': 'tickets cada 100 pedidos',
         'marcas': [{'t': 4.1, 'v': 3, 'texto': 'élite', 'bueno': True}, {'t': 6.35, 'v': 8, 'texto': 'pobre', 'bueno': False}]},
        {'t0': 11.55, 't1': 20.6, 'tipo': 'grilla', 'titulo': '100 pedidos',
         'pasos': [{'t': 14.0, 'desde': 0, 'hasta': 9, 'color': 'blanco'}],
         'dudas': {'t': 15.74, 'n': 9}, 'alerta': {'t': 19.76, 'texto': '! cuello de botella'}},
        {'t0': 20.6, 't1': 24.1, 'tipo': 'chat', 'titulo': 'bandeja · consultas',
         'barra': {'t': 20.68, 'n': 5, 'texto': '50% · la mitad'},
         'mensajes': [{'t': 21.58, 'texto': '¿Dónde está mi pedido?'}, {'t': 22.52, 'texto': '¿Y mi código de seguimiento?'}]},
        {'t0': 24.1, 't1': FIN, 'tipo': 'bandeja', 'titulo': 'postventa · sistema',
         'filas': [{'texto': '¿Dónde está mi pedido?', 't': 24.3, 'tOk': 26.9},
                   {'texto': 'Código de seguimiento', 't': 24.5, 'tOk': 27.6},
                   {'texto': 'Otra consulta', 't': 24.7, 'tOk': 28.5}]},
    ],
    'laterales': [
        {'t0': 4.05, 't1': 6.25, 'lado': 'izq', 'icono': 'sube'}, {'t0': 4.15, 't1': 6.25, 'lado': 'der', 'icono': 'ok'},
        {'t0': 6.3, 't1': 11.5, 'lado': 'izq', 'icono': 'baja'}, {'t0': 6.4, 't1': 11.5, 'lado': 'der', 'icono': 'no'},
        {'t0': 14.0, 't1': 20.6, 'lado': 'der', 'icono': 'no'}, {'t0': 19.7, 't1': 20.6, 'lado': 'izq', 'icono': 'baja'},
        {'t0': 24.3, 't1': FIN, 'lado': 'izq', 'icono': 'sube'}, {'t0': 26.9, 't1': FIN, 'lado': 'der', 'icono': 'ok'},
    ],
    'cta': {'t0': FIN, 't1': FIN + CTA, 'chica': 'comentá', 'grande': 'OPERACIONES', 'abajo': 'y te paso el video entero'},
}

# sonidos, sincronizados con lo que aparece
son = [{'t': 0, 'tipo': 'impacto'}]
for g in P['grandes'][1:]:
    son.append({'t': g['t0'], 'tipo': 'glitch'})
for e in P['escenas'][1:]:
    son.append({'t': e['t0'] - 0.12, 'tipo': 'whoosh'})
for e in P['escenas']:
    for s in e.get('pasos', []):
        for k in range(s['hasta'] - s['desde']):
            son.append({'t': round(s['t'] + k * 0.06, 3), 'tipo': 'tic'})
    for m in e.get('marcas', []) + e.get('mensajes', []):
        son.append({'t': m['t'], 'tipo': 'pop'})
    for fila in e.get('filas', []):
        son.append({'t': fila['tOk'], 'tipo': 'pop'})
    if e.get('dudas'):
        for k in range(e['dudas']['n']):
            son.append({'t': round(e['dudas']['t'] + k * 0.12, 3), 'tipo': 'tic'})
    if e.get('alerta'):
        son.append({'t': e['alerta']['t'], 'tipo': 'impacto'})
for l in P['laterales']:
    son.append({'t': l['t0'], 'tipo': 'pop'})
son += [{'t': FIN - 1.3, 'tipo': 'riser'}, {'t': FIN, 'tipo': 'impacto'}, {'t': FIN + 0.25, 'tipo': 'glitch'}]
P['sonidos'] = sorted(son, key=lambda x: x['t'])
P['musica'] = {'bpm': 100, 'corte': [19.45, 19.76], 'riser': [FIN - 1.3, FIN]}
P['fuentes'] = json.load(open('fonts/fonts.json'))
json.dump(P, open('props.json', 'w'), ensure_ascii=False, indent=1)
print(' '.join(f"{w['w']}@{w['s']}" for w in pal))
