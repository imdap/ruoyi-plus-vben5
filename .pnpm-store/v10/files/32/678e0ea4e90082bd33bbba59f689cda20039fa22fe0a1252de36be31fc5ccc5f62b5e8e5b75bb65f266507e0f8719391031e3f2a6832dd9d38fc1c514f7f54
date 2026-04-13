import CSSRule from '../CSSRule.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import CSSStyleDeclaration from '../declaration/CSSStyleDeclaration.js';
import CSSRuleTypeEnum from '../CSSRuleTypeEnum.js';
/**
 * CSSKeyframeRule interface.
 */
export default class CSSKeyframeRule extends CSSRule {
    [PropertySymbol.keyText] = '';
    [PropertySymbol.cssText] = '';
    #style = null;
    /**
     * @override
     */
    get type() {
        return CSSRuleTypeEnum.keyframeRule;
    }
    /**
     * @override
     */
    get cssText() {
        return `${this[PropertySymbol.keyText]} { ${this.style.cssText} }`;
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
    /**
     * Returns key text.
     *
     * @returns Key text.
     */
    get keyText() {
        return this[PropertySymbol.keyText];
    }
}
//# sourceMappingURL=CSSKeyframeRule.js.map