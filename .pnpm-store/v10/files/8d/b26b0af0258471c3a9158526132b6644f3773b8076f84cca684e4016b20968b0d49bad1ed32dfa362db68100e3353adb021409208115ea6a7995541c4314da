import type { SuggestionResult } from 'cspell-trie-lib';
import type { CacheStats } from '../util/AutoCache.js';
import type { PreferredSuggestion, SearchOptions, SpellingDictionary } from './SpellingDictionary.js';
import type { SpellingDictionaryCollection } from './SpellingDictionaryCollection.js';
import type { SuggestOptionsRO } from './SuggestOptions.js';
interface CallStats {
    name: string;
    id: number;
    has: CacheStats;
    isNoSuggestWord: CacheStats;
    isForbidden: CacheStats;
    getPreferredSuggestions: CacheStats;
}
/**
 * Caching Dictionary remembers method calls to increase performance.
 */
export interface CachingDictionary {
    name: string;
    id: number;
    has(word: string): boolean;
    isNoSuggestWord(word: string): boolean;
    isForbidden(word: string): boolean;
    stats(): CallStats;
    getPreferredSuggestions(word: string): PreferredSuggestion[] | undefined;
    suggest(word: string, suggestOptions?: SuggestOptionsRO): SuggestionResult[];
}
interface LogEntryBase extends SearchOptions {
    time: number;
    method: 'has';
    word: string;
    value?: unknown;
}
interface LogEntryHas extends LogEntryBase {
    method: 'has';
    value: boolean;
    miss: boolean;
}
export type LogEntry = LogEntryHas;
/**
 * create a caching dictionary
 * @param dict - Dictionary to cache the search results.
 * @param options - Search options to use.
 * @returns CachingDictionary
 */
export declare function createCachingDictionary(dict: SpellingDictionary | SpellingDictionaryCollection, options: SearchOptions): CachingDictionary;
/**
 * Enable or disable logging of dictionary requests. Every call to `has` will be logged.
 *
 * This should be set prior to creating any caching dictionaries to ensure all requests are logged.
 *
 * @param enabled - optional - if undefined, it will toggle the setting.
 * @returns the current state of logging.
 */
export declare function dictionaryCacheEnableLogging(enabled?: boolean): boolean;
/**
 * Get the log of dictionary requests.
 * @returns the log
 */
export declare function dictionaryCacheGetLog(): readonly Readonly<LogEntryBase>[];
/**
 * Clear the log of dictionary requests.
 */
export declare function dictionaryCacheClearLog(): void;
export {};
//# sourceMappingURL=CachingDictionary.d.ts.map