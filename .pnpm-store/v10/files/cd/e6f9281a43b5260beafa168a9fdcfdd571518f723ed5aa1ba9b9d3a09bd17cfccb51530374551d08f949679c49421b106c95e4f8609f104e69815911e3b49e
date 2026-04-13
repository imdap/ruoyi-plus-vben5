import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { hasBlock } from "../../utils/hasBlock/index.js"
import { isStandardSyntaxAtRule } from "../../utils/isStandardSyntaxAtRule/index.js"
import { nextNonCommentNode } from "../../utils/nextNonCommentNode/index.js"
import { rawNodeString } from "../../utils/rawNodeString/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `at-rule-semicolon-newline-after`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedAfter: () => `Expected newline after ";"`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Requires a newline after the semicolon of at-rules.
 * @type {import('stylelint').Rule}
 */
function rule (primary, _secondary, context) {
	let checker = whitespaceChecker(`newline`, primary, messages)

	return (root, result) => {
		let validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [`always`],
		})

		if (!validOptions) return

		root.walkAtRules((atRule) => {
			let nextNode = atRule.next()

			if (!nextNode) return

			if (hasBlock(atRule)) return

			if (!isStandardSyntaxAtRule(atRule)) return

			// Allow an end-of-line comment
			let nodeToCheck = nextNonCommentNode(nextNode)

			if (!nodeToCheck) return

			const problemIndex = atRule.toString().length + 1

			checker.afterOneOnly({
				source: rawNodeString(nodeToCheck),
				index: -1,
				err: (msg) => {
					report({
						message: msg,
						node: atRule,
						index: problemIndex,
						endIndex: problemIndex,
						result,
						ruleName,
						fix () {
							nodeToCheck.raws.before = context.newline + nodeToCheck.raws.before
						},
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
