import type IBrowserSettings from '../types/IBrowserSettings.js';
import DetachedBrowserContext from './DetachedBrowserContext.js';
import type IOptionalBrowserSettings from '../types/IOptionalBrowserSettings.js';
import type DetachedBrowserPage from './DetachedBrowserPage.js';
import type IBrowser from '../types/IBrowser.js';
import type IBrowserFrame from '../types/IBrowserFrame.js';
import type IConsole from '../../console/IConsole.js';
import type BrowserWindow from '../../window/BrowserWindow.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import BrowserExceptionObserver from '../utilities/BrowserExceptionObserver.js';
/**
 * Detached browser used when constructing a Window instance without a browser.
 */
export default class DetachedBrowser implements IBrowser {
    readonly contexts: DetachedBrowserContext[];
    readonly settings: IBrowserSettings;
    readonly console: IConsole | null;
    readonly windowClass: new (browserFrame: IBrowserFrame, options?: {
        url?: string;
        width?: number;
        height?: number;
    }) => BrowserWindow;
    [PropertySymbol.exceptionObserver]: BrowserExceptionObserver | null;
    /**
     * Constructor.
     *
     * @param windowClass Window class.
     * @param [options] Options.
     * @param [options.settings] Browser settings.
     * @param [options.console] Console.
     */
    constructor(windowClass: new (browserFrame: IBrowserFrame, options?: {
        url?: string;
        width?: number;
        height?: number;
    }) => BrowserWindow, options?: {
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
    get defaultContext(): DetachedBrowserContext;
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
     */
    newIncognitoContext(): DetachedBrowserContext;
    /**
     * Creates a new page.
     *
     * @returns Page.
     */
    newPage(): DetachedBrowserPage;
}
//# sourceMappingURL=DetachedBrowser.d.ts.map