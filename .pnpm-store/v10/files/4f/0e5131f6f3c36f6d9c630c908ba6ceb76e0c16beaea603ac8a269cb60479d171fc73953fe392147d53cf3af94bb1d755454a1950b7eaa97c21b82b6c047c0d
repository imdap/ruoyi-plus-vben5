/**
 * A range of text in a document.
 * The range is inclusive of the startPos and exclusive of the endPos.
 */
export interface MatchRange {
    startPos: number;
    endPos: number;
}
export interface MatchRangeWithText extends MatchRange {
    text: string;
}
export interface MatchRangeOptionalText extends MatchRange {
    text?: string;
}
export declare function findMatchingRanges(pattern: RegExp, text: string): MatchRangeOptionalText[];
export declare function unionRanges(ranges: MatchRange[]): SortedMatchRangeArray;
export declare function findMatchingRangesForPatterns(patterns: RegExp[], text: string): MatchRange[];
/**
 * Create a new set of positions that have the excluded position ranges removed.
 */
export declare function excludeRanges(includeRanges: MatchRange[], excludeRanges: MatchRange[]): MatchRange[];
export declare function extractRangeText(text: string, ranges: MatchRange[]): MatchRangeWithText[];
interface SortedMatchRangeArray {
    values: MatchRange[];
}
export {};
//# sourceMappingURL=TextRange.d.ts.map