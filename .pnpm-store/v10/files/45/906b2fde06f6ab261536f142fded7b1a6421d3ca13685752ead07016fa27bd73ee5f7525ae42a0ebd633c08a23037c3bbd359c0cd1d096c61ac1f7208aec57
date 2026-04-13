import type { TextOffset } from '@cspell/cspell-types';
export type IsValidWordFn = (word: TextOffset) => boolean;
export interface SplitResult {
    /** Original line passed to the split function */
    line: TextOffset;
    /** Starting point of processing - Original offset passed to the split function */
    offset: number;
    /** The span of text that was split */
    text: TextOffset;
    /** The collection of words that `text` was split into */
    words: TextOffsetWithValid[];
    /** the offset at which the split stopped */
    endOffset: number;
}
export interface LineSegment {
    line: TextOffset;
    relStart: number;
    relEnd: number;
}
export interface TextOffsetWithValid extends TextOffset {
    isFound: boolean;
}
export interface SplitOptions extends WordBreakOptions {
}
export declare function split(line: TextOffset, offset: number, isValidWord: IsValidWordFn, options?: SplitOptions): SplitResult;
declare function findNextWordText({ text, offset }: TextOffset): TextOffset;
type BreakPairs = readonly [number, number];
interface PossibleWordBreak {
    /** offset from the start of the string */
    offset: number;
    /**
     * break pairs (start, end)
     * (the characters between the start and end are removed)
     * With a pure break, start === end.
     */
    breaks: BreakPairs[];
}
export type SortedBreaks = PossibleWordBreak[];
interface WordBreakOptions {
    optionalWordBreakCharacters?: string;
}
declare function generateWordBreaks(line: LineSegment, options: WordBreakOptions): SortedBreaks;
export declare const __testing__: {
    generateWordBreaks: typeof generateWordBreaks;
    findNextWordText: typeof findNextWordText;
};
export {};
//# sourceMappingURL=wordSplitter.d.ts.map