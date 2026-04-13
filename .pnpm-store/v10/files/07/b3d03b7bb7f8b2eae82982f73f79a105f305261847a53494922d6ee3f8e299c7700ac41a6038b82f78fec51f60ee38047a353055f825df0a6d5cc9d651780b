import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { selectorAttributeOperatorSpaceChecker } from "../../utils/selectorAttributeOperatorSpaceChecker/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { ruleMessages, validateOptions } } = stylelint

let shortName = `selector-attribute-operator-space-before`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedBefore: (operator) => `Expected single space before "${operator}"`,
	rejectedBefore: (operator) => `Unexpected whitespace before "${operator}"`,
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

		selectorAttributeOperatorSpaceChecker({
			root,
			result,
			locationChecker: checker.before,
			checkedRuleName: ruleName,
			checkBeforeOperator: true,
			fix: (attributeNode) => {
				let rawAttr = attributeNode.raws.spaces && attributeNode.raws.spaces.attribute
				let rawAttrAfter = rawAttr && rawAttr.after

				/** @type {{ attrAfter: string, setAttrAfter: (fixed: string) => void }} */
				let { attrAfter, setAttrAfter } = rawAttrAfter
					? {
						attrAfter: rawAttrAfter,
						setAttrAfter (fixed) {
							rawAttr.after = fixed
						},
					}
					: {
						attrAfter: (attributeNode.spaces.attribute && attributeNode.spaces.attribute.after) || ``,
						setAttrAfter (fixed) {
							if (!attributeNode.spaces.attribute) attributeNode.spaces.attribute = {}

							attributeNode.spaces.attribute.after = fixed
						},
					}

				if (primary === `always`) {
					setAttrAfter(attrAfter.replace(/\s*$/, ` `))

					return true
				}

				if (primary === `never`) {
					setAttrAfter(attrAfter.replace(/\s*$/, ``))

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
