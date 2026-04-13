import DOMExceptionNameEnum from '../exception/DOMExceptionNameEnum.js';
import CSSParser from './utilities/CSSParser.js';
import * as PropertySymbol from '../PropertySymbol.js';
/**
 * CSS StyleSheet.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet.
 */
export default class CSSStyleSheet {
    cssRules = [];
    // TODO: MediaList is not fully implemented.
    media;
    title;
    alternate;
    disabled;
    #currentText = null;
    /**
     * Constructor.
     *
     * @param [options] Options.
     * @param [options.media] Media.
     * @param [options.title] Title.
     * @param [options.alternate] Alternate.
     * @param [options.disabled] Disabled.
     */
    constructor(options) {
        this.media = options && options.media ? options.media : '';
        this.title = options && options.title ? options.title : '';
        this.alternate = options && options.alternate ? options.alternate : false;
        this.disabled = options && options.disabled ? options.disabled : false;
    }
    /**
     * Inserts a rule.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule
     * @param rule Rule.
     * @param [index] Index.
     * @returns The newly inserterted rule's index.
     */
    insertRule(rule, index) {
        if (arguments.length === 0) {
            throw new this[PropertySymbol.window].TypeError(`Failed to execute 'insertRule' on 'CSSStyleSheet': 1 argument required, but only 0 present.`);
        }
        const parser = new CSSParser(this);
        const rules = parser.parseFromString(rule);
        if (rules.length === 0 || rules.length > 1) {
            throw new this[PropertySymbol.window].DOMException(`Failed to execute 'insertRule' on 'CSSStyleSheet': Failed to parse the rule '${rule}'.`, DOMExceptionNameEnum.syntaxError);
        }
        if (index !== undefined) {
            if (index > this.cssRules.length) {
                throw new this[PropertySymbol.window].DOMException(`Failed to execute 'insertRule' on 'CSSStyleSheet': The index provided (${index}) is larger than the maximum index (${this.cssRules.length - 1}).`, DOMExceptionNameEnum.indexSizeError);
            }
            this.cssRules.splice(index, 0, rules[0]);
            return index;
        }
        const newIndex = this.cssRules.length;
        this.cssRules.push(rules[0]);
        return newIndex;
    }
    /**
     * Removes a rule.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/deleteRule
     * @param index Index.
     */
    deleteRule(index) {
        if (arguments.length === 0) {
            throw new this[PropertySymbol.window].TypeError(`Failed to execute 'deleteRule' on 'CSSStyleSheet': 1 argument required, but only 0 present.`);
        }
        this.cssRules.splice(index, 1);
    }
    /**
     * Replaces all CSS rules.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/replace
     * @param text CSS text.
     * @returns Promise.
     */
    async replace(text) {
        if (arguments.length === 0) {
            throw new this[PropertySymbol.window].TypeError(`Failed to execute 'replace' on 'CSSStyleSheet': 1 argument required, but only 0 present.`);
        }
        this.replaceSync(text);
    }
    /**
     * Replaces all CSS rules.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/replaceSync
     * @param text CSS text.
     */
    replaceSync(text) {
        if (arguments.length === 0) {
            throw new this[PropertySymbol.window].TypeError(`Failed to execute 'replaceSync' on 'CSSStyleSheet': 1 argument required, but only 0 present.`);
        }
        if (this.#currentText !== text) {
            this.#currentText = text;
            this.cssRules = new CSSParser(this).parseFromString(text);
        }
    }
}
//# sourceMappingURL=CSSStyleSheet.js.map