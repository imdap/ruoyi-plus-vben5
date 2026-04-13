import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { selectorListCommaWhitespaceChecker } from "../../utils/selectorListCommaWhitespaceChecker/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { ruleMessages, validateOptions } } = stylelint

let shortName = `selector-list-comma-space-before`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedBefore: () => `Expected single space before ","`,
	rejectedBefore: () => `Unexpected whitespace before ","`,
	expectedBeforeSingleLine: () => `Expected single space before "," in a single-line list`,
	rejectedBeforeSingleLine: () => `Unexpected whitespace before "," in a single-line list`,
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
			possible: [`always`, `never`, `always-single-line`, `never-single-line`],
		})

		if (!validOptions) return

		/** @type {Map<import('postcss').Rule, number[]> | undefined} */
		let fixData

		selectorListCommaWhitespaceChecker({
			root,
			result,
			locationChecker: checker.before,
			checkedRuleName: ruleName,
			fix: (ruleNode, index) => {
				fixData = fixData || (new Map())

				let commaIndices = fixData.get(ruleNode) || []

				commaIndices.push(index)
				fixData.set(ruleNode, commaIndices)

				return true
			},
		})

		if (fixData) {
			for (let [ruleNode, commaIndices] of fixData.entries()) {
				let selector = ruleNode.raws.selector ? ruleNode.raws.selector.raw : ruleNode.selector

				for (let index of commaIndices.toSorted((a, b) => b - a)) {
					let beforeSelector = selector.slice(0, index)
					let afterSelector = selector.slice(index)

					if (primary.includes(`always`)) beforeSelector = beforeSelector.replace(/\s*$/, ` `)
					else if (primary.includes(`never`)) beforeSelector = beforeSelector.replace(/\s*$/, ``)

					selector = beforeSelector + afterSelector
				}

				if (ruleNode.raws.selector) ruleNode.raws.selector.raw = selector
				else ruleNode.selector = selector
			}
		}
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
