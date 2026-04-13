import type { CSpellSettings } from '@cspell/cspell-types';
import type { SpellingDictionary, SpellingDictionaryCollection } from 'cspell-dictionary';
import type { CSpellSettingsInternal, DictionaryDefinitionInternal } from '../Settings/index.js';
export declare function loadDictionaryDefs(defsToLoad: DictionaryDefinitionInternal[]): Promise<SpellingDictionary>[];
export declare function refreshDictionaryCache(maxAge?: number): Promise<void>;
export declare function getDictionaryInternal(settings: CSpellSettingsInternal): Promise<SpellingDictionaryCollection>;
export declare const specialDictionaryNames: {
    readonly words: "[words]";
    readonly userWords: "[userWords]";
    readonly flagWords: "[flagWords]";
    readonly ignoreWords: "[ignoreWords]";
    readonly suggestWords: "[suggestWords]";
};
export type DictionaryNameFields = keyof typeof specialDictionaryNames;
export declare const mapSpecialDictionaryNamesToSettings: Map<string, DictionaryNameFields>;
export declare function getInlineConfigDictionaries(settings: CSpellSettings): SpellingDictionary[];
//# sourceMappingURL=Dictionaries.d.ts.map