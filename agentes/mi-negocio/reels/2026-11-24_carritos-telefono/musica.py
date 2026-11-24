# Genera la música (base pop/electrónica de 120 BPM) y la pista de sonidos del reel a partir de
# props.json. Todo sintetizado acá: sin derechos de terceros.
#   python3 musica.py  ->  .render/musica.wav  .render/sfx.wav
import json, os, wave
import numpy as np

SR = 44100
P = json.load(open('props.json'))
DUR = P['duracion'] + 0.5
M = P['musica']
BPM = M['bpm']
SPB = 60 / BPM
N = int(DUR * SR)
rng = np.random.default_rng(7)
os.makedirs('.render', exist_ok=True)


def tt(d):
    return np.arange(int(d * SR)) / SR


def put(buf, t0, x, g=1.0):
    i = int(t0 * SR)
    if i >= len(buf) or i + len(x) <= 0:
        return
    j = max(0, -i)
    x = x[j:]
    i = max(0, i)
    n = min(len(x), len(buf) - i)
    buf[i:i + n] += x[:n] * g


def hp(x, a=0.97):  # pasa-altos de 1 polo (para ruido)
    y = np.empty_like(x)
    prev_x = prev_y = 0.0
    for k in range(len(x)):
        prev_y = a * (prev_y + x[k] - prev_x)
        prev_x = x[k]
        y[k] = prev_y
    return y


def lp_fast(x, n):  # pasa-bajos por media móvil
    if n <= 1:
        return x
    c = np.cumsum(np.concatenate([[0], x]))
    y = (c[n:] - c[:-n]) / n
    return np.concatenate([y, np.zeros(n - 1)])


def nota(m):
    return 440 * 2 ** ((m - 69) / 12)


# ---------------------------------------------------------------- instrumentos
def kick():
    t = tt(0.45)
    f = 45 + 110 * np.exp(-t * 28)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t * 7.5) + 0.25 * np.sin(ph * 2) * np.exp(-t * 30)


def clap():
    t = tt(0.25)
    n = hp(rng.standard_normal(len(t)), 0.9)
    env = np.exp(-t * 22) + 0.6 * np.exp(-np.maximum(0, t - 0.012) * 40) * (t > 0.012)
    return n * env * 0.5


HAT = hp(rng.standard_normal(int(0.06 * SR)), 0.6) * np.exp(-tt(0.06) * 70)
OPEN = hp(rng.standard_normal(int(0.22 * SR)), 0.6) * np.exp(-tt(0.22) * 16)


def pluck(f, d=0.32):
    t = tt(d)
    y = np.zeros_like(t)
    for h in range(1, 9):
        y += np.sin(2 * np.pi * f * h * t) / h ** 1.3 * np.exp(-t * (6 + h * 4))
    return y * np.minimum(1, t / 0.003)


def pad(f, d):
    t = tt(d)
    y = np.zeros_like(t)
    for det in (-0.12, 0, 0.12):
        ff = f * 2 ** (det / 12)
        for h in range(1, 6):
            y += np.sin(2 * np.pi * ff * h * t + h) / h ** 1.6
    env = np.minimum(1, t / 0.25) * np.minimum(1, (d - t) / 0.3)
    return y * env / 3


def bass(f, d):
    t = tt(d)
    y = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * 2 * f * t) + 0.15 * np.sin(2 * np.pi * 3 * f * t)
    return y * np.minimum(1, t / 0.005) * np.exp(-t * 3) * np.minimum(1, (d - t) / 0.01)


# Am - F - C - G (un compás de 2 s cada uno)
PROG = [(57, [69, 72, 76]), (53, [65, 69, 72]), (48, [64, 67, 72]), (55, [67, 71, 74])]
ARP = [0, 1, 2, 1, 0, 2, 1, 2]  # corcheas

drums = np.zeros(N)
hats = np.zeros(N)
bassl = np.zeros(N)
plk = np.zeros(N)
pads = np.zeros(N)
K, C = kick(), clap()
nb = int(DUR / SPB) + 1
for b in range(nb):
    t0 = b * SPB
    put(drums, t0, K, 0.9)
    if b % 2 == 1:
        put(drums, t0, C, 0.55)
    put(hats, t0 + SPB / 2, OPEN if b % 4 == 3 else HAT, 0.35)
    put(hats, t0 + SPB / 4, HAT, 0.12)
    put(hats, t0 + 3 * SPB / 4, HAT, 0.12)
    root, ch = PROG[(b // 4) % 4]
    # bajo en las contras (efecto bombeo con el bombo)
    put(bassl, t0 + SPB / 2, bass(nota(root - 12), SPB / 2 - 0.01), 0.55)
    for e in range(2):
        idx = ARP[(b % 4) * 2 + e]
        put(plk, t0 + e * SPB / 2, pluck(nota(ch[idx] + 12)), 0.22)
for bar in range(int(DUR / (4 * SPB)) + 1):
    root, ch = PROG[bar % 4]
    for m in ch:
        put(pads, bar * 4 * SPB, pad(nota(m), 4 * SPB + 0.2), 0.12)

# bombeo (sidechain del bombo) para bajo y pad
tb = (np.arange(N) / SR) % SPB
pump = 0.35 + 0.65 * np.minimum(1, tb / 0.22)
bassl *= pump
pads *= pump
plk *= 0.6 + 0.4 * pump

mus = drums + hats + bassl + plk + pads
# eco corto en el pluck para que respire
eco = np.zeros(N)
put(eco, SPB * 0.75, plk, 0.25)
mus += lp_fast(eco, 6)

# corte antes de la cifra fuerte, riser antes del CTA
tm = np.arange(N) / SR
c0, c1 = M['corte']
mute = np.ones(N)
mute[(tm >= c0) & (tm < c1)] = 0
rampa = (tm >= c0 - 0.06) & (tm < c0)
mute[rampa] = 1 - (tm[rampa] - (c0 - 0.06)) / 0.06
mus *= mute
r0, r1 = M['riser']
rt = tt(r1 - r0)
u = rt / (r1 - r0)
fr = 180 + 1400 * u ** 2
riser = (np.sin(2 * np.pi * np.cumsum(fr) / SR) * 0.35 + lp_fast(rng.standard_normal(len(rt)), 3) * 0.5 * u) * u ** 2
put(mus, r0, riser, 0.6)
# en el riser se va el bombo (tensión), vuelve en el CTA
mus[(tm >= r0 + 0.5) & (tm < r1)] -= drums[(tm >= r0 + 0.5) & (tm < r1)] * 0.9
# entrada y salida
mus *= np.minimum(1, tm / 0.02) * np.minimum(1, (DUR - 0.2 - tm) / 0.5).clip(0, 1)


# ---------------------------------------------------------------- sonidos
def s_whoosh():
    d = 0.42
    t = tt(d)
    n = rng.standard_normal(len(t))
    y = np.zeros_like(t)
    # barrido: media móvil que se acorta (más brillante) y vuelve a alargar
    for k, w in enumerate([24, 14, 8, 5, 8, 14]):
        a = int(k * len(t) / 6)
        b = int((k + 1) * len(t) / 6)
        y[a:b] = lp_fast(n, w)[a:b]
    env = np.sin(np.pi * np.clip(t / d, 0, 1)) ** 2
    return y * env * 1.4


def s_pop():
    t = tt(0.09)
    f = 300 + 900 * np.exp(-t * 60)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 45) * 0.8


def s_tic():
    t = tt(0.03)
    return np.sin(2 * np.pi * 2400 * t) * np.exp(-t * 180) * 0.6


def s_ding():
    t = tt(0.9)
    y = np.zeros_like(t)
    for f0, d0 in ((1318.5, 0), (1760, 0.11)):
        tt0 = np.clip(t - d0, 0, None)
        y += (t >= d0) * (np.sin(2 * np.pi * f0 * tt0) + 0.3 * np.sin(2 * np.pi * f0 * 2.01 * tt0)) * np.exp(-tt0 * 5)
    return y * 0.45


def s_caja():
    t = tt(1.0)
    y = hp(rng.standard_normal(len(t)), 0.7) * np.exp(-t * 60) * 0.6
    for f0 in (2093, 2637, 3136, 4186):
        tt0 = np.clip(t - 0.05, 0, None)
        y += (t >= 0.05) * np.sin(2 * np.pi * f0 * tt0) * np.exp(-tt0 * 4) * 0.22
    return y


def s_impacto():
    t = tt(0.9)
    f = 38 + 80 * np.exp(-t * 14)
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 4)
    crash = lp_fast(rng.standard_normal(len(t)), 2) * np.exp(-t * 6) * 0.35
    return (boom + crash) * 0.9


def s_ring():
    t = tt(0.45)
    trem = (np.sin(2 * np.pi * 22 * t) > 0).astype(float)
    y = (np.sin(2 * np.pi * 1180 * t) + np.sin(2 * np.pi * 1420 * t)) * trem * 0.25
    return y * np.minimum(1, t / 0.01) * np.minimum(1, (0.45 - t) / 0.05)


SFX = {'whoosh': s_whoosh, 'pop': s_pop, 'tic': s_tic, 'ding': s_ding, 'caja': s_caja, 'impacto': s_impacto, 'ring': s_ring}
GAN = {'whoosh': 0.5, 'pop': 0.45, 'tic': 0.5, 'ding': 0.6, 'caja': 0.7, 'impacto': 0.8, 'ring': 0.45}
sfx = np.zeros(N)
for s in P['sonidos']:
    if s['tipo'] == 'riser':
        continue  # va en la música
    put(sfx, s['t'], SFX[s['tipo']](), GAN[s['tipo']])


def escribir(nombre, x):
    x = x / (np.max(np.abs(x)) + 1e-9) * 0.89
    d = (x * 32767).astype(np.int16)
    with wave.open(nombre, 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(d.tobytes())


escribir('.render/musica.wav', mus)
escribir('.render/sfx.wav', sfx)
print('ok', DUR)
