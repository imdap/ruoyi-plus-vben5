import * as PropertySymbol from '../../PropertySymbol.js';
/**
 * CSSStyleValue interface.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleValue
 */
export default class CSSStyleValue {
    #style;
    #property;
    /**
     * Constructor.
     *
     * @param illegalConstructorSymbol
     * @param style Style.
     * @param property Property.
     */
    constructor(illegalConstructorSymbol, style, property) {
        if (illegalConstructorSymbol !== PropertySymbol.illegalConstructor) {
            throw new TypeError('Illegal constructor');
        }
        this.#style = style;
        this.#property = property;
    }
    /**
     * Returns value as string.
     *
     * @returns Value.
     */
    toString() {
        return this.#style.getPropertyValue(this.#property);
    }
}
//# sourceMappingURL=CSSStyleValue.js.map