import styleSearch from "style-search"
import stylelint from "stylelint"

import { isStandardSyntaxDeclaration } from "../isStandardSyntaxDeclaration/index.js"
import { isStandardSyntaxProperty } from "../isStandardSyntaxProperty/index.js"

let { utils: { report } } = stylelint

/**
 * @typedef {Object} ValueListCommaWhitespaceCheckerOptions.
 * @property {import('postcss').Root} root - The PostCSS root node.
 * @property {import('stylelint').PostcssResult} result - The Stylelint result.
 * @property {(opts: { source: string, index: number, err: (msg: string) => void }) => void} locationChecker - The location checker function
 * @property {string} checkedRuleName - The name of the rule being checked.
 * @property {((node: import('postcss').Declaration, index: number) => boolean)} [fix] - The fix function.
 * @property {((declString: string, match: import('style-search').StyleSearchMatch) => number | false)} [determineIndex] - The index determination function.
 */

/**
 * Checks whitespace around commas in value lists.
 * @param {ValueListCommaWhitespaceCheckerOptions} opts - The options object.
 * @returns {void}
 */
export function valueListCommaWhitespaceChecker (opts) {
	opts.root.walkDecls((decl) => {
		if (!isStandardSyntaxDeclaration(decl) || !isStandardSyntaxProperty(decl.prop)) return

		let declString = decl.toString()

		styleSearch(
			{
				source: declString,
				target: `,`,
				functionArguments: `skip`,
			},
			(match) => {
				let indexToCheckAfter = opts.determineIndex ? opts.determineIndex(declString, match) : match.startIndex

				if (indexToCheckAfter === false) return

				checkComma(declString, indexToCheckAfter, decl)
			},
		)
	})

	/**
	 * Checks whitespace around a comma and reports violations.
	 * @param {string} source - The source string being checked.
	 * @param {number} index - The index of the comma.
	 * @param {import('postcss').Declaration} node - The declaration node.
	 * @returns {void}
	 */
	function checkComma (source, index, node) {
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
