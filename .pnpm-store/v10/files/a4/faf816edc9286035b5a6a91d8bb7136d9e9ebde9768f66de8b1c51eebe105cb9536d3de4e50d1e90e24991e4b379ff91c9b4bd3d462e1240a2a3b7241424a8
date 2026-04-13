import type { SpellingDictionary } from 'cspell-dictionary';
import type { VFileSystem } from '../fileSystem.js';
import type { DictionaryDefinitionInternal } from '../Settings/index.js';
import { DictionaryLoader } from './DictionaryController/index.js';
export type { LoadOptions } from './DictionaryController/index.js';
export declare function getDictionaryLoader(vfs?: VFileSystem): DictionaryLoader;
export declare function loadDictionary(def: DictionaryDefinitionInternal): Promise<SpellingDictionary>;
/**
 * Check to see if any of the cached dictionaries have changed. If one has changed, reload it.
 * @param maxAge - Only check the dictionary if it has been at least `maxAge` ms since the last check.
 * @param now - optional timestamp representing now. (Mostly used in testing)
 */
export declare function refreshCacheEntries(maxAge?: number, now?: number): Promise<void>;
//# sourceMappingURL=DictionaryLoader.d.ts.map