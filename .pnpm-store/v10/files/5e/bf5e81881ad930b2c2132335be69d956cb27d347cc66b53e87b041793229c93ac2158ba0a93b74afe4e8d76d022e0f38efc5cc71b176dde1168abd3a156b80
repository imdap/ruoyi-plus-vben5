import CSSRule from '../CSSRule.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import CSSStyleDeclaration from '../declaration/CSSStyleDeclaration.js';
import CSSRuleTypeEnum from '../CSSRuleTypeEnum.js';
/**
 * CSSFontFaceRule interface.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CSSFontFaceRule
 */
export default class CSSFontFaceRule extends CSSRule {
    [PropertySymbol.cssText] = '';
    #style = null;
    /**
     * @override
     */
    get type() {
        return CSSRuleTypeEnum.fontFaceRule;
    }
    /**
     * @override
     */
    get cssText() {
        return `@font-face { ${this.style.cssText} }`;
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
//# sourceMappingURL=CSSFontFaceRule.js.map