import type { DictionaryInformation } from '@cspell/cspell-types';
import type { SuggestionResult, WeightMap } from 'cspell-trie-lib';
import type { HasOptions, SearchOptions } from './SpellingDictionary.js';
export { impersonateCollector, suggestionCollector } from 'cspell-trie-lib';
export type FilterSuggestionsPredicate = (word: SuggestionResult) => boolean;
export declare const defaultNumSuggestions = 10;
declare function wordSearchFormsArray(word: string, isDictionaryCaseSensitive: boolean, ignoreCase: boolean): string[];
export declare function wordSearchForms(word: string, isDictionaryCaseSensitive: boolean, ignoreCase: boolean): Set<string>;
export declare function wordSuggestFormsArray(word: string): string[];
export declare function wordSuggestForms(word: string): Set<string>;
export declare function hasOptionToSearchOption(opt: HasOptions | undefined): SearchOptions;
/**
 * Find the canonical form for SearchOptions. Useful Maps and WeakMaps.
 * @param opt - options to normalize
 * @returns SearchOptions - the canonical form
 */
export declare function canonicalSearchOptions(opt: SearchOptions): SearchOptions;
export declare function createWeightMapFromDictionaryInformation(di: undefined): undefined;
export declare function createWeightMapFromDictionaryInformation(di: DictionaryInformation): WeightMap;
export declare function createWeightMapFromDictionaryInformation(di: DictionaryInformation | undefined): WeightMap | undefined;
export declare const __testMethods__: {
    wordSearchForms: typeof wordSearchForms;
    wordSearchFormsArray: typeof wordSearchFormsArray;
};
//# sourceMappingURL=SpellingDictionaryMethods.d.ts.map