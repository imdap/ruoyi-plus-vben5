import type BrowserWindow from '../window/BrowserWindow.js';
import URL from '../url/URL.js';
import type { TRequestCredentials } from './types/TRequestCredentials.js';
import type { TRequestReferrerPolicy } from './types/TRequestReferrerPolicy.js';
import type IResourceFetchResponse from './types/IResourceFetchResponse.js';
/**
 * Helper class for performing fetch of resources.
 */
export default class ResourceFetch {
    private window;
    /**
     * Constructor.
     *
     * @param window Window.
     */
    constructor(window: BrowserWindow);
    /**
     * Returns resource data asynchronously.
     *
     * @param url URL.
     * @param destination Destination.
     * @param [options]
     * @param [options.credentials] Credentials.
     * @param options.referrerPolicy
     * @returns Response.
     */
    fetch(url: string | URL, destination: 'script' | 'style' | 'module', options?: {
        credentials?: TRequestCredentials;
        referrerPolicy?: TRequestReferrerPolicy;
    }): Promise<IResourceFetchResponse>;
    /**
     * Returns resource data synchronously.
     *
     * @param url URL.
     * @param destination Destination.
     * @param [options] Options.
     * @param [options.credentials] Credentials.
     * @param [options.referrerPolicy] Referrer policy.
     * @returns Response.
     */
    fetchSync(url: string, destination: 'script' | 'style' | 'module', options?: {
        credentials?: TRequestCredentials;
        referrerPolicy?: TRequestReferrerPolicy;
    }): IResourceFetchResponse;
}
//# sourceMappingURL=ResourceFetch.d.ts.map