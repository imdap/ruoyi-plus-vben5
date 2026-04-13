import { getRules } from "./rules.mjs";
import * as jsoncESLintParser from "jsonc-eslint-parser";
import { getStaticJSONValue, isExpression, isNumberIdentifier, isUndefinedIdentifier, tokenize } from "jsonc-eslint-parser";
import path from "node:path";
import { toCompatCreate } from "eslint-json-compat-utils";
import { builtinRules } from "eslint/use-at-your-own-risk";
import { PatternMatcher, isClosingBraceToken, isClosingBracketToken, isClosingParenToken, isColonToken, isCommaToken, isCommentToken, isNotClosingParenToken, isNotCommaToken, isOpeningBraceToken, isOpeningParenToken, isParenthesized, isSemicolonToken } from "@eslint-community/eslint-utils";
import { createSyncFn } from "synckit";
import { fileURLToPath } from "node:url";
import naturalCompare from "natural-compare";
import diffBase from "diff-sequences";

//#region lib/utils/index.ts
/**
* Define the rule.
* @param ruleName ruleName
* @param rule rule module
*/
function createRule(ruleName, rule) {
	return {
		meta: {
			...rule.meta,
			docs: {
				...rule.meta.docs,
				url: `https://ota-meshi.github.io/eslint-plugin-jsonc/rules/${ruleName}.html`,
				ruleId: `jsonc/${ruleName}`,
				ruleName
			}
		},
		jsoncDefineRule: rule,
		create(baseContext) {
			const context = getCompatContext(baseContext);
			const create = toCompatCreate(rule.create);
			const sourceCode = context.sourceCode;
			if (typeof sourceCode.parserServices?.defineCustomBlocksVisitor === "function" && path.extname(context.filename) === ".vue") return sourceCode.parserServices.defineCustomBlocksVisitor(context, jsoncESLintParser, {
				target(lang, block) {
					if (lang) return /^json[5c]?$/i.test(lang);
					return block.name === "i18n";
				},
				create(blockContext) {
					return create(blockContext, { customBlock: true });
				}
			});
			return create(context, { customBlock: false });
		}
	};
}
/**
* Get the compatible context from the given context.
*/
function getCompatContext(context) {
	if (context.sourceCode) return context;
	return {
		__proto__: context,
		get sourceCode() {
			return context.sourceCode;
		},
		get filename() {
			return context.filename;
		},
		get cwd() {
			return context.cwd;
		}
	};
}
/**
* Define the wrapped core rule.
*/
function defineWrapperListener(coreRule, context, options) {
	if (!context.sourceCode.parserServices.isJSON) return {};
	const listener = coreRule.create({
		__proto__: context,
		options
	});
	const jsonListener = {};
	for (const key of Object.keys(listener)) {
		const original = listener[key];
		if (!original) continue;
		const jsonKey = key.replace(/(?:^|\b)(ExpressionStatement|(?:Template)?Literal|(?:Array|Object|Unary)Expression|Property|Identifier|TemplateElement)(?:\b|$)/gu, "JSON$1");
		jsonListener[jsonKey] = function(node, ...args) {
			original.call(this, getProxyNode(node), ...args);
		};
	}
	/**
	*  Check whether a given value is a node.
	*/
	function isNode(data) {
		return data && typeof data.type === "string" && Array.isArray(data.range) && data.range.length === 2 && typeof data.range[0] === "number" && typeof data.range[1] === "number";
	}
	/**
	* Get the proxy node
	*/
	function getProxyNode(node) {
		const cache = { type: node.type.startsWith("JSON") ? node.type.slice(4) : node.type };
		return new Proxy(node, { get(_t, key) {
			if (key in cache) return cache[key];
			const data = node[key];
			if (isNode(data)) return cache[key] = getProxyNode(data);
			if (Array.isArray(data)) return cache[key] = data.map((e) => isNode(e) ? getProxyNode(e) : e);
			return data;
		} });
	}
	return jsonListener;
}
/**
* Get the core rule implementation from the rule name
*/
function getCoreRule(name) {
	return builtinRules.get(name) || null;
}

//#endregion
//#region lib/utils/eslint-ast-utils.ts
const LINEBREAKS = new Set([
	"\r\n",
	"\r",
	"\n",
	"\u2028",
	"\u2029"
]);
const LINEBREAK_MATCHER = /\r\n|[\n\r\u2028\u2029]/u;
/**
* Creates a version of the `lineBreakPattern` regex with the global flag.
* Global regexes are mutable, so this needs to be a function instead of a constant.
* @returns A global regular expression that matches line terminators
*/
function createGlobalLinebreakMatcher() {
	return new RegExp(LINEBREAK_MATCHER.source, "gu");
}
/**
* Determines whether two tokens can safely be placed next to each other without merging into a single token
* @param leftValue The left token. If this is a string, it will be tokenized and the last token will be used.
* @param rightValue The right token. If this is a string, it will be tokenized and the first token will be used.
* @returns If the tokens cannot be safely placed next to each other, returns `false`. If the tokens can be placed
* next to each other, behavior is undefined (although it should return `true` in most cases).
*/
function canTokensBeAdjacent(leftValue, rightValue) {
	let leftToken;
	if (typeof leftValue === "string") {
		let tokens;
		try {
			tokens = tokenize(leftValue, { includeComments: true });
		} catch {
			return false;
		}
		leftToken = tokens[tokens.length - 1];
	} else leftToken = leftValue;
	let rightToken;
	if (typeof rightValue === "string") {
		let tokens;
		try {
			tokens = tokenize(rightValue, { includeComments: true });
		} catch {
			return false;
		}
		rightToken = tokens[0];
	} else rightToken = rightValue;
	if (leftToken.type === "Punctuator" || rightToken.type === "Punctuator") {
		if (leftToken.type === "Punctuator" && rightToken.type === "Punctuator") {
			const PLUS_TOKENS = new Set(["+", "++"]);
			const MINUS_TOKENS = new Set(["-", "--"]);
			return !(PLUS_TOKENS.has(leftToken.value) && PLUS_TOKENS.has(rightToken.value) || MINUS_TOKENS.has(leftToken.value) && MINUS_TOKENS.has(rightToken.value));
		}
		if (leftToken.type === "Punctuator" && leftToken.value === "/") return ![
			"Block",
			"Line",
			"RegularExpression"
		].includes(rightToken.type);
		return true;
	}
	if (leftToken.type === "String" || rightToken.type === "String" || leftToken.type === "Template" || rightToken.type === "Template") return true;
	if (leftToken.type !== "Numeric" && rightToken.type === "Numeric" && rightToken.value.startsWith(".")) return true;
	if (leftToken.type === "Block" || rightToken.type === "Block" || rightToken.type === "Line") return true;
	if (rightToken.type === "PrivateIdentifier") return true;
	return false;
}
/**
* Validate that a string passed in is surrounded by the specified character
* @param val The text to check.
* @param character The character to see if it's surrounded by.
* @returns True if the text is surrounded by the character, false if not.
* @private
*/
function isSurroundedBy(val, character) {
	return val.startsWith(character) && val.endsWith(character);
}
/**
* Check if a given node is a numeric literal or not.
* @param node The node to check.
* @returns `true` if the node is a number or bigint literal.
*/
function isNumericLiteral(node) {
	return node.type === "JSONLiteral" && (typeof node.value === "number" || Boolean("bigint" in node && node.bigint));
}
/**
* Determines whether two adjacent tokens are on the same line.
* @param left The left token object.
* @param right The right token object.
* @returns Whether or not the tokens are on the same line.
* @public
*/
function isTokenOnSameLine(left, right) {
	return left?.loc?.end.line === right?.loc?.start.line;
}
/**
* Gets the property name of a given node.
* The node can be a MemberExpression, a Property, or a MethodDefinition.
*
* If the name is dynamic, this returns `null`.
*
* For examples:
*
*     a.b           // => "b"
*     a["b"]        // => "b"
*     a['b']        // => "b"
*     a[`b`]        // => "b"
*     a[100]        // => "100"
*     a[b]          // => null
*     a["a" + "b"]  // => null
*     a[tag`b`]     // => null
*     a[`${b}`]     // => null
*
*     let a = {b: 1}            // => "b"
*     let a = {["b"]: 1}        // => "b"
*     let a = {['b']: 1}        // => "b"
*     let a = {[`b`]: 1}        // => "b"
*     let a = {[100]: 1}        // => "100"
*     let a = {[b]: 1}          // => null
*     let a = {["a" + "b"]: 1}  // => null
*     let a = {[tag`b`]: 1}     // => null
*     let a = {[`${b}`]: 1}     // => null
* @param node The node to get.
* @returns The property name if static. Otherwise, null.
*/
function getStaticPropertyName(node) {
	let prop;
	if (node) switch (node.type) {
		case "JSONProperty":
			prop = node.key;
			break;
		default: return null;
	}
	if (prop) {
		if (prop.type === "JSONIdentifier") return prop.name;
		return String(getStaticJSONValue(prop));
	}
	return null;
}
/**
* Gets next location when the result is not out of bound, otherwise returns null.
*
* Assumptions:
*
* - The given location represents a valid location in the given source code.
* - Columns are 0-based.
* - Lines are 1-based.
* - Column immediately after the last character in a line (not incl. linebreaks) is considered to be a valid location.
* - If the source code ends with a linebreak, `sourceCode.lines` array will have an extra element (empty string) at the end.
*   The start (column 0) of that extra line is considered to be a valid location.
*
* Examples of successive locations (line, column):
*
* code: foo
* locations: (1, 0) -> (1, 1) -> (1, 2) -> (1, 3) -> null
*
* code: foo<LF>
* locations: (1, 0) -> (1, 1) -> (1, 2) -> (1, 3) -> (2, 0) -> null
*
* code: foo<CR><LF>
* locations: (1, 0) -> (1, 1) -> (1, 2) -> (1, 3) -> (2, 0) -> null
*
* code: a<LF>b
* locations: (1, 0) -> (1, 1) -> (2, 0) -> (2, 1) -> null
*
* code: a<LF>b<LF>
* locations: (1, 0) -> (1, 1) -> (2, 0) -> (2, 1) -> (3, 0) -> null
*
* code: a<CR><LF>b<CR><LF>
* locations: (1, 0) -> (1, 1) -> (2, 0) -> (2, 1) -> (3, 0) -> null
*
* code: a<LF><LF>
* locations: (1, 0) -> (1, 1) -> (2, 0) -> (3, 0) -> null
*
* code: <LF>
* locations: (1, 0) -> (2, 0) -> null
*
* code:
* locations: (1, 0) -> null
* @param sourceCode The sourceCode
* @param location The location
* @returns Next location
*/
function getNextLocation(sourceCode, { column, line }) {
	if (column < sourceCode.lines[line - 1].length) return {
		column: column + 1,
		line
	};
	if (line < sourceCode.lines.length) return {
		column: 0,
		line: line + 1
	};
	return null;
}

//#endregion
//#region lib/rules/array-bracket-newline.ts
var array_bracket_newline_default = createRule("array-bracket-newline", {
	meta: {
		docs: {
			description: "enforce line breaks after opening and before closing array brackets",
			recommended: null,
			extensionRule: true,
			layout: true
		},
		type: "layout",
		fixable: "whitespace",
		schema: [{ oneOf: [{
			type: "string",
			enum: [
				"always",
				"never",
				"consistent"
			]
		}, {
			type: "object",
			properties: {
				multiline: { type: "boolean" },
				minItems: {
					type: ["integer", "null"],
					minimum: 0
				}
			},
			additionalProperties: false
		}] }],
		messages: {
			unexpectedOpeningLinebreak: "There should be no linebreak after '['.",
			unexpectedClosingLinebreak: "There should be no linebreak before ']'.",
			missingOpeningLinebreak: "A linebreak is required after '['.",
			missingClosingLinebreak: "A linebreak is required before ']'."
		}
	},
	create(context) {
		const sourceCode = context.sourceCode;
		if (!sourceCode.parserServices.isJSON) return {};
		/**
		* Normalizes a given option value.
		* @param option An option value to parse.
		* @returns Normalized option object.
		*/
		function normalizeOptionValue(option) {
			let consistent = false;
			let multiline = false;
			let minItems = 0;
			if (option) if (option === "consistent") {
				consistent = true;
				minItems = Number.POSITIVE_INFINITY;
			} else if (option === "always" || typeof option !== "string" && option.minItems === 0) minItems = 0;
			else if (option === "never") minItems = Number.POSITIVE_INFINITY;
			else {
				multiline = Boolean(option.multiline);
				minItems = option.minItems || Number.POSITIVE_INFINITY;
			}
			else {
				consistent = false;
				multiline = true;
				minItems = Number.POSITIVE_INFINITY;
			}
			return {
				consistent,
				multiline,
				minItems
			};
		}
		/**
		* Normalizes a given option value.
		* @param options An option value to parse.
		* @returns Normalized option object.
		*/
		function normalizeOptions(options) {
			const value = normalizeOptionValue(options);
			return {
				JSONArrayExpression: value,
				JSONArrayPattern: value
			};
		}
		/**
		* Reports that there shouldn't be a linebreak after the first token
		* @param node The node to report in the event of an error.
		* @param token The token to use for the report.
		*/
		function reportNoBeginningLinebreak(node, token) {
			context.report({
				node,
				loc: token.loc,
				messageId: "unexpectedOpeningLinebreak",
				fix(fixer) {
					const nextToken = sourceCode.getTokenAfter(token, { includeComments: true });
					if (!nextToken || isCommentToken(nextToken)) return null;
					return fixer.removeRange([token.range[1], nextToken.range[0]]);
				}
			});
		}
		/**
		* Reports that there shouldn't be a linebreak before the last token
		* @param node The node to report in the event of an error.
		* @param token The token to use for the report.
		*/
		function reportNoEndingLinebreak(node, token) {
			context.report({
				node,
				loc: token.loc,
				messageId: "unexpectedClosingLinebreak",
				fix(fixer) {
					const previousToken = sourceCode.getTokenBefore(token, { includeComments: true });
					if (!previousToken || isCommentToken(previousToken)) return null;
					return fixer.removeRange([previousToken.range[1], token.range[0]]);
				}
			});
		}
		/**
		* Reports that there should be a linebreak after the first token
		* @param node The node to report in the event of an error.
		* @param token The token to use for the report.
		*/
		function reportRequiredBeginningLinebreak(node, token) {
			context.report({
				node,
				loc: token.loc,
				messageId: "missingOpeningLinebreak",
				fix(fixer) {
					return fixer.insertTextAfter(token, "\n");
				}
			});
		}
		/**
		* Reports that there should be a linebreak before the last token
		* @param node The node to report in the event of an error.
		* @param token The token to use for the report.
		*/
		function reportRequiredEndingLinebreak(node, token) {
			context.report({
				node,
				loc: token.loc,
				messageId: "missingClosingLinebreak",
				fix(fixer) {
					return fixer.insertTextBefore(token, "\n");
				}
			});
		}
		/**
		* Reports a given node if it violated this rule.
		* @param node A node to check. This is an ArrayExpression node or an ArrayPattern node.
		*/
		function check(node) {
			const elements = node.elements;
			const options = normalizeOptions(context.options[0])[node.type];
			const openBracket = sourceCode.getFirstToken(node);
			const closeBracket = sourceCode.getLastToken(node);
			const firstIncComment = sourceCode.getTokenAfter(openBracket, { includeComments: true });
			const lastIncComment = sourceCode.getTokenBefore(closeBracket, { includeComments: true });
			const first = sourceCode.getTokenAfter(openBracket);
			const last = sourceCode.getTokenBefore(closeBracket);
			/**
			* Use tokens or comments to check multiline or not.
			* But use only tokens to check whether linebreaks are needed.
			* This allows:
			*     var arr = [ // eslint-disable-line foo
			*         'a'
			*     ]
			*/
			if (elements.length >= options.minItems || options.multiline && elements.length > 0 && firstIncComment.loc.start.line !== lastIncComment.loc.end.line || elements.length === 0 && firstIncComment.type === "Block" && firstIncComment.loc.start.line !== lastIncComment.loc.end.line && firstIncComment === lastIncComment || options.consistent && openBracket.loc.end.line !== first.loc.start.line) {
				if (isTokenOnSameLine(openBracket, first)) reportRequiredBeginningLinebreak(node, openBracket);
				if (isTokenOnSameLine(last, closeBracket)) reportRequiredEndingLinebreak(node, closeBracket);
			} else {
				if (!isTokenOnSameLine(openBracket, first)) reportNoBeginningLinebreak(node, openBracket);
				if (!isTokenOnSameLine(last, closeBracket)) reportNoEndingLinebreak(node, closeBracket);
			}
		}
		return { JSONArrayExpression: check };
	}
});

//#endregion
//#region lib/rules/array-bracket-spacing.ts
var array_bracket_spacing_default = createRule("array-bracket-spacing", {
	meta: {
		docs: {
			description: "disallow or enforce spaces inside of brackets",
			recommended: null,
			extensionRule: true,
			layout: true
		},
		type: "layout",
		fixable: "whitespace",
		schema: [{
			type: "string",
			enum: ["always", "never"]
		}, {
			type: "object",
			properties: {
				singleValue: { type: "boolean" },
				objectsInArrays: { type: "boolean" },
				arraysInArrays: { type: "boolean" }
			},
			additionalProperties: false
		}],
		messages: {
			unexpectedSpaceAfter: "There should be no space after '{{tokenValue}}'.",
			unexpectedSpaceBefore: "There should be no space before '{{tokenValue}}'.",
			missingSpaceAfter: "A space is required after '{{tokenValue}}'.",
			missingSpaceBefore: "A space is required before '{{tokenValue}}'."
		}
	},
	create(context) {
		const sourceCode = context.sourceCode;
		if (!sourceCode.parserServices.isJSON) return {};
		const spaced = context.options[0] === "always";
		/**
		* Determines whether an option is set, relative to the spacing option.
		* If spaced is "always", then check whether option is set to false.
		* If spaced is "never", then check whether option is set to true.
		* @param option The option to exclude.
		* @returns Whether or not the property is excluded.
		*/
		function isOptionSet(option) {
			return context.options[1] ? context.options[1][option] === !spaced : false;
		}
		const options = {
			spaced,
			singleElementException: isOptionSet("singleValue"),
			objectsInArraysException: isOptionSet("objectsInArrays"),
			arraysInArraysException: isOptionSet("arraysInArrays"),
			isOpeningBracketMustBeSpaced(node) {
				if (options.singleElementException && node.elements.length === 1) return !options.spaced;
				const firstElement = node.elements[0];
				return firstElement && (options.objectsInArraysException && isObjectType(firstElement) || options.arraysInArraysException && isArrayType(firstElement)) ? !options.spaced : options.spaced;
			},
			isClosingBracketMustBeSpaced(node) {
				if (options.singleElementException && node.elements.length === 1) return !options.spaced;
				const lastElement = node.elements[node.elements.length - 1];
				return lastElement && (options.objectsInArraysException && isObjectType(lastElement) || options.arraysInArraysException && isArrayType(lastElement)) ? !options.spaced : options.spaced;
			}
		};
		/**
		* Reports that there shouldn't be a space after the first token
		* @param node The node to report in the event of an error.
		* @param token The token to use for the report.
		*/
		function reportNoBeginningSpace(node, token) {
			const nextToken = sourceCode.getTokenAfter(token);
			context.report({
				node,
				loc: {
					start: token.loc.end,
					end: nextToken.loc.start
				},
				messageId: "unexpectedSpaceAfter",
				data: { tokenValue: token.value },
				fix(fixer) {
					return fixer.removeRange([token.range[1], nextToken.range[0]]);
				}
			});
		}
		/**
		* Reports that there shouldn't be a space before the last token
		* @param node The node to report in the event of an error.
		* @param token The token to use for the report.
		*/
		function reportNoEndingSpace(node, token) {
			const previousToken = sourceCode.getTokenBefore(token);
			context.report({
				node,
				loc: {
					start: previousToken.loc.end,
					end: token.loc.start
				},
				messageId: "unexpectedSpaceBefore",
				data: { tokenValue: token.value },
				fix(fixer) {
					return fixer.removeRange([previousToken.range[1], token.range[0]]);
				}
			});
		}
		/**
		* Reports that there should be a space after the first token
		* @param node The node to report in the event of an error.
		* @param token The token to use for the report.
		*/
		function reportRequiredBeginningSpace(node, token) {
			context.report({
				node,
				loc: token.loc,
				messageId: "missingSpaceAfter",
				data: { tokenValue: token.value },
				fix(fixer) {
					return fixer.insertTextAfter(token, " ");
				}
			});
		}
		/**
		* Reports that there should be a space before the last token
		* @param node The node to report in the event of an error.
		* @param token The token to use for the report.
		*/
		function reportRequiredEndingSpace(node, token) {
			context.report({
				node,
				loc: token.loc,
				messageId: "missingSpaceBefore",
				data: { tokenValue: token.value },
				fix(fixer) {
					return fixer.insertTextBefore(token, " ");
				}
			});
		}
		/**
		* Determines if a node is an object type
		* @param node The node to check.
		* @returns Whether or not the node is an object type.
		*/
		function isObjectType(node) {
			return node && node.type === "JSONObjectExpression";
		}
		/**
		* Determines if a node is an array type
		* @param node The node to check.
		* @returns Whether or not the node is an array type.
		*/
		function isArrayType(node) {
			return node && node.type === "JSONArrayExpression";
		}
		/**
		* Validates the spacing around array brackets
		* @param node The node we're checking for spacing
		*/
		function validateArraySpacing(node) {
			if (options.spaced && node.elements.length === 0) return;
			const first = sourceCode.getFirstToken(node);
			const second = sourceCode.getFirstToken(node, 1);
			const last = sourceCode.getLastToken(node);
			const penultimate = sourceCode.getTokenBefore(last);
			if (isTokenOnSameLine(first, second)) {
				if (options.isOpeningBracketMustBeSpaced(node)) {
					if (!sourceCode.isSpaceBetween(first, second)) reportRequiredBeginningSpace(node, first);
				} else if (sourceCode.isSpaceBetween(first, second)) reportNoBeginningSpace(node, first);
			}
			if (first !== penultimate && isTokenOnSameLine(penultimate, last)) {
				if (options.isClosingBracketMustBeSpaced(node)) {
					if (!sourceCode.isSpaceBetween(penultimate, last)) reportRequiredEndingSpace(node, last);
				} else if (sourceCode.isSpaceBetween(penultimate, last)) reportNoEndingSpace(node, last);
			}
		}
		return { JSONArrayExpression: validateArraySpacing };
	}
});

//#endregion
//#region lib/rules/array-element-newline.ts
var array_element_newline_default = createRule("array-element-newline", {
	meta: {
		docs: {
			description: "enforce line breaks between array elements",
			recommended: null,
			extensionRule: true,
			layout: true
		},
		type: "layout",
		fixable: "whitespace",
		schema: {
			definitions: { basicConfig: { oneOf: [{
				type: "string",
				enum: [
					"always",
					"never",
					"consistent"
				]
			}, {
				type: "object",
				properties: {
					multiline: { type: "boolean" },
					minItems: {
						type: ["integer", "null"],
						minimum: 0
					}
				},
				additionalProperties: false
			}] } },
			type: "array",
			items: [{ oneOf: [{ $ref: "#/definitions/basicConfig" }, {
				type: "object",
				properties: {
					ArrayExpression: { $ref: "#/definitions/basicConfig" },
					JSONArrayExpression: { $ref: "#/definitions/basicConfig" },
					ArrayPattern: { $ref: "#/definitions/basicConfig" }
				},
				additionalProperties: false,
				minProperties: 1
			}] }]
		},
		messages: {
			unexpectedLineBreak: "There should be no linebreak here.",
			missingLineBreak: "There should be a linebreak after this element."
		}
	},
	create(context) {
		const sourceCode = context.sourceCode;
		if (!sourceCode.parserServices.isJSON) return {};
		/**
		* Normalizes a given option value.
		* @param providedOption An option value to parse.
		* @returns Normalized option object.
		*/
		function normalizeOptionValue(providedOption) {
			let consistent = false;
			let multiline = false;
			let minItems;
			const option = providedOption || "always";
			if (!option || option === "always" || typeof option === "object" && option.minItems === 0) minItems = 0;
			else if (option === "never") minItems = Number.POSITIVE_INFINITY;
			else if (option === "consistent") {
				consistent = true;
				minItems = Number.POSITIVE_INFINITY;
			} else {
				multiline = Boolean(option.multiline);
				minItems = option.minItems || Number.POSITIVE_INFINITY;
			}
			return {
				consistent,
				multiline,
				minItems
			};
		}
		/**
		* Normalizes a given option value.
		* @param options An option value to parse.
		* @returns Normalized option object.
		*/
		function normalizeOptions(options) {
			if (options && (options.ArrayExpression || options.JSONArrayExpression || options.ArrayPattern)) {
				let expressionOptions, patternOptions;
				if (options.ArrayExpression || options.JSONArrayExpression) expressionOptions = normalizeOptionValue(options.ArrayExpression || options.JSONArrayExpression);
				if (options.ArrayPattern) patternOptions = normalizeOptionValue(options.ArrayPattern);
				return {
					JSONArrayExpression: expressionOptions,
					JSONArrayPattern: patternOptions
				};
			}
			const value = normalizeOptionValue(options);
			return {
				JSONArrayExpression: value,
				JSONArrayPattern: value
			};
		}
		/**
		* Reports that there shouldn't be a line break after the first token
		* @param token The token to use for the report.
		*/
		function reportNoLineBreak(token) {
			const tokenBefore = sourceCode.getTokenBefore(token, { includeComments: true });
			context.report({
				loc: {
					start: tokenBefore.loc.end,
					end: token.loc.start
				},
				messageId: "unexpectedLineBreak",
				fix(fixer) {
					if (isCommentToken(tokenBefore)) return null;
					if (!isTokenOnSameLine(tokenBefore, token)) return fixer.replaceTextRange([tokenBefore.range[1], token.range[0]], " ");
					/**
					* This will check if the comma is on the same line as the next element
					* Following array:
					* [
					*     1
					*     , 2
					*     , 3
					* ]
					*
					* will be fixed to:
					* [
					*     1, 2, 3
					* ]
					*/
					const twoTokensBefore = sourceCode.getTokenBefore(tokenBefore, { includeComments: true });
					if (isCommentToken(twoTokensBefore)) return null;
					return fixer.replaceTextRange([twoTokensBefore.range[1], tokenBefore.range[0]], "");
				}
			});
		}
		/**
		* Reports that there should be a line break after the first token
		* @param token The token to use for the report.
		*/
		function reportRequiredLineBreak(token) {
			const tokenBefore = sourceCode.getTokenBefore(token, { includeComments: true });
			context.report({
				loc: {
					start: tokenBefore.loc.end,
					end: token.loc.start
				},
				messageId: "missingLineBreak",
				fix(fixer) {
					return fixer.replaceTextRange([tokenBefore.range[1], token.range[0]], "\n");
				}
			});
		}
		/**
		* Reports a given node if it violated this rule.
		* @param node A node to check. This is an ObjectExpression node or an ObjectPattern node.
		*/
		function check(node) {
			const elements = node.elements;
			const options = normalizeOptions(context.options[0])[node.type];
			if (!options) return;
			let elementBreak = false;
			/**
			* MULTILINE: true
			* loop through every element and check
			* if at least one element has linebreaks inside
			* this ensures that following is not valid (due to elements are on the same line):
			*
			* [
			*      1,
			*      2,
			*      3
			* ]
			*/
			if (options.multiline) elementBreak = elements.filter((element) => element !== null).some((element) => element.loc.start.line !== element.loc.end.line);
			let linebreaksCount = 0;
			for (let i = 0; i < node.elements.length; i++) {
				const element = node.elements[i];
				const previousElement = elements[i - 1];
				if (i === 0 || element === null || previousElement === null) continue;
				const commaToken = sourceCode.getFirstTokenBetween(previousElement, element, isCommaToken);
				if (!isTokenOnSameLine(sourceCode.getTokenBefore(commaToken), sourceCode.getTokenAfter(commaToken))) linebreaksCount++;
			}
			const needsLinebreaks = elements.length >= options.minItems || options.multiline && elementBreak || options.consistent && linebreaksCount > 0 && linebreaksCount < node.elements.length;
			elements.forEach((element, i) => {
				const previousElement = elements[i - 1];
				if (i === 0 || element === null || previousElement === null) return;
				const commaToken = sourceCode.getFirstTokenBetween(previousElement, element, isCommaToken);
				const lastTokenOfPreviousElement = sourceCode.getTokenBefore(commaToken);
				const firstTokenOfCurrentElement = sourceCode.getTokenAfter(commaToken);
				if (needsLinebreaks) {
					if (isTokenOnSameLine(lastTokenOfPreviousElement, firstTokenOfCurrentElement)) reportRequiredLineBreak(firstTokenOfCurrentElement);
				} else if (!isTokenOnSameLine(lastTokenOfPreviousElement, firstTokenOfCurrentElement)) reportNoLineBreak(firstTokenOfCurrentElement);
			});
		}
		return { JSONArrayExpression: check };
	}
});

//#endregion
//#region lib/utils/get-auto-jsonc-rules-config/calculate-config-for-file.ts
const ext = path.extname(fileURLToPath(import.meta.url));
const getSync = createSyncFn(fileURLToPath(import.meta.resolve(`./get-auto-jsonc-rules-config-worker${ext}`)));
/**
* Synchronously calculateConfigForFile
*/
function calculateConfigForFile(cwd, fileName) {
	return getSync(cwd, fileName);
}

//#endregion
//#region lib/utils/rule-names.ts
const ruleNames = [
	"array-bracket-newline",
	"array-bracket-spacing",
	"array-element-newline",
	"auto",
	"comma-dangle",
	"comma-style",
	"indent",
	"key-name-casing",
	"key-spacing",
	"no-bigint-literals",
	"no-binary-expression",
	"no-binary-numeric-literals",
	"no-comments",
	"no-dupe-keys",
	"no-escape-sequence-in-identifier",
	"no-floating-decimal",
	"no-hexadecimal-numeric-literals",
	"no-infinity",
	"no-irregular-whitespace",
	"no-multi-str",
	"no-nan",
	"no-number-props",
	"no-numeric-separators",
	"no-octal-escape",
	"no-octal-numeric-literals",
	"no-octal",
	"no-parenthesized",
	"no-plus-sign",
	"no-regexp-literals",
	"no-sparse-arrays",
	"no-template-literals",
	"no-undefined-value",
	"no-unicode-codepoint-escapes",
	"no-useless-escape",
	"object-curly-newline",
	"object-curly-spacing",
	"object-property-newline",
	"quote-props",
	"quotes",
	"sort-array-values",
	"sort-keys",
	"space-unary-ops",
	"valid-json-number",
	"vue-custom-block/no-parsing-error"
];

//#endregion
//#region lib/utils/get-auto-jsonc-rules-config/index.ts
const configResolvers = {};
const ruleNameSet = new Set(ruleNames);
/**
* Get config resolver
*/
function getConfigResolver(cwd) {
	const configResolver = configResolvers[cwd];
	if (configResolver) return configResolver;
	return configResolvers[cwd] = (filePath) => calculateConfigForFile(cwd, filePath);
}
/**
* Get config for the given filename
* @param filename
*/
function getConfig(cwd, filename) {
	return getConfigResolver(cwd)(filename);
}
/**
* Get jsonc rule from the given base rule name
* @param filename
*/
function getJsoncRule(rule) {
	const ruleName = rule.startsWith("@stylistic/") ? rule.split("/").pop() ?? rule : rule;
	return ruleNameSet.has(ruleName) ? `jsonc/${ruleName}` : null;
}
/**
* Get additional jsonc rules config from fileName
* @param filename
*/
function getAutoConfig(cwd, filename) {
	const autoConfig = {};
	const config = getConfig(cwd, filename);
	if (config.rules) for (const ruleName of Object.keys(config.rules)) {
		const jsoncName = getJsoncRule(ruleName);
		if (jsoncName && !config.rules[jsoncName]) {
			const entry = config.rules[ruleName];
			if (entry) {
				const severity = Array.isArray(entry) ? entry[0] : entry;
				if (severity !== "off" && severity !== 0) autoConfig[jsoncName] = entry;
			}
		}
	}
	return autoConfig;
}

//#endregion
//#region lib/rules/auto.ts
var auto_default = createRule("auto", {
	meta: {
		docs: {
			description: "apply jsonc rules similar to your configured ESLint core rules",
			recommended: null,
			extensionRule: false,
			layout: false
		},
		fixable: "code",
		schema: [],
		messages: {},
		type: "suggestion"
	},
	create(context, params) {
		if (!context.sourceCode.parserServices.isJSON) return {};
		const autoConfig = getAutoConfig(context.cwd, context.filename);
		const visitor = {};
		for (const ruleId of Object.keys(autoConfig)) {
			const rule = getRules().find((r) => r.meta.docs.ruleId === ruleId);
			const subContext = {
				__proto__: context,
				options: getRuleOptions(autoConfig[ruleId], rule.jsoncDefineRule),
				report(options) {
					if (options.messageId) {
						options.message = `[${ruleId}] ${rule.meta.messages?.[options.messageId]}`;
						delete options.messageId;
					} else options.message = `[${ruleId}] ${options.message}`;
					context.report(options);
				}
			};
			const ruleVisitor = rule.jsoncDefineRule.create(subContext, params);
			for (const key of Object.keys(ruleVisitor)) {
				const newVisit = ruleVisitor[key];
				const oldVisit = visitor[key];
				if (!newVisit) continue;
				if (!oldVisit) visitor[key] = ruleVisitor[key];
				else visitor[key] = ((...args) => {
					oldVisit(...args);
					newVisit(...args);
				});
			}
		}
		return visitor;
	}
});
/**
* Build the options to create the rule.
*/
function getRuleOptions(options, rule) {
	const jsonOptions = Array.isArray(options) ? options.slice(1) : [];
	if (rule.meta.defaultOptions) rule.meta.defaultOptions.forEach((option, index) => {
		if (jsonOptions[index] === void 0) jsonOptions[index] = option;
	});
	return jsonOptions;
}

//#endregion
//#region lib/rules/comma-dangle.ts
const DEFAULT_OPTIONS = Object.freeze({
	arrays: "never",
	objects: "never"
});
const closeBraces = [
	"}",
	"]",
	")",
	">"
];
/**
* Normalize option value.
* @param optionValue The 1st option value to normalize.
* @param ecmaVersion The normalized ECMAScript version.
* @returns The normalized option value.
*/
function normalizeOptions$1(optionValue) {
	if (typeof optionValue === "string") return {
		arrays: optionValue,
		objects: optionValue
	};
	if (typeof optionValue === "object" && optionValue !== null) return {
		arrays: optionValue.arrays || DEFAULT_OPTIONS.arrays,
		objects: optionValue.objects || DEFAULT_OPTIONS.objects
	};
	return DEFAULT_OPTIONS;
}
var comma_dangle_default = createRule("comma-dangle", {
	meta: {
		docs: {
			description: "require or disallow trailing commas",
			recommended: ["json"],
			extensionRule: true,
			layout: true
		},
		type: "layout",
		fixable: "code",
		schema: {
			definitions: {
				value: {
					type: "string",
					enum: [
						"always-multiline",
						"always",
						"never",
						"only-multiline"
					]
				},
				valueWithIgnore: {
					type: "string",
					enum: [
						"always-multiline",
						"always",
						"ignore",
						"never",
						"only-multiline"
					]
				}
			},
			type: "array",
			items: [{ oneOf: [{ $ref: "#/definitions/value" }, {
				type: "object",
				properties: {
					arrays: { $ref: "#/definitions/valueWithIgnore" },
					objects: { $ref: "#/definitions/valueWithIgnore" },
					imports: { $ref: "#/definitions/valueWithIgnore" },
					exports: { $ref: "#/definitions/valueWithIgnore" },
					functions: { $ref: "#/definitions/valueWithIgnore" }
				},
				additionalProperties: false
			}] }],
			additionalItems: false
		},
		messages: {
			unexpected: "Unexpected trailing comma.",
			missing: "Missing trailing comma."
		}
	},
	create(context) {
		const sourceCode = context.sourceCode;
		if (!sourceCode.parserServices.isJSON) return {};
		const options = normalizeOptions$1(context.options[0] || "never");
		/**
		* Gets the last item of the given node.
		* @param node The node to get.
		* @returns The last node or null.
		*/
		function getLastItem(node) {
			/**
			* Returns the last element of an array
			* @param array The input array
			* @returns The last element
			*/
			function last(array) {
				return array[array.length - 1];
			}
			switch (node.type) {
				case "JSONObjectExpression": return last(node.properties);
				case "JSONArrayExpression": return last(node.elements);
				default: return null;
			}
		}
		/**
		* Gets the trailing comma token of the given node.
		* If the trailing comma does not exist, this returns the token which is
		* the insertion point of the trailing comma token.
		* @param node The node to get.
		* @param lastItem The last item of the node.
		* @returns The trailing comma token or the insertion point.
		*/
		function getTrailingToken(node, lastItem) {
			switch (node.type) {
				case "JSONObjectExpression":
				case "JSONArrayExpression": return sourceCode.getLastToken(node, 1);
				default: {
					const nextToken = sourceCode.getTokenAfter(lastItem);
					if (isCommaToken(nextToken)) return nextToken;
					return sourceCode.getLastToken(lastItem);
				}
			}
		}
		/**
		* Checks whether or not a given node is multiline.
		* This rule handles a given node as multiline when the closing parenthesis
		* and the last element are not on the same line.
		* @param node A node to check.
		* @returns `true` if the node is multiline.
		*/
		function isMultiline(node) {
			const lastItem = getLastItem(node);
			if (!lastItem) return false;
			const penultimateToken = getTrailingToken(node, lastItem);
			if (!penultimateToken) return false;
			const lastToken = sourceCode.getTokenAfter(penultimateToken);
			if (!lastToken) return false;
			return lastToken.loc.end.line !== penultimateToken.loc.end.line;
		}
		/**
		* Reports a trailing comma if it exists.
		* @param node A node to check. Its type is one of
		*   ObjectExpression, ObjectPattern, ArrayExpression, ArrayPattern,
		*   ImportDeclaration, and ExportNamedDeclaration.
		*/
		function forbidTrailingComma(node) {
			const lastItem = getLastItem(node);
			if (!lastItem) return;
			const trailingToken = getTrailingToken(node, lastItem);
			if (trailingToken && isCommaToken(trailingToken)) context.report({
				node: lastItem,
				loc: trailingToken.loc,
				messageId: "unexpected",
				*fix(fixer) {
					yield fixer.remove(trailingToken);
					/**
					* Extend the range of the fix to include surrounding tokens to ensure
					* that the element after which the comma is removed stays _last_.
					* This intentionally makes conflicts in fix ranges with rules that may be
					* adding or removing elements in the same autofix pass.
					* https://github.com/eslint/eslint/issues/15660
					*/
					yield fixer.insertTextBefore(sourceCode.getTokenBefore(trailingToken), "");
					yield fixer.insertTextAfter(sourceCode.getTokenAfter(trailingToken), "");
				}
			});
		}
		/**
		* Reports the last element of a given node if it does not have a trailing
		* comma.
		*
		* If a given node is `ArrayPattern` which has `RestElement`, the trailing
		* comma is disallowed, so report if it exists.
		* @param node A node to check. Its type is one of
		*   ObjectExpression, ObjectPattern, ArrayExpression, ArrayPattern,
		*   ImportDeclaration, and ExportNamedDeclaration.
		*/
		function forceTrailingComma(node) {
			const lastItem = getLastItem(node);
			if (!lastItem) return;
			const trailingToken = getTrailingToken(node, lastItem);
			if (!trailingToken || trailingToken.value === ",") return;
			const nextToken = sourceCode.getTokenAfter(trailingToken);
			if (!nextToken || !closeBraces.includes(nextToken.value)) return;
			context.report({
				node: lastItem,
				loc: {
					start: trailingToken.loc.end,
					end: getNextLocation(sourceCode, trailingToken.loc.end)
				},
				messageId: "missing",
				*fix(fixer) {
					yield fixer.insertTextAfter(trailingToken, ",");
					/**
					* Extend the range of the fix to include surrounding tokens to ensure
					* that the element after which the comma is inserted stays _last_.
					* This intentionally makes conflicts in fix ranges with rules that may be
					* adding or removing elements in the same autofix pass.
					* https://github.com/eslint/eslint/issues/15660
					*/
					yield fixer.insertTextBefore(trailingToken, "");
					yield fixer.insertTextAfter(sourceCode.getTokenAfter(trailingToken), "");
				}
			});
		}
		/**
		* If a given node is multiline, reports the last element of a given node
		* when it does not have a trailing comma.
		* Otherwise, reports a trailing comma if it exists.
		* @param node A node to check. Its type is one of
		*   ObjectExpression, ObjectPattern, ArrayExpression, ArrayPattern,
		*   ImportDeclaration, and ExportNamedDeclaration.
		*/
		function forceTrailingCommaIfMultiline(node) {
			if (isMultiline(node)) forceTrailingComma(node);
			else forbidTrailingComma(node);
		}
		/**
		* Only if a given node is not multiline, reports the last element of a given node
		* when it does not have a trailing comma.
		* Otherwise, reports a trailing comma if it exists.
		* @param node A node to check. Its type is one of
		*   ObjectExpression, ObjectPattern, ArrayExpression, ArrayPattern,
		*   ImportDeclaration, and ExportNamedDeclaration.
		*/
		function allowTrailingCommaIfMultiline(node) {
			if (!isMultiline(node)) forbidTrailingComma(node);
		}
		const predicate = {
			always: forceTrailingComma,
			"always-multiline": forceTrailingCommaIfMultiline,
			"only-multiline": allowTrailingCommaIfMultiline,
			never: forbidTrailingComma,
			ignore() {}
		};
		return {
			JSONObjectExpression: predicate[options.objects],
			JSONArrayExpression: predicate[options.arrays]
		};
	}
});

//#endregion
//#region lib/rules/comma-style.ts
var comma_style_default = createRule("comma-style", {
	meta: {
		docs: {
			description: "enforce consistent comma style",
			recommended: null,
			extensionRule: true,
			layout: true
		},
		type: "layout",
		fixable: "code",
		schema: [{
			type: "string",
			enum: ["first", "last"]
		}, {
			type: "object",
			properties: { exceptions: {
				type: "object",
				additionalProperties: { type: "boolean" }
			} },
			additionalProperties: false
		}],
		messages: {
			unexpectedLineBeforeAndAfterComma: "Bad line breaking before and after ','.",
			expectedCommaFirst: "',' should be placed first.",
			expectedCommaLast: "',' should be placed last."
		}
	},
	create(context) {
		const sourceCode = context.sourceCode;
		if (!sourceCode.parserServices.isJSON) return {};
		const style = context.options[0] || "last";
		const exceptions = {};
		if (context.options.length === 2 && Object.prototype.hasOwnProperty.call(context.options[1], "exceptions")) {
			context.options[1] ??= { exceptions: {} };
			const rawExceptions = context.options[1].exceptions;
			for (const [key, value] of Object.entries(rawExceptions)) exceptions[key.startsWith("JSON") ? key : `JSON${key}`] = value;
		}
		/**
		* Modified text based on the style
		* @param styleType Style type
		* @param text Source code text
		* @returns modified text
		* @private
		*/
		function getReplacedText(styleType, text) {
			switch (styleType) {
				case "between": return `,${text.replace(LINEBREAK_MATCHER, "")}`;
				case "first": return `${text},`;
				case "last": return `,${text}`;
				default: return "";
			}
		}
		/**
		* Determines the fixer function for a given style.
		* @param styleType comma style
		* @param previousItemToken The token to check.
		* @param commaToken The token to check.
		* @param currentItemToken The token to check.
		* @returns Fixer function
		* @private
		*/
		function getFixerFunction(styleType, previousItemToken, commaToken, currentItemToken) {
			const text = sourceCode.text.slice(previousItemToken.range[1], commaToken.range[0]) + sourceCode.text.slice(commaToken.range[1], currentItemToken.range[0]);
			const range = [previousItemToken.range[1], currentItemToken.range[0]];
			return function(fixer) {
				return fixer.replaceTextRange(range, getReplacedText(styleType, text));
			};
		}
		/**
		* Validates the spacing around single items in lists.
		* @param previousItemToken The last token from the previous item.
		* @param commaToken The token representing the comma.
		* @param currentItemToken The first token of the current item.
		* @param reportItem The item to use when reporting an error.
		* @private
		*/
		function validateCommaItemSpacing(previousItemToken, commaToken, currentItemToken, reportItem) {
			if (isTokenOnSameLine(commaToken, currentItemToken) && isTokenOnSameLine(previousItemToken, commaToken)) {} else if (!isTokenOnSameLine(commaToken, currentItemToken) && !isTokenOnSameLine(previousItemToken, commaToken)) {
				const comment = sourceCode.getCommentsAfter(commaToken)[0];
				const styleType = comment && comment.type === "Block" && isTokenOnSameLine(commaToken, comment) ? style : "between";
				context.report({
					node: reportItem,
					loc: commaToken.loc,
					messageId: "unexpectedLineBeforeAndAfterComma",
					fix: getFixerFunction(styleType, previousItemToken, commaToken, currentItemToken)
				});
			} else if (style === "first" && !isTokenOnSameLine(commaToken, currentItemToken)) context.report({
				node: reportItem,
				loc: commaToken.loc,
				messageId: "expectedCommaFirst",
				fix: getFixerFunction(style, previousItemToken, commaToken, currentItemToken)
			});
			else if (style === "last" && isTokenOnSameLine(commaToken, currentItemToken)) context.report({
				node: reportItem,
				loc: commaToken.loc,
				messageId: "expectedCommaLast",
				fix: getFixerFunction(style, previousItemToken, commaToken, currentItemToken)
			});
		}
		/**
		* Checks the comma placement with regards to a declaration/property/element
		* @param node The binary expression node to check
		* @param property The property of the node containing child nodes.
		* @private
		*/
		function validateComma(node, property) {
			const items = node[property];
			const arrayLiteral = node.type === "JSONArrayExpression";
			if (items.length > 1 || arrayLiteral) {
				let previousItemToken = sourceCode.getFirstToken(node);
				items.forEach((item) => {
					const commaToken = item ? sourceCode.getTokenBefore(item) : previousItemToken;
					const currentItemToken = item ? sourceCode.getFirstToken(item) : sourceCode.getTokenAfter(commaToken);
					const reportItem = item || currentItemToken;
					/**
					* This works by comparing three token locations:
					* - previousItemToken is the last token of the previous item
					* - commaToken is the location of the comma before the current item
					* - currentItemToken is the first token of the current item
					*
					* These values get switched around if item is undefined.
					* previousItemToken will refer to the last token not belonging
					* to the current item, which could be a comma or an opening
					* square bracket. currentItemToken could be a comma.
					*
					* All comparisons are done based on these tokens directly, so
					* they are always valid regardless of an undefined item.
					*/
					if (isCommaToken(commaToken)) validateCommaItemSpacing(previousItemToken, commaToken, currentItemToken, reportItem);
					if (item) {
						const tokenAfterItem = sourceCode.getTokenAfter(item, isNotClosingParenToken);
						previousItemToken = tokenAfterItem ? sourceCode.getTokenBefore(tokenAfterItem) : sourceCode.ast.tokens[sourceCode.ast.tokens.length - 1];
					} else previousItemToken = currentItemToken;
				});
				/**
				* Special case for array literals that have empty last items, such
				* as [ 1, 2, ]. These arrays only have two items show up in the
				* AST, so we need to look at the token to verify that there's no
				* dangling comma.
				*/
				if (arrayLiteral) {
					const lastToken = sourceCode.getLastToken(node);
					const nextToLastToken = sourceCode.getTokenBefore(lastToken);
					if (isCommaToken(nextToLastToken)) validateCommaItemSpacing(sourceCode.getTokenBefore(nextToLastToken), nextToLastToken, lastToken, lastToken);
				}
			}
		}
		const nodes = {};
		if (!exceptions.JSONObjectExpression) nodes.JSONObjectExpression = function(node) {
			validateComma(node, "properties");
		};
		if (!exceptions.JSONArrayExpression) nodes.JSONArrayExpression = function(node) {
			validateComma(node, "elements");
		};
		return nodes;
	}
});

//#endregion
//#region lib/rules/indent.ts
const KNOWN_NODES = new Set([
	"JSONArrayExpression",
	"JSONBinaryExpression",
	"JSONExpressionStatement",
	"JSONIdentifier",
	"JSONLiteral",
	"JSONObjectExpression",
	"Program",
	"JSONProperty",
	"JSONTemplateElement",
	"JSONTemplateLiteral",
	"JSONUnaryExpression"
]);
/**
* A mutable map that stores (key, value) pairs. The keys are numeric indices, and must be unique.
* This is intended to be a generic wrapper around a map with non-negative integer keys, so that the underlying implementation
* can easily be swapped out.
*/
var IndexMap = class {
	_values;
	/**
	* Creates an empty map
	* @param maxKey The maximum key
	*/
	constructor(maxKey) {
		this._values = Array(maxKey + 1);
	}
	/**
	* Inserts an entry into the map.
	* @param key The entry's key
	* @param value The entry's value
	*/
	insert(key, value) {
		this._values[key] = value;
	}
	/**
	* Finds the value of the entry with the largest key less than or equal to the provided key
	* @param key The provided key
	* @returns The value of the found entry, or undefined if no such entry exists.
	*/
	findLastNotAfter(key) {
		const values = this._values;
		for (let index = key; index >= 0; index--) {
			const value = values[index];
			if (value) return value;
		}
	}
	/**
	* Deletes all of the keys in the interval [start, end)
	* @param start The start of the range
	* @param end The end of the range
	*/
	deleteRange(start, end) {
		this._values.fill(void 0, start, end);
	}
};
/**
* A helper class to get token-based info related to indentation
*/
var TokenInfo = class {
	sourceCode;
	firstTokensByLineNumber;
	/**
	* @param sourceCode A SourceCode object
	*/
	constructor(sourceCode) {
		this.sourceCode = sourceCode;
		this.firstTokensByLineNumber = /* @__PURE__ */ new Map();
		const tokens = [...sourceCode.ast.comments, ...sourceCode.ast.tokens].sort((a, b) => a.range[0] - b.range[0]);
		for (let i = 0; i < tokens.length; i++) {
			const token = tokens[i];
			if (!this.firstTokensByLineNumber.has(token.loc.start.line)) this.firstTokensByLineNumber.set(token.loc.start.line, token);
			if (!this.firstTokensByLineNumber.has(token.loc.end.line) && sourceCode.text.slice(token.range[1] - token.loc.end.column, token.range[1]).trim()) this.firstTokensByLineNumber.set(token.loc.end.line, token);
		}
	}
	/**
	* Gets the first token on a given token's line
	* @param token a node or token
	* @returns The first token on the given line
	*/
	getFirstTokenOfLine(token) {
		return this.firstTokensByLineNumber.get(token.loc.start.line);
	}
	/**
	* Determines whether a token is the first token in its line
	* @param token The token
	* @returns `true` if the token is the first on its line
	*/
	isFirstTokenOfLine(token) {
		return this.getFirstTokenOfLine(token) === token;
	}
	/**
	* Get the actual indent of a token
	* @param token Token to examine. This should be the first token on its line.
	* @returns The indentation characters that precede the token
	*/
	getTokenIndent(token) {
		return this.sourceCode.text.slice(token.range[0] - token.loc.start.column, token.range[0]);
	}
};
/**
* A class to store information on desired offsets of tokens from each other
*/
var OffsetStorage = class {
	_tokenInfo;
	_indentSize;
	_indentType;
	_indexMap;
	_lockedFirstTokens = /* @__PURE__ */ new WeakMap();
	_desiredIndentCache = /* @__PURE__ */ new WeakMap();
	_ignoredTokens = /* @__PURE__ */ new WeakSet();
	/**
	* @param tokenInfo a TokenInfo instance
	* @param indentSize The desired size of each indentation level
	* @param indentType The indentation character
	* @param maxIndex The maximum end index of any token
	*/
	constructor(tokenInfo, indentSize, indentType, maxIndex) {
		this._tokenInfo = tokenInfo;
		this._indentSize = indentSize;
		this._indentType = indentType;
		this._indexMap = new IndexMap(maxIndex);
		this._indexMap.insert(0, {
			offset: 0,
			from: null,
			force: false
		});
	}
	_getOffsetDescriptor(token) {
		return this._indexMap.findLastNotAfter(token.range[0]);
	}
	/**
	* Sets the offset column of token B to match the offset column of token A.
	* - **WARNING**: This matches a *column*, even if baseToken is not the first token on its line. In
	* most cases, `setDesiredOffset` should be used instead.
	* @param baseToken The first token
	* @param offsetToken The second token, whose offset should be matched to the first token
	*/
	matchOffsetOf(baseToken, offsetToken) {
		/**
		* lockedFirstTokens is a map from a token whose indentation is controlled by the "first" option to
		* the token that it depends on. For example, with the `ArrayExpression: first` option, the first
		* token of each element in the array after the first will be mapped to the first token of the first
		* element. The desired indentation of each of these tokens is computed based on the desired indentation
		* of the "first" element, rather than through the normal offset mechanism.
		*/
		this._lockedFirstTokens.set(offsetToken, baseToken);
	}
	/**
	* Sets the desired offset of a token.
	*
	* This uses a line-based offset collapsing behavior to handle tokens on the same line.
	* For example, consider the following two cases:
	*
	* (
	*     [
	*         bar
	*     ]
	* )
	*
	* ([
	*     bar
	* ])
	*
	* Based on the first case, it's clear that the `bar` token needs to have an offset of 1 indent level (4 spaces) from
	* the `[` token, and the `[` token has to have an offset of 1 indent level from the `(` token. Since the `(` token is
	* the first on its line (with an indent of 0 spaces), the `bar` token needs to be offset by 2 indent levels (8 spaces)
	* from the start of its line.
	*
	* However, in the second case `bar` should only be indented by 4 spaces. This is because the offset of 1 indent level
	* between the `(` and the `[` tokens gets "collapsed" because the two tokens are on the same line. As a result, the
	* `(` token is mapped to the `[` token with an offset of 0, and the rule correctly decides that `bar` should be indented
	* by 1 indent level from the start of the line.
	*
	* This is useful because rule listeners can usually just call `setDesiredOffset` for all the tokens in the node,
	* without needing to check which lines those tokens are on.
	*
	* Note that since collapsing only occurs when two tokens are on the same line, there are a few cases where non-intuitive
	* behavior can occur. For example, consider the following cases:
	*
	* foo(
	* ).
	*     bar(
	*         baz
	*     )
	*
	* foo(
	* ).bar(
	*     baz
	* )
	*
	* Based on the first example, it would seem that `bar` should be offset by 1 indent level from `foo`, and `baz`
	* should be offset by 1 indent level from `bar`. However, this is not correct, because it would result in `baz`
	* being indented by 2 indent levels in the second case (since `foo`, `bar`, and `baz` are all on separate lines, no
	* collapsing would occur).
	*
	* Instead, the correct way would be to offset `baz` by 1 level from `bar`, offset `bar` by 1 level from the `)`, and
	* offset the `)` by 0 levels from `foo`. This ensures that the offset between `bar` and the `)` are correctly collapsed
	* in the second case.
	* @param token The token
	* @param fromToken The token that `token` should be offset from
	* @param offset The desired indent level
	*/
	setDesiredOffset(token, fromToken, offset) {
		if (token) this.setDesiredOffsets(token.range, fromToken, offset);
	}
	/**
	* Sets the desired offset of all tokens in a range
	* It's common for node listeners in this file to need to apply the same offset to a large, contiguous range of tokens.
	* Moreover, the offset of any given token is usually updated multiple times (roughly once for each node that contains
	* it). This means that the offset of each token is updated O(AST depth) times.
	* It would not be performant to store and update the offsets for each token independently, because the rule would end
	* up having a time complexity of O(number of tokens * AST depth), which is quite slow for large files.
	*
	* Instead, the offset tree is represented as a collection of contiguous offset ranges in a file. For example, the following
	* list could represent the state of the offset tree at a given point:
	*
	* - Tokens starting in the interval [0, 15) are aligned with the beginning of the file
	* - Tokens starting in the interval [15, 30) are offset by 1 indent level from the `bar` token
	* - Tokens starting in the interval [30, 43) are offset by 1 indent level from the `foo` token
	* - Tokens starting in the interval [43, 820) are offset by 2 indent levels from the `bar` token
	* - Tokens starting in the interval [820, ∞) are offset by 1 indent level from the `baz` token
	*
	* The `setDesiredOffsets` methods inserts ranges like the ones above. The third line above would be inserted by using:
	* `setDesiredOffsets([30, 43], fooToken, 1);`
	* @param range A [start, end] pair. All tokens with range[0] <= token.start < range[1] will have the offset applied.
	* @param fromToken The token that this is offset from
	* @param offset The desired indent level
	* @param force `true` if this offset should not use the normal collapsing behavior. This should almost always be false.
	*/
	setDesiredOffsets(range, fromToken, offset, force = false) {
		/**
		* Offset ranges are stored as a collection of nodes, where each node maps a numeric key to an offset
		* descriptor. The tree for the example above would have the following nodes:
		*
		* key: 0, value: { offset: 0, from: null }
		* key: 15, value: { offset: 1, from: barToken }
		* key: 30, value: { offset: 1, from: fooToken }
		* key: 43, value: { offset: 2, from: barToken }
		* key: 820, value: { offset: 1, from: bazToken }
		*
		* To find the offset descriptor for any given token, one needs to find the node with the largest key
		* which is <= token.start. To make this operation fast, the nodes are stored in a map indexed by key.
		*/
		const descriptorToInsert = {
			offset,
			from: fromToken,
			force
		};
		const descriptorAfterRange = this._indexMap.findLastNotAfter(range[1]);
		const fromTokenIsInRange = fromToken && fromToken.range[0] >= range[0] && fromToken.range[1] <= range[1];
		const fromTokenDescriptor = fromTokenIsInRange && this._getOffsetDescriptor(fromToken);
		this._indexMap.deleteRange(range[0] + 1, range[1]);
		this._indexMap.insert(range[0], descriptorToInsert);
		/**
		* To avoid circular offset dependencies, keep the `fromToken` token mapped to whatever it was mapped to previously,
		* even if it's in the current range.
		*/
		if (fromTokenIsInRange) {
			this._indexMap.insert(fromToken.range[0], fromTokenDescriptor);
			this._indexMap.insert(fromToken.range[1], descriptorToInsert);
		}
		/**
		* To avoid modifying the offset of tokens after the range, insert another node to keep the offset of the following
		* tokens the same as it was before.
		*/
		this._indexMap.insert(range[1], descriptorAfterRange);
	}
	/**
	* Gets the desired indent of a token
	* @param token The token
	* @returns The desired indent of the token
	*/
	getDesiredIndent(token) {
		if (!this._desiredIndentCache.has(token)) if (this._ignoredTokens.has(token))
 /**
		* If the token is ignored, use the actual indent of the token as the desired indent.
		* This ensures that no errors are reported for this token.
		*/
		this._desiredIndentCache.set(token, this._tokenInfo.getTokenIndent(token));
		else if (this._lockedFirstTokens.has(token)) {
			const firstToken = this._lockedFirstTokens.get(token);
			this._desiredIndentCache.set(token, this.getDesiredIndent(this._tokenInfo.getFirstTokenOfLine(firstToken)) + this._indentType.repeat(firstToken.loc.start.column - this._tokenInfo.getFirstTokenOfLine(firstToken).loc.start.column));
		} else {
			const offsetInfo = this._getOffsetDescriptor(token);
			const offset = offsetInfo.from && offsetInfo.from.loc.start.line === token.loc.start.line && !/^\s*?\n/u.test(token.value) && !offsetInfo.force ? 0 : offsetInfo.offset * this._indentSize;
			this._desiredIndentCache.set(token, (offsetInfo.from ? this.getDesiredIndent(offsetInfo.from) : "") + this._indentType.repeat(offset));
		}
		return this._desiredIndentCache.get(token);
	}
	/**
	* Ignores a token, preventing it from being reported.
	* @param token The token
	*/
	ignoreToken(token) {
		if (this._tokenInfo.isFirstTokenOfLine(token)) this._ignoredTokens.add(token);
	}
	/**
	* Gets the first token that the given token's indentation is dependent on
	* @param token The token
	* @returns The token that the given token depends on, or `null` if the given token is at the top level
	*/
	getFirstDependency(token) {
		return this._getOffsetDescriptor(token).from;
	}
};
const ELEMENT_LIST_SCHEMA = { oneOf: [{
	type: "integer",
	minimum: 0
}, {
	type: "string",
	enum: ["first", "off"]
}] };
var indent_default = createRule("indent", {
	meta: {
		docs: {
			description: "enforce consistent indentation",
			recommended: null,
			extensionRule: true,
			layout: true
		},
		type: "layout",
		fixable: "whitespace",
		schema: [{ oneOf: [{
			type: "string",
			enum: ["tab"]
		}, {
			type: "integer",
			minimum: 0
		}] }, {
			type: "object",
			properties: {
				SwitchCase: {
					type: "integer",
					minimum: 0,
					default: 0
				},
				VariableDeclarator: { oneOf: [ELEMENT_LIST_SCHEMA, {
					type: "object",
					properties: {
						var: ELEMENT_LIST_SCHEMA,
						let: ELEMENT_LIST_SCHEMA,
						const: ELEMENT_LIST_SCHEMA
					},
					additionalProperties: false
				}] },
				outerIIFEBody: { oneOf: [{
					type: "integer",
					minimum: 0
				}, {
					type: "string",
					enum: ["off"]
				}] },
				MemberExpression: { oneOf: [{
					type: "integer",
					minimum: 0
				}, {
					type: "string",
					enum: ["off"]
				}] },
				FunctionDeclaration: {
					type: "object",
					properties: {
						parameters: ELEMENT_LIST_SCHEMA,
						body: {
							type: "integer",
							minimum: 0
						}
					},
					additionalProperties: false
				},
				FunctionExpression: {
					type: "object",
					properties: {
						parameters: ELEMENT_LIST_SCHEMA,
						body: {
							type: "integer",
							minimum: 0
						}
					},
					additionalProperties: false
				},
				StaticBlock: {
					type: "object",
					properties: { body: {
						type: "integer",
						minimum: 0
					} },
					additionalProperties: false
				},
				CallExpression: {
					type: "object",
					properties: { arguments: ELEMENT_LIST_SCHEMA },
					additionalProperties: false
				},
				ArrayExpression: ELEMENT_LIST_SCHEMA,
				ObjectExpression: ELEMENT_LIST_SCHEMA,
				ImportDeclaration: ELEMENT_LIST_SCHEMA,
				flatTernaryExpressions: {
					type: "boolean",
					default: false
				},
				offsetTernaryExpressions: {
					type: "boolean",
					default: false
				},
				ignoredNodes: {
					type: "array",
					items: {
						type: "string",
						not: { pattern: ":exit$" }
					}
				},
				ignoreComments: {
					type: "boolean",
					default: false
				}
			},
			additionalProperties: false
		}],
		messages: { wrongIndentation: "Expected indentation of {{expected}} but found {{actual}}." }
	},
	create(context) {
		const sourceCode = context.sourceCode;
		if (!sourceCode.parserServices.isJSON) return {};
		const DEFAULT_VARIABLE_INDENT = 1;
		const DEFAULT_PARAMETER_INDENT = 1;
		const DEFAULT_FUNCTION_BODY_INDENT = 1;
		let indentType = "space";
		let indentSize = 4;
		const options = {
			SwitchCase: 0,
			VariableDeclarator: {
				var: DEFAULT_VARIABLE_INDENT,
				let: DEFAULT_VARIABLE_INDENT,
				const: DEFAULT_VARIABLE_INDENT
			},
			outerIIFEBody: 1,
			FunctionDeclaration: {
				parameters: DEFAULT_PARAMETER_INDENT,
				body: DEFAULT_FUNCTION_BODY_INDENT
			},
			FunctionExpression: {
				parameters: DEFAULT_PARAMETER_INDENT,
				body: DEFAULT_FUNCTION_BODY_INDENT
			},
			StaticBlock: { body: DEFAULT_FUNCTION_BODY_INDENT },
			CallExpression: { arguments: DEFAULT_PARAMETER_INDENT },
			MemberExpression: 1,
			ArrayExpression: 1,
			ObjectExpression: 1,
			ImportDeclaration: 1,
			flatTernaryExpressions: false,
			ignoredNodes: [],
			ignoreComments: false,
			offsetTernaryExpressions: false
		};
		if (context.options.length) {
			if (context.options[0] === "tab") {
				indentSize = 1;
				indentType = "tab";
			} else {
				indentSize = context.options[0] ?? indentSize;
				indentType = "space";
			}
			const userOptions = context.options[1];
			if (userOptions) {
				Object.assign(options, userOptions);
				if (typeof userOptions.VariableDeclarator === "number" || userOptions.VariableDeclarator === "first") options.VariableDeclarator = {
					var: userOptions.VariableDeclarator,
					let: userOptions.VariableDeclarator,
					const: userOptions.VariableDeclarator
				};
			}
		}
		const tokenInfo = new TokenInfo(sourceCode);
		const offsets = new OffsetStorage(tokenInfo, indentSize, indentType === "space" ? " " : "	", sourceCode.text.length);
		const parameterParens = /* @__PURE__ */ new WeakSet();
		/**
		* Creates an error message for a line, given the expected/actual indentation.
		* @param expectedAmount The expected amount of indentation characters for this line
		* @param actualSpaces The actual number of indentation spaces that were found on this line
		* @param actualTabs The actual number of indentation tabs that were found on this line
		* @returns An error message for this line
		*/
		function createErrorMessageData(expectedAmount, actualSpaces, actualTabs) {
			const expectedStatement = `${expectedAmount} ${indentType}${expectedAmount === 1 ? "" : "s"}`;
			const foundSpacesWord = `space${actualSpaces === 1 ? "" : "s"}`;
			const foundTabsWord = `tab${actualTabs === 1 ? "" : "s"}`;
			let foundStatement;
			if (actualSpaces > 0)
 /**
			* Abbreviate the message if the expected indentation is also spaces.
			* e.g. 'Expected 4 spaces but found 2' rather than 'Expected 4 spaces but found 2 spaces'
			*/
			foundStatement = indentType === "space" ? actualSpaces : `${actualSpaces} ${foundSpacesWord}`;
			else if (actualTabs > 0) foundStatement = indentType === "tab" ? actualTabs : `${actualTabs} ${foundTabsWord}`;
			else foundStatement = "0";
			return {
				expected: expectedStatement,
				actual: String(foundStatement)
			};
		}
		/**
		* Reports a given indent violation
		* @param token Token violating the indent rule
		* @param neededIndent Expected indentation string
		*/
		function report(token, neededIndent) {
			const actualIndent = Array.from(tokenInfo.getTokenIndent(token));
			const numSpaces = actualIndent.filter((char) => char === " ").length;
			const numTabs = actualIndent.filter((char) => char === "	").length;
			context.report({
				node: token,
				messageId: "wrongIndentation",
				data: createErrorMessageData(neededIndent.length, numSpaces, numTabs),
				loc: {
					start: {
						line: token.loc.start.line,
						column: 0
					},
					end: {
						line: token.loc.start.line,
						column: token.loc.start.column
					}
				},
				fix(fixer) {
					const range = [token.range[0] - token.loc.start.column, token.range[0]];
					const newText = neededIndent;
					return fixer.replaceTextRange(range, newText);
				}
			});
		}
		/**
		* Checks if a token's indentation is correct
		* @param token Token to examine
		* @param desiredIndent Desired indentation of the string
		* @returns `true` if the token's indentation is correct
		*/
		function validateTokenIndent(token, desiredIndent) {
			const indentation = tokenInfo.getTokenIndent(token);
			return indentation === desiredIndent || indentation.includes(" ") && indentation.includes("	");
		}
		/**
		* Counts the number of linebreaks that follow the last non-whitespace character in a string
		* @param string The string to check
		* @returns The number of JavaScript linebreaks that follow the last non-whitespace character,
		* or the total number of linebreaks if the string is all whitespace.
		*/
		function countTrailingLinebreaks(string) {
			const trailingWhitespace = /\s*$/u.exec(string)[0];
			const linebreakMatches = createGlobalLinebreakMatcher().exec(trailingWhitespace);
			return linebreakMatches === null ? 0 : linebreakMatches.length;
		}
		/**
		* Check indentation for lists of elements (arrays, objects, function params)
		* @param elements List of elements that should be offset
		* @param startToken The start token of the list that element should be aligned against, e.g. '['
		* @param endToken The end token of the list, e.g. ']'
		* @param offset The amount that the elements should be offset
		*/
		function addElementListIndent(elements, startToken, endToken, offset) {
			/**
			* Gets the first token of a given element, including surrounding parentheses.
			* @param element A node in the `elements` list
			* @returns The first token of this element
			*/
			function getFirstToken(element) {
				let token = sourceCode.getTokenBefore(element);
				while (isOpeningParenToken(token) && token !== startToken) token = sourceCode.getTokenBefore(token);
				return sourceCode.getTokenAfter(token);
			}
			offsets.setDesiredOffsets([startToken.range[1], endToken.range[0]], startToken, typeof offset === "number" ? offset : 1);
			offsets.setDesiredOffset(endToken, startToken, 0);
			if (offset === "first" && elements.length && !elements[0]) return;
			elements.forEach((element, index) => {
				if (!element) return;
				if (offset === "off") offsets.ignoreToken(getFirstToken(element));
				if (index === 0) return;
				if (offset === "first" && tokenInfo.isFirstTokenOfLine(getFirstToken(element))) offsets.matchOffsetOf(getFirstToken(elements[0]), getFirstToken(element));
				else {
					const previousElement = elements[index - 1];
					const firstTokenOfPreviousElement = previousElement && getFirstToken(previousElement);
					const previousElementLastToken = previousElement && sourceCode.getLastToken(previousElement);
					if (previousElement && previousElementLastToken.loc.end.line - countTrailingLinebreaks(previousElementLastToken.value) > startToken.loc.end.line) offsets.setDesiredOffsets([previousElement.range[1], element.range[1]], firstTokenOfPreviousElement, 0);
				}
			});
		}
		/**
		* Checks the indentation of parenthesized values, given a list of tokens in a program
		* @param tokens A list of tokens
		*/
		function addParensIndent(tokens) {
			const parenStack = [];
			const parenPairs = [];
			for (let i = 0; i < tokens.length; i++) {
				const nextToken = tokens[i];
				if (isOpeningParenToken(nextToken)) parenStack.push(nextToken);
				else if (isClosingParenToken(nextToken)) parenPairs.push({
					left: parenStack.pop(),
					right: nextToken
				});
			}
			for (let i = parenPairs.length - 1; i >= 0; i--) {
				const leftParen = parenPairs[i].left;
				const rightParen = parenPairs[i].right;
				if (!parameterParens.has(leftParen) && !parameterParens.has(rightParen)) {
					const parenthesizedTokens = new Set(sourceCode.getTokensBetween(leftParen, rightParen));
					parenthesizedTokens.forEach((token) => {
						if (!parenthesizedTokens.has(offsets.getFirstDependency(token))) offsets.setDesiredOffset(token, leftParen, 1);
					});
				}
				offsets.setDesiredOffset(rightParen, leftParen, 0);
			}
		}
		/**
		* Ignore all tokens within an unknown node whose offset do not depend
		* on another token's offset within the unknown node
		* @param node Unknown Node
		*/
		function ignoreNode(node) {
			const unknownNodeTokens = new Set(sourceCode.getTokens(node, { includeComments: true }));
			unknownNodeTokens.forEach((token) => {
				if (!unknownNodeTokens.has(offsets.getFirstDependency(token))) {
					const firstTokenOfLine = tokenInfo.getFirstTokenOfLine(token);
					if (token === firstTokenOfLine) offsets.ignoreToken(token);
					else offsets.setDesiredOffset(token, firstTokenOfLine, 0);
				}
			});
		}
		/**
		* Check whether there are any blank (whitespace-only) lines between
		* two tokens on separate lines.
		* @param firstToken The first token.
		* @param secondToken The second token.
		* @returns `true` if the tokens are on separate lines and
		*   there exists a blank line between them, `false` otherwise.
		*/
		function hasBlankLinesBetween(firstToken, secondToken) {
			const firstTokenLine = firstToken.loc.end.line;
			const secondTokenLine = secondToken.loc.start.line;
			if (firstTokenLine === secondTokenLine || firstTokenLine === secondTokenLine - 1) return false;
			for (let line = firstTokenLine + 1; line < secondTokenLine; ++line) if (!tokenInfo.firstTokensByLineNumber.has(line)) return true;
			return false;
		}
		const ignoredNodeFirstTokens = /* @__PURE__ */ new Set();
		const baseOffsetListeners = {
			JSONArrayExpression(node) {
				const openingBracket = sourceCode.getFirstToken(node);
				const closingBracket = sourceCode.getTokenAfter([...node.elements].reverse().find((_) => _) || openingBracket, isClosingBracketToken);
				addElementListIndent(node.elements, openingBracket, closingBracket, options.ArrayExpression);
			},
			JSONObjectExpression(node) {
				const openingCurly = sourceCode.getFirstToken(node);
				const closingCurly = sourceCode.getTokenAfter(node.properties.length ? node.properties[node.properties.length - 1] : openingCurly, isClosingBraceToken);
				addElementListIndent(node.properties, openingCurly, closingCurly, options.ObjectExpression);
			},
			JSONBinaryExpression(node) {
				const operator = sourceCode.getFirstTokenBetween(node.left, node.right, (token) => token.value === node.operator);
				/**
				* For backwards compatibility, don't check BinaryExpression indents, e.g.
				* var foo = bar &&
				*                   baz;
				*/
				const tokenAfterOperator = sourceCode.getTokenAfter(operator);
				offsets.ignoreToken(operator);
				offsets.ignoreToken(tokenAfterOperator);
				offsets.setDesiredOffset(tokenAfterOperator, operator, 0);
			},
			JSONProperty(node) {
				if (!node.shorthand && !node.method && node.kind === "init") {
					const colon = sourceCode.getFirstTokenBetween(node.key, node.value, isColonToken);
					offsets.ignoreToken(sourceCode.getTokenAfter(colon));
				}
			},
			JSONTemplateLiteral(node) {
				node.expressions.forEach((_expression, index) => {
					const previousQuasi = node.quasis[index];
					const nextQuasi = node.quasis[index + 1];
					const tokenToAlignFrom = previousQuasi.loc.start.line === previousQuasi.loc.end.line ? sourceCode.getFirstToken(previousQuasi) : null;
					offsets.setDesiredOffsets([previousQuasi.range[1], nextQuasi.range[0]], tokenToAlignFrom, 1);
					offsets.setDesiredOffset(sourceCode.getFirstToken(nextQuasi), tokenToAlignFrom, 0);
				});
			},
			"*"(node) {
				const firstToken = sourceCode.getFirstToken(node);
				if (firstToken && !ignoredNodeFirstTokens.has(firstToken)) offsets.setDesiredOffsets(node.range, firstToken, 0);
			}
		};
		const listenerCallQueue = [];
		/**
		* To ignore the indentation of a node:
		* 1. Don't call the node's listener when entering it (if it has a listener)
		* 2. Don't set any offsets against the first token of the node.
		* 3. Call `ignoreNode` on the node sometime after exiting it and before validating offsets.
		*/
		const offsetListeners = {};
		for (const [selector, listener] of Object.entries(baseOffsetListeners))
 /**
		* Offset listener calls are deferred until traversal is finished, and are called as
		* part of the final `Program:exit` listener. This is necessary because a node might
		* be matched by multiple selectors.
		*
		* Example: Suppose there is an offset listener for `Identifier`, and the user has
		* specified in configuration that `MemberExpression > Identifier` should be ignored.
		* Due to selector specificity rules, the `Identifier` listener will get called first. However,
		* if a given Identifier node is supposed to be ignored, then the `Identifier` offset listener
		* should not have been called at all. Without doing extra selector matching, we don't know
		* whether the Identifier matches the `MemberExpression > Identifier` selector until the
		* `MemberExpression > Identifier` listener is called.
		*
		* To avoid this, the `Identifier` listener isn't called until traversal finishes and all
		* ignored nodes are known.
		*/
		offsetListeners[selector] = (node) => listenerCallQueue.push({
			listener,
			node
		});
		const ignoredNodes = /* @__PURE__ */ new Set();
		/**
		* Ignores a node
		* @param node The node to ignore
		*/
		function addToIgnoredNodes(node) {
			ignoredNodes.add(node);
			ignoredNodeFirstTokens.add(sourceCode.getFirstToken(node));
		}
		const ignoredNodeListeners = options.ignoredNodes.reduce((listeners, ignoredSelector) => Object.assign(listeners, { [ignoredSelector]: addToIgnoredNodes }), {});
		/**
		* Join the listeners, and add a listener to verify that all tokens actually have the correct indentation
		* at the end.
		*
		* Using Object.assign will cause some offset listeners to be overwritten if the same selector also appears
		* in `ignoredNodeListeners`. This isn't a problem because all of the matching nodes will be ignored,
		* so those listeners wouldn't be called anyway.
		*/
		return Object.assign(offsetListeners, ignoredNodeListeners, {
			"*:exit"(node) {
				if (!KNOWN_NODES.has(node.type)) addToIgnoredNodes(node);
			},
			"Program:exit"() {
				if (options.ignoreComments) sourceCode.getAllComments().forEach((comment) => offsets.ignoreToken(comment));
				for (let i = 0; i < listenerCallQueue.length; i++) {
					const nodeInfo = listenerCallQueue[i];
					if (!ignoredNodes.has(nodeInfo.node)) nodeInfo.listener?.(nodeInfo.node);
				}
				ignoredNodes.forEach(ignoreNode);
				addParensIndent(sourceCode.ast.tokens);
				/**
				* Create a Map from (tokenOrComment) => (precedingToken).
				* This is necessary because sourceCode.getTokenBefore does not handle a comment as an argument correctly.
				*/
				const precedingTokens = /* @__PURE__ */ new WeakMap();
				for (let i = 0; i < sourceCode.ast.comments.length; i++) {
					const comment = sourceCode.ast.comments[i];
					const tokenOrCommentBefore = sourceCode.getTokenBefore(comment, { includeComments: true });
					const hasToken = precedingTokens.has(tokenOrCommentBefore) ? precedingTokens.get(tokenOrCommentBefore) : tokenOrCommentBefore;
					precedingTokens.set(comment, hasToken);
				}
				for (let i = 1; i < sourceCode.lines.length + 1; i++) {
					if (!tokenInfo.firstTokensByLineNumber.has(i)) continue;
					const firstTokenOfLine = tokenInfo.firstTokensByLineNumber.get(i);
					if (firstTokenOfLine.loc.start.line !== i) continue;
					if (isCommentToken(firstTokenOfLine)) {
						const tokenBefore = precedingTokens.get(firstTokenOfLine);
						const tokenAfter = tokenBefore ? sourceCode.getTokenAfter(tokenBefore) : sourceCode.ast.tokens[0];
						const mayAlignWithBefore = tokenBefore && !hasBlankLinesBetween(tokenBefore, firstTokenOfLine);
						const mayAlignWithAfter = tokenAfter && !hasBlankLinesBetween(firstTokenOfLine, tokenAfter);
						/**
						* If a comment precedes a line that begins with a semicolon token, align to that token, i.e.
						*
						* let foo
						* // comment
						* ;(async () => {})()
						*/
						if (tokenAfter && isSemicolonToken(tokenAfter) && !isTokenOnSameLine(firstTokenOfLine, tokenAfter)) offsets.setDesiredOffset(firstTokenOfLine, tokenAfter, 0);
						if (mayAlignWithBefore && validateTokenIndent(firstTokenOfLine, offsets.getDesiredIndent(tokenBefore)) || mayAlignWithAfter && validateTokenIndent(firstTokenOfLine, offsets.getDesiredIndent(tokenAfter))) continue;
					}
					if (validateTokenIndent(firstTokenOfLine, offsets.getDesiredIndent(firstTokenOfLine))) continue;
					report(firstTokenOfLine, offsets.getDesiredIndent(firstTokenOfLine));
				}
			}
		});
	}
});

//#endregion
//#region lib/utils/casing.ts
const allowedCaseOptions = [
	"camelCase",
	"kebab-case",
	"PascalCase",
	"snake_case",
	"SCREAMING_SNAKE_CASE"
];
/**
* Checks whether the given string has symbols.
* @param {string} str
*/
function hasSymbols(str) {
	return /[\u0021-\u0023\u0025-\u002c./\u003a-\u0040\u005b-\u005e`\u007b-\u007d]/u.test(str);
}
/**
* Checks whether the given string has upper.
* @param {string} str
*/
function hasUpper(str) {
	return /[A-Z]/u.test(str);
}
/**
* Checks whether the given string has lower.
* @param {string} str
*/
function hasLower(str) {
	return /[a-z]/u.test(str);
}
/**
* Checks whether the given string is kebab-case.
* @param {string} str
*/
function isKebabCase(str) {
	if (hasUpper(str) || hasSymbols(str) || str.startsWith("-") || /_|--|\s/u.test(str)) return false;
	return true;
}
/**
* Checks whether the given string is snake_case.
* @param {string} str
*/
function isSnakeCase(str) {
	if (hasUpper(str) || hasSymbols(str) || /-|__|\s/u.test(str)) return false;
	return true;
}
/**
* Checks whether the given string is SCREAMING_SNAKE_CASE.
* @param {string} str
*/
function isScreamingSnakeCase(str) {
	if (hasLower(str) || hasSymbols(str) || /-|__|\s/u.test(str)) return false;
	return true;
}
/**
* Checks whether the given string is camelCase.
* @param {string} str
*/
function isCamelCase(str) {
	if (hasSymbols(str) || /^[A-Z]/u.test(str) || /[\s\-_]/u.test(str)) return false;
	return true;
}
/**
* Checks whether the given string is PascalCase.
* @param {string} str
*/
function isPascalCase(str) {
	if (hasSymbols(str) || /^[a-z]/u.test(str) || /[\s\-_]/u.test(str)) return false;
	return true;
}
const checkersMap = {
	"kebab-case": isKebabCase,
	snake_case: isSnakeCase,
	SCREAMING_SNAKE_CASE: isScreamingSnakeCase,
	camelCase: isCamelCase,
	PascalCase: isPascalCase
};
/**
* Return case checker
* @param name type of checker to return ('camelCase', 'kebab-case', 'PascalCase')
*/
function getChecker(name) {
	return checkersMap[name] || isPascalCase;
}

//#endregion
//#region lib/rules/key-name-casing.ts
var key_name_casing_default = createRule("key-name-casing", {
	meta: {
		docs: {
			description: "enforce naming convention to property key names",
			recommended: null,
			extensionRule: false,
			layout: false
		},
		schema: [{
			type: "object",
			properties: {
				camelCase: {
					type: "boolean",
					default: true
				},
				PascalCase: {
					type: "boolean",
					default: false
				},
				SCREAMING_SNAKE_CASE: {
					type: "boolean",
					default: false
				},
				"kebab-case": {
					type: "boolean",
					default: false
				},
				snake_case: {
					type: "boolean",
					default: false
				},
				ignores: {
					type: "array",
					items: { type: "string" },
					uniqueItems: true,
					additionalItems: false
				}
			},
			additionalProperties: false
		}],
		messages: { doesNotMatchFormat: "Property name `{{name}}` must match one of the following formats: {{formats}}" },
		type: "suggestion"
	},
	create(context) {
		const sourceCode = context.sourceCode;
		if (!sourceCode.parserServices.isJSON) return {};
		const option = { ...context.options[0] };
		if (option.camelCase !== false) option.camelCase = true;
		const ignores = option.ignores ? option.ignores.map((ignore) => new RegExp(ignore)) : [];
		const formats = Object.keys(option).filter((key) => allowedCaseOptions.includes(key)).filter((key) => option[key]);
		const checkers = formats.map(getChecker);
		/**
		* Check whether a given name is a valid.
		*/
		function isValid(name) {
			if (ignores.some((regex) => regex.test(name))) return true;
			return checkers.length ? checkers.some((c) => c(name)) : true;
		}
		return { JSONProperty(node) {
			const name = node.key.type === "JSONLiteral" && typeof node.key.value === "string" ? node.key.value : sourceCode.text.slice(...node.key.range);
			if (!isValid(name)) context.report({
				loc: node.key.loc,
				messageId: "doesNotMatchFormat",
				data: {
					name,
					formats: formats.join(", ")
				}
			});
		} };
	}
});

//#endregion
//#region lib/utils/eslint-string-utils.ts
const ASCII_REGEX = /^[\u0000-\u007f]*$/u;
let segmenter;
/**
* Counts graphemes in a given string.
* @param value A string to count graphemes.
* @returns The number of graphemes in `value`.
*/
function getGraphemeCount(value) {
	if (ASCII_REGEX.test(value)) return value.length;
	if (!segmenter) segmenter = new Intl.Segmenter();
	return [...segmenter.segment(value)].length;
}

//#endregion
//#region lib/rules/key-spacing.ts
/**
* Checks whether a string contains a line terminator as defined in
* http://www.ecma-international.org/ecma-262/5.1/#sec-7.3
* @param str String to test.
* @returns True if str contains a line terminator.
*/
function containsLineTerminator(str) {
	return LINEBREAK_MATCHER.test(str);
}
/**
* Gets the last element of an array.
* @param arr An array.
* @returns Last element of arr.
*/
function last(arr) {
	return arr[arr.length - 1];
}
/**
* Checks whether a node is contained on a single line.
* @param node AST Node being evaluated.
* @returns True if the node is a single line.
*/
function isSingleLine(node) {
	return node.loc.end.line === node.loc.start.line;
}
/**
* Checks whether the properties on a single line.
* @param properties List of Property AST nodes.
* @returns True if all properties is on a single line.
*/
function isSingleLineProperties(properties) {
	const [firstProp] = properties;
	const lastProp = last(properties);
	return firstProp.loc.start.line === lastProp.loc.end.line;
}
/**
* Initializes a single option property from the configuration with defaults for undefined values
* @param toOptions Object to be initialized
* @param fromOptions Object to be initialized from
* @returns The object with correctly initialized options and values
*/
function initOptionProperty(toOptions, fromOptions) {
	toOptions.mode = fromOptions.mode || "strict";
	if (typeof fromOptions.beforeColon !== "undefined") toOptions.beforeColon = Number(fromOptions.beforeColon);
	else toOptions.beforeColon = 0;
	if (typeof fromOptions.afterColon !== "undefined") toOptions.afterColon = Number(fromOptions.afterColon);
	else toOptions.afterColon = 1;
	if (typeof fromOptions.align !== "undefined") if (typeof fromOptions.align === "object") toOptions.align = fromOptions.align;
	else toOptions.align = {
		on: fromOptions.align,
		mode: toOptions.mode,
		beforeColon: toOptions.beforeColon,
		afterColon: toOptions.afterColon
	};
	return toOptions;
}
/**
* Initializes all the option values (singleLine, multiLine and align) from the configuration with defaults for undefined values
* @param toOptions Object to be initialized
* @param fromOptions Object to be initialized from
* @returns The object with correctly initialized options and values
*/
function initOptions(toOptions, fromOptions) {
	if (typeof fromOptions.align === "object") {
		toOptions.align = initOptionProperty({}, fromOptions.align);
		toOptions.align.on = fromOptions.align.on || "colon";
		toOptions.align.mode = fromOptions.align.mode || "strict";
		toOptions.multiLine = initOptionProperty({}, fromOptions.multiLine || fromOptions);
		toOptions.singleLine = initOptionProperty({}, fromOptions.singleLine || fromOptions);
	} else {
		toOptions.multiLine = initOptionProperty({}, fromOptions.multiLine || fromOptions);
		toOptions.singleLine = initOptionProperty({}, fromOptions.singleLine || fromOptions);
		if (toOptions.multiLine.align) toOptions.align = {
			on: toOptions.multiLine.align.on,
			mode: toOptions.multiLine.align.mode || toOptions.multiLine.mode,
			beforeColon: toOptions.multiLine.align.beforeColon,
			afterColon: toOptions.multiLine.align.afterColon
		};
	}
	return toOptions;
}
var key_spacing_default = createRule("key-spacing", {
	meta: {
		docs: {
			description: "enforce consistent spacing between keys and values in object literal properties",
			recommended: null,
			extensionRule: true,
			layout: true
		},
		type: "layout",
		fixable: "whitespace",
		schema: [{ anyOf: [
			{
				type: "object",
				properties: {
					align: { anyOf: [{
						type: "string",
						enum: ["colon", "value"]
					}, {
						type: "object",
						properties: {
							mode: {
								type: "string",
								enum: ["strict", "minimum"]
							},
							on: {
								type: "string",
								enum: ["colon", "value"]
							},
							beforeColon: { type: "boolean" },
							afterColon: { type: "boolean" }
						},
						additionalProperties: false
					}] },
					mode: {
						type: "string",
						enum: ["strict", "minimum"]
					},
					beforeColon: { type: "boolean" },
					afterColon: { type: "boolean" }
				},
				additionalProperties: false
			},
			{
				type: "object",
				properties: {
					singleLine: {
						type: "object",
						properties: {
							mode: {
								type: "string",
								enum: ["strict", "minimum"]
							},
							beforeColon: { type: "boolean" },
							afterColon: { type: "boolean" }
						},
						additionalProperties: false
					},
					multiLine: {
						type: "object",
						properties: {
							align: { anyOf: [{
								type: "string",
								enum: ["colon", "value"]
							}, {
								type: "object",
								properties: {
									mode: {
										type: "string",
										enum: ["strict", "minimum"]
									},
									on: {
										type: "string",
										enum: ["colon", "value"]
									},
									beforeColon: { type: "boolean" },
									afterColon: { type: "boolean" }
								},
								additionalProperties: false
							}] },
							mode: {
								type: "string",
								enum: ["strict", "minimum"]
							},
							beforeColon: { type: "boolean" },
							afterColon: { type: "boolean" }
						},
						additionalProperties: false
					}
				},
				additionalProperties: false
			},
			{
				type: "object",
				properties: {
					singleLine: {
						type: "object",
						properties: {
							mode: {
								type: "string",
								enum: ["strict", "minimum"]
							},
							beforeColon: { type: "boolean" },
							afterColon: { type: "boolean" }
						},
						additionalProperties: false
					},
					multiLine: {
						type: "object",
						properties: {
							mode: {
								type: "string",
								enum: ["strict", "minimum"]
							},
							beforeColon: { type: "boolean" },
							afterColon: { type: "boolean" }
						},
						additionalProperties: false
					},
					align: {
						type: "object",
						properties: {
							mode: {
								type: "string",
								enum: ["strict", "minimum"]
							},
							on: {
								type: "string",
								enum: ["colon", "value"]
							},
							beforeColon: { type: "boolean" },
							afterColon: { type: "boolean" }
						},
						additionalProperties: false
					}
				},
				additionalProperties: false
			}
		] }],
		messages: {
			extraKey: "Extra space after {{computed}}key '{{key}}'.",
			extraValue: "Extra space before value for {{computed}}key '{{key}}'.",
			missingKey: "Missing space after {{computed}}key '{{key}}'.",
			missingValue: "Missing space before value for {{computed}}key '{{key}}'."
		}
	},
	create(context) {
		const sourceCode = context.sourceCode;
		if (!sourceCode.parserServices.isJSON) return {};
		const ruleOptions = initOptions({}, context.options[0] || {});
		const multiLineOptions = ruleOptions.multiLine;
		const singleLineOptions = ruleOptions.singleLine;
		const alignmentOptions = ruleOptions.align || null;
		/**
		* Determines if the given property is key-value property.
		* @param property Property node to check.
		* @returns Whether the property is a key-value property.
		*/
		function isKeyValueProperty(property) {
			return !("method" in property && property.method || "shorthand" in property && property.shorthand || "kind" in property && property.kind !== "init" || property.type !== "JSONProperty");
		}
		/**
		* Starting from the given node (a property.key node here) looks forward
		* until it finds the colon punctuator and returns it.
		* @param node The node to start looking from.
		* @returns The colon punctuator.
		*/
		function getNextColon(node) {
			return sourceCode.getTokenAfter(node, isColonToken);
		}
		/**
		* Starting from the given node (a property.key node here) looks forward
		* until it finds the last token before a colon punctuator and returns it.
		* @param node The node to start looking from.
		* @returns The last token before a colon punctuator.
		*/
		function getLastTokenBeforeColon(node) {
			const colonToken = getNextColon(node);
			return sourceCode.getTokenBefore(colonToken);
		}
		/**
		* Starting from the given node (a property.key node here) looks forward
		* until it finds the first token after a colon punctuator and returns it.
		* @param node The node to start looking from.
		* @returns The first token after a colon punctuator.
		*/
		function getFirstTokenAfterColon(node) {
			const colonToken = getNextColon(node);
			return sourceCode.getTokenAfter(colonToken);
		}
		/**
		* Checks whether a property is a member of the property group it follows.
		* @param lastMember The last Property known to be in the group.
		* @param candidate The next Property that might be in the group.
		* @returns True if the candidate property is part of the group.
		*/
		function continuesPropertyGroup(lastMember, candidate) {
			const groupEndLine = lastMember.loc.start.line;
			const candidateValueStartLine = (isKeyValueProperty(candidate) ? getFirstTokenAfterColon(candidate.key) : candidate).loc.start.line;
			if (candidateValueStartLine - groupEndLine <= 1) return true;
			/**
			* Check that the first comment is adjacent to the end of the group, the
			* last comment is adjacent to the candidate property, and that successive
			* comments are adjacent to each other.
			*/
			const leadingComments = sourceCode.getCommentsBefore(candidate);
			if (leadingComments.length && leadingComments[0].loc.start.line - groupEndLine <= 1 && candidateValueStartLine - last(leadingComments).loc.end.line <= 1) {
				for (let i = 1; i < leadingComments.length; i++) if (leadingComments[i].loc.start.line - leadingComments[i - 1].loc.end.line > 1) return false;
				return true;
			}
			return false;
		}
		/**
		* Gets an object literal property's key as the identifier name or string value.
		* @param property Property node whose key to retrieve.
		* @returns The property's key.
		*/
		function getKey(property) {
			const key = property.key;
			if (property.computed) return sourceCode.getText().slice(key.range[0], key.range[1]);
			return getStaticPropertyName(property);
		}
		/**
		* Reports an appropriately-formatted error if spacing is incorrect on one
		* side of the colon.
		* @param property Key-value pair in an object literal.
		* @param side Side being verified - either "key" or "value".
		* @param whitespace Actual whitespace string.
		* @param expected Expected whitespace length.
		* @param mode Value of the mode as "strict" or "minimum"
		*/
		function report(property, side, whitespace, expected, mode) {
			const diff = whitespace.length - expected;
			if ((diff && mode === "strict" || diff < 0 && mode === "minimum" || diff > 0 && !expected && mode === "minimum") && !(expected && containsLineTerminator(whitespace))) {
				const nextColon = getNextColon(property.key);
				const tokenBeforeColon = sourceCode.getTokenBefore(nextColon, { includeComments: true });
				const tokenAfterColon = sourceCode.getTokenAfter(nextColon, { includeComments: true });
				const isKeySide = side === "key";
				const isExtra = diff > 0;
				const diffAbs = Math.abs(diff);
				const spaces = Array(diffAbs + 1).join(" ");
				const locStart = isKeySide ? tokenBeforeColon.loc.end : nextColon.loc.start;
				const locEnd = isKeySide ? nextColon.loc.start : tokenAfterColon.loc.start;
				const missingLoc = isKeySide ? tokenBeforeColon.loc : tokenAfterColon.loc;
				const loc = isExtra ? {
					start: locStart,
					end: locEnd
				} : missingLoc;
				let fix;
				if (isExtra) {
					let range;
					if (isKeySide) range = [tokenBeforeColon.range[1], tokenBeforeColon.range[1] + diffAbs];
					else range = [tokenAfterColon.range[0] - diffAbs, tokenAfterColon.range[0]];
					fix = function(fixer) {
						return fixer.removeRange(range);
					};
				} else if (isKeySide) fix = function(fixer) {
					return fixer.insertTextAfter(tokenBeforeColon, spaces);
				};
				else fix = function(fixer) {
					return fixer.insertTextBefore(tokenAfterColon, spaces);
				};
				let messageId;
				if (isExtra) messageId = side === "key" ? "extraKey" : "extraValue";
				else messageId = side === "key" ? "missingKey" : "missingValue";
				context.report({
					node: property[side],
					loc,
					messageId,
					data: {
						computed: property.computed ? "computed " : "",
						key: getKey(property)
					},
					fix
				});
			}
		}
		/**
		* Gets the number of characters in a key, including quotes around string
		* keys and braces around computed property keys.
		* @param property Property of on object literal.
		* @returns Width of the key.
		*/
		function getKeyWidth(property) {
			const startToken = sourceCode.getFirstToken(property);
			const endToken = getLastTokenBeforeColon(property.key);
			return getGraphemeCount(sourceCode.getText().slice(startToken.range[0], endToken.range[1]));
		}
		/**
		* Gets the whitespace around the colon in an object literal property.
		* @param property Property node from an object literal.
		* @returns Whitespace before and after the property's colon.
		*/
		function getPropertyWhitespace(property) {
			const whitespace = /(\s*):(\s*)/u.exec(sourceCode.getText().slice(property.key.range[1], property.value.range[0]));
			if (whitespace) return {
				beforeColon: whitespace[1],
				afterColon: whitespace[2]
			};
			return null;
		}
		/**
		* Creates groups of properties.
		* @param node ObjectExpression node being evaluated.
		* @returns Groups of property AST node lists.
		*/
		function createGroups(node) {
			if (node.properties.length === 1) return [node.properties];
			return node.properties.reduce((groups, property) => {
				const currentGroup = last(groups);
				const prev = last(currentGroup);
				if (!prev || continuesPropertyGroup(prev, property)) currentGroup.push(property);
				else groups.push([property]);
				return groups;
			}, [[]]);
		}
		/**
		* Verifies correct vertical alignment of a group of properties.
		* @param properties List of Property AST nodes.
		*/
		function verifyGroupAlignment(properties) {
			const length = properties.length;
			const widths = properties.map(getKeyWidth);
			const align = alignmentOptions.on;
			let targetWidth = Math.max(...widths);
			let beforeColon;
			let afterColon;
			let mode;
			if (alignmentOptions && length > 1) {
				beforeColon = alignmentOptions.beforeColon;
				afterColon = alignmentOptions.afterColon;
				mode = alignmentOptions.mode;
			} else {
				beforeColon = multiLineOptions.beforeColon;
				afterColon = multiLineOptions.afterColon;
				mode = alignmentOptions.mode;
			}
			targetWidth += align === "colon" ? beforeColon : afterColon;
			for (let i = 0; i < length; i++) {
				const property = properties[i];
				const whitespace = getPropertyWhitespace(property);
				if (whitespace) {
					const width = widths[i];
					if (align === "value") {
						report(property, "key", whitespace.beforeColon, beforeColon, mode);
						report(property, "value", whitespace.afterColon, targetWidth - width, mode);
					} else {
						report(property, "key", whitespace.beforeColon, targetWidth - width, mode);
						report(property, "value", whitespace.afterColon, afterColon, mode);
					}
				}
			}
		}
		/**
		* Verifies spacing of property conforms to specified options.
		* @param node Property node being evaluated.
		* @param lineOptions Configured singleLine or multiLine options
		*/
		function verifySpacing(node, lineOptions) {
			const actual = getPropertyWhitespace(node);
			if (actual) {
				report(node, "key", actual.beforeColon, lineOptions.beforeColon, lineOptions.mode);
				report(node, "value", actual.afterColon, lineOptions.afterColon, lineOptions.mode);
			}
		}
		/**
		* Verifies spacing of each property in a list.
		* @param properties List of Property AST nodes.
		* @param lineOptions Configured singleLine or multiLine options
		*/
		function verifyListSpacing(properties, lineOptions) {
			const length = properties.length;
			for (let i = 0; i < length; i++) verifySpacing(properties[i], lineOptions);
		}
		/**
		* Verifies vertical alignment, taking into account groups of properties.
		* @param node ObjectExpression node being evaluated.
		*/
		function verifyAlignment(node) {
			createGroups(node).forEach((group) => {
				const properties = group.filter(isKeyValueProperty);
				if (properties.length > 0 && isSingleLineProperties(properties)) verifyListSpacing(properties, multiLineOptions);
				else verifyGroupAlignment(properties);
			});
		}
		if (alignmentOptions) return { JSONObjectExpression(node) {
			if (isSingleLine(node)) verifyListSpacing(node.properties.filter(isKeyValueProperty), singleLineOptions);
			else verifyAlignment(node);
		} };
		return { JSONProperty(node) {
			verifySpacing(node, isSingleLine(node.parent) ? singleLineOptions : multiLineOptions);
		} };
	}
});

//#endregion
//#region lib/rules/no-bigint-literals.ts
var no_bigint_literals_default = createRule("no-bigint-literals", {
	meta: {
		docs: {
			description: "disallow BigInt literals",
			recommended: [
				"json",
				"jsonc",
				"json5"
			],
			extensionRule: false,
			layout: false
		},
		schema: [],
		messages: { unexpected: "BigInt literals are not allowed." },
		type: "problem"
	},
	create(context) {
		if (!context.sourceCode.parserServices.isJSON) return {};
		return { JSONLiteral(node) {
			if (node.bigint != null) context.report({
				loc: node.loc,
				messageId: "unexpected"
			});
		} };
	}
});

//#endregion
//#region lib/rules/no-binary-expression.ts
var no_binary_expression_default = createRule("no-binary-expression", {
	meta: {
		docs: {
			description: "disallow binary expression",
			recommended: [
				"json",
				"jsonc",
				"json5"
			],
			extensionRule: false,
			layout: false
		},
		fixable: "code",
		hasSuggestions: false,
		schema: [],
		messages: { disallow: "The binary expressions are not allowed." },
		type: "problem"
	},
	create(context) {
		if (!context.sourceCode.parserServices.isJSON) return {};
		return { JSONBinaryExpression(node) {
			context.report({
				loc: node.loc,
				messageId: "disallow",
				fix(fixer) {
					const value = getStaticJSONValue(node);
					return fixer.replaceTextRange(node.range, JSON.stringify(value));
				}
			});
		} };
	}
});

//#endregion
//#region lib/rules/no-binary-numeric-literals.ts
const binaryNumericLiteralPattern = /^0b/iu;
var no_binary_numeric_literals_default = createRule("no-binary-numeric-literals", {
	meta: {
		docs: {
			description: "disallow binary numeric literals",
			recommended: [
				"json",
				"jsonc",
				"json5"
			],
			extensionRule: false,
			layout: false
		},
		fixable: "code",
		messages: { disallow: "Binary numeric literals should not be used." },
		schema: [],
		type: "problem"
	},
	create(context) {
		if (!context.sourceCode.parserServices.isJSON) return {};
		return { JSONLiteral(node) {
			if (typeof node.value === "number" && binaryNumericLiteralPattern.test(node.raw)) context.report({
				loc: node.loc,
				messageId: "disallow",
				fix: (fixer) => {
					return fixer.replaceTextRange(node.range, `${node.value}`);
				}
			});
		} };
	}
});

//#endregion
//#region lib/rules/no-comments.ts
var no_comments_default = createRule("no-comments", {
	meta: {
		docs: {
			description: "disallow comments",
			recommended: ["json"],
			extensionRule: false,
			layout: false
		},
		schema: [],
		messages: { unexpected: "Unexpected comment." },
		type: "problem"
	},
	create(context) {
		const sourceCode = context.sourceCode;
		if (!sourceCode.parserServices.isJSON) return {};
		return { Program() {
			for (const comment of sourceCode.getAllComments()) context.report({
				loc: comment.loc,
				messageId: "unexpected"
			});
		} };
	}
});

//#endregion
//#region lib/rules/no-dupe-keys.ts
const coreRule$7 = getCoreRule("no-dupe-keys");
var no_dupe_keys_default = createRule("no-dupe-keys", {
	meta: {
		...coreRule$7.meta,
		docs: {
			description: "disallow duplicate keys in object literals",
			recommended: [
				"json",
				"jsonc",
				"json5"
			],
			extensionRule: true,
			layout: false
		},
		fixable: coreRule$7.meta.fixable,
		hasSuggestions: coreRule$7.meta.hasSuggestions,
		schema: coreRule$7.meta.schema,
		messages: coreRule$7.meta.messages,
		type: coreRule$7.meta.type,
		deprecated: false,
		replacedBy: []
	},
	create(context) {
		return defineWrapperListener(coreRule$7, context, context.options);
	}
});

//#endregion
//#region lib/rules/no-escape-sequence-in-identifier.ts
var no_escape_sequence_in_identifier_default = createRule("no-escape-sequence-in-identifier", {
	meta: {
		docs: {
			description: "disallow escape sequences in identifiers.",
			recommended: [
				"json",
				"jsonc",
				"json5"
			],
			extensionRule: false,
			layout: false
		},
		fixable: "code",
		messages: { disallow: "Escape sequence in identifiers should not be used." },
		schema: [],
		type: "problem"
	},
	create(context) {
		const sourceCode = context.sourceCode;
		if (!sourceCode.parserServices.isJSON) return {};
		return { JSONIdentifier(node) {
			verify(node);
		} };
		/**
		* verify
		*/
		function verify(node) {
			const escapeMatcher = new PatternMatcher(/\\u\{[\dA-Fa-f]+\}|\\u\d{4}/gu);
			const text = sourceCode.text.slice(...node.range);
			for (const match of escapeMatcher.execAll(text)) {
				const start = match.index;
				const end = start + match[0].length;
				const range = [start + node.range[0], end + node.range[0]];
				context.report({
					loc: {
						start: sourceCode.getLocFromIndex(range[0]),
						end: sourceCode.getLocFromIndex(range[1])
					},
					messageId: "disallow",
					fix(fixer) {
						const codePointStr = match[0][2] === "{" ? text.slice(start + 3, end - 1) : text.slice(start + 2, end);
						const codePoint = Number(`0x${codePointStr}`);
						return fixer.replaceTextRange(range, String.fromCodePoint(codePoint));
					}
				});
			}
		}
	}
});

//#endregion
//#region lib/rules/no-floating-decimal.ts
const coreRule$6 = getCoreRule("no-floating-decimal");
var no_floating_decimal_default = createRule("no-floating-decimal", {
	meta: {
		...coreRule$6.meta,
		docs: {
			description: "disallow leading or trailing decimal points in numeric literals",
			recommended: ["json", "jsonc"],
			extensionRule: true,
			layout: true
		},
		fixable: coreRule$6.meta.fixable,
		hasSuggestions: coreRule$6.meta.hasSuggestions,
		schema: coreRule$6.meta.schema,
		messages: coreRule$6.meta.messages,
		type: coreRule$6.meta.type,
		deprecated: false,
		replacedBy: []
	},
	create(context) {
		return defineWrapperListener(coreRule$6, context, context.options);
	}
});

//#endregion
//#region lib/rules/no-hexadecimal-numeric-literals.ts
const hexadecimalNumericLiteralPattern = /^0x/iu;
var no_hexadecimal_numeric_literals_default = createRule("no-hexadecimal-numeric-literals", {
	meta: {
		docs: {
			description: "disallow hexadecimal numeric literals",
			recommended: ["json", "jsonc"],
			extensionRule: false,
			layout: false
		},
		fixable: "code",
		messages: { disallow: "Hexadecimal numeric literals should not be used." },
		schema: [],
		type: "problem"
	},
	create(context) {
		if (!context.sourceCode.parserServices.isJSON) return {};
		return { JSONLiteral(node) {
			if (typeof node.value === "number" && hexadecimalNumericLiteralPattern.test(node.raw)) context.report({
				loc: node.loc,
				messageId: "disallow",
				fix: (fixer) => {
					return fixer.replaceTextRange(node.range, `${node.value}`);
				}
			});
		} };
	}
});

//#endregion
//#region lib/rules/no-infinity.ts
var no_infinity_default = createRule("no-infinity", {
	meta: {
		docs: {
			description: "disallow Infinity",
			recommended: ["json", "jsonc"],
			extensionRule: false,
			layout: false
		},
		messages: { disallow: "Infinity should not be used." },
		schema: [],
		type: "problem"
	},
	create(context) {
		if (!context.sourceCode.parserServices.isJSON) return {};
		return { JSONIdentifier(node) {
			if (!isNumberIdentifier(node)) return;
			if (node.name === "Infinity") context.report({
				loc: node.loc,
				messageId: "disallow"
			});
		} };
	}
});

//#endregion
//#region lib/rules/no-irregular-whitespace.ts
const coreRule$5 = getCoreRule("no-irregular-whitespace");
var no_irregular_whitespace_default = createRule("no-irregular-whitespace", {
	meta: {
		...coreRule$5.meta,
		docs: {
			description: "disallow irregular whitespace",
			recommended: [
				"json",
				"jsonc",
				"json5"
			],
			extensionRule: true,
			layout: false
		},
		fixable: coreRule$5.meta.fixable,
		hasSuggestions: coreRule$5.meta.hasSuggestions,
		schema: coreRule$5.meta.schema,
		messages: coreRule$5.meta.messages,
		type: coreRule$5.meta.type,
		deprecated: false,
		replacedBy: []
	},
	create(context) {
		return defineWrapperListener(coreRule$5, context, context.options);
	}
});

//#endregion
//#region lib/rules/no-multi-str.ts
const coreRule$4 = getCoreRule("no-multi-str");
var no_multi_str_default = createRule("no-multi-str", {
	meta: {
		...coreRule$4.meta,
		docs: {
			description: "disallow multiline strings",
			recommended: ["json", "jsonc"],
			extensionRule: true,
			layout: false
		},
		fixable: coreRule$4.meta.fixable,
		hasSuggestions: coreRule$4.meta.hasSuggestions,
		schema: coreRule$4.meta.schema,
		messages: {
			...coreRule$4.meta.messages,
			multilineString: "Multiline support is limited to JSON5 only."
		},
		type: coreRule$4.meta.type,
		deprecated: false,
		replacedBy: []
	},
	create(context) {
		return defineWrapperListener(coreRule$4, context, context.options);
	}
});

//#endregion
//#region lib/rules/no-nan.ts
var no_nan_default = createRule("no-nan", {
	meta: {
		docs: {
			description: "disallow NaN",
			recommended: ["json", "jsonc"],
			extensionRule: false,
			layout: false
		},
		messages: { disallow: "NaN should not be used." },
		schema: [],
		type: "problem"
	},
	create(context) {
		if (!context.sourceCode.parserServices.isJSON) return {};
		return { JSONIdentifier(node) {
			if (!isNumberIdentifier(node)) return;
			if (node.name === "NaN") context.report({
				loc: node.loc,
				messageId: "disallow"
			});
		} };
	}
});

//#endregion
//#region lib/rules/no-number-props.ts
var no_number_props_default = createRule("no-number-props", {
	meta: {
		docs: {
			description: "disallow number property keys",
			recommended: [
				"json",
				"jsonc",
				"json5"
			],
			extensionRule: false,
			layout: false
		},
		fixable: "code",
		schema: [],
		messages: { unexpected: "The number property keys are not allowed." },
		type: "problem"
	},
	create(context) {
		if (!context.sourceCode.parserServices.isJSON) return {};
		return { JSONProperty(node) {
			if (node.key.type !== "JSONLiteral") return;
			if (typeof node.key.value === "number") {
				const raw = node.key.raw;
				context.report({
					loc: node.key.loc,
					messageId: "unexpected",
					fix(fixer) {
						return fixer.replaceTextRange(node.key.range, `"${raw}"`);
					}
				});
			}
		} };
	}
});

//#endregion
//#region lib/rules/no-numeric-separators.ts
var no_numeric_separators_default = createRule("no-numeric-separators", {
	meta: {
		docs: {
			description: "disallow numeric separators",
			recommended: [
				"json",
				"jsonc",
				"json5"
			],
			extensionRule: false,
			layout: false
		},
		fixable: "code",
		schema: [],
		messages: { unexpected: "Numeric separators are not allowed." },
		type: "problem"
	},
	create(context) {
		const sourceCode = context.sourceCode;
		if (!sourceCode.parserServices.isJSON) return {};
		return { JSONLiteral(node) {
			if (typeof node.value !== "number") return;
			const text = sourceCode.text.slice(...node.range);
			if (text.includes("_")) context.report({
				loc: node.loc,
				messageId: "unexpected",
				fix(fixer) {
					return fixer.replaceTextRange(node.range, text.replace(/_/g, ""));
				}
			});
		} };
	}
});

//#endregion
//#region lib/rules/no-octal-escape.ts
const coreRule$3 = getCoreRule("no-octal-escape");
var no_octal_escape_default = createRule("no-octal-escape", {
	meta: {
		...coreRule$3.meta,
		docs: {
			description: "disallow octal escape sequences in string literals",
			recommended: null,
			extensionRule: true,
			layout: false
		},
		fixable: coreRule$3.meta.fixable,
		hasSuggestions: coreRule$3.meta.hasSuggestions,
		schema: coreRule$3.meta.schema,
		messages: coreRule$3.meta.messages,
		type: coreRule$3.meta.type,
		deprecated: false,
		replacedBy: []
	},
	create(context) {
		return defineWrapperListener(coreRule$3, context, context.options);
	}
});

//#endregion
//#region lib/rules/no-octal-numeric-literals.ts
const octalNumericLiteralPattern = /^0o/iu;
var no_octal_numeric_literals_default = createRule("no-octal-numeric-literals", {
	meta: {
		docs: {
			description: "disallow octal numeric literals",
			recommended: [
				"json",
				"jsonc",
				"json5"
			],
			extensionRule: false,
			layout: false
		},
		fixable: "code",
		messages: { disallow: "Octal numeric literals should not be used." },
		schema: [],
		type: "problem"
	},
	create(context) {
		if (!context.sourceCode.parserServices.isJSON) return {};
		return { JSONLiteral(node) {
			if (typeof node.value === "number" && octalNumericLiteralPattern.test(node.raw)) context.report({
				loc: node.loc,
				messageId: "disallow",
				fix: (fixer) => {
					return fixer.replaceTextRange(node.range, `${node.value}`);
				}
			});
		} };
	}
});

//#endregion
//#region lib/rules/no-octal.ts
const coreRule$2 = getCoreRule("no-octal");
var no_octal_default = createRule("no-octal", {
	meta: {
		...coreRule$2.meta,
		docs: {
			description: "disallow legacy octal literals",
			recommended: [
				"json",
				"jsonc",
				"json5"
			],
			extensionRule: true,
			layout: false
		},
		fixable: coreRule$2.meta.fixable,
		hasSuggestions: coreRule$2.meta.hasSuggestions,
		schema: coreRule$2.meta.schema,
		messages: coreRule$2.meta.messages,
		type: coreRule$2.meta.type,
		deprecated: false,
		replacedBy: []
	},
	create(context) {
		return defineWrapperListener(coreRule$2, context, context.options);
	}
});

//#endregion
//#region lib/rules/no-parenthesized.ts
var no_parenthesized_default = createRule("no-parenthesized", {
	meta: {
		docs: {
			description: "disallow parentheses around the expression",
			recommended: [
				"json",
				"jsonc",
				"json5"
			],
			extensionRule: false,
			layout: false
		},
		fixable: "code",
		hasSuggestions: false,
		schema: [],
		messages: { disallow: "Parentheses around expression should not be used." },
		type: "problem"
	},
	create(context) {
		const sourceCode = context.sourceCode;
		if (!sourceCode.parserServices.isJSON) return {};
		return {
			JSONArrayExpression: handler,
			JSONBinaryExpression: handler,
			JSONIdentifier: handler,
			JSONLiteral: handler,
			JSONObjectExpression: handler,
			JSONTemplateLiteral: handler,
			JSONUnaryExpression: handler
		};
		/** Expression handler */
		function handler(node) {
			if (!isExpression(node) || !isParenthesized(node, sourceCode)) return;
			const leftParen = sourceCode.getTokenBefore(node);
			const rightParen = sourceCode.getTokenAfter(node);
			context.report({
				loc: leftParen.loc,
				messageId: "disallow",
				fix
			});
			context.report({
				loc: rightParen.loc,
				messageId: "disallow",
				fix
			});
			/** Fix error */
			function fix(fixer) {
				const parent = node.parent;
				if (!parent) return [];
				if (parent.type !== "JSONArrayExpression" && parent.type !== "JSONExpressionStatement" && parent.type !== "JSONProperty") return [];
				return [fixer.removeRange(leftParen.range), fixer.removeRange(rightParen.range)];
			}
		}
	}
});

//#endregion
//#region lib/rules/no-plus-sign.ts
var no_plus_sign_default = createRule("no-plus-sign", {
	meta: {
		docs: {
			description: "disallow plus sign",
			recommended: ["json", "jsonc"],
			extensionRule: false,
			layout: false
		},
		fixable: "code",
		messages: { disallow: "Plus sign should not be used." },
		schema: [],
		type: "problem"
	},
	create(context) {
		const sourceCode = context.sourceCode;
		if (!sourceCode.parserServices.isJSON) return {};
		return { JSONUnaryExpression(node) {
			if (node.operator === "+") {
				const operator = sourceCode.getFirstToken(node, (token) => token.type === "Punctuator" && token.value === node.operator);
				context.report({
					loc: operator?.loc || node.loc,
					messageId: "disallow",
					fix(fixer) {
						return operator ? fixer.removeRange(operator.range) : null;
					}
				});
			}
		} };
	}
});

//#endregion
//#region lib/rules/no-regexp-literals.ts
var no_regexp_literals_default = createRule("no-regexp-literals", {
	meta: {
		docs: {
			description: "disallow RegExp literals",
			recommended: [
				"json",
				"jsonc",
				"json5"
			],
			extensionRule: false,
			layout: false
		},
		schema: [],
		messages: { unexpected: "RegExp literals are not allowed." },
		type: "problem"
	},
	create(context) {
		if (!context.sourceCode.parserServices.isJSON) return {};
		return { JSONLiteral(node) {
			if (node.regex) context.report({
				loc: node.loc,
				messageId: "unexpected"
			});
		} };
	}
});

//#endregion
//#region lib/rules/no-sparse-arrays.ts
const coreRule$1 = getCoreRule("no-sparse-arrays");
var no_sparse_arrays_default = createRule("no-sparse-arrays", {
	meta: {
		...coreRule$1.meta,
		docs: {
			description: "disallow sparse arrays",
			recommended: [
				"json",
				"jsonc",
				"json5"
			],
			extensionRule: true,
			layout: false
		},
		fixable: coreRule$1.meta.fixable,
		hasSuggestions: coreRule$1.meta.hasSuggestions,
		schema: coreRule$1.meta.schema,
		messages: coreRule$1.meta.messages,
		type: coreRule$1.meta.type,
		deprecated: false,
		replacedBy: []
	},
	create(context) {
		return defineWrapperListener(coreRule$1, context, context.options);
	}
});

//#endregion
//#region lib/rules/no-template-literals.ts
var no_template_literals_default = createRule("no-template-literals", {
	meta: {
		docs: {
			description: "disallow template literals",
			recommended: [
				"json",
				"jsonc",
				"json5"
			],
			extensionRule: false,
			layout: false
		},
		fixable: "code",
		schema: [],
		messages: { unexpected: "The template literals are not allowed." },
		type: "problem"
	},
	create(context) {
		if (!context.sourceCode.parserServices.isJSON) return {};
		return { JSONTemplateLiteral(node) {
			context.report({
				loc: node.loc,
				messageId: "unexpected",
				fix(fixer) {
					const s = node.quasis[0].value.cooked;
					return fixer.replaceTextRange(node.range, JSON.stringify(s));
				}
			});
		} };
	}
});

//#endregion
//#region lib/rules/no-undefined-value.ts
var no_undefined_value_default = createRule("no-undefined-value", {
	meta: {
		docs: {
			description: "disallow `undefined`",
			recommended: [
				"json",
				"jsonc",
				"json5"
			],
			extensionRule: false,
			layout: false
		},
		schema: [],
		messages: { unexpected: "`undefined` is not allowed." },
		type: "problem"
	},
	create(context) {
		if (!context.sourceCode.parserServices.isJSON) return {};
		return { JSONIdentifier(node) {
			if (!isUndefinedIdentifier(node)) return;
			context.report({
				loc: node.loc,
				messageId: "unexpected"
			});
		} };
	}
});

//#endregion
//#region lib/rules/no-unicode-codepoint-escapes.ts
var no_unicode_codepoint_escapes_default = createRule("no-unicode-codepoint-escapes", {
	meta: {
		docs: {
			description: "disallow Unicode code point escape sequences.",
			recommended: [
				"json",
				"jsonc",
				"json5"
			],
			extensionRule: false,
			layout: false
		},
		fixable: "code",
		messages: { disallow: "Unicode code point escape sequence should not be used." },
		schema: [],
		type: "problem"
	},
	create(context) {
		const sourceCode = context.sourceCode;
		if (!sourceCode.parserServices.isJSON) return {};
		return {
			JSONIdentifier(node) {
				verify(node);
			},
			JSONLiteral(node) {
				if (typeof node.value === "string") verify(node);
			},
			JSONTemplateElement(node) {
				verify(node);
			}
		};
		/**
		* verify
		*/
		function verify(node) {
			const codePointEscapeMatcher = new PatternMatcher(/\\u\{[\dA-Fa-f]+\}/gu);
			const text = sourceCode.text.slice(...node.range);
			for (const match of codePointEscapeMatcher.execAll(text)) {
				const start = match.index;
				const end = start + match[0].length;
				const range = [start + node.range[0], end + node.range[0]];
				context.report({
					loc: {
						start: sourceCode.getLocFromIndex(range[0]),
						end: sourceCode.getLocFromIndex(range[1])
					},
					messageId: "disallow",
					fix(fixer) {
						const codePointStr = text.slice(start + 3, end - 1);
						let codePoint = Number(`0x${codePointStr}`);
						let replacement = null;
						if (codePoint <= 65535) replacement = toHex(codePoint);
						else {
							codePoint -= 65536;
							const highSurrogate = (codePoint >> 10) + 55296;
							const lowSurrogate = codePoint % 1024 + 56320;
							replacement = `${toHex(highSurrogate)}\\u${toHex(lowSurrogate)}`;
						}
						return fixer.replaceTextRange([range[0] + 2, range[1]], replacement);
					}
				});
			}
		}
		/**
		* Number to Hex
		*/
		function toHex(num) {
			return `0000${num.toString(16).toUpperCase()}`.substr(-4);
		}
	}
});

//#endregion
//#region lib/rules/no-useless-escape.ts
const coreRule = getCoreRule("no-useless-escape");
var no_useless_escape_default = createRule("no-useless-escape", {
	meta: {
		...coreRule.meta,
		docs: {
			description: "disallow unnecessary escape usage",
			recommended: [
				"json",
				"jsonc",
				"json5"
			],
			extensionRule: true,
			layout: false
		},
		fixable: coreRule.meta.fixable,
		hasSuggestions: coreRule.meta.hasSuggestions,
		schema: coreRule.meta.schema,
		messages: coreRule.meta.messages,
		type: coreRule.meta.type,
		deprecated: false,
		replacedBy: []
	},
	create(context) {
		return defineWrapperListener(coreRule, context, context.options);
	}
});

//#endregion
//#region lib/rules/object-curly-newline.ts
const OPTION_VALUE = { oneOf: [{
	type: "string",
	enum: ["always", "never"]
}, {
	type: "object",
	properties: {
		multiline: { type: "boolean" },
		minProperties: {
			type: "integer",
			minimum: 0
		},
		consistent: { type: "boolean" }
	},
	additionalProperties: false,
	minProperties: 1
}] };
/**
* Normalizes a given option value.
* @param value An option value to parse.
* @returns Normalized option object.
*/
function normalizeOptionValue(value) {
	let multiline = false;
	let minProperties = Number.POSITIVE_INFINITY;
	let consistent = false;
	if (value) if (value === "always") minProperties = 0;
	else if (value === "never") minProperties = Number.POSITIVE_INFINITY;
	else {
		multiline = Boolean(value.multiline);
		minProperties = value.minProperties || Number.POSITIVE_INFINITY;
		consistent = Boolean(value.consistent);
	}
	else consistent = true;
	return {
		multiline,
		minProperties,
		consistent
	};
}
/**
* Checks if a value is an object.
* @param value The value to check
* @returns `true` if the value is an object, otherwise `false`
*/
function isObject(value) {
	return typeof value === "object" && value !== null;
}
/**
* Checks if an option is a node-specific option
* @param option The option to check
* @returns `true` if the option is node-specific, otherwise `false`
*/
function isNodeSpecificOption(option) {
	return isObject(option) || typeof option === "string";
}
/**
* Normalizes a given option value.
* @param options An option value to parse.
* @returns {{
*   ObjectExpression: {multiline: boolean, minProperties: number, consistent: boolean},
*   ObjectPattern: {multiline: boolean, minProperties: number, consistent: boolean},
*   ImportDeclaration: {multiline: boolean, minProperties: number, consistent: boolean},
*   ExportNamedDeclaration : {multiline: boolean, minProperties: number, consistent: boolean}
* }} Normalized option object.
*/
function normalizeOptions(options) {
	if (isObject(options) && Object.values(options).some(isNodeSpecificOption)) return { JSONObjectExpression: normalizeOptionValue(options.ObjectExpression) };
	return { JSONObjectExpression: normalizeOptionValue(options) };
}
/**
* Determines if ObjectExpression, ObjectPattern, ImportDeclaration or ExportNamedDeclaration
* node needs to be checked for missing line breaks
* @param node Node under inspection
* @param options option specific to node type
* @param first First object property
* @param last Last object property
* @returns `true` if node needs to be checked for missing line breaks
*/
function areLineBreaksRequired(node, options, first, last) {
	const objectProperties = node.properties;
	return objectProperties.length >= options.minProperties || options.multiline && objectProperties.length > 0 && first.loc.start.line !== last.loc.end.line;
}
var object_curly_newline_default = createRule("object-curly-newline", {
	meta: {
		docs: {
			description: "enforce consistent line breaks inside braces",
			recommended: null,
			extensionRule: true,
			layout: true
		},
		type: "layout",
		fixable: "whitespace",
		schema: [{ oneOf: [OPTION_VALUE, {
			type: "object",
			properties: {
				ObjectExpression: OPTION_VALUE,
				ObjectPattern: OPTION_VALUE,
				ImportDeclaration: OPTION_VALUE,
				ExportDeclaration: OPTION_VALUE
			},
			additionalProperties: false,
			minProperties: 1
		}] }],
		messages: {
			unexpectedLinebreakBeforeClosingBrace: "Unexpected line break before this closing brace.",
			unexpectedLinebreakAfterOpeningBrace: "Unexpected line break after this opening brace.",
			expectedLinebreakBeforeClosingBrace: "Expected a line break before this closing brace.",
			expectedLinebreakAfterOpeningBrace: "Expected a line break after this opening brace."
		}
	},
	create(context) {
		const sourceCode = context.sourceCode;
		if (!sourceCode.parserServices.isJSON) return {};
		const normalizedOptions = normalizeOptions(context.options[0]);
		/**
		* Reports a given node if it violated this rule.
		* @param node A node to check. This is an ObjectExpression node.
		*/
		function check(node) {
			const options = normalizedOptions[node.type];
			const openBrace = sourceCode.getFirstToken(node, isOpeningBraceToken);
			const closeBrace = sourceCode.getLastToken(node, isClosingBraceToken);
			let first = sourceCode.getTokenAfter(openBrace, { includeComments: true });
			let last = sourceCode.getTokenBefore(closeBrace, { includeComments: true });
			const needsLineBreaks = areLineBreaksRequired(node, options, first, last);
			const hasCommentsFirstToken = isCommentToken(first);
			const hasCommentsLastToken = isCommentToken(last);
			/**
			* Use tokens or comments to check multiline or not.
			* But use only tokens to check whether line breaks are needed.
			* This allows:
			*     var obj = { // eslint-disable-line foo
			*         a: 1
			*     }
			*/
			first = sourceCode.getTokenAfter(openBrace);
			last = sourceCode.getTokenBefore(closeBrace);
			if (needsLineBreaks) {
				if (isTokenOnSameLine(openBrace, first)) context.report({
					messageId: "expectedLinebreakAfterOpeningBrace",
					node,
					loc: openBrace.loc,
					fix(fixer) {
						if (hasCommentsFirstToken) return null;
						return fixer.insertTextAfter(openBrace, "\n");
					}
				});
				if (isTokenOnSameLine(last, closeBrace)) context.report({
					messageId: "expectedLinebreakBeforeClosingBrace",
					node,
					loc: closeBrace.loc,
					fix(fixer) {
						if (hasCommentsLastToken) return null;
						return fixer.insertTextBefore(closeBrace, "\n");
					}
				});
			} else {
				const consistent = options.consistent;
				const hasLineBreakBetweenOpenBraceAndFirst = !isTokenOnSameLine(openBrace, first);
				const hasLineBreakBetweenCloseBraceAndLast = !isTokenOnSameLine(last, closeBrace);
				if (!consistent && hasLineBreakBetweenOpenBraceAndFirst || consistent && hasLineBreakBetweenOpenBraceAndFirst && !hasLineBreakBetweenCloseBraceAndLast) context.report({
					messageId: "unexpectedLinebreakAfterOpeningBrace",
					node,
					loc: openBrace.loc,
					fix(fixer) {
						if (hasCommentsFirstToken) return null;
						return fixer.removeRange([openBrace.range[1], first.range[0]]);
					}
				});
				if (!consistent && hasLineBreakBetweenCloseBraceAndLast || consistent && !hasLineBreakBetweenOpenBraceAndFirst && hasLineBreakBetweenCloseBraceAndLast) context.report({
					messageId: "unexpectedLinebreakBeforeClosingBrace",
					node,
					loc: closeBrace.loc,
					fix(fixer) {
						if (hasCommentsLastToken) return null;
						return fixer.removeRange([last.range[1], closeBrace.range[0]]);
					}
				});
			}
		}
		return { JSONObjectExpression: check };
	}
});

//#endregion
//#region lib/rules/object-curly-spacing.ts
/**
* Parses the options for this rule and returns an object containing the spacing option,
* the emptyObjects option, and two functions to determine if there should be spaces
* after the opening curly brace and before the closing curly brace, based on the options and the surrounding tokens.
* @param options The options passed to the rule.
* @param sourceCode The source code object, used to get nodes by range index.
* @returns An object containing the spacing option, the emptyObjects option, and two functions to determine if there should be spaces after the opening curly brace and before the closing curly brace.
*/
function parseOptions$2(options, sourceCode) {
	const spaced = options[0] ?? "never";
	/**
	* Determines whether an option is set, relative to the spacing option.
	* If spaced is "always", then check whether option is set to false.
	* If spaced is "never", then check whether option is set to true.
	* @param option The option to exclude.
	* @returns Whether or not the property is excluded.
	*/
	function isOptionSet(option) {
		return options[1] ? options[1][option] === (spaced === "never") : false;
	}
	const arraysInObjectsException = isOptionSet("arraysInObjects");
	const objectsInObjectsException = isOptionSet("objectsInObjects");
	const emptyObjects = options[1]?.emptyObjects ?? "ignore";
	/**
	* Determines if there should be a space after the opening curly brace,
	* based on the spacing option and the second token.
	* @param spaced The spacing option ("always" or "never").
	* @param second The second token after the opening curly brace.
	* @returns Whether or not there should be a space after the opening curly brace.
	*/
	function isOpeningCurlyBraceMustBeSpaced(spaced, _second) {
		return spaced === "always";
	}
	/**
	* Determines if there should be a space before the closing curly brace,
	* based on the spacing option and the penultimate token.
	* @param spaced The spacing option ("always" or "never").
	* @param penultimate The penultimate token before the closing curly brace.
	* @returns Whether or not there should be a space before the closing curly brace.
	*/
	function isClosingCurlyBraceMustBeSpaced(spaced, penultimate) {
		const targetPenultimateType = arraysInObjectsException && isClosingBracketToken(penultimate) ? "JSONArrayExpression" : objectsInObjectsException && isClosingBraceToken(penultimate) ? "JSONObjectExpression" : null;
		const node = sourceCode.getNodeByRangeIndex(penultimate.range[0]);
		return targetPenultimateType && node?.type === targetPenultimateType ? spaced === "never" : spaced === "always";
	}
	return {
		spaced,
		emptyObjects,
		isOpeningCurlyBraceMustBeSpaced,
		isClosingCurlyBraceMustBeSpaced
	};
}
var object_curly_spacing_default = createRule("object-curly-spacing", {
	meta: {
		docs: {
			description: "enforce consistent spacing inside braces",
			recommended: null,
			extensionRule: true,
			layout: true
		},
		type: "layout",
		fixable: "whitespace",
		schema: [{
			type: "string",
			enum: ["always", "never"]
		}, {
			type: "object",
			properties: {
				arraysInObjects: { type: "boolean" },
				objectsInObjects: { type: "boolean" },
				emptyObjects: {
					type: "string",
					enum: [
						"ignore",
						"always",
						"never"
					]
				}
			},
			additionalProperties: false
		}],
		messages: {
			requireSpaceBefore: "A space is required before '{{token}}'.",
			requireSpaceAfter: "A space is required after '{{token}}'.",
			unexpectedSpaceBefore: "There should be no space before '{{token}}'.",
			unexpectedSpaceAfter: "There should be no space after '{{token}}'.",
			requiredSpaceInEmptyObject: "A space is required in empty object.",
			unexpectedSpaceInEmptyObject: "There should be no space in empty object."
		}
	},
	create(context) {
		const sourceCode = context.sourceCode;
		if (!sourceCode.parserServices.isJSON) return {};
		const options = parseOptions$2(context.options, sourceCode);
		/**
		* Reports that there shouldn't be a space after the first token
		* @param node The node to report in the event of an error.
		* @param token The token to use for the report.
		*/
		function reportNoBeginningSpace(node, token) {
			const nextToken = sourceCode.getTokenAfter(token, { includeComments: true });
			context.report({
				node,
				loc: {
					start: token.loc.end,
					end: nextToken.loc.start
				},
				messageId: "unexpectedSpaceAfter",
				data: { token: token.value },
				fix(fixer) {
					return fixer.removeRange([token.range[1], nextToken.range[0]]);
				}
			});
		}
		/**
		* Reports that there shouldn't be a space before the last token
		* @param node The node to report in the event of an error.
		* @param token The token to use for the report.
		*/
		function reportNoEndingSpace(node, token) {
			const previousToken = sourceCode.getTokenBefore(token, { includeComments: true });
			context.report({
				node,
				loc: {
					start: previousToken.loc.end,
					end: token.loc.start
				},
				messageId: "unexpectedSpaceBefore",
				data: { token: token.value },
				fix(fixer) {
					return fixer.removeRange([previousToken.range[1], token.range[0]]);
				}
			});
		}
		/**
		* Reports that there should be a space after the first token
		* @param node The node to report in the event of an error.
		* @param token The token to use for the report.
		*/
		function reportRequiredBeginningSpace(node, token) {
			context.report({
				node,
				loc: token.loc,
				messageId: "requireSpaceAfter",
				data: { token: token.value },
				fix(fixer) {
					return fixer.insertTextAfter(token, " ");
				}
			});
		}
		/**
		* Reports that there should be a space before the last token
		* @param node The node to report in the event of an error.
		* @param token The token to use for the report.
		*/
		function reportRequiredEndingSpace(node, token) {
			context.report({
				node,
				loc: token.loc,
				messageId: "requireSpaceBefore",
				data: { token: token.value },
				fix(fixer) {
					return fixer.insertTextBefore(token, " ");
				}
			});
		}
		/**
		* Determines if spacing in curly braces is valid.
		* @param node The AST node to check.
		* @param first The first token to check (should be the opening brace)
		* @param second The second token to check (should be first after the opening brace)
		* @param penultimate The penultimate token to check (should be last before closing brace)
		* @param last The last token to check (should be closing brace)
		*/
		function validateBraceSpacing(node, spaced, openingToken, second, penultimate, closingToken) {
			if (isTokenOnSameLine(openingToken, second)) {
				const firstSpaced = sourceCode.isSpaceBetween(openingToken, second);
				if (options.isOpeningCurlyBraceMustBeSpaced(spaced, second)) {
					if (!firstSpaced) reportRequiredBeginningSpace(node, openingToken);
				} else if (firstSpaced && second.type !== "Line") reportNoBeginningSpace(node, openingToken);
			}
			if (isTokenOnSameLine(penultimate, closingToken)) {
				const lastSpaced = sourceCode.isSpaceBetween(penultimate, closingToken);
				if (options.isClosingCurlyBraceMustBeSpaced(spaced, penultimate)) {
					if (!lastSpaced) reportRequiredEndingSpace(node, closingToken);
				} else if (lastSpaced) reportNoEndingSpace(node, closingToken);
			}
		}
		/**
		* Gets '}' token of an object node.
		*
		* Because the last token of object patterns might be a type annotation,
		* this traverses tokens preceded by the last property, then returns the
		* first '}' token.
		* @param node The node to get. This node is an
		*      ObjectExpression or an ObjectPattern. And this node has one or
		*      more properties.
		* @returns '}' token.
		*/
		function getClosingBraceOfObject(node) {
			const lastProperty = node.properties[node.properties.length - 1];
			return sourceCode.getTokenAfter(lastProperty, isClosingBraceToken);
		}
		/**
		* Checks spacing in empty objects. Depending on the options, reports
		* if there is an unexpected space or if there is no space when there should be.
		* @param node The node to check.
		*/
		function checkSpaceInEmptyObject(node) {
			if (options.emptyObjects === "ignore") return;
			const openingToken = sourceCode.getFirstToken(node);
			const closingToken = sourceCode.getLastToken(node);
			const second = sourceCode.getTokenAfter(openingToken, { includeComments: true });
			if (second !== closingToken && isCommentToken(second)) {
				const penultimate = sourceCode.getTokenBefore(closingToken, { includeComments: true });
				validateBraceSpacing(node, options.emptyObjects, openingToken, second, penultimate, closingToken);
				return;
			}
			if (!isTokenOnSameLine(openingToken, closingToken)) return;
			const sourceBetween = sourceCode.text.slice(openingToken.range[1], closingToken.range[0]);
			if (sourceBetween.trim() !== "") return;
			if (options.emptyObjects === "always") {
				if (sourceBetween) return;
				context.report({
					node,
					loc: {
						start: openingToken.loc.end,
						end: closingToken.loc.start
					},
					messageId: "requiredSpaceInEmptyObject",
					fix(fixer) {
						return fixer.replaceTextRange([openingToken.range[1], closingToken.range[0]], " ");
					}
				});
			} else if (options.emptyObjects === "never") {
				if (!sourceBetween) return;
				context.report({
					node,
					loc: {
						start: openingToken.loc.end,
						end: closingToken.loc.start
					},
					messageId: "unexpectedSpaceInEmptyObject",
					fix(fixer) {
						return fixer.removeRange([openingToken.range[1], closingToken.range[0]]);
					}
				});
			}
		}
		/**
		* Reports a given object node if spacing in curly braces is invalid.
		* @param node An ObjectExpression or ObjectPattern node to check.
		*/
		function checkForObject(node) {
			if (node.properties.length === 0) {
				checkSpaceInEmptyObject(node);
				return;
			}
			const openingToken = sourceCode.getFirstToken(node);
			const closingToken = getClosingBraceOfObject(node);
			const second = sourceCode.getTokenAfter(openingToken, { includeComments: true });
			const penultimate = sourceCode.getTokenBefore(closingToken, { includeComments: true });
			validateBraceSpacing(node, options.spaced, openingToken, second, penultimate, closingToken);
		}
		return { JSONObjectExpression: checkForObject };
	}
});

//#endregion
//#region lib/rules/object-property-newline.ts
var object_property_newline_default = createRule("object-property-newline", {
	meta: {
		docs: {
			description: "enforce placing object properties on separate lines",
			recommended: null,
			extensionRule: true,
			layout: true
		},
		type: "layout",
		schema: [{
			type: "object",
			properties: {
				allowAllPropertiesOnSameLine: {
					type: "boolean",
					default: false
				},
				allowMultiplePropertiesPerLine: {
					type: "boolean",
					default: false
				}
			},
			additionalProperties: false
		}],
		fixable: "whitespace",
		messages: {
			propertiesOnNewlineAll: "Object properties must go on a new line if they aren't all on the same line.",
			propertiesOnNewline: "Object properties must go on a new line."
		}
	},
	create(context) {
		const sourceCode = context.sourceCode;
		if (!sourceCode.parserServices.isJSON) return {};
		const allowSameLine = context.options[0] && (context.options[0].allowAllPropertiesOnSameLine || context.options[0].allowMultiplePropertiesPerLine);
		const messageId = allowSameLine ? "propertiesOnNewlineAll" : "propertiesOnNewline";
		return { JSONObjectExpression(node) {
			if (allowSameLine) {
				if (node.properties.length > 1) {
					const firstTokenOfFirstProperty = sourceCode.getFirstToken(node.properties[0]);
					const lastTokenOfLastProperty = sourceCode.getLastToken(node.properties[node.properties.length - 1]);
					if (firstTokenOfFirstProperty.loc.end.line === lastTokenOfLastProperty.loc.start.line) return;
				}
			}
			for (let i = 1; i < node.properties.length; i++) {
				const lastTokenOfPreviousProperty = sourceCode.getLastToken(node.properties[i - 1]);
				const firstTokenOfCurrentProperty = sourceCode.getFirstToken(node.properties[i]);
				if (lastTokenOfPreviousProperty.loc.end.line === firstTokenOfCurrentProperty.loc.start.line) context.report({
					node,
					loc: firstTokenOfCurrentProperty.loc,
					messageId,
					fix(fixer) {
						const rangeAfterComma = [sourceCode.getTokenBefore(firstTokenOfCurrentProperty).range[1], firstTokenOfCurrentProperty.range[0]];
						if (sourceCode.text.slice(rangeAfterComma[0], rangeAfterComma[1]).trim()) return null;
						return fixer.replaceTextRange(rangeAfterComma, "\n");
					}
				});
			}
		} };
	}
});

//#endregion
//#region lib/utils/eslint-keywords.ts
/**
* @fileoverview A shared list of ES3 keywords.
* @author Josh Perez
*/
const keywords = [
	"abstract",
	"boolean",
	"break",
	"byte",
	"case",
	"catch",
	"char",
	"class",
	"const",
	"continue",
	"debugger",
	"default",
	"delete",
	"do",
	"double",
	"else",
	"enum",
	"export",
	"extends",
	"false",
	"final",
	"finally",
	"float",
	"for",
	"function",
	"goto",
	"if",
	"implements",
	"import",
	"in",
	"instanceof",
	"int",
	"interface",
	"long",
	"native",
	"new",
	"null",
	"package",
	"private",
	"protected",
	"public",
	"return",
	"short",
	"static",
	"super",
	"switch",
	"synchronized",
	"this",
	"throw",
	"throws",
	"transient",
	"true",
	"try",
	"typeof",
	"var",
	"void",
	"volatile",
	"while",
	"with"
];

//#endregion
//#region lib/rules/quote-props.ts
var quote_props_default = createRule("quote-props", {
	meta: {
		docs: {
			description: "require quotes around object literal property names",
			recommended: ["json", "jsonc"],
			extensionRule: true,
			layout: true
		},
		type: "layout",
		schema: { anyOf: [{
			type: "array",
			items: [{
				type: "string",
				enum: [
					"always",
					"as-needed",
					"consistent",
					"consistent-as-needed"
				]
			}],
			minItems: 0,
			maxItems: 1
		}, {
			type: "array",
			items: [{
				type: "string",
				enum: [
					"always",
					"as-needed",
					"consistent",
					"consistent-as-needed"
				]
			}, {
				type: "object",
				properties: {
					keywords: { type: "boolean" },
					unnecessary: { type: "boolean" },
					numbers: { type: "boolean" }
				},
				additionalProperties: false
			}],
			minItems: 0,
			maxItems: 2
		}] },
		fixable: "code",
		messages: {
			requireQuotesDueToReservedWord: "Properties should be quoted as '{{property}}' is a reserved word.",
			inconsistentlyQuotedProperty: "Inconsistently quoted property '{{key}}' found.",
			unnecessarilyQuotedProperty: "Unnecessarily quoted property '{{property}}' found.",
			unquotedReservedProperty: "Unquoted reserved word '{{property}}' used as key.",
			unquotedNumericProperty: "Unquoted number literal '{{property}}' used as key.",
			unquotedPropertyFound: "Unquoted property '{{property}}' found.",
			redundantQuoting: "Properties shouldn't be quoted as all quotes are redundant."
		}
	},
	create(context) {
		const sourceCode = context.sourceCode;
		if (!sourceCode.parserServices.isJSON) return {};
		const MODE = context.options[0] || "always";
		const KEYWORDS = context.options[1] && context.options[1].keywords;
		const CHECK_UNNECESSARY = !context.options[1] || context.options[1].unnecessary !== false;
		const NUMBERS = context.options[1] && context.options[1].numbers;
		/**
		* Checks whether a certain string constitutes an ES3 token
		* @param tokenStr The string to be checked.
		* @returns `true` if it is an ES3 token.
		*/
		function isKeyword(tokenStr) {
			return keywords.includes(tokenStr);
		}
		/**
		* Checks if an espree-tokenized key has redundant quotes (i.e. whether quotes are unnecessary)
		* @param rawKey The raw key value from the source
		* @param tokens The espree-tokenized node key
		* @param [skipNumberLiterals] Indicates whether number literals should be checked
		* @returns Whether or not a key has redundant quotes.
		* @private
		*/
		function areQuotesRedundant(rawKey, tokens, skipNumberLiterals = false) {
			return tokens.length === 1 && tokens[0].start === 0 && tokens[0].end === rawKey.length && ([
				"Identifier",
				"Keyword",
				"Null",
				"Boolean"
			].includes(tokens[0].type) || tokens[0].type === "Numeric" && !skipNumberLiterals && String(Number(tokens[0].value)) === tokens[0].value);
		}
		/**
		* Returns a string representation of a property node with quotes removed
		* @param key Key AST Node, which may or may not be quoted
		* @returns A replacement string for this property
		*/
		function getUnquotedKey(key) {
			return key.type === "JSONIdentifier" ? key.name : String(key.value);
		}
		/**
		* Returns a string representation of a property node with quotes added
		* @param key Key AST Node, which may or may not be quoted
		* @returns A replacement string for this property
		*/
		function getQuotedKey(key) {
			if (key.type === "JSONLiteral" && typeof key.value === "string") return sourceCode.getText(key);
			return `"${key.type === "JSONIdentifier" ? key.name : key.value}"`;
		}
		/**
		* Ensures that a property's key is quoted only when necessary
		* @param node Property AST node
		*/
		function checkUnnecessaryQuotes(node) {
			const key = node.key;
			if (node.method || node.computed || node.shorthand) return;
			if (key.type === "JSONLiteral" && typeof key.value === "string") {
				let tokens;
				try {
					tokens = tokenize(key.value);
				} catch {
					return;
				}
				if (tokens.length !== 1) return;
				if (isKeyword(tokens[0].value) && KEYWORDS) return;
				if (CHECK_UNNECESSARY && areQuotesRedundant(key.value, tokens, NUMBERS)) context.report({
					node,
					messageId: "unnecessarilyQuotedProperty",
					data: { property: key.value },
					fix: (fixer) => fixer.replaceText(key, getUnquotedKey(key))
				});
			} else if (KEYWORDS && key.type === "JSONIdentifier" && isKeyword(key.name)) context.report({
				node,
				messageId: "unquotedReservedProperty",
				data: { property: key.name },
				fix: (fixer) => fixer.replaceText(key, getQuotedKey(key))
			});
			else if (NUMBERS && key.type === "JSONLiteral" && isNumericLiteral(key)) context.report({
				node,
				messageId: "unquotedNumericProperty",
				data: { property: String(key.value) },
				fix: (fixer) => fixer.replaceText(key, getQuotedKey(key))
			});
		}
		/**
		* Ensures that a property's key is quoted
		* @param node Property AST node
		*/
		function checkOmittedQuotes(node) {
			const key = node.key;
			if (!node.method && !node.computed && !node.shorthand && !(key.type === "JSONLiteral" && typeof key.value === "string")) context.report({
				node,
				messageId: "unquotedPropertyFound",
				data: { property: key.name || key.value },
				fix: (fixer) => fixer.replaceText(key, getQuotedKey(key))
			});
		}
		/**
		* Ensures that an object's keys are consistently quoted, optionally checks for redundancy of quotes
		* @param node Property AST node
		* @param checkQuotesRedundancy Whether to check quotes' redundancy
		*/
		function checkConsistency(node, checkQuotesRedundancy) {
			const quotedProps = [];
			const unquotedProps = [];
			let keywordKeyName = null;
			let necessaryQuotes = false;
			node.properties.forEach((rawProperty) => {
				const property = rawProperty;
				const key = property.key;
				if (!key || property.method || property.computed || property.shorthand) return;
				if (key.type === "JSONLiteral" && typeof key.value === "string") {
					quotedProps.push(property);
					if (checkQuotesRedundancy) {
						let tokens;
						try {
							tokens = tokenize(key.value);
						} catch {
							necessaryQuotes = true;
							return;
						}
						necessaryQuotes = necessaryQuotes || !areQuotesRedundant(key.value, tokens) || KEYWORDS && isKeyword(tokens[0].value);
					}
				} else if (KEYWORDS && checkQuotesRedundancy && key.type === "JSONIdentifier" && isKeyword(key.name)) {
					unquotedProps.push(property);
					necessaryQuotes = true;
					keywordKeyName = key.name;
				} else unquotedProps.push(property);
			});
			if (checkQuotesRedundancy && quotedProps.length && !necessaryQuotes) quotedProps.forEach((property) => {
				const key = property.key;
				context.report({
					node: property,
					messageId: "redundantQuoting",
					fix: (fixer) => fixer.replaceText(key, getUnquotedKey(key))
				});
			});
			else if (unquotedProps.length && keywordKeyName) unquotedProps.forEach((property) => {
				context.report({
					node: property,
					messageId: "requireQuotesDueToReservedWord",
					data: { property: keywordKeyName },
					fix: (fixer) => fixer.replaceText(property.key, getQuotedKey(property.key))
				});
			});
			else if (quotedProps.length && unquotedProps.length) unquotedProps.forEach((property) => {
				context.report({
					node: property,
					messageId: "inconsistentlyQuotedProperty",
					data: { key: property.key.name || property.key.value },
					fix: (fixer) => fixer.replaceText(property.key, getQuotedKey(property.key))
				});
			});
		}
		return {
			JSONProperty(node) {
				if (MODE === "always" || !MODE) checkOmittedQuotes(node);
				if (MODE === "as-needed") checkUnnecessaryQuotes(node);
			},
			JSONObjectExpression(node) {
				if (MODE === "consistent") checkConsistency(node, false);
				if (MODE === "consistent-as-needed") checkConsistency(node, true);
			}
		};
	}
});

//#endregion
//#region lib/rules/quotes.ts
/**
* Switches quoting of javascript string between ' " and `
* escaping and unescaping as necessary.
* Only escaping of the minimal set of characters is changed.
* Note: escaping of newlines when switching from backtick to other quotes is not handled.
* @param str A string to convert.
* @returns The string with changed quotes.
* @private
*/
function switchQuote(str) {
	const newQuote = this.quote;
	const oldQuote = str[0];
	if (newQuote === oldQuote) return str;
	return newQuote + str.slice(1, -1).replace(/\\(\$\{|\r\n?|\n|.)|["'`]|\$\{|(\r\n?|\n)/gu, (match, escaped, newline) => {
		if (escaped === oldQuote || oldQuote === "`" && escaped === "${") return escaped;
		if (match === newQuote || newQuote === "`" && match === "${") return `\\${match}`;
		if (newline && oldQuote === "`") return "\\n";
		return match;
	}) + newQuote;
}
const QUOTE_SETTINGS = {
	double: {
		quote: "\"",
		alternateQuote: "'",
		description: "doublequote",
		convert: switchQuote
	},
	single: {
		quote: "'",
		alternateQuote: "\"",
		description: "singlequote",
		convert: switchQuote
	},
	backtick: {
		quote: "`",
		alternateQuote: "\"",
		description: "backtick",
		convert: switchQuote
	}
};
const UNESCAPED_LINEBREAK_PATTERN = new RegExp(String.raw`(^|[^\\])(\\\\)*[${Array.from(LINEBREAKS).join("")}]`, "u");
const AVOID_ESCAPE = "avoid-escape";
var quotes_default = createRule("quotes", {
	meta: {
		docs: {
			description: "enforce use of double or single quotes",
			recommended: ["json", "jsonc"],
			extensionRule: true,
			layout: true
		},
		type: "layout",
		fixable: "code",
		schema: [{
			type: "string",
			enum: [
				"single",
				"double",
				"backtick"
			]
		}, { anyOf: [{
			type: "string",
			enum: ["avoid-escape"]
		}, {
			type: "object",
			properties: {
				avoidEscape: { type: "boolean" },
				allowTemplateLiterals: { type: "boolean" }
			},
			additionalProperties: false
		}] }],
		messages: { wrongQuotes: "Strings must use {{description}}." }
	},
	create(context) {
		const sourceCode = context.sourceCode;
		if (!sourceCode.parserServices.isJSON) return {};
		let quoteOption = context.options[0];
		if (quoteOption === "backtick") quoteOption = "double";
		const settings = QUOTE_SETTINGS[quoteOption || "double"];
		const options = context.options[1];
		const allowTemplateLiterals = options && typeof options === "object" && options.allowTemplateLiterals === true;
		let avoidEscape = options && typeof options === "object" && options.avoidEscape === true;
		if (options === AVOID_ESCAPE) avoidEscape = true;
		/**
		* Checks whether or not a given TemplateLiteral node is actually using any of the special features provided by template literal strings.
		* @param node A TemplateLiteral node to check.
		* @returns Whether or not the TemplateLiteral node is using any of the special features provided by template literal strings.
		* @private
		*/
		function isUsingFeatureOfTemplateLiteral(node) {
			if (node.expressions.length > 0) return true;
			if (node.quasis.length >= 1 && UNESCAPED_LINEBREAK_PATTERN.test(node.quasis[0].value.raw)) return true;
			return false;
		}
		return {
			JSONLiteral(node) {
				const val = node.value;
				const rawVal = node.raw;
				if (settings && typeof val === "string") {
					let isValid = isSurroundedBy(rawVal, settings.quote);
					if (!isValid && avoidEscape) isValid = isSurroundedBy(rawVal, settings.alternateQuote) && rawVal.includes(settings.quote);
					if (!isValid) context.report({
						node,
						messageId: "wrongQuotes",
						data: { description: settings.description },
						fix(fixer) {
							return fixer.replaceText(node, settings.convert(node.raw));
						}
					});
				}
			},
			JSONTemplateLiteral(node) {
				if (allowTemplateLiterals || isUsingFeatureOfTemplateLiteral(node)) return;
				context.report({
					node,
					messageId: "wrongQuotes",
					data: { description: settings.description },
					fix(fixer) {
						return fixer.replaceText(node, settings.convert(sourceCode.getText(node)));
					}
				});
			}
		};
	}
});

//#endregion
//#region lib/utils/fix-sort-elements.ts
/**
* Fixed by moving the target element down for sorting.
*/
function* fixToMoveDownForSorting(fixer, sourceCode, target, to) {
	const targetInfo = calcTargetMoveDownInfo(sourceCode, target);
	const toEndInfo = getElementEndInfo(sourceCode, to);
	let { insertCode, removeRanges, hasLeadingComma } = targetInfo;
	if (toEndInfo.trailingComma) {
		if (hasLeadingComma && toEndInfo.last.range[1] <= toEndInfo.trailingComma.range[0]) yield fixer.removeRange(toEndInfo.trailingComma.range);
		hasLeadingComma = true;
		insertCode = targetInfo.withTrailingComma.insertCode;
		removeRanges = targetInfo.withTrailingComma.removeRanges;
	}
	let insertRange = [toEndInfo.last.range[1], toEndInfo.last.range[1]];
	const toNextToken = sourceCode.getTokenAfter(toEndInfo.last, { includeComments: true });
	if (toNextToken.loc.start.line - toEndInfo.last.loc.end.line > 1) {
		const offset = sourceCode.getIndexFromLoc({
			line: toNextToken.loc.start.line - 1,
			column: 0
		});
		insertRange = [offset, offset];
	}
	if (!hasLeadingComma) if (to.node) yield fixer.insertTextAfterRange(getLastTokenOfNode(sourceCode, to.node).range, ",");
	else yield fixer.insertTextBeforeRange(to.after.range, ",");
	yield fixer.insertTextAfterRange(insertRange, insertCode);
	for (const removeRange of removeRanges) yield fixer.removeRange(removeRange);
}
/**
* Fixed by moving the target element up for sorting.
*/
function* fixToMoveUpForSorting(fixer, sourceCode, target, to) {
	const targetInfo = calcTargetMoveUpInfo(sourceCode, target);
	const toPrevInfo = getPrevElementInfo(sourceCode, to);
	if (toPrevInfo.leadingComma && toPrevInfo.prevLast.range[1] <= toPrevInfo.leadingComma.range[0]) yield fixer.removeRange(toPrevInfo.leadingComma.range);
	let insertRange = [toPrevInfo.prevLast.range[1], toPrevInfo.prevLast.range[1]];
	const toBeforeNextToken = sourceCode.getTokenAfter(toPrevInfo.prevLast, { includeComments: true });
	if (toBeforeNextToken.loc.start.line - toPrevInfo.prevLast.loc.end.line > 1) {
		const offset = sourceCode.getIndexFromLoc({
			line: toBeforeNextToken.loc.start.line - 1,
			column: 0
		});
		insertRange = [offset, offset];
	}
	yield fixer.insertTextAfterRange(insertRange, targetInfo.insertCode);
	for (const removeRange of targetInfo.removeRanges) yield fixer.removeRange(removeRange);
}
/**
* Calculate the fix information of the target element to be moved down for sorting.
*/
function calcTargetMoveDownInfo(sourceCode, target) {
	const nodeStartIndex = target.node ? getFirstTokenOfNode(sourceCode, target.node).range[0] : target.before.range[1];
	const endInfo = getElementEndInfo(sourceCode, target);
	const prevInfo = getPrevElementInfo(sourceCode, target);
	let insertCode = sourceCode.text.slice(prevInfo.prevLast.range[1], nodeStartIndex);
	const removeRanges = [[prevInfo.prevLast.range[1], nodeStartIndex]];
	const hasLeadingComma = prevInfo.leadingComma && prevInfo.prevLast.range[1] <= prevInfo.leadingComma.range[0];
	let withTrailingComma;
	const suffixRange = [nodeStartIndex, endInfo.last.range[1]];
	const suffix = sourceCode.text.slice(...suffixRange);
	if (endInfo.trailingComma && endInfo.trailingComma.range[1] <= endInfo.last.range[1]) {
		withTrailingComma = {
			insertCode: `${insertCode}${suffix}`,
			removeRanges: [...removeRanges, suffixRange]
		};
		insertCode += `${sourceCode.text.slice(nodeStartIndex, endInfo.trailingComma.range[0])}${sourceCode.text.slice(endInfo.trailingComma.range[1], endInfo.last.range[1])}`;
		if (!hasLeadingComma) {
			if (endInfo.trailingComma) removeRanges.push(endInfo.trailingComma.range);
		}
		removeRanges.push([nodeStartIndex, endInfo.trailingComma.range[0]], [endInfo.trailingComma.range[1], endInfo.last.range[1]]);
	} else {
		if (!hasLeadingComma) {
			if (endInfo.trailingComma) removeRanges.push(endInfo.trailingComma.range);
		}
		withTrailingComma = {
			insertCode: `${insertCode},${suffix}`,
			removeRanges: [...removeRanges, suffixRange]
		};
		insertCode += suffix;
		removeRanges.push(suffixRange);
	}
	return {
		insertCode,
		removeRanges,
		hasLeadingComma: Boolean(hasLeadingComma),
		withTrailingComma
	};
}
/**
* Calculate the fix information of the target element to be moved up for sorting.
*/
function calcTargetMoveUpInfo(sourceCode, target) {
	const nodeEndIndex = target.node ? getLastTokenOfNode(sourceCode, target.node).range[1] : target.after.range[0];
	const endInfo = getElementEndInfo(sourceCode, target);
	const prevInfo = getPrevElementInfo(sourceCode, target);
	let insertCode;
	const removeRanges = [];
	if (prevInfo.leadingComma && prevInfo.prevLast.range[1] <= prevInfo.leadingComma.range[0]) {
		insertCode = `${sourceCode.text.slice(prevInfo.prevLast.range[1], prevInfo.leadingComma.range[0])}${sourceCode.text.slice(prevInfo.leadingComma.range[1], nodeEndIndex)}`;
		removeRanges.push([prevInfo.prevLast.range[1], prevInfo.leadingComma.range[0]], [prevInfo.leadingComma.range[1], nodeEndIndex]);
	} else {
		insertCode = sourceCode.text.slice(prevInfo.prevLast.range[1], nodeEndIndex);
		removeRanges.push([prevInfo.prevLast.range[1], nodeEndIndex]);
	}
	if (!(endInfo.trailingComma && endInfo.trailingComma.range[1] <= endInfo.last.range[1])) {
		insertCode += ",";
		if (prevInfo.leadingComma) removeRanges.push(prevInfo.leadingComma.range);
	}
	insertCode += sourceCode.text.slice(nodeEndIndex, endInfo.last.range[1]);
	removeRanges.push([nodeEndIndex, endInfo.last.range[1]]);
	return {
		insertCode,
		removeRanges
	};
}
/**
* Get the first token of the node.
*/
function getFirstTokenOfNode(sourceCode, node) {
	let token = sourceCode.getFirstToken(node);
	let target = token;
	while ((target = sourceCode.getTokenBefore(token)) && isOpeningParenToken(target)) token = target;
	return token;
}
/**
* Get the last token of the node.
*/
function getLastTokenOfNode(sourceCode, node) {
	let token = sourceCode.getLastToken(node);
	let target = token;
	while ((target = sourceCode.getTokenAfter(token)) && isClosingParenToken(target)) token = target;
	return token;
}
/**
* Get the end of the target element and the next element and token information.
*/
function getElementEndInfo(sourceCode, target) {
	const afterToken = target.node ? sourceCode.getTokenAfter(getLastTokenOfNode(sourceCode, target.node)) : target.after;
	if (isNotCommaToken(afterToken)) return {
		trailingComma: null,
		nextElement: null,
		last: getLastTokenWithTrailingComments(sourceCode, target)
	};
	const comma = afterToken;
	const nextElement = sourceCode.getTokenAfter(afterToken);
	if (isCommaToken(nextElement)) return {
		trailingComma: comma,
		nextElement: null,
		last: comma
	};
	if (isClosingBraceToken(nextElement) || isClosingBracketToken(nextElement)) return {
		trailingComma: comma,
		nextElement: null,
		last: getLastTokenWithTrailingComments(sourceCode, target)
	};
	const node = target.node;
	if (node && node.loc.end.line === nextElement.loc.start.line) return {
		trailingComma: comma,
		nextElement,
		last: comma
	};
	if (node && node.loc.end.line < comma.loc.start.line && comma.loc.end.line < nextElement.loc.start.line) return {
		trailingComma: comma,
		nextElement,
		last: comma
	};
	return {
		trailingComma: comma,
		nextElement,
		last: getLastTokenWithTrailingComments(sourceCode, target)
	};
}
/**
* Get the last token of the target element with trailing comments.
*/
function getLastTokenWithTrailingComments(sourceCode, target) {
	if (!target.node) return sourceCode.getTokenBefore(target.after, { includeComments: true });
	const node = target.node;
	let last = getLastTokenOfNode(sourceCode, node);
	let after;
	while ((after = sourceCode.getTokenAfter(last, { includeComments: true })) && (isCommentToken(after) || isCommaToken(after)) && node.loc.end.line === after.loc.end.line) last = after;
	return last;
}
/**
* Get the previous element and token information.
*/
function getPrevElementInfo(sourceCode, target) {
	const beforeToken = target.node ? sourceCode.getTokenBefore(getFirstTokenOfNode(sourceCode, target.node)) : target.before;
	if (isNotCommaToken(beforeToken)) return {
		prevElement: null,
		leadingComma: null,
		prevLast: beforeToken
	};
	const comma = beforeToken;
	const prevElement = sourceCode.getTokenBefore(beforeToken);
	if (isCommaToken(prevElement)) return {
		prevElement: null,
		leadingComma: comma,
		prevLast: comma
	};
	const endInfo = getElementEndInfo(sourceCode, { node: prevElement });
	return {
		prevElement,
		leadingComma: endInfo.trailingComma,
		prevLast: endInfo.last
	};
}

//#endregion
//#region lib/utils/calc-shortest-edit-script.ts
const diff = diffBase.default || diffBase;
/**
* Given the contents of two sequences, returns diff information.
* @param a The first sequence.
* @param b The second sequence.
* @param [options] The options object.
* @param [options.isEqual] A function that returns true if two elements are equal.
* @returns An array of diff objects.
*/
function calcShortestEditScript(a, b) {
	let aIndex = 0;
	let bIndex = 0;
	const result = [];
	diff(a.length, b.length, (aIndex, bIndex) => a[aIndex] === b[bIndex], (nCommon, aCommon, bCommon) => {
		pushDelIns(aIndex, aCommon, bIndex, bCommon);
		aIndex = aCommon + nCommon;
		bIndex = bCommon + nCommon;
		if (nCommon > 0) for (let index = 0; index < nCommon; index++) {
			const elementA = a[aCommon + index];
			const elementB = b[bCommon + index];
			result.push({
				type: "common",
				a: elementA,
				b: elementB
			});
		}
	});
	pushDelIns(aIndex, a.length, bIndex, b.length);
	return result;
	/**
	* Pushes delete and insert sequences to the result.
	* @param aStart The start index of the delete sequence in `a`.
	* @param aEnd The end index of the delete sequence in `a`.
	* @param bStart The start index of the insert sequence in `b`.
	* @param bEnd The end index of the insert sequence in `b`.
	*/
	function pushDelIns(aStart, aEnd, bStart, bEnd) {
		for (const element of a.slice(aStart, aEnd)) result.push({
			type: "delete",
			a: element
		});
		for (const element of b.slice(bStart, bEnd)) result.push({
			type: "insert",
			b: element
		});
	}
}

//#endregion
//#region lib/rules/sort-array-values.ts
var JSONElementData = class {
	array;
	node;
	index;
	cached = null;
	cachedAround = null;
	get reportLoc() {
		if (this.node) return this.node.loc;
		const around = this.around;
		return {
			start: around.before.loc.end,
			end: around.after.loc.start
		};
	}
	get around() {
		if (this.cachedAround) return this.cachedAround;
		const sourceCode = this.array.sourceCode;
		if (this.node) return this.cachedAround = {
			node: this.node,
			before: sourceCode.getTokenBefore(this.node),
			after: sourceCode.getTokenAfter(this.node)
		};
		const before = this.index > 0 ? this.array.elements[this.index - 1].around.after : sourceCode.getFirstToken(this.array.node);
		return this.cachedAround = {
			before,
			after: sourceCode.getTokenAfter(before)
		};
	}
	constructor(array, node, index) {
		this.array = array;
		this.node = node;
		this.index = index;
	}
	get value() {
		return (this.cached ?? (this.cached = { value: this.node == null ? null : getStaticJSONValue(this.node) })).value;
	}
};
var JSONArrayData = class {
	node;
	sourceCode;
	cachedElements = null;
	constructor(node, sourceCode) {
		this.node = node;
		this.sourceCode = sourceCode;
	}
	get elements() {
		return this.cachedElements ??= this.node.elements.map((e, index) => new JSONElementData(this, e, index));
	}
};
/**
* Build function which check that the given 2 names are in specific order.
*/
function buildValidatorFromType$1(order, insensitive, natural) {
	let compareValue = ([a, b]) => a <= b;
	let compareText = compareValue;
	if (natural) compareText = ([a, b]) => naturalCompare(a, b) <= 0;
	if (insensitive) {
		const baseCompareText = compareText;
		compareText = ([a, b]) => baseCompareText([a.toLowerCase(), b.toLowerCase()]);
	}
	if (order === "desc") {
		const baseCompareText = compareText;
		compareText = (args) => baseCompareText(args.reverse());
		const baseCompareValue = compareValue;
		compareValue = (args) => baseCompareValue(args.reverse());
	}
	return (a, b) => {
		if (typeof a.value === "string" && typeof b.value === "string") return compareText([a.value, b.value]);
		const type = getJSONPrimitiveType(a.value);
		if (type && type === getJSONPrimitiveType(b.value)) return compareValue([a.value, b.value]);
		return true;
	};
}
/**
* Parse options
*/
function parseOptions$1(options) {
	return options.map((opt) => {
		const order = opt.order;
		const pathPattern = new RegExp(opt.pathPattern);
		const minValues = opt.minValues ?? 2;
		if (!Array.isArray(order)) {
			const type = order.type ?? "asc";
			const insensitive = order.caseSensitive === false;
			const natural = Boolean(order.natural);
			return {
				isTargetArray,
				ignore: () => false,
				isValidOrder: buildValidatorFromType$1(type, insensitive, natural),
				orderText(data) {
					if (typeof data.value === "string") return `${natural ? "natural " : ""}${insensitive ? "insensitive " : ""}${type}ending`;
					return `${type}ending`;
				}
			};
		}
		const parsedOrder = [];
		for (const o of order) if (typeof o === "string") parsedOrder.push({
			test: (v) => v.value === o,
			isValidNestOrder: () => true
		});
		else {
			const valuePattern = o.valuePattern ? new RegExp(o.valuePattern) : null;
			const nestOrder = o.order ?? {};
			const type = nestOrder.type ?? "asc";
			const insensitive = nestOrder.caseSensitive === false;
			const natural = Boolean(nestOrder.natural);
			parsedOrder.push({
				test: (v) => valuePattern ? Boolean(getJSONPrimitiveType(v.value)) && valuePattern.test(String(v.value)) : true,
				isValidNestOrder: buildValidatorFromType$1(type, insensitive, natural)
			});
		}
		return {
			isTargetArray,
			ignore: (v) => parsedOrder.every((p) => !p.test(v)),
			isValidOrder(a, b) {
				for (const p of parsedOrder) {
					const matchA = p.test(a);
					const matchB = p.test(b);
					if (!matchA || !matchB) {
						if (matchA) return true;
						if (matchB) return false;
						continue;
					}
					return p.isValidNestOrder(a, b);
				}
				return false;
			},
			orderText: () => "specified"
		};
		/**
		* Checks whether given node data is verify target
		*/
		function isTargetArray(data) {
			if (data.node.elements.length < minValues) return false;
			let path = "";
			let curr = data.node;
			let p = curr.parent;
			while (p) {
				if (p.type === "JSONProperty") {
					const name = getPropertyName(p);
					if (/^[$a-z_][\w$]*$/iu.test(name)) path = `.${name}${path}`;
					else path = `[${JSON.stringify(name)}]${path}`;
				} else if (p.type === "JSONArrayExpression") path = `[${p.elements.indexOf(curr)}]${path}`;
				curr = p;
				p = curr.parent;
			}
			if (path.startsWith(".")) path = path.slice(1);
			return pathPattern.test(path);
		}
	});
	/**
	* Gets the property name of the given `Property` node.
	*/
	function getPropertyName(node) {
		const prop = node.key;
		if (prop.type === "JSONIdentifier") return prop.name;
		return String(getStaticJSONValue(prop));
	}
}
/**
* Get the type name from given value when value is primitive like value
*/
function getJSONPrimitiveType(val) {
	const t = typeof val;
	if (t === "string" || t === "number" || t === "boolean" || t === "bigint") return t;
	if (val === null) return "null";
	if (val === void 0) return "undefined";
	if (val instanceof RegExp) return "regexp";
	return null;
}
const ORDER_OBJECT_SCHEMA$1 = {
	type: "object",
	properties: {
		type: { enum: ["asc", "desc"] },
		caseSensitive: { type: "boolean" },
		natural: { type: "boolean" }
	},
	additionalProperties: false
};
var sort_array_values_default = createRule("sort-array-values", {
	meta: {
		docs: {
			description: "require array values to be sorted",
			recommended: null,
			extensionRule: false,
			layout: false
		},
		fixable: "code",
		schema: {
			type: "array",
			items: {
				type: "object",
				properties: {
					pathPattern: { type: "string" },
					order: { oneOf: [{
						type: "array",
						items: { anyOf: [{ type: "string" }, {
							type: "object",
							properties: {
								valuePattern: { type: "string" },
								order: ORDER_OBJECT_SCHEMA$1
							},
							additionalProperties: false
						}] },
						uniqueItems: true
					}, ORDER_OBJECT_SCHEMA$1] },
					minValues: {
						type: "integer",
						minimum: 2
					}
				},
				required: ["pathPattern", "order"],
				additionalProperties: false
			},
			minItems: 1
		},
		messages: {
			shouldBeBefore: "Expected array values to be in {{orderText}} order. '{{thisValue}}' should be before '{{targetValue}}'.",
			shouldBeAfter: "Expected array values to be in {{orderText}} order. '{{thisValue}}' should be after '{{targetValue}}'."
		},
		type: "suggestion"
	},
	create(context) {
		const sourceCode = context.sourceCode;
		if (!sourceCode.parserServices.isJSON) return {};
		const parsedOptions = parseOptions$1(context.options);
		/**
		* Sort elements by bubble sort.
		*/
		function bubbleSort(elements, option) {
			const l = elements.length;
			const result = [...elements];
			let swapped;
			do {
				swapped = false;
				for (let nextIndex = 1; nextIndex < l; nextIndex++) {
					const prevIndex = nextIndex - 1;
					if (option.isValidOrder(result[prevIndex], result[nextIndex])) continue;
					[result[prevIndex], result[nextIndex]] = [result[nextIndex], result[prevIndex]];
					swapped = true;
				}
			} while (swapped);
			return result;
		}
		/**
		* Verify for array elements
		*/
		function verifyArrayElements(elements, option) {
			const editScript = calcShortestEditScript(elements, bubbleSort(elements, option));
			for (let index = 0; index < editScript.length; index++) {
				const edit = editScript[index];
				if (edit.type !== "delete") continue;
				const insertEditIndex = editScript.findIndex((e) => e.type === "insert" && e.b === edit.a);
				if (insertEditIndex === -1) continue;
				if (index < insertEditIndex) {
					const target = findInsertAfterTarget(edit.a, insertEditIndex);
					if (!target) continue;
					context.report({
						loc: edit.a.reportLoc,
						messageId: "shouldBeAfter",
						data: {
							thisValue: toText(edit.a),
							targetValue: toText(target),
							orderText: option.orderText(edit.a)
						},
						*fix(fixer) {
							yield* fixToMoveDownForSorting(fixer, sourceCode, edit.a.around, target.around);
						}
					});
				} else {
					const target = findInsertBeforeTarget(edit.a, insertEditIndex);
					if (!target) continue;
					context.report({
						loc: edit.a.reportLoc,
						messageId: "shouldBeBefore",
						data: {
							thisValue: toText(edit.a),
							targetValue: toText(target),
							orderText: option.orderText(edit.a)
						},
						*fix(fixer) {
							yield* fixToMoveUpForSorting(fixer, sourceCode, edit.a.around, target.around);
						}
					});
				}
			}
			/**
			* Find insert after target
			*/
			function findInsertAfterTarget(element, insertEditIndex) {
				for (let index = insertEditIndex - 1; index >= 0; index--) {
					const edit = editScript[index];
					if (edit.type === "delete" && edit.a === element) break;
					if (edit.type !== "common") continue;
					return edit.a;
				}
				let lastTarget = null;
				for (let index = elements.indexOf(element) + 1; index < elements.length; index++) {
					const el = elements[index];
					if (option.isValidOrder(el, element)) {
						lastTarget = el;
						continue;
					}
					return lastTarget;
				}
				return lastTarget;
			}
			/**
			* Find insert before target
			*/
			function findInsertBeforeTarget(element, insertEditIndex) {
				for (let index = insertEditIndex + 1; index < editScript.length; index++) {
					const edit = editScript[index];
					if (edit.type === "delete" && edit.a === element) break;
					if (edit.type !== "common") continue;
					return edit.a;
				}
				let lastTarget = null;
				for (let index = elements.indexOf(element) - 1; index >= 0; index--) {
					const el = elements[index];
					if (option.isValidOrder(element, el)) {
						lastTarget = el;
						continue;
					}
					return lastTarget;
				}
				return lastTarget;
			}
		}
		/**
		* Convert to display text.
		*/
		function toText(data) {
			if (getJSONPrimitiveType(data.value)) return String(data.value);
			return sourceCode.getText(data.node);
		}
		return { JSONArrayExpression(node) {
			const data = new JSONArrayData(node, sourceCode);
			const option = parsedOptions.find((o) => o.isTargetArray(data));
			if (!option) return;
			verifyArrayElements(data.elements.filter((d) => !option.ignore(d)), option);
		} };
	}
});

//#endregion
//#region lib/rules/sort-keys.ts
/**
* Gets the property name of the given `Property` node.
*/
function getPropertyName(node) {
	const prop = node.key;
	if (prop.type === "JSONIdentifier") return prop.name;
	return String(getStaticJSONValue(prop));
}
var JSONPropertyData = class {
	object;
	node;
	index;
	cachedName = null;
	get reportLoc() {
		return this.node.key.loc;
	}
	constructor(object, node, index) {
		this.object = object;
		this.node = node;
		this.index = index;
	}
	get name() {
		return this.cachedName ??= getPropertyName(this.node);
	}
	getPrev() {
		const prevIndex = this.index - 1;
		return prevIndex >= 0 ? this.object.properties[prevIndex] : null;
	}
};
var JSONObjectData = class {
	node;
	cachedProperties = null;
	constructor(node) {
		this.node = node;
	}
	get properties() {
		return this.cachedProperties ??= this.node.properties.map((e, index) => new JSONPropertyData(this, e, index));
	}
	getPath() {
		let path = "";
		let curr = this.node;
		let p = curr.parent;
		while (p) {
			if (p.type === "JSONProperty") {
				const name = getPropertyName(p);
				if (/^[$a-z_][\w$]*$/iu.test(name)) path = `.${name}${path}`;
				else path = `[${JSON.stringify(name)}]${path}`;
				curr = p.parent;
			} else if (p.type === "JSONArrayExpression") {
				path = `[${p.elements.indexOf(curr)}]${path}`;
				curr = p;
			} else if (p.type === "JSONExpressionStatement") break;
			else curr = p;
			p = curr.parent;
		}
		if (path.startsWith(".")) path = path.slice(1);
		return path;
	}
};
/**
* Check if given options are CompatibleWithESLintOptions
*/
function isCompatibleWithESLintOptions(options) {
	if (options.length === 0) return true;
	if (typeof options[0] === "string" || options[0] == null) return true;
	return false;
}
/**
* Build function which check that the given 2 names are in specific order.
*/
function buildValidatorFromType(order, insensitive, natural) {
	let compare = natural ? ([a, b]) => naturalCompare(a, b) <= 0 : ([a, b]) => a <= b;
	if (insensitive) {
		const baseCompare = compare;
		compare = ([a, b]) => baseCompare([a.toLowerCase(), b.toLowerCase()]);
	}
	if (order === "desc") {
		const baseCompare = compare;
		compare = (args) => baseCompare(args.reverse());
	}
	return (a, b) => compare([a.name, b.name]);
}
/**
* Parse options
*/
function parseOptions(options) {
	if (isCompatibleWithESLintOptions(options)) {
		const type = options[0] ?? "asc";
		const obj = options[1] ?? {};
		const insensitive = obj.caseSensitive === false;
		const natural = Boolean(obj.natural);
		const minKeys = obj.minKeys ?? 2;
		const allowLineSeparatedGroups = obj.allowLineSeparatedGroups || false;
		return [{
			isTargetObject: (node) => node.properties.length >= minKeys,
			ignore: () => false,
			isValidOrder: buildValidatorFromType(type, insensitive, natural),
			orderText: `${natural ? "natural " : ""}${insensitive ? "insensitive " : ""}${type}ending`,
			allowLineSeparatedGroups
		}];
	}
	return options.map((opt) => {
		const order = opt.order;
		const pathPattern = new RegExp(opt.pathPattern);
		const hasProperties = opt.hasProperties ?? [];
		const minKeys = opt.minKeys ?? 2;
		const allowLineSeparatedGroups = opt.allowLineSeparatedGroups || false;
		if (!Array.isArray(order)) {
			const type = order.type ?? "asc";
			const insensitive = order.caseSensitive === false;
			const natural = Boolean(order.natural);
			return {
				isTargetObject,
				ignore: () => false,
				isValidOrder: buildValidatorFromType(type, insensitive, natural),
				orderText: `${natural ? "natural " : ""}${insensitive ? "insensitive " : ""}${type}ending`,
				allowLineSeparatedGroups
			};
		}
		const parsedOrder = [];
		for (const o of order) if (typeof o === "string") parsedOrder.push({
			test: (data) => data.name === o,
			isValidNestOrder: () => true
		});
		else {
			const keyPattern = o.keyPattern ? new RegExp(o.keyPattern) : null;
			const nestOrder = o.order ?? {};
			const type = nestOrder.type ?? "asc";
			const insensitive = nestOrder.caseSensitive === false;
			const natural = Boolean(nestOrder.natural);
			parsedOrder.push({
				test: (data) => keyPattern ? keyPattern.test(data.name) : true,
				isValidNestOrder: buildValidatorFromType(type, insensitive, natural)
			});
		}
		return {
			isTargetObject,
			ignore: (data) => parsedOrder.every((p) => !p.test(data)),
			isValidOrder(a, b) {
				for (const p of parsedOrder) {
					const matchA = p.test(a);
					const matchB = p.test(b);
					if (!matchA || !matchB) {
						if (matchA) return true;
						if (matchB) return false;
						continue;
					}
					return p.isValidNestOrder(a, b);
				}
				return false;
			},
			orderText: "specified",
			allowLineSeparatedGroups
		};
		/**
		* Checks whether given node is verify target
		*/
		function isTargetObject(data) {
			if (data.node.properties.length < minKeys) return false;
			if (hasProperties.length > 0) {
				const names = new Set(data.properties.map((p) => p.name));
				if (!hasProperties.every((name) => names.has(name))) return false;
			}
			return pathPattern.test(data.getPath());
		}
	});
}
const ALLOW_ORDER_TYPES = ["asc", "desc"];
const ORDER_OBJECT_SCHEMA = {
	type: "object",
	properties: {
		type: { enum: ALLOW_ORDER_TYPES },
		caseSensitive: { type: "boolean" },
		natural: { type: "boolean" }
	},
	additionalProperties: false
};
var sort_keys_default = createRule("sort-keys", {
	meta: {
		docs: {
			description: "require object keys to be sorted",
			recommended: null,
			extensionRule: false,
			layout: false
		},
		fixable: "code",
		schema: { oneOf: [{
			type: "array",
			items: {
				type: "object",
				properties: {
					pathPattern: { type: "string" },
					hasProperties: {
						type: "array",
						items: { type: "string" }
					},
					order: { oneOf: [{
						type: "array",
						items: { anyOf: [{ type: "string" }, {
							type: "object",
							properties: {
								keyPattern: { type: "string" },
								order: ORDER_OBJECT_SCHEMA
							},
							additionalProperties: false
						}] },
						uniqueItems: true
					}, ORDER_OBJECT_SCHEMA] },
					minKeys: {
						type: "integer",
						minimum: 2
					},
					allowLineSeparatedGroups: { type: "boolean" }
				},
				required: ["pathPattern", "order"],
				additionalProperties: false
			},
			minItems: 1
		}, {
			type: "array",
			items: [{ enum: ALLOW_ORDER_TYPES }, {
				type: "object",
				properties: {
					caseSensitive: { type: "boolean" },
					natural: { type: "boolean" },
					minKeys: {
						type: "integer",
						minimum: 2
					},
					allowLineSeparatedGroups: { type: "boolean" }
				},
				additionalProperties: false
			}],
			additionalItems: false
		}] },
		messages: {
			shouldBeBefore: "Expected object keys to be in {{orderText}} order. '{{thisName}}' should be before '{{targetName}}'.",
			shouldBeAfter: "Expected object keys to be in {{orderText}} order. '{{thisName}}' should be after '{{targetName}}'."
		},
		type: "suggestion"
	},
	create(context) {
		const sourceCode = context.sourceCode;
		if (!sourceCode.parserServices.isJSON) return {};
		const parsedOptions = parseOptions(context.options);
		/**
		* Group JSON properties.
		*/
		function groupingProperties(properties, option) {
			const groups = [];
			let group = [];
			let prev = null;
			for (const property of properties) {
				if (option.ignore(property)) {
					prev = property;
					continue;
				}
				if (prev && option.allowLineSeparatedGroups && hasBlankLine(prev, property)) {
					if (group.length > 0) {
						groups.push(group);
						group = [];
					}
				}
				group.push(property);
				prev = property;
			}
			if (group.length > 0) groups.push(group);
			return groups;
		}
		/**
		* Sort properties by bubble sort.
		*/
		function bubbleSort(properties, option) {
			const l = properties.length;
			const result = [...properties];
			let swapped;
			do {
				swapped = false;
				for (let nextIndex = 1; nextIndex < l; nextIndex++) {
					const prevIndex = nextIndex - 1;
					if (option.isValidOrder(result[prevIndex], result[nextIndex])) continue;
					[result[prevIndex], result[nextIndex]] = [result[nextIndex], result[prevIndex]];
					swapped = true;
				}
			} while (swapped);
			return result;
		}
		/**
		* Verify for properties order
		*/
		function verifyProperties(properties, option) {
			const editScript = calcShortestEditScript(properties, bubbleSort(properties, option));
			for (let index = 0; index < editScript.length; index++) {
				const edit = editScript[index];
				if (edit.type !== "delete") continue;
				const insertEditIndex = editScript.findIndex((e) => e.type === "insert" && e.b === edit.a);
				if (insertEditIndex === -1) continue;
				if (index < insertEditIndex) {
					const target = findInsertAfterTarget(edit.a, insertEditIndex);
					if (!target) continue;
					context.report({
						loc: edit.a.reportLoc,
						messageId: "shouldBeAfter",
						data: {
							thisName: edit.a.name,
							targetName: target.name,
							orderText: option.orderText
						},
						*fix(fixer) {
							yield* fixToMoveDownForSorting(fixer, sourceCode, edit.a, target);
						}
					});
				} else {
					const target = findInsertBeforeTarget(edit.a, insertEditIndex);
					if (!target) continue;
					context.report({
						loc: edit.a.reportLoc,
						messageId: "shouldBeBefore",
						data: {
							thisName: edit.a.name,
							targetName: target.name,
							orderText: option.orderText
						},
						*fix(fixer) {
							yield* fixToMoveUpForSorting(fixer, sourceCode, edit.a, target);
						}
					});
				}
			}
			/**
			* Find insert after target
			*/
			function findInsertAfterTarget(property, insertEditIndex) {
				for (let index = insertEditIndex - 1; index >= 0; index--) {
					const edit = editScript[index];
					if (edit.type === "delete" && edit.a === property) break;
					if (edit.type !== "common") continue;
					return edit.a;
				}
				let lastTarget = null;
				for (let index = properties.indexOf(property) + 1; index < properties.length; index++) {
					const element = properties[index];
					if (option.isValidOrder(element, property)) {
						lastTarget = element;
						continue;
					}
					return lastTarget;
				}
				return lastTarget;
			}
			/**
			* Find insert before target
			*/
			function findInsertBeforeTarget(property, insertEditIndex) {
				for (let index = insertEditIndex + 1; index < editScript.length; index++) {
					const edit = editScript[index];
					if (edit.type === "delete" && edit.a === property) break;
					if (edit.type !== "common") continue;
					return edit.a;
				}
				let lastTarget = null;
				for (let index = properties.indexOf(property) - 1; index >= 0; index--) {
					const element = properties[index];
					if (option.isValidOrder(property, element)) {
						lastTarget = element;
						continue;
					}
					return lastTarget;
				}
				return lastTarget;
			}
		}
		/**
		* Checks whether the given two properties have a blank line between them.
		*/
		function hasBlankLine(prev, next) {
			const tokenOrNodes = [...sourceCode.getTokensBetween(prev.node, next.node, { includeComments: true }), next.node];
			let prevLoc = prev.node.loc;
			for (const t of tokenOrNodes) {
				const loc = t.loc;
				if (loc.start.line - prevLoc.end.line > 1) return true;
				prevLoc = loc;
			}
			return false;
		}
		return { JSONObjectExpression(node) {
			const data = new JSONObjectData(node);
			const option = parsedOptions.find((o) => o.isTargetObject(data));
			if (!option) return;
			for (const properties of groupingProperties(data.properties, option)) verifyProperties(properties, option);
		} };
	}
});

//#endregion
//#region lib/rules/space-unary-ops.ts
var space_unary_ops_default = createRule("space-unary-ops", {
	meta: {
		docs: {
			description: "disallow spaces after unary operators",
			recommended: [
				"json",
				"jsonc",
				"json5"
			],
			extensionRule: true,
			layout: true
		},
		fixable: "whitespace",
		type: "layout",
		schema: [{
			type: "object",
			properties: {
				words: {
					type: "boolean",
					default: true
				},
				nonwords: {
					type: "boolean",
					default: false
				},
				overrides: {
					type: "object",
					additionalProperties: { type: "boolean" }
				}
			},
			additionalProperties: false
		}],
		messages: {
			unexpectedBefore: "Unexpected space before unary operator '{{operator}}'.",
			unexpectedAfter: "Unexpected space after unary operator '{{operator}}'.",
			operator: "Unary operator '{{operator}}' must be followed by whitespace.",
			beforeUnaryExpressions: "Space is required before unary expressions '{{token}}'."
		}
	},
	create(context) {
		const sourceCode = context.sourceCode;
		if (!sourceCode.parserServices.isJSON) return {};
		const options = context.options[0] || {
			words: true,
			nonwords: false
		};
		/**
		* Checks if an override exists for a given operator.
		* @param operator Operator
		* @returns Whether or not an override has been provided for the operator
		*/
		function overrideExistsForOperator(operator) {
			return options.overrides && Object.prototype.hasOwnProperty.call(options.overrides, operator);
		}
		/**
		* Gets the value that the override was set to for this operator
		* @param operator Operator
		* @returns Whether or not an override enforces a space with this operator
		*/
		function overrideEnforcesSpaces(operator) {
			return options.overrides?.[operator];
		}
		/**
		* Verifies UnaryExpression have spaces before or after the operator
		* @param node AST node
		* @param firstToken First token in the expression
		* @param secondToken Second token in the expression
		*/
		function verifyNonWordsHaveSpaces(node, firstToken, secondToken) {
			if ("prefix" in node && node.prefix) {
				if (firstToken.range[1] === secondToken.range[0]) context.report({
					node,
					messageId: "operator",
					data: { operator: firstToken.value },
					fix(fixer) {
						return fixer.insertTextAfter(firstToken, " ");
					}
				});
			} else if (firstToken.range[1] === secondToken.range[0]) context.report({
				node,
				messageId: "beforeUnaryExpressions",
				data: { token: secondToken.value },
				fix(fixer) {
					return fixer.insertTextBefore(secondToken, " ");
				}
			});
		}
		/**
		* Verifies UnaryExpression don't have spaces before or after the operator
		* @param node AST node
		* @param firstToken First token in the expression
		* @param secondToken Second token in the expression
		*/
		function verifyNonWordsDontHaveSpaces(node, firstToken, secondToken) {
			if ("prefix" in node && node.prefix) {
				if (secondToken.range[0] > firstToken.range[1]) context.report({
					node,
					messageId: "unexpectedAfter",
					data: { operator: firstToken.value },
					fix(fixer) {
						if (canTokensBeAdjacent(firstToken, secondToken)) return fixer.removeRange([firstToken.range[1], secondToken.range[0]]);
						return null;
					}
				});
			} else if (secondToken.range[0] > firstToken.range[1]) context.report({
				node,
				messageId: "unexpectedBefore",
				data: { operator: secondToken.value },
				fix(fixer) {
					return fixer.removeRange([firstToken.range[1], secondToken.range[0]]);
				}
			});
		}
		/**
		* Verifies UnaryExpression satisfy spacing requirements
		* @param node AST node
		*/
		function checkForSpaces(node) {
			const tokens = sourceCode.getFirstTokens(node, 2);
			const firstToken = tokens[0];
			const secondToken = tokens[1];
			const operator = tokens[0].value;
			if (overrideExistsForOperator(operator)) if (overrideEnforcesSpaces(operator)) verifyNonWordsHaveSpaces(node, firstToken, secondToken);
			else verifyNonWordsDontHaveSpaces(node, firstToken, secondToken);
			else if (options.nonwords) verifyNonWordsHaveSpaces(node, firstToken, secondToken);
			else verifyNonWordsDontHaveSpaces(node, firstToken, secondToken);
		}
		return { JSONUnaryExpression: checkForSpaces };
	}
});

//#endregion
//#region lib/rules/valid-json-number.ts
const nonDecimalNumericLiteralPattern = /^0[\dbox]/iu;
/**
* Checks if the given string is valid number as JSON.
*/
function isValidNumber(text) {
	try {
		JSON.parse(text);
	} catch {
		return false;
	}
	return true;
}
var valid_json_number_default = createRule("valid-json-number", {
	meta: {
		docs: {
			description: "disallow invalid number for JSON",
			recommended: ["json", "jsonc"],
			extensionRule: false,
			layout: false
		},
		fixable: "code",
		schema: [],
		messages: {
			invalid: "Invalid number for JSON.",
			invalidSpace: "Spaces after minus sign are not allowed in JSON.",
			invalidPlus: "Plus signs are not allowed in JSON.",
			invalidIdentifier: "`{{name}}` are not allowed in JSON.",
			invalidLeadingDecimalPoint: "Leading decimal point is not allowed in JSON.",
			invalidTrailingDecimalPoint: "Trailing decimal point is not allowed in JSON.",
			invalidHex: "Hexadecimal literals are not allowed in JSON.",
			invalidOctal: "Octal literals are not allowed in JSON.",
			invalidBinary: "Binary literals are not allowed in JSON."
		},
		type: "problem"
	},
	create(context) {
		const sourceCode = context.sourceCode;
		if (!sourceCode.parserServices.isJSON) return {};
		return {
			JSONUnaryExpression(node) {
				if (node.argument.type === "JSONIdentifier") return;
				const operator = sourceCode.getFirstToken(node, (token) => token.type === "Punctuator" && token.value === node.operator);
				if (node.operator === "+") context.report({
					loc: operator?.loc || node.loc,
					messageId: "invalidPlus",
					fix(fixer) {
						return operator ? fixer.removeRange(operator.range) : null;
					}
				});
				else if (operator && operator.range[1] < node.argument.range[0]) context.report({
					loc: {
						start: operator.loc.end,
						end: node.argument.loc.start
					},
					messageId: "invalidSpace",
					fix(fixer) {
						return fixer.removeRange([operator.range[1], node.argument.range[0]]);
					}
				});
			},
			JSONLiteral(node) {
				if (typeof node.value !== "number") return;
				const text = sourceCode.text.slice(...node.range);
				if (text.startsWith(".")) {
					context.report({
						loc: node.loc,
						messageId: "invalidLeadingDecimalPoint",
						fix(fixer) {
							return fixer.insertTextBeforeRange(node.range, "0");
						}
					});
					return;
				}
				if (text.endsWith(".")) {
					context.report({
						loc: node.loc,
						messageId: "invalidTrailingDecimalPoint",
						fix(fixer) {
							return fixer.removeRange([node.range[1] - 1, node.range[1]]);
						}
					});
					return;
				}
				if (nonDecimalNumericLiteralPattern.test(text)) {
					context.report({
						loc: node.loc,
						messageId: text[1].toLowerCase() === "x" ? "invalidHex" : text[1].toLowerCase() === "b" ? "invalidBinary" : "invalidOctal",
						fix: buildFix(node)
					});
					return;
				}
				if (!isValidNumber(text)) context.report({
					loc: node.loc,
					messageId: "invalid",
					fix: buildFix(node)
				});
			},
			JSONIdentifier(node) {
				if (!isNumberIdentifier(node)) return;
				context.report({
					loc: node.loc,
					messageId: "invalidIdentifier",
					data: { name: node.name }
				});
			}
		};
		/**
		* Build fixer for number
		*/
		function buildFix(node) {
			return (fixer) => {
				return fixer.replaceTextRange(node.range, `${node.value}`);
			};
		}
	}
});

//#endregion
//#region lib/rules/vue-custom-block/no-parsing-error.ts
var no_parsing_error_default = createRule("vue-custom-block/no-parsing-error", {
	meta: {
		docs: {
			description: "disallow parsing errors in Vue custom blocks",
			recommended: [
				"json",
				"json5",
				"jsonc"
			],
			extensionRule: false,
			layout: false
		},
		schema: [],
		messages: {},
		type: "problem"
	},
	create(context, { customBlock }) {
		if (!customBlock) return {};
		const sourceCode = context.sourceCode;
		const parserServices = context.parserServices ?? sourceCode.parserServices;
		const parseError = parserServices.parseError;
		if (parseError && typeof parseError === "object") return errorReportVisitor(context, parseError);
		const parseCustomBlockElement = parserServices.parseCustomBlockElement;
		const customBlockElement = parserServices.customBlock;
		if (customBlockElement && parseCustomBlockElement) {
			let lang = getLang(customBlockElement);
			if (!lang) lang = "json";
			const { error } = parseCustomBlockElement(jsoncESLintParser, { jsonSyntax: lang });
			if (error) return errorReportVisitor(context, error);
		}
		return {};
	}
});
/**
* Report error
*/
function errorReportVisitor(context, error) {
	let loc = void 0;
	if ("column" in error && "lineNumber" in error) loc = {
		line: error.lineNumber,
		column: error.column
	};
	return { Program(node) {
		context.report({
			node,
			loc,
			message: error.message
		});
	} };
}
/**
* Get lang from given custom block
*/
function getLang(customBlock) {
	return customBlock.startTag.attributes.find((attr) => !attr.directive && attr.key.name === "lang")?.value?.value || null;
}

//#endregion
export { no_escape_sequence_in_identifier_default as A, comma_dangle_default as B, no_number_props_default as C, no_infinity_default as D, no_irregular_whitespace_default as E, no_bigint_literals_default as F, array_element_newline_default as H, key_spacing_default as I, key_name_casing_default as L, no_comments_default as M, no_binary_numeric_literals_default as N, no_hexadecimal_numeric_literals_default as O, no_binary_expression_default as P, indent_default as R, no_numeric_separators_default as S, no_multi_str_default as T, array_bracket_spacing_default as U, auto_default as V, array_bracket_newline_default as W, no_plus_sign_default as _, sort_array_values_default as a, no_octal_numeric_literals_default as b, object_property_newline_default as c, no_useless_escape_default as d, no_unicode_codepoint_escapes_default as f, no_regexp_literals_default as g, no_sparse_arrays_default as h, sort_keys_default as i, no_dupe_keys_default as j, no_floating_decimal_default as k, object_curly_spacing_default as l, no_template_literals_default as m, valid_json_number_default as n, quotes_default as o, no_undefined_value_default as p, space_unary_ops_default as r, quote_props_default as s, no_parsing_error_default as t, object_curly_newline_default as u, no_parenthesized_default as v, no_nan_default as w, no_octal_escape_default as x, no_octal_default as y, comma_style_default as z };