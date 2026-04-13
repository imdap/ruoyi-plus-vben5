import EventTarget from '../event/EventTarget.js';
import * as PropertySymbol from '../PropertySymbol.js';
/**
 * References: https://xhr.spec.whatwg.org/#xmlhttprequesteventtarget.
 */
export default class XMLHttpRequestEventTarget extends EventTarget {
    // Internal properties
    [PropertySymbol.propertyEventListeners] = new Map();
    /* eslint-disable jsdoc/require-jsdoc */
    get onloadstart() {
        return ((this[PropertySymbol.propertyEventListeners].get('onloadstart') ?? null));
    }
    set onloadstart(value) {
        this[PropertySymbol.propertyEventListeners].set('onloadstart', value);
    }
    get onprogress() {
        return ((this[PropertySymbol.propertyEventListeners].get('onprogress') ?? null));
    }
    set onprogress(value) {
        this[PropertySymbol.propertyEventListeners].set('onprogress', value);
    }
    get onabort() {
        return ((this[PropertySymbol.propertyEventListeners].get('onabort') ?? null));
    }
    set onabort(value) {
        this[PropertySymbol.propertyEventListeners].set('onabort', value);
    }
    get onerror() {
        return ((this[PropertySymbol.propertyEventListeners].get('onerror') ?? null));
    }
    set onerror(value) {
        this[PropertySymbol.propertyEventListeners].set('onerror', value);
    }
    get onload() {
        return ((this[PropertySymbol.propertyEventListeners].get('onload') ?? null));
    }
    set onload(value) {
        this[PropertySymbol.propertyEventListeners].set('onload', value);
    }
    get ontimeout() {
        return ((this[PropertySymbol.propertyEventListeners].get('ontimeout') ?? null));
    }
    set ontimeout(value) {
        this[PropertySymbol.propertyEventListeners].set('ontimeout', value);
    }
    get onloadend() {
        return ((this[PropertySymbol.propertyEventListeners].get('onloadend') ?? null));
    }
    set onloadend(value) {
        this[PropertySymbol.propertyEventListeners].set('onloadend', value);
    }
}
//# sourceMappingURL=XMLHttpRequestEventTarget.js.map