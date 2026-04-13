import { getArrowOffsetToken } from "../style/placementArrow.js";
import { BuildInPlacements } from "@v-c/trigger";

//#region src/_util/placements.d.ts
interface AdjustOverflow {
  adjustX?: 0 | 1;
  adjustY?: 0 | 1;
}
interface PlacementsConfig {
  arrowWidth: number;
  arrowPointAtCenter?: boolean;
  autoAdjustOverflow?: boolean | AdjustOverflow;
  offset: number;
  borderRadius: number;
  visibleFirst?: boolean;
}
declare function getOverflowOptions(placement: string, arrowOffset: ReturnType<typeof getArrowOffsetToken>, arrowWidth: number, autoAdjustOverflow?: boolean | AdjustOverflow): {
  adjustX?: boolean | number;
  adjustY?: boolean | number;
  shiftX?: boolean | number;
  shiftY?: boolean | number;
};
declare function getPlacements(config: PlacementsConfig): BuildInPlacements;
//#endregion
export { AdjustOverflow, PlacementsConfig, getPlacements as default, getOverflowOptions };