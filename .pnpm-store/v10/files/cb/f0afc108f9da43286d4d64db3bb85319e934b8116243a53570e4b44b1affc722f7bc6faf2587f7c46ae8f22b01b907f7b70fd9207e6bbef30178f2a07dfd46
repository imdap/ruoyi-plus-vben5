import * as PropertySymbol from '../PropertySymbol.js';
import { URL } from 'url';
import DOMExceptionNameEnum from '../exception/DOMExceptionNameEnum.js';
import FetchBodyUtility from './utilities/FetchBodyUtility.js';
import Blob from '../file/Blob.js';
import FetchRequestValidationUtility from './utilities/FetchRequestValidationUtility.js';
import FetchRequestReferrerUtility from './utilities/FetchRequestReferrerUtility.js';
import FetchRequestHeaderUtility from './utilities/FetchRequestHeaderUtility.js';
import MultipartFormDataParser from './multipart/MultipartFormDataParser.js';
import WindowBrowserContext from '../window/WindowBrowserContext.js';
/**
 * Fetch request.
 *
 * Based on:
 * https://github.com/node-fetch/node-fetch/blob/main/src/request.js
 *
 * @see https://fetch.spec.whatwg.org/#request-class
 */
export default class Request {
    // Public properties
    [PropertySymbol.method];
    [PropertySymbol.body];
    [PropertySymbol.mode] = 'cors';
    [PropertySymbol.headers];
    [PropertySymbol.redirect];
    [PropertySymbol.referrerPolicy];
    [PropertySymbol.signal];
    [PropertySymbol.bodyUsed] = false;
    [PropertySymbol.credentials];
    // Internal properties
    [PropertySymbol.aborted] = false;
    [PropertySymbol.error] = null;
    [PropertySymbol.contentLength] = null;
    [PropertySymbol.contentType] = null;
    [PropertySymbol.referrer] = 'client';
    [PropertySymbol.url];
    [PropertySymbol.bodyBuffer];
    /**
     * Constructor.
     *
     * @param input Input.
     * @param [init] Init.
     */
    constructor(input, init) {
        const window = this[PropertySymbol.window];
        if (!window) {
            throw new TypeError(`Failed to construct 'Request': 'Request' was constructed outside a Window context.`);
        }
        if (typeof input !== `string` && !input) {
            throw new window.TypeError(`Failed to construct 'Request': 1 argument required, only 0 present.`);
        }
        this[PropertySymbol.method] = (init?.method || input.method || 'GET').toUpperCase();
        if (init?.mode) {
            switch (init.mode) {
                case 'navigate':
                case 'websocket':
                    throw new window.DOMException(`Failed to construct 'Request': Cannot construct a Request with a RequestInit whose mode member is set as '${init.mode}'.`, DOMExceptionNameEnum.securityError);
                case 'same-origin':
                case 'no-cors':
                case 'cors':
                    this[PropertySymbol.mode] = init.mode;
                    break;
                default:
                    throw new window.DOMException(`Failed to construct 'Request': The provided value '${init.mode}' is not a valid enum value of type RequestMode.`, DOMExceptionNameEnum.syntaxError);
            }
        }
        else if (input instanceof Request) {
            this[PropertySymbol.mode] = input.mode;
        }
        const { stream, buffer, contentType, contentLength } = FetchBodyUtility.getBodyStream(input instanceof Request && (input[PropertySymbol.bodyBuffer] || input.body)
            ? input[PropertySymbol.bodyBuffer] || FetchBodyUtility.cloneBodyStream(window, input)
            : (init?.body ?? null));
        this[PropertySymbol.bodyBuffer] = buffer;
        this[PropertySymbol.body] = stream;
        this[PropertySymbol.credentials] =
            init?.credentials || input.credentials || 'same-origin';
        this[PropertySymbol.headers] = new this[PropertySymbol.window].Headers(init?.headers || input.headers || {});
        FetchRequestHeaderUtility.removeForbiddenHeaders(this.headers);
        if (contentLength) {
            this[PropertySymbol.contentLength] = contentLength;
        }
        else if (!this.body && (this.method === 'POST' || this.method === 'PUT')) {
            this[PropertySymbol.contentLength] = 0;
        }
        if (contentType) {
            if (!this.headers.has('Content-Type')) {
                this.headers.set('Content-Type', contentType);
            }
            this[PropertySymbol.contentType] = contentType;
        }
        else if (input instanceof Request && input[PropertySymbol.contentType]) {
            this[PropertySymbol.contentType] = input[PropertySymbol.contentType];
        }
        this[PropertySymbol.redirect] = init?.redirect || input.redirect || 'follow';
        this[PropertySymbol.referrerPolicy] = ((init?.referrerPolicy || input.referrerPolicy || '').toLowerCase());
        this[PropertySymbol.signal] =
            init?.signal || input.signal || new window.AbortSignal();
        this[PropertySymbol.referrer] = FetchRequestReferrerUtility.getInitialReferrer(window, init?.referrer !== null && init?.referrer !== undefined
            ? init?.referrer
            : input.referrer);
        if (input instanceof URL) {
            this[PropertySymbol.url] = input;
        }
        else {
            try {
                if (input instanceof Request && input.url) {
                    this[PropertySymbol.url] = new URL(input.url, window.location.href);
                }
                else {
                    this[PropertySymbol.url] = new URL(input, window.location.href);
                }
            }
            catch (error) {
                throw new window.DOMException(`Failed to construct 'Request': Invalid URL "${input}" on document location '${window.location}'.${window.location.origin === 'null'
                    ? ' Relative URLs are not permitted on current document location.'
                    : ''}`, DOMExceptionNameEnum.notSupportedError);
            }
        }
        FetchRequestValidationUtility.validateMethod(this);
        FetchRequestValidationUtility.validateBody(this);
        FetchRequestValidationUtility.validateURL(this[PropertySymbol.url]);
        FetchRequestValidationUtility.validateReferrerPolicy(this.referrerPolicy);
        FetchRequestValidationUtility.validateRedirect(this.redirect);
    }
    /**
     * Returns method.
     *
     * @returns Method.
     */
    get method() {
        return this[PropertySymbol.method];
    }
    /**
     * Returns body.
     *
     * @returns Body.
     */
    get body() {
        return this[PropertySymbol.body];
    }
    /**
     * Returns mode.
     *
     * @returns Mode.
     */
    get mode() {
        return this[PropertySymbol.mode];
    }
    /**
     * Returns headers.
     *
     * @returns Headers.
     */
    get headers() {
        return this[PropertySymbol.headers];
    }
    /**
     * Returns redirect.
     *
     * @returns Redirect.
     */
    get redirect() {
        return this[PropertySymbol.redirect];
    }
    /**
     * Returns referrer policy.
     *
     * @returns Referrer policy.
     */
    get referrerPolicy() {
        return this[PropertySymbol.referrerPolicy];
    }
    /**
     * Returns signal.
     *
     * @returns Signal.
     */
    get signal() {
        return this[PropertySymbol.signal];
    }
    /**
     * Returns body used.
     *
     * @returns Body used.
     */
    get bodyUsed() {
        return this[PropertySymbol.bodyUsed];
    }
    /**
     * Returns credentials.
     *
     * @returns Credentials.
     */
    get credentials() {
        return this[PropertySymbol.credentials];
    }
    /**
     * Returns referrer.
     *
     * @returns Referrer.
     */
    get referrer() {
        if (!this[PropertySymbol.referrer] || this[PropertySymbol.referrer] === 'no-referrer') {
            return '';
        }
        if (this[PropertySymbol.referrer] === 'client') {
            return 'about:client';
        }
        return this[PropertySymbol.referrer].toString();
    }
    /**
     * Returns URL.
     *
     * @returns URL.
     */
    get url() {
        return this[PropertySymbol.url].href;
    }
    /**
     * Returns string tag.
     *
     * @returns String tag.
     */
    get [Symbol.toStringTag]() {
        return 'Request';
    }
    /**
     * Returns array buffer.
     *
     * @returns Array buffer.
     */
    async arrayBuffer() {
        const window = this[PropertySymbol.window];
        if (this[PropertySymbol.bodyUsed]) {
            throw new window.DOMException(`Body has already been used for "${this.url}".`, DOMExceptionNameEnum.invalidStateError);
        }
        const asyncTaskManager = new WindowBrowserContext(window).getAsyncTaskManager();
        this[PropertySymbol.bodyUsed] = true;
        const taskID = asyncTaskManager.startTask(() => {
            this[PropertySymbol.aborted] = true;
            this.signal[PropertySymbol.abort]();
        });
        let buffer;
        try {
            buffer = await FetchBodyUtility.consumeBodyStream(window, this);
        }
        catch (error) {
            asyncTaskManager.endTask(taskID);
            throw error;
        }
        asyncTaskManager.endTask(taskID);
        return (buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));
    }
    /**
     * Returns blob.
     *
     * @returns Blob.
     */
    async blob() {
        const type = this.headers.get('Content-Type') || '';
        const buffer = await this.arrayBuffer();
        return new Blob([buffer], { type });
    }
    /**
     * Returns buffer.
     *
     * @returns Buffer.
     */
    async buffer() {
        const window = this[PropertySymbol.window];
        if (this[PropertySymbol.bodyUsed]) {
            throw new window.DOMException(`Body has already been used for "${this.url}".`, DOMExceptionNameEnum.invalidStateError);
        }
        const asyncTaskManager = new WindowBrowserContext(window).getAsyncTaskManager();
        this[PropertySymbol.bodyUsed] = true;
        const taskID = asyncTaskManager.startTask(() => {
            this[PropertySymbol.aborted] = true;
            this.signal[PropertySymbol.abort]();
        });
        let buffer;
        try {
            buffer = await FetchBodyUtility.consumeBodyStream(window, this);
        }
        catch (error) {
            asyncTaskManager.endTask(taskID);
            throw error;
        }
        asyncTaskManager.endTask(taskID);
        return buffer;
    }
    /**
     * Returns text.
     *
     * @returns Text.
     */
    async text() {
        const window = this[PropertySymbol.window];
        if (this[PropertySymbol.bodyUsed]) {
            throw new window.DOMException(`Body has already been used for "${this.url}".`, DOMExceptionNameEnum.invalidStateError);
        }
        const asyncTaskManager = new WindowBrowserContext(window).getAsyncTaskManager();
        this[PropertySymbol.bodyUsed] = true;
        const taskID = asyncTaskManager.startTask(() => {
            this[PropertySymbol.aborted] = true;
            this.signal[PropertySymbol.abort]();
        });
        let buffer;
        try {
            buffer = await FetchBodyUtility.consumeBodyStream(window, this);
        }
        catch (error) {
            asyncTaskManager.endTask(taskID);
            throw error;
        }
        asyncTaskManager.endTask(taskID);
        return new TextDecoder().decode(buffer);
    }
    /**
     * Returns json.
     *
     * @returns JSON.
     */
    async json() {
        const text = await this.text();
        return JSON.parse(text);
    }
    /**
     * Returns FormData.
     *
     * @returns FormData.
     */
    async formData() {
        const window = this[PropertySymbol.window];
        const asyncTaskManager = new WindowBrowserContext(window).getAsyncTaskManager();
        const contentType = this.headers.get('Content-Type') ?? this[PropertySymbol.contentType];
        if (this.body && contentType && /multipart/i.test(contentType)) {
            if (this[PropertySymbol.bodyUsed]) {
                throw new window.DOMException(`Body has already been used for "${this.url}".`, DOMExceptionNameEnum.invalidStateError);
            }
            this[PropertySymbol.bodyUsed] = true;
            const taskID = asyncTaskManager.startTask(() => {
                this[PropertySymbol.aborted] = true;
                this.signal[PropertySymbol.abort]();
            });
            let formData;
            try {
                const result = await MultipartFormDataParser.streamToFormData(window, this, contentType);
                formData = result.formData;
            }
            catch (error) {
                asyncTaskManager.endTask(taskID);
                throw error;
            }
            asyncTaskManager.endTask(taskID);
            return formData;
        }
        if (contentType?.startsWith('application/x-www-form-urlencoded')) {
            const parameters = new URLSearchParams(await this.text());
            const formData = new window.FormData();
            for (const [key, value] of parameters) {
                formData.append(key, value);
            }
            return formData;
        }
        throw new window.DOMException(`Failed to construct FormData object: The "content-type" header is neither "application/x-www-form-urlencoded" nor "multipart/form-data".`, DOMExceptionNameEnum.invalidStateError);
    }
    /**
     * Clones request.
     *
     * @returns Clone.
     */
    clone() {
        return new this[PropertySymbol.window].Request(this);
    }
}
//# sourceMappingURL=Request.js.map