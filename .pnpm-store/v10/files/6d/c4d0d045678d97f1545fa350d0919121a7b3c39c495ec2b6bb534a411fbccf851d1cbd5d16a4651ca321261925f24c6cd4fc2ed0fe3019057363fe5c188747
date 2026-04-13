/**
 * Handles loading of `.pnp.js` and `.pnp.js` files.
 */
import { fileURLToPath } from 'node:url';
import clearModule from 'clear-module';
import importFresh from 'import-fresh';
import { findUp } from '../../util/findUp.js';
import { toFileUrl } from '../../util/url.js';
import { UnsupportedPnpFile } from './ImportError.js';
const defaultPnpFiles = ['.pnp.cjs', '.pnp.js'];
const supportedSchemas = new Set(['file:']);
const cachedRequests = new Map();
let lock = undefined;
const cachedPnpImportsSync = new Map();
const cachedRequestsSync = new Map();
export class PnpLoader {
    pnpFiles;
    cacheKeySuffix;
    constructor(pnpFiles = defaultPnpFiles) {
        this.pnpFiles = pnpFiles;
        this.cacheKeySuffix = ':' + pnpFiles.join(',');
    }
    /**
     * Request that the nearest .pnp file gets loaded
     * @param urlDirectory starting directory
     * @returns promise - rejects on error - success if loaded or not found.
     */
    async load(urlDirectory) {
        if (!isSupported(urlDirectory))
            return undefined;
        await lock;
        const cacheKey = this.calcKey(urlDirectory);
        const cached = cachedRequests.get(cacheKey);
        if (cached)
            return cached;
        const r = findPnpAndLoad(urlDirectory, this.pnpFiles);
        cachedRequests.set(cacheKey, r);
        const result = await r;
        cachedRequestsSync.set(cacheKey, result);
        return result;
    }
    async peek(urlDirectory) {
        if (!isSupported(urlDirectory))
            return undefined;
        await lock;
        const cacheKey = this.calcKey(urlDirectory);
        return cachedRequests.get(cacheKey) ?? Promise.resolve(undefined);
    }
    /**
     * Clears the cached so .pnp files will get reloaded on request.
     */
    clearCache() {
        return clearPnPGlobalCache();
    }
    calcKey(urlDirectory) {
        return urlDirectory.toString() + this.cacheKeySuffix;
    }
}
export function pnpLoader(pnpFiles) {
    return new PnpLoader(pnpFiles);
}
/**
 * @param urlDirectory - directory to start at.
 */
async function findPnpAndLoad(urlDirectory, pnpFiles) {
    const found = await findUp(pnpFiles, { cwd: fileURLToPath(urlDirectory) });
    return loadPnpIfNeeded(found);
}
function loadPnpIfNeeded(found) {
    if (!found)
        return undefined;
    const c = cachedPnpImportsSync.get(found);
    if (c || cachedPnpImportsSync.has(found))
        return c;
    const r = loadPnp(found);
    cachedPnpImportsSync.set(found, r);
    return r;
}
function loadPnp(pnpFile) {
    const pnp = importFresh(pnpFile);
    if (pnp.setup) {
        pnp.setup();
        return toFileUrl(pnpFile);
    }
    throw new UnsupportedPnpFile(`Unsupported pnp file: "${pnpFile}"`);
}
export function clearPnPGlobalCache() {
    if (lock)
        return lock;
    lock = _cleanCache().finally(() => {
        lock = undefined;
    });
    return lock;
}
async function _cleanCache() {
    await Promise.all([...cachedRequests.values()].map(rejectToUndefined));
    const modules = [...cachedPnpImportsSync.values()];
    modules.forEach((r) => r && clearModule.single(fileURLToPath(r)));
    cachedRequests.clear();
    cachedRequestsSync.clear();
    cachedPnpImportsSync.clear();
    return undefined;
}
function rejectToUndefined(p) {
    return p.catch(() => undefined);
}
function isSupported(url) {
    return supportedSchemas.has(url.protocol);
}
//# sourceMappingURL=pnpLoader.js.map