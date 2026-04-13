import CSSRuleTypeEnum from './CSSRuleTypeEnum.js';
import * as PropertySymbol from '../PropertySymbol.js';
/**
 * CSSRule interface.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CSSRule
 */
export default class CSSRule {
    // Static properties
    static CONTAINER_RULE = CSSRuleTypeEnum.containerRule;
    static STYLE_RULE = CSSRuleTypeEnum.styleRule;
    static IMPORT_RULE = CSSRuleTypeEnum.importRule;
    static MEDIA_RULE = CSSRuleTypeEnum.mediaRule;
    static FONT_FACE_RULE = CSSRuleTypeEnum.fontFaceRule;
    static PAGE_RULE = CSSRuleTypeEnum.pageRule;
    static KEYFRAMES_RULE = CSSRuleTypeEnum.keyframesRule;
    static KEYFRAME_RULE = CSSRuleTypeEnum.keyframeRule;
    static NAMESPACE_RULE = CSSRuleTypeEnum.namespaceRule;
    static COUNTER_STYLE_RULE = CSSRuleTypeEnum.counterStyleRule;
    static SUPPORTS_RULE = CSSRuleTypeEnum.supportsRule;
    static DOCUMENT_RULE = CSSRuleTypeEnum.documentRule;
    static FONT_FEATURE_VALUES_RULE = CSSRuleTypeEnum.fontFeatureValuesRule;
    static REGION_STYLE_RULE = CSSRuleTypeEnum.regionStyleRule;
    // Internal properties
    [PropertySymbol.window];
    [PropertySymbol.cssParser];
    // Public properties
    [PropertySymbol.parentRule] = null;
    [PropertySymbol.parentStyleSheet] = null;
    /**
     * Constructor.
     *
     * @param illegalConstructorSymbol Illegal constructor symbol.
     * @param window Window.
     * @param cssParser CSS parser.
     */
    constructor(illegalConstructorSymbol, window, cssParser) {
        if (illegalConstructorSymbol !== PropertySymbol.illegalConstructor) {
            throw new TypeError('Illegal constructor');
        }
        this[PropertySymbol.window] = window;
        this[PropertySymbol.cssParser] = cssParser;
    }
    /**
     * Returns parent rule.
     *
     * @returns Parent rule.
     */
    get parentRule() {
        return this[PropertySymbol.parentRule];
    }
    /**
     * Returns parent style sheet.
     *
     * @returns Parent style sheet.
     */
    get parentStyleSheet() {
        return this[PropertySymbol.parentStyleSheet];
    }
}
//# sourceMappingURL=CSSRule.js.map