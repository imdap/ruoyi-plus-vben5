import type { Range, SourceMap } from '@cspell/cspell-types';
export interface SourceMapCursor {
    /**
     * The source map being traversed.
     */
    readonly sourceMap: SourceMap;
    /**
     * The current index in the source map.
     */
    readonly idx: number;
    /**
     * The base offset in the source text.
     */
    readonly begin0: number;
    /**
     * The base offset in the transformed text.
     */
    readonly begin1: number;
    reset(): void;
    mapOffsetToDest(offsetInSrc: number): number;
    mapOffsetToSrc(offsetInDst: number): number;
    mapRangeToSrc(rangeInDst: Range): Range;
}
declare class SourceMapCursorImpl implements SourceMapCursor {
    sourceMap: SourceMap;
    idx: number;
    begin0: number;
    begin1: number;
    /**
     * The delta in the source
     */
    d0: number;
    /**
     * The delta in the transformed text.
     */
    d1: number;
    /**
     * Indicates whether the current segment is linear (1:1) or non-linear.
     * A linear segment has equal deltas in the source and transformed text,
     * while a non-linear segment has different deltas.
     * It is possible that a non-linear segment has the same deltas,
     * but it is not possible for a linear segment to have different deltas.
     */
    linear: boolean;
    /**
     * indicates that the cursor has reached the end of the source map.
     */
    done: boolean;
    constructor(sourceMap: SourceMap);
    next(): boolean;
    mapOffsetToDest(offsetInSrc: number): number;
    mapOffsetToSrc(offsetInDst: number): number;
    mapRangeToSrc(rangeInDst: Range): Range;
    reset(): void;
}
/**
 * Create a cursor for traversing a source map.
 * @param sourceMap - The source map to create the cursor for. The map must be pairs of values (even, odd).
 * @returns A cursor initialized to the start of the source map. The cursor can be used to traverse the source map and
 *   calculate offsets in the transformed text based on offsets in the source text.
 */
export declare function createSourceMapCursor(sourceMap: SourceMap): SourceMapCursorImpl;
export declare function createSourceMapCursor(sourceMap: SourceMap | undefined): SourceMapCursorImpl | undefined;
/**
 * Calculated the transformed offset in the destination text based on the source map and the offset in the source text.
 * @param cursor - The cursor to use for the mapping. If undefined or empty, the input offset is returned, assuming it is a 1:1 mapping.
 * @param offsetInSrc - the offset in the source text to map to the transformed text. The offset is relative to the start of the text range.
 * @returns The offset in the transformed text corresponding to the input offset in the source text. The offset is relative to the start of the text range.
 */
export declare function calcOffsetInDst(cursor: SourceMapCursor | undefined, offsetInSrc: number): number;
/**
 * Calculated the transformed offset in the source text based on the source map and the offset in the transformed text.
 * @param cursor - The cursor to use for the mapping. If undefined or empty, the input offset is returned, assuming it is a 1:1 mapping.
 * @param offsetInDst - the offset in the transformed text to map to the source text. The offset is relative to the start of the text range.
 * @returns The offset in the source text corresponding to the input offset in the transformed text. The offset is relative to the start of the text range.
 */
export declare function calcOffsetInSrc(cursor: SourceMapCursor | undefined, offsetInDst: number): number;
/**
 * Map offset pairs to a source map. The input map is expected to be pairs of absolute offsets in the source and transformed text.
 * The output map is pairs of lengths.
 * @param map - The input map to convert. The map must be pairs of values (even, odd) where the even values are offsets in the source
 *   text and the odd values are offsets in the transformed text. The offsets are absolute offsets from the start of the text range.
 * @returns a SourceMap
 */
export declare function mapOffsetPairsToSourceMap(map: number[] | undefined): SourceMap | undefined;
/**
 * Merge two source maps into a single source map. The first map transforms from the
 * original text to an intermediate text, and the second map transforms from the intermediate
 * text to the final text. The resulting map represents the transformation directly from the
 * original text to the final text.
 *
 * Concept:
 * [markdown codeblock] -> <first map> -> [JavaScript code] -> <second map> -> [string value]
 *
 * Some kinds of transforms:
 * - markdown code block extraction
 * - unicode normalization
 * - html entity substitution
 * - url decoding
 * - etc.
 *
 * The result of each transform is a {@link SourceMap}. When multiple transforms are applied,
 * the source maps can be merged to create a single map that represents the cumulative effect
 * of all transforms. This is useful for accurately mapping positions in the final transformed
 * text back to their corresponding positions in the original text, which is essential for
 * reporting spelling issues in the correct context.
 *
 * @param first - The first transformation map from the original text to the intermediate.
 * @param second - The second transformation map from the intermediate, to the final text.
 */
export declare function mergeSourceMaps(first: SourceMap | undefined, second: SourceMap | undefined): SourceMap | undefined;
export declare function sliceSourceMapToSourceRange(map: SourceMap | undefined, range: Range): SourceMap | undefined;
export declare function reverseSourceMap(map: SourceMap | undefined): SourceMap | undefined;
export {};
//# sourceMappingURL=SourceMap.d.ts.map