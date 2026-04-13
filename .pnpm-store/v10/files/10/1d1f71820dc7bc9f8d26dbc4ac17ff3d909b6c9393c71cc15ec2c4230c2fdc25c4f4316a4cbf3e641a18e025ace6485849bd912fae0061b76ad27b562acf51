import type { BaseSetting, CSpellUserSettings, LanguageId, LanguageSetting, LocaleId } from '@cspell/cspell-types';
export type LanguageSettings = LanguageSetting[];
export declare function getDefaultLanguageSettings(): LanguageSettings;
export declare function normalizeLanguageId(langId: LanguageId | LanguageId[]): Set<LanguageId>;
export declare function normalizeLocale(locale: LocaleId | LocaleId[]): Set<LocaleId>;
export declare function normalizeLocaleIntl(locale: LocaleId | LocaleId[]): Set<LocaleId>;
export declare function isLocaleInSet(locale: LocaleId | LocaleId[], setOfLocals: Set<LocaleId>): boolean;
/**
 * Test if a locale should be ok with Intl
 * @param locale - locale string
 * @param strict - case must match
 * @returns true if it matches the standard 2 letter or 4 letter forms.
 */
export declare function isValidLocaleIntlFormat(locale: LocaleId | LocaleId[], strict?: boolean): boolean;
export declare function calcSettingsForLanguage(languageSettings: LanguageSettings, languageId: LanguageId, locale: LocaleId): BaseSetting;
export declare function calcUserSettingsForLanguage(settings: CSpellUserSettings, languageId: string): CSpellUserSettings;
export declare function calcSettingsForLanguageId(baseSettings: CSpellUserSettings, languageId: LanguageId[] | LanguageId): CSpellUserSettings;
//# sourceMappingURL=LanguageSettings.d.ts.map