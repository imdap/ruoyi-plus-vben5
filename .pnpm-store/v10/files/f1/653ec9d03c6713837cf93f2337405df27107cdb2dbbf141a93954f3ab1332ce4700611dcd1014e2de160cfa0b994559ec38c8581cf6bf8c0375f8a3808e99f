import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { beforeBlockString } from "../../utils/beforeBlockString/index.js"
import { blockString } from "../../utils/blockString/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { hasBlock } from "../../utils/hasBlock/index.js"
import { hasEmptyBlock } from "../../utils/hasEmptyBlock/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `block-opening-brace-newline-before`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedBefore: () => `Expected newline before "{"`,
	expectedBeforeSingleLine: () => `Expected newline before "{" of a single-line block`,
	rejectedBeforeSingleLine: () => `Unexpected whitespace before "{" of a single-line block`,
	expectedBeforeMultiLine: () => `Expected newline before "{" of a multi-line block`,
	rejectedBeforeMultiLine: () => `Unexpected whitespace before "{" of a multi-line block`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Requires a newline or disallows whitespace before the opening brace of blocks.
 * @type {import('stylelint').Rule}
 */
function rule (primary, _secondaryOptions, context) {
	let checker = whitespaceChecker(`newline`, primary, messages)

	return (root, result) => {
		let validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [
				`always`,
				`always-single-line`,
				`never-single-line`,
				`always-multi-line`,
				`never-multi-line`,
			],
		})

		if (!validOptions) return

		// Check both kinds of statement: rules and at-rules
		root.walkRules(check)
		root.walkAtRules(check)

		/**
		 * Checks a statement for opening brace newline before violations.
		 * @param {import('postcss').Rule | import('postcss').AtRule} statement - The rule or at-rule to check.
		 */
		function check (statement) {
			// Return early if blockless or has an empty block
			if (!hasBlock(statement) || hasEmptyBlock(statement)) return

			let source = beforeBlockString(statement)
			let beforeBraceNoRaw = beforeBlockString(statement, {
				noRawBefore: true,
			})

			let index = beforeBraceNoRaw.length - 1

			if (beforeBraceNoRaw[index - 1] === `\r`) index -= 1

			checker.beforeAllowingIndentation({
				lineCheckStr: blockString(statement),
				source,
				index: source.length,
				err: (m) => {
					report({
						message: m,
						node: statement,
						index,
						endIndex: index,
						result,
						ruleName,
						fix () {
							if (typeof statement.raws.between !== `string`) return

							if (primary.startsWith(`always`)) {
								let spaceIndex = statement.raws.between.search(/\s+$/)

								if (spaceIndex >= 0) statement.raws.between = statement.raws.between.slice(0, spaceIndex) + context.newline + statement.raws.between.slice(spaceIndex)
								else statement.raws.between += context.newline
							}
							else if (primary.startsWith(`never`)) statement.raws.between = statement.raws.between.replace(/\s*$/, ``)
						},
					})
				},
			})
		}
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
