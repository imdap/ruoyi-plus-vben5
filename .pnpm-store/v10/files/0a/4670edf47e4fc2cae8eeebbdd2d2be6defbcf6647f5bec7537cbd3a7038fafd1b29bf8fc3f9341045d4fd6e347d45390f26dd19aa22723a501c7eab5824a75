import type IResponseCache from './IResponseCache.js';
import type ICachedResponse from './ICachedResponse.js';
import type ICacheableRequest from './ICacheableRequest.js';
import type ICacheableResponse from './ICacheableResponse.js';
import ResponseCacheFileSystem from './ResponseCacheFileSystem.js';
/**
 * Fetch response cache.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching
 * @see https://www.mnot.net/cache_docs/
 */
export default class ResponseCache implements IResponseCache {
    #private;
    fileSystem: ResponseCacheFileSystem;
    /**
     * Constructor.
     */
    constructor();
    /**
     * Returns cached response.
     *
     * @param request Request.
     * @returns Cached response.
     */
    get(request: ICacheableRequest): ICachedResponse | null;
    /**
     * Adds a cache entity.
     *
     * @param request Request.
     * @param response Response.
     * @returns Cached response.
     */
    add(request: ICacheableRequest, response: ICacheableResponse): ICachedResponse | null;
    /**
     * Clears the cache.
     *
     * @param [options] Options.
     * @param [options.url] URL.
     * @param [options.toTime] Removes all entries that are older than this time. Time in MS.
     */
    clear(options?: {
        url?: string;
        toTime?: number;
    }): void;
}
//# sourceMappingURL=ResponseCache.d.ts.map