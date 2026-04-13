var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};
var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        var r, s = 0;
        function next() {
            while (r = env.stack.pop()) {
                try {
                    if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                    if (r.dispose) {
                        var result = r.dispose.call(r.value);
                        if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                    }
                    else s |= 1;
                }
                catch (e) {
                    fail(e);
                }
            }
            if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
import { opConcatMap, opFilter, opMap, pipe } from '@cspell/cspell-pipe/sync';
import { StrongWeakMap } from '@cspell/strong-weak-map';
import { createFailedToLoadDictionary, createInlineSpellingDictionary, createSpellingDictionary, createSpellingDictionaryFromTrieFile, } from 'cspell-dictionary';
import { compareStats, toFileURL, urlBasename } from 'cspell-io';
import { measurePerf } from '../../perf/index.js';
import { isDictionaryDefinitionInlineInternal, isDictionaryFileDefinitionInternal } from '../../Settings/index.js';
import { AutoResolveWeakCache, AutoResolveWeakWeakCache } from '../../util/AutoResolve.js';
import { toError } from '../../util/errors.js';
import { SimpleCache } from '../../util/simpleCache.js';
import { SpellingDictionaryLoadError } from '../SpellingDictionaryError.js';
const MAX_AGE = 10_000;
const loaders = {
    S: loadSimpleWordList,
    C: legacyWordList,
    W: wordsPerLineWordList,
    T: loadTrie,
    default: loadSimpleWordList,
};
var LoadingState;
(function (LoadingState) {
    LoadingState[LoadingState["Loaded"] = 0] = "Loaded";
    LoadingState[LoadingState["Loading"] = 1] = "Loading";
})(LoadingState || (LoadingState = {}));
export class DictionaryLoader {
    fs;
    dictionaryCache = new StrongWeakMap();
    inlineDictionaryCache = new AutoResolveWeakCache();
    dictionaryCacheByDef = new AutoResolveWeakWeakCache();
    reader;
    /** The keepAliveCache is to hold onto the most recently loaded dictionaries. */
    keepAliveCache;
    constructor(fs, keepAliveSize = 10) {
        this.fs = fs;
        this.reader = toReader(fs);
        this.keepAliveCache = new SimpleCache(keepAliveSize);
    }
    loadDictionary(def) {
        if (isDictionaryDefinitionInlineInternal(def)) {
            return Promise.resolve(this.loadInlineDict(def));
        }
        if (isDictionaryFileDefinitionInternal(def)) {
            const { key, entry } = this.getCacheEntry(def);
            if (entry) {
                return entry.pending.then(([dictionary]) => dictionary);
            }
            const loadedEntry = this.loadEntry(def.btrie || def.path, def);
            this.setCacheEntry(key, loadedEntry, def);
            this.keepAliveCache.set(def, loadedEntry);
            return loadedEntry.pending.then(([dictionary]) => dictionary);
        }
        return Promise.resolve(this.loadSimpleDict(def));
    }
    /**
     * Check to see if any of the cached dictionaries have changed. If one has changed, reload it.
     * @param maxAge - Only check the dictionary if it has been at least `maxAge` ms since the last check.
     * @param now - optional timestamp representing now. (Mostly used in testing)
     */
    async refreshCacheEntries(maxAge = MAX_AGE, now = Date.now()) {
        await Promise.all([...this.dictionaryCache.values()].map((entry) => this.refreshEntry(entry, maxAge, now)));
    }
    getCacheEntry(def) {
        const defEntry = this.dictionaryCacheByDef.get(def);
        if (defEntry) {
            this.keepAliveCache.get(def);
            return defEntry;
        }
        const key = this.calcKey(def);
        const entry = this.dictionaryCache.get(key);
        if (entry) {
            // replace old entry so it can be released.
            entry.options = def;
            this.keepAliveCache.set(def, entry);
        }
        return { key, entry };
    }
    setCacheEntry(key, entry, def) {
        this.dictionaryCache.set(key, entry);
        this.dictionaryCacheByDef.set(def, { key, entry });
    }
    async refreshEntry(entry, maxAge, now) {
        if (now - entry.ts >= maxAge) {
            const sig = now + Math.random();
            // Write to the ts, so the next one will not do it.
            entry.sig = sig;
            entry.ts = now;
            const pStat = this.getStat(entry.uri);
            const [newStat] = await Promise.all([pStat, entry.pending]);
            const hasChanged = !this.isEqual(newStat, entry.stat);
            const sigMatches = entry.sig === sig;
            if (sigMatches && hasChanged) {
                entry.loadingState = LoadingState.Loading;
                const key = this.calcKey(entry.options);
                const newEntry = this.loadEntry(entry.uri, entry.options);
                this.dictionaryCache.set(key, newEntry);
                this.dictionaryCacheByDef.set(entry.options, { key, entry: newEntry });
            }
        }
    }
    loadEntry(fileOrUri, options, now = Date.now()) {
        const url = toFileURL(fileOrUri);
        options = this.normalizeOptions(url, options);
        const pDictionary = load(this.reader, url, options).catch((e) => createFailedToLoadDictionary(options.name, fileOrUri, new SpellingDictionaryLoadError(url.href, options, e, 'failed to load'), options));
        const pStat = this.getStat(url);
        const pending = Promise.all([pDictionary, pStat]);
        const sig = now + Math.random();
        const entry = {
            uri: url.href,
            options,
            ts: now,
            stat: undefined,
            dictionary: undefined,
            pending,
            loadingState: LoadingState.Loading,
            sig,
        };
        pending
            .then(([dictionary, stat]) => {
            entry.stat = stat;
            entry.dictionary = dictionary;
            entry.loadingState = LoadingState.Loaded;
            return;
        })
            .catch(() => undefined);
        return entry;
    }
    getStat(uri) {
        return this.fs.stat(toFileURL(uri)).catch(toError);
    }
    isEqual(a, b) {
        if (!b)
            return false;
        if (isError(a)) {
            return isError(b) && a.message === b.message && a.name === b.name;
        }
        return !isError(b) && !compareStats(a, b);
    }
    normalizeOptions(uri, options) {
        if (options.name)
            return options;
        return { ...options, name: urlBasename(uri) };
    }
    loadInlineDict(def) {
        return this.inlineDictionaryCache.get(def, (def) => createInlineSpellingDictionary(def, def.__source || 'memory'));
    }
    loadSimpleDict(def) {
        return createInlineSpellingDictionary({ name: def.name, words: [] }, def.__source || 'memory');
    }
    calcKey(def) {
        const path = def.path;
        const loaderType = determineType(toFileURL(path), def);
        const optValues = importantOptionKeys.map((k) => def[k]?.toString() || '');
        const parts = [path, loaderType, ...optValues];
        return parts.join('|');
    }
}
function toReader(fs) {
    function readResource(url) {
        return fs.readFile(url);
    }
    async function readText(url) {
        return (await readResource(url)).getText();
    }
    async function read(url) {
        return (await readResource(url)).getBytes();
    }
    return {
        read,
        readText,
        readLines: async (filename) => toLines(await readText(filename)),
    };
}
const importantOptionKeys = ['name', 'noSuggest', 'useCompounds', 'type'];
function isError(e) {
    const err = e;
    return !!err.message;
}
function determineType(uri, opts) {
    const t = (opts.type && opts.type in loaders && opts.type) || 'S';
    const defLoaderType = t;
    const defType = uri.pathname.endsWith('.trie.gz') ? 'T' : defLoaderType;
    const regTrieTest = /\.b?trie\b/i;
    return regTrieTest.test(uri.pathname) ? 'T' : defType;
}
async function load(reader, uri, options) {
    const type = determineType(uri, options);
    const loader = loaders[type] || loaders.default;
    return loader(reader, uri, options);
}
async function legacyWordList(reader, filename, options) {
    const env_1 = { stack: [], error: void 0, hasError: false };
    try {
        const lines = await reader.readLines(filename);
        const _ = __addDisposableResource(env_1, measurePerf('legacyWords'), false);
        const words = pipe(lines, 
        // Remove comments
        opMap((line) => line.replaceAll(/#.*/g, '')), 
        // Split on everything else
        opConcatMap((line) => line.split(/[^\w\p{L}\p{M}'’]+/gu)), opFilter((word) => !!word));
        return createSpellingDictionary(words, options.name, filename.toString(), options, true);
    }
    catch (e_1) {
        env_1.error = e_1;
        env_1.hasError = true;
    }
    finally {
        __disposeResources(env_1);
    }
}
async function wordsPerLineWordList(reader, filename, options) {
    const lines = await reader.readLines(filename);
    const words = pipe(lines, 
    // Remove comments
    opMap((line) => line.replaceAll(/#.*/g, '')), 
    // Split on everything else
    opConcatMap((line) => line.split(/\s+/gu)), opFilter((word) => !!word));
    return createSpellingDictionary(words, options.name, filename.href, options, true);
}
async function loadSimpleWordList(reader, filename, options) {
    const env_2 = { stack: [], error: void 0, hasError: false };
    try {
        const lines = await reader.readLines(filename);
        const _ = __addDisposableResource(env_2, measurePerf('loadSimpleWordList'), false);
        return createSpellingDictionary(lines, options.name, filename.href, options);
    }
    catch (e_2) {
        env_2.error = e_2;
        env_2.hasError = true;
    }
    finally {
        __disposeResources(env_2);
    }
}
async function loadTrie(reader, filename, options) {
    const env_3 = { stack: [], error: void 0, hasError: false };
    try {
        const content = await reader.read(filename);
        const _ = __addDisposableResource(env_3, measurePerf('loadTrie'), false);
        return createSpellingDictionaryFromTrieFile(content, options.name, filename.href, options);
    }
    catch (e_3) {
        env_3.error = e_3;
        env_3.hasError = true;
    }
    finally {
        __disposeResources(env_3);
    }
}
function toLines(content) {
    return content.split(/\n|\r\n|\r/);
}
//# sourceMappingURL=DictionaryLoader.js.map