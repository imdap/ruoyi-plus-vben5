import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { functionCommaSpaceChecker } from "../../utils/functionCommaSpaceChecker/index.js"
import { functionCommaSpaceFix } from "../../utils/functionCommaSpaceFix/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { ruleMessages, validateOptions } } = stylelint

let shortName = `function-comma-newline-before`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedBefore: () => `Expected newline before ","`,
	expectedBeforeMultiLine: () => `Expected newline before "," in a multi-line function`,
	rejectedBeforeMultiLine: () => `Unexpected whitespace before "," in a multi-line function`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Requires a newline or disallows whitespace before the commas of functions.
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
			locationChecker: checker.beforeAllowingIndentation,
			checkedRuleName: ruleName,
			fix: (div, index, nodes) => functionCommaSpaceFix({
				div,
				index,
				nodes,
				expectation: primary,
				position: `before`,
				symb: context.newline || ``,
			}),
		})
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
