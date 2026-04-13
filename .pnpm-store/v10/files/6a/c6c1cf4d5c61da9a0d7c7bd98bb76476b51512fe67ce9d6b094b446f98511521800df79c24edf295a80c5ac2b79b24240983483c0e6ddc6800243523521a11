import { AggregationColor } from "./color.js";
import { ColorValueFormatType, ColorValueType } from "./interface.js";
import { ColorGenInput } from "@v-c/color-picker";

//#region src/color-picker/util.d.ts
declare function generateColor(color: ColorGenInput<AggregationColor> | Exclude<ColorValueType, null>): AggregationColor;
declare function formatColorValue(color: AggregationColor, valueFormat?: ColorValueFormatType): Exclude<ColorValueType, null>;
declare const getRoundNumber: (value: number) => number;
declare const getColorAlpha: (color: AggregationColor) => number;
/** Return the color whose `alpha` is 1 */
declare function genAlphaColor(color: AggregationColor, alpha?: number): AggregationColor;
/**
 * Get percent position color. e.g. [10%-#fff, 20%-#000], 15% => #888
 */
declare function getGradientPercentColor(colors: {
  percent: number;
  color: string;
}[], percent: number): string;
//#endregion
export { formatColorValue, genAlphaColor, generateColor, getColorAlpha, getGradientPercentColor, getRoundNumber };