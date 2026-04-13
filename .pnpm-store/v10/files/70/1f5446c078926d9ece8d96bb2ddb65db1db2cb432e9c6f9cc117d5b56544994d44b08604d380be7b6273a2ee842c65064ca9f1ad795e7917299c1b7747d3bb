import { opAppend, pipe } from '@cspell/cspell-pipe/sync';
import { createAutoResolveWeakCache } from '../util/AutoResolve.js';
import { mapperRemoveCaseAndAccents } from '../util/textMappers.js';
import * as defaults from './defaults.js';
import { processEntriesToTyposDef } from './Typos/index.js';
import { extractAllSuggestions, extractIgnoreValues } from './Typos/util.js';
class TyposDictionaryImpl {
    name;
    source;
    typosDef;
    containsNoSuggestWords;
    options = {};
    type = 'typos';
    size;
    mapWord = undefined;
    ignoreWords;
    /**
     * Note: ignoreWordsLower is only suggestions with the case and accents removed.
     * The logic is that if someone explicity ignored an upper case version, it does not
     * mean that the lower case version is ok.
     */
    suggestions;
    suggestionsLower;
    explicitIgnoreWords;
    constructor(name, source, typosDef, ignoreList) {
        this.name = name;
        this.source = source;
        this.typosDef = typosDef;
        this.size = Object.keys(typosDef).length;
        this.explicitIgnoreWords = extractIgnoreValues(typosDef, '!');
        this.suggestions = extractAllSuggestions(typosDef);
        this.ignoreWords = new Set(pipe(this.explicitIgnoreWords, opAppend(ignoreList || [])));
        this.suggestionsLower = new Set(pipe(this.suggestions, mapperRemoveCaseAndAccents));
        this.containsNoSuggestWords = this.ignoreWords.size > 0;
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
    find(word, options) {
        const result = this._findForms(word, options?.ignoreCase ?? defaults.ignoreCase);
        if (result === false)
            return undefined;
        const { found, ignore } = result;
        return { found, forbidden: !ignore, noSuggest: ignore };
    }
    _findForms(word, ignoreCaseAndAccents) {
        const lcWord = word.toLowerCase();
        if (this.ignoreWords.has(word)) {
            return { found: word, ignore: true };
        }
        if (this.suggestions.has(word)) {
            return false;
        }
        if (ignoreCaseAndAccents) {
            if (this.suggestionsLower.has(lcWord)) {
                return false;
            }
            if (this.ignoreWords.has(lcWord)) {
                return { found: lcWord, ignore: true };
            }
        }
        if (word in this.typosDef)
            return { found: word, ignore: false };
        if (lcWord in this.typosDef)
            return { found: lcWord, ignore: false };
        return false;
    }
    isForbidden(word, ignoreCaseAndAccents = defaults.isForbiddenIgnoreCaseAndAccents) {
        const found = this._findForms(word, ignoreCaseAndAccents);
        return found !== false && !found.ignore;
    }
    isNoSuggestWord(word, options) {
        const result = this.find(word, options);
        return result?.noSuggest ?? false;
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
        const lcWord = word.toLowerCase();
        return ignoreCaseAndAccents && (this.suggestions.has(lcWord) || this.suggestionsLower.has(lcWord));
    }
    suggest(word) {
        return this.getPreferredSuggestions(word);
    }
    _suggest(word) {
        if (this.ignoreWords.has(word))
            return [];
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
    genSuggestions(collector) {
        const sugs = this.suggest(collector.word);
        sugs.forEach((result) => collector.add(result));
    }
    getPreferredSuggestions(word) {
        return this._suggest(word) || this._suggest(word.toLowerCase()) || [];
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
export function createTyposDictionary(entries, name, source) {
    return createCache.get(entries, () => {
        const def = processEntriesToTyposDef(entries);
        return new TyposDictionaryImpl(name, source, def);
    });
}
//# sourceMappingURL=TyposDictionary.js.map