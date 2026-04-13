import type { CSpellSettings, LocaleId } from '@cspell/cspell-types';
import type { ICSpellConfigFile } from 'cspell-config-lib';
import type { LanguageId } from './fileTypes.js';
import type { SpellingDictionaryCollection, SuggestionResult, SuggestOptions } from './SpellingDictionary/index.js';
export interface WordSuggestion extends SuggestionResult {
    /**
     * The suggested word adjusted to match the original case.
     */
    wordAdjustedToMatchCase?: string;
}
interface SuggestedWordBase extends WordSuggestion {
    /**
     * dictionary names
     */
    dictionaries: string[];
}
export interface SuggestedWord extends SuggestedWordBase {
    noSuggest: boolean;
    forbidden: boolean;
}
export interface SuggestionsForWordResult {
    word: string;
    suggestions: SuggestedWord[];
}
type FromSuggestOptions = Pick<SuggestOptions, 'numChanges' | 'numSuggestions' | 'includeTies'>;
export interface SuggestionOptions extends FromSuggestOptions {
    /**
     * languageId to use when determining file type.
     */
    languageId?: LanguageId | LanguageId[];
    /**
     * Locale to use.
     */
    locale?: LocaleId;
    /**
     * Strict case and accent checking
     * @default true
     */
    strict?: boolean;
    /**
     * List of dictionaries to use. If specified, only that list of dictionaries will be used.
     */
    dictionaries?: string[];
    /**
     * The number of suggestions to make.
     * @default 8
     */
    numSuggestions?: number | undefined;
    /**
     * Max number of changes / edits to the word to get to a suggestion matching suggestion.
     * @default 4
     */
    numChanges?: number | undefined;
    /**
     * If multiple suggestions have the same edit / change "cost", then included them even if
     * it causes more than `numSuggestions` to be returned.
     * @default true
     */
    includeTies?: boolean | undefined;
    /**
     * By default we want to use the default configuration, but there are cases
     * where someone might not want that.
     * @default true
     */
    includeDefaultConfig?: boolean;
}
export declare function suggestionsForWords(words: Iterable<string> | AsyncIterable<string>, options?: SuggestionOptions, settings?: CSpellSettings): AsyncIterable<SuggestionsForWordResult>;
export declare function suggestionsForWord(word: string, options?: SuggestionOptions, settings?: CSpellSettings | ICSpellConfigFile): Promise<SuggestionsForWordResult>;
export declare function calcSuggestionAdjustedToToMatchCase<T extends SuggestionResult>(originalWord: string, sugs: T[], locale: string | string[] | undefined, ignoreCase: boolean, dict: SpellingDictionaryCollection): (T & WordSuggestion)[];
export declare class SuggestionError extends Error {
    readonly code: string;
    constructor(message: string, code: string);
}
export {};
//# sourceMappingURL=suggestions.d.ts.map