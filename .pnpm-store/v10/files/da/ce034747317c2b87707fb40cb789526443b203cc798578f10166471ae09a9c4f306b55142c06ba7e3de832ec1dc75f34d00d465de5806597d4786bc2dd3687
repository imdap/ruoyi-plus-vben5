import type { CSpellSettingsWithSourceTrace } from '@cspell/cspell-types';
import type { SpellingDictionaryCollection } from '../SpellingDictionary/index.js';
type Href = string;
export interface DictionaryTraceResult {
    /** The word being traced. */
    word: string;
    found: boolean;
    /** The word found. */
    foundWord: string | undefined;
    /** Indicates that the word is flagged. */
    forbidden: boolean;
    /** The would should not show up in suggestions, but is considered correct. */
    noSuggest: boolean;
    /** The name of the dictionary. */
    dictName: string;
    /** The path/href to dictionary file. */
    dictSource: string;
    /** Suggested changes to the word. */
    preferredSuggestions?: string[] | undefined;
    /** href to the config file referencing the dictionary. */
    configSource: Href | undefined;
    /** Errors */
    errors?: Error[] | undefined;
}
export interface WordSplits {
    word: string;
    found: boolean;
}
export interface TraceResult extends Array<DictionaryTraceResult> {
    splits?: readonly WordSplits[];
}
export interface TraceOptions extends Pick<CSpellSettingsWithSourceTrace, 'source' | 'allowCompoundWords'> {
    ignoreCase?: boolean;
    compoundSeparator?: string | undefined;
}
export declare function traceWord(word: string, dictCollection: SpellingDictionaryCollection, config: TraceOptions): TraceResult;
export {};
//# sourceMappingURL=traceWord.d.ts.map