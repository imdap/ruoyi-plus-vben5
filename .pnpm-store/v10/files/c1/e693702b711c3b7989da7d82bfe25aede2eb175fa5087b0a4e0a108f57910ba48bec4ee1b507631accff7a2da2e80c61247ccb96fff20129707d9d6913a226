import EventTarget from '../event/EventTarget.js';
import * as PropertySymbol from '../PropertySymbol.js';
import Blob from '../file/Blob.js';
import WS from 'ws';
/**
 * Represents a WebSocket.
 *
 * Based on:
 * https://github.com/jsdom/jsdom/blob/main/lib/jsdom/living/websockets/WebSocket-impl.js
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
 */
export default class WebSocket extends EventTarget {
    #private;
    static readonly CONNECTING: number;
    static readonly OPEN: number;
    static readonly CLOSING: number;
    static readonly CLOSED: number;
    [PropertySymbol.webSocket]: WS | null;
    /**
     *
     * @param url
     * @param protocols
     */
    constructor(url: string, protocols?: string | string[]);
    /**
     * Returns the ready state.
     *
     * @returns The ready state.
     */
    get readyState(): number;
    /**
     * Returns the extensions.
     *
     * @returns The extensions.
     */
    get extensions(): string;
    /**
     * Returns the binary type.
     *
     * @returns The binary type.
     */
    get binaryType(): 'blob' | 'arraybuffer';
    /**
     * Sets the binary type.
     *
     * @param value The binary type.
     */
    set binaryType(value: 'blob' | 'arraybuffer');
    /**
     * Returns protocol.
     */
    get protocol(): string;
    /**
     * Returns the URL.
     *
     * @returns The URL.
     */
    get url(): string;
    /**
     * Closes the WebSocket.
     *
     * @param [code] Code.
     * @param [reason] Reason.
     */
    close(code?: number, reason?: string | Buffer<ArrayBufferLike>): void;
    /**
     * Sends data through the WebSocket.
     *
     * @param data Data.
     */
    send(data: ArrayBuffer | ArrayBufferView | Blob | Buffer | string): void;
    /**
     * Destroys the WebSocket.
     */
    [PropertySymbol.destroy](): void;
}
//# sourceMappingURL=WebSocket.d.ts.map