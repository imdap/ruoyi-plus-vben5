import { createRequire } from "node:module";
import fs from "node:fs";
import process from "node:process";
import { computed, shallowRef } from "@vue/reactivity";
import { createUnplugin } from "unplugin";
import { createFilter, formatPostcssSourceMap, isCSSRequest, normalizePath, transformWithOxc } from "vite";
import path from "node:path";
import { addMapping, fromMap, toEncodedMap } from "@jridgewell/gen-mapping";
import { TraceMap, eachMapping } from "@jridgewell/trace-mapping";
import { createDebug } from "obug";
import crypto from "node:crypto";

//#region rolldown:runtime
var __require = /* @__PURE__ */ createRequire(import.meta.url);

//#endregion
//#region package.json
var version = "7.1.1";

//#endregion
//#region src/core/compiler.ts
function resolveCompiler(root) {
	const compiler = tryResolveCompiler(root) || tryResolveCompiler();
	if (!compiler) throw new Error("Failed to resolve vue/compiler-sfc.\nunplugin-vue requires vue (>=3.2.25) to be present in the dependency tree.");
	return compiler;
}
function tryResolveCompiler(root) {
	const vueMeta = tryRequire("vue/package.json", root);
	if (vueMeta && vueMeta.version.split(".")[0] >= 3) return tryRequire("vue/compiler-sfc", root);
}
function tryRequire(id, from) {
	try {
		return from ? __require(__require.resolve(id, { paths: [from] })) : __require(id);
	} catch {}
}

//#endregion
//#region src/core/helper.ts
const EXPORT_HELPER_ID = "\0/plugin-vue/export-helper";
const helperCode = `
export default (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
}
`;

//#endregion
//#region node_modules/.pnpm/slash@5.1.0/node_modules/slash/index.js
function slash(path) {
	if (path.startsWith("\\\\?\\")) return path;
	return path.replace(/\\/g, "/");
}

//#endregion
//#region src/core/utils/error.ts
function createError(id, error) {
	if (typeof error === "string") return error;
	const { message, name, stack } = error;
	const unpluginMessage = {
		id,
		plugin: "vue",
		message,
		name,
		stack
	};
	if ("code" in error && error.loc) unpluginMessage.loc = {
		file: id,
		line: error.loc.start.line,
		column: error.loc.start.column
	};
	return unpluginMessage;
}

//#endregion
//#region src/core/template.ts
async function transformTemplateAsModule(code, filename, descriptor, options, pluginContext, customElement) {
	const result = compile(code, filename, descriptor, options, pluginContext, customElement);
	let returnCode = result.code;
	if (options.devServer && options.devServer.config.server.hmr !== false && !options.ssr && !options.isProduction) returnCode += `\nimport.meta.hot.accept(({ render }) => {
      __VUE_HMR_RUNTIME__.rerender(${JSON.stringify(descriptor.id)}, render)
    })`;
	return {
		code: returnCode,
		map: result.map
	};
}
/**
* transform the template directly in the main SFC module
*/
function transformTemplateInMain(code, descriptor, options, pluginContext, customElement) {
	const result = compile(code, descriptor.filename, descriptor, options, pluginContext, customElement);
	return {
		...result,
		code: result.code.replace(/\nexport (function|const) (render|ssrRender)/, "\n$1 _sfc_$2")
	};
}
function compile(code, filename, descriptor, options, pluginContext, customElement) {
	resolveScript(pluginContext.framework, descriptor, options, customElement);
	const result = options.compiler.compileTemplate({
		...resolveTemplateCompilerOptions(descriptor, options, filename),
		source: code
	});
	if (result.errors.length > 0) result.errors.forEach((error) => pluginContext.error(createError(filename, error)));
	if (result.tips.length > 0) result.tips.forEach((tip) => pluginContext.warn({
		id: filename,
		message: tip
	}));
	return result;
}
function resolveTemplateCompilerOptions(descriptor, options, filename) {
	const block = descriptor.template;
	if (!block) return;
	const resolvedScript = getResolvedScript(descriptor, options.ssr);
	const hasScoped = descriptor.styles.some((s) => s.scoped);
	const { id, cssVars } = descriptor;
	let transformAssetUrls = options.template?.transformAssetUrls;
	let assetUrlOptions;
	if (transformAssetUrls === false) {} else if (options.devServer) {
		if (filename.startsWith(options.root)) {
			const devBase = options.devServer.config.base;
			assetUrlOptions = {
				base: (options.devServer.config.server?.origin ?? "") + devBase + slash(path.relative(options.root, path.dirname(filename))),
				includeAbsolute: !!devBase
			};
		}
	} else assetUrlOptions = { includeAbsolute: true };
	if (transformAssetUrls && typeof transformAssetUrls === "object") if (Object.values(transformAssetUrls).some((val) => Array.isArray(val))) transformAssetUrls = {
		...assetUrlOptions,
		tags: transformAssetUrls
	};
	else transformAssetUrls = {
		...assetUrlOptions,
		...transformAssetUrls
	};
	else transformAssetUrls = assetUrlOptions;
	let preprocessOptions = block.lang && options.template?.preprocessOptions;
	if (block.lang === "pug") preprocessOptions = {
		doctype: "html",
		...preprocessOptions
	};
	const expressionPlugins = options.template?.compilerOptions?.expressionPlugins || [];
	const lang = descriptor.scriptSetup?.lang || descriptor.script?.lang;
	if (lang && /tsx?$/.test(lang) && !expressionPlugins.includes("typescript")) expressionPlugins.push("typescript");
	return {
		...options.template,
		id,
		vapor: descriptor.vapor,
		ast: canReuseAST(options.compiler.version) ? descriptor.template?.ast : void 0,
		filename,
		scoped: hasScoped,
		slotted: descriptor.slotted,
		isProd: options.isProduction,
		inMap: block.src ? void 0 : block.map,
		ssr: options.ssr,
		ssrCssVars: cssVars,
		transformAssetUrls,
		preprocessLang: block.lang === "html" ? void 0 : block.lang,
		preprocessOptions,
		compilerOptions: {
			...options.template?.compilerOptions,
			scopeId: hasScoped ? `data-v-${id}` : void 0,
			bindingMetadata: resolvedScript ? resolvedScript.bindings : void 0,
			expressionPlugins,
			sourceMap: options.sourceMap
		}
	};
}
/**
* Versions before 3.4.3 have issues when the user has passed additional
* template parse options e.g. `isCustomElement`.
*/
function canReuseAST(version) {
	if (version) {
		const [, minor, patch] = version.split(".").map(Number);
		if (minor >= 4 && patch >= 3) return true;
	}
	return false;
}

//#endregion
//#region src/core/utils/descriptorCache.ts
const cache = /* @__PURE__ */ new Map();
const hmrCache = /* @__PURE__ */ new Map();
const prevCache = /* @__PURE__ */ new Map();
function createDescriptor(filename, source, { root, isProduction, sourceMap, compiler, template, features }, hmr = false) {
	const { descriptor, errors } = compiler.parse(source, {
		filename,
		sourceMap,
		templateParseOptions: template?.compilerOptions
	});
	const normalizedPath = normalizePath(path.relative(root, filename));
	const componentIdGenerator = features?.componentIdGenerator;
	if (componentIdGenerator === "filepath") descriptor.id = getHash(normalizedPath);
	else if (componentIdGenerator === "filepath-source") descriptor.id = getHash(normalizedPath + source);
	else if (typeof componentIdGenerator === "function") descriptor.id = componentIdGenerator(normalizedPath, source, isProduction, getHash);
	else descriptor.id = getHash(normalizedPath + (isProduction ? source : ""));
	descriptor.id = getHash(normalizedPath + (isProduction ? source : ""));
	(hmr ? hmrCache : cache).set(filename, descriptor);
	return {
		descriptor,
		errors
	};
}
function getPrevDescriptor(filename) {
	return prevCache.get(filename);
}
function invalidateDescriptor(filename, hmr = false) {
	const _cache = hmr ? hmrCache : cache;
	const prev = _cache.get(filename);
	_cache.delete(filename);
	if (prev) prevCache.set(filename, prev);
}
function getDescriptor(filename, options, createIfNotFound = true, hmr = false, code) {
	const _cache = hmr ? hmrCache : cache;
	if (_cache.has(filename)) return _cache.get(filename);
	if (createIfNotFound) {
		const { descriptor, errors } = createDescriptor(filename, code ?? fs.readFileSync(filename, "utf8"), options, hmr);
		if (errors.length > 0 && !hmr) throw errors[0];
		return descriptor;
	}
}
function getSrcDescriptor(filename, query) {
	if (query.scoped) return cache.get(`${filename}?src=${query.src}`);
	return cache.get(filename);
}
function getTempSrcDescriptor(filename, query) {
	return {
		filename,
		id: query.id || "",
		styles: [{
			scoped: query.scoped,
			loc: { start: {
				line: 0,
				column: 0
			} }
		}],
		isTemp: true
	};
}
function setSrcDescriptor(filename, entry, scoped) {
	if (scoped) {
		cache.set(`${filename}?src=${entry.id}`, entry);
		return;
	}
	cache.set(filename, entry);
}
function getHash(text) {
	return crypto.hash("sha256", text, "hex").slice(0, 8);
}

//#endregion
//#region src/core/script.ts
let clientCache = /* @__PURE__ */ new WeakMap();
let ssrCache = /* @__PURE__ */ new WeakMap();
const typeDepToSFCMap = /* @__PURE__ */ new Map();
function invalidateScript(filename) {
	const desc = cache.get(filename);
	if (desc) {
		clientCache.delete(desc);
		ssrCache.delete(desc);
	}
}
function getResolvedScript(descriptor, ssr) {
	return (ssr ? ssrCache : clientCache).get(descriptor);
}
function setResolvedScript(descriptor, script, ssr) {
	(ssr ? ssrCache : clientCache).set(descriptor, script);
}
function clearScriptCache() {
	clientCache = /* @__PURE__ */ new WeakMap();
	ssrCache = /* @__PURE__ */ new WeakMap();
}
function isUseInlineTemplate(descriptor, options) {
	return options.inlineTemplate && !options.devServer && !options.devToolsEnabled && !!descriptor.scriptSetup && !descriptor.template?.src;
}
const scriptIdentifier = `_sfc_main`;
function resolveScript(framework, descriptor, options, customElement) {
	if (!descriptor.script && !descriptor.scriptSetup) return null;
	const { ssr } = options;
	const cached = getResolvedScript(descriptor, ssr);
	if (cached) return cached;
	const resolved = options.compiler.compileScript(descriptor, {
		...options.script,
		id: descriptor.id,
		isProd: options.isProduction,
		inlineTemplate: isUseInlineTemplate(descriptor, options),
		templateOptions: resolveTemplateCompilerOptions(descriptor, options, descriptor.filename),
		sourceMap: options.sourceMap,
		genDefaultAs: canInlineMain(framework, descriptor, options) ? scriptIdentifier : void 0,
		customElement,
		propsDestructure: options.features.propsDestructure ?? options.script?.propsDestructure
	});
	if (!options.isProduction && resolved?.deps) {
		for (const [key, sfcs] of typeDepToSFCMap) if (sfcs.has(descriptor.filename) && !resolved.deps.includes(key)) sfcs.delete(descriptor.filename);
		for (const dep of resolved.deps) {
			const existingSet = typeDepToSFCMap.get(dep);
			if (existingSet) existingSet.add(descriptor.filename);
			else typeDepToSFCMap.set(dep, new Set([descriptor.filename]));
		}
	}
	setResolvedScript(descriptor, resolved, ssr);
	return resolved;
}
function canInlineMain(framework, descriptor, options) {
	if (descriptor.script?.src || descriptor.scriptSetup?.src) return false;
	const lang = descriptor.script?.lang || descriptor.scriptSetup?.lang;
	if (!lang || lang === "js") return true;
	if (lang === "ts" && (options.devServer || [
		"esbuild",
		"rspack",
		"rolldown"
	].includes(framework))) return true;
	return false;
}

//#endregion
//#region src/core/handleHotUpdate.ts
const debug = createDebug("vite:hmr");
/**
* Vite-specific HMR handling
*/
async function handleHotUpdate({ file, modules, read }, options, customElement, typeDepModules) {
	const prevDescriptor = getDescriptor(file, options, false, true);
	if (!prevDescriptor) return;
	const { descriptor } = createDescriptor(file, await read(), options, true);
	let needRerender = false;
	const nonJsModules = modules.filter((m) => m.type !== "js");
	const jsModules = modules.filter((m) => m.type === "js");
	const affectedModules = new Set(nonJsModules);
	const mainModule = getMainModule(jsModules);
	const templateModule = jsModules.find((m) => /type=template/.test(m.url));
	resolveScript("vite", descriptor, {
		...options,
		ssr: false
	}, customElement);
	const scriptChanged = hasScriptChanged(prevDescriptor, descriptor);
	if (scriptChanged) affectedModules.add(getScriptModule(jsModules) || mainModule);
	if (!isEqualBlock(descriptor.template, prevDescriptor.template)) {
		if (!scriptChanged) setResolvedScript(descriptor, getResolvedScript(prevDescriptor, false), false);
		affectedModules.add(templateModule);
		needRerender = true;
	}
	let didUpdateStyle = false;
	const prevStyles = prevDescriptor.styles || [];
	const nextStyles = descriptor.styles || [];
	if (prevDescriptor.cssVars.join("") !== descriptor.cssVars.join("")) affectedModules.add(mainModule);
	if (prevStyles.some((s) => s.scoped) !== nextStyles.some((s) => s.scoped)) {
		affectedModules.add(templateModule);
		affectedModules.add(mainModule);
	}
	for (const [i, next] of nextStyles.entries()) {
		const prev = prevStyles[i];
		if (!prev || !isEqualBlock(prev, next)) {
			didUpdateStyle = true;
			const mod = jsModules.find((m) => m.url.includes(`type=style&index=${i}`) && m.url.endsWith(`.${next.lang || "css"}`));
			if (mod) {
				affectedModules.add(mod);
				if (mod.url.includes("&inline")) affectedModules.add(mainModule);
			} else affectedModules.add(mainModule);
		}
	}
	if (prevStyles.length > nextStyles.length) affectedModules.add(mainModule);
	const prevCustoms = prevDescriptor.customBlocks || [];
	const nextCustoms = descriptor.customBlocks || [];
	if (prevCustoms.length === nextCustoms.length) for (const [i, next] of nextCustoms.entries()) {
		const prev = prevCustoms[i];
		if (!prev || !isEqualBlock(prev, next)) {
			const mod = jsModules.find((m) => m.url.includes(`type=${prev.type}&index=${i}`));
			if (mod) affectedModules.add(mod);
			else affectedModules.add(mainModule);
		}
	}
	else affectedModules.add(mainModule);
	const updateType = [];
	if (needRerender) {
		updateType.push(`template`);
		if (!templateModule) affectedModules.add(mainModule);
		else if (mainModule && !affectedModules.has(mainModule)) [...mainModule.importers].filter((m) => isCSSRequest(m.url)).forEach((m) => affectedModules.add(m));
	}
	if (didUpdateStyle) updateType.push(`style`);
	if (updateType.length > 0) {
		if (file.endsWith(".vue")) invalidateDescriptor(file);
		else cache.set(file, descriptor);
		debug(`[vue:update(${updateType.join("&")})] ${file}`);
	}
	return [...affectedModules, ...typeDepModules || []].filter(Boolean);
}
function isEqualBlock(a, b) {
	if (!a && !b) return true;
	if (!a || !b) return false;
	if (a.src && b.src && a.src === b.src) return true;
	if (a.content !== b.content) return false;
	const keysA = Object.keys(a.attrs);
	const keysB = Object.keys(b.attrs);
	if (keysA.length !== keysB.length) return false;
	return keysA.every((key) => a.attrs[key] === b.attrs[key]);
}
function isOnlyTemplateChanged(prev, next) {
	return !hasScriptChanged(prev, next) && prev.styles.length === next.styles.length && prev.styles.every((s, i) => isEqualBlock(s, next.styles[i])) && prev.customBlocks.length === next.customBlocks.length && prev.customBlocks.every((s, i) => isEqualBlock(s, next.customBlocks[i]));
}
function deepEqual(obj1, obj2, excludeProps = [], deepParentsOfObj1 = []) {
	if (typeof obj1 !== typeof obj2) return false;
	if (obj1 == null || obj2 == null || typeof obj1 !== "object" || deepParentsOfObj1.includes(obj1)) return obj1 === obj2;
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);
	if (keys1.length !== keys2.length) return false;
	for (const key of keys1) {
		if (excludeProps.includes(key)) continue;
		if (!deepEqual(obj1[key], obj2[key], excludeProps, [...deepParentsOfObj1, obj1])) return false;
	}
	return true;
}
function isEqualAst(prev, next) {
	if (prev === void 0 || next === void 0) return prev === next;
	if (prev.length !== next.length) return false;
	for (const [i, prevNode] of prev.entries()) {
		const nextNode = next[i];
		if (!deepEqual(prevNode, nextNode, [
			"start",
			"end",
			"loc",
			"range",
			"leadingComments",
			"trailingComments",
			"innerComments",
			"_ownerScope",
			"_resolvedReference",
			"_resolvedElements"
		])) return false;
	}
	return true;
}
function hasScriptChanged(prev, next) {
	if (prev.vapor !== next.vapor) return true;
	const prevScript = getResolvedScript(prev, false);
	const nextScript = getResolvedScript(next, false);
	if (!isEqualBlock(prev.script, next.script) && !isEqualAst(prevScript?.scriptAst, nextScript?.scriptAst)) return true;
	if (!isEqualBlock(prev.scriptSetup, next.scriptSetup) && !isEqualAst(prevScript?.scriptSetupAst, nextScript?.scriptSetupAst)) return true;
	const prevImports = getResolvedScript(prev, false)?.imports;
	if (prevImports) return !next.template || next.shouldForceReload(prevImports);
	return false;
}
function getMainModule(jsModules) {
	return jsModules.filter((m) => !/type=/.test(m.url) || /type=script/.test(m.url)).toSorted((m1, m2) => {
		return m1.url.length - m2.url.length;
	})[0];
}
function getScriptModule(jsModules) {
	return jsModules.find((m) => /type=script.*&lang\.\w+$/.test(m.url));
}
function handleTypeDepChange(affectedComponents, { modules, server: { moduleGraph } }) {
	const affected = /* @__PURE__ */ new Set();
	for (const file of affectedComponents) {
		invalidateScript(file);
		const mods = moduleGraph.getModulesByFile(file);
		if (mods) {
			const arr = [...mods];
			affected.add(getScriptModule(arr) || getMainModule(arr));
		}
	}
	return [...modules, ...affected];
}

//#endregion
//#region src/core/main.ts
async function transformMain(code, filename, options, pluginContext, customElement) {
	const { devServer, isProduction, devToolsEnabled, ssr } = options;
	const prevDescriptor = getPrevDescriptor(filename);
	const { descriptor, errors } = createDescriptor(filename, code, options);
	if (fs.existsSync(filename)) getDescriptor(filename, options, true, true, filename.endsWith(".vue") ? void 0 : code);
	if (errors.length > 0) {
		errors.forEach((error) => pluginContext.error(createError(filename, error)));
		return null;
	}
	const attachedProps = [];
	const hasScoped = descriptor.styles.some((s) => s.scoped);
	const { code: scriptCode, map: scriptMap } = await genScriptCode(descriptor, options, pluginContext, customElement);
	const hasTemplateImport = descriptor.template && !isUseInlineTemplate(descriptor, options);
	let templateCode = "";
	let templateMap;
	if (hasTemplateImport) ({code: templateCode, map: templateMap} = await genTemplateCode(descriptor, options, pluginContext, customElement));
	if (hasTemplateImport) attachedProps.push(ssr ? ["ssrRender", "_sfc_ssrRender"] : ["render", "_sfc_render"]);
	else if (prevDescriptor && !isEqualBlock(descriptor.template, prevDescriptor.template)) attachedProps.push([ssr ? "ssrRender" : "render", "() => {}"]);
	const stylesCode = await genStyleCode(descriptor, pluginContext, customElement, attachedProps);
	const customBlocksCode = await genCustomBlockCode(descriptor, pluginContext);
	const output = [
		scriptCode,
		templateCode,
		stylesCode,
		customBlocksCode
	];
	if (hasScoped) attachedProps.push([`__scopeId`, JSON.stringify(`data-v-${descriptor.id}`)]);
	if (devToolsEnabled || devServer && !isProduction) attachedProps.push([`__file`, JSON.stringify(isProduction ? path.basename(filename) : filename)]);
	if (devServer && devServer.config.server.hmr !== false && !ssr && !isProduction) {
		output.push(`_sfc_main.__hmrId = ${JSON.stringify(descriptor.id)}`, "typeof __VUE_HMR_RUNTIME__ !== 'undefined' && __VUE_HMR_RUNTIME__.createRecord(_sfc_main.__hmrId, _sfc_main)", `import.meta.hot.on('file-changed', ({ file }) => {`, `  __VUE_HMR_RUNTIME__.CHANGED_FILE = file`, `})`);
		if (prevDescriptor && isOnlyTemplateChanged(prevDescriptor, descriptor)) output.push(`export const _rerender_only = __VUE_HMR_RUNTIME__.CHANGED_FILE === ${JSON.stringify(normalizePath(filename))}`);
		output.push(`import.meta.hot.accept(mod => {`, `  if (!mod) return`, `  const { default: updated, _rerender_only } = mod`, `  if (_rerender_only) {`, `    __VUE_HMR_RUNTIME__.rerender(updated.__hmrId, updated.render)`, `  } else {`, `    __VUE_HMR_RUNTIME__.reload(updated.__hmrId, updated)`, `  }`, `})`);
	}
	if (ssr) {
		const normalizedFilename = normalizePath(path.relative(options.root, filename));
		output.push(`import { useSSRContext as __vite_useSSRContext } from 'vue'`, `const _sfc_setup = _sfc_main.setup`, `_sfc_main.setup = (props, ctx) => {`, `  const ssrContext = __vite_useSSRContext()`, `  ;(ssrContext.modules || (ssrContext.modules = new Set())).add(${JSON.stringify(normalizedFilename)})`, `  return _sfc_setup ? _sfc_setup(props, ctx) : undefined`, `}`);
	}
	let resolvedMap = void 0;
	if (options.sourceMap) if (templateMap) {
		const gen = fromMap(scriptMap ?? {
			file: filename,
			sourceRoot: "",
			version: 3,
			sources: [],
			sourcesContent: [],
			names: [],
			mappings: ""
		});
		const tracer = new TraceMap(templateMap);
		const offset = (scriptCode.match(/\r?\n/g)?.length ?? 0) + 1;
		eachMapping(tracer, (m) => {
			if (m.source == null) return;
			addMapping(gen, {
				source: m.source,
				original: {
					line: m.originalLine,
					column: m.originalColumn
				},
				generated: {
					line: m.generatedLine + offset,
					column: m.generatedColumn
				}
			});
		});
		resolvedMap = toEncodedMap(gen);
		resolvedMap.sourcesContent = templateMap.sourcesContent;
	} else resolvedMap = scriptMap;
	if (attachedProps.length === 0) output.push(`export default _sfc_main`);
	else output.push(`import _export_sfc from '${EXPORT_HELPER_ID}'`, `export default /*#__PURE__*/_export_sfc(_sfc_main, [${attachedProps.map(([key, val]) => `['${key}',${val}]`).join(",")}])`);
	let resolvedCode = output.join("\n");
	const lang = descriptor.scriptSetup?.lang || descriptor.script?.lang;
	if (lang && /tsx?$/.test(lang) && !descriptor.script?.src) {
		const { code, map } = await transformWithOxc(resolvedCode, filename, {
			...options.devServer?.config.oxc,
			lang: "ts",
			sourcemap: options.sourceMap
		}, resolvedMap);
		resolvedCode = code;
		resolvedMap = resolvedMap ? map : resolvedMap;
	}
	return {
		code: resolvedCode,
		map: resolvedMap || { mappings: "" },
		meta: { vite: { lang: descriptor.script?.lang || descriptor.scriptSetup?.lang || "js" } }
	};
}
async function genTemplateCode(descriptor, options, pluginContext, customElement) {
	const template = descriptor.template;
	const hasScoped = descriptor.styles.some((style) => style.scoped);
	if ((!template.lang || template.lang === "html") && !template.src) return transformTemplateInMain(template.content, descriptor, options, pluginContext, customElement);
	else {
		if (template.src) await linkSrcToDescriptor(template.src, descriptor, pluginContext, hasScoped);
		const src = template.src || descriptor.filename;
		const query = `?vue&type=template${template.src ? hasScoped ? `&src=${descriptor.id}` : "&src=true" : ""}${hasScoped ? `&scoped=${descriptor.id}` : ``}${attrsToQuery(template.attrs, "js", true)}`;
		const request = JSON.stringify(src + query);
		const renderFnName = options.ssr ? "ssrRender" : "render";
		return {
			code: `import { ${renderFnName} as _sfc_${renderFnName} } from ${request}`,
			map: void 0
		};
	}
}
async function genScriptCode(descriptor, options, pluginContext, customElement) {
	let scriptCode = `const ${scriptIdentifier} = { ${descriptor.vapor ? "__vapor: true" : ""} }`;
	let map;
	const script = resolveScript(pluginContext.framework, descriptor, options, customElement);
	if (script) if (canInlineMain(pluginContext.framework, descriptor, options)) {
		if (options.compiler.version) scriptCode = script.content;
		else {
			const userPlugins = options.script?.babelParserPlugins || [];
			const defaultPlugins = script.lang === "ts" ? userPlugins.includes("decorators") ? ["typescript"] : ["typescript", "decorators-legacy"] : [];
			scriptCode = options.compiler.rewriteDefault(script.content, scriptIdentifier, [...defaultPlugins, ...userPlugins]);
		}
		map = script.map;
	} else {
		if (script.src) await linkSrcToDescriptor(script.src, descriptor, pluginContext, false);
		const src = script.src || descriptor.filename;
		const langFallback = script.src && path.extname(src).slice(1) || "js";
		const attrsQuery = attrsToQuery(script.attrs, langFallback);
		const query = `?vue&type=script${script.src ? `&src=true` : ``}${attrsQuery}`;
		const request = JSON.stringify(src + query);
		scriptCode = `import _sfc_main from ${request}\nexport * from ${request}`;
	}
	return {
		code: scriptCode,
		map
	};
}
async function genStyleCode(descriptor, pluginContext, customElement, attachedProps) {
	let stylesCode = ``;
	let cssModulesMap;
	if (descriptor.styles.length > 0) {
		for (let i = 0; i < descriptor.styles.length; i++) {
			const style = descriptor.styles[i];
			if (style.src) await linkSrcToDescriptor(style.src, descriptor, pluginContext, style.scoped);
			const src = style.src || descriptor.filename;
			const attrsQuery = attrsToQuery(style.attrs, "css");
			const srcQuery = style.src ? style.scoped ? `&src=${descriptor.id}` : "&src=true" : "";
			const directQuery = customElement ? `&inline` : ``;
			const scopedQuery = style.scoped ? `&scoped=${descriptor.id}` : ``;
			const styleRequest = src + `?vue&type=style&index=${i}${srcQuery}${directQuery}${scopedQuery}` + attrsQuery;
			if (style.module) {
				if (customElement) throw new Error(`<style module> is not supported in custom elements mode.`);
				const [importCode, nameMap] = genCSSModulesCode(i, styleRequest, style.module);
				stylesCode += importCode;
				Object.assign(cssModulesMap ||= {}, nameMap);
			} else if (customElement) stylesCode += `\nimport _style_${i} from ${JSON.stringify(styleRequest)}`;
			else stylesCode += `\nimport ${JSON.stringify(styleRequest)}`;
		}
		if (customElement) attachedProps.push([`styles`, `[${descriptor.styles.map((_, i) => `_style_${i}`).join(",")}]`]);
	}
	if (cssModulesMap) {
		const mappingCode = `${Object.entries(cssModulesMap).reduce((code, [key, value]) => `${code}"${key}":${value},\n`, "{\n")}}`;
		stylesCode += `\nconst cssModules = ${mappingCode}`;
		attachedProps.push([`__cssModules`, `cssModules`]);
	}
	return stylesCode;
}
function genCSSModulesCode(index, request, moduleName) {
	const styleVar = `style${index}`;
	const exposedName = typeof moduleName === "string" ? moduleName : "$style";
	const moduleRequest = request.replace(/\.(\w+)$/, ".module.$1");
	return [`\nimport ${styleVar} from ${JSON.stringify(moduleRequest)}`, { [exposedName]: styleVar }];
}
async function genCustomBlockCode(descriptor, pluginContext) {
	let code = "";
	for (let index = 0; index < descriptor.customBlocks.length; index++) {
		const block = descriptor.customBlocks[index];
		if (block.src) await linkSrcToDescriptor(block.src, descriptor, pluginContext, false);
		const src = block.src || descriptor.filename;
		const attrsQuery = attrsToQuery(block.attrs, block.type);
		const srcQuery = block.src ? `&src=true` : ``;
		const query = `?vue&type=${block.type}&index=${index}${srcQuery}${attrsQuery}`;
		const request = JSON.stringify(src + query);
		code += `import block${index} from ${request}\n`;
		code += `if (typeof block${index} === 'function') block${index}(_sfc_main)\n`;
	}
	return code;
}
/**
* For blocks with src imports, it is important to link the imported file
* with its owner SFC descriptor so that we can get the information about
* the owner SFC when compiling that file in the transform phase.
*/
async function linkSrcToDescriptor(src, descriptor, pluginContext, scoped) {
	if (pluginContext.resolve) setSrcDescriptor(((await pluginContext.resolve(src, descriptor.filename))?.id || src).replace(/\?.*$/, ""), descriptor, scoped);
	else pluginContext.error(/* @__PURE__ */ new Error(`src attribute is not supported in ${pluginContext.framework}`));
}
const ignoreList = new Set([
	"id",
	"index",
	"src",
	"type",
	"lang",
	"module",
	"scoped",
	"generic"
]);
function attrsToQuery(attrs, langFallback, forceLangFallback = false) {
	let query = ``;
	for (const name of Object.keys(attrs)) {
		const value = attrs[name];
		if (!ignoreList.has(name)) query += `&${encodeURIComponent(name)}${value ? `=${encodeURIComponent(value)}` : ``}`;
	}
	if (langFallback || attrs.lang) query += `lang` in attrs ? forceLangFallback ? `&lang.${langFallback}` : `&lang.${attrs.lang}` : `&lang.${langFallback}`;
	return query;
}

//#endregion
//#region src/core/style.ts
async function transformStyle(code, descriptor, index, options, context, filename) {
	const block = descriptor.styles[index];
	const result = await options.compiler.compileStyleAsync({
		...options.style,
		filename: descriptor.filename,
		id: `data-v-${descriptor.id}`,
		isProd: options.isProduction,
		source: code,
		scoped: block.scoped,
		...options.cssDevSourcemap ? { postcssOptions: { map: {
			from: filename,
			inline: false,
			annotation: false
		} } } : {}
	});
	if (result.errors.length > 0) {
		result.errors.forEach((error) => {
			if (error.line && error.column) error.loc = {
				file: descriptor.filename,
				line: error.line + block.loc.start.line,
				column: error.column
			};
			context.error(error);
		});
		return null;
	}
	const map = result.map ? await formatPostcssSourceMap(result.map, filename) : null;
	return {
		code: result.code,
		map,
		meta: block.scoped && !descriptor.isTemp ? { vite: { cssScopeTo: [descriptor.filename, "default"] } } : void 0
	};
}

//#endregion
//#region src/core/utils/query.ts
function parseVueRequest(id) {
	const [filename, rawQuery] = id.split(`?`, 2);
	const query = Object.fromEntries(new URLSearchParams(rawQuery));
	if (query.vue != null) query.vue = true;
	if (query.index != null) query.index = Number(query.index);
	if (query.raw != null) query.raw = true;
	if (query.url != null) query.url = true;
	if (query.scoped != null) query.scoped = true;
	return {
		filename,
		query
	};
}

//#endregion
//#region src/core/index.ts
function resolveOptions(rawOptions) {
	const root = rawOptions.root ?? process.cwd();
	const isProduction = rawOptions.isProduction ?? process.env.NODE_ENV === "production";
	const features = {
		...rawOptions.features,
		optionsAPI: true,
		prodDevtools: false,
		prodHydrationMismatchDetails: false,
		...rawOptions.features,
		customElement: (rawOptions.features?.customElement || rawOptions.customElement) ?? /\.ce\.vue$/
	};
	return {
		...rawOptions,
		include: rawOptions.include ?? /\.vue$/,
		isProduction,
		ssr: rawOptions.ssr ?? false,
		sourceMap: rawOptions.sourceMap ?? true,
		root,
		compiler: rawOptions.compiler,
		devToolsEnabled: features.prodDevtools || !isProduction,
		cssDevSourcemap: false,
		inlineTemplate: rawOptions.inlineTemplate ?? true,
		features
	};
}
const plugin = createUnplugin((rawOptions = {}, meta) => {
	clearScriptCache();
	const options = shallowRef(resolveOptions(rawOptions));
	const filter = computed(() => createFilter(options.value.include, options.value.exclude));
	const customElementFilter = computed(() => {
		const customElement = options.value.features.customElement;
		return typeof customElement === "boolean" ? () => customElement : createFilter(customElement);
	});
	const api = {
		get options() {
			return options.value;
		},
		set options(value) {
			options.value = value;
		},
		version
	};
	let transformCachedModule = false;
	return {
		name: "unplugin-vue",
		vite: {
			api,
			handleHotUpdate(ctx) {
				ctx.server.ws.send({
					type: "custom",
					event: "file-changed",
					data: { file: normalizePath(ctx.file) }
				});
				if (options.value.compiler.invalidateTypeCache) options.value.compiler.invalidateTypeCache(ctx.file);
				let typeDepModules;
				const matchesFilter = filter.value(ctx.file);
				if (typeDepToSFCMap.has(ctx.file)) {
					typeDepModules = handleTypeDepChange(typeDepToSFCMap.get(ctx.file), ctx);
					if (!matchesFilter) return typeDepModules;
				}
				if (matchesFilter) return handleHotUpdate(ctx, options.value, customElementFilter.value(ctx.file), typeDepModules);
			},
			config(config) {
				const parseDefine = (v) => {
					try {
						return typeof v === "string" ? JSON.parse(v) : v;
					} catch {
						return v;
					}
				};
				return {
					resolve: { dedupe: config.build?.ssr ? [] : ["vue"] },
					define: {
						__VUE_OPTIONS_API__: options.value.features?.optionsAPI ?? parseDefine(config.define?.__VUE_OPTIONS_API__) ?? true,
						__VUE_PROD_DEVTOOLS__: (options.value.features?.prodDevtools || parseDefine(config.define?.__VUE_PROD_DEVTOOLS__)) ?? false,
						__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: (options.value.features?.prodHydrationMismatchDetails || parseDefine(config.define?.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__)) ?? false
					},
					ssr: { external: config.legacy?.buildSsrCjsExternalHeuristics ? ["vue", "@vue/server-renderer"] : [] }
				};
			},
			configResolved(config) {
				options.value = {
					...options.value,
					root: config.root,
					sourceMap: config.command === "build" ? !!config.build.sourcemap : true,
					cssDevSourcemap: config.css?.devSourcemap ?? false,
					isProduction: config.isProduction,
					compiler: options.value.compiler || resolveCompiler(config.root),
					devToolsEnabled: !!(options.value.features.prodDevtools || config.define.__VUE_PROD_DEVTOOLS__ || !config.isProduction)
				};
				const _warn = config.logger.warn;
				config.logger.warn = (...args) => {
					const msg = args[0];
					if (/\[lightningcss\] '(?:deep|slotted|global)' is not recognized as a valid pseudo-/.test(msg)) return;
					_warn(...args);
				};
				transformCachedModule = config.command === "build" && options.value.sourceMap && config.build.watch != null;
			},
			shouldTransformCachedModule({ id }) {
				if (transformCachedModule && parseVueRequest(id).query.vue) return true;
				return false;
			},
			configureServer(server) {
				options.value.devServer = server;
			}
		},
		rollup: { api },
		rolldown: {
			api,
			options(opt) {
				opt.moduleTypes ||= {};
				opt.moduleTypes.vue ||= "js";
			}
		},
		farm: {
			config(config) {
				return { compilation: {
					resolve: { dedupe: config.compilation?.output?.targetEnv === "node" ? [] : ["vue"] },
					define: {
						__VUE_OPTIONS_API__: !!((options.value.features?.optionsAPI ?? true) || config?.compilation?.define?.__VUE_OPTIONS_API__),
						__VUE_PROD_DEVTOOLS__: !!(options.value.features?.prodDevtools || config?.compilation?.define?.__VUE_PROD_DEVTOOLS__),
						__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: !!(options.value.features?.prodHydrationMismatchDetails || config?.compilation?.define?.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__)
					}
				} };
			},
			configResolved(config) {
				options.value = {
					...options.value,
					root: config.root,
					sourceMap: config.compilation?.sourcemap,
					cssDevSourcemap: config.compilation?.sourcemap,
					isProduction: config.compilation?.mode === "production",
					compiler: options.value.compiler || resolveCompiler(config.root),
					devToolsEnabled: !!(options.value.features.prodDevtools || config.compilation?.define?.__VUE_PROD_DEVTOOLS__ || config.compilation?.mode !== "production")
				};
			},
			configureServer(server) {
				const { config: { compilation: { output: { publicPath } } } } = server;
				options.value.devServer = Object.assign(server, { config: {
					...server.config,
					base: publicPath
				} });
			},
			updateModules: { executor(ctx) {
				options.value.devServer?.ws.send({
					type: "custom",
					event: "file-changed",
					data: { file: normalizePath(ctx.file) }
				});
				if (options.value.compiler.invalidateTypeCache) options.value.compiler.invalidateTypeCache(ctx.file);
				if (typeDepToSFCMap.has(ctx.file)) handleTypeDepChange(typeDepToSFCMap.get(ctx.file), ctx);
				if (filter.value(ctx.file)) handleHotUpdate(ctx, options.value, customElementFilter.value(ctx.file));
			} }
		},
		buildStart() {
			const compiler = options.value.compiler = options.value.compiler || resolveCompiler(options.value.root);
			if (compiler.invalidateTypeCache) options.value.devServer?.watcher.on("unlink", (file) => {
				compiler.invalidateTypeCache(file);
			});
		},
		resolveId(id) {
			if (normalizePath(id) === EXPORT_HELPER_ID) return id;
			if (parseVueRequest(id).query.vue) return id;
		},
		loadInclude(id) {
			if (id === EXPORT_HELPER_ID) return true;
			const { query } = parseVueRequest(id);
			return query.vue;
		},
		load(id) {
			if (id === EXPORT_HELPER_ID) return helperCode;
			const { filename, query } = parseVueRequest(id);
			if (query.vue) {
				if (query.src) return fs.readFileSync(filename, "utf8");
				const descriptor = getDescriptor(filename, options.value);
				let block;
				switch (query.type) {
					case "script":
						block = resolveScript(meta.framework, descriptor, options.value, customElementFilter.value(filename));
						break;
					case "template":
						block = descriptor.template;
						break;
					case "style":
						block = descriptor.styles[query.index];
						break;
					default: if (query.index != null) block = descriptor.customBlocks[query.index];
				}
				if (block) return {
					code: block.content,
					map: block.map
				};
			}
		},
		transformInclude(id) {
			const { filename, query } = parseVueRequest(id);
			if (query.raw || query.url) return false;
			if (!filter.value(filename) && !query.vue) return false;
			return true;
		},
		transform(code, id) {
			const { filename, query } = parseVueRequest(id);
			const context = {
				...meta,
				error: this.error.bind(this),
				warn: this.warn.bind(this),
				resolve: this.resolve?.bind(this)
			};
			if (query.vue) {
				const descriptor = query.src ? getSrcDescriptor(filename, query) || getTempSrcDescriptor(filename, query) : getDescriptor(filename, options.value);
				if (query.src) this.addWatchFile(filename);
				if (query.type === "template") return transformTemplateAsModule(code, filename, descriptor, options.value, context, customElementFilter.value(filename));
				else if (query.type === "style") return transformStyle(code, descriptor, Number(query.index || 0), options.value, this, filename);
			} else return transformMain(code, filename, options.value, context, customElementFilter.value(filename));
		}
	};
});

//#endregion
export { parseVueRequest as n, plugin as t };