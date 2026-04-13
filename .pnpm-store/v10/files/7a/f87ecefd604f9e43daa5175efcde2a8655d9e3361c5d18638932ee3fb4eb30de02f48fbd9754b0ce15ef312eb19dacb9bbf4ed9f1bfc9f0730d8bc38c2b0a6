import type { MappedText, Range, SourceMap } from '@cspell/cspell-types';
/**
 * Extract a substring from a TextMap.
 * @param textMap - A text range with an optional map
 * @param extractRange - The range in the original document to extract
 * @returns The TextMap covering extractRange
 */
export declare function extractTextMapRangeOrigin(textMap: MappedText, extractRange: Range): MappedText;
export declare function calculateRangeInDest(srcMap: SourceMap | undefined, rangeOrigin: Range): Range;
export declare function calculateRangeInSrc(srcMap: SourceMap | undefined, rangeOrigin: Range): Range;
export declare function calculateTextMapRangeDest(textMap: MappedText, rangeOrigin: Range): Range;
/**
 * Map an offset in the transformed text back to the original text.
 * It will find the first matching position in the map.
 *
 * @param map - The source map to use for the mapping.
 *   If undefined or empty, the input offset is returned, assuming it is a 1:1 mapping.
 * @param offset - the offset in the transformed text to map back to the original text
 */
export declare function mapOffsetToSource(map: SourceMap | undefined, offset: number): number;
/**
 * Map an offset in the original text to the transformed text.
 * It will find the first matching position in the map.
 *
 * @param map - The source map to use for the mapping.
 *   If undefined or empty, the input offset is returned, assuming it is a 1:1 mapping.
 * @param offset - the offset in the original text to map to the transformed text
 */
export declare function mapOffsetToDest(map: SourceMap | undefined, offset: number): number;
interface WithRange {
    readonly range: Range;
}
export declare function doesIntersect(textMap: WithRange, rangeOrigin: Range): boolean;
export {};
//# sourceMappingURL=TextMap.d.ts.map