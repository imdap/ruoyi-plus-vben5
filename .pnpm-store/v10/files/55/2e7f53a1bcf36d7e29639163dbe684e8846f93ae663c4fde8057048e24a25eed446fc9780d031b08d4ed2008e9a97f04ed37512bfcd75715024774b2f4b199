import { FixedType, StickyOffsets } from '../interface';
export interface FixedInfo {
    fixStart: number | false;
    fixEnd: number | false;
    isSticky: boolean;
    /** `fixed: start` with shadow */
    fixedStartShadow?: boolean;
    /** `fixed: end` with shadow */
    fixedEndShadow?: boolean;
    /** Show the shadow when `scrollLeft` arrive for `fixed: start` */
    offsetFixedStartShadow?: number;
    /** Show the shadow when `scrollLeft` arrive for `fixed: end` */
    offsetFixedEndShadow?: number;
    /** First sticky column `zIndex` will be larger than next */
    zIndex?: number;
    /** First sticky column `zIndex` will be smaller than next */
    zIndexReverse?: number;
}
export declare function getCellFixedInfo(colStart: number, colEnd: number, columns: readonly {
    fixed?: FixedType;
}[], stickyOffsets: StickyOffsets): FixedInfo;
