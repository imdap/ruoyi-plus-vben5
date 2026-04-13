import type { CompoundWordsMethod, ITrie, SuggestionResult } from 'cspell-trie-lib';
import type { FindResult, HasOptions, IgnoreCaseOption, PreferredSuggestion, SpellingDictionary, SpellingDictionaryOptions } from './SpellingDictionary.js';
import { SpellingDictionaryFromTrie } from './SpellingDictionaryFromTrie.js';
import type { SuggestOptions } from './SuggestOptions.js';
import type { TyposDictionary } from './TyposDictionary.js';
export declare class FlagWordsDictionaryTrie extends SpellingDictionaryFromTrie {
    readonly name: string;
    readonly source: string;
    readonly containsNoSuggestWords = false;
    readonly options: SpellingDictionaryOptions;
    constructor(trie: ITrie, name: string, source: string);
    /**
     * A Forbidden word list does not "have" valid words.
     * Therefore it always returns false.
     * @param _word - the word
     * @param _options - options
     * @returns always false
     */
    has(_word: string, _options?: HasOptions): boolean;
    find(word: string, hasOptions?: HasOptions): FindResult | undefined;
    suggest(word: string, numSuggestions?: number, compoundMethod?: CompoundWordsMethod, numChanges?: number, ignoreCase?: boolean): SuggestionResult[];
    suggest(word: string, suggestOptions: SuggestOptions): SuggestionResult[];
    genSuggestions(): void;
    readonly isDictionaryCaseSensitive: boolean;
    terms(): Iterable<string>;
}
export declare class FlagWordsDictionary implements SpellingDictionary {
    readonly name: string;
    readonly source: string;
    private dictTypos;
    private dictTrie;
    readonly containsNoSuggestWords = false;
    readonly options: SpellingDictionaryOptions;
    readonly type = "flag-words";
    readonly mapWord: undefined;
    constructor(name: string, source: string, dictTypos: TyposDictionary, dictTrie: FlagWordsDictionaryTrie | undefined);
    /**
     * A Forbidden word list does not "have" valid words.
     * Therefore it always returns false.
     * @param word - the word
     * @param options - options
     * @returns always false
     */
    has(word: string, options?: HasOptions): boolean;
    /** A more detailed search for a word, might take longer than `has` */
    find(word: string, options?: HasOptions): FindResult | undefined;
    isForbidden(word: string, ignoreCaseAndAccents?: IgnoreCaseOption): boolean;
    isNoSuggestWord(word: string, options: HasOptions): boolean;
    suggest(word: string, suggestOptions?: SuggestOptions): SuggestionResult[];
    getPreferredSuggestions(word: string): PreferredSuggestion[];
    genSuggestions(): void;
    get size(): number;
    readonly isDictionaryCaseSensitive: boolean;
    getErrors?(): Error[];
    terms(): Iterable<string>;
}
/**
 * Create a dictionary where all words are to be forbidden.
 * @param wordList - list of words
 * @param name
 * @param source
 * @param options
 * @returns SpellingDictionary
 */
export declare function createFlagWordsDictionary(wordList: readonly string[], name: string, source: string): SpellingDictionary;
//# sourceMappingURL=FlagWordsDictionary.d.ts.map