import { ColorGenInput, Colors } from "./interface.js";
import * as _ant_design_fast_color0 from "@ant-design/fast-color";

//#region src/color-picker/color.d.ts
declare function toHexFormat(value?: string, alpha?: boolean): string;
declare const getHex: (value?: string, alpha?: boolean) => string;
type GradientColor = {
  color: AggregationColor;
  percent: number;
}[];
declare class AggregationColor {
  /** Original Color object */
  private metaColor;
  private colors;
  cleared: boolean;
  constructor(color: ColorGenInput<AggregationColor> | Colors<AggregationColor>);
  toHsb(): {
    b: number;
    a: number;
    h: number;
    s: number;
  };
  toHsbString(): string;
  toHex(): string;
  toHexString(): string;
  toRgb(): _ant_design_fast_color0.RGB;
  toRgbString(): string;
  isGradient(): boolean;
  getColors(): GradientColor;
  toCssString(): string;
  equals(color: AggregationColor | null): boolean;
}
//#endregion
export { AggregationColor, GradientColor, getHex, toHexFormat };