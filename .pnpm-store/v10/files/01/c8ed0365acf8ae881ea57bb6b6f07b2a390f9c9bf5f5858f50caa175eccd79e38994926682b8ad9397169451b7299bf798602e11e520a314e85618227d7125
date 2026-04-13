import type CSSStyleDeclaration from '../declaration/CSSStyleDeclaration.js';
import CSSKeywordValue from './CSSKeywordValue.js';
import CSSStyleValue from './CSSStyleValue.js';
import * as PropertySymbol from '../../PropertySymbol.js';
/**
 * StylePropertyMapReadOnly interface.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/StylePropertyMapReadOnly
 */
export default class StylePropertyMapReadOnly {
    [PropertySymbol.style]: CSSStyleDeclaration;
    /**
     * Constructor.
     *
     * @param illegalConstructorSymbol Illegal constructor symbol.
     * @param style Style.
     */
    constructor(illegalConstructorSymbol: Symbol, style: CSSStyleDeclaration);
    /**
     * Returns size.
     *
     * @returns Size.
     */
    get size(): number;
    /**
     * Returns an iterator, allowing you to go through all values of the key/value pairs contained in this object.
     *
     * @returns Iterator.
     */
    [Symbol.iterator](): IterableIterator<[string, CSSKeywordValue[]]>;
    /**
     * Returns an iterator, allowing you to go through all key/value pairs contained in this object.
     *
     * @returns Entries.
     */
    entries(): IterableIterator<[string, CSSKeywordValue[]]>;
    /**
     * Returns an iterator, allowing you to go through all values of the key/value pairs contained in this object.
     *
     * @returns Values.
     */
    values(): IterableIterator<CSSKeywordValue[]>;
    /**
     * Returns an iterator, allowing you to go through all keys of the key/value pairs contained in this object.
     *
     * @returns Keys.
     */
    keys(): IterableIterator<string>;
    /**
     * Returns a property value.
     *
     * @param property Property.
     * @returns Value.
     */
    get(property: string): CSSStyleValue;
    /**
     * Returns array of property values.
     *
     * @param property Property.
     * @returns Values.
     */
    getAll(property: string): CSSStyleValue[];
    /**
     * Checks if a property is present.
     *
     * @param property Property.
     * @returns True if the property is present.
     */
    has(property: string): boolean;
}
//# sourceMappingURL=StylePropertyMapReadOnly.d.ts.map