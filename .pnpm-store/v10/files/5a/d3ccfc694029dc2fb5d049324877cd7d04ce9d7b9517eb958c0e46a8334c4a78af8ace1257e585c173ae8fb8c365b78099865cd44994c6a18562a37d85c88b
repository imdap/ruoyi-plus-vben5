import type { CSpellSettings } from '@cspell/cspell-types';
import type { CSpellConfigFile, ICSpellConfigFile } from 'cspell-config-lib';
import type { IConfigLoader, SearchForConfigOptions } from './configLoader.js';
import type { PnPSettingsOptional } from './PnPSettings.js';
import type { CSpellSettingsI, CSpellSettingsWST } from './types.js';
export type { CSpellConfigFile, ICSpellConfigFile } from 'cspell-config-lib';
/**
 *
 * @param searchFrom the directory / file to start searching from.
 * @param options - Optional settings including stop location and Yarn PnP configuration.
 * @returns the resulting settings
 */
export declare function searchForConfig(searchFrom: URL | string | undefined, options?: SearchForConfigOptions): Promise<CSpellSettingsI | undefined>;
/**
 * Load a CSpell configuration files.
 * @param file - path or package reference to load.
 * @param pnpSettings - PnP settings
 * @returns normalized CSpellSettings
 */
export declare function loadConfig(file: string, pnpSettings?: PnPSettingsOptional): Promise<CSpellSettingsI>;
/**
 * Resolve the imports in the settings file.
 * @param settings - settings to resolve imports for
 * @param filename - the filename of the settings file, use cwd if not available.
 * @returns
 */
export declare function resolveSettingsImports(settings: CSpellSettings, filename: string | URL): Promise<CSpellSettingsI>;
export declare function readConfigFile(filename: string | URL, relativeTo?: string | URL): Promise<CSpellConfigFile>;
export declare function resolveConfigFileImports(configFile: CSpellConfigFile | ICSpellConfigFile): Promise<CSpellSettingsI>;
/**
 * Might throw if the settings have not yet been loaded.
 * @deprecated use {@link getGlobalSettingsAsync} instead.
 */
export declare function getGlobalSettings(): CSpellSettingsI;
/**
 * Loads and caches the global settings.
 * @returns - global settings
 */
export declare function getGlobalSettingsAsync(): Promise<CSpellSettingsI>;
export declare function getCachedFileSize(): number;
export declare function clearCachedSettingsFiles(): void;
export declare function getDefaultConfigLoader(): IConfigLoader;
export declare function readRawSettings(filename: string | URL, relativeTo?: string | URL): Promise<CSpellSettingsWST>;
//# sourceMappingURL=defaultConfigLoader.d.ts.map