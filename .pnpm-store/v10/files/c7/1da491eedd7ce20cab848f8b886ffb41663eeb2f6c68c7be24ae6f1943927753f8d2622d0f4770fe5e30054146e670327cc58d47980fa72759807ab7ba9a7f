import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { atRuleParamIndex } from "../../utils/atRuleParamIndex/index.js"
import { findMediaOperator } from "../../utils/findMediaOperator/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `media-feature-range-operator-space-before`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedBefore: () => `Expected single space before range operator`,
	rejectedBefore: () => `Unexpected whitespace before range operator`,
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
				const problemIndex = match.startIndex - 1 + atRuleParamIndex(node)

				// The extra `+ 1` is because the match itself contains the character before the operator
				checker.before({
					source: params,
					index: match.startIndex,
					err: (message) => {
						report({
							message,
							node,
							index: problemIndex,
							endIndex: problemIndex,
							result,
							ruleName,
							fix () {
								fixOperatorIndices.push(match.startIndex)
							},
						})
					},
				})
			})

			if (fixOperatorIndices.length > 0) {
				let params = atRule.raws.params ? atRule.raws.params.raw : atRule.params

				for (let index of fixOperatorIndices.toSorted((a, b) => b - a)) {
					let beforeOperator = params.slice(0, index)
					let afterOperator = params.slice(index)

					if (primary === `always`) params = beforeOperator.replace(/\s*$/, ` `) + afterOperator
					else if (primary === `never`) params = beforeOperator.replace(/\s*$/, ``) + afterOperator
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
