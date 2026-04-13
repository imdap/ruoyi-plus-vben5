import type { IgnoreCaseOption, PreferredSuggestion, SpellingDictionary } from './SpellingDictionary.js';
import type { TypoEntry, TyposDef } from './Typos/index.js';
export interface TyposDictionary extends SpellingDictionary {
    getPreferredSuggestions: (word: string) => PreferredSuggestion[];
    isForbidden(word: string, ignoreCaseAndAccents?: IgnoreCaseOption): boolean;
    /**
     * Determine if the word can appear in a list of suggestions.
     * @param word - word
     * @param ignoreCaseAndAccents - ignore case.
     * @returns true if a word is suggested, otherwise false.
     */
    isSuggestedWord(word: string, ignoreCaseAndAccents?: IgnoreCaseOption): boolean;
}
/**
 * Create a dictionary where all words are to be forbidden.
 * @param entries - list of Typos Entries
 * @param name - name of dictionary
 * @param source - source
 * @returns
 */
export declare function createTyposDictionary(entries: readonly string[] | TyposDef | Iterable<TypoEntry>, name: string, source: string): TyposDictionary;
//# sourceMappingURL=TyposDictionary.d.ts.map