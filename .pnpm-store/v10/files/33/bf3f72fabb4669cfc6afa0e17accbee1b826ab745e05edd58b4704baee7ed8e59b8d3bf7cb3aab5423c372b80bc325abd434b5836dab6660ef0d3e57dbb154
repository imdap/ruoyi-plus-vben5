import valueParser from "postcss-value-parser"
import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { atRuleParamIndex } from "../../utils/atRuleParamIndex/index.js"
import { declarationValueIndex } from "../../utils/declarationValueIndex/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { isAtRule } from "../../utils/typeGuards/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `number-no-trailing-zeros`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	rejected: `Unexpected trailing zero(s)`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Disallows trailing zeros in numbers.
 * @type {import('stylelint').Rule}
 */
function rule (primary) {
	return (root, result) => {
		let validOptions = validateOptions(result, ruleName, { actual: primary })

		if (!validOptions) return

		root.walkAtRules((atRule) => {
			if (atRule.name.toLowerCase() === `import`) return

			check(atRule, atRule.params)
		})

		root.walkDecls((decl) => check(decl, decl.value))

		/**
		 * Checks a node for trailing zeros violations.
		 * @param {import('postcss').AtRule | import('postcss').Declaration} node - The node to check.
		 * @param {string} value - The value to check.
		 */
		function check (node, value) {
			/** @type {Array<{ startIndex: number, endIndex: number }>} */
			let fixPositions = []

			// Get out quickly if there are no periods
			if (!value.includes(`.`)) return

			valueParser(value).walk((valueNode) => {
				// Ignore `url` function
				if (valueNode.type === `function` && valueNode.value.toLowerCase() === `url`) return false

				// Ignore strings, comments, etc
				if (valueNode.type !== `word`) return

				let match = (/\.(\d{0,100}?)(0+)(?:\D|$)/).exec(valueNode.value)

				// match[1] is any numbers between the decimal and our trailing zero, could be empty
				// match[2] is our trailing zero(s)
				if (match === null || match[1] === null || match[2] === null) return

				// our index is:
				//  the index of our valueNode +
				//  the index of our match +
				//  1 for our decimal +
				//  the length of our potential non-zero number match (match[1])
				let index = valueNode.sourceIndex + match.index + 1 + match[1].length

				// our startIndex is identical to our index except when we have only
				// trailing zeros after our decimal. in that case we don't need the decimal
				// either so we move our index back by 1.
				let startIndex = match[1].length > 0 ? index : index - 1

				// our end index is our original index + the length of our trailing zeros
				let endIndex = index + match[2].length

				let baseIndex = isAtRule(node) ? atRuleParamIndex(node) : declarationValueIndex(node)

				// this is the index of the _first_ trailing zero
				const problemIndex = baseIndex + index

				report({
					message: messages.rejected,
					node,
					index: problemIndex,
					endIndex: problemIndex,
					result,
					ruleName,
					fix () {
						fixPositions.unshift({
							startIndex,
							endIndex,
						})
					},
				})
			})

			if (fixPositions.length > 0) {
				for (let fixPosition of fixPositions) {
					let startIndex = fixPosition.startIndex
					let endIndex = fixPosition.endIndex

					if (isAtRule(node)) node.params = removeTrailingZeros(node.params, startIndex, endIndex)
					else node.value = removeTrailingZeros(node.value, startIndex, endIndex)
				}
			}
		}
	}
}

/**
 * Removes trailing zeros from a number in the specified range.
 * @param {string} input - The input string.
 * @param {number} startIndex - The start index of the range to remove.
 * @param {number} endIndex - The end index of the range to remove.
 * @returns {string} The string with trailing zeros removed.
 */
function removeTrailingZeros (input, startIndex, endIndex) {
	return input.slice(0, startIndex) + input.slice(endIndex)
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
