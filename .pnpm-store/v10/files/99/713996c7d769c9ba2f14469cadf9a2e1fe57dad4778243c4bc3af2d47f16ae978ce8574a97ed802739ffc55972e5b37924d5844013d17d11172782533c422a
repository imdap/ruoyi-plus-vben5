import type IBrowserSettings from './types/IBrowserSettings.js';
import BrowserContext from './BrowserContext.js';
import type IOptionalBrowserSettings from './types/IOptionalBrowserSettings.js';
import type BrowserPage from './BrowserPage.js';
import type IBrowser from './types/IBrowser.js';
import type IConsole from '../console/IConsole.js';
import BrowserExceptionObserver from './utilities/BrowserExceptionObserver.js';
import * as PropertySymbol from '../PropertySymbol.js';
/**
 * Browser.
 */
export default class Browser implements IBrowser {
    readonly contexts: BrowserContext[];
    readonly settings: IBrowserSettings;
    readonly console: IConsole | null;
    [PropertySymbol.exceptionObserver]: BrowserExceptionObserver | null;
    /**
     * Constructor.
     *
     * @param [options] Options.
     * @param [options.settings] Browser settings.
     * @param [options.console] Console.
     */
    constructor(options?: {
        settings?: IOptionalBrowserSettings;
        console?: IConsole;
    });
    /**
     * Returns true if the browser is closed.
     *
     * @returns True if the browser is closed.
     */
    get closed(): boolean;
    /**
     * Returns the default context.
     *
     * @returns Default context.
     */
    get defaultContext(): BrowserContext;
    /**
     * Aborts all ongoing operations and destroys the browser.
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
     * Creates a new incognito context.
     *
     * @returns Context.
     */
    newIncognitoContext(): BrowserContext;
    /**
     * Creates a new page.
     *
     * @returns Page.
     */
    newPage(): BrowserPage;
}
//# sourceMappingURL=Browser.d.ts.map