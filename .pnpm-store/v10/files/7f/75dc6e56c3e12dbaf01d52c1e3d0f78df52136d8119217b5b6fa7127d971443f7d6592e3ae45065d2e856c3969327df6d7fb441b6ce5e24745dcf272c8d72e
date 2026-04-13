import { toError } from '../../../util/errors.js';
import { toFileUrl } from '../../../util/url.js';
import { getDefaultConfigLoaderInternal } from './configLoader.js';
import { configErrorToRawSettings, configToRawSettings } from './configToRawSettings.js';
const gcl = getDefaultConfigLoaderInternal;
/**
 *
 * @param searchFrom the directory / file to start searching from.
 * @param options - Optional settings including stop location and Yarn PnP configuration.
 * @returns the resulting settings
 */
export function searchForConfig(searchFrom, options) {
    return gcl().searchForConfig(searchFrom, options);
}
/**
 * Load a CSpell configuration files.
 * @param file - path or package reference to load.
 * @param pnpSettings - PnP settings
 * @returns normalized CSpellSettings
 */
export async function loadConfig(file, pnpSettings) {
    return gcl().readSettingsAsync(file, undefined, pnpSettings);
}
/**
 * Resolve the imports in the settings file.
 * @param settings - settings to resolve imports for
 * @param filename - the filename of the settings file, use cwd if not available.
 * @returns
 */
export async function resolveSettingsImports(settings, filename) {
    return gcl().resolveSettingsImports(settings, filename);
}
export async function readConfigFile(filename, relativeTo) {
    const result = await gcl().readConfigFile(filename, relativeTo);
    if (result instanceof Error) {
        throw result;
    }
    return result;
}
export async function resolveConfigFileImports(configFile) {
    return gcl().mergeConfigFileWithImports(configFile, configFile.settings);
}
/**
 * Might throw if the settings have not yet been loaded.
 * @deprecated use {@link getGlobalSettingsAsync} instead.
 */
export function getGlobalSettings() {
    return gcl().getGlobalSettings();
}
/**
 * Loads and caches the global settings.
 * @returns - global settings
 */
export function getGlobalSettingsAsync() {
    return gcl().getGlobalSettingsAsync();
}
export function getCachedFileSize() {
    return cachedFiles().size;
}
export function clearCachedSettingsFiles() {
    return gcl().clearCachedSettingsFiles();
}
export function getDefaultConfigLoader() {
    return getDefaultConfigLoaderInternal();
}
function cachedFiles() {
    return gcl()._cachedFiles;
}
export async function readRawSettings(filename, relativeTo) {
    try {
        const cfg = await readConfigFile(filename, relativeTo);
        return configToRawSettings(cfg);
    }
    catch (e) {
        return configErrorToRawSettings(toError(e), toFileUrl(filename));
    }
}
//# sourceMappingURL=defaultConfigLoader.js.map