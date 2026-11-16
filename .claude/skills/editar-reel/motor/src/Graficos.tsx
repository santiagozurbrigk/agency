// Los motion graphics. Estética sacada de la referencia "guia-infoproductos" (mirar
// estilo/referencias/), pasada a la paleta de estilo.md: fondo oscuro, UN color de acento que
// brilla, y un color claro solo para puntos y líneas finas. Todo entra suave; nada rebota.
//
// Cinco tipos (se piden en edicion.json → "graficos"):
//   cifra       tarjeta con un número que cambia ($50K → $100K), cámara desenfocada atrás
//   crecimiento línea punteada que sube, con etiqueta y un número gigante de fondo
//   pasos       placa a pantalla completa: tarjetas con ícono unidas por una línea
//   titulo      título de sección a pantalla completa, con brillo
//   rotulo      cajita con ícono y frase corta sobre la cámara (no la tapa)
//   banda       placa fija arriba (ej. "MARTES 17 · 18 HS"); solo la tapan las placas completas
import React from 'react';
import {AbsoluteFill, Easing, interpolate} from 'remotion';

export type Grafico = {
  tipo: 'cifra' | 'crecimiento' | 'pasos' | 'titulo' | 'rotulo' | 'banda';
  t0: number;
  t1: number;
  valores?: string[];
  etiqueta?: string;
  puntos?: number[];
  numeroFondo?: string;
  items?: {titulo: string; icono?: string; estrellas?: number}[];
  texto?: string;
  sub?: string;
  icono?: string;
};

export type EstiloGraficos = {
  acento: string;
  fondo: string;
  claro: string;
  fuente: string;
  desenfoque: number;
  oscurecer: number;
  brillo: number;
  entrada: number;
  duracion: number;
};

export const GRAFICOS_DEFECTO: EstiloGraficos = {
  acento: '#F26A1B',
  fondo: '#0B0B0C',
  claro: '#F2EDE4',
  fuente: 'Inter Tight',
  desenfoque: 18,
  oscurecer: 0.45,
  brillo: 0.6,
  entrada: 0.45,
  duracion: 3.5,
};

// Los que tapan la cámara entera (y apagan los subtítulos).
export const TAPA: Record<Grafico['tipo'], boolean> = {cifra: false, crecimiento: false, pasos: true, titulo: true, rotulo: false, banda: false};
// Los que desenfocan la cámara atrás.
export const DESENFOCA: Record<Grafico['tipo'], boolean> = {cifra: true, crecimiento: true, pasos: true, titulo: true, rotulo: false, banda: false};

export const hexA = (hex: string, a: number) => {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

const CLAMP = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const suave = Easing.out(Easing.cubic);

// 0 → 1 al entrar, 1 → 0 en los últimos 0,3 s.
export const envolvente = (t: number, g: Grafico, entrada: number) => {
  if (t < g.t0 || t >= g.t1) return 0;
  const a = interpolate(t, [g.t0, g.t0 + entrada], [0, 1], {...CLAMP, easing: suave});
  const b = interpolate(t, [g.t1 - 0.3, g.t1], [1, 0], CLAMP);
  return Math.min(a, b);
};

// Íconos de línea, 24x24.
const ICONOS: Record<string, string> = {
  dinero: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18 M15 8.5c-.6-1-1.8-1.5-3-1.5-1.7 0-3 .9-3 2.2 0 3 6 1.6 6 4.6 0 1.3-1.3 2.2-3 2.2-1.3 0-2.5-.6-3-1.6 M12 5.5v13',
  caja: 'M3 7l9-4 9 4v10l-9 4-9-4z M3 7l9 4 9-4 M12 11v10',
  persona: 'M12 4a4 4 0 1 0 0 8a4 4 0 1 0 0-8 M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7',
  grafico: 'M3 3v18h18 M7 15l4-4 3 3 6-7',
  chat: 'M4 5h16v11H9l-5 4z',
  megafono: 'M3 10v4h4l8 5V5L7 10z M18 9a4 4 0 0 1 0 6',
  engranaje: 'M12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6 M12 2v3 M12 19v3 M2 12h3 M19 12h3 M4.9 4.9l2.1 2.1 M17 17l2.1 2.1 M4.9 19.1L7 17 M17 7l2.1-2.1',
  rayo: 'M13 2L4 14h7l-1 8 9-12h-7z',
  check: 'M4 12l5 5L20 6',
  estrella: 'M12 2l3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21l1.4-7L2 9.3l7-.8z',
  objetivo: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18 M12 7a5 5 0 1 0 0 10a5 5 0 1 0 0-10 M12 11a1 1 0 1 0 0 2a1 1 0 1 0 0-2',
  cruz: 'M6 6l12 12 M18 6L6 18',
};
export const NOMBRES_ICONOS = Object.keys(ICONOS);

const Icono: React.FC<{nombre?: string; color: string; tam: number; grosor?: number}> = ({nombre, color, tam, grosor = 1.4}) => {
  const d = nombre && ICONOS[nombre];
  if (!d) return null;
  return (
    <svg width={tam} height={tam} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={grosor} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
};

const largoDe = (pts: [number, number][]) => pts.slice(1).reduce((s, p, i) => s + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);

// Fondo de placa: negro con una viñeta del color de acento.
const FondoPlaca: React.FC<{G: EstiloGraficos}> = ({G}) => (
  <AbsoluteFill
    style={{
      backgroundColor: G.fondo,
      backgroundImage: `radial-gradient(ellipse 90% 60% at 50% 42%, ${hexA(G.acento, 0.2)} 0%, ${hexA(G.acento, 0.06)} 45%, ${G.fondo} 80%)`,
    }}
  />
);

// ── cifra ────────────────────────────────────────────────────────────────────────────────
const Cifra: React.FC<{g: Grafico; t: number; G: EstiloGraficos; W: number; H: number}> = ({g, t, G, W, H}) => {
  const v = envolvente(t, g, G.entrada);
  const valores = g.valores?.length ? g.valores : ['?'];
  const paso = (g.t1 - g.t0) / valores.length;
  const k = Math.min(valores.length - 1, Math.max(0, Math.floor((t - g.t0) / paso)));
  const local = t - g.t0 - k * paso;
  const cambio = k === 0 ? 1 : interpolate(local, [0, 0.22], [0, 1], {...CLAMP, easing: suave});
  const valor = valores[k];
  const largo = Math.max(...valores.map((x) => x.length));
  const ancho = 560;
  const tam = Math.min(170, (ancho - 70) / (largo * 0.58));
  return (
    <div
      style={{
        position: 'absolute',
        left: (W - ancho) / 2,
        top: H * 0.36 - 330,
        width: ancho,
        height: 660,
        opacity: v,
        transform: `translateY(${(1 - v) * 40}px) scale(${0.96 + 0.04 * v})`,
      }}
    >
      {g.etiqueta && (
        <div style={{position: 'absolute', bottom: 'calc(100% + 22px)', left: -220, right: -220, lineHeight: 1.25, textAlign: 'center', fontFamily: G.fuente, fontWeight: 700, fontSize: 34, letterSpacing: '0.18em', textTransform: 'uppercase', color: G.claro}}>
          {g.etiqueta}
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: `3px solid ${hexA(G.acento, 0.95)}`,
          background: `linear-gradient(180deg, ${hexA(G.fondo, 0.72)} 0%, ${hexA(G.fondo, 0.45)} 45%, ${hexA(G.acento, 0.7)} 100%)`,
          boxShadow: `0 0 ${80 * G.brillo}px ${hexA(G.acento, 0.55 * G.brillo)}, inset 0 0 60px ${hexA(G.acento, 0.25)}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            fontFamily: G.fuente,
            fontWeight: 800,
            fontSize: tam,
            letterSpacing: '-0.03em',
            color: G.acento,
            textShadow: `0 0 ${30 * G.brillo}px ${hexA(G.acento, 0.8 * G.brillo)}`,
            opacity: cambio,
            transform: `translateY(${(1 - cambio) * 30}px)`,
            whiteSpace: 'nowrap',
          }}
        >
          {valor}
        </div>
      </div>
    </div>
  );
};

// ── crecimiento ──────────────────────────────────────────────────────────────────────────
const Crecimiento: React.FC<{g: Grafico; t: number; G: EstiloGraficos; W: number; H: number}> = ({g, t, G, W, H}) => {
  const v = envolvente(t, g, G.entrada);
  const vals = g.puntos?.length && g.puntos.length >= 2 ? g.puntos : [1, 1.6, 3, 5.5];
  const arriba = H * 0.16;
  const abajo = H * 0.55;
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const pts: [number, number][] = vals.map((x, i) => [
    (W * i) / (vals.length - 1),
    abajo - 40 - ((x - min) / (max - min || 1)) * (abajo - arriba - 120),
  ]);
  const dur = g.t1 - g.t0;
  const p = interpolate(t, [g.t0 + 0.15, g.t0 + Math.min(dur * 0.75, 2.6)], [0, 1], {...CLAMP, easing: Easing.inOut(Easing.cubic)});
  const xCorte = p * W;
  // Dónde está la punta de la línea ahora.
  let yPunta = pts[0][1];
  for (let i = 1; i < pts.length; i++) {
    if (xCorte <= pts[i][0]) {
      const f = (xCorte - pts[i - 1][0]) / (pts[i][0] - pts[i - 1][0] || 1);
      yPunta = pts[i - 1][1] + f * (pts[i][1] - pts[i - 1][1]);
      break;
    }
    yPunta = pts[i][1];
  }
  const linea = pts.map((q) => q.join(',')).join(' ');
  const area = `${linea} ${W},${abajo} 0,${abajo}`;
  return (
    <AbsoluteFill style={{opacity: v}}>
      {g.numeroFondo && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: (arriba + abajo) / 2 - 210,
            textAlign: 'center',
            fontFamily: G.fuente,
            fontWeight: 900,
            fontSize: Math.min(380, (W - 60) / (g.numeroFondo.length * 0.6)),
            letterSpacing: '-0.05em',
            whiteSpace: 'nowrap',
            color: hexA(G.acento, 0.2),
            opacity: interpolate(t, [g.t0 + 0.3, g.t0 + 1.2], [0, 1], CLAMP),
            transform: `scale(${interpolate(t, [g.t0, g.t1], [1.04, 1])})`,
          }}
        >
          {g.numeroFondo}
        </div>
      )}
      <svg width={W} height={H} style={{position: 'absolute', inset: 0, filter: `drop-shadow(0 0 ${14 * G.brillo}px ${hexA(G.acento, 0.8)})`}}>
        <defs>
          <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={G.acento} stopOpacity={0.45} />
            <stop offset="100%" stopColor={G.acento} stopOpacity={0} />
          </linearGradient>
          <clipPath id="corte">
            <rect x={0} y={0} width={xCorte} height={H} />
          </clipPath>
        </defs>
        <g clipPath="url(#corte)">
          <polygon points={area} fill="url(#area)" />
          <polyline points={linea} fill="none" stroke={G.acento} strokeWidth={5} strokeDasharray="16 10" strokeLinejoin="round" />
          {pts.slice(1, -1).map((q, i) => (
            <circle key={i} cx={q[0]} cy={q[1]} r={11} fill={G.claro} />
          ))}
        </g>
        {p > 0 && p < 1 && <circle cx={xCorte} cy={yPunta} r={11} fill={G.claro} />}
      </svg>
      {g.etiqueta && (
        <div
          style={{
            position: 'absolute',
            left: Math.max(40, Math.min(xCorte, W - 40)),
            top: yPunta - 120,
            transform: `translateX(-${(xCorte / W) * 100}%)`,
            border: `2px solid ${G.acento}`,
            background: hexA(G.fondo, 0.55),
            padding: '10px 20px',
            fontFamily: G.fuente,
            fontWeight: 600,
            fontSize: 40,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: G.acento,
            whiteSpace: 'nowrap',
            opacity: interpolate(p, [0.05, 0.25], [0, 1], CLAMP),
          }}
        >
          {g.etiqueta}
        </div>
      )}
    </AbsoluteFill>
  );
};

// ── pasos ────────────────────────────────────────────────────────────────────────────────
const Pasos: React.FC<{g: Grafico; t: number; G: EstiloGraficos; W: number; H: number}> = ({g, t, G, W, H}) => {
  const v = envolvente(t, g, G.entrada);
  const items = (g.items || []).slice(0, 5);
  const n = items.length;
  const cw = 300;
  const ch = 320;
  const y0 = H * 0.24;
  const y1 = H * 0.76;
  const pos = items.map((_, k) => [k % 2 === 0 ? W * 0.3 : W * 0.7, n === 1 ? H / 2 : y0 + ((y1 - y0) * k) / (n - 1)] as [number, number]);
  const nodos = pos.map(([x, y]) => [x, y + ch / 2 - 28] as [number, number]);
  const dur = g.t1 - g.t0;
  const paso = Math.min(0.7, Math.max(0.25, (dur - 1) / Math.max(1, n)));
  const aparece = (k: number) => g.t0 + G.entrada * 0.6 + k * paso;
  const cuanto = (k: number) => interpolate(t, [aparece(k), aparece(k) + 0.4], [0, 1], {...CLAMP, easing: suave});
  // La línea avanza de un nodo al siguiente mientras aparece la tarjeta siguiente.
  const total = largoDe(nodos);
  let hecho = 0;
  for (let k = 1; k < n; k++) {
    const seg = Math.hypot(nodos[k][0] - nodos[k - 1][0], nodos[k][1] - nodos[k - 1][1]);
    hecho += seg * interpolate(t, [aparece(k) - paso * 0.7, aparece(k)], [0, 1], CLAMP);
  }
  return (
    <AbsoluteFill style={{opacity: v}}>
      <FondoPlaca G={G} />
      {g.texto && (
        <div style={{position: 'absolute', top: H * 0.08, left: 60, right: 60, textAlign: 'center', fontFamily: G.fuente, fontWeight: 800, fontSize: 64, letterSpacing: '-0.01em', textTransform: 'uppercase', color: G.claro}}>
          {g.texto}
        </div>
      )}
      {pos.map(([x, y], k) => (
        <div
          key={`c${k}`}
          style={{
            position: 'absolute',
            left: x - 210,
            top: y - 210,
            width: 420,
            height: 420,
            borderRadius: '50%',
            border: `2px dashed ${hexA(G.claro, 0.35)}`,
            opacity: cuanto(k),
            transform: `rotate(${(t - g.t0) * 8}deg) scale(${0.9 + 0.1 * cuanto(k)})`,
          }}
        />
      ))}
      {items.map((it, k) => {
        const c = cuanto(k);
        const [x, y] = pos[k];
        return (
          <div
            key={k}
            style={{
              position: 'absolute',
              left: x - cw / 2,
              top: y - ch / 2,
              width: cw,
              height: ch,
              opacity: c,
              transform: `translateY(${(1 - c) * 40}px)`,
            }}
          >
            {!!it.estrellas && (
              <div style={{position: 'absolute', top: -56, left: 0, right: 0, textAlign: 'center', fontSize: 40, letterSpacing: 4, color: G.acento, textShadow: `0 0 12px ${hexA(G.acento, 0.7)}`}}>
                {'★'.repeat(Math.min(5, it.estrellas))}
              </div>
            )}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                border: `2px solid ${hexA(G.acento, 0.9)}`,
                background: `linear-gradient(180deg, ${hexA(G.acento, 0.55)} 0%, ${hexA(G.acento, 0.18)} 100%)`,
                boxShadow: `0 0 ${60 * G.brillo}px ${hexA(G.acento, 0.45 * G.brillo)}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: 30,
                gap: 34,
              }}
            >
              <div style={{fontFamily: G.fuente, fontWeight: 800, fontSize: 32, letterSpacing: '0.08em', textTransform: 'uppercase', color: G.claro, textAlign: 'center', padding: '0 14px'}}>
                {it.titulo}
              </div>
              <Icono nombre={it.icono} color={hexA(G.claro, 0.85)} tam={130} />
            </div>
          </div>
        );
      })}
      <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
        {n > 1 && (
          <polyline
            points={nodos.map((q) => q.join(',')).join(' ')}
            fill="none"
            stroke={G.claro}
            strokeWidth={3}
            strokeDasharray={`${hecho} ${total + 10}`}
          />
        )}
        {nodos.map(([x, y], k) => (
          <rect key={k} x={x - 10} y={y - 10} width={20} height={20} fill={G.claro} stroke={G.fondo} strokeWidth={3} opacity={cuanto(k)} />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

// ── titulo ───────────────────────────────────────────────────────────────────────────────
const Titulo: React.FC<{g: Grafico; t: number; G: EstiloGraficos; W: number; H: number}> = ({g, t, G, W, H}) => {
  const v = envolvente(t, g, G.entrada);
  const entra = interpolate(t, [g.t0, g.t0 + G.entrada * 1.6], [0, 1], {...CLAMP, easing: suave});
  const texto = (g.texto || '').toUpperCase();
  const tam = Math.min(170, (W - 120) / (Math.max(...texto.split('\n').map((l) => l.length), 1) * 0.68));
  // La escalera que brilla abajo.
  const esc: [number, number][] = [
    [W * 0.08, H * 0.86],
    [W * 0.32, H * 0.86],
    [W * 0.42, H * 0.8],
    [W * 0.6, H * 0.8],
    [W * 0.7, H * 0.72],
    [W * 0.82, H * 0.72],
    [W * 1.02, H * 0.6],
  ];
  const largo = largoDe(esc);
  const dibujo = interpolate(t, [g.t0 + 0.2, g.t0 + Math.min(2.2, (g.t1 - g.t0) * 0.8)], [0, 1], {...CLAMP, easing: Easing.inOut(Easing.cubic)});
  const halo = `0 0 ${20 * G.brillo}px ${hexA(G.acento, 0.9)}, 0 0 ${60 * G.brillo}px ${hexA(G.acento, 0.6)}`;
  return (
    <AbsoluteFill style={{opacity: v}}>
      <AbsoluteFill style={{backgroundColor: G.fondo, backgroundImage: `radial-gradient(ellipse 80% 40% at 50% 46%, ${hexA(G.acento, 0.12)} 0%, ${G.fondo} 70%)`}} />
      <div
        style={{
          position: 'absolute',
          left: 60,
          right: 60,
          top: H * 0.46,
          transform: `translateY(-50%) scale(${1.08 - 0.08 * entra})`,
          filter: `blur(${(1 - entra) * 12}px)`,
          textAlign: 'center',
        }}
      >
        <div style={{fontFamily: G.fuente, fontWeight: 900, fontSize: tam, lineHeight: 0.95, letterSpacing: '-0.02em', color: G.acento, textShadow: halo, whiteSpace: 'pre-line'}}>{texto}</div>
        {g.sub && (
          <div style={{marginTop: 18, fontFamily: G.fuente, fontWeight: 800, fontStyle: 'italic', fontSize: Math.round(tam * 0.32), letterSpacing: '0.04em', textTransform: 'uppercase', color: G.acento, textShadow: halo}}>
            {g.sub}
          </div>
        )}
      </div>
      <svg width={W} height={H} style={{position: 'absolute', inset: 0, filter: `drop-shadow(0 0 ${16 * G.brillo}px ${G.acento})`}}>
        <polyline points={esc.map((q) => q.join(',')).join(' ')} fill="none" stroke={G.acento} strokeWidth={5} strokeLinejoin="round" strokeDasharray={`${largo * dibujo} ${largo}`} />
      </svg>
    </AbsoluteFill>
  );
};

// ── rotulo ───────────────────────────────────────────────────────────────────────────────
const Rotulo: React.FC<{g: Grafico; t: number; G: EstiloGraficos; W: number; H: number}> = ({g, t, G, W, H}) => {
  const v = envolvente(t, g, G.entrada);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: H * 0.56, display: 'flex', justifyContent: 'center', opacity: v, transform: `translateX(${(1 - v) * -60}px)`}}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          maxWidth: W - 120,
          padding: '16px 28px 16px 16px',
          background: hexA(G.fondo, 0.82),
          border: `2px solid ${G.acento}`,
          boxShadow: `0 0 ${40 * G.brillo}px ${hexA(G.acento, 0.4 * G.brillo)}`,
        }}
      >
        {g.icono && (
          <div style={{width: 64, height: 64, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', background: hexA(G.acento, 0.25), border: `1px solid ${G.acento}`}}>
            <Icono nombre={g.icono} color={G.acento} tam={40} grosor={2} />
          </div>
        )}
        <div style={{fontFamily: G.fuente, fontWeight: 600, fontSize: 44, lineHeight: 1.15, color: G.claro}}>{g.texto}</div>
      </div>
    </div>
  );
};

// ── banda ────────────────────────────────────────────────────────────────────────────────
const Banda: React.FC<{g: Grafico; t: number; G: EstiloGraficos; W: number; H: number}> = ({g, t, G, H}) => {
  const v = envolvente(t, g, G.entrada);
  const pulso = 0.55 + 0.45 * Math.abs(Math.sin((t - g.t0) * Math.PI * 0.8));
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: H * 0.06, display: 'flex', justifyContent: 'center', opacity: v, transform: `translateY(${(1 - v) * -30}px)`}}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          padding: '14px 28px',
          background: hexA(G.fondo, 0.85),
          border: `2px solid ${G.acento}`,
          boxShadow: `0 0 ${40 * G.brillo}px ${hexA(G.acento, 0.4 * G.brillo)}`,
        }}
      >
        <div style={{width: 16, height: 16, borderRadius: '50%', background: G.acento, opacity: pulso, boxShadow: `0 0 14px ${G.acento}`}} />
        <div style={{fontFamily: G.fuente, fontWeight: 800, fontSize: 38, letterSpacing: '0.06em', textTransform: 'uppercase', color: G.claro, whiteSpace: 'nowrap'}}>{g.texto}</div>
      </div>
    </div>
  );
};

const POR_TIPO = {cifra: Cifra, crecimiento: Crecimiento, pasos: Pasos, titulo: Titulo, rotulo: Rotulo, banda: Banda};

export const Graficos: React.FC<{graficos: Grafico[]; t: number; G: EstiloGraficos; W: number; H: number}> = ({graficos, t, G, W, H}) => (
  <>
    {[...graficos.filter((g) => g.tipo === 'banda'), ...graficos.filter((g) => g.tipo !== 'banda')]
      .filter((g) => t >= g.t0 && t < g.t1)
      .map((g, i) => {
        const C = POR_TIPO[g.tipo];
        return C ? <C key={i} g={g} t={t} G={G} W={W} H={H} /> : null;
      })}
  </>
);
