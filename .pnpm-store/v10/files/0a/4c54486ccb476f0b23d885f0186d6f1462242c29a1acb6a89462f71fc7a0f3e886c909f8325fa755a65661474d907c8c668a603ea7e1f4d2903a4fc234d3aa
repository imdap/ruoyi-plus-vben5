import type { MappedText, SourceMap } from '@cspell/cspell-types';
import type { ValidationIssue } from '../Models/ValidationIssue.js';
import type * as TextRange from './TextRange.js';
import type { SimpleRange } from './types.js';
export declare function mapIssueBackToOriginalPos(mappedText: MappedText, issue: ValidationIssue): ValidationIssue;
export declare function mapRangeBackToOriginalPos(offRange: SimpleRange, map: SourceMap | undefined): SimpleRange;
export declare function mapRangeToLocal(rangeOrig: SimpleRange, map: SourceMap | undefined): SimpleRange;
/**
 * Factory to create a segmentation function that will segment MappedText against a set of includeRanges.
 * The function produced is optimized for forward scanning. It will perform poorly for randomly ordered offsets.
 * @param includeRanges Allowed ranges for words.
 */
export declare function createMappedTextSegmenter(includeRanges: TextRange.MatchRange[]): (text: MappedText) => Iterable<MappedText>;
//# sourceMappingURL=parsedText.d.ts.map