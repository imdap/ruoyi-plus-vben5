import type { IterableLike } from '../util/IterableLike.js';
import type { DictionaryInfo, SpellingDictionary, SpellingDictionaryOptions } from './SpellingDictionary.js';
/**
 * Create a SpellingDictionary
 * @param wordList - list of words
 * @param name - name of dictionary
 * @param source - filename or uri
 * @param options - dictionary options
 * @returns a Spelling Dictionary
 */
export declare function createSpellingDictionary(wordList: readonly string[] | IterableLike<string>, name: string, source: string, options?: SpellingDictionaryOptions | undefined, disableSuggestionsHandling?: boolean): SpellingDictionary;
export interface SpellingDictionaryLoadError extends Error {
    /** The Error Name */
    readonly name: string;
    /** Possible Cause */
    readonly cause?: Error | undefined;
    /** Message to Display */
    readonly message: string;
    /** Dictionary Information */
    readonly info: DictionaryInfo;
}
export declare function createFailedToLoadDictionary(name: string, sourceUrl: URL | string, error: Error, options?: SpellingDictionaryOptions | undefined): SpellingDictionary;
//# sourceMappingURL=createSpellingDictionary.d.ts.map