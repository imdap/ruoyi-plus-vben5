import CSSRule from '../CSSRule.js';
import CSSKeyframeRule from './CSSKeyframeRule.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import CSSRuleTypeEnum from '../CSSRuleTypeEnum.js';
/**
 * CSSKeyframesRule interface.
 */
export default class CSSKeyframesRule extends CSSRule {
    [PropertySymbol.cssRules]: CSSKeyframeRule[];
    [PropertySymbol.name]: string;
    [PropertySymbol.rulePrefix]: string;
    /**
     * @override
     */
    get type(): CSSRuleTypeEnum;
    /**
     * @override
     */
    get cssText(): string;
    /**
     * Returns CSS rules.
     *
     * @returns CSS rules.
     */
    get cssRules(): CSSRule[];
    /**
     * Returns name.
     *
     * @returns Name.
     */
    get name(): string;
    /**
     * Returns length.
     *
     * @returns Length.
     */
    get length(): number;
    /**
     * Appends a rule.
     *
     * @param rule Rule. E.g. "0% { transform: rotate(360deg); }".
     */
    appendRule(rule: string): void;
    /**
     * Removes a rule.
     *
     * @param rule Rule. E.g. "0%".
     */
    deleteRule(rule: string): void;
    /**
     * Finds a rule.
     *
     * @param rule Rule. E.g. "0%".
     * @returns Rule.
     */
    findRule(rule: string): CSSKeyframeRule | null;
}
//# sourceMappingURL=CSSKeyframesRule.d.ts.map