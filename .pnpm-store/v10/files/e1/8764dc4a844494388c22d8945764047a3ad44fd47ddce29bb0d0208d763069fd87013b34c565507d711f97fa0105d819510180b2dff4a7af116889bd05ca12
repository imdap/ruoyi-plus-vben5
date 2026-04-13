import { satisfiesCSpellConfigFile } from 'cspell-config-lib';
import { genSequence } from 'gensequence';
import { toInternalSettings } from './Settings/CSpellSettingsServer.js';
import { createDictionaryReferenceCollection, finalizeSettings, mergeSettings, resolveConfigFileImports, } from './Settings/index.js';
import { calcSettingsForLanguageId } from './Settings/LanguageSettings.js';
import { getDictionaryInternal, refreshDictionaryCache } from './SpellingDictionary/index.js';
import { traceWord } from './textValidation/traceWord.js';
import { toFilePathOrHref } from './util/url.js';
import * as util from './util/util.js';
export async function traceWords(words, settings, options) {
    const results = await util.asyncIterableToArray(traceWordsAsync(words, settings, options));
    const s = genSequence(results)
        .concatMap((p) => p)
        .toArray();
    return s;
}
export async function* traceWordsAsync(words, settingsOrConfig, options) {
    const { languageId, locale: language, ignoreCase = true, allowCompoundWords, compoundSeparator } = options || {};
    const settings = satisfiesCSpellConfigFile(settingsOrConfig)
        ? await resolveConfigFileImports(settingsOrConfig)
        : settingsOrConfig;
    async function finalize(config) {
        const withLocale = mergeSettings(config, util.clean({
            language: language || config.language,
            allowCompoundWords: allowCompoundWords ?? config.allowCompoundWords,
        }));
        const withLanguageId = calcSettingsForLanguageId(withLocale, languageId ?? withLocale.languageId ?? 'plaintext');
        const settings = finalizeSettings(withLanguageId);
        const rawDictionaryRefs = [
            ...(settings.dictionaries || []),
            ...(settings.dictionaryDefinitions || []).map((d) => d.name),
        ];
        const dictionaryReferenceCollection = createDictionaryReferenceCollection(rawDictionaryRefs);
        const dictionaries = [...dictionaryReferenceCollection.enabled(), ...dictionaryReferenceCollection.blocked()];
        const dictSettings = toInternalSettings({ ...settings, dictionaries });
        const dictBase = await getDictionaryInternal(settings);
        const dicts = await getDictionaryInternal(dictSettings);
        const activeDictionaries = dictBase.dictionaries.map((d) => d.name);
        return {
            activeDictionaries,
            dictionaryReferenceCollection,
            config: settings,
            dicts,
        };
    }
    await refreshDictionaryCache();
    const { activeDictionaries, config, dicts, dictionaryReferenceCollection } = await finalize(settings);
    const setOfActiveDicts = new Set(activeDictionaries);
    const setOfExcludedDicts = new Set(dictionaryReferenceCollection.blocked());
    function processWord(word) {
        const results = traceWord(word, dicts, { ...config, ignoreCase, compoundSeparator });
        const r = results.map((r) => ({
            ...r,
            dictActive: setOfActiveDicts.has(r.dictName),
            dictBlocked: setOfExcludedDicts.has(r.dictName),
            dictSource: toFilePathOrHref(r.dictSource),
            configSource: r.configSource || config.name || '',
            splits: results.splits,
        }));
        const tr = new CTraceResult(...r);
        results.splits && tr.splits.push(...results.splits);
        return tr;
    }
    for await (const word of words) {
        yield processWord(word);
    }
}
class CTraceResult extends Array {
    splits = [];
    constructor(...items) {
        super(...items);
    }
}
//# sourceMappingURL=trace.js.map