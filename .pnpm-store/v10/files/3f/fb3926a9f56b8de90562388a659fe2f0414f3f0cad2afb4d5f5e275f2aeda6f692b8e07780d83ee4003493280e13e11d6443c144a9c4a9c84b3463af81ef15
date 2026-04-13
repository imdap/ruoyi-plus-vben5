import type DetachedBrowser from './DetachedBrowser.js';
import DetachedBrowserPage from './DetachedBrowserPage.js';
import type IBrowserContext from '../types/IBrowserContext.js';
import type ICookieContainer from '../../cookie/ICookieContainer.js';
import type IResponseCache from '../../fetch/cache/response/IResponseCache.js';
import type IPreflightResponseCache from '../../fetch/cache/preflight/IPreflightResponseCache.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import type IECMAScriptModuleCachedResult from '../../module/types/IECMAScriptModuleCachedResult.js';
/**
 * Detached browser context used when constructing a Window instance without a browser.
 */
export default class DetachedBrowserContext implements IBrowserContext {
    readonly pages: DetachedBrowserPage[];
    readonly browser: DetachedBrowser;
    readonly cookieContainer: ICookieContainer;
    readonly responseCache: IResponseCache;
    readonly preflightResponseCache: IPreflightResponseCache;
    readonly closed: boolean;
    readonly [PropertySymbol.moduleCache]: Map<string, IECMAScriptModuleCachedResult>;
    /**
     * Constructor.
     *
     * @param browser Browser.
     */
    constructor(browser: DetachedBrowser);
    /**
     * Aborts all ongoing operations and destroys the context.
     */
    close(): Promise<void>;
    /**
     * Returns a promise that is resolved when all resources has been loaded, fetch has completed, and all async tasks such as timers are complete.
     *
     * @returns Promise.
     */
    waitUntilComplete(): Promise<void>;
    /**
     * Aborts all ongoing operations.
     */
    abort(): Promise<void>;
    /**
     * Creates a new page.
     *
     * @param [opener] Opener.
     * @returns Page.
     */
    newPage(): DetachedBrowserPage;
}
//# sourceMappingURL=DetachedBrowserContext.d.ts.map