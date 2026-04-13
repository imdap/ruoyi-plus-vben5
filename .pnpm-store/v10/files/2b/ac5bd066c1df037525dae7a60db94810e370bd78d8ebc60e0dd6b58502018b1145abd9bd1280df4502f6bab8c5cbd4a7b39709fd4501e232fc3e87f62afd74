import type { SpellingDictionary } from 'cspell-dictionary';
import type { ValidationResult } from '../Models/ValidationResult.js';
import * as TextRange from '../Transform/index.js';
import type { IncludeExcludeOptions, LineSegment, ValidationOptions } from './ValidationTypes.js';
/**
 * @deprecated
 * @deprecation Use spellCheckDocument
 */
export declare function validateText(text: string, dict: SpellingDictionary, options: ValidationOptions): Iterable<ValidationResult>;
export declare function calcTextInclusionRanges(text: string, options: IncludeExcludeOptions): TextRange.MatchRange[];
/**
 * Returns a mapper function that will segment a TextOffset based upon the includeRanges.
 * This function is optimized for forward scanning. It will perform poorly for randomly ordered offsets.
 * @param includeRanges Allowed ranges for words.
 */
export declare function mapLineSegmentAgainstRangesFactory(includeRanges: TextRange.MatchRange[]): (lineSeg: LineSegment) => LineSegment[];
export declare const _testMethods: {
    mapWordsAgainstRanges: typeof mapLineSegmentAgainstRangesFactory;
};
//# sourceMappingURL=textValidator.d.ts.map