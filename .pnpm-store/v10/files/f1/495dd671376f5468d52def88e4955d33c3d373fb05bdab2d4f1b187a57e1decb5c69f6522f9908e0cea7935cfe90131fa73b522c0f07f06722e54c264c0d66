import styleSearch from "style-search"
import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { isStandardSyntaxRule } from "../../utils/isStandardSyntaxRule/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `selector-list-comma-newline-after`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedAfter: () => `Expected newline after ","`,
	expectedAfterMultiLine: () => `Expected newline after "," in a multi-line list`,
	rejectedAfterMultiLine: () => `Unexpected whitespace after "," in a multi-line list`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/** @type {import('stylelint').Rule} */
function rule (primary, _secondaryOptions, context) {
	let checker = whitespaceChecker(`newline`, primary, messages)

	return (root, result) => {
		let validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [`always`, `always-multi-line`, `never-multi-line`],
		})

		if (!validOptions) return

		root.walkRules((ruleNode) => {
			if (!isStandardSyntaxRule(ruleNode)) return

			// Get raw selector so we can allow end-of-line comments, e.g.
			// a, /* comment */
			// b {}
			let selector = ruleNode.raws.selector ? ruleNode.raws.selector.raw : ruleNode.selector

			/** @type {number[]} */
			let fixIndices = []

			styleSearch(
				{
					source: selector,
					target: `,`,
					functionArguments: `skip`,
				},
				(match) => {
					let nextChars = selector.slice(match.endIndex)

					// If there's a // comment, that means there has to be a newline
					// ending the comment so we're fine
					if ((/^\s+\/\//).test(nextChars)) return

					// If there are spaces and then a comment begins, look for the newline
					let indextoCheckAfter = (/^\s+\/\*/).test(nextChars) ? selector.indexOf(`*/`, match.endIndex) + 1 : match.startIndex

					checker.afterOneOnly({
						source: selector,
						index: indextoCheckAfter,
						err: (m) => {
							report({
								message: m,
								node: ruleNode,
								index: match.startIndex,
								endIndex: match.startIndex,
								result,
								ruleName,
								fix () {
									fixIndices.push(indextoCheckAfter + 1)
								},
							})
						},
					})
				},
			)

			if (fixIndices.length > 0) {
				let fixedSelector = selector

				for (let index of fixIndices.toSorted((a, b) => b - a)) {
					let beforeSelector = fixedSelector.slice(0, index)
					let afterSelector = fixedSelector.slice(index)

					if (primary.startsWith(`always`)) afterSelector = context.newline + afterSelector
					else if (primary.startsWith(`never-multi-line`)) afterSelector = afterSelector.replace(/^\s*/, ``)

					fixedSelector = beforeSelector + afterSelector
				}

				if (ruleNode.raws.selector) ruleNode.raws.selector.raw = fixedSelector
				else ruleNode.selector = fixedSelector
			}
		})
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
