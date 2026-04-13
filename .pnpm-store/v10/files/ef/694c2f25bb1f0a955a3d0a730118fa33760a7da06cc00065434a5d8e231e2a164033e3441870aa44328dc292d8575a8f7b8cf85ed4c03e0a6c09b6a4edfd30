import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { selectorAttributeOperatorSpaceChecker } from "../../utils/selectorAttributeOperatorSpaceChecker/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { ruleMessages, validateOptions } } = stylelint

let shortName = `selector-attribute-operator-space-after`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedAfter: (operator) => `Expected single space after "${operator}"`,
	rejectedAfter: (operator) => `Unexpected whitespace after "${operator}"`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/** @type {import('stylelint').Rule} */
function rule (primary) {
	return (root, result) => {
		let checker = whitespaceChecker(`space`, primary, messages)
		let validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [`always`, `never`],
		})

		if (!validOptions) return

		selectorAttributeOperatorSpaceChecker({
			root,
			result,
			locationChecker: checker.after,
			checkedRuleName: ruleName,
			checkBeforeOperator: false,
			fix: (attributeNode) => {
				/** @type {{ operatorAfter: string, setOperatorAfter: (fixed: string) => void }} */
				let { operatorAfter, setOperatorAfter } = (() => {
					let rawOperator = attributeNode.raws.operator

					if (rawOperator) {
						return {
							operatorAfter: rawOperator.slice(
								attributeNode.operator ? attributeNode.operator.length : 0,
							),
							setOperatorAfter (fixed) {
								delete attributeNode.raws.operator

								if (!attributeNode.raws.spaces) attributeNode.raws.spaces = {}

								if (!attributeNode.raws.spaces.operator) attributeNode.raws.spaces.operator = {}

								attributeNode.raws.spaces.operator.after = fixed
							},
						}
					}

					let rawSpacesOperator = attributeNode.raws.spaces && attributeNode.raws.spaces.operator
					let rawOperatorAfter = rawSpacesOperator && rawSpacesOperator.after

					if (rawOperatorAfter) {
						return {
							operatorAfter: rawOperatorAfter,
							setOperatorAfter (fixed) {
								rawSpacesOperator.after = fixed
							},
						}
					}

					return {
						operatorAfter: (attributeNode.spaces.operator && attributeNode.spaces.operator.after) || ``,
						setOperatorAfter (fixed) {
							if (!attributeNode.spaces.operator) attributeNode.spaces.operator = {}

							attributeNode.spaces.operator.after = fixed
						},
					}
				})()

				if (primary === `always`) {
					setOperatorAfter(operatorAfter.replace(/^\s*/, ` `))

					return true
				}

				if (primary === `never`) {
					setOperatorAfter(operatorAfter.replace(/^\s*/, ``))

					return true
				}

				return false
			},
		})
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
