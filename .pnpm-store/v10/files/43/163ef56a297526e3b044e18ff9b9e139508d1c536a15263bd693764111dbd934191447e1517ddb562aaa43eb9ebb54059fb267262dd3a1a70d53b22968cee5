import * as PropertySymbol from '../PropertySymbol.js';
import type IRequestInit from './types/IRequestInit.js';
import { URL } from 'url';
import type { TRequestInfo } from './types/TRequestInfo.js';
import type Headers from './Headers.js';
import type AbortSignal from './AbortSignal.js';
import type { ReadableStream } from 'stream/web';
import Blob from '../file/Blob.js';
import type { TRequestReferrerPolicy } from './types/TRequestReferrerPolicy.js';
import type { TRequestRedirect } from './types/TRequestRedirect.js';
import type { TRequestCredentials } from './types/TRequestCredentials.js';
import type FormData from '../form-data/FormData.js';
import type BrowserWindow from '../window/BrowserWindow.js';
import type { TRequestMode } from './types/TRequestMode.js';
/**
 * Fetch request.
 *
 * Based on:
 * https://github.com/node-fetch/node-fetch/blob/main/src/request.js
 *
 * @see https://fetch.spec.whatwg.org/#request-class
 */
export default class Request implements Request {
    protected [PropertySymbol.window]: BrowserWindow;
    [PropertySymbol.method]: string;
    [PropertySymbol.body]: ReadableStream | null;
    [PropertySymbol.mode]: TRequestMode;
    [PropertySymbol.headers]: Headers;
    [PropertySymbol.redirect]: TRequestRedirect;
    [PropertySymbol.referrerPolicy]: TRequestReferrerPolicy;
    [PropertySymbol.signal]: AbortSignal;
    [PropertySymbol.bodyUsed]: boolean;
    [PropertySymbol.credentials]: TRequestCredentials;
    [PropertySymbol.aborted]: boolean;
    [PropertySymbol.error]: Error | null;
    [PropertySymbol.contentLength]: number | null;
    [PropertySymbol.contentType]: string | null;
    [PropertySymbol.referrer]: '' | 'no-referrer' | 'client' | URL;
    [PropertySymbol.url]: URL;
    [PropertySymbol.bodyBuffer]: Buffer | null;
    /**
     * Constructor.
     *
     * @param input Input.
     * @param [init] Init.
     */
    constructor(input: TRequestInfo, init?: IRequestInit);
    /**
     * Returns method.
     *
     * @returns Method.
     */
    get method(): string;
    /**
     * Returns body.
     *
     * @returns Body.
     */
    get body(): ReadableStream | null;
    /**
     * Returns mode.
     *
     * @returns Mode.
     */
    get mode(): TRequestMode;
    /**
     * Returns headers.
     *
     * @returns Headers.
     */
    get headers(): Headers;
    /**
     * Returns redirect.
     *
     * @returns Redirect.
     */
    get redirect(): TRequestRedirect;
    /**
     * Returns referrer policy.
     *
     * @returns Referrer policy.
     */
    get referrerPolicy(): TRequestReferrerPolicy;
    /**
     * Returns signal.
     *
     * @returns Signal.
     */
    get signal(): AbortSignal;
    /**
     * Returns body used.
     *
     * @returns Body used.
     */
    get bodyUsed(): boolean;
    /**
     * Returns credentials.
     *
     * @returns Credentials.
     */
    get credentials(): TRequestCredentials;
    /**
     * Returns referrer.
     *
     * @returns Referrer.
     */
    get referrer(): string;
    /**
     * Returns URL.
     *
     * @returns URL.
     */
    get url(): string;
    /**
     * Returns string tag.
     *
     * @returns String tag.
     */
    get [Symbol.toStringTag](): string;
    /**
     * Returns array buffer.
     *
     * @returns Array buffer.
     */
    arrayBuffer(): Promise<ArrayBuffer>;
    /**
     * Returns blob.
     *
     * @returns Blob.
     */
    blob(): Promise<Blob>;
    /**
     * Returns buffer.
     *
     * @returns Buffer.
     */
    buffer(): Promise<Buffer>;
    /**
     * Returns text.
     *
     * @returns Text.
     */
    text(): Promise<string>;
    /**
     * Returns json.
     *
     * @returns JSON.
     */
    json(): Promise<string>;
    /**
     * Returns FormData.
     *
     * @returns FormData.
     */
    formData(): Promise<FormData>;
    /**
     * Clones request.
     *
     * @returns Clone.
     */
    clone(): Request;
}
//# sourceMappingURL=Request.d.ts.map