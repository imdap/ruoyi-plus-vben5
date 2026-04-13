import SelectorItem from './SelectorItem.js';
import type Element from '../nodes/element/Element.js';
import type DocumentFragment from '../nodes/document-fragment/DocumentFragment.js';
import type BrowserWindow from '../window/BrowserWindow.js';
/**
 * Utility for parsing a selection string.
 */
export default class SelectorParser {
    private window;
    private scope;
    private ignoreErrors;
    /**
     *
     * @param options
     * @param options.window
     * @param options.scope
     * @param options.ignoreErrors
     */
    constructor(options: {
        window: BrowserWindow;
        scope: Element | DocumentFragment;
        ignoreErrors?: boolean;
    });
    /**
     * Parses a selector string and returns an instance of SelectorItem.
     *
     * @param window Window.
     * @param selector Selector.
     * @param options Options.
     * @param [options.scope] Scope.
     * @param [options.ignoreErrors] Ignores errors.
     * @returns Selector item.
     */
    getSelectorItem(selector: string): SelectorItem;
    /**
     * Parses a selector string and returns instances of SelectorItem.
     *
     * @param window Window.
     * @param selector Selector.
     * @param options Options.
     * @param [options.scope] Scope.
     * @param [options.ignoreErrors] Ignores errors.
     * @returns Selector groups.
     */
    getSelectorGroups(selector: string): Array<Array<SelectorItem>>;
    /**
     * Parses a selector string and returns an SelectorItem.
     *
     * @param selector Selector.
     * @param combinator Combinator.
     * @returns Selector item.
     */
    private getSelectorGroupItem;
    /**
     * Returns attribute RegExp.
     *
     * @param attribute Attribute.
     * @param attribute.value Attribute value.
     * @param attribute.operator Attribute operator.
     * @param attribute.modifier Attribute modifier.
     * @returns Attribute RegExp.
     */
    private getAttributeRegExp;
    /**
     * Returns pseudo.
     *
     * @param name Pseudo name.
     * @param args Pseudo arguments.
     * @returns Pseudo.
     */
    private getPseudo;
    /**
     * Returns pseudo nth function.
     *
     * Based on:
     * https://github.com/dperini/nwsapi/blob/master/src/nwsapi.js
     *
     * @param args Pseudo arguments.
     * @returns Pseudo nth function.
     */
    private getPseudoNthFunction;
    /**
     * Unescapes CSS escape sequences in a string value.
     *
     * Handles hex escapes (e.g. "\30 " → "0", "\0041" → "A") and character escapes (e.g. "\:" → ":").
     *
     * @see https://www.w3.org/TR/css-syntax-3/#consume-escaped-code-point
     * @param value Escaped CSS value.
     * @returns Unescaped value.
     */
    private static cssUnescape;
}
//# sourceMappingURL=SelectorParser.d.ts.map