import type IPreflightResponseCache from './IPreflightResponseCache.js';
import type ICacheablePreflightRequest from './ICacheablePreflightRequest.js';
import type ICachedPreflightResponse from './ICachedPreflightResponse.js';
import type ICacheablePreflightResponse from './ICacheablePreflightResponse.js';
/**
 * Fetch preflight response cache.
 *
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
 */
export default class PreflightResponseCache implements IPreflightResponseCache {
    #private;
    /**
     * Returns cached response.
     *
     * @param request Request.
     * @returns Cached response.
     */
    get(request: ICacheablePreflightRequest): ICachedPreflightResponse | null;
    /**
     * Adds a cache entity.
     *
     * @param request Request.
     * @param response Response.
     * @returns Cached response.
     */
    add(request: ICacheablePreflightRequest, response: ICacheablePreflightResponse): ICachedPreflightResponse | null;
    /**
     * Clears the cache.
     */
    clear(): void;
}
//# sourceMappingURL=PreflightResponseCache.d.ts.map