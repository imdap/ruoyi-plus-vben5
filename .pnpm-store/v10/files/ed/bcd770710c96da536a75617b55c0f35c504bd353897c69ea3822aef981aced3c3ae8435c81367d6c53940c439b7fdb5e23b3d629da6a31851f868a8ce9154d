import { t as __exportAll } from "./chunk-DQk6qfdC.mjs";
import "./no-parsing-error-B9_Ixkn3.mjs";
import { getRules } from "./rules.mjs";
import { VisitorKeys, parseForESLint, traverseNodes } from "jsonc-eslint-parser";
import { CallMethodStep, ConfigCommentParser, Directive, TextSourceCodeBase, VisitNodeStep } from "@eslint/plugin-kit";
import { TokenStore } from "@ota-meshi/ast-token-store";

//#region lib/configs/flat/base.ts
var base_default = [{ plugins: { get jsonc() {
	return lib_default;
} } }, {
	files: [
		"*.json",
		"**/*.json",
		"*.json5",
		"**/*.json5",
		"*.jsonc",
		"**/*.jsonc"
	],
	language: "jsonc/x",
	rules: {
		strict: "off",
		"no-unused-expressions": "off",
		"no-unused-vars": "off"
	}
}];

//#endregion
//#region lib/configs/flat/recommended-with-json.ts
var recommended_with_json_default = [...base_default, { rules: {
	"jsonc/comma-dangle": "error",
	"jsonc/no-bigint-literals": "error",
	"jsonc/no-binary-expression": "error",
	"jsonc/no-binary-numeric-literals": "error",
	"jsonc/no-comments": "error",
	"jsonc/no-dupe-keys": "error",
	"jsonc/no-escape-sequence-in-identifier": "error",
	"jsonc/no-floating-decimal": "error",
	"jsonc/no-hexadecimal-numeric-literals": "error",
	"jsonc/no-infinity": "error",
	"jsonc/no-irregular-whitespace": "error",
	"jsonc/no-multi-str": "error",
	"jsonc/no-nan": "error",
	"jsonc/no-number-props": "error",
	"jsonc/no-numeric-separators": "error",
	"jsonc/no-octal-numeric-literals": "error",
	"jsonc/no-octal": "error",
	"jsonc/no-parenthesized": "error",
	"jsonc/no-plus-sign": "error",
	"jsonc/no-regexp-literals": "error",
	"jsonc/no-sparse-arrays": "error",
	"jsonc/no-template-literals": "error",
	"jsonc/no-undefined-value": "error",
	"jsonc/no-unicode-codepoint-escapes": "error",
	"jsonc/no-useless-escape": "error",
	"jsonc/quote-props": "error",
	"jsonc/quotes": "error",
	"jsonc/space-unary-ops": "error",
	"jsonc/valid-json-number": "error",
	"jsonc/vue-custom-block/no-parsing-error": "error"
} }];

//#endregion
//#region lib/configs/flat/recommended-with-jsonc.ts
var recommended_with_jsonc_default = [...base_default, { rules: {
	"jsonc/no-bigint-literals": "error",
	"jsonc/no-binary-expression": "error",
	"jsonc/no-binary-numeric-literals": "error",
	"jsonc/no-dupe-keys": "error",
	"jsonc/no-escape-sequence-in-identifier": "error",
	"jsonc/no-floating-decimal": "error",
	"jsonc/no-hexadecimal-numeric-literals": "error",
	"jsonc/no-infinity": "error",
	"jsonc/no-irregular-whitespace": "error",
	"jsonc/no-multi-str": "error",
	"jsonc/no-nan": "error",
	"jsonc/no-number-props": "error",
	"jsonc/no-numeric-separators": "error",
	"jsonc/no-octal-numeric-literals": "error",
	"jsonc/no-octal": "error",
	"jsonc/no-parenthesized": "error",
	"jsonc/no-plus-sign": "error",
	"jsonc/no-regexp-literals": "error",
	"jsonc/no-sparse-arrays": "error",
	"jsonc/no-template-literals": "error",
	"jsonc/no-undefined-value": "error",
	"jsonc/no-unicode-codepoint-escapes": "error",
	"jsonc/no-useless-escape": "error",
	"jsonc/quote-props": "error",
	"jsonc/quotes": "error",
	"jsonc/space-unary-ops": "error",
	"jsonc/valid-json-number": "error",
	"jsonc/vue-custom-block/no-parsing-error": "error"
} }];

//#endregion
//#region lib/configs/flat/recommended-with-json5.ts
var recommended_with_json5_default = [...base_default, { rules: {
	"jsonc/no-bigint-literals": "error",
	"jsonc/no-binary-expression": "error",
	"jsonc/no-binary-numeric-literals": "error",
	"jsonc/no-dupe-keys": "error",
	"jsonc/no-escape-sequence-in-identifier": "error",
	"jsonc/no-irregular-whitespace": "error",
	"jsonc/no-number-props": "error",
	"jsonc/no-numeric-separators": "error",
	"jsonc/no-octal-numeric-literals": "error",
	"jsonc/no-octal": "error",
	"jsonc/no-parenthesized": "error",
	"jsonc/no-regexp-literals": "error",
	"jsonc/no-sparse-arrays": "error",
	"jsonc/no-template-literals": "error",
	"jsonc/no-undefined-value": "error",
	"jsonc/no-unicode-codepoint-escapes": "error",
	"jsonc/no-useless-escape": "error",
	"jsonc/space-unary-ops": "error",
	"jsonc/vue-custom-block/no-parsing-error": "error"
} }];

//#endregion
//#region lib/configs/flat/prettier.ts
var prettier_default = [...base_default, { rules: {
	"jsonc/array-bracket-newline": "off",
	"jsonc/array-bracket-spacing": "off",
	"jsonc/array-element-newline": "off",
	"jsonc/comma-dangle": "off",
	"jsonc/comma-style": "off",
	"jsonc/indent": "off",
	"jsonc/key-spacing": "off",
	"jsonc/no-floating-decimal": "off",
	"jsonc/object-curly-newline": "off",
	"jsonc/object-curly-spacing": "off",
	"jsonc/object-property-newline": "off",
	"jsonc/quote-props": "off",
	"jsonc/quotes": "off",
	"jsonc/space-unary-ops": "off"
} }];

//#endregion
//#region lib/configs/flat/all.ts
const all = {};
for (const rule of getRules()) {
	if (rule.meta.docs.ruleId === "jsonc/sort-array-values") continue;
	all[rule.meta.docs.ruleId] = "error";
}
const config = [...base_default, { rules: { ...all } }];

//#endregion
//#region lib/meta.ts
var meta_exports = /* @__PURE__ */ __exportAll({
	name: () => name,
	version: () => version
});
const name = "eslint-plugin-jsonc";
const version = "3.1.2";

//#endregion
//#region lib/language/jsonc-source-code.ts
/**
* @fileoverview The JSONCSourceCode class.
*/
const commentParser = new ConfigCommentParser();
/**
* Pattern to match ESLint inline configuration comments in JSONC.
* Matches: eslint, eslint-disable, eslint-enable, eslint-disable-line, eslint-disable-next-line
*/
const INLINE_CONFIG = /^\s*eslint(?:-enable|-disable(?:(?:-next)?-line)?)?(?:\s|$)/u;
/**
* JSONC Source Code Object
*/
var JSONCSourceCode = class extends TextSourceCodeBase {
	hasBOM;
	parserServices;
	visitorKeys;
	tokenStore;
	#steps = null;
	#cacheTokensAndComments = null;
	#inlineConfigComments = null;
	/**
	* Creates a new instance.
	*/
	constructor(config) {
		super({
			ast: config.ast,
			text: config.text
		});
		this.hasBOM = Boolean(config.hasBOM);
		this.parserServices = config.parserServices;
		this.visitorKeys = config.visitorKeys || VisitorKeys;
		this.tokenStore = new TokenStore({
			tokens: [...config.ast.tokens, ...config.ast.comments],
			isComment: (token) => token.type === "Block" || token.type === "Line"
		});
	}
	traverse() {
		if (this.#steps != null) return this.#steps;
		const steps = [];
		this.#steps = steps;
		const root = this.ast;
		steps.push(new CallMethodStep({
			target: "onCodePathStart",
			args: [{}, root]
		}));
		traverseNodes(root, {
			enterNode(n) {
				steps.push(new VisitNodeStep({
					target: n,
					phase: 1,
					args: [n]
				}));
			},
			leaveNode(n) {
				steps.push(new VisitNodeStep({
					target: n,
					phase: 2,
					args: [n]
				}));
			}
		});
		steps.push(new CallMethodStep({
			target: "onCodePathEnd",
			args: [{}, root]
		}));
		return steps;
	}
	/**
	* Gets all tokens and comments.
	*/
	get tokensAndComments() {
		return this.#cacheTokensAndComments ??= [...this.ast.tokens, ...this.ast.comments].sort((a, b) => a.range[0] - b.range[0]);
	}
	getLines() {
		return this.lines;
	}
	getAllComments() {
		return this.tokenStore.getAllComments();
	}
	/**
	* Returns an array of all inline configuration nodes found in the source code.
	* This includes eslint-disable, eslint-enable, eslint-disable-line,
	* eslint-disable-next-line, and eslint (for inline config) comments.
	*/
	getInlineConfigNodes() {
		if (!this.#inlineConfigComments) this.#inlineConfigComments = this.ast.comments.filter((comment) => INLINE_CONFIG.test(comment.value));
		return this.#inlineConfigComments;
	}
	/**
	* Returns directives that enable or disable rules along with any problems
	* encountered while parsing the directives.
	*/
	getDisableDirectives() {
		const problems = [];
		const directives = [];
		this.getInlineConfigNodes().forEach((comment) => {
			const directive = commentParser.parseDirective(comment.value);
			if (!directive) return;
			const { label, value, justification } = directive;
			if (label === "eslint-disable-line" && comment.loc.start.line !== comment.loc.end.line) {
				const message = `${label} comment should not span multiple lines.`;
				problems.push({
					ruleId: null,
					message,
					loc: comment.loc
				});
				return;
			}
			switch (label) {
				case "eslint-disable":
				case "eslint-enable":
				case "eslint-disable-next-line":
				case "eslint-disable-line": {
					const directiveType = label.slice(7);
					directives.push(new Directive({
						type: directiveType,
						node: comment,
						value,
						justification
					}));
					break;
				}
			}
		});
		return {
			problems,
			directives
		};
	}
	/**
	* Returns inline rule configurations along with any problems
	* encountered while parsing the configurations.
	*/
	applyInlineConfig() {
		const problems = [];
		const configs = [];
		this.getInlineConfigNodes().forEach((comment) => {
			const directive = commentParser.parseDirective(comment.value);
			if (!directive) return;
			const { label, value } = directive;
			if (label === "eslint") {
				const parseResult = commentParser.parseJSONLikeConfig(value);
				if (parseResult.ok) configs.push({
					config: { rules: parseResult.config },
					loc: comment.loc
				});
				else problems.push({
					ruleId: null,
					message: parseResult.error.message,
					loc: comment.loc
				});
			}
		});
		return {
			configs,
			problems
		};
	}
	/**
	* Gets the source text for the given node or the entire source if no node is provided.
	*/
	getText(node, beforeCount, afterCount) {
		if (!node) return this.text;
		const range = node.range;
		const start = range[0] - (beforeCount ?? 0);
		const end = range[1] + (afterCount ?? 0);
		return this.text.slice(Math.max(0, start), Math.min(this.text.length, end));
	}
	getNodeByRangeIndex(index) {
		let node = find([this.ast]);
		if (!node) return null;
		while (true) {
			const child = find(this._getChildren(node));
			if (!child) return node;
			node = child;
		}
		/**
		* Finds a node that contains the given index.
		*/
		function find(nodes) {
			for (const node of nodes) if (node.range[0] <= index && index < node.range[1]) return node;
			return null;
		}
	}
	getFirstToken(node, options) {
		return this.tokenStore.getFirstToken(node, options);
	}
	getFirstTokens(node, options) {
		return this.tokenStore.getFirstTokens(node, options);
	}
	getLastToken(node, options) {
		return this.tokenStore.getLastToken(node, options);
	}
	getLastTokens(node, options) {
		return this.tokenStore.getLastTokens(node, options);
	}
	getTokenBefore(node, options) {
		return this.tokenStore.getTokenBefore(node, options);
	}
	getTokensBefore(node, options) {
		return this.tokenStore.getTokensBefore(node, options);
	}
	getTokenAfter(node, options) {
		return this.tokenStore.getTokenAfter(node, options);
	}
	getTokensAfter(node, options) {
		return this.tokenStore.getTokensAfter(node, options);
	}
	getFirstTokenBetween(left, right, options) {
		return this.tokenStore.getFirstTokenBetween(left, right, options);
	}
	getFirstTokensBetween(left, right, options) {
		return this.tokenStore.getFirstTokensBetween(left, right, options);
	}
	getLastTokenBetween(left, right, options) {
		return this.tokenStore.getLastTokenBetween(left, right, options);
	}
	getLastTokensBetween(left, right, options) {
		return this.tokenStore.getLastTokensBetween(left, right, options);
	}
	getTokens(node, options) {
		return this.tokenStore.getTokens(node, options);
	}
	getTokensBetween(left, right, options) {
		return this.tokenStore.getTokensBetween(left, right, options);
	}
	getCommentsInside(nodeOrToken) {
		return this.tokenStore.getCommentsInside(nodeOrToken);
	}
	getCommentsBefore(nodeOrToken) {
		return this.tokenStore.getCommentsBefore(nodeOrToken);
	}
	getCommentsAfter(nodeOrToken) {
		return this.tokenStore.getCommentsAfter(nodeOrToken);
	}
	commentsExistBetween(first, second) {
		return this.tokenStore.commentsExistBetween(first, second);
	}
	isSpaceBetween(first, second) {
		const [left, right] = first.range[1] <= second.range[0] ? [first, second] : [second, first];
		return this.tokenStore.isSpaceBetween(left, right);
	}
	/**
	* Compatibility for ESLint's SourceCode API
	* @deprecated JSONC does not have scopes
	*/
	getScope(node) {
		if (node?.type !== "Program") return null;
		return createFakeGlobalScope(this.ast);
	}
	/**
	* Compatibility for ESLint's SourceCode API
	* @deprecated JSONC does not have scopes
	*/
	get scopeManager() {
		return {
			scopes: [],
			globalScope: createFakeGlobalScope(this.ast),
			acquire: (node) => {
				if (node.type === "Program") return createFakeGlobalScope(this.ast);
				return null;
			},
			getDeclaredVariables: () => [],
			addGlobals: () => {}
		};
	}
	/**
	* Compatibility for ESLint's SourceCode API
	* @deprecated
	*/
	isSpaceBetweenTokens(first, second) {
		return this.isSpaceBetween(first, second);
	}
	_getChildren(node) {
		const keys = this.visitorKeys[node.type] || [];
		const children = [];
		for (const key of keys) {
			const value = node[key];
			if (Array.isArray(value)) {
				for (const element of value) if (isNode(element)) children.push(element);
			} else if (isNode(value)) children.push(value);
		}
		return children;
	}
};
/**
* Determines whether the given value is a JSONC AST node.
*/
function isNode(value) {
	return typeof value === "object" && value !== null && typeof value.type === "string" && Array.isArray(value.range) && Boolean(value.loc) && typeof value.loc === "object";
}
/**
* Creates a fake global scope for JSONC files.
* @deprecated JSONC does not have scopes
*/
function createFakeGlobalScope(node) {
	const fakeGlobalScope = {
		type: "global",
		block: node,
		set: /* @__PURE__ */ new Map(),
		through: [],
		childScopes: [],
		variableScope: null,
		variables: [],
		references: [],
		functionExpressionScope: false,
		isStrict: false,
		upper: null,
		implicit: {
			variables: [],
			set: /* @__PURE__ */ new Map()
		}
	};
	fakeGlobalScope.variableScope = fakeGlobalScope;
	return fakeGlobalScope;
}

//#endregion
//#region lib/language/jsonc-language.ts
/**
* The JSONC language implementation for ESLint.
*/
var JSONCLanguage = class {
	/**
	* The type of file to read.
	*/
	fileType = "text";
	/**
	* The line number at which the parser starts counting.
	*/
	lineStart = 1;
	/**
	* The column number at which the parser starts counting.
	*/
	columnStart = 0;
	/**
	* The name of the key that holds the type of the node.
	*/
	nodeTypeKey = "type";
	_mode;
	constructor(options) {
		this._mode = options?.mode ?? "EXTENDED";
	}
	/**
	* Validates the language options.
	*/
	validateLanguageOptions(_languageOptions) {}
	normalizeLanguageOptions(languageOptions) {
		return {
			ecmaVersion: "latest",
			...languageOptions,
			parserOptions: {
				...this._mode !== "EXTENDED" ? { jsonSyntax: this._mode } : {},
				...languageOptions.parserOptions
			}
		};
	}
	/**
	* Parses the given file into an AST.
	*/
	parse(file, context) {
		const text = file.body;
		try {
			return {
				ok: true,
				ast: parseForESLint(text, { jsonSyntax: context.languageOptions?.parserOptions?.jsonSyntax ?? (this._mode !== "EXTENDED" ? this._mode : void 0) }).ast
			};
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			const parseError = error;
			return {
				ok: false,
				errors: [{
					message,
					line: parseError.lineNumber ?? 1,
					column: parseError.column ?? 1
				}]
			};
		}
	}
	/**
	* Creates a new SourceCode object for the given file and parse result.
	*/
	createSourceCode(file, parseResult) {
		return new JSONCSourceCode({
			text: file.body,
			ast: parseResult.ast,
			hasBOM: file.bom,
			parserServices: { isJSON: true },
			visitorKeys: VisitorKeys
		});
	}
};

//#endregion
//#region lib/index.ts
const configs = {
	base: base_default,
	"recommended-with-json": recommended_with_json_default,
	"recommended-with-jsonc": recommended_with_jsonc_default,
	"recommended-with-json5": recommended_with_json5_default,
	prettier: prettier_default,
	all: config,
	"flat/base": base_default,
	"flat/recommended-with-json": recommended_with_json_default,
	"flat/recommended-with-jsonc": recommended_with_jsonc_default,
	"flat/recommended-with-json5": recommended_with_json5_default,
	"flat/prettier": prettier_default,
	"flat/all": config
};
const rules = getRules().reduce((obj, r) => {
	obj[r.meta.docs.ruleName] = r;
	return obj;
}, {});
const languages = {
	json: new JSONCLanguage({ mode: "JSON" }),
	jsonc: new JSONCLanguage({ mode: "JSONC" }),
	json5: new JSONCLanguage({ mode: "JSON5" }),
	x: new JSONCLanguage({ mode: "EXTENDED" })
};
var lib_default = {
	meta: meta_exports,
	configs,
	rules,
	languages
};

//#endregion
export { configs, lib_default as default, languages, meta_exports as meta, rules };