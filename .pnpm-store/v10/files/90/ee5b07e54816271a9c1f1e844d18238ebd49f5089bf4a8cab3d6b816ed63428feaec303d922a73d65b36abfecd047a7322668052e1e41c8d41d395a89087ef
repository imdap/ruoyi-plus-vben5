import Element from '../element/Element.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import type BrowserWindow from '../../window/BrowserWindow.js';
import Node from '../node/Node.js';
import NodeIterator from '../../tree-walker/NodeIterator.js';
import TreeWalker from '../../tree-walker/TreeWalker.js';
import type DocumentFragment from '../document-fragment/DocumentFragment.js';
import Event from '../../event/Event.js';
import DOMImplementation from '../../dom-implementation/DOMImplementation.js';
import type { TNodeFilter } from '../../tree-walker/TNodeFilter.js';
import DocumentType from '../document-type/DocumentType.js';
import type CSSStyleSheet from '../../css/CSSStyleSheet.js';
import type HTMLScriptElement from '../html-script-element/HTMLScriptElement.js';
import type HTMLElement from '../html-element/HTMLElement.js';
import type Comment from '../comment/Comment.js';
import type Text from '../text/Text.js';
import type NodeList from '../node/NodeList.js';
import HTMLCollection from '../element/HTMLCollection.js';
import DocumentReadyStateEnum from './DocumentReadyStateEnum.js';
import type Location from '../../location/Location.js';
import Selection from '../../selection/Selection.js';
import type Range from '../../range/Range.js';
import type Attr from '../attr/Attr.js';
import type ProcessingInstruction from '../processing-instruction/ProcessingInstruction.js';
import VisibilityStateEnum from './VisibilityStateEnum.js';
import NodeTypeEnum from '../node/NodeTypeEnum.js';
import type IHTMLElementTagNameMap from '../../config/IHTMLElementTagNameMap.js';
import type ISVGElementTagNameMap from '../../config/ISVGElementTagNameMap.js';
import type SVGElement from '../svg-element/SVGElement.js';
import type HTMLFormElement from '../html-form-element/HTMLFormElement.js';
import type HTMLAnchorElement from '../html-anchor-element/HTMLAnchorElement.js';
import type HTMLHtmlElement from '../html-html-element/HTMLHtmlElement.js';
import type HTMLBodyElement from '../html-body-element/HTMLBodyElement.js';
import type HTMLHeadElement from '../html-head-element/HTMLHeadElement.js';
import type PreloadEntry from '../../fetch/preload/PreloadEntry.js';
import type SVGScriptElement from '../svg-script-element/SVGScriptElement.js';
import type ICachedComputedStyleResult from '../node/ICachedComputedStyleResult.js';
/**
 * Document.
 */
export default class Document extends Node {
    #private;
    [PropertySymbol.children]: HTMLCollection<Element> | null;
    [PropertySymbol.activeElement]: HTMLElement | SVGElement | null;
    [PropertySymbol.nextActiveElement]: HTMLElement | SVGElement | null;
    [PropertySymbol.currentScript]: HTMLScriptElement | null;
    [PropertySymbol.rootNode]: this;
    [PropertySymbol.isFirstWrite]: boolean;
    [PropertySymbol.isFirstWriteAfterOpen]: boolean;
    [PropertySymbol.nodeType]: NodeTypeEnum;
    [PropertySymbol.isConnected]: boolean;
    [PropertySymbol.adoptedStyleSheets]: CSSStyleSheet[];
    [PropertySymbol.implementation]: DOMImplementation;
    [PropertySymbol.readyState]: DocumentReadyStateEnum;
    [PropertySymbol.referrer]: string;
    [PropertySymbol.defaultView]: BrowserWindow | null;
    [PropertySymbol.forms]: HTMLCollection<HTMLFormElement> | null;
    [PropertySymbol.affectsComputedStyleCache]: ICachedComputedStyleResult[];
    [PropertySymbol.ownerDocument]: Document;
    [PropertySymbol.elementIdMap]: Map<string, {
        htmlCollection: HTMLCollection<Element> | null;
        elements: Element[];
    }>;
    [PropertySymbol.contentType]: string;
    [PropertySymbol.xmlProcessingInstruction]: ProcessingInstruction | null;
    [PropertySymbol.preloads]: Map<string, PreloadEntry>;
    [PropertySymbol.propertyEventListeners]: Map<string, ((event: Event) => void) | null>;
    [PropertySymbol.selection]: Selection | null;
    cloneNode: (deep?: boolean) => Document;
    get onreadystatechange(): ((event: Event) => void) | null;
    set onreadystatechange(value: ((event: Event) => void) | null);
    get onpointerlockchange(): ((event: Event) => void) | null;
    set onpointerlockchange(value: ((event: Event) => void) | null);
    get onpointerlockerror(): ((event: Event) => void) | null;
    set onpointerlockerror(value: ((event: Event) => void) | null);
    get onbeforecopy(): ((event: Event) => void) | null;
    set onbeforecopy(value: ((event: Event) => void) | null);
    get onbeforecut(): ((event: Event) => void) | null;
    set onbeforecut(value: ((event: Event) => void) | null);
    get onbeforepaste(): ((event: Event) => void) | null;
    set onbeforepaste(value: ((event: Event) => void) | null);
    get onfreeze(): ((event: Event) => void) | null;
    set onfreeze(value: ((event: Event) => void) | null);
    get onprerenderingchange(): ((event: Event) => void) | null;
    set onprerenderingchange(value: ((event: Event) => void) | null);
    get onresume(): ((event: Event) => void) | null;
    set onresume(value: ((event: Event) => void) | null);
    get onsearch(): ((event: Event) => void) | null;
    set onsearch(value: ((event: Event) => void) | null);
    get onvisibilitychange(): ((event: Event) => void) | null;
    set onvisibilitychange(value: ((event: Event) => void) | null);
    get onfullscreenchange(): ((event: Event) => void) | null;
    set onfullscreenchange(value: ((event: Event) => void) | null);
    get onfullscreenerror(): ((event: Event) => void) | null;
    set onfullscreenerror(value: ((event: Event) => void) | null);
    get onwebkitfullscreenchange(): ((event: Event) => void) | null;
    set onwebkitfullscreenchange(value: ((event: Event) => void) | null);
    get onwebkitfullscreenerror(): ((event: Event) => void) | null;
    set onwebkitfullscreenerror(value: ((event: Event) => void) | null);
    get onbeforexrselect(): ((event: Event) => void) | null;
    set onbeforexrselect(value: ((event: Event) => void) | null);
    get onabort(): ((event: Event) => void) | null;
    set onabort(value: ((event: Event) => void) | null);
    get onbeforeinput(): ((event: Event) => void) | null;
    set onbeforeinput(value: ((event: Event) => void) | null);
    get onbeforematch(): ((event: Event) => void) | null;
    set onbeforematch(value: ((event: Event) => void) | null);
    get onbeforetoggle(): ((event: Event) => void) | null;
    set onbeforetoggle(value: ((event: Event) => void) | null);
    get onblur(): ((event: Event) => void) | null;
    set onblur(value: ((event: Event) => void) | null);
    get oncancel(): ((event: Event) => void) | null;
    set oncancel(value: ((event: Event) => void) | null);
    get oncanplay(): ((event: Event) => void) | null;
    set oncanplay(value: ((event: Event) => void) | null);
    get oncanplaythrough(): ((event: Event) => void) | null;
    set oncanplaythrough(value: ((event: Event) => void) | null);
    get onchange(): ((event: Event) => void) | null;
    set onchange(value: ((event: Event) => void) | null);
    get onclick(): ((event: Event) => void) | null;
    set onclick(value: ((event: Event) => void) | null);
    get onclose(): ((event: Event) => void) | null;
    set onclose(value: ((event: Event) => void) | null);
    get oncontentvisibilityautostatechange(): ((event: Event) => void) | null;
    set oncontentvisibilityautostatechange(value: ((event: Event) => void) | null);
    get oncontextlost(): ((event: Event) => void) | null;
    set oncontextlost(value: ((event: Event) => void) | null);
    get oncontextmenu(): ((event: Event) => void) | null;
    set oncontextmenu(value: ((event: Event) => void) | null);
    get oncontextrestored(): ((event: Event) => void) | null;
    set oncontextrestored(value: ((event: Event) => void) | null);
    get oncuechange(): ((event: Event) => void) | null;
    set oncuechange(value: ((event: Event) => void) | null);
    get ondblclick(): ((event: Event) => void) | null;
    set ondblclick(value: ((event: Event) => void) | null);
    get ondrag(): ((event: Event) => void) | null;
    set ondrag(value: ((event: Event) => void) | null);
    get ondragend(): ((event: Event) => void) | null;
    set ondragend(value: ((event: Event) => void) | null);
    get ondragenter(): ((event: Event) => void) | null;
    set ondragenter(value: ((event: Event) => void) | null);
    get ondragleave(): ((event: Event) => void) | null;
    set ondragleave(value: ((event: Event) => void) | null);
    get ondragover(): ((event: Event) => void) | null;
    set ondragover(value: ((event: Event) => void) | null);
    get ondragstart(): ((event: Event) => void) | null;
    set ondragstart(value: ((event: Event) => void) | null);
    get ondrop(): ((event: Event) => void) | null;
    set ondrop(value: ((event: Event) => void) | null);
    get ondurationchange(): ((event: Event) => void) | null;
    set ondurationchange(value: ((event: Event) => void) | null);
    get onemptied(): ((event: Event) => void) | null;
    set onemptied(value: ((event: Event) => void) | null);
    get onended(): ((event: Event) => void) | null;
    set onended(value: ((event: Event) => void) | null);
    get onerror(): ((event: Event) => void) | null;
    set onerror(value: ((event: Event) => void) | null);
    get onfocus(): ((event: Event) => void) | null;
    set onfocus(value: ((event: Event) => void) | null);
    get onformdata(): ((event: Event) => void) | null;
    set onformdata(value: ((event: Event) => void) | null);
    get oninput(): ((event: Event) => void) | null;
    set oninput(value: ((event: Event) => void) | null);
    get oninvalid(): ((event: Event) => void) | null;
    set oninvalid(value: ((event: Event) => void) | null);
    get onkeydown(): ((event: Event) => void) | null;
    set onkeydown(value: ((event: Event) => void) | null);
    get onkeypress(): ((event: Event) => void) | null;
    set onkeypress(value: ((event: Event) => void) | null);
    get onkeyup(): ((event: Event) => void) | null;
    set onkeyup(value: ((event: Event) => void) | null);
    get onload(): ((event: Event) => void) | null;
    set onload(value: ((event: Event) => void) | null);
    get onloadeddata(): ((event: Event) => void) | null;
    set onloadeddata(value: ((event: Event) => void) | null);
    get onloadedmetadata(): ((event: Event) => void) | null;
    set onloadedmetadata(value: ((event: Event) => void) | null);
    get onloadstart(): ((event: Event) => void) | null;
    set onloadstart(value: ((event: Event) => void) | null);
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
    get onmousewheel(): ((event: Event) => void) | null;
    set onmousewheel(value: ((event: Event) => void) | null);
    get onpause(): ((event: Event) => void) | null;
    set onpause(value: ((event: Event) => void) | null);
    get onplay(): ((event: Event) => void) | null;
    set onplay(value: ((event: Event) => void) | null);
    get onplaying(): ((event: Event) => void) | null;
    set onplaying(value: ((event: Event) => void) | null);
    get onprogress(): ((event: Event) => void) | null;
    set onprogress(value: ((event: Event) => void) | null);
    get onratechange(): ((event: Event) => void) | null;
    set onratechange(value: ((event: Event) => void) | null);
    get onreset(): ((event: Event) => void) | null;
    set onreset(value: ((event: Event) => void) | null);
    get onresize(): ((event: Event) => void) | null;
    set onresize(value: ((event: Event) => void) | null);
    get onscroll(): ((event: Event) => void) | null;
    set onscroll(value: ((event: Event) => void) | null);
    get onsecuritypolicyviolation(): ((event: Event) => void) | null;
    set onsecuritypolicyviolation(value: ((event: Event) => void) | null);
    get onseeked(): ((event: Event) => void) | null;
    set onseeked(value: ((event: Event) => void) | null);
    get onseeking(): ((event: Event) => void) | null;
    set onseeking(value: ((event: Event) => void) | null);
    get onselect(): ((event: Event) => void) | null;
    set onselect(value: ((event: Event) => void) | null);
    get onslotchange(): ((event: Event) => void) | null;
    set onslotchange(value: ((event: Event) => void) | null);
    get onstalled(): ((event: Event) => void) | null;
    set onstalled(value: ((event: Event) => void) | null);
    get onsubmit(): ((event: Event) => void) | null;
    set onsubmit(value: ((event: Event) => void) | null);
    get onsuspend(): ((event: Event) => void) | null;
    set onsuspend(value: ((event: Event) => void) | null);
    get ontimeupdate(): ((event: Event) => void) | null;
    set ontimeupdate(value: ((event: Event) => void) | null);
    get ontoggle(): ((event: Event) => void) | null;
    set ontoggle(value: ((event: Event) => void) | null);
    get onvolumechange(): ((event: Event) => void) | null;
    set onvolumechange(value: ((event: Event) => void) | null);
    get onwaiting(): ((event: Event) => void) | null;
    set onwaiting(value: ((event: Event) => void) | null);
    get onwebkitanimationend(): ((event: Event) => void) | null;
    set onwebkitanimationend(value: ((event: Event) => void) | null);
    get onwebkitanimationiteration(): ((event: Event) => void) | null;
    set onwebkitanimationiteration(value: ((event: Event) => void) | null);
    get onwebkitanimationstart(): ((event: Event) => void) | null;
    set onwebkitanimationstart(value: ((event: Event) => void) | null);
    get onwebkittransitionend(): ((event: Event) => void) | null;
    set onwebkittransitionend(value: ((event: Event) => void) | null);
    get onwheel(): ((event: Event) => void) | null;
    set onwheel(value: ((event: Event) => void) | null);
    get onauxclick(): ((event: Event) => void) | null;
    set onauxclick(value: ((event: Event) => void) | null);
    get ongotpointercapture(): ((event: Event) => void) | null;
    set ongotpointercapture(value: ((event: Event) => void) | null);
    get onlostpointercapture(): ((event: Event) => void) | null;
    set onlostpointercapture(value: ((event: Event) => void) | null);
    get onpointerdown(): ((event: Event) => void) | null;
    set onpointerdown(value: ((event: Event) => void) | null);
    get onpointermove(): ((event: Event) => void) | null;
    set onpointermove(value: ((event: Event) => void) | null);
    get onpointerrawupdate(): ((event: Event) => void) | null;
    set onpointerrawupdate(value: ((event: Event) => void) | null);
    get onpointerup(): ((event: Event) => void) | null;
    set onpointerup(value: ((event: Event) => void) | null);
    get onpointercancel(): ((event: Event) => void) | null;
    set onpointercancel(value: ((event: Event) => void) | null);
    get onpointerover(): ((event: Event) => void) | null;
    set onpointerover(value: ((event: Event) => void) | null);
    get onpointerout(): ((event: Event) => void) | null;
    set onpointerout(value: ((event: Event) => void) | null);
    get onpointerenter(): ((event: Event) => void) | null;
    set onpointerenter(value: ((event: Event) => void) | null);
    get onpointerleave(): ((event: Event) => void) | null;
    set onpointerleave(value: ((event: Event) => void) | null);
    get onselectstart(): ((event: Event) => void) | null;
    set onselectstart(value: ((event: Event) => void) | null);
    get onselectionchange(): ((event: Event) => void) | null;
    set onselectionchange(value: ((event: Event) => void) | null);
    get onanimationend(): ((event: Event) => void) | null;
    set onanimationend(value: ((event: Event) => void) | null);
    get onanimationiteration(): ((event: Event) => void) | null;
    set onanimationiteration(value: ((event: Event) => void) | null);
    get onanimationstart(): ((event: Event) => void) | null;
    set onanimationstart(value: ((event: Event) => void) | null);
    get ontransitionrun(): ((event: Event) => void) | null;
    set ontransitionrun(value: ((event: Event) => void) | null);
    get ontransitionstart(): ((event: Event) => void) | null;
    set ontransitionstart(value: ((event: Event) => void) | null);
    get ontransitionend(): ((event: Event) => void) | null;
    set ontransitionend(value: ((event: Event) => void) | null);
    get ontransitioncancel(): ((event: Event) => void) | null;
    set ontransitioncancel(value: ((event: Event) => void) | null);
    get oncopy(): ((event: Event) => void) | null;
    set oncopy(value: ((event: Event) => void) | null);
    get oncut(): ((event: Event) => void) | null;
    set oncut(value: ((event: Event) => void) | null);
    get onpaste(): ((event: Event) => void) | null;
    set onpaste(value: ((event: Event) => void) | null);
    get onscrollend(): ((event: Event) => void) | null;
    set onscrollend(value: ((event: Event) => void) | null);
    get onscrollsnapchange(): ((event: Event) => void) | null;
    set onscrollsnapchange(value: ((event: Event) => void) | null);
    get onscrollsnapchanging(): ((event: Event) => void) | null;
    set onscrollsnapchanging(value: ((event: Event) => void) | null);
    /**
     * Returns adopted style sheets.
     *
     * @returns Adopted style sheets.
     */
    get adoptedStyleSheets(): CSSStyleSheet[];
    /**
     * Sets adopted style sheets.
     *
     * @param value Adopted style sheets.
     */
    set adoptedStyleSheets(value: CSSStyleSheet[]);
    /**
     * Returns DOM implementation.
     *
     * @returns DOM implementation.
     */
    get implementation(): DOMImplementation;
    /**
     * Returns document ready state.
     *
     * @returns Document ready state.
     */
    get readyState(): DocumentReadyStateEnum;
    /**
     * Returns referrer.
     *
     * @returns Referrer.
     */
    get referrer(): string;
    /**
     * Returns default view.
     *
     * @returns Default view.
     */
    get defaultView(): BrowserWindow | null;
    /**
     * Returns document children.
     */
    get children(): HTMLCollection<Element>;
    /**
     * Returns character set.
     *
     * @deprecated
     * @returns Character set.
     */
    get charset(): string;
    /**
     * Returns character set.
     *
     * @returns Character set.
     */
    get characterSet(): string;
    /**
     * Returns title.
     *
     * @returns Title.
     */
    get title(): string;
    /**
     * Returns set title.
     *
     */
    set title(title: string);
    /**
     * Returns a collection of all area elements and a elements in a document with a value for the href attribute.
     */
    get links(): NodeList<HTMLAnchorElement | HTMLElement>;
    /**
     * Returns a collection of all form elements in a document.
     */
    get forms(): HTMLCollection<HTMLFormElement>;
    /**
     * Last element child.
     *
     * @returns Element.
     */
    get childElementCount(): number;
    /**
     * First element child.
     *
     * @returns Element.
     */
    get firstElementChild(): Element;
    /**
     * Last element child.
     *
     * @returns Element.
     */
    get lastElementChild(): Element;
    /**
     * Returns cookie string.
     *
     * @returns Cookie.
     */
    get cookie(): string;
    /**
     * Sets a cookie string.
     *
     * @param cookie Cookie string.
     */
    set cookie(value: string);
    /**
     * Node name.
     *
     * @returns Node name.
     */
    get nodeName(): string;
    /**
     * Returns <html> element.
     *
     * @returns Element.
     */
    get documentElement(): HTMLHtmlElement;
    /**
     * Returns document type element.
     *
     * @returns Document type.
     */
    get doctype(): DocumentType;
    /**
     * Returns <body> element.
     *
     * @returns Element.
     */
    get body(): HTMLBodyElement;
    /**
     * Returns <head> element.
     *
     * @returns Element.
     */
    get head(): HTMLHeadElement;
    /**
     * Returns CSS style sheets.
     *
     * @returns CSS style sheets.
     */
    get styleSheets(): CSSStyleSheet[];
    /**
     * Returns active element.
     *
     * @returns Active element.
     */
    get activeElement(): HTMLElement | SVGElement;
    /**
     * Returns scrolling element.
     *
     * @returns Scrolling element.
     */
    get scrollingElement(): HTMLElement;
    /**
     * Returns location.
     *
     * @returns Location.
     */
    get location(): Location;
    /**
     * Returns scripts.
     *
     * @returns Scripts.
     */
    get scripts(): HTMLCollection<HTMLScriptElement>;
    /**
     * Returns base URI.
     *
     * @override
     * @returns Base URI.
     */
    get baseURI(): string;
    /**
     * Returns URL.
     *
     * @returns URL of the current document.
     * */
    get URL(): string;
    /**
     * Returns document URI.
     *
     * @returns URL of the current document.
     * */
    get documentURI(): string;
    /**
     * Returns domain.
     *
     * @returns Domain.
     * */
    get domain(): string;
    /**
     * Returns document visibility state.
     *
     * @returns the visibility state of the current document.
     * */
    get visibilityState(): VisibilityStateEnum;
    /**
     * Returns document hidden state.
     *
     * @returns the hidden state of the current document.
     * */
    get hidden(): boolean;
    /**
     * Gets the currently executing script element.
     *
     * @returns the currently executing script element.
     */
    get currentScript(): HTMLScriptElement | SVGScriptElement | null;
    /**
     * Returns content type.
     *
     * @returns Content type.
     */
    get contentType(): string;
    /**
     * Inserts a set of Node objects or DOMString objects after the last child of the ParentNode. DOMString objects are inserted as equivalent Text nodes.
     *
     * @param nodes List of Node or DOMString.
     */
    append(...nodes: (Node | string)[]): void;
    /**
     * Inserts a set of Node objects or DOMString objects before the first child of the ParentNode. DOMString objects are inserted as equivalent Text nodes.
     *
     * @param nodes List of Node or DOMString.
     */
    prepend(...nodes: (Node | string)[]): void;
    /**
     * Replaces the existing children of a node with a specified new set of children.
     *
     * @param nodes List of Node or DOMString.
     */
    replaceChildren(...nodes: (Node | string)[]): void;
    /**
     * Query CSS selector to find matching nodes.
     *
     * @param selector CSS selector.
     * @returns Matching elements.
     */
    querySelectorAll<K extends keyof IHTMLElementTagNameMap>(selector: K): NodeList<IHTMLElementTagNameMap[K]>;
    /**
     * Query CSS selector to find matching elements.
     *
     * @param selector CSS selector.
     * @returns Matching elements.
     */
    querySelectorAll<K extends keyof ISVGElementTagNameMap>(selector: K): NodeList<ISVGElementTagNameMap[K]>;
    /**
     * Query CSS selector to find matching elements.
     *
     * @param selector CSS selector.
     * @returns Matching elements.
     */
    querySelectorAll(selector: string): NodeList<Element>;
    /**
     * Query CSS Selector to find matching node.
     *
     * @param selector CSS selector.
     * @returns Matching element.
     */
    querySelector<K extends keyof IHTMLElementTagNameMap>(selector: K): IHTMLElementTagNameMap[K] | null;
    /**
     * Query CSS Selector to find matching node.
     *
     * @param selector CSS selector.
     * @returns Matching element.
     */
    querySelector<K extends keyof ISVGElementTagNameMap>(selector: K): ISVGElementTagNameMap[K] | null;
    /**
     * Query CSS Selector to find matching node.
     *
     * @param selector CSS selector.
     * @returns Matching element.
     */
    querySelector(selector: string): Element | null;
    /**
     * Returns true if the command is supported.
     * @deprecated
     * @param _ Command.
     * @returns True if the command is supported, false otherwise.
     */
    queryCommandSupported(_: string): boolean;
    /**
     * Returns an elements by class name.
     *
     * @param className Tag name.
     * @returns Matching element.
     */
    getElementsByClassName(className: string): HTMLCollection<Element>;
    /**
     * Returns an elements by tag name.
     *
     * @param tagName Tag name.
     * @returns Matching element.
     */
    getElementsByTagName<K extends keyof IHTMLElementTagNameMap>(tagName: K): HTMLCollection<IHTMLElementTagNameMap[K]>;
    /**
     * Returns an elements by tag name.
     *
     * @param tagName Tag name.
     * @returns Matching element.
     */
    getElementsByTagName<K extends keyof ISVGElementTagNameMap>(tagName: K): HTMLCollection<ISVGElementTagNameMap[K]>;
    /**
     * Returns an elements by tag name.
     *
     * @param tagName Tag name.
     * @returns Matching element.
     */
    getElementsByTagName(tagName: string): HTMLCollection<Element>;
    /**
     * Returns an elements by tag name and namespace.
     *
     * @param namespaceURI Namespace URI.
     * @param tagName Tag name.
     * @returns Matching element.
     */
    getElementsByTagNameNS<K extends keyof IHTMLElementTagNameMap>(namespaceURI: 'http://www.w3.org/1999/xhtml', tagName: K): HTMLCollection<IHTMLElementTagNameMap[K]>;
    /**
     * Returns an elements by tag name and namespace.
     *
     * @param namespaceURI Namespace URI.
     * @param tagName Tag name.
     * @returns Matching element.
     */
    getElementsByTagNameNS<K extends keyof ISVGElementTagNameMap>(namespaceURI: 'http://www.w3.org/2000/svg', tagName: K): HTMLCollection<ISVGElementTagNameMap[K]>;
    /**
     * Returns an elements by tag name and namespace.
     *
     * @param namespaceURI Namespace URI.
     * @param tagName Tag name.
     * @returns Matching element.
     */
    getElementsByTagNameNS(namespaceURI: string, tagName: string): HTMLCollection<Element>;
    /**
     * Returns an element by ID.
     *
     * @param id ID.
     * @returns Matching element.
     */
    getElementById(id: string): Element | null;
    /**
     * Returns an element by Name.
     *
     * @returns Matching element.
     * @param name
     */
    getElementsByName(name: string): NodeList<Element>;
    /**
     * Replaces the document HTML with new HTML.
     *
     * @param html HTML.
     */
    write(html: string): void;
    /**
     * Opens the document.
     *
     * @returns Document.
     */
    open(): Document;
    /**
     * Closes the document.
     */
    close(): void;
    /**
     * Creates an element.
     *
     * @param qualifiedName Tag name.
     * @param [options] Options.
     * @param [options.is] Tag name of a custom element previously defined via customElements.define().
     * @returns Element.
     */
    createElement<K extends keyof IHTMLElementTagNameMap>(qualifiedName: K, options?: {
        is?: string;
    }): IHTMLElementTagNameMap[K];
    /**
     * Creates an element.
     *
     * @param qualifiedName Tag name.
     * @param [options] Options.
     * @param [options.is] Tag name of a custom element previously defined via customElements.define().
     * @returns Element.
     */
    createElement<K extends keyof ISVGElementTagNameMap>(qualifiedName: K, options?: {
        is?: string;
    }): ISVGElementTagNameMap[K];
    /**
     * Creates an element.
     *
     * @param qualifiedName Tag name.
     * @param [options] Options.
     * @param [options.is] Tag name of a custom element previously defined via customElements.define().
     * @returns Element.
     */
    createElement(qualifiedName: string, options?: {
        is?: string;
    }): HTMLElement;
    /**
     * Creates an element with the specified namespace URI and qualified name.
     *
     * @param namespaceURI Namespace URI.
     * @param qualifiedName Tag name.
     * @param [options] Options.
     * @param [options.is] Tag name of a custom element previously defined via customElements.define().
     * @returns Element.
     */
    createElementNS<K extends keyof IHTMLElementTagNameMap>(namespaceURI: 'http://www.w3.org/1999/xhtml', qualifiedName: K, options?: {
        is?: string;
    }): IHTMLElementTagNameMap[K];
    /**
     * Creates an element with the specified namespace URI and qualified name.
     *
     * @param namespaceURI Namespace URI.
     * @param qualifiedName Tag name.
     * @param [options] Options.
     * @param [options.is] Tag name of a custom element previously defined via customElements.define().
     * @returns Element.
     */
    createElementNS<K extends keyof ISVGElementTagNameMap>(namespaceURI: 'http://www.w3.org/2000/svg', qualifiedName: K, options?: {
        is?: string;
    }): ISVGElementTagNameMap[K];
    /**
     * Creates an element with the specified namespace URI and qualified name.
     *
     * @param namespaceURI Namespace URI.
     * @param qualifiedName Tag name.
     * @param [options] Options.
     * @param [options.is] Tag name of a custom element previously defined via customElements.define().
     * @returns Element.
     */
    createElementNS(namespaceURI: string | null, qualifiedName: string, options?: {
        is?: string;
    }): Element;
    /**
     * Creates a text node.
     *
     * @param [data] Text data.
     * @returns Text node.
     */
    createTextNode(data: string): Text;
    /**
     * Creates a comment node.
     *
     * @param [data] Text data.
     * @returns Text node.
     */
    createComment(data?: string): Comment;
    /**
     * Creates a document fragment.
     *
     * @returns Document fragment.
     */
    createDocumentFragment(): DocumentFragment;
    /**
     * Creates a node iterator.
     *
     * @param root Root.
     * @param [whatToShow] What to show.
     * @param [filter] Filter.
     */
    createNodeIterator(root: Node, whatToShow?: number, filter?: TNodeFilter | null): NodeIterator;
    /**
     * Creates a Tree Walker.
     *
     * @param root Root.
     * @param [whatToShow] What to show.
     * @param [filter] Filter.
     */
    createTreeWalker(root: Node, whatToShow?: number, filter?: TNodeFilter | null): TreeWalker;
    /**
     * Creates an event.
     *
     * @deprecated
     * @param type Type.
     * @returns Event.
     */
    createEvent(type: string): Event;
    /**
     * Creates an Attr node.
     *
     * @param qualifiedName Name.
     * @returns Attribute.
     */
    createAttribute(qualifiedName: string): Attr;
    /**
     * Creates a namespaced Attr node.
     *
     * @param namespaceURI Namespace URI.
     * @param qualifiedName Qualified name.
     * @returns Element.
     */
    createAttributeNS(namespaceURI: string | null, qualifiedName: string): Attr;
    /**
     * Imports a node.
     *
     * @param node Node to import.
     * @param [deep=false] Set to "true" if the clone should be deep.
     */
    importNode(node: Node, deep?: boolean): Node;
    /**
     * Creates a range.
     *
     * @returns Range.
     */
    createRange(): Range;
    /**
     * Adopts a node.
     *
     * @param node Node to adopt.
     * @returns Adopted node.
     */
    adoptNode(node: Node): Node;
    /**
     * Returns selection.
     *
     * @returns Selection.
     */
    getSelection(): Selection;
    /**
     * Returns a boolean value indicating whether the document or any element inside the document has focus.
     *
     * @returns "true" if the document has focus.
     */
    hasFocus(): boolean;
    /**
     * Creates a Processing Instruction node.
     *
     * @param target Target.
     * @param data Data.
     * @returns ProcessingInstruction.
     */
    createProcessingInstruction(target: string, data: string): ProcessingInstruction;
    /**
     * Get element at a given point.
     *
     * @param _x horizontal coordinate
     * @param _y vertical coordinate
     * @returns Always returns null since Happy DOM does not render elements.
     */
    elementFromPoint(_x: number, _y: number): Element | null;
    /**
     * @override
     */
    [PropertySymbol.destroy](): void;
}
//# sourceMappingURL=Document.d.ts.map