// Energia — capa "dopamínica" opcional de ReelMG (estilo.md, corrección del 24/11/2026):
// fondo vivo, barra de progreso, destellos en los cambios de plano, explosiones de partículas,
// stickers (pastillas, llamada en curso, flecha a comentarios) y un pulso al ritmo de la música.
// Si las props no traen `energia`, ReelMG sale como antes.
import React from 'react';
import {AbsoluteFill, interpolate, random, spring} from 'remotion';

const sans = 'Inter Tight';

export type Sticker = {
  t0: number;
  t1: number;
  tipo: 'chip' | 'llamada' | 'comentar';
  texto?: string;
  icono?: string;
  x: number; // centro, en px del cuadro 1080x1920
  y: number;
  rot?: number;
  fuerte?: boolean;
};
export type Rafaga = {t: number; x: number; y: number; n?: number; grande?: boolean};
export type Energia = {
  bpm: number;
  beat0?: number;
  stickers?: Sticker[];
  rafagas?: Rafaga[];
  timbres?: number[]; // cuándo "suena" (se sacude) la notificación
};
type Col = {acento: string; tinta: string; claro: string; tarjeta: string};

// Pop con un rebote corto (amortiguado: pasa ~12 % y vuelve).
export const pop = (t: number, t0: number, fps: number) =>
  t < t0 ? 0 : spring({frame: (t - t0) * fps, fps, config: {damping: 12, stiffness: 170, mass: 0.7}});

// 1 justo en cada golpe del beat, cae rápido a 0.
export const pulso = (t: number, e?: Energia) => {
  if (!e) return 0;
  const ph = (((t - (e.beat0 ?? 0)) * e.bpm) / 60) % 1;
  return ph < 0 ? 0 : Math.exp(-ph * 6);
};

// Decae desde 1 en t0 (para golpes de zoom y sacudidas).
export const golpe = (t: number, t0: number, d = 0.25) => (t < t0 || t > t0 + d * 4 ? 0 : Math.exp(-(t - t0) / d));

const PATHS: Record<string, string> = {
  dolar: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  check: 'M20 6 9 17l-5-5',
  persona: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  flecha: 'M12 5v14M19 12l-7 7-7-7',
  comentario: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  telefono: 'M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z',
  rayo: 'M13 2 4 14h7l-1 8 9-12h-7l1-8z',
  subida: 'M22 7 13.5 15.5 8.5 10.5 2 17M16 7h6v6',
  pregunta: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01',
  reloj: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',
};
export const Ic: React.FC<{n: string; color: string; size: number; w?: number}> = ({n, color, size, w}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={w ?? 2.2} strokeLinecap="round" strokeLinejoin="round">
    <path d={PATHS[n] || ''} />
  </svg>
);

// ------------------------------------------------------------------ fondo que se mueve
export const FondoVivo: React.FC<{t: number; c: Col; e: Energia}> = ({t, c, e}) => {
  const p = pulso(t, e);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${c.tinta}1f 2.2px, transparent 2.6px)`,
          backgroundSize: '44px 44px',
          backgroundPosition: `${t * 18}px ${t * 30}px`,
          WebkitMaskImage: 'radial-gradient(90% 60% at 50% 30%, black 20%, transparent 85%)',
        }}
      />
      {[0, 1, 2].map((i) => {
        const x = 540 + Math.sin(t * 0.35 + i * 2.1) * 420;
        const y = 380 + i * 520 + Math.cos(t * 0.27 + i * 1.3) * 160;
        const r = 420 + i * 60;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x - r,
              top: y - r,
              width: r * 2,
              height: r * 2,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${c.acento}${i === 1 ? '30' : '22'} 0%, transparent 65%)`,
              transform: `scale(${1 + p * 0.04})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------ barra de progreso
export const Progreso: React.FC<{t: number; dur: number; c: Col}> = ({t, dur, c}) => (
  <div style={{position: 'absolute', top: 0, left: 0, width: 1080, height: 10, background: `${c.tinta}14`}}>
    <div
      style={{
        height: 10,
        width: (1080 * t) / dur,
        background: `linear-gradient(90deg, ${c.acento}, #FFB27A)`,
        boxShadow: `0 0 18px ${c.acento}`,
        borderRadius: '0 5px 5px 0',
      }}
    />
  </div>
);

// ------------------------------------------------------------------ destello en los cortes
export const Destellos: React.FC<{t: number; tiempos: number[]}> = ({t, tiempos}) => {
  const o = Math.max(
    0,
    ...tiempos.map((x) => interpolate(t, [x - 0.04, x, x + 0.2], [0, 0.6, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})),
  );
  return o > 0.005 ? <AbsoluteFill style={{background: '#FFFFFF', opacity: o, mixBlendMode: 'screen'}} /> : null;
};

// ------------------------------------------------------------------ partículas
export const Rafagas: React.FC<{t: number; c: Col; rs: Rafaga[]}> = ({t, c, rs}) => {
  const vivas = rs.filter((r) => t >= r.t && t < r.t + 1.0);
  if (!vivas.length) return null;
  const cols = [c.acento, '#FFB27A', c.tinta, c.acento];
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {vivas.map((r, k) => {
        const dt = t - r.t;
        const n = r.n ?? (r.grande ? 26 : 14);
        const v = r.grande ? 1300 : 800;
        const anillo = interpolate(dt, [0, 0.45], [0, 1], {extrapolateRight: 'clamp'});
        return (
          <React.Fragment key={k}>
            <div
              style={{
                position: 'absolute',
                left: r.x - 200,
                top: r.y - 200,
                width: 400,
                height: 400,
                borderRadius: '50%',
                border: `${r.grande ? 10 : 6}px solid ${c.acento}`,
                transform: `scale(${0.1 + anillo * (r.grande ? 1.3 : 0.8)})`,
                opacity: 1 - anillo,
              }}
            />
            {Array.from({length: n}).map((_, i) => {
              const ang = random(`a${r.t}${i}`) * Math.PI * 2;
              const sp = v * (0.45 + random(`s${r.t}${i}`) * 0.55);
              const d = sp * dt * (1 - dt * 0.55);
              const x = r.x + Math.cos(ang) * d;
              const y = r.y + Math.sin(ang) * d + 700 * dt * dt;
              const s = 10 + random(`z${r.t}${i}`) * (r.grande ? 18 : 12);
              const cuadrado = i % 3 === 0;
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: x - s / 2,
                    top: y - s / 2,
                    width: s,
                    height: cuadrado ? s * 0.6 : s,
                    borderRadius: cuadrado ? 3 : '50%',
                    background: cols[i % cols.length],
                    opacity: Math.max(0, 1 - dt / 0.95),
                    transform: `rotate(${dt * 720 * (i % 2 ? 1 : -1)}deg)`,
                  }}
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------ stickers
const Chip: React.FC<{s: Sticker; t: number; fps: number; c: Col}> = ({s, t, fps, c}) => {
  const a = pop(t, s.t0, fps);
  const sale = interpolate(t, [s.t1 - 0.18, s.t1], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const flota = Math.sin((t - s.t0) * 2.4) * 7;
  const fuerte = !!s.fuerte;
  return (
    <div
      style={{
        position: 'absolute',
        left: s.x,
        top: s.y + flota,
        transform: `translate(-50%, -50%) rotate(${s.rot ?? 0}deg) scale(${a * sale})`,
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        padding: '14px 30px 14px 16px',
        borderRadius: 999,
        background: fuerte ? c.acento : c.tarjeta,
        border: `3px solid ${c.acento}`,
        boxShadow: `0 18px 40px rgba(0,0,0,0.22), 0 0 40px ${c.acento}55`,
        whiteSpace: 'nowrap',
      }}
    >
      {s.icono ? (
        <div
          style={{
            width: 66,
            height: 66,
            borderRadius: 33,
            background: fuerte ? c.claro : c.acento,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `rotate(${golpe(t, s.t0 + 0.1, 0.2) * Math.sin((t - s.t0) * 50) * 18}deg)`,
          }}
        >
          <Ic n={s.icono} color={fuerte ? c.acento : c.claro} size={40} w={2.6} />
        </div>
      ) : null}
      <span style={{fontFamily: sans, fontWeight: 800, fontSize: 44, color: fuerte ? c.claro : c.tinta, letterSpacing: -0.5}}>{s.texto}</span>
    </div>
  );
};

// Pastilla de "llamada en curso", con el teléfono que suena y un cronómetro.
const Llamada: React.FC<{s: Sticker; t: number; fps: number; c: Col}> = ({s, t, fps, c}) => {
  const a = pop(t, s.t0, fps);
  const sale = interpolate(t, [s.t1 - 0.2, s.t1], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const dt = t - s.t0;
  const sonando = dt < 1.3;
  const ring = sonando ? Math.sin(dt * 55) * 16 * (dt % 0.65 < 0.4 ? 1 : 0) : 0;
  const seg = Math.max(0, Math.floor(dt - 1.3));
  return (
    <div
      style={{
        position: 'absolute',
        left: s.x,
        top: s.y,
        transform: `translate(-50%, ${(a - 1) * 160}px) scale(${0.6 + 0.4 * a}) scaleY(${sale})`,
        opacity: Math.min(1, a * 2) * sale,
        display: 'flex',
        alignItems: 'center',
        gap: 22,
        padding: '16px 34px 16px 16px',
        borderRadius: 999,
        background: '#0B0B0C',
        boxShadow: `0 20px 50px rgba(0,0,0,0.45), 0 0 0 3px ${c.acento}`,
      }}
    >
      <div style={{position: 'relative', width: 88, height: 88}}>
        {sonando
          ? [0, 1].map((i) => {
              const ph = ((dt + i * 0.3) % 0.6) / 0.6;
              return (
                <div
                  key={i}
                  style={{position: 'absolute', inset: 0, borderRadius: 44, border: `4px solid ${c.acento}`, transform: `scale(${1 + ph * 0.7})`, opacity: 1 - ph}}
                />
              );
            })
          : null}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 44,
            background: c.acento,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `rotate(${ring}deg)`,
          }}
        >
          <Ic n="telefono" color="#FFFFFF" size={50} w={2.4} />
        </div>
      </div>
      <div>
        <div style={{fontFamily: sans, fontWeight: 800, fontSize: 40, color: '#FFFFFF', whiteSpace: 'nowrap'}}>{s.texto || 'Cliente'}</div>
        <div style={{fontFamily: sans, fontWeight: 700, fontSize: 30, color: sonando ? '#FFFFFFAA' : '#FFB27A', whiteSpace: 'nowrap'}}>
          {sonando ? 'llamando…' : `en llamada · 00:${String(seg).padStart(2, '0')}`}
        </div>
      </div>
    </div>
  );
};

// Burbuja de comentario con flecha que rebota al ritmo.
const Comentar: React.FC<{s: Sticker; t: number; fps: number; c: Col; e: Energia}> = ({s, t, fps, c, e}) => {
  const a = pop(t, s.t0, fps);
  const b = pulso(t, e);
  return (
    <div style={{position: 'absolute', left: s.x, top: s.y, transform: `translate(-50%, -50%) scale(${a})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
      <div
        style={{
          width: 150,
          height: 150,
          borderRadius: 44,
          background: c.acento,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 ${40 + b * 40}px ${c.acento}aa`,
          transform: `scale(${1 + b * 0.06}) rotate(${Math.sin(t * 3) * 4}deg)`,
        }}
      >
        <Ic n="comentario" color="#FFFFFF" size={84} w={2.4} />
      </div>
      <div style={{transform: `translateY(${Math.abs(Math.sin((t - s.t0) * 6)) * 26}px)`}}>
        <Ic n="flecha" color={c.acento} size={90} w={3} />
      </div>
    </div>
  );
};

export const Stickers: React.FC<{t: number; fps: number; c: Col; e: Energia}> = ({t, fps, c, e}) => (
  <>
    {(e.stickers || [])
      .filter((s) => t >= s.t0 && t < s.t1)
      .map((s, i) =>
        s.tipo === 'llamada' ? (
          <Llamada key={i} s={s} t={t} fps={fps} c={c} />
        ) : s.tipo === 'comentar' ? (
          <Comentar key={i} s={s} t={t} fps={fps} c={c} e={e} />
        ) : (
          <Chip key={i} s={s} t={t} fps={fps} c={c} />
        ),
      )}
  </>
);
