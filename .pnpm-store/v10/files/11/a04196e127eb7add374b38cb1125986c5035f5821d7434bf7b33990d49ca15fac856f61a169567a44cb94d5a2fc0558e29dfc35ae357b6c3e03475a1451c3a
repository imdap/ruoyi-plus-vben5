import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { functionCommaSpaceChecker } from "../../utils/functionCommaSpaceChecker/index.js"
import { functionCommaSpaceFix } from "../../utils/functionCommaSpaceFix/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { ruleMessages, validateOptions } } = stylelint

let shortName = `function-comma-newline-after`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedAfter: () => `Expected newline after ","`,
	expectedAfterMultiLine: () => `Expected newline after "," in a multi-line function`,
	rejectedAfterMultiLine: () => `Unexpected whitespace after "," in a multi-line function`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Requires a newline or disallows whitespace after the commas of functions.
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

		functionCommaSpaceChecker({
			root,
			result,
			locationChecker: checker.afterOneOnly,
			checkedRuleName: ruleName,
			fix: (div, index, nodes) => functionCommaSpaceFix({
				div,
				index,
				nodes,
				expectation: primary,
				position: `after`,
				symb: context.newline || ``,
			}),
		})
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
