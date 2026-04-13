import { n as jsTextToDoc$1, t as format$1 } from "./bindings-D6U4DxG3.js";
import { a as sortTailwindClasses, i as resolvePlugins, n as formatEmbeddedDoc, r as formatFile, t as formatEmbeddedCode } from "./apis-CF7S9zfN.js";
//#region src-js/index.ts
/**
* Define an oxfmt configuration with type inference.
*/
function defineConfig(config) {
	return config;
}
/**
* Format the given source text according to the specified options.
*/
async function format(fileName, sourceText, options) {
	if (typeof fileName !== "string") throw new TypeError("`fileName` must be a string");
	if (typeof sourceText !== "string") throw new TypeError("`sourceText` must be a string");
	return format$1(fileName, sourceText, options ?? {}, resolvePlugins, (options, code) => formatFile({
		options,
		code
	}), (options, code) => formatEmbeddedCode({
		options,
		code
	}), (options, texts) => formatEmbeddedDoc({
		options,
		texts
	}), (options, classes) => sortTailwindClasses({
		options,
		classes
	}));
}
/**
* Format a JS/TS snippet for Prettier `textToDoc()` plugin flow.
*/
async function jsTextToDoc(sourceExt, sourceText, oxfmtPluginOptionsJson, parentContext) {
	return jsTextToDoc$1(sourceExt, sourceText, oxfmtPluginOptionsJson, parentContext, resolvePlugins, (_options, _code) => Promise.reject(), (options, code) => formatEmbeddedCode({
		options,
		code
	}), (options, texts) => formatEmbeddedDoc({
		options,
		texts
	}), (options, classes) => sortTailwindClasses({
		options,
		classes
	}));
}
//#endregion
export { defineConfig, format, jsTextToDoc };
