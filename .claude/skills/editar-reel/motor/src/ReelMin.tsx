// ReelMin — formato "minimal premium" (referencia reel-ig-minimal):
// fondo negro con foco de luz, la persona chica abajo al centro, y arriba todo el espacio para
// gráficos: una palabra enorme en mono que se arma con píxeles (con una línea chica arriba), una
// ventana mínima con el gráfico de lo que se está diciendo, tarjetitas ✓/✕ a los costados y una
// placa final negra con flecha pixelada. Lo bueno en el color de acento; lo malo en gris/blanco.
import React from 'react';
import {AbsoluteFill, OffthreadVideo, continueRender, delayRender, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const mono = 'Geist Mono';
type Fuente = {fam: string; style: string; weight: string; file: string; range: string};
const useFuentes = (fuentes: Fuente[] | undefined) => {
  const [h] = React.useState(() => delayRender('fuentes locales'));
  React.useEffect(() => {
    Promise.all(
      (fuentes || []).map((x) =>
        new FontFace(x.fam, `url(${staticFile(x.file)}) format('woff2')`, {style: x.style, weight: x.weight, unicodeRange: x.range}).load().then((l) => document.fonts.add(l)),
      ),
    )
      .catch((e) => console.error(e))
      .finally(() => continueRender(h));
  }, [fuentes, h]);
};

type Tramo = {t0: number; t1: number};
type Palabra = {w: string; s: number; e: number};
type Grande = Tramo & {chica: string; grande: string; tam?: number; bueno?: boolean; malo?: boolean};
type Escena = Tramo & {
  tipo: 'grilla' | 'escala' | 'chat' | 'bandeja';
  titulo: string;
  // grilla: 100 puntos; cada paso pinta los puntos [desde, hasta) desde t
  pasos?: {t: number; desde: number; hasta: number; color: 'acento' | 'blanco'}[];
  dudas?: {t: number; n: number}; // globitos "?" sobre los puntos blancos
  alerta?: {t: number; texto: string};
  // escala 0..10 con marcas
  marcas?: {t: number; v: number; texto: string; bueno: boolean}[];
  // chat
  barra?: {t: number; n: number; texto: string};
  mensajes?: {t: number; texto: string}[];
  // bandeja
  filas?: {texto: string; t: number; tOk: number}[];
};
type Lateral = Tramo & {lado: 'izq' | 'der'; icono: 'ok' | 'no' | 'sube' | 'baja'};
export type PropsMin = {
  duracion: number;
  cam: string;
  acento: string;
  fuentes?: Fuente[];
  camara: {escala: number; top: number; zoomFinal: number};
  grandes: Grande[];
  escenas: Escena[];
  laterales: Lateral[];
  palabras: Palabra[];
  cortes: number[];
  bpm: number;
  cta: Tramo & {chica: string; grande: string; abajo: string};
};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const pop = (t: number, t0: number, fps: number) => (t < t0 ? 0 : spring({frame: (t - t0) * fps, fps, config: {damping: 13, stiffness: 180, mass: 0.6}}));
const GRIS = '#8A8A8A';

// ------------------------------------------------------------------ texto que se arma con píxeles
// Una grilla de celdas tapa el texto; cada celda se destapa en un momento al azar. Alrededor
// quedan "restos" de bloques grises mientras dura la transición.
const CELDA = 22;
const Pixelado: React.FC<{t: number; t0: number; t1: number; w: number; h: number; semilla: string; children: React.ReactNode; d?: number}> = ({
  t,
  t0,
  t1,
  w,
  h,
  semilla,
  children,
  d = 0.45,
}) => {
  const entra = interpolate(t, [t0, t0 + d], [0, 1], clamp);
  const sale = interpolate(t, [t1 - 0.22, t1], [0, 1], clamp);
  const cols = Math.ceil(w / CELDA);
  const filas = Math.ceil(h / CELDA);
  let rects = '';
  const restos: React.ReactNode[] = [];
  for (let j = 0; j < filas; j++)
    for (let i = 0; i < cols; i++) {
      const r = random(`${semilla}-${i}-${j}`);
      const r2 = random(`${semilla}-s-${i}-${j}`);
      const vis = entra > r * 0.85 && sale < r2 * 0.9 + 0.05;
      if (vis) rects += `<rect x='${i * CELDA}' y='${j * CELDA}' width='${CELDA}' height='${CELDA}'/>`;
      const band = Math.abs(entra - r * 0.85) < 0.12 && entra < 1 ? 1 : sale > 0 && Math.abs(sale - (r2 * 0.9 + 0.05)) < 0.12 ? 1 : 0;
      if (band && random(`${semilla}-d-${i}-${j}`) < 0.18)
        restos.push(
          <div
            key={`${i}-${j}`}
            style={{position: 'absolute', left: i * CELDA, top: j * CELDA, width: CELDA, height: CELDA, background: random(`${semilla}-c-${i}-${j}`) < 0.5 ? '#3a3a3a' : '#bdbdbd', opacity: 0.8}}
          />,
        );
    }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>${rects}</svg>`;
  const mask = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
  if (t < t0 || t > t1) return null;
  return (
    <div style={{position: 'relative', width: w, height: h}}>
      <div style={{position: 'absolute', inset: 0, WebkitMaskImage: mask, WebkitMaskSize: `${w}px ${h}px`, WebkitMaskRepeat: 'no-repeat'}}>{children}</div>
      {restos}
    </div>
  );
};

const PalabraGrande: React.FC<{g: Grande; t: number; p: PropsMin; i: number}> = ({g, t, p, i}) => {
  const tam = g.tam ?? 190;
  const color = g.bueno ? p.acento : '#F5F5F5';
  return (
    <div style={{position: 'absolute', top: 760, left: 40, width: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Pixelado t={t} t0={g.t0} t1={g.t1} w={1000} h={64} semilla={`c${i}`} d={0.3}>
        <div style={{width: 1000, textAlign: 'center', fontFamily: mono, fontWeight: 400, fontSize: 44, color: '#D0D0D0', lineHeight: '64px', letterSpacing: -0.5}}>{g.chica}</div>
      </Pixelado>
      <Pixelado t={t} t0={g.t0 + 0.08} t1={g.t1} w={1000} h={Math.round(tam * 1.12)} semilla={`g${i}`}>
        <div
          style={{
            width: 1000,
            textAlign: 'center',
            fontFamily: mono,
            fontWeight: 500,
            fontSize: tam,
            lineHeight: `${Math.round(tam * 1.12)}px`,
            letterSpacing: -tam * 0.06,
            color,
            textShadow: g.bueno ? `0 0 50px ${p.acento}88` : '0 0 40px rgba(255,255,255,0.18)',
            textDecoration: g.malo ? 'line-through' : undefined,
            textDecorationThickness: g.malo ? 8 : undefined,
            textDecorationColor: g.malo ? '#9a9a9a' : undefined,
          }}
        >
          {g.grande}
        </div>
      </Pixelado>
    </div>
  );
};

// ------------------------------------------------------------------ ventana mínima
const Ventana: React.FC<{e: Escena; t: number; fps: number; p: PropsMin; children: React.ReactNode}> = ({e, t, fps, children}) => {
  const a = pop(t, e.t0, fps);
  const sale = interpolate(t, [e.t1 - 0.2, e.t1], [1, 0], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: 110,
        top: 150,
        width: 860,
        height: 580,
        borderRadius: 18,
        background: 'linear-gradient(180deg, #0f0f0f, #080808)',
        border: '1.5px solid #2c2c2c',
        boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
        opacity: Math.min(1, a * 1.5) * sale,
        transform: `translateY(${(1 - a) * 30}px) scale(${0.94 + 0.06 * a})`,
        overflow: 'hidden',
      }}
    >
      <div style={{height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: '1px solid #1e1e1e'}}>
        <span style={{fontFamily: mono, fontSize: 24, color: '#6d6d6d', letterSpacing: 1}}>{e.titulo}</span>
        <span style={{fontFamily: mono, fontSize: 30, color: '#9a9a9a', letterSpacing: 2, marginTop: -10}}>•••</span>
      </div>
      <div style={{position: 'absolute', top: 56, left: 0, right: 0, bottom: 0}}>{children}</div>
    </div>
  );
};

const Grilla: React.FC<{e: Escena; t: number; fps: number; p: PropsMin}> = ({e, t, fps, p}) => {
  const lado = 34;
  const gap = 10;
  const base = 'rgba(255,255,255,0.10)';
  const dudas = e.dudas;
  const blancos: number[] = [];
  const puntos = Array.from({length: 100}).map((_, k) => {
    const ap = interpolate(t, [e.t0 + random(`ap${k}`) * 0.5, e.t0 + random(`ap${k}`) * 0.5 + 0.12], [0, 1], clamp);
    let color = base;
    let glow = '';
    let sc = 1;
    for (const s of e.pasos || []) {
      if (k >= s.desde && k < s.hasta) {
        const tk = s.t + (k - s.desde) * 0.06;
        if (t >= tk) {
          color = s.color === 'acento' ? p.acento : '#F2F2F2';
          glow = s.color === 'acento' ? `0 0 18px ${p.acento}` : '0 0 14px rgba(255,255,255,0.6)';
          sc = 1 + 0.35 * Math.exp(-(t - tk) / 0.08);
          if (s.color === 'blanco') blancos.push(k);
        }
      }
    }
    const tiembla = e.alerta && t >= e.alerta.t && color !== base ? Math.sin(t * 60 + k) * 2 : 0;
    return (
      <div
        key={k}
        style={{width: lado, height: lado, borderRadius: 6, background: color, boxShadow: glow, opacity: ap, transform: `scale(${sc}) translateX(${tiembla}px)`}}
      />
    );
  });
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'grid', gridTemplateColumns: `repeat(10, ${lado}px)`, gap, position: 'relative'}}>
        {puntos}
        {dudas
          ? blancos.slice(0, dudas.n).map((k, i) => {
              const a = pop(t, dudas.t + i * 0.12, fps);
              const x = (k % 10) * (lado + gap) + lado * 0.6;
              const y = Math.floor(k / 10) * (lado + gap) - 34 - Math.sin((t - dudas.t) * 3 + i) * 4;
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: x,
                    top: y,
                    transform: `scale(${a})`,
                    transformOrigin: '0% 100%',
                    padding: '0 10px',
                    height: 34,
                    borderRadius: '12px 12px 12px 2px',
                    background: '#F2F2F2',
                    color: '#0B0B0B',
                    fontFamily: mono,
                    fontWeight: 700,
                    fontSize: 24,
                    lineHeight: '34px',
                  }}
                >
                  ?
                </div>
              );
            })
          : null}
      </div>
      {e.alerta && t >= e.alerta.t ? (
        <div
          style={{
            position: 'absolute',
            bottom: 18,
            transform: `scale(${pop(t, e.alerta.t, fps)})`,
            fontFamily: mono,
            fontSize: 30,
            fontWeight: 500,
            color: '#0B0B0B',
            background: '#F2F2F2',
            padding: '6px 18px',
            borderRadius: 8,
          }}
        >
          {e.alerta.texto}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

const Escala: React.FC<{e: Escena; t: number; fps: number; p: PropsMin}> = ({e, t, fps, p}) => {
  const W = 700;
  const x0 = 80;
  const dibuja = interpolate(t, [e.t0, e.t0 + 0.6], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: x0, top: 250, width: W * dibuja, height: 6, background: '#3a3a3a', borderRadius: 3}} />
      {Array.from({length: 11}).map((_, v) => {
        const a = interpolate(t, [e.t0 + v * 0.04, e.t0 + v * 0.04 + 0.15], [0, 1], clamp);
        return (
          <React.Fragment key={v}>
            <div style={{position: 'absolute', left: x0 + (W * v) / 10 - 1, top: 236, width: 2, height: 34, background: '#4a4a4a', opacity: a}} />
            <div style={{position: 'absolute', left: x0 + (W * v) / 10 - 30, top: 284, width: 60, textAlign: 'center', fontFamily: mono, fontSize: 26, color: '#6a6a6a', opacity: a}}>{v}</div>
          </React.Fragment>
        );
      })}
      {(e.marcas || []).map((m, i) => {
        const a = pop(t, m.t, fps);
        if (a <= 0) return null;
        const x = x0 + (W * m.v) / 10;
        const c = m.bueno ? p.acento : '#F2F2F2';
        const arriba = i % 2 === 0;
        return (
          <React.Fragment key={i}>
            <div
              style={{
                position: 'absolute',
                left: x - 22,
                top: 231,
                width: 44,
                height: 44,
                borderRadius: 22,
                background: c,
                boxShadow: m.bueno ? `0 0 30px ${p.acento}` : '0 0 20px rgba(255,255,255,0.4)',
                transform: `scale(${a})`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: x - 160,
                top: arriba ? 80 : 340,
                width: 320,
                textAlign: 'center',
                transform: `translateY(${(1 - a) * (arriba ? 20 : -20)}px)`,
                opacity: Math.min(1, a),
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontFamily: mono,
                  fontWeight: 500,
                  fontSize: 44,
                  padding: '8px 22px',
                  borderRadius: 10,
                  border: `2px solid ${c}`,
                  color: m.bueno ? p.acento : '#CFCFCF',
                  textDecoration: m.bueno ? undefined : 'line-through',
                }}
              >
                {m.bueno ? '✓ ' : '✕ '}
                {m.texto}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};

const Chat: React.FC<{e: Escena; t: number; fps: number; p: PropsMin}> = ({e, t, fps, p}) => {
  const b = e.barra!;
  return (
    <AbsoluteFill style={{padding: '34px 48px'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
        <div style={{display: 'flex', gap: 8}}>
          {Array.from({length: 10}).map((_, k) => {
            const on = k < b.n && t >= b.t + k * 0.07;
            return <div key={k} style={{width: 38, height: 38, borderRadius: 6, background: on ? p.acento : 'rgba(255,255,255,0.10)', boxShadow: on ? `0 0 16px ${p.acento}` : undefined}} />;
          })}
        </div>
        <span style={{fontFamily: mono, fontSize: 30, color: '#BDBDBD', opacity: interpolate(t, [b.t + 0.3, b.t + 0.6], [0, 1], clamp)}}>{b.texto}</span>
      </div>
      <div style={{marginTop: 40, display: 'flex', flexDirection: 'column', gap: 22}}>
        {(e.mensajes || []).map((m, i) => {
          const a = pop(t, m.t, fps);
          const letras = Math.floor(interpolate(t, [m.t, m.t + 0.45], [0, m.texto.length], clamp));
          return (
            <div key={i} style={{display: 'flex', alignItems: 'flex-end', gap: 14, opacity: Math.min(1, a * 2), transform: `translateY(${(1 - a) * 30}px)`}}>
              <div style={{width: 54, height: 54, borderRadius: 27, background: '#2a2a2a', border: '1.5px solid #3a3a3a'}} />
              <div
                style={{
                  maxWidth: 620,
                  padding: '16px 24px',
                  borderRadius: '22px 22px 22px 4px',
                  background: '#F2F2F2',
                  fontFamily: mono,
                  fontWeight: 500,
                  fontSize: 36,
                  color: '#0B0B0B',
                }}
              >
                {m.texto.slice(0, letras)}
                {letras < m.texto.length ? <span style={{opacity: 0.4}}>▍</span> : null}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const Bandeja: React.FC<{e: Escena; t: number; fps: number; p: PropsMin}> = ({e, t, fps, p}) => (
  <AbsoluteFill style={{padding: '40px 46px', gap: 22, justifyContent: 'center'}}>
    {(e.filas || []).map((f, i) => {
      const a = pop(t, f.t, fps);
      const ok = t >= f.tOk;
      const b = pop(t, f.tOk, fps);
      return (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 112,
            padding: '0 26px',
            borderRadius: 14,
            border: `1.5px solid ${ok ? p.acento : '#2e2e2e'}`,
            background: ok ? `${p.acento}14` : '#0d0d0d',
            boxShadow: ok ? `0 0 30px ${p.acento}33` : undefined,
            opacity: Math.min(1, a * 2),
            transform: `translateX(${(1 - a) * -50}px)`,
          }}
        >
          <span style={{fontFamily: mono, fontSize: 34, color: '#E6E6E6'}}>{f.texto}</span>
          <span
            style={{
              fontFamily: mono,
              fontWeight: 500,
              fontSize: 28,
              padding: '6px 16px',
              borderRadius: 8,
              color: ok ? '#0B0B0B' : '#8a8a8a',
              background: ok ? p.acento : 'transparent',
              border: ok ? 'none' : '1.5px solid #3a3a3a',
              transform: `scale(${ok ? 0.7 + 0.3 * b : 1})`,
            }}
          >
            {ok ? '✓ resuelto' : 'pendiente'}
          </span>
        </div>
      );
    })}
  </AbsoluteFill>
);

// ------------------------------------------------------------------ tarjetitas a los costados
const FLECHAS: Record<string, string> = {sube: 'M6 18 18 6M9 6h9v9', baja: 'M6 6l12 12M18 9v9H9', ok: 'M5 12.5l4.5 4.5L19 7', no: 'M6 6l12 12M18 6 6 18'};
const Laterales: React.FC<{p: PropsMin; t: number; fps: number}> = ({p, t, fps}) => (
  <>
    {p.laterales
      .filter((l) => t >= l.t0 && t < l.t1)
      .map((l, i) => {
        const a = pop(t, l.t0, fps);
        const sale = interpolate(t, [l.t1 - 0.15, l.t1], [1, 0], clamp);
        const bueno = l.icono === 'ok' || l.icono === 'sube';
        const c = bueno ? p.acento : '#E8E8E8';
        const izq = l.lado === 'izq';
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: izq ? 34 : undefined,
              right: izq ? undefined : 34,
              top: izq ? 700 : 990,
              width: 118,
              height: 82,
              borderRadius: 10,
              border: '1.5px solid #2e2e2e',
              background: '#0c0c0c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${a * sale}) rotate(${izq ? -6 : 8}deg) translateY(${Math.sin(t * 2 + i) * 5}px)`,
              boxShadow: bueno ? `0 0 30px ${p.acento}55` : undefined,
            }}
          >
            <svg width={50} height={50} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2.6} strokeLinecap="square">
              <path d={FLECHAS[l.icono]} />
            </svg>
          </div>
        );
      })}
  </>
);

// ------------------------------------------------------------------ subtítulos chicos
const Subs: React.FC<{p: PropsMin; t: number}> = ({p, t}) => {
  const bloques: Palabra[][] = [];
  let cur: Palabra[] = [];
  p.palabras.forEach((w, i) => {
    const prev = p.palabras[i - 1];
    if (cur.length && (cur.length >= 4 || (prev && w.s - prev.e > 0.35))) {
      bloques.push(cur);
      cur = [];
    }
    cur.push(w);
  });
  if (cur.length) bloques.push(cur);
  const b = bloques.find((x, i) => t >= x[0].s - 0.05 && t < Math.min(bloques[i + 1]?.[0].s ?? 1e9, x[x.length - 1].e + 0.5) - 0.05);
  if (!b) return null;
  return (
    <div style={{position: 'absolute', top: 1040, left: 60, right: 60, textAlign: 'center'}}>
      {b.map((w, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            marginRight: 16,
            fontFamily: mono,
            fontWeight: 500,
            fontSize: 40,
            color: t >= w.s ? '#FFFFFF' : '#5a5a5a',
            textShadow: '0 2px 12px #000',
          }}
        >
          {w.w}
        </span>
      ))}
    </div>
  );
};

// ------------------------------------------------------------------ placa final
const FLECHA_PIX = ['..#..', '..#..', '..#..', '#.#.#', '.###.', '..#..'];
const Placa: React.FC<{p: PropsMin; t: number; fps: number}> = ({p, t, fps}) => {
  const c = p.cta;
  const giro = interpolate(t, [c.t0, c.t0 + 0.6], [-120, 0], {...clamp});
  const a = pop(t, c.t0, fps);
  const s = 18;
  return (
    <AbsoluteFill style={{background: '#050505', alignItems: 'center'}}>
      <div style={{position: 'absolute', top: 520, transform: `rotate(${giro}deg) scale(${a}) translateY(${Math.abs(Math.sin((t - c.t0) * 5)) * 14}px)`}}>
        {FLECHA_PIX.map((fila, j) => (
          <div key={j} style={{display: 'flex'}}>
            {fila.split('').map((ch, i) => (
              <div key={i} style={{width: s, height: s, background: ch === '#' ? '#F2F2F2' : 'transparent', boxShadow: ch === '#' ? '0 0 12px rgba(255,255,255,0.4)' : undefined}} />
            ))}
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', top: 680, left: 40}}>
        <Pixelado t={t} t0={c.t0 + 0.15} t1={c.t1 + 1} w={1000} h={64} semilla="ctac" d={0.3}>
          <div style={{width: 1000, textAlign: 'center', fontFamily: mono, fontSize: 48, color: '#D0D0D0', lineHeight: '64px'}}>{c.chica}</div>
        </Pixelado>
        <Pixelado t={t} t0={c.t0 + 0.25} t1={c.t1 + 1} w={1000} h={150} semilla="ctag">
          <div
            style={{
              width: 1000,
              textAlign: 'center',
              fontFamily: mono,
              fontWeight: 500,
              fontSize: 122,
              lineHeight: '150px',
              letterSpacing: -6,
              color: p.acento,
              textShadow: `0 0 50px ${p.acento}88`,
            }}
          >
            {c.grande}
          </div>
        </Pixelado>
        <Pixelado t={t} t0={c.t0 + 0.5} t1={c.t1 + 1} w={1000} h={64} semilla="ctaa" d={0.3}>
          <div style={{width: 1000, textAlign: 'center', fontFamily: mono, fontSize: 40, color: GRIS, lineHeight: '64px'}}>{c.abajo}</div>
        </Pixelado>
      </div>
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------ todo junto
export const ReelMin: React.FC<PropsMin> = (p) => {
  useFuentes(p.fuentes);
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const enCta = t >= p.cta.t0;
  const g = p.grandes.findIndex((x) => t >= x.t0 && t < x.t1);
  const e = p.escenas.find((x) => t >= x.t0 && t < x.t1);
  // acercamiento lento a lo largo de todo el reel + golpecito en cada corte (disimula el salto)
  const ult = [...p.cortes].reverse().find((c) => c <= t);
  const golpe = ult !== undefined ? Math.exp(-(t - ult) / 0.1) * 0.025 : 0;
  const z = interpolate(t, [0, p.cta.t0], [1, p.camara.zoomFinal], clamp) + golpe;
  const beat = Math.exp(-(((t * p.bpm) / 60) % 1) * 5);
  const lado = 1080 * p.camara.escala;
  return (
    <AbsoluteFill style={{background: '#050505'}}>
      {/* foco de luz desde arriba y círculo en el piso */}
      <AbsoluteFill
        style={{
          background: `conic-gradient(from 180deg at 50% -6%, transparent 0deg, transparent 158deg, rgba(255,255,255,${0.07 + beat * 0.015}) 172deg, rgba(255,255,255,${0.1 + beat * 0.02}) 180deg, rgba(255,255,255,${0.07 + beat * 0.015}) 188deg, transparent 202deg, transparent 360deg)`,
          filter: 'blur(18px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 540 - lado / 2,
          top: p.camara.top,
          width: lado,
          height: lado,
          transform: `scale(${z})`,
          transformOrigin: '50% 30%',
          WebkitMaskImage: 'radial-gradient(52% 50% at 50% 42%, black 58%, transparent 100%)',
        }}
      >
        <OffthreadVideo src={staticFile(p.cam)} style={{width: lado, height: lado, filter: 'grayscale(0.8) contrast(1.12) brightness(0.92)'}} />
      </div>
      <div style={{position: 'absolute', left: 140, top: 1820, width: 800, height: 90, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,255,255,0.10), transparent)'}} />
      {e ? (
        <Ventana e={e} t={t} fps={fps} p={p}>
          {e.tipo === 'grilla' ? <Grilla e={e} t={t} fps={fps} p={p} /> : null}
          {e.tipo === 'escala' ? <Escala e={e} t={t} fps={fps} p={p} /> : null}
          {e.tipo === 'chat' ? <Chat e={e} t={t} fps={fps} p={p} /> : null}
          {e.tipo === 'bandeja' ? <Bandeja e={e} t={t} fps={fps} p={p} /> : null}
        </Ventana>
      ) : null}
      {g >= 0 ? <PalabraGrande g={p.grandes[g]} t={t} p={p} i={g} /> : null}
      <Laterales p={p} t={t} fps={fps} />
      <Subs p={p} t={t} />
      {/* viñeta */}
      <AbsoluteFill style={{background: 'radial-gradient(120% 80% at 50% 45%, transparent 55%, rgba(0,0,0,0.75) 100%)', pointerEvents: 'none'}} />
      {enCta ? <Placa p={p} t={t} fps={fps} /> : null}
    </AbsoluteFill>
  );
};
