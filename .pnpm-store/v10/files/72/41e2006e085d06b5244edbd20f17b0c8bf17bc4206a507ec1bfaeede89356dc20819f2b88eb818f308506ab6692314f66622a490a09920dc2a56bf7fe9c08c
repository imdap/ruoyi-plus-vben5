import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { resolveFile } from '../../../util/resolveFile.js';
import { resolveFileWithURL, toFilePathOrHref } from '../../../util/url.js';
import * as util from '../../../util/util.js';
import { mapDictDefsToInternal } from '../../internal/index.js';
import { toGlobDef } from './toGlobDef.js';
export function normalizeRawConfig(config) {
    if (typeof config.version === 'number') {
        config.version = config.version.toString();
    }
    if (config.import) {
        config.import = normalizeImport(config.import);
    }
}
export function normalizeDictionaryDefs(settings, settingsFileUrl) {
    const dictionaryDefinitions = mapDictDefsToInternal(settings.dictionaryDefinitions, settingsFileUrl);
    const languageSettings = settings.languageSettings?.map((langSetting) => util.clean({
        ...langSetting,
        dictionaryDefinitions: mapDictDefsToInternal(langSetting.dictionaryDefinitions, settingsFileUrl),
    }));
    return util.clean({
        dictionaryDefinitions,
        languageSettings,
    });
}
export function normalizeOverrides(settings, pathToSettingsFile) {
    const { globRoot = toFilePathOrHref(new URL('.', pathToSettingsFile)) } = settings;
    const overrides = settings.overrides?.map((override) => {
        const filename = toGlobDef(override.filename, globRoot, toFilePathOrHref(pathToSettingsFile));
        const { dictionaryDefinitions, languageSettings } = normalizeDictionaryDefs(override, pathToSettingsFile);
        return util.clean({
            ...override,
            filename,
            dictionaryDefinitions,
            languageSettings: normalizeLanguageSettings(languageSettings),
        });
    });
    return overrides ? { overrides } : {};
}
export async function normalizeReporters(settings, pathToSettingsFile) {
    if (settings.reporters === undefined)
        return {};
    async function resolve(s) {
        if (s === 'default')
            return s;
        const r = await resolveFile(s, pathToSettingsFile);
        if (!r.found) {
            // console.warn('Not found: %o', { filename: s, relativeTo: pathToSettingsFile.href });
            throw new Error(`Not found: "${s}"`);
        }
        return r.filename;
    }
    async function resolveReporter(s) {
        if (typeof s === 'string') {
            return resolve(s);
        }
        if (!Array.isArray(s) || typeof s[0] !== 'string')
            throw new Error('Invalid Reporter');
        // Preserve the shape of Reporter Setting while resolving the reporter file.
        const [r, ...rest] = s;
        return [await resolve(r), ...rest];
    }
    return {
        reporters: await Promise.all(settings.reporters.map(resolveReporter)),
    };
}
export function normalizeLanguageSettings(languageSettings) {
    if (!languageSettings)
        return undefined;
    function fixLocale(s) {
        const { local: locale, ...rest } = s;
        return util.clean({ locale, ...rest });
    }
    return languageSettings.map(fixLocale);
}
export function normalizeGitignoreRoot(settings, pathToSettingsFile) {
    const { gitignoreRoot } = settings;
    if (!gitignoreRoot)
        return {};
    const roots = Array.isArray(gitignoreRoot) ? gitignoreRoot : [gitignoreRoot];
    return {
        gitignoreRoot: roots.map((p) => resolveFilePathToPath(p, pathToSettingsFile)),
    };
}
export function normalizeSettingsGlobs(settings, pathToSettingsFile) {
    const { globRoot } = settings;
    const normalized = {};
    if (settings.ignorePaths) {
        normalized.ignorePaths = toGlobDef(settings.ignorePaths, globRoot, toFilePathOrHref(pathToSettingsFile));
    }
    if (settings.files) {
        normalized.files = toGlobDef(settings.files, globRoot, toFilePathOrHref(pathToSettingsFile));
    }
    return normalized;
}
export function normalizeCacheSettings(settings, pathToSettingsFile) {
    const { cache } = settings;
    if (cache === undefined)
        return {};
    const { cacheLocation } = cache;
    if (cacheLocation === undefined)
        return { cache };
    return { cache: { ...cache, cacheLocation: toFilePathOrHref(resolveFilePath(cacheLocation, pathToSettingsFile)) } };
}
function resolveFilePath(filename, pathToSettingsFile) {
    const cwd = process.cwd();
    return resolveFileWithURL(filename.replace('${cwd}', cwd).replace(/^~/, homedir()), pathToSettingsFile);
}
function resolveFilePathToPath(filename, pathToSettingsFile) {
    const url = resolveFilePath(filename, pathToSettingsFile);
    return url.protocol === 'file:' ? fileURLToPath(url) : url.toString();
}
export function normalizeImport(imports) {
    if (typeof imports === 'string') {
        return [imports];
    }
    if (Array.isArray(imports)) {
        return imports;
    }
    return [];
}
//# sourceMappingURL=normalizeRawSettings.js.map