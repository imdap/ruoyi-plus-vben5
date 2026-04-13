import CSSRule from '../CSSRule.js';
import * as PropertySymbol from '../../PropertySymbol.js';
/**
 * CSSGroupingRule interface.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CSSGroupingRule
 */
export default abstract class CSSGroupingRule extends CSSRule {
    [PropertySymbol.cssRules]: CSSRule[];
    /**
     * Returns CSS rules.
     *
     * @returns CSS rules.
     */
    get cssRules(): CSSRule[];
    /**
     * Inserts a new rule.
     *
     * @param rule Rule.
     * @param [index] Index.
     * @returns The index of the new rule.
     */
    insertRule(rule: string, index?: number): number;
    /**
     * Removes a rule.
     *
     * @param index Index.
     */
    deleteRule(index: number): void;
}
//# sourceMappingURL=CSSGroupingRule.d.ts.map