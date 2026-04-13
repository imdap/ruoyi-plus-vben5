import { a as __toESM, i as __require, n as __esmMin, t as __commonJSMin } from "./chunk-DSjvVL_1-BYdvZw3N.js";
import { t as bigSign } from "./utils-D8dQkKEd-BtAa7w-M.js";
import { t as createJiti } from "./jiti-Bb1dT6Cw-BzC3jhZX.js";
import * as path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
//#region ../../node_modules/.pnpm/prettier-plugin-tailwindcss@0.0.0-insiders.3997fbd_prettier@3.8.1/node_modules/prettier-plugin-tailwindcss/dist/v3-D-mr2VVh.mjs
var getFilename, __filename;
var init_esm_shims = __esmMin((() => {
	getFilename = () => fileURLToPath(import.meta.url);
	__filename = /* @__PURE__ */ getFilename();
}));
var require_resolve_from = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const path$2 = __require("path");
	const Module = __require("module");
	const fs = __require("fs");
	const resolveFrom = (fromDirectory, moduleId, silent) => {
		if (typeof fromDirectory !== "string") throw new TypeError(`Expected \`fromDir\` to be of type \`string\`, got \`${typeof fromDirectory}\``);
		if (typeof moduleId !== "string") throw new TypeError(`Expected \`moduleId\` to be of type \`string\`, got \`${typeof moduleId}\``);
		try {
			fromDirectory = fs.realpathSync(fromDirectory);
		} catch (error) {
			if (error.code === "ENOENT") fromDirectory = path$2.resolve(fromDirectory);
			else if (silent) return;
			else throw error;
		}
		const fromFile = path$2.join(fromDirectory, "noop.js");
		const resolveFileName = () => Module._resolveFilename(moduleId, {
			id: fromFile,
			filename: fromFile,
			paths: Module._nodeModulePaths(fromDirectory)
		});
		if (silent) try {
			return resolveFileName();
		} catch (error) {
			return;
		}
		return resolveFileName();
	};
	module.exports = (fromDirectory, moduleId) => resolveFrom(fromDirectory, moduleId);
	module.exports.silent = (fromDirectory, moduleId) => resolveFrom(fromDirectory, moduleId, true);
}));
var require_callsites = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const callsites = () => {
		const _prepareStackTrace = Error.prepareStackTrace;
		Error.prepareStackTrace = (_, stack) => stack;
		const stack = (/* @__PURE__ */ new Error()).stack.slice(1);
		Error.prepareStackTrace = _prepareStackTrace;
		return stack;
	};
	module.exports = callsites;
	module.exports.default = callsites;
}));
var require_parent_module = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const callsites = require_callsites();
	module.exports = (filePath) => {
		const stacks = callsites();
		if (!filePath) return stacks[2].getFileName();
		let hasSeenValue = false;
		stacks.shift();
		for (const stack of stacks) {
			const parentFilePath = stack.getFileName();
			if (typeof parentFilePath !== "string") continue;
			if (parentFilePath === filePath) {
				hasSeenValue = true;
				continue;
			}
			if (parentFilePath === "module.js") continue;
			if (hasSeenValue && parentFilePath !== filePath) return parentFilePath;
		}
	};
}));
var require_clear_module = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	init_esm_shims();
	const path$1 = __require("path");
	const resolveFrom = require_resolve_from();
	const parentModule = require_parent_module();
	const resolve = (moduleId) => {
		try {
			return resolveFrom(path$1.dirname(parentModule(__filename)), moduleId);
		} catch (_) {}
	};
	const clear = (moduleId) => {
		if (typeof moduleId !== "string") throw new TypeError(`Expected a \`string\`, got \`${typeof moduleId}\``);
		const filePath = resolve(moduleId);
		if (!filePath) return;
		if (__require.cache[filePath] && __require.cache[filePath].parent) {
			let i = __require.cache[filePath].parent.children.length;
			while (i--) if (__require.cache[filePath].parent.children[i].id === filePath) __require.cache[filePath].parent.children.splice(i, 1);
		}
		if (__require.cache[filePath]) {
			const children = __require.cache[filePath].children.map((child) => child.id);
			delete __require.cache[filePath];
			for (const id of children) clear(id);
		}
	};
	clear.all = () => {
		const directory = path$1.dirname(parentModule(__filename));
		for (const moduleId of Object.keys(__require.cache)) delete __require.cache[resolveFrom(directory, moduleId)];
	};
	clear.match = (regex) => {
		for (const moduleId of Object.keys(__require.cache)) if (regex.test(moduleId)) clear(moduleId);
	};
	clear.single = (moduleId) => {
		if (typeof moduleId !== "string") throw new TypeError(`Expected a \`string\`, got \`${typeof moduleId}\``);
		delete __require.cache[resolve(moduleId)];
	};
	module.exports = clear;
}));
var require_picocolors = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let p = process || {}, argv = p.argv || [], env = p.env || {};
	let isColorSupported = !(!!env.NO_COLOR || argv.includes("--no-color")) && (!!env.FORCE_COLOR || argv.includes("--color") || p.platform === "win32" || (p.stdout || {}).isTTY && env.TERM !== "dumb" || !!env.CI);
	let formatter = (open, close, replace = open) => (input) => {
		let string = "" + input, index = string.indexOf(close, open.length);
		return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
	};
	let replaceClose = (string, close, replace, index) => {
		let result = "", cursor = 0;
		do {
			result += string.substring(cursor, index) + replace;
			cursor = index + close.length;
			index = string.indexOf(close, cursor);
		} while (~index);
		return result + string.substring(cursor);
	};
	let createColors = (enabled = isColorSupported) => {
		let f = enabled ? formatter : () => String;
		return {
			isColorSupported: enabled,
			reset: f("\x1B[0m", "\x1B[0m"),
			bold: f("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
			dim: f("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
			italic: f("\x1B[3m", "\x1B[23m"),
			underline: f("\x1B[4m", "\x1B[24m"),
			inverse: f("\x1B[7m", "\x1B[27m"),
			hidden: f("\x1B[8m", "\x1B[28m"),
			strikethrough: f("\x1B[9m", "\x1B[29m"),
			black: f("\x1B[30m", "\x1B[39m"),
			red: f("\x1B[31m", "\x1B[39m"),
			green: f("\x1B[32m", "\x1B[39m"),
			yellow: f("\x1B[33m", "\x1B[39m"),
			blue: f("\x1B[34m", "\x1B[39m"),
			magenta: f("\x1B[35m", "\x1B[39m"),
			cyan: f("\x1B[36m", "\x1B[39m"),
			white: f("\x1B[37m", "\x1B[39m"),
			gray: f("\x1B[90m", "\x1B[39m"),
			bgBlack: f("\x1B[40m", "\x1B[49m"),
			bgRed: f("\x1B[41m", "\x1B[49m"),
			bgGreen: f("\x1B[42m", "\x1B[49m"),
			bgYellow: f("\x1B[43m", "\x1B[49m"),
			bgBlue: f("\x1B[44m", "\x1B[49m"),
			bgMagenta: f("\x1B[45m", "\x1B[49m"),
			bgCyan: f("\x1B[46m", "\x1B[49m"),
			bgWhite: f("\x1B[47m", "\x1B[49m"),
			blackBright: f("\x1B[90m", "\x1B[39m"),
			redBright: f("\x1B[91m", "\x1B[39m"),
			greenBright: f("\x1B[92m", "\x1B[39m"),
			yellowBright: f("\x1B[93m", "\x1B[39m"),
			blueBright: f("\x1B[94m", "\x1B[39m"),
			magentaBright: f("\x1B[95m", "\x1B[39m"),
			cyanBright: f("\x1B[96m", "\x1B[39m"),
			whiteBright: f("\x1B[97m", "\x1B[39m"),
			bgBlackBright: f("\x1B[100m", "\x1B[49m"),
			bgRedBright: f("\x1B[101m", "\x1B[49m"),
			bgGreenBright: f("\x1B[102m", "\x1B[49m"),
			bgYellowBright: f("\x1B[103m", "\x1B[49m"),
			bgBlueBright: f("\x1B[104m", "\x1B[49m"),
			bgMagentaBright: f("\x1B[105m", "\x1B[49m"),
			bgCyanBright: f("\x1B[106m", "\x1B[49m"),
			bgWhiteBright: f("\x1B[107m", "\x1B[49m")
		};
	};
	module.exports = createColors();
	module.exports.createColors = createColors;
}));
var require_tokenize$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const SINGLE_QUOTE = "'".charCodeAt(0);
	const DOUBLE_QUOTE = "\"".charCodeAt(0);
	const BACKSLASH = "\\".charCodeAt(0);
	const SLASH = "/".charCodeAt(0);
	const NEWLINE = "\n".charCodeAt(0);
	const SPACE = " ".charCodeAt(0);
	const FEED = "\f".charCodeAt(0);
	const TAB = "	".charCodeAt(0);
	const CR = "\r".charCodeAt(0);
	const OPEN_SQUARE = "[".charCodeAt(0);
	const CLOSE_SQUARE = "]".charCodeAt(0);
	const OPEN_PARENTHESES = "(".charCodeAt(0);
	const CLOSE_PARENTHESES = ")".charCodeAt(0);
	const OPEN_CURLY = "{".charCodeAt(0);
	const CLOSE_CURLY = "}".charCodeAt(0);
	const SEMICOLON = ";".charCodeAt(0);
	const ASTERISK = "*".charCodeAt(0);
	const COLON = ":".charCodeAt(0);
	const AT = "@".charCodeAt(0);
	const RE_AT_END = /[\t\n\f\r "#'()/;[\\\]{}]/g;
	const RE_WORD_END = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g;
	const RE_BAD_BRACKET = /.[\r\n"'(/\\]/;
	const RE_HEX_ESCAPE = /[\da-f]/i;
	module.exports = function tokenizer(input, options = {}) {
		let css = input.css.valueOf();
		let ignore = options.ignoreErrors;
		let code, content, escape, next, quote;
		let currentToken, escaped, escapePos, n, prev;
		let length = css.length;
		let pos = 0;
		let buffer = [];
		let returned = [];
		function position() {
			return pos;
		}
		function unclosed(what) {
			throw input.error("Unclosed " + what, pos);
		}
		function endOfFile() {
			return returned.length === 0 && pos >= length;
		}
		function nextToken(opts) {
			if (returned.length) return returned.pop();
			if (pos >= length) return;
			let ignoreUnclosed = opts ? opts.ignoreUnclosed : false;
			code = css.charCodeAt(pos);
			switch (code) {
				case NEWLINE:
				case SPACE:
				case TAB:
				case CR:
				case FEED:
					next = pos;
					do {
						next += 1;
						code = css.charCodeAt(next);
					} while (code === SPACE || code === NEWLINE || code === TAB || code === CR || code === FEED);
					currentToken = ["space", css.slice(pos, next)];
					pos = next - 1;
					break;
				case OPEN_SQUARE:
				case CLOSE_SQUARE:
				case OPEN_CURLY:
				case CLOSE_CURLY:
				case COLON:
				case SEMICOLON:
				case CLOSE_PARENTHESES: {
					let controlChar = String.fromCharCode(code);
					currentToken = [
						controlChar,
						controlChar,
						pos
					];
					break;
				}
				case OPEN_PARENTHESES:
					prev = buffer.length ? buffer.pop()[1] : "";
					n = css.charCodeAt(pos + 1);
					if (prev === "url" && n !== SINGLE_QUOTE && n !== DOUBLE_QUOTE && n !== SPACE && n !== NEWLINE && n !== TAB && n !== FEED && n !== CR) {
						next = pos;
						do {
							escaped = false;
							next = css.indexOf(")", next + 1);
							if (next === -1) if (ignore || ignoreUnclosed) {
								next = pos;
								break;
							} else unclosed("bracket");
							escapePos = next;
							while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
								escapePos -= 1;
								escaped = !escaped;
							}
						} while (escaped);
						currentToken = [
							"brackets",
							css.slice(pos, next + 1),
							pos,
							next
						];
						pos = next;
					} else {
						next = css.indexOf(")", pos + 1);
						content = css.slice(pos, next + 1);
						if (next === -1 || RE_BAD_BRACKET.test(content)) currentToken = [
							"(",
							"(",
							pos
						];
						else {
							currentToken = [
								"brackets",
								content,
								pos,
								next
							];
							pos = next;
						}
					}
					break;
				case SINGLE_QUOTE:
				case DOUBLE_QUOTE:
					quote = code === SINGLE_QUOTE ? "'" : "\"";
					next = pos;
					do {
						escaped = false;
						next = css.indexOf(quote, next + 1);
						if (next === -1) if (ignore || ignoreUnclosed) {
							next = pos + 1;
							break;
						} else unclosed("string");
						escapePos = next;
						while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
							escapePos -= 1;
							escaped = !escaped;
						}
					} while (escaped);
					currentToken = [
						"string",
						css.slice(pos, next + 1),
						pos,
						next
					];
					pos = next;
					break;
				case AT:
					RE_AT_END.lastIndex = pos + 1;
					RE_AT_END.test(css);
					if (RE_AT_END.lastIndex === 0) next = css.length - 1;
					else next = RE_AT_END.lastIndex - 2;
					currentToken = [
						"at-word",
						css.slice(pos, next + 1),
						pos,
						next
					];
					pos = next;
					break;
				case BACKSLASH:
					next = pos;
					escape = true;
					while (css.charCodeAt(next + 1) === BACKSLASH) {
						next += 1;
						escape = !escape;
					}
					code = css.charCodeAt(next + 1);
					if (escape && code !== SLASH && code !== SPACE && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED) {
						next += 1;
						if (RE_HEX_ESCAPE.test(css.charAt(next))) {
							while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) next += 1;
							if (css.charCodeAt(next + 1) === SPACE) next += 1;
						}
					}
					currentToken = [
						"word",
						css.slice(pos, next + 1),
						pos,
						next
					];
					pos = next;
					break;
				default:
					if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
						next = css.indexOf("*/", pos + 2) + 1;
						if (next === 0) if (ignore || ignoreUnclosed) next = css.length;
						else unclosed("comment");
						currentToken = [
							"comment",
							css.slice(pos, next + 1),
							pos,
							next
						];
						pos = next;
					} else {
						RE_WORD_END.lastIndex = pos + 1;
						RE_WORD_END.test(css);
						if (RE_WORD_END.lastIndex === 0) next = css.length - 1;
						else next = RE_WORD_END.lastIndex - 2;
						currentToken = [
							"word",
							css.slice(pos, next + 1),
							pos,
							next
						];
						buffer.push(currentToken);
						pos = next;
					}
					break;
			}
			pos++;
			return currentToken;
		}
		function back(token) {
			returned.push(token);
		}
		return {
			back,
			endOfFile,
			nextToken,
			position
		};
	};
}));
var require_terminal_highlight = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let pico = require_picocolors();
	let tokenizer = require_tokenize$1();
	let Input;
	function registerInput(dependant) {
		Input = dependant;
	}
	const HIGHLIGHT_THEME = {
		";": pico.yellow,
		":": pico.yellow,
		"(": pico.cyan,
		")": pico.cyan,
		"[": pico.yellow,
		"]": pico.yellow,
		"{": pico.yellow,
		"}": pico.yellow,
		"at-word": pico.cyan,
		"brackets": pico.cyan,
		"call": pico.cyan,
		"class": pico.yellow,
		"comment": pico.gray,
		"hash": pico.magenta,
		"string": pico.green
	};
	function getTokenType([type, value], processor) {
		if (type === "word") {
			if (value[0] === ".") return "class";
			if (value[0] === "#") return "hash";
		}
		if (!processor.endOfFile()) {
			let next = processor.nextToken();
			processor.back(next);
			if (next[0] === "brackets" || next[0] === "(") return "call";
		}
		return type;
	}
	function terminalHighlight(css) {
		let processor = tokenizer(new Input(css), { ignoreErrors: true });
		let result = "";
		while (!processor.endOfFile()) {
			let token = processor.nextToken();
			let color = HIGHLIGHT_THEME[getTokenType(token, processor)];
			if (color) result += token[1].split(/\r?\n/).map((i) => color(i)).join("\n");
			else result += token[1];
		}
		return result;
	}
	terminalHighlight.registerInput = registerInput;
	module.exports = terminalHighlight;
}));
var require_css_syntax_error = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let pico = require_picocolors();
	let terminalHighlight = require_terminal_highlight();
	var CssSyntaxError = class CssSyntaxError extends Error {
		constructor(message, line, column, source, file, plugin) {
			super(message);
			this.name = "CssSyntaxError";
			this.reason = message;
			if (file) this.file = file;
			if (source) this.source = source;
			if (plugin) this.plugin = plugin;
			if (typeof line !== "undefined" && typeof column !== "undefined") if (typeof line === "number") {
				this.line = line;
				this.column = column;
			} else {
				this.line = line.line;
				this.column = line.column;
				this.endLine = column.line;
				this.endColumn = column.column;
			}
			this.setMessage();
			if (Error.captureStackTrace) Error.captureStackTrace(this, CssSyntaxError);
		}
		setMessage() {
			this.message = this.plugin ? this.plugin + ": " : "";
			this.message += this.file ? this.file : "<css input>";
			if (typeof this.line !== "undefined") this.message += ":" + this.line + ":" + this.column;
			this.message += ": " + this.reason;
		}
		showSourceCode(color) {
			if (!this.source) return "";
			let css = this.source;
			if (color == null) color = pico.isColorSupported;
			let aside = (text) => text;
			let mark = (text) => text;
			let highlight = (text) => text;
			if (color) {
				let { bold, gray, red } = pico.createColors(true);
				mark = (text) => bold(red(text));
				aside = (text) => gray(text);
				if (terminalHighlight) highlight = (text) => terminalHighlight(text);
			}
			let lines = css.split(/\r?\n/);
			let start = Math.max(this.line - 3, 0);
			let end = Math.min(this.line + 2, lines.length);
			let maxWidth = String(end).length;
			return lines.slice(start, end).map((line, index) => {
				let number = start + 1 + index;
				let gutter = " " + (" " + number).slice(-maxWidth) + " | ";
				if (number === this.line) {
					if (line.length > 160) {
						let padding = 20;
						let subLineStart = Math.max(0, this.column - padding);
						let subLineEnd = Math.max(this.column + padding, this.endColumn + padding);
						let subLine = line.slice(subLineStart, subLineEnd);
						let spacing = aside(gutter.replace(/\d/g, " ")) + line.slice(0, Math.min(this.column - 1, padding - 1)).replace(/[^\t]/g, " ");
						return mark(">") + aside(gutter) + highlight(subLine) + "\n " + spacing + mark("^");
					}
					let spacing = aside(gutter.replace(/\d/g, " ")) + line.slice(0, this.column - 1).replace(/[^\t]/g, " ");
					return mark(">") + aside(gutter) + highlight(line) + "\n " + spacing + mark("^");
				}
				return " " + aside(gutter) + highlight(line);
			}).join("\n");
		}
		toString() {
			let code = this.showSourceCode();
			if (code) code = "\n\n" + code + "\n";
			return this.name + ": " + this.message + code;
		}
	};
	module.exports = CssSyntaxError;
	CssSyntaxError.default = CssSyntaxError;
}));
var require_stringifier = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const DEFAULT_RAW = {
		after: "\n",
		beforeClose: "\n",
		beforeComment: "\n",
		beforeDecl: "\n",
		beforeOpen: " ",
		beforeRule: "\n",
		colon: ": ",
		commentLeft: " ",
		commentRight: " ",
		emptyBody: "",
		indent: "    ",
		semicolon: false
	};
	function capitalize(str) {
		return str[0].toUpperCase() + str.slice(1);
	}
	var Stringifier = class {
		constructor(builder) {
			this.builder = builder;
		}
		atrule(node, semicolon) {
			let name = "@" + node.name;
			let params = node.params ? this.rawValue(node, "params") : "";
			if (typeof node.raws.afterName !== "undefined") name += node.raws.afterName;
			else if (params) name += " ";
			if (node.nodes) this.block(node, name + params);
			else {
				let end = (node.raws.between || "") + (semicolon ? ";" : "");
				this.builder(name + params + end, node);
			}
		}
		beforeAfter(node, detect) {
			let value;
			if (node.type === "decl") value = this.raw(node, null, "beforeDecl");
			else if (node.type === "comment") value = this.raw(node, null, "beforeComment");
			else if (detect === "before") value = this.raw(node, null, "beforeRule");
			else value = this.raw(node, null, "beforeClose");
			let buf = node.parent;
			let depth = 0;
			while (buf && buf.type !== "root") {
				depth += 1;
				buf = buf.parent;
			}
			if (value.includes("\n")) {
				let indent = this.raw(node, null, "indent");
				if (indent.length) for (let step = 0; step < depth; step++) value += indent;
			}
			return value;
		}
		block(node, start) {
			let between = this.raw(node, "between", "beforeOpen");
			this.builder(start + between + "{", node, "start");
			let after;
			if (node.nodes && node.nodes.length) {
				this.body(node);
				after = this.raw(node, "after");
			} else after = this.raw(node, "after", "emptyBody");
			if (after) this.builder(after);
			this.builder("}", node, "end");
		}
		body(node) {
			let last = node.nodes.length - 1;
			while (last > 0) {
				if (node.nodes[last].type !== "comment") break;
				last -= 1;
			}
			let semicolon = this.raw(node, "semicolon");
			for (let i = 0; i < node.nodes.length; i++) {
				let child = node.nodes[i];
				let before = this.raw(child, "before");
				if (before) this.builder(before);
				this.stringify(child, last !== i || semicolon);
			}
		}
		comment(node) {
			let left = this.raw(node, "left", "commentLeft");
			let right = this.raw(node, "right", "commentRight");
			this.builder("/*" + left + node.text + right + "*/", node);
		}
		decl(node, semicolon) {
			let between = this.raw(node, "between", "colon");
			let string = node.prop + between + this.rawValue(node, "value");
			if (node.important) string += node.raws.important || " !important";
			if (semicolon) string += ";";
			this.builder(string, node);
		}
		document(node) {
			this.body(node);
		}
		raw(node, own, detect) {
			let value;
			if (!detect) detect = own;
			if (own) {
				value = node.raws[own];
				if (typeof value !== "undefined") return value;
			}
			let parent = node.parent;
			if (detect === "before") {
				if (!parent || parent.type === "root" && parent.first === node) return "";
				if (parent && parent.type === "document") return "";
			}
			if (!parent) return DEFAULT_RAW[detect];
			let root = node.root();
			if (!root.rawCache) root.rawCache = {};
			if (typeof root.rawCache[detect] !== "undefined") return root.rawCache[detect];
			if (detect === "before" || detect === "after") return this.beforeAfter(node, detect);
			else {
				let method = "raw" + capitalize(detect);
				if (this[method]) value = this[method](root, node);
				else root.walk((i) => {
					value = i.raws[own];
					if (typeof value !== "undefined") return false;
				});
			}
			if (typeof value === "undefined") value = DEFAULT_RAW[detect];
			root.rawCache[detect] = value;
			return value;
		}
		rawBeforeClose(root) {
			let value;
			root.walk((i) => {
				if (i.nodes && i.nodes.length > 0) {
					if (typeof i.raws.after !== "undefined") {
						value = i.raws.after;
						if (value.includes("\n")) value = value.replace(/[^\n]+$/, "");
						return false;
					}
				}
			});
			if (value) value = value.replace(/\S/g, "");
			return value;
		}
		rawBeforeComment(root, node) {
			let value;
			root.walkComments((i) => {
				if (typeof i.raws.before !== "undefined") {
					value = i.raws.before;
					if (value.includes("\n")) value = value.replace(/[^\n]+$/, "");
					return false;
				}
			});
			if (typeof value === "undefined") value = this.raw(node, null, "beforeDecl");
			else if (value) value = value.replace(/\S/g, "");
			return value;
		}
		rawBeforeDecl(root, node) {
			let value;
			root.walkDecls((i) => {
				if (typeof i.raws.before !== "undefined") {
					value = i.raws.before;
					if (value.includes("\n")) value = value.replace(/[^\n]+$/, "");
					return false;
				}
			});
			if (typeof value === "undefined") value = this.raw(node, null, "beforeRule");
			else if (value) value = value.replace(/\S/g, "");
			return value;
		}
		rawBeforeOpen(root) {
			let value;
			root.walk((i) => {
				if (i.type !== "decl") {
					value = i.raws.between;
					if (typeof value !== "undefined") return false;
				}
			});
			return value;
		}
		rawBeforeRule(root) {
			let value;
			root.walk((i) => {
				if (i.nodes && (i.parent !== root || root.first !== i)) {
					if (typeof i.raws.before !== "undefined") {
						value = i.raws.before;
						if (value.includes("\n")) value = value.replace(/[^\n]+$/, "");
						return false;
					}
				}
			});
			if (value) value = value.replace(/\S/g, "");
			return value;
		}
		rawColon(root) {
			let value;
			root.walkDecls((i) => {
				if (typeof i.raws.between !== "undefined") {
					value = i.raws.between.replace(/[^\s:]/g, "");
					return false;
				}
			});
			return value;
		}
		rawEmptyBody(root) {
			let value;
			root.walk((i) => {
				if (i.nodes && i.nodes.length === 0) {
					value = i.raws.after;
					if (typeof value !== "undefined") return false;
				}
			});
			return value;
		}
		rawIndent(root) {
			if (root.raws.indent) return root.raws.indent;
			let value;
			root.walk((i) => {
				let p = i.parent;
				if (p && p !== root && p.parent && p.parent === root) {
					if (typeof i.raws.before !== "undefined") {
						let parts = i.raws.before.split("\n");
						value = parts[parts.length - 1];
						value = value.replace(/\S/g, "");
						return false;
					}
				}
			});
			return value;
		}
		rawSemicolon(root) {
			let value;
			root.walk((i) => {
				if (i.nodes && i.nodes.length && i.last.type === "decl") {
					value = i.raws.semicolon;
					if (typeof value !== "undefined") return false;
				}
			});
			return value;
		}
		rawValue(node, prop) {
			let value = node[prop];
			let raw = node.raws[prop];
			if (raw && raw.value === value) return raw.raw;
			return value;
		}
		root(node) {
			this.body(node);
			if (node.raws.after) this.builder(node.raws.after);
		}
		rule(node) {
			this.block(node, this.rawValue(node, "selector"));
			if (node.raws.ownSemicolon) this.builder(node.raws.ownSemicolon, node, "end");
		}
		stringify(node, semicolon) {
			/* c8 ignore start */
			if (!this[node.type]) throw new Error("Unknown AST node type " + node.type + ". Maybe you need to change PostCSS stringifier.");
			/* c8 ignore stop */
			this[node.type](node, semicolon);
		}
	};
	module.exports = Stringifier;
	Stringifier.default = Stringifier;
}));
var require_stringify = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let Stringifier = require_stringifier();
	function stringify(node, builder) {
		new Stringifier(builder).stringify(node);
	}
	module.exports = stringify;
	stringify.default = stringify;
}));
var require_symbols = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports.isClean = Symbol("isClean");
	module.exports.my = Symbol("my");
}));
var require_node$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let CssSyntaxError = require_css_syntax_error();
	let Stringifier = require_stringifier();
	let stringify = require_stringify();
	let { isClean, my } = require_symbols();
	function cloneNode(obj, parent) {
		let cloned = new obj.constructor();
		for (let i in obj) {
			if (!Object.prototype.hasOwnProperty.call(obj, i))
 /* c8 ignore next 2 */
			continue;
			if (i === "proxyCache") continue;
			let value = obj[i];
			let type = typeof value;
			if (i === "parent" && type === "object") {
				if (parent) cloned[i] = parent;
			} else if (i === "source") cloned[i] = value;
			else if (Array.isArray(value)) cloned[i] = value.map((j) => cloneNode(j, cloned));
			else {
				if (type === "object" && value !== null) value = cloneNode(value);
				cloned[i] = value;
			}
		}
		return cloned;
	}
	function sourceOffset(inputCSS, position) {
		if (position && typeof position.offset !== "undefined") return position.offset;
		let column = 1;
		let line = 1;
		let offset = 0;
		for (let i = 0; i < inputCSS.length; i++) {
			if (line === position.line && column === position.column) {
				offset = i;
				break;
			}
			if (inputCSS[i] === "\n") {
				column = 1;
				line += 1;
			} else column += 1;
		}
		return offset;
	}
	var Node = class {
		get proxyOf() {
			return this;
		}
		constructor(defaults = {}) {
			this.raws = {};
			this[isClean] = false;
			this[my] = true;
			for (let name in defaults) if (name === "nodes") {
				this.nodes = [];
				for (let node of defaults[name]) if (typeof node.clone === "function") this.append(node.clone());
				else this.append(node);
			} else this[name] = defaults[name];
		}
		addToError(error) {
			error.postcssNode = this;
			if (error.stack && this.source && /\n\s{4}at /.test(error.stack)) {
				let s = this.source;
				error.stack = error.stack.replace(/\n\s{4}at /, `$&${s.input.from}:${s.start.line}:${s.start.column}$&`);
			}
			return error;
		}
		after(add) {
			this.parent.insertAfter(this, add);
			return this;
		}
		assign(overrides = {}) {
			for (let name in overrides) this[name] = overrides[name];
			return this;
		}
		before(add) {
			this.parent.insertBefore(this, add);
			return this;
		}
		cleanRaws(keepBetween) {
			delete this.raws.before;
			delete this.raws.after;
			if (!keepBetween) delete this.raws.between;
		}
		clone(overrides = {}) {
			let cloned = cloneNode(this);
			for (let name in overrides) cloned[name] = overrides[name];
			return cloned;
		}
		cloneAfter(overrides = {}) {
			let cloned = this.clone(overrides);
			this.parent.insertAfter(this, cloned);
			return cloned;
		}
		cloneBefore(overrides = {}) {
			let cloned = this.clone(overrides);
			this.parent.insertBefore(this, cloned);
			return cloned;
		}
		error(message, opts = {}) {
			if (this.source) {
				let { end, start } = this.rangeBy(opts);
				return this.source.input.error(message, {
					column: start.column,
					line: start.line
				}, {
					column: end.column,
					line: end.line
				}, opts);
			}
			return new CssSyntaxError(message);
		}
		getProxyProcessor() {
			return {
				get(node, prop) {
					if (prop === "proxyOf") return node;
					else if (prop === "root") return () => node.root().toProxy();
					else return node[prop];
				},
				set(node, prop, value) {
					if (node[prop] === value) return true;
					node[prop] = value;
					if (prop === "prop" || prop === "value" || prop === "name" || prop === "params" || prop === "important" || prop === "text") node.markDirty();
					return true;
				}
			};
		}
		/* c8 ignore next 3 */
		markClean() {
			this[isClean] = true;
		}
		markDirty() {
			if (this[isClean]) {
				this[isClean] = false;
				let next = this;
				while (next = next.parent) next[isClean] = false;
			}
		}
		next() {
			if (!this.parent) return void 0;
			let index = this.parent.index(this);
			return this.parent.nodes[index + 1];
		}
		positionBy(opts = {}) {
			let pos = this.source.start;
			if (opts.index) pos = this.positionInside(opts.index);
			else if (opts.word) {
				let inputString = "document" in this.source.input ? this.source.input.document : this.source.input.css;
				let index = inputString.slice(sourceOffset(inputString, this.source.start), sourceOffset(inputString, this.source.end)).indexOf(opts.word);
				if (index !== -1) pos = this.positionInside(index);
			}
			return pos;
		}
		positionInside(index) {
			let column = this.source.start.column;
			let line = this.source.start.line;
			let inputString = "document" in this.source.input ? this.source.input.document : this.source.input.css;
			let offset = sourceOffset(inputString, this.source.start);
			let end = offset + index;
			for (let i = offset; i < end; i++) if (inputString[i] === "\n") {
				column = 1;
				line += 1;
			} else column += 1;
			return {
				column,
				line,
				offset: end
			};
		}
		prev() {
			if (!this.parent) return void 0;
			let index = this.parent.index(this);
			return this.parent.nodes[index - 1];
		}
		rangeBy(opts = {}) {
			let inputString = "document" in this.source.input ? this.source.input.document : this.source.input.css;
			let start = {
				column: this.source.start.column,
				line: this.source.start.line,
				offset: sourceOffset(inputString, this.source.start)
			};
			let end = this.source.end ? {
				column: this.source.end.column + 1,
				line: this.source.end.line,
				offset: typeof this.source.end.offset === "number" ? this.source.end.offset : sourceOffset(inputString, this.source.end) + 1
			} : {
				column: start.column + 1,
				line: start.line,
				offset: start.offset + 1
			};
			if (opts.word) {
				let index = inputString.slice(sourceOffset(inputString, this.source.start), sourceOffset(inputString, this.source.end)).indexOf(opts.word);
				if (index !== -1) {
					start = this.positionInside(index);
					end = this.positionInside(index + opts.word.length);
				}
			} else {
				if (opts.start) start = {
					column: opts.start.column,
					line: opts.start.line,
					offset: sourceOffset(inputString, opts.start)
				};
				else if (opts.index) start = this.positionInside(opts.index);
				if (opts.end) end = {
					column: opts.end.column,
					line: opts.end.line,
					offset: sourceOffset(inputString, opts.end)
				};
				else if (typeof opts.endIndex === "number") end = this.positionInside(opts.endIndex);
				else if (opts.index) end = this.positionInside(opts.index + 1);
			}
			if (end.line < start.line || end.line === start.line && end.column <= start.column) end = {
				column: start.column + 1,
				line: start.line,
				offset: start.offset + 1
			};
			return {
				end,
				start
			};
		}
		raw(prop, defaultType) {
			return new Stringifier().raw(this, prop, defaultType);
		}
		remove() {
			if (this.parent) this.parent.removeChild(this);
			this.parent = void 0;
			return this;
		}
		replaceWith(...nodes) {
			if (this.parent) {
				let bookmark = this;
				let foundSelf = false;
				for (let node of nodes) if (node === this) foundSelf = true;
				else if (foundSelf) {
					this.parent.insertAfter(bookmark, node);
					bookmark = node;
				} else this.parent.insertBefore(bookmark, node);
				if (!foundSelf) this.remove();
			}
			return this;
		}
		root() {
			let result = this;
			while (result.parent && result.parent.type !== "document") result = result.parent;
			return result;
		}
		toJSON(_, inputs) {
			let fixed = {};
			let emitInputs = inputs == null;
			inputs = inputs || /* @__PURE__ */ new Map();
			let inputsNextIndex = 0;
			for (let name in this) {
				if (!Object.prototype.hasOwnProperty.call(this, name))
 /* c8 ignore next 2 */
				continue;
				if (name === "parent" || name === "proxyCache") continue;
				let value = this[name];
				if (Array.isArray(value)) fixed[name] = value.map((i) => {
					if (typeof i === "object" && i.toJSON) return i.toJSON(null, inputs);
					else return i;
				});
				else if (typeof value === "object" && value.toJSON) fixed[name] = value.toJSON(null, inputs);
				else if (name === "source") {
					if (value == null) continue;
					let inputId = inputs.get(value.input);
					if (inputId == null) {
						inputId = inputsNextIndex;
						inputs.set(value.input, inputsNextIndex);
						inputsNextIndex++;
					}
					fixed[name] = {
						end: value.end,
						inputId,
						start: value.start
					};
				} else fixed[name] = value;
			}
			if (emitInputs) fixed.inputs = [...inputs.keys()].map((input) => input.toJSON());
			return fixed;
		}
		toProxy() {
			if (!this.proxyCache) this.proxyCache = new Proxy(this, this.getProxyProcessor());
			return this.proxyCache;
		}
		toString(stringifier = stringify) {
			if (stringifier.stringify) stringifier = stringifier.stringify;
			let result = "";
			stringifier(this, (i) => {
				result += i;
			});
			return result;
		}
		warn(result, text, opts = {}) {
			let data = { node: this };
			for (let i in opts) data[i] = opts[i];
			return result.warn(text, data);
		}
	};
	module.exports = Node;
	Node.default = Node;
}));
var require_comment$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let Node = require_node$2();
	var Comment = class extends Node {
		constructor(defaults) {
			super(defaults);
			this.type = "comment";
		}
	};
	module.exports = Comment;
	Comment.default = Comment;
}));
var require_declaration = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let Node = require_node$2();
	var Declaration = class extends Node {
		get variable() {
			return this.prop.startsWith("--") || this.prop[0] === "$";
		}
		constructor(defaults) {
			if (defaults && typeof defaults.value !== "undefined" && typeof defaults.value !== "string") defaults = {
				...defaults,
				value: String(defaults.value)
			};
			super(defaults);
			this.type = "decl";
		}
	};
	module.exports = Declaration;
	Declaration.default = Declaration;
}));
var require_container$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let Comment = require_comment$1();
	let Declaration = require_declaration();
	let Node = require_node$2();
	let { isClean, my } = require_symbols();
	let AtRule, parse, Root, Rule;
	function cleanSource(nodes) {
		return nodes.map((i) => {
			if (i.nodes) i.nodes = cleanSource(i.nodes);
			delete i.source;
			return i;
		});
	}
	function markTreeDirty(node) {
		node[isClean] = false;
		if (node.proxyOf.nodes) for (let i of node.proxyOf.nodes) markTreeDirty(i);
	}
	var Container = class Container extends Node {
		get first() {
			if (!this.proxyOf.nodes) return void 0;
			return this.proxyOf.nodes[0];
		}
		get last() {
			if (!this.proxyOf.nodes) return void 0;
			return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
		}
		append(...children) {
			for (let child of children) {
				let nodes = this.normalize(child, this.last);
				for (let node of nodes) this.proxyOf.nodes.push(node);
			}
			this.markDirty();
			return this;
		}
		cleanRaws(keepBetween) {
			super.cleanRaws(keepBetween);
			if (this.nodes) for (let node of this.nodes) node.cleanRaws(keepBetween);
		}
		each(callback) {
			if (!this.proxyOf.nodes) return void 0;
			let iterator = this.getIterator();
			let index, result;
			while (this.indexes[iterator] < this.proxyOf.nodes.length) {
				index = this.indexes[iterator];
				result = callback(this.proxyOf.nodes[index], index);
				if (result === false) break;
				this.indexes[iterator] += 1;
			}
			delete this.indexes[iterator];
			return result;
		}
		every(condition) {
			return this.nodes.every(condition);
		}
		getIterator() {
			if (!this.lastEach) this.lastEach = 0;
			if (!this.indexes) this.indexes = {};
			this.lastEach += 1;
			let iterator = this.lastEach;
			this.indexes[iterator] = 0;
			return iterator;
		}
		getProxyProcessor() {
			return {
				get(node, prop) {
					if (prop === "proxyOf") return node;
					else if (!node[prop]) return node[prop];
					else if (prop === "each" || typeof prop === "string" && prop.startsWith("walk")) return (...args) => {
						return node[prop](...args.map((i) => {
							if (typeof i === "function") return (child, index) => i(child.toProxy(), index);
							else return i;
						}));
					};
					else if (prop === "every" || prop === "some") return (cb) => {
						return node[prop]((child, ...other) => cb(child.toProxy(), ...other));
					};
					else if (prop === "root") return () => node.root().toProxy();
					else if (prop === "nodes") return node.nodes.map((i) => i.toProxy());
					else if (prop === "first" || prop === "last") return node[prop].toProxy();
					else return node[prop];
				},
				set(node, prop, value) {
					if (node[prop] === value) return true;
					node[prop] = value;
					if (prop === "name" || prop === "params" || prop === "selector") node.markDirty();
					return true;
				}
			};
		}
		index(child) {
			if (typeof child === "number") return child;
			if (child.proxyOf) child = child.proxyOf;
			return this.proxyOf.nodes.indexOf(child);
		}
		insertAfter(exist, add) {
			let existIndex = this.index(exist);
			let nodes = this.normalize(add, this.proxyOf.nodes[existIndex]).reverse();
			existIndex = this.index(exist);
			for (let node of nodes) this.proxyOf.nodes.splice(existIndex + 1, 0, node);
			let index;
			for (let id in this.indexes) {
				index = this.indexes[id];
				if (existIndex < index) this.indexes[id] = index + nodes.length;
			}
			this.markDirty();
			return this;
		}
		insertBefore(exist, add) {
			let existIndex = this.index(exist);
			let type = existIndex === 0 ? "prepend" : false;
			let nodes = this.normalize(add, this.proxyOf.nodes[existIndex], type).reverse();
			existIndex = this.index(exist);
			for (let node of nodes) this.proxyOf.nodes.splice(existIndex, 0, node);
			let index;
			for (let id in this.indexes) {
				index = this.indexes[id];
				if (existIndex <= index) this.indexes[id] = index + nodes.length;
			}
			this.markDirty();
			return this;
		}
		normalize(nodes, sample) {
			if (typeof nodes === "string") nodes = cleanSource(parse(nodes).nodes);
			else if (typeof nodes === "undefined") nodes = [];
			else if (Array.isArray(nodes)) {
				nodes = nodes.slice(0);
				for (let i of nodes) if (i.parent) i.parent.removeChild(i, "ignore");
			} else if (nodes.type === "root" && this.type !== "document") {
				nodes = nodes.nodes.slice(0);
				for (let i of nodes) if (i.parent) i.parent.removeChild(i, "ignore");
			} else if (nodes.type) nodes = [nodes];
			else if (nodes.prop) {
				if (typeof nodes.value === "undefined") throw new Error("Value field is missed in node creation");
				else if (typeof nodes.value !== "string") nodes.value = String(nodes.value);
				nodes = [new Declaration(nodes)];
			} else if (nodes.selector || nodes.selectors) nodes = [new Rule(nodes)];
			else if (nodes.name) nodes = [new AtRule(nodes)];
			else if (nodes.text) nodes = [new Comment(nodes)];
			else throw new Error("Unknown node type in node creation");
			return nodes.map((i) => {
				/* c8 ignore next */
				if (!i[my]) Container.rebuild(i);
				i = i.proxyOf;
				if (i.parent) i.parent.removeChild(i);
				if (i[isClean]) markTreeDirty(i);
				if (!i.raws) i.raws = {};
				if (typeof i.raws.before === "undefined") {
					if (sample && typeof sample.raws.before !== "undefined") i.raws.before = sample.raws.before.replace(/\S/g, "");
				}
				i.parent = this.proxyOf;
				return i;
			});
		}
		prepend(...children) {
			children = children.reverse();
			for (let child of children) {
				let nodes = this.normalize(child, this.first, "prepend").reverse();
				for (let node of nodes) this.proxyOf.nodes.unshift(node);
				for (let id in this.indexes) this.indexes[id] = this.indexes[id] + nodes.length;
			}
			this.markDirty();
			return this;
		}
		push(child) {
			child.parent = this;
			this.proxyOf.nodes.push(child);
			return this;
		}
		removeAll() {
			for (let node of this.proxyOf.nodes) node.parent = void 0;
			this.proxyOf.nodes = [];
			this.markDirty();
			return this;
		}
		removeChild(child) {
			child = this.index(child);
			this.proxyOf.nodes[child].parent = void 0;
			this.proxyOf.nodes.splice(child, 1);
			let index;
			for (let id in this.indexes) {
				index = this.indexes[id];
				if (index >= child) this.indexes[id] = index - 1;
			}
			this.markDirty();
			return this;
		}
		replaceValues(pattern, opts, callback) {
			if (!callback) {
				callback = opts;
				opts = {};
			}
			this.walkDecls((decl) => {
				if (opts.props && !opts.props.includes(decl.prop)) return;
				if (opts.fast && !decl.value.includes(opts.fast)) return;
				decl.value = decl.value.replace(pattern, callback);
			});
			this.markDirty();
			return this;
		}
		some(condition) {
			return this.nodes.some(condition);
		}
		walk(callback) {
			return this.each((child, i) => {
				let result;
				try {
					result = callback(child, i);
				} catch (e) {
					throw child.addToError(e);
				}
				if (result !== false && child.walk) result = child.walk(callback);
				return result;
			});
		}
		walkAtRules(name, callback) {
			if (!callback) {
				callback = name;
				return this.walk((child, i) => {
					if (child.type === "atrule") return callback(child, i);
				});
			}
			if (name instanceof RegExp) return this.walk((child, i) => {
				if (child.type === "atrule" && name.test(child.name)) return callback(child, i);
			});
			return this.walk((child, i) => {
				if (child.type === "atrule" && child.name === name) return callback(child, i);
			});
		}
		walkComments(callback) {
			return this.walk((child, i) => {
				if (child.type === "comment") return callback(child, i);
			});
		}
		walkDecls(prop, callback) {
			if (!callback) {
				callback = prop;
				return this.walk((child, i) => {
					if (child.type === "decl") return callback(child, i);
				});
			}
			if (prop instanceof RegExp) return this.walk((child, i) => {
				if (child.type === "decl" && prop.test(child.prop)) return callback(child, i);
			});
			return this.walk((child, i) => {
				if (child.type === "decl" && child.prop === prop) return callback(child, i);
			});
		}
		walkRules(selector, callback) {
			if (!callback) {
				callback = selector;
				return this.walk((child, i) => {
					if (child.type === "rule") return callback(child, i);
				});
			}
			if (selector instanceof RegExp) return this.walk((child, i) => {
				if (child.type === "rule" && selector.test(child.selector)) return callback(child, i);
			});
			return this.walk((child, i) => {
				if (child.type === "rule" && child.selector === selector) return callback(child, i);
			});
		}
	};
	Container.registerParse = (dependant) => {
		parse = dependant;
	};
	Container.registerRule = (dependant) => {
		Rule = dependant;
	};
	Container.registerAtRule = (dependant) => {
		AtRule = dependant;
	};
	Container.registerRoot = (dependant) => {
		Root = dependant;
	};
	module.exports = Container;
	Container.default = Container;
	/* c8 ignore start */
	Container.rebuild = (node) => {
		if (node.type === "atrule") Object.setPrototypeOf(node, AtRule.prototype);
		else if (node.type === "rule") Object.setPrototypeOf(node, Rule.prototype);
		else if (node.type === "decl") Object.setPrototypeOf(node, Declaration.prototype);
		else if (node.type === "comment") Object.setPrototypeOf(node, Comment.prototype);
		else if (node.type === "root") Object.setPrototypeOf(node, Root.prototype);
		node[my] = true;
		if (node.nodes) node.nodes.forEach((child) => {
			Container.rebuild(child);
		});
	};
}));
/* c8 ignore stop */
var require_at_rule = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let Container = require_container$1();
	var AtRule = class extends Container {
		constructor(defaults) {
			super(defaults);
			this.type = "atrule";
		}
		append(...children) {
			if (!this.proxyOf.nodes) this.nodes = [];
			return super.append(...children);
		}
		prepend(...children) {
			if (!this.proxyOf.nodes) this.nodes = [];
			return super.prepend(...children);
		}
	};
	module.exports = AtRule;
	AtRule.default = AtRule;
	Container.registerAtRule(AtRule);
}));
var require_document = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let Container = require_container$1();
	let LazyResult, Processor;
	var Document = class extends Container {
		constructor(defaults) {
			super({
				type: "document",
				...defaults
			});
			if (!this.nodes) this.nodes = [];
		}
		toResult(opts = {}) {
			return new LazyResult(new Processor(), this, opts).stringify();
		}
	};
	Document.registerLazyResult = (dependant) => {
		LazyResult = dependant;
	};
	Document.registerProcessor = (dependant) => {
		Processor = dependant;
	};
	module.exports = Document;
	Document.default = Document;
}));
var require_non_secure = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
	let customAlphabet = (alphabet, defaultSize = 21) => {
		return (size = defaultSize) => {
			let id = "";
			let i = size | 0;
			while (i--) id += alphabet[Math.random() * alphabet.length | 0];
			return id;
		};
	};
	let nanoid = (size = 21) => {
		let id = "";
		let i = size | 0;
		while (i--) id += urlAlphabet[Math.random() * 64 | 0];
		return id;
	};
	module.exports = {
		nanoid,
		customAlphabet
	};
}));
var require_base64 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
	exports.encode = function(number) {
		if (0 <= number && number < intToCharMap.length) return intToCharMap[number];
		throw new TypeError("Must be between 0 and 63: " + number);
	};
	exports.decode = function(charCode) {
		var bigA = 65;
		var bigZ = 90;
		var littleA = 97;
		var littleZ = 122;
		var zero = 48;
		var nine = 57;
		var plus = 43;
		var slash = 47;
		var littleOffset = 26;
		var numberOffset = 52;
		if (bigA <= charCode && charCode <= bigZ) return charCode - bigA;
		if (littleA <= charCode && charCode <= littleZ) return charCode - littleA + littleOffset;
		if (zero <= charCode && charCode <= nine) return charCode - zero + numberOffset;
		if (charCode == plus) return 62;
		if (charCode == slash) return 63;
		return -1;
	};
}));
var require_base64_vlq = /* @__PURE__ */ __commonJSMin(((exports) => {
	var base64 = require_base64();
	var VLQ_BASE_SHIFT = 5;
	var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
	var VLQ_BASE_MASK = VLQ_BASE - 1;
	var VLQ_CONTINUATION_BIT = VLQ_BASE;
	function toVLQSigned(aValue) {
		return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
	}
	function fromVLQSigned(aValue) {
		var isNegative = (aValue & 1) === 1;
		var shifted = aValue >> 1;
		return isNegative ? -shifted : shifted;
	}
	exports.encode = function base64VLQ_encode(aValue) {
		var encoded = "";
		var digit;
		var vlq = toVLQSigned(aValue);
		do {
			digit = vlq & VLQ_BASE_MASK;
			vlq >>>= VLQ_BASE_SHIFT;
			if (vlq > 0) digit |= VLQ_CONTINUATION_BIT;
			encoded += base64.encode(digit);
		} while (vlq > 0);
		return encoded;
	};
	exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
		var strLen = aStr.length;
		var result = 0;
		var shift = 0;
		var continuation, digit;
		do {
			if (aIndex >= strLen) throw new Error("Expected more digits in base 64 VLQ value.");
			digit = base64.decode(aStr.charCodeAt(aIndex++));
			if (digit === -1) throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
			continuation = !!(digit & VLQ_CONTINUATION_BIT);
			digit &= VLQ_BASE_MASK;
			result = result + (digit << shift);
			shift += VLQ_BASE_SHIFT;
		} while (continuation);
		aOutParam.value = fromVLQSigned(result);
		aOutParam.rest = aIndex;
	};
}));
var require_util$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	function getArg(aArgs, aName, aDefaultValue) {
		if (aName in aArgs) return aArgs[aName];
		else if (arguments.length === 3) return aDefaultValue;
		else throw new Error("\"" + aName + "\" is a required argument.");
	}
	exports.getArg = getArg;
	var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
	var dataUrlRegexp = /^data:.+\,.+$/;
	function urlParse(aUrl) {
		var match = aUrl.match(urlRegexp);
		if (!match) return null;
		return {
			scheme: match[1],
			auth: match[2],
			host: match[3],
			port: match[4],
			path: match[5]
		};
	}
	exports.urlParse = urlParse;
	function urlGenerate(aParsedUrl) {
		var url = "";
		if (aParsedUrl.scheme) url += aParsedUrl.scheme + ":";
		url += "//";
		if (aParsedUrl.auth) url += aParsedUrl.auth + "@";
		if (aParsedUrl.host) url += aParsedUrl.host;
		if (aParsedUrl.port) url += ":" + aParsedUrl.port;
		if (aParsedUrl.path) url += aParsedUrl.path;
		return url;
	}
	exports.urlGenerate = urlGenerate;
	var MAX_CACHED_INPUTS = 32;
	function lruMemoize(f) {
		var cache = [];
		return function(input) {
			for (var i = 0; i < cache.length; i++) if (cache[i].input === input) {
				var temp = cache[0];
				cache[0] = cache[i];
				cache[i] = temp;
				return cache[0].result;
			}
			var result = f(input);
			cache.unshift({
				input,
				result
			});
			if (cache.length > MAX_CACHED_INPUTS) cache.pop();
			return result;
		};
	}
	var normalize = lruMemoize(function normalize(aPath) {
		var path = aPath;
		var url = urlParse(aPath);
		if (url) {
			if (!url.path) return aPath;
			path = url.path;
		}
		var isAbsolute = exports.isAbsolute(path);
		var parts = [];
		var start = 0;
		var i = 0;
		while (true) {
			start = i;
			i = path.indexOf("/", start);
			if (i === -1) {
				parts.push(path.slice(start));
				break;
			} else {
				parts.push(path.slice(start, i));
				while (i < path.length && path[i] === "/") i++;
			}
		}
		for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
			part = parts[i];
			if (part === ".") parts.splice(i, 1);
			else if (part === "..") up++;
			else if (up > 0) if (part === "") {
				parts.splice(i + 1, up);
				up = 0;
			} else {
				parts.splice(i, 2);
				up--;
			}
		}
		path = parts.join("/");
		if (path === "") path = isAbsolute ? "/" : ".";
		if (url) {
			url.path = path;
			return urlGenerate(url);
		}
		return path;
	});
	exports.normalize = normalize;
	function join(aRoot, aPath) {
		if (aRoot === "") aRoot = ".";
		if (aPath === "") aPath = ".";
		var aPathUrl = urlParse(aPath);
		var aRootUrl = urlParse(aRoot);
		if (aRootUrl) aRoot = aRootUrl.path || "/";
		if (aPathUrl && !aPathUrl.scheme) {
			if (aRootUrl) aPathUrl.scheme = aRootUrl.scheme;
			return urlGenerate(aPathUrl);
		}
		if (aPathUrl || aPath.match(dataUrlRegexp)) return aPath;
		if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
			aRootUrl.host = aPath;
			return urlGenerate(aRootUrl);
		}
		var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
		if (aRootUrl) {
			aRootUrl.path = joined;
			return urlGenerate(aRootUrl);
		}
		return joined;
	}
	exports.join = join;
	exports.isAbsolute = function(aPath) {
		return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
	};
	function relative(aRoot, aPath) {
		if (aRoot === "") aRoot = ".";
		aRoot = aRoot.replace(/\/$/, "");
		var level = 0;
		while (aPath.indexOf(aRoot + "/") !== 0) {
			var index = aRoot.lastIndexOf("/");
			if (index < 0) return aPath;
			aRoot = aRoot.slice(0, index);
			if (aRoot.match(/^([^\/]+:\/)?\/*$/)) return aPath;
			++level;
		}
		return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
	}
	exports.relative = relative;
	var supportsNullProto = function() {
		return !("__proto__" in Object.create(null));
	}();
	function identity(s) {
		return s;
	}
	function toSetString(aStr) {
		if (isProtoString(aStr)) return "$" + aStr;
		return aStr;
	}
	exports.toSetString = supportsNullProto ? identity : toSetString;
	function fromSetString(aStr) {
		if (isProtoString(aStr)) return aStr.slice(1);
		return aStr;
	}
	exports.fromSetString = supportsNullProto ? identity : fromSetString;
	function isProtoString(s) {
		if (!s) return false;
		var length = s.length;
		if (length < 9) return false;
		if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) return false;
		for (var i = length - 10; i >= 0; i--) if (s.charCodeAt(i) !== 36) return false;
		return true;
	}
	function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
		var cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0 || onlyCompareOriginal) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByOriginalPositions = compareByOriginalPositions;
	function compareByOriginalPositionsNoSource(mappingA, mappingB, onlyCompareOriginal) {
		var cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0 || onlyCompareOriginal) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByOriginalPositionsNoSource = compareByOriginalPositionsNoSource;
	function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0 || onlyCompareGenerated) return cmp;
		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
	function compareByGeneratedPositionsDeflatedNoLine(mappingA, mappingB, onlyCompareGenerated) {
		var cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0 || onlyCompareGenerated) return cmp;
		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsDeflatedNoLine = compareByGeneratedPositionsDeflatedNoLine;
	function strcmp(aStr1, aStr2) {
		if (aStr1 === aStr2) return 0;
		if (aStr1 === null) return 1;
		if (aStr2 === null) return -1;
		if (aStr1 > aStr2) return 1;
		return -1;
	}
	function compareByGeneratedPositionsInflated(mappingA, mappingB) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) return cmp;
		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
	function parseSourceMapInput(str) {
		return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
	}
	exports.parseSourceMapInput = parseSourceMapInput;
	function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
		sourceURL = sourceURL || "";
		if (sourceRoot) {
			if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") sourceRoot += "/";
			sourceURL = sourceRoot + sourceURL;
		}
		if (sourceMapURL) {
			var parsed = urlParse(sourceMapURL);
			if (!parsed) throw new Error("sourceMapURL could not be parsed");
			if (parsed.path) {
				var index = parsed.path.lastIndexOf("/");
				if (index >= 0) parsed.path = parsed.path.substring(0, index + 1);
			}
			sourceURL = join(urlGenerate(parsed), sourceURL);
		}
		return normalize(sourceURL);
	}
	exports.computeSourceURL = computeSourceURL;
}));
var require_array_set = /* @__PURE__ */ __commonJSMin(((exports) => {
	var util = require_util$1();
	var has = Object.prototype.hasOwnProperty;
	var hasNativeMap = typeof Map !== "undefined";
	function ArraySet() {
		this._array = [];
		this._set = hasNativeMap ? /* @__PURE__ */ new Map() : Object.create(null);
	}
	ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
		var set = new ArraySet();
		for (var i = 0, len = aArray.length; i < len; i++) set.add(aArray[i], aAllowDuplicates);
		return set;
	};
	ArraySet.prototype.size = function ArraySet_size() {
		return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
	};
	ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
		var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
		var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
		var idx = this._array.length;
		if (!isDuplicate || aAllowDuplicates) this._array.push(aStr);
		if (!isDuplicate) if (hasNativeMap) this._set.set(aStr, idx);
		else this._set[sStr] = idx;
	};
	ArraySet.prototype.has = function ArraySet_has(aStr) {
		if (hasNativeMap) return this._set.has(aStr);
		else {
			var sStr = util.toSetString(aStr);
			return has.call(this._set, sStr);
		}
	};
	ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
		if (hasNativeMap) {
			var idx = this._set.get(aStr);
			if (idx >= 0) return idx;
		} else {
			var sStr = util.toSetString(aStr);
			if (has.call(this._set, sStr)) return this._set[sStr];
		}
		throw new Error("\"" + aStr + "\" is not in the set.");
	};
	ArraySet.prototype.at = function ArraySet_at(aIdx) {
		if (aIdx >= 0 && aIdx < this._array.length) return this._array[aIdx];
		throw new Error("No element indexed by " + aIdx);
	};
	ArraySet.prototype.toArray = function ArraySet_toArray() {
		return this._array.slice();
	};
	exports.ArraySet = ArraySet;
}));
var require_mapping_list = /* @__PURE__ */ __commonJSMin(((exports) => {
	var util = require_util$1();
	function generatedPositionAfter(mappingA, mappingB) {
		var lineA = mappingA.generatedLine;
		var lineB = mappingB.generatedLine;
		var columnA = mappingA.generatedColumn;
		var columnB = mappingB.generatedColumn;
		return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
	}
	function MappingList() {
		this._array = [];
		this._sorted = true;
		this._last = {
			generatedLine: -1,
			generatedColumn: 0
		};
	}
	MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
		this._array.forEach(aCallback, aThisArg);
	};
	MappingList.prototype.add = function MappingList_add(aMapping) {
		if (generatedPositionAfter(this._last, aMapping)) {
			this._last = aMapping;
			this._array.push(aMapping);
		} else {
			this._sorted = false;
			this._array.push(aMapping);
		}
	};
	MappingList.prototype.toArray = function MappingList_toArray() {
		if (!this._sorted) {
			this._array.sort(util.compareByGeneratedPositionsInflated);
			this._sorted = true;
		}
		return this._array;
	};
	exports.MappingList = MappingList;
}));
var require_source_map_generator = /* @__PURE__ */ __commonJSMin(((exports) => {
	var base64VLQ = require_base64_vlq();
	var util = require_util$1();
	var ArraySet = require_array_set().ArraySet;
	var MappingList = require_mapping_list().MappingList;
	function SourceMapGenerator(aArgs) {
		if (!aArgs) aArgs = {};
		this._file = util.getArg(aArgs, "file", null);
		this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
		this._skipValidation = util.getArg(aArgs, "skipValidation", false);
		this._ignoreInvalidMapping = util.getArg(aArgs, "ignoreInvalidMapping", false);
		this._sources = new ArraySet();
		this._names = new ArraySet();
		this._mappings = new MappingList();
		this._sourcesContents = null;
	}
	SourceMapGenerator.prototype._version = 3;
	SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer, generatorOps) {
		var sourceRoot = aSourceMapConsumer.sourceRoot;
		var generator = new SourceMapGenerator(Object.assign(generatorOps || {}, {
			file: aSourceMapConsumer.file,
			sourceRoot
		}));
		aSourceMapConsumer.eachMapping(function(mapping) {
			var newMapping = { generated: {
				line: mapping.generatedLine,
				column: mapping.generatedColumn
			} };
			if (mapping.source != null) {
				newMapping.source = mapping.source;
				if (sourceRoot != null) newMapping.source = util.relative(sourceRoot, newMapping.source);
				newMapping.original = {
					line: mapping.originalLine,
					column: mapping.originalColumn
				};
				if (mapping.name != null) newMapping.name = mapping.name;
			}
			generator.addMapping(newMapping);
		});
		aSourceMapConsumer.sources.forEach(function(sourceFile) {
			var sourceRelative = sourceFile;
			if (sourceRoot !== null) sourceRelative = util.relative(sourceRoot, sourceFile);
			if (!generator._sources.has(sourceRelative)) generator._sources.add(sourceRelative);
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) generator.setSourceContent(sourceFile, content);
		});
		return generator;
	};
	SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
		var generated = util.getArg(aArgs, "generated");
		var original = util.getArg(aArgs, "original", null);
		var source = util.getArg(aArgs, "source", null);
		var name = util.getArg(aArgs, "name", null);
		if (!this._skipValidation) {
			if (this._validateMapping(generated, original, source, name) === false) return;
		}
		if (source != null) {
			source = String(source);
			if (!this._sources.has(source)) this._sources.add(source);
		}
		if (name != null) {
			name = String(name);
			if (!this._names.has(name)) this._names.add(name);
		}
		this._mappings.add({
			generatedLine: generated.line,
			generatedColumn: generated.column,
			originalLine: original != null && original.line,
			originalColumn: original != null && original.column,
			source,
			name
		});
	};
	SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
		var source = aSourceFile;
		if (this._sourceRoot != null) source = util.relative(this._sourceRoot, source);
		if (aSourceContent != null) {
			if (!this._sourcesContents) this._sourcesContents = Object.create(null);
			this._sourcesContents[util.toSetString(source)] = aSourceContent;
		} else if (this._sourcesContents) {
			delete this._sourcesContents[util.toSetString(source)];
			if (Object.keys(this._sourcesContents).length === 0) this._sourcesContents = null;
		}
	};
	SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
		var sourceFile = aSourceFile;
		if (aSourceFile == null) {
			if (aSourceMapConsumer.file == null) throw new Error("SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's \"file\" property. Both were omitted.");
			sourceFile = aSourceMapConsumer.file;
		}
		var sourceRoot = this._sourceRoot;
		if (sourceRoot != null) sourceFile = util.relative(sourceRoot, sourceFile);
		var newSources = new ArraySet();
		var newNames = new ArraySet();
		this._mappings.unsortedForEach(function(mapping) {
			if (mapping.source === sourceFile && mapping.originalLine != null) {
				var original = aSourceMapConsumer.originalPositionFor({
					line: mapping.originalLine,
					column: mapping.originalColumn
				});
				if (original.source != null) {
					mapping.source = original.source;
					if (aSourceMapPath != null) mapping.source = util.join(aSourceMapPath, mapping.source);
					if (sourceRoot != null) mapping.source = util.relative(sourceRoot, mapping.source);
					mapping.originalLine = original.line;
					mapping.originalColumn = original.column;
					if (original.name != null) mapping.name = original.name;
				}
			}
			var source = mapping.source;
			if (source != null && !newSources.has(source)) newSources.add(source);
			var name = mapping.name;
			if (name != null && !newNames.has(name)) newNames.add(name);
		}, this);
		this._sources = newSources;
		this._names = newNames;
		aSourceMapConsumer.sources.forEach(function(sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
				if (aSourceMapPath != null) sourceFile = util.join(aSourceMapPath, sourceFile);
				if (sourceRoot != null) sourceFile = util.relative(sourceRoot, sourceFile);
				this.setSourceContent(sourceFile, content);
			}
		}, this);
	};
	SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
		if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
			var message = "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";
			if (this._ignoreInvalidMapping) {
				if (typeof console !== "undefined" && console.warn) console.warn(message);
				return false;
			} else throw new Error(message);
		}
		if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) return;
		else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) return;
		else {
			var message = "Invalid mapping: " + JSON.stringify({
				generated: aGenerated,
				source: aSource,
				original: aOriginal,
				name: aName
			});
			if (this._ignoreInvalidMapping) {
				if (typeof console !== "undefined" && console.warn) console.warn(message);
				return false;
			} else throw new Error(message);
		}
	};
	SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
		var previousGeneratedColumn = 0;
		var previousGeneratedLine = 1;
		var previousOriginalColumn = 0;
		var previousOriginalLine = 0;
		var previousName = 0;
		var previousSource = 0;
		var result = "";
		var next;
		var mapping;
		var nameIdx;
		var sourceIdx;
		var mappings = this._mappings.toArray();
		for (var i = 0, len = mappings.length; i < len; i++) {
			mapping = mappings[i];
			next = "";
			if (mapping.generatedLine !== previousGeneratedLine) {
				previousGeneratedColumn = 0;
				while (mapping.generatedLine !== previousGeneratedLine) {
					next += ";";
					previousGeneratedLine++;
				}
			} else if (i > 0) {
				if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) continue;
				next += ",";
			}
			next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
			previousGeneratedColumn = mapping.generatedColumn;
			if (mapping.source != null) {
				sourceIdx = this._sources.indexOf(mapping.source);
				next += base64VLQ.encode(sourceIdx - previousSource);
				previousSource = sourceIdx;
				next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
				previousOriginalLine = mapping.originalLine - 1;
				next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
				previousOriginalColumn = mapping.originalColumn;
				if (mapping.name != null) {
					nameIdx = this._names.indexOf(mapping.name);
					next += base64VLQ.encode(nameIdx - previousName);
					previousName = nameIdx;
				}
			}
			result += next;
		}
		return result;
	};
	SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
		return aSources.map(function(source) {
			if (!this._sourcesContents) return null;
			if (aSourceRoot != null) source = util.relative(aSourceRoot, source);
			var key = util.toSetString(source);
			return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
		}, this);
	};
	SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
		var map = {
			version: this._version,
			sources: this._sources.toArray(),
			names: this._names.toArray(),
			mappings: this._serializeMappings()
		};
		if (this._file != null) map.file = this._file;
		if (this._sourceRoot != null) map.sourceRoot = this._sourceRoot;
		if (this._sourcesContents) map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
		return map;
	};
	SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
		return JSON.stringify(this.toJSON());
	};
	exports.SourceMapGenerator = SourceMapGenerator;
}));
var require_binary_search = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.GREATEST_LOWER_BOUND = 1;
	exports.LEAST_UPPER_BOUND = 2;
	function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
		var mid = Math.floor((aHigh - aLow) / 2) + aLow;
		var cmp = aCompare(aNeedle, aHaystack[mid], true);
		if (cmp === 0) return mid;
		else if (cmp > 0) {
			if (aHigh - mid > 1) return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
			if (aBias == exports.LEAST_UPPER_BOUND) return aHigh < aHaystack.length ? aHigh : -1;
			else return mid;
		} else {
			if (mid - aLow > 1) return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
			if (aBias == exports.LEAST_UPPER_BOUND) return mid;
			else return aLow < 0 ? -1 : aLow;
		}
	}
	exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
		if (aHaystack.length === 0) return -1;
		var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || exports.GREATEST_LOWER_BOUND);
		if (index < 0) return -1;
		while (index - 1 >= 0) {
			if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) break;
			--index;
		}
		return index;
	};
}));
var require_quick_sort = /* @__PURE__ */ __commonJSMin(((exports) => {
	function SortTemplate(comparator) {
		function swap(ary, x, y) {
			var temp = ary[x];
			ary[x] = ary[y];
			ary[y] = temp;
		}
		function randomIntInRange(low, high) {
			return Math.round(low + Math.random() * (high - low));
		}
		function doQuickSort(ary, comparator, p, r) {
			if (p < r) {
				var pivotIndex = randomIntInRange(p, r);
				var i = p - 1;
				swap(ary, pivotIndex, r);
				var pivot = ary[r];
				for (var j = p; j < r; j++) if (comparator(ary[j], pivot, false) <= 0) {
					i += 1;
					swap(ary, i, j);
				}
				swap(ary, i + 1, j);
				var q = i + 1;
				doQuickSort(ary, comparator, p, q - 1);
				doQuickSort(ary, comparator, q + 1, r);
			}
		}
		return doQuickSort;
	}
	function cloneSort(comparator) {
		let template = SortTemplate.toString();
		return new Function(`return ${template}`)()(comparator);
	}
	let sortCache = /* @__PURE__ */ new WeakMap();
	exports.quickSort = function(ary, comparator, start = 0) {
		let doQuickSort = sortCache.get(comparator);
		if (doQuickSort === void 0) {
			doQuickSort = cloneSort(comparator);
			sortCache.set(comparator, doQuickSort);
		}
		doQuickSort(ary, comparator, start, ary.length - 1);
	};
}));
var require_source_map_consumer = /* @__PURE__ */ __commonJSMin(((exports) => {
	var util = require_util$1();
	var binarySearch = require_binary_search();
	var ArraySet = require_array_set().ArraySet;
	var base64VLQ = require_base64_vlq();
	var quickSort = require_quick_sort().quickSort;
	function SourceMapConsumer(aSourceMap, aSourceMapURL) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === "string") sourceMap = util.parseSourceMapInput(aSourceMap);
		return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
	}
	SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
		return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
	};
	SourceMapConsumer.prototype._version = 3;
	SourceMapConsumer.prototype.__generatedMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, "_generatedMappings", {
		configurable: true,
		enumerable: true,
		get: function() {
			if (!this.__generatedMappings) this._parseMappings(this._mappings, this.sourceRoot);
			return this.__generatedMappings;
		}
	});
	SourceMapConsumer.prototype.__originalMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, "_originalMappings", {
		configurable: true,
		enumerable: true,
		get: function() {
			if (!this.__originalMappings) this._parseMappings(this._mappings, this.sourceRoot);
			return this.__originalMappings;
		}
	});
	SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
		var c = aStr.charAt(index);
		return c === ";" || c === ",";
	};
	SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		throw new Error("Subclasses must implement _parseMappings");
	};
	SourceMapConsumer.GENERATED_ORDER = 1;
	SourceMapConsumer.ORIGINAL_ORDER = 2;
	SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
	SourceMapConsumer.LEAST_UPPER_BOUND = 2;
	SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
		var context = aContext || null;
		var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
		var mappings;
		switch (order) {
			case SourceMapConsumer.GENERATED_ORDER:
				mappings = this._generatedMappings;
				break;
			case SourceMapConsumer.ORIGINAL_ORDER:
				mappings = this._originalMappings;
				break;
			default: throw new Error("Unknown order of iteration.");
		}
		var sourceRoot = this.sourceRoot;
		var boundCallback = aCallback.bind(context);
		var names = this._names;
		var sources = this._sources;
		var sourceMapURL = this._sourceMapURL;
		for (var i = 0, n = mappings.length; i < n; i++) {
			var mapping = mappings[i];
			var source = mapping.source === null ? null : sources.at(mapping.source);
			if (source !== null) source = util.computeSourceURL(sourceRoot, source, sourceMapURL);
			boundCallback({
				source,
				generatedLine: mapping.generatedLine,
				generatedColumn: mapping.generatedColumn,
				originalLine: mapping.originalLine,
				originalColumn: mapping.originalColumn,
				name: mapping.name === null ? null : names.at(mapping.name)
			});
		}
	};
	SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
		var line = util.getArg(aArgs, "line");
		var needle = {
			source: util.getArg(aArgs, "source"),
			originalLine: line,
			originalColumn: util.getArg(aArgs, "column", 0)
		};
		needle.source = this._findSourceIndex(needle.source);
		if (needle.source < 0) return [];
		var mappings = [];
		var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, binarySearch.LEAST_UPPER_BOUND);
		if (index >= 0) {
			var mapping = this._originalMappings[index];
			if (aArgs.column === void 0) {
				var originalLine = mapping.originalLine;
				while (mapping && mapping.originalLine === originalLine) {
					mappings.push({
						line: util.getArg(mapping, "generatedLine", null),
						column: util.getArg(mapping, "generatedColumn", null),
						lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
					});
					mapping = this._originalMappings[++index];
				}
			} else {
				var originalColumn = mapping.originalColumn;
				while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
					mappings.push({
						line: util.getArg(mapping, "generatedLine", null),
						column: util.getArg(mapping, "generatedColumn", null),
						lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
					});
					mapping = this._originalMappings[++index];
				}
			}
		}
		return mappings;
	};
	exports.SourceMapConsumer = SourceMapConsumer;
	function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === "string") sourceMap = util.parseSourceMapInput(aSourceMap);
		var version = util.getArg(sourceMap, "version");
		var sources = util.getArg(sourceMap, "sources");
		var names = util.getArg(sourceMap, "names", []);
		var sourceRoot = util.getArg(sourceMap, "sourceRoot", null);
		var sourcesContent = util.getArg(sourceMap, "sourcesContent", null);
		var mappings = util.getArg(sourceMap, "mappings");
		var file = util.getArg(sourceMap, "file", null);
		if (version != this._version) throw new Error("Unsupported version: " + version);
		if (sourceRoot) sourceRoot = util.normalize(sourceRoot);
		sources = sources.map(String).map(util.normalize).map(function(source) {
			return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
		});
		this._names = ArraySet.fromArray(names.map(String), true);
		this._sources = ArraySet.fromArray(sources, true);
		this._absoluteSources = this._sources.toArray().map(function(s) {
			return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
		});
		this.sourceRoot = sourceRoot;
		this.sourcesContent = sourcesContent;
		this._mappings = mappings;
		this._sourceMapURL = aSourceMapURL;
		this.file = file;
	}
	BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
	BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
		var relativeSource = aSource;
		if (this.sourceRoot != null) relativeSource = util.relative(this.sourceRoot, relativeSource);
		if (this._sources.has(relativeSource)) return this._sources.indexOf(relativeSource);
		var i;
		for (i = 0; i < this._absoluteSources.length; ++i) if (this._absoluteSources[i] == aSource) return i;
		return -1;
	};
	BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
		var smc = Object.create(BasicSourceMapConsumer.prototype);
		var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
		var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
		smc.sourceRoot = aSourceMap._sourceRoot;
		smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot);
		smc.file = aSourceMap._file;
		smc._sourceMapURL = aSourceMapURL;
		smc._absoluteSources = smc._sources.toArray().map(function(s) {
			return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
		});
		var generatedMappings = aSourceMap._mappings.toArray().slice();
		var destGeneratedMappings = smc.__generatedMappings = [];
		var destOriginalMappings = smc.__originalMappings = [];
		for (var i = 0, length = generatedMappings.length; i < length; i++) {
			var srcMapping = generatedMappings[i];
			var destMapping = new Mapping();
			destMapping.generatedLine = srcMapping.generatedLine;
			destMapping.generatedColumn = srcMapping.generatedColumn;
			if (srcMapping.source) {
				destMapping.source = sources.indexOf(srcMapping.source);
				destMapping.originalLine = srcMapping.originalLine;
				destMapping.originalColumn = srcMapping.originalColumn;
				if (srcMapping.name) destMapping.name = names.indexOf(srcMapping.name);
				destOriginalMappings.push(destMapping);
			}
			destGeneratedMappings.push(destMapping);
		}
		quickSort(smc.__originalMappings, util.compareByOriginalPositions);
		return smc;
	};
	BasicSourceMapConsumer.prototype._version = 3;
	Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", { get: function() {
		return this._absoluteSources.slice();
	} });
	function Mapping() {
		this.generatedLine = 0;
		this.generatedColumn = 0;
		this.source = null;
		this.originalLine = null;
		this.originalColumn = null;
		this.name = null;
	}
	const compareGenerated = util.compareByGeneratedPositionsDeflatedNoLine;
	function sortGenerated(array, start) {
		let l = array.length;
		let n = array.length - start;
		if (n <= 1) return;
		else if (n == 2) {
			let a = array[start];
			let b = array[start + 1];
			if (compareGenerated(a, b) > 0) {
				array[start] = b;
				array[start + 1] = a;
			}
		} else if (n < 20) for (let i = start; i < l; i++) for (let j = i; j > start; j--) {
			let a = array[j - 1];
			let b = array[j];
			if (compareGenerated(a, b) <= 0) break;
			array[j - 1] = b;
			array[j] = a;
		}
		else quickSort(array, compareGenerated, start);
	}
	BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		var generatedLine = 1;
		var previousGeneratedColumn = 0;
		var previousOriginalLine = 0;
		var previousOriginalColumn = 0;
		var previousSource = 0;
		var previousName = 0;
		var length = aStr.length;
		var index = 0;
		var temp = {};
		var originalMappings = [];
		var generatedMappings = [], mapping, segment, end, value;
		let subarrayStart = 0;
		while (index < length) if (aStr.charAt(index) === ";") {
			generatedLine++;
			index++;
			previousGeneratedColumn = 0;
			sortGenerated(generatedMappings, subarrayStart);
			subarrayStart = generatedMappings.length;
		} else if (aStr.charAt(index) === ",") index++;
		else {
			mapping = new Mapping();
			mapping.generatedLine = generatedLine;
			for (end = index; end < length; end++) if (this._charIsMappingSeparator(aStr, end)) break;
			aStr.slice(index, end);
			segment = [];
			while (index < end) {
				base64VLQ.decode(aStr, index, temp);
				value = temp.value;
				index = temp.rest;
				segment.push(value);
			}
			if (segment.length === 2) throw new Error("Found a source, but no line and column");
			if (segment.length === 3) throw new Error("Found a source and line, but no column");
			mapping.generatedColumn = previousGeneratedColumn + segment[0];
			previousGeneratedColumn = mapping.generatedColumn;
			if (segment.length > 1) {
				mapping.source = previousSource + segment[1];
				previousSource += segment[1];
				mapping.originalLine = previousOriginalLine + segment[2];
				previousOriginalLine = mapping.originalLine;
				mapping.originalLine += 1;
				mapping.originalColumn = previousOriginalColumn + segment[3];
				previousOriginalColumn = mapping.originalColumn;
				if (segment.length > 4) {
					mapping.name = previousName + segment[4];
					previousName += segment[4];
				}
			}
			generatedMappings.push(mapping);
			if (typeof mapping.originalLine === "number") {
				let currentSource = mapping.source;
				while (originalMappings.length <= currentSource) originalMappings.push(null);
				if (originalMappings[currentSource] === null) originalMappings[currentSource] = [];
				originalMappings[currentSource].push(mapping);
			}
		}
		sortGenerated(generatedMappings, subarrayStart);
		this.__generatedMappings = generatedMappings;
		for (var i = 0; i < originalMappings.length; i++) if (originalMappings[i] != null) quickSort(originalMappings[i], util.compareByOriginalPositionsNoSource);
		this.__originalMappings = [].concat(...originalMappings);
	};
	BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
		if (aNeedle[aLineName] <= 0) throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
		if (aNeedle[aColumnName] < 0) throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
		return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
	};
	BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
		for (var index = 0; index < this._generatedMappings.length; ++index) {
			var mapping = this._generatedMappings[index];
			if (index + 1 < this._generatedMappings.length) {
				var nextMapping = this._generatedMappings[index + 1];
				if (mapping.generatedLine === nextMapping.generatedLine) {
					mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
					continue;
				}
			}
			mapping.lastGeneratedColumn = Infinity;
		}
	};
	BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
		var needle = {
			generatedLine: util.getArg(aArgs, "line"),
			generatedColumn: util.getArg(aArgs, "column")
		};
		var index = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", util.compareByGeneratedPositionsDeflated, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
		if (index >= 0) {
			var mapping = this._generatedMappings[index];
			if (mapping.generatedLine === needle.generatedLine) {
				var source = util.getArg(mapping, "source", null);
				if (source !== null) {
					source = this._sources.at(source);
					source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
				}
				var name = util.getArg(mapping, "name", null);
				if (name !== null) name = this._names.at(name);
				return {
					source,
					line: util.getArg(mapping, "originalLine", null),
					column: util.getArg(mapping, "originalColumn", null),
					name
				};
			}
		}
		return {
			source: null,
			line: null,
			column: null,
			name: null
		};
	};
	BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
		if (!this.sourcesContent) return false;
		return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
			return sc == null;
		});
	};
	BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
		if (!this.sourcesContent) return null;
		var index = this._findSourceIndex(aSource);
		if (index >= 0) return this.sourcesContent[index];
		var relativeSource = aSource;
		if (this.sourceRoot != null) relativeSource = util.relative(this.sourceRoot, relativeSource);
		var url;
		if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
			var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
			if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
			if ((!url.path || url.path == "/") && this._sources.has("/" + relativeSource)) return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
		}
		if (nullOnMissing) return null;
		else throw new Error("\"" + relativeSource + "\" is not in the SourceMap.");
	};
	BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
		var source = util.getArg(aArgs, "source");
		source = this._findSourceIndex(source);
		if (source < 0) return {
			line: null,
			column: null,
			lastColumn: null
		};
		var needle = {
			source,
			originalLine: util.getArg(aArgs, "line"),
			originalColumn: util.getArg(aArgs, "column")
		};
		var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
		if (index >= 0) {
			var mapping = this._originalMappings[index];
			if (mapping.source === needle.source) return {
				line: util.getArg(mapping, "generatedLine", null),
				column: util.getArg(mapping, "generatedColumn", null),
				lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
			};
		}
		return {
			line: null,
			column: null,
			lastColumn: null
		};
	};
	exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
	function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === "string") sourceMap = util.parseSourceMapInput(aSourceMap);
		var version = util.getArg(sourceMap, "version");
		var sections = util.getArg(sourceMap, "sections");
		if (version != this._version) throw new Error("Unsupported version: " + version);
		this._sources = new ArraySet();
		this._names = new ArraySet();
		var lastOffset = {
			line: -1,
			column: 0
		};
		this._sections = sections.map(function(s) {
			if (s.url) throw new Error("Support for url field in sections not implemented.");
			var offset = util.getArg(s, "offset");
			var offsetLine = util.getArg(offset, "line");
			var offsetColumn = util.getArg(offset, "column");
			if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) throw new Error("Section offsets must be ordered and non-overlapping.");
			lastOffset = offset;
			return {
				generatedOffset: {
					generatedLine: offsetLine + 1,
					generatedColumn: offsetColumn + 1
				},
				consumer: new SourceMapConsumer(util.getArg(s, "map"), aSourceMapURL)
			};
		});
	}
	IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
	IndexedSourceMapConsumer.prototype._version = 3;
	Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", { get: function() {
		var sources = [];
		for (var i = 0; i < this._sections.length; i++) for (var j = 0; j < this._sections[i].consumer.sources.length; j++) sources.push(this._sections[i].consumer.sources[j]);
		return sources;
	} });
	IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
		var needle = {
			generatedLine: util.getArg(aArgs, "line"),
			generatedColumn: util.getArg(aArgs, "column")
		};
		var sectionIndex = binarySearch.search(needle, this._sections, function(needle, section) {
			var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
			if (cmp) return cmp;
			return needle.generatedColumn - section.generatedOffset.generatedColumn;
		});
		var section = this._sections[sectionIndex];
		if (!section) return {
			source: null,
			line: null,
			column: null,
			name: null
		};
		return section.consumer.originalPositionFor({
			line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
			column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
			bias: aArgs.bias
		});
	};
	IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
		return this._sections.every(function(s) {
			return s.consumer.hasContentsOfAllSources();
		});
	};
	IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
		for (var i = 0; i < this._sections.length; i++) {
			var content = this._sections[i].consumer.sourceContentFor(aSource, true);
			if (content || content === "") return content;
		}
		if (nullOnMissing) return null;
		else throw new Error("\"" + aSource + "\" is not in the SourceMap.");
	};
	IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];
			if (section.consumer._findSourceIndex(util.getArg(aArgs, "source")) === -1) continue;
			var generatedPosition = section.consumer.generatedPositionFor(aArgs);
			if (generatedPosition) return {
				line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
				column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
			};
		}
		return {
			line: null,
			column: null
		};
	};
	IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		this.__generatedMappings = [];
		this.__originalMappings = [];
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];
			var sectionMappings = section.consumer._generatedMappings;
			for (var j = 0; j < sectionMappings.length; j++) {
				var mapping = sectionMappings[j];
				var source = section.consumer._sources.at(mapping.source);
				if (source !== null) source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
				this._sources.add(source);
				source = this._sources.indexOf(source);
				var name = null;
				if (mapping.name) {
					name = section.consumer._names.at(mapping.name);
					this._names.add(name);
					name = this._names.indexOf(name);
				}
				var adjustedMapping = {
					source,
					generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
					generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
					originalLine: mapping.originalLine,
					originalColumn: mapping.originalColumn,
					name
				};
				this.__generatedMappings.push(adjustedMapping);
				if (typeof adjustedMapping.originalLine === "number") this.__originalMappings.push(adjustedMapping);
			}
		}
		quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
		quickSort(this.__originalMappings, util.compareByOriginalPositions);
	};
	exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
}));
var require_source_node = /* @__PURE__ */ __commonJSMin(((exports) => {
	var SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
	var util = require_util$1();
	var REGEX_NEWLINE = /(\r?\n)/;
	var NEWLINE_CODE = 10;
	var isSourceNode = "$$$isSourceNode$$$";
	function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
		this.children = [];
		this.sourceContents = {};
		this.line = aLine == null ? null : aLine;
		this.column = aColumn == null ? null : aColumn;
		this.source = aSource == null ? null : aSource;
		this.name = aName == null ? null : aName;
		this[isSourceNode] = true;
		if (aChunks != null) this.add(aChunks);
	}
	SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
		var node = new SourceNode();
		var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
		var remainingLinesIndex = 0;
		var shiftNextLine = function() {
			return getNextLine() + (getNextLine() || "");
			function getNextLine() {
				return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
			}
		};
		var lastGeneratedLine = 1, lastGeneratedColumn = 0;
		var lastMapping = null;
		aSourceMapConsumer.eachMapping(function(mapping) {
			if (lastMapping !== null) if (lastGeneratedLine < mapping.generatedLine) {
				addMappingWithCode(lastMapping, shiftNextLine());
				lastGeneratedLine++;
				lastGeneratedColumn = 0;
			} else {
				var nextLine = remainingLines[remainingLinesIndex] || "";
				var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
				remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
				lastGeneratedColumn = mapping.generatedColumn;
				addMappingWithCode(lastMapping, code);
				lastMapping = mapping;
				return;
			}
			while (lastGeneratedLine < mapping.generatedLine) {
				node.add(shiftNextLine());
				lastGeneratedLine++;
			}
			if (lastGeneratedColumn < mapping.generatedColumn) {
				var nextLine = remainingLines[remainingLinesIndex] || "";
				node.add(nextLine.substr(0, mapping.generatedColumn));
				remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
				lastGeneratedColumn = mapping.generatedColumn;
			}
			lastMapping = mapping;
		}, this);
		if (remainingLinesIndex < remainingLines.length) {
			if (lastMapping) addMappingWithCode(lastMapping, shiftNextLine());
			node.add(remainingLines.splice(remainingLinesIndex).join(""));
		}
		aSourceMapConsumer.sources.forEach(function(sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
				if (aRelativePath != null) sourceFile = util.join(aRelativePath, sourceFile);
				node.setSourceContent(sourceFile, content);
			}
		});
		return node;
		function addMappingWithCode(mapping, code) {
			if (mapping === null || mapping.source === void 0) node.add(code);
			else {
				var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
				node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
			}
		}
	};
	SourceNode.prototype.add = function SourceNode_add(aChunk) {
		if (Array.isArray(aChunk)) aChunk.forEach(function(chunk) {
			this.add(chunk);
		}, this);
		else if (aChunk[isSourceNode] || typeof aChunk === "string") {
			if (aChunk) this.children.push(aChunk);
		} else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
		return this;
	};
	SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
		if (Array.isArray(aChunk)) for (var i = aChunk.length - 1; i >= 0; i--) this.prepend(aChunk[i]);
		else if (aChunk[isSourceNode] || typeof aChunk === "string") this.children.unshift(aChunk);
		else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
		return this;
	};
	SourceNode.prototype.walk = function SourceNode_walk(aFn) {
		var chunk;
		for (var i = 0, len = this.children.length; i < len; i++) {
			chunk = this.children[i];
			if (chunk[isSourceNode]) chunk.walk(aFn);
			else if (chunk !== "") aFn(chunk, {
				source: this.source,
				line: this.line,
				column: this.column,
				name: this.name
			});
		}
	};
	SourceNode.prototype.join = function SourceNode_join(aSep) {
		var newChildren;
		var i;
		var len = this.children.length;
		if (len > 0) {
			newChildren = [];
			for (i = 0; i < len - 1; i++) {
				newChildren.push(this.children[i]);
				newChildren.push(aSep);
			}
			newChildren.push(this.children[i]);
			this.children = newChildren;
		}
		return this;
	};
	SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
		var lastChild = this.children[this.children.length - 1];
		if (lastChild[isSourceNode]) lastChild.replaceRight(aPattern, aReplacement);
		else if (typeof lastChild === "string") this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
		else this.children.push("".replace(aPattern, aReplacement));
		return this;
	};
	SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
		this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
	};
	SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
		for (var i = 0, len = this.children.length; i < len; i++) if (this.children[i][isSourceNode]) this.children[i].walkSourceContents(aFn);
		var sources = Object.keys(this.sourceContents);
		for (var i = 0, len = sources.length; i < len; i++) aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
	};
	SourceNode.prototype.toString = function SourceNode_toString() {
		var str = "";
		this.walk(function(chunk) {
			str += chunk;
		});
		return str;
	};
	SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
		var generated = {
			code: "",
			line: 1,
			column: 0
		};
		var map = new SourceMapGenerator(aArgs);
		var sourceMappingActive = false;
		var lastOriginalSource = null;
		var lastOriginalLine = null;
		var lastOriginalColumn = null;
		var lastOriginalName = null;
		this.walk(function(chunk, original) {
			generated.code += chunk;
			if (original.source !== null && original.line !== null && original.column !== null) {
				if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) map.addMapping({
					source: original.source,
					original: {
						line: original.line,
						column: original.column
					},
					generated: {
						line: generated.line,
						column: generated.column
					},
					name: original.name
				});
				lastOriginalSource = original.source;
				lastOriginalLine = original.line;
				lastOriginalColumn = original.column;
				lastOriginalName = original.name;
				sourceMappingActive = true;
			} else if (sourceMappingActive) {
				map.addMapping({ generated: {
					line: generated.line,
					column: generated.column
				} });
				lastOriginalSource = null;
				sourceMappingActive = false;
			}
			for (var idx = 0, length = chunk.length; idx < length; idx++) if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
				generated.line++;
				generated.column = 0;
				if (idx + 1 === length) {
					lastOriginalSource = null;
					sourceMappingActive = false;
				} else if (sourceMappingActive) map.addMapping({
					source: original.source,
					original: {
						line: original.line,
						column: original.column
					},
					generated: {
						line: generated.line,
						column: generated.column
					},
					name: original.name
				});
			} else generated.column++;
		});
		this.walkSourceContents(function(sourceFile, sourceContent) {
			map.setSourceContent(sourceFile, sourceContent);
		});
		return {
			code: generated.code,
			map
		};
	};
	exports.SourceNode = SourceNode;
}));
var require_source_map = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
	exports.SourceMapConsumer = require_source_map_consumer().SourceMapConsumer;
	exports.SourceNode = require_source_node().SourceNode;
}));
var require_previous_map = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let { existsSync, readFileSync } = __require("fs");
	let { dirname: dirname$1, join } = __require("path");
	let { SourceMapConsumer, SourceMapGenerator } = require_source_map();
	function fromBase64(str) {
		if (Buffer) return Buffer.from(str, "base64").toString();
		else
 /* c8 ignore next 2 */
		return window.atob(str);
	}
	var PreviousMap = class {
		constructor(css, opts) {
			if (opts.map === false) return;
			this.loadAnnotation(css);
			this.inline = this.startWith(this.annotation, "data:");
			let prev = opts.map ? opts.map.prev : void 0;
			let text = this.loadMap(opts.from, prev);
			if (!this.mapFile && opts.from) this.mapFile = opts.from;
			if (this.mapFile) this.root = dirname$1(this.mapFile);
			if (text) this.text = text;
		}
		consumer() {
			if (!this.consumerCache) this.consumerCache = new SourceMapConsumer(this.text);
			return this.consumerCache;
		}
		decodeInline(text) {
			let baseCharsetUri = /^data:application\/json;charset=utf-?8;base64,/;
			let baseUri = /^data:application\/json;base64,/;
			let uriMatch = text.match(/^data:application\/json;charset=utf-?8,/) || text.match(/^data:application\/json,/);
			if (uriMatch) return decodeURIComponent(text.substr(uriMatch[0].length));
			let baseUriMatch = text.match(baseCharsetUri) || text.match(baseUri);
			if (baseUriMatch) return fromBase64(text.substr(baseUriMatch[0].length));
			let encoding = text.match(/data:application\/json;([^,]+),/)[1];
			throw new Error("Unsupported source map encoding " + encoding);
		}
		getAnnotationURL(sourceMapString) {
			return sourceMapString.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
		}
		isMap(map) {
			if (typeof map !== "object") return false;
			return typeof map.mappings === "string" || typeof map._mappings === "string" || Array.isArray(map.sections);
		}
		loadAnnotation(css) {
			let comments = css.match(/\/\*\s*# sourceMappingURL=/g);
			if (!comments) return;
			let start = css.lastIndexOf(comments.pop());
			let end = css.indexOf("*/", start);
			if (start > -1 && end > -1) this.annotation = this.getAnnotationURL(css.substring(start, end));
		}
		loadFile(path) {
			this.root = dirname$1(path);
			if (existsSync(path)) {
				this.mapFile = path;
				return readFileSync(path, "utf-8").toString().trim();
			}
		}
		loadMap(file, prev) {
			if (prev === false) return false;
			if (prev) if (typeof prev === "string") return prev;
			else if (typeof prev === "function") {
				let prevPath = prev(file);
				if (prevPath) {
					let map = this.loadFile(prevPath);
					if (!map) throw new Error("Unable to load previous source map: " + prevPath.toString());
					return map;
				}
			} else if (prev instanceof SourceMapConsumer) return SourceMapGenerator.fromSourceMap(prev).toString();
			else if (prev instanceof SourceMapGenerator) return prev.toString();
			else if (this.isMap(prev)) return JSON.stringify(prev);
			else throw new Error("Unsupported previous source map format: " + prev.toString());
			else if (this.inline) return this.decodeInline(this.annotation);
			else if (this.annotation) {
				let map = this.annotation;
				if (file) map = join(dirname$1(file), map);
				return this.loadFile(map);
			}
		}
		startWith(string, start) {
			if (!string) return false;
			return string.substr(0, start.length) === start;
		}
		withContent() {
			return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
		}
	};
	module.exports = PreviousMap;
	PreviousMap.default = PreviousMap;
}));
var require_input = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let { nanoid } = require_non_secure();
	let { isAbsolute, resolve: resolve$1 } = __require("path");
	let { SourceMapConsumer, SourceMapGenerator } = require_source_map();
	let { fileURLToPath: fileURLToPath$1, pathToFileURL: pathToFileURL$2 } = __require("url");
	let CssSyntaxError = require_css_syntax_error();
	let PreviousMap = require_previous_map();
	let terminalHighlight = require_terminal_highlight();
	let lineToIndexCache = Symbol("lineToIndexCache");
	let sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
	let pathAvailable = Boolean(resolve$1 && isAbsolute);
	function getLineToIndex(input) {
		if (input[lineToIndexCache]) return input[lineToIndexCache];
		let lines = input.css.split("\n");
		let lineToIndex = new Array(lines.length);
		let prevIndex = 0;
		for (let i = 0, l = lines.length; i < l; i++) {
			lineToIndex[i] = prevIndex;
			prevIndex += lines[i].length + 1;
		}
		input[lineToIndexCache] = lineToIndex;
		return lineToIndex;
	}
	var Input = class {
		get from() {
			return this.file || this.id;
		}
		constructor(css, opts = {}) {
			if (css === null || typeof css === "undefined" || typeof css === "object" && !css.toString) throw new Error(`PostCSS received ${css} instead of CSS string`);
			this.css = css.toString();
			if (this.css[0] === "﻿" || this.css[0] === "￾") {
				this.hasBOM = true;
				this.css = this.css.slice(1);
			} else this.hasBOM = false;
			this.document = this.css;
			if (opts.document) this.document = opts.document.toString();
			if (opts.from) if (!pathAvailable || /^\w+:\/\//.test(opts.from) || isAbsolute(opts.from)) this.file = opts.from;
			else this.file = resolve$1(opts.from);
			if (pathAvailable && sourceMapAvailable) {
				let map = new PreviousMap(this.css, opts);
				if (map.text) {
					this.map = map;
					let file = map.consumer().file;
					if (!this.file && file) this.file = this.mapResolve(file);
				}
			}
			if (!this.file) this.id = "<input css " + nanoid(6) + ">";
			if (this.map) this.map.file = this.from;
		}
		error(message, line, column, opts = {}) {
			let endColumn, endLine, endOffset, offset, result;
			if (line && typeof line === "object") {
				let start = line;
				let end = column;
				if (typeof start.offset === "number") {
					offset = start.offset;
					let pos = this.fromOffset(offset);
					line = pos.line;
					column = pos.col;
				} else {
					line = start.line;
					column = start.column;
					offset = this.fromLineAndColumn(line, column);
				}
				if (typeof end.offset === "number") {
					endOffset = end.offset;
					let pos = this.fromOffset(endOffset);
					endLine = pos.line;
					endColumn = pos.col;
				} else {
					endLine = end.line;
					endColumn = end.column;
					endOffset = this.fromLineAndColumn(end.line, end.column);
				}
			} else if (!column) {
				offset = line;
				let pos = this.fromOffset(offset);
				line = pos.line;
				column = pos.col;
			} else offset = this.fromLineAndColumn(line, column);
			let origin = this.origin(line, column, endLine, endColumn);
			if (origin) result = new CssSyntaxError(message, origin.endLine === void 0 ? origin.line : {
				column: origin.column,
				line: origin.line
			}, origin.endLine === void 0 ? origin.column : {
				column: origin.endColumn,
				line: origin.endLine
			}, origin.source, origin.file, opts.plugin);
			else result = new CssSyntaxError(message, endLine === void 0 ? line : {
				column,
				line
			}, endLine === void 0 ? column : {
				column: endColumn,
				line: endLine
			}, this.css, this.file, opts.plugin);
			result.input = {
				column,
				endColumn,
				endLine,
				endOffset,
				line,
				offset,
				source: this.css
			};
			if (this.file) {
				if (pathToFileURL$2) result.input.url = pathToFileURL$2(this.file).toString();
				result.input.file = this.file;
			}
			return result;
		}
		fromLineAndColumn(line, column) {
			return getLineToIndex(this)[line - 1] + column - 1;
		}
		fromOffset(offset) {
			let lineToIndex = getLineToIndex(this);
			let lastLine = lineToIndex[lineToIndex.length - 1];
			let min = 0;
			if (offset >= lastLine) min = lineToIndex.length - 1;
			else {
				let max = lineToIndex.length - 2;
				let mid;
				while (min < max) {
					mid = min + (max - min >> 1);
					if (offset < lineToIndex[mid]) max = mid - 1;
					else if (offset >= lineToIndex[mid + 1]) min = mid + 1;
					else {
						min = mid;
						break;
					}
				}
			}
			return {
				col: offset - lineToIndex[min] + 1,
				line: min + 1
			};
		}
		mapResolve(file) {
			if (/^\w+:\/\//.test(file)) return file;
			return resolve$1(this.map.consumer().sourceRoot || this.map.root || ".", file);
		}
		origin(line, column, endLine, endColumn) {
			if (!this.map) return false;
			let consumer = this.map.consumer();
			let from = consumer.originalPositionFor({
				column,
				line
			});
			if (!from.source) return false;
			let to;
			if (typeof endLine === "number") to = consumer.originalPositionFor({
				column: endColumn,
				line: endLine
			});
			let fromUrl;
			if (isAbsolute(from.source)) fromUrl = pathToFileURL$2(from.source);
			else fromUrl = new URL(from.source, this.map.consumer().sourceRoot || pathToFileURL$2(this.map.mapFile));
			let result = {
				column: from.column,
				endColumn: to && to.column,
				endLine: to && to.line,
				line: from.line,
				url: fromUrl.toString()
			};
			if (fromUrl.protocol === "file:") if (fileURLToPath$1) result.file = fileURLToPath$1(fromUrl);
			else
 /* c8 ignore next 2 */
			throw new Error(`file: protocol is not available in this PostCSS build`);
			let source = consumer.sourceContentFor(from.source);
			if (source) result.source = source;
			return result;
		}
		toJSON() {
			let json = {};
			for (let name of [
				"hasBOM",
				"css",
				"file",
				"id"
			]) if (this[name] != null) json[name] = this[name];
			if (this.map) {
				json.map = { ...this.map };
				if (json.map.consumerCache) json.map.consumerCache = void 0;
			}
			return json;
		}
	};
	module.exports = Input;
	Input.default = Input;
	if (terminalHighlight && terminalHighlight.registerInput) terminalHighlight.registerInput(Input);
}));
var require_root$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let Container = require_container$1();
	let LazyResult, Processor;
	var Root = class extends Container {
		constructor(defaults) {
			super(defaults);
			this.type = "root";
			if (!this.nodes) this.nodes = [];
		}
		normalize(child, sample, type) {
			let nodes = super.normalize(child);
			if (sample) {
				if (type === "prepend") if (this.nodes.length > 1) sample.raws.before = this.nodes[1].raws.before;
				else delete sample.raws.before;
				else if (this.first !== sample) for (let node of nodes) node.raws.before = sample.raws.before;
			}
			return nodes;
		}
		removeChild(child, ignore) {
			let index = this.index(child);
			if (!ignore && index === 0 && this.nodes.length > 1) this.nodes[1].raws.before = this.nodes[index].raws.before;
			return super.removeChild(child);
		}
		toResult(opts = {}) {
			return new LazyResult(new Processor(), this, opts).stringify();
		}
	};
	Root.registerLazyResult = (dependant) => {
		LazyResult = dependant;
	};
	Root.registerProcessor = (dependant) => {
		Processor = dependant;
	};
	module.exports = Root;
	Root.default = Root;
	Container.registerRoot(Root);
}));
var require_list = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let list = {
		comma(string) {
			return list.split(string, [","], true);
		},
		space(string) {
			return list.split(string, [
				" ",
				"\n",
				"	"
			]);
		},
		split(string, separators, last) {
			let array = [];
			let current = "";
			let split = false;
			let func = 0;
			let inQuote = false;
			let prevQuote = "";
			let escape = false;
			for (let letter of string) {
				if (escape) escape = false;
				else if (letter === "\\") escape = true;
				else if (inQuote) {
					if (letter === prevQuote) inQuote = false;
				} else if (letter === "\"" || letter === "'") {
					inQuote = true;
					prevQuote = letter;
				} else if (letter === "(") func += 1;
				else if (letter === ")") {
					if (func > 0) func -= 1;
				} else if (func === 0) {
					if (separators.includes(letter)) split = true;
				}
				if (split) {
					if (current !== "") array.push(current.trim());
					current = "";
					split = false;
				} else current += letter;
			}
			if (last || current !== "") array.push(current.trim());
			return array;
		}
	};
	module.exports = list;
	list.default = list;
}));
var require_rule = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let Container = require_container$1();
	let list = require_list();
	var Rule = class extends Container {
		get selectors() {
			return list.comma(this.selector);
		}
		set selectors(values) {
			let match = this.selector ? this.selector.match(/,\s*/) : null;
			let sep = match ? match[0] : "," + this.raw("between", "beforeOpen");
			this.selector = values.join(sep);
		}
		constructor(defaults) {
			super(defaults);
			this.type = "rule";
			if (!this.nodes) this.nodes = [];
		}
	};
	module.exports = Rule;
	Rule.default = Rule;
	Container.registerRule(Rule);
}));
var require_fromJSON = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let AtRule = require_at_rule();
	let Comment = require_comment$1();
	let Declaration = require_declaration();
	let Input = require_input();
	let PreviousMap = require_previous_map();
	let Root = require_root$1();
	let Rule = require_rule();
	function fromJSON(json, inputs) {
		if (Array.isArray(json)) return json.map((n) => fromJSON(n));
		let { inputs: ownInputs, ...defaults } = json;
		if (ownInputs) {
			inputs = [];
			for (let input of ownInputs) {
				let inputHydrated = {
					...input,
					__proto__: Input.prototype
				};
				if (inputHydrated.map) inputHydrated.map = {
					...inputHydrated.map,
					__proto__: PreviousMap.prototype
				};
				inputs.push(inputHydrated);
			}
		}
		if (defaults.nodes) defaults.nodes = json.nodes.map((n) => fromJSON(n, inputs));
		if (defaults.source) {
			let { inputId, ...source } = defaults.source;
			defaults.source = source;
			if (inputId != null) defaults.source.input = inputs[inputId];
		}
		if (defaults.type === "root") return new Root(defaults);
		else if (defaults.type === "decl") return new Declaration(defaults);
		else if (defaults.type === "rule") return new Rule(defaults);
		else if (defaults.type === "comment") return new Comment(defaults);
		else if (defaults.type === "atrule") return new AtRule(defaults);
		else throw new Error("Unknown node type: " + json.type);
	}
	module.exports = fromJSON;
	fromJSON.default = fromJSON;
}));
var require_map_generator = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let { dirname, relative, resolve, sep } = __require("path");
	let { SourceMapConsumer, SourceMapGenerator } = require_source_map();
	let { pathToFileURL: pathToFileURL$1 } = __require("url");
	let Input = require_input();
	let sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
	let pathAvailable = Boolean(dirname && resolve && relative && sep);
	var MapGenerator = class {
		constructor(stringify, root, opts, cssString) {
			this.stringify = stringify;
			this.mapOpts = opts.map || {};
			this.root = root;
			this.opts = opts;
			this.css = cssString;
			this.originalCSS = cssString;
			this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute;
			this.memoizedFileURLs = /* @__PURE__ */ new Map();
			this.memoizedPaths = /* @__PURE__ */ new Map();
			this.memoizedURLs = /* @__PURE__ */ new Map();
		}
		addAnnotation() {
			let content;
			if (this.isInline()) content = "data:application/json;base64," + this.toBase64(this.map.toString());
			else if (typeof this.mapOpts.annotation === "string") content = this.mapOpts.annotation;
			else if (typeof this.mapOpts.annotation === "function") content = this.mapOpts.annotation(this.opts.to, this.root);
			else content = this.outputFile() + ".map";
			let eol = "\n";
			if (this.css.includes("\r\n")) eol = "\r\n";
			this.css += eol + "/*# sourceMappingURL=" + content + " */";
		}
		applyPrevMaps() {
			for (let prev of this.previous()) {
				let from = this.toUrl(this.path(prev.file));
				let root = prev.root || dirname(prev.file);
				let map;
				if (this.mapOpts.sourcesContent === false) {
					map = new SourceMapConsumer(prev.text);
					if (map.sourcesContent) map.sourcesContent = null;
				} else map = prev.consumer();
				this.map.applySourceMap(map, from, this.toUrl(this.path(root)));
			}
		}
		clearAnnotation() {
			if (this.mapOpts.annotation === false) return;
			if (this.root) {
				let node;
				for (let i = this.root.nodes.length - 1; i >= 0; i--) {
					node = this.root.nodes[i];
					if (node.type !== "comment") continue;
					if (node.text.startsWith("# sourceMappingURL=")) this.root.removeChild(i);
				}
			} else if (this.css) this.css = this.css.replace(/\n*\/\*#[\S\s]*?\*\/$/gm, "");
		}
		generate() {
			this.clearAnnotation();
			if (pathAvailable && sourceMapAvailable && this.isMap()) return this.generateMap();
			else {
				let result = "";
				this.stringify(this.root, (i) => {
					result += i;
				});
				return [result];
			}
		}
		generateMap() {
			if (this.root) this.generateString();
			else if (this.previous().length === 1) {
				let prev = this.previous()[0].consumer();
				prev.file = this.outputFile();
				this.map = SourceMapGenerator.fromSourceMap(prev, { ignoreInvalidMapping: true });
			} else {
				this.map = new SourceMapGenerator({
					file: this.outputFile(),
					ignoreInvalidMapping: true
				});
				this.map.addMapping({
					generated: {
						column: 0,
						line: 1
					},
					original: {
						column: 0,
						line: 1
					},
					source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
				});
			}
			if (this.isSourcesContent()) this.setSourcesContent();
			if (this.root && this.previous().length > 0) this.applyPrevMaps();
			if (this.isAnnotation()) this.addAnnotation();
			if (this.isInline()) return [this.css];
			else return [this.css, this.map];
		}
		generateString() {
			this.css = "";
			this.map = new SourceMapGenerator({
				file: this.outputFile(),
				ignoreInvalidMapping: true
			});
			let line = 1;
			let column = 1;
			let noSource = "<no source>";
			let mapping = {
				generated: {
					column: 0,
					line: 0
				},
				original: {
					column: 0,
					line: 0
				},
				source: ""
			};
			let last, lines;
			this.stringify(this.root, (str, node, type) => {
				this.css += str;
				if (node && type !== "end") {
					mapping.generated.line = line;
					mapping.generated.column = column - 1;
					if (node.source && node.source.start) {
						mapping.source = this.sourcePath(node);
						mapping.original.line = node.source.start.line;
						mapping.original.column = node.source.start.column - 1;
						this.map.addMapping(mapping);
					} else {
						mapping.source = noSource;
						mapping.original.line = 1;
						mapping.original.column = 0;
						this.map.addMapping(mapping);
					}
				}
				lines = str.match(/\n/g);
				if (lines) {
					line += lines.length;
					last = str.lastIndexOf("\n");
					column = str.length - last;
				} else column += str.length;
				if (node && type !== "start") {
					let p = node.parent || { raws: {} };
					if (!(node.type === "decl" || node.type === "atrule" && !node.nodes) || node !== p.last || p.raws.semicolon) if (node.source && node.source.end) {
						mapping.source = this.sourcePath(node);
						mapping.original.line = node.source.end.line;
						mapping.original.column = node.source.end.column - 1;
						mapping.generated.line = line;
						mapping.generated.column = column - 2;
						this.map.addMapping(mapping);
					} else {
						mapping.source = noSource;
						mapping.original.line = 1;
						mapping.original.column = 0;
						mapping.generated.line = line;
						mapping.generated.column = column - 1;
						this.map.addMapping(mapping);
					}
				}
			});
		}
		isAnnotation() {
			if (this.isInline()) return true;
			if (typeof this.mapOpts.annotation !== "undefined") return this.mapOpts.annotation;
			if (this.previous().length) return this.previous().some((i) => i.annotation);
			return true;
		}
		isInline() {
			if (typeof this.mapOpts.inline !== "undefined") return this.mapOpts.inline;
			let annotation = this.mapOpts.annotation;
			if (typeof annotation !== "undefined" && annotation !== true) return false;
			if (this.previous().length) return this.previous().some((i) => i.inline);
			return true;
		}
		isMap() {
			if (typeof this.opts.map !== "undefined") return !!this.opts.map;
			return this.previous().length > 0;
		}
		isSourcesContent() {
			if (typeof this.mapOpts.sourcesContent !== "undefined") return this.mapOpts.sourcesContent;
			if (this.previous().length) return this.previous().some((i) => i.withContent());
			return true;
		}
		outputFile() {
			if (this.opts.to) return this.path(this.opts.to);
			else if (this.opts.from) return this.path(this.opts.from);
			else return "to.css";
		}
		path(file) {
			if (this.mapOpts.absolute) return file;
			if (file.charCodeAt(0) === 60) return file;
			if (/^\w+:\/\//.test(file)) return file;
			let cached = this.memoizedPaths.get(file);
			if (cached) return cached;
			let from = this.opts.to ? dirname(this.opts.to) : ".";
			if (typeof this.mapOpts.annotation === "string") from = dirname(resolve(from, this.mapOpts.annotation));
			let path = relative(from, file);
			this.memoizedPaths.set(file, path);
			return path;
		}
		previous() {
			if (!this.previousMaps) {
				this.previousMaps = [];
				if (this.root) this.root.walk((node) => {
					if (node.source && node.source.input.map) {
						let map = node.source.input.map;
						if (!this.previousMaps.includes(map)) this.previousMaps.push(map);
					}
				});
				else {
					let input = new Input(this.originalCSS, this.opts);
					if (input.map) this.previousMaps.push(input.map);
				}
			}
			return this.previousMaps;
		}
		setSourcesContent() {
			let already = {};
			if (this.root) this.root.walk((node) => {
				if (node.source) {
					let from = node.source.input.from;
					if (from && !already[from]) {
						already[from] = true;
						let fromUrl = this.usesFileUrls ? this.toFileUrl(from) : this.toUrl(this.path(from));
						this.map.setSourceContent(fromUrl, node.source.input.css);
					}
				}
			});
			else if (this.css) {
				let from = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
				this.map.setSourceContent(from, this.css);
			}
		}
		sourcePath(node) {
			if (this.mapOpts.from) return this.toUrl(this.mapOpts.from);
			else if (this.usesFileUrls) return this.toFileUrl(node.source.input.from);
			else return this.toUrl(this.path(node.source.input.from));
		}
		toBase64(str) {
			if (Buffer) return Buffer.from(str).toString("base64");
			else return window.btoa(unescape(encodeURIComponent(str)));
		}
		toFileUrl(path) {
			let cached = this.memoizedFileURLs.get(path);
			if (cached) return cached;
			if (pathToFileURL$1) {
				let fileURL = pathToFileURL$1(path).toString();
				this.memoizedFileURLs.set(path, fileURL);
				return fileURL;
			} else throw new Error("`map.absolute` option is not available in this PostCSS build");
		}
		toUrl(path) {
			let cached = this.memoizedURLs.get(path);
			if (cached) return cached;
			if (sep === "\\") path = path.replace(/\\/g, "/");
			let url = encodeURI(path).replace(/[#?]/g, encodeURIComponent);
			this.memoizedURLs.set(path, url);
			return url;
		}
	};
	module.exports = MapGenerator;
}));
var require_parser$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let AtRule = require_at_rule();
	let Comment = require_comment$1();
	let Declaration = require_declaration();
	let Root = require_root$1();
	let Rule = require_rule();
	let tokenizer = require_tokenize$1();
	const SAFE_COMMENT_NEIGHBOR = {
		empty: true,
		space: true
	};
	function findLastWithPosition(tokens) {
		for (let i = tokens.length - 1; i >= 0; i--) {
			let token = tokens[i];
			let pos = token[3] || token[2];
			if (pos) return pos;
		}
	}
	var Parser = class {
		constructor(input) {
			this.input = input;
			this.root = new Root();
			this.current = this.root;
			this.spaces = "";
			this.semicolon = false;
			this.createTokenizer();
			this.root.source = {
				input,
				start: {
					column: 1,
					line: 1,
					offset: 0
				}
			};
		}
		atrule(token) {
			let node = new AtRule();
			node.name = token[1].slice(1);
			if (node.name === "") this.unnamedAtrule(node, token);
			this.init(node, token[2]);
			let type;
			let prev;
			let shift;
			let last = false;
			let open = false;
			let params = [];
			let brackets = [];
			while (!this.tokenizer.endOfFile()) {
				token = this.tokenizer.nextToken();
				type = token[0];
				if (type === "(" || type === "[") brackets.push(type === "(" ? ")" : "]");
				else if (type === "{" && brackets.length > 0) brackets.push("}");
				else if (type === brackets[brackets.length - 1]) brackets.pop();
				if (brackets.length === 0) if (type === ";") {
					node.source.end = this.getPosition(token[2]);
					node.source.end.offset++;
					this.semicolon = true;
					break;
				} else if (type === "{") {
					open = true;
					break;
				} else if (type === "}") {
					if (params.length > 0) {
						shift = params.length - 1;
						prev = params[shift];
						while (prev && prev[0] === "space") prev = params[--shift];
						if (prev) {
							node.source.end = this.getPosition(prev[3] || prev[2]);
							node.source.end.offset++;
						}
					}
					this.end(token);
					break;
				} else params.push(token);
				else params.push(token);
				if (this.tokenizer.endOfFile()) {
					last = true;
					break;
				}
			}
			node.raws.between = this.spacesAndCommentsFromEnd(params);
			if (params.length) {
				node.raws.afterName = this.spacesAndCommentsFromStart(params);
				this.raw(node, "params", params);
				if (last) {
					token = params[params.length - 1];
					node.source.end = this.getPosition(token[3] || token[2]);
					node.source.end.offset++;
					this.spaces = node.raws.between;
					node.raws.between = "";
				}
			} else {
				node.raws.afterName = "";
				node.params = "";
			}
			if (open) {
				node.nodes = [];
				this.current = node;
			}
		}
		checkMissedSemicolon(tokens) {
			let colon = this.colon(tokens);
			if (colon === false) return;
			let founded = 0;
			let token;
			for (let j = colon - 1; j >= 0; j--) {
				token = tokens[j];
				if (token[0] !== "space") {
					founded += 1;
					if (founded === 2) break;
				}
			}
			throw this.input.error("Missed semicolon", token[0] === "word" ? token[3] + 1 : token[2]);
		}
		colon(tokens) {
			let brackets = 0;
			let prev, token, type;
			for (let [i, element] of tokens.entries()) {
				token = element;
				type = token[0];
				if (type === "(") brackets += 1;
				if (type === ")") brackets -= 1;
				if (brackets === 0 && type === ":") if (!prev) this.doubleColon(token);
				else if (prev[0] === "word" && prev[1] === "progid") continue;
				else return i;
				prev = token;
			}
			return false;
		}
		comment(token) {
			let node = new Comment();
			this.init(node, token[2]);
			node.source.end = this.getPosition(token[3] || token[2]);
			node.source.end.offset++;
			let text = token[1].slice(2, -2);
			if (/^\s*$/.test(text)) {
				node.text = "";
				node.raws.left = text;
				node.raws.right = "";
			} else {
				let match = text.match(/^(\s*)([^]*\S)(\s*)$/);
				node.text = match[2];
				node.raws.left = match[1];
				node.raws.right = match[3];
			}
		}
		createTokenizer() {
			this.tokenizer = tokenizer(this.input);
		}
		decl(tokens, customProperty) {
			let node = new Declaration();
			this.init(node, tokens[0][2]);
			let last = tokens[tokens.length - 1];
			if (last[0] === ";") {
				this.semicolon = true;
				tokens.pop();
			}
			node.source.end = this.getPosition(last[3] || last[2] || findLastWithPosition(tokens));
			node.source.end.offset++;
			while (tokens[0][0] !== "word") {
				if (tokens.length === 1) this.unknownWord(tokens);
				node.raws.before += tokens.shift()[1];
			}
			node.source.start = this.getPosition(tokens[0][2]);
			node.prop = "";
			while (tokens.length) {
				let type = tokens[0][0];
				if (type === ":" || type === "space" || type === "comment") break;
				node.prop += tokens.shift()[1];
			}
			node.raws.between = "";
			let token;
			while (tokens.length) {
				token = tokens.shift();
				if (token[0] === ":") {
					node.raws.between += token[1];
					break;
				} else {
					if (token[0] === "word" && /\w/.test(token[1])) this.unknownWord([token]);
					node.raws.between += token[1];
				}
			}
			if (node.prop[0] === "_" || node.prop[0] === "*") {
				node.raws.before += node.prop[0];
				node.prop = node.prop.slice(1);
			}
			let firstSpaces = [];
			let next;
			while (tokens.length) {
				next = tokens[0][0];
				if (next !== "space" && next !== "comment") break;
				firstSpaces.push(tokens.shift());
			}
			this.precheckMissedSemicolon(tokens);
			for (let i = tokens.length - 1; i >= 0; i--) {
				token = tokens[i];
				if (token[1].toLowerCase() === "!important") {
					node.important = true;
					let string = this.stringFrom(tokens, i);
					string = this.spacesFromEnd(tokens) + string;
					if (string !== " !important") node.raws.important = string;
					break;
				} else if (token[1].toLowerCase() === "important") {
					let cache = tokens.slice(0);
					let str = "";
					for (let j = i; j > 0; j--) {
						let type = cache[j][0];
						if (str.trim().startsWith("!") && type !== "space") break;
						str = cache.pop()[1] + str;
					}
					if (str.trim().startsWith("!")) {
						node.important = true;
						node.raws.important = str;
						tokens = cache;
					}
				}
				if (token[0] !== "space" && token[0] !== "comment") break;
			}
			if (tokens.some((i) => i[0] !== "space" && i[0] !== "comment")) {
				node.raws.between += firstSpaces.map((i) => i[1]).join("");
				firstSpaces = [];
			}
			this.raw(node, "value", firstSpaces.concat(tokens), customProperty);
			if (node.value.includes(":") && !customProperty) this.checkMissedSemicolon(tokens);
		}
		doubleColon(token) {
			throw this.input.error("Double colon", { offset: token[2] }, { offset: token[2] + token[1].length });
		}
		emptyRule(token) {
			let node = new Rule();
			this.init(node, token[2]);
			node.selector = "";
			node.raws.between = "";
			this.current = node;
		}
		end(token) {
			if (this.current.nodes && this.current.nodes.length) this.current.raws.semicolon = this.semicolon;
			this.semicolon = false;
			this.current.raws.after = (this.current.raws.after || "") + this.spaces;
			this.spaces = "";
			if (this.current.parent) {
				this.current.source.end = this.getPosition(token[2]);
				this.current.source.end.offset++;
				this.current = this.current.parent;
			} else this.unexpectedClose(token);
		}
		endFile() {
			if (this.current.parent) this.unclosedBlock();
			if (this.current.nodes && this.current.nodes.length) this.current.raws.semicolon = this.semicolon;
			this.current.raws.after = (this.current.raws.after || "") + this.spaces;
			this.root.source.end = this.getPosition(this.tokenizer.position());
		}
		freeSemicolon(token) {
			this.spaces += token[1];
			if (this.current.nodes) {
				let prev = this.current.nodes[this.current.nodes.length - 1];
				if (prev && prev.type === "rule" && !prev.raws.ownSemicolon) {
					prev.raws.ownSemicolon = this.spaces;
					this.spaces = "";
					prev.source.end = this.getPosition(token[2]);
					prev.source.end.offset += prev.raws.ownSemicolon.length;
				}
			}
		}
		getPosition(offset) {
			let pos = this.input.fromOffset(offset);
			return {
				column: pos.col,
				line: pos.line,
				offset
			};
		}
		init(node, offset) {
			this.current.push(node);
			node.source = {
				input: this.input,
				start: this.getPosition(offset)
			};
			node.raws.before = this.spaces;
			this.spaces = "";
			if (node.type !== "comment") this.semicolon = false;
		}
		other(start) {
			let end = false;
			let type = null;
			let colon = false;
			let bracket = null;
			let brackets = [];
			let customProperty = start[1].startsWith("--");
			let tokens = [];
			let token = start;
			while (token) {
				type = token[0];
				tokens.push(token);
				if (type === "(" || type === "[") {
					if (!bracket) bracket = token;
					brackets.push(type === "(" ? ")" : "]");
				} else if (customProperty && colon && type === "{") {
					if (!bracket) bracket = token;
					brackets.push("}");
				} else if (brackets.length === 0) {
					if (type === ";") if (colon) {
						this.decl(tokens, customProperty);
						return;
					} else break;
					else if (type === "{") {
						this.rule(tokens);
						return;
					} else if (type === "}") {
						this.tokenizer.back(tokens.pop());
						end = true;
						break;
					} else if (type === ":") colon = true;
				} else if (type === brackets[brackets.length - 1]) {
					brackets.pop();
					if (brackets.length === 0) bracket = null;
				}
				token = this.tokenizer.nextToken();
			}
			if (this.tokenizer.endOfFile()) end = true;
			if (brackets.length > 0) this.unclosedBracket(bracket);
			if (end && colon) {
				if (!customProperty) while (tokens.length) {
					token = tokens[tokens.length - 1][0];
					if (token !== "space" && token !== "comment") break;
					this.tokenizer.back(tokens.pop());
				}
				this.decl(tokens, customProperty);
			} else this.unknownWord(tokens);
		}
		parse() {
			let token;
			while (!this.tokenizer.endOfFile()) {
				token = this.tokenizer.nextToken();
				switch (token[0]) {
					case "space":
						this.spaces += token[1];
						break;
					case ";":
						this.freeSemicolon(token);
						break;
					case "}":
						this.end(token);
						break;
					case "comment":
						this.comment(token);
						break;
					case "at-word":
						this.atrule(token);
						break;
					case "{":
						this.emptyRule(token);
						break;
					default:
						this.other(token);
						break;
				}
			}
			this.endFile();
		}
		precheckMissedSemicolon() {}
		raw(node, prop, tokens, customProperty) {
			let token, type;
			let length = tokens.length;
			let value = "";
			let clean = true;
			let next, prev;
			for (let i = 0; i < length; i += 1) {
				token = tokens[i];
				type = token[0];
				if (type === "space" && i === length - 1 && !customProperty) clean = false;
				else if (type === "comment") {
					prev = tokens[i - 1] ? tokens[i - 1][0] : "empty";
					next = tokens[i + 1] ? tokens[i + 1][0] : "empty";
					if (!SAFE_COMMENT_NEIGHBOR[prev] && !SAFE_COMMENT_NEIGHBOR[next]) if (value.slice(-1) === ",") clean = false;
					else value += token[1];
					else clean = false;
				} else value += token[1];
			}
			if (!clean) {
				let raw = tokens.reduce((all, i) => all + i[1], "");
				node.raws[prop] = {
					raw,
					value
				};
			}
			node[prop] = value;
		}
		rule(tokens) {
			tokens.pop();
			let node = new Rule();
			this.init(node, tokens[0][2]);
			node.raws.between = this.spacesAndCommentsFromEnd(tokens);
			this.raw(node, "selector", tokens);
			this.current = node;
		}
		spacesAndCommentsFromEnd(tokens) {
			let lastTokenType;
			let spaces = "";
			while (tokens.length) {
				lastTokenType = tokens[tokens.length - 1][0];
				if (lastTokenType !== "space" && lastTokenType !== "comment") break;
				spaces = tokens.pop()[1] + spaces;
			}
			return spaces;
		}
		spacesAndCommentsFromStart(tokens) {
			let next;
			let spaces = "";
			while (tokens.length) {
				next = tokens[0][0];
				if (next !== "space" && next !== "comment") break;
				spaces += tokens.shift()[1];
			}
			return spaces;
		}
		spacesFromEnd(tokens) {
			let lastTokenType;
			let spaces = "";
			while (tokens.length) {
				lastTokenType = tokens[tokens.length - 1][0];
				if (lastTokenType !== "space") break;
				spaces = tokens.pop()[1] + spaces;
			}
			return spaces;
		}
		stringFrom(tokens, from) {
			let result = "";
			for (let i = from; i < tokens.length; i++) result += tokens[i][1];
			tokens.splice(from, tokens.length - from);
			return result;
		}
		unclosedBlock() {
			let pos = this.current.source.start;
			throw this.input.error("Unclosed block", pos.line, pos.column);
		}
		unclosedBracket(bracket) {
			throw this.input.error("Unclosed bracket", { offset: bracket[2] }, { offset: bracket[2] + 1 });
		}
		unexpectedClose(token) {
			throw this.input.error("Unexpected }", { offset: token[2] }, { offset: token[2] + 1 });
		}
		unknownWord(tokens) {
			throw this.input.error("Unknown word " + tokens[0][1], { offset: tokens[0][2] }, { offset: tokens[0][2] + tokens[0][1].length });
		}
		unnamedAtrule(node, token) {
			throw this.input.error("At-rule without name", { offset: token[2] }, { offset: token[2] + token[1].length });
		}
	};
	module.exports = Parser;
}));
var require_parse = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let Container = require_container$1();
	let Input = require_input();
	let Parser = require_parser$2();
	function parse(css, opts) {
		let parser = new Parser(new Input(css, opts));
		try {
			parser.parse();
		} catch (e) {
			if (process.env.NODE_ENV !== "production") {
				if (e.name === "CssSyntaxError" && opts && opts.from) {
					if (/\.scss$/i.test(opts.from)) e.message += "\nYou tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser";
					else if (/\.sass/i.test(opts.from)) e.message += "\nYou tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser";
					else if (/\.less$/i.test(opts.from)) e.message += "\nYou tried to parse Less with the standard CSS parser; try again with the postcss-less parser";
				}
			}
			throw e;
		}
		return parser.root;
	}
	module.exports = parse;
	parse.default = parse;
	Container.registerParse(parse);
}));
var require_warning = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Warning = class {
		constructor(text, opts = {}) {
			this.type = "warning";
			this.text = text;
			if (opts.node && opts.node.source) {
				let range = opts.node.rangeBy(opts);
				this.line = range.start.line;
				this.column = range.start.column;
				this.endLine = range.end.line;
				this.endColumn = range.end.column;
			}
			for (let opt in opts) this[opt] = opts[opt];
		}
		toString() {
			if (this.node) return this.node.error(this.text, {
				index: this.index,
				plugin: this.plugin,
				word: this.word
			}).message;
			if (this.plugin) return this.plugin + ": " + this.text;
			return this.text;
		}
	};
	module.exports = Warning;
	Warning.default = Warning;
}));
var require_result = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let Warning = require_warning();
	var Result = class {
		get content() {
			return this.css;
		}
		constructor(processor, root, opts) {
			this.processor = processor;
			this.messages = [];
			this.root = root;
			this.opts = opts;
			this.css = "";
			this.map = void 0;
		}
		toString() {
			return this.css;
		}
		warn(text, opts = {}) {
			if (!opts.plugin) {
				if (this.lastPlugin && this.lastPlugin.postcssPlugin) opts.plugin = this.lastPlugin.postcssPlugin;
			}
			let warning = new Warning(text, opts);
			this.messages.push(warning);
			return warning;
		}
		warnings() {
			return this.messages.filter((i) => i.type === "warning");
		}
	};
	module.exports = Result;
	Result.default = Result;
}));
var require_warn_once = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let printed = {};
	module.exports = function warnOnce(message) {
		if (printed[message]) return;
		printed[message] = true;
		if (typeof console !== "undefined" && console.warn) console.warn(message);
	};
}));
var require_lazy_result = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let Container = require_container$1();
	let Document = require_document();
	let MapGenerator = require_map_generator();
	let parse = require_parse();
	let Result = require_result();
	let Root = require_root$1();
	let stringify = require_stringify();
	let { isClean, my } = require_symbols();
	let warnOnce = require_warn_once();
	const TYPE_TO_CLASS_NAME = {
		atrule: "AtRule",
		comment: "Comment",
		decl: "Declaration",
		document: "Document",
		root: "Root",
		rule: "Rule"
	};
	const PLUGIN_PROPS = {
		AtRule: true,
		AtRuleExit: true,
		Comment: true,
		CommentExit: true,
		Declaration: true,
		DeclarationExit: true,
		Document: true,
		DocumentExit: true,
		Once: true,
		OnceExit: true,
		postcssPlugin: true,
		prepare: true,
		Root: true,
		RootExit: true,
		Rule: true,
		RuleExit: true
	};
	const NOT_VISITORS = {
		Once: true,
		postcssPlugin: true,
		prepare: true
	};
	const CHILDREN = 0;
	function isPromise(obj) {
		return typeof obj === "object" && typeof obj.then === "function";
	}
	function getEvents(node) {
		let key = false;
		let type = TYPE_TO_CLASS_NAME[node.type];
		if (node.type === "decl") key = node.prop.toLowerCase();
		else if (node.type === "atrule") key = node.name.toLowerCase();
		if (key && node.append) return [
			type,
			type + "-" + key,
			CHILDREN,
			type + "Exit",
			type + "Exit-" + key
		];
		else if (key) return [
			type,
			type + "-" + key,
			type + "Exit",
			type + "Exit-" + key
		];
		else if (node.append) return [
			type,
			CHILDREN,
			type + "Exit"
		];
		else return [type, type + "Exit"];
	}
	function toStack(node) {
		let events;
		if (node.type === "document") events = [
			"Document",
			CHILDREN,
			"DocumentExit"
		];
		else if (node.type === "root") events = [
			"Root",
			CHILDREN,
			"RootExit"
		];
		else events = getEvents(node);
		return {
			eventIndex: 0,
			events,
			iterator: 0,
			node,
			visitorIndex: 0,
			visitors: []
		};
	}
	function cleanMarks(node) {
		node[isClean] = false;
		if (node.nodes) node.nodes.forEach((i) => cleanMarks(i));
		return node;
	}
	let postcss = {};
	var LazyResult = class LazyResult {
		get content() {
			return this.stringify().content;
		}
		get css() {
			return this.stringify().css;
		}
		get map() {
			return this.stringify().map;
		}
		get messages() {
			return this.sync().messages;
		}
		get opts() {
			return this.result.opts;
		}
		get processor() {
			return this.result.processor;
		}
		get root() {
			return this.sync().root;
		}
		get [Symbol.toStringTag]() {
			return "LazyResult";
		}
		constructor(processor, css, opts) {
			this.stringified = false;
			this.processed = false;
			let root;
			if (typeof css === "object" && css !== null && (css.type === "root" || css.type === "document")) root = cleanMarks(css);
			else if (css instanceof LazyResult || css instanceof Result) {
				root = cleanMarks(css.root);
				if (css.map) {
					if (typeof opts.map === "undefined") opts.map = {};
					if (!opts.map.inline) opts.map.inline = false;
					opts.map.prev = css.map;
				}
			} else {
				let parser = parse;
				if (opts.syntax) parser = opts.syntax.parse;
				if (opts.parser) parser = opts.parser;
				if (parser.parse) parser = parser.parse;
				try {
					root = parser(css, opts);
				} catch (error) {
					this.processed = true;
					this.error = error;
				}
				if (root && !root[my])
 /* c8 ignore next 2 */
				Container.rebuild(root);
			}
			this.result = new Result(processor, root, opts);
			this.helpers = {
				...postcss,
				postcss,
				result: this.result
			};
			this.plugins = this.processor.plugins.map((plugin) => {
				if (typeof plugin === "object" && plugin.prepare) return {
					...plugin,
					...plugin.prepare(this.result)
				};
				else return plugin;
			});
		}
		async() {
			if (this.error) return Promise.reject(this.error);
			if (this.processed) return Promise.resolve(this.result);
			if (!this.processing) this.processing = this.runAsync();
			return this.processing;
		}
		catch(onRejected) {
			return this.async().catch(onRejected);
		}
		finally(onFinally) {
			return this.async().then(onFinally, onFinally);
		}
		getAsyncError() {
			throw new Error("Use process(css).then(cb) to work with async plugins");
		}
		handleError(error, node) {
			let plugin = this.result.lastPlugin;
			try {
				if (node) node.addToError(error);
				this.error = error;
				if (error.name === "CssSyntaxError" && !error.plugin) {
					error.plugin = plugin.postcssPlugin;
					error.setMessage();
				} else if (plugin.postcssVersion) {
					if (process.env.NODE_ENV !== "production") {
						let pluginName = plugin.postcssPlugin;
						let pluginVer = plugin.postcssVersion;
						let runtimeVer = this.result.processor.version;
						let a = pluginVer.split(".");
						let b = runtimeVer.split(".");
						if (a[0] !== b[0] || parseInt(a[1]) > parseInt(b[1])) console.error("Unknown error from PostCSS plugin. Your current PostCSS version is " + runtimeVer + ", but " + pluginName + " uses " + pluginVer + ". Perhaps this is the source of the error below.");
					}
				}
			} catch (err) {
				/* c8 ignore next 3 */
				if (console && console.error) console.error(err);
			}
			return error;
		}
		prepareVisitors() {
			this.listeners = {};
			let add = (plugin, type, cb) => {
				if (!this.listeners[type]) this.listeners[type] = [];
				this.listeners[type].push([plugin, cb]);
			};
			for (let plugin of this.plugins) if (typeof plugin === "object") for (let event in plugin) {
				if (!PLUGIN_PROPS[event] && /^[A-Z]/.test(event)) throw new Error(`Unknown event ${event} in ${plugin.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`);
				if (!NOT_VISITORS[event]) {
					if (typeof plugin[event] === "object") for (let filter in plugin[event]) if (filter === "*") add(plugin, event, plugin[event][filter]);
					else add(plugin, event + "-" + filter.toLowerCase(), plugin[event][filter]);
					else if (typeof plugin[event] === "function") add(plugin, event, plugin[event]);
				}
			}
			this.hasListener = Object.keys(this.listeners).length > 0;
		}
		async runAsync() {
			this.plugin = 0;
			for (let i = 0; i < this.plugins.length; i++) {
				let plugin = this.plugins[i];
				let promise = this.runOnRoot(plugin);
				if (isPromise(promise)) try {
					await promise;
				} catch (error) {
					throw this.handleError(error);
				}
			}
			this.prepareVisitors();
			if (this.hasListener) {
				let root = this.result.root;
				while (!root[isClean]) {
					root[isClean] = true;
					let stack = [toStack(root)];
					while (stack.length > 0) {
						let promise = this.visitTick(stack);
						if (isPromise(promise)) try {
							await promise;
						} catch (e) {
							let node = stack[stack.length - 1].node;
							throw this.handleError(e, node);
						}
					}
				}
				if (this.listeners.OnceExit) for (let [plugin, visitor] of this.listeners.OnceExit) {
					this.result.lastPlugin = plugin;
					try {
						if (root.type === "document") {
							let roots = root.nodes.map((subRoot) => visitor(subRoot, this.helpers));
							await Promise.all(roots);
						} else await visitor(root, this.helpers);
					} catch (e) {
						throw this.handleError(e);
					}
				}
			}
			this.processed = true;
			return this.stringify();
		}
		runOnRoot(plugin) {
			this.result.lastPlugin = plugin;
			try {
				if (typeof plugin === "object" && plugin.Once) {
					if (this.result.root.type === "document") {
						let roots = this.result.root.nodes.map((root) => plugin.Once(root, this.helpers));
						if (isPromise(roots[0])) return Promise.all(roots);
						return roots;
					}
					return plugin.Once(this.result.root, this.helpers);
				} else if (typeof plugin === "function") return plugin(this.result.root, this.result);
			} catch (error) {
				throw this.handleError(error);
			}
		}
		stringify() {
			if (this.error) throw this.error;
			if (this.stringified) return this.result;
			this.stringified = true;
			this.sync();
			let opts = this.result.opts;
			let str = stringify;
			if (opts.syntax) str = opts.syntax.stringify;
			if (opts.stringifier) str = opts.stringifier;
			if (str.stringify) str = str.stringify;
			let data = new MapGenerator(str, this.result.root, this.result.opts).generate();
			this.result.css = data[0];
			this.result.map = data[1];
			return this.result;
		}
		sync() {
			if (this.error) throw this.error;
			if (this.processed) return this.result;
			this.processed = true;
			if (this.processing) throw this.getAsyncError();
			for (let plugin of this.plugins) if (isPromise(this.runOnRoot(plugin))) throw this.getAsyncError();
			this.prepareVisitors();
			if (this.hasListener) {
				let root = this.result.root;
				while (!root[isClean]) {
					root[isClean] = true;
					this.walkSync(root);
				}
				if (this.listeners.OnceExit) if (root.type === "document") for (let subRoot of root.nodes) this.visitSync(this.listeners.OnceExit, subRoot);
				else this.visitSync(this.listeners.OnceExit, root);
			}
			return this.result;
		}
		then(onFulfilled, onRejected) {
			if (process.env.NODE_ENV !== "production") {
				if (!("from" in this.opts)) warnOnce("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.");
			}
			return this.async().then(onFulfilled, onRejected);
		}
		toString() {
			return this.css;
		}
		visitSync(visitors, node) {
			for (let [plugin, visitor] of visitors) {
				this.result.lastPlugin = plugin;
				let promise;
				try {
					promise = visitor(node, this.helpers);
				} catch (e) {
					throw this.handleError(e, node.proxyOf);
				}
				if (node.type !== "root" && node.type !== "document" && !node.parent) return true;
				if (isPromise(promise)) throw this.getAsyncError();
			}
		}
		visitTick(stack) {
			let visit = stack[stack.length - 1];
			let { node, visitors } = visit;
			if (node.type !== "root" && node.type !== "document" && !node.parent) {
				stack.pop();
				return;
			}
			if (visitors.length > 0 && visit.visitorIndex < visitors.length) {
				let [plugin, visitor] = visitors[visit.visitorIndex];
				visit.visitorIndex += 1;
				if (visit.visitorIndex === visitors.length) {
					visit.visitors = [];
					visit.visitorIndex = 0;
				}
				this.result.lastPlugin = plugin;
				try {
					return visitor(node.toProxy(), this.helpers);
				} catch (e) {
					throw this.handleError(e, node);
				}
			}
			if (visit.iterator !== 0) {
				let iterator = visit.iterator;
				let child;
				while (child = node.nodes[node.indexes[iterator]]) {
					node.indexes[iterator] += 1;
					if (!child[isClean]) {
						child[isClean] = true;
						stack.push(toStack(child));
						return;
					}
				}
				visit.iterator = 0;
				delete node.indexes[iterator];
			}
			let events = visit.events;
			while (visit.eventIndex < events.length) {
				let event = events[visit.eventIndex];
				visit.eventIndex += 1;
				if (event === CHILDREN) {
					if (node.nodes && node.nodes.length) {
						node[isClean] = true;
						visit.iterator = node.getIterator();
					}
					return;
				} else if (this.listeners[event]) {
					visit.visitors = this.listeners[event];
					return;
				}
			}
			stack.pop();
		}
		walkSync(node) {
			node[isClean] = true;
			let events = getEvents(node);
			for (let event of events) if (event === CHILDREN) {
				if (node.nodes) node.each((child) => {
					if (!child[isClean]) this.walkSync(child);
				});
			} else {
				let visitors = this.listeners[event];
				if (visitors) {
					if (this.visitSync(visitors, node.toProxy())) return;
				}
			}
		}
		warnings() {
			return this.sync().warnings();
		}
	};
	LazyResult.registerPostcss = (dependant) => {
		postcss = dependant;
	};
	module.exports = LazyResult;
	LazyResult.default = LazyResult;
	Root.registerLazyResult(LazyResult);
	Document.registerLazyResult(LazyResult);
}));
var require_no_work_result = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let MapGenerator = require_map_generator();
	let parse = require_parse();
	const Result = require_result();
	let stringify = require_stringify();
	let warnOnce = require_warn_once();
	var NoWorkResult = class {
		get content() {
			return this.result.css;
		}
		get css() {
			return this.result.css;
		}
		get map() {
			return this.result.map;
		}
		get messages() {
			return [];
		}
		get opts() {
			return this.result.opts;
		}
		get processor() {
			return this.result.processor;
		}
		get root() {
			if (this._root) return this._root;
			let root;
			let parser = parse;
			try {
				root = parser(this._css, this._opts);
			} catch (error) {
				this.error = error;
			}
			if (this.error) throw this.error;
			else {
				this._root = root;
				return root;
			}
		}
		get [Symbol.toStringTag]() {
			return "NoWorkResult";
		}
		constructor(processor, css, opts) {
			css = css.toString();
			this.stringified = false;
			this._processor = processor;
			this._css = css;
			this._opts = opts;
			this._map = void 0;
			let root;
			let str = stringify;
			this.result = new Result(this._processor, root, this._opts);
			this.result.css = css;
			let self = this;
			Object.defineProperty(this.result, "root", { get() {
				return self.root;
			} });
			let map = new MapGenerator(str, root, this._opts, css);
			if (map.isMap()) {
				let [generatedCSS, generatedMap] = map.generate();
				if (generatedCSS) this.result.css = generatedCSS;
				if (generatedMap) this.result.map = generatedMap;
			} else {
				map.clearAnnotation();
				this.result.css = map.css;
			}
		}
		async() {
			if (this.error) return Promise.reject(this.error);
			return Promise.resolve(this.result);
		}
		catch(onRejected) {
			return this.async().catch(onRejected);
		}
		finally(onFinally) {
			return this.async().then(onFinally, onFinally);
		}
		sync() {
			if (this.error) throw this.error;
			return this.result;
		}
		then(onFulfilled, onRejected) {
			if (process.env.NODE_ENV !== "production") {
				if (!("from" in this._opts)) warnOnce("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.");
			}
			return this.async().then(onFulfilled, onRejected);
		}
		toString() {
			return this._css;
		}
		warnings() {
			return [];
		}
	};
	module.exports = NoWorkResult;
	NoWorkResult.default = NoWorkResult;
}));
var require_processor$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let Document = require_document();
	let LazyResult = require_lazy_result();
	let NoWorkResult = require_no_work_result();
	let Root = require_root$1();
	var Processor = class {
		constructor(plugins = []) {
			this.version = "8.5.6";
			this.plugins = this.normalize(plugins);
		}
		normalize(plugins) {
			let normalized = [];
			for (let i of plugins) {
				if (i.postcss === true) i = i();
				else if (i.postcss) i = i.postcss;
				if (typeof i === "object" && Array.isArray(i.plugins)) normalized = normalized.concat(i.plugins);
				else if (typeof i === "object" && i.postcssPlugin) normalized.push(i);
				else if (typeof i === "function") normalized.push(i);
				else if (typeof i === "object" && (i.parse || i.stringify)) {
					if (process.env.NODE_ENV !== "production") throw new Error("PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation.");
				} else throw new Error(i + " is not a PostCSS plugin");
			}
			return normalized;
		}
		process(css, opts = {}) {
			if (!this.plugins.length && !opts.parser && !opts.stringifier && !opts.syntax) return new NoWorkResult(this, css, opts);
			else return new LazyResult(this, css, opts);
		}
		use(plugin) {
			this.plugins = this.plugins.concat(this.normalize([plugin]));
			return this;
		}
	};
	module.exports = Processor;
	Processor.default = Processor;
	Root.registerProcessor(Processor);
	Document.registerProcessor(Processor);
}));
var require_postcss = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let AtRule = require_at_rule();
	let Comment = require_comment$1();
	let Container = require_container$1();
	let CssSyntaxError = require_css_syntax_error();
	let Declaration = require_declaration();
	let Document = require_document();
	let fromJSON = require_fromJSON();
	let Input = require_input();
	let LazyResult = require_lazy_result();
	let list = require_list();
	let Node = require_node$2();
	let parse = require_parse();
	let Processor = require_processor$1();
	let Result = require_result();
	let Root = require_root$1();
	let Rule = require_rule();
	let stringify = require_stringify();
	let Warning = require_warning();
	function postcss(...plugins) {
		if (plugins.length === 1 && Array.isArray(plugins[0])) plugins = plugins[0];
		return new Processor(plugins);
	}
	postcss.plugin = function plugin(name, initializer) {
		let warningPrinted = false;
		function creator(...args) {
			if (console && console.warn && !warningPrinted) {
				warningPrinted = true;
				console.warn(name + ": postcss.plugin was deprecated. Migration guide:\nhttps://evilmartians.com/chronicles/postcss-8-plugin-migration");
				if (process.env.LANG && process.env.LANG.startsWith("cn"))
 /* c8 ignore next 7 */
				console.warn(name + ": 里面 postcss.plugin 被弃用. 迁移指南:\nhttps://www.w3ctech.com/topic/2226");
			}
			let transformer = initializer(...args);
			transformer.postcssPlugin = name;
			transformer.postcssVersion = new Processor().version;
			return transformer;
		}
		let cache;
		Object.defineProperty(creator, "postcss", { get() {
			if (!cache) cache = creator();
			return cache;
		} });
		creator.process = function(css, processOpts, pluginOpts) {
			return postcss([creator(pluginOpts)]).process(css, processOpts);
		};
		return creator;
	};
	postcss.stringify = stringify;
	postcss.parse = parse;
	postcss.fromJSON = fromJSON;
	postcss.list = list;
	postcss.comment = (defaults) => new Comment(defaults);
	postcss.atRule = (defaults) => new AtRule(defaults);
	postcss.decl = (defaults) => new Declaration(defaults);
	postcss.rule = (defaults) => new Rule(defaults);
	postcss.root = (defaults) => new Root(defaults);
	postcss.document = (defaults) => new Document(defaults);
	postcss.CssSyntaxError = CssSyntaxError;
	postcss.Declaration = Declaration;
	postcss.Container = Container;
	postcss.Processor = Processor;
	postcss.Document = Document;
	postcss.Comment = Comment;
	postcss.Warning = Warning;
	postcss.AtRule = AtRule;
	postcss.Result = Result;
	postcss.Input = Input;
	postcss.Rule = Rule;
	postcss.Root = Root;
	postcss.Node = Node;
	LazyResult.registerPostcss(postcss);
	module.exports = postcss;
	postcss.default = postcss;
}));
var require_unesc = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = unesc;
	function gobbleHex(str) {
		var lower = str.toLowerCase();
		var hex = "";
		var spaceTerminated = false;
		for (var i = 0; i < 6 && lower[i] !== void 0; i++) {
			var code = lower.charCodeAt(i);
			var valid = code >= 97 && code <= 102 || code >= 48 && code <= 57;
			spaceTerminated = code === 32;
			if (!valid) break;
			hex += lower[i];
		}
		if (hex.length === 0) return;
		var codePoint = parseInt(hex, 16);
		if (codePoint >= 55296 && codePoint <= 57343 || codePoint === 0 || codePoint > 1114111) return ["�", hex.length + (spaceTerminated ? 1 : 0)];
		return [String.fromCodePoint(codePoint), hex.length + (spaceTerminated ? 1 : 0)];
	}
	var CONTAINS_ESCAPE = /\\/;
	function unesc(str) {
		if (!CONTAINS_ESCAPE.test(str)) return str;
		var ret = "";
		for (var i = 0; i < str.length; i++) {
			if (str[i] === "\\") {
				var gobbled = gobbleHex(str.slice(i + 1, i + 7));
				if (gobbled !== void 0) {
					ret += gobbled[0];
					i += gobbled[1];
					continue;
				}
				if (str[i + 1] === "\\") {
					ret += "\\";
					i++;
					continue;
				}
				if (str.length === i + 1) ret += str[i];
				continue;
			}
			ret += str[i];
		}
		return ret;
	}
	module.exports = exports.default;
}));
var require_getProp = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = getProp;
	function getProp(obj) {
		for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) props[_key - 1] = arguments[_key];
		while (props.length > 0) {
			var prop = props.shift();
			if (!obj[prop]) return;
			obj = obj[prop];
		}
		return obj;
	}
	module.exports = exports.default;
}));
var require_ensureObject = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = ensureObject;
	function ensureObject(obj) {
		for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) props[_key - 1] = arguments[_key];
		while (props.length > 0) {
			var prop = props.shift();
			if (!obj[prop]) obj[prop] = {};
			obj = obj[prop];
		}
	}
	module.exports = exports.default;
}));
var require_stripComments = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = stripComments;
	function stripComments(str) {
		var s = "";
		var commentStart = str.indexOf("/*");
		var lastEnd = 0;
		while (commentStart >= 0) {
			s = s + str.slice(lastEnd, commentStart);
			var commentEnd = str.indexOf("*/", commentStart + 2);
			if (commentEnd < 0) return s;
			lastEnd = commentEnd + 2;
			commentStart = str.indexOf("/*", lastEnd);
		}
		s = s + str.slice(lastEnd);
		return s;
	}
	module.exports = exports.default;
}));
var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	exports.unesc = exports.stripComments = exports.getProp = exports.ensureObject = void 0;
	exports.unesc = _interopRequireDefault(require_unesc())["default"];
	exports.getProp = _interopRequireDefault(require_getProp())["default"];
	exports.ensureObject = _interopRequireDefault(require_ensureObject())["default"];
	exports.stripComments = _interopRequireDefault(require_stripComments())["default"];
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
}));
var require_node$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _util = require_util();
	function _defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	function _createClass(Constructor, protoProps, staticProps) {
		if (protoProps) _defineProperties(Constructor.prototype, protoProps);
		if (staticProps) _defineProperties(Constructor, staticProps);
		Object.defineProperty(Constructor, "prototype", { writable: false });
		return Constructor;
	}
	var cloneNode = function cloneNode(obj, parent) {
		if (typeof obj !== "object" || obj === null) return obj;
		var cloned = new obj.constructor();
		for (var i in obj) {
			if (!obj.hasOwnProperty(i)) continue;
			var value = obj[i];
			if (i === "parent" && typeof value === "object") {
				if (parent) cloned[i] = parent;
			} else if (value instanceof Array) cloned[i] = value.map(function(j) {
				return cloneNode(j, cloned);
			});
			else cloned[i] = cloneNode(value, cloned);
		}
		return cloned;
	};
	exports["default"] = /* @__PURE__ */ function() {
		function Node(opts) {
			if (opts === void 0) opts = {};
			Object.assign(this, opts);
			this.spaces = this.spaces || {};
			this.spaces.before = this.spaces.before || "";
			this.spaces.after = this.spaces.after || "";
		}
		var _proto = Node.prototype;
		_proto.remove = function remove() {
			if (this.parent) this.parent.removeChild(this);
			this.parent = void 0;
			return this;
		};
		_proto.replaceWith = function replaceWith() {
			if (this.parent) {
				for (var index in arguments) this.parent.insertBefore(this, arguments[index]);
				this.remove();
			}
			return this;
		};
		_proto.next = function next() {
			return this.parent.at(this.parent.index(this) + 1);
		};
		_proto.prev = function prev() {
			return this.parent.at(this.parent.index(this) - 1);
		};
		_proto.clone = function clone(overrides) {
			if (overrides === void 0) overrides = {};
			var cloned = cloneNode(this);
			for (var name in overrides) cloned[name] = overrides[name];
			return cloned;
		};
		_proto.appendToPropertyAndEscape = function appendToPropertyAndEscape(name, value, valueEscaped) {
			if (!this.raws) this.raws = {};
			var originalValue = this[name];
			var originalEscaped = this.raws[name];
			this[name] = originalValue + value;
			if (originalEscaped || valueEscaped !== value) this.raws[name] = (originalEscaped || originalValue) + valueEscaped;
			else delete this.raws[name];
		};
		_proto.setPropertyAndEscape = function setPropertyAndEscape(name, value, valueEscaped) {
			if (!this.raws) this.raws = {};
			this[name] = value;
			this.raws[name] = valueEscaped;
		};
		_proto.setPropertyWithoutEscape = function setPropertyWithoutEscape(name, value) {
			this[name] = value;
			if (this.raws) delete this.raws[name];
		};
		_proto.isAtPosition = function isAtPosition(line, column) {
			if (this.source && this.source.start && this.source.end) {
				if (this.source.start.line > line) return false;
				if (this.source.end.line < line) return false;
				if (this.source.start.line === line && this.source.start.column > column) return false;
				if (this.source.end.line === line && this.source.end.column < column) return false;
				return true;
			}
		};
		_proto.stringifyProperty = function stringifyProperty(name) {
			return this.raws && this.raws[name] || this[name];
		};
		_proto.valueToString = function valueToString() {
			return String(this.stringifyProperty("value"));
		};
		_proto.toString = function toString() {
			return [
				this.rawSpaceBefore,
				this.valueToString(),
				this.rawSpaceAfter
			].join("");
		};
		_createClass(Node, [{
			key: "rawSpaceBefore",
			get: function get() {
				var rawSpace = this.raws && this.raws.spaces && this.raws.spaces.before;
				if (rawSpace === void 0) rawSpace = this.spaces && this.spaces.before;
				return rawSpace || "";
			},
			set: function set(raw) {
				(0, _util.ensureObject)(this, "raws", "spaces");
				this.raws.spaces.before = raw;
			}
		}, {
			key: "rawSpaceAfter",
			get: function get() {
				var rawSpace = this.raws && this.raws.spaces && this.raws.spaces.after;
				if (rawSpace === void 0) rawSpace = this.spaces.after;
				return rawSpace || "";
			},
			set: function set(raw) {
				(0, _util.ensureObject)(this, "raws", "spaces");
				this.raws.spaces.after = raw;
			}
		}]);
		return Node;
	}();
	module.exports = exports.default;
}));
var require_types = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	exports.UNIVERSAL = exports.TAG = exports.STRING = exports.SELECTOR = exports.ROOT = exports.PSEUDO = exports.NESTING = exports.ID = exports.COMMENT = exports.COMBINATOR = exports.CLASS = exports.ATTRIBUTE = void 0;
	exports.TAG = "tag";
	exports.STRING = "string";
	exports.SELECTOR = "selector";
	exports.ROOT = "root";
	exports.PSEUDO = "pseudo";
	exports.NESTING = "nesting";
	exports.ID = "id";
	exports.COMMENT = "comment";
	exports.COMBINATOR = "combinator";
	exports.CLASS = "class";
	exports.ATTRIBUTE = "attribute";
	exports.UNIVERSAL = "universal";
}));
var require_container = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _node = _interopRequireDefault(require_node$1());
	var types = _interopRequireWildcard(require_types());
	function _getRequireWildcardCache(nodeInterop) {
		if (typeof WeakMap !== "function") return null;
		var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
		var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
		return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
			return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
		})(nodeInterop);
	}
	function _interopRequireWildcard(obj, nodeInterop) {
		if (!nodeInterop && obj && obj.__esModule) return obj;
		if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { "default": obj };
		var cache = _getRequireWildcardCache(nodeInterop);
		if (cache && cache.has(obj)) return cache.get(obj);
		var newObj = {};
		var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
		for (var key in obj) if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
			var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
			if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
			else newObj[key] = obj[key];
		}
		newObj["default"] = obj;
		if (cache) cache.set(obj, newObj);
		return newObj;
	}
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _createForOfIteratorHelperLoose(o, allowArrayLike) {
		var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
		if (it) return (it = it.call(o)).next.bind(it);
		if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
			if (it) o = it;
			var i = 0;
			return function() {
				if (i >= o.length) return { done: true };
				return {
					done: false,
					value: o[i++]
				};
			};
		}
		throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function _unsupportedIterableToArray(o, minLen) {
		if (!o) return;
		if (typeof o === "string") return _arrayLikeToArray(o, minLen);
		var n = Object.prototype.toString.call(o).slice(8, -1);
		if (n === "Object" && o.constructor) n = o.constructor.name;
		if (n === "Map" || n === "Set") return Array.from(o);
		if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}
	function _arrayLikeToArray(arr, len) {
		if (len == null || len > arr.length) len = arr.length;
		for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
		return arr2;
	}
	function _defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	function _createClass(Constructor, protoProps, staticProps) {
		if (protoProps) _defineProperties(Constructor.prototype, protoProps);
		if (staticProps) _defineProperties(Constructor, staticProps);
		Object.defineProperty(Constructor, "prototype", { writable: false });
		return Constructor;
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	exports["default"] = /* @__PURE__ */ function(_Node) {
		_inheritsLoose(Container, _Node);
		function Container(opts) {
			var _this = _Node.call(this, opts) || this;
			if (!_this.nodes) _this.nodes = [];
			return _this;
		}
		var _proto = Container.prototype;
		_proto.append = function append(selector) {
			selector.parent = this;
			this.nodes.push(selector);
			return this;
		};
		_proto.prepend = function prepend(selector) {
			selector.parent = this;
			this.nodes.unshift(selector);
			return this;
		};
		_proto.at = function at(index) {
			return this.nodes[index];
		};
		_proto.index = function index(child) {
			if (typeof child === "number") return child;
			return this.nodes.indexOf(child);
		};
		_proto.removeChild = function removeChild(child) {
			child = this.index(child);
			this.at(child).parent = void 0;
			this.nodes.splice(child, 1);
			var index;
			for (var id in this.indexes) {
				index = this.indexes[id];
				if (index >= child) this.indexes[id] = index - 1;
			}
			return this;
		};
		_proto.removeAll = function removeAll() {
			for (var _iterator = _createForOfIteratorHelperLoose(this.nodes), _step; !(_step = _iterator()).done;) {
				var node = _step.value;
				node.parent = void 0;
			}
			this.nodes = [];
			return this;
		};
		_proto.empty = function empty() {
			return this.removeAll();
		};
		_proto.insertAfter = function insertAfter(oldNode, newNode) {
			newNode.parent = this;
			var oldIndex = this.index(oldNode);
			this.nodes.splice(oldIndex + 1, 0, newNode);
			newNode.parent = this;
			var index;
			for (var id in this.indexes) {
				index = this.indexes[id];
				if (oldIndex <= index) this.indexes[id] = index + 1;
			}
			return this;
		};
		_proto.insertBefore = function insertBefore(oldNode, newNode) {
			newNode.parent = this;
			var oldIndex = this.index(oldNode);
			this.nodes.splice(oldIndex, 0, newNode);
			newNode.parent = this;
			var index;
			for (var id in this.indexes) {
				index = this.indexes[id];
				if (index <= oldIndex) this.indexes[id] = index + 1;
			}
			return this;
		};
		_proto._findChildAtPosition = function _findChildAtPosition(line, col) {
			var found = void 0;
			this.each(function(node) {
				if (node.atPosition) {
					var foundChild = node.atPosition(line, col);
					if (foundChild) {
						found = foundChild;
						return false;
					}
				} else if (node.isAtPosition(line, col)) {
					found = node;
					return false;
				}
			});
			return found;
		};
		_proto.atPosition = function atPosition(line, col) {
			if (this.isAtPosition(line, col)) return this._findChildAtPosition(line, col) || this;
			else return;
		};
		_proto._inferEndPosition = function _inferEndPosition() {
			if (this.last && this.last.source && this.last.source.end) {
				this.source = this.source || {};
				this.source.end = this.source.end || {};
				Object.assign(this.source.end, this.last.source.end);
			}
		};
		_proto.each = function each(callback) {
			if (!this.lastEach) this.lastEach = 0;
			if (!this.indexes) this.indexes = {};
			this.lastEach++;
			var id = this.lastEach;
			this.indexes[id] = 0;
			if (!this.length) return;
			var index, result;
			while (this.indexes[id] < this.length) {
				index = this.indexes[id];
				result = callback(this.at(index), index);
				if (result === false) break;
				this.indexes[id] += 1;
			}
			delete this.indexes[id];
			if (result === false) return false;
		};
		_proto.walk = function walk(callback) {
			return this.each(function(node, i) {
				var result = callback(node, i);
				if (result !== false && node.length) result = node.walk(callback);
				if (result === false) return false;
			});
		};
		_proto.walkAttributes = function walkAttributes(callback) {
			var _this2 = this;
			return this.walk(function(selector) {
				if (selector.type === types.ATTRIBUTE) return callback.call(_this2, selector);
			});
		};
		_proto.walkClasses = function walkClasses(callback) {
			var _this3 = this;
			return this.walk(function(selector) {
				if (selector.type === types.CLASS) return callback.call(_this3, selector);
			});
		};
		_proto.walkCombinators = function walkCombinators(callback) {
			var _this4 = this;
			return this.walk(function(selector) {
				if (selector.type === types.COMBINATOR) return callback.call(_this4, selector);
			});
		};
		_proto.walkComments = function walkComments(callback) {
			var _this5 = this;
			return this.walk(function(selector) {
				if (selector.type === types.COMMENT) return callback.call(_this5, selector);
			});
		};
		_proto.walkIds = function walkIds(callback) {
			var _this6 = this;
			return this.walk(function(selector) {
				if (selector.type === types.ID) return callback.call(_this6, selector);
			});
		};
		_proto.walkNesting = function walkNesting(callback) {
			var _this7 = this;
			return this.walk(function(selector) {
				if (selector.type === types.NESTING) return callback.call(_this7, selector);
			});
		};
		_proto.walkPseudos = function walkPseudos(callback) {
			var _this8 = this;
			return this.walk(function(selector) {
				if (selector.type === types.PSEUDO) return callback.call(_this8, selector);
			});
		};
		_proto.walkTags = function walkTags(callback) {
			var _this9 = this;
			return this.walk(function(selector) {
				if (selector.type === types.TAG) return callback.call(_this9, selector);
			});
		};
		_proto.walkUniversals = function walkUniversals(callback) {
			var _this10 = this;
			return this.walk(function(selector) {
				if (selector.type === types.UNIVERSAL) return callback.call(_this10, selector);
			});
		};
		_proto.split = function split(callback) {
			var _this11 = this;
			var current = [];
			return this.reduce(function(memo, node, index) {
				var split = callback.call(_this11, node);
				current.push(node);
				if (split) {
					memo.push(current);
					current = [];
				} else if (index === _this11.length - 1) memo.push(current);
				return memo;
			}, []);
		};
		_proto.map = function map(callback) {
			return this.nodes.map(callback);
		};
		_proto.reduce = function reduce(callback, memo) {
			return this.nodes.reduce(callback, memo);
		};
		_proto.every = function every(callback) {
			return this.nodes.every(callback);
		};
		_proto.some = function some(callback) {
			return this.nodes.some(callback);
		};
		_proto.filter = function filter(callback) {
			return this.nodes.filter(callback);
		};
		_proto.sort = function sort(callback) {
			return this.nodes.sort(callback);
		};
		_proto.toString = function toString() {
			return this.map(String).join("");
		};
		_createClass(Container, [
			{
				key: "first",
				get: function get() {
					return this.at(0);
				}
			},
			{
				key: "last",
				get: function get() {
					return this.at(this.length - 1);
				}
			},
			{
				key: "length",
				get: function get() {
					return this.nodes.length;
				}
			}
		]);
		return Container;
	}(_node["default"]);
	module.exports = exports.default;
}));
var require_root = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _container = _interopRequireDefault(require_container());
	var _types = require_types();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	function _createClass(Constructor, protoProps, staticProps) {
		if (protoProps) _defineProperties(Constructor.prototype, protoProps);
		if (staticProps) _defineProperties(Constructor, staticProps);
		Object.defineProperty(Constructor, "prototype", { writable: false });
		return Constructor;
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	exports["default"] = /* @__PURE__ */ function(_Container) {
		_inheritsLoose(Root, _Container);
		function Root(opts) {
			var _this = _Container.call(this, opts) || this;
			_this.type = _types.ROOT;
			return _this;
		}
		var _proto = Root.prototype;
		_proto.toString = function toString() {
			var str = this.reduce(function(memo, selector) {
				memo.push(String(selector));
				return memo;
			}, []).join(",");
			return this.trailingComma ? str + "," : str;
		};
		_proto.error = function error(message, options) {
			if (this._error) return this._error(message, options);
			else return new Error(message);
		};
		_createClass(Root, [{
			key: "errorGenerator",
			set: function set(handler) {
				this._error = handler;
			}
		}]);
		return Root;
	}(_container["default"]);
	module.exports = exports.default;
}));
var require_selector = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _container = _interopRequireDefault(require_container());
	var _types = require_types();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	exports["default"] = /* @__PURE__ */ function(_Container) {
		_inheritsLoose(Selector, _Container);
		function Selector(opts) {
			var _this = _Container.call(this, opts) || this;
			_this.type = _types.SELECTOR;
			return _this;
		}
		return Selector;
	}(_container["default"]);
	module.exports = exports.default;
}));
/*! https://mths.be/cssesc v3.0.0 by @mathias */
var require_cssesc = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var hasOwnProperty = {}.hasOwnProperty;
	var merge = function merge(options, defaults) {
		if (!options) return defaults;
		var result = {};
		for (var key in defaults) result[key] = hasOwnProperty.call(options, key) ? options[key] : defaults[key];
		return result;
	};
	var regexAnySingleEscape = /[ -,\.\/:-@\[-\^`\{-~]/;
	var regexSingleEscape = /[ -,\.\/:-@\[\]\^`\{-~]/;
	var regexExcessiveSpaces = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g;
	var cssesc = function cssesc(string, options) {
		options = merge(options, cssesc.options);
		if (options.quotes != "single" && options.quotes != "double") options.quotes = "single";
		var quote = options.quotes == "double" ? "\"" : "'";
		var isIdentifier = options.isIdentifier;
		var firstChar = string.charAt(0);
		var output = "";
		var counter = 0;
		var length = string.length;
		while (counter < length) {
			var character = string.charAt(counter++);
			var codePoint = character.charCodeAt();
			var value = void 0;
			if (codePoint < 32 || codePoint > 126) {
				if (codePoint >= 55296 && codePoint <= 56319 && counter < length) {
					var extra = string.charCodeAt(counter++);
					if ((extra & 64512) == 56320) codePoint = ((codePoint & 1023) << 10) + (extra & 1023) + 65536;
					else counter--;
				}
				value = "\\" + codePoint.toString(16).toUpperCase() + " ";
			} else if (options.escapeEverything) if (regexAnySingleEscape.test(character)) value = "\\" + character;
			else value = "\\" + codePoint.toString(16).toUpperCase() + " ";
			else if (/[\t\n\f\r\x0B]/.test(character)) value = "\\" + codePoint.toString(16).toUpperCase() + " ";
			else if (character == "\\" || !isIdentifier && (character == "\"" && quote == character || character == "'" && quote == character) || isIdentifier && regexSingleEscape.test(character)) value = "\\" + character;
			else value = character;
			output += value;
		}
		if (isIdentifier) {
			if (/^-[-\d]/.test(output)) output = "\\-" + output.slice(1);
			else if (/\d/.test(firstChar)) output = "\\3" + firstChar + " " + output.slice(1);
		}
		output = output.replace(regexExcessiveSpaces, function($0, $1, $2) {
			if ($1 && $1.length % 2) return $0;
			return ($1 || "") + $2;
		});
		if (!isIdentifier && options.wrap) return quote + output + quote;
		return output;
	};
	cssesc.options = {
		"escapeEverything": false,
		"isIdentifier": false,
		"quotes": "single",
		"wrap": false
	};
	cssesc.version = "3.0.0";
	module.exports = cssesc;
}));
var require_className = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _cssesc = _interopRequireDefault(require_cssesc());
	var _util = require_util();
	var _node = _interopRequireDefault(require_node$1());
	var _types = require_types();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	function _createClass(Constructor, protoProps, staticProps) {
		if (protoProps) _defineProperties(Constructor.prototype, protoProps);
		if (staticProps) _defineProperties(Constructor, staticProps);
		Object.defineProperty(Constructor, "prototype", { writable: false });
		return Constructor;
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	exports["default"] = /* @__PURE__ */ function(_Node) {
		_inheritsLoose(ClassName, _Node);
		function ClassName(opts) {
			var _this = _Node.call(this, opts) || this;
			_this.type = _types.CLASS;
			_this._constructed = true;
			return _this;
		}
		var _proto = ClassName.prototype;
		_proto.valueToString = function valueToString() {
			return "." + _Node.prototype.valueToString.call(this);
		};
		_createClass(ClassName, [{
			key: "value",
			get: function get() {
				return this._value;
			},
			set: function set(v) {
				if (this._constructed) {
					var escaped = (0, _cssesc["default"])(v, { isIdentifier: true });
					if (escaped !== v) {
						(0, _util.ensureObject)(this, "raws");
						this.raws.value = escaped;
					} else if (this.raws) delete this.raws.value;
				}
				this._value = v;
			}
		}]);
		return ClassName;
	}(_node["default"]);
	module.exports = exports.default;
}));
var require_comment = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _node = _interopRequireDefault(require_node$1());
	var _types = require_types();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	exports["default"] = /* @__PURE__ */ function(_Node) {
		_inheritsLoose(Comment, _Node);
		function Comment(opts) {
			var _this = _Node.call(this, opts) || this;
			_this.type = _types.COMMENT;
			return _this;
		}
		return Comment;
	}(_node["default"]);
	module.exports = exports.default;
}));
var require_id = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _node = _interopRequireDefault(require_node$1());
	var _types = require_types();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	exports["default"] = /* @__PURE__ */ function(_Node) {
		_inheritsLoose(ID, _Node);
		function ID(opts) {
			var _this = _Node.call(this, opts) || this;
			_this.type = _types.ID;
			return _this;
		}
		var _proto = ID.prototype;
		_proto.valueToString = function valueToString() {
			return "#" + _Node.prototype.valueToString.call(this);
		};
		return ID;
	}(_node["default"]);
	module.exports = exports.default;
}));
var require_namespace = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _cssesc = _interopRequireDefault(require_cssesc());
	var _util = require_util();
	var _node = _interopRequireDefault(require_node$1());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	function _createClass(Constructor, protoProps, staticProps) {
		if (protoProps) _defineProperties(Constructor.prototype, protoProps);
		if (staticProps) _defineProperties(Constructor, staticProps);
		Object.defineProperty(Constructor, "prototype", { writable: false });
		return Constructor;
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	exports["default"] = /* @__PURE__ */ function(_Node) {
		_inheritsLoose(Namespace, _Node);
		function Namespace() {
			return _Node.apply(this, arguments) || this;
		}
		var _proto = Namespace.prototype;
		_proto.qualifiedName = function qualifiedName(value) {
			if (this.namespace) return this.namespaceString + "|" + value;
			else return value;
		};
		_proto.valueToString = function valueToString() {
			return this.qualifiedName(_Node.prototype.valueToString.call(this));
		};
		_createClass(Namespace, [
			{
				key: "namespace",
				get: function get() {
					return this._namespace;
				},
				set: function set(namespace) {
					if (namespace === true || namespace === "*" || namespace === "&") {
						this._namespace = namespace;
						if (this.raws) delete this.raws.namespace;
						return;
					}
					var escaped = (0, _cssesc["default"])(namespace, { isIdentifier: true });
					this._namespace = namespace;
					if (escaped !== namespace) {
						(0, _util.ensureObject)(this, "raws");
						this.raws.namespace = escaped;
					} else if (this.raws) delete this.raws.namespace;
				}
			},
			{
				key: "ns",
				get: function get() {
					return this._namespace;
				},
				set: function set(namespace) {
					this.namespace = namespace;
				}
			},
			{
				key: "namespaceString",
				get: function get() {
					if (this.namespace) {
						var ns = this.stringifyProperty("namespace");
						if (ns === true) return "";
						else return ns;
					} else return "";
				}
			}
		]);
		return Namespace;
	}(_node["default"]);
	module.exports = exports.default;
}));
var require_tag = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _namespace = _interopRequireDefault(require_namespace());
	var _types = require_types();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	exports["default"] = /* @__PURE__ */ function(_Namespace) {
		_inheritsLoose(Tag, _Namespace);
		function Tag(opts) {
			var _this = _Namespace.call(this, opts) || this;
			_this.type = _types.TAG;
			return _this;
		}
		return Tag;
	}(_namespace["default"]);
	module.exports = exports.default;
}));
var require_string = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _node = _interopRequireDefault(require_node$1());
	var _types = require_types();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	exports["default"] = /* @__PURE__ */ function(_Node) {
		_inheritsLoose(String, _Node);
		function String(opts) {
			var _this = _Node.call(this, opts) || this;
			_this.type = _types.STRING;
			return _this;
		}
		return String;
	}(_node["default"]);
	module.exports = exports.default;
}));
var require_pseudo = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _container = _interopRequireDefault(require_container());
	var _types = require_types();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	exports["default"] = /* @__PURE__ */ function(_Container) {
		_inheritsLoose(Pseudo, _Container);
		function Pseudo(opts) {
			var _this = _Container.call(this, opts) || this;
			_this.type = _types.PSEUDO;
			return _this;
		}
		var _proto = Pseudo.prototype;
		_proto.toString = function toString() {
			var params = this.length ? "(" + this.map(String).join(",") + ")" : "";
			return [
				this.rawSpaceBefore,
				this.stringifyProperty("value"),
				params,
				this.rawSpaceAfter
			].join("");
		};
		return Pseudo;
	}(_container["default"]);
	module.exports = exports.default;
}));
var require_node = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = __require("util").deprecate;
}));
var require_attribute = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	exports.unescapeValue = unescapeValue;
	var _cssesc = _interopRequireDefault(require_cssesc());
	var _unesc = _interopRequireDefault(require_unesc());
	var _namespace = _interopRequireDefault(require_namespace());
	var _types = require_types();
	var _CSSESC_QUOTE_OPTIONS;
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	function _createClass(Constructor, protoProps, staticProps) {
		if (protoProps) _defineProperties(Constructor.prototype, protoProps);
		if (staticProps) _defineProperties(Constructor, staticProps);
		Object.defineProperty(Constructor, "prototype", { writable: false });
		return Constructor;
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	var deprecate = require_node();
	var WRAPPED_IN_QUOTES = /^('|")([^]*)\1$/;
	var warnOfDeprecatedValueAssignment = deprecate(function() {}, "Assigning an attribute a value containing characters that might need to be escaped is deprecated. Call attribute.setValue() instead.");
	var warnOfDeprecatedQuotedAssignment = deprecate(function() {}, "Assigning attr.quoted is deprecated and has no effect. Assign to attr.quoteMark instead.");
	var warnOfDeprecatedConstructor = deprecate(function() {}, "Constructing an Attribute selector with a value without specifying quoteMark is deprecated. Note: The value should be unescaped now.");
	function unescapeValue(value) {
		var deprecatedUsage = false;
		var quoteMark = null;
		var unescaped = value;
		var m = unescaped.match(WRAPPED_IN_QUOTES);
		if (m) {
			quoteMark = m[1];
			unescaped = m[2];
		}
		unescaped = (0, _unesc["default"])(unescaped);
		if (unescaped !== value) deprecatedUsage = true;
		return {
			deprecatedUsage,
			unescaped,
			quoteMark
		};
	}
	function handleDeprecatedContructorOpts(opts) {
		if (opts.quoteMark !== void 0) return opts;
		if (opts.value === void 0) return opts;
		warnOfDeprecatedConstructor();
		var _unescapeValue = unescapeValue(opts.value), quoteMark = _unescapeValue.quoteMark, unescaped = _unescapeValue.unescaped;
		if (!opts.raws) opts.raws = {};
		if (opts.raws.value === void 0) opts.raws.value = opts.value;
		opts.value = unescaped;
		opts.quoteMark = quoteMark;
		return opts;
	}
	var Attribute = /* @__PURE__ */ function(_Namespace) {
		_inheritsLoose(Attribute, _Namespace);
		function Attribute(opts) {
			var _this;
			if (opts === void 0) opts = {};
			_this = _Namespace.call(this, handleDeprecatedContructorOpts(opts)) || this;
			_this.type = _types.ATTRIBUTE;
			_this.raws = _this.raws || {};
			Object.defineProperty(_this.raws, "unquoted", {
				get: deprecate(function() {
					return _this.value;
				}, "attr.raws.unquoted is deprecated. Call attr.value instead."),
				set: deprecate(function() {
					return _this.value;
				}, "Setting attr.raws.unquoted is deprecated and has no effect. attr.value is unescaped by default now.")
			});
			_this._constructed = true;
			return _this;
		}
		var _proto = Attribute.prototype;
		_proto.getQuotedValue = function getQuotedValue(options) {
			if (options === void 0) options = {};
			var cssescopts = CSSESC_QUOTE_OPTIONS[this._determineQuoteMark(options)];
			return (0, _cssesc["default"])(this._value, cssescopts);
		};
		_proto._determineQuoteMark = function _determineQuoteMark(options) {
			return options.smart ? this.smartQuoteMark(options) : this.preferredQuoteMark(options);
		};
		_proto.setValue = function setValue(value, options) {
			if (options === void 0) options = {};
			this._value = value;
			this._quoteMark = this._determineQuoteMark(options);
			this._syncRawValue();
		};
		_proto.smartQuoteMark = function smartQuoteMark(options) {
			var v = this.value;
			var numSingleQuotes = v.replace(/[^']/g, "").length;
			var numDoubleQuotes = v.replace(/[^"]/g, "").length;
			if (numSingleQuotes + numDoubleQuotes === 0) {
				var escaped = (0, _cssesc["default"])(v, { isIdentifier: true });
				if (escaped === v) return Attribute.NO_QUOTE;
				else {
					var pref = this.preferredQuoteMark(options);
					if (pref === Attribute.NO_QUOTE) {
						var quote = this.quoteMark || options.quoteMark || Attribute.DOUBLE_QUOTE;
						var opts = CSSESC_QUOTE_OPTIONS[quote];
						if ((0, _cssesc["default"])(v, opts).length < escaped.length) return quote;
					}
					return pref;
				}
			} else if (numDoubleQuotes === numSingleQuotes) return this.preferredQuoteMark(options);
			else if (numDoubleQuotes < numSingleQuotes) return Attribute.DOUBLE_QUOTE;
			else return Attribute.SINGLE_QUOTE;
		};
		_proto.preferredQuoteMark = function preferredQuoteMark(options) {
			var quoteMark = options.preferCurrentQuoteMark ? this.quoteMark : options.quoteMark;
			if (quoteMark === void 0) quoteMark = options.preferCurrentQuoteMark ? options.quoteMark : this.quoteMark;
			if (quoteMark === void 0) quoteMark = Attribute.DOUBLE_QUOTE;
			return quoteMark;
		};
		_proto._syncRawValue = function _syncRawValue() {
			var rawValue = (0, _cssesc["default"])(this._value, CSSESC_QUOTE_OPTIONS[this.quoteMark]);
			if (rawValue === this._value) {
				if (this.raws) delete this.raws.value;
			} else this.raws.value = rawValue;
		};
		_proto._handleEscapes = function _handleEscapes(prop, value) {
			if (this._constructed) {
				var escaped = (0, _cssesc["default"])(value, { isIdentifier: true });
				if (escaped !== value) this.raws[prop] = escaped;
				else delete this.raws[prop];
			}
		};
		_proto._spacesFor = function _spacesFor(name) {
			var attrSpaces = {
				before: "",
				after: ""
			};
			var spaces = this.spaces[name] || {};
			var rawSpaces = this.raws.spaces && this.raws.spaces[name] || {};
			return Object.assign(attrSpaces, spaces, rawSpaces);
		};
		_proto._stringFor = function _stringFor(name, spaceName, concat) {
			if (spaceName === void 0) spaceName = name;
			if (concat === void 0) concat = defaultAttrConcat;
			var attrSpaces = this._spacesFor(spaceName);
			return concat(this.stringifyProperty(name), attrSpaces);
		};
		_proto.offsetOf = function offsetOf(name) {
			var count = 1;
			var attributeSpaces = this._spacesFor("attribute");
			count += attributeSpaces.before.length;
			if (name === "namespace" || name === "ns") return this.namespace ? count : -1;
			if (name === "attributeNS") return count;
			count += this.namespaceString.length;
			if (this.namespace) count += 1;
			if (name === "attribute") return count;
			count += this.stringifyProperty("attribute").length;
			count += attributeSpaces.after.length;
			var operatorSpaces = this._spacesFor("operator");
			count += operatorSpaces.before.length;
			var operator = this.stringifyProperty("operator");
			if (name === "operator") return operator ? count : -1;
			count += operator.length;
			count += operatorSpaces.after.length;
			var valueSpaces = this._spacesFor("value");
			count += valueSpaces.before.length;
			var value = this.stringifyProperty("value");
			if (name === "value") return value ? count : -1;
			count += value.length;
			count += valueSpaces.after.length;
			var insensitiveSpaces = this._spacesFor("insensitive");
			count += insensitiveSpaces.before.length;
			if (name === "insensitive") return this.insensitive ? count : -1;
			return -1;
		};
		_proto.toString = function toString() {
			var _this2 = this;
			var selector = [this.rawSpaceBefore, "["];
			selector.push(this._stringFor("qualifiedAttribute", "attribute"));
			if (this.operator && (this.value || this.value === "")) {
				selector.push(this._stringFor("operator"));
				selector.push(this._stringFor("value"));
				selector.push(this._stringFor("insensitiveFlag", "insensitive", function(attrValue, attrSpaces) {
					if (attrValue.length > 0 && !_this2.quoted && attrSpaces.before.length === 0 && !(_this2.spaces.value && _this2.spaces.value.after)) attrSpaces.before = " ";
					return defaultAttrConcat(attrValue, attrSpaces);
				}));
			}
			selector.push("]");
			selector.push(this.rawSpaceAfter);
			return selector.join("");
		};
		_createClass(Attribute, [
			{
				key: "quoted",
				get: function get() {
					var qm = this.quoteMark;
					return qm === "'" || qm === "\"";
				},
				set: function set(value) {
					warnOfDeprecatedQuotedAssignment();
				}
			},
			{
				key: "quoteMark",
				get: function get() {
					return this._quoteMark;
				},
				set: function set(quoteMark) {
					if (!this._constructed) {
						this._quoteMark = quoteMark;
						return;
					}
					if (this._quoteMark !== quoteMark) {
						this._quoteMark = quoteMark;
						this._syncRawValue();
					}
				}
			},
			{
				key: "qualifiedAttribute",
				get: function get() {
					return this.qualifiedName(this.raws.attribute || this.attribute);
				}
			},
			{
				key: "insensitiveFlag",
				get: function get() {
					return this.insensitive ? "i" : "";
				}
			},
			{
				key: "value",
				get: function get() {
					return this._value;
				},
				set: function set(v) {
					if (this._constructed) {
						var _unescapeValue2 = unescapeValue(v), deprecatedUsage = _unescapeValue2.deprecatedUsage, unescaped = _unescapeValue2.unescaped, quoteMark = _unescapeValue2.quoteMark;
						if (deprecatedUsage) warnOfDeprecatedValueAssignment();
						if (unescaped === this._value && quoteMark === this._quoteMark) return;
						this._value = unescaped;
						this._quoteMark = quoteMark;
						this._syncRawValue();
					} else this._value = v;
				}
			},
			{
				key: "insensitive",
				get: function get() {
					return this._insensitive;
				},
				set: function set(insensitive) {
					if (!insensitive) {
						this._insensitive = false;
						if (this.raws && (this.raws.insensitiveFlag === "I" || this.raws.insensitiveFlag === "i")) this.raws.insensitiveFlag = void 0;
					}
					this._insensitive = insensitive;
				}
			},
			{
				key: "attribute",
				get: function get() {
					return this._attribute;
				},
				set: function set(name) {
					this._handleEscapes("attribute", name);
					this._attribute = name;
				}
			}
		]);
		return Attribute;
	}(_namespace["default"]);
	exports["default"] = Attribute;
	Attribute.NO_QUOTE = null;
	Attribute.SINGLE_QUOTE = "'";
	Attribute.DOUBLE_QUOTE = "\"";
	var CSSESC_QUOTE_OPTIONS = (_CSSESC_QUOTE_OPTIONS = {
		"'": {
			quotes: "single",
			wrap: true
		},
		"\"": {
			quotes: "double",
			wrap: true
		}
	}, _CSSESC_QUOTE_OPTIONS[null] = { isIdentifier: true }, _CSSESC_QUOTE_OPTIONS);
	function defaultAttrConcat(attrValue, attrSpaces) {
		return "" + attrSpaces.before + attrValue + attrSpaces.after;
	}
}));
var require_universal = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _namespace = _interopRequireDefault(require_namespace());
	var _types = require_types();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	exports["default"] = /* @__PURE__ */ function(_Namespace) {
		_inheritsLoose(Universal, _Namespace);
		function Universal(opts) {
			var _this = _Namespace.call(this, opts) || this;
			_this.type = _types.UNIVERSAL;
			_this.value = "*";
			return _this;
		}
		return Universal;
	}(_namespace["default"]);
	module.exports = exports.default;
}));
var require_combinator = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _node = _interopRequireDefault(require_node$1());
	var _types = require_types();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	exports["default"] = /* @__PURE__ */ function(_Node) {
		_inheritsLoose(Combinator, _Node);
		function Combinator(opts) {
			var _this = _Node.call(this, opts) || this;
			_this.type = _types.COMBINATOR;
			return _this;
		}
		return Combinator;
	}(_node["default"]);
	module.exports = exports.default;
}));
var require_nesting = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _node = _interopRequireDefault(require_node$1());
	var _types = require_types();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		_setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
		return _setPrototypeOf(o, p);
	}
	exports["default"] = /* @__PURE__ */ function(_Node) {
		_inheritsLoose(Nesting, _Node);
		function Nesting(opts) {
			var _this = _Node.call(this, opts) || this;
			_this.type = _types.NESTING;
			_this.value = "&";
			return _this;
		}
		return Nesting;
	}(_node["default"]);
	module.exports = exports.default;
}));
var require_sortAscending = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = sortAscending;
	function sortAscending(list) {
		return list.sort(function(a, b) {
			return a - b;
		});
	}
	module.exports = exports.default;
}));
var require_tokenTypes = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	exports.word = exports.tilde = exports.tab = exports.str = exports.space = exports.slash = exports.singleQuote = exports.semicolon = exports.plus = exports.pipe = exports.openSquare = exports.openParenthesis = exports.newline = exports.greaterThan = exports.feed = exports.equals = exports.doubleQuote = exports.dollar = exports.cr = exports.comment = exports.comma = exports.combinator = exports.colon = exports.closeSquare = exports.closeParenthesis = exports.caret = exports.bang = exports.backslash = exports.at = exports.asterisk = exports.ampersand = void 0;
	exports.ampersand = 38;
	exports.asterisk = 42;
	exports.at = 64;
	exports.comma = 44;
	exports.colon = 58;
	exports.semicolon = 59;
	exports.openParenthesis = 40;
	exports.closeParenthesis = 41;
	exports.openSquare = 91;
	exports.closeSquare = 93;
	exports.dollar = 36;
	exports.tilde = 126;
	exports.caret = 94;
	exports.plus = 43;
	exports.equals = 61;
	exports.pipe = 124;
	exports.greaterThan = 62;
	exports.space = 32;
	var singleQuote = 39;
	exports.singleQuote = singleQuote;
	exports.doubleQuote = 34;
	exports.slash = 47;
	exports.bang = 33;
	exports.backslash = 92;
	exports.cr = 13;
	exports.feed = 12;
	exports.newline = 10;
	exports.tab = 9;
	exports.str = singleQuote;
	exports.comment = -1;
	exports.word = -2;
	exports.combinator = -3;
}));
var require_tokenize = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	exports.FIELDS = void 0;
	exports["default"] = tokenize;
	var t = _interopRequireWildcard(require_tokenTypes());
	var _unescapable, _wordDelimiters;
	function _getRequireWildcardCache(nodeInterop) {
		if (typeof WeakMap !== "function") return null;
		var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
		var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
		return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
			return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
		})(nodeInterop);
	}
	function _interopRequireWildcard(obj, nodeInterop) {
		if (!nodeInterop && obj && obj.__esModule) return obj;
		if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { "default": obj };
		var cache = _getRequireWildcardCache(nodeInterop);
		if (cache && cache.has(obj)) return cache.get(obj);
		var newObj = {};
		var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
		for (var key in obj) if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
			var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
			if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
			else newObj[key] = obj[key];
		}
		newObj["default"] = obj;
		if (cache) cache.set(obj, newObj);
		return newObj;
	}
	var unescapable = (_unescapable = {}, _unescapable[t.tab] = true, _unescapable[t.newline] = true, _unescapable[t.cr] = true, _unescapable[t.feed] = true, _unescapable);
	var wordDelimiters = (_wordDelimiters = {}, _wordDelimiters[t.space] = true, _wordDelimiters[t.tab] = true, _wordDelimiters[t.newline] = true, _wordDelimiters[t.cr] = true, _wordDelimiters[t.feed] = true, _wordDelimiters[t.ampersand] = true, _wordDelimiters[t.asterisk] = true, _wordDelimiters[t.bang] = true, _wordDelimiters[t.comma] = true, _wordDelimiters[t.colon] = true, _wordDelimiters[t.semicolon] = true, _wordDelimiters[t.openParenthesis] = true, _wordDelimiters[t.closeParenthesis] = true, _wordDelimiters[t.openSquare] = true, _wordDelimiters[t.closeSquare] = true, _wordDelimiters[t.singleQuote] = true, _wordDelimiters[t.doubleQuote] = true, _wordDelimiters[t.plus] = true, _wordDelimiters[t.pipe] = true, _wordDelimiters[t.tilde] = true, _wordDelimiters[t.greaterThan] = true, _wordDelimiters[t.equals] = true, _wordDelimiters[t.dollar] = true, _wordDelimiters[t.caret] = true, _wordDelimiters[t.slash] = true, _wordDelimiters);
	var hex = {};
	var hexChars = "0123456789abcdefABCDEF";
	for (var i = 0; i < hexChars.length; i++) hex[hexChars.charCodeAt(i)] = true;
	function consumeWord(css, start) {
		var next = start;
		var code;
		do {
			code = css.charCodeAt(next);
			if (wordDelimiters[code]) return next - 1;
			else if (code === t.backslash) next = consumeEscape(css, next) + 1;
			else next++;
		} while (next < css.length);
		return next - 1;
	}
	function consumeEscape(css, start) {
		var next = start;
		var code = css.charCodeAt(next + 1);
		if (unescapable[code]) {} else if (hex[code]) {
			var hexDigits = 0;
			do {
				next++;
				hexDigits++;
				code = css.charCodeAt(next + 1);
			} while (hex[code] && hexDigits < 6);
			if (hexDigits < 6 && code === t.space) next++;
		} else next++;
		return next;
	}
	exports.FIELDS = {
		TYPE: 0,
		START_LINE: 1,
		START_COL: 2,
		END_LINE: 3,
		END_COL: 4,
		START_POS: 5,
		END_POS: 6
	};
	function tokenize(input) {
		var tokens = [];
		var css = input.css.valueOf();
		var length = css.length;
		var offset = -1;
		var line = 1;
		var start = 0;
		var end = 0;
		var code, content, endColumn, endLine, escaped, escapePos, last, lines, next, nextLine, nextOffset, quote, tokenType;
		function unclosed(what, fix) {
			if (input.safe) {
				css += fix;
				next = css.length - 1;
			} else throw input.error("Unclosed " + what, line, start - offset, start);
		}
		while (start < length) {
			code = css.charCodeAt(start);
			if (code === t.newline) {
				offset = start;
				line += 1;
			}
			switch (code) {
				case t.space:
				case t.tab:
				case t.newline:
				case t.cr:
				case t.feed:
					next = start;
					do {
						next += 1;
						code = css.charCodeAt(next);
						if (code === t.newline) {
							offset = next;
							line += 1;
						}
					} while (code === t.space || code === t.newline || code === t.tab || code === t.cr || code === t.feed);
					tokenType = t.space;
					endLine = line;
					endColumn = next - offset - 1;
					end = next;
					break;
				case t.plus:
				case t.greaterThan:
				case t.tilde:
				case t.pipe:
					next = start;
					do {
						next += 1;
						code = css.charCodeAt(next);
					} while (code === t.plus || code === t.greaterThan || code === t.tilde || code === t.pipe);
					tokenType = t.combinator;
					endLine = line;
					endColumn = start - offset;
					end = next;
					break;
				case t.asterisk:
				case t.ampersand:
				case t.bang:
				case t.comma:
				case t.equals:
				case t.dollar:
				case t.caret:
				case t.openSquare:
				case t.closeSquare:
				case t.colon:
				case t.semicolon:
				case t.openParenthesis:
				case t.closeParenthesis:
					next = start;
					tokenType = code;
					endLine = line;
					endColumn = start - offset;
					end = next + 1;
					break;
				case t.singleQuote:
				case t.doubleQuote:
					quote = code === t.singleQuote ? "'" : "\"";
					next = start;
					do {
						escaped = false;
						next = css.indexOf(quote, next + 1);
						if (next === -1) unclosed("quote", quote);
						escapePos = next;
						while (css.charCodeAt(escapePos - 1) === t.backslash) {
							escapePos -= 1;
							escaped = !escaped;
						}
					} while (escaped);
					tokenType = t.str;
					endLine = line;
					endColumn = start - offset;
					end = next + 1;
					break;
				default:
					if (code === t.slash && css.charCodeAt(start + 1) === t.asterisk) {
						next = css.indexOf("*/", start + 2) + 1;
						if (next === 0) unclosed("comment", "*/");
						content = css.slice(start, next + 1);
						lines = content.split("\n");
						last = lines.length - 1;
						if (last > 0) {
							nextLine = line + last;
							nextOffset = next - lines[last].length;
						} else {
							nextLine = line;
							nextOffset = offset;
						}
						tokenType = t.comment;
						line = nextLine;
						endLine = nextLine;
						endColumn = next - nextOffset;
					} else if (code === t.slash) {
						next = start;
						tokenType = code;
						endLine = line;
						endColumn = start - offset;
						end = next + 1;
					} else {
						next = consumeWord(css, start);
						tokenType = t.word;
						endLine = line;
						endColumn = next - offset;
					}
					end = next + 1;
					break;
			}
			tokens.push([
				tokenType,
				line,
				start - offset,
				endLine,
				endColumn,
				start,
				end
			]);
			if (nextOffset) {
				offset = nextOffset;
				nextOffset = null;
			}
			start = end;
		}
		return tokens;
	}
}));
var require_parser$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _root = _interopRequireDefault(require_root());
	var _selector = _interopRequireDefault(require_selector());
	var _className = _interopRequireDefault(require_className());
	var _comment = _interopRequireDefault(require_comment());
	var _id = _interopRequireDefault(require_id());
	var _tag = _interopRequireDefault(require_tag());
	var _string = _interopRequireDefault(require_string());
	var _pseudo = _interopRequireDefault(require_pseudo());
	var _attribute = _interopRequireWildcard(require_attribute());
	var _universal = _interopRequireDefault(require_universal());
	var _combinator = _interopRequireDefault(require_combinator());
	var _nesting = _interopRequireDefault(require_nesting());
	var _sortAscending = _interopRequireDefault(require_sortAscending());
	var _tokenize = _interopRequireWildcard(require_tokenize());
	var tokens = _interopRequireWildcard(require_tokenTypes());
	var types = _interopRequireWildcard(require_types());
	var _util = require_util();
	var _WHITESPACE_TOKENS, _Object$assign;
	function _getRequireWildcardCache(nodeInterop) {
		if (typeof WeakMap !== "function") return null;
		var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
		var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
		return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
			return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
		})(nodeInterop);
	}
	function _interopRequireWildcard(obj, nodeInterop) {
		if (!nodeInterop && obj && obj.__esModule) return obj;
		if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { "default": obj };
		var cache = _getRequireWildcardCache(nodeInterop);
		if (cache && cache.has(obj)) return cache.get(obj);
		var newObj = {};
		var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
		for (var key in obj) if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
			var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
			if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
			else newObj[key] = obj[key];
		}
		newObj["default"] = obj;
		if (cache) cache.set(obj, newObj);
		return newObj;
	}
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	function _defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	function _createClass(Constructor, protoProps, staticProps) {
		if (protoProps) _defineProperties(Constructor.prototype, protoProps);
		if (staticProps) _defineProperties(Constructor, staticProps);
		Object.defineProperty(Constructor, "prototype", { writable: false });
		return Constructor;
	}
	var WHITESPACE_TOKENS = (_WHITESPACE_TOKENS = {}, _WHITESPACE_TOKENS[tokens.space] = true, _WHITESPACE_TOKENS[tokens.cr] = true, _WHITESPACE_TOKENS[tokens.feed] = true, _WHITESPACE_TOKENS[tokens.newline] = true, _WHITESPACE_TOKENS[tokens.tab] = true, _WHITESPACE_TOKENS);
	var WHITESPACE_EQUIV_TOKENS = Object.assign({}, WHITESPACE_TOKENS, (_Object$assign = {}, _Object$assign[tokens.comment] = true, _Object$assign));
	function tokenStart(token) {
		return {
			line: token[_tokenize.FIELDS.START_LINE],
			column: token[_tokenize.FIELDS.START_COL]
		};
	}
	function tokenEnd(token) {
		return {
			line: token[_tokenize.FIELDS.END_LINE],
			column: token[_tokenize.FIELDS.END_COL]
		};
	}
	function getSource(startLine, startColumn, endLine, endColumn) {
		return {
			start: {
				line: startLine,
				column: startColumn
			},
			end: {
				line: endLine,
				column: endColumn
			}
		};
	}
	function getTokenSource(token) {
		return getSource(token[_tokenize.FIELDS.START_LINE], token[_tokenize.FIELDS.START_COL], token[_tokenize.FIELDS.END_LINE], token[_tokenize.FIELDS.END_COL]);
	}
	function getTokenSourceSpan(startToken, endToken) {
		if (!startToken) return;
		return getSource(startToken[_tokenize.FIELDS.START_LINE], startToken[_tokenize.FIELDS.START_COL], endToken[_tokenize.FIELDS.END_LINE], endToken[_tokenize.FIELDS.END_COL]);
	}
	function unescapeProp(node, prop) {
		var value = node[prop];
		if (typeof value !== "string") return;
		if (value.indexOf("\\") !== -1) {
			(0, _util.ensureObject)(node, "raws");
			node[prop] = (0, _util.unesc)(value);
			if (node.raws[prop] === void 0) node.raws[prop] = value;
		}
		return node;
	}
	function indexesOf(array, item) {
		var i = -1;
		var indexes = [];
		while ((i = array.indexOf(item, i + 1)) !== -1) indexes.push(i);
		return indexes;
	}
	function uniqs() {
		var list = Array.prototype.concat.apply([], arguments);
		return list.filter(function(item, i) {
			return i === list.indexOf(item);
		});
	}
	exports["default"] = /* @__PURE__ */ function() {
		function Parser(rule, options) {
			if (options === void 0) options = {};
			this.rule = rule;
			this.options = Object.assign({
				lossy: false,
				safe: false
			}, options);
			this.position = 0;
			this.css = typeof this.rule === "string" ? this.rule : this.rule.selector;
			this.tokens = (0, _tokenize["default"])({
				css: this.css,
				error: this._errorGenerator(),
				safe: this.options.safe
			});
			var rootSource = getTokenSourceSpan(this.tokens[0], this.tokens[this.tokens.length - 1]);
			this.root = new _root["default"]({ source: rootSource });
			this.root.errorGenerator = this._errorGenerator();
			var selector = new _selector["default"]({
				source: { start: {
					line: 1,
					column: 1
				} },
				sourceIndex: 0
			});
			this.root.append(selector);
			this.current = selector;
			this.loop();
		}
		var _proto = Parser.prototype;
		_proto._errorGenerator = function _errorGenerator() {
			var _this = this;
			return function(message, errorOptions) {
				if (typeof _this.rule === "string") return new Error(message);
				return _this.rule.error(message, errorOptions);
			};
		};
		_proto.attribute = function attribute() {
			var attr = [];
			var startingToken = this.currToken;
			this.position++;
			while (this.position < this.tokens.length && this.currToken[_tokenize.FIELDS.TYPE] !== tokens.closeSquare) {
				attr.push(this.currToken);
				this.position++;
			}
			if (this.currToken[_tokenize.FIELDS.TYPE] !== tokens.closeSquare) return this.expected("closing square bracket", this.currToken[_tokenize.FIELDS.START_POS]);
			var len = attr.length;
			var node = {
				source: getSource(startingToken[1], startingToken[2], this.currToken[3], this.currToken[4]),
				sourceIndex: startingToken[_tokenize.FIELDS.START_POS]
			};
			if (len === 1 && !~[tokens.word].indexOf(attr[0][_tokenize.FIELDS.TYPE])) return this.expected("attribute", attr[0][_tokenize.FIELDS.START_POS]);
			var pos = 0;
			var spaceBefore = "";
			var commentBefore = "";
			var lastAdded = null;
			var spaceAfterMeaningfulToken = false;
			while (pos < len) {
				var token = attr[pos];
				var content = this.content(token);
				var next = attr[pos + 1];
				switch (token[_tokenize.FIELDS.TYPE]) {
					case tokens.space:
						spaceAfterMeaningfulToken = true;
						if (this.options.lossy) break;
						if (lastAdded) {
							(0, _util.ensureObject)(node, "spaces", lastAdded);
							var prevContent = node.spaces[lastAdded].after || "";
							node.spaces[lastAdded].after = prevContent + content;
							var existingComment = (0, _util.getProp)(node, "raws", "spaces", lastAdded, "after") || null;
							if (existingComment) node.raws.spaces[lastAdded].after = existingComment + content;
						} else {
							spaceBefore = spaceBefore + content;
							commentBefore = commentBefore + content;
						}
						break;
					case tokens.asterisk:
						if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
							node.operator = content;
							lastAdded = "operator";
						} else if ((!node.namespace || lastAdded === "namespace" && !spaceAfterMeaningfulToken) && next) {
							if (spaceBefore) {
								(0, _util.ensureObject)(node, "spaces", "attribute");
								node.spaces.attribute.before = spaceBefore;
								spaceBefore = "";
							}
							if (commentBefore) {
								(0, _util.ensureObject)(node, "raws", "spaces", "attribute");
								node.raws.spaces.attribute.before = spaceBefore;
								commentBefore = "";
							}
							node.namespace = (node.namespace || "") + content;
							if ((0, _util.getProp)(node, "raws", "namespace") || null) node.raws.namespace += content;
							lastAdded = "namespace";
						}
						spaceAfterMeaningfulToken = false;
						break;
					case tokens.dollar: if (lastAdded === "value") {
						var oldRawValue = (0, _util.getProp)(node, "raws", "value");
						node.value += "$";
						if (oldRawValue) node.raws.value = oldRawValue + "$";
						break;
					}
					case tokens.caret:
						if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
							node.operator = content;
							lastAdded = "operator";
						}
						spaceAfterMeaningfulToken = false;
						break;
					case tokens.combinator:
						if (content === "~" && next[_tokenize.FIELDS.TYPE] === tokens.equals) {
							node.operator = content;
							lastAdded = "operator";
						}
						if (content !== "|") {
							spaceAfterMeaningfulToken = false;
							break;
						}
						if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
							node.operator = content;
							lastAdded = "operator";
						} else if (!node.namespace && !node.attribute) node.namespace = true;
						spaceAfterMeaningfulToken = false;
						break;
					case tokens.word:
						if (next && this.content(next) === "|" && attr[pos + 2] && attr[pos + 2][_tokenize.FIELDS.TYPE] !== tokens.equals && !node.operator && !node.namespace) {
							node.namespace = content;
							lastAdded = "namespace";
						} else if (!node.attribute || lastAdded === "attribute" && !spaceAfterMeaningfulToken) {
							if (spaceBefore) {
								(0, _util.ensureObject)(node, "spaces", "attribute");
								node.spaces.attribute.before = spaceBefore;
								spaceBefore = "";
							}
							if (commentBefore) {
								(0, _util.ensureObject)(node, "raws", "spaces", "attribute");
								node.raws.spaces.attribute.before = commentBefore;
								commentBefore = "";
							}
							node.attribute = (node.attribute || "") + content;
							if ((0, _util.getProp)(node, "raws", "attribute") || null) node.raws.attribute += content;
							lastAdded = "attribute";
						} else if (!node.value && node.value !== "" || lastAdded === "value" && !(spaceAfterMeaningfulToken || node.quoteMark)) {
							var _unescaped = (0, _util.unesc)(content);
							var _oldRawValue = (0, _util.getProp)(node, "raws", "value") || "";
							var oldValue = node.value || "";
							node.value = oldValue + _unescaped;
							node.quoteMark = null;
							if (_unescaped !== content || _oldRawValue) {
								(0, _util.ensureObject)(node, "raws");
								node.raws.value = (_oldRawValue || oldValue) + content;
							}
							lastAdded = "value";
						} else {
							var insensitive = content === "i" || content === "I";
							if ((node.value || node.value === "") && (node.quoteMark || spaceAfterMeaningfulToken)) {
								node.insensitive = insensitive;
								if (!insensitive || content === "I") {
									(0, _util.ensureObject)(node, "raws");
									node.raws.insensitiveFlag = content;
								}
								lastAdded = "insensitive";
								if (spaceBefore) {
									(0, _util.ensureObject)(node, "spaces", "insensitive");
									node.spaces.insensitive.before = spaceBefore;
									spaceBefore = "";
								}
								if (commentBefore) {
									(0, _util.ensureObject)(node, "raws", "spaces", "insensitive");
									node.raws.spaces.insensitive.before = commentBefore;
									commentBefore = "";
								}
							} else if (node.value || node.value === "") {
								lastAdded = "value";
								node.value += content;
								if (node.raws.value) node.raws.value += content;
							}
						}
						spaceAfterMeaningfulToken = false;
						break;
					case tokens.str:
						if (!node.attribute || !node.operator) return this.error("Expected an attribute followed by an operator preceding the string.", { index: token[_tokenize.FIELDS.START_POS] });
						var _unescapeValue = (0, _attribute.unescapeValue)(content), unescaped = _unescapeValue.unescaped, quoteMark = _unescapeValue.quoteMark;
						node.value = unescaped;
						node.quoteMark = quoteMark;
						lastAdded = "value";
						(0, _util.ensureObject)(node, "raws");
						node.raws.value = content;
						spaceAfterMeaningfulToken = false;
						break;
					case tokens.equals:
						if (!node.attribute) return this.expected("attribute", token[_tokenize.FIELDS.START_POS], content);
						if (node.value) return this.error("Unexpected \"=\" found; an operator was already defined.", { index: token[_tokenize.FIELDS.START_POS] });
						node.operator = node.operator ? node.operator + content : content;
						lastAdded = "operator";
						spaceAfterMeaningfulToken = false;
						break;
					case tokens.comment:
						if (lastAdded) if (spaceAfterMeaningfulToken || next && next[_tokenize.FIELDS.TYPE] === tokens.space || lastAdded === "insensitive") {
							var lastComment = (0, _util.getProp)(node, "spaces", lastAdded, "after") || "";
							var rawLastComment = (0, _util.getProp)(node, "raws", "spaces", lastAdded, "after") || lastComment;
							(0, _util.ensureObject)(node, "raws", "spaces", lastAdded);
							node.raws.spaces[lastAdded].after = rawLastComment + content;
						} else {
							var lastValue = node[lastAdded] || "";
							var rawLastValue = (0, _util.getProp)(node, "raws", lastAdded) || lastValue;
							(0, _util.ensureObject)(node, "raws");
							node.raws[lastAdded] = rawLastValue + content;
						}
						else commentBefore = commentBefore + content;
						break;
					default: return this.error("Unexpected \"" + content + "\" found.", { index: token[_tokenize.FIELDS.START_POS] });
				}
				pos++;
			}
			unescapeProp(node, "attribute");
			unescapeProp(node, "namespace");
			this.newNode(new _attribute["default"](node));
			this.position++;
		};
		_proto.parseWhitespaceEquivalentTokens = function parseWhitespaceEquivalentTokens(stopPosition) {
			if (stopPosition < 0) stopPosition = this.tokens.length;
			var startPosition = this.position;
			var nodes = [];
			var space = "";
			var lastComment = void 0;
			do
				if (WHITESPACE_TOKENS[this.currToken[_tokenize.FIELDS.TYPE]]) {
					if (!this.options.lossy) space += this.content();
				} else if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.comment) {
					var spaces = {};
					if (space) {
						spaces.before = space;
						space = "";
					}
					lastComment = new _comment["default"]({
						value: this.content(),
						source: getTokenSource(this.currToken),
						sourceIndex: this.currToken[_tokenize.FIELDS.START_POS],
						spaces
					});
					nodes.push(lastComment);
				}
			while (++this.position < stopPosition);
			if (space) {
				if (lastComment) lastComment.spaces.after = space;
				else if (!this.options.lossy) {
					var firstToken = this.tokens[startPosition];
					var lastToken = this.tokens[this.position - 1];
					nodes.push(new _string["default"]({
						value: "",
						source: getSource(firstToken[_tokenize.FIELDS.START_LINE], firstToken[_tokenize.FIELDS.START_COL], lastToken[_tokenize.FIELDS.END_LINE], lastToken[_tokenize.FIELDS.END_COL]),
						sourceIndex: firstToken[_tokenize.FIELDS.START_POS],
						spaces: {
							before: space,
							after: ""
						}
					}));
				}
			}
			return nodes;
		};
		_proto.convertWhitespaceNodesToSpace = function convertWhitespaceNodesToSpace(nodes, requiredSpace) {
			var _this2 = this;
			if (requiredSpace === void 0) requiredSpace = false;
			var space = "";
			var rawSpace = "";
			nodes.forEach(function(n) {
				var spaceBefore = _this2.lossySpace(n.spaces.before, requiredSpace);
				var rawSpaceBefore = _this2.lossySpace(n.rawSpaceBefore, requiredSpace);
				space += spaceBefore + _this2.lossySpace(n.spaces.after, requiredSpace && spaceBefore.length === 0);
				rawSpace += spaceBefore + n.value + _this2.lossySpace(n.rawSpaceAfter, requiredSpace && rawSpaceBefore.length === 0);
			});
			if (rawSpace === space) rawSpace = void 0;
			return {
				space,
				rawSpace
			};
		};
		_proto.isNamedCombinator = function isNamedCombinator(position) {
			if (position === void 0) position = this.position;
			return this.tokens[position + 0] && this.tokens[position + 0][_tokenize.FIELDS.TYPE] === tokens.slash && this.tokens[position + 1] && this.tokens[position + 1][_tokenize.FIELDS.TYPE] === tokens.word && this.tokens[position + 2] && this.tokens[position + 2][_tokenize.FIELDS.TYPE] === tokens.slash;
		};
		_proto.namedCombinator = function namedCombinator() {
			if (this.isNamedCombinator()) {
				var nameRaw = this.content(this.tokens[this.position + 1]);
				var name = (0, _util.unesc)(nameRaw).toLowerCase();
				var raws = {};
				if (name !== nameRaw) raws.value = "/" + nameRaw + "/";
				var node = new _combinator["default"]({
					value: "/" + name + "/",
					source: getSource(this.currToken[_tokenize.FIELDS.START_LINE], this.currToken[_tokenize.FIELDS.START_COL], this.tokens[this.position + 2][_tokenize.FIELDS.END_LINE], this.tokens[this.position + 2][_tokenize.FIELDS.END_COL]),
					sourceIndex: this.currToken[_tokenize.FIELDS.START_POS],
					raws
				});
				this.position = this.position + 3;
				return node;
			} else this.unexpected();
		};
		_proto.combinator = function combinator() {
			var _this3 = this;
			if (this.content() === "|") return this.namespace();
			var nextSigTokenPos = this.locateNextMeaningfulToken(this.position);
			if (nextSigTokenPos < 0 || this.tokens[nextSigTokenPos][_tokenize.FIELDS.TYPE] === tokens.comma || this.tokens[nextSigTokenPos][_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
				var nodes = this.parseWhitespaceEquivalentTokens(nextSigTokenPos);
				if (nodes.length > 0) {
					var last = this.current.last;
					if (last) {
						var _this$convertWhitespa = this.convertWhitespaceNodesToSpace(nodes), space = _this$convertWhitespa.space, rawSpace = _this$convertWhitespa.rawSpace;
						if (rawSpace !== void 0) last.rawSpaceAfter += rawSpace;
						last.spaces.after += space;
					} else nodes.forEach(function(n) {
						return _this3.newNode(n);
					});
				}
				return;
			}
			var firstToken = this.currToken;
			var spaceOrDescendantSelectorNodes = void 0;
			if (nextSigTokenPos > this.position) spaceOrDescendantSelectorNodes = this.parseWhitespaceEquivalentTokens(nextSigTokenPos);
			var node;
			if (this.isNamedCombinator()) node = this.namedCombinator();
			else if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.combinator) {
				node = new _combinator["default"]({
					value: this.content(),
					source: getTokenSource(this.currToken),
					sourceIndex: this.currToken[_tokenize.FIELDS.START_POS]
				});
				this.position++;
			} else if (WHITESPACE_TOKENS[this.currToken[_tokenize.FIELDS.TYPE]]) {} else if (!spaceOrDescendantSelectorNodes) this.unexpected();
			if (node) {
				if (spaceOrDescendantSelectorNodes) {
					var _this$convertWhitespa2 = this.convertWhitespaceNodesToSpace(spaceOrDescendantSelectorNodes), _space = _this$convertWhitespa2.space, _rawSpace = _this$convertWhitespa2.rawSpace;
					node.spaces.before = _space;
					node.rawSpaceBefore = _rawSpace;
				}
			} else {
				var _this$convertWhitespa3 = this.convertWhitespaceNodesToSpace(spaceOrDescendantSelectorNodes, true), _space2 = _this$convertWhitespa3.space, _rawSpace2 = _this$convertWhitespa3.rawSpace;
				if (!_rawSpace2) _rawSpace2 = _space2;
				var spaces = {};
				var raws = { spaces: {} };
				if (_space2.endsWith(" ") && _rawSpace2.endsWith(" ")) {
					spaces.before = _space2.slice(0, _space2.length - 1);
					raws.spaces.before = _rawSpace2.slice(0, _rawSpace2.length - 1);
				} else if (_space2.startsWith(" ") && _rawSpace2.startsWith(" ")) {
					spaces.after = _space2.slice(1);
					raws.spaces.after = _rawSpace2.slice(1);
				} else raws.value = _rawSpace2;
				node = new _combinator["default"]({
					value: " ",
					source: getTokenSourceSpan(firstToken, this.tokens[this.position - 1]),
					sourceIndex: firstToken[_tokenize.FIELDS.START_POS],
					spaces,
					raws
				});
			}
			if (this.currToken && this.currToken[_tokenize.FIELDS.TYPE] === tokens.space) {
				node.spaces.after = this.optionalSpace(this.content());
				this.position++;
			}
			return this.newNode(node);
		};
		_proto.comma = function comma() {
			if (this.position === this.tokens.length - 1) {
				this.root.trailingComma = true;
				this.position++;
				return;
			}
			this.current._inferEndPosition();
			var selector = new _selector["default"]({
				source: { start: tokenStart(this.tokens[this.position + 1]) },
				sourceIndex: this.tokens[this.position + 1][_tokenize.FIELDS.START_POS]
			});
			this.current.parent.append(selector);
			this.current = selector;
			this.position++;
		};
		_proto.comment = function comment() {
			var current = this.currToken;
			this.newNode(new _comment["default"]({
				value: this.content(),
				source: getTokenSource(current),
				sourceIndex: current[_tokenize.FIELDS.START_POS]
			}));
			this.position++;
		};
		_proto.error = function error(message, opts) {
			throw this.root.error(message, opts);
		};
		_proto.missingBackslash = function missingBackslash() {
			return this.error("Expected a backslash preceding the semicolon.", { index: this.currToken[_tokenize.FIELDS.START_POS] });
		};
		_proto.missingParenthesis = function missingParenthesis() {
			return this.expected("opening parenthesis", this.currToken[_tokenize.FIELDS.START_POS]);
		};
		_proto.missingSquareBracket = function missingSquareBracket() {
			return this.expected("opening square bracket", this.currToken[_tokenize.FIELDS.START_POS]);
		};
		_proto.unexpected = function unexpected() {
			return this.error("Unexpected '" + this.content() + "'. Escaping special characters with \\ may help.", this.currToken[_tokenize.FIELDS.START_POS]);
		};
		_proto.unexpectedPipe = function unexpectedPipe() {
			return this.error("Unexpected '|'.", this.currToken[_tokenize.FIELDS.START_POS]);
		};
		_proto.namespace = function namespace() {
			var before = this.prevToken && this.content(this.prevToken) || true;
			if (this.nextToken[_tokenize.FIELDS.TYPE] === tokens.word) {
				this.position++;
				return this.word(before);
			} else if (this.nextToken[_tokenize.FIELDS.TYPE] === tokens.asterisk) {
				this.position++;
				return this.universal(before);
			}
			this.unexpectedPipe();
		};
		_proto.nesting = function nesting() {
			if (this.nextToken) {
				if (this.content(this.nextToken) === "|") {
					this.position++;
					return;
				}
			}
			var current = this.currToken;
			this.newNode(new _nesting["default"]({
				value: this.content(),
				source: getTokenSource(current),
				sourceIndex: current[_tokenize.FIELDS.START_POS]
			}));
			this.position++;
		};
		_proto.parentheses = function parentheses() {
			var last = this.current.last;
			var unbalanced = 1;
			this.position++;
			if (last && last.type === types.PSEUDO) {
				var selector = new _selector["default"]({
					source: { start: tokenStart(this.tokens[this.position]) },
					sourceIndex: this.tokens[this.position][_tokenize.FIELDS.START_POS]
				});
				var cache = this.current;
				last.append(selector);
				this.current = selector;
				while (this.position < this.tokens.length && unbalanced) {
					if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) unbalanced++;
					if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) unbalanced--;
					if (unbalanced) this.parse();
					else {
						this.current.source.end = tokenEnd(this.currToken);
						this.current.parent.source.end = tokenEnd(this.currToken);
						this.position++;
					}
				}
				this.current = cache;
			} else {
				var parenStart = this.currToken;
				var parenValue = "(";
				var parenEnd;
				while (this.position < this.tokens.length && unbalanced) {
					if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) unbalanced++;
					if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) unbalanced--;
					parenEnd = this.currToken;
					parenValue += this.parseParenthesisToken(this.currToken);
					this.position++;
				}
				if (last) last.appendToPropertyAndEscape("value", parenValue, parenValue);
				else this.newNode(new _string["default"]({
					value: parenValue,
					source: getSource(parenStart[_tokenize.FIELDS.START_LINE], parenStart[_tokenize.FIELDS.START_COL], parenEnd[_tokenize.FIELDS.END_LINE], parenEnd[_tokenize.FIELDS.END_COL]),
					sourceIndex: parenStart[_tokenize.FIELDS.START_POS]
				}));
			}
			if (unbalanced) return this.expected("closing parenthesis", this.currToken[_tokenize.FIELDS.START_POS]);
		};
		_proto.pseudo = function pseudo() {
			var _this4 = this;
			var pseudoStr = "";
			var startingToken = this.currToken;
			while (this.currToken && this.currToken[_tokenize.FIELDS.TYPE] === tokens.colon) {
				pseudoStr += this.content();
				this.position++;
			}
			if (!this.currToken) return this.expected(["pseudo-class", "pseudo-element"], this.position - 1);
			if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.word) this.splitWord(false, function(first, length) {
				pseudoStr += first;
				_this4.newNode(new _pseudo["default"]({
					value: pseudoStr,
					source: getTokenSourceSpan(startingToken, _this4.currToken),
					sourceIndex: startingToken[_tokenize.FIELDS.START_POS]
				}));
				if (length > 1 && _this4.nextToken && _this4.nextToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) _this4.error("Misplaced parenthesis.", { index: _this4.nextToken[_tokenize.FIELDS.START_POS] });
			});
			else return this.expected(["pseudo-class", "pseudo-element"], this.currToken[_tokenize.FIELDS.START_POS]);
		};
		_proto.space = function space() {
			var content = this.content();
			if (this.position === 0 || this.prevToken[_tokenize.FIELDS.TYPE] === tokens.comma || this.prevToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis || this.current.nodes.every(function(node) {
				return node.type === "comment";
			})) {
				this.spaces = this.optionalSpace(content);
				this.position++;
			} else if (this.position === this.tokens.length - 1 || this.nextToken[_tokenize.FIELDS.TYPE] === tokens.comma || this.nextToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
				this.current.last.spaces.after = this.optionalSpace(content);
				this.position++;
			} else this.combinator();
		};
		_proto.string = function string() {
			var current = this.currToken;
			this.newNode(new _string["default"]({
				value: this.content(),
				source: getTokenSource(current),
				sourceIndex: current[_tokenize.FIELDS.START_POS]
			}));
			this.position++;
		};
		_proto.universal = function universal(namespace) {
			var nextToken = this.nextToken;
			if (nextToken && this.content(nextToken) === "|") {
				this.position++;
				return this.namespace();
			}
			var current = this.currToken;
			this.newNode(new _universal["default"]({
				value: this.content(),
				source: getTokenSource(current),
				sourceIndex: current[_tokenize.FIELDS.START_POS]
			}), namespace);
			this.position++;
		};
		_proto.splitWord = function splitWord(namespace, firstCallback) {
			var _this5 = this;
			var nextToken = this.nextToken;
			var word = this.content();
			while (nextToken && ~[
				tokens.dollar,
				tokens.caret,
				tokens.equals,
				tokens.word
			].indexOf(nextToken[_tokenize.FIELDS.TYPE])) {
				this.position++;
				var current = this.content();
				word += current;
				if (current.lastIndexOf("\\") === current.length - 1) {
					var next = this.nextToken;
					if (next && next[_tokenize.FIELDS.TYPE] === tokens.space) {
						word += this.requiredSpace(this.content(next));
						this.position++;
					}
				}
				nextToken = this.nextToken;
			}
			var hasClass = indexesOf(word, ".").filter(function(i) {
				var escapedDot = word[i - 1] === "\\";
				var isKeyframesPercent = /^\d+\.\d+%$/.test(word);
				return !escapedDot && !isKeyframesPercent;
			});
			var hasId = indexesOf(word, "#").filter(function(i) {
				return word[i - 1] !== "\\";
			});
			var interpolations = indexesOf(word, "#{");
			if (interpolations.length) hasId = hasId.filter(function(hashIndex) {
				return !~interpolations.indexOf(hashIndex);
			});
			var indices = (0, _sortAscending["default"])(uniqs([0].concat(hasClass, hasId)));
			indices.forEach(function(ind, i) {
				var index = indices[i + 1] || word.length;
				var value = word.slice(ind, index);
				if (i === 0 && firstCallback) return firstCallback.call(_this5, value, indices.length);
				var node;
				var current = _this5.currToken;
				var sourceIndex = current[_tokenize.FIELDS.START_POS] + indices[i];
				var source = getSource(current[1], current[2] + ind, current[3], current[2] + (index - 1));
				if (~hasClass.indexOf(ind)) {
					var classNameOpts = {
						value: value.slice(1),
						source,
						sourceIndex
					};
					node = new _className["default"](unescapeProp(classNameOpts, "value"));
				} else if (~hasId.indexOf(ind)) {
					var idOpts = {
						value: value.slice(1),
						source,
						sourceIndex
					};
					node = new _id["default"](unescapeProp(idOpts, "value"));
				} else {
					var tagOpts = {
						value,
						source,
						sourceIndex
					};
					unescapeProp(tagOpts, "value");
					node = new _tag["default"](tagOpts);
				}
				_this5.newNode(node, namespace);
				namespace = null;
			});
			this.position++;
		};
		_proto.word = function word(namespace) {
			var nextToken = this.nextToken;
			if (nextToken && this.content(nextToken) === "|") {
				this.position++;
				return this.namespace();
			}
			return this.splitWord(namespace);
		};
		_proto.loop = function loop() {
			while (this.position < this.tokens.length) this.parse(true);
			this.current._inferEndPosition();
			return this.root;
		};
		_proto.parse = function parse(throwOnParenthesis) {
			switch (this.currToken[_tokenize.FIELDS.TYPE]) {
				case tokens.space:
					this.space();
					break;
				case tokens.comment:
					this.comment();
					break;
				case tokens.openParenthesis:
					this.parentheses();
					break;
				case tokens.closeParenthesis:
					if (throwOnParenthesis) this.missingParenthesis();
					break;
				case tokens.openSquare:
					this.attribute();
					break;
				case tokens.dollar:
				case tokens.caret:
				case tokens.equals:
				case tokens.word:
					this.word();
					break;
				case tokens.colon:
					this.pseudo();
					break;
				case tokens.comma:
					this.comma();
					break;
				case tokens.asterisk:
					this.universal();
					break;
				case tokens.ampersand:
					this.nesting();
					break;
				case tokens.slash:
				case tokens.combinator:
					this.combinator();
					break;
				case tokens.str:
					this.string();
					break;
				case tokens.closeSquare: this.missingSquareBracket();
				case tokens.semicolon: this.missingBackslash();
				default: this.unexpected();
			}
		};
		_proto.expected = function expected(description, index, found) {
			if (Array.isArray(description)) {
				var last = description.pop();
				description = description.join(", ") + " or " + last;
			}
			var an = /^[aeiou]/.test(description[0]) ? "an" : "a";
			if (!found) return this.error("Expected " + an + " " + description + ".", { index });
			return this.error("Expected " + an + " " + description + ", found \"" + found + "\" instead.", { index });
		};
		_proto.requiredSpace = function requiredSpace(space) {
			return this.options.lossy ? " " : space;
		};
		_proto.optionalSpace = function optionalSpace(space) {
			return this.options.lossy ? "" : space;
		};
		_proto.lossySpace = function lossySpace(space, required) {
			if (this.options.lossy) return required ? " " : "";
			else return space;
		};
		_proto.parseParenthesisToken = function parseParenthesisToken(token) {
			var content = this.content(token);
			if (token[_tokenize.FIELDS.TYPE] === tokens.space) return this.requiredSpace(content);
			else return content;
		};
		_proto.newNode = function newNode(node, namespace) {
			if (namespace) {
				if (/^ +$/.test(namespace)) {
					if (!this.options.lossy) this.spaces = (this.spaces || "") + namespace;
					namespace = true;
				}
				node.namespace = namespace;
				unescapeProp(node, "namespace");
			}
			if (this.spaces) {
				node.spaces.before = this.spaces;
				this.spaces = "";
			}
			return this.current.append(node);
		};
		_proto.content = function content(token) {
			if (token === void 0) token = this.currToken;
			return this.css.slice(token[_tokenize.FIELDS.START_POS], token[_tokenize.FIELDS.END_POS]);
		};
		_proto.locateNextMeaningfulToken = function locateNextMeaningfulToken(startPosition) {
			if (startPosition === void 0) startPosition = this.position + 1;
			var searchPosition = startPosition;
			while (searchPosition < this.tokens.length) if (WHITESPACE_EQUIV_TOKENS[this.tokens[searchPosition][_tokenize.FIELDS.TYPE]]) {
				searchPosition++;
				continue;
			} else return searchPosition;
			return -1;
		};
		_createClass(Parser, [
			{
				key: "currToken",
				get: function get() {
					return this.tokens[this.position];
				}
			},
			{
				key: "nextToken",
				get: function get() {
					return this.tokens[this.position + 1];
				}
			},
			{
				key: "prevToken",
				get: function get() {
					return this.tokens[this.position - 1];
				}
			}
		]);
		return Parser;
	}();
	module.exports = exports.default;
}));
var require_processor = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _parser = _interopRequireDefault(require_parser$1());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	exports["default"] = /* @__PURE__ */ function() {
		function Processor(func, options) {
			this.func = func || function noop() {};
			this.funcRes = null;
			this.options = options;
		}
		var _proto = Processor.prototype;
		_proto._shouldUpdateSelector = function _shouldUpdateSelector(rule, options) {
			if (options === void 0) options = {};
			if (Object.assign({}, this.options, options).updateSelector === false) return false;
			else return typeof rule !== "string";
		};
		_proto._isLossy = function _isLossy(options) {
			if (options === void 0) options = {};
			if (Object.assign({}, this.options, options).lossless === false) return true;
			else return false;
		};
		_proto._root = function _root(rule, options) {
			if (options === void 0) options = {};
			return new _parser["default"](rule, this._parseOptions(options)).root;
		};
		_proto._parseOptions = function _parseOptions(options) {
			return { lossy: this._isLossy(options) };
		};
		_proto._run = function _run(rule, options) {
			var _this = this;
			if (options === void 0) options = {};
			return new Promise(function(resolve, reject) {
				try {
					var root = _this._root(rule, options);
					Promise.resolve(_this.func(root)).then(function(transform) {
						var string = void 0;
						if (_this._shouldUpdateSelector(rule, options)) {
							string = root.toString();
							rule.selector = string;
						}
						return {
							transform,
							root,
							string
						};
					}).then(resolve, reject);
				} catch (e) {
					reject(e);
					return;
				}
			});
		};
		_proto._runSync = function _runSync(rule, options) {
			if (options === void 0) options = {};
			var root = this._root(rule, options);
			var transform = this.func(root);
			if (transform && typeof transform.then === "function") throw new Error("Selector processor returned a promise to a synchronous call.");
			var string = void 0;
			if (options.updateSelector && typeof rule !== "string") {
				string = root.toString();
				rule.selector = string;
			}
			return {
				transform,
				root,
				string
			};
		};
		_proto.ast = function ast(rule, options) {
			return this._run(rule, options).then(function(result) {
				return result.root;
			});
		};
		_proto.astSync = function astSync(rule, options) {
			return this._runSync(rule, options).root;
		};
		_proto.transform = function transform(rule, options) {
			return this._run(rule, options).then(function(result) {
				return result.transform;
			});
		};
		_proto.transformSync = function transformSync(rule, options) {
			return this._runSync(rule, options).transform;
		};
		_proto.process = function process(rule, options) {
			return this._run(rule, options).then(function(result) {
				return result.string || result.root.toString();
			});
		};
		_proto.processSync = function processSync(rule, options) {
			var result = this._runSync(rule, options);
			return result.string || result.root.toString();
		};
		return Processor;
	}();
	module.exports = exports.default;
}));
var require_constructors = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	exports.universal = exports.tag = exports.string = exports.selector = exports.root = exports.pseudo = exports.nesting = exports.id = exports.comment = exports.combinator = exports.className = exports.attribute = void 0;
	var _attribute = _interopRequireDefault(require_attribute());
	var _className = _interopRequireDefault(require_className());
	var _combinator = _interopRequireDefault(require_combinator());
	var _comment = _interopRequireDefault(require_comment());
	var _id = _interopRequireDefault(require_id());
	var _nesting = _interopRequireDefault(require_nesting());
	var _pseudo = _interopRequireDefault(require_pseudo());
	var _root = _interopRequireDefault(require_root());
	var _selector = _interopRequireDefault(require_selector());
	var _string = _interopRequireDefault(require_string());
	var _tag = _interopRequireDefault(require_tag());
	var _universal = _interopRequireDefault(require_universal());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	exports.attribute = function attribute(opts) {
		return new _attribute["default"](opts);
	};
	exports.className = function className(opts) {
		return new _className["default"](opts);
	};
	exports.combinator = function combinator(opts) {
		return new _combinator["default"](opts);
	};
	exports.comment = function comment(opts) {
		return new _comment["default"](opts);
	};
	exports.id = function id(opts) {
		return new _id["default"](opts);
	};
	exports.nesting = function nesting(opts) {
		return new _nesting["default"](opts);
	};
	exports.pseudo = function pseudo(opts) {
		return new _pseudo["default"](opts);
	};
	exports.root = function root(opts) {
		return new _root["default"](opts);
	};
	exports.selector = function selector(opts) {
		return new _selector["default"](opts);
	};
	exports.string = function string(opts) {
		return new _string["default"](opts);
	};
	exports.tag = function tag(opts) {
		return new _tag["default"](opts);
	};
	exports.universal = function universal(opts) {
		return new _universal["default"](opts);
	};
}));
var require_guards = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	exports.isComment = exports.isCombinator = exports.isClassName = exports.isAttribute = void 0;
	exports.isContainer = isContainer;
	exports.isIdentifier = void 0;
	exports.isNamespace = isNamespace;
	exports.isNesting = void 0;
	exports.isNode = isNode;
	exports.isPseudo = void 0;
	exports.isPseudoClass = isPseudoClass;
	exports.isPseudoElement = isPseudoElement;
	exports.isUniversal = exports.isTag = exports.isString = exports.isSelector = exports.isRoot = void 0;
	var _types = require_types();
	var _IS_TYPE;
	var IS_TYPE = (_IS_TYPE = {}, _IS_TYPE[_types.ATTRIBUTE] = true, _IS_TYPE[_types.CLASS] = true, _IS_TYPE[_types.COMBINATOR] = true, _IS_TYPE[_types.COMMENT] = true, _IS_TYPE[_types.ID] = true, _IS_TYPE[_types.NESTING] = true, _IS_TYPE[_types.PSEUDO] = true, _IS_TYPE[_types.ROOT] = true, _IS_TYPE[_types.SELECTOR] = true, _IS_TYPE[_types.STRING] = true, _IS_TYPE[_types.TAG] = true, _IS_TYPE[_types.UNIVERSAL] = true, _IS_TYPE);
	function isNode(node) {
		return typeof node === "object" && IS_TYPE[node.type];
	}
	function isNodeType(type, node) {
		return isNode(node) && node.type === type;
	}
	var isAttribute = isNodeType.bind(null, _types.ATTRIBUTE);
	exports.isAttribute = isAttribute;
	exports.isClassName = isNodeType.bind(null, _types.CLASS);
	exports.isCombinator = isNodeType.bind(null, _types.COMBINATOR);
	exports.isComment = isNodeType.bind(null, _types.COMMENT);
	exports.isIdentifier = isNodeType.bind(null, _types.ID);
	exports.isNesting = isNodeType.bind(null, _types.NESTING);
	var isPseudo = isNodeType.bind(null, _types.PSEUDO);
	exports.isPseudo = isPseudo;
	exports.isRoot = isNodeType.bind(null, _types.ROOT);
	exports.isSelector = isNodeType.bind(null, _types.SELECTOR);
	exports.isString = isNodeType.bind(null, _types.STRING);
	var isTag = isNodeType.bind(null, _types.TAG);
	exports.isTag = isTag;
	exports.isUniversal = isNodeType.bind(null, _types.UNIVERSAL);
	function isPseudoElement(node) {
		return isPseudo(node) && node.value && (node.value.startsWith("::") || node.value.toLowerCase() === ":before" || node.value.toLowerCase() === ":after" || node.value.toLowerCase() === ":first-letter" || node.value.toLowerCase() === ":first-line");
	}
	function isPseudoClass(node) {
		return isPseudo(node) && !isPseudoElement(node);
	}
	function isContainer(node) {
		return !!(isNode(node) && node.walk);
	}
	function isNamespace(node) {
		return isAttribute(node) || isTag(node);
	}
}));
var require_selectors = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	var _types = require_types();
	Object.keys(_types).forEach(function(key) {
		if (key === "default" || key === "__esModule") return;
		if (key in exports && exports[key] === _types[key]) return;
		exports[key] = _types[key];
	});
	var _constructors = require_constructors();
	Object.keys(_constructors).forEach(function(key) {
		if (key === "default" || key === "__esModule") return;
		if (key in exports && exports[key] === _constructors[key]) return;
		exports[key] = _constructors[key];
	});
	var _guards = require_guards();
	Object.keys(_guards).forEach(function(key) {
		if (key === "default" || key === "__esModule") return;
		if (key in exports && exports[key] === _guards[key]) return;
		exports[key] = _guards[key];
	});
}));
var require_dist = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.__esModule = true;
	exports["default"] = void 0;
	var _processor = _interopRequireDefault(require_processor());
	var selectors = _interopRequireWildcard(require_selectors());
	function _getRequireWildcardCache(nodeInterop) {
		if (typeof WeakMap !== "function") return null;
		var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
		var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
		return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
			return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
		})(nodeInterop);
	}
	function _interopRequireWildcard(obj, nodeInterop) {
		if (!nodeInterop && obj && obj.__esModule) return obj;
		if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { "default": obj };
		var cache = _getRequireWildcardCache(nodeInterop);
		if (cache && cache.has(obj)) return cache.get(obj);
		var newObj = {};
		var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
		for (var key in obj) if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
			var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
			if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
			else newObj[key] = obj[key];
		}
		newObj["default"] = obj;
		if (cache) cache.set(obj, newObj);
		return newObj;
	}
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	var parser = function parser(processor) {
		return new _processor["default"](processor);
	};
	Object.assign(parser, selectors);
	delete parser.__esModule;
	exports["default"] = parser;
	module.exports = exports.default;
}));
var require_postcss_nested = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { AtRule, Rule } = require_postcss();
	let parser = require_dist();
	function parse(rawSelector, rule) {
		let nodes;
		try {
			parser((parsed) => {
				nodes = parsed;
			}).processSync(rawSelector);
		} catch (e) {
			if (rawSelector.includes(":")) throw rule ? rule.error("Missed semicolon") : e;
			else throw rule ? rule.error(e.message) : e;
		}
		return nodes.at(0);
	}
	function interpolateAmpInSelector(nodes, parent) {
		let replaced = false;
		nodes.each((node) => {
			if (node.type === "nesting") {
				let clonedParent = parent.clone({});
				if (node.value !== "&") node.replaceWith(parse(node.value.replace("&", clonedParent.toString())));
				else node.replaceWith(clonedParent);
				replaced = true;
			} else if ("nodes" in node && node.nodes) {
				if (interpolateAmpInSelector(node, parent)) replaced = true;
			}
		});
		return replaced;
	}
	function mergeSelectors(parent, child) {
		let merged = [];
		parent.selectors.forEach((sel) => {
			let parentNode = parse(sel, parent);
			child.selectors.forEach((selector) => {
				if (!selector) return;
				let node = parse(selector, child);
				if (!interpolateAmpInSelector(node, parentNode)) {
					node.prepend(parser.combinator({ value: " " }));
					node.prepend(parentNode.clone({}));
				}
				merged.push(node.toString());
			});
		});
		return merged;
	}
	function breakOut(child, after) {
		let prev = child.prev();
		after.after(child);
		while (prev && prev.type === "comment") {
			let nextPrev = prev.prev();
			after.after(prev);
			prev = nextPrev;
		}
		return child;
	}
	function createFnAtruleChilds(bubble) {
		return function atruleChilds(rule, atrule, bubbling, mergeSels = bubbling) {
			let children = [];
			atrule.each((child) => {
				if (child.type === "rule" && bubbling) {
					if (mergeSels) child.selectors = mergeSelectors(rule, child);
				} else if (child.type === "atrule" && child.nodes) {
					if (bubble[child.name]) atruleChilds(rule, child, mergeSels);
					else if (atrule[rootRuleMergeSel] !== false) children.push(child);
				} else children.push(child);
			});
			if (bubbling) {
				if (children.length) {
					let clone = rule.clone({ nodes: [] });
					for (let child of children) clone.append(child);
					atrule.prepend(clone);
				}
			}
		};
	}
	function pickDeclarations(selector, declarations, after) {
		let parent = new Rule({
			nodes: [],
			selector
		});
		parent.append(declarations);
		after.after(parent);
		return parent;
	}
	function atruleNames(defaults, custom) {
		let list = {};
		for (let name of defaults) list[name] = true;
		if (custom) for (let name of custom) list[name.replace(/^@/, "")] = true;
		return list;
	}
	function parseRootRuleParams(params) {
		params = params.trim();
		let braceBlock = params.match(/^\((.*)\)$/);
		if (!braceBlock) return {
			selector: params,
			type: "basic"
		};
		let bits = braceBlock[1].match(/^(with(?:out)?):(.+)$/);
		if (bits) {
			let allowlist = bits[1] === "with";
			let rules = Object.fromEntries(bits[2].trim().split(/\s+/).map((name) => [name, true]));
			if (allowlist && rules.all) return { type: "noop" };
			let escapes = (rule) => !!rules[rule];
			if (rules.all) escapes = () => true;
			else if (allowlist) escapes = (rule) => rule === "all" ? false : !rules[rule];
			return {
				escapes,
				type: "withrules"
			};
		}
		return { type: "unknown" };
	}
	function getAncestorRules(leaf) {
		let lineage = [];
		let parent = leaf.parent;
		while (parent && parent instanceof AtRule) {
			lineage.push(parent);
			parent = parent.parent;
		}
		return lineage;
	}
	function unwrapRootRule(rule) {
		let escapes = rule[rootRuleEscapes];
		if (!escapes) rule.after(rule.nodes);
		else {
			let nodes = rule.nodes;
			let topEscaped;
			let topEscapedIdx = -1;
			let breakoutLeaf;
			let breakoutRoot;
			let clone;
			let lineage = getAncestorRules(rule);
			lineage.forEach((parent, i) => {
				if (escapes(parent.name)) {
					topEscaped = parent;
					topEscapedIdx = i;
					breakoutRoot = clone;
				} else {
					let oldClone = clone;
					clone = parent.clone({ nodes: [] });
					oldClone && clone.append(oldClone);
					breakoutLeaf = breakoutLeaf || clone;
				}
			});
			if (!topEscaped) rule.after(nodes);
			else if (!breakoutRoot) topEscaped.after(nodes);
			else {
				breakoutLeaf.append(nodes);
				topEscaped.after(breakoutRoot);
			}
			if (rule.next() && topEscaped) {
				let restRoot;
				lineage.slice(0, topEscapedIdx + 1).forEach((parent, i, arr) => {
					let oldRoot = restRoot;
					restRoot = parent.clone({ nodes: [] });
					oldRoot && restRoot.append(oldRoot);
					let nextSibs = [];
					let next = (arr[i - 1] || rule).next();
					while (next) {
						nextSibs.push(next);
						next = next.next();
					}
					restRoot.append(nextSibs);
				});
				restRoot && (breakoutRoot || nodes[nodes.length - 1]).after(restRoot);
			}
		}
		rule.remove();
	}
	const rootRuleMergeSel = Symbol("rootRuleMergeSel");
	const rootRuleEscapes = Symbol("rootRuleEscapes");
	function normalizeRootRule(rule) {
		let { params } = rule;
		let { escapes, selector, type } = parseRootRuleParams(params);
		if (type === "unknown") throw rule.error(`Unknown @${rule.name} parameter ${JSON.stringify(params)}`);
		if (type === "basic" && selector) {
			let selectorBlock = new Rule({
				nodes: rule.nodes,
				selector
			});
			rule.removeAll();
			rule.append(selectorBlock);
		}
		rule[rootRuleEscapes] = escapes;
		rule[rootRuleMergeSel] = escapes ? !escapes("all") : type === "noop";
	}
	const hasRootRule = Symbol("hasRootRule");
	module.exports = (opts = {}) => {
		let bubble = atruleNames([
			"media",
			"supports",
			"layer",
			"container",
			"starting-style"
		], opts.bubble);
		let atruleChilds = createFnAtruleChilds(bubble);
		let unwrap = atruleNames([
			"document",
			"font-face",
			"keyframes",
			"-webkit-keyframes",
			"-moz-keyframes"
		], opts.unwrap);
		let rootRuleName = (opts.rootRuleName || "at-root").replace(/^@/, "");
		let preserveEmpty = opts.preserveEmpty;
		return {
			Once(root) {
				root.walkAtRules(rootRuleName, (node) => {
					normalizeRootRule(node);
					root[hasRootRule] = true;
				});
			},
			postcssPlugin: "postcss-nested",
			RootExit(root) {
				if (root[hasRootRule]) {
					root.walkAtRules(rootRuleName, unwrapRootRule);
					root[hasRootRule] = false;
				}
			},
			Rule(rule) {
				let unwrapped = false;
				let after = rule;
				let copyDeclarations = false;
				let declarations = [];
				rule.each((child) => {
					if (child.type === "rule") {
						if (declarations.length) {
							after = pickDeclarations(rule.selector, declarations, after);
							declarations = [];
						}
						copyDeclarations = true;
						unwrapped = true;
						child.selectors = mergeSelectors(rule, child);
						after = breakOut(child, after);
					} else if (child.type === "atrule") {
						if (declarations.length) {
							after = pickDeclarations(rule.selector, declarations, after);
							declarations = [];
						}
						if (child.name === rootRuleName) {
							unwrapped = true;
							atruleChilds(rule, child, true, child[rootRuleMergeSel]);
							after = breakOut(child, after);
						} else if (bubble[child.name]) {
							copyDeclarations = true;
							unwrapped = true;
							atruleChilds(rule, child, true);
							after = breakOut(child, after);
						} else if (unwrap[child.name]) {
							copyDeclarations = true;
							unwrapped = true;
							atruleChilds(rule, child, false);
							after = breakOut(child, after);
						} else if (copyDeclarations) declarations.push(child);
					} else if (child.type === "decl" && copyDeclarations) declarations.push(child);
				});
				if (declarations.length) after = pickDeclarations(rule.selector, declarations, after);
				if (unwrapped && preserveEmpty !== true) {
					rule.raws.semicolon = true;
					if (rule.nodes.length === 0) rule.remove();
				}
			}
		};
	};
	module.exports.postcss = true;
}));
var require_parser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let postcss = require_postcss();
	let IMPORTANT = /\s*!important\s*$/i;
	let UNITLESS = {
		"box-flex": true,
		"box-flex-group": true,
		"column-count": true,
		"flex": true,
		"flex-grow": true,
		"flex-positive": true,
		"flex-shrink": true,
		"flex-negative": true,
		"font-weight": true,
		"line-clamp": true,
		"line-height": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"tab-size": true,
		"widows": true,
		"z-index": true,
		"zoom": true,
		"fill-opacity": true,
		"stroke-dashoffset": true,
		"stroke-opacity": true,
		"stroke-width": true
	};
	function dashify(str) {
		return str.replace(/([A-Z])/g, "-$1").replace(/^ms-/, "-ms-").toLowerCase();
	}
	function decl(parent, name, value) {
		if (value === false || value === null) return;
		if (!name.startsWith("--")) name = dashify(name);
		if (typeof value === "number") if (value === 0 || UNITLESS[name]) value = value.toString();
		else value += "px";
		if (name === "css-float") name = "float";
		if (IMPORTANT.test(value)) {
			value = value.replace(IMPORTANT, "");
			parent.push(postcss.decl({
				prop: name,
				value,
				important: true
			}));
		} else parent.push(postcss.decl({
			prop: name,
			value
		}));
	}
	function atRule(parent, parts, value) {
		let node = postcss.atRule({
			name: parts[1],
			params: parts[3] || ""
		});
		if (typeof value === "object") {
			node.nodes = [];
			parse(value, node);
		}
		parent.push(node);
	}
	function parse(obj, parent) {
		let name, node, value;
		for (name in obj) {
			value = obj[name];
			if (value === null || typeof value === "undefined") continue;
			else if (name[0] === "@") {
				let parts = name.match(/@(\S+)(\s+([\W\w]*)\s*)?/);
				if (Array.isArray(value)) for (let i of value) atRule(parent, parts, i);
				else atRule(parent, parts, value);
			} else if (Array.isArray(value)) for (let i of value) decl(parent, name, i);
			else if (typeof value === "object") {
				node = postcss.rule({ selector: name });
				parse(value, node);
				parent.push(node);
			} else decl(parent, name, value);
		}
	}
	module.exports = function(obj) {
		let root = postcss.root();
		parse(obj, root);
		return root;
	};
}));
var require_camelcase_css = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const pattern = /-(\w|$)/g;
	const callback = (dashChar, char) => char.toUpperCase();
	const camelCaseCSS = (property) => {
		property = property.toLowerCase();
		if (property === "float") return "cssFloat";
		else if (property.startsWith("-ms-")) return property.substr(1).replace(pattern, callback);
		else return property.replace(pattern, callback);
	};
	module.exports = camelCaseCSS;
}));
var require_objectifier = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let camelcase = require_camelcase_css();
	let UNITLESS = {
		boxFlex: true,
		boxFlexGroup: true,
		columnCount: true,
		flex: true,
		flexGrow: true,
		flexPositive: true,
		flexShrink: true,
		flexNegative: true,
		fontWeight: true,
		lineClamp: true,
		lineHeight: true,
		opacity: true,
		order: true,
		orphans: true,
		tabSize: true,
		widows: true,
		zIndex: true,
		zoom: true,
		fillOpacity: true,
		strokeDashoffset: true,
		strokeOpacity: true,
		strokeWidth: true
	};
	function atRule(node) {
		if (typeof node.nodes === "undefined") return true;
		else return process(node);
	}
	function process(node, options = {}) {
		let name;
		let result = {};
		let { stringifyImportant } = options;
		node.each((child) => {
			if (child.type === "atrule") {
				name = "@" + child.name;
				if (child.params) name += " " + child.params;
				if (typeof result[name] === "undefined") result[name] = atRule(child);
				else if (Array.isArray(result[name])) result[name].push(atRule(child));
				else result[name] = [result[name], atRule(child)];
			} else if (child.type === "rule") {
				let body = process(child);
				if (result[child.selector]) for (let i in body) {
					let object = result[child.selector];
					if (stringifyImportant && object[i] && object[i].endsWith("!important")) {
						if (body[i].endsWith("!important")) object[i] = body[i];
					} else object[i] = body[i];
				}
				else result[child.selector] = body;
			} else if (child.type === "decl") {
				if (child.prop[0] === "-" && child.prop[1] === "-") name = child.prop;
				else if (child.parent && child.parent.selector === ":export") name = child.prop;
				else name = camelcase(child.prop);
				let value = child.value;
				if (!isNaN(child.value) && UNITLESS[name]) value = parseFloat(child.value);
				if (child.important) value += " !important";
				if (typeof result[name] === "undefined") result[name] = value;
				else if (Array.isArray(result[name])) result[name].push(value);
				else result[name] = [result[name], value];
			}
		});
		return result;
	}
	module.exports = process;
}));
var require_process_result = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let objectify = require_objectifier();
	module.exports = function processResult(result) {
		if (console && console.warn) result.warnings().forEach((warn) => {
			let source = warn.plugin || "PostCSS";
			console.warn(source + ": " + warn.text);
		});
		return objectify(result.root);
	};
}));
var require_async = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let postcss = require_postcss();
	let parse = require_parser();
	let processResult = require_process_result();
	module.exports = function async(plugins) {
		let processor = postcss(plugins);
		return async (input) => {
			return processResult(await processor.process(input, {
				parser: parse,
				from: void 0
			}));
		};
	};
}));
var require_sync = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let postcss = require_postcss();
	let parse = require_parser();
	let processResult = require_process_result();
	module.exports = function(plugins) {
		let processor = postcss(plugins);
		return (input) => {
			return processResult(processor.process(input, {
				parser: parse,
				from: void 0
			}));
		};
	};
}));
var require_postcss_js = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let async = require_async();
	module.exports = {
		objectify: require_objectifier(),
		parse: require_parser(),
		async,
		sync: require_sync()
	};
}));
var require_parseObjectStyles = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "default", {
		enumerable: true,
		get: function() {
			return parseObjectStyles;
		}
	});
	const _postcss = /* @__PURE__ */ _interop_require_default(require_postcss());
	const _postcssnested = /* @__PURE__ */ _interop_require_default(require_postcss_nested());
	const _postcssjs = /* @__PURE__ */ _interop_require_default(require_postcss_js());
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function parseObjectStyles(styles) {
		if (!Array.isArray(styles)) return parseObjectStyles([styles]);
		return styles.flatMap((style) => {
			return (0, _postcss.default)([(0, _postcssnested.default)({ bubble: ["screen"] })]).process(style, { parser: _postcssjs.default }).root.nodes;
		});
	}
}));
var require_isPlainObject = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "default", {
		enumerable: true,
		get: function() {
			return isPlainObject;
		}
	});
	function isPlainObject(value) {
		if (Object.prototype.toString.call(value) !== "[object Object]") return false;
		const prototype = Object.getPrototypeOf(value);
		return prototype === null || Object.getPrototypeOf(prototype) === null;
	}
}));
var require_prefixSelector = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "default", {
		enumerable: true,
		get: function() {
			return _default;
		}
	});
	const _postcssselectorparser = /* @__PURE__ */ _interop_require_default(require_dist());
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function _default(prefix, selector, prependNegative = false) {
		if (prefix === "") return selector;
		let ast = typeof selector === "string" ? (0, _postcssselectorparser.default)().astSync(selector) : selector;
		ast.walkClasses((classSelector) => {
			let baseClass = classSelector.value;
			classSelector.value = prependNegative && baseClass.startsWith("-") ? `-${prefix}${baseClass.slice(1)}` : `${prefix}${baseClass}`;
		});
		return typeof selector === "string" ? ast.toString() : ast;
	}
}));
var require_escapeCommas = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "default", {
		enumerable: true,
		get: function() {
			return escapeCommas;
		}
	});
	function escapeCommas(className) {
		return className.replace(/\\,/g, "\\2c ");
	}
}));
var require_colorNames = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "default", {
		enumerable: true,
		get: function() {
			return _default;
		}
	});
	const _default = {
		aliceblue: [
			240,
			248,
			255
		],
		antiquewhite: [
			250,
			235,
			215
		],
		aqua: [
			0,
			255,
			255
		],
		aquamarine: [
			127,
			255,
			212
		],
		azure: [
			240,
			255,
			255
		],
		beige: [
			245,
			245,
			220
		],
		bisque: [
			255,
			228,
			196
		],
		black: [
			0,
			0,
			0
		],
		blanchedalmond: [
			255,
			235,
			205
		],
		blue: [
			0,
			0,
			255
		],
		blueviolet: [
			138,
			43,
			226
		],
		brown: [
			165,
			42,
			42
		],
		burlywood: [
			222,
			184,
			135
		],
		cadetblue: [
			95,
			158,
			160
		],
		chartreuse: [
			127,
			255,
			0
		],
		chocolate: [
			210,
			105,
			30
		],
		coral: [
			255,
			127,
			80
		],
		cornflowerblue: [
			100,
			149,
			237
		],
		cornsilk: [
			255,
			248,
			220
		],
		crimson: [
			220,
			20,
			60
		],
		cyan: [
			0,
			255,
			255
		],
		darkblue: [
			0,
			0,
			139
		],
		darkcyan: [
			0,
			139,
			139
		],
		darkgoldenrod: [
			184,
			134,
			11
		],
		darkgray: [
			169,
			169,
			169
		],
		darkgreen: [
			0,
			100,
			0
		],
		darkgrey: [
			169,
			169,
			169
		],
		darkkhaki: [
			189,
			183,
			107
		],
		darkmagenta: [
			139,
			0,
			139
		],
		darkolivegreen: [
			85,
			107,
			47
		],
		darkorange: [
			255,
			140,
			0
		],
		darkorchid: [
			153,
			50,
			204
		],
		darkred: [
			139,
			0,
			0
		],
		darksalmon: [
			233,
			150,
			122
		],
		darkseagreen: [
			143,
			188,
			143
		],
		darkslateblue: [
			72,
			61,
			139
		],
		darkslategray: [
			47,
			79,
			79
		],
		darkslategrey: [
			47,
			79,
			79
		],
		darkturquoise: [
			0,
			206,
			209
		],
		darkviolet: [
			148,
			0,
			211
		],
		deeppink: [
			255,
			20,
			147
		],
		deepskyblue: [
			0,
			191,
			255
		],
		dimgray: [
			105,
			105,
			105
		],
		dimgrey: [
			105,
			105,
			105
		],
		dodgerblue: [
			30,
			144,
			255
		],
		firebrick: [
			178,
			34,
			34
		],
		floralwhite: [
			255,
			250,
			240
		],
		forestgreen: [
			34,
			139,
			34
		],
		fuchsia: [
			255,
			0,
			255
		],
		gainsboro: [
			220,
			220,
			220
		],
		ghostwhite: [
			248,
			248,
			255
		],
		gold: [
			255,
			215,
			0
		],
		goldenrod: [
			218,
			165,
			32
		],
		gray: [
			128,
			128,
			128
		],
		green: [
			0,
			128,
			0
		],
		greenyellow: [
			173,
			255,
			47
		],
		grey: [
			128,
			128,
			128
		],
		honeydew: [
			240,
			255,
			240
		],
		hotpink: [
			255,
			105,
			180
		],
		indianred: [
			205,
			92,
			92
		],
		indigo: [
			75,
			0,
			130
		],
		ivory: [
			255,
			255,
			240
		],
		khaki: [
			240,
			230,
			140
		],
		lavender: [
			230,
			230,
			250
		],
		lavenderblush: [
			255,
			240,
			245
		],
		lawngreen: [
			124,
			252,
			0
		],
		lemonchiffon: [
			255,
			250,
			205
		],
		lightblue: [
			173,
			216,
			230
		],
		lightcoral: [
			240,
			128,
			128
		],
		lightcyan: [
			224,
			255,
			255
		],
		lightgoldenrodyellow: [
			250,
			250,
			210
		],
		lightgray: [
			211,
			211,
			211
		],
		lightgreen: [
			144,
			238,
			144
		],
		lightgrey: [
			211,
			211,
			211
		],
		lightpink: [
			255,
			182,
			193
		],
		lightsalmon: [
			255,
			160,
			122
		],
		lightseagreen: [
			32,
			178,
			170
		],
		lightskyblue: [
			135,
			206,
			250
		],
		lightslategray: [
			119,
			136,
			153
		],
		lightslategrey: [
			119,
			136,
			153
		],
		lightsteelblue: [
			176,
			196,
			222
		],
		lightyellow: [
			255,
			255,
			224
		],
		lime: [
			0,
			255,
			0
		],
		limegreen: [
			50,
			205,
			50
		],
		linen: [
			250,
			240,
			230
		],
		magenta: [
			255,
			0,
			255
		],
		maroon: [
			128,
			0,
			0
		],
		mediumaquamarine: [
			102,
			205,
			170
		],
		mediumblue: [
			0,
			0,
			205
		],
		mediumorchid: [
			186,
			85,
			211
		],
		mediumpurple: [
			147,
			112,
			219
		],
		mediumseagreen: [
			60,
			179,
			113
		],
		mediumslateblue: [
			123,
			104,
			238
		],
		mediumspringgreen: [
			0,
			250,
			154
		],
		mediumturquoise: [
			72,
			209,
			204
		],
		mediumvioletred: [
			199,
			21,
			133
		],
		midnightblue: [
			25,
			25,
			112
		],
		mintcream: [
			245,
			255,
			250
		],
		mistyrose: [
			255,
			228,
			225
		],
		moccasin: [
			255,
			228,
			181
		],
		navajowhite: [
			255,
			222,
			173
		],
		navy: [
			0,
			0,
			128
		],
		oldlace: [
			253,
			245,
			230
		],
		olive: [
			128,
			128,
			0
		],
		olivedrab: [
			107,
			142,
			35
		],
		orange: [
			255,
			165,
			0
		],
		orangered: [
			255,
			69,
			0
		],
		orchid: [
			218,
			112,
			214
		],
		palegoldenrod: [
			238,
			232,
			170
		],
		palegreen: [
			152,
			251,
			152
		],
		paleturquoise: [
			175,
			238,
			238
		],
		palevioletred: [
			219,
			112,
			147
		],
		papayawhip: [
			255,
			239,
			213
		],
		peachpuff: [
			255,
			218,
			185
		],
		peru: [
			205,
			133,
			63
		],
		pink: [
			255,
			192,
			203
		],
		plum: [
			221,
			160,
			221
		],
		powderblue: [
			176,
			224,
			230
		],
		purple: [
			128,
			0,
			128
		],
		rebeccapurple: [
			102,
			51,
			153
		],
		red: [
			255,
			0,
			0
		],
		rosybrown: [
			188,
			143,
			143
		],
		royalblue: [
			65,
			105,
			225
		],
		saddlebrown: [
			139,
			69,
			19
		],
		salmon: [
			250,
			128,
			114
		],
		sandybrown: [
			244,
			164,
			96
		],
		seagreen: [
			46,
			139,
			87
		],
		seashell: [
			255,
			245,
			238
		],
		sienna: [
			160,
			82,
			45
		],
		silver: [
			192,
			192,
			192
		],
		skyblue: [
			135,
			206,
			235
		],
		slateblue: [
			106,
			90,
			205
		],
		slategray: [
			112,
			128,
			144
		],
		slategrey: [
			112,
			128,
			144
		],
		snow: [
			255,
			250,
			250
		],
		springgreen: [
			0,
			255,
			127
		],
		steelblue: [
			70,
			130,
			180
		],
		tan: [
			210,
			180,
			140
		],
		teal: [
			0,
			128,
			128
		],
		thistle: [
			216,
			191,
			216
		],
		tomato: [
			255,
			99,
			71
		],
		turquoise: [
			64,
			224,
			208
		],
		violet: [
			238,
			130,
			238
		],
		wheat: [
			245,
			222,
			179
		],
		white: [
			255,
			255,
			255
		],
		whitesmoke: [
			245,
			245,
			245
		],
		yellow: [
			255,
			255,
			0
		],
		yellowgreen: [
			154,
			205,
			50
		]
	};
}));
var require_color = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export(exports, {
		parseColor: function() {
			return parseColor;
		},
		formatColor: function() {
			return formatColor;
		}
	});
	const _colorNames = /* @__PURE__ */ _interop_require_default(require_colorNames());
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	let HEX = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
	let SHORT_HEX = /^#([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
	let VALUE = /(?:\d+|\d*\.\d+)%?/;
	let SEP = /(?:\s*,\s*|\s+)/;
	let ALPHA_SEP = /\s*[,/]\s*/;
	let CUSTOM_PROPERTY = /var\(--(?:[^ )]*?)(?:,(?:[^ )]*?|var\(--[^ )]*?\)))?\)/;
	let RGB = new RegExp(`^(rgba?)\\(\\s*(${VALUE.source}|${CUSTOM_PROPERTY.source})(?:${SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?(?:${SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?(?:${ALPHA_SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?\\s*\\)$`);
	let HSL = new RegExp(`^(hsla?)\\(\\s*((?:${VALUE.source})(?:deg|rad|grad|turn)?|${CUSTOM_PROPERTY.source})(?:${SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?(?:${SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?(?:${ALPHA_SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?\\s*\\)$`);
	function parseColor(value, { loose = false } = {}) {
		var _match_, _match__toString;
		if (typeof value !== "string") return null;
		value = value.trim();
		if (value === "transparent") return {
			mode: "rgb",
			color: [
				"0",
				"0",
				"0"
			],
			alpha: "0"
		};
		if (value in _colorNames.default) return {
			mode: "rgb",
			color: _colorNames.default[value].map((v) => v.toString())
		};
		let hex = value.replace(SHORT_HEX, (_, r, g, b, a) => [
			"#",
			r,
			r,
			g,
			g,
			b,
			b,
			a ? a + a : ""
		].join("")).match(HEX);
		if (hex !== null) return {
			mode: "rgb",
			color: [
				parseInt(hex[1], 16),
				parseInt(hex[2], 16),
				parseInt(hex[3], 16)
			].map((v) => v.toString()),
			alpha: hex[4] ? (parseInt(hex[4], 16) / 255).toString() : void 0
		};
		var _value_match;
		let match = (_value_match = value.match(RGB)) !== null && _value_match !== void 0 ? _value_match : value.match(HSL);
		if (match === null) return null;
		let color = [
			match[2],
			match[3],
			match[4]
		].filter(Boolean).map((v) => v.toString());
		if (color.length === 2 && color[0].startsWith("var(")) return {
			mode: match[1],
			color: [color[0]],
			alpha: color[1]
		};
		if (!loose && color.length !== 3) return null;
		if (color.length < 3 && !color.some((part) => /^var\(.*?\)$/.test(part))) return null;
		return {
			mode: match[1],
			color,
			alpha: (_match_ = match[5]) === null || _match_ === void 0 ? void 0 : (_match__toString = _match_.toString) === null || _match__toString === void 0 ? void 0 : _match__toString.call(_match_)
		};
	}
	function formatColor({ mode, color, alpha }) {
		let hasAlpha = alpha !== void 0;
		if (mode === "rgba" || mode === "hsla") return `${mode}(${color.join(", ")}${hasAlpha ? `, ${alpha}` : ""})`;
		return `${mode}(${color.join(" ")}${hasAlpha ? ` / ${alpha}` : ""})`;
	}
}));
var require_withAlphaVariable = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export(exports, {
		withAlphaValue: function() {
			return withAlphaValue;
		},
		default: function() {
			return withAlphaVariable;
		}
	});
	const _color = require_color();
	function withAlphaValue(color, alphaValue, defaultValue) {
		if (typeof color === "function") return color({ opacityValue: alphaValue });
		let parsed = (0, _color.parseColor)(color, { loose: true });
		if (parsed === null) return defaultValue;
		return (0, _color.formatColor)({
			...parsed,
			alpha: alphaValue
		});
	}
	function withAlphaVariable({ color, property, variable }) {
		let properties = [].concat(property);
		if (typeof color === "function") return {
			[variable]: "1",
			...Object.fromEntries(properties.map((p) => {
				return [p, color({
					opacityVariable: variable,
					opacityValue: `var(${variable}, 1)`
				})];
			}))
		};
		const parsed = (0, _color.parseColor)(color);
		if (parsed === null) return Object.fromEntries(properties.map((p) => [p, color]));
		if (parsed.alpha !== void 0) return Object.fromEntries(properties.map((p) => [p, color]));
		return {
			[variable]: "1",
			...Object.fromEntries(properties.map((p) => {
				return [p, (0, _color.formatColor)({
					...parsed,
					alpha: `var(${variable}, 1)`
				})];
			}))
		};
	}
}));
var require_math_operators = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export(exports, {
		hasMathFn: function() {
			return hasMathFn;
		},
		addWhitespaceAroundMathOperators: function() {
			return addWhitespaceAroundMathOperators;
		}
	});
	const LOWER_A = 97;
	const LOWER_Z = 122;
	const UPPER_A = 65;
	const UPPER_Z = 90;
	const LOWER_E = 101;
	const UPPER_E = 69;
	const ZERO = 48;
	const NINE = 57;
	const ADD = 43;
	const SUB = 45;
	const MUL = 42;
	const DIV = 47;
	const OPEN_PAREN = 40;
	const CLOSE_PAREN = 41;
	const COMMA = 44;
	const SPACE = 32;
	const PERCENT = 37;
	const MATH_FUNCTIONS = [
		"calc",
		"min",
		"max",
		"clamp",
		"mod",
		"rem",
		"sin",
		"cos",
		"tan",
		"asin",
		"acos",
		"atan",
		"atan2",
		"pow",
		"sqrt",
		"hypot",
		"log",
		"exp",
		"round"
	];
	function hasMathFn(input) {
		return input.indexOf("(") !== -1 && MATH_FUNCTIONS.some((fn) => input.includes(`${fn}(`));
	}
	function addWhitespaceAroundMathOperators(input) {
		if (!MATH_FUNCTIONS.some((fn) => input.includes(fn))) return input;
		let result = "";
		let formattable = [];
		let valuePos = null;
		let lastValuePos = null;
		for (let i = 0; i < input.length; i++) {
			let char = input.charCodeAt(i);
			if (char >= ZERO && char <= NINE) valuePos = i;
			else if (valuePos !== null && (char === PERCENT || char >= LOWER_A && char <= LOWER_Z || char >= UPPER_A && char <= UPPER_Z)) valuePos = i;
			else {
				lastValuePos = valuePos;
				valuePos = null;
			}
			if (char === OPEN_PAREN) {
				result += input[i];
				let start = i;
				for (let j = i - 1; j >= 0; j--) {
					let inner = input.charCodeAt(j);
					if (inner >= ZERO && inner <= NINE) start = j;
					else if (inner >= LOWER_A && inner <= LOWER_Z) start = j;
					else break;
				}
				let fn = input.slice(start, i);
				if (MATH_FUNCTIONS.includes(fn)) {
					formattable.unshift(true);
					continue;
				} else if (formattable[0] && fn === "") {
					formattable.unshift(true);
					continue;
				}
				formattable.unshift(false);
				continue;
			} else if (char === CLOSE_PAREN) {
				result += input[i];
				formattable.shift();
			} else if (char === COMMA && formattable[0]) {
				result += `, `;
				continue;
			} else if (char === SPACE && formattable[0] && result.charCodeAt(result.length - 1) === SPACE) continue;
			else if ((char === ADD || char === MUL || char === DIV || char === SUB) && formattable[0]) {
				let trimmed = result.trimEnd();
				let prev = trimmed.charCodeAt(trimmed.length - 1);
				let prevPrev = trimmed.charCodeAt(trimmed.length - 2);
				let next = input.charCodeAt(i + 1);
				if ((prev === LOWER_E || prev === UPPER_E) && prevPrev >= ZERO && prevPrev <= NINE) {
					result += input[i];
					continue;
				} else if (prev === ADD || prev === MUL || prev === DIV || prev === SUB) {
					result += input[i];
					continue;
				} else if (prev === OPEN_PAREN || prev === COMMA) {
					result += input[i];
					continue;
				} else if (input.charCodeAt(i - 1) === SPACE) result += `${input[i]} `;
				else if (prev >= ZERO && prev <= NINE || next >= ZERO && next <= NINE || prev === CLOSE_PAREN || next === OPEN_PAREN || next === ADD || next === MUL || next === DIV || next === SUB || lastValuePos !== null && lastValuePos === i - 1) result += ` ${input[i]} `;
				else result += input[i];
			} else result += input[i];
		}
		return result;
	}
}));
var require_splitAtTopLevelOnly = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "splitAtTopLevelOnly", {
		enumerable: true,
		get: function() {
			return splitAtTopLevelOnly;
		}
	});
	function splitAtTopLevelOnly(input, separator) {
		let stack = [];
		let parts = [];
		let lastPos = 0;
		let isEscaped = false;
		for (let idx = 0; idx < input.length; idx++) {
			let char = input[idx];
			if (stack.length === 0 && char === separator[0] && !isEscaped) {
				if (separator.length === 1 || input.slice(idx, idx + separator.length) === separator) {
					parts.push(input.slice(lastPos, idx));
					lastPos = idx + separator.length;
				}
			}
			isEscaped = isEscaped ? false : char === "\\";
			if (char === "(" || char === "[" || char === "{") stack.push(char);
			else if (char === ")" && stack[stack.length - 1] === "(" || char === "]" && stack[stack.length - 1] === "[" || char === "}" && stack[stack.length - 1] === "{") stack.pop();
		}
		parts.push(input.slice(lastPos));
		return parts;
	}
}));
var require_parseBoxShadowValue = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export(exports, {
		parseBoxShadowValue: function() {
			return parseBoxShadowValue;
		},
		formatBoxShadowValue: function() {
			return formatBoxShadowValue;
		}
	});
	const _splitAtTopLevelOnly = require_splitAtTopLevelOnly();
	let KEYWORDS = new Set([
		"inset",
		"inherit",
		"initial",
		"revert",
		"unset"
	]);
	let SPACE = /\ +(?![^(]*\))/g;
	let LENGTH = /^-?(\d+|\.\d+)(.*?)$/g;
	function parseBoxShadowValue(input) {
		return (0, _splitAtTopLevelOnly.splitAtTopLevelOnly)(input, ",").map((shadow) => {
			let value = shadow.trim();
			let result = { raw: value };
			let parts = value.split(SPACE);
			let seen = /* @__PURE__ */ new Set();
			for (let part of parts) {
				LENGTH.lastIndex = 0;
				if (!seen.has("KEYWORD") && KEYWORDS.has(part)) {
					result.keyword = part;
					seen.add("KEYWORD");
				} else if (LENGTH.test(part)) {
					if (!seen.has("X")) {
						result.x = part;
						seen.add("X");
					} else if (!seen.has("Y")) {
						result.y = part;
						seen.add("Y");
					} else if (!seen.has("BLUR")) {
						result.blur = part;
						seen.add("BLUR");
					} else if (!seen.has("SPREAD")) {
						result.spread = part;
						seen.add("SPREAD");
					}
				} else if (!result.color) result.color = part;
				else {
					if (!result.unknown) result.unknown = [];
					result.unknown.push(part);
				}
			}
			result.valid = result.x !== void 0 && result.y !== void 0;
			return result;
		});
	}
	function formatBoxShadowValue(shadows) {
		return shadows.map((shadow) => {
			if (!shadow.valid) return shadow.raw;
			return [
				shadow.keyword,
				shadow.x,
				shadow.y,
				shadow.blur,
				shadow.spread,
				shadow.color
			].filter(Boolean).join(" ");
		}).join(", ");
	}
}));
var require_dataTypes = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export(exports, {
		normalize: function() {
			return normalize;
		},
		normalizeAttributeSelectors: function() {
			return normalizeAttributeSelectors;
		},
		url: function() {
			return url;
		},
		number: function() {
			return number;
		},
		percentage: function() {
			return percentage;
		},
		length: function() {
			return length;
		},
		lineWidth: function() {
			return lineWidth;
		},
		shadow: function() {
			return shadow;
		},
		color: function() {
			return color;
		},
		image: function() {
			return image;
		},
		gradient: function() {
			return gradient;
		},
		position: function() {
			return position;
		},
		familyName: function() {
			return familyName;
		},
		genericName: function() {
			return genericName;
		},
		absoluteSize: function() {
			return absoluteSize;
		},
		relativeSize: function() {
			return relativeSize;
		}
	});
	const _color = require_color();
	const _mathoperators = require_math_operators();
	const _parseBoxShadowValue = require_parseBoxShadowValue();
	const _splitAtTopLevelOnly = require_splitAtTopLevelOnly();
	let cssFunctions = [
		"min",
		"max",
		"clamp",
		"calc"
	];
	function isCSSFunction(value) {
		return cssFunctions.some((fn) => new RegExp(`^${fn}\\(.*\\)`).test(value));
	}
	const AUTO_VAR_INJECTION_EXCEPTIONS = new Set([
		"scroll-timeline-name",
		"timeline-scope",
		"view-timeline-name",
		"font-palette",
		"anchor-name",
		"anchor-scope",
		"position-anchor",
		"position-try-options",
		"scroll-timeline",
		"animation-timeline",
		"view-timeline",
		"position-try"
	]);
	function normalize(value, context = null, isRoot = true) {
		let isVarException = context && AUTO_VAR_INJECTION_EXCEPTIONS.has(context.property);
		if (value.startsWith("--") && !isVarException) return `var(${value})`;
		if (value.includes("url(")) return value.split(/(url\(.*?\))/g).filter(Boolean).map((part) => {
			if (/^url\(.*?\)$/.test(part)) return part;
			return normalize(part, context, false);
		}).join("");
		value = value.replace(/([^\\])_+/g, (fullMatch, characterBefore) => characterBefore + " ".repeat(fullMatch.length - 1)).replace(/^_/g, " ").replace(/\\_/g, "_");
		if (isRoot) value = value.trim();
		value = (0, _mathoperators.addWhitespaceAroundMathOperators)(value);
		return value;
	}
	function normalizeAttributeSelectors(value) {
		if (value.includes("=")) value = value.replace(/(=.*)/g, (_fullMatch, match) => {
			if (match[1] === "'" || match[1] === "\"") return match;
			if (match.length > 2) {
				let trailingCharacter = match[match.length - 1];
				if (match[match.length - 2] === " " && (trailingCharacter === "i" || trailingCharacter === "I" || trailingCharacter === "s" || trailingCharacter === "S")) return `="${match.slice(1, -2)}" ${match[match.length - 1]}`;
			}
			return `="${match.slice(1)}"`;
		});
		return value;
	}
	function url(value) {
		return value.startsWith("url(");
	}
	function number(value) {
		return !isNaN(Number(value)) || isCSSFunction(value);
	}
	function percentage(value) {
		return value.endsWith("%") && number(value.slice(0, -1)) || isCSSFunction(value);
	}
	let lengthUnitsPattern = `(?:${[
		"cm",
		"mm",
		"Q",
		"in",
		"pc",
		"pt",
		"px",
		"em",
		"ex",
		"ch",
		"rem",
		"lh",
		"rlh",
		"vw",
		"vh",
		"vmin",
		"vmax",
		"vb",
		"vi",
		"svw",
		"svh",
		"lvw",
		"lvh",
		"dvw",
		"dvh",
		"cqw",
		"cqh",
		"cqi",
		"cqb",
		"cqmin",
		"cqmax"
	].join("|")})`;
	function length(value) {
		return value === "0" || new RegExp(`^[+-]?[0-9]*\.?[0-9]+(?:[eE][+-]?[0-9]+)?${lengthUnitsPattern}$`).test(value) || isCSSFunction(value);
	}
	let lineWidths = new Set([
		"thin",
		"medium",
		"thick"
	]);
	function lineWidth(value) {
		return lineWidths.has(value);
	}
	function shadow(value) {
		let parsedShadows = (0, _parseBoxShadowValue.parseBoxShadowValue)(normalize(value));
		for (let parsedShadow of parsedShadows) if (!parsedShadow.valid) return false;
		return true;
	}
	function color(value) {
		let colors = 0;
		if (!(0, _splitAtTopLevelOnly.splitAtTopLevelOnly)(value, "_").every((part) => {
			part = normalize(part);
			if (part.startsWith("var(")) return true;
			if ((0, _color.parseColor)(part, { loose: true }) !== null) return colors++, true;
			return false;
		})) return false;
		return colors > 0;
	}
	function image(value) {
		let images = 0;
		if (!(0, _splitAtTopLevelOnly.splitAtTopLevelOnly)(value, ",").every((part) => {
			part = normalize(part);
			if (part.startsWith("var(")) return true;
			if (url(part) || gradient(part) || [
				"element(",
				"image(",
				"cross-fade(",
				"image-set("
			].some((fn) => part.startsWith(fn))) {
				images++;
				return true;
			}
			return false;
		})) return false;
		return images > 0;
	}
	let gradientTypes = new Set([
		"conic-gradient",
		"linear-gradient",
		"radial-gradient",
		"repeating-conic-gradient",
		"repeating-linear-gradient",
		"repeating-radial-gradient"
	]);
	function gradient(value) {
		value = normalize(value);
		for (let type of gradientTypes) if (value.startsWith(`${type}(`)) return true;
		return false;
	}
	let validPositions = new Set([
		"center",
		"top",
		"right",
		"bottom",
		"left"
	]);
	function position(value) {
		let positions = 0;
		if (!(0, _splitAtTopLevelOnly.splitAtTopLevelOnly)(value, "_").every((part) => {
			part = normalize(part);
			if (part.startsWith("var(")) return true;
			if (validPositions.has(part) || length(part) || percentage(part)) {
				positions++;
				return true;
			}
			return false;
		})) return false;
		return positions > 0;
	}
	function familyName(value) {
		let fonts = 0;
		if (!(0, _splitAtTopLevelOnly.splitAtTopLevelOnly)(value, ",").every((part) => {
			part = normalize(part);
			if (part.startsWith("var(")) return true;
			if (part.includes(" ")) {
				if (!/(['"])([^"']+)\1/g.test(part)) return false;
			}
			if (/^\d/g.test(part)) return false;
			fonts++;
			return true;
		})) return false;
		return fonts > 0;
	}
	let genericNames = new Set([
		"serif",
		"sans-serif",
		"monospace",
		"cursive",
		"fantasy",
		"system-ui",
		"ui-serif",
		"ui-sans-serif",
		"ui-monospace",
		"ui-rounded",
		"math",
		"emoji",
		"fangsong"
	]);
	function genericName(value) {
		return genericNames.has(value);
	}
	let absoluteSizes = new Set([
		"xx-small",
		"x-small",
		"small",
		"medium",
		"large",
		"x-large",
		"xx-large",
		"xxx-large"
	]);
	function absoluteSize(value) {
		return absoluteSizes.has(value);
	}
	let relativeSizes = new Set(["larger", "smaller"]);
	function relativeSize(value) {
		return relativeSizes.has(value);
	}
}));
var require_negateValue = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "default", {
		enumerable: true,
		get: function() {
			return negateValue;
		}
	});
	function negateValue(value) {
		value = `${value}`;
		if (value === "0") return "0";
		if (/^[+-]?(\d+|\d*\.\d+)(e[+-]?\d+)?(%|\w+)?$/.test(value)) return value.replace(/^[+-]?/, (sign) => sign === "-" ? "" : "-");
		for (const fn of [
			"var",
			"calc",
			"min",
			"max",
			"clamp"
		]) if (value.includes(`${fn}(`)) return `calc(${value} * -1)`;
	}
}));
var require_validateFormalSyntax = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "backgroundSize", {
		enumerable: true,
		get: function() {
			return backgroundSize;
		}
	});
	const _dataTypes = require_dataTypes();
	const _splitAtTopLevelOnly = require_splitAtTopLevelOnly();
	function backgroundSize(value) {
		let keywordValues = ["cover", "contain"];
		return (0, _splitAtTopLevelOnly.splitAtTopLevelOnly)(value, ",").every((part) => {
			let sizes = (0, _splitAtTopLevelOnly.splitAtTopLevelOnly)(part, "_").filter(Boolean);
			if (sizes.length === 1 && keywordValues.includes(sizes[0])) return true;
			if (sizes.length !== 1 && sizes.length !== 2) return false;
			return sizes.every((size) => (0, _dataTypes.length)(size) || (0, _dataTypes.percentage)(size) || size === "auto");
		});
	}
}));
var require_log = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export(exports, {
		dim: function() {
			return dim;
		},
		default: function() {
			return _default;
		}
	});
	const _picocolors = /* @__PURE__ */ _interop_require_default(require_picocolors());
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	let alreadyShown = /* @__PURE__ */ new Set();
	function log(type, messages, key) {
		if (typeof process !== "undefined" && process.env.JEST_WORKER_ID) return;
		if (key && alreadyShown.has(key)) return;
		if (key) alreadyShown.add(key);
		console.warn("");
		messages.forEach((message) => console.warn(type, "-", message));
	}
	function dim(input) {
		return _picocolors.default.dim(input);
	}
	const _default = {
		info(key, messages) {
			log(_picocolors.default.bold(_picocolors.default.cyan("info")), ...Array.isArray(key) ? [key] : [messages, key]);
		},
		warn(key, messages) {
			log(_picocolors.default.bold(_picocolors.default.yellow("warn")), ...Array.isArray(key) ? [key] : [messages, key]);
		},
		risk(key, messages) {
			log(_picocolors.default.bold(_picocolors.default.magenta("risk")), ...Array.isArray(key) ? [key] : [messages, key]);
		}
	};
}));
var require_featureFlags = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export(exports, {
		flagEnabled: function() {
			return flagEnabled;
		},
		issueFlagNotices: function() {
			return issueFlagNotices;
		},
		default: function() {
			return _default;
		}
	});
	const _picocolors = /* @__PURE__ */ _interop_require_default(require_picocolors());
	const _log = /* @__PURE__ */ _interop_require_default(require_log());
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	let defaults = {
		optimizeUniversalDefaults: false,
		generalizedModifiers: true,
		disableColorOpacityUtilitiesByDefault: false,
		relativeContentPathsByDefault: false
	};
	let featureFlags = {
		future: [
			"hoverOnlyWhenSupported",
			"respectDefaultRingColorOpacity",
			"disableColorOpacityUtilitiesByDefault",
			"relativeContentPathsByDefault"
		],
		experimental: ["optimizeUniversalDefaults", "generalizedModifiers"]
	};
	function flagEnabled(config, flag) {
		if (featureFlags.future.includes(flag)) {
			var _config_future;
			var _config_future_flag, _ref;
			return config.future === "all" || ((_ref = (_config_future_flag = config === null || config === void 0 ? void 0 : (_config_future = config.future) === null || _config_future === void 0 ? void 0 : _config_future[flag]) !== null && _config_future_flag !== void 0 ? _config_future_flag : defaults[flag]) !== null && _ref !== void 0 ? _ref : false);
		}
		if (featureFlags.experimental.includes(flag)) {
			var _config_experimental;
			var _config_experimental_flag, _ref1;
			return config.experimental === "all" || ((_ref1 = (_config_experimental_flag = config === null || config === void 0 ? void 0 : (_config_experimental = config.experimental) === null || _config_experimental === void 0 ? void 0 : _config_experimental[flag]) !== null && _config_experimental_flag !== void 0 ? _config_experimental_flag : defaults[flag]) !== null && _ref1 !== void 0 ? _ref1 : false);
		}
		return false;
	}
	function experimentalFlagsEnabled(config) {
		if (config.experimental === "all") return featureFlags.experimental;
		var _config_experimental;
		return Object.keys((_config_experimental = config === null || config === void 0 ? void 0 : config.experimental) !== null && _config_experimental !== void 0 ? _config_experimental : {}).filter((flag) => featureFlags.experimental.includes(flag) && config.experimental[flag]);
	}
	function issueFlagNotices(config) {
		if (process.env.JEST_WORKER_ID !== void 0) return;
		if (experimentalFlagsEnabled(config).length > 0) {
			let changes = experimentalFlagsEnabled(config).map((s) => _picocolors.default.yellow(s)).join(", ");
			_log.default.warn("experimental-flags-enabled", [`You have enabled experimental features: ${changes}`, "Experimental features in Tailwind CSS are not covered by semver, may introduce breaking changes, and can change at any time."]);
		}
	}
	const _default = featureFlags;
}));
var require_pluginUtils = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export(exports, {
		updateAllClasses: function() {
			return updateAllClasses;
		},
		asValue: function() {
			return asValue;
		},
		parseColorFormat: function() {
			return parseColorFormat;
		},
		asColor: function() {
			return asColor;
		},
		asLookupValue: function() {
			return asLookupValue;
		},
		typeMap: function() {
			return typeMap;
		},
		coerceValue: function() {
			return coerceValue;
		},
		getMatchingTypes: function() {
			return getMatchingTypes;
		}
	});
	const _escapeCommas = /* @__PURE__ */ _interop_require_default(require_escapeCommas());
	const _withAlphaVariable = require_withAlphaVariable();
	const _dataTypes = require_dataTypes();
	const _negateValue = /* @__PURE__ */ _interop_require_default(require_negateValue());
	const _validateFormalSyntax = require_validateFormalSyntax();
	const _featureFlags = require_featureFlags();
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function updateAllClasses(selectors, updateClass) {
		selectors.walkClasses((sel) => {
			sel.value = updateClass(sel.value);
			if (sel.raws && sel.raws.value) sel.raws.value = (0, _escapeCommas.default)(sel.raws.value);
		});
	}
	function resolveArbitraryValue(modifier, validate) {
		if (!isArbitraryValue(modifier)) return;
		let value = modifier.slice(1, -1);
		if (!validate(value)) return;
		return (0, _dataTypes.normalize)(value);
	}
	function asNegativeValue(modifier, lookup = {}, validate) {
		let positiveValue = lookup[modifier];
		if (positiveValue !== void 0) return (0, _negateValue.default)(positiveValue);
		if (isArbitraryValue(modifier)) {
			let resolved = resolveArbitraryValue(modifier, validate);
			if (resolved === void 0) return;
			return (0, _negateValue.default)(resolved);
		}
	}
	function asValue(modifier, options = {}, { validate = () => true } = {}) {
		var _options_values;
		let value = (_options_values = options.values) === null || _options_values === void 0 ? void 0 : _options_values[modifier];
		if (value !== void 0) return value;
		if (options.supportsNegativeValues && modifier.startsWith("-")) return asNegativeValue(modifier.slice(1), options.values, validate);
		return resolveArbitraryValue(modifier, validate);
	}
	function isArbitraryValue(input) {
		return input.startsWith("[") && input.endsWith("]");
	}
	function splitUtilityModifier(modifier) {
		let slashIdx = modifier.lastIndexOf("/");
		let arbitraryStartIdx = modifier.lastIndexOf("[", slashIdx);
		let arbitraryEndIdx = modifier.indexOf("]", slashIdx);
		if (!(modifier[slashIdx - 1] === "]" || modifier[slashIdx + 1] === "[")) {
			if (arbitraryStartIdx !== -1 && arbitraryEndIdx !== -1) {
				if (arbitraryStartIdx < slashIdx && slashIdx < arbitraryEndIdx) slashIdx = modifier.lastIndexOf("/", arbitraryStartIdx);
			}
		}
		if (slashIdx === -1 || slashIdx === modifier.length - 1) return [modifier, void 0];
		if (isArbitraryValue(modifier) && !modifier.includes("]/[")) return [modifier, void 0];
		return [modifier.slice(0, slashIdx), modifier.slice(slashIdx + 1)];
	}
	function parseColorFormat(value) {
		if (typeof value === "string" && value.includes("<alpha-value>")) {
			let oldValue = value;
			return ({ opacityValue = 1 }) => oldValue.replace(/<alpha-value>/g, opacityValue);
		}
		return value;
	}
	function unwrapArbitraryModifier(modifier) {
		return (0, _dataTypes.normalize)(modifier.slice(1, -1));
	}
	function asColor(modifier, options = {}, { tailwindConfig = {} } = {}) {
		var _options_values;
		if (((_options_values = options.values) === null || _options_values === void 0 ? void 0 : _options_values[modifier]) !== void 0) {
			var _options_values1;
			return parseColorFormat((_options_values1 = options.values) === null || _options_values1 === void 0 ? void 0 : _options_values1[modifier]);
		}
		let [color, alpha] = splitUtilityModifier(modifier);
		if (alpha !== void 0) {
			var _options_values2, _tailwindConfig_theme, _tailwindConfig_theme_opacity;
			var _options_values_color;
			let normalizedColor = (_options_values_color = (_options_values2 = options.values) === null || _options_values2 === void 0 ? void 0 : _options_values2[color]) !== null && _options_values_color !== void 0 ? _options_values_color : isArbitraryValue(color) ? color.slice(1, -1) : void 0;
			if (normalizedColor === void 0) return;
			normalizedColor = parseColorFormat(normalizedColor);
			if (isArbitraryValue(alpha)) return (0, _withAlphaVariable.withAlphaValue)(normalizedColor, unwrapArbitraryModifier(alpha));
			if (((_tailwindConfig_theme = tailwindConfig.theme) === null || _tailwindConfig_theme === void 0 ? void 0 : (_tailwindConfig_theme_opacity = _tailwindConfig_theme.opacity) === null || _tailwindConfig_theme_opacity === void 0 ? void 0 : _tailwindConfig_theme_opacity[alpha]) === void 0) return;
			return (0, _withAlphaVariable.withAlphaValue)(normalizedColor, tailwindConfig.theme.opacity[alpha]);
		}
		return asValue(modifier, options, { validate: _dataTypes.color });
	}
	function asLookupValue(modifier, options = {}) {
		var _options_values;
		return (_options_values = options.values) === null || _options_values === void 0 ? void 0 : _options_values[modifier];
	}
	function guess(validate) {
		return (modifier, options) => {
			return asValue(modifier, options, { validate });
		};
	}
	let typeMap = {
		any: asValue,
		color: asColor,
		url: guess(_dataTypes.url),
		image: guess(_dataTypes.image),
		length: guess(_dataTypes.length),
		percentage: guess(_dataTypes.percentage),
		position: guess(_dataTypes.position),
		lookup: asLookupValue,
		"generic-name": guess(_dataTypes.genericName),
		"family-name": guess(_dataTypes.familyName),
		number: guess(_dataTypes.number),
		"line-width": guess(_dataTypes.lineWidth),
		"absolute-size": guess(_dataTypes.absoluteSize),
		"relative-size": guess(_dataTypes.relativeSize),
		shadow: guess(_dataTypes.shadow),
		size: guess(_validateFormalSyntax.backgroundSize)
	};
	let supportedTypes = Object.keys(typeMap);
	function splitAtFirst(input, delim) {
		let idx = input.indexOf(delim);
		if (idx === -1) return [void 0, input];
		return [input.slice(0, idx), input.slice(idx + 1)];
	}
	function coerceValue(types, modifier, options, tailwindConfig) {
		if (options.values && modifier in options.values) for (let { type } of types !== null && types !== void 0 ? types : []) {
			let result = typeMap[type](modifier, options, { tailwindConfig });
			if (result === void 0) continue;
			return [
				result,
				type,
				null
			];
		}
		if (isArbitraryValue(modifier)) {
			let arbitraryValue = modifier.slice(1, -1);
			let [explicitType, value] = splitAtFirst(arbitraryValue, ":");
			if (!/^[\w-_]+$/g.test(explicitType)) value = arbitraryValue;
			else if (explicitType !== void 0 && !supportedTypes.includes(explicitType)) return [];
			if (value.length > 0 && supportedTypes.includes(explicitType)) return [
				asValue(`[${value}]`, options),
				explicitType,
				null
			];
		}
		let matches = getMatchingTypes(types, modifier, options, tailwindConfig);
		for (let match of matches) return match;
		return [];
	}
	function* getMatchingTypes(types, rawModifier, options, tailwindConfig) {
		let modifiersEnabled = (0, _featureFlags.flagEnabled)(tailwindConfig, "generalizedModifiers");
		let [modifier, utilityModifier] = splitUtilityModifier(rawModifier);
		if (!(modifiersEnabled && options.modifiers != null && (options.modifiers === "any" || typeof options.modifiers === "object" && (utilityModifier && isArbitraryValue(utilityModifier) || utilityModifier in options.modifiers)))) {
			modifier = rawModifier;
			utilityModifier = void 0;
		}
		if (utilityModifier !== void 0 && modifier === "") modifier = "DEFAULT";
		if (utilityModifier !== void 0) {
			if (typeof options.modifiers === "object") {
				var _options_modifiers;
				var _options_modifiers_utilityModifier;
				let configValue = (_options_modifiers_utilityModifier = (_options_modifiers = options.modifiers) === null || _options_modifiers === void 0 ? void 0 : _options_modifiers[utilityModifier]) !== null && _options_modifiers_utilityModifier !== void 0 ? _options_modifiers_utilityModifier : null;
				if (configValue !== null) utilityModifier = configValue;
				else if (isArbitraryValue(utilityModifier)) utilityModifier = unwrapArbitraryModifier(utilityModifier);
			}
		}
		for (let { type } of types !== null && types !== void 0 ? types : []) {
			let result = typeMap[type](modifier, options, { tailwindConfig });
			if (result === void 0) continue;
			yield [
				result,
				type,
				utilityModifier !== null && utilityModifier !== void 0 ? utilityModifier : null
			];
		}
	}
}));
var require_sharedState = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export(exports, {
		env: function() {
			return env;
		},
		contextMap: function() {
			return contextMap;
		},
		configContextMap: function() {
			return configContextMap;
		},
		contextSourcesMap: function() {
			return contextSourcesMap;
		},
		sourceHashMap: function() {
			return sourceHashMap;
		},
		NOT_ON_DEMAND: function() {
			return NOT_ON_DEMAND;
		},
		NONE: function() {
			return NONE;
		},
		resolveDebug: function() {
			return resolveDebug;
		}
	});
	const env = typeof process !== "undefined" ? {
		NODE_ENV: process.env.NODE_ENV,
		DEBUG: resolveDebug(process.env.DEBUG)
	} : {
		NODE_ENV: "production",
		DEBUG: false
	};
	const contextMap = /* @__PURE__ */ new Map();
	const configContextMap = /* @__PURE__ */ new Map();
	const contextSourcesMap = /* @__PURE__ */ new Map();
	const sourceHashMap = /* @__PURE__ */ new Map();
	const NOT_ON_DEMAND = /* @__PURE__ */ new String("*");
	const NONE = Symbol("__NONE__");
	function resolveDebug(debug) {
		if (debug === void 0) return false;
		if (debug === "true" || debug === "1") return true;
		if (debug === "false" || debug === "0") return false;
		if (debug === "*") return true;
		let debuggers = debug.split(",").map((d) => d.split(":")[0]);
		if (debuggers.includes("-tailwindcss")) return false;
		if (debuggers.includes("tailwindcss")) return true;
		return false;
	}
}));
var require_escapeClassName = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "default", {
		enumerable: true,
		get: function() {
			return escapeClassName;
		}
	});
	const _postcssselectorparser = /* @__PURE__ */ _interop_require_default(require_dist());
	const _escapeCommas = /* @__PURE__ */ _interop_require_default(require_escapeCommas());
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function escapeClassName(className) {
		var _node_raws;
		let node = _postcssselectorparser.default.className();
		node.value = className;
		var _node_raws_value;
		return (0, _escapeCommas.default)((_node_raws_value = node === null || node === void 0 ? void 0 : (_node_raws = node.raws) === null || _node_raws === void 0 ? void 0 : _node_raws.value) !== null && _node_raws_value !== void 0 ? _node_raws_value : node.value);
	}
}));
var require_pseudoElements = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "movePseudos", {
		enumerable: true,
		get: function() {
			return movePseudos;
		}
	});
	let elementProperties = {
		"::after": ["terminal", "jumpable"],
		"::backdrop": ["terminal", "jumpable"],
		"::before": ["terminal", "jumpable"],
		"::cue": ["terminal"],
		"::cue-region": ["terminal"],
		"::first-letter": ["terminal", "jumpable"],
		"::first-line": ["terminal", "jumpable"],
		"::grammar-error": ["terminal"],
		"::marker": ["terminal", "jumpable"],
		"::part": ["terminal", "actionable"],
		"::placeholder": ["terminal", "jumpable"],
		"::selection": ["terminal", "jumpable"],
		"::slotted": ["terminal"],
		"::spelling-error": ["terminal"],
		"::target-text": ["terminal"],
		"::file-selector-button": ["terminal", "actionable"],
		"::deep": ["actionable"],
		"::v-deep": ["actionable"],
		"::ng-deep": ["actionable"],
		":after": ["terminal", "jumpable"],
		":before": ["terminal", "jumpable"],
		":first-letter": ["terminal", "jumpable"],
		":first-line": ["terminal", "jumpable"],
		":where": [],
		":is": [],
		":has": [],
		__default__: ["terminal", "actionable"]
	};
	function movePseudos(sel) {
		let [pseudos] = movablePseudos(sel);
		pseudos.forEach(([sel, pseudo]) => sel.removeChild(pseudo));
		sel.nodes.push(...pseudos.map(([, pseudo]) => pseudo));
		return sel;
	}
	function movablePseudos(sel) {
		let buffer = [];
		let lastSeenElement = null;
		for (let node of sel.nodes) if (node.type === "combinator") {
			buffer = buffer.filter(([, node]) => propertiesForPseudo(node).includes("jumpable"));
			lastSeenElement = null;
		} else if (node.type === "pseudo") {
			if (isMovablePseudoElement(node)) {
				lastSeenElement = node;
				buffer.push([
					sel,
					node,
					null
				]);
			} else if (lastSeenElement && isAttachablePseudoClass(node, lastSeenElement)) buffer.push([
				sel,
				node,
				lastSeenElement
			]);
			else lastSeenElement = null;
			var _node_nodes;
			for (let sub of (_node_nodes = node.nodes) !== null && _node_nodes !== void 0 ? _node_nodes : []) {
				let [movable, lastSeenElementInSub] = movablePseudos(sub);
				lastSeenElement = lastSeenElementInSub || lastSeenElement;
				buffer.push(...movable);
			}
		}
		return [buffer, lastSeenElement];
	}
	function isPseudoElement(node) {
		return node.value.startsWith("::") || elementProperties[node.value] !== void 0;
	}
	function isMovablePseudoElement(node) {
		return isPseudoElement(node) && propertiesForPseudo(node).includes("terminal");
	}
	function isAttachablePseudoClass(node, pseudo) {
		if (node.type !== "pseudo") return false;
		if (isPseudoElement(node)) return false;
		return propertiesForPseudo(pseudo).includes("actionable");
	}
	function propertiesForPseudo(pseudo) {
		var _elementProperties_pseudo_value;
		return (_elementProperties_pseudo_value = elementProperties[pseudo.value]) !== null && _elementProperties_pseudo_value !== void 0 ? _elementProperties_pseudo_value : elementProperties.__default__;
	}
}));
var require_formatVariantSelector = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export(exports, {
		formatVariantSelector: function() {
			return formatVariantSelector;
		},
		eliminateIrrelevantSelectors: function() {
			return eliminateIrrelevantSelectors;
		},
		finalizeSelector: function() {
			return finalizeSelector;
		},
		handleMergePseudo: function() {
			return handleMergePseudo;
		}
	});
	const _postcssselectorparser = /* @__PURE__ */ _interop_require_default(require_dist());
	const _unesc = /* @__PURE__ */ _interop_require_default(require_unesc());
	const _escapeClassName = /* @__PURE__ */ _interop_require_default(require_escapeClassName());
	const _prefixSelector = /* @__PURE__ */ _interop_require_default(require_prefixSelector());
	const _pseudoElements = require_pseudoElements();
	const _splitAtTopLevelOnly = require_splitAtTopLevelOnly();
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	let MERGE = ":merge";
	function formatVariantSelector(formats, { context, candidate }) {
		var _context_tailwindConfig_prefix;
		let prefix = (_context_tailwindConfig_prefix = context === null || context === void 0 ? void 0 : context.tailwindConfig.prefix) !== null && _context_tailwindConfig_prefix !== void 0 ? _context_tailwindConfig_prefix : "";
		let parsedFormats = formats.map((format) => {
			let ast = (0, _postcssselectorparser.default)().astSync(format.format);
			return {
				...format,
				ast: format.respectPrefix ? (0, _prefixSelector.default)(prefix, ast) : ast
			};
		});
		let formatAst = _postcssselectorparser.default.root({ nodes: [_postcssselectorparser.default.selector({ nodes: [_postcssselectorparser.default.className({ value: (0, _escapeClassName.default)(candidate) })] })] });
		for (let { ast } of parsedFormats) {
			[formatAst, ast] = handleMergePseudo(formatAst, ast);
			ast.walkNesting((nesting) => nesting.replaceWith(...formatAst.nodes[0].nodes));
			formatAst = ast;
		}
		return formatAst;
	}
	function simpleSelectorForNode(node) {
		let nodes = [];
		while (node.prev() && node.prev().type !== "combinator") node = node.prev();
		while (node && node.type !== "combinator") {
			nodes.push(node);
			node = node.next();
		}
		return nodes;
	}
	function resortSelector(sel) {
		sel.sort((a, b) => {
			if (a.type === "tag" && b.type === "class") return -1;
			else if (a.type === "class" && b.type === "tag") return 1;
			else if (a.type === "class" && b.type === "pseudo" && b.value.startsWith("::")) return -1;
			else if (a.type === "pseudo" && a.value.startsWith("::") && b.type === "class") return 1;
			return sel.index(a) - sel.index(b);
		});
		return sel;
	}
	function eliminateIrrelevantSelectors(sel, base) {
		let hasClassesMatchingCandidate = false;
		sel.walk((child) => {
			if (child.type === "class" && child.value === base) {
				hasClassesMatchingCandidate = true;
				return false;
			}
		});
		if (!hasClassesMatchingCandidate) sel.remove();
	}
	function finalizeSelector(current, formats, { context, candidate, base }) {
		var _context_tailwindConfig;
		var _context_tailwindConfig_separator;
		let separator = (_context_tailwindConfig_separator = context === null || context === void 0 ? void 0 : (_context_tailwindConfig = context.tailwindConfig) === null || _context_tailwindConfig === void 0 ? void 0 : _context_tailwindConfig.separator) !== null && _context_tailwindConfig_separator !== void 0 ? _context_tailwindConfig_separator : ":";
		base = base !== null && base !== void 0 ? base : (0, _splitAtTopLevelOnly.splitAtTopLevelOnly)(candidate, separator).pop();
		let selector = (0, _postcssselectorparser.default)().astSync(current);
		selector.walkClasses((node) => {
			if (node.raws && node.value.includes(base)) node.raws.value = (0, _escapeClassName.default)((0, _unesc.default)(node.raws.value));
		});
		selector.each((sel) => eliminateIrrelevantSelectors(sel, base));
		if (selector.length === 0) return null;
		let formatAst = Array.isArray(formats) ? formatVariantSelector(formats, {
			context,
			candidate
		}) : formats;
		if (formatAst === null) return selector.toString();
		let simpleStart = _postcssselectorparser.default.comment({ value: "/*__simple__*/" });
		let simpleEnd = _postcssselectorparser.default.comment({ value: "/*__simple__*/" });
		selector.walkClasses((node) => {
			if (node.value !== base) return;
			let parent = node.parent;
			let formatNodes = formatAst.nodes[0].nodes;
			if (parent.nodes.length === 1) {
				node.replaceWith(...formatNodes);
				return;
			}
			let simpleSelector = simpleSelectorForNode(node);
			parent.insertBefore(simpleSelector[0], simpleStart);
			parent.insertAfter(simpleSelector[simpleSelector.length - 1], simpleEnd);
			for (let child of formatNodes) parent.insertBefore(simpleSelector[0], child.clone());
			node.remove();
			simpleSelector = simpleSelectorForNode(simpleStart);
			let firstNode = parent.index(simpleStart);
			parent.nodes.splice(firstNode, simpleSelector.length, ...resortSelector(_postcssselectorparser.default.selector({ nodes: simpleSelector })).nodes);
			simpleStart.remove();
			simpleEnd.remove();
		});
		selector.walkPseudos((p) => {
			if (p.value === MERGE) p.replaceWith(p.nodes);
		});
		selector.each((sel) => (0, _pseudoElements.movePseudos)(sel));
		return selector.toString();
	}
	function handleMergePseudo(selector, format) {
		let merges = [];
		selector.walkPseudos((pseudo) => {
			if (pseudo.value === MERGE) merges.push({
				pseudo,
				value: pseudo.nodes[0].toString()
			});
		});
		format.walkPseudos((pseudo) => {
			if (pseudo.value !== MERGE) return;
			let value = pseudo.nodes[0].toString();
			let existing = merges.find((merge) => merge.value === value);
			if (!existing) return;
			let attachments = [];
			let next = pseudo.next();
			while (next && next.type !== "combinator") {
				attachments.push(next);
				next = next.next();
			}
			let combinator = next;
			existing.pseudo.parent.insertAfter(existing.pseudo, _postcssselectorparser.default.selector({ nodes: attachments.map((node) => node.clone()) }));
			pseudo.remove();
			attachments.forEach((node) => node.remove());
			if (combinator && combinator.type === "combinator") combinator.remove();
		});
		return [selector, format];
	}
}));
var require_nameClass = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export(exports, {
		asClass: function() {
			return asClass;
		},
		default: function() {
			return nameClass;
		},
		formatClass: function() {
			return formatClass;
		}
	});
	const _escapeClassName = /* @__PURE__ */ _interop_require_default(require_escapeClassName());
	const _escapeCommas = /* @__PURE__ */ _interop_require_default(require_escapeCommas());
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function asClass(name) {
		return (0, _escapeCommas.default)(`.${(0, _escapeClassName.default)(name)}`);
	}
	function nameClass(classPrefix, key) {
		return asClass(formatClass(classPrefix, key));
	}
	function formatClass(classPrefix, key) {
		if (key === "DEFAULT") return classPrefix;
		if (key === "-" || key === "-DEFAULT") return `-${classPrefix}`;
		if (key.startsWith("-")) return `-${classPrefix}${key}`;
		if (key.startsWith("/")) return `${classPrefix}${key}`;
		return `${classPrefix}-${key}`;
	}
}));
var require_dlv = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(t, e, l, n, o) {
		for (e = e.split ? e.split(".") : e, n = 0; n < e.length; n++) t = t ? t[e[n]] : o;
		return t === o ? l : t;
	};
}));
var require_transformThemeValue = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "default", {
		enumerable: true,
		get: function() {
			return transformThemeValue;
		}
	});
	const _postcss = /* @__PURE__ */ _interop_require_default(require_postcss());
	const _isPlainObject = /* @__PURE__ */ _interop_require_default(require_isPlainObject());
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function transformThemeValue(themeSection) {
		if (["fontSize", "outline"].includes(themeSection)) return (value) => {
			if (typeof value === "function") value = value({});
			if (Array.isArray(value)) value = value[0];
			return value;
		};
		if (themeSection === "fontFamily") return (value) => {
			if (typeof value === "function") value = value({});
			let families = Array.isArray(value) && (0, _isPlainObject.default)(value[1]) ? value[0] : value;
			return Array.isArray(families) ? families.join(", ") : families;
		};
		if ([
			"boxShadow",
			"transitionProperty",
			"transitionDuration",
			"transitionDelay",
			"transitionTimingFunction",
			"backgroundImage",
			"backgroundSize",
			"backgroundColor",
			"cursor",
			"animation"
		].includes(themeSection)) return (value) => {
			if (typeof value === "function") value = value({});
			if (Array.isArray(value)) value = value.join(", ");
			return value;
		};
		if ([
			"gridTemplateColumns",
			"gridTemplateRows",
			"objectPosition"
		].includes(themeSection)) return (value) => {
			if (typeof value === "function") value = value({});
			if (typeof value === "string") value = _postcss.default.list.comma(value).join(" ");
			return value;
		};
		return (value, opts = {}) => {
			if (typeof value === "function") value = value(opts);
			return value;
		};
	}
}));
var require_createUtilityPlugin = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "default", {
		enumerable: true,
		get: function() {
			return createUtilityPlugin;
		}
	});
	const _transformThemeValue = /* @__PURE__ */ _interop_require_default(require_transformThemeValue());
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function createUtilityPlugin(themeKey, utilityVariations = [[themeKey, [themeKey]]], { filterDefault = false, ...options } = {}) {
		let transformValue = (0, _transformThemeValue.default)(themeKey);
		return function({ matchUtilities, theme }) {
			for (let utilityVariation of utilityVariations) {
				let group = Array.isArray(utilityVariation[0]) ? utilityVariation : [utilityVariation];
				var _theme;
				matchUtilities(group.reduce((obj, [classPrefix, properties]) => {
					return Object.assign(obj, { [classPrefix]: (value) => {
						return properties.reduce((obj, name) => {
							if (Array.isArray(name)) return Object.assign(obj, { [name[0]]: name[1] });
							return Object.assign(obj, { [name]: transformValue(value) });
						}, {});
					} });
				}, {}), {
					...options,
					values: filterDefault ? Object.fromEntries(Object.entries((_theme = theme(themeKey)) !== null && _theme !== void 0 ? _theme : {}).filter(([modifier]) => modifier !== "DEFAULT")) : theme(themeKey)
				});
			}
		};
	}
}));
var require_buildMediaQuery = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "default", {
		enumerable: true,
		get: function() {
			return buildMediaQuery;
		}
	});
	function buildMediaQuery(screens) {
		screens = Array.isArray(screens) ? screens : [screens];
		return screens.map((screen) => {
			let values = screen.values.map((screen) => {
				if (screen.raw !== void 0) return screen.raw;
				return [screen.min && `(min-width: ${screen.min})`, screen.max && `(max-width: ${screen.max})`].filter(Boolean).join(" and ");
			});
			return screen.not ? `not all and ${values}` : values;
		}).join(", ");
	}
}));
var require_parseAnimationValue = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "default", {
		enumerable: true,
		get: function() {
			return parseAnimationValue;
		}
	});
	const DIRECTIONS = new Set([
		"normal",
		"reverse",
		"alternate",
		"alternate-reverse"
	]);
	const PLAY_STATES = new Set(["running", "paused"]);
	const FILL_MODES = new Set([
		"none",
		"forwards",
		"backwards",
		"both"
	]);
	const ITERATION_COUNTS = new Set(["infinite"]);
	const TIMINGS = new Set([
		"linear",
		"ease",
		"ease-in",
		"ease-out",
		"ease-in-out",
		"step-start",
		"step-end"
	]);
	const TIMING_FNS = ["cubic-bezier", "steps"];
	const COMMA = /\,(?![^(]*\))/g;
	const SPACE = /\ +(?![^(]*\))/g;
	const TIME = /^(-?[\d.]+m?s)$/;
	const DIGIT = /^(\d+)$/;
	function parseAnimationValue(input) {
		return input.split(COMMA).map((animation) => {
			let value = animation.trim();
			let result = { value };
			let parts = value.split(SPACE);
			let seen = /* @__PURE__ */ new Set();
			for (let part of parts) if (!seen.has("DIRECTIONS") && DIRECTIONS.has(part)) {
				result.direction = part;
				seen.add("DIRECTIONS");
			} else if (!seen.has("PLAY_STATES") && PLAY_STATES.has(part)) {
				result.playState = part;
				seen.add("PLAY_STATES");
			} else if (!seen.has("FILL_MODES") && FILL_MODES.has(part)) {
				result.fillMode = part;
				seen.add("FILL_MODES");
			} else if (!seen.has("ITERATION_COUNTS") && (ITERATION_COUNTS.has(part) || DIGIT.test(part))) {
				result.iterationCount = part;
				seen.add("ITERATION_COUNTS");
			} else if (!seen.has("TIMING_FUNCTION") && TIMINGS.has(part)) {
				result.timingFunction = part;
				seen.add("TIMING_FUNCTION");
			} else if (!seen.has("TIMING_FUNCTION") && TIMING_FNS.some((f) => part.startsWith(`${f}(`))) {
				result.timingFunction = part;
				seen.add("TIMING_FUNCTION");
			} else if (!seen.has("DURATION") && TIME.test(part)) {
				result.duration = part;
				seen.add("DURATION");
			} else if (!seen.has("DELAY") && TIME.test(part)) {
				result.delay = part;
				seen.add("DELAY");
			} else if (!seen.has("NAME")) {
				result.name = part;
				seen.add("NAME");
			} else {
				if (!result.unknown) result.unknown = [];
				result.unknown.push(part);
			}
			return result;
		});
	}
}));
var require_flattenColorPalette = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "default", {
		enumerable: true,
		get: function() {
			return _default;
		}
	});
	const flattenColorPalette = (colors) => Object.assign({}, ...Object.entries(colors !== null && colors !== void 0 ? colors : {}).flatMap(([color, values]) => typeof values == "object" ? Object.entries(flattenColorPalette(values)).map(([number, hex]) => ({ [color + (number === "DEFAULT" ? "" : `-${number}`)]: hex })) : [{ [`${color}`]: values }]));
	const _default = flattenColorPalette;
}));
var require_toColorValue = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "default", {
		enumerable: true,
		get: function() {
			return toColorValue;
		}
	});
	function toColorValue(maybeFunction) {
		return typeof maybeFunction === "function" ? maybeFunction({}) : maybeFunction;
	}
}));
var require_package = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		"name": "tailwindcss",
		"version": "3.4.19",
		"description": "A utility-first CSS framework for rapidly building custom user interfaces.",
		"license": "MIT",
		"main": "lib/index.js",
		"types": "types/index.d.ts",
		"repository": {
			"type": "git",
			"url": "https://github.com/tailwindlabs/tailwindcss.git#v3"
		},
		"bugs": "https://github.com/tailwindlabs/tailwindcss/issues",
		"homepage": "https://tailwindcss.com",
		"bin": {
			"tailwind": "lib/cli.js",
			"tailwindcss": "lib/cli.js"
		},
		"scripts": {
			"prebuild": "npm run generate && rimraf lib",
			"build": "swc src --out-dir lib --copy-files",
			"postbuild": "esbuild lib/cli-peer-dependencies.js --bundle --platform=node --outfile=peers/index.js --define:process.env.CSS_TRANSFORMER_WASM=false",
			"rebuild-fixtures": "npm run build && node -r @swc/register scripts/rebuildFixtures.js",
			"style": "eslint .",
			"pretest": "npm run generate",
			"test": "jest",
			"test:integrations": "npm run test --prefix ./integrations",
			"install:integrations": "node scripts/install-integrations.js",
			"generate:plugin-list": "node -r @swc/register scripts/create-plugin-list.js",
			"generate:types": "node -r @swc/register scripts/generate-types.js",
			"generate": "npm run generate:plugin-list && npm run generate:types",
			"release-channel": "node ./scripts/release-channel.js",
			"release-notes": "node ./scripts/release-notes.js",
			"prepublishOnly": "npm install --force && npm run build"
		},
		"publishConfig": { "provenance": true },
		"files": [
			"src/*",
			"cli/*",
			"lib/*",
			"peers/*",
			"scripts/*.js",
			"stubs/*",
			"nesting/*",
			"types/**/*",
			"*.d.ts",
			"*.css",
			"*.js"
		],
		"devDependencies": {
			"@swc/cli": "0.1.62",
			"@swc/core": "1.3.55",
			"@swc/jest": "0.2.26",
			"@swc/register": "0.1.10",
			"autoprefixer": "^10.4.20",
			"browserslist": "^4.24.0",
			"concurrently": "^8.2.2",
			"cssnano": "^6.1.2",
			"esbuild": "^0.24.0",
			"eslint": "^8.57.1",
			"eslint-config-prettier": "^8.10.0",
			"eslint-plugin-prettier": "^4.2.1",
			"jest": "^29.7.0",
			"jest-diff": "^29.7.0",
			"lightningcss": "1.27.0",
			"prettier": "^2.8.8",
			"rimraf": "^5.0.10",
			"source-map-js": "^1.2.1",
			"turbo": "^1.13.4"
		},
		"dependencies": {
			"@alloc/quick-lru": "^5.2.0",
			"arg": "^5.0.2",
			"chokidar": "^3.6.0",
			"didyoumean": "^1.2.2",
			"dlv": "^1.1.3",
			"fast-glob": "^3.3.2",
			"glob-parent": "^6.0.2",
			"is-glob": "^4.0.3",
			"jiti": "^1.21.7",
			"lilconfig": "^3.1.3",
			"micromatch": "^4.0.8",
			"normalize-path": "^3.0.0",
			"object-hash": "^3.0.0",
			"picocolors": "^1.1.1",
			"postcss": "^8.4.47",
			"postcss-import": "^15.1.0",
			"postcss-js": "^4.0.1",
			"postcss-load-config": "^4.0.2 || ^5.0 || ^6.0",
			"postcss-nested": "^6.2.0",
			"postcss-selector-parser": "^6.1.2",
			"resolve": "^1.22.8",
			"sucrase": "^3.35.0"
		},
		"browserslist": [
			"> 1%",
			"not edge <= 18",
			"not ie 11",
			"not op_mini all"
		],
		"jest": {
			"testTimeout": 3e4,
			"setupFilesAfterEnv": ["<rootDir>/jest/customMatchers.js"],
			"testPathIgnorePatterns": [
				"/node_modules/",
				"/integrations/",
				"/standalone-cli/",
				"\\.test\\.skip\\.js$"
			],
			"transformIgnorePatterns": ["node_modules/(?!lightningcss)"],
			"transform": {
				"\\.js$": "@swc/jest",
				"\\.ts$": "@swc/jest"
			}
		},
		"engines": { "node": ">=14.0.0" }
	};
}));
var require_normalizeScreens = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export(exports, {
		normalizeScreens: function() {
			return normalizeScreens;
		},
		isScreenSortable: function() {
			return isScreenSortable;
		},
		compareScreens: function() {
			return compareScreens;
		},
		toScreen: function() {
			return toScreen;
		}
	});
	function normalizeScreens(screens, root = true) {
		if (Array.isArray(screens)) return screens.map((screen) => {
			if (root && Array.isArray(screen)) throw new Error("The tuple syntax is not supported for `screens`.");
			if (typeof screen === "string") return {
				name: screen.toString(),
				not: false,
				values: [{
					min: screen,
					max: void 0
				}]
			};
			let [name, options] = screen;
			name = name.toString();
			if (typeof options === "string") return {
				name,
				not: false,
				values: [{
					min: options,
					max: void 0
				}]
			};
			if (Array.isArray(options)) return {
				name,
				not: false,
				values: options.map((option) => resolveValue(option))
			};
			return {
				name,
				not: false,
				values: [resolveValue(options)]
			};
		});
		return normalizeScreens(Object.entries(screens !== null && screens !== void 0 ? screens : {}), false);
	}
	function isScreenSortable(screen) {
		if (screen.values.length !== 1) return {
			result: false,
			reason: "multiple-values"
		};
		else if (screen.values[0].raw !== void 0) return {
			result: false,
			reason: "raw-values"
		};
		else if (screen.values[0].min !== void 0 && screen.values[0].max !== void 0) return {
			result: false,
			reason: "min-and-max"
		};
		return {
			result: true,
			reason: null
		};
	}
	function compareScreens(type, a, z) {
		let aScreen = toScreen(a, type);
		let zScreen = toScreen(z, type);
		let aSorting = isScreenSortable(aScreen);
		let bSorting = isScreenSortable(zScreen);
		if (aSorting.reason === "multiple-values" || bSorting.reason === "multiple-values") throw new Error("Attempted to sort a screen with multiple values. This should never happen. Please open a bug report.");
		else if (aSorting.reason === "raw-values" || bSorting.reason === "raw-values") throw new Error("Attempted to sort a screen with raw values. This should never happen. Please open a bug report.");
		else if (aSorting.reason === "min-and-max" || bSorting.reason === "min-and-max") throw new Error("Attempted to sort a screen with both min and max values. This should never happen. Please open a bug report.");
		let { min: aMin, max: aMax } = aScreen.values[0];
		let { min: zMin, max: zMax } = zScreen.values[0];
		if (a.not) [aMin, aMax] = [aMax, aMin];
		if (z.not) [zMin, zMax] = [zMax, zMin];
		aMin = aMin === void 0 ? aMin : parseFloat(aMin);
		aMax = aMax === void 0 ? aMax : parseFloat(aMax);
		zMin = zMin === void 0 ? zMin : parseFloat(zMin);
		zMax = zMax === void 0 ? zMax : parseFloat(zMax);
		let [aValue, zValue] = type === "min" ? [aMin, zMin] : [zMax, aMax];
		return aValue - zValue;
	}
	function toScreen(value, type) {
		if (typeof value === "object") return value;
		return {
			name: "arbitrary-screen",
			values: [{ [type]: value }]
		};
	}
	function resolveValue({ "min-width": _minWidth, min = _minWidth, max, raw } = {}) {
		return {
			min,
			max,
			raw
		};
	}
}));
var require_removeAlphaVariables = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "removeAlphaVariables", {
		enumerable: true,
		get: function() {
			return removeAlphaVariables;
		}
	});
	function removeAlphaVariables(container, toRemove) {
		container.walkDecls((decl) => {
			if (toRemove.includes(decl.prop)) {
				decl.remove();
				return;
			}
			for (let varName of toRemove) if (decl.value.includes(`/ var(${varName})`)) decl.value = decl.value.replace(`/ var(${varName})`, "");
			else if (decl.value.includes(`/ var(${varName}, 1)`)) decl.value = decl.value.replace(`/ var(${varName}, 1)`, "");
		});
	}
}));
var require_corePlugins = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export(exports, {
		variantPlugins: function() {
			return variantPlugins;
		},
		corePlugins: function() {
			return corePlugins;
		}
	});
	__require("fs");
	__require("path");
	const _postcss = /* @__PURE__ */ _interop_require_default(require_postcss());
	const _createUtilityPlugin = /* @__PURE__ */ _interop_require_default(require_createUtilityPlugin());
	const _buildMediaQuery = /* @__PURE__ */ _interop_require_default(require_buildMediaQuery());
	const _escapeClassName = /* @__PURE__ */ _interop_require_default(require_escapeClassName());
	const _parseAnimationValue = /* @__PURE__ */ _interop_require_default(require_parseAnimationValue());
	const _flattenColorPalette = /* @__PURE__ */ _interop_require_default(require_flattenColorPalette());
	const _withAlphaVariable = /* @__PURE__ */ _interop_require_wildcard(require_withAlphaVariable());
	const _toColorValue = /* @__PURE__ */ _interop_require_default(require_toColorValue());
	const _isPlainObject = /* @__PURE__ */ _interop_require_default(require_isPlainObject());
	const _transformThemeValue = /* @__PURE__ */ _interop_require_default(require_transformThemeValue());
	const _packagejson = require_package();
	const _log = /* @__PURE__ */ _interop_require_default(require_log());
	const _normalizeScreens = require_normalizeScreens();
	const _parseBoxShadowValue = require_parseBoxShadowValue();
	const _removeAlphaVariables = require_removeAlphaVariables();
	const _featureFlags = require_featureFlags();
	const _dataTypes = require_dataTypes();
	const _setupContextUtils = require_setupContextUtils();
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function _getRequireWildcardCache(nodeInterop) {
		if (typeof WeakMap !== "function") return null;
		var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
		var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
		return (_getRequireWildcardCache = function(nodeInterop) {
			return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
		})(nodeInterop);
	}
	function _interop_require_wildcard(obj, nodeInterop) {
		if (!nodeInterop && obj && obj.__esModule) return obj;
		if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };
		var cache = _getRequireWildcardCache(nodeInterop);
		if (cache && cache.has(obj)) return cache.get(obj);
		var newObj = {};
		var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
		for (var key in obj) if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
			var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
			if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
			else newObj[key] = obj[key];
		}
		newObj.default = obj;
		if (cache) cache.set(obj, newObj);
		return newObj;
	}
	let variantPlugins = {
		childVariant: ({ addVariant }) => {
			addVariant("*", "& > *");
		},
		pseudoElementVariants: ({ addVariant }) => {
			addVariant("first-letter", "&::first-letter");
			addVariant("first-line", "&::first-line");
			addVariant("marker", [({ container }) => {
				(0, _removeAlphaVariables.removeAlphaVariables)(container, ["--tw-text-opacity"]);
				return "& *::marker";
			}, ({ container }) => {
				(0, _removeAlphaVariables.removeAlphaVariables)(container, ["--tw-text-opacity"]);
				return "&::marker";
			}]);
			addVariant("selection", ["& *::selection", "&::selection"]);
			addVariant("file", "&::file-selector-button");
			addVariant("placeholder", "&::placeholder");
			addVariant("backdrop", "&::backdrop");
			addVariant("before", ({ container }) => {
				container.walkRules((rule) => {
					let foundContent = false;
					rule.walkDecls("content", () => {
						foundContent = true;
					});
					if (!foundContent) rule.prepend(_postcss.default.decl({
						prop: "content",
						value: "var(--tw-content)"
					}));
				});
				return "&::before";
			});
			addVariant("after", ({ container }) => {
				container.walkRules((rule) => {
					let foundContent = false;
					rule.walkDecls("content", () => {
						foundContent = true;
					});
					if (!foundContent) rule.prepend(_postcss.default.decl({
						prop: "content",
						value: "var(--tw-content)"
					}));
				});
				return "&::after";
			});
		},
		pseudoClassVariants: ({ addVariant, matchVariant, config, prefix }) => {
			let pseudoVariants = [
				["first", "&:first-child"],
				["last", "&:last-child"],
				["only", "&:only-child"],
				["odd", "&:nth-child(odd)"],
				["even", "&:nth-child(even)"],
				"first-of-type",
				"last-of-type",
				"only-of-type",
				["visited", ({ container }) => {
					(0, _removeAlphaVariables.removeAlphaVariables)(container, [
						"--tw-text-opacity",
						"--tw-border-opacity",
						"--tw-bg-opacity"
					]);
					return "&:visited";
				}],
				"target",
				["open", "&[open]"],
				"default",
				"checked",
				"indeterminate",
				"placeholder-shown",
				"autofill",
				"optional",
				"required",
				"valid",
				"invalid",
				"in-range",
				"out-of-range",
				"read-only",
				"empty",
				"focus-within",
				["hover", !(0, _featureFlags.flagEnabled)(config(), "hoverOnlyWhenSupported") ? "&:hover" : "@media (hover: hover) and (pointer: fine) { &:hover }"],
				"focus",
				"focus-visible",
				"active",
				"enabled",
				"disabled"
			].map((variant) => Array.isArray(variant) ? variant : [variant, `&:${variant}`]);
			for (let [variantName, state] of pseudoVariants) addVariant(variantName, (ctx) => {
				return typeof state === "function" ? state(ctx) : state;
			});
			let variants = {
				group: (_, { modifier }) => modifier ? [`:merge(${prefix(".group")}\\/${(0, _escapeClassName.default)(modifier)})`, " &"] : [`:merge(${prefix(".group")})`, " &"],
				peer: (_, { modifier }) => modifier ? [`:merge(${prefix(".peer")}\\/${(0, _escapeClassName.default)(modifier)})`, " ~ &"] : [`:merge(${prefix(".peer")})`, " ~ &"]
			};
			for (let [name, fn] of Object.entries(variants)) matchVariant(name, (value = "", extra) => {
				let result = (0, _dataTypes.normalize)(typeof value === "function" ? value(extra) : value);
				if (!result.includes("&")) result = "&" + result;
				let [a, b] = fn("", extra);
				let start = null;
				let end = null;
				let quotes = 0;
				for (let i = 0; i < result.length; ++i) {
					let c = result[i];
					if (c === "&") start = i;
					else if (c === "'" || c === "\"") quotes += 1;
					else if (start !== null && c === " " && !quotes) end = i;
				}
				if (start !== null && end === null) end = result.length;
				return result.slice(0, start) + a + result.slice(start + 1, end) + b + result.slice(end);
			}, {
				values: Object.fromEntries(pseudoVariants),
				[_setupContextUtils.INTERNAL_FEATURES]: { respectPrefix: false }
			});
		},
		directionVariants: ({ addVariant }) => {
			addVariant("ltr", "&:where([dir=\"ltr\"], [dir=\"ltr\"] *)");
			addVariant("rtl", "&:where([dir=\"rtl\"], [dir=\"rtl\"] *)");
		},
		reducedMotionVariants: ({ addVariant }) => {
			addVariant("motion-safe", "@media (prefers-reduced-motion: no-preference)");
			addVariant("motion-reduce", "@media (prefers-reduced-motion: reduce)");
		},
		darkVariants: ({ config, addVariant }) => {
			let [mode, selector = ".dark"] = [].concat(config("darkMode", "media"));
			if (mode === false) {
				mode = "media";
				_log.default.warn("darkmode-false", [
					"The `darkMode` option in your Tailwind CSS configuration is set to `false`, which now behaves the same as `media`.",
					"Change `darkMode` to `media` or remove it entirely.",
					"https://tailwindcss.com/docs/upgrade-guide#remove-dark-mode-configuration"
				]);
			}
			if (mode === "variant") {
				let formats;
				if (Array.isArray(selector)) formats = selector;
				else if (typeof selector === "function") formats = selector;
				else if (typeof selector === "string") formats = [selector];
				if (Array.isArray(formats)) {
					for (let format of formats) if (format === ".dark") {
						mode = false;
						_log.default.warn("darkmode-variant-without-selector", ["When using `variant` for `darkMode`, you must provide a selector.", "Example: `darkMode: [\"variant\", \".your-selector &\"]`"]);
					} else if (!format.includes("&")) {
						mode = false;
						_log.default.warn("darkmode-variant-without-ampersand", ["When using `variant` for `darkMode`, your selector must contain `&`.", "Example `darkMode: [\"variant\", \".your-selector &\"]`"]);
					}
				}
				selector = formats;
			}
			if (mode === "selector") addVariant("dark", `&:where(${selector}, ${selector} *)`);
			else if (mode === "media") addVariant("dark", "@media (prefers-color-scheme: dark)");
			else if (mode === "variant") addVariant("dark", selector);
			else if (mode === "class") addVariant("dark", `&:is(${selector} *)`);
		},
		printVariant: ({ addVariant }) => {
			addVariant("print", "@media print");
		},
		screenVariants: ({ theme, addVariant, matchVariant }) => {
			var _theme;
			let rawScreens = (_theme = theme("screens")) !== null && _theme !== void 0 ? _theme : {};
			let areSimpleScreens = Object.values(rawScreens).every((v) => typeof v === "string");
			let screens = (0, _normalizeScreens.normalizeScreens)(theme("screens"));
			let unitCache = /* @__PURE__ */ new Set([]);
			function units(value) {
				var _value_match;
				var _value_match_;
				return (_value_match_ = (_value_match = value.match(/(\D+)$/)) === null || _value_match === void 0 ? void 0 : _value_match[1]) !== null && _value_match_ !== void 0 ? _value_match_ : "(none)";
			}
			function recordUnits(value) {
				if (value !== void 0) unitCache.add(units(value));
			}
			function canUseUnits(value) {
				recordUnits(value);
				return unitCache.size === 1;
			}
			for (const screen of screens) for (const value of screen.values) {
				recordUnits(value.min);
				recordUnits(value.max);
			}
			let screensUseConsistentUnits = unitCache.size <= 1;
			function buildScreenValues(type) {
				return Object.fromEntries(screens.filter((screen) => (0, _normalizeScreens.isScreenSortable)(screen).result).map((screen) => {
					let { min, max } = screen.values[0];
					if (type === "min" && min !== void 0) return screen;
					else if (type === "min" && max !== void 0) return {
						...screen,
						not: !screen.not
					};
					else if (type === "max" && max !== void 0) return screen;
					else if (type === "max" && min !== void 0) return {
						...screen,
						not: !screen.not
					};
				}).map((screen) => [screen.name, screen]));
			}
			function buildSort(type) {
				return (a, z) => (0, _normalizeScreens.compareScreens)(type, a.value, z.value);
			}
			let maxSort = buildSort("max");
			let minSort = buildSort("min");
			function buildScreenVariant(type) {
				return (value) => {
					if (!areSimpleScreens) {
						_log.default.warn("complex-screen-config", ["The `min-*` and `max-*` variants are not supported with a `screens` configuration containing objects."]);
						return [];
					} else if (!screensUseConsistentUnits) {
						_log.default.warn("mixed-screen-units", ["The `min-*` and `max-*` variants are not supported with a `screens` configuration containing mixed units."]);
						return [];
					} else if (typeof value === "string" && !canUseUnits(value)) {
						_log.default.warn("minmax-have-mixed-units", ["The `min-*` and `max-*` variants are not supported with a `screens` configuration containing mixed units."]);
						return [];
					}
					return [`@media ${(0, _buildMediaQuery.default)((0, _normalizeScreens.toScreen)(value, type))}`];
				};
			}
			matchVariant("max", buildScreenVariant("max"), {
				sort: maxSort,
				values: areSimpleScreens ? buildScreenValues("max") : {}
			});
			let id = "min-screens";
			for (let screen of screens) addVariant(screen.name, `@media ${(0, _buildMediaQuery.default)(screen)}`, {
				id,
				sort: areSimpleScreens && screensUseConsistentUnits ? minSort : void 0,
				value: screen
			});
			matchVariant("min", buildScreenVariant("min"), {
				id,
				sort: minSort
			});
		},
		supportsVariants: ({ matchVariant, theme }) => {
			var _theme;
			matchVariant("supports", (value = "") => {
				let check = value.startsWith("--") ? value : (0, _dataTypes.normalize)(value);
				let isRaw = /^[\w-]*\s*\(/.test(check);
				check = isRaw ? check.replace(/\b(and|or|not)\b/g, " $1 ") : check;
				if (isRaw) return `@supports ${check}`;
				if (!check.includes(":")) check = `${check}: var(--tw)`;
				if (!(check.startsWith("(") && check.endsWith(")"))) check = `(${check})`;
				return `@supports ${check}`;
			}, { values: (_theme = theme("supports")) !== null && _theme !== void 0 ? _theme : {} });
		},
		hasVariants: ({ matchVariant, prefix }) => {
			matchVariant("has", (value) => `&:has(${(0, _dataTypes.normalize)(value)})`, {
				values: {},
				[_setupContextUtils.INTERNAL_FEATURES]: { respectPrefix: false }
			});
			matchVariant("group-has", (value, { modifier }) => modifier ? `:merge(${prefix(".group")}\\/${modifier}):has(${(0, _dataTypes.normalize)(value)}) &` : `:merge(${prefix(".group")}):has(${(0, _dataTypes.normalize)(value)}) &`, {
				values: {},
				[_setupContextUtils.INTERNAL_FEATURES]: { respectPrefix: false }
			});
			matchVariant("peer-has", (value, { modifier }) => modifier ? `:merge(${prefix(".peer")}\\/${modifier}):has(${(0, _dataTypes.normalize)(value)}) ~ &` : `:merge(${prefix(".peer")}):has(${(0, _dataTypes.normalize)(value)}) ~ &`, {
				values: {},
				[_setupContextUtils.INTERNAL_FEATURES]: { respectPrefix: false }
			});
		},
		ariaVariants: ({ matchVariant, theme }) => {
			var _theme;
			matchVariant("aria", (value) => `&[aria-${(0, _dataTypes.normalizeAttributeSelectors)((0, _dataTypes.normalize)(value))}]`, { values: (_theme = theme("aria")) !== null && _theme !== void 0 ? _theme : {} });
			var _theme1;
			matchVariant("group-aria", (value, { modifier }) => modifier ? `:merge(.group\\/${modifier})[aria-${(0, _dataTypes.normalizeAttributeSelectors)((0, _dataTypes.normalize)(value))}] &` : `:merge(.group)[aria-${(0, _dataTypes.normalizeAttributeSelectors)((0, _dataTypes.normalize)(value))}] &`, { values: (_theme1 = theme("aria")) !== null && _theme1 !== void 0 ? _theme1 : {} });
			var _theme2;
			matchVariant("peer-aria", (value, { modifier }) => modifier ? `:merge(.peer\\/${modifier})[aria-${(0, _dataTypes.normalizeAttributeSelectors)((0, _dataTypes.normalize)(value))}] ~ &` : `:merge(.peer)[aria-${(0, _dataTypes.normalizeAttributeSelectors)((0, _dataTypes.normalize)(value))}] ~ &`, { values: (_theme2 = theme("aria")) !== null && _theme2 !== void 0 ? _theme2 : {} });
		},
		dataVariants: ({ matchVariant, theme }) => {
			var _theme;
			matchVariant("data", (value) => `&[data-${(0, _dataTypes.normalizeAttributeSelectors)((0, _dataTypes.normalize)(value))}]`, { values: (_theme = theme("data")) !== null && _theme !== void 0 ? _theme : {} });
			var _theme1;
			matchVariant("group-data", (value, { modifier }) => modifier ? `:merge(.group\\/${modifier})[data-${(0, _dataTypes.normalizeAttributeSelectors)((0, _dataTypes.normalize)(value))}] &` : `:merge(.group)[data-${(0, _dataTypes.normalizeAttributeSelectors)((0, _dataTypes.normalize)(value))}] &`, { values: (_theme1 = theme("data")) !== null && _theme1 !== void 0 ? _theme1 : {} });
			var _theme2;
			matchVariant("peer-data", (value, { modifier }) => modifier ? `:merge(.peer\\/${modifier})[data-${(0, _dataTypes.normalizeAttributeSelectors)((0, _dataTypes.normalize)(value))}] ~ &` : `:merge(.peer)[data-${(0, _dataTypes.normalizeAttributeSelectors)((0, _dataTypes.normalize)(value))}] ~ &`, { values: (_theme2 = theme("data")) !== null && _theme2 !== void 0 ? _theme2 : {} });
		},
		orientationVariants: ({ addVariant }) => {
			addVariant("portrait", "@media (orientation: portrait)");
			addVariant("landscape", "@media (orientation: landscape)");
		},
		prefersContrastVariants: ({ addVariant }) => {
			addVariant("contrast-more", "@media (prefers-contrast: more)");
			addVariant("contrast-less", "@media (prefers-contrast: less)");
		},
		forcedColorsVariants: ({ addVariant }) => {
			addVariant("forced-colors", "@media (forced-colors: active)");
		}
	};
	let cssTransformValue = [
		"translate(var(--tw-translate-x), var(--tw-translate-y))",
		"rotate(var(--tw-rotate))",
		"skewX(var(--tw-skew-x))",
		"skewY(var(--tw-skew-y))",
		"scaleX(var(--tw-scale-x))",
		"scaleY(var(--tw-scale-y))"
	].join(" ");
	let cssFilterValue = [
		"var(--tw-blur)",
		"var(--tw-brightness)",
		"var(--tw-contrast)",
		"var(--tw-grayscale)",
		"var(--tw-hue-rotate)",
		"var(--tw-invert)",
		"var(--tw-saturate)",
		"var(--tw-sepia)",
		"var(--tw-drop-shadow)"
	].join(" ");
	let cssBackdropFilterValue = [
		"var(--tw-backdrop-blur)",
		"var(--tw-backdrop-brightness)",
		"var(--tw-backdrop-contrast)",
		"var(--tw-backdrop-grayscale)",
		"var(--tw-backdrop-hue-rotate)",
		"var(--tw-backdrop-invert)",
		"var(--tw-backdrop-opacity)",
		"var(--tw-backdrop-saturate)",
		"var(--tw-backdrop-sepia)"
	].join(" ");
	let corePlugins = {
		preflight: ({ addBase }) => {
			let preflightStyles = _postcss.default.parse("/*\n1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)\n2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)\n*/\n\n*,\n::before,\n::after {\n  box-sizing: border-box; /* 1 */\n  border-width: 0; /* 2 */\n  border-style: solid; /* 2 */\n  border-color: theme('borderColor.DEFAULT', currentColor); /* 2 */\n}\n\n::before,\n::after {\n  --tw-content: '';\n}\n\n/*\n1. Use a consistent sensible line-height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n3. Use a more readable tab size.\n4. Use the user's configured `sans` font-family by default.\n5. Use the user's configured `sans` font-feature-settings by default.\n6. Use the user's configured `sans` font-variation-settings by default.\n7. Disable tap highlights on iOS\n*/\n\nhtml,\n:host {\n  line-height: 1.5; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n  -moz-tab-size: 4; /* 3 */\n  tab-size: 4; /* 3 */\n  font-family: theme('fontFamily.sans', ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"); /* 4 */\n  font-feature-settings: theme('fontFamily.sans[1].fontFeatureSettings', normal); /* 5 */\n  font-variation-settings: theme('fontFamily.sans[1].fontVariationSettings', normal); /* 6 */\n  -webkit-tap-highlight-color: transparent; /* 7 */\n}\n\n/*\n1. Remove the margin in all browsers.\n2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.\n*/\n\nbody {\n  margin: 0; /* 1 */\n  line-height: inherit; /* 2 */\n}\n\n/*\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n3. Ensure horizontal rules are visible by default.\n*/\n\nhr {\n  height: 0; /* 1 */\n  color: inherit; /* 2 */\n  border-top-width: 1px; /* 3 */\n}\n\n/*\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr:where([title]) {\n  text-decoration: underline dotted;\n}\n\n/*\nRemove the default font size and weight for headings.\n*/\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/*\nReset links to optimize for opt-in styling instead of opt-out.\n*/\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/*\nAdd the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/*\n1. Use the user's configured `mono` font-family by default.\n2. Use the user's configured `mono` font-feature-settings by default.\n3. Use the user's configured `mono` font-variation-settings by default.\n4. Correct the odd `em` font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family: theme('fontFamily.mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace); /* 1 */\n  font-feature-settings: theme('fontFamily.mono[1].fontFeatureSettings', normal); /* 2 */\n  font-variation-settings: theme('fontFamily.mono[1].fontVariationSettings', normal); /* 3 */\n  font-size: 1em; /* 4 */\n}\n\n/*\nAdd the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/*\nPrevent `sub` and `sup` elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n3. Remove gaps between table borders by default.\n*/\n\ntable {\n  text-indent: 0; /* 1 */\n  border-color: inherit; /* 2 */\n  border-collapse: collapse; /* 3 */\n}\n\n/*\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n3. Remove default padding in all browsers.\n*/\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-feature-settings: inherit; /* 1 */\n  font-variation-settings: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  font-weight: inherit; /* 1 */\n  line-height: inherit; /* 1 */\n  letter-spacing: inherit; /* 1 */\n  color: inherit; /* 1 */\n  margin: 0; /* 2 */\n  padding: 0; /* 3 */\n}\n\n/*\nRemove the inheritance of text transform in Edge and Firefox.\n*/\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Remove default button styles.\n*/\n\nbutton,\ninput:where([type='button']),\ninput:where([type='reset']),\ninput:where([type='submit']) {\n  -webkit-appearance: button; /* 1 */\n  background-color: transparent; /* 2 */\n  background-image: none; /* 2 */\n}\n\n/*\nUse the modern Firefox focus style for all focusable elements.\n*/\n\n:-moz-focusring {\n  outline: auto;\n}\n\n/*\nRemove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)\n*/\n\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n/*\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/*\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/*\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n\n[type='search'] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/*\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to `inherit` in Safari.\n*/\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/*\nRemoves the default spacing and border for appropriate elements.\n*/\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nlegend {\n  padding: 0;\n}\n\nol,\nul,\nmenu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/*\nReset default styling for dialogs.\n*/\ndialog {\n  padding: 0;\n}\n\n/*\nPrevent resizing textareas horizontally by default.\n*/\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)\n2. Set the default placeholder color to the user's configured gray 400 color.\n*/\n\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1; /* 1 */\n  color: theme('colors.gray.400', #9ca3af); /* 2 */\n}\n\n/*\nSet the default cursor for buttons.\n*/\n\nbutton,\n[role=\"button\"] {\n  cursor: pointer;\n}\n\n/*\nMake sure disabled buttons don't get the pointer cursor.\n*/\n:disabled {\n  cursor: default;\n}\n\n/*\n1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)\n2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)\n   This can trigger a poorly considered lint error in some tools but is included by design.\n*/\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block; /* 1 */\n  vertical-align: middle; /* 2 */\n}\n\n/*\nConstrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)\n*/\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n/* Make elements with the HTML hidden attribute stay hidden by default */\n[hidden]:where(:not([hidden=\"until-found\"])) {\n  display: none;\n}\n");
			addBase([_postcss.default.comment({ text: `! tailwindcss v${_packagejson.version} | MIT License | https://tailwindcss.com` }), ...preflightStyles.nodes]);
		},
		container: (() => {
			function extractMinWidths(breakpoints = []) {
				return breakpoints.flatMap((breakpoint) => breakpoint.values.map((breakpoint) => breakpoint.min)).filter((v) => v !== void 0);
			}
			function mapMinWidthsToPadding(minWidths, screens, paddings) {
				if (typeof paddings === "undefined") return [];
				if (!(typeof paddings === "object" && paddings !== null)) return [{
					screen: "DEFAULT",
					minWidth: 0,
					padding: paddings
				}];
				let mapping = [];
				if (paddings.DEFAULT) mapping.push({
					screen: "DEFAULT",
					minWidth: 0,
					padding: paddings.DEFAULT
				});
				for (let minWidth of minWidths) for (let screen of screens) for (let { min } of screen.values) if (min === minWidth) mapping.push({
					minWidth,
					padding: paddings[screen.name]
				});
				return mapping;
			}
			return function({ addComponents, theme }) {
				let screens = (0, _normalizeScreens.normalizeScreens)(theme("container.screens", theme("screens")));
				let minWidths = extractMinWidths(screens);
				let paddings = mapMinWidthsToPadding(minWidths, screens, theme("container.padding"));
				let generatePaddingFor = (minWidth) => {
					let paddingConfig = paddings.find((padding) => padding.minWidth === minWidth);
					if (!paddingConfig) return {};
					return {
						paddingRight: paddingConfig.padding,
						paddingLeft: paddingConfig.padding
					};
				};
				let atRules = Array.from(new Set(minWidths.slice().sort((a, z) => parseInt(a) - parseInt(z)))).map((minWidth) => ({ [`@media (min-width: ${minWidth})`]: { ".container": {
					"max-width": minWidth,
					...generatePaddingFor(minWidth)
				} } }));
				addComponents([{ ".container": Object.assign({ width: "100%" }, theme("container.center", false) ? {
					marginRight: "auto",
					marginLeft: "auto"
				} : {}, generatePaddingFor(0)) }, ...atRules]);
			};
		})(),
		accessibility: ({ addUtilities }) => {
			addUtilities({
				".sr-only": {
					position: "absolute",
					width: "1px",
					height: "1px",
					padding: "0",
					margin: "-1px",
					overflow: "hidden",
					clip: "rect(0, 0, 0, 0)",
					whiteSpace: "nowrap",
					borderWidth: "0"
				},
				".not-sr-only": {
					position: "static",
					width: "auto",
					height: "auto",
					padding: "0",
					margin: "0",
					overflow: "visible",
					clip: "auto",
					whiteSpace: "normal"
				}
			});
		},
		pointerEvents: ({ addUtilities }) => {
			addUtilities({
				".pointer-events-none": { "pointer-events": "none" },
				".pointer-events-auto": { "pointer-events": "auto" }
			});
		},
		visibility: ({ addUtilities }) => {
			addUtilities({
				".visible": { visibility: "visible" },
				".invisible": { visibility: "hidden" },
				".collapse": { visibility: "collapse" }
			});
		},
		position: ({ addUtilities }) => {
			addUtilities({
				".static": { position: "static" },
				".fixed": { position: "fixed" },
				".absolute": { position: "absolute" },
				".relative": { position: "relative" },
				".sticky": { position: "sticky" }
			});
		},
		inset: (0, _createUtilityPlugin.default)("inset", [
			["inset", ["inset"]],
			[["inset-x", ["left", "right"]], ["inset-y", ["top", "bottom"]]],
			[
				["start", ["inset-inline-start"]],
				["end", ["inset-inline-end"]],
				["top", ["top"]],
				["right", ["right"]],
				["bottom", ["bottom"]],
				["left", ["left"]]
			]
		], { supportsNegativeValues: true }),
		isolation: ({ addUtilities }) => {
			addUtilities({
				".isolate": { isolation: "isolate" },
				".isolation-auto": { isolation: "auto" }
			});
		},
		zIndex: (0, _createUtilityPlugin.default)("zIndex", [["z", ["zIndex"]]], { supportsNegativeValues: true }),
		order: (0, _createUtilityPlugin.default)("order", void 0, { supportsNegativeValues: true }),
		gridColumn: (0, _createUtilityPlugin.default)("gridColumn", [["col", ["gridColumn"]]]),
		gridColumnStart: (0, _createUtilityPlugin.default)("gridColumnStart", [["col-start", ["gridColumnStart"]]], { supportsNegativeValues: true }),
		gridColumnEnd: (0, _createUtilityPlugin.default)("gridColumnEnd", [["col-end", ["gridColumnEnd"]]], { supportsNegativeValues: true }),
		gridRow: (0, _createUtilityPlugin.default)("gridRow", [["row", ["gridRow"]]]),
		gridRowStart: (0, _createUtilityPlugin.default)("gridRowStart", [["row-start", ["gridRowStart"]]], { supportsNegativeValues: true }),
		gridRowEnd: (0, _createUtilityPlugin.default)("gridRowEnd", [["row-end", ["gridRowEnd"]]], { supportsNegativeValues: true }),
		float: ({ addUtilities }) => {
			addUtilities({
				".float-start": { float: "inline-start" },
				".float-end": { float: "inline-end" },
				".float-right": { float: "right" },
				".float-left": { float: "left" },
				".float-none": { float: "none" }
			});
		},
		clear: ({ addUtilities }) => {
			addUtilities({
				".clear-start": { clear: "inline-start" },
				".clear-end": { clear: "inline-end" },
				".clear-left": { clear: "left" },
				".clear-right": { clear: "right" },
				".clear-both": { clear: "both" },
				".clear-none": { clear: "none" }
			});
		},
		margin: (0, _createUtilityPlugin.default)("margin", [
			["m", ["margin"]],
			[["mx", ["margin-left", "margin-right"]], ["my", ["margin-top", "margin-bottom"]]],
			[
				["ms", ["margin-inline-start"]],
				["me", ["margin-inline-end"]],
				["mt", ["margin-top"]],
				["mr", ["margin-right"]],
				["mb", ["margin-bottom"]],
				["ml", ["margin-left"]]
			]
		], { supportsNegativeValues: true }),
		boxSizing: ({ addUtilities }) => {
			addUtilities({
				".box-border": { "box-sizing": "border-box" },
				".box-content": { "box-sizing": "content-box" }
			});
		},
		lineClamp: ({ matchUtilities, addUtilities, theme }) => {
			matchUtilities({ "line-clamp": (value) => ({
				overflow: "hidden",
				display: "-webkit-box",
				"-webkit-box-orient": "vertical",
				"-webkit-line-clamp": `${value}`
			}) }, { values: theme("lineClamp") });
			addUtilities({ ".line-clamp-none": {
				overflow: "visible",
				display: "block",
				"-webkit-box-orient": "horizontal",
				"-webkit-line-clamp": "none"
			} });
		},
		display: ({ addUtilities }) => {
			addUtilities({
				".block": { display: "block" },
				".inline-block": { display: "inline-block" },
				".inline": { display: "inline" },
				".flex": { display: "flex" },
				".inline-flex": { display: "inline-flex" },
				".table": { display: "table" },
				".inline-table": { display: "inline-table" },
				".table-caption": { display: "table-caption" },
				".table-cell": { display: "table-cell" },
				".table-column": { display: "table-column" },
				".table-column-group": { display: "table-column-group" },
				".table-footer-group": { display: "table-footer-group" },
				".table-header-group": { display: "table-header-group" },
				".table-row-group": { display: "table-row-group" },
				".table-row": { display: "table-row" },
				".flow-root": { display: "flow-root" },
				".grid": { display: "grid" },
				".inline-grid": { display: "inline-grid" },
				".contents": { display: "contents" },
				".list-item": { display: "list-item" },
				".hidden": { display: "none" }
			});
		},
		aspectRatio: (0, _createUtilityPlugin.default)("aspectRatio", [["aspect", ["aspect-ratio"]]]),
		size: (0, _createUtilityPlugin.default)("size", [["size", ["width", "height"]]]),
		height: (0, _createUtilityPlugin.default)("height", [["h", ["height"]]]),
		maxHeight: (0, _createUtilityPlugin.default)("maxHeight", [["max-h", ["maxHeight"]]]),
		minHeight: (0, _createUtilityPlugin.default)("minHeight", [["min-h", ["minHeight"]]]),
		width: (0, _createUtilityPlugin.default)("width", [["w", ["width"]]]),
		minWidth: (0, _createUtilityPlugin.default)("minWidth", [["min-w", ["minWidth"]]]),
		maxWidth: (0, _createUtilityPlugin.default)("maxWidth", [["max-w", ["maxWidth"]]]),
		flex: (0, _createUtilityPlugin.default)("flex"),
		flexShrink: (0, _createUtilityPlugin.default)("flexShrink", [["flex-shrink", ["flex-shrink"]], ["shrink", ["flex-shrink"]]]),
		flexGrow: (0, _createUtilityPlugin.default)("flexGrow", [["flex-grow", ["flex-grow"]], ["grow", ["flex-grow"]]]),
		flexBasis: (0, _createUtilityPlugin.default)("flexBasis", [["basis", ["flex-basis"]]]),
		tableLayout: ({ addUtilities }) => {
			addUtilities({
				".table-auto": { "table-layout": "auto" },
				".table-fixed": { "table-layout": "fixed" }
			});
		},
		captionSide: ({ addUtilities }) => {
			addUtilities({
				".caption-top": { "caption-side": "top" },
				".caption-bottom": { "caption-side": "bottom" }
			});
		},
		borderCollapse: ({ addUtilities }) => {
			addUtilities({
				".border-collapse": { "border-collapse": "collapse" },
				".border-separate": { "border-collapse": "separate" }
			});
		},
		borderSpacing: ({ addDefaults, matchUtilities, theme }) => {
			addDefaults("border-spacing", {
				"--tw-border-spacing-x": 0,
				"--tw-border-spacing-y": 0
			});
			matchUtilities({
				"border-spacing": (value) => {
					return {
						"--tw-border-spacing-x": value,
						"--tw-border-spacing-y": value,
						"@defaults border-spacing": {},
						"border-spacing": "var(--tw-border-spacing-x) var(--tw-border-spacing-y)"
					};
				},
				"border-spacing-x": (value) => {
					return {
						"--tw-border-spacing-x": value,
						"@defaults border-spacing": {},
						"border-spacing": "var(--tw-border-spacing-x) var(--tw-border-spacing-y)"
					};
				},
				"border-spacing-y": (value) => {
					return {
						"--tw-border-spacing-y": value,
						"@defaults border-spacing": {},
						"border-spacing": "var(--tw-border-spacing-x) var(--tw-border-spacing-y)"
					};
				}
			}, { values: theme("borderSpacing") });
		},
		transformOrigin: (0, _createUtilityPlugin.default)("transformOrigin", [["origin", ["transformOrigin"]]]),
		translate: (0, _createUtilityPlugin.default)("translate", [[["translate-x", [
			["@defaults transform", {}],
			"--tw-translate-x",
			["transform", cssTransformValue]
		]], ["translate-y", [
			["@defaults transform", {}],
			"--tw-translate-y",
			["transform", cssTransformValue]
		]]]], { supportsNegativeValues: true }),
		rotate: (0, _createUtilityPlugin.default)("rotate", [["rotate", [
			["@defaults transform", {}],
			"--tw-rotate",
			["transform", cssTransformValue]
		]]], { supportsNegativeValues: true }),
		skew: (0, _createUtilityPlugin.default)("skew", [[["skew-x", [
			["@defaults transform", {}],
			"--tw-skew-x",
			["transform", cssTransformValue]
		]], ["skew-y", [
			["@defaults transform", {}],
			"--tw-skew-y",
			["transform", cssTransformValue]
		]]]], { supportsNegativeValues: true }),
		scale: (0, _createUtilityPlugin.default)("scale", [["scale", [
			["@defaults transform", {}],
			"--tw-scale-x",
			"--tw-scale-y",
			["transform", cssTransformValue]
		]], [["scale-x", [
			["@defaults transform", {}],
			"--tw-scale-x",
			["transform", cssTransformValue]
		]], ["scale-y", [
			["@defaults transform", {}],
			"--tw-scale-y",
			["transform", cssTransformValue]
		]]]], { supportsNegativeValues: true }),
		transform: ({ addDefaults, addUtilities }) => {
			addDefaults("transform", {
				"--tw-translate-x": "0",
				"--tw-translate-y": "0",
				"--tw-rotate": "0",
				"--tw-skew-x": "0",
				"--tw-skew-y": "0",
				"--tw-scale-x": "1",
				"--tw-scale-y": "1"
			});
			addUtilities({
				".transform": {
					"@defaults transform": {},
					transform: cssTransformValue
				},
				".transform-cpu": { transform: cssTransformValue },
				".transform-gpu": { transform: cssTransformValue.replace("translate(var(--tw-translate-x), var(--tw-translate-y))", "translate3d(var(--tw-translate-x), var(--tw-translate-y), 0)") },
				".transform-none": { transform: "none" }
			});
		},
		animation: ({ matchUtilities, theme, config }) => {
			let prefixName = (name) => (0, _escapeClassName.default)(config("prefix") + name);
			var _theme;
			let keyframes = Object.fromEntries(Object.entries((_theme = theme("keyframes")) !== null && _theme !== void 0 ? _theme : {}).map(([key, value]) => {
				return [key, { [`@keyframes ${prefixName(key)}`]: value }];
			}));
			matchUtilities({ animate: (value) => {
				let animations = (0, _parseAnimationValue.default)(value);
				return [...animations.flatMap((animation) => keyframes[animation.name]), { animation: animations.map(({ name, value }) => {
					if (name === void 0 || keyframes[name] === void 0) return value;
					return value.replace(name, prefixName(name));
				}).join(", ") }];
			} }, { values: theme("animation") });
		},
		cursor: (0, _createUtilityPlugin.default)("cursor"),
		touchAction: ({ addDefaults, addUtilities }) => {
			addDefaults("touch-action", {
				"--tw-pan-x": " ",
				"--tw-pan-y": " ",
				"--tw-pinch-zoom": " "
			});
			let cssTouchActionValue = "var(--tw-pan-x) var(--tw-pan-y) var(--tw-pinch-zoom)";
			addUtilities({
				".touch-auto": { "touch-action": "auto" },
				".touch-none": { "touch-action": "none" },
				".touch-pan-x": {
					"@defaults touch-action": {},
					"--tw-pan-x": "pan-x",
					"touch-action": cssTouchActionValue
				},
				".touch-pan-left": {
					"@defaults touch-action": {},
					"--tw-pan-x": "pan-left",
					"touch-action": cssTouchActionValue
				},
				".touch-pan-right": {
					"@defaults touch-action": {},
					"--tw-pan-x": "pan-right",
					"touch-action": cssTouchActionValue
				},
				".touch-pan-y": {
					"@defaults touch-action": {},
					"--tw-pan-y": "pan-y",
					"touch-action": cssTouchActionValue
				},
				".touch-pan-up": {
					"@defaults touch-action": {},
					"--tw-pan-y": "pan-up",
					"touch-action": cssTouchActionValue
				},
				".touch-pan-down": {
					"@defaults touch-action": {},
					"--tw-pan-y": "pan-down",
					"touch-action": cssTouchActionValue
				},
				".touch-pinch-zoom": {
					"@defaults touch-action": {},
					"--tw-pinch-zoom": "pinch-zoom",
					"touch-action": cssTouchActionValue
				},
				".touch-manipulation": { "touch-action": "manipulation" }
			});
		},
		userSelect: ({ addUtilities }) => {
			addUtilities({
				".select-none": { "user-select": "none" },
				".select-text": { "user-select": "text" },
				".select-all": { "user-select": "all" },
				".select-auto": { "user-select": "auto" }
			});
		},
		resize: ({ addUtilities }) => {
			addUtilities({
				".resize-none": { resize: "none" },
				".resize-y": { resize: "vertical" },
				".resize-x": { resize: "horizontal" },
				".resize": { resize: "both" }
			});
		},
		scrollSnapType: ({ addDefaults, addUtilities }) => {
			addDefaults("scroll-snap-type", { "--tw-scroll-snap-strictness": "proximity" });
			addUtilities({
				".snap-none": { "scroll-snap-type": "none" },
				".snap-x": {
					"@defaults scroll-snap-type": {},
					"scroll-snap-type": "x var(--tw-scroll-snap-strictness)"
				},
				".snap-y": {
					"@defaults scroll-snap-type": {},
					"scroll-snap-type": "y var(--tw-scroll-snap-strictness)"
				},
				".snap-both": {
					"@defaults scroll-snap-type": {},
					"scroll-snap-type": "both var(--tw-scroll-snap-strictness)"
				},
				".snap-mandatory": { "--tw-scroll-snap-strictness": "mandatory" },
				".snap-proximity": { "--tw-scroll-snap-strictness": "proximity" }
			});
		},
		scrollSnapAlign: ({ addUtilities }) => {
			addUtilities({
				".snap-start": { "scroll-snap-align": "start" },
				".snap-end": { "scroll-snap-align": "end" },
				".snap-center": { "scroll-snap-align": "center" },
				".snap-align-none": { "scroll-snap-align": "none" }
			});
		},
		scrollSnapStop: ({ addUtilities }) => {
			addUtilities({
				".snap-normal": { "scroll-snap-stop": "normal" },
				".snap-always": { "scroll-snap-stop": "always" }
			});
		},
		scrollMargin: (0, _createUtilityPlugin.default)("scrollMargin", [
			["scroll-m", ["scroll-margin"]],
			[["scroll-mx", ["scroll-margin-left", "scroll-margin-right"]], ["scroll-my", ["scroll-margin-top", "scroll-margin-bottom"]]],
			[
				["scroll-ms", ["scroll-margin-inline-start"]],
				["scroll-me", ["scroll-margin-inline-end"]],
				["scroll-mt", ["scroll-margin-top"]],
				["scroll-mr", ["scroll-margin-right"]],
				["scroll-mb", ["scroll-margin-bottom"]],
				["scroll-ml", ["scroll-margin-left"]]
			]
		], { supportsNegativeValues: true }),
		scrollPadding: (0, _createUtilityPlugin.default)("scrollPadding", [
			["scroll-p", ["scroll-padding"]],
			[["scroll-px", ["scroll-padding-left", "scroll-padding-right"]], ["scroll-py", ["scroll-padding-top", "scroll-padding-bottom"]]],
			[
				["scroll-ps", ["scroll-padding-inline-start"]],
				["scroll-pe", ["scroll-padding-inline-end"]],
				["scroll-pt", ["scroll-padding-top"]],
				["scroll-pr", ["scroll-padding-right"]],
				["scroll-pb", ["scroll-padding-bottom"]],
				["scroll-pl", ["scroll-padding-left"]]
			]
		]),
		listStylePosition: ({ addUtilities }) => {
			addUtilities({
				".list-inside": { "list-style-position": "inside" },
				".list-outside": { "list-style-position": "outside" }
			});
		},
		listStyleType: (0, _createUtilityPlugin.default)("listStyleType", [["list", ["listStyleType"]]]),
		listStyleImage: (0, _createUtilityPlugin.default)("listStyleImage", [["list-image", ["listStyleImage"]]]),
		appearance: ({ addUtilities }) => {
			addUtilities({
				".appearance-none": { appearance: "none" },
				".appearance-auto": { appearance: "auto" }
			});
		},
		columns: (0, _createUtilityPlugin.default)("columns", [["columns", ["columns"]]]),
		breakBefore: ({ addUtilities }) => {
			addUtilities({
				".break-before-auto": { "break-before": "auto" },
				".break-before-avoid": { "break-before": "avoid" },
				".break-before-all": { "break-before": "all" },
				".break-before-avoid-page": { "break-before": "avoid-page" },
				".break-before-page": { "break-before": "page" },
				".break-before-left": { "break-before": "left" },
				".break-before-right": { "break-before": "right" },
				".break-before-column": { "break-before": "column" }
			});
		},
		breakInside: ({ addUtilities }) => {
			addUtilities({
				".break-inside-auto": { "break-inside": "auto" },
				".break-inside-avoid": { "break-inside": "avoid" },
				".break-inside-avoid-page": { "break-inside": "avoid-page" },
				".break-inside-avoid-column": { "break-inside": "avoid-column" }
			});
		},
		breakAfter: ({ addUtilities }) => {
			addUtilities({
				".break-after-auto": { "break-after": "auto" },
				".break-after-avoid": { "break-after": "avoid" },
				".break-after-all": { "break-after": "all" },
				".break-after-avoid-page": { "break-after": "avoid-page" },
				".break-after-page": { "break-after": "page" },
				".break-after-left": { "break-after": "left" },
				".break-after-right": { "break-after": "right" },
				".break-after-column": { "break-after": "column" }
			});
		},
		gridAutoColumns: (0, _createUtilityPlugin.default)("gridAutoColumns", [["auto-cols", ["gridAutoColumns"]]]),
		gridAutoFlow: ({ addUtilities }) => {
			addUtilities({
				".grid-flow-row": { gridAutoFlow: "row" },
				".grid-flow-col": { gridAutoFlow: "column" },
				".grid-flow-dense": { gridAutoFlow: "dense" },
				".grid-flow-row-dense": { gridAutoFlow: "row dense" },
				".grid-flow-col-dense": { gridAutoFlow: "column dense" }
			});
		},
		gridAutoRows: (0, _createUtilityPlugin.default)("gridAutoRows", [["auto-rows", ["gridAutoRows"]]]),
		gridTemplateColumns: (0, _createUtilityPlugin.default)("gridTemplateColumns", [["grid-cols", ["gridTemplateColumns"]]]),
		gridTemplateRows: (0, _createUtilityPlugin.default)("gridTemplateRows", [["grid-rows", ["gridTemplateRows"]]]),
		flexDirection: ({ addUtilities }) => {
			addUtilities({
				".flex-row": { "flex-direction": "row" },
				".flex-row-reverse": { "flex-direction": "row-reverse" },
				".flex-col": { "flex-direction": "column" },
				".flex-col-reverse": { "flex-direction": "column-reverse" }
			});
		},
		flexWrap: ({ addUtilities }) => {
			addUtilities({
				".flex-wrap": { "flex-wrap": "wrap" },
				".flex-wrap-reverse": { "flex-wrap": "wrap-reverse" },
				".flex-nowrap": { "flex-wrap": "nowrap" }
			});
		},
		placeContent: ({ addUtilities }) => {
			addUtilities({
				".place-content-center": { "place-content": "center" },
				".place-content-start": { "place-content": "start" },
				".place-content-end": { "place-content": "end" },
				".place-content-between": { "place-content": "space-between" },
				".place-content-around": { "place-content": "space-around" },
				".place-content-evenly": { "place-content": "space-evenly" },
				".place-content-baseline": { "place-content": "baseline" },
				".place-content-stretch": { "place-content": "stretch" }
			});
		},
		placeItems: ({ addUtilities }) => {
			addUtilities({
				".place-items-start": { "place-items": "start" },
				".place-items-end": { "place-items": "end" },
				".place-items-center": { "place-items": "center" },
				".place-items-baseline": { "place-items": "baseline" },
				".place-items-stretch": { "place-items": "stretch" }
			});
		},
		alignContent: ({ addUtilities }) => {
			addUtilities({
				".content-normal": { "align-content": "normal" },
				".content-center": { "align-content": "center" },
				".content-start": { "align-content": "flex-start" },
				".content-end": { "align-content": "flex-end" },
				".content-between": { "align-content": "space-between" },
				".content-around": { "align-content": "space-around" },
				".content-evenly": { "align-content": "space-evenly" },
				".content-baseline": { "align-content": "baseline" },
				".content-stretch": { "align-content": "stretch" }
			});
		},
		alignItems: ({ addUtilities }) => {
			addUtilities({
				".items-start": { "align-items": "flex-start" },
				".items-end": { "align-items": "flex-end" },
				".items-center": { "align-items": "center" },
				".items-baseline": { "align-items": "baseline" },
				".items-stretch": { "align-items": "stretch" }
			});
		},
		justifyContent: ({ addUtilities }) => {
			addUtilities({
				".justify-normal": { "justify-content": "normal" },
				".justify-start": { "justify-content": "flex-start" },
				".justify-end": { "justify-content": "flex-end" },
				".justify-center": { "justify-content": "center" },
				".justify-between": { "justify-content": "space-between" },
				".justify-around": { "justify-content": "space-around" },
				".justify-evenly": { "justify-content": "space-evenly" },
				".justify-stretch": { "justify-content": "stretch" }
			});
		},
		justifyItems: ({ addUtilities }) => {
			addUtilities({
				".justify-items-start": { "justify-items": "start" },
				".justify-items-end": { "justify-items": "end" },
				".justify-items-center": { "justify-items": "center" },
				".justify-items-stretch": { "justify-items": "stretch" }
			});
		},
		gap: (0, _createUtilityPlugin.default)("gap", [["gap", ["gap"]], [["gap-x", ["columnGap"]], ["gap-y", ["rowGap"]]]]),
		space: ({ matchUtilities, addUtilities, theme }) => {
			matchUtilities({
				"space-x": (value) => {
					value = value === "0" ? "0px" : value;
					return { "& > :not([hidden]) ~ :not([hidden])": {
						"--tw-space-x-reverse": "0",
						"margin-right": `calc(${value} * var(--tw-space-x-reverse))`,
						"margin-left": `calc(${value} * calc(1 - var(--tw-space-x-reverse)))`
					} };
				},
				"space-y": (value) => {
					value = value === "0" ? "0px" : value;
					return { "& > :not([hidden]) ~ :not([hidden])": {
						"--tw-space-y-reverse": "0",
						"margin-top": `calc(${value} * calc(1 - var(--tw-space-y-reverse)))`,
						"margin-bottom": `calc(${value} * var(--tw-space-y-reverse))`
					} };
				}
			}, {
				values: theme("space"),
				supportsNegativeValues: true
			});
			addUtilities({
				".space-y-reverse > :not([hidden]) ~ :not([hidden])": { "--tw-space-y-reverse": "1" },
				".space-x-reverse > :not([hidden]) ~ :not([hidden])": { "--tw-space-x-reverse": "1" }
			});
		},
		divideWidth: ({ matchUtilities, addUtilities, theme }) => {
			matchUtilities({
				"divide-x": (value) => {
					value = value === "0" ? "0px" : value;
					return { "& > :not([hidden]) ~ :not([hidden])": {
						"@defaults border-width": {},
						"--tw-divide-x-reverse": "0",
						"border-right-width": `calc(${value} * var(--tw-divide-x-reverse))`,
						"border-left-width": `calc(${value} * calc(1 - var(--tw-divide-x-reverse)))`
					} };
				},
				"divide-y": (value) => {
					value = value === "0" ? "0px" : value;
					return { "& > :not([hidden]) ~ :not([hidden])": {
						"@defaults border-width": {},
						"--tw-divide-y-reverse": "0",
						"border-top-width": `calc(${value} * calc(1 - var(--tw-divide-y-reverse)))`,
						"border-bottom-width": `calc(${value} * var(--tw-divide-y-reverse))`
					} };
				}
			}, {
				values: theme("divideWidth"),
				type: [
					"line-width",
					"length",
					"any"
				]
			});
			addUtilities({
				".divide-y-reverse > :not([hidden]) ~ :not([hidden])": {
					"@defaults border-width": {},
					"--tw-divide-y-reverse": "1"
				},
				".divide-x-reverse > :not([hidden]) ~ :not([hidden])": {
					"@defaults border-width": {},
					"--tw-divide-x-reverse": "1"
				}
			});
		},
		divideStyle: ({ addUtilities }) => {
			addUtilities({
				".divide-solid > :not([hidden]) ~ :not([hidden])": { "border-style": "solid" },
				".divide-dashed > :not([hidden]) ~ :not([hidden])": { "border-style": "dashed" },
				".divide-dotted > :not([hidden]) ~ :not([hidden])": { "border-style": "dotted" },
				".divide-double > :not([hidden]) ~ :not([hidden])": { "border-style": "double" },
				".divide-none > :not([hidden]) ~ :not([hidden])": { "border-style": "none" }
			});
		},
		divideColor: ({ matchUtilities, theme, corePlugins }) => {
			matchUtilities({ divide: (value) => {
				if (!corePlugins("divideOpacity")) return { ["& > :not([hidden]) ~ :not([hidden])"]: { "border-color": (0, _toColorValue.default)(value) } };
				return { ["& > :not([hidden]) ~ :not([hidden])"]: (0, _withAlphaVariable.default)({
					color: value,
					property: "border-color",
					variable: "--tw-divide-opacity"
				}) };
			} }, {
				values: (({ DEFAULT: _, ...colors }) => colors)((0, _flattenColorPalette.default)(theme("divideColor"))),
				type: ["color", "any"]
			});
		},
		divideOpacity: ({ matchUtilities, theme }) => {
			matchUtilities({ "divide-opacity": (value) => {
				return { [`& > :not([hidden]) ~ :not([hidden])`]: { "--tw-divide-opacity": value } };
			} }, { values: theme("divideOpacity") });
		},
		placeSelf: ({ addUtilities }) => {
			addUtilities({
				".place-self-auto": { "place-self": "auto" },
				".place-self-start": { "place-self": "start" },
				".place-self-end": { "place-self": "end" },
				".place-self-center": { "place-self": "center" },
				".place-self-stretch": { "place-self": "stretch" }
			});
		},
		alignSelf: ({ addUtilities }) => {
			addUtilities({
				".self-auto": { "align-self": "auto" },
				".self-start": { "align-self": "flex-start" },
				".self-end": { "align-self": "flex-end" },
				".self-center": { "align-self": "center" },
				".self-stretch": { "align-self": "stretch" },
				".self-baseline": { "align-self": "baseline" }
			});
		},
		justifySelf: ({ addUtilities }) => {
			addUtilities({
				".justify-self-auto": { "justify-self": "auto" },
				".justify-self-start": { "justify-self": "start" },
				".justify-self-end": { "justify-self": "end" },
				".justify-self-center": { "justify-self": "center" },
				".justify-self-stretch": { "justify-self": "stretch" }
			});
		},
		overflow: ({ addUtilities }) => {
			addUtilities({
				".overflow-auto": { overflow: "auto" },
				".overflow-hidden": { overflow: "hidden" },
				".overflow-clip": { overflow: "clip" },
				".overflow-visible": { overflow: "visible" },
				".overflow-scroll": { overflow: "scroll" },
				".overflow-x-auto": { "overflow-x": "auto" },
				".overflow-y-auto": { "overflow-y": "auto" },
				".overflow-x-hidden": { "overflow-x": "hidden" },
				".overflow-y-hidden": { "overflow-y": "hidden" },
				".overflow-x-clip": { "overflow-x": "clip" },
				".overflow-y-clip": { "overflow-y": "clip" },
				".overflow-x-visible": { "overflow-x": "visible" },
				".overflow-y-visible": { "overflow-y": "visible" },
				".overflow-x-scroll": { "overflow-x": "scroll" },
				".overflow-y-scroll": { "overflow-y": "scroll" }
			});
		},
		overscrollBehavior: ({ addUtilities }) => {
			addUtilities({
				".overscroll-auto": { "overscroll-behavior": "auto" },
				".overscroll-contain": { "overscroll-behavior": "contain" },
				".overscroll-none": { "overscroll-behavior": "none" },
				".overscroll-y-auto": { "overscroll-behavior-y": "auto" },
				".overscroll-y-contain": { "overscroll-behavior-y": "contain" },
				".overscroll-y-none": { "overscroll-behavior-y": "none" },
				".overscroll-x-auto": { "overscroll-behavior-x": "auto" },
				".overscroll-x-contain": { "overscroll-behavior-x": "contain" },
				".overscroll-x-none": { "overscroll-behavior-x": "none" }
			});
		},
		scrollBehavior: ({ addUtilities }) => {
			addUtilities({
				".scroll-auto": { "scroll-behavior": "auto" },
				".scroll-smooth": { "scroll-behavior": "smooth" }
			});
		},
		textOverflow: ({ addUtilities }) => {
			addUtilities({
				".truncate": {
					overflow: "hidden",
					"text-overflow": "ellipsis",
					"white-space": "nowrap"
				},
				".overflow-ellipsis": { "text-overflow": "ellipsis" },
				".text-ellipsis": { "text-overflow": "ellipsis" },
				".text-clip": { "text-overflow": "clip" }
			});
		},
		hyphens: ({ addUtilities }) => {
			addUtilities({
				".hyphens-none": { hyphens: "none" },
				".hyphens-manual": { hyphens: "manual" },
				".hyphens-auto": { hyphens: "auto" }
			});
		},
		whitespace: ({ addUtilities }) => {
			addUtilities({
				".whitespace-normal": { "white-space": "normal" },
				".whitespace-nowrap": { "white-space": "nowrap" },
				".whitespace-pre": { "white-space": "pre" },
				".whitespace-pre-line": { "white-space": "pre-line" },
				".whitespace-pre-wrap": { "white-space": "pre-wrap" },
				".whitespace-break-spaces": { "white-space": "break-spaces" }
			});
		},
		textWrap: ({ addUtilities }) => {
			addUtilities({
				".text-wrap": { "text-wrap": "wrap" },
				".text-nowrap": { "text-wrap": "nowrap" },
				".text-balance": { "text-wrap": "balance" },
				".text-pretty": { "text-wrap": "pretty" }
			});
		},
		wordBreak: ({ addUtilities }) => {
			addUtilities({
				".break-normal": {
					"overflow-wrap": "normal",
					"word-break": "normal"
				},
				".break-words": { "overflow-wrap": "break-word" },
				".break-all": { "word-break": "break-all" },
				".break-keep": { "word-break": "keep-all" }
			});
		},
		borderRadius: (0, _createUtilityPlugin.default)("borderRadius", [
			["rounded", ["border-radius"]],
			[
				["rounded-s", ["border-start-start-radius", "border-end-start-radius"]],
				["rounded-e", ["border-start-end-radius", "border-end-end-radius"]],
				["rounded-t", ["border-top-left-radius", "border-top-right-radius"]],
				["rounded-r", ["border-top-right-radius", "border-bottom-right-radius"]],
				["rounded-b", ["border-bottom-right-radius", "border-bottom-left-radius"]],
				["rounded-l", ["border-top-left-radius", "border-bottom-left-radius"]]
			],
			[
				["rounded-ss", ["border-start-start-radius"]],
				["rounded-se", ["border-start-end-radius"]],
				["rounded-ee", ["border-end-end-radius"]],
				["rounded-es", ["border-end-start-radius"]],
				["rounded-tl", ["border-top-left-radius"]],
				["rounded-tr", ["border-top-right-radius"]],
				["rounded-br", ["border-bottom-right-radius"]],
				["rounded-bl", ["border-bottom-left-radius"]]
			]
		]),
		borderWidth: (0, _createUtilityPlugin.default)("borderWidth", [
			["border", [["@defaults border-width", {}], "border-width"]],
			[["border-x", [
				["@defaults border-width", {}],
				"border-left-width",
				"border-right-width"
			]], ["border-y", [
				["@defaults border-width", {}],
				"border-top-width",
				"border-bottom-width"
			]]],
			[
				["border-s", [["@defaults border-width", {}], "border-inline-start-width"]],
				["border-e", [["@defaults border-width", {}], "border-inline-end-width"]],
				["border-t", [["@defaults border-width", {}], "border-top-width"]],
				["border-r", [["@defaults border-width", {}], "border-right-width"]],
				["border-b", [["@defaults border-width", {}], "border-bottom-width"]],
				["border-l", [["@defaults border-width", {}], "border-left-width"]]
			]
		], { type: ["line-width", "length"] }),
		borderStyle: ({ addUtilities }) => {
			addUtilities({
				".border-solid": { "border-style": "solid" },
				".border-dashed": { "border-style": "dashed" },
				".border-dotted": { "border-style": "dotted" },
				".border-double": { "border-style": "double" },
				".border-hidden": { "border-style": "hidden" },
				".border-none": { "border-style": "none" }
			});
		},
		borderColor: ({ matchUtilities, theme, corePlugins }) => {
			matchUtilities({ border: (value) => {
				if (!corePlugins("borderOpacity")) return { "border-color": (0, _toColorValue.default)(value) };
				return (0, _withAlphaVariable.default)({
					color: value,
					property: "border-color",
					variable: "--tw-border-opacity"
				});
			} }, {
				values: (({ DEFAULT: _, ...colors }) => colors)((0, _flattenColorPalette.default)(theme("borderColor"))),
				type: ["color", "any"]
			});
			matchUtilities({
				"border-x": (value) => {
					if (!corePlugins("borderOpacity")) return {
						"border-left-color": (0, _toColorValue.default)(value),
						"border-right-color": (0, _toColorValue.default)(value)
					};
					return (0, _withAlphaVariable.default)({
						color: value,
						property: ["border-left-color", "border-right-color"],
						variable: "--tw-border-opacity"
					});
				},
				"border-y": (value) => {
					if (!corePlugins("borderOpacity")) return {
						"border-top-color": (0, _toColorValue.default)(value),
						"border-bottom-color": (0, _toColorValue.default)(value)
					};
					return (0, _withAlphaVariable.default)({
						color: value,
						property: ["border-top-color", "border-bottom-color"],
						variable: "--tw-border-opacity"
					});
				}
			}, {
				values: (({ DEFAULT: _, ...colors }) => colors)((0, _flattenColorPalette.default)(theme("borderColor"))),
				type: ["color", "any"]
			});
			matchUtilities({
				"border-s": (value) => {
					if (!corePlugins("borderOpacity")) return { "border-inline-start-color": (0, _toColorValue.default)(value) };
					return (0, _withAlphaVariable.default)({
						color: value,
						property: "border-inline-start-color",
						variable: "--tw-border-opacity"
					});
				},
				"border-e": (value) => {
					if (!corePlugins("borderOpacity")) return { "border-inline-end-color": (0, _toColorValue.default)(value) };
					return (0, _withAlphaVariable.default)({
						color: value,
						property: "border-inline-end-color",
						variable: "--tw-border-opacity"
					});
				},
				"border-t": (value) => {
					if (!corePlugins("borderOpacity")) return { "border-top-color": (0, _toColorValue.default)(value) };
					return (0, _withAlphaVariable.default)({
						color: value,
						property: "border-top-color",
						variable: "--tw-border-opacity"
					});
				},
				"border-r": (value) => {
					if (!corePlugins("borderOpacity")) return { "border-right-color": (0, _toColorValue.default)(value) };
					return (0, _withAlphaVariable.default)({
						color: value,
						property: "border-right-color",
						variable: "--tw-border-opacity"
					});
				},
				"border-b": (value) => {
					if (!corePlugins("borderOpacity")) return { "border-bottom-color": (0, _toColorValue.default)(value) };
					return (0, _withAlphaVariable.default)({
						color: value,
						property: "border-bottom-color",
						variable: "--tw-border-opacity"
					});
				},
				"border-l": (value) => {
					if (!corePlugins("borderOpacity")) return { "border-left-color": (0, _toColorValue.default)(value) };
					return (0, _withAlphaVariable.default)({
						color: value,
						property: "border-left-color",
						variable: "--tw-border-opacity"
					});
				}
			}, {
				values: (({ DEFAULT: _, ...colors }) => colors)((0, _flattenColorPalette.default)(theme("borderColor"))),
				type: ["color", "any"]
			});
		},
		borderOpacity: (0, _createUtilityPlugin.default)("borderOpacity", [["border-opacity", ["--tw-border-opacity"]]]),
		backgroundColor: ({ matchUtilities, theme, corePlugins }) => {
			matchUtilities({ bg: (value) => {
				if (!corePlugins("backgroundOpacity")) return { "background-color": (0, _toColorValue.default)(value) };
				return (0, _withAlphaVariable.default)({
					color: value,
					property: "background-color",
					variable: "--tw-bg-opacity"
				});
			} }, {
				values: (0, _flattenColorPalette.default)(theme("backgroundColor")),
				type: ["color", "any"]
			});
		},
		backgroundOpacity: (0, _createUtilityPlugin.default)("backgroundOpacity", [["bg-opacity", ["--tw-bg-opacity"]]]),
		backgroundImage: (0, _createUtilityPlugin.default)("backgroundImage", [["bg", ["background-image"]]], { type: [
			"lookup",
			"image",
			"url"
		] }),
		gradientColorStops: (() => {
			function transparentTo(value) {
				return (0, _withAlphaVariable.withAlphaValue)(value, 0, "rgb(255 255 255 / 0)");
			}
			return function({ matchUtilities, theme, addDefaults }) {
				addDefaults("gradient-color-stops", {
					"--tw-gradient-from-position": " ",
					"--tw-gradient-via-position": " ",
					"--tw-gradient-to-position": " "
				});
				let options = {
					values: (0, _flattenColorPalette.default)(theme("gradientColorStops")),
					type: ["color", "any"]
				};
				let positionOptions = {
					values: theme("gradientColorStopPositions"),
					type: ["length", "percentage"]
				};
				matchUtilities({ from: (value) => {
					let transparentToValue = transparentTo(value);
					return {
						"@defaults gradient-color-stops": {},
						"--tw-gradient-from": `${(0, _toColorValue.default)(value)} var(--tw-gradient-from-position)`,
						"--tw-gradient-to": `${transparentToValue} var(--tw-gradient-to-position)`,
						"--tw-gradient-stops": `var(--tw-gradient-from), var(--tw-gradient-to)`
					};
				} }, options);
				matchUtilities({ from: (value) => {
					return { "--tw-gradient-from-position": value };
				} }, positionOptions);
				matchUtilities({ via: (value) => {
					let transparentToValue = transparentTo(value);
					return {
						"@defaults gradient-color-stops": {},
						"--tw-gradient-to": `${transparentToValue}  var(--tw-gradient-to-position)`,
						"--tw-gradient-stops": `var(--tw-gradient-from), ${(0, _toColorValue.default)(value)} var(--tw-gradient-via-position), var(--tw-gradient-to)`
					};
				} }, options);
				matchUtilities({ via: (value) => {
					return { "--tw-gradient-via-position": value };
				} }, positionOptions);
				matchUtilities({ to: (value) => ({
					"@defaults gradient-color-stops": {},
					"--tw-gradient-to": `${(0, _toColorValue.default)(value)} var(--tw-gradient-to-position)`
				}) }, options);
				matchUtilities({ to: (value) => {
					return { "--tw-gradient-to-position": value };
				} }, positionOptions);
			};
		})(),
		boxDecorationBreak: ({ addUtilities }) => {
			addUtilities({
				".decoration-slice": { "box-decoration-break": "slice" },
				".decoration-clone": { "box-decoration-break": "clone" },
				".box-decoration-slice": { "box-decoration-break": "slice" },
				".box-decoration-clone": { "box-decoration-break": "clone" }
			});
		},
		backgroundSize: (0, _createUtilityPlugin.default)("backgroundSize", [["bg", ["background-size"]]], { type: [
			"lookup",
			"length",
			"percentage",
			"size"
		] }),
		backgroundAttachment: ({ addUtilities }) => {
			addUtilities({
				".bg-fixed": { "background-attachment": "fixed" },
				".bg-local": { "background-attachment": "local" },
				".bg-scroll": { "background-attachment": "scroll" }
			});
		},
		backgroundClip: ({ addUtilities }) => {
			addUtilities({
				".bg-clip-border": { "background-clip": "border-box" },
				".bg-clip-padding": { "background-clip": "padding-box" },
				".bg-clip-content": { "background-clip": "content-box" },
				".bg-clip-text": { "background-clip": "text" }
			});
		},
		backgroundPosition: (0, _createUtilityPlugin.default)("backgroundPosition", [["bg", ["background-position"]]], { type: ["lookup", ["position", { preferOnConflict: true }]] }),
		backgroundRepeat: ({ addUtilities }) => {
			addUtilities({
				".bg-repeat": { "background-repeat": "repeat" },
				".bg-no-repeat": { "background-repeat": "no-repeat" },
				".bg-repeat-x": { "background-repeat": "repeat-x" },
				".bg-repeat-y": { "background-repeat": "repeat-y" },
				".bg-repeat-round": { "background-repeat": "round" },
				".bg-repeat-space": { "background-repeat": "space" }
			});
		},
		backgroundOrigin: ({ addUtilities }) => {
			addUtilities({
				".bg-origin-border": { "background-origin": "border-box" },
				".bg-origin-padding": { "background-origin": "padding-box" },
				".bg-origin-content": { "background-origin": "content-box" }
			});
		},
		fill: ({ matchUtilities, theme }) => {
			matchUtilities({ fill: (value) => {
				return { fill: (0, _toColorValue.default)(value) };
			} }, {
				values: (0, _flattenColorPalette.default)(theme("fill")),
				type: ["color", "any"]
			});
		},
		stroke: ({ matchUtilities, theme }) => {
			matchUtilities({ stroke: (value) => {
				return { stroke: (0, _toColorValue.default)(value) };
			} }, {
				values: (0, _flattenColorPalette.default)(theme("stroke")),
				type: [
					"color",
					"url",
					"any"
				]
			});
		},
		strokeWidth: (0, _createUtilityPlugin.default)("strokeWidth", [["stroke", ["stroke-width"]]], { type: [
			"length",
			"number",
			"percentage"
		] }),
		objectFit: ({ addUtilities }) => {
			addUtilities({
				".object-contain": { "object-fit": "contain" },
				".object-cover": { "object-fit": "cover" },
				".object-fill": { "object-fit": "fill" },
				".object-none": { "object-fit": "none" },
				".object-scale-down": { "object-fit": "scale-down" }
			});
		},
		objectPosition: (0, _createUtilityPlugin.default)("objectPosition", [["object", ["object-position"]]]),
		padding: (0, _createUtilityPlugin.default)("padding", [
			["p", ["padding"]],
			[["px", ["padding-left", "padding-right"]], ["py", ["padding-top", "padding-bottom"]]],
			[
				["ps", ["padding-inline-start"]],
				["pe", ["padding-inline-end"]],
				["pt", ["padding-top"]],
				["pr", ["padding-right"]],
				["pb", ["padding-bottom"]],
				["pl", ["padding-left"]]
			]
		]),
		textAlign: ({ addUtilities }) => {
			addUtilities({
				".text-left": { "text-align": "left" },
				".text-center": { "text-align": "center" },
				".text-right": { "text-align": "right" },
				".text-justify": { "text-align": "justify" },
				".text-start": { "text-align": "start" },
				".text-end": { "text-align": "end" }
			});
		},
		textIndent: (0, _createUtilityPlugin.default)("textIndent", [["indent", ["text-indent"]]], { supportsNegativeValues: true }),
		verticalAlign: ({ addUtilities, matchUtilities }) => {
			addUtilities({
				".align-baseline": { "vertical-align": "baseline" },
				".align-top": { "vertical-align": "top" },
				".align-middle": { "vertical-align": "middle" },
				".align-bottom": { "vertical-align": "bottom" },
				".align-text-top": { "vertical-align": "text-top" },
				".align-text-bottom": { "vertical-align": "text-bottom" },
				".align-sub": { "vertical-align": "sub" },
				".align-super": { "vertical-align": "super" }
			});
			matchUtilities({ align: (value) => ({ "vertical-align": value }) });
		},
		fontFamily: ({ matchUtilities, theme }) => {
			matchUtilities({ font: (value) => {
				let [families, options = {}] = Array.isArray(value) && (0, _isPlainObject.default)(value[1]) ? value : [value];
				let { fontFeatureSettings, fontVariationSettings } = options;
				return {
					"font-family": Array.isArray(families) ? families.join(", ") : families,
					...fontFeatureSettings === void 0 ? {} : { "font-feature-settings": fontFeatureSettings },
					...fontVariationSettings === void 0 ? {} : { "font-variation-settings": fontVariationSettings }
				};
			} }, {
				values: theme("fontFamily"),
				type: [
					"lookup",
					"generic-name",
					"family-name"
				]
			});
		},
		fontSize: ({ matchUtilities, theme }) => {
			matchUtilities({ text: (value, { modifier }) => {
				let [fontSize, options] = Array.isArray(value) ? value : [value];
				if (modifier) return {
					"font-size": fontSize,
					"line-height": modifier
				};
				let { lineHeight, letterSpacing, fontWeight } = (0, _isPlainObject.default)(options) ? options : { lineHeight: options };
				return {
					"font-size": fontSize,
					...lineHeight === void 0 ? {} : { "line-height": lineHeight },
					...letterSpacing === void 0 ? {} : { "letter-spacing": letterSpacing },
					...fontWeight === void 0 ? {} : { "font-weight": fontWeight }
				};
			} }, {
				values: theme("fontSize"),
				modifiers: theme("lineHeight"),
				type: [
					"absolute-size",
					"relative-size",
					"length",
					"percentage"
				]
			});
		},
		fontWeight: (0, _createUtilityPlugin.default)("fontWeight", [["font", ["fontWeight"]]], { type: [
			"lookup",
			"number",
			"any"
		] }),
		textTransform: ({ addUtilities }) => {
			addUtilities({
				".uppercase": { "text-transform": "uppercase" },
				".lowercase": { "text-transform": "lowercase" },
				".capitalize": { "text-transform": "capitalize" },
				".normal-case": { "text-transform": "none" }
			});
		},
		fontStyle: ({ addUtilities }) => {
			addUtilities({
				".italic": { "font-style": "italic" },
				".not-italic": { "font-style": "normal" }
			});
		},
		fontVariantNumeric: ({ addDefaults, addUtilities }) => {
			let cssFontVariantNumericValue = "var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)";
			addDefaults("font-variant-numeric", {
				"--tw-ordinal": " ",
				"--tw-slashed-zero": " ",
				"--tw-numeric-figure": " ",
				"--tw-numeric-spacing": " ",
				"--tw-numeric-fraction": " "
			});
			addUtilities({
				".normal-nums": { "font-variant-numeric": "normal" },
				".ordinal": {
					"@defaults font-variant-numeric": {},
					"--tw-ordinal": "ordinal",
					"font-variant-numeric": cssFontVariantNumericValue
				},
				".slashed-zero": {
					"@defaults font-variant-numeric": {},
					"--tw-slashed-zero": "slashed-zero",
					"font-variant-numeric": cssFontVariantNumericValue
				},
				".lining-nums": {
					"@defaults font-variant-numeric": {},
					"--tw-numeric-figure": "lining-nums",
					"font-variant-numeric": cssFontVariantNumericValue
				},
				".oldstyle-nums": {
					"@defaults font-variant-numeric": {},
					"--tw-numeric-figure": "oldstyle-nums",
					"font-variant-numeric": cssFontVariantNumericValue
				},
				".proportional-nums": {
					"@defaults font-variant-numeric": {},
					"--tw-numeric-spacing": "proportional-nums",
					"font-variant-numeric": cssFontVariantNumericValue
				},
				".tabular-nums": {
					"@defaults font-variant-numeric": {},
					"--tw-numeric-spacing": "tabular-nums",
					"font-variant-numeric": cssFontVariantNumericValue
				},
				".diagonal-fractions": {
					"@defaults font-variant-numeric": {},
					"--tw-numeric-fraction": "diagonal-fractions",
					"font-variant-numeric": cssFontVariantNumericValue
				},
				".stacked-fractions": {
					"@defaults font-variant-numeric": {},
					"--tw-numeric-fraction": "stacked-fractions",
					"font-variant-numeric": cssFontVariantNumericValue
				}
			});
		},
		lineHeight: (0, _createUtilityPlugin.default)("lineHeight", [["leading", ["lineHeight"]]]),
		letterSpacing: (0, _createUtilityPlugin.default)("letterSpacing", [["tracking", ["letterSpacing"]]], { supportsNegativeValues: true }),
		textColor: ({ matchUtilities, theme, corePlugins }) => {
			matchUtilities({ text: (value) => {
				if (!corePlugins("textOpacity")) return { color: (0, _toColorValue.default)(value) };
				return (0, _withAlphaVariable.default)({
					color: value,
					property: "color",
					variable: "--tw-text-opacity"
				});
			} }, {
				values: (0, _flattenColorPalette.default)(theme("textColor")),
				type: ["color", "any"]
			});
		},
		textOpacity: (0, _createUtilityPlugin.default)("textOpacity", [["text-opacity", ["--tw-text-opacity"]]]),
		textDecoration: ({ addUtilities }) => {
			addUtilities({
				".underline": { "text-decoration-line": "underline" },
				".overline": { "text-decoration-line": "overline" },
				".line-through": { "text-decoration-line": "line-through" },
				".no-underline": { "text-decoration-line": "none" }
			});
		},
		textDecorationColor: ({ matchUtilities, theme }) => {
			matchUtilities({ decoration: (value) => {
				return { "text-decoration-color": (0, _toColorValue.default)(value) };
			} }, {
				values: (0, _flattenColorPalette.default)(theme("textDecorationColor")),
				type: ["color", "any"]
			});
		},
		textDecorationStyle: ({ addUtilities }) => {
			addUtilities({
				".decoration-solid": { "text-decoration-style": "solid" },
				".decoration-double": { "text-decoration-style": "double" },
				".decoration-dotted": { "text-decoration-style": "dotted" },
				".decoration-dashed": { "text-decoration-style": "dashed" },
				".decoration-wavy": { "text-decoration-style": "wavy" }
			});
		},
		textDecorationThickness: (0, _createUtilityPlugin.default)("textDecorationThickness", [["decoration", ["text-decoration-thickness"]]], { type: ["length", "percentage"] }),
		textUnderlineOffset: (0, _createUtilityPlugin.default)("textUnderlineOffset", [["underline-offset", ["text-underline-offset"]]], { type: [
			"length",
			"percentage",
			"any"
		] }),
		fontSmoothing: ({ addUtilities }) => {
			addUtilities({
				".antialiased": {
					"-webkit-font-smoothing": "antialiased",
					"-moz-osx-font-smoothing": "grayscale"
				},
				".subpixel-antialiased": {
					"-webkit-font-smoothing": "auto",
					"-moz-osx-font-smoothing": "auto"
				}
			});
		},
		placeholderColor: ({ matchUtilities, theme, corePlugins }) => {
			matchUtilities({ placeholder: (value) => {
				if (!corePlugins("placeholderOpacity")) return { "&::placeholder": { color: (0, _toColorValue.default)(value) } };
				return { "&::placeholder": (0, _withAlphaVariable.default)({
					color: value,
					property: "color",
					variable: "--tw-placeholder-opacity"
				}) };
			} }, {
				values: (0, _flattenColorPalette.default)(theme("placeholderColor")),
				type: ["color", "any"]
			});
		},
		placeholderOpacity: ({ matchUtilities, theme }) => {
			matchUtilities({ "placeholder-opacity": (value) => {
				return { ["&::placeholder"]: { "--tw-placeholder-opacity": value } };
			} }, { values: theme("placeholderOpacity") });
		},
		caretColor: ({ matchUtilities, theme }) => {
			matchUtilities({ caret: (value) => {
				return { "caret-color": (0, _toColorValue.default)(value) };
			} }, {
				values: (0, _flattenColorPalette.default)(theme("caretColor")),
				type: ["color", "any"]
			});
		},
		accentColor: ({ matchUtilities, theme }) => {
			matchUtilities({ accent: (value) => {
				return { "accent-color": (0, _toColorValue.default)(value) };
			} }, {
				values: (0, _flattenColorPalette.default)(theme("accentColor")),
				type: ["color", "any"]
			});
		},
		opacity: (0, _createUtilityPlugin.default)("opacity", [["opacity", ["opacity"]]]),
		backgroundBlendMode: ({ addUtilities }) => {
			addUtilities({
				".bg-blend-normal": { "background-blend-mode": "normal" },
				".bg-blend-multiply": { "background-blend-mode": "multiply" },
				".bg-blend-screen": { "background-blend-mode": "screen" },
				".bg-blend-overlay": { "background-blend-mode": "overlay" },
				".bg-blend-darken": { "background-blend-mode": "darken" },
				".bg-blend-lighten": { "background-blend-mode": "lighten" },
				".bg-blend-color-dodge": { "background-blend-mode": "color-dodge" },
				".bg-blend-color-burn": { "background-blend-mode": "color-burn" },
				".bg-blend-hard-light": { "background-blend-mode": "hard-light" },
				".bg-blend-soft-light": { "background-blend-mode": "soft-light" },
				".bg-blend-difference": { "background-blend-mode": "difference" },
				".bg-blend-exclusion": { "background-blend-mode": "exclusion" },
				".bg-blend-hue": { "background-blend-mode": "hue" },
				".bg-blend-saturation": { "background-blend-mode": "saturation" },
				".bg-blend-color": { "background-blend-mode": "color" },
				".bg-blend-luminosity": { "background-blend-mode": "luminosity" }
			});
		},
		mixBlendMode: ({ addUtilities }) => {
			addUtilities({
				".mix-blend-normal": { "mix-blend-mode": "normal" },
				".mix-blend-multiply": { "mix-blend-mode": "multiply" },
				".mix-blend-screen": { "mix-blend-mode": "screen" },
				".mix-blend-overlay": { "mix-blend-mode": "overlay" },
				".mix-blend-darken": { "mix-blend-mode": "darken" },
				".mix-blend-lighten": { "mix-blend-mode": "lighten" },
				".mix-blend-color-dodge": { "mix-blend-mode": "color-dodge" },
				".mix-blend-color-burn": { "mix-blend-mode": "color-burn" },
				".mix-blend-hard-light": { "mix-blend-mode": "hard-light" },
				".mix-blend-soft-light": { "mix-blend-mode": "soft-light" },
				".mix-blend-difference": { "mix-blend-mode": "difference" },
				".mix-blend-exclusion": { "mix-blend-mode": "exclusion" },
				".mix-blend-hue": { "mix-blend-mode": "hue" },
				".mix-blend-saturation": { "mix-blend-mode": "saturation" },
				".mix-blend-color": { "mix-blend-mode": "color" },
				".mix-blend-luminosity": { "mix-blend-mode": "luminosity" },
				".mix-blend-plus-darker": { "mix-blend-mode": "plus-darker" },
				".mix-blend-plus-lighter": { "mix-blend-mode": "plus-lighter" }
			});
		},
		boxShadow: (() => {
			let transformValue = (0, _transformThemeValue.default)("boxShadow");
			let defaultBoxShadow = [
				`var(--tw-ring-offset-shadow, 0 0 #0000)`,
				`var(--tw-ring-shadow, 0 0 #0000)`,
				`var(--tw-shadow)`
			].join(", ");
			return function({ matchUtilities, addDefaults, theme }) {
				addDefaults("box-shadow", {
					"--tw-ring-offset-shadow": "0 0 #0000",
					"--tw-ring-shadow": "0 0 #0000",
					"--tw-shadow": "0 0 #0000",
					"--tw-shadow-colored": "0 0 #0000"
				});
				matchUtilities({ shadow: (value) => {
					value = transformValue(value);
					let ast = (0, _parseBoxShadowValue.parseBoxShadowValue)(value);
					for (let shadow of ast) {
						if (!shadow.valid) continue;
						shadow.color = "var(--tw-shadow-color)";
					}
					return {
						"@defaults box-shadow": {},
						"--tw-shadow": value === "none" ? "0 0 #0000" : value,
						"--tw-shadow-colored": value === "none" ? "0 0 #0000" : (0, _parseBoxShadowValue.formatBoxShadowValue)(ast),
						"box-shadow": defaultBoxShadow
					};
				} }, {
					values: theme("boxShadow"),
					type: ["shadow"]
				});
			};
		})(),
		boxShadowColor: ({ matchUtilities, theme }) => {
			matchUtilities({ shadow: (value) => {
				return {
					"--tw-shadow-color": (0, _toColorValue.default)(value),
					"--tw-shadow": "var(--tw-shadow-colored)"
				};
			} }, {
				values: (0, _flattenColorPalette.default)(theme("boxShadowColor")),
				type: ["color", "any"]
			});
		},
		outlineStyle: ({ addUtilities }) => {
			addUtilities({
				".outline-none": {
					outline: "2px solid transparent",
					"outline-offset": "2px"
				},
				".outline": { "outline-style": "solid" },
				".outline-dashed": { "outline-style": "dashed" },
				".outline-dotted": { "outline-style": "dotted" },
				".outline-double": { "outline-style": "double" }
			});
		},
		outlineWidth: (0, _createUtilityPlugin.default)("outlineWidth", [["outline", ["outline-width"]]], { type: [
			"length",
			"number",
			"percentage"
		] }),
		outlineOffset: (0, _createUtilityPlugin.default)("outlineOffset", [["outline-offset", ["outline-offset"]]], {
			type: [
				"length",
				"number",
				"percentage",
				"any"
			],
			supportsNegativeValues: true
		}),
		outlineColor: ({ matchUtilities, theme }) => {
			matchUtilities({ outline: (value) => {
				return { "outline-color": (0, _toColorValue.default)(value) };
			} }, {
				values: (0, _flattenColorPalette.default)(theme("outlineColor")),
				type: ["color", "any"]
			});
		},
		ringWidth: ({ matchUtilities, addDefaults, addUtilities, theme, config }) => {
			let ringColorDefault = (() => {
				var _theme, _theme1;
				if ((0, _featureFlags.flagEnabled)(config(), "respectDefaultRingColorOpacity")) return theme("ringColor.DEFAULT");
				let ringOpacityDefault = theme("ringOpacity.DEFAULT", "0.5");
				if (!((_theme = theme("ringColor")) === null || _theme === void 0 ? void 0 : _theme.DEFAULT)) return `rgb(147 197 253 / ${ringOpacityDefault})`;
				return (0, _withAlphaVariable.withAlphaValue)((_theme1 = theme("ringColor")) === null || _theme1 === void 0 ? void 0 : _theme1.DEFAULT, ringOpacityDefault, `rgb(147 197 253 / ${ringOpacityDefault})`);
			})();
			addDefaults("ring-width", {
				"--tw-ring-inset": " ",
				"--tw-ring-offset-width": theme("ringOffsetWidth.DEFAULT", "0px"),
				"--tw-ring-offset-color": theme("ringOffsetColor.DEFAULT", "#fff"),
				"--tw-ring-color": ringColorDefault,
				"--tw-ring-offset-shadow": "0 0 #0000",
				"--tw-ring-shadow": "0 0 #0000",
				"--tw-shadow": "0 0 #0000",
				"--tw-shadow-colored": "0 0 #0000"
			});
			matchUtilities({ ring: (value) => {
				return {
					"@defaults ring-width": {},
					"--tw-ring-offset-shadow": `var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,
					"--tw-ring-shadow": `var(--tw-ring-inset) 0 0 0 calc(${value} + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
					"box-shadow": [
						`var(--tw-ring-offset-shadow)`,
						`var(--tw-ring-shadow)`,
						`var(--tw-shadow, 0 0 #0000)`
					].join(", ")
				};
			} }, {
				values: theme("ringWidth"),
				type: "length"
			});
			addUtilities({ ".ring-inset": {
				"@defaults ring-width": {},
				"--tw-ring-inset": "inset"
			} });
		},
		ringColor: ({ matchUtilities, theme, corePlugins }) => {
			matchUtilities({ ring: (value) => {
				if (!corePlugins("ringOpacity")) return { "--tw-ring-color": (0, _toColorValue.default)(value) };
				return (0, _withAlphaVariable.default)({
					color: value,
					property: "--tw-ring-color",
					variable: "--tw-ring-opacity"
				});
			} }, {
				values: Object.fromEntries(Object.entries((0, _flattenColorPalette.default)(theme("ringColor"))).filter(([modifier]) => modifier !== "DEFAULT")),
				type: ["color", "any"]
			});
		},
		ringOpacity: (helpers) => {
			let { config } = helpers;
			return (0, _createUtilityPlugin.default)("ringOpacity", [["ring-opacity", ["--tw-ring-opacity"]]], { filterDefault: !(0, _featureFlags.flagEnabled)(config(), "respectDefaultRingColorOpacity") })(helpers);
		},
		ringOffsetWidth: (0, _createUtilityPlugin.default)("ringOffsetWidth", [["ring-offset", ["--tw-ring-offset-width"]]], { type: "length" }),
		ringOffsetColor: ({ matchUtilities, theme }) => {
			matchUtilities({ "ring-offset": (value) => {
				return { "--tw-ring-offset-color": (0, _toColorValue.default)(value) };
			} }, {
				values: (0, _flattenColorPalette.default)(theme("ringOffsetColor")),
				type: ["color", "any"]
			});
		},
		blur: ({ matchUtilities, theme }) => {
			matchUtilities({ blur: (value) => {
				return {
					"--tw-blur": value.trim() === "" ? " " : `blur(${value})`,
					"@defaults filter": {},
					filter: cssFilterValue
				};
			} }, { values: theme("blur") });
		},
		brightness: ({ matchUtilities, theme }) => {
			matchUtilities({ brightness: (value) => {
				return {
					"--tw-brightness": `brightness(${value})`,
					"@defaults filter": {},
					filter: cssFilterValue
				};
			} }, { values: theme("brightness") });
		},
		contrast: ({ matchUtilities, theme }) => {
			matchUtilities({ contrast: (value) => {
				return {
					"--tw-contrast": `contrast(${value})`,
					"@defaults filter": {},
					filter: cssFilterValue
				};
			} }, { values: theme("contrast") });
		},
		dropShadow: ({ matchUtilities, theme }) => {
			matchUtilities({ "drop-shadow": (value) => {
				return {
					"--tw-drop-shadow": Array.isArray(value) ? value.map((v) => `drop-shadow(${v})`).join(" ") : `drop-shadow(${value})`,
					"@defaults filter": {},
					filter: cssFilterValue
				};
			} }, { values: theme("dropShadow") });
		},
		grayscale: ({ matchUtilities, theme }) => {
			matchUtilities({ grayscale: (value) => {
				return {
					"--tw-grayscale": `grayscale(${value})`,
					"@defaults filter": {},
					filter: cssFilterValue
				};
			} }, { values: theme("grayscale") });
		},
		hueRotate: ({ matchUtilities, theme }) => {
			matchUtilities({ "hue-rotate": (value) => {
				return {
					"--tw-hue-rotate": `hue-rotate(${value})`,
					"@defaults filter": {},
					filter: cssFilterValue
				};
			} }, {
				values: theme("hueRotate"),
				supportsNegativeValues: true
			});
		},
		invert: ({ matchUtilities, theme }) => {
			matchUtilities({ invert: (value) => {
				return {
					"--tw-invert": `invert(${value})`,
					"@defaults filter": {},
					filter: cssFilterValue
				};
			} }, { values: theme("invert") });
		},
		saturate: ({ matchUtilities, theme }) => {
			matchUtilities({ saturate: (value) => {
				return {
					"--tw-saturate": `saturate(${value})`,
					"@defaults filter": {},
					filter: cssFilterValue
				};
			} }, { values: theme("saturate") });
		},
		sepia: ({ matchUtilities, theme }) => {
			matchUtilities({ sepia: (value) => {
				return {
					"--tw-sepia": `sepia(${value})`,
					"@defaults filter": {},
					filter: cssFilterValue
				};
			} }, { values: theme("sepia") });
		},
		filter: ({ addDefaults, addUtilities }) => {
			addDefaults("filter", {
				"--tw-blur": " ",
				"--tw-brightness": " ",
				"--tw-contrast": " ",
				"--tw-grayscale": " ",
				"--tw-hue-rotate": " ",
				"--tw-invert": " ",
				"--tw-saturate": " ",
				"--tw-sepia": " ",
				"--tw-drop-shadow": " "
			});
			addUtilities({
				".filter": {
					"@defaults filter": {},
					filter: cssFilterValue
				},
				".filter-none": { filter: "none" }
			});
		},
		backdropBlur: ({ matchUtilities, theme }) => {
			matchUtilities({ "backdrop-blur": (value) => {
				return {
					"--tw-backdrop-blur": value.trim() === "" ? " " : `blur(${value})`,
					"@defaults backdrop-filter": {},
					"-webkit-backdrop-filter": cssBackdropFilterValue,
					"backdrop-filter": cssBackdropFilterValue
				};
			} }, { values: theme("backdropBlur") });
		},
		backdropBrightness: ({ matchUtilities, theme }) => {
			matchUtilities({ "backdrop-brightness": (value) => {
				return {
					"--tw-backdrop-brightness": `brightness(${value})`,
					"@defaults backdrop-filter": {},
					"-webkit-backdrop-filter": cssBackdropFilterValue,
					"backdrop-filter": cssBackdropFilterValue
				};
			} }, { values: theme("backdropBrightness") });
		},
		backdropContrast: ({ matchUtilities, theme }) => {
			matchUtilities({ "backdrop-contrast": (value) => {
				return {
					"--tw-backdrop-contrast": `contrast(${value})`,
					"@defaults backdrop-filter": {},
					"-webkit-backdrop-filter": cssBackdropFilterValue,
					"backdrop-filter": cssBackdropFilterValue
				};
			} }, { values: theme("backdropContrast") });
		},
		backdropGrayscale: ({ matchUtilities, theme }) => {
			matchUtilities({ "backdrop-grayscale": (value) => {
				return {
					"--tw-backdrop-grayscale": `grayscale(${value})`,
					"@defaults backdrop-filter": {},
					"-webkit-backdrop-filter": cssBackdropFilterValue,
					"backdrop-filter": cssBackdropFilterValue
				};
			} }, { values: theme("backdropGrayscale") });
		},
		backdropHueRotate: ({ matchUtilities, theme }) => {
			matchUtilities({ "backdrop-hue-rotate": (value) => {
				return {
					"--tw-backdrop-hue-rotate": `hue-rotate(${value})`,
					"@defaults backdrop-filter": {},
					"-webkit-backdrop-filter": cssBackdropFilterValue,
					"backdrop-filter": cssBackdropFilterValue
				};
			} }, {
				values: theme("backdropHueRotate"),
				supportsNegativeValues: true
			});
		},
		backdropInvert: ({ matchUtilities, theme }) => {
			matchUtilities({ "backdrop-invert": (value) => {
				return {
					"--tw-backdrop-invert": `invert(${value})`,
					"@defaults backdrop-filter": {},
					"-webkit-backdrop-filter": cssBackdropFilterValue,
					"backdrop-filter": cssBackdropFilterValue
				};
			} }, { values: theme("backdropInvert") });
		},
		backdropOpacity: ({ matchUtilities, theme }) => {
			matchUtilities({ "backdrop-opacity": (value) => {
				return {
					"--tw-backdrop-opacity": `opacity(${value})`,
					"@defaults backdrop-filter": {},
					"-webkit-backdrop-filter": cssBackdropFilterValue,
					"backdrop-filter": cssBackdropFilterValue
				};
			} }, { values: theme("backdropOpacity") });
		},
		backdropSaturate: ({ matchUtilities, theme }) => {
			matchUtilities({ "backdrop-saturate": (value) => {
				return {
					"--tw-backdrop-saturate": `saturate(${value})`,
					"@defaults backdrop-filter": {},
					"-webkit-backdrop-filter": cssBackdropFilterValue,
					"backdrop-filter": cssBackdropFilterValue
				};
			} }, { values: theme("backdropSaturate") });
		},
		backdropSepia: ({ matchUtilities, theme }) => {
			matchUtilities({ "backdrop-sepia": (value) => {
				return {
					"--tw-backdrop-sepia": `sepia(${value})`,
					"@defaults backdrop-filter": {},
					"-webkit-backdrop-filter": cssBackdropFilterValue,
					"backdrop-filter": cssBackdropFilterValue
				};
			} }, { values: theme("backdropSepia") });
		},
		backdropFilter: ({ addDefaults, addUtilities }) => {
			addDefaults("backdrop-filter", {
				"--tw-backdrop-blur": " ",
				"--tw-backdrop-brightness": " ",
				"--tw-backdrop-contrast": " ",
				"--tw-backdrop-grayscale": " ",
				"--tw-backdrop-hue-rotate": " ",
				"--tw-backdrop-invert": " ",
				"--tw-backdrop-opacity": " ",
				"--tw-backdrop-saturate": " ",
				"--tw-backdrop-sepia": " "
			});
			addUtilities({
				".backdrop-filter": {
					"@defaults backdrop-filter": {},
					"-webkit-backdrop-filter": cssBackdropFilterValue,
					"backdrop-filter": cssBackdropFilterValue
				},
				".backdrop-filter-none": {
					"-webkit-backdrop-filter": "none",
					"backdrop-filter": "none"
				}
			});
		},
		transitionProperty: ({ matchUtilities, theme }) => {
			let defaultTimingFunction = theme("transitionTimingFunction.DEFAULT");
			let defaultDuration = theme("transitionDuration.DEFAULT");
			matchUtilities({ transition: (value) => {
				return {
					"transition-property": value,
					...value === "none" ? {} : {
						"transition-timing-function": defaultTimingFunction,
						"transition-duration": defaultDuration
					}
				};
			} }, { values: theme("transitionProperty") });
		},
		transitionDelay: (0, _createUtilityPlugin.default)("transitionDelay", [["delay", ["transitionDelay"]]]),
		transitionDuration: (0, _createUtilityPlugin.default)("transitionDuration", [["duration", ["transitionDuration"]]], { filterDefault: true }),
		transitionTimingFunction: (0, _createUtilityPlugin.default)("transitionTimingFunction", [["ease", ["transitionTimingFunction"]]], { filterDefault: true }),
		willChange: (0, _createUtilityPlugin.default)("willChange", [["will-change", ["will-change"]]]),
		contain: ({ addDefaults, addUtilities }) => {
			let cssContainValue = "var(--tw-contain-size) var(--tw-contain-layout) var(--tw-contain-paint) var(--tw-contain-style)";
			addDefaults("contain", {
				"--tw-contain-size": " ",
				"--tw-contain-layout": " ",
				"--tw-contain-paint": " ",
				"--tw-contain-style": " "
			});
			addUtilities({
				".contain-none": { contain: "none" },
				".contain-content": { contain: "content" },
				".contain-strict": { contain: "strict" },
				".contain-size": {
					"@defaults contain": {},
					"--tw-contain-size": "size",
					contain: cssContainValue
				},
				".contain-inline-size": {
					"@defaults contain": {},
					"--tw-contain-size": "inline-size",
					contain: cssContainValue
				},
				".contain-layout": {
					"@defaults contain": {},
					"--tw-contain-layout": "layout",
					contain: cssContainValue
				},
				".contain-paint": {
					"@defaults contain": {},
					"--tw-contain-paint": "paint",
					contain: cssContainValue
				},
				".contain-style": {
					"@defaults contain": {},
					"--tw-contain-style": "style",
					contain: cssContainValue
				}
			});
		},
		content: (0, _createUtilityPlugin.default)("content", [["content", ["--tw-content", ["content", "var(--tw-content)"]]]]),
		forcedColorAdjust: ({ addUtilities }) => {
			addUtilities({
				".forced-color-adjust-auto": { "forced-color-adjust": "auto" },
				".forced-color-adjust-none": { "forced-color-adjust": "none" }
			});
		}
	};
}));
var require_toPath = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "toPath", {
		enumerable: true,
		get: function() {
			return toPath;
		}
	});
	function toPath(path) {
		if (Array.isArray(path)) return path;
		if (path.split("[").length - 1 !== path.split("]").length - 1) throw new Error(`Path is invalid. Has unbalanced brackets: ${path}`);
		return path.split(/\.(?![^\[]*\])|[\[\]]/g).filter(Boolean);
	}
}));
var require_isSyntacticallyValidPropertyValue = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "default", {
		enumerable: true,
		get: function() {
			return isSyntacticallyValidPropertyValue;
		}
	});
	let matchingBrackets = new Map([
		["{", "}"],
		["[", "]"],
		["(", ")"]
	]);
	let inverseMatchingBrackets = new Map(Array.from(matchingBrackets.entries()).map(([k, v]) => [v, k]));
	let quotes = new Set([
		"\"",
		"'",
		"`"
	]);
	function isSyntacticallyValidPropertyValue(value) {
		let stack = [];
		let inQuotes = false;
		for (let i = 0; i < value.length; i++) {
			let char = value[i];
			if (char === ":" && !inQuotes && stack.length === 0) return false;
			if (quotes.has(char) && value[i - 1] !== "\\") inQuotes = !inQuotes;
			if (inQuotes) continue;
			if (value[i - 1] === "\\") continue;
			if (matchingBrackets.has(char)) stack.push(char);
			else if (inverseMatchingBrackets.has(char)) {
				let inverse = inverseMatchingBrackets.get(char);
				if (stack.length <= 0) return false;
				if (stack.pop() !== inverse) return false;
			}
		}
		if (stack.length > 0) return false;
		return true;
	}
}));
var require_cacheInvalidation = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "hasContentChanged", {
		enumerable: true,
		get: function() {
			return hasContentChanged;
		}
	});
	const _crypto = /* @__PURE__ */ _interop_require_default(__require("crypto"));
	const _sharedState = /* @__PURE__ */ _interop_require_wildcard(require_sharedState());
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function _getRequireWildcardCache(nodeInterop) {
		if (typeof WeakMap !== "function") return null;
		var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
		var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
		return (_getRequireWildcardCache = function(nodeInterop) {
			return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
		})(nodeInterop);
	}
	function _interop_require_wildcard(obj, nodeInterop) {
		if (!nodeInterop && obj && obj.__esModule) return obj;
		if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };
		var cache = _getRequireWildcardCache(nodeInterop);
		if (cache && cache.has(obj)) return cache.get(obj);
		var newObj = {};
		var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
		for (var key in obj) if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
			var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
			if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
			else newObj[key] = obj[key];
		}
		newObj.default = obj;
		if (cache) cache.set(obj, newObj);
		return newObj;
	}
	function getHash(str) {
		try {
			return _crypto.default.createHash("md5").update(str, "utf-8").digest("binary");
		} catch (err) {
			return "";
		}
	}
	function hasContentChanged(sourcePath, root) {
		let css = root.toString();
		if (!css.includes("@tailwind")) return false;
		let existingHash = _sharedState.sourceHashMap.get(sourcePath);
		let rootHash = getHash(css);
		let didChange = existingHash !== rootHash;
		_sharedState.sourceHashMap.set(sourcePath, rootHash);
		return didChange;
	}
}));
var require_bigSign = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "default", {
		enumerable: true,
		get: function() {
			return bigSign;
		}
	});
	function bigSign(bigIntValue) {
		return (bigIntValue > 0n) - (bigIntValue < 0n);
	}
}));
var require_remap_bitfield = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "remapBitfield", {
		enumerable: true,
		get: function() {
			return remapBitfield;
		}
	});
	function remapBitfield(num, mapping) {
		let oldMask = 0n;
		let newMask = 0n;
		for (let [oldBit, newBit] of mapping) if (num & oldBit) {
			oldMask = oldMask | oldBit;
			newMask = newMask | newBit;
		}
		return num & ~oldMask | newMask;
	}
}));
var require_offsets = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "Offsets", {
		enumerable: true,
		get: function() {
			return Offsets;
		}
	});
	const _bigSign = /* @__PURE__ */ _interop_require_default(require_bigSign());
	const _remapbitfield = require_remap_bitfield();
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	var Offsets = class {
		constructor() {
			this.offsets = {
				defaults: 0n,
				base: 0n,
				components: 0n,
				utilities: 0n,
				variants: 0n,
				user: 0n
			};
			this.layerPositions = {
				defaults: 0n,
				base: 1n,
				components: 2n,
				utilities: 3n,
				user: 4n,
				variants: 5n
			};
			this.reservedVariantBits = 0n;
			this.variantOffsets = /* @__PURE__ */ new Map();
		}
		create(layer) {
			return {
				layer,
				parentLayer: layer,
				arbitrary: 0n,
				variants: 0n,
				parallelIndex: 0n,
				index: this.offsets[layer]++,
				propertyOffset: 0n,
				property: "",
				options: []
			};
		}
		arbitraryProperty(name) {
			return {
				...this.create("utilities"),
				arbitrary: 1n,
				property: name
			};
		}
		forVariant(variant, index = 0) {
			let offset = this.variantOffsets.get(variant);
			if (offset === void 0) throw new Error(`Cannot find offset for unknown variant ${variant}`);
			return {
				...this.create("variants"),
				variants: offset << BigInt(index)
			};
		}
		applyVariantOffset(rule, variant, options) {
			options.variant = variant.variants;
			return {
				...rule,
				layer: "variants",
				parentLayer: rule.layer === "variants" ? rule.parentLayer : rule.layer,
				variants: rule.variants | variant.variants,
				options: options.sort ? [].concat(options, rule.options) : rule.options,
				parallelIndex: max([rule.parallelIndex, variant.parallelIndex])
			};
		}
		applyParallelOffset(offset, parallelIndex) {
			return {
				...offset,
				parallelIndex: BigInt(parallelIndex)
			};
		}
		recordVariants(variants, getLength) {
			for (let variant of variants) this.recordVariant(variant, getLength(variant));
		}
		recordVariant(variant, fnCount = 1) {
			this.variantOffsets.set(variant, 1n << this.reservedVariantBits);
			this.reservedVariantBits += BigInt(fnCount);
			return {
				...this.create("variants"),
				variants: this.variantOffsets.get(variant)
			};
		}
		compare(a, b) {
			if (a.layer !== b.layer) return this.layerPositions[a.layer] - this.layerPositions[b.layer];
			if (a.parentLayer !== b.parentLayer) return this.layerPositions[a.parentLayer] - this.layerPositions[b.parentLayer];
			for (let aOptions of a.options) for (let bOptions of b.options) {
				if (aOptions.id !== bOptions.id) continue;
				if (!aOptions.sort || !bOptions.sort) continue;
				var _max;
				let maxFnVariant = (_max = max([aOptions.variant, bOptions.variant])) !== null && _max !== void 0 ? _max : 0n;
				let mask = ~(maxFnVariant | maxFnVariant - 1n);
				if ((a.variants & mask) !== (b.variants & mask)) continue;
				let result = aOptions.sort({
					value: aOptions.value,
					modifier: aOptions.modifier
				}, {
					value: bOptions.value,
					modifier: bOptions.modifier
				});
				if (result !== 0) return result;
			}
			if (a.variants !== b.variants) return a.variants - b.variants;
			if (a.parallelIndex !== b.parallelIndex) return a.parallelIndex - b.parallelIndex;
			if (a.arbitrary !== b.arbitrary) return a.arbitrary - b.arbitrary;
			if (a.propertyOffset !== b.propertyOffset) return a.propertyOffset - b.propertyOffset;
			return a.index - b.index;
		}
		recalculateVariantOffsets() {
			let variants = Array.from(this.variantOffsets.entries()).filter(([v]) => v.startsWith("[")).sort(([a], [z]) => fastCompare(a, z));
			let newOffsets = variants.map(([, offset]) => offset).sort((a, z) => (0, _bigSign.default)(a - z));
			return variants.map(([, oldOffset], i) => [oldOffset, newOffsets[i]]).filter(([a, z]) => a !== z);
		}
		remapArbitraryVariantOffsets(list) {
			let mapping = this.recalculateVariantOffsets();
			if (mapping.length === 0) return list;
			return list.map((item) => {
				let [offset, rule] = item;
				offset = {
					...offset,
					variants: (0, _remapbitfield.remapBitfield)(offset.variants, mapping)
				};
				return [offset, rule];
			});
		}
		sortArbitraryProperties(list) {
			let known = /* @__PURE__ */ new Set();
			for (let [offset] of list) if (offset.arbitrary === 1n) known.add(offset.property);
			if (known.size === 0) return list;
			let properties = Array.from(known).sort();
			let offsets = /* @__PURE__ */ new Map();
			let offset = 1n;
			for (let property of properties) offsets.set(property, offset++);
			return list.map((item) => {
				let [offset, rule] = item;
				var _offsets_get;
				offset = {
					...offset,
					propertyOffset: (_offsets_get = offsets.get(offset.property)) !== null && _offsets_get !== void 0 ? _offsets_get : 0n
				};
				return [offset, rule];
			});
		}
		sort(list) {
			list = this.remapArbitraryVariantOffsets(list);
			list = this.sortArbitraryProperties(list);
			return list.sort(([a], [b]) => (0, _bigSign.default)(this.compare(a, b)));
		}
	};
	function max(nums) {
		let max = null;
		for (const num of nums) {
			max = max !== null && max !== void 0 ? max : num;
			max = max > num ? max : num;
		}
		return max;
	}
	function fastCompare(a, b) {
		let aLen = a.length;
		let bLen = b.length;
		let minLen = aLen < bLen ? aLen : bLen;
		for (let i = 0; i < minLen; i++) {
			let cmp = a.charCodeAt(i) - b.charCodeAt(i);
			if (cmp !== 0) return cmp;
		}
		return aLen - bLen;
	}
}));
var require_setupContextUtils = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export(exports, {
		INTERNAL_FEATURES: function() {
			return INTERNAL_FEATURES;
		},
		isValidVariantFormatString: function() {
			return isValidVariantFormatString;
		},
		parseVariant: function() {
			return parseVariant;
		},
		getFileModifiedMap: function() {
			return getFileModifiedMap;
		},
		createContext: function() {
			return createContext;
		},
		getContext: function() {
			return getContext;
		}
	});
	const _fs = /* @__PURE__ */ _interop_require_default(__require("fs"));
	const _url = /* @__PURE__ */ _interop_require_default(__require("url"));
	const _postcss = /* @__PURE__ */ _interop_require_default(require_postcss());
	const _dlv = /* @__PURE__ */ _interop_require_default(require_dlv());
	const _postcssselectorparser = /* @__PURE__ */ _interop_require_default(require_dist());
	const _transformThemeValue = /* @__PURE__ */ _interop_require_default(require_transformThemeValue());
	const _parseObjectStyles = /* @__PURE__ */ _interop_require_default(require_parseObjectStyles());
	const _prefixSelector = /* @__PURE__ */ _interop_require_default(require_prefixSelector());
	const _isPlainObject = /* @__PURE__ */ _interop_require_default(require_isPlainObject());
	const _escapeClassName = /* @__PURE__ */ _interop_require_default(require_escapeClassName());
	const _nameClass = /* @__PURE__ */ _interop_require_wildcard(require_nameClass());
	const _pluginUtils = require_pluginUtils();
	const _corePlugins = require_corePlugins();
	const _sharedState = /* @__PURE__ */ _interop_require_wildcard(require_sharedState());
	const _toPath = require_toPath();
	const _log = /* @__PURE__ */ _interop_require_default(require_log());
	const _negateValue = /* @__PURE__ */ _interop_require_default(require_negateValue());
	const _isSyntacticallyValidPropertyValue = /* @__PURE__ */ _interop_require_default(require_isSyntacticallyValidPropertyValue());
	const _generateRules = require_generateRules();
	const _cacheInvalidation = require_cacheInvalidation();
	const _offsets = require_offsets();
	const _featureFlags = require_featureFlags();
	const _formatVariantSelector = require_formatVariantSelector();
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function _getRequireWildcardCache(nodeInterop) {
		if (typeof WeakMap !== "function") return null;
		var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
		var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
		return (_getRequireWildcardCache = function(nodeInterop) {
			return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
		})(nodeInterop);
	}
	function _interop_require_wildcard(obj, nodeInterop) {
		if (!nodeInterop && obj && obj.__esModule) return obj;
		if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };
		var cache = _getRequireWildcardCache(nodeInterop);
		if (cache && cache.has(obj)) return cache.get(obj);
		var newObj = {};
		var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
		for (var key in obj) if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
			var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
			if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
			else newObj[key] = obj[key];
		}
		newObj.default = obj;
		if (cache) cache.set(obj, newObj);
		return newObj;
	}
	const INTERNAL_FEATURES = Symbol();
	const VARIANT_TYPES = {
		AddVariant: Symbol.for("ADD_VARIANT"),
		MatchVariant: Symbol.for("MATCH_VARIANT")
	};
	const VARIANT_INFO = {
		Base: 1,
		Dynamic: 2
	};
	function prefix(context, selector) {
		let prefix = context.tailwindConfig.prefix;
		return typeof prefix === "function" ? prefix(selector) : prefix + selector;
	}
	function normalizeOptionTypes({ type = "any", ...options }) {
		let types = [].concat(type);
		return {
			...options,
			types: types.map((type) => {
				if (Array.isArray(type)) return {
					type: type[0],
					...type[1]
				};
				return {
					type,
					preferOnConflict: false
				};
			})
		};
	}
	function parseVariantFormatString(input) {
		let parts = [];
		let current = "";
		let depth = 0;
		for (let idx = 0; idx < input.length; idx++) {
			let char = input[idx];
			if (char === "\\") current += "\\" + input[++idx];
			else if (char === "{") {
				++depth;
				parts.push(current.trim());
				current = "";
			} else if (char === "}") {
				if (--depth < 0) throw new Error(`Your { and } are unbalanced.`);
				parts.push(current.trim());
				current = "";
			} else current += char;
		}
		if (current.length > 0) parts.push(current.trim());
		parts = parts.filter((part) => part !== "");
		return parts;
	}
	function insertInto(list, value, { before = [] } = {}) {
		before = [].concat(before);
		if (before.length <= 0) {
			list.push(value);
			return;
		}
		let idx = list.length - 1;
		for (let other of before) {
			let iidx = list.indexOf(other);
			if (iidx === -1) continue;
			idx = Math.min(idx, iidx);
		}
		list.splice(idx, 0, value);
	}
	function parseStyles(styles) {
		if (!Array.isArray(styles)) return parseStyles([styles]);
		return styles.flatMap((style) => {
			return !Array.isArray(style) && !(0, _isPlainObject.default)(style) ? style : (0, _parseObjectStyles.default)(style);
		});
	}
	function getClasses(selector, mutate) {
		return (0, _postcssselectorparser.default)((selectors) => {
			let allClasses = [];
			if (mutate) mutate(selectors);
			selectors.walkClasses((classNode) => {
				allClasses.push(classNode.value);
			});
			return allClasses;
		}).transformSync(selector);
	}
	function ignoreNot(selectors) {
		selectors.walkPseudos((pseudo) => {
			if (pseudo.value === ":not") pseudo.remove();
		});
	}
	function extractCandidates(node, state = { containsNonOnDemandable: false }, depth = 0) {
		let classes = [];
		let selectors = [];
		if (node.type === "rule") selectors.push(...node.selectors);
		else if (node.type === "atrule") node.walkRules((rule) => selectors.push(...rule.selectors));
		for (let selector of selectors) {
			let classCandidates = getClasses(selector, ignoreNot);
			if (classCandidates.length === 0) state.containsNonOnDemandable = true;
			for (let classCandidate of classCandidates) classes.push(classCandidate);
		}
		if (depth === 0) return [state.containsNonOnDemandable || classes.length === 0, classes];
		return classes;
	}
	function withIdentifiers(styles) {
		return parseStyles(styles).flatMap((node) => {
			let nodeMap = /* @__PURE__ */ new Map();
			let [containsNonOnDemandableSelectors, candidates] = extractCandidates(node);
			if (containsNonOnDemandableSelectors) candidates.unshift(_sharedState.NOT_ON_DEMAND);
			return candidates.map((c) => {
				if (!nodeMap.has(node)) nodeMap.set(node, node);
				return [c, nodeMap.get(node)];
			});
		});
	}
	function isValidVariantFormatString(format) {
		return format.startsWith("@") || format.includes("&");
	}
	function parseVariant(variant) {
		variant = variant.replace(/\n+/g, "").replace(/\s{1,}/g, " ").trim();
		let fns = parseVariantFormatString(variant).map((str) => {
			if (!str.startsWith("@")) return ({ format }) => format(str);
			let [, name, params] = /@(\S*)( .+|[({].*)?/g.exec(str);
			var _params_trim;
			return ({ wrap }) => {
				return wrap(_postcss.default.atRule({
					name,
					params: (_params_trim = params === null || params === void 0 ? void 0 : params.trim()) !== null && _params_trim !== void 0 ? _params_trim : ""
				}));
			};
		}).reverse();
		return (api) => {
			for (let fn of fns) fn(api);
		};
	}
	function buildPluginApi(tailwindConfig, context, { variantList, variantMap, offsets, classList }) {
		function getConfigValue(path, defaultValue) {
			return path ? (0, _dlv.default)(tailwindConfig, path, defaultValue) : tailwindConfig;
		}
		function applyConfiguredPrefix(selector) {
			return (0, _prefixSelector.default)(tailwindConfig.prefix, selector);
		}
		function prefixIdentifier(identifier, options) {
			if (identifier === _sharedState.NOT_ON_DEMAND) return _sharedState.NOT_ON_DEMAND;
			if (!options.respectPrefix) return identifier;
			return context.tailwindConfig.prefix + identifier;
		}
		function resolveThemeValue(path, defaultValue, opts = {}) {
			let parts = (0, _toPath.toPath)(path);
			let value = getConfigValue(["theme", ...parts], defaultValue);
			return (0, _transformThemeValue.default)(parts[0])(value, opts);
		}
		let variantIdentifier = 0;
		let api = {
			postcss: _postcss.default,
			prefix: applyConfiguredPrefix,
			e: _escapeClassName.default,
			config: getConfigValue,
			theme: resolveThemeValue,
			corePlugins: (path) => {
				if (Array.isArray(tailwindConfig.corePlugins)) return tailwindConfig.corePlugins.includes(path);
				return getConfigValue(["corePlugins", path], true);
			},
			variants: () => {
				return [];
			},
			addBase(base) {
				for (let [identifier, rule] of withIdentifiers(base)) {
					let prefixedIdentifier = prefixIdentifier(identifier, {});
					let offset = offsets.create("base");
					if (!context.candidateRuleMap.has(prefixedIdentifier)) context.candidateRuleMap.set(prefixedIdentifier, []);
					context.candidateRuleMap.get(prefixedIdentifier).push([{
						sort: offset,
						layer: "base"
					}, rule]);
				}
			},
			addDefaults(group, declarations) {
				const groups = { [`@defaults ${group}`]: declarations };
				for (let [identifier, rule] of withIdentifiers(groups)) {
					let prefixedIdentifier = prefixIdentifier(identifier, {});
					if (!context.candidateRuleMap.has(prefixedIdentifier)) context.candidateRuleMap.set(prefixedIdentifier, []);
					context.candidateRuleMap.get(prefixedIdentifier).push([{
						sort: offsets.create("defaults"),
						layer: "defaults"
					}, rule]);
				}
			},
			addComponents(components, options) {
				options = Object.assign({}, {
					preserveSource: false,
					respectPrefix: true,
					respectImportant: false
				}, Array.isArray(options) ? {} : options);
				for (let [identifier, rule] of withIdentifiers(components)) {
					let prefixedIdentifier = prefixIdentifier(identifier, options);
					classList.add(prefixedIdentifier);
					if (!context.candidateRuleMap.has(prefixedIdentifier)) context.candidateRuleMap.set(prefixedIdentifier, []);
					context.candidateRuleMap.get(prefixedIdentifier).push([{
						sort: offsets.create("components"),
						layer: "components",
						options
					}, rule]);
				}
			},
			addUtilities(utilities, options) {
				options = Object.assign({}, {
					preserveSource: false,
					respectPrefix: true,
					respectImportant: true
				}, Array.isArray(options) ? {} : options);
				for (let [identifier, rule] of withIdentifiers(utilities)) {
					let prefixedIdentifier = prefixIdentifier(identifier, options);
					classList.add(prefixedIdentifier);
					if (!context.candidateRuleMap.has(prefixedIdentifier)) context.candidateRuleMap.set(prefixedIdentifier, []);
					context.candidateRuleMap.get(prefixedIdentifier).push([{
						sort: offsets.create("utilities"),
						layer: "utilities",
						options
					}, rule]);
				}
			},
			matchUtilities: function(utilities, options) {
				options = normalizeOptionTypes({
					respectPrefix: true,
					respectImportant: true,
					modifiers: false,
					...options
				});
				let offset = offsets.create("utilities");
				for (let identifier in utilities) {
					let prefixedIdentifier = prefixIdentifier(identifier, options);
					let rule = utilities[identifier];
					classList.add([prefixedIdentifier, options]);
					function wrapped(modifier, { isOnlyPlugin }) {
						let [value, coercedType, utilityModifier] = (0, _pluginUtils.coerceValue)(options.types, modifier, options, tailwindConfig);
						if (value === void 0) return [];
						if (!options.types.some(({ type }) => type === coercedType)) if (isOnlyPlugin) _log.default.warn([`Unnecessary typehint \`${coercedType}\` in \`${identifier}-${modifier}\`.`, `You can safely update it to \`${identifier}-${modifier.replace(coercedType + ":", "")}\`.`]);
						else return [];
						if (!(0, _isSyntacticallyValidPropertyValue.default)(value)) return [];
						let extras = { get modifier() {
							if (!options.modifiers) _log.default.warn(`modifier-used-without-options-for-${identifier}`, ["Your plugin must set `modifiers: true` in its options to support modifiers."]);
							return utilityModifier;
						} };
						let modifiersEnabled = (0, _featureFlags.flagEnabled)(tailwindConfig, "generalizedModifiers");
						return [].concat(modifiersEnabled ? rule(value, extras) : rule(value)).filter(Boolean).map((declaration) => ({ [(0, _nameClass.default)(identifier, modifier)]: declaration }));
					}
					let withOffsets = [{
						sort: offset,
						layer: "utilities",
						options
					}, wrapped];
					if (!context.candidateRuleMap.has(prefixedIdentifier)) context.candidateRuleMap.set(prefixedIdentifier, []);
					context.candidateRuleMap.get(prefixedIdentifier).push(withOffsets);
				}
			},
			matchComponents: function(components, options) {
				options = normalizeOptionTypes({
					respectPrefix: true,
					respectImportant: false,
					modifiers: false,
					...options
				});
				let offset = offsets.create("components");
				for (let identifier in components) {
					let prefixedIdentifier = prefixIdentifier(identifier, options);
					let rule = components[identifier];
					classList.add([prefixedIdentifier, options]);
					function wrapped(modifier, { isOnlyPlugin }) {
						let [value, coercedType, utilityModifier] = (0, _pluginUtils.coerceValue)(options.types, modifier, options, tailwindConfig);
						if (value === void 0) return [];
						if (!options.types.some(({ type }) => type === coercedType)) if (isOnlyPlugin) _log.default.warn([`Unnecessary typehint \`${coercedType}\` in \`${identifier}-${modifier}\`.`, `You can safely update it to \`${identifier}-${modifier.replace(coercedType + ":", "")}\`.`]);
						else return [];
						if (!(0, _isSyntacticallyValidPropertyValue.default)(value)) return [];
						let extras = { get modifier() {
							if (!options.modifiers) _log.default.warn(`modifier-used-without-options-for-${identifier}`, ["Your plugin must set `modifiers: true` in its options to support modifiers."]);
							return utilityModifier;
						} };
						let modifiersEnabled = (0, _featureFlags.flagEnabled)(tailwindConfig, "generalizedModifiers");
						return [].concat(modifiersEnabled ? rule(value, extras) : rule(value)).filter(Boolean).map((declaration) => ({ [(0, _nameClass.default)(identifier, modifier)]: declaration }));
					}
					let withOffsets = [{
						sort: offset,
						layer: "components",
						options
					}, wrapped];
					if (!context.candidateRuleMap.has(prefixedIdentifier)) context.candidateRuleMap.set(prefixedIdentifier, []);
					context.candidateRuleMap.get(prefixedIdentifier).push(withOffsets);
				}
			},
			addVariant(variantName, variantFunctions, options = {}) {
				variantFunctions = [].concat(variantFunctions).map((variantFunction) => {
					if (typeof variantFunction !== "string") return (api = {}) => {
						let { args, modifySelectors, container, separator, wrap, format } = api;
						let result = variantFunction(Object.assign({
							modifySelectors,
							container,
							separator
						}, options.type === VARIANT_TYPES.MatchVariant && {
							args,
							wrap,
							format
						}));
						if (typeof result === "string" && !isValidVariantFormatString(result)) throw new Error(`Your custom variant \`${variantName}\` has an invalid format string. Make sure it's an at-rule or contains a \`&\` placeholder.`);
						if (Array.isArray(result)) return result.filter((variant) => typeof variant === "string").map((variant) => parseVariant(variant));
						return result && typeof result === "string" && parseVariant(result)(api);
					};
					if (!isValidVariantFormatString(variantFunction)) throw new Error(`Your custom variant \`${variantName}\` has an invalid format string. Make sure it's an at-rule or contains a \`&\` placeholder.`);
					return parseVariant(variantFunction);
				});
				insertInto(variantList, variantName, options);
				variantMap.set(variantName, variantFunctions);
				context.variantOptions.set(variantName, options);
			},
			matchVariant(variant, variantFn, options) {
				var _options_id;
				let id = (_options_id = options === null || options === void 0 ? void 0 : options.id) !== null && _options_id !== void 0 ? _options_id : ++variantIdentifier;
				let isSpecial = variant === "@";
				let modifiersEnabled = (0, _featureFlags.flagEnabled)(tailwindConfig, "generalizedModifiers");
				var _options_values;
				for (let [key, value] of Object.entries((_options_values = options === null || options === void 0 ? void 0 : options.values) !== null && _options_values !== void 0 ? _options_values : {})) {
					if (key === "DEFAULT") continue;
					api.addVariant(isSpecial ? `${variant}${key}` : `${variant}-${key}`, ({ args, container }) => {
						return variantFn(value, modifiersEnabled ? {
							modifier: args === null || args === void 0 ? void 0 : args.modifier,
							container
						} : { container });
					}, {
						...options,
						value,
						id,
						type: VARIANT_TYPES.MatchVariant,
						variantInfo: VARIANT_INFO.Base
					});
				}
				var _options_values1;
				let hasDefault = "DEFAULT" in ((_options_values1 = options === null || options === void 0 ? void 0 : options.values) !== null && _options_values1 !== void 0 ? _options_values1 : {});
				api.addVariant(variant, ({ args, container }) => {
					if ((args === null || args === void 0 ? void 0 : args.value) === _sharedState.NONE && !hasDefault) return null;
					var _args_value;
					return variantFn((args === null || args === void 0 ? void 0 : args.value) === _sharedState.NONE ? options.values.DEFAULT : (_args_value = args === null || args === void 0 ? void 0 : args.value) !== null && _args_value !== void 0 ? _args_value : typeof args === "string" ? args : "", modifiersEnabled ? {
						modifier: args === null || args === void 0 ? void 0 : args.modifier,
						container
					} : { container });
				}, {
					...options,
					id,
					type: VARIANT_TYPES.MatchVariant,
					variantInfo: VARIANT_INFO.Dynamic
				});
			}
		};
		return api;
	}
	let fileModifiedMapCache = /* @__PURE__ */ new WeakMap();
	function getFileModifiedMap(context) {
		if (!fileModifiedMapCache.has(context)) fileModifiedMapCache.set(context, /* @__PURE__ */ new Map());
		return fileModifiedMapCache.get(context);
	}
	function trackModified(files, fileModifiedMap) {
		let changed = false;
		let mtimesToCommit = /* @__PURE__ */ new Map();
		for (let file of files) {
			var _fs_statSync;
			if (!file) continue;
			let parsed = _url.default.parse(file);
			let pathname = parsed.hash ? parsed.href.replace(parsed.hash, "") : parsed.href;
			pathname = parsed.search ? pathname.replace(parsed.search, "") : pathname;
			let newModified = (_fs_statSync = _fs.default.statSync(decodeURIComponent(pathname), { throwIfNoEntry: false })) === null || _fs_statSync === void 0 ? void 0 : _fs_statSync.mtimeMs;
			if (!newModified) continue;
			if (!fileModifiedMap.has(file) || newModified > fileModifiedMap.get(file)) changed = true;
			mtimesToCommit.set(file, newModified);
		}
		return [changed, mtimesToCommit];
	}
	function extractVariantAtRules(node) {
		node.walkAtRules((atRule) => {
			if (["responsive", "variants"].includes(atRule.name)) {
				extractVariantAtRules(atRule);
				atRule.before(atRule.nodes);
				atRule.remove();
			}
		});
	}
	function collectLayerPlugins(root) {
		let layerPlugins = [];
		root.each((node) => {
			if (node.type === "atrule" && ["responsive", "variants"].includes(node.name)) {
				node.name = "layer";
				node.params = "utilities";
			}
		});
		root.walkAtRules("layer", (layerRule) => {
			extractVariantAtRules(layerRule);
			if (layerRule.params === "base") {
				for (let node of layerRule.nodes) layerPlugins.push(function({ addBase }) {
					addBase(node, { respectPrefix: false });
				});
				layerRule.remove();
			} else if (layerRule.params === "components") {
				for (let node of layerRule.nodes) layerPlugins.push(function({ addComponents }) {
					addComponents(node, {
						respectPrefix: false,
						preserveSource: true
					});
				});
				layerRule.remove();
			} else if (layerRule.params === "utilities") {
				for (let node of layerRule.nodes) layerPlugins.push(function({ addUtilities }) {
					addUtilities(node, {
						respectPrefix: false,
						preserveSource: true
					});
				});
				layerRule.remove();
			}
		});
		return layerPlugins;
	}
	function resolvePlugins(context, root) {
		let corePluginList = Object.entries({
			..._corePlugins.variantPlugins,
			..._corePlugins.corePlugins
		}).map(([name, plugin]) => {
			if (!context.tailwindConfig.corePlugins.includes(name)) return null;
			return plugin;
		}).filter(Boolean);
		let userPlugins = context.tailwindConfig.plugins.map((plugin) => {
			if (plugin.__isOptionsFunction) plugin = plugin();
			return typeof plugin === "function" ? plugin : plugin.handler;
		});
		let layerPlugins = collectLayerPlugins(root);
		let beforeVariants = [
			_corePlugins.variantPlugins["childVariant"],
			_corePlugins.variantPlugins["pseudoElementVariants"],
			_corePlugins.variantPlugins["pseudoClassVariants"],
			_corePlugins.variantPlugins["hasVariants"],
			_corePlugins.variantPlugins["ariaVariants"],
			_corePlugins.variantPlugins["dataVariants"]
		];
		let afterVariants = [
			_corePlugins.variantPlugins["supportsVariants"],
			_corePlugins.variantPlugins["reducedMotionVariants"],
			_corePlugins.variantPlugins["prefersContrastVariants"],
			_corePlugins.variantPlugins["screenVariants"],
			_corePlugins.variantPlugins["orientationVariants"],
			_corePlugins.variantPlugins["directionVariants"],
			_corePlugins.variantPlugins["darkVariants"],
			_corePlugins.variantPlugins["forcedColorsVariants"],
			_corePlugins.variantPlugins["printVariant"]
		];
		if (context.tailwindConfig.darkMode === "class" || Array.isArray(context.tailwindConfig.darkMode) && context.tailwindConfig.darkMode[0] === "class") afterVariants = [
			_corePlugins.variantPlugins["supportsVariants"],
			_corePlugins.variantPlugins["reducedMotionVariants"],
			_corePlugins.variantPlugins["prefersContrastVariants"],
			_corePlugins.variantPlugins["darkVariants"],
			_corePlugins.variantPlugins["screenVariants"],
			_corePlugins.variantPlugins["orientationVariants"],
			_corePlugins.variantPlugins["directionVariants"],
			_corePlugins.variantPlugins["forcedColorsVariants"],
			_corePlugins.variantPlugins["printVariant"]
		];
		return [
			...corePluginList,
			...beforeVariants,
			...userPlugins,
			...afterVariants,
			...layerPlugins
		];
	}
	function registerPlugins(plugins, context) {
		let variantList = [];
		let variantMap = /* @__PURE__ */ new Map();
		context.variantMap = variantMap;
		let offsets = new _offsets.Offsets();
		context.offsets = offsets;
		let classList = /* @__PURE__ */ new Set();
		let pluginApi = buildPluginApi(context.tailwindConfig, context, {
			variantList,
			variantMap,
			offsets,
			classList
		});
		for (let plugin of plugins) if (Array.isArray(plugin)) for (let pluginItem of plugin) pluginItem(pluginApi);
		else plugin === null || plugin === void 0 || plugin(pluginApi);
		offsets.recordVariants(variantList, (variant) => variantMap.get(variant).length);
		for (let [variantName, variantFunctions] of variantMap.entries()) context.variantMap.set(variantName, variantFunctions.map((variantFunction, idx) => [offsets.forVariant(variantName, idx), variantFunction]));
		var _context_tailwindConfig_safelist;
		let safelist = ((_context_tailwindConfig_safelist = context.tailwindConfig.safelist) !== null && _context_tailwindConfig_safelist !== void 0 ? _context_tailwindConfig_safelist : []).filter(Boolean);
		if (safelist.length > 0) {
			let checks = [];
			for (let value of safelist) {
				if (typeof value === "string") {
					context.changedContent.push({
						content: value,
						extension: "html"
					});
					continue;
				}
				if (value instanceof RegExp) {
					_log.default.warn("root-regex", [
						"Regular expressions in `safelist` work differently in Tailwind CSS v3.0.",
						"Update your `safelist` configuration to eliminate this warning.",
						"https://tailwindcss.com/docs/content-configuration#safelisting-classes"
					]);
					continue;
				}
				checks.push(value);
			}
			if (checks.length > 0) {
				let patternMatchingCount = /* @__PURE__ */ new Map();
				let prefixLength = context.tailwindConfig.prefix.length;
				let checkImportantUtils = checks.some((check) => check.pattern.source.includes("!"));
				for (let util of classList) {
					let utils = Array.isArray(util) ? (() => {
						let [utilName, options] = util;
						var _options_values;
						let classes = Object.keys((_options_values = options === null || options === void 0 ? void 0 : options.values) !== null && _options_values !== void 0 ? _options_values : {}).map((value) => (0, _nameClass.formatClass)(utilName, value));
						if (options === null || options === void 0 ? void 0 : options.supportsNegativeValues) {
							classes = [...classes, ...classes.map((cls) => "-" + cls)];
							classes = [...classes, ...classes.map((cls) => cls.slice(0, prefixLength) + "-" + cls.slice(prefixLength))];
						}
						if (options.types.some(({ type }) => type === "color")) classes = [...classes, ...classes.flatMap((cls) => Object.keys(context.tailwindConfig.theme.opacity).map((opacity) => `${cls}/${opacity}`))];
						if (checkImportantUtils && (options === null || options === void 0 ? void 0 : options.respectImportant)) classes = [...classes, ...classes.map((cls) => "!" + cls)];
						return classes;
					})() : [util];
					for (let util of utils) for (let { pattern, variants = [] } of checks) {
						pattern.lastIndex = 0;
						if (!patternMatchingCount.has(pattern)) patternMatchingCount.set(pattern, 0);
						if (!pattern.test(util)) continue;
						patternMatchingCount.set(pattern, patternMatchingCount.get(pattern) + 1);
						context.changedContent.push({
							content: util,
							extension: "html"
						});
						for (let variant of variants) context.changedContent.push({
							content: variant + context.tailwindConfig.separator + util,
							extension: "html"
						});
					}
				}
				for (let [regex, count] of patternMatchingCount.entries()) {
					if (count !== 0) continue;
					_log.default.warn([
						`The safelist pattern \`${regex}\` doesn't match any Tailwind CSS classes.`,
						"Fix this pattern or remove it from your `safelist` configuration.",
						"https://tailwindcss.com/docs/content-configuration#safelisting-classes"
					]);
				}
			}
		}
		var _context_tailwindConfig_darkMode, _concat_;
		let parasiteUtilities = [
			prefix(context, (_concat_ = [].concat((_context_tailwindConfig_darkMode = context.tailwindConfig.darkMode) !== null && _context_tailwindConfig_darkMode !== void 0 ? _context_tailwindConfig_darkMode : "media")[1]) !== null && _concat_ !== void 0 ? _concat_ : "dark"),
			prefix(context, "group"),
			prefix(context, "peer")
		];
		context.getClassOrder = function getClassOrder(classes) {
			let sorted = [...classes].sort((a, z) => {
				if (a === z) return 0;
				if (a < z) return -1;
				return 1;
			});
			let sortedClassNames = new Map(sorted.map((className) => [className, null]));
			let rules = (0, _generateRules.generateRules)(new Set(sorted), context, true);
			rules = context.offsets.sort(rules);
			let idx = BigInt(parasiteUtilities.length);
			for (const [, rule] of rules) {
				let candidate = rule.raws.tailwind.candidate;
				var _sortedClassNames_get;
				sortedClassNames.set(candidate, (_sortedClassNames_get = sortedClassNames.get(candidate)) !== null && _sortedClassNames_get !== void 0 ? _sortedClassNames_get : idx++);
			}
			return classes.map((className) => {
				var _sortedClassNames_get;
				let order = (_sortedClassNames_get = sortedClassNames.get(className)) !== null && _sortedClassNames_get !== void 0 ? _sortedClassNames_get : null;
				let parasiteIndex = parasiteUtilities.indexOf(className);
				if (order === null && parasiteIndex !== -1) order = BigInt(parasiteIndex);
				return [className, order];
			});
		};
		context.getClassList = function getClassList(options = {}) {
			let output = [];
			for (let util of classList) if (Array.isArray(util)) {
				var _utilOptions_types;
				let [utilName, utilOptions] = util;
				let negativeClasses = [];
				var _utilOptions_modifiers;
				let modifiers = Object.keys((_utilOptions_modifiers = utilOptions === null || utilOptions === void 0 ? void 0 : utilOptions.modifiers) !== null && _utilOptions_modifiers !== void 0 ? _utilOptions_modifiers : {});
				if (utilOptions === null || utilOptions === void 0 ? void 0 : (_utilOptions_types = utilOptions.types) === null || _utilOptions_types === void 0 ? void 0 : _utilOptions_types.some(({ type }) => type === "color")) {
					var _context_tailwindConfig_theme_opacity;
					modifiers.push(...Object.keys((_context_tailwindConfig_theme_opacity = context.tailwindConfig.theme.opacity) !== null && _context_tailwindConfig_theme_opacity !== void 0 ? _context_tailwindConfig_theme_opacity : {}));
				}
				let metadata = { modifiers };
				let includeMetadata = options.includeMetadata && modifiers.length > 0;
				var _utilOptions_values;
				for (let [key, value] of Object.entries((_utilOptions_values = utilOptions === null || utilOptions === void 0 ? void 0 : utilOptions.values) !== null && _utilOptions_values !== void 0 ? _utilOptions_values : {})) {
					if (value == null) continue;
					let cls = (0, _nameClass.formatClass)(utilName, key);
					output.push(includeMetadata ? [cls, metadata] : cls);
					if ((utilOptions === null || utilOptions === void 0 ? void 0 : utilOptions.supportsNegativeValues) && (0, _negateValue.default)(value)) {
						let cls = (0, _nameClass.formatClass)(utilName, `-${key}`);
						negativeClasses.push(includeMetadata ? [cls, metadata] : cls);
					}
				}
				output.push(...negativeClasses);
			} else output.push(util);
			return output;
		};
		context.getVariants = function getVariants() {
			let id = Math.random().toString(36).substring(7).toUpperCase();
			let result = [];
			for (let [name, options] of context.variantOptions.entries()) {
				if (options.variantInfo === VARIANT_INFO.Base) continue;
				var _options_values;
				result.push({
					name,
					isArbitrary: options.type === Symbol.for("MATCH_VARIANT"),
					values: Object.keys((_options_values = options.values) !== null && _options_values !== void 0 ? _options_values : {}),
					hasDash: name !== "@",
					selectors({ modifier, value } = {}) {
						let candidate = `TAILWINDPLACEHOLDER${id}`;
						let rule = _postcss.default.rule({ selector: `.${candidate}` });
						let container = _postcss.default.root({ nodes: [rule.clone()] });
						let before = container.toString();
						var _context_variantMap_get;
						let fns = ((_context_variantMap_get = context.variantMap.get(name)) !== null && _context_variantMap_get !== void 0 ? _context_variantMap_get : []).flatMap(([_, fn]) => fn);
						let formatStrings = [];
						for (let fn of fns) {
							var _options_values;
							let localFormatStrings = [];
							var _options_values_value;
							let api = {
								args: {
									modifier,
									value: (_options_values_value = (_options_values = options.values) === null || _options_values === void 0 ? void 0 : _options_values[value]) !== null && _options_values_value !== void 0 ? _options_values_value : value
								},
								separator: context.tailwindConfig.separator,
								modifySelectors(modifierFunction) {
									container.each((rule) => {
										if (rule.type !== "rule") return;
										rule.selectors = rule.selectors.map((selector) => {
											return modifierFunction({
												get className() {
													return (0, _generateRules.getClassNameFromSelector)(selector);
												},
												selector
											});
										});
									});
									return container;
								},
								format(str) {
									localFormatStrings.push(str);
								},
								wrap(wrapper) {
									localFormatStrings.push(`@${wrapper.name} ${wrapper.params} { & }`);
								},
								container
							};
							let ruleWithVariant = fn(api);
							if (localFormatStrings.length > 0) formatStrings.push(localFormatStrings);
							if (Array.isArray(ruleWithVariant)) for (let variantFunction of ruleWithVariant) {
								localFormatStrings = [];
								variantFunction(api);
								formatStrings.push(localFormatStrings);
							}
						}
						let manualFormatStrings = [];
						if (before !== container.toString()) {
							container.walkRules((rule) => {
								let modified = rule.selector;
								let rebuiltBase = (0, _postcssselectorparser.default)((selectors) => {
									selectors.walkClasses((classNode) => {
										classNode.value = `${name}${context.tailwindConfig.separator}${classNode.value}`;
									});
								}).processSync(modified);
								manualFormatStrings.push(modified.replace(rebuiltBase, "&").replace(candidate, "&"));
							});
							container.walkAtRules((atrule) => {
								manualFormatStrings.push(`@${atrule.name} (${atrule.params}) { & }`);
							});
						}
						var _options_values1;
						let isArbitraryVariant = !(value in ((_options_values1 = options.values) !== null && _options_values1 !== void 0 ? _options_values1 : {}));
						var _options_INTERNAL_FEATURES;
						let internalFeatures = (_options_INTERNAL_FEATURES = options[INTERNAL_FEATURES]) !== null && _options_INTERNAL_FEATURES !== void 0 ? _options_INTERNAL_FEATURES : {};
						let respectPrefix = (() => {
							if (isArbitraryVariant) return false;
							if (internalFeatures.respectPrefix === false) return false;
							return true;
						})();
						formatStrings = formatStrings.map((format) => format.map((str) => ({
							format: str,
							respectPrefix
						})));
						manualFormatStrings = manualFormatStrings.map((format) => ({
							format,
							respectPrefix
						}));
						let opts = {
							candidate,
							context
						};
						let result = formatStrings.map((formats) => (0, _formatVariantSelector.finalizeSelector)(`.${candidate}`, (0, _formatVariantSelector.formatVariantSelector)(formats, opts), opts).replace(`.${candidate}`, "&").replace("{ & }", "").trim());
						if (manualFormatStrings.length > 0) result.push((0, _formatVariantSelector.formatVariantSelector)(manualFormatStrings, opts).toString().replace(`.${candidate}`, "&"));
						return result;
					}
				});
			}
			return result;
		};
	}
	function markInvalidUtilityCandidate(context, candidate) {
		if (!context.classCache.has(candidate)) return;
		context.notClassCache.add(candidate);
		context.classCache.delete(candidate);
		context.applyClassCache.delete(candidate);
		context.candidateRuleMap.delete(candidate);
		context.candidateRuleCache.delete(candidate);
		context.stylesheetCache = null;
	}
	function markInvalidUtilityNode(context, node) {
		let candidate = node.raws.tailwind.candidate;
		if (!candidate) return;
		for (const entry of context.ruleCache) if (entry[1].raws.tailwind.candidate === candidate) context.ruleCache.delete(entry);
		markInvalidUtilityCandidate(context, candidate);
	}
	function createContext(tailwindConfig, changedContent = [], root = _postcss.default.root()) {
		var _tailwindConfig_blocklist;
		let context = {
			disposables: [],
			ruleCache: /* @__PURE__ */ new Set(),
			candidateRuleCache: /* @__PURE__ */ new Map(),
			classCache: /* @__PURE__ */ new Map(),
			applyClassCache: /* @__PURE__ */ new Map(),
			notClassCache: new Set((_tailwindConfig_blocklist = tailwindConfig.blocklist) !== null && _tailwindConfig_blocklist !== void 0 ? _tailwindConfig_blocklist : []),
			postCssNodeCache: /* @__PURE__ */ new Map(),
			candidateRuleMap: /* @__PURE__ */ new Map(),
			tailwindConfig,
			changedContent,
			variantMap: /* @__PURE__ */ new Map(),
			stylesheetCache: null,
			variantOptions: /* @__PURE__ */ new Map(),
			markInvalidUtilityCandidate: (candidate) => markInvalidUtilityCandidate(context, candidate),
			markInvalidUtilityNode: (node) => markInvalidUtilityNode(context, node)
		};
		registerPlugins(resolvePlugins(context, root), context);
		return context;
	}
	let contextMap = _sharedState.contextMap;
	let configContextMap = _sharedState.configContextMap;
	let contextSourcesMap = _sharedState.contextSourcesMap;
	function getContext(root, result, tailwindConfig, userConfigPath, tailwindConfigHash, contextDependencies) {
		let sourcePath = result.opts.from;
		let isConfigFile = userConfigPath !== null;
		_sharedState.env.DEBUG && console.log("Source path:", sourcePath);
		let existingContext;
		if (isConfigFile && contextMap.has(sourcePath)) existingContext = contextMap.get(sourcePath);
		else if (configContextMap.has(tailwindConfigHash)) {
			let context = configContextMap.get(tailwindConfigHash);
			contextSourcesMap.get(context).add(sourcePath);
			contextMap.set(sourcePath, context);
			existingContext = context;
		}
		let cssDidChange = (0, _cacheInvalidation.hasContentChanged)(sourcePath, root);
		if (existingContext) {
			let [contextDependenciesChanged, mtimesToCommit] = trackModified([...contextDependencies], getFileModifiedMap(existingContext));
			if (!contextDependenciesChanged && !cssDidChange) return [
				existingContext,
				false,
				mtimesToCommit
			];
		}
		if (contextMap.has(sourcePath)) {
			let oldContext = contextMap.get(sourcePath);
			if (contextSourcesMap.has(oldContext)) {
				contextSourcesMap.get(oldContext).delete(sourcePath);
				if (contextSourcesMap.get(oldContext).size === 0) {
					contextSourcesMap.delete(oldContext);
					for (let [tailwindConfigHash, context] of configContextMap) if (context === oldContext) configContextMap.delete(tailwindConfigHash);
					for (let disposable of oldContext.disposables.splice(0)) disposable(oldContext);
				}
			}
		}
		_sharedState.env.DEBUG && console.log("Setting up new context...");
		let context = createContext(tailwindConfig, [], root);
		Object.assign(context, { userConfigPath });
		let [, mtimesToCommit] = trackModified([...contextDependencies], getFileModifiedMap(context));
		configContextMap.set(tailwindConfigHash, context);
		contextMap.set(sourcePath, context);
		if (!contextSourcesMap.has(context)) contextSourcesMap.set(context, /* @__PURE__ */ new Set());
		contextSourcesMap.get(context).add(sourcePath);
		return [
			context,
			true,
			mtimesToCommit
		];
	}
}));
var require_applyImportantSelector = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "applyImportantSelector", {
		enumerable: true,
		get: function() {
			return applyImportantSelector;
		}
	});
	const _postcssselectorparser = /* @__PURE__ */ _interop_require_default(require_dist());
	const _pseudoElements = require_pseudoElements();
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function applyImportantSelector(selector, important) {
		let sel = (0, _postcssselectorparser.default)().astSync(selector);
		sel.each((sel) => {
			if (sel.nodes.some((node) => node.type === "combinator")) sel.nodes = [_postcssselectorparser.default.pseudo({
				value: ":is",
				nodes: [sel.clone()]
			})];
			(0, _pseudoElements.movePseudos)(sel);
		});
		return `${important} ${sel.toString()}`;
	}
}));
var require_generateRules = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export(exports, {
		getClassNameFromSelector: function() {
			return getClassNameFromSelector;
		},
		resolveMatches: function() {
			return resolveMatches;
		},
		generateRules: function() {
			return generateRules;
		}
	});
	const _postcss = /* @__PURE__ */ _interop_require_default(require_postcss());
	const _postcssselectorparser = /* @__PURE__ */ _interop_require_default(require_dist());
	const _parseObjectStyles = /* @__PURE__ */ _interop_require_default(require_parseObjectStyles());
	const _isPlainObject = /* @__PURE__ */ _interop_require_default(require_isPlainObject());
	const _prefixSelector = /* @__PURE__ */ _interop_require_default(require_prefixSelector());
	const _pluginUtils = require_pluginUtils();
	const _log = /* @__PURE__ */ _interop_require_default(require_log());
	const _sharedState = /* @__PURE__ */ _interop_require_wildcard(require_sharedState());
	const _formatVariantSelector = require_formatVariantSelector();
	const _nameClass = require_nameClass();
	const _dataTypes = require_dataTypes();
	const _setupContextUtils = require_setupContextUtils();
	const _isSyntacticallyValidPropertyValue = /* @__PURE__ */ _interop_require_default(require_isSyntacticallyValidPropertyValue());
	const _splitAtTopLevelOnly = require_splitAtTopLevelOnly();
	const _featureFlags = require_featureFlags();
	const _applyImportantSelector = require_applyImportantSelector();
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function _getRequireWildcardCache(nodeInterop) {
		if (typeof WeakMap !== "function") return null;
		var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
		var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
		return (_getRequireWildcardCache = function(nodeInterop) {
			return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
		})(nodeInterop);
	}
	function _interop_require_wildcard(obj, nodeInterop) {
		if (!nodeInterop && obj && obj.__esModule) return obj;
		if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };
		var cache = _getRequireWildcardCache(nodeInterop);
		if (cache && cache.has(obj)) return cache.get(obj);
		var newObj = {};
		var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
		for (var key in obj) if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
			var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
			if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
			else newObj[key] = obj[key];
		}
		newObj.default = obj;
		if (cache) cache.set(obj, newObj);
		return newObj;
	}
	let classNameParser = (0, _postcssselectorparser.default)((selectors) => {
		return selectors.first.filter(({ type }) => type === "class").pop().value;
	});
	function getClassNameFromSelector(selector) {
		return classNameParser.transformSync(selector);
	}
	function* candidatePermutations(candidate) {
		let lastIndex = Infinity;
		while (lastIndex >= 0) {
			let dashIdx;
			let wasSlash = false;
			if (lastIndex === Infinity && candidate.endsWith("]")) {
				let bracketIdx = candidate.indexOf("[");
				if (candidate[bracketIdx - 1] === "-") dashIdx = bracketIdx - 1;
				else if (candidate[bracketIdx - 1] === "/") {
					dashIdx = bracketIdx - 1;
					wasSlash = true;
				} else dashIdx = -1;
			} else if (lastIndex === Infinity && candidate.includes("/")) {
				dashIdx = candidate.lastIndexOf("/");
				wasSlash = true;
			} else dashIdx = candidate.lastIndexOf("-", lastIndex);
			if (dashIdx < 0) break;
			let prefix = candidate.slice(0, dashIdx);
			let modifier = candidate.slice(wasSlash ? dashIdx : dashIdx + 1);
			lastIndex = dashIdx - 1;
			if (prefix === "" || modifier === "/") continue;
			yield [prefix, modifier];
		}
	}
	function applyPrefix(matches, context) {
		if (matches.length === 0 || context.tailwindConfig.prefix === "") return matches;
		for (let match of matches) {
			let [meta] = match;
			if (meta.options.respectPrefix) {
				let container = _postcss.default.root({ nodes: [match[1].clone()] });
				let classCandidate = match[1].raws.tailwind.classCandidate;
				container.walkRules((r) => {
					let shouldPrependNegative = classCandidate.startsWith("-");
					r.selector = (0, _prefixSelector.default)(context.tailwindConfig.prefix, r.selector, shouldPrependNegative);
				});
				match[1] = container.nodes[0];
			}
		}
		return matches;
	}
	function applyImportant(matches, classCandidate) {
		if (matches.length === 0) return matches;
		let result = [];
		function isInKeyframes(rule) {
			return rule.parent && rule.parent.type === "atrule" && rule.parent.name === "keyframes";
		}
		for (let [meta, rule] of matches) {
			let container = _postcss.default.root({ nodes: [rule.clone()] });
			container.walkRules((r) => {
				if (isInKeyframes(r)) return;
				let ast = (0, _postcssselectorparser.default)().astSync(r.selector);
				ast.each((sel) => (0, _formatVariantSelector.eliminateIrrelevantSelectors)(sel, classCandidate));
				(0, _pluginUtils.updateAllClasses)(ast, (className) => className === classCandidate ? `!${className}` : className);
				let newSelector = ast.toString();
				if (newSelector.trim() === "") {
					r.remove();
					return;
				}
				r.selector = newSelector;
				r.walkDecls((d) => d.important = true);
			});
			result.push([{
				...meta,
				important: true
			}, container.nodes[0]]);
		}
		return result;
	}
	function applyVariant(variant, matches, context) {
		if (matches.length === 0) return matches;
		let args = {
			modifier: null,
			value: _sharedState.NONE
		};
		{
			let [baseVariant, ...modifiers] = (0, _splitAtTopLevelOnly.splitAtTopLevelOnly)(variant, "/");
			if (modifiers.length > 1) {
				baseVariant = baseVariant + "/" + modifiers.slice(0, -1).join("/");
				modifiers = modifiers.slice(-1);
			}
			if (modifiers.length && !context.variantMap.has(variant)) {
				variant = baseVariant;
				args.modifier = modifiers[0];
				if (!(0, _featureFlags.flagEnabled)(context.tailwindConfig, "generalizedModifiers")) return [];
			}
		}
		if (variant.endsWith("]") && !variant.startsWith("[")) {
			let match = /(.)(-?)\[(.*)\]/g.exec(variant);
			if (match) {
				let [, char, separator, value] = match;
				if (char === "@" && separator === "-") return [];
				if (char !== "@" && separator === "") return [];
				variant = variant.replace(`${separator}[${value}]`, "");
				args.value = value;
			}
		}
		if (isArbitraryValue(variant) && !context.variantMap.has(variant)) {
			let sort = context.offsets.recordVariant(variant);
			let selector = (0, _dataTypes.normalize)(variant.slice(1, -1));
			let selectors = (0, _splitAtTopLevelOnly.splitAtTopLevelOnly)(selector, ",");
			if (selectors.length > 1) return [];
			if (!selectors.every(_setupContextUtils.isValidVariantFormatString)) return [];
			let records = selectors.map((sel, idx) => [context.offsets.applyParallelOffset(sort, idx), (0, _setupContextUtils.parseVariant)(sel.trim())]);
			context.variantMap.set(variant, records);
		}
		if (context.variantMap.has(variant)) {
			var _context_variantOptions_get;
			let isArbitraryVariant = isArbitraryValue(variant);
			var _context_variantOptions_get_INTERNAL_FEATURES;
			let internalFeatures = (_context_variantOptions_get_INTERNAL_FEATURES = (_context_variantOptions_get = context.variantOptions.get(variant)) === null || _context_variantOptions_get === void 0 ? void 0 : _context_variantOptions_get[_setupContextUtils.INTERNAL_FEATURES]) !== null && _context_variantOptions_get_INTERNAL_FEATURES !== void 0 ? _context_variantOptions_get_INTERNAL_FEATURES : {};
			let variantFunctionTuples = context.variantMap.get(variant).slice();
			let result = [];
			let respectPrefix = (() => {
				if (isArbitraryVariant) return false;
				if (internalFeatures.respectPrefix === false) return false;
				return true;
			})();
			for (let [meta, rule] of matches) {
				if (meta.layer === "user") continue;
				let container = _postcss.default.root({ nodes: [rule.clone()] });
				for (let [variantSort, variantFunction, containerFromArray] of variantFunctionTuples) {
					let clone = (containerFromArray !== null && containerFromArray !== void 0 ? containerFromArray : container).clone();
					let collectedFormats = [];
					function prepareBackup() {
						if (clone.raws.neededBackup) return;
						clone.raws.neededBackup = true;
						clone.walkRules((rule) => rule.raws.originalSelector = rule.selector);
					}
					function modifySelectors(modifierFunction) {
						prepareBackup();
						clone.each((rule) => {
							if (rule.type !== "rule") return;
							rule.selectors = rule.selectors.map((selector) => {
								return modifierFunction({
									get className() {
										return getClassNameFromSelector(selector);
									},
									selector
								});
							});
						});
						return clone;
					}
					let ruleWithVariant = variantFunction({
						get container() {
							prepareBackup();
							return clone;
						},
						separator: context.tailwindConfig.separator,
						modifySelectors,
						wrap(wrapper) {
							let nodes = clone.nodes;
							clone.removeAll();
							wrapper.append(nodes);
							clone.append(wrapper);
						},
						format(selectorFormat) {
							collectedFormats.push({
								format: selectorFormat,
								respectPrefix
							});
						},
						args
					});
					if (Array.isArray(ruleWithVariant)) {
						for (let [idx, variantFunction] of ruleWithVariant.entries()) variantFunctionTuples.push([
							context.offsets.applyParallelOffset(variantSort, idx),
							variantFunction,
							clone.clone()
						]);
						continue;
					}
					if (typeof ruleWithVariant === "string") collectedFormats.push({
						format: ruleWithVariant,
						respectPrefix
					});
					if (ruleWithVariant === null) continue;
					if (clone.raws.neededBackup) {
						delete clone.raws.neededBackup;
						clone.walkRules((rule) => {
							let before = rule.raws.originalSelector;
							if (!before) return;
							delete rule.raws.originalSelector;
							if (before === rule.selector) return;
							let modified = rule.selector;
							let rebuiltBase = (0, _postcssselectorparser.default)((selectors) => {
								selectors.walkClasses((classNode) => {
									classNode.value = `${variant}${context.tailwindConfig.separator}${classNode.value}`;
								});
							}).processSync(before);
							collectedFormats.push({
								format: modified.replace(rebuiltBase, "&"),
								respectPrefix
							});
							rule.selector = before;
						});
					}
					clone.nodes[0].raws.tailwind = {
						...clone.nodes[0].raws.tailwind,
						parentLayer: meta.layer
					};
					var _meta_collectedFormats;
					let withOffset = [{
						...meta,
						sort: context.offsets.applyVariantOffset(meta.sort, variantSort, Object.assign(args, context.variantOptions.get(variant))),
						collectedFormats: ((_meta_collectedFormats = meta.collectedFormats) !== null && _meta_collectedFormats !== void 0 ? _meta_collectedFormats : []).concat(collectedFormats)
					}, clone.nodes[0]];
					result.push(withOffset);
				}
			}
			return result;
		}
		return [];
	}
	function parseRules(rule, cache, options = {}) {
		if (!(0, _isPlainObject.default)(rule) && !Array.isArray(rule)) return [[rule], options];
		if (Array.isArray(rule)) return parseRules(rule[0], cache, rule[1]);
		if (!cache.has(rule)) cache.set(rule, (0, _parseObjectStyles.default)(rule));
		return [cache.get(rule), options];
	}
	const IS_VALID_PROPERTY_NAME = /^[a-z_-]/;
	function isValidPropName(name) {
		return IS_VALID_PROPERTY_NAME.test(name);
	}
	function looksLikeUri(declaration) {
		if (!declaration.includes("://")) return false;
		try {
			const url = new URL(declaration);
			return url.scheme !== "" && url.host !== "";
		} catch (err) {
			return false;
		}
	}
	function isParsableNode(node) {
		let isParsable = true;
		node.walkDecls((decl) => {
			if (!isParsableCssValue(decl.prop, decl.value)) {
				isParsable = false;
				return false;
			}
		});
		return isParsable;
	}
	function isParsableCssValue(property, value) {
		if (looksLikeUri(`${property}:${value}`)) return false;
		try {
			_postcss.default.parse(`a{${property}:${value}}`).toResult();
			return true;
		} catch (err) {
			return false;
		}
	}
	function extractArbitraryProperty(classCandidate, context) {
		var _classCandidate_match;
		let [, property, value] = (_classCandidate_match = classCandidate.match(/^\[([a-zA-Z0-9-_]+):(\S+)\]$/)) !== null && _classCandidate_match !== void 0 ? _classCandidate_match : [];
		if (value === void 0) return null;
		if (!isValidPropName(property)) return null;
		if (!(0, _isSyntacticallyValidPropertyValue.default)(value)) return null;
		let normalized = (0, _dataTypes.normalize)(value, { property });
		if (!isParsableCssValue(property, normalized)) return null;
		return [[{
			sort: context.offsets.arbitraryProperty(classCandidate),
			layer: "utilities",
			options: { respectImportant: true }
		}, () => ({ [(0, _nameClass.asClass)(classCandidate)]: { [property]: normalized } })]];
	}
	function* resolveMatchedPlugins(classCandidate, context) {
		if (context.candidateRuleMap.has(classCandidate)) yield [context.candidateRuleMap.get(classCandidate), "DEFAULT"];
		yield* function* (arbitraryPropertyRule) {
			if (arbitraryPropertyRule !== null) yield [arbitraryPropertyRule, "DEFAULT"];
		}(extractArbitraryProperty(classCandidate, context));
		let candidatePrefix = classCandidate;
		let negative = false;
		const twConfigPrefix = context.tailwindConfig.prefix;
		const twConfigPrefixLen = twConfigPrefix.length;
		const hasMatchingPrefix = candidatePrefix.startsWith(twConfigPrefix) || candidatePrefix.startsWith(`-${twConfigPrefix}`);
		if (candidatePrefix[twConfigPrefixLen] === "-" && hasMatchingPrefix) {
			negative = true;
			candidatePrefix = twConfigPrefix + candidatePrefix.slice(twConfigPrefixLen + 1);
		}
		if (negative && context.candidateRuleMap.has(candidatePrefix)) yield [context.candidateRuleMap.get(candidatePrefix), "-DEFAULT"];
		for (let [prefix, modifier] of candidatePermutations(candidatePrefix)) if (context.candidateRuleMap.has(prefix)) yield [context.candidateRuleMap.get(prefix), negative ? `-${modifier}` : modifier];
	}
	function splitWithSeparator(input, separator) {
		if (input === _sharedState.NOT_ON_DEMAND) return [_sharedState.NOT_ON_DEMAND];
		return (0, _splitAtTopLevelOnly.splitAtTopLevelOnly)(input, separator);
	}
	function* recordCandidates(matches, classCandidate) {
		for (const match of matches) {
			var _match__options;
			var _match__options_preserveSource;
			match[1].raws.tailwind = {
				...match[1].raws.tailwind,
				classCandidate,
				preserveSource: (_match__options_preserveSource = (_match__options = match[0].options) === null || _match__options === void 0 ? void 0 : _match__options.preserveSource) !== null && _match__options_preserveSource !== void 0 ? _match__options_preserveSource : false
			};
			yield match;
		}
	}
	function* resolveMatches(candidate, context) {
		let separator = context.tailwindConfig.separator;
		let [classCandidate, ...variants] = splitWithSeparator(candidate, separator).reverse();
		let important = false;
		if (classCandidate.startsWith("!")) {
			important = true;
			classCandidate = classCandidate.slice(1);
		}
		for (let matchedPlugins of resolveMatchedPlugins(classCandidate, context)) {
			let matches = [];
			let typesByMatches = /* @__PURE__ */ new Map();
			let [plugins, modifier] = matchedPlugins;
			let isOnlyPlugin = plugins.length === 1;
			for (let [sort, plugin] of plugins) {
				let matchesPerPlugin = [];
				if (typeof plugin === "function") for (let ruleSet of [].concat(plugin(modifier, { isOnlyPlugin }))) {
					let [rules, options] = parseRules(ruleSet, context.postCssNodeCache);
					for (let rule of rules) matchesPerPlugin.push([{
						...sort,
						options: {
							...sort.options,
							...options
						}
					}, rule]);
				}
				else if (modifier === "DEFAULT" || modifier === "-DEFAULT") {
					let [rules, options] = parseRules(plugin, context.postCssNodeCache);
					for (let rule of rules) matchesPerPlugin.push([{
						...sort,
						options: {
							...sort.options,
							...options
						}
					}, rule]);
				}
				if (matchesPerPlugin.length > 0) {
					var _sort_options;
					var _sort_options_types, _sort_options1;
					let matchingTypes = Array.from((0, _pluginUtils.getMatchingTypes)((_sort_options_types = (_sort_options = sort.options) === null || _sort_options === void 0 ? void 0 : _sort_options.types) !== null && _sort_options_types !== void 0 ? _sort_options_types : [], modifier, (_sort_options1 = sort.options) !== null && _sort_options1 !== void 0 ? _sort_options1 : {}, context.tailwindConfig)).map(([_, type]) => type);
					if (matchingTypes.length > 0) typesByMatches.set(matchesPerPlugin, matchingTypes);
					matches.push(matchesPerPlugin);
				}
			}
			if (isArbitraryValue(modifier)) {
				if (matches.length > 1) {
					let [withAny, withoutAny] = matches.reduce((group, plugin) => {
						if (plugin.some(([{ options }]) => options.types.some(({ type }) => type === "any"))) group[0].push(plugin);
						else group[1].push(plugin);
						return group;
					}, [[], []]);
					function findFallback(matches) {
						if (matches.length === 1) return matches[0];
						return matches.find((rules) => {
							let matchingTypes = typesByMatches.get(rules);
							return rules.some(([{ options }, rule]) => {
								if (!isParsableNode(rule)) return false;
								return options.types.some(({ type, preferOnConflict }) => matchingTypes.includes(type) && preferOnConflict);
							});
						});
					}
					var _findFallback;
					let fallback = (_findFallback = findFallback(withoutAny)) !== null && _findFallback !== void 0 ? _findFallback : findFallback(withAny);
					if (fallback) matches = [fallback];
					else {
						var _typesByMatches_get;
						let typesPerPlugin = matches.map((match) => new Set([...(_typesByMatches_get = typesByMatches.get(match)) !== null && _typesByMatches_get !== void 0 ? _typesByMatches_get : []]));
						for (let pluginTypes of typesPerPlugin) for (let type of pluginTypes) {
							let removeFromOwnGroup = false;
							for (let otherGroup of typesPerPlugin) {
								if (pluginTypes === otherGroup) continue;
								if (otherGroup.has(type)) {
									otherGroup.delete(type);
									removeFromOwnGroup = true;
								}
							}
							if (removeFromOwnGroup) pluginTypes.delete(type);
						}
						let messages = [];
						for (let [idx, group] of typesPerPlugin.entries()) for (let type of group) {
							let rules = matches[idx].map(([, rule]) => rule).flat().map((rule) => rule.toString().split("\n").slice(1, -1).map((line) => line.trim()).map((x) => `      ${x}`).join("\n")).join("\n\n");
							messages.push(`  Use \`${candidate.replace("[", `[${type}:`)}\` for \`${rules.trim()}\``);
							break;
						}
						_log.default.warn([
							`The class \`${candidate}\` is ambiguous and matches multiple utilities.`,
							...messages,
							`If this is content and not a class, replace it with \`${candidate.replace("[", "&lsqb;").replace("]", "&rsqb;")}\` to silence this warning.`
						]);
						continue;
					}
				}
				matches = matches.map((list) => list.filter((match) => isParsableNode(match[1])));
			}
			matches = matches.flat();
			matches = Array.from(recordCandidates(matches, classCandidate));
			matches = applyPrefix(matches, context);
			if (important) matches = applyImportant(matches, classCandidate);
			for (let variant of variants) matches = applyVariant(variant, matches, context);
			for (let match of matches) {
				match[1].raws.tailwind = {
					...match[1].raws.tailwind,
					candidate
				};
				match = applyFinalFormat(match, {
					context,
					candidate
				});
				if (match === null) continue;
				yield match;
			}
		}
	}
	function applyFinalFormat(match, { context, candidate }) {
		if (!match[0].collectedFormats) return match;
		let isValid = true;
		let finalFormat;
		try {
			finalFormat = (0, _formatVariantSelector.formatVariantSelector)(match[0].collectedFormats, {
				context,
				candidate
			});
		} catch {
			return null;
		}
		let container = _postcss.default.root({ nodes: [match[1].clone()] });
		container.walkRules((rule) => {
			if (inKeyframes(rule)) return;
			try {
				let selector = (0, _formatVariantSelector.finalizeSelector)(rule.selector, finalFormat, {
					candidate,
					context
				});
				if (selector === null) {
					rule.remove();
					return;
				}
				rule.selector = selector;
			} catch {
				isValid = false;
				return false;
			}
		});
		if (!isValid) return null;
		if (container.nodes.length === 0) return null;
		match[1] = container.nodes[0];
		return match;
	}
	function inKeyframes(rule) {
		return rule.parent && rule.parent.type === "atrule" && rule.parent.name === "keyframes";
	}
	function getImportantStrategy(important) {
		if (important === true) return (rule) => {
			if (inKeyframes(rule)) return;
			rule.walkDecls((d) => {
				if (d.parent.type === "rule" && !inKeyframes(d.parent)) d.important = true;
			});
		};
		if (typeof important === "string") return (rule) => {
			if (inKeyframes(rule)) return;
			rule.selectors = rule.selectors.map((selector) => {
				return (0, _applyImportantSelector.applyImportantSelector)(selector, important);
			});
		};
	}
	function generateRules(candidates, context, isSorting = false) {
		let allRules = [];
		let strategy = getImportantStrategy(context.tailwindConfig.important);
		for (let candidate of candidates) {
			if (context.notClassCache.has(candidate)) continue;
			if (context.candidateRuleCache.has(candidate)) {
				allRules = allRules.concat(Array.from(context.candidateRuleCache.get(candidate)));
				continue;
			}
			let matches = Array.from(resolveMatches(candidate, context));
			if (matches.length === 0) {
				context.notClassCache.add(candidate);
				continue;
			}
			context.classCache.set(candidate, matches);
			var _context_candidateRuleCache_get;
			let rules = (_context_candidateRuleCache_get = context.candidateRuleCache.get(candidate)) !== null && _context_candidateRuleCache_get !== void 0 ? _context_candidateRuleCache_get : /* @__PURE__ */ new Set();
			context.candidateRuleCache.set(candidate, rules);
			for (const match of matches) {
				let [{ sort, options }, rule] = match;
				if (options.respectImportant && strategy) {
					let container = _postcss.default.root({ nodes: [rule.clone()] });
					container.walkRules(strategy);
					rule = container.nodes[0];
				}
				let newEntry = [sort, isSorting ? rule.clone() : rule];
				rules.add(newEntry);
				context.ruleCache.add(newEntry);
				allRules.push(newEntry);
			}
		}
		return allRules;
	}
	function isArbitraryValue(input) {
		return input.startsWith("[") && input.endsWith("]");
	}
}));
var require_corePluginList = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "default", {
		enumerable: true,
		get: function() {
			return _default;
		}
	});
	const _default = [
		"preflight",
		"container",
		"accessibility",
		"pointerEvents",
		"visibility",
		"position",
		"inset",
		"isolation",
		"zIndex",
		"order",
		"gridColumn",
		"gridColumnStart",
		"gridColumnEnd",
		"gridRow",
		"gridRowStart",
		"gridRowEnd",
		"float",
		"clear",
		"margin",
		"boxSizing",
		"lineClamp",
		"display",
		"aspectRatio",
		"size",
		"height",
		"maxHeight",
		"minHeight",
		"width",
		"minWidth",
		"maxWidth",
		"flex",
		"flexShrink",
		"flexGrow",
		"flexBasis",
		"tableLayout",
		"captionSide",
		"borderCollapse",
		"borderSpacing",
		"transformOrigin",
		"translate",
		"rotate",
		"skew",
		"scale",
		"transform",
		"animation",
		"cursor",
		"touchAction",
		"userSelect",
		"resize",
		"scrollSnapType",
		"scrollSnapAlign",
		"scrollSnapStop",
		"scrollMargin",
		"scrollPadding",
		"listStylePosition",
		"listStyleType",
		"listStyleImage",
		"appearance",
		"columns",
		"breakBefore",
		"breakInside",
		"breakAfter",
		"gridAutoColumns",
		"gridAutoFlow",
		"gridAutoRows",
		"gridTemplateColumns",
		"gridTemplateRows",
		"flexDirection",
		"flexWrap",
		"placeContent",
		"placeItems",
		"alignContent",
		"alignItems",
		"justifyContent",
		"justifyItems",
		"gap",
		"space",
		"divideWidth",
		"divideStyle",
		"divideColor",
		"divideOpacity",
		"placeSelf",
		"alignSelf",
		"justifySelf",
		"overflow",
		"overscrollBehavior",
		"scrollBehavior",
		"textOverflow",
		"hyphens",
		"whitespace",
		"textWrap",
		"wordBreak",
		"borderRadius",
		"borderWidth",
		"borderStyle",
		"borderColor",
		"borderOpacity",
		"backgroundColor",
		"backgroundOpacity",
		"backgroundImage",
		"gradientColorStops",
		"boxDecorationBreak",
		"backgroundSize",
		"backgroundAttachment",
		"backgroundClip",
		"backgroundPosition",
		"backgroundRepeat",
		"backgroundOrigin",
		"fill",
		"stroke",
		"strokeWidth",
		"objectFit",
		"objectPosition",
		"padding",
		"textAlign",
		"textIndent",
		"verticalAlign",
		"fontFamily",
		"fontSize",
		"fontWeight",
		"textTransform",
		"fontStyle",
		"fontVariantNumeric",
		"lineHeight",
		"letterSpacing",
		"textColor",
		"textOpacity",
		"textDecoration",
		"textDecorationColor",
		"textDecorationStyle",
		"textDecorationThickness",
		"textUnderlineOffset",
		"fontSmoothing",
		"placeholderColor",
		"placeholderOpacity",
		"caretColor",
		"accentColor",
		"opacity",
		"backgroundBlendMode",
		"mixBlendMode",
		"boxShadow",
		"boxShadowColor",
		"outlineStyle",
		"outlineWidth",
		"outlineOffset",
		"outlineColor",
		"ringWidth",
		"ringColor",
		"ringOpacity",
		"ringOffsetWidth",
		"ringOffsetColor",
		"blur",
		"brightness",
		"contrast",
		"dropShadow",
		"grayscale",
		"hueRotate",
		"invert",
		"saturate",
		"sepia",
		"filter",
		"backdropBlur",
		"backdropBrightness",
		"backdropContrast",
		"backdropGrayscale",
		"backdropHueRotate",
		"backdropInvert",
		"backdropOpacity",
		"backdropSaturate",
		"backdropSepia",
		"backdropFilter",
		"transitionProperty",
		"transitionDelay",
		"transitionDuration",
		"transitionTimingFunction",
		"willChange",
		"contain",
		"content",
		"forcedColorAdjust"
	];
}));
var require_configurePlugins = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "default", {
		enumerable: true,
		get: function() {
			return _default;
		}
	});
	function _default(pluginConfig, plugins) {
		if (pluginConfig === void 0) return plugins;
		return Array.isArray(pluginConfig) ? pluginConfig : [...new Set(plugins.filter((pluginName) => {
			return pluginConfig !== false && pluginConfig[pluginName] !== false;
		}).concat(Object.keys(pluginConfig).filter((pluginName) => {
			return pluginConfig[pluginName] !== false;
		})))];
	}
}));
var require_colors = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "default", {
		enumerable: true,
		get: function() {
			return _default;
		}
	});
	const _log = /* @__PURE__ */ _interop_require_default(require_log());
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function warn({ version, from, to }) {
		_log.default.warn(`${from}-color-renamed`, [`As of Tailwind CSS ${version}, \`${from}\` has been renamed to \`${to}\`.`, "Update your configuration file to silence this warning."]);
	}
	const _default = {
		inherit: "inherit",
		current: "currentColor",
		transparent: "transparent",
		black: "#000",
		white: "#fff",
		slate: {
			50: "#f8fafc",
			100: "#f1f5f9",
			200: "#e2e8f0",
			300: "#cbd5e1",
			400: "#94a3b8",
			500: "#64748b",
			600: "#475569",
			700: "#334155",
			800: "#1e293b",
			900: "#0f172a",
			950: "#020617"
		},
		gray: {
			50: "#f9fafb",
			100: "#f3f4f6",
			200: "#e5e7eb",
			300: "#d1d5db",
			400: "#9ca3af",
			500: "#6b7280",
			600: "#4b5563",
			700: "#374151",
			800: "#1f2937",
			900: "#111827",
			950: "#030712"
		},
		zinc: {
			50: "#fafafa",
			100: "#f4f4f5",
			200: "#e4e4e7",
			300: "#d4d4d8",
			400: "#a1a1aa",
			500: "#71717a",
			600: "#52525b",
			700: "#3f3f46",
			800: "#27272a",
			900: "#18181b",
			950: "#09090b"
		},
		neutral: {
			50: "#fafafa",
			100: "#f5f5f5",
			200: "#e5e5e5",
			300: "#d4d4d4",
			400: "#a3a3a3",
			500: "#737373",
			600: "#525252",
			700: "#404040",
			800: "#262626",
			900: "#171717",
			950: "#0a0a0a"
		},
		stone: {
			50: "#fafaf9",
			100: "#f5f5f4",
			200: "#e7e5e4",
			300: "#d6d3d1",
			400: "#a8a29e",
			500: "#78716c",
			600: "#57534e",
			700: "#44403c",
			800: "#292524",
			900: "#1c1917",
			950: "#0c0a09"
		},
		red: {
			50: "#fef2f2",
			100: "#fee2e2",
			200: "#fecaca",
			300: "#fca5a5",
			400: "#f87171",
			500: "#ef4444",
			600: "#dc2626",
			700: "#b91c1c",
			800: "#991b1b",
			900: "#7f1d1d",
			950: "#450a0a"
		},
		orange: {
			50: "#fff7ed",
			100: "#ffedd5",
			200: "#fed7aa",
			300: "#fdba74",
			400: "#fb923c",
			500: "#f97316",
			600: "#ea580c",
			700: "#c2410c",
			800: "#9a3412",
			900: "#7c2d12",
			950: "#431407"
		},
		amber: {
			50: "#fffbeb",
			100: "#fef3c7",
			200: "#fde68a",
			300: "#fcd34d",
			400: "#fbbf24",
			500: "#f59e0b",
			600: "#d97706",
			700: "#b45309",
			800: "#92400e",
			900: "#78350f",
			950: "#451a03"
		},
		yellow: {
			50: "#fefce8",
			100: "#fef9c3",
			200: "#fef08a",
			300: "#fde047",
			400: "#facc15",
			500: "#eab308",
			600: "#ca8a04",
			700: "#a16207",
			800: "#854d0e",
			900: "#713f12",
			950: "#422006"
		},
		lime: {
			50: "#f7fee7",
			100: "#ecfccb",
			200: "#d9f99d",
			300: "#bef264",
			400: "#a3e635",
			500: "#84cc16",
			600: "#65a30d",
			700: "#4d7c0f",
			800: "#3f6212",
			900: "#365314",
			950: "#1a2e05"
		},
		green: {
			50: "#f0fdf4",
			100: "#dcfce7",
			200: "#bbf7d0",
			300: "#86efac",
			400: "#4ade80",
			500: "#22c55e",
			600: "#16a34a",
			700: "#15803d",
			800: "#166534",
			900: "#14532d",
			950: "#052e16"
		},
		emerald: {
			50: "#ecfdf5",
			100: "#d1fae5",
			200: "#a7f3d0",
			300: "#6ee7b7",
			400: "#34d399",
			500: "#10b981",
			600: "#059669",
			700: "#047857",
			800: "#065f46",
			900: "#064e3b",
			950: "#022c22"
		},
		teal: {
			50: "#f0fdfa",
			100: "#ccfbf1",
			200: "#99f6e4",
			300: "#5eead4",
			400: "#2dd4bf",
			500: "#14b8a6",
			600: "#0d9488",
			700: "#0f766e",
			800: "#115e59",
			900: "#134e4a",
			950: "#042f2e"
		},
		cyan: {
			50: "#ecfeff",
			100: "#cffafe",
			200: "#a5f3fc",
			300: "#67e8f9",
			400: "#22d3ee",
			500: "#06b6d4",
			600: "#0891b2",
			700: "#0e7490",
			800: "#155e75",
			900: "#164e63",
			950: "#083344"
		},
		sky: {
			50: "#f0f9ff",
			100: "#e0f2fe",
			200: "#bae6fd",
			300: "#7dd3fc",
			400: "#38bdf8",
			500: "#0ea5e9",
			600: "#0284c7",
			700: "#0369a1",
			800: "#075985",
			900: "#0c4a6e",
			950: "#082f49"
		},
		blue: {
			50: "#eff6ff",
			100: "#dbeafe",
			200: "#bfdbfe",
			300: "#93c5fd",
			400: "#60a5fa",
			500: "#3b82f6",
			600: "#2563eb",
			700: "#1d4ed8",
			800: "#1e40af",
			900: "#1e3a8a",
			950: "#172554"
		},
		indigo: {
			50: "#eef2ff",
			100: "#e0e7ff",
			200: "#c7d2fe",
			300: "#a5b4fc",
			400: "#818cf8",
			500: "#6366f1",
			600: "#4f46e5",
			700: "#4338ca",
			800: "#3730a3",
			900: "#312e81",
			950: "#1e1b4b"
		},
		violet: {
			50: "#f5f3ff",
			100: "#ede9fe",
			200: "#ddd6fe",
			300: "#c4b5fd",
			400: "#a78bfa",
			500: "#8b5cf6",
			600: "#7c3aed",
			700: "#6d28d9",
			800: "#5b21b6",
			900: "#4c1d95",
			950: "#2e1065"
		},
		purple: {
			50: "#faf5ff",
			100: "#f3e8ff",
			200: "#e9d5ff",
			300: "#d8b4fe",
			400: "#c084fc",
			500: "#a855f7",
			600: "#9333ea",
			700: "#7e22ce",
			800: "#6b21a8",
			900: "#581c87",
			950: "#3b0764"
		},
		fuchsia: {
			50: "#fdf4ff",
			100: "#fae8ff",
			200: "#f5d0fe",
			300: "#f0abfc",
			400: "#e879f9",
			500: "#d946ef",
			600: "#c026d3",
			700: "#a21caf",
			800: "#86198f",
			900: "#701a75",
			950: "#4a044e"
		},
		pink: {
			50: "#fdf2f8",
			100: "#fce7f3",
			200: "#fbcfe8",
			300: "#f9a8d4",
			400: "#f472b6",
			500: "#ec4899",
			600: "#db2777",
			700: "#be185d",
			800: "#9d174d",
			900: "#831843",
			950: "#500724"
		},
		rose: {
			50: "#fff1f2",
			100: "#ffe4e6",
			200: "#fecdd3",
			300: "#fda4af",
			400: "#fb7185",
			500: "#f43f5e",
			600: "#e11d48",
			700: "#be123c",
			800: "#9f1239",
			900: "#881337",
			950: "#4c0519"
		},
		get lightBlue() {
			warn({
				version: "v2.2",
				from: "lightBlue",
				to: "sky"
			});
			return this.sky;
		},
		get warmGray() {
			warn({
				version: "v3.0",
				from: "warmGray",
				to: "stone"
			});
			return this.stone;
		},
		get trueGray() {
			warn({
				version: "v3.0",
				from: "trueGray",
				to: "neutral"
			});
			return this.neutral;
		},
		get coolGray() {
			warn({
				version: "v3.0",
				from: "coolGray",
				to: "gray"
			});
			return this.gray;
		},
		get blueGray() {
			warn({
				version: "v3.0",
				from: "blueGray",
				to: "slate"
			});
			return this.slate;
		}
	};
}));
var require_defaults = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "defaults", {
		enumerable: true,
		get: function() {
			return defaults;
		}
	});
	function defaults(target, ...sources) {
		for (let source of sources) {
			for (let k in source) {
				var _target_hasOwnProperty;
				if (!(target === null || target === void 0 ? void 0 : (_target_hasOwnProperty = target.hasOwnProperty) === null || _target_hasOwnProperty === void 0 ? void 0 : _target_hasOwnProperty.call(target, k))) target[k] = source[k];
			}
			for (let k of Object.getOwnPropertySymbols(source)) {
				var _target_hasOwnProperty1;
				if (!(target === null || target === void 0 ? void 0 : (_target_hasOwnProperty1 = target.hasOwnProperty) === null || _target_hasOwnProperty1 === void 0 ? void 0 : _target_hasOwnProperty1.call(target, k))) target[k] = source[k];
			}
		}
		return target;
	}
}));
var require_normalizeConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "normalizeConfig", {
		enumerable: true,
		get: function() {
			return normalizeConfig;
		}
	});
	const _featureFlags = require_featureFlags();
	const _log = /* @__PURE__ */ _interop_require_wildcard(require_log());
	function _getRequireWildcardCache(nodeInterop) {
		if (typeof WeakMap !== "function") return null;
		var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
		var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
		return (_getRequireWildcardCache = function(nodeInterop) {
			return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
		})(nodeInterop);
	}
	function _interop_require_wildcard(obj, nodeInterop) {
		if (!nodeInterop && obj && obj.__esModule) return obj;
		if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };
		var cache = _getRequireWildcardCache(nodeInterop);
		if (cache && cache.has(obj)) return cache.get(obj);
		var newObj = {};
		var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
		for (var key in obj) if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
			var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
			if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
			else newObj[key] = obj[key];
		}
		newObj.default = obj;
		if (cache) cache.set(obj, newObj);
		return newObj;
	}
	function normalizeConfig(config) {
		if (!(() => {
			if (config.purge) return false;
			if (!config.content) return false;
			if (!Array.isArray(config.content) && !(typeof config.content === "object" && config.content !== null)) return false;
			if (Array.isArray(config.content)) return config.content.every((path) => {
				if (typeof path === "string") return true;
				if (typeof (path === null || path === void 0 ? void 0 : path.raw) !== "string") return false;
				if ((path === null || path === void 0 ? void 0 : path.extension) && typeof (path === null || path === void 0 ? void 0 : path.extension) !== "string") return false;
				return true;
			});
			if (typeof config.content === "object" && config.content !== null) {
				if (Object.keys(config.content).some((key) => ![
					"files",
					"relative",
					"extract",
					"transform"
				].includes(key))) return false;
				if (Array.isArray(config.content.files)) {
					if (!config.content.files.every((path) => {
						if (typeof path === "string") return true;
						if (typeof (path === null || path === void 0 ? void 0 : path.raw) !== "string") return false;
						if ((path === null || path === void 0 ? void 0 : path.extension) && typeof (path === null || path === void 0 ? void 0 : path.extension) !== "string") return false;
						return true;
					})) return false;
					if (typeof config.content.extract === "object") {
						for (let value of Object.values(config.content.extract)) if (typeof value !== "function") return false;
					} else if (!(config.content.extract === void 0 || typeof config.content.extract === "function")) return false;
					if (typeof config.content.transform === "object") {
						for (let value of Object.values(config.content.transform)) if (typeof value !== "function") return false;
					} else if (!(config.content.transform === void 0 || typeof config.content.transform === "function")) return false;
					if (typeof config.content.relative !== "boolean" && typeof config.content.relative !== "undefined") return false;
				}
				return true;
			}
			return false;
		})()) _log.default.warn("purge-deprecation", [
			"The `purge`/`content` options have changed in Tailwind CSS v3.0.",
			"Update your configuration file to eliminate this warning.",
			"https://tailwindcss.com/docs/upgrade-guide#configure-content-sources"
		]);
		config.safelist = (() => {
			var _purge_options;
			let { content, purge, safelist } = config;
			if (Array.isArray(safelist)) return safelist;
			if (Array.isArray(content === null || content === void 0 ? void 0 : content.safelist)) return content.safelist;
			if (Array.isArray(purge === null || purge === void 0 ? void 0 : purge.safelist)) return purge.safelist;
			if (Array.isArray(purge === null || purge === void 0 ? void 0 : (_purge_options = purge.options) === null || _purge_options === void 0 ? void 0 : _purge_options.safelist)) return purge.options.safelist;
			return [];
		})();
		config.blocklist = (() => {
			let { blocklist } = config;
			if (Array.isArray(blocklist)) {
				if (blocklist.every((item) => typeof item === "string")) return blocklist;
				_log.default.warn("blocklist-invalid", ["The `blocklist` option must be an array of strings.", "https://tailwindcss.com/docs/content-configuration#discarding-classes"]);
			}
			return [];
		})();
		if (typeof config.prefix === "function") {
			_log.default.warn("prefix-function", [
				"As of Tailwind CSS v3.0, `prefix` cannot be a function.",
				"Update `prefix` in your configuration to be a string to eliminate this warning.",
				"https://tailwindcss.com/docs/upgrade-guide#prefix-cannot-be-a-function"
			]);
			config.prefix = "";
		} else {
			var _config_prefix;
			config.prefix = (_config_prefix = config.prefix) !== null && _config_prefix !== void 0 ? _config_prefix : "";
		}
		config.content = {
			relative: (() => {
				let { content } = config;
				if (content === null || content === void 0 ? void 0 : content.relative) return content.relative;
				return (0, _featureFlags.flagEnabled)(config, "relativeContentPathsByDefault");
			})(),
			files: (() => {
				let { content, purge } = config;
				if (Array.isArray(purge)) return purge;
				if (Array.isArray(purge === null || purge === void 0 ? void 0 : purge.content)) return purge.content;
				if (Array.isArray(content)) return content;
				if (Array.isArray(content === null || content === void 0 ? void 0 : content.content)) return content.content;
				if (Array.isArray(content === null || content === void 0 ? void 0 : content.files)) return content.files;
				return [];
			})(),
			extract: (() => {
				let extract = (() => {
					var _config_purge, _config_content, _config_purge1, _config_purge_extract, _config_content1, _config_content_extract, _config_purge2, _config_purge_options, _config_content2, _config_content_options;
					if ((_config_purge = config.purge) === null || _config_purge === void 0 ? void 0 : _config_purge.extract) return config.purge.extract;
					if ((_config_content = config.content) === null || _config_content === void 0 ? void 0 : _config_content.extract) return config.content.extract;
					if ((_config_purge1 = config.purge) === null || _config_purge1 === void 0 ? void 0 : (_config_purge_extract = _config_purge1.extract) === null || _config_purge_extract === void 0 ? void 0 : _config_purge_extract.DEFAULT) return config.purge.extract.DEFAULT;
					if ((_config_content1 = config.content) === null || _config_content1 === void 0 ? void 0 : (_config_content_extract = _config_content1.extract) === null || _config_content_extract === void 0 ? void 0 : _config_content_extract.DEFAULT) return config.content.extract.DEFAULT;
					if ((_config_purge2 = config.purge) === null || _config_purge2 === void 0 ? void 0 : (_config_purge_options = _config_purge2.options) === null || _config_purge_options === void 0 ? void 0 : _config_purge_options.extractors) return config.purge.options.extractors;
					if ((_config_content2 = config.content) === null || _config_content2 === void 0 ? void 0 : (_config_content_options = _config_content2.options) === null || _config_content_options === void 0 ? void 0 : _config_content_options.extractors) return config.content.options.extractors;
					return {};
				})();
				let extractors = {};
				let defaultExtractor = (() => {
					var _config_purge, _config_purge_options, _config_content, _config_content_options;
					if ((_config_purge = config.purge) === null || _config_purge === void 0 ? void 0 : (_config_purge_options = _config_purge.options) === null || _config_purge_options === void 0 ? void 0 : _config_purge_options.defaultExtractor) return config.purge.options.defaultExtractor;
					if ((_config_content = config.content) === null || _config_content === void 0 ? void 0 : (_config_content_options = _config_content.options) === null || _config_content_options === void 0 ? void 0 : _config_content_options.defaultExtractor) return config.content.options.defaultExtractor;
				})();
				if (defaultExtractor !== void 0) extractors.DEFAULT = defaultExtractor;
				if (typeof extract === "function") extractors.DEFAULT = extract;
				else if (Array.isArray(extract)) for (let { extensions, extractor } of extract !== null && extract !== void 0 ? extract : []) for (let extension of extensions) extractors[extension] = extractor;
				else if (typeof extract === "object" && extract !== null) Object.assign(extractors, extract);
				return extractors;
			})(),
			transform: (() => {
				let transform = (() => {
					var _config_purge, _config_content, _config_purge1, _config_purge_transform, _config_content1, _config_content_transform;
					if ((_config_purge = config.purge) === null || _config_purge === void 0 ? void 0 : _config_purge.transform) return config.purge.transform;
					if ((_config_content = config.content) === null || _config_content === void 0 ? void 0 : _config_content.transform) return config.content.transform;
					if ((_config_purge1 = config.purge) === null || _config_purge1 === void 0 ? void 0 : (_config_purge_transform = _config_purge1.transform) === null || _config_purge_transform === void 0 ? void 0 : _config_purge_transform.DEFAULT) return config.purge.transform.DEFAULT;
					if ((_config_content1 = config.content) === null || _config_content1 === void 0 ? void 0 : (_config_content_transform = _config_content1.transform) === null || _config_content_transform === void 0 ? void 0 : _config_content_transform.DEFAULT) return config.content.transform.DEFAULT;
					return {};
				})();
				let transformers = {};
				if (typeof transform === "function") transformers.DEFAULT = transform;
				else if (typeof transform === "object" && transform !== null) Object.assign(transformers, transform);
				return transformers;
			})()
		};
		for (let file of config.content.files) if (typeof file === "string" && /{([^,]*?)}/g.test(file)) {
			_log.default.warn("invalid-glob-braces", [`The glob pattern ${(0, _log.dim)(file)} in your Tailwind CSS configuration is invalid.`, `Update it to ${(0, _log.dim)(file.replace(/{([^,]*?)}/g, "$1"))} to silence this warning.`]);
			break;
		}
		return config;
	}
}));
var require_cloneDeep = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "cloneDeep", {
		enumerable: true,
		get: function() {
			return cloneDeep;
		}
	});
	function cloneDeep(value) {
		if (Array.isArray(value)) return value.map((child) => cloneDeep(child));
		if (typeof value === "object" && value !== null) return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, cloneDeep(v)]));
		return value;
	}
}));
var require_resolveConfig$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "default", {
		enumerable: true,
		get: function() {
			return resolveConfig;
		}
	});
	const _negateValue = /* @__PURE__ */ _interop_require_default(require_negateValue());
	const _corePluginList = /* @__PURE__ */ _interop_require_default(require_corePluginList());
	const _configurePlugins = /* @__PURE__ */ _interop_require_default(require_configurePlugins());
	const _colors = /* @__PURE__ */ _interop_require_default(require_colors());
	const _defaults = require_defaults();
	const _toPath = require_toPath();
	const _normalizeConfig = require_normalizeConfig();
	const _isPlainObject = /* @__PURE__ */ _interop_require_default(require_isPlainObject());
	const _cloneDeep = require_cloneDeep();
	const _pluginUtils = require_pluginUtils();
	const _withAlphaVariable = require_withAlphaVariable();
	const _toColorValue = /* @__PURE__ */ _interop_require_default(require_toColorValue());
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function isFunction(input) {
		return typeof input === "function";
	}
	function mergeWith(target, ...sources) {
		let customizer = sources.pop();
		for (let source of sources) for (let k in source) {
			let merged = customizer(target[k], source[k]);
			if (merged === void 0) if ((0, _isPlainObject.default)(target[k]) && (0, _isPlainObject.default)(source[k])) target[k] = mergeWith({}, target[k], source[k], customizer);
			else target[k] = source[k];
			else target[k] = merged;
		}
		return target;
	}
	const configUtils = {
		colors: _colors.default,
		negative(scale) {
			return Object.keys(scale).filter((key) => scale[key] !== "0").reduce((negativeScale, key) => {
				let negativeValue = (0, _negateValue.default)(scale[key]);
				if (negativeValue !== void 0) negativeScale[`-${key}`] = negativeValue;
				return negativeScale;
			}, {});
		},
		breakpoints(screens) {
			return Object.keys(screens).filter((key) => typeof screens[key] === "string").reduce((breakpoints, key) => ({
				...breakpoints,
				[`screen-${key}`]: screens[key]
			}), {});
		}
	};
	function value(valueToResolve, ...args) {
		return isFunction(valueToResolve) ? valueToResolve(...args) : valueToResolve;
	}
	function collectExtends(items) {
		return items.reduce((merged, { extend }) => {
			return mergeWith(merged, extend, (mergedValue, extendValue) => {
				if (mergedValue === void 0) return [extendValue];
				if (Array.isArray(mergedValue)) return [extendValue, ...mergedValue];
				return [extendValue, mergedValue];
			});
		}, {});
	}
	function mergeThemes(themes) {
		return {
			...themes.reduce((merged, theme) => (0, _defaults.defaults)(merged, theme), {}),
			extend: collectExtends(themes)
		};
	}
	function mergeExtensionCustomizer(merged, value) {
		if (Array.isArray(merged) && (0, _isPlainObject.default)(merged[0])) return merged.concat(value);
		if (Array.isArray(value) && (0, _isPlainObject.default)(value[0]) && (0, _isPlainObject.default)(merged)) return [merged, ...value];
		if (Array.isArray(value)) return value;
	}
	function mergeExtensions({ extend, ...theme }) {
		return mergeWith(theme, extend, (themeValue, extensions) => {
			if (!isFunction(themeValue) && !extensions.some(isFunction)) return mergeWith({}, themeValue, ...extensions, mergeExtensionCustomizer);
			return (resolveThemePath, utils) => mergeWith({}, ...[themeValue, ...extensions].map((e) => value(e, resolveThemePath, utils)), mergeExtensionCustomizer);
		});
	}
	function* toPaths(key) {
		let path = (0, _toPath.toPath)(key);
		if (path.length === 0) return;
		yield path;
		if (Array.isArray(key)) return;
		let matches = key.match(/^(.*?)\s*\/\s*([^/]+)$/);
		if (matches !== null) {
			let [, prefix, alpha] = matches;
			let newPath = (0, _toPath.toPath)(prefix);
			newPath.alpha = alpha;
			yield newPath;
		}
	}
	function resolveFunctionKeys(object) {
		const resolvePath = (key, defaultValue) => {
			for (const path of toPaths(key)) {
				let index = 0;
				let val = object;
				while (val !== void 0 && val !== null && index < path.length) {
					val = val[path[index++]];
					val = isFunction(val) && (path.alpha === void 0 || index <= path.length - 1) ? val(resolvePath, configUtils) : val;
				}
				if (val !== void 0) {
					if (path.alpha !== void 0) {
						let normalized = (0, _pluginUtils.parseColorFormat)(val);
						return (0, _withAlphaVariable.withAlphaValue)(normalized, path.alpha, (0, _toColorValue.default)(normalized));
					}
					if ((0, _isPlainObject.default)(val)) return (0, _cloneDeep.cloneDeep)(val);
					return val;
				}
			}
			return defaultValue;
		};
		Object.assign(resolvePath, {
			theme: resolvePath,
			...configUtils
		});
		return Object.keys(object).reduce((resolved, key) => {
			resolved[key] = isFunction(object[key]) ? object[key](resolvePath, configUtils) : object[key];
			return resolved;
		}, {});
	}
	function extractPluginConfigs(configs) {
		let allConfigs = [];
		configs.forEach((config) => {
			allConfigs = [...allConfigs, config];
			var _config_plugins;
			const plugins = (_config_plugins = config === null || config === void 0 ? void 0 : config.plugins) !== null && _config_plugins !== void 0 ? _config_plugins : [];
			if (plugins.length === 0) return;
			plugins.forEach((plugin) => {
				if (plugin.__isOptionsFunction) plugin = plugin();
				var _plugin_config;
				allConfigs = [...allConfigs, ...extractPluginConfigs([(_plugin_config = plugin === null || plugin === void 0 ? void 0 : plugin.config) !== null && _plugin_config !== void 0 ? _plugin_config : {}])];
			});
		});
		return allConfigs;
	}
	function resolveCorePlugins(corePluginConfigs) {
		return [...corePluginConfigs].reduceRight((resolved, corePluginConfig) => {
			if (isFunction(corePluginConfig)) return corePluginConfig({ corePlugins: resolved });
			return (0, _configurePlugins.default)(corePluginConfig, resolved);
		}, _corePluginList.default);
	}
	function resolvePluginLists(pluginLists) {
		return [...pluginLists].reduceRight((resolved, pluginList) => {
			return [...resolved, ...pluginList];
		}, []);
	}
	function resolveConfig(configs) {
		let allConfigs = [...extractPluginConfigs(configs), {
			prefix: "",
			important: false,
			separator: ":"
		}];
		var _t_theme, _c_plugins;
		return (0, _normalizeConfig.normalizeConfig)((0, _defaults.defaults)({
			theme: resolveFunctionKeys(mergeExtensions(mergeThemes(allConfigs.map((t) => {
				return (_t_theme = t === null || t === void 0 ? void 0 : t.theme) !== null && _t_theme !== void 0 ? _t_theme : {};
			})))),
			corePlugins: resolveCorePlugins(allConfigs.map((c) => c.corePlugins)),
			plugins: resolvePluginLists(configs.map((c) => {
				return (_c_plugins = c === null || c === void 0 ? void 0 : c.plugins) !== null && _c_plugins !== void 0 ? _c_plugins : [];
			}))
		}, ...allConfigs));
	}
}));
var require_config_full = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		content: [],
		presets: [],
		darkMode: "media",
		theme: {
			accentColor: ({ theme }) => ({
				...theme("colors"),
				auto: "auto"
			}),
			animation: {
				none: "none",
				spin: "spin 1s linear infinite",
				ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
				pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				bounce: "bounce 1s infinite"
			},
			aria: {
				busy: "busy=\"true\"",
				checked: "checked=\"true\"",
				disabled: "disabled=\"true\"",
				expanded: "expanded=\"true\"",
				hidden: "hidden=\"true\"",
				pressed: "pressed=\"true\"",
				readonly: "readonly=\"true\"",
				required: "required=\"true\"",
				selected: "selected=\"true\""
			},
			aspectRatio: {
				auto: "auto",
				square: "1 / 1",
				video: "16 / 9"
			},
			backdropBlur: ({ theme }) => theme("blur"),
			backdropBrightness: ({ theme }) => theme("brightness"),
			backdropContrast: ({ theme }) => theme("contrast"),
			backdropGrayscale: ({ theme }) => theme("grayscale"),
			backdropHueRotate: ({ theme }) => theme("hueRotate"),
			backdropInvert: ({ theme }) => theme("invert"),
			backdropOpacity: ({ theme }) => theme("opacity"),
			backdropSaturate: ({ theme }) => theme("saturate"),
			backdropSepia: ({ theme }) => theme("sepia"),
			backgroundColor: ({ theme }) => theme("colors"),
			backgroundImage: {
				none: "none",
				"gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops))",
				"gradient-to-tr": "linear-gradient(to top right, var(--tw-gradient-stops))",
				"gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
				"gradient-to-br": "linear-gradient(to bottom right, var(--tw-gradient-stops))",
				"gradient-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))",
				"gradient-to-bl": "linear-gradient(to bottom left, var(--tw-gradient-stops))",
				"gradient-to-l": "linear-gradient(to left, var(--tw-gradient-stops))",
				"gradient-to-tl": "linear-gradient(to top left, var(--tw-gradient-stops))"
			},
			backgroundOpacity: ({ theme }) => theme("opacity"),
			backgroundPosition: {
				bottom: "bottom",
				center: "center",
				left: "left",
				"left-bottom": "left bottom",
				"left-top": "left top",
				right: "right",
				"right-bottom": "right bottom",
				"right-top": "right top",
				top: "top"
			},
			backgroundSize: {
				auto: "auto",
				cover: "cover",
				contain: "contain"
			},
			blur: {
				0: "0",
				none: "",
				sm: "4px",
				DEFAULT: "8px",
				md: "12px",
				lg: "16px",
				xl: "24px",
				"2xl": "40px",
				"3xl": "64px"
			},
			borderColor: ({ theme }) => ({
				...theme("colors"),
				DEFAULT: theme("colors.gray.200", "currentColor")
			}),
			borderOpacity: ({ theme }) => theme("opacity"),
			borderRadius: {
				none: "0px",
				sm: "0.125rem",
				DEFAULT: "0.25rem",
				md: "0.375rem",
				lg: "0.5rem",
				xl: "0.75rem",
				"2xl": "1rem",
				"3xl": "1.5rem",
				full: "9999px"
			},
			borderSpacing: ({ theme }) => ({ ...theme("spacing") }),
			borderWidth: {
				DEFAULT: "1px",
				0: "0px",
				2: "2px",
				4: "4px",
				8: "8px"
			},
			boxShadow: {
				sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
				DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
				md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
				lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
				xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
				"2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
				inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
				none: "none"
			},
			boxShadowColor: ({ theme }) => theme("colors"),
			brightness: {
				0: "0",
				50: ".5",
				75: ".75",
				90: ".9",
				95: ".95",
				100: "1",
				105: "1.05",
				110: "1.1",
				125: "1.25",
				150: "1.5",
				200: "2"
			},
			caretColor: ({ theme }) => theme("colors"),
			colors: ({ colors }) => ({
				inherit: colors.inherit,
				current: colors.current,
				transparent: colors.transparent,
				black: colors.black,
				white: colors.white,
				slate: colors.slate,
				gray: colors.gray,
				zinc: colors.zinc,
				neutral: colors.neutral,
				stone: colors.stone,
				red: colors.red,
				orange: colors.orange,
				amber: colors.amber,
				yellow: colors.yellow,
				lime: colors.lime,
				green: colors.green,
				emerald: colors.emerald,
				teal: colors.teal,
				cyan: colors.cyan,
				sky: colors.sky,
				blue: colors.blue,
				indigo: colors.indigo,
				violet: colors.violet,
				purple: colors.purple,
				fuchsia: colors.fuchsia,
				pink: colors.pink,
				rose: colors.rose
			}),
			columns: {
				auto: "auto",
				1: "1",
				2: "2",
				3: "3",
				4: "4",
				5: "5",
				6: "6",
				7: "7",
				8: "8",
				9: "9",
				10: "10",
				11: "11",
				12: "12",
				"3xs": "16rem",
				"2xs": "18rem",
				xs: "20rem",
				sm: "24rem",
				md: "28rem",
				lg: "32rem",
				xl: "36rem",
				"2xl": "42rem",
				"3xl": "48rem",
				"4xl": "56rem",
				"5xl": "64rem",
				"6xl": "72rem",
				"7xl": "80rem"
			},
			container: {},
			content: { none: "none" },
			contrast: {
				0: "0",
				50: ".5",
				75: ".75",
				100: "1",
				125: "1.25",
				150: "1.5",
				200: "2"
			},
			cursor: {
				auto: "auto",
				default: "default",
				pointer: "pointer",
				wait: "wait",
				text: "text",
				move: "move",
				help: "help",
				"not-allowed": "not-allowed",
				none: "none",
				"context-menu": "context-menu",
				progress: "progress",
				cell: "cell",
				crosshair: "crosshair",
				"vertical-text": "vertical-text",
				alias: "alias",
				copy: "copy",
				"no-drop": "no-drop",
				grab: "grab",
				grabbing: "grabbing",
				"all-scroll": "all-scroll",
				"col-resize": "col-resize",
				"row-resize": "row-resize",
				"n-resize": "n-resize",
				"e-resize": "e-resize",
				"s-resize": "s-resize",
				"w-resize": "w-resize",
				"ne-resize": "ne-resize",
				"nw-resize": "nw-resize",
				"se-resize": "se-resize",
				"sw-resize": "sw-resize",
				"ew-resize": "ew-resize",
				"ns-resize": "ns-resize",
				"nesw-resize": "nesw-resize",
				"nwse-resize": "nwse-resize",
				"zoom-in": "zoom-in",
				"zoom-out": "zoom-out"
			},
			divideColor: ({ theme }) => theme("borderColor"),
			divideOpacity: ({ theme }) => theme("borderOpacity"),
			divideWidth: ({ theme }) => theme("borderWidth"),
			dropShadow: {
				sm: "0 1px 1px rgb(0 0 0 / 0.05)",
				DEFAULT: ["0 1px 2px rgb(0 0 0 / 0.1)", "0 1px 1px rgb(0 0 0 / 0.06)"],
				md: ["0 4px 3px rgb(0 0 0 / 0.07)", "0 2px 2px rgb(0 0 0 / 0.06)"],
				lg: ["0 10px 8px rgb(0 0 0 / 0.04)", "0 4px 3px rgb(0 0 0 / 0.1)"],
				xl: ["0 20px 13px rgb(0 0 0 / 0.03)", "0 8px 5px rgb(0 0 0 / 0.08)"],
				"2xl": "0 25px 25px rgb(0 0 0 / 0.15)",
				none: "0 0 #0000"
			},
			fill: ({ theme }) => ({
				none: "none",
				...theme("colors")
			}),
			flex: {
				1: "1 1 0%",
				auto: "1 1 auto",
				initial: "0 1 auto",
				none: "none"
			},
			flexBasis: ({ theme }) => ({
				auto: "auto",
				...theme("spacing"),
				"1/2": "50%",
				"1/3": "33.333333%",
				"2/3": "66.666667%",
				"1/4": "25%",
				"2/4": "50%",
				"3/4": "75%",
				"1/5": "20%",
				"2/5": "40%",
				"3/5": "60%",
				"4/5": "80%",
				"1/6": "16.666667%",
				"2/6": "33.333333%",
				"3/6": "50%",
				"4/6": "66.666667%",
				"5/6": "83.333333%",
				"1/12": "8.333333%",
				"2/12": "16.666667%",
				"3/12": "25%",
				"4/12": "33.333333%",
				"5/12": "41.666667%",
				"6/12": "50%",
				"7/12": "58.333333%",
				"8/12": "66.666667%",
				"9/12": "75%",
				"10/12": "83.333333%",
				"11/12": "91.666667%",
				full: "100%"
			}),
			flexGrow: {
				0: "0",
				DEFAULT: "1"
			},
			flexShrink: {
				0: "0",
				DEFAULT: "1"
			},
			fontFamily: {
				sans: [
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
					"\"Apple Color Emoji\"",
					"\"Segoe UI Emoji\"",
					"\"Segoe UI Symbol\"",
					"\"Noto Color Emoji\""
				],
				serif: [
					"ui-serif",
					"Georgia",
					"Cambria",
					"\"Times New Roman\"",
					"Times",
					"serif"
				],
				mono: [
					"ui-monospace",
					"SFMono-Regular",
					"Menlo",
					"Monaco",
					"Consolas",
					"\"Liberation Mono\"",
					"\"Courier New\"",
					"monospace"
				]
			},
			fontSize: {
				xs: ["0.75rem", { lineHeight: "1rem" }],
				sm: ["0.875rem", { lineHeight: "1.25rem" }],
				base: ["1rem", { lineHeight: "1.5rem" }],
				lg: ["1.125rem", { lineHeight: "1.75rem" }],
				xl: ["1.25rem", { lineHeight: "1.75rem" }],
				"2xl": ["1.5rem", { lineHeight: "2rem" }],
				"3xl": ["1.875rem", { lineHeight: "2.25rem" }],
				"4xl": ["2.25rem", { lineHeight: "2.5rem" }],
				"5xl": ["3rem", { lineHeight: "1" }],
				"6xl": ["3.75rem", { lineHeight: "1" }],
				"7xl": ["4.5rem", { lineHeight: "1" }],
				"8xl": ["6rem", { lineHeight: "1" }],
				"9xl": ["8rem", { lineHeight: "1" }]
			},
			fontWeight: {
				thin: "100",
				extralight: "200",
				light: "300",
				normal: "400",
				medium: "500",
				semibold: "600",
				bold: "700",
				extrabold: "800",
				black: "900"
			},
			gap: ({ theme }) => theme("spacing"),
			gradientColorStops: ({ theme }) => theme("colors"),
			gradientColorStopPositions: {
				"0%": "0%",
				"5%": "5%",
				"10%": "10%",
				"15%": "15%",
				"20%": "20%",
				"25%": "25%",
				"30%": "30%",
				"35%": "35%",
				"40%": "40%",
				"45%": "45%",
				"50%": "50%",
				"55%": "55%",
				"60%": "60%",
				"65%": "65%",
				"70%": "70%",
				"75%": "75%",
				"80%": "80%",
				"85%": "85%",
				"90%": "90%",
				"95%": "95%",
				"100%": "100%"
			},
			grayscale: {
				0: "0",
				DEFAULT: "100%"
			},
			gridAutoColumns: {
				auto: "auto",
				min: "min-content",
				max: "max-content",
				fr: "minmax(0, 1fr)"
			},
			gridAutoRows: {
				auto: "auto",
				min: "min-content",
				max: "max-content",
				fr: "minmax(0, 1fr)"
			},
			gridColumn: {
				auto: "auto",
				"span-1": "span 1 / span 1",
				"span-2": "span 2 / span 2",
				"span-3": "span 3 / span 3",
				"span-4": "span 4 / span 4",
				"span-5": "span 5 / span 5",
				"span-6": "span 6 / span 6",
				"span-7": "span 7 / span 7",
				"span-8": "span 8 / span 8",
				"span-9": "span 9 / span 9",
				"span-10": "span 10 / span 10",
				"span-11": "span 11 / span 11",
				"span-12": "span 12 / span 12",
				"span-full": "1 / -1"
			},
			gridColumnEnd: {
				auto: "auto",
				1: "1",
				2: "2",
				3: "3",
				4: "4",
				5: "5",
				6: "6",
				7: "7",
				8: "8",
				9: "9",
				10: "10",
				11: "11",
				12: "12",
				13: "13"
			},
			gridColumnStart: {
				auto: "auto",
				1: "1",
				2: "2",
				3: "3",
				4: "4",
				5: "5",
				6: "6",
				7: "7",
				8: "8",
				9: "9",
				10: "10",
				11: "11",
				12: "12",
				13: "13"
			},
			gridRow: {
				auto: "auto",
				"span-1": "span 1 / span 1",
				"span-2": "span 2 / span 2",
				"span-3": "span 3 / span 3",
				"span-4": "span 4 / span 4",
				"span-5": "span 5 / span 5",
				"span-6": "span 6 / span 6",
				"span-7": "span 7 / span 7",
				"span-8": "span 8 / span 8",
				"span-9": "span 9 / span 9",
				"span-10": "span 10 / span 10",
				"span-11": "span 11 / span 11",
				"span-12": "span 12 / span 12",
				"span-full": "1 / -1"
			},
			gridRowEnd: {
				auto: "auto",
				1: "1",
				2: "2",
				3: "3",
				4: "4",
				5: "5",
				6: "6",
				7: "7",
				8: "8",
				9: "9",
				10: "10",
				11: "11",
				12: "12",
				13: "13"
			},
			gridRowStart: {
				auto: "auto",
				1: "1",
				2: "2",
				3: "3",
				4: "4",
				5: "5",
				6: "6",
				7: "7",
				8: "8",
				9: "9",
				10: "10",
				11: "11",
				12: "12",
				13: "13"
			},
			gridTemplateColumns: {
				none: "none",
				subgrid: "subgrid",
				1: "repeat(1, minmax(0, 1fr))",
				2: "repeat(2, minmax(0, 1fr))",
				3: "repeat(3, minmax(0, 1fr))",
				4: "repeat(4, minmax(0, 1fr))",
				5: "repeat(5, minmax(0, 1fr))",
				6: "repeat(6, minmax(0, 1fr))",
				7: "repeat(7, minmax(0, 1fr))",
				8: "repeat(8, minmax(0, 1fr))",
				9: "repeat(9, minmax(0, 1fr))",
				10: "repeat(10, minmax(0, 1fr))",
				11: "repeat(11, minmax(0, 1fr))",
				12: "repeat(12, minmax(0, 1fr))"
			},
			gridTemplateRows: {
				none: "none",
				subgrid: "subgrid",
				1: "repeat(1, minmax(0, 1fr))",
				2: "repeat(2, minmax(0, 1fr))",
				3: "repeat(3, minmax(0, 1fr))",
				4: "repeat(4, minmax(0, 1fr))",
				5: "repeat(5, minmax(0, 1fr))",
				6: "repeat(6, minmax(0, 1fr))",
				7: "repeat(7, minmax(0, 1fr))",
				8: "repeat(8, minmax(0, 1fr))",
				9: "repeat(9, minmax(0, 1fr))",
				10: "repeat(10, minmax(0, 1fr))",
				11: "repeat(11, minmax(0, 1fr))",
				12: "repeat(12, minmax(0, 1fr))"
			},
			height: ({ theme }) => ({
				auto: "auto",
				...theme("spacing"),
				"1/2": "50%",
				"1/3": "33.333333%",
				"2/3": "66.666667%",
				"1/4": "25%",
				"2/4": "50%",
				"3/4": "75%",
				"1/5": "20%",
				"2/5": "40%",
				"3/5": "60%",
				"4/5": "80%",
				"1/6": "16.666667%",
				"2/6": "33.333333%",
				"3/6": "50%",
				"4/6": "66.666667%",
				"5/6": "83.333333%",
				full: "100%",
				screen: "100vh",
				svh: "100svh",
				lvh: "100lvh",
				dvh: "100dvh",
				min: "min-content",
				max: "max-content",
				fit: "fit-content"
			}),
			hueRotate: {
				0: "0deg",
				15: "15deg",
				30: "30deg",
				60: "60deg",
				90: "90deg",
				180: "180deg"
			},
			inset: ({ theme }) => ({
				auto: "auto",
				...theme("spacing"),
				"1/2": "50%",
				"1/3": "33.333333%",
				"2/3": "66.666667%",
				"1/4": "25%",
				"2/4": "50%",
				"3/4": "75%",
				full: "100%"
			}),
			invert: {
				0: "0",
				DEFAULT: "100%"
			},
			keyframes: {
				spin: { to: { transform: "rotate(360deg)" } },
				ping: { "75%, 100%": {
					transform: "scale(2)",
					opacity: "0"
				} },
				pulse: { "50%": { opacity: ".5" } },
				bounce: {
					"0%, 100%": {
						transform: "translateY(-25%)",
						animationTimingFunction: "cubic-bezier(0.8,0,1,1)"
					},
					"50%": {
						transform: "none",
						animationTimingFunction: "cubic-bezier(0,0,0.2,1)"
					}
				}
			},
			letterSpacing: {
				tighter: "-0.05em",
				tight: "-0.025em",
				normal: "0em",
				wide: "0.025em",
				wider: "0.05em",
				widest: "0.1em"
			},
			lineHeight: {
				none: "1",
				tight: "1.25",
				snug: "1.375",
				normal: "1.5",
				relaxed: "1.625",
				loose: "2",
				3: ".75rem",
				4: "1rem",
				5: "1.25rem",
				6: "1.5rem",
				7: "1.75rem",
				8: "2rem",
				9: "2.25rem",
				10: "2.5rem"
			},
			listStyleType: {
				none: "none",
				disc: "disc",
				decimal: "decimal"
			},
			listStyleImage: { none: "none" },
			margin: ({ theme }) => ({
				auto: "auto",
				...theme("spacing")
			}),
			lineClamp: {
				1: "1",
				2: "2",
				3: "3",
				4: "4",
				5: "5",
				6: "6"
			},
			maxHeight: ({ theme }) => ({
				...theme("spacing"),
				none: "none",
				full: "100%",
				screen: "100vh",
				svh: "100svh",
				lvh: "100lvh",
				dvh: "100dvh",
				min: "min-content",
				max: "max-content",
				fit: "fit-content"
			}),
			maxWidth: ({ theme, breakpoints }) => ({
				...theme("spacing"),
				none: "none",
				xs: "20rem",
				sm: "24rem",
				md: "28rem",
				lg: "32rem",
				xl: "36rem",
				"2xl": "42rem",
				"3xl": "48rem",
				"4xl": "56rem",
				"5xl": "64rem",
				"6xl": "72rem",
				"7xl": "80rem",
				full: "100%",
				min: "min-content",
				max: "max-content",
				fit: "fit-content",
				prose: "65ch",
				...breakpoints(theme("screens"))
			}),
			minHeight: ({ theme }) => ({
				...theme("spacing"),
				full: "100%",
				screen: "100vh",
				svh: "100svh",
				lvh: "100lvh",
				dvh: "100dvh",
				min: "min-content",
				max: "max-content",
				fit: "fit-content"
			}),
			minWidth: ({ theme }) => ({
				...theme("spacing"),
				full: "100%",
				min: "min-content",
				max: "max-content",
				fit: "fit-content"
			}),
			objectPosition: {
				bottom: "bottom",
				center: "center",
				left: "left",
				"left-bottom": "left bottom",
				"left-top": "left top",
				right: "right",
				"right-bottom": "right bottom",
				"right-top": "right top",
				top: "top"
			},
			opacity: {
				0: "0",
				5: "0.05",
				10: "0.1",
				15: "0.15",
				20: "0.2",
				25: "0.25",
				30: "0.3",
				35: "0.35",
				40: "0.4",
				45: "0.45",
				50: "0.5",
				55: "0.55",
				60: "0.6",
				65: "0.65",
				70: "0.7",
				75: "0.75",
				80: "0.8",
				85: "0.85",
				90: "0.9",
				95: "0.95",
				100: "1"
			},
			order: {
				first: "-9999",
				last: "9999",
				none: "0",
				1: "1",
				2: "2",
				3: "3",
				4: "4",
				5: "5",
				6: "6",
				7: "7",
				8: "8",
				9: "9",
				10: "10",
				11: "11",
				12: "12"
			},
			outlineColor: ({ theme }) => theme("colors"),
			outlineOffset: {
				0: "0px",
				1: "1px",
				2: "2px",
				4: "4px",
				8: "8px"
			},
			outlineWidth: {
				0: "0px",
				1: "1px",
				2: "2px",
				4: "4px",
				8: "8px"
			},
			padding: ({ theme }) => theme("spacing"),
			placeholderColor: ({ theme }) => theme("colors"),
			placeholderOpacity: ({ theme }) => theme("opacity"),
			ringColor: ({ theme }) => ({
				DEFAULT: theme("colors.blue.500", "#3b82f6"),
				...theme("colors")
			}),
			ringOffsetColor: ({ theme }) => theme("colors"),
			ringOffsetWidth: {
				0: "0px",
				1: "1px",
				2: "2px",
				4: "4px",
				8: "8px"
			},
			ringOpacity: ({ theme }) => ({
				DEFAULT: "0.5",
				...theme("opacity")
			}),
			ringWidth: {
				DEFAULT: "3px",
				0: "0px",
				1: "1px",
				2: "2px",
				4: "4px",
				8: "8px"
			},
			rotate: {
				0: "0deg",
				1: "1deg",
				2: "2deg",
				3: "3deg",
				6: "6deg",
				12: "12deg",
				45: "45deg",
				90: "90deg",
				180: "180deg"
			},
			saturate: {
				0: "0",
				50: ".5",
				100: "1",
				150: "1.5",
				200: "2"
			},
			scale: {
				0: "0",
				50: ".5",
				75: ".75",
				90: ".9",
				95: ".95",
				100: "1",
				105: "1.05",
				110: "1.1",
				125: "1.25",
				150: "1.5"
			},
			screens: {
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px"
			},
			scrollMargin: ({ theme }) => ({ ...theme("spacing") }),
			scrollPadding: ({ theme }) => theme("spacing"),
			sepia: {
				0: "0",
				DEFAULT: "100%"
			},
			skew: {
				0: "0deg",
				1: "1deg",
				2: "2deg",
				3: "3deg",
				6: "6deg",
				12: "12deg"
			},
			space: ({ theme }) => ({ ...theme("spacing") }),
			spacing: {
				px: "1px",
				0: "0px",
				.5: "0.125rem",
				1: "0.25rem",
				1.5: "0.375rem",
				2: "0.5rem",
				2.5: "0.625rem",
				3: "0.75rem",
				3.5: "0.875rem",
				4: "1rem",
				5: "1.25rem",
				6: "1.5rem",
				7: "1.75rem",
				8: "2rem",
				9: "2.25rem",
				10: "2.5rem",
				11: "2.75rem",
				12: "3rem",
				14: "3.5rem",
				16: "4rem",
				20: "5rem",
				24: "6rem",
				28: "7rem",
				32: "8rem",
				36: "9rem",
				40: "10rem",
				44: "11rem",
				48: "12rem",
				52: "13rem",
				56: "14rem",
				60: "15rem",
				64: "16rem",
				72: "18rem",
				80: "20rem",
				96: "24rem"
			},
			stroke: ({ theme }) => ({
				none: "none",
				...theme("colors")
			}),
			strokeWidth: {
				0: "0",
				1: "1",
				2: "2"
			},
			supports: {},
			data: {},
			textColor: ({ theme }) => theme("colors"),
			textDecorationColor: ({ theme }) => theme("colors"),
			textDecorationThickness: {
				auto: "auto",
				"from-font": "from-font",
				0: "0px",
				1: "1px",
				2: "2px",
				4: "4px",
				8: "8px"
			},
			textIndent: ({ theme }) => ({ ...theme("spacing") }),
			textOpacity: ({ theme }) => theme("opacity"),
			textUnderlineOffset: {
				auto: "auto",
				0: "0px",
				1: "1px",
				2: "2px",
				4: "4px",
				8: "8px"
			},
			transformOrigin: {
				center: "center",
				top: "top",
				"top-right": "top right",
				right: "right",
				"bottom-right": "bottom right",
				bottom: "bottom",
				"bottom-left": "bottom left",
				left: "left",
				"top-left": "top left"
			},
			transitionDelay: {
				0: "0s",
				75: "75ms",
				100: "100ms",
				150: "150ms",
				200: "200ms",
				300: "300ms",
				500: "500ms",
				700: "700ms",
				1e3: "1000ms"
			},
			transitionDuration: {
				DEFAULT: "150ms",
				0: "0s",
				75: "75ms",
				100: "100ms",
				150: "150ms",
				200: "200ms",
				300: "300ms",
				500: "500ms",
				700: "700ms",
				1e3: "1000ms"
			},
			transitionProperty: {
				none: "none",
				all: "all",
				DEFAULT: "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
				colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
				opacity: "opacity",
				shadow: "box-shadow",
				transform: "transform"
			},
			transitionTimingFunction: {
				DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
				linear: "linear",
				in: "cubic-bezier(0.4, 0, 1, 1)",
				out: "cubic-bezier(0, 0, 0.2, 1)",
				"in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
			},
			translate: ({ theme }) => ({
				...theme("spacing"),
				"1/2": "50%",
				"1/3": "33.333333%",
				"2/3": "66.666667%",
				"1/4": "25%",
				"2/4": "50%",
				"3/4": "75%",
				full: "100%"
			}),
			size: ({ theme }) => ({
				auto: "auto",
				...theme("spacing"),
				"1/2": "50%",
				"1/3": "33.333333%",
				"2/3": "66.666667%",
				"1/4": "25%",
				"2/4": "50%",
				"3/4": "75%",
				"1/5": "20%",
				"2/5": "40%",
				"3/5": "60%",
				"4/5": "80%",
				"1/6": "16.666667%",
				"2/6": "33.333333%",
				"3/6": "50%",
				"4/6": "66.666667%",
				"5/6": "83.333333%",
				"1/12": "8.333333%",
				"2/12": "16.666667%",
				"3/12": "25%",
				"4/12": "33.333333%",
				"5/12": "41.666667%",
				"6/12": "50%",
				"7/12": "58.333333%",
				"8/12": "66.666667%",
				"9/12": "75%",
				"10/12": "83.333333%",
				"11/12": "91.666667%",
				full: "100%",
				min: "min-content",
				max: "max-content",
				fit: "fit-content"
			}),
			width: ({ theme }) => ({
				auto: "auto",
				...theme("spacing"),
				"1/2": "50%",
				"1/3": "33.333333%",
				"2/3": "66.666667%",
				"1/4": "25%",
				"2/4": "50%",
				"3/4": "75%",
				"1/5": "20%",
				"2/5": "40%",
				"3/5": "60%",
				"4/5": "80%",
				"1/6": "16.666667%",
				"2/6": "33.333333%",
				"3/6": "50%",
				"4/6": "66.666667%",
				"5/6": "83.333333%",
				"1/12": "8.333333%",
				"2/12": "16.666667%",
				"3/12": "25%",
				"4/12": "33.333333%",
				"5/12": "41.666667%",
				"6/12": "50%",
				"7/12": "58.333333%",
				"8/12": "66.666667%",
				"9/12": "75%",
				"10/12": "83.333333%",
				"11/12": "91.666667%",
				full: "100%",
				screen: "100vw",
				svw: "100svw",
				lvw: "100lvw",
				dvw: "100dvw",
				min: "min-content",
				max: "max-content",
				fit: "fit-content"
			}),
			willChange: {
				auto: "auto",
				scroll: "scroll-position",
				contents: "contents",
				transform: "transform"
			},
			zIndex: {
				auto: "auto",
				0: "0",
				10: "10",
				20: "20",
				30: "30",
				40: "40",
				50: "50"
			}
		},
		plugins: []
	};
}));
var require_getAllConfigs = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "default", {
		enumerable: true,
		get: function() {
			return getAllConfigs;
		}
	});
	const _configfull = /* @__PURE__ */ _interop_require_default(require_config_full());
	const _featureFlags = require_featureFlags();
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function getAllConfigs(config) {
		var _config_presets;
		const configs = ((_config_presets = config === null || config === void 0 ? void 0 : config.presets) !== null && _config_presets !== void 0 ? _config_presets : [_configfull.default]).slice().reverse().flatMap((preset) => getAllConfigs(preset instanceof Function ? preset() : preset));
		const features = {
			respectDefaultRingColorOpacity: { theme: { ringColor: ({ theme }) => ({
				DEFAULT: "#3b82f67f",
				...theme("colors")
			}) } },
			disableColorOpacityUtilitiesByDefault: { corePlugins: {
				backgroundOpacity: false,
				borderOpacity: false,
				divideOpacity: false,
				placeholderOpacity: false,
				ringOpacity: false,
				textOpacity: false
			} }
		};
		return [
			config,
			...Object.keys(features).filter((feature) => (0, _featureFlags.flagEnabled)(config, feature)).map((feature) => features[feature]),
			...configs
		];
	}
}));
var require_resolve_config = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "default", {
		enumerable: true,
		get: function() {
			return resolveConfig;
		}
	});
	const _resolveConfig = /* @__PURE__ */ _interop_require_default(require_resolveConfig$1());
	const _getAllConfigs = /* @__PURE__ */ _interop_require_default(require_getAllConfigs());
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function resolveConfig(...configs) {
		let [, ...defaultConfigs] = (0, _getAllConfigs.default)(configs[0]);
		return (0, _resolveConfig.default)([...configs, ...defaultConfigs]);
	}
}));
var require_resolveConfig = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let resolveConfig = require_resolve_config();
	module.exports = (resolveConfig.__esModule ? resolveConfig : { default: resolveConfig }).default;
}));
var import_clear_module = /* @__PURE__ */ __toESM(require_clear_module(), 1);
var import_generateRules = require_generateRules();
var import_setupContextUtils = require_setupContextUtils();
var import_resolveConfig = /* @__PURE__ */ __toESM(require_resolveConfig(), 1);
function prefixCandidate(context, selector) {
	let prefix = context.tailwindConfig.prefix;
	return typeof prefix === "function" ? prefix(selector) : prefix + selector;
}
async function loadV3(pkgDir, jsConfig) {
	let createContext = import_setupContextUtils.createContext;
	let generateRules = import_generateRules.generateRules;
	let resolveConfig = import_resolveConfig.default;
	let tailwindConfig = { content: [] };
	try {
		if (pkgDir) {
			resolveConfig = __require(path.join(pkgDir, "resolveConfig"));
			createContext = __require(path.join(pkgDir, "lib/lib/setupContextUtils")).createContext;
			generateRules = __require(path.join(pkgDir, "lib/lib/generateRules")).generateRules;
		}
	} catch {}
	try {
		if (jsConfig) {
			(0, import_clear_module.default)(jsConfig);
			let jiti = createJiti(import.meta.url, {
				moduleCache: false,
				fsCache: false,
				interopDefault: true
			});
			let url = pathToFileURL(jsConfig);
			tailwindConfig = await jiti.import(url.href, { default: true });
		}
	} catch (err) {
		console.error(`Unable to load your Tailwind CSS v3 config: ${jsConfig}`);
		throw err;
	}
	tailwindConfig.content = ["no-op"];
	let context = createContext(resolveConfig(tailwindConfig));
	function getClassOrderPolyfill(classes) {
		let parasiteUtilities = new Set([prefixCandidate(context, "group"), prefixCandidate(context, "peer")]);
		let classNamesWithOrder = [];
		for (let className of classes) {
			var _generateRules$sort$;
			let order = ((_generateRules$sort$ = generateRules(new Set([className]), context).sort(([a], [z]) => bigSign(z - a))[0]) === null || _generateRules$sort$ === void 0 ? void 0 : _generateRules$sort$[0]) ?? null;
			if (order === null && parasiteUtilities.has(className)) order = context.layerOrder.components;
			classNamesWithOrder.push([className, order]);
		}
		return classNamesWithOrder;
	}
	context.getClassOrder ?? (context.getClassOrder = getClassOrderPolyfill);
	return { getClassOrder: (classList) => {
		return context.getClassOrder ? context.getClassOrder(classList) : getClassOrderPolyfill(classList);
	} };
}
//#endregion
export { loadV3 };
