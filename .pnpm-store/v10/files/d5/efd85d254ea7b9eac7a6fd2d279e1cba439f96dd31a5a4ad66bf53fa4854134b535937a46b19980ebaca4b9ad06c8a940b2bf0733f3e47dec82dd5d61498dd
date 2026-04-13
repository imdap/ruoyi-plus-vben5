import * as PropertySymbol from '../../PropertySymbol.js';
import CSSStyleDeclaration from '../declaration/CSSStyleDeclaration.js';
import CSSRuleTypeEnum from '../CSSRuleTypeEnum.js';
import CSSGroupingRule from './CSSGroupingRule.js';
import StylePropertyMap from '../style-property-map/StylePropertyMap.js';
/**
 * CSSStyleRule interface.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleRule
 */
export default class CSSStyleRule extends CSSGroupingRule {
    [PropertySymbol.styleMap] = null;
    [PropertySymbol.selectorText] = '';
    [PropertySymbol.cssText] = '';
    #style = null;
    /**
     * @override
     */
    get type() {
        return CSSRuleTypeEnum.styleRule;
    }
    /**
     * @override
     */
    get cssText() {
        return `${this[PropertySymbol.selectorText]} { ${this.style.cssText} }`;
    }
    /**
     * Returns style map.
     *
     * @returns Style map.
     */
    get styleMap() {
        if (!this[PropertySymbol.styleMap]) {
            this[PropertySymbol.styleMap] = new StylePropertyMap(PropertySymbol.illegalConstructor, this.style);
        }
        return this[PropertySymbol.styleMap];
    }
    /**
     * Returns selector text.
     *
     * @returns Selector text.
     */
    get selectorText() {
        return this[PropertySymbol.selectorText];
    }
    /**
     * Returns style.
     *
     * @returns Style.
     */
    get style() {
        if (!this.#style) {
            this.#style = new CSSStyleDeclaration(PropertySymbol.illegalConstructor, this[PropertySymbol.window]);
            this.#style.parentRule = this;
            this.#style.cssText = this[PropertySymbol.cssText];
        }
        return this.#style;
    }
}
//# sourceMappingURL=CSSStyleRule.js.map