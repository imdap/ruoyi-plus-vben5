import VirtualConsolePrinter from '../../console/VirtualConsolePrinter.js';
import type IConsole from '../../console/IConsole.js';
import DetachedBrowserFrame from './DetachedBrowserFrame.js';
import type DetachedBrowserContext from './DetachedBrowserContext.js';
import type IBrowserPage from '../types/IBrowserPage.js';
import type { Script } from 'vm';
import type IGoToOptions from '../types/IGoToOptions.js';
import type Response from '../../fetch/Response.js';
import type IReloadOptions from '../types/IReloadOptions.js';
import type IOptionalBrowserPageViewport from '../types/IOptionalBrowserPageViewport.js';
import type IBrowserPageViewport from '../types/IBrowserPageViewport.js';
/**
 * Detached browser page used when constructing a Window instance without a browser.
 */
export default class DetachedBrowserPage implements IBrowserPage {
    readonly virtualConsolePrinter: VirtualConsolePrinter;
    readonly mainFrame: DetachedBrowserFrame;
    readonly context: DetachedBrowserContext;
    readonly console: IConsole;
    readonly viewport: IBrowserPageViewport;
    readonly closed: boolean;
    /**
     * Constructor.
     *
     * @param context Browser context.
     */
    constructor(context: DetachedBrowserContext);
    /**
     * Returns frames.
     */
    get frames(): DetachedBrowserFrame[];
    /**
     * Returns the viewport.
     */
    get content(): string;
    /**
     * Sets the content.
     *
     * @param content Content.
     */
    set content(content: string);
    /**
     * Returns the URL.
     *
     * @returns URL.
     */
    get url(): string;
    /**
     * Sets the content.
     *
     * @param url URL.
     */
    set url(url: string);
    /**
     * Aborts all ongoing operations and destroys the page.
     */
    close(): Promise<void>;
    /**
     * Returns a promise that is resolved when all resources has been loaded, fetch has completed, and all async tasks such as timers are complete.
     */
    waitUntilComplete(): Promise<void>;
    /**
     * Returns a promise that is resolved when the page has navigated and the response HTML has been written to the document.
     */
    waitForNavigation(): Promise<void>;
    /**
     * Aborts all ongoing operations.
     */
    abort(): Promise<void>;
    /**
     * Evaluates code or a VM Script in the page's context.
     *
     * @param script Script.
     * @returns Result.
     */
    evaluate(script: string | Script): any;
    /**
     * Evaluates a module in the page's context.
     *
     * @param options Options.
     * @param options.url URL.
     * @param options.type Module type.
     * @param options.code Code.
     * @returns Module exports.
     */
    evaluateModule(options: {
        url?: string;
        type?: 'esm' | 'css' | 'json';
        code?: string;
    }): Promise<Record<string, any>>;
    /**
     * Sets the viewport.
     *
     * @param viewport Viewport.
     */
    setViewport(viewport: IOptionalBrowserPageViewport): void;
    /**
     * Go to a page.
     *
     * @param url URL.
     * @param [options] Options.
     * @returns Response.
     */
    goto(url: string, options?: IGoToOptions): Promise<Response | null>;
    /**
     * Navigates back in history.
     *
     * @param [options] Options.
     */
    goBack(options?: IGoToOptions): Promise<Response | null>;
    /**
     * Navigates forward in history.
     *
     * @param [options] Options.
     */
    goForward(options?: IGoToOptions): Promise<Response | null>;
    /**
     * Navigates a delta in history.
     *
     * @param delta Delta.
     * @param steps
     * @param [options] Options.
     */
    goSteps(steps?: number, options?: IGoToOptions): Promise<Response | null>;
    /**
     * Reloads the current page.
     *
     * @param [options] Options.
     * @returns Response.
     */
    reload(options?: IReloadOptions): Promise<Response | null>;
}
//# sourceMappingURL=DetachedBrowserPage.d.ts.map