import type ICachedResponse from './ICachedResponse.js';
import type IResponseCacheFileSystem from './IResponseCacheFileSystem.js';
/**
 * Fetch response cache file system implementation.
 */
export default class ResponseCacheFileSystem implements IResponseCacheFileSystem {
    #private;
    /**
     * Constructor.
     *
     * @param entries Map of URL to cached responses.
     */
    constructor(entries: Map<string, ICachedResponse[]>);
    /**
     * Loads cache from file system.
     *
     * @param directory Directory to load from.
     */
    load(directory: string): Promise<void>;
    /**
     * Saves the cache to file system.
     *
     * @param directory Directory to store to.
     */
    save(directory: string): Promise<void>;
}
//# sourceMappingURL=ResponseCacheFileSystem.d.ts.map