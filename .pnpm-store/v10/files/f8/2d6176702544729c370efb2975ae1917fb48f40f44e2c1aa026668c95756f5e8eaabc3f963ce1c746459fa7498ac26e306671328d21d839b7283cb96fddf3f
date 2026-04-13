import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { functionCommaSpaceChecker } from "../../utils/functionCommaSpaceChecker/index.js"
import { functionCommaSpaceFix } from "../../utils/functionCommaSpaceFix/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { ruleMessages, validateOptions } } = stylelint

let shortName = `function-comma-space-after`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedAfter: () => `Expected single space after ","`,
	rejectedAfter: () => `Unexpected whitespace after ","`,
	expectedAfterSingleLine: () => `Expected single space after "," in a single-line function`,
	rejectedAfterSingleLine: () => `Unexpected whitespace after "," in a single-line function`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Requires a single space or disallows whitespace after the commas of functions.
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
			locationChecker: checker.after,
			checkedRuleName: ruleName,
			fix: (div, index, nodes) => functionCommaSpaceFix({
				div,
				index,
				nodes,
				expectation: primary,
				position: `after`,
				symb: ` `,
			}),
		})
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
