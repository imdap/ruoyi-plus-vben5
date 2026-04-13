import CSSRuleTypeEnum from '../CSSRuleTypeEnum.js';
import CSSConditionRule from './CSSConditionRule.js';
import * as PropertySymbol from '../../PropertySymbol.js';
/**
 * CSSContainerRule interface.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CSSContainerRule
 */
export default class CSSContainerRule extends CSSConditionRule {
    [PropertySymbol.type] = CSSRuleTypeEnum.containerRule;
    [PropertySymbol.rulePrefix] = '';
    /**
     * @override
     */
    get type() {
        return CSSRuleTypeEnum.containerRule;
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
        return `@${this[PropertySymbol.rulePrefix]}container ${this[PropertySymbol.conditionText]} {${cssText}}`;
    }
}
//# sourceMappingURL=CSSContainerRule.js.map