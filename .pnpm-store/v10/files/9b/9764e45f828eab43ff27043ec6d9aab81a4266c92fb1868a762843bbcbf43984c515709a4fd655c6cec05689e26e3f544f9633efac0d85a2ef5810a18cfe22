/**
 * @fileoverview Tailwind 4 Custom Syntax for CSSTree.
 * @author Nicholas C. Zakas
 */
//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import * as TailwindThemeKey from "./node/tailwind-theme-key.js";
import * as TailwindUtilityClass from "./node/tailwind-class.js";
import * as TailwindDeclaration from "./node/tailwind-declaration.js";
import tailwindApply from "./atrule/tailwind-apply.js";
import tailwindCustomVariant from "./atrule/tailwind-custom-variant.js";
import tailwindImport from "./atrule/tailwind-import.js";
import theme from "./scope/theme.js";
import { themeTypes } from "./types/theme-types.js";
import { tokenTypes } from "./token-types.js";
//-----------------------------------------------------------------------------
// Type Definitions
//-----------------------------------------------------------------------------
/**
 * @import { SyntaxConfig, SyntaxExtensionCallback } from "@eslint/css-tree"
 */
/** @type {SyntaxExtensionCallback} */
export const tailwind4 = prev => {
    const ASTERISK = 0x002a;
    const HYPHENMINUS = 0x002d;
    const previousDeclaration = prev.node?.Declaration;
    const previousDeclarationNode = typeof previousDeclaration === "function"
        ? { parse: previousDeclaration }
        : previousDeclaration;
    /** @type {any} */
    const previousDeclarationParse = previousDeclarationNode?.parse;
    return {
        ...prev,
        atrule: {
            ...prev.atrule,
            apply: tailwindApply,
            "custom-variant": tailwindCustomVariant,
            import: tailwindImport,
        },
        atrules: {
            ...prev.atrules,
            import: {
                prelude: "[ <string> | <url> ] [ [ source( [ <string> | none ] ) ]? || [ prefix( <ident> ) ]? || [ layer | layer( <layer-name> ) ]? ] [ supports( [ <supports-condition> | <declaration> ] ) ]? <media-query-list>?",
            },
            apply: {
                prelude: "<tw-apply-ident>+",
            },
            config: {
                prelude: "<string>",
            },
            theme: {
                prelude: null,
                descriptors: prev.properties,
            },
            source: {
                prelude: "not? [ <string> | inline(<string>) ]",
            },
            utility: {
                prelude: "<ident>",
            },
            variant: {
                prelude: "<ident>",
                descriptors: prev.properties,
            },
            "custom-variant": {
                prelude: "<ident> [ '(' <any-value> ')' ]?",
            },
            slot: {
                prelude: null,
            },
            plugin: {
                prelude: "<string>",
            },
            reference: {
                prelude: "<string>",
            },
        },
        types: {
            ...prev.types,
            "length-percentage": `${prev.types["length-percentage"]} | <tw-any-spacing>`,
            color: `${prev.types.color} | <tw-any-color>`,
            "tw-alpha": `--alpha(<color> / <percentage>)`,
            "tw-spacing": "--spacing(<number>)",
            "tw-any-spacing": "<tw-spacing> | <tw-theme-spacing>",
            "tw-any-color": "<tw-alpha> | <tw-theme-color>",
            "tw-apply-ident": "<ident> | <tw-utility-with-variant> | <tw-utility-with-opacity>",
            "tw-utility-with-variant": "[ <ident> ':' <ident> ] | [ <ident> ':' <ident> '/' <number> ] | [ <ident> ':' <ident> '/' <ident> ]",
            "tw-utility-with-opacity": "[ <ident> '/' <number> ] | [ <ident> '/' <ident> ]",
            ...themeTypes,
        },
        node: {
            ...prev.node,
            Declaration: previousDeclarationParse
                ? {
                    ...previousDeclarationNode,
                    /** @this {any} */
                    parse() {
                        /*
                         * Tailwind allows wildcard custom properties in @theme blocks,
                         * e.g. `--color-*: initial;`.
                         */
                        if (this.tokenType !== tokenTypes.Ident ||
                            this.charCodeAt(this.tokenStart) !== HYPHENMINUS ||
                            this.charCodeAt(this.tokenStart + 1) !== HYPHENMINUS ||
                            this.lookupTypeNonSC(1) !== tokenTypes.Delim ||
                            this.lookupTypeNonSC(2) !== tokenTypes.Colon) {
                            return previousDeclarationParse.call(this);
                        }
                        const wildcardOffset = this.lookupOffsetNonSC(1);
                        const wildcardIndex = this.tokenIndex + wildcardOffset;
                        const wildcardStart = this.getTokenStart(wildcardIndex);
                        if (this.charCodeAt(wildcardStart) !== ASTERISK) {
                            return previousDeclarationParse.call(this);
                        }
                        return TailwindDeclaration.parse.call(this);
                    },
                }
                : TailwindDeclaration,
            TailwindThemeKey,
            TailwindUtilityClass,
        },
        scope: {
            ...prev.scope,
            Value: {
                ...prev.scope?.Value,
                theme,
            },
        },
    };
};
