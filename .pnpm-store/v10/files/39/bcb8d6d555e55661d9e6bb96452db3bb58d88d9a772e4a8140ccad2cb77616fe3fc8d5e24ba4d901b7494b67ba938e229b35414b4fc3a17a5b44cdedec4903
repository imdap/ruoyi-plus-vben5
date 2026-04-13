import { ProgressProps } from "./progress.js";
import { CircleProps } from "./Circle.js";

//#region src/progress/utils.d.ts
declare function validProgress(progress?: number): number;
declare function getSuccessPercent({
  success
}: ProgressProps): number | undefined;
declare function getPercentage({
  percent,
  success
}: ProgressProps): number[];
declare function getStrokeColor({
  success,
  strokeColor
}: Partial<CircleProps>): (string | Record<PropertyKey, string>)[];
declare function getSize(size: ProgressProps['size'], type: ProgressProps['type'] | 'step', extra?: {
  steps?: number;
  strokeWidth?: number;
}): [number, number];
//#endregion
export { getPercentage, getSize, getStrokeColor, getSuccessPercent, validProgress };