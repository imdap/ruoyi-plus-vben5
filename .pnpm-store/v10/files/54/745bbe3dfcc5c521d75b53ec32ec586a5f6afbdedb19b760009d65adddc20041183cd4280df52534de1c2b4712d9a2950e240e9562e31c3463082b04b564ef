import { parseDictionary, parseDictionaryLines } from 'cspell-trie-lib';
import { createAutoResolveWeakCache } from '../util/AutoResolve.js';
import * as Defaults from './defaults.js';
import { defaultOptions } from './SpellingDictionary.js';
import { SpellingDictionaryFromTrie } from './SpellingDictionaryFromTrie.js';
import { createTyposDictionary } from './TyposDictionary.js';
export class FlagWordsDictionaryTrie extends SpellingDictionaryFromTrie {
    name;
    source;
    containsNoSuggestWords = false;
    options = {};
    constructor(trie, name, source) {
        super(trie, name, defaultOptions, source);
        this.name = name;
        this.source = source;
    }
    /**
     * A Forbidden word list does not "have" valid words.
     * Therefore it always returns false.
     * @param _word - the word
     * @param _options - options
     * @returns always false
     */
    has(_word, _options) {
        return false;
    }
    find(word, hasOptions) {
        const f = super.find(word, hasOptions);
        if (!f || !f.forbidden)
            return undefined;
        return f;
    }
    suggest() {
        return [];
    }
    genSuggestions() {
        return;
    }
    isDictionaryCaseSensitive = true;
    terms() {
        return this.trie.words();
    }
}
export class FlagWordsDictionary {
    name;
    source;
    dictTypos;
    dictTrie;
    containsNoSuggestWords = false;
    options = {};
    type = 'flag-words';
    mapWord = undefined;
    constructor(name, source, dictTypos, dictTrie) {
        this.name = name;
        this.source = source;
        this.dictTypos = dictTypos;
        this.dictTrie = dictTrie;
    }
    /**
     * A Forbidden word list does not "have" valid words.
     * Therefore it always returns false.
     * @param word - the word
     * @param options - options
     * @returns always false
     */
    has(word, options) {
        return this.dictTypos.has(word, options) || this.dictTrie?.has(word, options) || false;
    }
    /** A more detailed search for a word, might take longer than `has` */
    find(word, options) {
        const findTypos = this.dictTypos.find(word, options);
        if (findTypos)
            return findTypos;
        const ignoreCase = options?.ignoreCase ?? Defaults.ignoreCase;
        if (this.dictTypos.isSuggestedWord(word, ignoreCase))
            return undefined;
        return this.dictTrie?.find(word, options);
    }
    isForbidden(word, ignoreCaseAndAccents = Defaults.isForbiddenIgnoreCaseAndAccents) {
        const findResult = this.find(word, { ignoreCase: ignoreCaseAndAccents });
        return findResult?.forbidden || false;
    }
    isNoSuggestWord(word, options) {
        return this.dictTrie?.isNoSuggestWord(word, options) || this.dictTypos.isNoSuggestWord(word, options);
    }
    suggest(word, suggestOptions = {}) {
        return this.dictTypos.suggest(word, suggestOptions);
    }
    getPreferredSuggestions(word) {
        return this.dictTypos.getPreferredSuggestions(word);
    }
    genSuggestions() {
        return;
    }
    get size() {
        return this.dictTypos.size + (this.dictTrie?.size || 0);
    }
    isDictionaryCaseSensitive = true;
    getErrors() {
        return [];
    }
    *terms() {
        if (this.dictTrie) {
            yield* this.dictTrie.terms();
            return;
        }
        return;
    }
}
const createCache = createAutoResolveWeakCache();
/**
 * Create a dictionary where all words are to be forbidden.
 * @param wordList - list of words
 * @param name
 * @param source
 * @param options
 * @returns SpellingDictionary
 */
export function createFlagWordsDictionary(wordList, name, source) {
    return createCache.get(wordList, () => {
        const testSpecialCharacters = /[~*+]/;
        const { t: specialWords, f: typoWords } = bisect(parseDictionaryLines(wordList, { stripCaseAndAccents: false }), (line) => testSpecialCharacters.test(line));
        const trie = parseDictionary(specialWords, { stripCaseAndAccents: false, makeWordsForbidden: true });
        const trieDict = new FlagWordsDictionaryTrie(trie, name, source);
        const typosDict = createTyposDictionary(typoWords, name, source);
        if (!specialWords.size)
            return typosDict;
        return new FlagWordsDictionary(name, source, typosDict, trieDict);
    });
}
function bisect(values, predicate) {
    const t = new Set();
    const f = new Set();
    for (const v of values) {
        if (predicate(v)) {
            t.add(v);
        }
        else {
            f.add(v);
        }
    }
    return { t, f };
}
//# sourceMappingURL=FlagWordsDictionary.js.map