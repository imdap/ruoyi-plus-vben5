import selectorParser from "postcss-selector-parser"

/**
 * Transforms a selector using a callback function.
 * @param {import('stylelint').PostcssResult} result - The Stylelint result.
 * @param {import('postcss').Rule} node - The rule node containing the selector.
 * @param {(root: import('postcss-selector-parser').Root) => void} callback - The callback to transform the selector.
 * @returns {string | undefined} The transformed selector string, or undefined if parsing failed.
 */
export function transformSelector (result, node, callback) {
	try {
		return selectorParser(callback).processSync(node, { updateSelector: true })
	}
	catch {
		result.warn(`Cannot parse selector`, { node, stylelintType: `parseError` })
	}
}
