import { CSSProperties } from "vue";

//#region src/watermark/utils.d.ts
/** converting camel-cased strings to be lowercase and link it with Separator */
declare function toLowercaseSeparator(key: string): string;
declare function getStyleStr(style: CSSProperties): string;
/** Returns the ratio of the device's physical pixel resolution to the css pixel resolution */
declare function getPixelRatio(): number;
/** Whether to re-render the watermark */
declare function reRendering(mutation: MutationRecord, isWatermarkEle: (ele: Node, index?: number) => boolean): boolean;
//#endregion
export { getPixelRatio, getStyleStr, reRendering, toLowercaseSeparator };