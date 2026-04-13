import ProgressEvent from '../event/events/ProgressEvent.js';
import Blob from './Blob.js';
import EventTarget from '../event/EventTarget.js';
import { Buffer } from 'buffer';
/**
 * Reference:
 * https://developer.mozilla.org/sv-SE/docs/Web/API/FileReader.
 *
 * Based on:
 * https://github.com/jsdom/jsdom/blob/master/lib/jsdom/living/file-api/FileReader-impl.js (MIT licensed).
 */
export default class FileReader extends EventTarget {
    #private;
    readonly error: Error | null;
    readonly result: Buffer | ArrayBuffer | string | null;
    readonly readyState: number;
    readonly onabort: ((event: ProgressEvent) => void) | null;
    readonly onerror: ((event: ProgressEvent) => void) | null;
    readonly onload: ((event: ProgressEvent) => void) | null;
    readonly onloadstart: ((event: ProgressEvent) => void) | null;
    readonly onloadend: ((event: ProgressEvent) => void) | null;
    readonly onprogress: ((event: ProgressEvent) => void) | null;
    /**
     * Constructor.
     */
    constructor();
    /**
     * Reads as ArrayBuffer.
     *
     * @param blob Blob.
     */
    readAsArrayBuffer(blob: Blob): void;
    /**
     * Reads as binary string.
     *
     * @param blob Blob.
     */
    readAsBinaryString(blob: Blob): void;
    /**
     * Reads as data URL.
     *
     * @param blob Blob.
     */
    readAsDataURL(blob: Blob): void;
    /**
     * Reads as text.
     *
     * @param blob Blob.
     * @param [encoding] Encoding.
     */
    readAsText(blob: Blob, encoding?: string | null): void;
    /**
     * Aborts the file reader.
     */
    abort(): void;
}
//# sourceMappingURL=FileReader.d.ts.map