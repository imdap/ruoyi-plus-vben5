import * as PropertySymbol from '../../PropertySymbol.js';
import CSSRuleTypeEnum from '../CSSRuleTypeEnum.js';
import CSSGroupingRule from './CSSGroupingRule.js';
/**
 * CSSScopeRule interface.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CSSScopeRule
 */
export default class CSSScopeRule extends CSSGroupingRule {
    [PropertySymbol.start] = '';
    [PropertySymbol.end] = '';
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
        return `@${this[PropertySymbol.rulePrefix]}scope${this[PropertySymbol.start] ? ` (${this[PropertySymbol.start]})` : ''}${this[PropertySymbol.end] ? ` to (${this[PropertySymbol.end]})` : ''} {${cssText}}`;
    }
    /**
     * Returns start.
     *
     * @returns Start.
     */
    get start() {
        return this[PropertySymbol.start];
    }
    /**
     * Returns end.
     *
     * @returns End.
     */
    get end() {
        return this[PropertySymbol.end];
    }
}
//# sourceMappingURL=CSSScopeRule.js.map