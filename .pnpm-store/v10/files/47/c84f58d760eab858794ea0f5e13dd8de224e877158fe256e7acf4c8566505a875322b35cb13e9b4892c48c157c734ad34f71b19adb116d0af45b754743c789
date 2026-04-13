import StylePropertyMapReadOnly from './StylePropertyMapReadOnly.js';
import * as PropertySymbol from '../../PropertySymbol.js';
/**
 * StylePropertyMapReadOnly interface.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/StylePropertyMapReadOnly
 */
export default class StylePropertyMap extends StylePropertyMapReadOnly {
    /**
     * Appends a property.
     *
     * @param property Property.
     * @param value Value.
     */
    append(property, value) {
        this[PropertySymbol.style].setProperty(property, value);
    }
    /**
     * Clears all properties.
     */
    clear() {
        this[PropertySymbol.style].cssText = '';
    }
    /**
     * Deletes a property.
     *
     * @param property Property.
     */
    delete(property) {
        this[PropertySymbol.style].removeProperty(property);
    }
    /**
     * Sets a property.
     *
     * @param property Property.
     * @param value Value.
     */
    set(property, value) {
        this[PropertySymbol.style].setProperty(property, value);
    }
}
//# sourceMappingURL=StylePropertyMap.js.map