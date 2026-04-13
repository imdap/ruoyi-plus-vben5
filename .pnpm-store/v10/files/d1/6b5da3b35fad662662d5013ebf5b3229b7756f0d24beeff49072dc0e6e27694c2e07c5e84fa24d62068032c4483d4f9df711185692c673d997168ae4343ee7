import HTMLElement from '../html-element/HTMLElement.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import Event from '../../event/Event.js';
import type Attr from '../attr/Attr.js';
import DOMTokenList from '../../dom/DOMTokenList.js';
import type { TRequestReferrerPolicy } from '../../fetch/types/TRequestReferrerPolicy.js';
/**
 * HTML Script Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement.
 */
export default class HTMLScriptElement extends HTMLElement {
    #private;
    cloneNode: (deep?: boolean) => HTMLScriptElement;
    [PropertySymbol.disableEvaluation]: boolean;
    [PropertySymbol.blocking]: DOMTokenList | null;
    get onerror(): ((event: Event) => void) | null;
    set onerror(value: ((event: Event) => void) | null);
    get onload(): ((event: Event) => void) | null;
    set onload(value: ((event: Event) => void) | null);
    /**
     * Returns type.
     *
     * @returns Type.
     */
    get type(): string;
    /**
     * Sets type.
     *
     * @param type Type.
     */
    set type(type: string);
    /**
     * Returns blocking.
     */
    get blocking(): DOMTokenList;
    /**
     * Sets blocking.
     *
     * @param value Value.
     */
    set blocking(value: string);
    /**
     * Returns crossOrigin.
     *
     * @returns CrossOrigin.
     */
    get crossOrigin(): string;
    /**
     * Sets crossOrigin.
     *
     * @param crossOrigin CrossOrigin.
     */
    set crossOrigin(crossOrigin: string);
    /**
     * Returns fetch priority.
     *
     * @returns Fetch priority.
     */
    get fetchPriority(): 'auto' | 'high' | 'low' | 'normal';
    /**
     * Sets fetch priority.
     *
     * @param fetchPriority Fetch priority.
     */
    set fetchPriority(fetchPriority: 'auto' | 'high' | 'low' | 'normal');
    /**
     * Returns noModule.
     *
     * @returns NoModule.
     */
    get noModule(): boolean;
    /**
     * Sets noModule.
     *
     * @param noModule NoModule.
     */
    set noModule(noModule: boolean);
    /**
     * Returns integrity.
     *
     * @returns Integrity.
     */
    get integrity(): string;
    /**
     * Sets integrity.
     *
     * @param integrity Integrity.
     */
    set integrity(integrity: string);
    /**
     * Returns referrerPolicy.
     *
     * @returns ReferrerPolicy.
     */
    get referrerPolicy(): TRequestReferrerPolicy;
    /**
     * Sets referrerPolicy.
     *
     * @param referrerPolicy ReferrerPolicy.
     */
    set referrerPolicy(referrerPolicy: string);
    /**
     * Returns source.
     *
     * @returns Source.
     */
    get src(): string;
    /**
     * Sets source.
     *
     * @param src Source.
     */
    set src(src: string);
    /**
     * Returns charset.
     *
     * @returns Charset.
     */
    get charset(): string;
    /**
     * Sets charset.
     *
     * @param charset Charset.
     */
    set charset(charset: string);
    /**
     * Returns lang.
     *
     * @returns Lang.
     */
    get lang(): string;
    /**
     * Sets lang.
     *
     * @param lang Lang.
     */
    set lang(lang: string);
    /**
     * Returns async.
     *
     * @returns Async.
     */
    get async(): boolean;
    /**
     * Sets async.
     *
     * @param async Async.
     */
    set async(async: boolean);
    /**
     * Returns defer.
     *
     * @returns Defer.
     */
    get defer(): boolean;
    /**
     * Sets defer.
     *
     * @param defer Defer.
     */
    set defer(defer: boolean);
    /**
     * Returns text.
     *
     * @returns Text.
     */
    get text(): string;
    /**
     * Sets text.
     *
     * @param text Text.
     */
    set text(text: string);
    /**
     * @override
     */
    [PropertySymbol.cloneNode](deep?: boolean): HTMLScriptElement;
    /**
     * @override
     */
    [PropertySymbol.connectedToDocument](): void;
    /**
     * @override
     */
    [PropertySymbol.onSetAttribute](attribute: Attr, replacedAttribute: Attr | null): void;
    /**
     * Returns true if the given type is supported.
     *
     * @param type Type.
     * @returns True if the given type is supported.
     */
    static supports(type: string): boolean;
}
//# sourceMappingURL=HTMLScriptElement.d.ts.map