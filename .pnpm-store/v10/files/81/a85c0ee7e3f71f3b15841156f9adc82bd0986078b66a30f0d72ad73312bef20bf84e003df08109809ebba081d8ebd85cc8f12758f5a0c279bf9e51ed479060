import type { CSpellUserSettings, GlobDef, LanguageSetting } from '@cspell/cspell-types';
import type { OptionalOrUndefined, RemoveUndefined } from '../../../util/types.js';
interface NormalizableFields {
    version?: string | number;
    import?: string | string[];
}
export declare function normalizeRawConfig(config: CSpellUserSettings | NormalizableFields): void;
type NormalizeDictionaryDefsParams = OptionalOrUndefined<Pick<CSpellUserSettings, 'dictionaryDefinitions' | 'languageSettings'>>;
export declare function normalizeDictionaryDefs(settings: NormalizeDictionaryDefsParams, settingsFileUrl: URL): RemoveUndefined<NormalizeDictionaryDefsParams>;
type NormalizeOverrides = Pick<CSpellUserSettings, 'globRoot' | 'overrides'>;
type NormalizeOverridesResult = Pick<CSpellUserSettings, 'overrides'>;
export declare function normalizeOverrides(settings: NormalizeOverrides, pathToSettingsFile: URL): NormalizeOverridesResult;
type NormalizeReporters = Pick<CSpellUserSettings, 'reporters'>;
export declare function normalizeReporters(settings: NormalizeReporters, pathToSettingsFile: URL): Promise<NormalizeReporters>;
export declare function normalizeLanguageSettings(languageSettings: LanguageSetting[] | undefined): LanguageSetting[] | undefined;
type NormalizeGitignoreRoot = Pick<CSpellUserSettings, 'gitignoreRoot'>;
export declare function normalizeGitignoreRoot(settings: NormalizeGitignoreRoot, pathToSettingsFile: URL): NormalizeGitignoreRoot;
interface NormalizeSettingsGlobs {
    files?: CSpellUserSettings['files'];
    globRoot?: CSpellUserSettings['globRoot'];
    ignorePaths?: CSpellUserSettings['ignorePaths'];
}
interface NormalizeSettingsGlobsResult {
    ignorePaths?: GlobDef[];
    files?: GlobDef[];
}
export declare function normalizeSettingsGlobs(settings: NormalizeSettingsGlobs, pathToSettingsFile: URL): NormalizeSettingsGlobsResult;
export declare function normalizeCacheSettings(settings: Pick<CSpellUserSettings, 'cache'>, pathToSettingsFile: URL): Pick<CSpellUserSettings, 'cache'>;
export declare function normalizeImport(imports: string | string[] | undefined): string[];
export {};
//# sourceMappingURL=normalizeRawSettings.d.ts.map