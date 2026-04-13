import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { atRuleParamIndex } from "../../utils/atRuleParamIndex/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { mediaQueryListCommaWhitespaceChecker } from "../../utils/mediaQueryListCommaWhitespaceChecker/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { ruleMessages, validateOptions } } = stylelint

let shortName = `media-query-list-comma-newline-after`

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

		// Only check for the newline after the comma, while allowing
		// arbitrary indentation after the newline
		/** @type {Map<import('postcss').AtRule, number[]> | undefined} */
		let fixData

		mediaQueryListCommaWhitespaceChecker({
			root,
			result,
			locationChecker: checker.afterOneOnly,
			checkedRuleName: ruleName,
			allowTrailingComments: primary.startsWith(`always`),
			fix: (atRule, index) => {
				let paramCommaIndex = index - atRuleParamIndex(atRule)

				fixData = fixData || (new Map())

				let commaIndices = fixData.get(atRule) || []

				commaIndices.push(paramCommaIndex)
				fixData.set(atRule, commaIndices)

				return true
			},
		})

		if (fixData) {
			for (let [atRule, commaIndices] of fixData.entries()) {
				let params = atRule.raws.params ? atRule.raws.params.raw : atRule.params

				for (let index of commaIndices.toSorted((a, b) => b - a)) {
					let beforeComma = params.slice(0, index + 1)
					let afterComma = params.slice(index + 1)

					if (primary.startsWith(`always`)) params = (/^\s*\n/).test(afterComma) ? beforeComma + afterComma.replace(/^[^\S\r\n]*/, ``) : beforeComma + context.newline + afterComma
					else if (primary.startsWith(`never`)) params = beforeComma + afterComma.replace(/^\s*/, ``)
				}

				if (atRule.raws.params) atRule.raws.params.raw = params
				else atRule.params = params
			}
		}
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
