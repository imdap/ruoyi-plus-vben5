import type { Feature, SuggestionResult } from './entities.js';
/**
 * Comparison function to return the best (highest score) results first.
 * @param a Result A
 * @param b Result B
 */
export declare function compareResults(a: SuggestionResult, b: SuggestionResult): number;
export declare function wordToFeatures(word: string): FeatureMap;
export declare function mergeFeatures(map: FeatureMap, features: Feature[]): void;
export declare function wordToSingleLetterFeatures(word: string): Feature[];
export declare function wordToTwoLetterFeatures(word: string): Feature[];
export declare function segmentString(s: string, segLen: number): string[];
export declare class FeatureMap extends Map<string, number> {
    private _count;
    constructor();
    get count(): number;
    append(features: Feature[]): this;
    correlationScore(m: FeatureMap): number;
    intersectionScore(m: FeatureMap): number;
}
//# sourceMappingURL=helpers.d.ts.map