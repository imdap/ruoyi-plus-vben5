import { createCollection, createForbiddenWordsDictionary, createIgnoreWordsDictionary, createSpellingDictionary, createSuggestDictionary, } from 'cspell-dictionary';
import { calcDictionaryDefsToLoad } from '../Settings/index.js';
import { isDefined } from '../util/util.js';
import { loadDictionary, refreshCacheEntries } from './DictionaryLoader.js';
export function loadDictionaryDefs(defsToLoad) {
    return defsToLoad.map(loadDictionary);
}
export function refreshDictionaryCache(maxAge) {
    return refreshCacheEntries(maxAge);
}
const emptyWords = Object.freeze([]);
export async function getDictionaryInternal(settings) {
    const spellDictionaries = await Promise.all(loadDictionaryDefs(calcDictionaryDefsToLoad(settings)));
    return _getDictionaryInternal(settings, spellDictionaries);
}
export const specialDictionaryNames = {
    words: '[words]',
    userWords: '[userWords]',
    flagWords: '[flagWords]',
    ignoreWords: '[ignoreWords]',
    suggestWords: '[suggestWords]',
};
export const mapSpecialDictionaryNamesToSettings = new Map(Object.entries(specialDictionaryNames).map(([k, v]) => [v, k]));
export function getInlineConfigDictionaries(settings) {
    const { words = emptyWords, userWords = emptyWords, flagWords = emptyWords, ignoreWords = emptyWords, suggestWords = emptyWords, } = settings;
    const settingsWordsDictionary = createSpellingDictionary(words, specialDictionaryNames.words, 'From Settings `words`', {
        caseSensitive: true,
        weightMap: undefined,
    });
    const settingsUserWordsDictionary = userWords.length
        ? createSpellingDictionary(userWords, specialDictionaryNames.userWords, 'From Settings `userWords`', {
            caseSensitive: true,
            weightMap: undefined,
        })
        : undefined;
    const ignoreWordsDictionary = createIgnoreWordsDictionary(ignoreWords, specialDictionaryNames.ignoreWords, 'From Settings `ignoreWords`');
    const flagWordsDictionary = createForbiddenWordsDictionary(flagWords, specialDictionaryNames.flagWords, 'From Settings `flagWords`');
    const suggestWordsDictionary = createSuggestDictionary(suggestWords, '[suggestWords]', 'From Settings `suggestWords`');
    const dictionaries = [
        settingsWordsDictionary,
        settingsUserWordsDictionary,
        ignoreWordsDictionary,
        flagWordsDictionary,
        suggestWordsDictionary,
    ].filter(isDefined);
    return dictionaries;
}
function _getDictionaryInternal(settings, spellDictionaries) {
    const dictionaries = [...spellDictionaries, ...getInlineConfigDictionaries(settings)];
    return createCollection(dictionaries, 'dictionary collection');
}
//# sourceMappingURL=Dictionaries.js.map