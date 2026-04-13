import { opFilter, opMap, pipe } from '@cspell/cspell-pipe/sync';
import { parseDictionaryLines } from 'cspell-trie-lib';
import { createAutoResolveWeakCache } from '../util/AutoResolve.js';
import { createSpellingDictionary } from './createSpellingDictionary.js';
import * as Defaults from './defaults.js';
const NormalizeForm = 'NFC';
class IgnoreWordsDictionary {
    name;
    source;
    dict;
    dictNonStrict;
    containsNoSuggestWords = true;
    options = {};
    type = 'ignore';
    mapWord = undefined;
    constructor(name, source, words) {
        this.name = name;
        this.source = source;
        this.dict = new Set(words);
        this.dictNonStrict = new Set(pipe(this.dict, opFilter((w) => w.startsWith('~')), opMap((w) => w.slice(1))));
    }
    /**
     * A Forbidden word list does not "have" valid words.
     * Therefore it always returns false.
     * @param _word - the word
     * @param _options - options
     * @returns always false
     */
    has(word, options) {
        const nWord = word.normalize(NormalizeForm);
        if (this.dict.has(nWord))
            return true;
        const lcWord = nWord.toLowerCase();
        if (this.dict.has(lcWord))
            return true;
        const ignoreCase = options?.ignoreCase ?? Defaults.ignoreCase;
        return ignoreCase && (this.dictNonStrict.has(nWord) || this.dictNonStrict.has(lcWord));
    }
    /** A more detailed search for a word, might take longer than `has` */
    find(word, options) {
        const nWord = word.normalize(NormalizeForm);
        if (this.dict.has(nWord))
            return { found: nWord, forbidden: false, noSuggest: true };
        const lcWord = nWord.toLowerCase();
        if (this.dict.has(lcWord))
            return { found: lcWord, forbidden: false, noSuggest: true };
        const ignoreCase = options?.ignoreCase ?? Defaults.ignoreCase;
        if (!ignoreCase)
            return undefined;
        if (this.dictNonStrict.has(nWord))
            return { found: nWord, forbidden: false, noSuggest: true };
        return (this.dictNonStrict.has(lcWord) && { found: lcWord, forbidden: false, noSuggest: true }) || undefined;
    }
    isForbidden(_word, _ignoreCase) {
        return false;
    }
    isNoSuggestWord(word, options) {
        return this.has(word, options);
    }
    suggest() {
        return [];
    }
    genSuggestions() {
        return;
    }
    get size() {
        return this.dict.size;
    }
    isDictionaryCaseSensitive = true;
    getErrors() {
        return [];
    }
}
const createCache = createAutoResolveWeakCache();
/**
 * Create a dictionary where all words are to be ignored.
 * Ignored words override forbidden words.
 * @param wordList - list of words
 * @param name - name of dictionary
 * @param source - dictionary source
 * @returns
 */
export function createIgnoreWordsDictionary(wordList, name, source, options) {
    return createCache.get(wordList, () => {
        const testSpecialCharacters = /[*+]/;
        const parseOptions = { stripCaseAndAccents: options?.supportNonStrictSearches ?? true };
        const words = [...parseDictionaryLines(wordList, parseOptions)].map((w) => w.normalize(NormalizeForm));
        const hasSpecial = words.some((word) => testSpecialCharacters.test(word));
        if (hasSpecial) {
            return createSpellingDictionary(words, name, source, {
                caseSensitive: true,
                noSuggest: true,
                weightMap: undefined,
                supportNonStrictSearches: true,
            });
        }
        return new IgnoreWordsDictionary(name, source, words);
    });
}
//# sourceMappingURL=IgnoreWordsDictionary.js.map