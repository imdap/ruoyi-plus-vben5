import Element from '../element/Element.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import CSSStyleDeclaration from '../../css/declaration/CSSStyleDeclaration.js';
import type Event from '../../event/Event.js';
import DOMStringMap from '../../dom/DOMStringMap.js';
import type Attr from '../attr/Attr.js';
/**
 * HTML Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement.
 */
export default class HTMLElement extends Element {
    #private;
    cloneNode: (deep?: boolean) => HTMLElement;
    static observedAttributes?: string[];
    [PropertySymbol.accessKey]: string;
    [PropertySymbol.offsetHeight]: number;
    [PropertySymbol.offsetWidth]: number;
    [PropertySymbol.offsetLeft]: number;
    [PropertySymbol.offsetTop]: number;
    [PropertySymbol.clientHeight]: number;
    [PropertySymbol.clientWidth]: number;
    [PropertySymbol.clientLeft]: number;
    [PropertySymbol.clientTop]: number;
    [PropertySymbol.style]: CSSStyleDeclaration | null;
    [PropertySymbol.dataset]: DOMStringMap | null;
    get oncancel(): ((event: Event) => void) | null;
    set oncancel(value: ((event: Event) => void) | null);
    get onerror(): ((event: Event) => void) | null;
    set onerror(value: ((event: Event) => void) | null);
    get onscroll(): ((event: Event) => void) | null;
    set onscroll(value: ((event: Event) => void) | null);
    get onselect(): ((event: Event) => void) | null;
    set onselect(value: ((event: Event) => void) | null);
    get onwheel(): ((event: Event) => void) | null;
    set onwheel(value: ((event: Event) => void) | null);
    get oncopy(): ((event: Event) => void) | null;
    set oncopy(value: ((event: Event) => void) | null);
    get oncut(): ((event: Event) => void) | null;
    set oncut(value: ((event: Event) => void) | null);
    get onpaste(): ((event: Event) => void) | null;
    set onpaste(value: ((event: Event) => void) | null);
    get oncompositionend(): ((event: Event) => void) | null;
    set oncompositionend(value: ((event: Event) => void) | null);
    get oncompositionstart(): ((event: Event) => void) | null;
    set oncompositionstart(value: ((event: Event) => void) | null);
    get oncompositionupdate(): ((event: Event) => void) | null;
    set oncompositionupdate(value: ((event: Event) => void) | null);
    get onblur(): ((event: Event) => void) | null;
    set onblur(value: ((event: Event) => void) | null);
    get onfocus(): ((event: Event) => void) | null;
    set onfocus(value: ((event: Event) => void) | null);
    get onfocusin(): ((event: Event) => void) | null;
    set onfocusin(value: ((event: Event) => void) | null);
    get onfocusout(): ((event: Event) => void) | null;
    set onfocusout(value: ((event: Event) => void) | null);
    get onkeydown(): ((event: Event) => void) | null;
    set onkeydown(value: ((event: Event) => void) | null);
    get onkeyup(): ((event: Event) => void) | null;
    set onkeyup(value: ((event: Event) => void) | null);
    get onauxclick(): ((event: Event) => void) | null;
    set onauxclick(value: ((event: Event) => void) | null);
    get onclick(): ((event: Event) => void) | null;
    set onclick(value: ((event: Event) => void) | null);
    get oncontextmenu(): ((event: Event) => void) | null;
    set oncontextmenu(value: ((event: Event) => void) | null);
    get ondblclick(): ((event: Event) => void) | null;
    set ondblclick(value: ((event: Event) => void) | null);
    get onmousedown(): ((event: Event) => void) | null;
    set onmousedown(value: ((event: Event) => void) | null);
    get onmouseenter(): ((event: Event) => void) | null;
    set onmouseenter(value: ((event: Event) => void) | null);
    get onmouseleave(): ((event: Event) => void) | null;
    set onmouseleave(value: ((event: Event) => void) | null);
    get onmousemove(): ((event: Event) => void) | null;
    set onmousemove(value: ((event: Event) => void) | null);
    get onmouseout(): ((event: Event) => void) | null;
    set onmouseout(value: ((event: Event) => void) | null);
    get onmouseover(): ((event: Event) => void) | null;
    set onmouseover(value: ((event: Event) => void) | null);
    get onmouseup(): ((event: Event) => void) | null;
    set onmouseup(value: ((event: Event) => void) | null);
    get ontouchcancel(): ((event: Event) => void) | null;
    set ontouchcancel(value: ((event: Event) => void) | null);
    get ontouchend(): ((event: Event) => void) | null;
    set ontouchend(value: ((event: Event) => void) | null);
    get ontouchmove(): ((event: Event) => void) | null;
    set ontouchmove(value: ((event: Event) => void) | null);
    get ontouchstart(): ((event: Event) => void) | null;
    set ontouchstart(value: ((event: Event) => void) | null);
    get oninvalid(): ((event: Event) => void) | null;
    set oninvalid(value: ((event: Event) => void) | null);
    get onanimationcancel(): ((event: Event) => void) | null;
    set onanimationcancel(value: ((event: Event) => void) | null);
    get onanimationend(): ((event: Event) => void) | null;
    set onanimationend(value: ((event: Event) => void) | null);
    get onanimationiteration(): ((event: Event) => void) | null;
    set onanimationiteration(value: ((event: Event) => void) | null);
    get onanimationstart(): ((event: Event) => void) | null;
    set onanimationstart(value: ((event: Event) => void) | null);
    get onbeforeinput(): ((event: Event) => void) | null;
    set onbeforeinput(value: ((event: Event) => void) | null);
    get oninput(): ((event: Event) => void) | null;
    set oninput(value: ((event: Event) => void) | null);
    get onchange(): ((event: Event) => void) | null;
    set onchange(value: ((event: Event) => void) | null);
    get ongotpointercapture(): ((event: Event) => void) | null;
    set ongotpointercapture(value: ((event: Event) => void) | null);
    get onlostpointercapture(): ((event: Event) => void) | null;
    set onlostpointercapture(value: ((event: Event) => void) | null);
    get onpointercancel(): ((event: Event) => void) | null;
    set onpointercancel(value: ((event: Event) => void) | null);
    get onpointerdown(): ((event: Event) => void) | null;
    set onpointerdown(value: ((event: Event) => void) | null);
    get onpointerenter(): ((event: Event) => void) | null;
    set onpointerenter(value: ((event: Event) => void) | null);
    get onpointerleave(): ((event: Event) => void) | null;
    set onpointerleave(value: ((event: Event) => void) | null);
    get onpointermove(): ((event: Event) => void) | null;
    set onpointermove(value: ((event: Event) => void) | null);
    get onpointerout(): ((event: Event) => void) | null;
    set onpointerout(value: ((event: Event) => void) | null);
    get onpointerover(): ((event: Event) => void) | null;
    set onpointerover(value: ((event: Event) => void) | null);
    get onpointerup(): ((event: Event) => void) | null;
    set onpointerup(value: ((event: Event) => void) | null);
    get ontransitioncancel(): ((event: Event) => void) | null;
    set ontransitioncancel(value: ((event: Event) => void) | null);
    get ontransitionend(): ((event: Event) => void) | null;
    set ontransitionend(value: ((event: Event) => void) | null);
    get ontransitionrun(): ((event: Event) => void) | null;
    set ontransitionrun(value: ((event: Event) => void) | null);
    get ontransitionstart(): ((event: Event) => void) | null;
    set ontransitionstart(value: ((event: Event) => void) | null);
    /**
     * Returns access key.
     *
     * @returns Access key.
     */
    get accessKey(): string;
    /**
     * Sets access key.
     *
     * @param accessKey Access key.
     */
    set accessKey(accessKey: string);
    /**
     * Returns content editable.
     *
     * @returns Content editable.
     */
    get contentEditable(): string;
    /**
     * Sets content editable.
     *
     * @param contentEditable Content editable.
     */
    set contentEditable(contentEditable: string);
    /**
     * Returns is content editable.
     *
     * @returns Is content editable.
     */
    get isContentEditable(): boolean;
    /**
     * Returns offset height.
     *
     * @returns Offset height.
     */
    get offsetHeight(): number;
    /**
     * Returns offset width.
     *
     * @returns Offset width.
     */
    get offsetWidth(): number;
    /**
     * Returns offset left.
     *
     * @returns Offset left.
     */
    get offsetLeft(): number;
    /**
     * Returns offset top.
     *
     * @returns Offset top.
     */
    get offsetTop(): number;
    /**
     * Returns client height.
     *
     * @returns Client height.
     */
    get clientHeight(): number;
    /**
     * Returns client width.
     *
     * @returns Client width.
     */
    get clientWidth(): number;
    /**
     * Returns client left.
     *
     * @returns Client left.
     */
    get clientLeft(): number;
    /**
     * Returns client top.
     *
     * @returns Client top.
     */
    get clientTop(): number;
    /**
     * Returns tab index.
     *
     * @returns Tab index.
     */
    get tabIndex(): number;
    /**
     * Returns tab index.
     *
     * @param tabIndex Tab index.
     */
    set tabIndex(tabIndex: number);
    /**
     * Returns inner text, which is the rendered appearance of text.
     *
     * @see https://html.spec.whatwg.org/multipage/dom.html#the-innertext-idl-attribute
     * @returns Inner text.
     */
    get innerText(): string;
    /**
     * Sets the inner text, which is the rendered appearance of text.
     *
     * @see https://html.spec.whatwg.org/multipage/dom.html#the-innertext-idl-attribute
     * @param innerText Inner text.
     */
    set innerText(text: string);
    /**
     * Returns outer text.
     *
     * @see https://html.spec.whatwg.org/multipage/dom.html#the-innertext-idl-attribute
     * @returns HTML.
     */
    get outerText(): string;
    /**
     * Sets outer text.
     *
     * @see https://html.spec.whatwg.org/multipage/dom.html#the-innertext-idl-attribute
     * @param text Text.
     */
    set outerText(text: string);
    /**
     * Returns style.
     *
     * @returns Style.
     */
    get style(): CSSStyleDeclaration;
    /**
     * Sets style.
     *
     * @param cssText Style as text.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style#setting_styles
     */
    set style(cssText: string | CSSStyleDeclaration | null);
    /**
     * Returns data set.
     *
     * @returns Data set.
     */
    get dataset(): DOMStringMap;
    /**
     * Returns direction.
     *
     * @returns Direction.
     */
    get dir(): string;
    /**
     * Returns direction.
     *
     * @param direction Direction.
     */
    set dir(direction: string);
    /**
     * Returns hidden.
     *
     * @returns Hidden.
     */
    get hidden(): boolean;
    /**
     * Returns hidden.
     *
     * @param hidden Hidden.
     */
    set hidden(hidden: boolean);
    /**
     * Returns inert.
     *
     * @returns Inert.
     */
    get inert(): boolean;
    /**
     * Returns inert.
     *
     * @param inert Inert.
     */
    set inert(inert: boolean);
    /**
     * Returns language.
     *
     * @returns Language.
     */
    get lang(): string;
    /**
     * Returns language.
     *
     * @param language Language.
     */
    set lang(lang: string);
    /**
     * Returns title.
     *
     * @returns Title.
     */
    get title(): string;
    /**
     * Returns title.
     *
     * @param title Title.
     */
    set title(title: string);
    /**
     * Returns popover.
     *
     * @returns Popover.
     */
    get popover(): string | null;
    /**
     * Sets popover.
     *
     * @param value Value.
     */
    set popover(value: string | null);
    /**
     * Triggers a click event.
     */
    click(): void;
    /**
     * Triggers a blur event.
     */
    blur(): void;
    /**
     * Triggers a focus event.
     */
    focus(): void;
    /**
     * @override
     */
    [PropertySymbol.cloneNode](deep?: boolean): HTMLElement;
    /**
     * @override
     * @see https://html.spec.whatwg.org/multipage/dom.html#htmlelement
     */
    [PropertySymbol.connectedToDocument](): void;
    /**
     * @override
     */
    [PropertySymbol.disconnectedFromDocument](): void;
    /**
     * @override
     */
    [PropertySymbol.onSetAttribute](attribute: Attr, replacedAttribute: Attr | null): void;
    /**
     * @override
     */
    [PropertySymbol.onRemoveAttribute](removedAttribute: Attr): void;
    /**
     * @override
     */
    [PropertySymbol.destroy](): void;
}
//# sourceMappingURL=HTMLElement.d.ts.map