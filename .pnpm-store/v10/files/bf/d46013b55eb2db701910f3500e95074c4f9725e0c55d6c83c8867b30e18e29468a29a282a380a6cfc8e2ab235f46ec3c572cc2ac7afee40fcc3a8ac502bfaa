import * as fs from 'node:fs';
import * as Path from 'node:path';
import { toError } from '../util/errors.js';
import { clean } from '../util/util.js';
import { readRawSettings } from './Controller/configLoader/index.js';
import { getRawGlobalSettings, writeRawGlobalSettings } from './GlobalSettings.js';
export async function listGlobalImports() {
    const globalSettings = await getRawGlobalSettings();
    const list = (await resolveImports(globalSettings)).map(({ filename, settings, error }) => ({
        filename,
        error,
        id: settings.id,
        name: settings.name,
        dictionaryDefinitions: settings.dictionaryDefinitions,
        languageSettings: settings.languageSettings,
        package: findPackageForCSpellConfig(Path.dirname(filename)),
    }));
    return {
        list,
        globalSettings,
    };
}
function isString(s) {
    return s !== undefined;
}
export async function addPathsToGlobalImports(paths) {
    const resolvedSettings = await Promise.all(paths.map(resolveSettings));
    const hasError = resolvedSettings.some((r) => !!r.error);
    if (hasError) {
        return {
            success: false,
            resolvedSettings,
            error: 'Unable to resolve files.',
        };
    }
    const rawGlobalSettings = await getRawGlobalSettings();
    const resolvedImports = await resolveImports(rawGlobalSettings);
    const imports = new Set(resolvedImports.map((r) => r.resolvedToFilename || r.filename));
    resolvedSettings
        .map((s) => s.resolvedToFilename)
        .filter(isString)
        .reduce((imports, s) => imports.add(s), imports);
    const globalSettings = {
        import: [...imports],
    };
    let error;
    try {
        await writeRawGlobalSettings(globalSettings);
    }
    catch (e) {
        error = toError(e);
    }
    return {
        success: !error,
        error: error?.message,
        resolvedSettings,
    };
}
/**
 * Remove files from the global setting.
 * @param paths match against the partial file path, or package name, or id.
 *   To match against a partial file path, it must match against the subdirectory and filename.
 * Note: for Idempotent reasons, asking to remove a path that is not in the global settings is considered a success.
 *   It is possible to check for this by looking at the returned list of removed paths.
 */
export async function removePathsFromGlobalImports(paths) {
    const listResult = await listGlobalImports();
    const toRemove = new Set();
    function matchPackage(pathToRemove) {
        return ({ package: pkg, id }) => pathToRemove === pkg?.name || pathToRemove === id;
    }
    function compareFilenames(fullPath, partialPath) {
        if (fullPath === partialPath)
            return true;
        if (!fullPath.endsWith(partialPath))
            return false;
        const c = fullPath[fullPath.length - partialPath.length - 1];
        return c === Path.sep || c === Path.posix.sep;
    }
    function matchFilename(pathToRemove) {
        return Path.dirname(pathToRemove) !== '.'
            ? ({ filename }) => compareFilenames(filename, pathToRemove)
            : () => false;
    }
    paths
        .map((a) => a.trim())
        .filter((a) => !!a)
        .forEach((pathToRemove) => {
        const excludePackage = matchPackage(pathToRemove);
        const excludeFilename = matchFilename(pathToRemove);
        const shouldExclude = (r) => excludePackage(r) || excludeFilename(r);
        for (const r of listResult.list) {
            if (shouldExclude(r)) {
                toRemove.add(r.filename);
            }
        }
    });
    const toImport = normalizeImports(listResult.globalSettings.import).filter((p) => !toRemove.has(p));
    const updatedSettings = {
        import: toImport,
    };
    const error = toRemove.size > 0 ? writeRawGlobalSettings(updatedSettings) : undefined;
    return {
        success: true,
        removed: [...toRemove],
        error: error?.toString(),
    };
}
async function resolveSettings(filename) {
    const settings = await readRawSettings(filename);
    const ref = settings.__importRef;
    const resolvedToFilename = ref?.filename;
    const error = ref?.error?.message || (!resolvedToFilename && 'File not Found') || undefined;
    return clean({
        filename,
        resolvedToFilename,
        error,
        settings,
    });
}
function normalizeImports(imports) {
    return typeof imports === 'string' ? [imports] : imports || [];
}
function resolveImports(s) {
    const imported = normalizeImports(s.import);
    return Promise.all(imported.map(resolveSettings));
}
function findPackageForCSpellConfig(pathToConfig) {
    try {
        const filename = Path.join(pathToConfig, 'package.json');
        const pkg = JSON.parse(fs.readFileSync(filename, 'utf8'));
        return {
            filename,
            name: pkg['name'],
        };
    }
    catch {
        return undefined;
    }
}
export const __testing__ = {
    findPackageForCSpellConfig,
};
//# sourceMappingURL=link.js.map