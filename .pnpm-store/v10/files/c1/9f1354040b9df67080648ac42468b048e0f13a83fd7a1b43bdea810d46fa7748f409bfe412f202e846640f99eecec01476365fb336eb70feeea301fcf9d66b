import stylelint from "stylelint"

import { isStandardSyntaxAtRule } from "../isStandardSyntaxAtRule/index.js"

let { utils: { report } } = stylelint

/**
 * Checks whitespace around at-rule names.
 * @param {{
 *   root: import('postcss').Root,
 *   locationChecker: (opts: { source: string, index: number, err: (msg: string) => void, errTarget: string }) => void,
 *   result: import('stylelint').PostcssResult,
 *   checkedRuleName: string,
 *   fix?: ((atRule: import('postcss').AtRule) => void) | null,
 * }} options - The options object
 */
export function atRuleNameSpaceChecker (options) {
	options.root.walkAtRules((atRule) => {
		if (!isStandardSyntaxAtRule(atRule)) return

		checkColon(
			`@${atRule.name}${atRule.raws.afterName || ``}${atRule.params}`,
			atRule.name.length,
			atRule,
		)
	})

	/**
	 * Checks a colon for whitespace violations in at-rule names.
	 * @param {string} source - The source string.
	 * @param {number} index - The index to check.
	 * @param {import('postcss').AtRule} node - The at-rule node.
	 */
	function checkColon (source, index, node) {
		options.locationChecker({
			source,
			index,
			err: (m) => {
				report({
					message: m,
					node,
					index,
					endIndex: index,
					result: options.result,
					ruleName: options.checkedRuleName,
					fix: options.fix ? () => options.fix(node) : undefined,
				})
			},
			errTarget: `@${node.name}`,
		})
	}
}
