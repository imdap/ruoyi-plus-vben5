import styleSearch from "style-search"
import stylelint from "stylelint"

import { atRuleParamIndex } from "../atRuleParamIndex/index.js"

let { utils: { report } } = stylelint

/**
 * Checks whitespace around colons in media feature declarations.
 * @param {{
 *   root: import('postcss').Root,
 *   locationChecker: (args: { source: string, index: number, err: (message: string) => void }) => void,
 *   fix: ((node: import('postcss').AtRule, index: number) => boolean),
 *   result: import('stylelint').PostcssResult,
 *   checkedRuleName: string,
 * }} opts - The options object
 */
export function mediaFeatureColonSpaceChecker (opts) {
	opts.root.walkAtRules(/^media$/i, (atRule) => {
		let params = atRule.raws.params ? atRule.raws.params.raw : atRule.params

		styleSearch({ source: params, target: `:` }, (match) => {
			checkColon(params, match.startIndex, atRule)
		})
	})

	/**
	 * Checks a colon for whitespace violations.
	 * @param {string} source - The source string.
	 * @param {number} index - The index of the colon.
	 * @param {import('postcss').AtRule} node - The at-rule node.
	 */
	function checkColon (source, index, node) {
		opts.locationChecker({
			source,
			index,
			err: (message) => {
				let colonIndex = index + atRuleParamIndex(node)

				report({
					message,
					node,
					index: colonIndex,
					endIndex: colonIndex,
					result: opts.result,
					ruleName: opts.checkedRuleName,
					fix: opts.fix ? () => opts.fix(node, colonIndex) : undefined,
				})
			},
		})
	}
}
