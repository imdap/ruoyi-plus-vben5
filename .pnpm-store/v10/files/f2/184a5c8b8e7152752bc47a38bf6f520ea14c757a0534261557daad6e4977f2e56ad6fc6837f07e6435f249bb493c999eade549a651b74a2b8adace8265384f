import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { blockString } from "../../utils/blockString/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { hasBlock } from "../../utils/hasBlock/index.js"
import { hasEmptyBlock } from "../../utils/hasEmptyBlock/index.js"
import { isSingleLineString } from "../../utils/isSingleLineString/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `block-closing-brace-newline-before`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedBefore: `Expected newline before "}"`,
	expectedBeforeMultiLine: `Expected newline before "}" of a multi-line block`,
	rejectedBeforeMultiLine: `Unexpected whitespace before "}" of a multi-line block`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Requires a newline or disallows whitespace before the closing brace of blocks.
 * @type {import('stylelint').Rule}
 */
function rule (primary, _secondaryOptions, context) {
	return (root, result) => {
		let validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [`always`, `always-multi-line`, `never-multi-line`],
		})

		if (!validOptions) return

		// Check both kinds of statements: rules and at-rules
		root.walkRules(check)
		root.walkAtRules(check)

		/**
		 * Checks a statement for closing brace newline violations.
		 * @param {import('postcss').Rule | import('postcss').AtRule} statement - The rule or at-rule node to check.
		 */
		function check (statement) {
			// Return early if blockless or has empty block
			if (!hasBlock(statement) || hasEmptyBlock(statement)) return

			// Ignore extra semicolon
			let after = (statement.raws.after || ``).replace(/;+/, ``)

			if (after === undefined) return

			let blockIsMultiLine = !isSingleLineString(blockString(statement))
			let statementString = statement.toString()

			let index = statementString.length - 2

			if (statementString[index - 1] === `\r`) index -= 1

			// We're really just checking whether a
			// newline *starts* the block's final space -- between
			// the last declaration and the closing brace. We can
			// ignore any other whitespace between them, because that
			// will be checked by the indentation rule.
			if (!after.startsWith(`\n`) && !after.startsWith(`\r\n`)) {
				if (primary === `always`) complain(messages.expectedBefore)
				else if (blockIsMultiLine && primary === `always-multi-line`) complain(messages.expectedBeforeMultiLine)
			}

			if (after !== `` && blockIsMultiLine && primary === `never-multi-line`) complain(messages.rejectedBeforeMultiLine)

			/**
			 * Reports a closing brace newline violation.
			 * @param {string} message - The error message to report.
			 */
			function complain (message) {
				report({
					message,
					result,
					ruleName,
					node: statement,
					index,
					endIndex: index,
					fix () {
						let statementRaws = statement.raws

						if (typeof statementRaws.after !== `string`) return

						if (primary.startsWith(`always`)) {
							let firstWhitespaceIndex = statementRaws.after.search(/\s/)
							let newlineBefore = firstWhitespaceIndex >= 0 ? statementRaws.after.slice(0, firstWhitespaceIndex) : statementRaws.after
							let newlineAfter = firstWhitespaceIndex >= 0 ? statementRaws.after.slice(firstWhitespaceIndex) : ``
							let newlineIndex = newlineAfter.search(/\r?\n/)

							statementRaws.after = newlineIndex >= 0 ? newlineBefore + newlineAfter.slice(newlineIndex) : newlineBefore + context.newline + newlineAfter
						}
						else if (primary === `never-multi-line`) statementRaws.after = statementRaws.after.replaceAll(/\s/g, ``)
					},
				})
			}
		}
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
