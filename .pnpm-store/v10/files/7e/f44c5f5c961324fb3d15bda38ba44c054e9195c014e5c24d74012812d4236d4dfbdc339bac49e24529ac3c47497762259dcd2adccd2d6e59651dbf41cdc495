import type CSSStyleSheet from './CSSStyleSheet.js';
import CSSRuleTypeEnum from './CSSRuleTypeEnum.js';
import * as PropertySymbol from '../PropertySymbol.js';
import type BrowserWindow from '../window/BrowserWindow.js';
import type CSSParser from './utilities/CSSParser.js';
/**
 * CSSRule interface.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CSSRule
 */
export default abstract class CSSRule {
    static CONTAINER_RULE: CSSRuleTypeEnum;
    static STYLE_RULE: CSSRuleTypeEnum;
    static IMPORT_RULE: CSSRuleTypeEnum;
    static MEDIA_RULE: CSSRuleTypeEnum;
    static FONT_FACE_RULE: CSSRuleTypeEnum;
    static PAGE_RULE: CSSRuleTypeEnum;
    static KEYFRAMES_RULE: CSSRuleTypeEnum;
    static KEYFRAME_RULE: CSSRuleTypeEnum;
    static NAMESPACE_RULE: CSSRuleTypeEnum;
    static COUNTER_STYLE_RULE: CSSRuleTypeEnum;
    static SUPPORTS_RULE: CSSRuleTypeEnum;
    static DOCUMENT_RULE: CSSRuleTypeEnum;
    static FONT_FEATURE_VALUES_RULE: CSSRuleTypeEnum;
    static REGION_STYLE_RULE: CSSRuleTypeEnum;
    [PropertySymbol.window]: BrowserWindow;
    [PropertySymbol.cssParser]: CSSParser;
    [PropertySymbol.parentRule]: CSSRule | null;
    [PropertySymbol.parentStyleSheet]: CSSStyleSheet | null;
    /**
     * Constructor.
     *
     * @param illegalConstructorSymbol Illegal constructor symbol.
     * @param window Window.
     * @param cssParser CSS parser.
     */
    constructor(illegalConstructorSymbol: Symbol, window: BrowserWindow, cssParser: CSSParser);
    /**
     * Returns parent rule.
     *
     * @returns Parent rule.
     */
    get parentRule(): CSSRule | null;
    /**
     * Returns parent style sheet.
     *
     * @returns Parent style sheet.
     */
    get parentStyleSheet(): CSSStyleSheet | null;
    /**
     * Returns type.
     *
     * @returns Type.
     */
    abstract get type(): CSSRuleTypeEnum;
    /**
     * Returns CSS text.
     *
     * @returns CSS text.
     */
    abstract get cssText(): string;
}
//# sourceMappingURL=CSSRule.d.ts.map