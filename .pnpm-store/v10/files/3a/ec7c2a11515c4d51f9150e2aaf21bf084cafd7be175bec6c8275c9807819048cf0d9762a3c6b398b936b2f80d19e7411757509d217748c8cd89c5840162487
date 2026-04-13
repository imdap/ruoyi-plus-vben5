import { getFileSystem } from '../fileSystem.js';
import { DictionaryLoader } from './DictionaryController/index.js';
let loader;
export function getDictionaryLoader(vfs) {
    if (loader)
        return loader;
    return (loader = new DictionaryLoader(vfs || getFileSystem()));
}
export function loadDictionary(def) {
    return getDictionaryLoader().loadDictionary(def);
}
/**
 * Check to see if any of the cached dictionaries have changed. If one has changed, reload it.
 * @param maxAge - Only check the dictionary if it has been at least `maxAge` ms since the last check.
 * @param now - optional timestamp representing now. (Mostly used in testing)
 */
export async function refreshCacheEntries(maxAge, now) {
    return getDictionaryLoader().refreshCacheEntries(maxAge, now);
}
//# sourceMappingURL=DictionaryLoader.js.map