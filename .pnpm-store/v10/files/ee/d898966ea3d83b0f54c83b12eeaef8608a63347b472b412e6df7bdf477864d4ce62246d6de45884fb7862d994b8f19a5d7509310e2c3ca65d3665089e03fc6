/**
 * @fileoverview Tailwind 3 @apply rule parser
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
 * @import { ParserContext, ConsumerFunction } from "@eslint/css-tree";
 *
 */
//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------
const EXCLAMATIONMARK = 0x0021;
/** @type {any} */
const tailwindApply = {
    parse: {
        /**
         * @this {ParserContext}
         */
        prelude: function () {
            const children = this.createList();
            this.important = false;
            while (this.tokenType === tokenTypes.Ident) {
                if (this.lookupType(1) === tokenTypes.Colon ||
                    this.lookupType(1) === tokenTypes.LeftSquareBracket) {
                    // This is a variant like hover: or an arbitrary utility like grid-cols-[...] - use TailwindUtilityClass
                    children.push(
                    /** @type {ConsumerFunction} */ (this.TailwindUtilityClass)());
                }
                else {
                    // Simple identifier - use Identifier parser
                    children.push(
                    /** @type {ConsumerFunction} */ (this.Identifier)());
                }
                this.skipSC();
            }
            if (this.isDelim(EXCLAMATIONMARK)) {
                this.next();
                this.skipSC();
                if (this.tokenType !== tokenTypes.Ident ||
                    !this.cmpStr(this.tokenStart, this.tokenEnd, "important")) {
                    this.error("Expected 'important' keyword after '!' in @apply directive", 0);
                }
                // Consume `important` so Atrule parser can continue from the next token.
                this.Identifier();
                this.important = true;
                this.skipSC();
            }
            return children;
        },
        block: null,
    },
};
export default tailwindApply;
