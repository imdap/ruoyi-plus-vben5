import { t as __exportAll } from "./chunk-C7Uep-_p.mjs";
import { createRequire } from "node:module";
import * as Evk from "eslint-visitor-keys";
import evkPkg from "eslint-visitor-keys/package.json" with { type: "json" };
import path from "node:path";
import { lte } from "semver";
import * as acorn from "acorn";
import acornPkg from "acorn/package.json" with { type: "json" };

//#region src/parser/modules/require-utils.ts
/**
* Get NodeJS.Require from Linter
*/
function getRequireFromLinter() {
	try {
		const eslintPkgPath = getRequireFromCwd()?.resolve("eslint/package.json");
		if (!eslintPkgPath) return null;
		return createRequire(path.join(path.dirname(eslintPkgPath), "__placeholder__.js"));
	} catch {}
	return null;
}
/**
* Get NodeJS.Require from Cwd
*/
function getRequireFromCwd() {
	try {
		const cwd = process.cwd();
		return createRequire(path.join(cwd, "__placeholder__.js"));
	} catch {}
	return null;
}
/**
* Get module from Linter
*/
function requireFromLinter(module) {
	try {
		return getRequireFromLinter()?.(module);
	} catch {}
	return null;
}
/**
* Get module path from Linter
*/
function resolveFromLinter(module) {
	try {
		return getRequireFromLinter()?.resolve(module) ?? null;
	} catch {}
	return null;
}
/**
* Get module from Cwd
*/
function requireFromCwd(module) {
	try {
		return getRequireFromCwd()?.(module);
	} catch {}
	return null;
}
/**
* Get module path from Cwd
*/
function resolveFromCwd(module) {
	try {
		return getRequireFromCwd()?.resolve(module) ?? null;
	} catch {}
	return null;
}
/**
* Get the newest `espree` kind from the loaded ESLint or dependency.
*/
function loadNewest(items) {
	let target = null;
	for (const item of items) {
		const pkg = item.getPkg();
		if (pkg != null && (!target || lte(target.version, pkg.version))) target = {
			version: pkg.version,
			get: item.get
		};
	}
	return target.get();
}

//#endregion
//#region src/parser/visitor-keys.ts
const jsonKeys = {
	Program: ["body"],
	JSONExpressionStatement: ["expression"],
	JSONArrayExpression: ["elements"],
	JSONObjectExpression: ["properties"],
	JSONProperty: ["key", "value"],
	JSONIdentifier: [],
	JSONLiteral: [],
	JSONUnaryExpression: ["argument"],
	JSONTemplateLiteral: ["quasis", "expressions"],
	JSONTemplateElement: [],
	JSONBinaryExpression: ["left", "right"]
};
let cache = null;
/**
* Get visitor keys
*/
function getVisitorKeys() {
	if (!cache) cache = loadNewest([
		{
			getPkg() {
				return requireFromCwd("eslint-visitor-keys/package.json");
			},
			get() {
				return requireFromCwd("eslint-visitor-keys");
			}
		},
		{
			getPkg() {
				return requireFromLinter("eslint-visitor-keys/package.json");
			},
			get() {
				return requireFromLinter("eslint-visitor-keys");
			}
		},
		{
			getPkg() {
				return evkPkg;
			},
			get() {
				return Evk;
			}
		}
	]).unionWith(jsonKeys);
	return cache;
}

//#endregion
//#region src/parser/utils.ts
/**
* Check if the given node is RegExpLiteral
*/
function isRegExpLiteral(node) {
	return Boolean(node.regex) || node.raw.startsWith("/");
}

//#endregion
//#region src/parser/errors.ts
/**
* JSON parse errors.
*/
var ParseError = class extends SyntaxError {
	/**
	* Initialize this ParseError instance.
	* @param message The error message.
	* @param code The error code. See also: https://html.spec.whatwg.org/multipage/parsing.html#parse-errors
	* @param offset The offset number of this error.
	* @param line The line number of this error.
	* @param column The column number of this error.
	*/
	constructor(message, offset, line, column) {
		super(message);
		this.index = offset;
		this.lineNumber = line;
		this.column = column;
	}
};
/**
* Throw syntax error for expected token.
* @param name The token name.
* @param token The token object to get that location.
*/
function throwExpectedTokenError(name, beforeToken) {
	const locs = getLocation(beforeToken);
	throw new ParseError(`Expected token '${name}'.`, locs.end, locs.loc.end.line, locs.loc.end.column + 1);
}
/**
* Throw syntax error for unexpected name.
* @param name The unexpected name.
* @param token The token object to get that location.
*/
function throwUnexpectedError(name, token) {
	const locs = getLocation(token);
	throw new ParseError(`Unexpected ${name}.`, locs.start, locs.loc.start.line, locs.loc.start.column + 1);
}
/**
* Throw syntax error for unexpected token.
* @param name The token name.
* @param token The token object to get that location.
*/
function throwUnexpectedTokenError(name, token) {
	return throwUnexpectedError(`token '${name}'`, token);
}
/**
* Throw syntax error for unexpected comment.
* @param name The token name.
* @param token The token object to get that location.
*/
function throwUnexpectedCommentError(token) {
	return throwUnexpectedError("comment", token);
}
/**
* Throw syntax error for unexpected whitespace.
*/
function throwUnexpectedSpaceError(beforeToken) {
	const locs = getLocation(beforeToken);
	throw new ParseError("Unexpected whitespace.", locs.end, locs.loc.end.line, locs.loc.end.column + 1);
}
/**
* Throw syntax error for unexpected invalid number.
*/
function throwInvalidNumberError(text, token) {
	const locs = getLocation(token);
	throw new ParseError(`Invalid number ${text}.`, locs.start, locs.loc.start.line, locs.loc.start.column + 1);
}
/**
* Throw syntax error for unexpected token.
* @param node The token object to get that location.
*/
function throwUnexpectedNodeError(node, tokens, offset) {
	if (node.type === "Identifier" || node.type === "JSONIdentifier") {
		const locs = getLocation(node);
		throw new ParseError(`Unexpected identifier '${node.name}'.`, locs.start, locs.loc.start.line, locs.loc.start.column + 1);
	}
	if (node.type === "Literal" || node.type === "JSONLiteral") {
		const type = node.bigint ? "bigint" : isRegExpLiteral(node) ? "regex" : node.value === null ? "null" : typeof node.value;
		const locs = getLocation(node);
		throw new ParseError(`Unexpected ${type} literal.`, locs.start, locs.loc.start.line, locs.loc.start.column + 1);
	}
	if (node.type === "TemplateLiteral" || node.type === "JSONTemplateLiteral") {
		const locs = getLocation(node);
		throw new ParseError("Unexpected template literal.", locs.start, locs.loc.start.line, locs.loc.start.column + 1);
	}
	if (node.type.endsWith("Expression") && node.type !== "FunctionExpression") {
		const name = node.type.replace(/^JSON/u, "").replace(/\B([A-Z])/gu, " $1").toLowerCase();
		const locs = getLocation(node);
		throw new ParseError(`Unexpected ${name}.`, locs.start, locs.loc.start.line, locs.loc.start.column + 1);
	}
	const index = node.range[0] + (offset || 0);
	const t = tokens.findTokenByOffset(index);
	const name = t?.value || "unknown";
	const locs = getLocation(t || node);
	throw new ParseError(`Unexpected token '${name}'.`, locs.start, locs.loc.start.line, locs.loc.start.column + 1);
}
/** get locations */
function getLocation(token) {
	return {
		start: token.range?.[0] ?? token.start,
		end: token.range?.[1] ?? token.end,
		loc: token.loc
	};
}

//#endregion
//#region src/parser/token-store.ts
var TokenStore = class {
	constructor(tokens) {
		this.tokens = tokens;
	}
	add(token) {
		this.tokens.push(token);
	}
	findIndexByOffset(offset) {
		return this.tokens.findIndex((token) => token.range[0] <= offset && offset < token.range[1]);
	}
	findTokenByOffset(offset) {
		return this.tokens[this.findIndexByOffset(offset)];
	}
	/**
	* Get the first token representing the given node.
	*
	*/
	getFirstToken(nodeOrToken) {
		return this.findTokenByOffset(nodeOrToken.range[0]);
	}
	/**
	* Get the last token representing the given node.
	*
	*/
	getLastToken(nodeOrToken) {
		return this.findTokenByOffset(nodeOrToken.range[1] - 1);
	}
	/**
	* Get the first token before the given node or token.
	*/
	getTokenBefore(nodeOrToken, filter) {
		const tokenIndex = this.findIndexByOffset(nodeOrToken.range[0]);
		for (let index = tokenIndex - 1; index >= 0; index--) {
			const token = this.tokens[index];
			if (!filter || filter(token)) return token;
		}
		return null;
	}
	/**
	* Get the first token after the given node or token.
	*/
	getTokenAfter(nodeOrToken, filter) {
		const tokenIndex = this.findIndexByOffset(nodeOrToken.range[0]);
		for (let index = tokenIndex + 1; index < this.tokens.length; index++) {
			const token = this.tokens[index];
			if (!filter || filter(token)) return token;
		}
		return null;
	}
};
/**
* Checks if given token is comma
*/
function isComma(token) {
	return token.type === "Punctuator" && token.value === ",";
}

//#endregion
//#region src/parser/validate.ts
const lineBreakPattern = /\r\n|[\n\r\u2028\u2029]/u;
const octalNumericLiteralPattern = /^0o/iu;
const legacyOctalNumericLiteralPattern = /^0\d/u;
const binaryNumericLiteralPattern = /^0b/iu;
const unicodeCodepointEscapePattern = /\\u\{[\dA-Fa-f]+\}/uy;
/**
* Check if given string has unicode codepoint escape
*/
function hasUnicodeCodepointEscapes(code) {
	let escaped = false;
	for (let index = 0; index < code.length - 4; index++) {
		if (escaped) {
			escaped = false;
			continue;
		}
		if (code[index] === "\\") {
			unicodeCodepointEscapePattern.lastIndex = index;
			if (unicodeCodepointEscapePattern.test(code)) return true;
			escaped = true;
		}
	}
	return false;
}
/**
* Validate ES node
*/
function validateNode(node, tokens, ctx) {
	if (node.type === "ObjectExpression") {
		validateObjectExpressionNode(node, tokens, ctx);
		return;
	}
	if (node.type === "Property") {
		validatePropertyNode(node, tokens, ctx);
		return;
	}
	if (node.type === "ArrayExpression") {
		validateArrayExpressionNode(node, tokens, ctx);
		return;
	}
	if (node.type === "Literal") {
		validateLiteralNode(node, tokens, ctx);
		return;
	}
	if (node.type === "UnaryExpression") {
		validateUnaryExpressionNode(node, tokens, ctx);
		return;
	}
	if (node.type === "Identifier") {
		validateIdentifierNode(node, tokens, ctx);
		return;
	}
	if (node.type === "TemplateLiteral") {
		validateTemplateLiteralNode(node, tokens, ctx);
		return;
	}
	if (node.type === "TemplateElement") {
		validateTemplateElementNode(node, tokens);
		return;
	}
	if (node.type === "BinaryExpression") {
		validateBinaryExpressionNode(node, tokens, ctx);
		return;
	}
	throw throwUnexpectedNodeError(node, tokens);
}
/**
* Validate ObjectExpression node
*/
function validateObjectExpressionNode(node, tokens, ctx) {
	/* istanbul ignore next */
	if (node.type !== "ObjectExpression") throw throwUnexpectedNodeError(node, tokens);
	for (const prop of node.properties) setParent$1(prop, node);
	if (!ctx.trailingCommas) {
		const token = tokens.getTokenBefore(tokens.getLastToken(node));
		if (token && isComma(token)) throw throwUnexpectedTokenError(",", token);
	}
}
/**
* Validate Property node
*/
function validatePropertyNode(node, tokens, ctx) {
	if (node.type !== "Property") throw throwUnexpectedNodeError(node, tokens);
	setParent$1(node.key, node);
	setParent$1(node.value, node);
	if (node.computed) throw throwUnexpectedNodeError(node, tokens);
	if (node.method) throw throwUnexpectedNodeError(node.value, tokens);
	if (node.shorthand) throw throwExpectedTokenError(":", node);
	if (node.kind !== "init") throw throwExpectedTokenError(":", tokens.getFirstToken(node));
	if (node.key.type === "Literal") {
		const keyValueType = typeof node.key.value;
		if (keyValueType === "number") {
			if (!ctx.numberProperties) throw throwUnexpectedNodeError(node.key, tokens);
		} else if (keyValueType !== "string") throw throwUnexpectedNodeError(node.key, tokens);
	} else if (node.key.type === "Identifier") {
		if (!ctx.unquoteProperties) throw throwUnexpectedNodeError(node.key, tokens);
	} else throw throwUnexpectedNodeError(node.key, tokens);
	if (node.value.type === "Identifier") {
		if (!isStaticValueIdentifier(node.value, ctx)) throw throwUnexpectedNodeError(node.value, tokens);
	}
}
/**
* Validate ArrayExpression node
*/
function validateArrayExpressionNode(node, tokens, ctx) {
	/* istanbul ignore next */
	if (node.type !== "ArrayExpression") throw throwUnexpectedNodeError(node, tokens);
	if (!ctx.trailingCommas) {
		const token = tokens.getTokenBefore(tokens.getLastToken(node));
		if (token && isComma(token)) throw throwUnexpectedTokenError(",", token);
	}
	node.elements.forEach((child, index) => {
		if (!child) {
			if (ctx.sparseArrays) return;
			const beforeIndex = index - 1;
			const before = beforeIndex >= 0 ? tokens.getLastToken(node.elements[beforeIndex]) : tokens.getFirstToken(node);
			throw throwUnexpectedTokenError(",", tokens.getTokenAfter(before, isComma));
		}
		if (child.type === "Identifier") {
			if (!isStaticValueIdentifier(child, ctx)) throw throwUnexpectedNodeError(child, tokens);
		}
		setParent$1(child, node);
	});
}
/**
* Validate Literal node
*/
function validateLiteralNode(node, tokens, ctx) {
	/* istanbul ignore next */
	if (node.type !== "Literal") throw throwUnexpectedNodeError(node, tokens);
	if (isRegExpLiteral(node)) {
		if (!ctx.regExpLiterals) throw throwUnexpectedNodeError(node, tokens);
	} else if (node.bigint) {
		if (!ctx.bigintLiterals) throw throwUnexpectedNodeError(node, tokens);
	} else validateLiteral(node, ctx);
}
/**
* Validate literal
*/
function validateLiteral(node, ctx) {
	const value = node.value;
	if ((!ctx.invalidJsonNumbers || !ctx.leadingOrTrailingDecimalPoints || !ctx.numericSeparators) && typeof value === "number") {
		const text = node.raw;
		if (!ctx.leadingOrTrailingDecimalPoints) {
			if (text.startsWith(".")) throw throwUnexpectedTokenError(".", node);
			if (text.endsWith(".")) throw throwUnexpectedTokenError(".", {
				range: [node.range[1] - 1, node.range[1]],
				loc: {
					start: {
						line: node.loc.end.line,
						column: node.loc.end.column - 1
					},
					end: node.loc.end
				}
			});
		}
		if (!ctx.numericSeparators) {
			if (text.includes("_")) {
				const index = text.indexOf("_");
				throw throwUnexpectedTokenError("_", {
					range: [node.range[0] + index, node.range[0] + index + 1],
					loc: {
						start: {
							line: node.loc.start.line,
							column: node.loc.start.column + index
						},
						end: {
							line: node.loc.start.line,
							column: node.loc.start.column + index + 1
						}
					}
				});
			}
		}
		if (!ctx.octalNumericLiterals) {
			if (octalNumericLiteralPattern.test(text)) throw throwUnexpectedError("octal numeric literal", node);
		}
		if (!ctx.legacyOctalNumericLiterals) {
			if (legacyOctalNumericLiteralPattern.test(text)) throw throwUnexpectedError("legacy octal numeric literal", node);
		}
		if (!ctx.binaryNumericLiterals) {
			if (binaryNumericLiteralPattern.test(text)) throw throwUnexpectedError("binary numeric literal", node);
		}
		if (!ctx.invalidJsonNumbers) try {
			JSON.parse(text);
		} catch {
			throw throwInvalidNumberError(text, node);
		}
	}
	if ((!ctx.multilineStrings || !ctx.singleQuotes || !ctx.unicodeCodepointEscapes) && typeof value === "string") {
		if (!ctx.singleQuotes) {
			if (node.raw.startsWith("'")) throw throwUnexpectedError("single quoted", node);
		}
		if (!ctx.multilineStrings) {
			if (lineBreakPattern.test(node.raw)) throw throwUnexpectedError("multiline string", node);
		}
		if (!ctx.unicodeCodepointEscapes) {
			if (hasUnicodeCodepointEscapes(node.raw)) throw throwUnexpectedError("unicode codepoint escape", node);
		}
	}
}
/**
* Validate UnaryExpression node
*/
function validateUnaryExpressionNode(node, tokens, ctx) {
	/* istanbul ignore next */
	if (node.type !== "UnaryExpression") throw throwUnexpectedNodeError(node, tokens);
	const operator = node.operator;
	if (operator === "+") {
		if (!ctx.plusSigns) throw throwUnexpectedTokenError("+", node);
	} else if (operator !== "-") throw throwUnexpectedNodeError(node, tokens);
	const argument = node.argument;
	if (argument.type === "Literal") {
		if (typeof argument.value !== "number") throw throwUnexpectedNodeError(argument, tokens);
	} else if (argument.type === "Identifier") {
		if (!isNumberIdentifier$1(argument, ctx)) throw throwUnexpectedNodeError(argument, tokens);
	} else throw throwUnexpectedNodeError(argument, tokens);
	if (!ctx.spacedSigns) {
		if (node.range[0] + 1 < argument.range[0]) throw throwUnexpectedSpaceError(tokens.getFirstToken(node));
	}
	setParent$1(argument, node);
}
/**
* Validate Identifier node
*/
function validateIdentifierNode(node, tokens, ctx) {
	/* istanbul ignore next */
	if (node.type !== "Identifier") throw throwUnexpectedNodeError(node, tokens);
	if (!ctx.escapeSequenceInIdentifier) {
		if (node.name.length < node.range[1] - node.range[0]) throw throwUnexpectedError("escape sequence", node);
	}
}
/**
* Validate TemplateLiteral node
*/
function validateTemplateLiteralNode(node, tokens, ctx) {
	/* istanbul ignore next */
	if (node.type !== "TemplateLiteral") throw throwUnexpectedNodeError(node, tokens);
	if (!ctx.templateLiterals) throw throwUnexpectedNodeError(node, tokens);
	if (node.expressions.length) {
		const token = tokens.getFirstToken(node.quasis[0]);
		throw throwUnexpectedTokenError("$", {
			loc: {
				start: {
					line: token.loc.end.line,
					column: token.loc.end.column - 2
				},
				end: token.loc.end
			},
			range: [token.range[1] - 2, token.range[1]]
		});
	}
	if (!ctx.unicodeCodepointEscapes) {
		if (hasUnicodeCodepointEscapes(node.quasis[0].value.raw)) throw throwUnexpectedError("unicode codepoint escape", node);
	}
	for (const q of node.quasis) setParent$1(q, node);
}
/**
* Validate TemplateElement node
*/
function validateTemplateElementNode(node, tokens) {
	/* istanbul ignore next */
	if (node.type !== "TemplateElement") throw throwUnexpectedNodeError(node, tokens);
	const { cooked } = node.value;
	if (cooked == null) throw throwUnexpectedNodeError(node, tokens);
	const startOffset = -1;
	const endOffset = node.tail ? 1 : 2;
	node.start += startOffset;
	node.end += endOffset;
	node.range[0] += startOffset;
	node.range[1] += endOffset;
	node.loc.start.column += startOffset;
	node.loc.end.column += endOffset;
}
/**
* Validate BinaryExpression node
*/
function validateBinaryExpressionNode(node, tokens, ctx) {
	/* istanbul ignore next */
	if (node.type !== "BinaryExpression") throw throwUnexpectedNodeError(node, tokens);
	if (!ctx.staticExpressions) throw throwUnexpectedNodeError(node, tokens);
	const { operator, left, right } = node;
	if (operator !== "+" && operator !== "-" && operator !== "*" && operator !== "/" && operator !== "%" && operator !== "**") throw throwOperatorError();
	if (left.type === "PrivateIdentifier") throw throwUnexpectedNodeError(left, tokens);
	validateExpr(left, throwOperatorError);
	validateExpr(right, () => throwUnexpectedNodeError(right, tokens));
	/**
	* Validate Expression node
	*/
	function validateExpr(expr, throwError) {
		if (expr.type === "Literal") {
			if (typeof expr.value !== "number") throw throwError();
		} else if (expr.type !== "BinaryExpression" && expr.type !== "UnaryExpression") throw throwError();
		setParent$1(expr, node);
	}
	/**
	* Throw error
	*/
	function throwOperatorError() {
		throw throwUnexpectedTokenError(operator, tokens.getTokenAfter(tokens.getFirstToken(node), (t) => t.value === operator) || node);
	}
}
/**
* Check if given node is NaN or Infinity or undefined
*/
function isStaticValueIdentifier(node, ctx) {
	if (isNumberIdentifier$1(node, ctx)) return true;
	return node.name === "undefined" && ctx.undefinedKeywords;
}
/**
* Check if given node is NaN or Infinity
*/
function isNumberIdentifier$1(node, ctx) {
	if (node.name === "Infinity" && ctx.infinities) return true;
	if (node.name === "NaN" && ctx.nans) return true;
	return false;
}
/** Set parent node */
function setParent$1(prop, parent) {
	prop.parent = parent;
}

//#endregion
//#region src/parser/modules/espree.ts
let espreeCache = null;
/**
* Get the path to the loaded `espree`'s package.json.
* If the loaded ESLint was not found, just returns `require.resolve("espree/package.json")`.
*/
function getEspreePath() {
	const data = getEspreeData();
	if (!data) return null;
	return path.dirname(data.packageJsonPath);
}
/**
*
*/
function getEspreeData() {
	if (!espreeCache) espreeCache = loadNewest([{
		getPkg() {
			return requireFromCwd("espree/package.json");
		},
		get() {
			const packageJsonPath = resolveFromCwd("espree/package.json");
			if (!packageJsonPath) return null;
			return {
				packageJsonPath,
				kind: "cwd"
			};
		}
	}, {
		getPkg() {
			return requireFromLinter("espree/package.json");
		},
		get() {
			const packageJsonPath = resolveFromLinter("espree/package.json");
			if (!packageJsonPath) return null;
			return {
				packageJsonPath,
				kind: "linter"
			};
		}
	}]);
	return espreeCache;
}

//#endregion
//#region src/parser/modules/acorn.ts
let acornCache;
/**
* Load `acorn` from the loaded ESLint.
* If the loaded ESLint was not found, just returns `require("acorn")`.
*/
function getAcorn() {
	if (!acornCache) acornCache = loadNewest([
		{
			getPkg() {
				return requireFromCwd("acorn/package.json");
			},
			get() {
				return requireFromCwd("acorn");
			}
		},
		{
			getPkg() {
				return requireFromEspree("acorn/package.json");
			},
			get() {
				return requireFromEspree("acorn");
			}
		},
		{
			getPkg() {
				return acornPkg;
			},
			get() {
				return acorn;
			}
		}
	]);
	return acornCache;
}
/**
* Get module from espree
*/
function requireFromEspree(module) {
	try {
		const espreePath = getEspreePath();
		if (!espreePath) return null;
		return createRequire(path.join(espreePath, "__placeholder__.js"))(module);
	} catch {}
	return null;
}

//#endregion
//#region src/parser/convert.ts
var TokenConvertor = class {
	constructor(ctx, code) {
		this.templateBuffer = [];
		this.ctx = ctx;
		this.code = code;
		this.tokTypes = getAcorn().tokTypes;
	}
	convertToken(token) {
		const { tokTypes } = this;
		let type, value;
		const additional = {};
		if (token.type === tokTypes.eof) return null;
		else if (token.type === tokTypes.string) {
			type = "String";
			value = this.code.slice(...token.range);
		} else if (token.type === tokTypes.num) {
			type = "Numeric";
			value = this.code.slice(...token.range);
		} else if (token.type.keyword) {
			if (token.type.keyword === "true" || token.type.keyword === "false") type = "Boolean";
			else if (token.type.keyword === "null") type = "Null";
			else type = "Keyword";
			value = token.value;
		} else if (token.type === tokTypes.braceL || token.type === tokTypes.braceR || token.type === tokTypes.bracketL || token.type === tokTypes.bracketR || token.type === tokTypes.colon || token.type === tokTypes.comma || token.type === tokTypes.plusMin) {
			type = "Punctuator";
			value = this.code.slice(...token.range);
		} else if (token.type === tokTypes.name) {
			type = "Identifier";
			value = token.value;
		} else if (token.type === tokTypes.backQuote) {
			if (this.templateBuffer.length > 0) {
				const first = this.templateBuffer[0];
				this.templateBuffer.length = 0;
				return {
					type: "Template",
					value: this.code.slice(first.start, token.end),
					range: [first.start, token.end],
					loc: {
						start: first.loc.start,
						end: token.loc.end
					}
				};
			}
			this.templateBuffer.push(token);
			return null;
		} else if (token.type === tokTypes.template) {
			if (this.templateBuffer.length === 0) return throwUnexpectedTokenError(this.code.slice(...token.range), token);
			this.templateBuffer.push(token);
			return null;
		} else if (token.type === tokTypes.regexp) {
			const reValue = token.value;
			type = "RegularExpression";
			additional.regex = {
				flags: reValue.flags,
				pattern: reValue.pattern
			};
			value = `/${reValue.pattern}/${reValue.flags}`;
		} else if (this.ctx.parentheses && (token.type === tokTypes.parenL || token.type === tokTypes.parenR)) {
			type = "Punctuator";
			value = this.code.slice(...token.range);
		} else if (this.ctx.staticExpressions && (token.type === tokTypes.star || token.type === tokTypes.slash || token.type === tokTypes.modulo || token.type === tokTypes.starstar)) {
			type = "Punctuator";
			value = this.code.slice(...token.range);
		} else return throwUnexpectedTokenError(this.code.slice(...token.range), token);
		token.type = type;
		token.value = value;
		for (const k in additional) token[k] = additional[k];
		return token;
	}
};
/**
* Convert root expression node to JSONProgram node
*/
function convertProgramNode(node, tokens, ctx, code) {
	/* istanbul ignore next */
	if (node.type !== "JSONObjectExpression" && node.type !== "JSONArrayExpression" && node.type !== "JSONLiteral" && node.type !== "JSONUnaryExpression" && node.type !== "JSONIdentifier" && node.type !== "JSONTemplateLiteral" && node.type !== "JSONBinaryExpression") return throwUnexpectedNodeError(node, tokens);
	if (node.type === "JSONIdentifier") {
		if (!isStaticValueIdentifier(node, ctx)) return throwUnexpectedNodeError(node, tokens);
	}
	const body = {
		type: "JSONExpressionStatement",
		expression: node,
		...cloneLocation(node),
		parent: null
	};
	setParent(node, body);
	const end = code.length;
	const endLoc = getAcorn().getLineInfo(code, end);
	const nn = {
		type: "Program",
		body: [body],
		comments: [],
		tokens: [],
		range: [0, end],
		loc: {
			start: {
				line: 1,
				column: 0
			},
			end: {
				line: endLoc.line,
				column: endLoc.column
			}
		},
		parent: null
	};
	setParent(body, nn);
	return nn;
}
/** Clone locations */
function cloneLocation(node) {
	const range = node.range;
	const loc = node.loc;
	return {
		range: [range[0], range[1]],
		loc: {
			start: {
				line: loc.start.line,
				column: loc.start.column
			},
			end: {
				line: loc.end.line,
				column: loc.end.column
			}
		}
	};
}
/** Set parent node */
function setParent(prop, parent) {
	prop.parent = parent;
}

//#endregion
//#region src/parser/extend-parser.ts
let parserCache;
const PRIVATE = Symbol("ExtendParser#private");
const PRIVATE_PROCESS_NODE = Symbol("ExtendParser#processNode");
/** Get extend parser */
function getParser() {
	if (parserCache) return parserCache;
	parserCache = class ExtendParser extends getAcorn().Parser {
		constructor(options, code, pos) {
			super((() => {
				const tokenConvertor = new TokenConvertor(options.ctx, code);
				const onToken = options.onToken || ((token) => {
					const t = tokenConvertor.convertToken(token);
					if (t) this[PRIVATE].tokenStore.add(t);
				});
				return {
					ecmaVersion: options.ecmaVersion,
					sourceType: options.sourceType,
					ranges: true,
					locations: true,
					allowReserved: true,
					onToken,
					onComment: (block, text, start, end, startLoc, endLoc) => {
						const comment = {
							type: block ? "Block" : "Line",
							value: text,
							range: [start, end],
							loc: {
								start: startLoc,
								end: endLoc
							}
						};
						if (!this[PRIVATE].ctx.comments) throw throwUnexpectedCommentError(comment);
						this[PRIVATE].comments.push(comment);
					}
				};
			})(), code, pos);
			this[PRIVATE] = {
				code,
				ctx: options.ctx,
				tokenStore: options.tokenStore,
				comments: options.comments,
				nodes: options.nodes
			};
		}
		/**
		* Collect tokens.
		*/
		tokenize() {
			const acornInstance = this;
			const tokTypes = getAcorn().tokTypes;
			do
				acornInstance.next();
			while (acornInstance.type !== tokTypes.eof);
			acornInstance.next();
		}
		finishNode(...args) {
			const result = super.finishNode(...args);
			return this[PRIVATE_PROCESS_NODE](result);
		}
		finishNodeAt(...args) {
			const result = super.finishNodeAt(...args);
			return this[PRIVATE_PROCESS_NODE](result);
		}
		[PRIVATE_PROCESS_NODE](node) {
			const { tokenStore, ctx, nodes } = this[PRIVATE];
			validateNode(node, tokenStore, ctx);
			nodes.push(node);
			return node;
		}
		raise(pos, message) {
			const loc = getAcorn().getLineInfo(this[PRIVATE].code, pos);
			throw new ParseError(message, pos, loc.line, loc.column + 1);
		}
		raiseRecoverable(pos, message) {
			this.raise(pos, message);
		}
		unexpected(pos) {
			if (pos != null) {
				this.raise(pos, "Unexpected token.");
				return;
			}
			const start = this.start;
			const end = this.end;
			const token = this[PRIVATE].code.slice(start, end);
			if (token) {
				const message = `Unexpected token '${token}'.`;
				this.raise(start, message);
			} else {
				if (!this[PRIVATE].nodes.length) this.raise(0, "Expected to be an expression, but got empty.");
				if (this[PRIVATE].tokenStore.tokens.length) {
					const last = this[PRIVATE].tokenStore.tokens[this[PRIVATE].tokenStore.tokens.length - 1];
					this.raise(last.range[0], `Unexpected token '${last.value}'.`);
				}
				this.raise(start, "Unexpected token.");
			}
		}
	};
	return parserCache;
}
/** Get extend parser */
function getAnyTokenErrorParser() {
	return class ExtendParser extends getParser() {
		constructor(options, code, pos) {
			super({
				...options,
				onToken: (token) => {
					return throwUnexpectedTokenError(code.slice(...token.range), token);
				}
			}, code, pos);
		}
	};
}

//#endregion
//#region src/parser/syntax-context.ts
/**
* Normalize json syntax option
*/
function getJSONSyntaxContext(str) {
	const upperCase = str?.toUpperCase();
	if (upperCase === "JSON") return {
		trailingCommas: false,
		comments: false,
		plusSigns: false,
		spacedSigns: false,
		leadingOrTrailingDecimalPoints: false,
		infinities: false,
		nans: false,
		numericSeparators: false,
		binaryNumericLiterals: false,
		octalNumericLiterals: false,
		legacyOctalNumericLiterals: false,
		invalidJsonNumbers: false,
		multilineStrings: false,
		unquoteProperties: false,
		singleQuotes: false,
		numberProperties: false,
		undefinedKeywords: false,
		sparseArrays: false,
		regExpLiterals: false,
		templateLiterals: false,
		bigintLiterals: false,
		unicodeCodepointEscapes: false,
		escapeSequenceInIdentifier: false,
		parentheses: false,
		staticExpressions: false
	};
	if (upperCase === "JSONC") return {
		trailingCommas: true,
		comments: true,
		plusSigns: false,
		spacedSigns: false,
		leadingOrTrailingDecimalPoints: false,
		infinities: false,
		nans: false,
		numericSeparators: false,
		binaryNumericLiterals: false,
		octalNumericLiterals: false,
		legacyOctalNumericLiterals: false,
		invalidJsonNumbers: false,
		multilineStrings: false,
		unquoteProperties: false,
		singleQuotes: false,
		numberProperties: false,
		undefinedKeywords: false,
		sparseArrays: false,
		regExpLiterals: false,
		templateLiterals: false,
		bigintLiterals: false,
		unicodeCodepointEscapes: false,
		escapeSequenceInIdentifier: false,
		parentheses: false,
		staticExpressions: false
	};
	if (upperCase === "JSON5") return {
		trailingCommas: true,
		comments: true,
		plusSigns: true,
		spacedSigns: true,
		leadingOrTrailingDecimalPoints: true,
		infinities: true,
		nans: true,
		numericSeparators: false,
		binaryNumericLiterals: false,
		octalNumericLiterals: false,
		legacyOctalNumericLiterals: false,
		invalidJsonNumbers: true,
		multilineStrings: true,
		unquoteProperties: true,
		singleQuotes: true,
		numberProperties: false,
		undefinedKeywords: false,
		sparseArrays: false,
		regExpLiterals: false,
		templateLiterals: false,
		bigintLiterals: false,
		unicodeCodepointEscapes: false,
		escapeSequenceInIdentifier: false,
		parentheses: false,
		staticExpressions: false
	};
	return {
		trailingCommas: true,
		comments: true,
		plusSigns: true,
		spacedSigns: true,
		leadingOrTrailingDecimalPoints: true,
		infinities: true,
		nans: true,
		numericSeparators: true,
		binaryNumericLiterals: true,
		octalNumericLiterals: true,
		legacyOctalNumericLiterals: true,
		invalidJsonNumbers: true,
		multilineStrings: true,
		unquoteProperties: true,
		singleQuotes: true,
		numberProperties: true,
		undefinedKeywords: true,
		sparseArrays: true,
		regExpLiterals: true,
		templateLiterals: true,
		bigintLiterals: true,
		unicodeCodepointEscapes: true,
		escapeSequenceInIdentifier: true,
		parentheses: true,
		staticExpressions: true
	};
}

//#endregion
//#region src/parser/parser.ts
/**
* Parse JSON source code
*/
function parseJSON(code, options) {
	const parserOptions = Object.assign({ filePath: "<input>" }, options || {}, {
		loc: true,
		range: true,
		raw: true,
		tokens: true,
		comment: true,
		ecmaVersion: "latest"
	});
	const ctx = getJSONSyntaxContext(options?.jsonSyntax);
	const tokens = [];
	const comments = [];
	const tokenStore = new TokenStore(tokens);
	const nodes = [];
	parserOptions.ctx = ctx;
	parserOptions.tokenStore = tokenStore;
	parserOptions.comments = comments;
	parserOptions.nodes = nodes;
	const baseAst = getParser().parseExpressionAt(code, 0, parserOptions);
	for (const node of nodes) node.type = `JSON${node.type}`;
	const ast = convertProgramNode(baseAst, tokenStore, ctx, code);
	let lastIndex = Math.max(baseAst.range[1], tokens[tokens.length - 1]?.range[1] ?? 0, comments[comments.length - 1]?.range[1] ?? 0);
	let lastChar = code[lastIndex];
	while (lastChar === "\n" || lastChar === "\r" || lastChar === " " || lastChar === "	") {
		lastIndex++;
		lastChar = code[lastIndex];
	}
	if (lastIndex < code.length) getAnyTokenErrorParser().parseExpressionAt(code, lastIndex, parserOptions);
	ast.tokens = tokens;
	ast.comments = comments;
	return ast;
}
/**
* Parse source code
*/
function parseForESLint(code, options) {
	return {
		ast: parseJSON(code, options),
		visitorKeys: getVisitorKeys(),
		services: { isJSON: true }
	};
}

//#endregion
//#region src/parser/tokenizer.ts
/**
* Tokenizes the given code.
* @param code The code to tokenize.
* @param options The options to use for tokenization.
* @private
*/
function tokenize(code, options) {
	const parserOptions = Object.assign({ filePath: "<input>" }, options || {}, {
		loc: true,
		range: true,
		raw: true,
		tokens: true,
		comment: true,
		ecmaVersion: "latest"
	});
	const ctx = getJSONSyntaxContext(options?.jsonSyntax);
	const tokens = [];
	const comments = [];
	const tokenStore = new TokenStore(tokens);
	parserOptions.ctx = ctx;
	parserOptions.tokenStore = tokenStore;
	parserOptions.comments = comments;
	getParser().tokenizer(code, parserOptions).tokenize();
	if (!options?.includeComments) return tokens;
	const result = [];
	let commentIndex = 0;
	for (const token of tokens) {
		while (commentIndex < comments.length && comments[commentIndex].range[0] < token.range[0]) {
			result.push(comments[commentIndex]);
			commentIndex++;
		}
		result.push(token);
	}
	while (commentIndex < comments.length) {
		result.push(comments[commentIndex]);
		commentIndex++;
	}
	return result;
}

//#endregion
//#region src/parser/traverse.ts
/**
* Check that the given key should be traversed or not.
* @this {Traversable}
* @param key The key to check.
* @returns `true` if the key should be traversed.
*/
function fallbackKeysFilter(key) {
	let value = null;
	return key !== "comments" && key !== "leadingComments" && key !== "loc" && key !== "parent" && key !== "range" && key !== "tokens" && key !== "trailingComments" && (value = this[key]) !== null && typeof value === "object" && (typeof value.type === "string" || Array.isArray(value));
}
/**
* Get the keys of the given node to traverse it.
* @param node The node to get.
* @returns The keys to traverse.
*/
function getFallbackKeys(node) {
	return Object.keys(node).filter(fallbackKeysFilter, node);
}
/**
* Get the keys of the given node to traverse it.
* @param node The node to get.
* @returns The keys to traverse.
*/
function getKeys(node, visitorKeys) {
	return ((visitorKeys || getVisitorKeys())[node.type] || getFallbackKeys(node)).filter((key) => !getNodes(node, key).next().done);
}
/**
* Get the nodes of the given node.
* @param node The node to get.
*/
function* getNodes(node, key) {
	const child = node[key];
	if (Array.isArray(child)) {
		for (const c of child) if (isNode(c)) yield c;
	} else if (isNode(child)) yield child;
}
/**
* Check whether a given value is a node.
* @param x The value to check.
* @returns `true` if the value is a node.
*/
function isNode(x) {
	return x !== null && typeof x === "object" && typeof x.type === "string";
}
/**
* Traverse the given node.
* @param node The node to traverse.
* @param parent The parent node.
* @param visitor The node visitor.
*/
function traverse(node, parent, visitor) {
	visitor.enterNode(node, parent);
	const keys = getKeys(node, visitor.visitorKeys);
	for (const key of keys) for (const child of getNodes(node, key)) traverse(child, node, visitor);
	visitor.leaveNode(node, parent);
}
/**
* Traverse the given AST tree.
* @param node Root node to traverse.
* @param visitor Visitor.
*/
function traverseNodes(node, visitor) {
	traverse(node, null, visitor);
}

//#endregion
//#region src/utils/ast.ts
/**
* Checks if given node is JSONExpression
*/
function isExpression(node) {
	if (node.type === "JSONIdentifier" || node.type === "JSONLiteral") {
		const parent = node.parent;
		if (parent.type === "JSONProperty" && parent.key === node) return false;
		return true;
	}
	if (node.type === "JSONObjectExpression" || node.type === "JSONArrayExpression" || node.type === "JSONUnaryExpression" || node.type === "JSONTemplateLiteral" || node.type === "JSONBinaryExpression") return true;
	return false;
}
/**
* Checks if given node is JSONNumberIdentifier
*/
function isNumberIdentifier(node) {
	return isExpression(node) && (node.name === "Infinity" || node.name === "NaN");
}
/**
* Checks if given node is JSONUndefinedIdentifier
*/
function isUndefinedIdentifier(node) {
	return isExpression(node) && node.name === "undefined";
}
const resolver = {
	Program(node) {
		if (node.body.length !== 1 || node.body[0].type !== "JSONExpressionStatement") throw new Error("Illegal argument");
		return getStaticJSONValue(node.body[0]);
	},
	JSONExpressionStatement(node) {
		return getStaticJSONValue(node.expression);
	},
	JSONObjectExpression(node) {
		const object = {};
		for (const prop of node.properties) Object.assign(object, getStaticJSONValue(prop));
		return object;
	},
	JSONProperty(node) {
		return { [node.key.type === "JSONLiteral" ? `${node.key.value}` : node.key.name]: getStaticJSONValue(node.value) };
	},
	JSONArrayExpression(node) {
		const array = [];
		for (let index = 0; index < node.elements.length; index++) {
			const element = node.elements[index];
			if (element) array[index] = getStaticJSONValue(element);
		}
		return array;
	},
	JSONLiteral(node) {
		if (node.regex) try {
			return new RegExp(node.regex.pattern, node.regex.flags);
		} catch {
			return `/${node.regex.pattern}/${node.regex.flags}`;
		}
		if (node.bigint != null) try {
			return BigInt(node.bigint);
		} catch {
			return `${node.bigint}`;
		}
		return node.value;
	},
	JSONUnaryExpression(node) {
		const value = getStaticJSONValue(node.argument);
		return node.operator === "-" ? -value : value;
	},
	JSONBinaryExpression(node) {
		const left = getStaticJSONValue(node.left);
		const right = getStaticJSONValue(node.right);
		return node.operator === "+" ? left + right : node.operator === "-" ? left - right : node.operator === "*" ? left * right : node.operator === "/" ? left / right : node.operator === "%" ? left % right : node.operator === "**" ? left ** right : (() => {
			throw new Error(`Unknown operator: ${node.operator}`);
		})();
	},
	JSONIdentifier(node) {
		if (node.name === "Infinity") return Infinity;
		if (node.name === "NaN") return NaN;
		if (node.name === "undefined") return;
		throw new Error("Illegal argument");
	},
	JSONTemplateLiteral(node) {
		return getStaticJSONValue(node.quasis[0]);
	},
	JSONTemplateElement(node) {
		return node.value.cooked;
	}
};
/**
* Gets the static value for the given node.
*/
function getStaticJSONValue(node) {
	return resolver[node.type](node);
}

//#endregion
//#region package.json
var name$1 = "jsonc-eslint-parser";
var version$1 = "3.1.0";

//#endregion
//#region src/meta.ts
var meta_exports = /* @__PURE__ */ __exportAll({
	name: () => name,
	version: () => version
});
const name = name$1;
const version = version$1;

//#endregion
//#region src/index.ts
const VisitorKeys = getVisitorKeys();

//#endregion
export { VisitorKeys, getStaticJSONValue, isExpression, isNumberIdentifier, isUndefinedIdentifier, meta_exports as meta, name, parseForESLint, parseJSON, tokenize, traverseNodes };