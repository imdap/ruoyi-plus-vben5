import type { AdvancedCSpellSettingsWithSourceTrace, CSpellSettings, ImportFileRef } from '@cspell/cspell-types';
import type { OptionalOrUndefined } from '../util/types.js';
import type { CSpellSettingsInternal, CSpellSettingsInternalFinalized } from './internal/index.js';
type CSpellSettingsWST = AdvancedCSpellSettingsWithSourceTrace;
export type CSpellSettingsWSTO = OptionalOrUndefined<AdvancedCSpellSettingsWithSourceTrace>;
export type CSpellSettingsI = CSpellSettingsInternal;
export { stats as getMergeStats } from './mergeList.js';
declare function mergeObjects(left: undefined, right: undefined): undefined;
declare function mergeObjects<T>(left: T, right: undefined): T;
declare function mergeObjects<T>(left: T, right: T): T;
declare function mergeObjects<T>(left: undefined, right: T): T;
export declare function toCSpellSettingsWithSourceTrace(settings: CSpellSettingsWSTO | CSpellSettingsI): CSpellSettingsWSTO;
export declare function toCSpellSettingsWithOutSourceTrace(settings: CSpellSettingsWSTO | CSpellSettingsI): CSpellSettings;
export declare function mergeSettings(left: CSpellSettingsWSTO | CSpellSettingsI, ...settings: (CSpellSettingsWSTO | CSpellSettingsI | undefined)[]): CSpellSettingsI;
export declare function mergeInDocSettings(left: CSpellSettingsWSTO, ...rest: CSpellSettingsWSTO[]): CSpellSettingsWST;
/**
 *
 * @param settings - settings to finalize
 * @returns settings where all globs and file paths have been resolved.
 */
export declare function finalizeSettings(settings: CSpellSettingsWSTO | CSpellSettingsI): CSpellSettingsInternalFinalized;
export declare function toInternalSettings(settings: undefined): undefined;
export declare function toInternalSettings(settings: CSpellSettingsI | CSpellSettingsWSTO): CSpellSettingsI;
export declare function toInternalSettings(settings?: CSpellSettingsI | CSpellSettingsWSTO): CSpellSettingsI | undefined;
/**
 * Return a list of Setting Sources used to create this Setting.
 * @param settings the settings to search
 */
export declare function getSources(settings: CSpellSettingsWSTO): CSpellSettingsWSTO[];
export interface ImportFileRefWithError extends ImportFileRef {
    error: Error;
}
export interface ConfigurationDependencies {
    configFiles: string[];
    dictionaryFiles: string[];
}
export declare function extractDependencies(settings: CSpellSettingsWSTO | CSpellSettingsI): ConfigurationDependencies;
export declare const __testing__: {
    mergeObjects: typeof mergeObjects;
};
//# sourceMappingURL=CSpellSettingsServer.d.ts.map