import valueParser from "postcss-value-parser"
import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { atRuleParamIndex } from "../../utils/atRuleParamIndex/index.js"
import { declarationValueIndex } from "../../utils/declarationValueIndex/index.js"
import { getDimension } from "../../utils/getDimension/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `unit-case`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Specifies lowercase or uppercase for units.
 * @type {import('stylelint').Rule}
 */
function rule (primary) {
	return (root, result) => {
		let validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [`lower`, `upper`],
		})

		if (!validOptions) return

		/**
		 * Checks a node for unit case violations.
		 * @template {import('postcss').AtRule | import('postcss').Declaration} T
		 * @param {T} node - The node to check.
		 * @param {string} checkedValue - The value to check.
		 * @param {(node: T) => number} getIndex - Function to get the index of the node.
		 * @returns {void}
		 */
		function check (node, checkedValue, getIndex) {
			/** @type {Array<{ index: number, endIndex: number, message: string }>} */
			let problems = []

			/**
			 * Processes a value node to check for unit case violations.
			 * @param {import('postcss-value-parser').Node} valueNode - The value parser node to process.
			 * @returns {boolean} True if the node was processed, false otherwise.
			 */
			function processValue (valueNode) {
				let { number, unit } = getDimension(valueNode)

				if (!number || !unit) return false

				let expectedUnit = primary === `lower` ? unit.toLowerCase() : unit.toUpperCase()

				if (unit === expectedUnit) return false

				let index = getIndex(node)

				problems.push({
					index: index + valueNode.sourceIndex + number.length,
					endIndex: index + valueNode.sourceEndIndex,
					message: messages.expected,
					messageArgs: [unit, expectedUnit],
				})

				return true
			}

			let parsedValue = valueParser(checkedValue).walk((valueNode) => {
				// Ignore wrong units within `url` function
				let value = valueNode.value

				if (valueNode.type === `function` && value.toLowerCase() === `url`) return false

				if (value.includes(`*`)) {
					value.split(`*`).some((val) => processValue({
						...valueNode,
						sourceIndex: value.indexOf(val) + val.length + 1,
						value: val,
					}))
				}

				if (processValue(valueNode)) valueNode.value = primary === `lower` ? value.toLowerCase() : value.toUpperCase()
			})

			if (problems.length > 0) {
				for (let err of problems) {
					report({
						index: err.index,
						endIndex: err.endIndex,
						message: err.message,
						messageArgs: err.messageArgs,
						node,
						result,
						ruleName,
						fix () {
							if (`name` in node && node.name === `media`) node.params = parsedValue.toString()
							else if (`value` in node) node.value = parsedValue.toString()
						},
					})
				}
			}
		}

		root.walkAtRules((atRule) => {
			if (!(/^media$/i).test(atRule.name) && !(`variable` in atRule)) return

			check(atRule, atRule.params, atRuleParamIndex)
		})
		root.walkDecls((decl) => check(decl, decl.value, declarationValueIndex))
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
