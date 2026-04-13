import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { blockString } from "../../utils/blockString/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { isAtRule, isRule } from "../../utils/typeGuards/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `declaration-block-semicolon-newline-before`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedBefore: () => `Expected newline before ";"`,
	expectedBeforeMultiLine: () => `Expected newline before ";" in a multi-line declaration block`,
	rejectedBeforeMultiLine: () => `Unexpected whitespace before ";" in a multi-line declaration block`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
}

/**
 * Requires a newline or disallows whitespace before the semicolons of declaration blocks.
 * @type {import('stylelint').Rule}
 */
function rule (primary) {
	let checker = whitespaceChecker(`newline`, primary, messages)

	return (root, result) => {
		let validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [`always`, `always-multi-line`, `never-multi-line`],
		})

		if (!validOptions) return

		root.walkDecls((decl) => {
			let parentRule = decl.parent

			if (!parentRule) throw new Error(`A parent node must be present`)

			if (!isAtRule(parentRule) && !isRule(parentRule)) return

			if (!parentRule.raws.semicolon && parentRule.last === decl) return

			const declString = decl.toString()
			const problemIndex = decl.toString().length - 1

			checker.beforeAllowingIndentation({
				source: declString,
				index: declString.length,
				lineCheckStr: blockString(parentRule),
				err: (m) => {
					report({
						message: m,
						node: decl,
						index: problemIndex,
						endIndex: problemIndex,
						result,
						ruleName,
					})
				},
			})
		})
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
