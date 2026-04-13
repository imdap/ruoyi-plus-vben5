import CSSRuleTypeEnum from '../CSSRuleTypeEnum.js';
import MediaList from '../MediaList.js';
import CSSConditionRule from './CSSConditionRule.js';
import * as PropertySymbol from '../../PropertySymbol.js';
/**
 * CSSMediaRule interface.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CSSMediaRule
 */
export default class CSSMediaRule extends CSSConditionRule {
    [PropertySymbol.media] = new MediaList(PropertySymbol.illegalConstructor, this);
    /**
     * @override
     */
    get type() {
        return CSSRuleTypeEnum.mediaRule;
    }
    /**
     * @override
     */
    get cssText() {
        let cssText = '';
        for (const cssRule of this[PropertySymbol.cssRules]) {
            cssText += '\n  ' + cssRule.cssText;
        }
        cssText += cssText ? '\n' : '  ';
        return `@media ${this.conditionText} {${cssText}}`;
    }
    /**
     * Returns media.
     *
     * @returns Media.
     */
    get media() {
        return this[PropertySymbol.media];
    }
    /**
     * Returns conditional text.
     *
     * @returns Conditional text.
     */
    get conditionText() {
        return this.media.mediaText;
    }
}
//# sourceMappingURL=CSSMediaRule.js.map