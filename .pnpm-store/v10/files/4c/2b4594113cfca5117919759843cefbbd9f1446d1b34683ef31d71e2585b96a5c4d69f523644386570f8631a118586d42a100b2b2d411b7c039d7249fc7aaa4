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
    #private;
    [PropertySymbol.styleMap]: StylePropertyMap | null;
    [PropertySymbol.selectorText]: string;
    [PropertySymbol.cssText]: string;
    /**
     * @override
     */
    get type(): CSSRuleTypeEnum;
    /**
     * @override
     */
    get cssText(): string;
    /**
     * Returns style map.
     *
     * @returns Style map.
     */
    get styleMap(): StylePropertyMap;
    /**
     * Returns selector text.
     *
     * @returns Selector text.
     */
    get selectorText(): string;
    /**
     * Returns style.
     *
     * @returns Style.
     */
    get style(): CSSStyleDeclaration;
}
//# sourceMappingURL=CSSStyleRule.d.ts.map