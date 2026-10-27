#!/usr/bin/env python3
"""
Lee un tablero de Miro completo y lo deja listo para que Claude lo entienda.

Genera, en la carpeta de salida:
  tablero.md    mapa legible: jerarquía (frames > contenedores > elementos),
                orden de lectura, columnas/filas, flechas, grupos y colores
  tablero.json  todos los datos crudos y calculados
  capturas/     general.png y una imagen por frame del tablero reconstruido;
                capturas/reales/ con capturas de Miro tal cual se ve
  imagenes/     las imágenes pegadas en el tablero

Uso:
  python3 leer_tablero.py configurar [--token TOKEN]   guarda el token de Miro
  python3 leer_tablero.py login                        (opcional) inicia sesión en Miro
                                                       para las capturas reales
  python3 leer_tablero.py LINK_DEL_TABLERO [--salida CARPETA]
                                                       [--sin-capturas-reales] [--sin-imagenes]
                                                       [--max-frames N]

Solo usa la librería estándar de Python. Para las imágenes hace falta Playwright:
  pip install playwright   (y Google Chrome instalado, o: python3 -m playwright install chromium)
"""

import argparse
import base64
import html
import json
import mimetypes
import os
import re
import shutil
import statistics
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter, defaultdict
from datetime import datetime
from pathlib import Path

API = os.environ.get("MIRO_API_BASE", "https://api.miro.com")
CONFIG_DIR = Path.home() / ".miro-lector"
TOKEN_FILE = CONFIG_DIR / "token"
SESION_FILE = CONFIG_DIR / "sesion.json"
LADO_IMAGEN = 1600  # px del lado mayor de cada captura reconstruida

INSTRUCCIONES_TOKEN = """\
Cómo sacar tu token de Miro (una sola vez, 3 minutos):
  1. Entrá a https://miro.com/app/settings/user-profile/apps
  2. "Create new app" (si te pide, creá un equipo de desarrollador: es gratis).
  3. En la app, sección Permissions, tildá boards:read.
  4. Botón "Install app and get OAuth token" > elegí el equipo donde están tus tableros.
  5. Copiá el token que te muestra.
"""

# ---------------------------------------------------------------- utilidades


class ErrorMiro(Exception):
    pass


def leer_token():
    token = os.environ.get("MIRO_TOKEN", "").strip()
    if not token and TOKEN_FILE.exists():
        token = TOKEN_FILE.read_text().strip()
    return token


def mensaje_error(codigo, cuerpo):
    if codigo == 401:
        return ("Miro rechazó el token (401): es inválido o venció. "
                "Volvé a correr: leer_tablero.py configurar")
    if codigo == 403:
        return ("Sin permiso para este tablero (403). La app de Miro tiene que estar instalada "
                "en el equipo dueño del tablero y tener el permiso boards:read.")
    if codigo == 404:
        return ("No encontré el tablero (404). Revisá el link, y que el tablero sea de un equipo "
                "donde instalaste la app de Miro.")
    return f"Miro respondió {codigo}: {cuerpo}"


def api_get(ruta, token, params=None):
    url = ruta if ruta.startswith("http") else API + ruta
    if params:
        url += ("&" if "?" in url else "?") + urllib.parse.urlencode(params)
    for intento in range(5):
        req = urllib.request.Request(url, headers={
            "Authorization": f"Bearer {token}", "Accept": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503) and intento < 4:
                time.sleep(int(e.headers.get("Retry-After") or 2 ** intento))
                continue
            raise ErrorMiro(mensaje_error(e.code, e.read().decode(errors="replace")[:300]))
        except urllib.error.URLError as e:
            if intento < 4:
                time.sleep(2 ** intento)
                continue
            raise ErrorMiro(f"No me pude conectar con Miro: {e.reason}")


def paginar(ruta, token):
    datos, cursor = [], None
    while True:
        params = {"limit": 50}
        if cursor:
            params["cursor"] = cursor
        r = api_get(ruta, token, params)
        datos += r.get("data", [])
        cursor = r.get("cursor")
        if not cursor or not r.get("data"):
            return datos


def id_tablero(texto):
    m = re.search(r"/board/([^/?#]+)", texto)
    return urllib.parse.unquote(m.group(1) if m else texto.strip())


def slug(texto, largo=40):
    s = re.sub(r"[^a-zA-Z0-9]+", "-", texto.lower()).strip("-")
    return s[:largo] or "sin-titulo"


def texto_html(s):
    if not isinstance(s, str) or not s:
        return ""
    s = re.sub(r"(?i)<br\s*/?>|</p>|</li>|</div>|</h\d>", "\n", s)
    s = re.sub(r"(?i)<li[^>]*>", "• ", s)
    s = html.unescape(re.sub(r"<[^>]+>", "", s))
    lineas = [re.sub(r"[ \t ]+", " ", l).strip() for l in s.split("\n")]
    return "\n".join(l for l in lineas if l)


def buscar_texto(d):
    """Para tipos poco comunes (mapas mentales, etc.): primer texto que aparezca."""
    if isinstance(d, dict):
        for k in ("content", "title", "text"):
            if isinstance(d.get(k), str) and d[k].strip():
                return texto_html(d[k])
        for v in d.values():
            t = buscar_texto(v)
            if t:
                return t
    elif isinstance(d, list):
        for v in d:
            t = buscar_texto(v)
            if t:
                return t
    return ""


def texto_item(it):
    d = it.get("data") or {}
    tipo = it.get("type")
    if tipo in ("card", "app_card"):
        partes = [texto_html(d.get("title")), texto_html(d.get("description"))]
    elif tipo in ("embed", "preview"):
        partes = [d.get("title") or "", d.get("url") or d.get("previewUrl") or ""]
    else:
        partes = [texto_html(d.get(k)) for k in ("title", "content")]
        if not any(partes):
            partes = [buscar_texto(d)]
    return "\n".join(p for p in partes if p)


# ------------------------------------------------------------------- colores

COLORES_NOTA = {
    "gray": ("gris", "#e6e6e6"), "light_yellow": ("amarillo claro", "#fff9b1"),
    "yellow": ("amarillo", "#f5d128"), "orange": ("naranja", "#ff9d48"),
    "light_green": ("verde claro", "#d5f692"), "green": ("verde", "#c9df56"),
    "dark_green": ("verde oscuro", "#93d275"), "cyan": ("celeste", "#67c6c0"),
    "light_pink": ("rosa claro", "#ffcee0"), "pink": ("rosa", "#ea94bb"),
    "violet": ("violeta", "#c6a2d2"), "red": ("rojo", "#f0939d"),
    "light_blue": ("azul claro", "#a6ccf5"), "blue": ("azul", "#6cd8fa"),
    "dark_blue": ("azul oscuro", "#9ea9ff"), "black": ("negro", "#000000"),
}
PALETA = [
    ("blanco", (255, 255, 255)), ("negro", (0, 0, 0)), ("gris", (150, 150, 150)),
    ("gris claro", (222, 222, 222)), ("rojo", (220, 50, 50)), ("rosa", (240, 150, 190)),
    ("naranja", (255, 150, 60)), ("amarillo", (250, 215, 50)),
    ("amarillo claro", (255, 245, 170)), ("rosa claro", (255, 206, 224)), ("lila", (200, 170, 230)),
    ("azul claro", (166, 204, 245)), ("durazno", (255, 200, 160)), ("verde", (70, 175, 80)),
    ("verde claro", (200, 240, 150)), ("celeste", (120, 200, 240)), ("azul", (50, 100, 220)),
    ("azul oscuro", (30, 40, 120)), ("violeta", (150, 90, 200)), ("marrón", (140, 90, 50)),
]


def nombre_hex(h):
    try:
        rgb = tuple(int(h.lstrip("#")[i:i + 2], 16) for i in (0, 2, 4))
    except ValueError:
        return h
    return min(PALETA, key=lambda p: sum((a - b) ** 2 for a, b in zip(rgb, p[1])))[0]


def color_item(it):
    """(nombre, hex) del relleno, o (None, None) si no tiene."""
    st = it.get("style") or {}
    c = st.get("fillColor")
    if not c:
        return None, None
    if c in COLORES_NOTA:
        return COLORES_NOTA[c]
    try:
        if float(st.get("fillOpacity", 1)) == 0:
            return "sin relleno", None
    except (TypeError, ValueError):
        pass
    if c.lower() in ("transparent", "none"):
        return "sin relleno", None
    if c.startswith("#"):
        return f"{nombre_hex(c)} ({c.lower()})", c
    return c, None


# ------------------------------------------------------------------ geometría


def calcular_cajas(items):
    """Caja absoluta (coordenadas del lienzo) de cada elemento."""
    por_id = {it["id"]: it for it in items}
    cajas = {}

    def caja(iid, visitados=()):
        if iid in cajas:
            return cajas[iid]
        it = por_id.get(iid)
        if not it or iid in visitados:
            return None
        pos, geo = it.get("position") or {}, it.get("geometry") or {}
        if pos.get("x") is None or pos.get("y") is None:
            cajas[iid] = None
            return None
        w, h = geo.get("width"), geo.get("height")
        if w is None and h is None:
            w = h = 100
        elif w is None:
            w = h
        elif h is None:  # textos: Miro solo da el ancho
            fs = float((it.get("style") or {}).get("fontSize") or 14)
            n = max(1, len(texto_item(it)) * fs * 0.55 / max(w, 1))
            h = max(fs * 1.5, n * fs * 1.4)
        x, y = pos["x"], pos["y"]
        if pos.get("relativeTo") == "parent_top_left":
            p = caja((it.get("parent") or {}).get("id"), visitados + (iid,))
            if p:
                x, y = p["x0"] + x, p["y0"] + y
        cajas[iid] = {"x0": x - w / 2, "y0": y - h / 2, "x1": x + w / 2, "y1": y + h / 2,
                      "w": w, "h": h}
        return cajas[iid]

    for it in items:
        caja(it["id"])
    return cajas


def area(c):
    return c["w"] * c["h"] if c else 0


def contiene(grande, chica):
    ix = max(0, min(grande["x1"], chica["x1"]) - max(grande["x0"], chica["x0"]))
    iy = max(0, min(grande["y1"], chica["y1"]) - max(grande["y0"], chica["y0"]))
    return area(chica) > 0 and ix * iy / area(chica) >= 0.8


def agrupar(nodos, a0, a1):
    """Agrupa nodos que se superponen en un eje (columnas con x0/x1, filas con y0/y1)."""
    grupos, fin = [], None
    for n in sorted(nodos, key=lambda n: n["caja"][a0]):
        if grupos and n["caja"][a0] < fin:
            grupos[-1].append(n)
            fin = max(fin, n["caja"][a1])
        else:
            grupos.append([n])
            fin = n["caja"][a1]
    return grupos


def orden_lectura(nodos):
    con = [n for n in nodos if n["caja"]]
    filas = agrupar(con, "y0", "y1")
    return [n for f in filas for n in sorted(f, key=lambda n: n["caja"]["x0"])] + \
        [n for n in nodos if not n["caja"]]


def disponer(nodos, hijos_de):
    """Detecta cómo están ordenados los hijos de un contenedor.
    Devuelve (descripción, [(título de bloque, [nodos])])."""
    con = [n for n in nodos if n["caja"]]
    sin = [n for n in nodos if not n["caja"]]
    if len(con) < 3:
        return "", [("", orden_lectura(nodos))]
    mw = statistics.median(n["caja"]["w"] for n in con)
    anchos = [n for n in con if n["caja"]["w"] > 2.5 * mw]
    resto = [n for n in con if n not in anchos]
    cols = agrupar(resto, "x0", "x1")
    filas = agrupar(resto, "y0", "y1")
    nc, nf = len(cols), len(filas)
    sin_anidados = not any(hijos_de.get(n["id"]) for n in resto)
    if nc >= 2 and nf >= 2 and nc * nf >= 4 and len(resto) >= 0.6 * nc * nf and sin_anidados:
        bloques = [("Fila %d" % (i + 1), sorted(f, key=lambda n: n["caja"]["x0"]))
                   for i, f in enumerate(filas)]
        return f"grilla de {nf} filas × {nc} columnas", \
            ([("Arriba / cruzan columnas", orden_lectura(anchos))] if anchos else []) + bloques + \
            ([("Sin posición", sin)] if sin else [])
    if nc >= 2 and len(resto) / nc >= 2:
        bloques = [("Columna %d" % (i + 1), sorted(c, key=lambda n: n["caja"]["y0"]))
                   for i, c in enumerate(cols)]
        return f"{nc} columnas (leer de izquierda a derecha, cada una de arriba a abajo)", \
            ([("Arriba / cruzan columnas", orden_lectura(anchos))] if anchos else []) + bloques + \
            ([("Sin posición", sin)] if sin else [])
    filas = agrupar(con, "y0", "y1")
    if len(filas) >= 2 and len(filas) < len(con):
        return f"{len(filas)} filas (leer de arriba a abajo, cada una de izquierda a derecha)", \
            [("", orden_lectura(nodos))]
    return "", [("", orden_lectura(nodos))]


# ----------------------------------------------------------- armado del mapa

TIPOS = {
    "sticky_note": "nota", "shape": "forma", "text": "texto", "card": "tarjeta",
    "app_card": "tarjeta", "image": "imagen", "frame": "frame", "document": "documento",
    "embed": "embed", "preview": "link", "mindmap_node": "nodo de mapa mental",
}
FORMAS = {
    "rectangle": "rectángulo", "round_rectangle": "rectángulo redondeado", "circle": "círculo",
    "triangle": "triángulo", "rhombus": "rombo", "parallelogram": "paralelogramo",
    "trapezoid": "trapecio", "pentagon": "pentágono", "hexagon": "hexágono",
    "octagon": "octógono", "star": "estrella", "cloud": "nube", "cross": "cruz",
    "right_arrow": "flecha derecha", "left_arrow": "flecha izquierda", "can": "cilindro",
}


def construir(items, tags):
    cajas = calcular_cajas(items)
    nombres_tag = {t["id"]: t.get("title", "") for t in tags}
    nodos = []
    for it in items:
        nombre_color, hex_color = color_item(it)
        tag_ids = it.get("tagIds") or (it.get("data") or {}).get("tagIds") or []
        nodos.append({
            "id": it["id"], "tipo": it.get("type", "?"), "texto": texto_item(it),
            "forma": (it.get("data") or {}).get("shape") if it.get("type") == "shape" else None,
            "color": nombre_color, "hex": hex_color, "caja": cajas.get(it["id"]),
            "padre_miro": (it.get("parent") or {}).get("id"),
            "tags": [nombres_tag.get(t, t) for t in tag_ids], "crudo": it,
        })
    por_id = {n["id"]: n for n in nodos}
    candidatos = [n for n in nodos if n["tipo"] in ("frame", "shape") and area(n["caja"]) > 0]
    for n in nodos:
        mejor = None
        if n["caja"]:
            for c in candidatos:
                if c is n or area(c["caja"]) <= area(n["caja"]) * 1.2:
                    continue
                if contiene(c["caja"], n["caja"]) and (mejor is None or area(c["caja"]) < area(mejor["caja"])):
                    mejor = c
        padre = mejor["id"] if mejor else n["padre_miro"]
        n["padre"] = padre if padre in por_id else None
    hijos_de = defaultdict(list)
    for n in nodos:
        if n["padre"]:
            hijos_de[n["padre"]].append(n)
    return nodos, por_id, hijos_de


def etiqueta(n, hijos_de):
    partes = [TIPOS.get(n["tipo"], n["tipo"])]
    if n["forma"]:
        partes[0] += " " + FORMAS.get(n["forma"], n["forma"].replace("_", " "))
    if n["tipo"] == "shape" and hijos_de.get(n["id"]):
        partes[0] = "contenedor (" + partes[0] + ")"
    if n["color"]:
        partes.append(n["color"])
    if n["tags"]:
        partes.append("tags: " + ", ".join(n["tags"]))
    return " · ".join(partes)


def texto_corto(t, largo=500):
    t = (t or "").replace("\n", " / ")
    return t if len(t) <= largo else t[:largo] + "… (completo en tablero.json)"


class Mapa:
    """Recorre la jerarquía en orden de lectura, numera cada elemento (e1, e2…) y arma el .md."""

    def __init__(self, nodos, por_id, hijos_de):
        self.nodos, self.por_id, self.hijos_de = nodos, por_id, hijos_de
        self.lineas, self.n = [], 0

    def ref(self, n):
        if "ref" not in n:
            self.n += 1
            n["ref"] = f"e{self.n}"
        return n["ref"]

    def item(self, n, sangria):
        hijos = self.hijos_de.get(n["id"], [])
        extra = f" — {len(hijos)} elementos adentro" if hijos else ""
        img = f" (archivo: {n['archivo_imagen']})" if n.get("archivo_imagen") else ""
        texto = f" «{texto_corto(n['texto'])}»" if n["texto"] else ""
        self.lineas.append(f"{sangria}- {self.ref(n)} [{etiqueta(n, self.hijos_de)}]{texto}{img}{extra}")
        if hijos:
            self.bloques(hijos, sangria + "  ")

    def bloques(self, hijos, sangria):
        desc, bloques = disponer(hijos, self.hijos_de)
        if desc:
            self.lineas.append(f"{sangria}- _Disposición: {desc}_")
        for titulo, lista in bloques:
            if titulo:
                self.lineas.append(f"{sangria}- **{titulo}**")
                for h in lista:
                    self.item(h, sangria + "  ")
            else:
                for h in lista:
                    self.item(h, sangria)


def recorridos(conectores, por_id):
    """Árbol de flujos a partir de las flechas, y lista de las que no entran en ningún recorrido."""
    aristas, salientes, entrantes = [], defaultdict(list), Counter()
    for c in conectores:
        a = (c.get("startItem") or {}).get("id")
        b = (c.get("endItem") or {}).get("id")
        if a not in por_id or b not in por_id:
            continue
        st = c.get("style") or {}
        ini, fin = st.get("startStrokeCap", "none"), st.get("endStrokeCap", "stealth")
        if ini not in (None, "none") and fin in (None, "none"):
            a, b = b, a
        simbolo = "↔" if ini not in (None, "none") and fin not in (None, "none") else \
            ("—" if ini in (None, "none") and fin in (None, "none") else "→")
        rotulo = " / ".join(texto_html(x.get("content")) for x in c.get("captions") or [] if x.get("content"))
        ar = {"desde": a, "hasta": b, "simbolo": simbolo, "texto": rotulo, "id": c.get("id")}
        aristas.append(ar)
        salientes[a].append(ar)
        entrantes[b] += 1
    lineas, usadas, visitados = [], set(), set()

    def nombre(i):
        n = por_id[i]
        return f"{n.get('ref', '?')} «{texto_corto(n['texto'], 70) or TIPOS.get(n['tipo'], n['tipo'])}»"

    def bajar(i, sangria):
        visitados.add(i)
        for ar in sorted(salientes[i], key=lambda a: int(por_id[a["hasta"]].get("ref", "e0")[1:])):
            usadas.add(id(ar))
            t = f" [{ar['texto']}]" if ar["texto"] else ""
            ya = " (sigue más arriba)" if ar["hasta"] in visitados else ""
            lineas.append(f"{sangria}- {ar['simbolo']}{t} {nombre(ar['hasta'])}{ya}")
            if ar["hasta"] not in visitados and len(lineas) < 600:
                bajar(ar["hasta"], sangria + "  ")

    inicios = [i for i in salientes if entrantes[i] == 0]
    for i in sorted(inicios, key=lambda i: int(por_id[i].get("ref", "e0")[1:])):
        lineas.append(f"- Inicio: {nombre(i)}")
        bajar(i, "  ")
    sueltas = [ar for ar in aristas if id(ar) not in usadas]
    if sueltas:
        lineas.append("- Conexiones en ciclo o sin un inicio claro:")
        for ar in sueltas:
            t = f" [{ar['texto']}]" if ar["texto"] else ""
            lineas.append(f"  - {nombre(ar['desde'])} {ar['simbolo']}{t} {nombre(ar['hasta'])}")
    return aristas, lineas


# ----------------------------------------------------------------- imágenes


def descargar_imagenes(nodos, token, carpeta, maximo=40):
    imagenes = [n for n in nodos if n["tipo"] == "image" and (n["crudo"].get("data") or {}).get("imageUrl")]
    if not imagenes:
        return 0
    carpeta.mkdir(parents=True, exist_ok=True)
    hechas = 0
    for n in imagenes[:maximo]:
        url = n["crudo"]["data"]["imageUrl"]
        try:
            if "redirect=" not in url:
                url += ("&" if "?" in url else "?") + "redirect=false"
            destino = api_get(url, token).get("url")
            with urllib.request.urlopen(destino, timeout=60) as r:
                tipo = r.headers.get("Content-Type", "")
                ext = ".png" if "png" in tipo else ".gif" if "gif" in tipo else ".webp" if "webp" in tipo else ".jpg"
                archivo = carpeta / f"{n['ref']}{ext}"
                archivo.write_bytes(r.read())
            n["archivo_imagen"] = f"imagenes/{archivo.name}"
            n["ruta_imagen"] = archivo.resolve()
            hechas += 1
        except Exception as e:  # una imagen que falla no frena el resto
            print(f"  aviso: no pude bajar la imagen {n['ref']}: {e}", file=sys.stderr)
    return hechas


def lanzar_navegador(p, headless=True):
    intentos = [{}, {"channel": "chrome"}, {"channel": "msedge"}]
    for ruta in [os.environ.get("CHROMIUM_PATH"), "/opt/pw-browsers/chromium",
                 shutil.which("chromium"), shutil.which("chromium-browser"), shutil.which("google-chrome"),
                 "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"]:
        if ruta and os.path.exists(ruta):
            intentos.append({"executable_path": ruta})
    ultimo = None
    for extra in intentos:
        try:
            return p.chromium.launch(headless=headless, **extra)
        except Exception as e:
            ultimo = e
    raise RuntimeError(f"No encontré un navegador. Instalá Google Chrome o corré: "
                       f"python3 -m playwright install chromium ({ultimo})")


def html_lienzo(nodos, hijos_de, aristas, por_id, region):
    """HTML con el tablero reconstruido dentro de `region` (caja en coordenadas de Miro)."""
    pad = 40
    W, H = region["x1"] - region["x0"], region["y1"] - region["y0"]
    s = min(LADO_IMAGEN / max(W, 1), LADO_IMAGEN / max(H, 1), 2.0)
    ancho, alto = int(W * s) + 2 * pad, int(H * s) + 2 * pad

    def px(c):
        return ((c["x0"] - region["x0"]) * s + pad, (c["y0"] - region["y0"]) * s + pad, c["w"] * s, c["h"] * s)

    def capa(n):
        if n["tipo"] == "frame":
            return 0
        if hijos_de.get(n["id"]):
            return 1
        return 2

    partes = []
    for n in sorted(nodos, key=lambda n: (capa(n), -area(n["caja"]))):
        x, y, w, h = px(n["caja"])
        st = n["crudo"].get("style") or {}
        fondo = n["hex"] or ("#ffffff" if n["tipo"] in ("frame", "card", "app_card") else "transparent")
        css = f"left:{x:.1f}px;top:{y:.1f}px;width:{w:.1f}px;height:{h:.1f}px;background:{fondo};"
        texto = html.escape(n["texto"] or "")
        alinear = "center"
        relleno = f"padding:{max(1.0, min(w, h) * 0.06):.1f}px;"
        if n["tipo"] == "frame":
            css += "border:1px solid #9a9a9a;"
            partes.append(f'<div class="el" style="{css}"></div>')
            partes.append(f'<div class="ft" style="left:{x:.1f}px;top:{y - 18:.1f}px">{texto}</div>')
            continue
        if n["tipo"] == "sticky_note":
            css += "box-shadow:0 1px 3px rgba(0,0,0,.25);"
        elif n["tipo"] == "shape":
            color_borde = st.get("borderColor") or "#1a1a1a"
            grosor = max(1, float(st.get("borderWidth") or 2) * s)
            if float(st.get("borderOpacity") or 1) > 0 and st.get("borderStyle") != "none":
                css += f"border:{grosor:.1f}px {'dashed' if st.get('borderStyle') in ('dashed', 'dotted') else 'solid'} {color_borde};"
            forma = n["forma"] or ""
            if forma in ("circle", "ellipse"):
                css += "border-radius:50%;"
            elif forma == "round_rectangle":
                css += "border-radius:10%;"
            elif forma == "rhombus":
                css += "clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%);"
            elif forma == "triangle":
                css += "clip-path:polygon(50% 0,100% 100%,0 100%);"
            if hijos_de.get(n["id"]):
                alinear = "flex-start"  # el rótulo de un contenedor suele ir arriba
        elif n["tipo"] in ("card", "app_card"):
            css += "border:1px solid #ccc;border-top:4px solid #4262ff;"
        elif n["tipo"] == "text":
            alinear = "flex-start"
        contenido = ""
        if n.get("ruta_imagen"):
            tipo_img = mimetypes.guess_type(str(n["ruta_imagen"]))[0] or "image/png"
            datos_img = base64.b64encode(n["ruta_imagen"].read_bytes()).decode()
            contenido = f'<img src="data:{tipo_img};base64,{datos_img}" style="width:100%;height:100%;object-fit:contain">'
        elif n["tipo"] in ("image", "document", "embed", "preview"):
            css += "background:#e8e8e8;border:1px dashed #999;"
            contenido = f'<div class="t" data-fs="14" style="{relleno}justify-content:center;text-align:center">[{TIPOS.get(n["tipo"])}] {texto}</div>'
        elif texto:
            fs = float(st.get("fontSize") or (n["caja"]["h"] / 5)) * s
            color_txt = st.get("color") or "#1a1a1a"
            ta = st.get("textAlign") or ("left" if n["tipo"] == "text" else "center")
            contenido = (f'<div class="t" data-fs="{min(max(fs, 6), 60):.1f}" style="{relleno}justify-content:{alinear};'
                         f'text-align:{ta};color:{color_txt}">{texto}</div>')
        partes.append(f'<div class="el" style="{css}">{contenido}</div>')
        if n.get("ref"):
            partes.append(f'<div class="ref" style="left:{x:.1f}px;top:{y:.1f}px">{n["ref"]}</div>')

    lineas = []
    ids = {n["id"] for n in nodos}
    for ar in aristas:
        if ar["desde"] not in ids or ar["hasta"] not in ids:
            continue
        a, b = por_id[ar["desde"]]["caja"], por_id[ar["hasta"]]["caja"]
        if not a or not b:
            continue
        pa, pb = borde(a, b), borde(b, a)
        (x1, y1), (x2, y2) = [((p[0] - region["x0"]) * s + pad, (p[1] - region["y0"]) * s + pad) for p in (pa, pb)]
        marcas = {"→": 'marker-end="url(#f)"', "↔": 'marker-end="url(#f)" marker-start="url(#fi)"'}.get(ar["simbolo"], "")
        lineas.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="#333" stroke-width="1.5" {marcas}/>')
        if ar["texto"]:
            lineas.append(f'<text x="{(x1 + x2) / 2:.1f}" y="{(y1 + y2) / 2 - 3:.1f}" font-size="11" text-anchor="middle" '
                          f'fill="#c0392b" paint-order="stroke" stroke="#fff" stroke-width="3">{html.escape(ar["texto"][:60])}</text>')
    svg = (f'<svg style="position:absolute;left:0;top:0" width="{ancho}" height="{alto}">'
           '<defs><marker id="f" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">'
           '<path d="M0,0 L8,4 L0,8 z" fill="#333"/></marker>'
           '<marker id="fi" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto">'
           '<path d="M8,0 L0,4 L8,8 z" fill="#333"/></marker></defs>' + "".join(lineas) + "</svg>")
    return ancho, alto, f"""<!doctype html><html><head><meta charset="utf-8"><style>
body{{margin:0;font-family:Arial,Helvetica,sans-serif}}
#lienzo{{position:relative;width:{ancho}px;height:{alto}px;overflow:hidden;background:#f7f7f5}}
.el{{position:absolute;box-sizing:border-box;display:flex;overflow:hidden}}
.t{{width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column;box-sizing:border-box;
   word-break:break-word;line-height:1.15;white-space:pre-wrap}}
.ref{{position:absolute;font:9px Arial;color:#666;background:rgba(255,255,255,.75);padding:0 2px;pointer-events:none}}
.ft{{position:absolute;font:bold 13px Arial;color:#333;white-space:nowrap}}
</style></head><body><div id="lienzo">{''.join(partes)}{svg}</div><script>
document.querySelectorAll('.t').forEach(function(el){{var fs=parseFloat(el.dataset.fs);el.style.fontSize=fs+'px';
while((el.scrollHeight>el.clientHeight+1||el.scrollWidth>el.clientWidth+1)&&fs>4){{fs*=0.9;el.style.fontSize=fs+'px';}}}});
</script></body></html>"""


def borde(caja, otra):
    """Punto del borde de `caja` en dirección al centro de `otra`."""
    cx, cy = (caja["x0"] + caja["x1"]) / 2, (caja["y0"] + caja["y1"]) / 2
    dx, dy = (otra["x0"] + otra["x1"]) / 2 - cx, (otra["y0"] + otra["y1"]) / 2 - cy
    if dx == 0 and dy == 0:
        return cx, cy
    t = min((caja["w"] / 2) / abs(dx) if dx else float("inf"), (caja["h"] / 2) / abs(dy) if dy else float("inf"), 1)
    return cx + dx * t, cy + dy * t


def descendientes(n, hijos_de):
    out = []
    for h in hijos_de.get(n["id"], []):
        out.append(h)
        out += descendientes(h, hijos_de)
    return out


def region_de(nodos):
    cs = [n["caja"] for n in nodos if n["caja"]]
    return {"x0": min(c["x0"] for c in cs), "y0": min(c["y0"] for c in cs),
            "x1": max(c["x1"] for c in cs), "y1": max(c["y1"] for c in cs)}


def capturas_reconstruidas(nodos, hijos_de, aristas, por_id, frames, carpeta):
    """Dibuja el tablero con los datos de la API y lo pasa a PNG. Devuelve {clave: ruta relativa}."""
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        return {}, "Playwright no está instalado (pip install playwright): no hay imágenes, solo el mapa."
    carpeta.mkdir(parents=True, exist_ok=True)
    trabajos = []
    con_caja = [n for n in nodos if n["caja"]]
    if con_caja:
        trabajos.append(("general", "general.png", con_caja))
    for i, f in enumerate(frames, 1):
        if f["caja"]:
            trabajos.append((f["id"], f"frame-{i:02d}-{slug(f['texto'])}.png",
                             [f] + [d for d in descendientes(f, hijos_de) if d["caja"]]))
    hechas = {}
    with sync_playwright() as p:
        nav = lanzar_navegador(p)
        pagina = nav.new_page()
        for clave, archivo, grupo in trabajos:
            ancho, alto, doc = html_lienzo(grupo, hijos_de, aristas, por_id, region_de(grupo))
            pagina.set_viewport_size({"width": ancho, "height": alto})
            pagina.set_content(doc, wait_until="load")
            pagina.locator("#lienzo").screenshot(path=str(carpeta / archivo))
            hechas[clave] = f"capturas/{archivo}"
        nav.close()
    return hechas, None


def capturas_reales(bid, frames, carpeta, max_frames):
    """Abre Miro en un navegador y saca una captura por frame (y una general)."""
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        return {}, "Playwright no está instalado: no hay capturas reales."
    carpeta.mkdir(parents=True, exist_ok=True)
    base = f"https://miro.com/app/board/{urllib.parse.quote(bid, safe='=')}/"
    hechas = {}
    with sync_playwright() as p:
        nav = lanzar_navegador(p)
        ctx = nav.new_context(viewport={"width": 1600, "height": 1000},
                              storage_state=str(SESION_FILE) if SESION_FILE.exists() else None)
        pagina = ctx.new_page()

        def abrir(url):
            pagina.goto(url, wait_until="domcontentloaded", timeout=90000)
            if re.search(r"/(login|signup|sso)", pagina.url):
                raise PermissionError
            for nombre in ("Accept all cookies", "Accept all", "Aceptar todas", "Aceptar"):
                try:
                    pagina.get_by_role("button", name=nombre).first.click(timeout=800)
                    break
                except Exception:
                    pass
            try:
                pagina.wait_for_selector("canvas", timeout=45000)
            except Exception:
                raise PermissionError  # Miro no mostró el tablero: privado o sin sesión
            pagina.wait_for_timeout(6000)  # Miro termina de dibujar
            pagina.keyboard.press("Escape")

        try:
            abrir(base)
            pagina.keyboard.press("Shift+1")  # "zoom para ver todo"
            pagina.wait_for_timeout(3000)
            pagina.screenshot(path=str(carpeta / "general.png"))
            hechas["general"] = "capturas/reales/general.png"
            for i, f in enumerate(frames[:max_frames], 1):
                abrir(base + "?moveToWidget=" + urllib.parse.quote(f["id"]))
                archivo = f"frame-{i:02d}-{slug(f['texto'])}.png"
                pagina.screenshot(path=str(carpeta / archivo))
                hechas[f["id"]] = f"capturas/reales/{archivo}"
        except PermissionError:
            return hechas, ("Miro no mostró el tablero en el navegador (pidió iniciar sesión o el tablero es "
                            "privado), así que no hay capturas reales. Para tenerlas: "
                            "compartí el tablero como 'cualquiera con el link puede ver' o corré "
                            "'leer_tablero.py login' una vez en tu computadora.")
        except Exception as e:
            return hechas, f"Las capturas reales se cortaron: {e}"
        finally:
            nav.close()
    aviso = None
    if len(frames) > max_frames:
        aviso = f"Capturas reales solo de los primeros {max_frames} frames (usá --max-frames para más)."
    return hechas, aviso


# --------------------------------------------------------------- comandos


def configurar(token):
    if not token:
        print(INSTRUCCIONES_TOKEN)
        import getpass
        token = getpass.getpass("Pegá el token acá (no se ve mientras lo pegás) y Enter: ").strip()
    if not token:
        sys.exit("No se ingresó ningún token.")
    try:
        api_get("/v2/boards", token, {"limit": 1})
    except ErrorMiro as e:
        sys.exit(f"El token no funciona: {e}")
    CONFIG_DIR.mkdir(parents=True, exist_ok=True)
    TOKEN_FILE.write_text(token)
    TOKEN_FILE.chmod(0o600)
    print(f"Listo: token verificado y guardado en {TOKEN_FILE}")


def login():
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        sys.exit("Primero instalá Playwright: pip install playwright")
    with sync_playwright() as p:
        nav = lanzar_navegador(p, headless=False)
        ctx = nav.new_context()
        ctx.new_page().goto("https://miro.com/login/")
        input("Iniciá sesión en la ventana que se abrió. Cuando veas tus tableros, volvé acá y apretá Enter… ")
        CONFIG_DIR.mkdir(parents=True, exist_ok=True)
        ctx.storage_state(path=str(SESION_FILE))
        SESION_FILE.chmod(0o600)
        nav.close()
    print(f"Sesión guardada en {SESION_FILE}. Ya se pueden sacar capturas reales.")


def leer(args):
    token = leer_token()
    if not token:
        sys.exit("Falta el token de Miro. Corré primero: python3 leer_tablero.py configurar\n\n" + INSTRUCCIONES_TOKEN)
    bid = id_tablero(args.tablero)
    ruta = f"/v2/boards/{urllib.parse.quote(bid, safe='')}"
    print(f"Leyendo el tablero {bid}…")
    info = api_get(ruta, token)
    items = paginar(ruta + "/items", token)
    conectores = paginar(ruta + "/connectors", token)
    try:
        grupos = paginar(ruta + "/groups", token)
    except ErrorMiro:
        grupos = []
    try:
        tags = paginar(ruta + "/tags", token)
    except ErrorMiro:
        tags = []
    print(f"  {len(items)} elementos, {len(conectores)} conectores, {len(grupos)} grupos")

    salida = Path(args.salida or f"miro-{slug(info.get('name', bid))}")
    salida.mkdir(parents=True, exist_ok=True)

    nodos, por_id, hijos_de = construir(items, tags)
    raices = [n for n in nodos if not n["padre"]]
    frames = orden_lectura([n for n in raices if n["tipo"] == "frame"])
    sueltos = [n for n in raices if n["tipo"] != "frame"]
    # frames dentro de contenedores (raro) también llevan captura
    frames += [n for n in nodos if n["tipo"] == "frame" and n["padre"]]

    mapa = Mapa(nodos, por_id, hijos_de)
    cuerpo = []
    for f in frames:
        mapa.lineas = []
        mapa.ref(f)
        if hijos_de.get(f["id"]):
            mapa.bloques(hijos_de[f["id"]], "")
        cuerpo.append((f, mapa.lineas))
    mapa.lineas = []
    if sueltos:
        mapa.bloques(sueltos, "")
    lineas_sueltos = mapa.lineas

    if not args.sin_imagenes:
        n_img = descargar_imagenes(nodos, token, salida / "imagenes")
        if n_img:
            print(f"  {n_img} imágenes descargadas")
            # vuelve a escribir las líneas para incluir la ruta de cada imagen
            for n in nodos:
                n.pop("ref", None)
            mapa = Mapa(nodos, por_id, hijos_de)
            cuerpo = []
            for f in frames:
                mapa.lineas = []
                mapa.ref(f)
                if hijos_de.get(f["id"]):
                    mapa.bloques(hijos_de[f["id"]], "")
                cuerpo.append((f, mapa.lineas))
            mapa.lineas = []
            if sueltos:
                mapa.bloques(sueltos, "")
            lineas_sueltos = mapa.lineas

    aristas, lineas_flujo = recorridos(conectores, por_id)

    avisos = []
    print("  dibujando capturas del tablero reconstruido…")
    reconstruidas, aviso = capturas_reconstruidas(nodos, hijos_de, aristas, por_id, frames, salida / "capturas")
    if aviso:
        avisos.append(aviso)
    reales = {}
    if not args.sin_capturas_reales:
        print("  abriendo Miro para las capturas reales…")
        reales, aviso = capturas_reales(bid, frames, salida / "capturas" / "reales", args.max_frames)
        if aviso:
            avisos.append(aviso)

    # ------------------------------------------------------------ tablero.md
    md = [f"# Tablero de Miro: {info.get('name', bid)}", ""]
    if info.get("description"):
        md += [f"> {info['description']}", ""]
    conteo = Counter(TIPOS.get(n["tipo"], n["tipo"]) for n in nodos)
    md += [
        f"- Link: {info.get('viewLink') or 'https://miro.com/app/board/' + bid + '/'}",
        f"- Leído: {datetime.now():%Y-%m-%d %H:%M}",
        f"- Contenido: " + ", ".join(f"{v} {k}" for k, v in conteo.most_common()) + f", {len(aristas)} flechas",
        f"- Vista general reconstruida: {reconstruidas.get('general', '(no disponible)')}"
        + (f" · captura real: {reales['general']}" if reales.get("general") else ""),
        "",
        "## Cómo leer este archivo",
        "",
        "- Cada elemento tiene un número (e1, e2…) en orden de lectura. El mismo número aparece en las "
        "capturas reconstruidas, para cruzar texto e imagen.",
        "- La sangría es la jerarquía: lo que está dentro de un frame o de una forma que lo encierra "
        "(un \"contenedor\") va indentado debajo.",
        "- _Disposición_ indica si los hijos forman columnas, filas o una grilla.",
        "- Las capturas reconstruidas muestran posiciones, tamaños, colores y flechas reales; las "
        "capturas reales (si hay) muestran cómo se ve en Miro.",
        "",
    ]
    if avisos:
        md += ["## Avisos", ""] + [f"- {a}" for a in avisos] + [""]
    if frames:
        md += ["## Índice de frames", ""]
        for i, (f, _) in enumerate(cuerpo, 1):
            md.append(f"{i}. {f['ref']} «{texto_corto(f['texto'], 80) or 'sin título'}» — "
                      f"{len(descendientes(f, hijos_de))} elementos")
        md.append("")
    for f, lineas in cuerpo:
        md.append(f"## {f['ref']} Frame «{texto_corto(f['texto'], 120) or 'sin título'}»")
        md.append("")
        caps = [f"reconstruida: {reconstruidas[f['id']]}"] if f["id"] in reconstruidas else []
        if f["id"] in reales:
            caps.append(f"real: {reales[f['id']]}")
        if caps:
            md += ["Capturas — " + " · ".join(caps), ""]
        md += (lineas or ["- (vacío)"]) + [""]
    if lineas_sueltos:
        md += ["## Fuera de los frames", ""] + lineas_sueltos + [""]
    if lineas_flujo:
        md += [f"## Flechas y recorridos ({len(aristas)} conexiones)", "",
               "Cada nivel de sangría es un paso más del recorrido. Entre corchetes, el texto de la flecha.", ""]
        md += lineas_flujo + [""]
    grupos_md = []
    for g in grupos:
        ids_g = (g.get("data") or {}).get("items") or g.get("items") or []
        refs = [por_id[i] for i in ids_g if i in por_id]
        if refs:
            grupos_md.append("- " + ", ".join(f"{n.get('ref', '?')} «{texto_corto(n['texto'], 40)}»" for n in refs))
    if grupos_md:
        md += ["## Grupos (elementos agrupados en Miro)", ""] + grupos_md + [""]
    colores = defaultdict(list)
    for n in nodos:
        if n["color"] and n["color"] != "sin relleno" and n["tipo"] != "frame":
            colores[(n["color"], TIPOS.get(n["tipo"], n["tipo"]))].append(n)
    if colores:
        md += ["## Colores usados", "",
               "Para deducir qué significa cada color, mirá los ejemplos.", "",
               "| Color | Tipo | Cantidad | Ejemplos |", "|---|---|---|---|"]
        for (color, tipo), ns in sorted(colores.items(), key=lambda kv: -len(kv[1])):
            ej = "; ".join(f"{n.get('ref', '?')} «{texto_corto(n['texto'], 35)}»" for n in ns[:3] if n["texto"])
            md.append(f"| {color} | {tipo} | {len(ns)} | {ej.replace('|', '/')} |")
        md.append("")
    if tags:
        md += ["## Tags del tablero", "", ", ".join(t.get("title", "") for t in tags), ""]
    (salida / "tablero.md").write_text("\n".join(md), encoding="utf-8")

    # ---------------------------------------------------------- tablero.json
    datos = {
        "tablero": info,
        "elementos": [{
            "ref": n.get("ref"), "id": n["id"], "tipo": n["tipo"], "texto": n["texto"],
            "color": n["color"], "caja": n["caja"],
            "padre": por_id[n["padre"]].get("ref") if n["padre"] else None,
            "hijos": [h.get("ref") for h in hijos_de.get(n["id"], [])],
            "imagen": n.get("archivo_imagen"), "miro": n["crudo"],
        } for n in sorted(nodos, key=lambda n: int((n.get("ref") or "e0")[1:]))],
        "flechas": [{"desde": por_id[a["desde"]].get("ref"), "hasta": por_id[a["hasta"]].get("ref"),
                     "tipo": a["simbolo"], "texto": a["texto"]} for a in aristas],
        "conectores_miro": conectores, "grupos": grupos, "tags": tags,
        "capturas": {"reconstruidas": reconstruidas, "reales": reales}, "avisos": avisos,
    }
    (salida / "tablero.json").write_text(json.dumps(datos, ensure_ascii=False, indent=1), encoding="utf-8")

    print(f"\nListo. Todo quedó en: {salida.resolve()}")
    print(f"  - {salida / 'tablero.md'}")
    for r in list(reconstruidas.values()) + list(reales.values()):
        print(f"  - {salida / r}")
    for a in avisos:
        print(f"  aviso: {a}")


def main():
    if len(sys.argv) > 1 and sys.argv[1] == "configurar":
        p = argparse.ArgumentParser(prog="leer_tablero.py configurar")
        p.add_argument("--token")
        configurar(p.parse_args(sys.argv[2:]).token)
        return
    if len(sys.argv) > 1 and sys.argv[1] == "login":
        login()
        return
    p = argparse.ArgumentParser(description="Lee un tablero de Miro para que Claude lo entienda.")
    p.add_argument("tablero", help="link del tablero (https://miro.com/app/board/…) o su id")
    p.add_argument("--salida", help="carpeta donde guardar todo (por defecto: miro-<nombre>)")
    p.add_argument("--sin-capturas-reales", action="store_true", help="no abrir Miro en el navegador")
    p.add_argument("--sin-imagenes", action="store_true", help="no descargar las imágenes del tablero")
    p.add_argument("--max-frames", type=int, default=20, help="máximo de frames con captura real (20)")
    try:
        leer(p.parse_args())
    except ErrorMiro as e:
        sys.exit(f"Error: {e}")


if __name__ == "__main__":
    main()
