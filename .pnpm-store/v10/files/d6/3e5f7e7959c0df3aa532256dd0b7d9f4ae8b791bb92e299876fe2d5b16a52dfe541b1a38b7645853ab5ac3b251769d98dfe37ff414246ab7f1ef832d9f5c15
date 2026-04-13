import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { beforeBlockString } from "../../utils/beforeBlockString/index.js"
import { blockString } from "../../utils/blockString/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { hasBlock } from "../../utils/hasBlock/index.js"
import { hasEmptyBlock } from "../../utils/hasEmptyBlock/index.js"
import { optionsMatches } from "../../utils/optionsMatches/index.js"
import { isRegExp, isString } from "../../utils/validateTypes/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `block-opening-brace-space-before`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedBefore: () => `Expected single space before "{"`,
	rejectedBefore: () => `Unexpected whitespace before "{"`,
	expectedBeforeSingleLine: () => `Expected single space before "{" of a single-line block`,
	rejectedBeforeSingleLine: () => `Unexpected whitespace before "{" of a single-line block`,
	expectedBeforeMultiLine: () => `Expected single space before "{" of a multi-line block`,
	rejectedBeforeMultiLine: () => `Unexpected whitespace before "{" of a multi-line block`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Requires or disallows whitespace before the opening brace of blocks.
 * @type {import('stylelint').Rule}
 */
function rule (primary, secondaryOptions) {
	let checker = whitespaceChecker(`space`, primary, messages)

	return (root, result) => {
		let validOptions = validateOptions(
			result,
			ruleName,
			{
				actual: primary,
				possible: [
					`always`,
					`never`,
					`always-single-line`,
					`never-single-line`,
					`always-multi-line`,
					`never-multi-line`,
				],
			},
			{
				actual: secondaryOptions,
				possible: {
					ignoreAtRules: [isString, isRegExp],
					ignoreSelectors: [isString, isRegExp],
				},
				optional: true,
			},
		)

		if (!validOptions) return

		// Check both kinds of statements: rules and at-rules
		root.walkRules(check)
		root.walkAtRules(check)

		/**
		 * Checks a statement for opening brace space before violations.
		 * @param {import('postcss').Rule | import('postcss').AtRule} statement - The rule or at-rule to check.
		 */
		function check (statement) {
			// Return early if blockless or has an empty block
			if (!hasBlock(statement) || hasEmptyBlock(statement)) return

			// Return early if at-rule is to be ignored
			if (statement.type === `atrule` && optionsMatches(secondaryOptions, `ignoreAtRules`, statement.name)) return

			// Return early if selector is to be ignored
			if (statement.type === `rule` && optionsMatches(secondaryOptions, `ignoreSelectors`, statement.selector)) return

			let source = beforeBlockString(statement)
			let beforeBraceNoRaw = beforeBlockString(statement, {
				noRawBefore: true,
			})

			let index = beforeBraceNoRaw.length - 1

			if (beforeBraceNoRaw[index - 1] === `\r`) index -= 1

			checker.before({
				source,
				index: source.length,
				lineCheckStr: blockString(statement),
				err: (m) => {
					report({
						message: m,
						node: statement,
						index,
						endIndex: index,
						result,
						ruleName,
						fix () {
							if (primary.startsWith(`always`)) {
								statement.raws.between = ` `

								return
							}

							if (primary.startsWith(`never`)) statement.raws.between = ``
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
