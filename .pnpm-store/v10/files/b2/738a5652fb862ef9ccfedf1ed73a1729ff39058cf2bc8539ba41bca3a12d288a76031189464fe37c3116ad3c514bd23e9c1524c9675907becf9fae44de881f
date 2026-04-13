import styleSearch from "style-search"
import stylelint from "stylelint"

import { isStandardSyntaxRule } from "../isStandardSyntaxRule/index.js"
import { parseSelector } from "../parseSelector/index.js"

let { utils: { report } } = stylelint

/**
 * Checks whitespace around attribute operators in selectors.
 * @param {{
 *   root: import('postcss').Root,
 *   result: import('stylelint').PostcssResult,
 *   locationChecker: (opts: { source: string, index: number, err: (msg: string) => void }) => void,
 *   checkedRuleName: string,
 *   checkBeforeOperator: boolean,
 *   fix: ((attributeNode: import('postcss-selector-parser').Attribute) => boolean),
 * }} options - The options object
 * @returns {void}
 */
export function selectorAttributeOperatorSpaceChecker (options) {
	options.root.walkRules((rule) => {
		if (!isStandardSyntaxRule(rule)) return

		if (!rule.selector.includes(`[`) || !rule.selector.includes(`=`)) return

		let hasFixed = false
		let selector = rule.raws.selector ? rule.raws.selector.raw : rule.selector

		let fixedSelector = parseSelector(selector, options.result, rule, (selectorTree) => {
			selectorTree.walkAttributes((attributeNode) => {
				let operator = attributeNode.operator

				if (!operator) return

				let attributeNodeString = attributeNode.toString()

				styleSearch({ source: attributeNodeString, target: operator }, (match) => {
					let index = options.checkBeforeOperator ? match.startIndex : match.endIndex - 1

					checkOperator(attributeNodeString, index, rule, attributeNode, operator)
				})
			})
		})

		if (hasFixed && fixedSelector) {
			if (rule.raws.selector) rule.raws.selector.raw = fixedSelector
			else rule.selector = fixedSelector
		}

		/**
		 * Checks an operator for whitespace violations.
		 * @param {string} source - The source string.
		 * @param {number} index - The index to check.
		 * @param {import('postcss').Node} node - The node with the violation.
		 * @param {import('postcss-selector-parser').Attribute} attributeNode - The attribute node.
		 * @param {string} operator - The operator being checked.
		 */
		function checkOperator (source, index, node, attributeNode, operator) {
			options.locationChecker({
				source,
				index,
				err: (msg) => {
					const problemIndex = attributeNode.sourceIndex + index

					report({
						message: msg.replace(
							options.checkBeforeOperator ? operator.charAt(0) : operator.at(-1),
							operator,
						),
						node,
						index: problemIndex,
						endIndex: problemIndex,
						result: options.result,
						ruleName: options.checkedRuleName,
						fix: options.fix
							? () => {
								hasFixed = true

								return options.fix(attributeNode)
							}
							: undefined,
					})
				},
			})
		}
	})
}
