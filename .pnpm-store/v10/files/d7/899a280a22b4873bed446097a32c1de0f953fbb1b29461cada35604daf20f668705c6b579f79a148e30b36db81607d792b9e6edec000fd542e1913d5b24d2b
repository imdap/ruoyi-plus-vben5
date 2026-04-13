import valueParser from "postcss-value-parser"
import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { atRuleParamIndex } from "../../utils/atRuleParamIndex/index.js"
import { declarationValueIndex } from "../../utils/declarationValueIndex/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { isAtRule } from "../../utils/typeGuards/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `number-leading-zero`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expected: `Expected a leading zero`,
	rejected: `Unexpected leading zero`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Requires or disallows a leading zero for fractional numbers less than 1.
 * @type {import('stylelint').Rule}
 */
function rule (primary) {
	return (root, result) => {
		let validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [`always`, `never`],
		})

		if (!validOptions) return

		let fix = null

		root.walkAtRules((atRule) => {
			if (atRule.name.toLowerCase() === `import`) return

			check(atRule, atRule.params)
		})

		root.walkDecls((decl) => check(decl, decl.value))

		/**
		 * Checks a node for leading zero violations.
		 * @param {import('postcss').AtRule | import('postcss').Declaration} node - The node to check.
		 * @param {string} value - The value to check.
		 */
		function check (node, value) {
			/** @type {Array<{ startIndex: number, endIndex: number }>} */
			let neverFixPositions = []

			/** @type {Array<{ index: number }>} */
			let alwaysFixPositions = []

			// Get out quickly if there are no periods
			if (!value.includes(`.`)) return

			valueParser(value).walk((valueNode) => {
				// Ignore `url` function
				if (valueNode.type === `function` && valueNode.value.toLowerCase() === `url`) return false

				// Ignore strings, comments, etc
				if (valueNode.type !== `word`) return

				// Check leading zero
				if (primary === `always`) {
					let match = (/(?:\D|^)(\.\d+)/).exec(valueNode.value)

					if (match === null || match[0] === null || match[1] === null) return

					// The regexp above consists of 2 capturing groups (or capturing parentheses).
					// We need the index of the second group. This makes sanse when we have "-.5" as an input
					// for regex. And we need the index of ".5".
					let capturingGroupIndex = match[0].length - match[1].length

					let index = valueNode.sourceIndex + match.index + capturingGroupIndex

					fix = () => {
						alwaysFixPositions.unshift({
							index,
						})
					}

					let baseIndex = isAtRule(node) ? atRuleParamIndex(node) : declarationValueIndex(node)

					complain(messages.expected, node, baseIndex + index)
				}

				if (primary === `never`) {
					let match = (/(?:\D|^)(0+)(\.\d+)/).exec(valueNode.value)

					if (match === null || match[0] === null || match[1] === null || match[2] === null) return

					// The regexp above consists of 3 capturing groups (or capturing parentheses).
					// We need the index of the second group. This makes sanse when we have "-00.5"
					// as an input for regex. And we need the index of "00".
					let capturingGroupIndex = match[0].length - (match[1].length + match[2].length)

					let index = valueNode.sourceIndex + match.index + capturingGroupIndex

					fix = () => {
						neverFixPositions.unshift({
							startIndex: index,
							// match[1].length is the length of our matched zero(s)
							endIndex: index + match[1].length,
						})
					}

					let baseIndex = isAtRule(node) ? atRuleParamIndex(node) : declarationValueIndex(node)

					complain(messages.rejected, node, baseIndex + index)
				}
			})

			if (alwaysFixPositions.length > 0) {
				for (let fixPosition of alwaysFixPositions) {
					let index = fixPosition.index

					if (isAtRule(node)) node.params = addLeadingZero(node.params, index)
					else node.value = addLeadingZero(node.value, index)
				}
			}

			if (neverFixPositions.length > 0) {
				for (let fixPosition of neverFixPositions) {
					let startIndex = fixPosition.startIndex
					let endIndex = fixPosition.endIndex

					if (isAtRule(node)) node.params = removeLeadingZeros(node.params, startIndex, endIndex)
					else node.value = removeLeadingZeros(node.value, startIndex, endIndex)
				}
			}
		}

		/**
		 * Reports a leading zero violation.
		 * @param {string} message - The error message to report.
		 * @param {import('postcss').Node} node - The node with the violation.
		 * @param {number} index - The index of the violation.
		 * @returns {void}
		 */
		function complain (message, node, index) {
			report({
				result,
				ruleName,
				message,
				node,
				index,
				endIndex: index,
				fix,
			})
		}
	}
}

/**
 * Adds a leading zero to a number at the specified index.
 * @param {string} input - The input string.
 * @param {number} index - The index at which to add the leading zero.
 * @returns {string} The string with the leading zero added.
 */
function addLeadingZero (input, index) {
	return `${input.slice(0, index)}0${input.slice(index)}`
}

/**
 * Removes leading zeros from a number in the specified range.
 * @param {string} input - The input string.
 * @param {number} startIndex - The start index of the range to remove.
 * @param {number} endIndex - The end index of the range to remove.
 * @returns {string} The string with leading zeros removed.
 */
function removeLeadingZeros (input, startIndex, endIndex) {
	return input.slice(0, startIndex) + input.slice(endIndex)
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
