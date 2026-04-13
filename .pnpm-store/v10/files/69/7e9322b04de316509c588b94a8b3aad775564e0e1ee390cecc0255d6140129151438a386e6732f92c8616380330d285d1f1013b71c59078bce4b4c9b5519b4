//#region src-js/libs/apis.ts
let prettierCache;
async function loadPrettier() {
	if (prettierCache) return prettierCache;
	prettierCache = await import("./prettier-DmvT5K0i.js");
	return prettierCache;
}
/**
* TODO: Plugins support
* - Read `plugins` field
* - Load plugins dynamically and parse `languages` field
* - Map file extensions and filenames to Prettier parsers
*
* @returns Array of loaded plugin's `languages` info
*/
async function resolvePlugins() {
	return [];
}
/**
* Format non-js file
*
* @returns Formatted code
*/
async function formatFile({ code, options }) {
	const prettier = await loadPrettier();
	await setupTailwindPlugin(options);
	await setupOxfmtPlugin(options);
	return prettier.format(code, options);
}
/**
* Format xxx-in-js code snippets into formatted string.
*
* This will be gradually replaced by `formatEmbeddedDoc` which returns `Doc`.
* For now, html|css|md-in-js are using this.
*
* @returns Formatted code snippet
*/
async function formatEmbeddedCode({ code, options }) {
	const prettier = await loadPrettier();
	await setupTailwindPlugin(options);
	return prettier.format(code, options);
}
/**
* Format xxx-in-js code snippets into Prettier `Doc` JSON strings.
*
* This makes `oxc_formatter` correctly handle `printWidth` even for embedded code.
* - For gql-in-js, `texts` contains multiple parts split by `${}` in a template literal
* - For others, `texts` always contains a single string with `${}` parts replaced by placeholders
* However, this function does not need to be aware of that,
* as it simply formats each text part independently and returns an array of formatted parts.
*
* @returns Doc JSON strings (one per input text)
*/
async function formatEmbeddedDoc({ texts, options }) {
	const prettier = await loadPrettier();
	await setupTailwindPlugin(options);
	return Promise.all(texts.map(async (text) => {
		const doc = await prettier.__debug.printToDoc(text, options);
		const symbolToNumber = /* @__PURE__ */ new Map();
		let nextId = 1;
		return JSON.stringify(doc, (_key, value) => {
			if (typeof value === "symbol") {
				if (!symbolToNumber.has(value)) symbolToNumber.set(value, nextId++);
				return symbolToNumber.get(value);
			}
			if (value === -Infinity) return "__NEGATIVE_INFINITY__";
			return value;
		});
	}));
}
let tailwindPluginCache;
async function loadTailwindPlugin() {
	if (tailwindPluginCache) return tailwindPluginCache;
	tailwindPluginCache = await import("./dist-BxJy1HJ_.js");
	return tailwindPluginCache;
}
/**
* Load Tailwind CSS plugin lazily when `options._useTailwindPlugin` flag is set.
* The flag is added by Rust side only for relevant parsers.
*
* Option mapping (sortTailwindcss.xxx → tailwindXxx) is also done in Rust side.
*/
async function setupTailwindPlugin(options) {
	if ("_useTailwindPlugin" in options === false) return;
	const tailwindPlugin = await loadTailwindPlugin();
	options.plugins ??= [];
	options.plugins.push(tailwindPlugin);
}
/**
* Process Tailwind CSS classes found in JS/TS files in batch.
* @param args - Object containing classes and options (filepath is in options.filepath)
* @returns Array of sorted class strings (same order/length as input)
*/
async function sortTailwindClasses({ classes, options }) {
	const { createSorter } = await import("./sorter-DFoFc7QW.js");
	return (await createSorter({
		filepath: options.filepath,
		stylesheetPath: options.tailwindStylesheet,
		configPath: options.tailwindConfig,
		preserveWhitespace: options.tailwindPreserveWhitespace,
		preserveDuplicates: options.tailwindPreserveDuplicates
	})).sortClassAttributes(classes);
}
let oxfmtPluginCache;
async function loadOxfmtPlugin() {
	if (oxfmtPluginCache) return oxfmtPluginCache;
	oxfmtPluginCache = await import("./prettier-plugin-oxfmt-BqWJLUOn.js");
	return oxfmtPluginCache;
}
/**
* Load oxfmt plugin for js-in-xxx parsers when `options._oxfmtPluginOptionsJson` is set.
* The flag is added by Rust side only for relevant parsers.
*/
async function setupOxfmtPlugin(options) {
	if ("_oxfmtPluginOptionsJson" in options === false) return;
	const oxcPlugin = await loadOxfmtPlugin();
	options.plugins ??= [];
	options.plugins.push(oxcPlugin);
}
//#endregion
export { sortTailwindClasses as a, resolvePlugins as i, formatEmbeddedDoc as n, formatFile as r, formatEmbeddedCode as t };
