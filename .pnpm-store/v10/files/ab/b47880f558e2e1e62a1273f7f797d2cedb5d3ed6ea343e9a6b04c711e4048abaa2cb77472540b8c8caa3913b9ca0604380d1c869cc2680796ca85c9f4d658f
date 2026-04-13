import styleSearch from "style-search"
import stylelint from "stylelint"

import { isStandardSyntaxRule } from "../isStandardSyntaxRule/index.js"

let { utils: { report } } = stylelint

/**
 * @typedef {Object} SelectorListCommaWhitespaceCheckerOptions
 * @property {import('postcss').Root} root - The PostCSS root node.
 * @property {import('stylelint').PostcssResult} result - The Stylelint result.
 * @property {(opts: { source: string, index: number, err: (msg: string) => void }) => void} locationChecker - The location checker function
 * @property {string} checkedRuleName - The name of the rule being checked.
 * @property {((rule: import('postcss').Rule, index: number) => boolean)} fix - The fix function.
 */

/**
 * Checks whitespace around commas in selector lists.
 * @param {SelectorListCommaWhitespaceCheckerOptions} opts - The options object.
 * @returns {void}
 */
export function selectorListCommaWhitespaceChecker (opts) {
	opts.root.walkRules((rule) => {
		if (!isStandardSyntaxRule(rule)) return

		let selector = rule.raws.selector ? rule.raws.selector.raw : rule.selector

		styleSearch(
			{
				source: selector,
				target: `,`,
				functionArguments: `skip`,
			},
			(match) => {
				checkDelimiter(selector, match.startIndex, rule)
			},
		)
	})

	/**
	 * Checks whitespace around a delimiter and reports violations.
	 * @param {string} source - The source string being checked.
	 * @param {number} index - The index of the delimiter.
	 * @param {import('postcss').Rule} node - The rule node.
	 * @returns {void}
	 */
	function checkDelimiter (source, index, node) {
		opts.locationChecker({
			source,
			index,
			err: (message) => {
				report({
					message,
					node,
					index,
					endIndex: index,
					result: opts.result,
					ruleName: opts.checkedRuleName,
					fix: opts.fix ? () => opts.fix(node, index) : undefined,
				})
			},
		})
	}
}
