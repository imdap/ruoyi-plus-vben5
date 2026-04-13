import FocusEvent from '../../event/events/FocusEvent.js';
import * as PropertySymbol from '../../PropertySymbol.js';
/**
 * HTMLElement utility.
 */
export default class HTMLElementUtility {
    /**
     * Triggers a blur event.
     *
     * @param element Element.
     */
    static blur(element) {
        const target = element[PropertySymbol.proxy] || element;
        const document = target[PropertySymbol.ownerDocument];
        if (document[PropertySymbol.activeElement] !== target ||
            !target[PropertySymbol.isConnected] ||
            target.disabled) {
            return;
        }
        const relatedTarget = document[PropertySymbol.nextActiveElement] ?? null;
        document[PropertySymbol.activeElement] = null;
        document[PropertySymbol.clearCache]();
        target.dispatchEvent(new FocusEvent('blur', {
            relatedTarget,
            bubbles: false,
            composed: true,
            cancelable: true
        }));
        target.dispatchEvent(new FocusEvent('focusout', {
            relatedTarget,
            bubbles: true,
            composed: true,
            cancelable: true
        }));
    }
    /**
     * Triggers a focus event.
     *
     * @param element Element.
     */
    static focus(element) {
        const target = element[PropertySymbol.proxy] || element;
        const document = target[PropertySymbol.ownerDocument];
        if (document[PropertySymbol.activeElement] === target ||
            !target[PropertySymbol.isConnected] ||
            target.disabled ||
            this.isInert(target)) {
            return;
        }
        // Set the next active element so `blur` can use it for `relatedTarget`.
        document[PropertySymbol.nextActiveElement] = target;
        const relatedTarget = document[PropertySymbol.activeElement];
        if (document[PropertySymbol.activeElement] !== null) {
            document[PropertySymbol.activeElement].blur();
        }
        // Clean up after blur, so it does not affect next blur call.
        document[PropertySymbol.nextActiveElement] = null;
        document[PropertySymbol.activeElement] = target;
        document[PropertySymbol.clearCache]();
        target.dispatchEvent(new FocusEvent('focus', {
            relatedTarget,
            bubbles: false,
            composed: true
        }));
        target.dispatchEvent(new FocusEvent('focusin', {
            relatedTarget,
            bubbles: true,
            composed: true
        }));
    }
    /**
     * Returns whether an element or any of its ancestors has the inert attribute.
     *
     * @param element Element to check.
     * @returns True if the element is in an inert tree.
     */
    static isInert(element) {
        let current = ((element[PropertySymbol.proxy] || element));
        while (current && typeof current.getAttribute === 'function') {
            if (current.getAttribute('inert') !== null) {
                return true;
            }
            current = current[PropertySymbol.parentNode];
        }
        return false;
    }
}
//# sourceMappingURL=HTMLElementUtility.js.map