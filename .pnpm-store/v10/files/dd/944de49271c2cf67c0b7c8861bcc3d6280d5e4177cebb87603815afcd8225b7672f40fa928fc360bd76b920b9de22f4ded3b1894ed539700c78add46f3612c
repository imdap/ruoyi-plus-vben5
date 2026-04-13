import HTMLElement from '../html-element/HTMLElement.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import type HTMLFormElement from '../html-form-element/HTMLFormElement.js';
import type Event from '../../event/Event.js';
import type HTMLInputElement from '../html-input-element/HTMLInputElement.js';
import type HTMLButtonElement from '../html-button-element/HTMLButtonElement.js';
import type HTMLMeterElement from '../html-meter-element/HTMLMeterElement.js';
import type HTMLOutputElement from '../html-output-element/HTMLOutputElement.js';
import type HTMLProgressElement from '../html-progress-element/HTMLProgressElement.js';
import type HTMLSelectElement from '../html-select-element/HTMLSelectElement.js';
import type HTMLTextAreaElement from '../html-text-area-element/HTMLTextAreaElement.js';
/**
 * HTML Label Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement.
 */
export default class HTMLLabelElement extends HTMLElement {
    cloneNode: (deep?: boolean) => HTMLLabelElement;
    /**
     * Returns a string containing the ID of the labeled control. This reflects the "for" attribute.
     *
     * @returns ID of the labeled control.
     */
    get htmlFor(): string;
    /**
     * Sets a string containing the ID of the labeled control. This reflects the "for" attribute.
     *
     * @param htmlFor ID of the labeled control.
     */
    set htmlFor(htmlFor: string);
    /**
     * Returns an HTML element representing the control with which the label is associated.
     *
     * @returns Control element.
     */
    get control(): HTMLInputElement | HTMLButtonElement | HTMLMeterElement | HTMLOutputElement | HTMLProgressElement | HTMLSelectElement | HTMLTextAreaElement | null;
    /**
     * Returns the parent form element.
     *
     * @returns Form.
     */
    get form(): HTMLFormElement | null;
    /**
     * @override
     */
    [PropertySymbol.cloneNode](deep?: boolean): HTMLLabelElement;
    /**
     * @override
     */
    dispatchEvent(event: Event): boolean;
}
//# sourceMappingURL=HTMLLabelElement.d.ts.map