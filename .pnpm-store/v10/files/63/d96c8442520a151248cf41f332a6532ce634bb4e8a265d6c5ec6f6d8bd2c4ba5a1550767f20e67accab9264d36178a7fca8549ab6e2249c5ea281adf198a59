import type Element from '../nodes/element/Element.js';
import * as PropertySymbol from '../PropertySymbol.js';
/**
 * DOM Token List.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList.
 */
export default class DOMTokenList {
    [index: number]: string;
    private [PropertySymbol.ownerElement];
    private [PropertySymbol.attributeName];
    private [PropertySymbol.cache];
    private [PropertySymbol.supports];
    private [PropertySymbol.proxy]?;
    /**
     * Constructor.
     *
     * @param illegalConstructorSymbol Illegal constructor symbol.
     * @param ownerElement Owner element.
     * @param attributeName Attribute name.
     * @param [supports] Supports.
     */
    constructor(illegalConstructorSymbol: symbol, ownerElement: Element, attributeName: string, supports?: string[]);
    /**
     * Returns length.
     *
     * @returns Length.
     */
    get length(): number;
    /**
     * Set value.
     *
     * @param value Value.
     */
    set value(value: string);
    /**
     * Get value.
     */
    get value(): string;
    /**
     * Returns an iterator, allowing you to go through all values of the key/value pairs contained in this object.
     */
    [Symbol.iterator](): ArrayIterator<string>;
    /**
     * Get ClassName.
     *
     * @param index Index.
     * */
    item(index: number | string): string | null;
    /**
     * Replace Token.
     *
     * @param token Token.
     * @param newToken NewToken.
     */
    replace(token: string, newToken: string): boolean;
    /**
     * Supports.
     *
     * @param token Token.
     */
    supports(token: string): boolean;
    /**
     * Returns an iterator, allowing you to go through all values of the key/value pairs contained in this object.
     */
    values(): ArrayIterator<string>;
    /**
     * Returns an iterator, allowing you to go through all key/value pairs contained in this object.
     */
    entries(): ArrayIterator<[number, string]>;
    /**
     * Executes a provided callback function once for each DOMTokenList element.
     *
     * @param callback
     * @param thisArg
     */
    forEach(callback: (currentValue: string, currentIndex: number, parent: this) => void, thisArg?: any): void;
    /**
     * Returns an iterator, allowing you to go through all keys of the key/value pairs contained in this object.
     *
     */
    keys(): ArrayIterator<number>;
    /**
     * Adds tokens.
     *
     * @param tokens Tokens.
     */
    add(...tokens: string[]): void;
    /**
     * Removes tokens.
     *
     * @param tokens Tokens.
     */
    remove(...tokens: string[]): void;
    /**
     * Check if the list contains a class.
     *
     * @param className Class name.
     * @returns TRUE if it contains.
     */
    contains(className: string): boolean;
    /**
     * Toggle a class name.
     *
     * @param token A string representing the class name you want to toggle.
     * @param [force] If included, turns the toggle into a one way-only operation. If set to `false`, then class name will only be removed, but not added. If set to `true`, then class name will only be added, but not removed.
     * @returns A boolean value, `true` or `false`, indicating whether class name is in the list after the call or not.
     */
    toggle(token: string, force?: boolean): boolean;
    /**
     * Returns token list from attribute value.
     *
     * @see https://infra.spec.whatwg.org/#split-on-ascii-whitespace
     */
    [PropertySymbol.getTokenList](): string[];
    /**
     * Returns DOMTokenList value.
     */
    toString(): string;
}
//# sourceMappingURL=DOMTokenList.d.ts.map