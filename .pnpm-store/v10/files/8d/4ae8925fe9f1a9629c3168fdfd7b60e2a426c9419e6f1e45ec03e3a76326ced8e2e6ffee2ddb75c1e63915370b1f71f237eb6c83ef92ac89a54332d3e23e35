import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { isStandardSyntaxRule } from "../../utils/isStandardSyntaxRule/index.js"
import { parseSelector } from "../../utils/parseSelector/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `selector-descendant-combinator-no-non-space`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	rejected: (nonSpaceCharacter) => `Unexpected "${nonSpaceCharacter}"`,
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
		})

		if (!validOptions) return

		root.walkRules((ruleNode) => {
			if (!isStandardSyntaxRule(ruleNode)) return

			let hasFixed = false
			let selector = ruleNode.raws.selector ? ruleNode.raws.selector.raw : ruleNode.selector

			// Return early for selectors containing comments
			// TODO: re-enable when parser and stylelint are compatible
			if (selector.includes(`/*`)) return

			let fixedSelector = parseSelector(selector, result, ruleNode, (fullSelector) => {
				fullSelector.walkCombinators((combinatorNode) => {
					if (combinatorNode.value !== ` `) return

					let value = combinatorNode.toString()

					if (value.includes(`  `) || value.includes(`\t`) || value.includes(`\n`) || value.includes(`\r`)) {
						report({
							result,
							ruleName,
							message: messages.rejected,
							messageArgs: [value],
							node: ruleNode,
							index: combinatorNode.sourceIndex,
							endIndex: combinatorNode.sourceIndex,
							fix () {
								if ((/^\s+$/).test(value)) {
									hasFixed = true

									if (!combinatorNode.raws) combinatorNode.raws = {}

									combinatorNode.raws.value = ` `
									combinatorNode.rawSpaceBefore = combinatorNode.rawSpaceBefore.replace(/^\s+/, ``)
									combinatorNode.rawSpaceAfter = combinatorNode.rawSpaceAfter.replace(/\s+$/, ``)
								}
							},
						})
					}
				})
			})

			if (hasFixed && fixedSelector) {
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
