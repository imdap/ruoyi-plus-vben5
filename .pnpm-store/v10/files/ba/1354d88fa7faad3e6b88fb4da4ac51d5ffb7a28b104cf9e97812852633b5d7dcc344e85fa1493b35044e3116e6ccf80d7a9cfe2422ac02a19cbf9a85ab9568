import Event from '../../event/Event.js';
import HTMLElement from '../html-element/HTMLElement.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import EventPhaseEnum from '../../event/EventPhaseEnum.js';
import MouseEvent from '../../event/events/MouseEvent.js';
import ElementEventAttributeUtility from '../element/ElementEventAttributeUtility.js';
/**
 * HTMLDetailsElement
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLDetailsElement
 */
export default class HTMLDetailsElement extends HTMLElement {
    // Events
    /* eslint-disable jsdoc/require-jsdoc */
    get ontoggle() {
        return ElementEventAttributeUtility.getEventListener(this, 'ontoggle');
    }
    set ontoggle(value) {
        this[PropertySymbol.propertyEventListeners].set('ontoggle', value);
    }
    /* eslint-enable jsdoc/require-jsdoc */
    /**
     * Returns the open attribute.
     */
    get open() {
        return this.getAttribute('open') !== null;
    }
    /**
     * Sets the open attribute.
     *
     * @param open New value.
     */
    set open(open) {
        if (open) {
            this.setAttribute('open', '');
        }
        else {
            this.removeAttribute('open');
        }
    }
    /**
     * @override
     */
    [PropertySymbol.onSetAttribute](attribute, replacedAttribute) {
        super[PropertySymbol.onSetAttribute](attribute, replacedAttribute);
        if (attribute[PropertySymbol.name] === 'open') {
            if (attribute[PropertySymbol.value] !== replacedAttribute?.[PropertySymbol.value]) {
                this.dispatchEvent(new Event('toggle'));
            }
        }
    }
    /**
     * @override
     */
    [PropertySymbol.onRemoveAttribute](removedAttribute) {
        super[PropertySymbol.onRemoveAttribute](removedAttribute);
        if (removedAttribute && removedAttribute[PropertySymbol.name] === 'open') {
            this.dispatchEvent(new Event('toggle'));
        }
    }
    /**
     * @override
     */
    dispatchEvent(event) {
        const returnValue = super.dispatchEvent(event);
        if (!event[PropertySymbol.defaultPrevented] &&
            event.type === 'click' &&
            event.eventPhase === EventPhaseEnum.bubbling &&
            event instanceof MouseEvent) {
            const target = event[PropertySymbol.target];
            if (target) {
                if (target[PropertySymbol.localName] === 'summary' &&
                    target[PropertySymbol.parentNode] === this) {
                    this.open = !this.open;
                }
                else {
                    let summaryElement = target;
                    for (const element of this[PropertySymbol.elementArray]) {
                        if (element[PropertySymbol.localName] === 'summary') {
                            summaryElement = element;
                            break;
                        }
                    }
                    if (summaryElement && summaryElement.contains(target)) {
                        this.open = !this.open;
                    }
                }
            }
        }
        return returnValue;
    }
}
//# sourceMappingURL=HTMLDetailsElement.js.map