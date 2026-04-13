import styleSearch from "style-search"
import stylelint from "stylelint"

import { atRuleParamIndex } from "../atRuleParamIndex/index.js"
import { assertString } from "../validateTypes/index.js"

let { utils: { report } } = stylelint

/**
 * Checks whitespace around commas in media query lists.
 * @param {{
 *   root: import('postcss').Root,
 *   result: import('stylelint').PostcssResult,
 *   locationChecker: (args: { source: string, index: number, err: (message: string) => void }) => void,
 *   checkedRuleName: string,
 *   fix?: ((atRule: import('postcss').AtRule, index: number) => boolean) | undefined,
 *   allowTrailingComments?: boolean,
 * }} opts - The options object
 */
export function mediaQueryListCommaWhitespaceChecker (opts) {
	opts.root.walkAtRules(/^media$/i, (atRule) => {
		let params = atRule.raws.params ? atRule.raws.params.raw : atRule.params

		styleSearch({ source: params, target: `,` }, (match) => {
			let index = match.startIndex

			if (opts.allowTrailingComments) {
				// if there is a comment on the same line at after the comma, check the space after the comment.
				let execResult = (/^[^\S\r\n]*\/\*([\s\S]*?)\*\//).exec(params.slice(index + 1))

				while (execResult) {
					assertString(execResult[0])
					index += execResult[0].length
					execResult = (/^[^\S\r\n]*\/\*([\s\S]*?)\*\//).exec(params.slice(index + 1))
				}

				execResult = (/^([^\S\r\n]*\/\/[\s\S]*?)\r?\n/).exec(params.slice(index + 1))

				if (execResult) {
					assertString(execResult[1])
					index += execResult[1].length
				}
			}

			checkComma(params, index, atRule)
		})
	})

	/**
	 * Checks a comma for whitespace violations.
	 * @param {string} source - The source string.
	 * @param {number} index - The index to check.
	 * @param {import('postcss').AtRule} node - The at-rule node.
	 */
	function checkComma (source, index, node) {
		opts.locationChecker({
			source,
			index,
			err: (message) => {
				let commaIndex = index + atRuleParamIndex(node)

				report({
					message,
					node,
					index: commaIndex,
					endIndex: commaIndex,
					result: opts.result,
					ruleName: opts.checkedRuleName,
					fix: opts.fix ? () => opts.fix(node, commaIndex) : undefined,
				})
			},
		})
	}
}
