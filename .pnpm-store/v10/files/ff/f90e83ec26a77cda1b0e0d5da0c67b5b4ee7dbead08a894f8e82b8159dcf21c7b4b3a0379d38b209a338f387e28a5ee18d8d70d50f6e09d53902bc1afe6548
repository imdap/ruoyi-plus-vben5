import { mapDictionaryInformationToWeightMap } from 'cspell-trie-lib';
import { isUpperCase, removeUnboundAccents, ucFirst } from '../util/text.js';
export { impersonateCollector, suggestionCollector } from 'cspell-trie-lib';
export const defaultNumSuggestions = 10;
function wordSearchFormsArray(word, isDictionaryCaseSensitive, ignoreCase) {
    return [...wordSearchForms(word, isDictionaryCaseSensitive, ignoreCase)];
}
export function wordSearchForms(word, isDictionaryCaseSensitive, ignoreCase) {
    const forms = new Set();
    word = word.normalize('NFC');
    const wordLc = word.toLowerCase();
    if (ignoreCase) {
        if (isDictionaryCaseSensitive) {
            forms.add(wordLc);
        }
        else {
            forms.add(wordLc);
            // Legacy remove any unbound accents
            forms.add(removeUnboundAccents(wordLc));
        }
    }
    else {
        if (isDictionaryCaseSensitive) {
            forms.add(word);
            forms.add(wordLc);
            // HOUSE -> House, house
            if (isUpperCase(word)) {
                forms.add(ucFirst(wordLc));
            }
        }
        else {
            forms.add(wordLc);
            // Legacy remove any unbound accents
            forms.add(removeUnboundAccents(wordLc));
        }
    }
    return forms;
}
export function wordSuggestFormsArray(word) {
    return [...wordSuggestForms(word)];
}
export function wordSuggestForms(word) {
    word = word.normalize('NFC');
    const forms = new Set([word]);
    const wordLc = word.toLowerCase();
    forms.add(wordLc);
    return forms;
}
const DEFAULT_HAS_OPTIONS = Object.freeze({});
export function hasOptionToSearchOption(opt) {
    return canonicalSearchOptions(!opt ? DEFAULT_HAS_OPTIONS : opt);
}
const canonicalSearchOptionsMap = new Map();
const knownCanonicalOptions = new WeakMap();
/**
 * Find the canonical form for SearchOptions. Useful Maps and WeakMaps.
 * @param opt - options to normalize
 * @returns SearchOptions - the canonical form
 */
export function canonicalSearchOptions(opt) {
    const known = knownCanonicalOptions.get(opt);
    if (known)
        return known;
    const { ignoreCase, useCompounds } = opt;
    const foundLevel1Map = canonicalSearchOptionsMap.get(ignoreCase);
    const useLevel1Map = foundLevel1Map || new Map();
    if (!foundLevel1Map) {
        canonicalSearchOptionsMap.set(ignoreCase, useLevel1Map);
    }
    const foundCanOpts = useLevel1Map.get(useCompounds);
    const canOpts = foundCanOpts || Object.freeze({ ignoreCase, useCompounds });
    if (!foundCanOpts) {
        useLevel1Map.set(useCompounds, canOpts);
    }
    knownCanonicalOptions.set(opt, canOpts);
    return canOpts;
}
export function createWeightMapFromDictionaryInformation(di) {
    return di ? mapDictionaryInformationToWeightMap(di) : undefined;
}
export const __testMethods__ = {
    wordSearchForms,
    wordSearchFormsArray,
};
//# sourceMappingURL=SpellingDictionaryMethods.js.map