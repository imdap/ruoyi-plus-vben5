import type { CSpellSettingsWithSourceTrace } from '@cspell/cspell-types';
export interface ListGlobalImportsResult {
    filename: string;
    name: string | undefined;
    id: string | undefined;
    error: string | undefined;
    dictionaryDefinitions: CSpellSettingsWithSourceTrace['dictionaryDefinitions'];
    languageSettings: CSpellSettingsWithSourceTrace['languageSettings'];
    package: NodePackage | undefined;
}
export interface ListGlobalImportsResults {
    list: ListGlobalImportsResult[];
    globalSettings: CSpellSettingsWithSourceTrace;
}
interface NodePackage {
    name: string | undefined;
    filename: string;
}
export declare function listGlobalImports(): Promise<ListGlobalImportsResults>;
export interface AddPathsToGlobalImportsResults {
    success: boolean;
    resolvedSettings: ResolveSettingsResult[];
    error: string | undefined;
}
export declare function addPathsToGlobalImports(paths: string[]): Promise<AddPathsToGlobalImportsResults>;
export interface RemovePathsFromGlobalImportsResult {
    success: boolean;
    error: string | undefined;
    removed: string[];
}
/**
 * Remove files from the global setting.
 * @param paths match against the partial file path, or package name, or id.
 *   To match against a partial file path, it must match against the subdirectory and filename.
 * Note: for Idempotent reasons, asking to remove a path that is not in the global settings is considered a success.
 *   It is possible to check for this by looking at the returned list of removed paths.
 */
export declare function removePathsFromGlobalImports(paths: string[]): Promise<RemovePathsFromGlobalImportsResult>;
export interface ResolveSettingsResult {
    filename: string;
    resolvedToFilename: string | undefined;
    error?: string;
    settings: CSpellSettingsWithSourceTrace;
}
declare function findPackageForCSpellConfig(pathToConfig: string): NodePackage | undefined;
export declare const __testing__: {
    findPackageForCSpellConfig: typeof findPackageForCSpellConfig;
};
export {};
//# sourceMappingURL=link.d.ts.map