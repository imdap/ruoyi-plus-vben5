import { toFilePathOrHref } from '../../../util/url.js';
import { normalizeImport, normalizeRawConfig } from './normalizeRawSettings.js';
export function configErrorToRawSettings(error, url) {
    const filename = toFilePathOrHref(url);
    const fileRef = { filename, error };
    const source = { name: filename, filename };
    return { __importRef: fileRef, source };
}
export function configToRawSettings(cfgFile) {
    if (!cfgFile)
        return {};
    const url = cfgFile.url;
    const filename = toFilePathOrHref(url);
    const fileRef = {
        filename,
        error: undefined,
    };
    const source = {
        name: cfgFile.settings.name || filename,
        filename: cfgFile.virtual ? undefined : filename,
    };
    const rawSettings = { ...cfgFile.settings };
    rawSettings.import = normalizeImport(rawSettings.import);
    normalizeRawConfig(rawSettings);
    rawSettings.source = source;
    // in virtual config files are ignored for the purposes of import history.
    if (!cfgFile.virtual) {
        rawSettings.__importRef = fileRef;
    }
    const id = rawSettings.id || urlToSimpleId(url);
    const name = rawSettings.name || id;
    rawSettings.id = id;
    rawSettings.name = cfgFile.settings.name || name;
    return rawSettings;
}
function urlToSimpleId(url) {
    return url.pathname.split('/').slice(-2).join('/');
}
//# sourceMappingURL=configToRawSettings.js.map