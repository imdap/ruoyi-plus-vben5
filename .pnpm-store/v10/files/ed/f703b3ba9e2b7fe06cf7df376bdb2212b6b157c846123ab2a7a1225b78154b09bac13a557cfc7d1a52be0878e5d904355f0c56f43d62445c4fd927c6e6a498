import CSSRuleTypeEnum from '../CSSRuleTypeEnum.js';
import CSSConditionRule from './CSSConditionRule.js';
import * as PropertySymbol from '../../PropertySymbol.js';
/**
 * CSSRule interface.
 */
export default class CSSSupportsRule extends CSSConditionRule {
    [PropertySymbol.type] = CSSRuleTypeEnum.supportsRule;
    [PropertySymbol.rulePrefix] = '';
    /**
     * @override
     */
    get type() {
        return CSSRuleTypeEnum.supportsRule;
    }
    /**
     * @override
     */
    get cssText() {
        let cssText = '';
        for (const cssRule of this[PropertySymbol.cssRules]) {
            cssText += '\n  ' + cssRule.cssText;
        }
        cssText += '\n';
        return `@${this[PropertySymbol.rulePrefix]}supports ${this.conditionText} {${cssText}}`;
    }
}
//# sourceMappingURL=CSSSupportsRule.js.map