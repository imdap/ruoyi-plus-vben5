import styleSearch from "style-search"
import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { atRuleParamIndex } from "../../utils/atRuleParamIndex/index.js"
import { declarationValueIndex } from "../../utils/declarationValueIndex/index.js"
import { getDeclarationValue } from "../../utils/getDeclarationValue/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { isWhitespace } from "../../utils/isWhitespace/index.js"
import { setDeclarationValue } from "../../utils/setDeclarationValue/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `function-whitespace-after`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expected: `Expected whitespace after ")"`,
	rejected: `Unexpected whitespace after ")"`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

const ACCEPTABLE_AFTER_CLOSING_PAREN = new Set([`)`, `,`, `}`, `:`, `/`, undefined])

/**
 * Requires or disallows whitespace after functions.
 * @type {import('stylelint').Rule}
 */
function rule (primary) {
	return (root, result) => {
		let validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [`always`, `never`],
		})

		if (!validOptions) return

		/**
		 * Checks a node for function whitespace after violations.
		 * @param {import('postcss').Node} node - The node to check.
		 * @param {string} value - The value to check.
		 * @param {number} nodeIndex - The index of the node.
		 * @param {((index: number) => void) | undefined} fix - The fix function.
		 */
		function check (node, value, nodeIndex, fix) {
			styleSearch(
				{
					source: value,
					target: `)`,
					functionArguments: `only`,
				},
				(match) => {
					checkClosingParen(value, match.startIndex + 1, node, nodeIndex, fix)
				},
			)
		}

		/**
		 * Checks a closing parenthesis for whitespace violations.
		 * @param {string} source - The source string.
		 * @param {number} index - The index to check.
		 * @param {import('postcss').Node} node - The node with the violation.
		 * @param {number} nodeIndex - The index of the node.
		 * @param {((index: number) => void) | undefined} fix - The fix function.
		 */
		function checkClosingParen (source, index, node, nodeIndex, fix) {
			let nextChar = source.charAt(index)

			if (!nextChar) return

			const problemIndex = nodeIndex + index

			if (primary === `always`) {
				// Allow for the next character to be a single empty space,
				// another closing parenthesis, a comma, or the end of the value
				if (nextChar === ` `) return

				if (nextChar === `\n`) return

				if (source.slice(index, index + 2) === `\r\n`) return

				if (ACCEPTABLE_AFTER_CLOSING_PAREN.has(nextChar)) return

				report({
					message: messages.expected,
					node,
					index: problemIndex,
					endIndex: problemIndex,
					result,
					ruleName,
					fix () {
						fix(index)
					},
				})
			}
			else if (primary === `never` && isWhitespace(nextChar)) {
				report({
					message: messages.rejected,
					node,
					index: problemIndex,
					endIndex: problemIndex,
					result,
					ruleName,
					fix () {
						fix(index)
					},
				})
			}
		}

		/**
		 * Creates a fixer function for whitespace violations.
		 * @param {string} value - The value to fix.
		 * @returns {{ applyFix: (index: number) => void, hasFixed: boolean, fixed: string }} The fixer object.
		 */
		function createFixer (value) {
			let fixed = ``
			let lastIndex = 0

			/**
			 * Applies a fix at the given index.
			 * @param {number} index - The index to fix at.
			 * @returns {void}
			 * @throws {Error} Throws an error if the primary option is unexpected.
			 */
			function applyFix (index) {
				if (primary === `always`) {
					fixed += `${value.slice(lastIndex, index)} `
					lastIndex = index
				}
				else if (primary === `never`) {
					let whitespaceEndIndex = index + 1

					while (whitespaceEndIndex < value.length && isWhitespace(value.charAt(whitespaceEndIndex))) whitespaceEndIndex += 1

					fixed += value.slice(lastIndex, index)
					lastIndex = whitespaceEndIndex
				}
				else throw new Error(`Unexpected option: "${primary}"`)
			}

			return {
				applyFix,
				get hasFixed () {
					return Boolean(lastIndex)
				},
				get fixed () {
					return fixed + value.slice(lastIndex)
				},
			}
		}

		root.walkAtRules(/^import$/i, (atRule) => {
			let param = (atRule.raws.params && atRule.raws.params.raw) || atRule.params
			let fixer = createFixer(param)

			check(atRule, param, atRuleParamIndex(atRule), fixer ? fixer.applyFix : undefined)

			if (fixer && fixer.hasFixed) {
				if (atRule.raws.params) atRule.raws.params.raw = fixer.fixed
				else atRule.params = fixer.fixed
			}
		})
		root.walkDecls((decl) => {
			let value = getDeclarationValue(decl)
			let fixer = createFixer(value)

			check(decl, value, declarationValueIndex(decl), fixer ? fixer.applyFix : undefined)

			if (fixer && fixer.hasFixed) setDeclarationValue(decl, fixer.fixed)
		})
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
