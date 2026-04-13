import CSSKeywordValue from './CSSKeywordValue.js';
import CSSStyleValue from './CSSStyleValue.js';
import * as PropertySymbol from '../../PropertySymbol.js';
/**
 * StylePropertyMapReadOnly interface.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/StylePropertyMapReadOnly
 */
export default class StylePropertyMapReadOnly {
    [PropertySymbol.style];
    /**
     * Constructor.
     *
     * @param illegalConstructorSymbol Illegal constructor symbol.
     * @param style Style.
     */
    constructor(illegalConstructorSymbol, style) {
        if (illegalConstructorSymbol !== PropertySymbol.illegalConstructor) {
            throw new TypeError('Illegal constructor');
        }
        this[PropertySymbol.style] = style;
    }
    /**
     * Returns size.
     *
     * @returns Size.
     */
    get size() {
        return this[PropertySymbol.style].length;
    }
    /**
     * Returns an iterator, allowing you to go through all values of the key/value pairs contained in this object.
     *
     * @returns Iterator.
     */
    [Symbol.iterator]() {
        return this.entries();
    }
    /**
     * Returns an iterator, allowing you to go through all key/value pairs contained in this object.
     *
     * @returns Entries.
     */
    entries() {
        const length = this[PropertySymbol.style].length;
        const array = new Array(length);
        for (let i = 0; i < length; i++) {
            const property = this[PropertySymbol.style][i];
            array[i] = [
                property,
                [new CSSKeywordValue(this[PropertySymbol.style].getPropertyValue(property))]
            ];
        }
        return array.values();
    }
    /**
     * Returns an iterator, allowing you to go through all values of the key/value pairs contained in this object.
     *
     * @returns Values.
     */
    values() {
        const length = this[PropertySymbol.style].length;
        const array = new Array(length);
        for (let i = 0; i < length; i++) {
            const property = this[PropertySymbol.style][i];
            array[i] = [new CSSKeywordValue(this[PropertySymbol.style].getPropertyValue(property))];
        }
        return array.values();
    }
    /**
     * Returns an iterator, allowing you to go through all keys of the key/value pairs contained in this object.
     *
     * @returns Keys.
     */
    keys() {
        const length = this[PropertySymbol.style].length;
        const array = new Array(length);
        for (let i = 0; i < length; i++) {
            array[i] = this[PropertySymbol.style][i];
        }
        return array.values();
    }
    /**
     * Returns a property value.
     *
     * @param property Property.
     * @returns Value.
     */
    get(property) {
        return new CSSStyleValue(PropertySymbol.illegalConstructor, this[PropertySymbol.style], property);
    }
    /**
     * Returns array of property values.
     *
     * @param property Property.
     * @returns Values.
     */
    getAll(property) {
        return [
            new CSSStyleValue(PropertySymbol.illegalConstructor, this[PropertySymbol.style], property)
        ];
    }
    /**
     * Checks if a property is present.
     *
     * @param property Property.
     * @returns True if the property is present.
     */
    has(property) {
        return !!this[PropertySymbol.style].getPropertyValue(property);
    }
}
//# sourceMappingURL=StylePropertyMapReadOnly.js.map