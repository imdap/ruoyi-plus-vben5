import { fileURLToPath } from 'node:url';
import { buildITrieFromWords, parseDictionaryLines } from 'cspell-trie-lib';
import { deepEqual } from 'fast-equals';
import { measurePerf } from '../util/performance.js';
import { AutoWeakCache, SimpleCache } from '../util/simpleCache.js';
import { defaultOptions } from './SpellingDictionary.js';
import { SpellingDictionaryFromTrie } from './SpellingDictionaryFromTrie.js';
import { createWeightMapFromDictionaryInformation } from './SpellingDictionaryMethods.js';
const cachedDictionaries = new AutoWeakCache(_createSpellingDictionary, 64);
const maxSetSize = 3;
const cachedParamsByWordList = new SimpleCache(64);
/**
 * Create a SpellingDictionary
 * @param wordList - list of words
 * @param name - name of dictionary
 * @param source - filename or uri
 * @param options - dictionary options
 * @returns a Spelling Dictionary
 */
export function createSpellingDictionary(wordList, name, source, options, disableSuggestionsHandling) {
    const params = [
        wordList,
        name,
        source.toString(),
        options,
        disableSuggestionsHandling,
    ];
    if (!Array.isArray(wordList)) {
        return _createSpellingDictionary(params);
    }
    const cached = cachedParamsByWordList.get(name) || new Set();
    for (const cachedParams of cached) {
        if (deepEqual(params, cachedParams)) {
            return cachedDictionaries.get(cachedParams);
        }
    }
    if (cached.size > maxSetSize)
        cached.clear();
    cached.add(params);
    cachedParamsByWordList.set(name, cached);
    return cachedDictionaries.get(params);
}
function _createSpellingDictionary(params) {
    const n = ''; // ':' + params[1]; // Add name to perf name for easier debugging.
    const endPerf = measurePerf('createSpellingDictionary' + n);
    const [wordList, name, source, options, disableSuggestionHandling = false] = params;
    // console.log(`createSpellingDictionary ${name} ${source}`);
    const parseOptions = { stripCaseAndAccents: options?.supportNonStrictSearches ?? true, disableSuggestionHandling };
    const words = parseDictionaryLines(wordList, parseOptions);
    const trie = buildITrieFromWords(words);
    const opts = { ...(options || defaultOptions) };
    if (opts.weightMap === undefined && opts.dictionaryInformation) {
        opts.weightMap = createWeightMapFromDictionaryInformation(opts.dictionaryInformation);
    }
    const d = new SpellingDictionaryFromTrie(trie, name, opts, source);
    endPerf();
    return d;
}
export function createFailedToLoadDictionary(name, sourceUrl, error, options) {
    const sourceHref = typeof sourceUrl === 'string' ? sourceUrl : sourceUrl.href;
    const source = sourceHref.startsWith('file:') ? fileURLToPath(sourceUrl) : sourceHref;
    options = options || {};
    return {
        name,
        source,
        type: 'error',
        containsNoSuggestWords: false,
        has: () => false,
        find: () => undefined,
        isNoSuggestWord: () => false,
        isForbidden: () => false,
        suggest: () => [],
        mapWord: undefined,
        genSuggestions: () => {
            return;
        },
        size: 0,
        options,
        isDictionaryCaseSensitive: false,
        getErrors: () => [error],
    };
}
//# sourceMappingURL=createSpellingDictionary.js.map