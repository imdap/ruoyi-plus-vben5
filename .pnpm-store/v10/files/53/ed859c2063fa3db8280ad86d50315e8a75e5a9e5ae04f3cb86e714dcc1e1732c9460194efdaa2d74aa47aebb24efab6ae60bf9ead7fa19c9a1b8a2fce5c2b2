import { a as __toESM, t as __commonJSMin } from "./chunk-DSjvVL_1-BYdvZw3N.js";
import { n as loadIfExists, r as maybeResolve, t as expiringMap } from "./resolve-pWjAK-4f-C1Z6M6r2.js";
import { i as visit, n as cacheForDirs, r as spliceChangesIntoString } from "./utils-D8dQkKEd-BtAa7w-M.js";
import { a as sortClasses, i as sortClassList, n as error, o as warn, r as getTailwindConfig$1 } from "./sorter-BZkvDMjt-tVbe6MxP.js";
import { parsers as sn } from "./angular-BS7_jn7o.js";
import { parsers as ra, t as babel_exports } from "./babel-CL6HLzZ0.js";
import { parsers as en, t as postcss_exports } from "./postcss-k2aCwkzC.js";
import index_exports from "./prettier-DmvT5K0i.js";
import * as path from "node:path";
import { isAbsolute } from "path";
//#region ../../node_modules/.pnpm/prettier-plugin-tailwindcss@0.0.0-insiders.3997fbd_prettier@3.8.1/node_modules/prettier-plugin-tailwindcss/dist/index.mjs
var require_isarray = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toString = {}.toString;
	module.exports = Array.isArray || function(arr) {
		return toString.call(arr) == "[object Array]";
	};
}));
/*!
* isobject <https://github.com/jonschlinkert/isobject>
*
* Copyright (c) 2014-2015, Jon Schlinkert.
* Licensed under the MIT License.
*/
var require_isobject = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isArray = require_isarray();
	module.exports = function isObject(val) {
		return val != null && typeof val === "object" && isArray(val) === false;
	};
}));
var import_line_column = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isArray = require_isarray();
	var isObject = require_isobject();
	Array.prototype.slice;
	module.exports = LineColumnFinder;
	function LineColumnFinder(str, options) {
		if (!(this instanceof LineColumnFinder)) {
			if (typeof options === "number") return new LineColumnFinder(str).fromIndex(options);
			return new LineColumnFinder(str, options);
		}
		this.str = str || "";
		this.lineToIndex = buildLineToIndex(this.str);
		options = options || {};
		this.origin = typeof options.origin === "undefined" ? 1 : options.origin;
	}
	LineColumnFinder.prototype.fromIndex = function(index) {
		if (index < 0 || index >= this.str.length || isNaN(index)) return null;
		var line = findLowerIndexInRangeArray(index, this.lineToIndex);
		return {
			line: line + this.origin,
			col: index - this.lineToIndex[line] + this.origin
		};
	};
	LineColumnFinder.prototype.toIndex = function(line, column) {
		if (typeof column === "undefined") {
			if (isArray(line) && line.length >= 2) return this.toIndex(line[0], line[1]);
			if (isObject(line) && "line" in line && ("col" in line || "column" in line)) return this.toIndex(line.line, "col" in line ? line.col : line.column);
			return -1;
		}
		if (isNaN(line) || isNaN(column)) return -1;
		line -= this.origin;
		column -= this.origin;
		if (line >= 0 && column >= 0 && line < this.lineToIndex.length) {
			var lineIndex = this.lineToIndex[line];
			var nextIndex = line === this.lineToIndex.length - 1 ? this.str.length : this.lineToIndex[line + 1];
			if (column < nextIndex - lineIndex) return lineIndex + column;
		}
		return -1;
	};
	function buildLineToIndex(str) {
		var lines = str.split("\n"), lineToIndex = new Array(lines.length), index = 0;
		for (var i = 0, l = lines.length; i < l; i++) {
			lineToIndex[i] = index;
			index += lines[i].length + 1;
		}
		return lineToIndex;
	}
	function findLowerIndexInRangeArray(value, arr) {
		if (value >= arr[arr.length - 1]) return arr.length - 1;
		var min = 0, max = arr.length - 2, mid;
		while (min < max) {
			mid = min + (max - min >> 1);
			if (value < arr[mid]) max = mid - 1;
			else if (value >= arr[mid + 1]) min = mid + 1;
			else {
				min = mid;
				break;
			}
		}
		return min;
	}
})))(), 1);
let prettierConfigCache = expiringMap(1e4);
async function resolvePrettierConfigDir(filePath, inputDir) {
	let cached = prettierConfigCache.get(inputDir);
	if (cached !== void 0) return cached ?? process.cwd();
	const resolve = async () => {
		try {
			return await index_exports.resolveConfigFile(filePath);
		} catch (err) {
			error("prettier-config-not-found", "Failed to resolve Prettier Config");
			error("prettier-config-not-found-err", err);
			return null;
		}
	};
	let prettierConfig = await resolve();
	if (prettierConfig) {
		let configDir = path.dirname(prettierConfig);
		cacheForDirs(prettierConfigCache, inputDir, configDir, configDir);
		return configDir;
	} else {
		prettierConfigCache.set(inputDir, null);
		return process.cwd();
	}
}
async function getTailwindConfig(options) {
	let cwd = process.cwd();
	let inputDir = options.filepath ? path.dirname(options.filepath) : cwd;
	let needsPrettierConfig = options.tailwindConfig && !path.isAbsolute(options.tailwindConfig) || options.tailwindStylesheet && !path.isAbsolute(options.tailwindStylesheet) || options.tailwindEntryPoint && !path.isAbsolute(options.tailwindEntryPoint);
	let configDir;
	if (needsPrettierConfig) configDir = await resolvePrettierConfigDir(options.filepath, inputDir);
	else configDir = cwd;
	let configPath = options.tailwindConfig && !options.tailwindConfig.endsWith(".css") ? options.tailwindConfig : void 0;
	let stylesheetPath = options.tailwindStylesheet;
	if (!stylesheetPath && options.tailwindEntryPoint) {
		warn("entrypoint-is-deprecated", configDir, "Deprecated: Use the `tailwindStylesheet` option for v4 projects instead of `tailwindEntryPoint`.");
		stylesheetPath = options.tailwindEntryPoint;
	}
	if (!stylesheetPath && options.tailwindConfig && options.tailwindConfig.endsWith(".css")) {
		warn("config-as-css-is-deprecated", configDir, "Deprecated: Use the `tailwindStylesheet` option for v4 projects instead of `tailwindConfig`.");
		stylesheetPath = options.tailwindConfig;
	}
	return getTailwindConfig$1({
		base: configDir,
		filepath: options.filepath,
		configPath,
		stylesheetPath,
		packageName: options.tailwindPackageName
	});
}
const options = {
	tailwindConfig: {
		type: "string",
		category: "Tailwind CSS",
		description: "Path to Tailwind configuration file"
	},
	tailwindEntryPoint: {
		type: "string",
		category: "Tailwind CSS",
		description: "Path to the CSS entrypoint in your Tailwind project (v4+)"
	},
	tailwindStylesheet: {
		type: "string",
		category: "Tailwind CSS",
		description: "Path to the CSS stylesheet in your Tailwind project (v4+)"
	},
	tailwindAttributes: {
		type: "string",
		array: true,
		default: [{ value: [] }],
		category: "Tailwind CSS",
		description: "List of attributes/props that contain sortable Tailwind classes"
	},
	tailwindFunctions: {
		type: "string",
		array: true,
		default: [{ value: [] }],
		category: "Tailwind CSS",
		description: "List of functions and tagged templates that contain sortable Tailwind classes"
	},
	tailwindPreserveWhitespace: {
		type: "boolean",
		default: false,
		category: "Tailwind CSS",
		description: "Preserve whitespace around Tailwind classes when sorting"
	},
	tailwindPreserveDuplicates: {
		type: "boolean",
		default: false,
		category: "Tailwind CSS",
		description: "Preserve duplicate classes inside a class list when sorting"
	},
	tailwindPackageName: {
		type: "string",
		default: "tailwindcss",
		category: "Tailwind CSS",
		description: "The package name to use when loading Tailwind CSS"
	}
};
function createMatcher(options, parser, defaults) {
	let staticAttrs = new Set(defaults.staticAttrs);
	let dynamicAttrs = new Set(defaults.dynamicAttrs);
	let functions = new Set(defaults.functions);
	let staticAttrsRegex = [...defaults.staticAttrsRegex];
	let functionsRegex = [...defaults.functionsRegex];
	for (let attr of options.tailwindAttributes ?? []) {
		let regex = parseRegex(attr);
		if (regex) staticAttrsRegex.push(regex);
		else if (parser === "vue" && attr.startsWith(":")) staticAttrs.add(attr.slice(1));
		else if (parser === "vue" && attr.startsWith("v-bind:")) staticAttrs.add(attr.slice(7));
		else if (parser === "vue" && attr.startsWith("v-")) dynamicAttrs.add(attr);
		else if (parser === "angular" && attr.startsWith("[") && attr.endsWith("]")) staticAttrs.add(attr.slice(1, -1));
		else staticAttrs.add(attr);
	}
	for (let attr of staticAttrs) if (parser === "vue") {
		dynamicAttrs.add(`:${attr}`);
		dynamicAttrs.add(`v-bind:${attr}`);
	} else if (parser === "angular") dynamicAttrs.add(`[${attr}]`);
	for (let fn of options.tailwindFunctions ?? []) {
		let regex = parseRegex(fn);
		if (regex) functionsRegex.push(regex);
		else functions.add(fn);
	}
	return {
		hasStaticAttr: (name) => {
			if (nameFromDynamicAttr(name, parser)) return false;
			return hasMatch(name, staticAttrs, staticAttrsRegex);
		},
		hasDynamicAttr: (name) => {
			if (hasMatch(name, dynamicAttrs, [])) return true;
			let newName = nameFromDynamicAttr(name, parser);
			if (!newName) return false;
			return hasMatch(newName, staticAttrs, staticAttrsRegex);
		},
		hasFunction: (name) => hasMatch(name, functions, functionsRegex)
	};
}
function nameFromDynamicAttr(name, parser) {
	if (parser === "vue") {
		if (name.startsWith(":")) return name.slice(1);
		if (name.startsWith("v-bind:")) return name.slice(7);
		if (name.startsWith("v-")) return name;
		return null;
	}
	if (parser === "angular") {
		if (name.startsWith("[") && name.endsWith("]")) return name.slice(1, -1);
		return null;
	}
	return null;
}
function hasMatch(name, list, patterns) {
	if (list.has(name)) return true;
	for (let regex of patterns) if (regex.test(name)) return true;
	return false;
}
function parseRegex(str) {
	if (!str.startsWith("/")) return null;
	let lastSlash = str.lastIndexOf("/");
	if (lastSlash <= 0) return null;
	try {
		let pattern = str.slice(1, lastSlash);
		let flags = str.slice(lastSlash + 1);
		return new RegExp(pattern, flags);
	} catch {
		return null;
	}
}
function createPlugin(transforms) {
	let parsers = Object.create(null);
	let printers = Object.create(null);
	for (let opts of transforms) {
		for (let [name, meta] of Object.entries(opts.parsers)) parsers[name] = async () => {
			var _plugin$parsers;
			let original = (_plugin$parsers = (await loadPlugins(meta.load ?? opts.load ?? [])).parsers) === null || _plugin$parsers === void 0 ? void 0 : _plugin$parsers[name];
			if (!original) return;
			parsers[name] = await createParser({
				name,
				original,
				opts
			});
			return parsers[name];
		};
		for (let [name, _meta] of Object.entries(opts.printers ?? {})) printers[name] = async () => {
			var _plugin$printers;
			let original = (_plugin$printers = (await loadPlugins(opts.load ?? [])).printers) === null || _plugin$printers === void 0 ? void 0 : _plugin$printers[name];
			if (!original) return;
			printers[name] = createPrinter({
				original,
				opts
			});
			return printers[name];
		};
	}
	return {
		parsers,
		printers
	};
}
async function createParser({ name, original, opts }) {
	let parser = { ...original };
	async function load(options) {
		let parser = { ...original };
		for (const pluginName of opts.compatible || []) {
			var _plugin$parsers2;
			let plugin = await findEnabledPlugin(options, pluginName);
			if (plugin === null || plugin === void 0 || (_plugin$parsers2 = plugin.parsers) === null || _plugin$parsers2 === void 0 ? void 0 : _plugin$parsers2[name]) Object.assign(parser, plugin.parsers[name]);
		}
		return parser;
	}
	parser.preprocess = async (code, options) => {
		let parser = await load(options);
		return parser.preprocess ? parser.preprocess(code, options) : code;
	};
	parser.parse = async (code, options) => {
		let ast = await (await load(options)).parse(code, options, options);
		let env = await loadTailwindCSS({
			opts,
			options
		});
		transformAst({
			ast,
			env,
			opts,
			options
		});
		options.__tailwindcss__ = env;
		return ast;
	};
	return parser;
}
function createPrinter({ original, opts }) {
	let printer = { ...original };
	let reprint = opts.reprint;
	if (reprint) {
		printer.print = new Proxy(original.print, { apply(target, thisArg, args) {
			let [path, options] = args;
			let env = options.__tailwindcss__;
			reprint(path, {
				...env,
				options
			});
			return Reflect.apply(target, thisArg, args);
		} });
		if (original.embed) printer.embed = new Proxy(original.embed, { apply(target, thisArg, args) {
			let [path, options] = args;
			let env = options.__tailwindcss__;
			reprint(path, {
				...env,
				options
			});
			return Reflect.apply(target, thisArg, args);
		} });
	}
	return printer;
}
async function loadPlugins(fns) {
	let plugin = {
		parsers: Object.create(null),
		printers: Object.create(null),
		options: Object.create(null),
		defaultOptions: Object.create(null),
		languages: []
	};
	for (let source of fns) {
		let loaded = await loadPlugin(source);
		Object.assign(plugin.parsers, loaded.parsers ?? {});
		Object.assign(plugin.printers, loaded.printers ?? {});
		Object.assign(plugin.options, loaded.options ?? {});
		Object.assign(plugin.defaultOptions, loaded.defaultOptions ?? {});
		plugin.languages = [...plugin.languages ?? [], ...loaded.languages ?? []];
	}
	return plugin;
}
const EMPTY_PLUGIN = {
	parsers: {},
	printers: {},
	languages: [],
	options: {},
	defaultOptions: {}
};
async function loadPlugin(source) {
	if ("importer" in source && typeof source.importer === "function") return normalizePlugin(await source.importer());
	return source;
}
function normalizePlugin(source) {
	if (source === null || typeof source !== "object") return EMPTY_PLUGIN;
	let plugin = source.default;
	return plugin && typeof plugin === "object" ? plugin : source;
}
function findEnabledPlugin(options, name) {
	for (let plugin of options.plugins) {
		if (plugin instanceof URL) {
			if (plugin.protocol !== "file:") continue;
			if (plugin.hostname !== "") continue;
			plugin = plugin.pathname;
		}
		if (typeof plugin !== "string") {
			if (!plugin.name) continue;
			plugin = plugin.name;
		}
		if (plugin === name || isAbsolute(plugin) && plugin.includes(name) && maybeResolve(name) === plugin) return loadIfExists(name);
	}
}
async function loadTailwindCSS({ options, opts }) {
	var _parsers$parser, _parsers$parser2;
	let parsers = opts.parsers;
	let parser = options.parser;
	return {
		context: await getTailwindConfig(options),
		matcher: createMatcher(options, parser, {
			staticAttrs: new Set(((_parsers$parser = parsers[parser]) === null || _parsers$parser === void 0 ? void 0 : _parsers$parser.staticAttrs) ?? opts.staticAttrs ?? []),
			dynamicAttrs: new Set(((_parsers$parser2 = parsers[parser]) === null || _parsers$parser2 === void 0 ? void 0 : _parsers$parser2.dynamicAttrs) ?? opts.dynamicAttrs ?? []),
			functions: /* @__PURE__ */ new Set(),
			staticAttrsRegex: [],
			dynamicAttrsRegex: [],
			functionsRegex: []
		}),
		options,
		changes: []
	};
}
function transformAst({ ast, env, opts }) {
	let transform = opts.transform;
	if (transform) transform(ast, env);
}
function defineTransform(opts) {
	return opts;
}
const ESCAPE_SEQUENCE_PATTERN = /\\(['"\\nrtbfv0-7xuU])/g;
function tryParseAngularAttribute(value, env) {
	try {
		return sn.__ng_directive.parse(value, env.options);
	} catch (err) {
		console.warn("prettier-plugin-tailwindcss: Unable to parse angular directive");
		console.warn(err);
		return null;
	}
}
function transformDynamicAngularAttribute(attr, env) {
	let directiveAst = tryParseAngularAttribute(attr.value, env);
	if (!directiveAst) return;
	let changes = [];
	visit(directiveAst, {
		StringLiteral(node, path) {
			if (!node.value) return;
			let collapseWhitespace = canCollapseWhitespaceIn(path, env);
			changes.push({
				start: node.start + 1,
				end: node.end - 1,
				before: node.value,
				after: sortClasses(node.value, {
					env,
					collapseWhitespace
				})
			});
		},
		TemplateLiteral(node, path) {
			if (!node.quasis.length) return;
			let collapseWhitespace = canCollapseWhitespaceIn(path, env);
			for (let i = 0; i < node.quasis.length; i++) {
				let quasi = node.quasis[i];
				changes.push({
					start: quasi.start,
					end: quasi.end,
					before: quasi.value.raw,
					after: sortClasses(quasi.value.raw, {
						env,
						ignoreFirst: i > 0 && !/^\s/.test(quasi.value.raw),
						ignoreLast: i < node.expressions.length && !/\s$/.test(quasi.value.raw),
						collapseWhitespace: collapseWhitespace ? {
							start: collapseWhitespace.start && i === 0,
							end: collapseWhitespace.end && i >= node.expressions.length
						} : false
					})
				});
			}
		}
	});
	attr.value = spliceChangesIntoString(attr.value, changes);
}
function transformDynamicJsAttribute(attr, env) {
	let { matcher } = env;
	let source = `let __prettier_temp__ = ${attr.value}`;
	let ast = ra["babel-ts"].parse(source, env.options);
	let didChange = false;
	let changes = [];
	function findConcatEntry(path) {
		return path.find((entry) => {
			var _entry$parent;
			return ((_entry$parent = entry.parent) === null || _entry$parent === void 0 ? void 0 : _entry$parent.type) === "BinaryExpression" && entry.parent.operator === "+";
		});
	}
	function addChange(start, end, after) {
		if (start == null || end == null) return;
		let offsetStart = start - 24;
		let offsetEnd = end - 24;
		if (offsetStart < 0 || offsetEnd < 0) return;
		didChange = true;
		changes.push({
			start: offsetStart,
			end: offsetEnd,
			before: attr.value.slice(offsetStart, offsetEnd),
			after
		});
	}
	visit(ast, {
		StringLiteral(node, path) {
			let concat = findConcatEntry(path);
			if (sortStringLiteral(node, {
				env,
				collapseWhitespace: {
					start: (concat === null || concat === void 0 ? void 0 : concat.key) !== "right",
					end: (concat === null || concat === void 0 ? void 0 : concat.key) !== "left"
				}
			})) {
				var _node$extra;
				let raw = ((_node$extra = node.extra) === null || _node$extra === void 0 ? void 0 : _node$extra.raw) ?? node.raw;
				if (typeof raw === "string") addChange(node.start, node.end, raw);
			}
		},
		Literal(node, path) {
			if (!isStringLiteral(node)) return;
			let concat = findConcatEntry(path);
			if (sortStringLiteral(node, {
				env,
				collapseWhitespace: {
					start: (concat === null || concat === void 0 ? void 0 : concat.key) !== "right",
					end: (concat === null || concat === void 0 ? void 0 : concat.key) !== "left"
				}
			})) {
				var _node$extra2;
				let raw = ((_node$extra2 = node.extra) === null || _node$extra2 === void 0 ? void 0 : _node$extra2.raw) ?? node.raw;
				if (typeof raw === "string") addChange(node.start, node.end, raw);
			}
		},
		TemplateLiteral(node, path) {
			let concat = findConcatEntry(path);
			let originalQuasis = node.quasis.map((quasi) => quasi.value.raw);
			if (sortTemplateLiteral(node, {
				env,
				collapseWhitespace: {
					start: (concat === null || concat === void 0 ? void 0 : concat.key) !== "right",
					end: (concat === null || concat === void 0 ? void 0 : concat.key) !== "left"
				}
			})) for (let i = 0; i < node.quasis.length; i++) {
				let quasi = node.quasis[i];
				if (quasi.value.raw !== originalQuasis[i]) addChange(quasi.start, quasi.end, quasi.value.raw);
			}
		},
		TaggedTemplateExpression(node, path) {
			if (!isSortableTemplateExpression(node, matcher)) return;
			let concat = findConcatEntry(path);
			let originalQuasis = node.quasi.quasis.map((quasi) => quasi.value.raw);
			if (sortTemplateLiteral(node.quasi, {
				env,
				collapseWhitespace: {
					start: (concat === null || concat === void 0 ? void 0 : concat.key) !== "right",
					end: (concat === null || concat === void 0 ? void 0 : concat.key) !== "left"
				}
			})) for (let i = 0; i < node.quasi.quasis.length; i++) {
				let quasi = node.quasi.quasis[i];
				if (quasi.value.raw !== originalQuasis[i]) addChange(quasi.start, quasi.end, quasi.value.raw);
			}
		}
	});
	if (didChange) attr.value = spliceChangesIntoString(attr.value, changes);
}
function transformHtml(ast, env) {
	let { matcher } = env;
	let { parser } = env.options;
	for (let attr of ast.attrs ?? []) if (matcher.hasStaticAttr(attr.name)) attr.value = sortClasses(attr.value, { env });
	else if (matcher.hasDynamicAttr(attr.name)) {
		if (!/[`'"]/.test(attr.value)) continue;
		if (parser === "angular") transformDynamicAngularAttribute(attr, env);
		else transformDynamicJsAttribute(attr, env);
	}
	for (let child of ast.children ?? []) transformHtml(child, env);
}
function transformGlimmer(ast, env) {
	let { matcher } = env;
	visit(ast, {
		AttrNode(attr, _path, meta) {
			if (matcher.hasStaticAttr(attr.name) && attr.value) meta.sortTextNodes = true;
		},
		TextNode(node, path, meta) {
			if (!meta.sortTextNodes) return;
			let concat = path.find((entry) => {
				return entry.parent && entry.parent.type === "ConcatStatement";
			});
			let siblings = {
				prev: concat === null || concat === void 0 ? void 0 : concat.parent.parts[concat.index - 1],
				next: concat === null || concat === void 0 ? void 0 : concat.parent.parts[concat.index + 1]
			};
			node.chars = sortClasses(node.chars, {
				env,
				ignoreFirst: siblings.prev && !/^\s/.test(node.chars),
				ignoreLast: siblings.next && !/\s$/.test(node.chars),
				collapseWhitespace: {
					start: !siblings.prev,
					end: !siblings.next
				}
			});
		},
		StringLiteral(node, path, meta) {
			if (!meta.sortTextNodes) return;
			let concat = path.find((entry) => {
				return entry.parent && entry.parent.type === "SubExpression" && entry.parent.path.original === "concat";
			});
			node.value = sortClasses(node.value, {
				env,
				ignoreLast: Boolean(concat) && !/[^\S\r\n]$/.test(node.value),
				collapseWhitespace: {
					start: false,
					end: !concat
				}
			});
		}
	});
}
function transformLiquid(ast, env) {
	let { matcher } = env;
	function isClassAttr(node) {
		return Array.isArray(node.name) ? node.name.every((n) => n.type === "TextNode" && matcher.hasStaticAttr(n.value)) : matcher.hasStaticAttr(node.name);
	}
	function hasSurroundingQuotes(str) {
		let start = str[0];
		return start === str[str.length - 1] && (start === "\"" || start === "'" || start === "`");
	}
	let sources = [];
	let changes = [];
	function sortAttribute(attr) {
		for (let i = 0; i < attr.value.length; i++) {
			let node = attr.value[i];
			if (node.type === "TextNode") {
				let after = sortClasses(node.value, {
					env,
					ignoreFirst: i > 0 && !/^\s/.test(node.value),
					ignoreLast: i < attr.value.length - 1 && !/\s$/.test(node.value),
					removeDuplicates: false,
					collapseWhitespace: false
				});
				changes.push({
					start: node.position.start,
					end: node.position.end,
					before: node.value,
					after
				});
			} else if ((node.type === "LiquidDrop" || node.type === "LiquidVariableOutput") && typeof node.markup === "object" && node.markup.type === "LiquidVariable") visit(node.markup.expression, { String(node) {
				let pos = { ...node.position };
				if (hasSurroundingQuotes(node.source.slice(pos.start, pos.end))) {
					pos.start += 1;
					pos.end -= 1;
				}
				let after = sortClasses(node.value, { env });
				changes.push({
					start: pos.start,
					end: pos.end,
					before: node.value,
					after
				});
			} });
		}
	}
	visit(ast, {
		LiquidTag(node) {
			sources.push(node);
		},
		HtmlElement(node) {
			sources.push(node);
		},
		AttrSingleQuoted(node) {
			if (isClassAttr(node)) {
				sources.push(node);
				sortAttribute(node);
			}
		},
		AttrDoubleQuoted(node) {
			if (isClassAttr(node)) {
				sources.push(node);
				sortAttribute(node);
			}
		}
	});
	for (let node of sources) node.source = spliceChangesIntoString(node.source, changes);
}
function sortStringLiteral(node, { env, removeDuplicates, collapseWhitespace = {
	start: true,
	end: true
} }) {
	var _node$extra3, _node$extra4;
	let result = sortClasses(node.value, {
		env,
		removeDuplicates,
		collapseWhitespace
	});
	if (!(result !== node.value)) return false;
	node.value = result;
	let raw = ((_node$extra3 = node.extra) === null || _node$extra3 === void 0 ? void 0 : _node$extra3.raw) ?? node.raw;
	let quote = raw[0];
	let originalRawContent = raw.slice(1, -1);
	let originalValue = ((_node$extra4 = node.extra) === null || _node$extra4 === void 0 ? void 0 : _node$extra4.rawValue) ?? node.value;
	if (node.extra) {
		if (originalRawContent !== originalValue && originalValue.includes("\\")) result = result.replace(ESCAPE_SEQUENCE_PATTERN, "\\\\$1");
		node.extra = {
			...node.extra,
			rawValue: result,
			raw: quote + result + quote
		};
	} else node.raw = quote + result + quote;
	return true;
}
function isStringLiteral(node) {
	return node.type === "StringLiteral" || node.type === "Literal" && typeof node.value === "string";
}
function sortTemplateLiteral(node, { env, removeDuplicates, collapseWhitespace = {
	start: true,
	end: true
} }) {
	let didChange = false;
	for (let i = 0; i < node.quasis.length; i++) {
		let quasi = node.quasis[i];
		let same = quasi.value.raw === quasi.value.cooked;
		let originalRaw = quasi.value.raw;
		let originalCooked = quasi.value.cooked;
		quasi.value.raw = sortClasses(quasi.value.raw, {
			env,
			removeDuplicates,
			ignoreFirst: i > 0 && !/^\s/.test(quasi.value.raw),
			ignoreLast: i < node.expressions.length && !/\s$/.test(quasi.value.raw),
			collapseWhitespace: collapseWhitespace && {
				start: collapseWhitespace && collapseWhitespace.start && i === 0,
				end: collapseWhitespace && collapseWhitespace.end && i >= node.expressions.length
			}
		});
		quasi.value.cooked = same ? quasi.value.raw : sortClasses(quasi.value.cooked, {
			env,
			ignoreFirst: i > 0 && !/^\s/.test(quasi.value.cooked),
			ignoreLast: i < node.expressions.length && !/\s$/.test(quasi.value.cooked),
			removeDuplicates,
			collapseWhitespace: collapseWhitespace && {
				start: collapseWhitespace && collapseWhitespace.start && i === 0,
				end: collapseWhitespace && collapseWhitespace.end && i >= node.expressions.length
			}
		});
		if (quasi.value.raw !== originalRaw || quasi.value.cooked !== originalCooked) didChange = true;
	}
	return didChange;
}
function isSortableTemplateExpression(node, matcher) {
	return isSortableExpression(node.tag, matcher);
}
function isSortableCallExpression(node, matcher) {
	var _node$arguments;
	if (!((_node$arguments = node.arguments) === null || _node$arguments === void 0 ? void 0 : _node$arguments.length)) return false;
	return isSortableExpression(node.callee, matcher);
}
function isSortableExpression(node, matcher) {
	while (node.type === "CallExpression" || node.type === "MemberExpression") if (node.type === "CallExpression") node = node.callee;
	else if (node.type === "MemberExpression") node = node.object;
	if (node.type === "Identifier") return matcher.hasFunction(node.name);
	return false;
}
function canCollapseWhitespaceIn(path, env) {
	if (env.options.tailwindPreserveWhitespace) return false;
	let start = true;
	let end = true;
	for (let entry of path) {
		if (!entry.parent) continue;
		if (entry.parent.type === "BinaryExpression" && entry.parent.operator === "+") {
			start && (start = entry.key !== "right");
			end && (end = entry.key !== "left");
		}
		if (entry.parent.type === "TemplateLiteral") {
			let nodeStart = entry.node.start ?? null;
			let nodeEnd = entry.node.end ?? null;
			for (let quasi of entry.parent.quasis) {
				let quasiStart = quasi.start ?? null;
				let quasiEnd = quasi.end ?? null;
				if (nodeStart !== null && quasiEnd !== null && nodeStart - quasiEnd <= 2) start && (start = /^\s/.test(quasi.value.raw));
				if (nodeEnd !== null && quasiStart !== null && nodeEnd - quasiStart <= 2) end && (end = /\s$/.test(quasi.value.raw));
			}
		}
	}
	return {
		start,
		end
	};
}
function transformJavaScript(ast, env) {
	let { matcher } = env;
	function sortInside(ast) {
		visit(ast, (node, path) => {
			let collapseWhitespace = canCollapseWhitespaceIn(path, env);
			if (isStringLiteral(node)) sortStringLiteral(node, {
				env,
				collapseWhitespace
			});
			else if (node.type === "TemplateLiteral") sortTemplateLiteral(node, {
				env,
				collapseWhitespace
			});
			else if (node.type === "TaggedTemplateExpression") {
				if (isSortableTemplateExpression(node, matcher)) sortTemplateLiteral(node.quasi, {
					env,
					collapseWhitespace
				});
			}
		});
	}
	visit(ast, {
		JSXAttribute(node) {
			node = node;
			if (!node.value) return;
			if (typeof node.name.name !== "string") return;
			if (!matcher.hasStaticAttr(node.name.name)) return;
			if (isStringLiteral(node.value)) sortStringLiteral(node.value, { env });
			else if (node.value.type === "JSXExpressionContainer") sortInside(node.value);
		},
		CallExpression(node) {
			node = node;
			if (!isSortableCallExpression(node, matcher)) return;
			node.arguments.forEach((arg) => sortInside(arg));
		},
		TaggedTemplateExpression(node, path) {
			node = node;
			if (!isSortableTemplateExpression(node, matcher)) return;
			let collapseWhitespace = canCollapseWhitespaceIn(path, env);
			sortTemplateLiteral(node.quasi, {
				env,
				collapseWhitespace
			});
		}
	});
}
function transformCss(ast, env) {
	function tryParseAtRuleParams(name, params) {
		if (typeof params !== "string") return params;
		try {
			return en.css.parse(`@import ${params};`, { ...env.options }).nodes[0].params;
		} catch (err) {
			console.warn(`[prettier-plugin-tailwindcss] Unable to parse at rule`);
			console.warn({
				name,
				params
			});
			console.warn(err);
		}
		return params;
	}
	ast.walk((node) => {
		if (node.name === "plugin" || node.name === "config" || node.name === "source") node.params = tryParseAtRuleParams(node.name, node.params);
		if (node.type === "css-atrule" && node.name === "apply") {
			let isImportant = /\s+(?:!important|#{(['"]*)!important\1})\s*$/.test(node.params);
			let classList = node.params;
			let prefix = "";
			let suffix = "";
			if (classList.startsWith("~\"") && classList.endsWith("\"")) {
				prefix = "~\"";
				suffix = "\"";
				classList = classList.slice(2, -1);
				isImportant = false;
			} else if (classList.startsWith("~'") && classList.endsWith("'")) {
				prefix = "~'";
				suffix = "'";
				classList = classList.slice(2, -1);
				isImportant = false;
			}
			classList = sortClasses(classList, {
				env,
				ignoreLast: isImportant,
				collapseWhitespace: {
					start: false,
					end: !isImportant
				}
			});
			node.params = `${prefix}${classList}${suffix}`;
		}
	});
}
function transformAstro(ast, env) {
	let { matcher } = env;
	if (ast.type === "element" || ast.type === "custom-element" || ast.type === "component") {
		for (let attr of ast.attributes ?? []) if (matcher.hasStaticAttr(attr.name) && attr.type === "attribute" && attr.kind === "quoted") attr.value = sortClasses(attr.value, { env });
		else if (matcher.hasDynamicAttr(attr.name) && attr.type === "attribute" && attr.kind === "expression" && typeof attr.value === "string") transformDynamicJsAttribute(attr, env);
	}
	for (let child of ast.children ?? []) transformAstro(child, env);
}
function transformMarko(ast, env) {
	let { matcher } = env;
	const nodesToVisit = [ast];
	while (nodesToVisit.length > 0) {
		const currentNode = nodesToVisit.pop();
		switch (currentNode.type) {
			case "File":
				nodesToVisit.push(currentNode.program);
				break;
			case "Program":
				nodesToVisit.push(...currentNode.body);
				break;
			case "MarkoTag":
				nodesToVisit.push(...currentNode.attributes);
				nodesToVisit.push(currentNode.body);
				break;
			case "MarkoTagBody":
				nodesToVisit.push(...currentNode.body);
				break;
			case "MarkoAttribute":
				if (!matcher.hasStaticAttr(currentNode.name)) break;
				switch (currentNode.value.type) {
					case "ArrayExpression":
						const classList = currentNode.value.elements;
						for (const node of classList) if (node.type === "StringLiteral") node.value = sortClasses(node.value, { env });
						break;
					case "StringLiteral":
						currentNode.value.value = sortClasses(currentNode.value.value, { env });
						break;
				}
				break;
		}
	}
}
function transformTwig(ast, env) {
	let { matcher } = env;
	for (let child of ast.expressions ?? []) transformTwig(child, env);
	visit(ast, {
		Attribute(node, _path, meta) {
			if (!matcher.hasStaticAttr(node.name.name)) return;
			meta.sortTextNodes = true;
		},
		CallExpression(node, _path, meta) {
			while (node.type === "CallExpression" || node.type === "MemberExpression") if (node.type === "CallExpression") node = node.callee;
			else if (node.type === "MemberExpression") node = node.property;
			if (node.type === "Identifier") {
				if (!matcher.hasFunction(node.name)) return;
			}
			meta.sortTextNodes = true;
		},
		StringLiteral(node, path, meta) {
			if (!meta.sortTextNodes) return;
			const concat = path.find((entry) => {
				return entry.parent && (entry.parent.type === "BinaryConcatExpression" || entry.parent.type === "BinaryAddExpression");
			});
			node.value = sortClasses(node.value, {
				env,
				ignoreFirst: (concat === null || concat === void 0 ? void 0 : concat.key) === "right" && !/^[^\S\r\n]/.test(node.value),
				ignoreLast: (concat === null || concat === void 0 ? void 0 : concat.key) === "left" && !/[^\S\r\n]$/.test(node.value),
				collapseWhitespace: {
					start: (concat === null || concat === void 0 ? void 0 : concat.key) !== "right",
					end: (concat === null || concat === void 0 ? void 0 : concat.key) !== "left"
				}
			});
		}
	});
}
function transformPug(ast, env) {
	let { matcher } = env;
	for (const token of ast.tokens) if (token.type === "attribute" && matcher.hasStaticAttr(token.name)) token.val = [
		token.val.slice(0, 1),
		sortClasses(token.val.slice(1, -1), { env }),
		token.val.slice(-1)
	].join("");
	let startIdx = -1;
	let endIdx = -1;
	let ranges = [];
	for (let i = 0; i < ast.tokens.length; i++) if (ast.tokens[i].type === "class") {
		startIdx = startIdx === -1 ? i : startIdx;
		endIdx = i;
	} else if (startIdx !== -1) {
		ranges.push([startIdx, endIdx]);
		startIdx = -1;
		endIdx = -1;
	}
	if (startIdx !== -1) {
		ranges.push([startIdx, endIdx]);
		startIdx = -1;
		endIdx = -1;
	}
	for (const [startIdx, endIdx] of ranges) {
		const { classList } = sortClassList({
			classList: ast.tokens.slice(startIdx, endIdx + 1).map((token) => token.val),
			api: env.context,
			removeDuplicates: false
		});
		for (let i = startIdx; i <= endIdx; i++) ast.tokens[i].val = classList[i - startIdx];
	}
}
function transformSvelte(ast, env) {
	let { matcher, changes } = env;
	for (let attr of ast.attributes ?? []) {
		if (!matcher.hasStaticAttr(attr.name) || attr.type !== "Attribute") continue;
		for (let i = 0; i < attr.value.length; i++) {
			let value = attr.value[i];
			if (value.type === "Text") {
				let same = value.raw === value.data;
				value.raw = sortClasses(value.raw, {
					env,
					ignoreFirst: i > 0 && !/^\s/.test(value.raw),
					ignoreLast: i < attr.value.length - 1 && !/\s$/.test(value.raw),
					removeDuplicates: true,
					collapseWhitespace: false
				});
				value.data = same ? value.raw : sortClasses(value.data, {
					env,
					ignoreFirst: i > 0 && !/^\s/.test(value.data),
					ignoreLast: i < attr.value.length - 1 && !/\s$/.test(value.data),
					removeDuplicates: true,
					collapseWhitespace: false
				});
			} else if (value.type === "MustacheTag") visit(value.expression, {
				Literal(node) {
					if (isStringLiteral(node)) {
						let before = node.raw;
						if (sortStringLiteral(node, {
							env,
							removeDuplicates: false,
							collapseWhitespace: false
						})) changes.push({
							before,
							after: node.raw,
							start: node.loc.start,
							end: node.loc.end
						});
					}
				},
				TemplateLiteral(node) {
					let before = node.quasis.map((quasi) => quasi.value.raw);
					if (sortTemplateLiteral(node, {
						env,
						removeDuplicates: false,
						collapseWhitespace: false
					})) for (let [idx, quasi] of node.quasis.entries()) changes.push({
						before: before[idx],
						after: quasi.value.raw,
						start: quasi.loc.start,
						end: quasi.loc.end
					});
				}
			});
		}
	}
	for (let child of ast.children ?? []) transformSvelte(child, env);
	if (ast.type === "IfBlock") {
		var _ast$else;
		for (let child of ((_ast$else = ast.else) === null || _ast$else === void 0 ? void 0 : _ast$else.children) ?? []) transformSvelte(child, env);
	}
	if (ast.type === "AwaitBlock") {
		let nodes = [
			ast.pending,
			ast.then,
			ast.catch
		];
		for (let child of nodes) transformSvelte(child, env);
	}
	if (ast.html) transformSvelte(ast.html, env);
}
const { parsers, printers } = createPlugin([
	defineTransform({
		staticAttrs: ["class"],
		load: [{
			name: "prettier/plugins/html",
			importer: () => import("./html-cr_GTtzg.js")
		}],
		compatible: ["prettier-plugin-organize-attributes"],
		parsers: {
			html: {},
			lwc: {},
			angular: { dynamicAttrs: ["[ngClass]"] },
			vue: { dynamicAttrs: [":class", "v-bind:class"] }
		},
		transform: transformHtml
	}),
	defineTransform({
		staticAttrs: ["class"],
		load: [{
			name: "prettier/plugins/glimmer",
			importer: () => import("./glimmer-Dj-rhc3H.js")
		}],
		parsers: { glimmer: {} },
		transform: transformGlimmer
	}),
	defineTransform({
		load: [postcss_exports],
		compatible: ["prettier-plugin-css-order"],
		parsers: {
			css: {},
			scss: {},
			less: {}
		},
		transform: transformCss
	}),
	defineTransform({
		staticAttrs: ["class", "className"],
		compatible: [
			"prettier-plugin-multiline-arrays",
			"@ianvs/prettier-plugin-sort-imports",
			"@trivago/prettier-plugin-sort-imports",
			"prettier-plugin-organize-imports",
			"prettier-plugin-sort-imports",
			"prettier-plugin-jsdoc"
		],
		parsers: {
			babel: { load: [babel_exports] },
			"babel-flow": { load: [babel_exports] },
			"babel-ts": { load: [babel_exports] },
			__js_expression: { load: [babel_exports] },
			typescript: { load: [{
				name: "prettier/plugins/typescript",
				importer: () => import("./typescript-8enly1_u.js")
			}] },
			meriyah: { load: [{
				name: "prettier/plugins/meriyah",
				importer: () => import("./meriyah-Dyll-d_f.js")
			}] },
			acorn: { load: [{
				name: "prettier/plugins/acorn",
				importer: () => import("./acorn-BnWlLI9w.js")
			}] },
			flow: { load: [{
				name: "prettier/plugins/flow",
				importer: () => import("./flow-JTvJzd2b.js")
			}] },
			oxc: { load: [{
				name: "@prettier/plugin-oxc",
				importer: () => import("@prettier/plugin-oxc")
			}] },
			"oxc-ts": { load: [{
				name: "@prettier/plugin-oxc",
				importer: () => import("@prettier/plugin-oxc")
			}] },
			hermes: { load: [{
				name: "@prettier/plugin-hermes",
				importer: () => import("@prettier/plugin-hermes")
			}] },
			astroExpressionParser: {
				load: [{
					name: "prettier-plugin-astro",
					importer: () => {
						return import("prettier-plugin-astro");
					}
				}],
				staticAttrs: ["class"],
				dynamicAttrs: ["class:list"]
			}
		},
		transform: transformJavaScript
	}),
	defineTransform({
		staticAttrs: ["class"],
		load: [{
			name: "prettier-plugin-svelte",
			importer: () => import("prettier-plugin-svelte")
		}],
		parsers: { svelte: {} },
		printers: { "svelte-ast": {} },
		transform: transformSvelte,
		reprint(path, { options, changes }) {
			if (options.__mutatedOriginalText) return;
			options.__mutatedOriginalText = true;
			if (!(changes === null || changes === void 0 ? void 0 : changes.length)) return;
			let finder = (0, import_line_column.default)(options.originalText);
			let stringChanges = changes.map((change) => ({
				...change,
				start: finder.toIndex(change.start.line, change.start.column + 1),
				end: finder.toIndex(change.end.line, change.end.column + 1)
			}));
			options.originalText = spliceChangesIntoString(options.originalText, stringChanges);
		}
	}),
	defineTransform({
		staticAttrs: ["class", "className"],
		dynamicAttrs: ["class:list", "className"],
		load: [{
			name: "prettier-plugin-astro",
			importer: () => {
				return import("prettier-plugin-astro");
			}
		}],
		parsers: { astro: {} },
		transform: transformAstro
	}),
	defineTransform({
		staticAttrs: ["class"],
		load: [{
			name: "prettier-plugin-marko",
			importer: () => import("prettier-plugin-marko")
		}],
		parsers: { marko: {} },
		transform: transformMarko
	}),
	defineTransform({
		staticAttrs: ["class"],
		load: [{
			name: "@zackad/prettier-plugin-twig",
			importer: () => {
				return import("@zackad/prettier-plugin-twig");
			}
		}],
		parsers: { twig: {} },
		transform: transformTwig
	}),
	defineTransform({
		staticAttrs: ["class"],
		load: [{
			name: "@prettier/plugin-pug",
			importer: () => import("@prettier/plugin-pug")
		}],
		parsers: { pug: {} },
		transform: transformPug
	}),
	defineTransform({
		staticAttrs: ["class"],
		load: [{
			name: "@shopify/prettier-plugin-liquid",
			importer: () => import("@shopify/prettier-plugin-liquid")
		}],
		parsers: { "liquid-html": {} },
		transform: transformLiquid
	})
]);
//#endregion
export { options, parsers, printers };
