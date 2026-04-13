/**
 * @fileoverview Overrides Declaration parsing to support Tailwind wildcard custom properties.
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
//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------
const EXCLAMATIONMARK = 0x0021;
const NUMBERSIGN = 0x0023;
const DOLLARSIGN = 0x0024;
const AMPERSAND = 0x0026;
const ASTERISK = 0x002a;
const PLUSSIGN = 0x002b;
const SOLIDUS = 0x002f;
/** @this {any} */
function consumeValueRaw() {
    return this.Raw(this.consumeUntilExclamationMarkOrSemicolon, true);
}
/** @this {any} */
function consumeCustomPropertyRaw() {
    return this.Raw(this.consumeUntilExclamationMarkOrSemicolon, false);
}
/** @this {any} */
function consumeValue() {
    const startValueToken = this.tokenIndex;
    const value = this.Value();
    if (value.type !== "Raw" &&
        this.eof === false &&
        this.tokenType !== tokenTypes.Semicolon &&
        this.isDelim(EXCLAMATIONMARK) === false &&
        this.isBalanceEdge(startValueToken) === false) {
        this.error();
    }
    return value;
}
/** @this {any} */
function readProperty() {
    const start = this.tokenStart;
    // hacks
    if (this.tokenType === tokenTypes.Delim) {
        switch (this.charCodeAt(this.tokenStart)) {
            case ASTERISK:
            case DOLLARSIGN:
            case PLUSSIGN:
            case NUMBERSIGN:
            case AMPERSAND:
                this.next();
                break;
            // TODO: not sure we should support this hack
            case SOLIDUS:
                this.next();
                if (this.isDelim(SOLIDUS)) {
                    this.next();
                }
                break;
        }
    }
    if (this.tokenType === tokenTypes.Hash) {
        this.eat(tokenTypes.Hash);
    }
    else {
        this.eat(tokenTypes.Ident);
    }
    // Tailwind allows wildcard custom properties such as `--color-*` in @theme.
    if (this.substrToCursor(start).startsWith("--") &&
        this.isDelim(ASTERISK) &&
        this.lookupTypeNonSC(1) === tokenTypes.Colon) {
        this.next();
    }
    return this.substrToCursor(start);
}
/** @this {any} */
function getImportant() {
    this.eat(tokenTypes.Delim);
    this.skipSC();
    const important = this.consume(tokenTypes.Ident);
    return important === "important" ? true : important;
}
//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------
export const name = "Declaration";
/** @type {NodeSyntaxConfig["structure"]} */
export const structure = {
    important: [Boolean, String],
    property: String,
    value: ["Value", "Raw"],
};
/** @this {any} */
export function parse() {
    const start = this.tokenStart;
    const startToken = this.tokenIndex;
    const property = readProperty.call(this);
    const customProperty = property.startsWith("--");
    const parseValue = customProperty
        ? this.parseCustomProperty
        : this.parseValue;
    const consumeRaw = customProperty
        ? consumeCustomPropertyRaw
        : consumeValueRaw;
    let important = false;
    let value;
    this.skipSC();
    this.eat(tokenTypes.Colon);
    const valueStart = this.tokenIndex;
    if (!customProperty) {
        this.skipSC();
    }
    if (parseValue) {
        value = this.parseWithFallback(consumeValue, consumeRaw);
    }
    else {
        value = consumeRaw.call(this);
    }
    if (customProperty && value.type === "Value" && value.children.isEmpty) {
        for (let offset = valueStart - this.tokenIndex; offset <= 0; offset++) {
            if (this.lookupType(offset) === tokenTypes.WhiteSpace) {
                value.children.appendData({
                    type: "WhiteSpace",
                    loc: null,
                    value: " ",
                });
                break;
            }
        }
    }
    if (this.isDelim(EXCLAMATIONMARK)) {
        important = getImportant.call(this);
        this.skipSC();
    }
    if (this.eof === false &&
        this.tokenType !== tokenTypes.Semicolon &&
        this.isBalanceEdge(startToken) === false) {
        this.error();
    }
    return {
        type: "Declaration",
        loc: this.getLocation(start, this.tokenStart),
        important,
        property,
        value,
    };
}
/**
 * @this {any}
 * @param {any} node
 */
export function generate(node) {
    if (node.property.startsWith("--") && node.property.endsWith("*")) {
        this.token(tokenTypes.Ident, node.property.slice(0, -1));
        this.token(tokenTypes.Delim, "*");
    }
    else {
        this.token(tokenTypes.Ident, node.property);
    }
    this.token(tokenTypes.Colon, ":");
    this.node(node.value);
    if (node.important) {
        this.token(tokenTypes.Delim, "!");
        this.token(tokenTypes.Ident, node.important === true ? "important" : node.important);
    }
}
