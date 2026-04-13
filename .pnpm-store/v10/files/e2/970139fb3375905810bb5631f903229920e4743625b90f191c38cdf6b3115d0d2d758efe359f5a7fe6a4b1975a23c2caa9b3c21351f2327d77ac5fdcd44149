import type { MatchResult, MatchSegment } from './types.js';
/**
 * Try to assign group names and numbers to segments of the matching text.
 * Note: this is NOT a perfect match. It tries its best given limited information.
 * For example, it will give back the wrong indexes for the following RegExp and text:
 * `/.+(a(?=p)).+/g.exec('bad apple')`. Group 1 will be the `a` in `bad`, not the `a` in apple.
 * @param mr - match result
 * @returns a list of matching segments in group number order.
 */
export declare function segmentMatch(mr: MatchResult): MatchSegment[];
export declare function createMatchResult(r: RegExpExecArray, lineNumber: number): MatchResult;
export declare function createSimpleMatchResult(match: string, input: string, index: number, lineNumber: number): MatchResult;
//# sourceMappingURL=matchResult.d.ts.map