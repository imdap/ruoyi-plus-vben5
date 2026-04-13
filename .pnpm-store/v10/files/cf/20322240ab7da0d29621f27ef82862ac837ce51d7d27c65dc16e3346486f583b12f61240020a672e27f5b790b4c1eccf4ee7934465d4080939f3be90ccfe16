import type BrowserPage from './BrowserPage.js';
import * as PropertySymbol from '../PropertySymbol.js';
import AsyncTaskManager from '../async-task-manager/AsyncTaskManager.js';
import type IBrowserFrame from './types/IBrowserFrame.js';
import BrowserWindow from '../window/BrowserWindow.js';
import type CrossOriginBrowserWindow from '../window/CrossOriginBrowserWindow.js';
import type Response from '../fetch/Response.js';
import type IGoToOptions from './types/IGoToOptions.js';
import type { Script } from 'vm';
import type IReloadOptions from './types/IReloadOptions.js';
import type Document from '../nodes/document/Document.js';
import HistoryItemList from '../history/HistoryItemList.js';
/**
 * Browser frame.
 */
export default class BrowserFrame implements IBrowserFrame {
    readonly childFrames: BrowserFrame[];
    readonly parentFrame: BrowserFrame | null;
    readonly page: BrowserPage;
    readonly window: BrowserWindow;
    readonly closed: boolean;
    [PropertySymbol.asyncTaskManager]: AsyncTaskManager;
    [PropertySymbol.listeners]: {
        navigation: Array<() => void>;
    };
    [PropertySymbol.openerFrame]: IBrowserFrame | null;
    [PropertySymbol.openerWindow]: BrowserWindow | CrossOriginBrowserWindow | null;
    [PropertySymbol.popup]: boolean;
    [PropertySymbol.history]: HistoryItemList;
    /**
     * Constructor.
     *
     * @param page Page.
     */
    constructor(page: BrowserPage);
    /**
     * Returns the content.
     *
     * @returns Content.
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
     * Returns document.
     *
     * @returns Document.
     */
    get document(): Document;
    /**
     * Returns a promise that is resolved when all resources has been loaded, fetch has completed, and all async tasks such as timers are complete.
     */
    waitUntilComplete(): Promise<void>;
    /**
     * Returns a promise that is resolved when the frame has navigated and the response HTML has been written to the document.
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
     * @param steps Steps.
     * @param [options] Options.
     */
    goSteps(steps?: number, options?: IGoToOptions): Promise<Response | null>;
    /**
     * Reloads the current frame.
     *
     * @param [options] Options.
     * @returns Response.
     */
    reload(options?: IReloadOptions): Promise<Response | null>;
}
//# sourceMappingURL=BrowserFrame.d.ts.map