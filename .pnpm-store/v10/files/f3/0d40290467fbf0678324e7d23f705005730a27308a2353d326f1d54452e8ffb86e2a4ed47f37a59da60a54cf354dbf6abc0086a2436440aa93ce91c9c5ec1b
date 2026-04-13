import type { CSpellSettingsInternal } from './internal/index.js';
export declare const STATIC_DEFAULTS: {
    readonly id: "static_defaults";
    readonly language: "en";
    readonly name: "Static Defaults";
    readonly enabled: true;
    readonly maxNumberOfProblems: 100;
    readonly numSuggestions: 10;
    readonly suggestionsTimeout: 500;
    readonly suggestionNumChanges: 3;
    readonly allowCompoundWords: false;
};
export declare const _defaultSettingsBasis: Readonly<CSpellSettingsInternal>;
export declare const _defaultSettings: Readonly<CSpellSettingsInternal>;
declare class DefaultSettingsLoader {
    settings: CSpellSettingsInternal | undefined;
    pending: Promise<CSpellSettingsInternal> | undefined;
    constructor();
    getDefaultSettingsAsync(useDefaultDictionaries?: boolean): Promise<CSpellSettingsInternal>;
}
export declare const defaultSettingsLoader: DefaultSettingsLoader;
export declare function getDefaultSettings(useDefaultDictionaries?: boolean): Promise<CSpellSettingsInternal>;
export declare function getDefaultBundledSettingsAsync(): Promise<CSpellSettingsInternal>;
export {};
//# sourceMappingURL=DefaultSettings.d.ts.map