import type ProgressEvent from '../event/events/ProgressEvent.js';
import EventTarget from '../event/EventTarget.js';
import * as PropertySymbol from '../PropertySymbol.js';
export type ProgressEventListener = (event: ProgressEvent) => void;
/**
 * References: https://xhr.spec.whatwg.org/#xmlhttprequesteventtarget.
 */
export default class XMLHttpRequestEventTarget extends EventTarget {
    [PropertySymbol.propertyEventListeners]: Map<string, ProgressEventListener | null>;
    get onloadstart(): ProgressEventListener | null;
    set onloadstart(value: ProgressEventListener | null);
    get onprogress(): ProgressEventListener | null;
    set onprogress(value: ProgressEventListener | null);
    get onabort(): ((event: ProgressEvent) => void) | null;
    set onabort(value: ((event: ProgressEvent) => void) | null);
    get onerror(): ProgressEventListener | null;
    set onerror(value: ProgressEventListener | null);
    get onload(): ProgressEventListener | null;
    set onload(value: ProgressEventListener | null);
    get ontimeout(): ProgressEventListener | null;
    set ontimeout(value: ProgressEventListener | null);
    get onloadend(): ProgressEventListener | null;
    set onloadend(value: ProgressEventListener | null);
}
//# sourceMappingURL=XMLHttpRequestEventTarget.d.ts.map