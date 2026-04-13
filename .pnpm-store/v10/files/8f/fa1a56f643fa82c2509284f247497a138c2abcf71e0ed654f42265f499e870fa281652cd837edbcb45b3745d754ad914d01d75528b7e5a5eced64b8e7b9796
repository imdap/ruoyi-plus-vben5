import { autoCache, extractStats } from '../util/AutoCache.js';
import { canonicalSearchOptions } from './SpellingDictionaryMethods.js';
let dictionaryCounter = 0;
const DefaultAutoCacheSize = 1000;
let logRequests = false;
const log = [];
const startTime = performance.now();
class CachedDict {
    dict;
    options;
    name;
    id = ++dictionaryCounter;
    has;
    #has;
    constructor(dict, options) {
        this.dict = dict;
        this.options = options;
        this.name = dict.name;
        const has = autoCache((word) => this.dict.has(word, this.options), DefaultAutoCacheSize);
        const hasAndLog = (word) => {
            const time = performance.now() - startTime;
            const misses = has.misses;
            const value = has(word);
            if (logRequests) {
                const miss = has.misses > misses;
                log.push({ time, method: 'has', word, value, miss });
            }
            return value;
        };
        this.#has = has;
        this.has = logRequests ? hasAndLog : has;
        // console.log(`CachedDict for ${this.name}`);
    }
    isNoSuggestWord = autoCache((word) => this.dict.isNoSuggestWord(word, this.options), DefaultAutoCacheSize);
    isForbidden = autoCache((word) => this.dict.isForbidden(word), DefaultAutoCacheSize);
    getPreferredSuggestions = autoCache((word) => this.dict.getPreferredSuggestions?.(word), DefaultAutoCacheSize);
    suggest = (word, suggestOptions) => this.dict.suggest(word, suggestOptions);
    stats() {
        return {
            name: this.name,
            id: this.id,
            has: extractStats(this.#has),
            isNoSuggestWord: extractStats(this.isNoSuggestWord),
            isForbidden: extractStats(this.isForbidden),
            getPreferredSuggestions: extractStats(this.getPreferredSuggestions),
        };
    }
}
const knownDicts = new Map();
/**
 * create a caching dictionary
 * @param dict - Dictionary to cache the search results.
 * @param options - Search options to use.
 * @returns CachingDictionary
 */
export function createCachingDictionary(dict, options) {
    options = canonicalSearchOptions(options);
    let knownOptions = knownDicts.get(options);
    if (!knownOptions) {
        knownOptions = new WeakMap();
        knownDicts.set(options, knownOptions);
    }
    const known = knownOptions.get(dict);
    if (known)
        return known;
    const cached = new CachedDict(dict, options);
    knownOptions.set(dict, cached);
    return cached;
}
/**
 * Enable or disable logging of dictionary requests. Every call to `has` will be logged.
 *
 * This should be set prior to creating any caching dictionaries to ensure all requests are logged.
 *
 * @param enabled - optional - if undefined, it will toggle the setting.
 * @returns the current state of logging.
 */
export function dictionaryCacheEnableLogging(enabled = !logRequests) {
    if (enabled && !logRequests) {
        knownDicts.clear();
    }
    logRequests = enabled;
    return logRequests;
}
/**
 * Get the log of dictionary requests.
 * @returns the log
 */
export function dictionaryCacheGetLog() {
    return log;
}
/**
 * Clear the log of dictionary requests.
 */
export function dictionaryCacheClearLog() {
    log.length = 0;
}
//# sourceMappingURL=CachingDictionary.js.map