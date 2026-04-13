import type { SpellingDictionary } from 'cspell-dictionary';
import type { VFileSystem } from 'cspell-io';
import type { DictionaryDefinitionInternal } from '../../Settings/index.js';
export type LoadOptions = DictionaryDefinitionInternal;
export declare class DictionaryLoader {
    private fs;
    private dictionaryCache;
    private inlineDictionaryCache;
    private dictionaryCacheByDef;
    private reader;
    /** The keepAliveCache is to hold onto the most recently loaded dictionaries. */
    private keepAliveCache;
    constructor(fs: VFileSystem, keepAliveSize?: number);
    loadDictionary(def: DictionaryDefinitionInternal): Promise<SpellingDictionary>;
    /**
     * Check to see if any of the cached dictionaries have changed. If one has changed, reload it.
     * @param maxAge - Only check the dictionary if it has been at least `maxAge` ms since the last check.
     * @param now - optional timestamp representing now. (Mostly used in testing)
     */
    refreshCacheEntries(maxAge?: number, now?: number): Promise<void>;
    private getCacheEntry;
    private setCacheEntry;
    private refreshEntry;
    private loadEntry;
    private getStat;
    private isEqual;
    private normalizeOptions;
    private loadInlineDict;
    private loadSimpleDict;
    private calcKey;
}
//# sourceMappingURL=DictionaryLoader.d.ts.map