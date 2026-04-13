import assert from 'node:assert';
import { onClearCache } from '../events/index.js';
import { autoResolveWeak, AutoResolveWeakCache } from '../util/AutoResolve.js';
import { toFileUrl } from '../util/url.js';
import * as util from '../util/util.js';
import { configSettingsFileVersion0_1, ENV_CSPELL_GLOB_ROOT } from './constants.js';
import { calcDictionaryDefsToLoad, cleanCSpellSettingsInternal as csi, isCSpellSettingsInternal, mapDictDefsToInternal, } from './internal/index.js';
import { mergeList, mergeListUnique } from './mergeList.js';
import { resolvePatterns } from './patterns.js';
import { CwdUrlResolver } from './resolveCwd.js';
import { walkToJSONObj } from './util/settingsToJson.js';
export { stats as getMergeStats } from './mergeList.js';
const emptyWords = [];
Object.freeze(emptyWords);
const cachedMerges = new AutoResolveWeakCache();
const mergeCache = new AutoResolveWeakCache();
const cacheInternalSettings = new AutoResolveWeakCache();
const parserCache = new AutoResolveWeakCache();
const emptyParserMap = new Map();
const cwdResolver = new CwdUrlResolver();
let envCSpellGlobRoot = process.env[ENV_CSPELL_GLOB_ROOT];
onClearCache(() => {
    parserCache.clear();
    emptyParserMap.clear();
    cachedMerges.clear();
    mergeCache.clear();
    cacheInternalSettings.clear();
    cwdResolver.reset();
    envCSpellGlobRoot = process.env[ENV_CSPELL_GLOB_ROOT];
});
function _mergeWordsCached(left, right) {
    const map = autoResolveWeak(cachedMerges, left, () => new WeakMap());
    return autoResolveWeak(map, right, () => [...left, ...right]);
}
function mergeWordsCached(left, right) {
    if (!Array.isArray(left) || !left.length) {
        return Array.isArray(right) ? (right.length ? right : emptyWords) : undefined;
    }
    if (!Array.isArray(right) || !right.length)
        return left;
    return _mergeWordsCached(left, right);
}
function mergeObjects(left, right) {
    if (!left || typeof left !== 'object')
        return !right || typeof right !== 'object' ? undefined : right;
    if (!right || typeof right !== 'object')
        return left;
    return { ...left, ...right };
}
function replaceIfNotEmpty(left = [], right = []) {
    const filtered = right.filter((a) => !!a);
    if (filtered.length) {
        return filtered;
    }
    return left;
}
export function toCSpellSettingsWithSourceTrace(settings) {
    return walkToJSONObj(settings);
}
export function toCSpellSettingsWithOutSourceTrace(settings) {
    const { __importRef, __imports, source: _source, ...rest } = toCSpellSettingsWithSourceTrace(settings);
    return util.clean(rest);
}
export function mergeSettings(left, ...settings) {
    const rawSettings = settings.filter(util.isDefined).reduce(merge, toInternalSettings(left));
    return util.clean(rawSettings);
}
function isEmpty(obj) {
    return !obj || Object.keys(obj).length === 0;
}
function merge(left, right) {
    const map = mergeCache.get(left, () => new WeakMap());
    return autoResolveWeak(map, right, () => _merge(left, right));
}
function _merge(left, right) {
    const _left = toInternalSettings(left);
    const _right = toInternalSettings(right);
    if (left === right) {
        return _left;
    }
    if (isEmpty(right)) {
        return _left;
    }
    if (isEmpty(left)) {
        return _right;
    }
    if (isLeftAncestorOfRight(_left, _right)) {
        return _right;
    }
    if (doesLeftHaveRightAncestor(_left, _right)) {
        return _left;
    }
    const includeRegExpList = takeRightOtherwiseLeft(_left.includeRegExpList, _right.includeRegExpList);
    const optionals = includeRegExpList?.length ? { includeRegExpList } : {};
    const version = max(_left.version, _right.version);
    const valuesToClear = {
        name: undefined,
        id: undefined,
        description: undefined,
        globRoot: undefined,
        import: undefined,
        __importRef: undefined,
    };
    const settings = csi({
        ..._left,
        ..._right,
        ...optionals,
        ...valuesToClear,
        version,
        words: mergeWordsCached(_left.words, _right.words),
        userWords: mergeWordsCached(_left.userWords, _right.userWords),
        flagWords: mergeWordsCached(_left.flagWords, _right.flagWords),
        ignoreWords: mergeWordsCached(_left.ignoreWords, _right.ignoreWords),
        suggestWords: mergeWordsCached(_left.suggestWords, _right.suggestWords),
        enabledLanguageIds: replaceIfNotEmpty(_left.enabledLanguageIds, _right.enabledLanguageIds),
        enableFiletypes: mergeList(_left.enableFiletypes, _right.enableFiletypes),
        enabledFileTypes: mergeObjects(_left.enabledFileTypes, _right.enabledFileTypes),
        ignoreRegExpList: mergeListUnique(_left.ignoreRegExpList, _right.ignoreRegExpList),
        patterns: mergeListUnique(_left.patterns, _right.patterns),
        dictionaryDefinitions: mergeListUnique(_left.dictionaryDefinitions, _right.dictionaryDefinitions),
        dictionaries: mergeListUnique(_left.dictionaries, _right.dictionaries),
        noSuggestDictionaries: mergeListUnique(_left.noSuggestDictionaries, _right.noSuggestDictionaries),
        languageSettings: mergeList(_left.languageSettings, _right.languageSettings),
        enabled: _right.enabled !== undefined ? _right.enabled : _left.enabled,
        files: mergeListUnique(_left.files, _right.files),
        ignorePaths: versionBasedMergeList(_left.ignorePaths, _right.ignorePaths, version),
        overrides: versionBasedMergeList(_left.overrides, _right.overrides, version),
        features: mergeObjects(_left.features, _right.features),
        source: mergeSources(_left, _right),
        plugins: mergeList(_left.plugins, _right.plugins),
        vfs: mergeObjects(_left.vfs, _right.vfs),
        __imports: mergeImportRefs(_left, _right),
    });
    return settings;
}
function versionBasedMergeList(left, right, version) {
    if (version === configSettingsFileVersion0_1) {
        return takeRightOtherwiseLeft(left, right);
    }
    return mergeListUnique(left, right);
}
/**
 * Check to see if left is a left ancestor of right.
 * If that is the case, merging is not necessary:
 * @param left - setting on the left side of a merge
 * @param right - setting on the right side of a merge
 */
function isLeftAncestorOfRight(left, right) {
    return hasAncestor(right, left, 0);
}
/**
 * Check to see if left has right as an ancestor to the right.
 * If that is the case, merging is not necessary:
 * @param left - setting on the left side of a merge
 * @param right - setting on the right side of a merge
 */
function doesLeftHaveRightAncestor(left, right) {
    return hasAncestor(left, right, 1);
}
function hasAncestor(s, ancestor, side) {
    const sources = s.source?.sources;
    if (!sources)
        return false;
    // calc the first or last index of the source array.
    const i = side ? sources.length - 1 : 0;
    const src = sources[i];
    return src === ancestor || (src && hasAncestor(src, ancestor, side)) || false;
}
export function mergeInDocSettings(left, ...rest) {
    const merged = mergeSettings(left, ...rest);
    return util.clean(merged);
}
function takeRightOtherwiseLeft(left, right) {
    if (right?.length) {
        return right;
    }
    return left || right;
}
/**
 *
 * @param settings - settings to finalize
 * @returns settings where all globs and file paths have been resolved.
 */
export function finalizeSettings(settings) {
    return _finalizeSettings(toInternalSettings(settings));
}
function _finalizeSettings(settings) {
    // apply patterns to any RegExpLists.
    const finalized = {
        ...settings,
        finalized: true,
        ignoreRegExpList: resolvePatterns(settings.ignoreRegExpList, settings.patterns),
        includeRegExpList: resolvePatterns(settings.includeRegExpList, settings.patterns),
        parserFn: resolveParser(settings),
    };
    finalized.name = 'Finalized ' + (finalized.name || '');
    finalized.source = { name: settings.name || 'src', sources: [settings] };
    return finalized;
}
export function toInternalSettings(settings) {
    if (settings === undefined)
        return undefined;
    if (isCSpellSettingsInternal(settings))
        return settings;
    return cacheInternalSettings.get(settings, _toInternalSettings);
}
function _toInternalSettings(settings) {
    const { dictionaryDefinitions: defs, ...rest } = settings;
    const dictionaryDefinitions = defs &&
        mapDictDefsToInternal(defs, (settings.source?.filename && toFileUrl(settings.source?.filename)) || resolveCwd());
    const setting = dictionaryDefinitions ? { ...rest, dictionaryDefinitions } : rest;
    return csi(setting);
}
function mergeSources(left, right) {
    return {
        name: 'merged',
        sources: [left, right],
    };
}
function max(a, b) {
    if (a === undefined || a === null)
        return b;
    if (b === undefined || b === null)
        return a;
    return a > b ? a : b;
}
/**
 * Return a list of Setting Sources used to create this Setting.
 * @param settings the settings to search
 */
export function getSources(settings) {
    const visited = new Set();
    const sources = [];
    function _walkSourcesTree(settings) {
        if (!settings || visited.has(settings))
            return;
        visited.add(settings);
        if (!settings.source?.sources?.length) {
            sources.push(settings);
            return;
        }
        settings.source.sources.forEach(_walkSourcesTree);
    }
    _walkSourcesTree(settings);
    return sources;
}
function mergeImportRefs(left, right = {}) {
    const imports = new Map(left.__imports || []);
    if (left.__importRef) {
        imports.set(left.__importRef.filename, left.__importRef);
    }
    if (right.__importRef) {
        imports.set(right.__importRef.filename, right.__importRef);
    }
    const rightImports = right.__imports?.values() || [];
    for (const ref of rightImports) {
        imports.set(ref.filename, ref);
    }
    return imports.size ? imports : undefined;
}
export function extractDependencies(settings) {
    const settingsI = toInternalSettings(settings);
    const configFiles = [...(mergeImportRefs(settingsI) || [])].map(([filename]) => filename);
    const dictionaryFiles = calcDictionaryDefsToLoad(settingsI)
        .map((dict) => dict.path)
        .filter((file) => !!file);
    return {
        configFiles,
        dictionaryFiles,
    };
}
function resolveCwd() {
    return cwdResolver.resolveUrl(envCSpellGlobRoot);
}
function resolveParser(settings) {
    if (!settings.parser)
        return undefined;
    if (typeof settings.parser === 'function')
        return settings.parser;
    const parserName = settings.parser;
    assert(typeof parserName === 'string');
    const parsers = extractParsers(settings.plugins);
    const parser = parsers.get(parserName);
    assert(parser, `Parser "${parserName}" not found.`);
    return parser;
}
function* parsers(plugins) {
    for (const plugin of plugins) {
        if (!plugin.parsers)
            continue;
        for (const parser of plugin.parsers) {
            yield [parser.name, parser];
        }
    }
}
function mapPlugins(plugins) {
    return new Map(parsers(plugins));
}
function extractParsers(plugins) {
    if (!plugins || !plugins.length)
        return emptyParserMap;
    return parserCache.get(plugins, mapPlugins);
}
export const __testing__ = {
    mergeObjects,
};
//# sourceMappingURL=CSpellSettingsServer.js.map