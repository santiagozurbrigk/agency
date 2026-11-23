// ReelMG — estilo "motion graphics" (referencia reel-ig-mg):
// arriba un encabezado (texto + caja de color con una palabra en itálica serif) y una tarjeta con
// borde que brilla; abajo la cara. Alterna con la cara a pantalla completa. Subtítulos de 1 a 3
// palabras que aparecen al decirse, con las palabras clave en itálica serif de color.
// Todo lo que pasa en el reel viene en las props (un JSON por reel).
import React from 'react';
import {AbsoluteFill, OffthreadVideo, Easing, continueRender, delayRender, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

// Las fuentes van como archivos dentro de la carpeta del reel (fonts/), así el render no depende
// de bajar nada de internet.
const sans = 'Inter Tight';
const serif = 'Playfair Display';
type Fuente = {fam: string; style: string; weight: string; file: string; range: string};
const useFuentes = (fuentes: Fuente[] | undefined) => {
  const [h] = React.useState(() => delayRender('fuentes locales'));
  React.useEffect(() => {
    Promise.all(
      (fuentes || []).map((x) => {
        const ff = new FontFace(x.fam, `url(${staticFile(x.file)}) format('woff2')`, {style: x.style, weight: x.weight, unicodeRange: x.range});
        return ff.load().then((l) => document.fonts.add(l));
      }),
    )
      .catch((e) => console.error(e))
      .finally(() => continueRender(h));
  }, [fuentes, h]);
};

type Palabra = {w: string; s: number; e: number; k?: boolean};
type Tramo = {t0: number; t1: number};
type Encabezado = Tramo & {texto: string; caja: string};
type Tarjeta = Tramo & {
  tipo: 'video' | 'formula' | 'barras' | 'contador' | 'veredicto';
  etiqueta?: string;
  src?: string;
  // fórmula
  pasos?: {t: number; que: 'pauta' | 'mas' | 'costo' | 'linea' | 'clientes' | 'igual' | 'cac'}[];
  // barras
  barras?: {nombre: string; valor: number; t: number}[];
  titulo?: string;
  // contador
  desde?: number;
  hasta?: number;
  tc0?: number;
  tc1?: number;
  unidad?: string;
  chip?: string;
  // veredicto
  filas?: {nombre: string; texto: string; marca: 'ok' | 'medio' | 'no'; t: number}[];
};
export type PropsMG = {
  duracion: number;
  cam: string;
  colores: {acento: string; fondo: string; claro: string; tarjeta: string};
  modos: (Tramo & {modo: 'split' | 'cam'})[];
  encabezados: Encabezado[];
  tarjetas: Tarjeta[];
  palabras: Palabra[];
  cortes: number[]; // dónde arranca un bloque de subtítulos nuevo (además de las pausas)
  zooms: (Tramo & {z: number})[];
  cta: (Tramo & {arriba: string; abajo: string}) | null;
  camSplit: {y: number; escala: number};
  fuentes?: Fuente[];
};

const ent = (f: number, t: number, fps: number, d = 0.35) =>
  interpolate(f / fps, [t, t + d], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});

const enTramo = (t: number, x: Tramo) => t >= x.t0 && t < x.t1;

// ------------------------------------------------------------------ cámara
const Camara: React.FC<{p: PropsMG; t: number; split: boolean}> = ({p, t, split}) => {
  const z = p.zooms.find((x) => enTramo(t, x));
  const esc = (split ? p.camSplit.escala : 1) * (z && !split ? z.z : 1);
  const top = split ? p.camSplit.y : 0;
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top,
          width: 1080,
          height: 1920,
          transform: `scale(${esc})`,
          transformOrigin: split ? '50% 30%' : '50% 38%',
          WebkitMaskImage: split ? 'linear-gradient(to bottom, transparent 0px, black 240px)' : undefined,
        }}
      >
        <OffthreadVideo src={staticFile(p.cam)} style={{width: 1080, height: 1920, objectFit: 'cover'}} />
      </div>
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------ encabezado
const Encab: React.FC<{e: Encabezado; t: number; p: PropsMG; fps: number; f: number}> = ({e, t, p, fps, f}) => {
  const dt = t - e.t0;
  const letras = Math.floor(interpolate(dt, [0, 0.45], [0, e.texto.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const caja = ent(f, e.t0 + 0.3, fps, 0.3);
  const pal = ent(f, e.t0 + 0.5, fps, 0.3);
  return (
    <div style={{position: 'absolute', top: 120, left: 0, width: 1080, textAlign: 'center'}}>
      <div style={{fontFamily: sans, fontWeight: 700, fontSize: 56, color: p.colores.claro, letterSpacing: -0.5, height: 68}}>
        {e.texto.slice(0, letras)}
      </div>
      <div style={{display: 'inline-block', marginTop: 10, position: 'relative'}}>
        <div
          style={{
            background: p.colores.acento,
            borderRadius: 10,
            padding: '4px 26px 10px',
            clipPath: `inset(0 ${100 - caja * 100}% 0 0 round 10px)`,
            boxShadow: `0 0 40px ${p.colores.acento}66`,
          }}
        >
          <span style={{fontFamily: serif, fontStyle: 'italic', fontWeight: 800, fontSize: 82, color: p.colores.claro, opacity: pal, lineHeight: 1.05}}>
            {e.caja}
          </span>
        </div>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------ tarjeta
const TOP_TARJETA = 400;
const ALTO_TARJETA = 620;
const Marco: React.FC<{p: PropsMG; etiqueta?: string; children: React.ReactNode; a: number}> = ({p, etiqueta, children, a}) => (
  <div
    style={{
      position: 'absolute',
      left: 90,
      top: TOP_TARJETA + (1 - a) * 40,
      width: 900,
      height: ALTO_TARJETA,
      opacity: a,
      borderRadius: 30,
      background: p.colores.tarjeta,
      border: `3px solid ${p.colores.acento}`,
      boxShadow: `0 0 60px ${p.colores.acento}55, inset 0 0 0 1px #ffffff10`,
      overflow: 'hidden',
    }}
  >
    <div style={{height: 54, display: 'flex', alignItems: 'center', padding: '0 22px', gap: 10, borderBottom: '1px solid #ffffff14'}}>
      {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
        <div key={c} style={{width: 15, height: 15, borderRadius: 8, background: c}} />
      ))}
      <div style={{flex: 1, textAlign: 'center', fontFamily: sans, fontWeight: 600, fontSize: 22, color: '#ffffff80', marginRight: 60}}>{etiqueta}</div>
    </div>
    <div style={{position: 'absolute', top: 54, left: 0, right: 0, bottom: 0}}>{children}</div>
  </div>
);

const Chip: React.FC<{texto: string; a: number; p: PropsMG; fuerte?: boolean; grande?: boolean}> = ({texto, a, p, fuerte, grande}) => (
  <div
    style={{
      display: 'inline-block',
      opacity: a,
      transform: `translateY(${(1 - a) * 24}px) scale(${0.9 + 0.1 * a})`,
      padding: grande ? '10px 34px 16px' : '10px 26px',
      borderRadius: 16,
      background: fuerte ? p.colores.acento : '#ffffff0d',
      border: `2px solid ${fuerte ? p.colores.acento : '#ffffff30'}`,
      boxShadow: fuerte ? `0 0 50px ${p.colores.acento}88` : undefined,
      fontFamily: fuerte ? serif : sans,
      fontStyle: fuerte ? 'italic' : 'normal',
      fontWeight: fuerte ? 800 : 700,
      fontSize: grande ? 92 : 54,
      color: p.colores.claro,
      whiteSpace: 'nowrap',
    }}
  >
    {texto}
  </div>
);

const Formula: React.FC<{c: Tarjeta; p: PropsMG; f: number; fps: number}> = ({c, p, f, fps}) => {
  const at = (q: string) => {
    const s = c.pasos?.find((x) => x.que === q);
    return s ? ent(f, s.t, fps) : 0;
  };
  const linea = at('linea');
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 26}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <Chip texto="Pauta" a={at('pauta')} p={p} />
            <span style={{fontFamily: sans, fontWeight: 800, fontSize: 56, color: p.colores.acento, opacity: at('mas')}}>+</span>
            <Chip texto="Costo del equipo" a={at('costo')} p={p} />
          </div>
          <div style={{height: 6, width: 560 * linea, borderRadius: 3, background: p.colores.claro, boxShadow: `0 0 18px ${p.colores.claro}88`}} />
          <Chip texto="Clientes nuevos" a={at('clientes')} p={p} />
        </div>
      </div>
      <div style={{marginTop: 46, display: 'flex', alignItems: 'center', gap: 22}}>
        <span style={{fontFamily: sans, fontWeight: 800, fontSize: 64, color: p.colores.claro, opacity: at('igual')}}>=</span>
        <Chip texto="CAC real" a={at('cac')} p={p} fuerte grande />
      </div>
    </AbsoluteFill>
  );
};

const Barras: React.FC<{c: Tarjeta; p: PropsMG; f: number; fps: number}> = ({c, p, f, fps}) => (
  <AbsoluteFill style={{padding: '34px 70px 40px'}}>
    <div style={{fontFamily: sans, fontWeight: 700, fontSize: 34, color: '#ffffffaa', textAlign: 'center'}}>{c.titulo}</div>
    <div style={{flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', marginTop: 20}}>
      {c.barras!.map((b, i) => {
        const a = ent(f, b.t, fps, 0.6);
        const alto = 340 * b.valor * a;
        const top = i === 0;
        return (
          <div key={b.nombre} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, opacity: Math.min(1, a * 3)}}>
            <div
              style={{
                width: 150,
                height: alto,
                borderRadius: 18,
                background: top ? `linear-gradient(180deg, ${p.colores.acento}, ${p.colores.acento}99)` : '#ffffff26',
                border: `2px solid ${top ? p.colores.acento : '#ffffff40'}`,
                boxShadow: top ? `0 0 40px ${p.colores.acento}77` : undefined,
              }}
            />
            <div style={{fontFamily: sans, fontWeight: 800, fontSize: 36, color: p.colores.claro}}>{b.nombre}</div>
          </div>
        );
      })}
    </div>
  </AbsoluteFill>
);

const Contador: React.FC<{c: Tarjeta; p: PropsMG; f: number; fps: number}> = ({c, p, f, fps}) => {
  const t = f / fps;
  const n = Math.round(
    interpolate(t, [c.tc0!, c.tc1!], [c.desde!, c.hasta!], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)}),
  );
  const a = ent(f, c.tc0!, fps);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 10}}>
      {c.chip ? <Chip texto={c.chip} a={ent(f, c.t0 + 0.1, fps)} p={p} /> : null}
      <div style={{opacity: a, display: 'flex', alignItems: 'baseline', gap: 18, marginTop: 20}}>
        <span
          style={{
            fontFamily: sans,
            fontWeight: 900,
            fontSize: 230,
            lineHeight: 1,
            letterSpacing: -6,
            background: `linear-gradient(180deg, #FFB27A, ${p.colores.acento})`,
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            filter: `drop-shadow(0 0 30px ${p.colores.acento}88)`,
          }}
        >
          {n}
        </span>
        <span style={{fontFamily: serif, fontStyle: 'italic', fontWeight: 800, fontSize: 80, color: p.colores.claro}}>{c.unidad}</span>
      </div>
    </AbsoluteFill>
  );
};

const MARCAS = {ok: '✓', medio: '~', no: '✕'};
const Veredicto: React.FC<{c: Tarjeta; p: PropsMG; f: number; fps: number}> = ({c, p, f, fps}) => (
  <AbsoluteFill style={{padding: '40px 56px', gap: 26, justifyContent: 'center'}}>
    {c.filas!.map((r) => {
      const a = ent(f, r.t, fps);
      const ok = r.marca === 'ok';
      const no = r.marca === 'no';
      return (
        <div
          key={r.nombre}
          style={{
            opacity: a,
            transform: `translateX(${(1 - a) * -60}px)`,
            display: 'flex',
            alignItems: 'center',
            gap: 26,
            height: 132,
            padding: '0 30px',
            borderRadius: 22,
            background: ok ? `${p.colores.acento}22` : '#ffffff0a',
            border: `2px solid ${ok ? p.colores.acento : '#ffffff26'}`,
            boxShadow: ok ? `0 0 40px ${p.colores.acento}55` : undefined,
          }}
        >
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 38,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: sans,
              fontWeight: 900,
              fontSize: 44,
              background: ok ? p.colores.acento : '#ffffff1a',
              color: p.colores.claro,
            }}
          >
            {MARCAS[r.marca]}
          </div>
          <div style={{fontFamily: sans, fontWeight: 800, fontSize: 46, color: p.colores.claro, flex: 1, textDecoration: no ? 'line-through' : undefined, opacity: no ? 0.55 : 1}}>
            {r.nombre}
          </div>
          <div style={{fontFamily: serif, fontStyle: 'italic', fontWeight: 800, fontSize: 50, color: ok ? p.colores.acento : p.colores.claro, opacity: no ? 0.7 : 1}}>
            {r.texto}
          </div>
        </div>
      );
    })}
  </AbsoluteFill>
);

const TarjetaV: React.FC<{c: Tarjeta; p: PropsMG; f: number; fps: number}> = ({c, p, f, fps}) => {
  const a = ent(f, c.t0, fps, 0.3);
  let dentro: React.ReactNode = null;
  if (c.tipo === 'video')
    dentro = (
      <OffthreadVideo
        src={staticFile(c.src!)}
        muted
        style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%'}}
      />
    );
  if (c.tipo === 'formula') dentro = <Formula c={c} p={p} f={f} fps={fps} />;
  if (c.tipo === 'barras') dentro = <Barras c={c} p={p} f={f} fps={fps} />;
  if (c.tipo === 'contador') dentro = <Contador c={c} p={p} f={f} fps={fps} />;
  if (c.tipo === 'veredicto') dentro = <Veredicto c={c} p={p} f={f} fps={fps} />;
  return (
    <Marco p={p} etiqueta={c.etiqueta} a={a}>
      {dentro}
    </Marco>
  );
};

// ------------------------------------------------------------------ subtítulos
const Subtitulos: React.FC<{p: PropsMG; t: number; split: boolean}> = ({p, t, split}) => {
  // bloques: se corta en las pausas > 0,3 s, cada 3 palabras, o donde diga "cortes"
  const bloques: Palabra[][] = [];
  let cur: Palabra[] = [];
  p.palabras.forEach((w, i) => {
    const prev = p.palabras[i - 1];
    if (cur.length && (cur.length >= 3 || (prev && w.s - prev.e > 0.3) || p.cortes.some((c) => Math.abs(c - w.s) < 0.02) || w.k || prev?.k)) {
      bloques.push(cur);
      cur = [];
    }
    cur.push(w);
  });
  if (cur.length) bloques.push(cur);
  const b = bloques.find((x, i) => t >= x[0].s - 0.05 && t < (bloques[i + 1]?.[0].s ?? x[x.length - 1].e + 0.4) - 0.05 && t < x[x.length - 1].e + 0.6);
  if (!b) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: 40,
        right: 40,
        top: split ? 1060 : 1420,
        textAlign: 'center',
        lineHeight: 1.1,
      }}
    >
      {b.map((w, i) => {
        const visible = t >= w.s - 0.04;
        const a = interpolate(t, [w.s - 0.04, w.s + 0.08], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              marginRight: 18,
              opacity: visible ? a : 0,
              transform: `translateY(${(1 - a) * 10}px)`,
              fontFamily: w.k ? serif : sans,
              fontStyle: w.k ? 'italic' : 'normal',
              fontWeight: w.k ? 800 : 800,
              fontSize: w.k ? 84 : 70,
              color: w.k ? p.colores.acento : p.colores.claro,
              textShadow: '0 4px 24px rgba(0,0,0,0.75), 0 0 2px rgba(0,0,0,0.9)',
              letterSpacing: w.k ? 0 : -1,
            }}
          >
            {w.w}
          </span>
        );
      })}
    </div>
  );
};

// ------------------------------------------------------------------ CTA
const CTA: React.FC<{p: PropsMG; t: number; f: number; fps: number}> = ({p, t, f, fps}) => {
  const c = p.cta;
  if (!c || !enTramo(t, c)) return null;
  const a = ent(f, c.t0, fps, 0.3);
  const b = ent(f, c.t0 + 0.25, fps, 0.35);
  return (
    <div style={{position: 'absolute', top: 1180, left: 0, width: 1080, textAlign: 'center'}}>
      <div style={{fontFamily: serif, fontStyle: 'italic', fontWeight: 800, fontSize: 72, color: p.colores.claro, opacity: a, textShadow: '0 4px 24px #000a'}}>
        {c.arriba}
      </div>
      <div
        style={{
          marginTop: -6,
          fontFamily: sans,
          fontWeight: 900,
          fontSize: 118,
          letterSpacing: -2,
          color: '#FFD2B0',
          opacity: b,
          transform: `scale(${0.85 + 0.15 * b})`,
          textShadow: `0 0 30px ${p.colores.acento}, 0 0 70px ${p.colores.acento}aa, 0 4px 10px #000`,
        }}
      >
        “{c.abajo}”
      </div>
    </div>
  );
};

// ------------------------------------------------------------------ todo junto
export const ReelMG: React.FC<PropsMG> = (p) => {
  useFuentes(p.fuentes);
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const modo = p.modos.find((m) => enTramo(t, m))?.modo ?? 'cam';
  const split = modo === 'split';
  const enc = p.encabezados.find((e) => enTramo(t, e));
  const tar = p.tarjetas.find((c) => enTramo(t, c));
  const enCta = p.cta && enTramo(t, p.cta);
  return (
    <AbsoluteFill style={{background: p.colores.fondo}}>
      {split ? (
        <AbsoluteFill
          style={{
            background: `radial-gradient(120% 60% at 50% 18%, ${p.colores.acento}2e 0%, ${p.colores.fondo} 60%)`,
          }}
        />
      ) : null}
      <Camara p={p} t={t} split={split} />
      {split && enc ? <Encab e={enc} t={t} p={p} fps={fps} f={f} /> : null}
      {split && tar ? <TarjetaV c={tar} p={p} f={f} fps={fps} /> : null}
      {!enCta ? <Subtitulos p={p} t={t} split={split} /> : null}
      <CTA p={p} t={t} f={f} fps={fps} />
    </AbsoluteFill>
  );
};
