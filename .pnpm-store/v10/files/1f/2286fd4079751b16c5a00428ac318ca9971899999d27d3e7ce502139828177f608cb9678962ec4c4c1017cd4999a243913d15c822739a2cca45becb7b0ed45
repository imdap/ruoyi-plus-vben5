import { pipe } from '@cspell/cspell-pipe/sync';
import { createAutoResolveWeakCache } from '../util/AutoResolve.js';
import { mapperRemoveCaseAndAccents } from '../util/textMappers.js';
import * as defaults from './defaults.js';
import { processEntriesToTyposDef } from './Typos/index.js';
import { extractAllSuggestions } from './Typos/util.js';
class SuggestDictionaryImpl {
    name;
    source;
    typosDef;
    containsNoSuggestWords = false;
    options = {};
    type = 'suggest';
    size;
    mapWord = undefined;
    /**
     * Note: ignoreWordsLower is only suggestions with the case and accents removed.
     * The logic is that if someone explicity ignored an upper case version, it does not
     * mean that the lower case version is ok.
     */
    suggestions;
    suggestionsLower;
    constructor(name, source, typosDef) {
        this.name = name;
        this.source = source;
        this.typosDef = typosDef;
        this.size = Object.keys(typosDef).length;
        this.suggestions = extractAllSuggestions(typosDef);
        this.suggestionsLower = new Set(pipe(this.suggestions, mapperRemoveCaseAndAccents));
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
    /** A more detailed search for a word, might take longer than `has` */
    find(_word, _options) {
        return undefined;
    }
    isForbidden(_word, _ignoreCaseAndAccents) {
        return false;
    }
    isNoSuggestWord(_word, _options) {
        return false;
    }
    /**
     * Determine if the word can appear in a list of suggestions.
     * @param word - word
     * @param ignoreCaseAndAccents - ignore case.
     * @returns true if a word is suggested, otherwise false.
     */
    isSuggestedWord(word, ignoreCaseAndAccents = defaults.isForbiddenIgnoreCaseAndAccents) {
        if (this.suggestions.has(word))
            return true;
        if (!ignoreCaseAndAccents)
            return false;
        const lcWord = word.toLowerCase();
        return this.suggestions.has(lcWord) || this.suggestionsLower.has(lcWord);
    }
    suggest(word) {
        return this.getPreferredSuggestions(word);
    }
    _suggest(word) {
        if (!(word in this.typosDef))
            return undefined;
        const sug = this.typosDef[word];
        const isPreferred = true;
        if (!sug)
            return [];
        if (typeof sug === 'string') {
            return [
                {
                    word: sug,
                    cost: 1,
                    isPreferred,
                },
            ];
        }
        return sug.map((word, index) => ({ word, cost: index + 1, isPreferred }));
    }
    getPreferredSuggestions(word) {
        return this._suggest(word) || this._suggest(word.toLowerCase()) || [];
    }
    genSuggestions(collector) {
        const sugs = this.suggest(collector.word);
        sugs.forEach((result) => collector.add(result));
    }
    isDictionaryCaseSensitive = true;
    getErrors() {
        return [];
    }
}
const createCache = createAutoResolveWeakCache();
/**
 * Create a dictionary where all words are to be forbidden.
 * @param entries - list of Typos Entries
 * @param name - name of dictionary
 * @param source - source
 * @returns
 */
export function createSuggestDictionary(entries, name, source) {
    return createCache.get(entries, () => {
        const def = processEntriesToTyposDef(entries);
        return new SuggestDictionaryImpl(name, source, def);
    });
}
//# sourceMappingURL=SuggestDictionary.js.map