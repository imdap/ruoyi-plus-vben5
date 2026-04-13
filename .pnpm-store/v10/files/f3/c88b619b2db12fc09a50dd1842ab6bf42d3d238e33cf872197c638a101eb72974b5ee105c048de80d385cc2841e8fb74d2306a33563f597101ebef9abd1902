/**
 * @fileoverview The TailwindUtilityClass node.
 * Represents a Tailwind utility class in the AST, such as "bg-red-500"
 * or "hover:bg-blue-700".
 * @author Nicholas C. Zakas
 */
//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { tokenTypes } from "../token-types.js";
//-----------------------------------------------------------------------------
// Type Definitions
//-----------------------------------------------------------------------------
/**
 * @import { NodeSyntaxConfig } from "@eslint/css-tree";
 */
/**
 * @import { CssNode, CssNodeCommon, ParserContext, Recognizer, Identifier } from "@eslint/css-tree";
 *
 * @typedef {Object} TailwindParserContextApplyExtensions
 * @property {(recognizer: Recognizer) => CssNode} TailwindThemeKey - Parses the key of the theme function.
 * @property {() => CssNode} TailwindUtilityClass - Parses a Tailwind utility class.
 * @property {() => Identifier} Identifier - Parses an identifier.
 *
 * @typedef {CssNodeCommon & { name: Identifier, variant: Identifier | null }} TailwindUtilityClassNode
 *
 * @typedef {ParserContext & TailwindParserContextApplyExtensions} TailwindParserApplyContext
 */
//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------
/**
 * Name of the Tailwind utility class node.
 * @type {string}
 */
export const name = "TailwindUtilityClass";
/**
 * Structure of the Tailwind theme key node.
 * @type {NodeSyntaxConfig["structure"]}
 */
export const structure = {
    name: ["Identifier"],
    variant: ["Identifier"],
};
/**
 * Parse method for Tailwind theme key node.
 * Handles Tailwind functions such as theme(colors.gray.900/75%) and theme(spacing[2.5]).
 * @this {TailwindParserApplyContext}
 * @type {NodeSyntaxConfig<TailwindUtilityClassNode>["parse"]}
 */
export function parse() {
    this.skipSC();
    const start = this.tokenStart;
    let className = this.Identifier();
    // if next character is a :, then it's a variant
    let variant = null;
    if (this.tokenType === tokenTypes.Colon) {
        this.next();
        variant = className;
        className = this.Identifier();
    }
    if (this.tokenType === tokenTypes.LeftSquareBracket) {
        const bracketStart = this.tokenStart;
        let depth = 0;
        do {
            if (this.tokenType === tokenTypes.LeftSquareBracket) {
                depth++;
            }
            else if (this.tokenType === tokenTypes.RightSquareBracket) {
                depth--;
            }
            this.next();
        } while (depth > 0 && this.tokenType !== tokenTypes.EOF);
        className = {
            ...className,
            name: className.name + this.source.slice(bracketStart, this.tokenStart)
        };
    }
    // Handle slash notation for opacity (e.g., bg-red-500/50 or hover:bg-red-500/50)
    // Only try to parse slash if we see one
    if (this.tokenType === tokenTypes.Delim && this.tokenValue === '/') {
        this.next(); // consume the '/'
        if (this.tokenType === tokenTypes.Ident) {
            const opacityValue = this.Identifier();
            className = {
                ...className,
                name: className.name + '/' + opacityValue.name
            };
        }
        else if (this.tokenType === tokenTypes.Number) {
            const opacityValue = this.tokenValue;
            this.next(); // consume the number token
            className = {
                ...className,
                name: className.name + '/' + opacityValue
            };
        }
        // If we can't parse after /, don't throw an error, just continue
        // This will leave tokens unconsumed which should cause a parse error naturally
    }
    this.skipSC();
    return {
        type: name,
        loc: this.getLocation(start, this.tokenStart),
        name: className,
        variant
    };
}
/**
 * Generate method for Tailwind theme key node.
 * @type {NodeSyntaxConfig<TailwindUtilityClassNode>["generate"]}
 */
export function generate(node) {
    if (node.variant) {
        // @ts-ignore
        this.token(tokenTypes.Ident, node.variant.name);
        // @ts-ignore
        this.token(tokenTypes.Colon, ':');
    }
    // @ts-ignore
    this.token(tokenTypes.Ident, node.name.name);
}
