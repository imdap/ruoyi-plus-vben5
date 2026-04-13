import assert from 'node:assert';
import { satisfiesCSpellConfigFile } from 'cspell-config-lib';
import { finalizeSettings, getDefaultSettings, getGlobalSettingsAsync, mergeSettings, resolveConfigFileImports, } from './Settings/index.js';
import { calcSettingsForLanguageId, isValidLocaleIntlFormat, normalizeLocaleIntl, } from './Settings/LanguageSettings.js';
import { getDictionaryInternal, refreshDictionaryCache } from './SpellingDictionary/index.js';
import { createAutoResolveCache } from './util/AutoResolve.js';
import { memoizeLastCall } from './util/memoizeLastCall.js';
import * as util from './util/util.js';
const emptySuggestionOptions = Object.freeze({});
const emptyCSpellSettings = Object.freeze({});
export async function* suggestionsForWords(words, options, settings) {
    const cspellSettings = satisfiesCSpellConfigFile(settings) ? await resolveConfigFileImports(settings) : settings;
    for await (const word of words) {
        yield await suggestionsForWord(word, options, cspellSettings);
    }
}
const memoizeSuggestions = memoizeLastCall(cacheSuggestionsForWord);
function cacheSuggestionsForWord(options, settings) {
    const cache = createAutoResolveCache();
    return (word) => cache.get(word, (word) => _suggestionsForWord(word, options, settings));
}
export async function suggestionsForWord(word, options = emptySuggestionOptions, settings = emptyCSpellSettings) {
    const cspellSettings = satisfiesCSpellConfigFile(settings) ? await resolveConfigFileImports(settings) : settings;
    return memoizeSuggestions(options, cspellSettings)(word);
}
async function _suggestionsForWord(word, options, settings) {
    const { languageId, locale: language, includeDefaultConfig = true, dictionaries } = options;
    async function determineDictionaries(config) {
        const withLocale = mergeSettings(config, util.clean({
            language: language || config.language,
            // dictionaries: dictionaries?.length ? dictionaries : config.dictionaries,
        }));
        const withLanguageId = calcSettingsForLanguageId(withLocale, languageId ?? withLocale.languageId ?? 'plaintext');
        const settings = finalizeSettings(withLanguageId);
        settings.dictionaries = dictionaries?.length ? dictionaries : settings.dictionaries || [];
        validateDictionaries(settings, dictionaries);
        const dictionaryCollection = await getDictionaryInternal(settings);
        settings.dictionaries = settings.dictionaryDefinitions?.map((def) => def.name) || [];
        const allDictionaryCollection = await getDictionaryInternal(settings);
        return {
            dictionaryCollection,
            allDictionaryCollection,
        };
    }
    await refreshDictionaryCache();
    const config = includeDefaultConfig
        ? mergeSettings(await getDefaultSettings(settings.loadDefaultConfiguration ?? true), await getGlobalSettingsAsync(), settings)
        : settings;
    const { dictionaryCollection, allDictionaryCollection } = await determineDictionaries(config);
    return _suggestionsForWordAsync(word, options, settings, dictionaryCollection, allDictionaryCollection);
}
async function _suggestionsForWordAsync(word, options, settings, dictionaryCollection, allDictionaryCollection) {
    const extendsDictionaryCollection = allDictionaryCollection || dictionaryCollection;
    const { locale: language, strict = true, numChanges = 4, numSuggestions = 8, includeTies = true, includeDefaultConfig = true, } = options;
    const ignoreCase = !strict;
    const config = includeDefaultConfig
        ? mergeSettings(await getDefaultSettings(settings.loadDefaultConfiguration ?? true), await getGlobalSettingsAsync(), settings)
        : settings;
    const opts = { ignoreCase, numChanges, numSuggestions, includeTies };
    const suggestionsByDictionary = dictionaryCollection.dictionaries.flatMap((dict) => dict.suggest(word, opts).map((r) => ({ ...r, dictName: dict.name })));
    const locale = adjustLocale(language || config.language || undefined);
    const collator = Intl.Collator(locale);
    const combined = limitResults(combine(suggestionsByDictionary.sort((a, b) => a.cost - b.cost || collator.compare(a.word, b.word))), numSuggestions, includeTies);
    const sugsAdjusted = calcSuggestionAdjustedToToMatchCase(word, combined, locale, ignoreCase, extendsDictionaryCollection);
    const allSugs = sugsAdjusted.map((sug) => {
        const found = extendsDictionaryCollection.find(sug.word);
        return {
            ...sug,
            forbidden: found?.forbidden || false,
            noSuggest: found?.noSuggest || false,
        };
    });
    return {
        word,
        suggestions: limitResults(allSugs, numSuggestions, includeTies),
    };
}
function combine(suggestions) {
    const words = new Map();
    for (const sug of suggestions) {
        const { word, cost, dictName, ...rest } = sug;
        const f = words.get(word) || { word, cost, ...rest, dictionaries: [] };
        f.cost = Math.min(f.cost, cost);
        f.dictionaries.push(dictName);
        f.dictionaries.sort();
        words.set(word, f);
    }
    return [...words.values()];
}
function adjustLocale(locale) {
    if (!locale)
        return undefined;
    const locales = [...normalizeLocaleIntl(locale)].filter((locale) => isValidLocaleIntlFormat(locale));
    if (!locales.length)
        return undefined;
    if (locales.length === 1)
        return locales[0];
    return locales;
}
export function calcSuggestionAdjustedToToMatchCase(originalWord, sugs, locale, ignoreCase, dict) {
    locale = adjustLocale(locale);
    const knownSugs = new Set(sugs.map((sug) => sug.word));
    const matchStyle = { ...analyzeCase(originalWord), locale, ignoreCase };
    /* Add adjusted words */
    return sugs.map((sug) => {
        const alt = matchCase(sug.word, !!sug.isPreferred, matchStyle);
        if (alt === sug.word || knownSugs.has(alt))
            return sug;
        const found = dict.find(alt);
        if (!found || !found.forbidden || !found.noSuggest) {
            knownSugs.add(alt);
            return { ...sug, wordAdjustedToMatchCase: alt };
        }
        return sug;
    });
}
function limitResults(suggestions, numSuggestions, includeTies) {
    let cost = suggestions[0]?.cost;
    let i = 0;
    for (; i < suggestions.length; ++i) {
        if (i >= numSuggestions && (!includeTies || suggestions[i].cost > cost)) {
            break;
        }
        cost = suggestions[i].cost;
    }
    return suggestions.slice(0, i);
}
function validateDictionaries(settings, dictionaries) {
    if (!dictionaries?.length)
        return;
    const knownDicts = new Set(settings.dictionaryDefinitions?.map((def) => def.name) || []);
    for (const dict of dictionaries) {
        if (!knownDicts.has(dict)) {
            throw new SuggestionError(`Unknown dictionary: "${dict}"`, 'E_dictionary_unknown');
        }
    }
}
function matchCase(word, isPreferred, style) {
    const locale = style.locale;
    if (style.isMixedCaps) {
        /**
         * Do not try matching mixed caps.
         */
        return word;
    }
    if (hasCaps(word)) {
        if (style.isAllCaps)
            return word.toLocaleUpperCase(locale);
        if (!style.ignoreCase || style.hasCaps || isPreferred)
            return word;
        if (isTitleCase(word) || isAllCaps(word))
            return word.toLocaleLowerCase(locale);
        return word;
    }
    if (!style.hasCaps)
        return word;
    if (style.isAllCaps)
        return word.toLocaleUpperCase(locale);
    assert(style.isTitleCase);
    return word.replace(/^\p{L}/u, (firstLetter) => firstLetter.toLocaleUpperCase(locale));
}
const regExpHasCaps = /\p{Lu}/u;
const regExpIsAllCaps = /^[\P{L}\p{Lu}]+$/u;
const regExpIsTitleCase = /^\p{Lu}[\P{L}\p{Ll}]+$/u;
function analyzeCase(word) {
    const hasCaps = regExpHasCaps.test(word);
    const isAllCaps = hasCaps && regExpIsAllCaps.test(word);
    const isTitleCase = hasCaps && !isAllCaps && regExpIsTitleCase.test(word);
    const isMixedCaps = hasCaps && !isAllCaps && !isTitleCase;
    return { hasCaps, isAllCaps, isMixedCaps, isTitleCase };
}
function hasCaps(word) {
    return regExpHasCaps.test(word);
}
function isTitleCase(word) {
    return regExpIsTitleCase.test(word);
}
function isAllCaps(word) {
    return regExpIsAllCaps.test(word);
}
export class SuggestionError extends Error {
    code;
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
//# sourceMappingURL=suggestions.js.map