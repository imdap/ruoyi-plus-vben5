import { mutateIdent } from "@csstools/css-tokenizer"
import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { atRuleParamIndex } from "../../utils/atRuleParamIndex/index.js"
import { findMediaFeatureNames } from "../../utils/findMediaFeatureNames/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { isCustomMediaQuery } from "../../utils/isCustomMediaQuery/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `media-feature-name-case`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/** @type {import('stylelint').Rule} */
function rule (primary) {
	return (root, result) => {
		let validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [`lower`, `upper`],
		})

		if (!validOptions) return

		root.walkAtRules(/^media$/i, (atRule) => {
			let hasComments = atRule.raws.params?.raw
			let mediaRule = hasComments ? hasComments : atRule.params

			let hasFixes = false

			mediaRule = findMediaFeatureNames(mediaRule, (mediaFeatureNameToken) => {
				let [, , startIndex, endIndex, { value: featureName }] = mediaFeatureNameToken

				if (isCustomMediaQuery(featureName)) return

				let expectedFeatureName = primary === `lower` ? featureName.toLowerCase() : featureName.toUpperCase()

				if (featureName === expectedFeatureName) return

				let atRuleIndex = atRuleParamIndex(atRule)

				report({
					message: messages.expected,
					messageArgs: [featureName, expectedFeatureName],
					node: atRule,
					index: atRuleIndex + startIndex,
					endIndex: atRuleIndex + endIndex + 1,
					ruleName,
					result,
					fix () {
						mutateIdent(mediaFeatureNameToken, expectedFeatureName)
						hasFixes = true
					},
				})
			}).stringify()

			if (hasFixes) {
				if (hasComments) {
					if (atRule.raws.params === null) throw new Error(`The \`AtRuleRaws\` node must have a \`params\` property`)

					atRule.raws.params.raw = mediaRule
				}
				else atRule.params = mediaRule
			}
		})
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
