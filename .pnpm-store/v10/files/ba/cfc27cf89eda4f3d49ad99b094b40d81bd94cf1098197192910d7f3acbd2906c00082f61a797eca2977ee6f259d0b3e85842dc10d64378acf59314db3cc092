import { GlobalToken } from "../../theme/interface/cssinjs-utils.js";
import "../../theme/internal.js";

//#region src/_util/wave/interface.d.ts
declare const TARGET_CLS = "ant-wave-target";
type WaveComponent = 'Tag' | 'Button' | 'Checkbox' | 'Radio' | 'Switch' | 'Steps';
type WaveColorSource = 'color' | 'backgroundColor' | 'borderColor' | null;
type ShowWaveEffect = (element: HTMLElement, info: {
  className: string;
  token: GlobalToken;
  component?: WaveComponent;
  colorSource?: WaveColorSource;
  event: MouseEvent;
  hashId: string;
}) => void;
type ShowWave = (event: MouseEvent) => void;
//#endregion
export { ShowWave, ShowWaveEffect, TARGET_CLS, WaveColorSource, WaveComponent };