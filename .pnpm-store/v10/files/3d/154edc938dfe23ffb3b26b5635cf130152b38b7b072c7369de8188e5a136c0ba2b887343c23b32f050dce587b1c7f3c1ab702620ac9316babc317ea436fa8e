import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { selectorCombinatorSpaceChecker } from "../../utils/selectorCombinatorSpaceChecker/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { ruleMessages, validateOptions } } = stylelint

let shortName = `selector-combinator-space-before`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedBefore: (combinator) => `Expected single space before "${combinator}"`,
	rejectedBefore: (combinator) => `Unexpected whitespace before "${combinator}"`,
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

		selectorCombinatorSpaceChecker({
			root,
			result,
			locationChecker: checker.before,
			locationType: `before`,
			checkedRuleName: ruleName,
			fix: (combinator) => {
				if (primary === `always`) {
					combinator.spaces.before = ` `

					return true
				}

				if (primary === `never`) {
					combinator.spaces.before = ``

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
