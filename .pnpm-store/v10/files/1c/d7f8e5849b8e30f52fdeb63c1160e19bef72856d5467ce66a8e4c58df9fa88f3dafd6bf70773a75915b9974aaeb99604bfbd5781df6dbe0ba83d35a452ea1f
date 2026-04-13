import stylelint from "stylelint"

import { levelOneAndTwoPseudoElements } from "../../reference/selectors.js"
import { addNamespace } from "../../utils/addNamespace/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { isStandardSyntaxRule } from "../../utils/isStandardSyntaxRule/index.js"
import { isStandardSyntaxSelector } from "../../utils/isStandardSyntaxSelector/index.js"
import { parseSelector } from "../../utils/parseSelector/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `selector-pseudo-class-case`

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

		root.walkRules((ruleNode) => {
			if (!isStandardSyntaxRule(ruleNode)) return

			let selector = ruleNode.selector

			if (!selector.includes(`:`)) return

			let fixedSelector = parseSelector(
				ruleNode.raws.selector ? ruleNode.raws.selector.raw : ruleNode.selector,
				result,
				ruleNode,
				(selectorTree) => {
					selectorTree.walkPseudos((pseudoNode) => {
						let pseudo = pseudoNode.value

						if (!isStandardSyntaxSelector(pseudo)) return

						if (pseudo.includes(`::`) || levelOneAndTwoPseudoElements.has(pseudo.toLowerCase().slice(1))) return

						let expectedPseudo = primary === `lower` ? pseudo.toLowerCase() : pseudo.toUpperCase()

						if (pseudo === expectedPseudo) return

						report({
							message: messages.expected,
							messageArgs: [pseudo, expectedPseudo],
							node: ruleNode,
							index: pseudoNode.sourceIndex,
							endIndex: pseudoNode.sourceIndex,
							ruleName,
							result,
							fix () {
								pseudoNode.value = expectedPseudo
							},
						})
					})
				},
			)

			if (fixedSelector) {
				if (ruleNode.raws.selector) ruleNode.raws.selector.raw = fixedSelector
				else ruleNode.selector = fixedSelector
			}
		})
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
