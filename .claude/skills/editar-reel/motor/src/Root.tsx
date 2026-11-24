import React from 'react';
import {Composition} from 'remotion';
import {Reel, ReelProps} from './Reel';
import {ReelMG, PropsMG} from './ReelMG';
import {ReelMin, PropsMin} from './ReelMin';

export const Root: React.FC = () => (
  <>
    <Composition
      id="Reel"
      component={Reel as unknown as React.FC<Record<string, unknown>>}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={300}
      defaultProps={{} as Record<string, unknown>}
      calculateMetadata={({props}) => {
        const p = props as unknown as ReelProps;
        return {durationInFrames: Math.max(1, Math.round((p.duracion || 10) * 30))};
      }}
    />
    <Composition
      id="ReelMG"
      component={ReelMG as unknown as React.FC<Record<string, unknown>>}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={300}
      defaultProps={{} as Record<string, unknown>}
      calculateMetadata={({props}) => {
        const p = props as unknown as PropsMG;
        return {durationInFrames: Math.max(1, Math.round((p.duracion || 10) * 30))};
      }}
    />
    <Composition
      id="ReelMin"
      component={ReelMin as unknown as React.FC<Record<string, unknown>>}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={300}
      defaultProps={{} as Record<string, unknown>}
      calculateMetadata={({props}) => {
        const p = props as unknown as PropsMin;
        return {durationInFrames: Math.max(1, Math.round((p.duracion || 10) * 30))};
      }}
    />
  </>
);
