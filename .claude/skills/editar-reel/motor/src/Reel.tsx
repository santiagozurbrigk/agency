// El reel entero sale de las props que arma scripts/render.mjs a partir de
// edicion.json + palabras.json + el bloque de números de estilo.md.
// Todos los tiempos que llegan acá ya están en el tiempo del video EDITADO.
import React, {useEffect, useState} from 'react';
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  Sequence,
  continueRender,
  delayRender,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {getAvailableFonts} from '@remotion/google-fonts';
import {DESENFOCA, GRAFICOS_DEFECTO, Grafico, Graficos, EstiloGraficos, TAPA, envolvente, hexA} from './Graficos';

export type Segmento = {in: number; out: number; desde: number};
export type Plano = {t: number; plano: 'cam' | 'split' | 'broll'; broll?: string};
export type Zoom = {t0: number; t1: number; zoom: number};
export type Linea = {t0: number; t1: number; palabras: {w: string; s: number; e: number}[]};

export type Estilo = {
  subtitulos: {
    fuente: string;
    peso: number;
    tamano: number;
    color: string;
    resaltado: string | null;
    borde: string | null;
    grosorBorde: number;
    caja: string | null;
    mayusculas: boolean;
    posicionCam: number;
    posicionSplit: number;
  };
  zoom: {origenY: number};
  hook: {fondo: string; color: string; tamano: number; posicionY: number; fuente: string; borde?: string | null};
  cta: {fuente: string; tamano: number; color: string; posicionY: number};
  split: {fondo: string; encuadreCam: number; ajusteBroll: 'cover' | 'contain'};
  graficos?: Partial<EstiloGraficos>;
};

export type ReelProps = {
  toma: string;
  duracion: number;
  segmentos: Segmento[];
  planos: Plano[];
  zooms: Zoom[];
  lineas: Linea[];
  hook: {texto: string; desde: number; hasta: number} | null;
  cta: {texto: string; desde: number} | null;
  graficos?: Grafico[];
  estilo: Estilo;
};

const esVideo = (f: string) => /\.(mp4|mov|webm|m4v)$/i.test(f);

// Carga la fuente de Google que pida estilo.md. Si no existe, queda la del sistema.
// Solo los pesos y alfabetos que se usan: cargar todas las variantes tarda tanto que el render
// se corta por tiempo.
const PESOS = ['400', '500', '600', '700', '800', '900'];
const ALFABETOS = ['latin', 'latin-ext'];
const useFuente = (familias: string[]) => {
  const [handle] = useState(() => delayRender('fuentes'));
  const clave = [...new Set(familias)].join('|');
  useEffect(() => {
    const disponibles = getAvailableFonts();
    Promise.all(
      clave.split('|').map(async (f) => {
        const info = disponibles.find((x) => x.fontFamily === f);
        if (!info) return;
        const mod = await info.load();
        const {fonts, subsets} = mod.getInfo() as {fonts: Record<string, Record<string, unknown>>; subsets: string[]};
        const alfabetos = ALFABETOS.filter((s) => subsets.includes(s));
        await Promise.all(
          (['normal', 'italic'] as const)
            .filter((estilo) => fonts[estilo])
            .map((estilo) => {
              const pesos = Object.keys(fonts[estilo]).filter((w) => (estilo === 'normal' ? PESOS : ['800']).includes(w));
              return pesos.length ? mod.loadFont(estilo, {weights: pesos, subsets: alfabetos}).waitUntilDone() : null;
            }),
        );
      }),
    )
      .catch(() => null)
      .finally(() => continueRender(handle));
  }, [handle, clave]);
};

const planoEn = (planos: Plano[], t: number): Plano => {
  let actual: Plano = {t: 0, plano: 'cam'};
  for (const p of planos) if (p.t <= t + 1e-6) actual = p;
  return actual;
};

// La toma a cámara: un tramo por segmento, pegados uno atrás del otro.
const Camara: React.FC<{p: ReelProps; caja: {left: number; top: number; width: number; height: number}; zoom: number}> = ({p, caja, zoom}) => {
  const {fps} = useVideoConfig();
  return (
    <div style={{position: 'absolute', overflow: 'hidden', ...caja}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${zoom})`,
          transformOrigin: `50% ${p.estilo.zoom.origenY * 100}%`,
        }}
      >
        {p.segmentos.map((s, i) => {
          const desde = Math.round(s.desde * fps);
          const largo = Math.max(1, Math.round((s.out - s.in) * fps));
          return (
            <Sequence key={i} from={desde} durationInFrames={largo} layout="none">
              <OffthreadVideo
                src={staticFile(p.toma)}
                startFrom={Math.round(s.in * fps)}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: `50% ${p.estilo.split.encuadreCam * 100}%`,
                }}
              />
            </Sequence>
          );
        })}
      </div>
    </div>
  );
};

const Broll: React.FC<{archivo: string; desde: number; caja: React.CSSProperties; ajuste: 'cover' | 'contain'}> = ({archivo, desde, caja, ajuste}) => {
  const {fps} = useVideoConfig();
  const estilo: React.CSSProperties = {width: '100%', height: '100%', objectFit: ajuste};
  return (
    <div style={{position: 'absolute', overflow: 'hidden', ...caja}}>
      {esVideo(archivo) ? (
        <Sequence from={Math.round(desde * fps)} layout="none">
          <OffthreadVideo src={staticFile(archivo)} muted style={estilo} />
        </Sequence>
      ) : (
        <Img src={staticFile(archivo)} style={estilo} />
      )}
    </div>
  );
};

const Subtitulo: React.FC<{p: ReelProps; t: number; plano: Plano['plano']}> = ({p, t, plano}) => {
  const e = p.estilo.subtitulos;
  const linea = p.lineas.find((l) => t >= l.t0 && t < l.t1);
  if (!linea) return null;
  const y = plano === 'split' ? e.posicionSplit : e.posicionCam;
  const borde = e.borde && e.grosorBorde > 0 ? `${e.grosorBorde}px ${e.borde}` : undefined;
  // La palabra que se está diciendo: la última que ya arrancó.
  let activa = -1;
  linea.palabras.forEach((w, i) => {
    if (t >= w.s) activa = i;
  });
  return (
    <div style={{position: 'absolute', left: 60, right: 60, top: `${y * 100}%`, transform: 'translateY(-50%)', display: 'flex', justifyContent: 'center'}}>
      <div
        style={{
          fontFamily: e.fuente,
          fontWeight: e.peso,
          fontSize: e.tamano,
          lineHeight: 1.1,
          textAlign: 'center',
          color: e.color,
          textTransform: e.mayusculas ? 'uppercase' : 'none',
          WebkitTextStroke: borde,
          paintOrder: 'stroke fill',
          background: e.caja || undefined,
          padding: e.caja ? '10px 22px' : 0,
          borderRadius: e.caja ? 14 : 0,
        }}
      >
        {linea.palabras.map((w, i) => (
          <span key={i} style={{color: e.resaltado && i === activa ? e.resaltado : undefined}}>
            {w.w}
            {i < linea.palabras.length - 1 ? ' ' : ''}
          </span>
        ))}
      </div>
    </div>
  );
};

export const Reel: React.FC<ReelProps> = (p) => {
  const frame = useCurrentFrame();
  const {fps, width: W, height: H} = useVideoConfig();
  const t = frame / fps;
  const e = p.estilo;
  const G: EstiloGraficos = {...GRAFICOS_DEFECTO, ...(e.graficos || {})};
  useFuente([e.subtitulos.fuente, e.hook.fuente, e.cta.fuente, G.fuente]);
  const graficos = p.graficos || [];
  // Cuánto se desenfoca la cámara: lo que pida el gráfico más presente en este momento.
  const desenfoque = Math.max(0, ...graficos.filter((g) => DESENFOCA[g.tipo]).map((g) => envolvente(t, g, G.entrada)));
  const tapa = graficos.some((g) => TAPA[g.tipo] && t >= g.t0 && t < g.t1);

  const plano = planoEn(p.planos, t);
  const z = p.zooms.find((x) => t >= x.t0 && t < x.t1);
  const zoom = z ? z.zoom : 1;
  const mitad = H / 2;
  const enCta = p.cta && t >= p.cta.desde;

  return (
    <AbsoluteFill style={{background: e.split.fondo}}>
      <AbsoluteFill style={desenfoque > 0 ? {filter: `blur(${desenfoque * G.desenfoque}px) brightness(${1 - desenfoque * G.oscurecer})`} : undefined}>
      {plano.plano === 'cam' && <Camara p={p} caja={{left: 0, top: 0, width: W, height: H}} zoom={zoom} />}
      {plano.plano === 'split' && (
        <>
          {plano.broll && <Broll archivo={plano.broll} desde={plano.t} caja={{left: 0, top: 0, width: W, height: mitad}} ajuste={e.split.ajusteBroll} />}
          <Camara p={p} caja={{left: 0, top: mitad, width: W, height: mitad}} zoom={zoom} />
        </>
      )}
      {plano.plano === 'broll' && (
        <>
          {/* la cámara sigue sonando aunque no se vea */}
          <div style={{opacity: 0}}>
            <Camara p={p} caja={{left: 0, top: 0, width: 2, height: 2}} zoom={1} />
          </div>
          {plano.broll && <Broll archivo={plano.broll} desde={plano.t} caja={{left: 0, top: 0, width: W, height: H}} ajuste={e.split.ajusteBroll} />}
        </>
      )}
      </AbsoluteFill>

      <Graficos graficos={graficos} t={t} G={G} W={W} H={H} />

      {p.hook && t >= p.hook.desde && t < p.hook.hasta && (
        <div style={{position: 'absolute', left: 0, right: 0, top: `${e.hook.posicionY * 100}%`, display: 'flex', justifyContent: 'center'}}>
          <div
            style={{
              background: e.hook.fondo,
              color: e.hook.color,
              fontFamily: e.hook.fuente,
              fontWeight: 800,
              fontSize: e.hook.tamano,
              padding: '18px 30px',
              borderRadius: e.hook.borde ? 0 : 18,
              border: e.hook.borde ? `3px solid ${e.hook.borde}` : undefined,
              boxShadow: e.hook.borde ? `0 0 ${50 * G.brillo}px ${hexA(e.hook.borde, 0.5 * G.brillo)}` : undefined,
              maxWidth: W - 140,
              textAlign: 'center',
              lineHeight: 1.1,
            }}
          >
            {p.hook.texto}
          </div>
        </div>
      )}

      {enCta && p.cta ? (
        <div style={{position: 'absolute', left: 40, right: 40, top: `${e.cta.posicionY * 100}%`, transform: 'translateY(-50%)', textAlign: 'center'}}>
          <div style={{fontFamily: e.cta.fuente, fontSize: e.cta.tamano, color: e.cta.color, fontWeight: 800, textShadow: e.cta.color.startsWith('#') ? `0 0 ${40 * G.brillo}px ${hexA(e.cta.color, 0.7 * G.brillo)}, 0 4px 24px rgba(0,0,0,.55)` : '0 4px 24px rgba(0,0,0,.55)'}}>
            {p.cta.texto}
          </div>
        </div>
      ) : (
        !tapa && <Subtitulo p={p} t={t} plano={plano.plano} />
      )}
    </AbsoluteFill>
  );
};
