import selectorParser from "postcss-selector-parser"

/**
 * Parses a CSS selector string using postcss-selector-parser.
 * @param {string} selector - The selector string to parse.
 * @param {import('stylelint').PostcssResult} result - The Stylelint result object.
 * @param {import('postcss').Node} node - The PostCSS node for error reporting.
 * @param {(root: import('postcss-selector-parser').Root) => void} [callback] - Deprecated callback function.
 * @returns {import('postcss-selector-parser').Root | undefined} The parsed selector root, or undefined on error.
 */
export function parseSelector (selector, result, node, callback) {
	if (!selector) return

	try {
		// TODO: Remove `callback` in the future. See https://github.com/stylelint/stylelint/pull/7647.
		if (callback) return selectorParser(callback).processSync(selector)

		return selectorParser().astSync(selector)
	}
	catch (err) {
		result.warn(`Cannot parse selector (${err})`, { node, stylelintType: `parseError` })
	}
}
