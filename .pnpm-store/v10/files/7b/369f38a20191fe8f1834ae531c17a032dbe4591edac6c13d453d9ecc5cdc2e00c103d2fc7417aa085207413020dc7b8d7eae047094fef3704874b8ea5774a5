import "./bindings-D6U4DxG3.js";
import "./apis-CF7S9zfN.js";
import { jsTextToDoc } from "./index.js";
//#region src-js/libs/prettier-plugin-oxfmt/text-to-doc.ts
const textToDoc = async (embeddedSourceText, textToDocOptions) => {
	const { parser, parentParser, filepath, _oxfmtPluginOptionsJson } = textToDocOptions;
	const doc = await jsTextToDoc(parser === "typescript" || parser === "babel-ts" ? filepath?.endsWith(".tsx") ? "tsx" : "ts" : "jsx", embeddedSourceText, _oxfmtPluginOptionsJson, detectParentContext(parentParser, textToDocOptions));
	if (doc === null) throw new Error("`oxfmt::textToDoc()` failed. Use `OXC_LOG` env var to see Rust-side logs.");
	return JSON.parse(doc);
};
/**
* Detects Vue fragment mode from Prettier's internal flags.
*
* When Prettier formats Vue SFC templates, it calls textToDoc with special flags:
* - `__isVueForBindingLeft`: v-for left-hand side (e.g., `(item, index)` in `v-for="(item, index) in items"`)
* - `__isVueBindings`: v-slot bindings (e.g., `{ item }` in `#default="{ item }"`)
* - `__isEmbeddedTypescriptGenericParameters`: `<script generic="...">` type parameters
*/
function detectParentContext(parentParser, options) {
	if (parentParser === "vue") {
		if ("__isVueForBindingLeft" in options) return "vue-for-binding-left";
		if ("__isVueBindings" in options) return "vue-bindings";
		if ("__isEmbeddedTypescriptGenericParameters" in options) return "vue-script-generic";
		return "vue-script";
	}
	return parentParser;
}
//#endregion
//#region src-js/libs/prettier-plugin-oxfmt/index.ts
/**
* Prettier plugin that uses `oxc_formatter` for (j|t)s-in-xxx part.
*
* When Prettier formats Vue/HTML (which can embed JS/TS code inside) files,
* it calls the `embed()` function for each block.
*
* By default, it uses the `babel` or `typescript` parser and `estree` printer.
* Therefore, by overriding these internally, we can use `oxc_formatter` instead.
* e.g. Now it's possible to apply our builtin sort-imports for JS/TS code inside Vue `<script>`.
*/
const options = { _oxfmtPluginOptionsJson: {
	category: "JavaScript",
	type: "string",
	default: "{}",
	description: "Bundled JSON string for oxfmt-plugin options"
} };
const oxfmtParser = {
	parse: textToDoc,
	astFormat: "OXFMT",
	locStart: () => -1,
	locEnd: () => -1
};
const parsers = {
	babel: oxfmtParser,
	"babel-ts": oxfmtParser,
	typescript: oxfmtParser
};
const printers = { OXFMT: { print: ({ node }) => node } };
//#endregion
export { options, parsers, printers };
