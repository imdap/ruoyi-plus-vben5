import CSSStyleDeclaration from '../../css/declaration/CSSStyleDeclaration.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import Element from '../element/Element.js';
import HTMLElementUtility from '../html-element/HTMLElementUtility.js';
import DOMStringMap from '../../dom/DOMStringMap.js';
import ElementEventAttributeUtility from '../element/ElementEventAttributeUtility.js';
/**
 * SVG Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/SVGElement.
 */
export default class SVGElement extends Element {
    // Internal properties
    [PropertySymbol.style] = null;
    // Private properties
    #dataset = null;
    // Events
    /* eslint-disable jsdoc/require-jsdoc */
    get onabort() {
        return ElementEventAttributeUtility.getEventListener(this, 'onabort');
    }
    set onabort(value) {
        this[PropertySymbol.propertyEventListeners].set('onabort', value);
    }
    get onanimationend() {
        return ElementEventAttributeUtility.getEventListener(this, 'onanimationend');
    }
    set onanimationend(value) {
        this[PropertySymbol.propertyEventListeners].set('onanimationend', value);
    }
    get onanimationiteration() {
        return ElementEventAttributeUtility.getEventListener(this, 'onanimationiteration');
    }
    set onanimationiteration(value) {
        this[PropertySymbol.propertyEventListeners].set('onanimationiteration', value);
    }
    get onanimationstart() {
        return ElementEventAttributeUtility.getEventListener(this, 'onanimationstart');
    }
    set onanimationstart(value) {
        this[PropertySymbol.propertyEventListeners].set('onanimationstart', value);
    }
    get onauxclick() {
        return ElementEventAttributeUtility.getEventListener(this, 'onauxclick');
    }
    set onauxclick(value) {
        this[PropertySymbol.propertyEventListeners].set('onauxclick', value);
    }
    get onblur() {
        return ElementEventAttributeUtility.getEventListener(this, 'onblur');
    }
    set onblur(value) {
        this[PropertySymbol.propertyEventListeners].set('onblur', value);
    }
    get oncancel() {
        return ElementEventAttributeUtility.getEventListener(this, 'oncancel');
    }
    set oncancel(value) {
        this[PropertySymbol.propertyEventListeners].set('oncancel', value);
    }
    get oncanplay() {
        return ElementEventAttributeUtility.getEventListener(this, 'oncanplay');
    }
    set oncanplay(value) {
        this[PropertySymbol.propertyEventListeners].set('oncanplay', value);
    }
    get oncanplaythrough() {
        return ElementEventAttributeUtility.getEventListener(this, 'oncanplaythrough');
    }
    set oncanplaythrough(value) {
        this[PropertySymbol.propertyEventListeners].set('oncanplaythrough', value);
    }
    get onchange() {
        return ElementEventAttributeUtility.getEventListener(this, 'onchange');
    }
    set onchange(value) {
        this[PropertySymbol.propertyEventListeners].set('onchange', value);
    }
    get onclick() {
        return ElementEventAttributeUtility.getEventListener(this, 'onclick');
    }
    set onclick(value) {
        this[PropertySymbol.propertyEventListeners].set('onclick', value);
    }
    get onclose() {
        return ElementEventAttributeUtility.getEventListener(this, 'onclose');
    }
    set onclose(value) {
        this[PropertySymbol.propertyEventListeners].set('onclose', value);
    }
    get oncontextmenu() {
        return ElementEventAttributeUtility.getEventListener(this, 'oncontextmenu');
    }
    set oncontextmenu(value) {
        this[PropertySymbol.propertyEventListeners].set('oncontextmenu', value);
    }
    get oncopy() {
        return ElementEventAttributeUtility.getEventListener(this, 'oncopy');
    }
    set oncopy(value) {
        this[PropertySymbol.propertyEventListeners].set('oncopy', value);
    }
    get oncuechange() {
        return ElementEventAttributeUtility.getEventListener(this, 'oncuechange');
    }
    set oncuechange(value) {
        this[PropertySymbol.propertyEventListeners].set('oncuechange', value);
    }
    get oncut() {
        return ElementEventAttributeUtility.getEventListener(this, 'oncut');
    }
    set oncut(value) {
        this[PropertySymbol.propertyEventListeners].set('oncut', value);
    }
    get ondblclick() {
        return ElementEventAttributeUtility.getEventListener(this, 'ondblclick');
    }
    set ondblclick(value) {
        this[PropertySymbol.propertyEventListeners].set('ondblclick', value);
    }
    get ondrag() {
        return ElementEventAttributeUtility.getEventListener(this, 'ondrag');
    }
    set ondrag(value) {
        this[PropertySymbol.propertyEventListeners].set('ondrag', value);
    }
    get ondragend() {
        return ElementEventAttributeUtility.getEventListener(this, 'ondragend');
    }
    set ondragend(value) {
        this[PropertySymbol.propertyEventListeners].set('ondragend', value);
    }
    get ondragenter() {
        return ElementEventAttributeUtility.getEventListener(this, 'ondragenter');
    }
    set ondragenter(value) {
        this[PropertySymbol.propertyEventListeners].set('ondragenter', value);
    }
    get ondragleave() {
        return ElementEventAttributeUtility.getEventListener(this, 'ondragleave');
    }
    set ondragleave(value) {
        this[PropertySymbol.propertyEventListeners].set('ondragleave', value);
    }
    get ondragover() {
        return ElementEventAttributeUtility.getEventListener(this, 'ondragover');
    }
    set ondragover(value) {
        this[PropertySymbol.propertyEventListeners].set('ondragover', value);
    }
    get ondragstart() {
        return ElementEventAttributeUtility.getEventListener(this, 'ondragstart');
    }
    set ondragstart(value) {
        this[PropertySymbol.propertyEventListeners].set('ondragstart', value);
    }
    get ondrop() {
        return ElementEventAttributeUtility.getEventListener(this, 'ondrop');
    }
    set ondrop(value) {
        this[PropertySymbol.propertyEventListeners].set('ondrop', value);
    }
    get ondurationchange() {
        return ElementEventAttributeUtility.getEventListener(this, 'ondurationchange');
    }
    set ondurationchange(value) {
        this[PropertySymbol.propertyEventListeners].set('ondurationchange', value);
    }
    get onemptied() {
        return ElementEventAttributeUtility.getEventListener(this, 'onemptied');
    }
    set onemptied(value) {
        this[PropertySymbol.propertyEventListeners].set('onemptied', value);
    }
    get onended() {
        return ElementEventAttributeUtility.getEventListener(this, 'onended');
    }
    set onended(value) {
        this[PropertySymbol.propertyEventListeners].set('onended', value);
    }
    get onerror() {
        return ElementEventAttributeUtility.getEventListener(this, 'onerror');
    }
    set onerror(value) {
        this[PropertySymbol.propertyEventListeners].set('onerror', value);
    }
    get onfocus() {
        return ElementEventAttributeUtility.getEventListener(this, 'onfocus');
    }
    set onfocus(value) {
        this[PropertySymbol.propertyEventListeners].set('onfocus', value);
    }
    get onformdata() {
        return ElementEventAttributeUtility.getEventListener(this, 'onformdata');
    }
    set onformdata(value) {
        this[PropertySymbol.propertyEventListeners].set('onformdata', value);
    }
    get ongotpointercapture() {
        return ElementEventAttributeUtility.getEventListener(this, 'ongotpointercapture');
    }
    set ongotpointercapture(value) {
        this[PropertySymbol.propertyEventListeners].set('ongotpointercapture', value);
    }
    get oninput() {
        return ElementEventAttributeUtility.getEventListener(this, 'oninput');
    }
    set oninput(value) {
        this[PropertySymbol.propertyEventListeners].set('oninput', value);
    }
    get oninvalid() {
        return ElementEventAttributeUtility.getEventListener(this, 'oninvalid');
    }
    set oninvalid(value) {
        this[PropertySymbol.propertyEventListeners].set('oninvalid', value);
    }
    get onkeydown() {
        return ElementEventAttributeUtility.getEventListener(this, 'onkeydown');
    }
    set onkeydown(value) {
        this[PropertySymbol.propertyEventListeners].set('onkeydown', value);
    }
    get onkeypress() {
        return ElementEventAttributeUtility.getEventListener(this, 'onkeypress');
    }
    set onkeypress(value) {
        this[PropertySymbol.propertyEventListeners].set('onkeypress', value);
    }
    get onkeyup() {
        return ElementEventAttributeUtility.getEventListener(this, 'onkeyup');
    }
    set onkeyup(value) {
        this[PropertySymbol.propertyEventListeners].set('onkeyup', value);
    }
    get onload() {
        return ElementEventAttributeUtility.getEventListener(this, 'onload');
    }
    set onload(value) {
        this[PropertySymbol.propertyEventListeners].set('onload', value);
    }
    get onloadeddata() {
        return ElementEventAttributeUtility.getEventListener(this, 'onloadeddata');
    }
    set onloadeddata(value) {
        this[PropertySymbol.propertyEventListeners].set('onloadeddata', value);
    }
    get onloadedmetadata() {
        return ElementEventAttributeUtility.getEventListener(this, 'onloadedmetadata');
    }
    set onloadedmetadata(value) {
        this[PropertySymbol.propertyEventListeners].set('onloadedmetadata', value);
    }
    get onloadstart() {
        return ElementEventAttributeUtility.getEventListener(this, 'onloadstart');
    }
    set onloadstart(value) {
        this[PropertySymbol.propertyEventListeners].set('onloadstart', value);
    }
    get onlostpointercapture() {
        return ElementEventAttributeUtility.getEventListener(this, 'onlostpointercapture');
    }
    set onlostpointercapture(value) {
        this[PropertySymbol.propertyEventListeners].set('onlostpointercapture', value);
    }
    get onmousedown() {
        return ElementEventAttributeUtility.getEventListener(this, 'onmousedown');
    }
    set onmousedown(value) {
        this[PropertySymbol.propertyEventListeners].set('onmousedown', value);
    }
    get onmouseenter() {
        return ElementEventAttributeUtility.getEventListener(this, 'onmouseenter');
    }
    set onmouseenter(value) {
        this[PropertySymbol.propertyEventListeners].set('onmouseenter', value);
    }
    get onmouseleave() {
        return ElementEventAttributeUtility.getEventListener(this, 'onmouseleave');
    }
    set onmouseleave(value) {
        this[PropertySymbol.propertyEventListeners].set('onmouseleave', value);
    }
    get onmousemove() {
        return ElementEventAttributeUtility.getEventListener(this, 'onmousemove');
    }
    set onmousemove(value) {
        this[PropertySymbol.propertyEventListeners].set('onmousemove', value);
    }
    get onmouseout() {
        return ElementEventAttributeUtility.getEventListener(this, 'onmouseout');
    }
    set onmouseout(value) {
        this[PropertySymbol.propertyEventListeners].set('onmouseout', value);
    }
    get onmouseover() {
        return ElementEventAttributeUtility.getEventListener(this, 'onmouseover');
    }
    set onmouseover(value) {
        this[PropertySymbol.propertyEventListeners].set('onmouseover', value);
    }
    get onmouseup() {
        return ElementEventAttributeUtility.getEventListener(this, 'onmouseup');
    }
    set onmouseup(value) {
        this[PropertySymbol.propertyEventListeners].set('onmouseup', value);
    }
    get onmousewheel() {
        return ElementEventAttributeUtility.getEventListener(this, 'onmousewheel');
    }
    set onmousewheel(value) {
        this[PropertySymbol.propertyEventListeners].set('onmousewheel', value);
    }
    get onpaste() {
        return ElementEventAttributeUtility.getEventListener(this, 'onpaste');
    }
    set onpaste(value) {
        this[PropertySymbol.propertyEventListeners].set('onpaste', value);
    }
    get onpause() {
        return ElementEventAttributeUtility.getEventListener(this, 'onpause');
    }
    set onpause(value) {
        this[PropertySymbol.propertyEventListeners].set('onpause', value);
    }
    get onplay() {
        return ElementEventAttributeUtility.getEventListener(this, 'onplay');
    }
    set onplay(value) {
        this[PropertySymbol.propertyEventListeners].set('onplay', value);
    }
    get onplaying() {
        return ElementEventAttributeUtility.getEventListener(this, 'onplaying');
    }
    set onplaying(value) {
        this[PropertySymbol.propertyEventListeners].set('onplaying', value);
    }
    get onpointercancel() {
        return ElementEventAttributeUtility.getEventListener(this, 'onpointercancel');
    }
    set onpointercancel(value) {
        this[PropertySymbol.propertyEventListeners].set('onpointercancel', value);
    }
    get onpointerdown() {
        return ElementEventAttributeUtility.getEventListener(this, 'onpointerdown');
    }
    set onpointerdown(value) {
        this[PropertySymbol.propertyEventListeners].set('onpointerdown', value);
    }
    get onpointerenter() {
        return ElementEventAttributeUtility.getEventListener(this, 'onpointerenter');
    }
    set onpointerenter(value) {
        this[PropertySymbol.propertyEventListeners].set('onpointerenter', value);
    }
    get onpointerleave() {
        return ElementEventAttributeUtility.getEventListener(this, 'onpointerleave');
    }
    set onpointerleave(value) {
        this[PropertySymbol.propertyEventListeners].set('onpointerleave', value);
    }
    get onpointermove() {
        return ElementEventAttributeUtility.getEventListener(this, 'onpointermove');
    }
    set onpointermove(value) {
        this[PropertySymbol.propertyEventListeners].set('onpointermove', value);
    }
    get onpointerout() {
        return ElementEventAttributeUtility.getEventListener(this, 'onpointerout');
    }
    set onpointerout(value) {
        this[PropertySymbol.propertyEventListeners].set('onpointerout', value);
    }
    get onpointerover() {
        return ElementEventAttributeUtility.getEventListener(this, 'onpointerover');
    }
    set onpointerover(value) {
        this[PropertySymbol.propertyEventListeners].set('onpointerover', value);
    }
    get onpointerrawupdate() {
        return ElementEventAttributeUtility.getEventListener(this, 'onpointerrawupdate');
    }
    set onpointerrawupdate(value) {
        this[PropertySymbol.propertyEventListeners].set('onpointerrawupdate', value);
    }
    get onpointerup() {
        return ElementEventAttributeUtility.getEventListener(this, 'onpointerup');
    }
    set onpointerup(value) {
        this[PropertySymbol.propertyEventListeners].set('onpointerup', value);
    }
    get onprogress() {
        return ElementEventAttributeUtility.getEventListener(this, 'onprogress');
    }
    set onprogress(value) {
        this[PropertySymbol.propertyEventListeners].set('onprogress', value);
    }
    get onratechange() {
        return ElementEventAttributeUtility.getEventListener(this, 'onratechange');
    }
    set onratechange(value) {
        this[PropertySymbol.propertyEventListeners].set('onratechange', value);
    }
    get onreset() {
        return ElementEventAttributeUtility.getEventListener(this, 'onreset');
    }
    set onreset(value) {
        this[PropertySymbol.propertyEventListeners].set('onreset', value);
    }
    get onresize() {
        return ElementEventAttributeUtility.getEventListener(this, 'onresize');
    }
    set onresize(value) {
        this[PropertySymbol.propertyEventListeners].set('onresize', value);
    }
    get onscroll() {
        return ElementEventAttributeUtility.getEventListener(this, 'onscroll');
    }
    set onscroll(value) {
        this[PropertySymbol.propertyEventListeners].set('onscroll', value);
    }
    get onscrollend() {
        return ElementEventAttributeUtility.getEventListener(this, 'onscrollend');
    }
    set onscrollend(value) {
        this[PropertySymbol.propertyEventListeners].set('onscrollend', value);
    }
    get onscrollsnapchange() {
        return ElementEventAttributeUtility.getEventListener(this, 'onscrollsnapchange');
    }
    set onscrollsnapchange(value) {
        this[PropertySymbol.propertyEventListeners].set('onscrollsnapchange', value);
    }
    get onscrollsnapchanging() {
        return ElementEventAttributeUtility.getEventListener(this, 'onscrollsnapchanging');
    }
    set onscrollsnapchanging(value) {
        this[PropertySymbol.propertyEventListeners].set('onscrollsnapchanging', value);
    }
    get onsecuritypolicyviolation() {
        return ElementEventAttributeUtility.getEventListener(this, 'onsecuritypolicyviolation');
    }
    set onsecuritypolicyviolation(value) {
        this[PropertySymbol.propertyEventListeners].set('onsecuritypolicyviolation', value);
    }
    get onseeked() {
        return ElementEventAttributeUtility.getEventListener(this, 'onseeked');
    }
    set onseeked(value) {
        this[PropertySymbol.propertyEventListeners].set('onseeked', value);
    }
    get onseeking() {
        return ElementEventAttributeUtility.getEventListener(this, 'onseeking');
    }
    set onseeking(value) {
        this[PropertySymbol.propertyEventListeners].set('onseeking', value);
    }
    get onselect() {
        return ElementEventAttributeUtility.getEventListener(this, 'onselect');
    }
    set onselect(value) {
        this[PropertySymbol.propertyEventListeners].set('onselect', value);
    }
    get onselectionchange() {
        return ElementEventAttributeUtility.getEventListener(this, 'onselectionchange');
    }
    set onselectionchange(value) {
        this[PropertySymbol.propertyEventListeners].set('onselectionchange', value);
    }
    get onselectstart() {
        return ElementEventAttributeUtility.getEventListener(this, 'onselectstart');
    }
    set onselectstart(value) {
        this[PropertySymbol.propertyEventListeners].set('onselectstart', value);
    }
    get onslotchange() {
        return ElementEventAttributeUtility.getEventListener(this, 'onslotchange');
    }
    set onslotchange(value) {
        this[PropertySymbol.propertyEventListeners].set('onslotchange', value);
    }
    get onstalled() {
        return ElementEventAttributeUtility.getEventListener(this, 'onstalled');
    }
    set onstalled(value) {
        this[PropertySymbol.propertyEventListeners].set('onstalled', value);
    }
    get onsubmit() {
        return ElementEventAttributeUtility.getEventListener(this, 'onsubmit');
    }
    set onsubmit(value) {
        this[PropertySymbol.propertyEventListeners].set('onsubmit', value);
    }
    get onsuspend() {
        return ElementEventAttributeUtility.getEventListener(this, 'onsuspend');
    }
    set onsuspend(value) {
        this[PropertySymbol.propertyEventListeners].set('onsuspend', value);
    }
    get ontimeupdate() {
        return ElementEventAttributeUtility.getEventListener(this, 'ontimeupdate');
    }
    set ontimeupdate(value) {
        this[PropertySymbol.propertyEventListeners].set('ontimeupdate', value);
    }
    get ontoggle() {
        return ElementEventAttributeUtility.getEventListener(this, 'ontoggle');
    }
    set ontoggle(value) {
        this[PropertySymbol.propertyEventListeners].set('ontoggle', value);
    }
    get ontransitioncancel() {
        return ElementEventAttributeUtility.getEventListener(this, 'ontransitioncancel');
    }
    set ontransitioncancel(value) {
        this[PropertySymbol.propertyEventListeners].set('ontransitioncancel', value);
    }
    get ontransitionend() {
        return ElementEventAttributeUtility.getEventListener(this, 'ontransitionend');
    }
    set ontransitionend(value) {
        this[PropertySymbol.propertyEventListeners].set('ontransitionend', value);
    }
    get ontransitionrun() {
        return ElementEventAttributeUtility.getEventListener(this, 'ontransitionrun');
    }
    set ontransitionrun(value) {
        this[PropertySymbol.propertyEventListeners].set('ontransitionrun', value);
    }
    get ontransitionstart() {
        return ElementEventAttributeUtility.getEventListener(this, 'ontransitionstart');
    }
    set ontransitionstart(value) {
        this[PropertySymbol.propertyEventListeners].set('ontransitionstart', value);
    }
    get onvolumechange() {
        return ElementEventAttributeUtility.getEventListener(this, 'onvolumechange');
    }
    set onvolumechange(value) {
        this[PropertySymbol.propertyEventListeners].set('onvolumechange', value);
    }
    get onwaiting() {
        return ElementEventAttributeUtility.getEventListener(this, 'onwaiting');
    }
    set onwaiting(value) {
        this[PropertySymbol.propertyEventListeners].set('onwaiting', value);
    }
    get onwheel() {
        return ElementEventAttributeUtility.getEventListener(this, 'onwheel');
    }
    set onwheel(value) {
        this[PropertySymbol.propertyEventListeners].set('onwheel', value);
    }
    /* eslint-enable jsdoc/require-jsdoc */
    /**
     * Returns current translate.
     *
     * @returns Element.
     */
    get ownerSVGElement() {
        let parent = this[PropertySymbol.parentNode];
        while (parent) {
            if (parent[PropertySymbol.localName] === 'svg') {
                return parent;
            }
            parent = parent[PropertySymbol.parentNode];
        }
        return null;
    }
    /**
     * Returns the SVGElement which established the current viewport. Often the nearest ancestor <svg> element. null if the given element is the outermost <svg> element.
     *
     * @returns SVG element.
     */
    get viewportElement() {
        return this.ownerSVGElement;
    }
    /**
     * Returns data set.
     *
     * @returns Data set.
     */
    get dataset() {
        return (this.#dataset ??= new DOMStringMap(PropertySymbol.illegalConstructor, this));
    }
    /**
     * Returns style.
     *
     * @returns Style.
     */
    get style() {
        if (!this[PropertySymbol.style]) {
            this[PropertySymbol.style] = new CSSStyleDeclaration(PropertySymbol.illegalConstructor, this[PropertySymbol.window], { element: this });
        }
        return this[PropertySymbol.style];
    }
    /**
     * Returns tab index.
     *
     * @returns Tab index.
     */
    get tabIndex() {
        const tabIndex = this.getAttribute('tabindex');
        return tabIndex !== null ? Number(tabIndex) : -1;
    }
    /**
     * Returns tab index.
     *
     * @param tabIndex Tab index.
     */
    set tabIndex(tabIndex) {
        if (tabIndex === -1) {
            this.removeAttribute('tabindex');
        }
        else {
            this.setAttribute('tabindex', String(tabIndex));
        }
    }
    /**
     * Triggers a blur event.
     */
    blur() {
        HTMLElementUtility.blur(this);
    }
    /**
     * Triggers a focus event.
     */
    focus() {
        HTMLElementUtility.focus(this);
    }
}
//# sourceMappingURL=SVGElement.js.map