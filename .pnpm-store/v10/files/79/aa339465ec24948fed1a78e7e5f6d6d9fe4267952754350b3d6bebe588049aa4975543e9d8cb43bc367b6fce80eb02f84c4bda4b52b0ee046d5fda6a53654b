import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { atRuleParamIndex } from "../../utils/atRuleParamIndex/index.js"
import { findMediaOperator } from "../../utils/findMediaOperator/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `media-feature-range-operator-space-after`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedAfter: () => `Expected single space after range operator`,
	rejectedAfter: () => `Unexpected whitespace after range operator`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/** @type {import('stylelint').Rule} */
function rule (primary) {
	let checker = whitespaceChecker(`space`, primary, messages)

	return (root, result) => {
		let validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [`always`, `never`],
		})

		if (!validOptions) return

		root.walkAtRules(/^media$/i, (atRule) => {
			/** @type {number[]} */
			let fixOperatorIndices = []

			findMediaOperator(atRule, (match, params, node) => {
				const endIndex = match.startIndex + match.target.length - 1
				const problemIndex = endIndex + atRuleParamIndex(node) + 1

				checker.after({
					source: params,
					index: endIndex,
					err: (message) => {
						report({
							message,
							node,
							index: problemIndex,
							endIndex: problemIndex,
							result,
							ruleName,
							fix () {
								fixOperatorIndices.push(endIndex)
							},
						})
					},
				})
			})

			if (fixOperatorIndices.length > 0) {
				let params = atRule.raws.params ? atRule.raws.params.raw : atRule.params

				for (let index of fixOperatorIndices.toSorted((a, b) => b - a)) {
					let beforeOperator = params.slice(0, index + 1)
					let afterOperator = params.slice(index + 1)

					if (primary === `always`) params = beforeOperator + afterOperator.replace(/^\s*/, ` `)
					else if (primary === `never`) params = beforeOperator + afterOperator.replace(/^\s*/, ``)
				}

				if (atRule.raws.params) atRule.raws.params.raw = params
				else atRule.params = params
			}
		})
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
