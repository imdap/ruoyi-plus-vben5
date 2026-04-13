import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { blockString } from "../../utils/blockString/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { nextNonCommentNode } from "../../utils/nextNonCommentNode/index.js"
import { rawNodeString } from "../../utils/rawNodeString/index.js"
import { isAtRule, isRule } from "../../utils/typeGuards/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `declaration-block-semicolon-newline-after`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedAfter: () => `Expected newline after ";"`,
	expectedAfterMultiLine: () => `Expected newline after ";" in a multi-line declaration block`,
	rejectedAfterMultiLine: () => `Unexpected newline after ";" in a multi-line declaration block`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Requires a newline or disallows whitespace after the semicolons of declaration blocks.
 * @type {import('stylelint').Rule}
 */
function rule (primary, _secondaryOptions, context) {
	let checker = whitespaceChecker(`newline`, primary, messages)

	return (root, result) => {
		let validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [`always`, `always-multi-line`, `never-multi-line`],
		})

		if (!validOptions) return

		root.walkDecls((decl) => {
			// Ignore last declaration if there's no trailing semicolon
			let parentRule = decl.parent

			if (!parentRule) throw new Error(`A parent node must be present`)

			if (!isAtRule(parentRule) && !isRule(parentRule)) return

			if (!parentRule.raws.semicolon && parentRule.last === decl) return

			let nextNode = decl.next()

			if (!nextNode) return

			// Allow end-of-line comment
			let nodeToCheck = nextNonCommentNode(nextNode)

			if (!nodeToCheck) return

			const problemIndex = decl.toString().length + 1

			checker.afterOneOnly({
				source: rawNodeString(nodeToCheck),
				index: -1,
				lineCheckStr: blockString(parentRule),
				err: (m) => {
					report({
						message: m,
						node: decl,
						index: problemIndex,
						endIndex: problemIndex,
						result,
						ruleName,
						fix () {
							if (primary.startsWith(`always`)) {
								let index = nodeToCheck.raws.before.search(/\r?\n/)

								nodeToCheck.raws.before = index >= 0 ? nodeToCheck.raws.before.slice(index) : context.newline + nodeToCheck.raws.before

								return
							}

							if (primary === `never-multi-line`) nodeToCheck.raws.before = ``
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
