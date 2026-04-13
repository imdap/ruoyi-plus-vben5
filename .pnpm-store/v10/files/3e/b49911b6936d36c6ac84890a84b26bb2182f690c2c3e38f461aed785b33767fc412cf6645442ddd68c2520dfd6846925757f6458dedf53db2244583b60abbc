import { CASE_INSENSITIVE_PREFIX, CompoundWordsMethod } from 'cspell-trie-lib';
import { isDefined } from '../util/util.js';
import * as Defaults from './defaults.js';
import { defaultNumSuggestions, hasOptionToSearchOption, suggestionCollector } from './SpellingDictionaryMethods.js';
class SpellingDictionaryCollectionImpl {
    dictionaries;
    name;
    options = { weightMap: undefined };
    mapWord = undefined;
    type = 'SpellingDictionaryCollection';
    source;
    isDictionaryCaseSensitive;
    containsNoSuggestWords;
    constructor(dictionaries, name, source) {
        this.dictionaries = dictionaries;
        this.name = name;
        this.dictionaries = this.dictionaries.sort((a, b) => b.size - a.size);
        this.source = source || dictionaries.map((d) => d.name).join(', ');
        this.isDictionaryCaseSensitive = this.dictionaries.reduce((a, b) => a || b.isDictionaryCaseSensitive, false);
        this.containsNoSuggestWords = this.dictionaries.reduce((a, b) => a || b.containsNoSuggestWords, false);
    }
    has(word, hasOptions) {
        const options = hasOptionToSearchOption(hasOptions);
        return !!isWordInAnyDictionary(this.dictionaries, word, options) && !this.isForbidden(word);
    }
    find(word, hasOptions) {
        const options = hasOptionToSearchOption(hasOptions);
        return findInAnyDictionary(this.dictionaries, word, options);
    }
    isNoSuggestWord(word, options) {
        return this._isNoSuggestWord(word, options);
    }
    isForbidden(word, ignoreCaseAndAccents) {
        const ignoreCase = ignoreCaseAndAccents ?? Defaults.isForbiddenIgnoreCaseAndAccents;
        return !!this._isForbiddenInDict(word, ignoreCase) && !this.isNoSuggestWord(word, { ignoreCase });
    }
    suggest(word, suggestOptions = {}) {
        return this._suggest(word, suggestOptions);
    }
    _suggest(word, suggestOptions) {
        const { numSuggestions = defaultNumSuggestions, numChanges, ignoreCase, includeTies, timeout } = suggestOptions;
        const prefixNoCase = CASE_INSENSITIVE_PREFIX;
        const filter = (word, _cost) => {
            return ((ignoreCase || word[0] !== prefixNoCase) &&
                !this.isForbidden(word) &&
                !this.isNoSuggestWord(word, suggestOptions));
        };
        const collectorOptions = {
            numSuggestions,
            filter,
            changeLimit: numChanges,
            includeTies,
            ignoreCase,
            timeout,
        };
        const collector = suggestionCollector(word, collectorOptions);
        this.genSuggestions(collector, suggestOptions);
        return collector.suggestions;
    }
    get size() {
        return this.dictionaries.reduce((a, b) => a + b.size, 0);
    }
    getPreferredSuggestions(word) {
        const sugs = this.dictionaries.flatMap((dict) => dict.getPreferredSuggestions?.(word)).filter(isDefined);
        if (sugs.length <= 1)
            return sugs;
        const unique = new Set();
        return sugs.filter((sug) => {
            if (unique.has(sug.word))
                return false;
            unique.add(sug.word);
            return true;
        });
    }
    genSuggestions(collector, suggestOptions) {
        const _suggestOptions = { ...suggestOptions };
        const { compoundMethod = CompoundWordsMethod.SEPARATE_WORDS } = suggestOptions;
        _suggestOptions.compoundMethod = this.options.useCompounds ? CompoundWordsMethod.JOIN_WORDS : compoundMethod;
        this.dictionaries.forEach((dict) => dict.genSuggestions(collector, _suggestOptions));
    }
    getErrors() {
        return this.dictionaries.reduce((errors, dict) => [...errors, ...(dict.getErrors?.() || [])], []);
    }
    _isForbiddenInDict(word, ignoreCase) {
        return isWordForbiddenInAnyDictionary(this.dictionaries, word, ignoreCase);
    }
    _isNoSuggestWord = (word, options) => {
        if (!this.containsNoSuggestWords)
            return false;
        return !!isNoSuggestWordInAnyDictionary(this.dictionaries, word, options || {});
    };
}
export function createCollection(dictionaries, name, source) {
    return new SpellingDictionaryCollectionImpl(dictionaries, name, source);
}
function isWordInAnyDictionary(dicts, word, options) {
    return dicts.find((dict) => dict.has(word, options));
}
function findInAnyDictionary(dicts, word, options) {
    const found = dicts.map((dict) => dict.find(word, options)).filter(isDefined);
    if (!found.length)
        return undefined;
    return found.reduce((a, b) => ({
        found: a.forbidden ? a.found : b.forbidden ? b.found : a.found || b.found,
        forbidden: a.forbidden || b.forbidden,
        noSuggest: a.noSuggest || b.noSuggest,
    }));
}
function isNoSuggestWordInAnyDictionary(dicts, word, options) {
    return dicts.find((dict) => dict.isNoSuggestWord(word, options));
}
function isWordForbiddenInAnyDictionary(dicts, word, ignoreCase) {
    return dicts.find((dict) => dict.isForbidden(word, ignoreCase));
}
export function isSpellingDictionaryCollection(dict) {
    return dict instanceof SpellingDictionaryCollectionImpl;
}
export const __testing__ = {
    isWordInAnyDictionary,
    isWordForbiddenInAnyDictionary,
};
//# sourceMappingURL=SpellingDictionaryCollection.js.map