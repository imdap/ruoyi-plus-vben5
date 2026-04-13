import type IRequestInit from './types/IRequestInit.js';
import type { TRequestInfo } from './types/TRequestInfo.js';
import type Headers from './Headers.js';
import Response from './Response.js';
import type IBrowserFrame from '../browser/types/IBrowserFrame.js';
import type BrowserWindow from '../window/BrowserWindow.js';
/**
 * Handles fetch requests.
 *
 * Based on:
 * https://github.com/node-fetch/node-fetch/blob/main/src/index.js
 *
 * @see https://fetch.spec.whatwg.org/#http-network-fetch
 */
export default class Fetch {
    #private;
    private reject;
    private resolve;
    private listeners;
    private isChunkedTransfer;
    private isProperLastChunkReceived;
    private previousChunk;
    private nodeRequest;
    private nodeResponse;
    private response;
    private responseHeaders;
    private interceptor;
    private requestHeaders;
    private request;
    private redirectCount;
    private disableCache;
    private disableSameOriginPolicy;
    private disablePreload;
    /**
     * Constructor.
     *
     * @param options Options.
     * @param options.browserFrame Browser frame.
     * @param options.window Window.
     * @param options.url URL.
     * @param [options.init] Init.
     * @param [options.redirectCount] Redirect count.
     * @param [options.contentType] Content Type.
     * @param [options.disableCache] Disables the use of cached responses. It will still store the response in the cache.
     * @param [options.disableSameOriginPolicy] Disables the Same-Origin policy.
     * @param [options.unfilteredHeaders] Unfiltered headers - necessary for preflight requests.
     * @param [options.disablePreload] Disables the use of preloaded responses.
     */
    constructor(options: {
        browserFrame: IBrowserFrame;
        window: BrowserWindow;
        url: TRequestInfo;
        init?: IRequestInit;
        redirectCount?: number;
        contentType?: string | null;
        disableCache?: boolean;
        disableSameOriginPolicy?: boolean;
        unfilteredHeaders?: Headers;
        disablePreload?: boolean;
    });
    /**
     * Sends request.
     *
     * @returns Response.
     */
    send(): Promise<Response>;
    /**
     * Returns cached response.
     *
     * @returns Response.
     */
    private getCachedResponse;
    /**
     * Returns virtual server response.
     *
     * @returns Response.
     */
    private getVirtualServerResponse;
    /**
     * Checks if the request complies with the Cross-Origin policy.
     *
     * @returns True if it complies with the policy.
     */
    private compliesWithCrossOriginPolicy;
    /**
     * Sends request.
     *
     * @returns Response.
     */
    private sendRequest;
    /**
     * Event listener for "socket" event.
     *
     * @param socket Socket.
     */
    private onSocket;
    /**
     * Event listener for signal "abort" event.
     *
     * @param event Event.
     */
    private onSignalAbort;
    /**
     * Event listener for request "error" event.
     *
     * @param error Error.
     */
    private onError;
    /**
     * Triggered when the async task manager aborts.
     */
    private onAsyncTaskManagerAbort;
    /**
     * Event listener for request "response" event.
     *
     * @param nodeResponse Node response.
     */
    private onResponse;
    /**
     * Handles redirect response.
     *
     * @param nodeResponse Node response.
     * @param responseHeaders Headers.
     * @returns True if redirect response was handled, false otherwise.
     */
    private handleRedirectResponse;
    /**
     * Finalizes the request.
     */
    private finalizeRequest;
    /**
     * Aborts the request.
     *
     * @param reason Reason.
     */
    private abort;
}
//# sourceMappingURL=Fetch.d.ts.map