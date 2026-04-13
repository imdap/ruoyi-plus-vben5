import CSSEscaper from './utilities/CSSEscaper.js';
import CSSUnitValue from './CSSUnitValue.js';
/**
 * The CSS interface holds useful CSS-related methods.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/CSS.
 */
export default class CSS {
    Hz = (value) => new CSSUnitValue(value, 'Hz');
    Q = (value) => new CSSUnitValue(value, 'Q');
    ch = (value) => new CSSUnitValue(value, 'ch');
    cm = (value) => new CSSUnitValue(value, 'cm');
    deg = (value) => new CSSUnitValue(value, 'deg');
    dpcm = (value) => new CSSUnitValue(value, 'dpcm');
    dpi = (value) => new CSSUnitValue(value, 'dpi');
    dppx = (value) => new CSSUnitValue(value, 'dppx');
    em = (value) => new CSSUnitValue(value, 'em');
    ex = (value) => new CSSUnitValue(value, 'ex');
    fr = (value) => new CSSUnitValue(value, 'fr');
    grad = (value) => new CSSUnitValue(value, 'grad');
    in = (value) => new CSSUnitValue(value, 'in');
    kHz = (value) => new CSSUnitValue(value, 'kHz');
    mm = (value) => new CSSUnitValue(value, 'mm');
    ms = (value) => new CSSUnitValue(value, 'ms');
    number = (value) => new CSSUnitValue(value, 'number');
    pc = (value) => new CSSUnitValue(value, 'pc');
    percent = (value) => new CSSUnitValue(value, 'percent');
    pt = (value) => new CSSUnitValue(value, 'pt');
    px = (value) => new CSSUnitValue(value, 'px');
    rad = (value) => new CSSUnitValue(value, 'rad');
    rem = (value) => new CSSUnitValue(value, 'rem');
    s = (value) => new CSSUnitValue(value, 's');
    turn = (value) => new CSSUnitValue(value, 'turn');
    vh = (value) => new CSSUnitValue(value, 'vh');
    vmax = (value) => new CSSUnitValue(value, 'vmax');
    vmin = (value) => new CSSUnitValue(value, 'vmin');
    vw = (value) => new CSSUnitValue(value, 'vw');
    /**
     * Returns a Boolean indicating if the pair property-value, or the condition, given in parameter is supported.
     *
     * TODO: Always returns "true" for now, but it should probably be improved in the future.
     *
     * @param _condition Property name or condition.
     * @param [_value] Value when using property name.
     * @returns "true" if supported.
     */
    supports(_condition, _value) {
        return true;
    }
    /**
     * Escapes a value.
     *
     * @param value Value to escape.
     * @returns Escaped string.
     */
    escape(value) {
        return CSSEscaper.escape(value);
    }
}
//# sourceMappingURL=CSS.js.map