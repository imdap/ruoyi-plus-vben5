import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { atRuleParamIndex } from "../../utils/atRuleParamIndex/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { mediaFeatureColonSpaceChecker } from "../../utils/mediaFeatureColonSpaceChecker/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { ruleMessages, validateOptions } } = stylelint

let shortName = `media-feature-colon-space-before`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedBefore: () => `Expected single space before ":"`,
	rejectedBefore: () => `Unexpected whitespace before ":"`,
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

		/** @type {Map<import('postcss').AtRule, number[]> | undefined} */
		let fixData

		mediaFeatureColonSpaceChecker({
			root,
			result,
			locationChecker: checker.before,
			checkedRuleName: ruleName,
			fix: (atRule, index) => {
				let paramColonIndex = index - atRuleParamIndex(atRule)

				fixData = fixData || (new Map())

				let colonIndices = fixData.get(atRule) || []

				colonIndices.push(paramColonIndex)
				fixData.set(atRule, colonIndices)

				return true
			},
		})

		if (fixData) {
			for (let [atRule, colonIndices] of fixData.entries()) {
				let params = atRule.raws.params ? atRule.raws.params.raw : atRule.params

				for (let index of colonIndices.toSorted((a, b) => b - a)) {
					let beforeColon = params.slice(0, index)
					let afterColon = params.slice(index)

					if (primary === `always`) params = beforeColon.replace(/\s*$/, ` `) + afterColon
					else if (primary === `never`) params = beforeColon.replace(/\s*$/, ``) + afterColon
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
