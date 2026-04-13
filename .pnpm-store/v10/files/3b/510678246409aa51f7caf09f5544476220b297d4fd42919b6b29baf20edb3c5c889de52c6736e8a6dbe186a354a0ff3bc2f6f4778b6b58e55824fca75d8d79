import CSSRule from '../CSSRule.js';
import CSSKeyframeRule from './CSSKeyframeRule.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import CSSRuleTypeEnum from '../CSSRuleTypeEnum.js';
import DOMExceptionNameEnum from '../../exception/DOMExceptionNameEnum.js';
const CSS_RULE_REGEXP = /^(from|to|[0-9]{1,3}%)\s*{([^}]*)}$/;
/**
 * CSSKeyframesRule interface.
 */
export default class CSSKeyframesRule extends CSSRule {
    [PropertySymbol.cssRules] = [];
    [PropertySymbol.name] = '';
    [PropertySymbol.rulePrefix] = '';
    /**
     * @override
     */
    get type() {
        return CSSRuleTypeEnum.keyframesRule;
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
        return `@${this[PropertySymbol.rulePrefix]}keyframes ${this[PropertySymbol.name]} { ${cssText}}`;
    }
    /**
     * Returns CSS rules.
     *
     * @returns CSS rules.
     */
    get cssRules() {
        return this[PropertySymbol.cssRules];
    }
    /**
     * Returns name.
     *
     * @returns Name.
     */
    get name() {
        return this[PropertySymbol.name];
    }
    /**
     * Returns length.
     *
     * @returns Length.
     */
    get length() {
        return this[PropertySymbol.cssRules].length;
    }
    /**
     * Appends a rule.
     *
     * @param rule Rule. E.g. "0% { transform: rotate(360deg); }".
     */
    appendRule(rule) {
        if (arguments.length === 0) {
            throw new this[PropertySymbol.window].TypeError(`Failed to execute 'appendRule' on 'CSSKeyframesRule': 1 argument required, but only 0 present.`);
        }
        const match = String(rule).trim().match(CSS_RULE_REGEXP);
        if (!match) {
            throw new this[PropertySymbol.window].DOMException(`Invalid or unexpected token`, DOMExceptionNameEnum.syntaxError);
        }
        const cssRule = new CSSKeyframeRule(PropertySymbol.illegalConstructor, this[PropertySymbol.window], this[PropertySymbol.cssParser]);
        let keyText = match[1].trim();
        if (keyText === 'from') {
            keyText = '0%';
        }
        else if (keyText === 'to') {
            keyText = '100%';
        }
        cssRule[PropertySymbol.parentRule] = this;
        cssRule[PropertySymbol.keyText] = keyText;
        cssRule[PropertySymbol.cssText] = match[2].trim();
        this[PropertySymbol.cssRules].push(cssRule);
    }
    /**
     * Removes a rule.
     *
     * @param rule Rule. E.g. "0%".
     */
    deleteRule(rule) {
        if (arguments.length === 0) {
            throw new this[PropertySymbol.window].TypeError(`Failed to execute 'deleteRule' on 'CSSKeyframesRule': 1 argument required, but only 0 present.`);
        }
        for (let i = 0, max = this[PropertySymbol.cssRules].length; i < max; i++) {
            if (this[PropertySymbol.cssRules][i][PropertySymbol.keyText] === rule) {
                this[PropertySymbol.cssRules].splice(i, 1);
                return;
            }
        }
    }
    /**
     * Finds a rule.
     *
     * @param rule Rule. E.g. "0%".
     * @returns Rule.
     */
    findRule(rule) {
        if (arguments.length === 0) {
            throw new this[PropertySymbol.window].TypeError(`Failed to execute 'findRule' on 'CSSKeyframesRule': 1 argument required, but only 0 present.`);
        }
        for (let i = 0, max = this[PropertySymbol.cssRules].length; i < max; i++) {
            if (this[PropertySymbol.cssRules][i][PropertySymbol.keyText] === rule) {
                return this[PropertySymbol.cssRules][i];
            }
        }
        return null;
    }
}
//# sourceMappingURL=CSSKeyframesRule.js.map