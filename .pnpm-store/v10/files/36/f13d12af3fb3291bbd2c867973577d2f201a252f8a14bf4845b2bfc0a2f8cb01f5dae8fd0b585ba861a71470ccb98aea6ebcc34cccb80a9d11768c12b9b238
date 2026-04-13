import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { functionCommaSpaceChecker } from "../../utils/functionCommaSpaceChecker/index.js"
import { functionCommaSpaceFix } from "../../utils/functionCommaSpaceFix/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { ruleMessages, validateOptions } } = stylelint

let shortName = `function-comma-space-before`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedBefore: () => `Expected single space before ","`,
	rejectedBefore: () => `Unexpected whitespace before ","`,
	expectedBeforeSingleLine: () => `Expected single space before "," in a single-line function`,
	rejectedBeforeSingleLine: () => `Unexpected whitespace before "," in a single-line function`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Requires a single space or disallows whitespace before the commas of functions.
 * @type {import('stylelint').Rule}
 */
function rule (primary) {
	let checker = whitespaceChecker(`space`, primary, messages)

	return (root, result) => {
		let validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [`always`, `never`, `always-single-line`, `never-single-line`],
		})

		if (!validOptions) return

		functionCommaSpaceChecker({
			root,
			result,
			locationChecker: checker.before,
			checkedRuleName: ruleName,
			fix: (div, index, nodes) => functionCommaSpaceFix({
				div,
				index,
				nodes,
				expectation: primary,
				position: `before`,
				symb: ` `,
			}),
		})
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
