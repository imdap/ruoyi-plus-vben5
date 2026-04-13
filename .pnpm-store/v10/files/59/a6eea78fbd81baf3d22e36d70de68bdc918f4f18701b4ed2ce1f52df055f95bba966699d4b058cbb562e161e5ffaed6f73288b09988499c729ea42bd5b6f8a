import { CSSProperties, ComputedRef, Ref } from "vue";

//#region src/watermark/useWatermark.d.ts
/**
 * Base size of the canvas, 1 for parallel layout and 2 for alternate layout
 * Only alternate layout is currently supported
 */
declare const BaseSize = 2;
declare const FontGap = 3;
type AppendWatermark = (base64Url: string, markWidth: number, container: HTMLElement) => void;
declare function useWatermark(markStyle: Ref<CSSProperties>, onRemove?: ComputedRef<(() => void) | undefined>): [appendWatermark: AppendWatermark, removeWatermark: (container: HTMLElement) => void, isWatermarkEle: (ele: Node, index?: number) => boolean];
//#endregion
export { AppendWatermark, BaseSize, FontGap, useWatermark as default };