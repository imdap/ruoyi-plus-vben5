import { CSpellConfigFileInMemory, CSpellConfigFileJson } from 'cspell-config-lib';
import { toFileURL } from 'cspell-io';
import { getSourceDirectoryUrl, toFilePathOrHref } from '../util/url.js';
import { GlobalConfigStore } from './cfgStore.js';
import { configToRawSettings } from './Controller/configLoader/configToRawSettings.js';
const globalConfig = new GlobalConfigStore();
export async function getRawGlobalSettings() {
    return configToRawSettings(await getGlobalConfig());
}
export async function getGlobalConfig() {
    const name = 'CSpell Configstore';
    const configPath = getGlobalConfigPath();
    let urlGlobal = configPath ? toFileURL(configPath) : new URL('global-config.json', getSourceDirectoryUrl());
    const source = {
        name,
        filename: toFilePathOrHref(urlGlobal),
    };
    const globalConf = { source };
    let hasGlobalConfig = false;
    const found = await globalConfig.readConfigFile();
    if (found && found.config && found.filename) {
        const cfg = found.config;
        urlGlobal = toFileURL(found.filename);
        // Only populate globalConf is there are values.
        if (cfg && Object.keys(cfg).length) {
            Object.assign(globalConf, cfg);
            globalConf.source = {
                name,
                filename: found.filename,
            };
            hasGlobalConfig = Object.keys(cfg).length > 0;
        }
    }
    const settings = { ...globalConf, name, source };
    const ConfigFile = hasGlobalConfig ? CSpellConfigFileJson : CSpellConfigFileInMemory;
    return new ConfigFile(urlGlobal, settings);
}
export async function writeRawGlobalSettings(settings) {
    const toWrite = {
        import: settings.import,
    };
    await globalConfig.writeConfigFile(toWrite);
}
export function getGlobalConfigPath() {
    try {
        return globalConfig.location || GlobalConfigStore.defaultLocation;
    }
    catch {
        return undefined;
    }
}
//# sourceMappingURL=GlobalSettings.js.map