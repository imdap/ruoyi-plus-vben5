import { AutoResolveCache, createAutoResolveCache, createAutoResolveWeakCache } from '../util/AutoResolve.js';
import { doSetsIntersect } from '../util/util.js';
import * as SpellSettings from './CSpellSettingsServer.js';
const defaultLocale = 'en';
const defaultLanguageSettings = [];
export function getDefaultLanguageSettings() {
    return defaultLanguageSettings;
}
function localesToList(locales) {
    return stringToList(locales.replaceAll(/\s+/g, ','));
}
function stringToList(sList) {
    return sList
        .replaceAll(/[|;]/g, ',')
        .split(',')
        .map((s) => s.trim())
        .filter((s) => !!s);
}
function memoize(resolver) {
    const cache = createAutoResolveCache();
    return (k) => cache.get(k, resolver);
}
const _normalizeLanguageId = memoize(__normalizeLanguageId);
function __normalizeLanguageId(langId) {
    const langIds = stringToList(langId);
    return new Set(langIds.map((a) => a.toLowerCase()));
}
export function normalizeLanguageId(langId) {
    return _normalizeLanguageId(typeof langId === 'string' ? langId : langId.join(','));
}
const _normalizeLocale = memoize(__normalizeLocale);
function __normalizeLocale(locale) {
    const locales = localesToList(locale);
    return new Set(locales.map((locale) => locale.toLowerCase().replaceAll(/[^a-z]/g, '')));
}
export function normalizeLocale(locale) {
    locale = typeof locale === 'string' ? locale : locale.join(',');
    return _normalizeLocale(locale);
}
export function normalizeLocaleIntl(locale) {
    const values = [...normalizeLocale(locale)].map((locale) => locale.replace(/^([a-z]{2})-?([a-z]{2})$/, (_, lang, locale) => locale ? `${lang}-${locale.toUpperCase()}` : lang));
    return new Set(values);
}
export function isLocaleInSet(locale, setOfLocals) {
    const locales = normalizeLocale(locale);
    return doSetsIntersect(locales, setOfLocals);
}
const regExpValidIntlLocaleStrict = /^[a-z]{2}(-[A-Z]{2})?$/;
const regExpValidIntlLocale = new RegExp(regExpValidIntlLocaleStrict, 'i');
/**
 * Test if a locale should be ok with Intl
 * @param locale - locale string
 * @param strict - case must match
 * @returns true if it matches the standard 2 letter or 4 letter forms.
 */
export function isValidLocaleIntlFormat(locale, strict = false) {
    if (typeof locale === 'string')
        return strict ? regExpValidIntlLocaleStrict.test(locale) : regExpValidIntlLocale.test(locale);
    for (const item of locale) {
        if (!isValidLocaleIntlFormat(item, strict))
            return false;
    }
    return locale.length > 0;
}
const cacheCalcSettingsForLanguage = createAutoResolveWeakCache();
export function calcSettingsForLanguage(languageSettings, languageId, locale) {
    return cacheCalcSettingsForLanguage
        .get(languageSettings, () => new AutoResolveCache())
        .get(languageId, () => new AutoResolveCache())
        .get(locale, () => _calcSettingsForLanguage(languageSettings, languageId, locale));
}
function _calcSettingsForLanguage(languageSettings, languageId, locale) {
    languageId = languageId.toLowerCase();
    const allowedLocals = normalizeLocale(locale);
    const ls = languageSettings
        .filter((s) => doesLanguageSettingMatchLanguageId(s, languageId))
        .filter((s) => !s.locale || s.locale === '*' || isLocaleInSet(s.locale, allowedLocals))
        .map((langSetting) => {
        const { languageId: _languageId, locale: _locale, ...s } = langSetting;
        return s;
    })
        .reduce((langSetting, setting) => SpellSettings.mergeSettings(langSetting, setting), {});
    ls.languageId = languageId;
    ls.locale = locale;
    return ls;
}
const cacheDoesLanguageSettingMatchLanguageId = createAutoResolveWeakCache();
function doesLanguageSettingMatchLanguageId(s, languageId) {
    return cacheDoesLanguageSettingMatchLanguageId
        .get(s, () => new AutoResolveCache())
        .get(languageId, () => _doesLanguageSettingMatchLanguageId(s, languageId));
}
function _doesLanguageSettingMatchLanguageId(s, languageId) {
    const languageSettingsLanguageIds = s.languageId;
    if (!languageSettingsLanguageIds || languageSettingsLanguageIds === '*')
        return true;
    const ids = normalizeLanguageId(languageSettingsLanguageIds);
    if (ids.has(languageId))
        return true;
    if (ids.has('!' + languageId))
        return false;
    const numExcludes = [...ids].filter((id) => id.startsWith('!')).length;
    return numExcludes === ids.size;
}
export function calcUserSettingsForLanguage(settings, languageId) {
    const { languageSettings = [], language: locale = defaultLocale, allowCompoundWords, enabled } = settings;
    const langSettings = {
        allowCompoundWords,
        enabled,
        ...calcSettingsForLanguage(languageSettings, languageId, locale),
    };
    return SpellSettings.mergeSettings(settings, langSettings);
}
export function calcSettingsForLanguageId(baseSettings, languageId) {
    const langIds = ['*', ...normalizeLanguageId(languageId)];
    const langSettings = langIds.reduce((settings, languageId) => {
        return calcUserSettingsForLanguage(settings, languageId);
    }, baseSettings);
    return langSettings;
}
//# sourceMappingURL=LanguageSettings.js.map