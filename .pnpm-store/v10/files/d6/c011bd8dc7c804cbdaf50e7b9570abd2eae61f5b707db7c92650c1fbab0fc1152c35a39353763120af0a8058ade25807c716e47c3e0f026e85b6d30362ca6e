import valueParser from "postcss-value-parser"
import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { declarationValueIndex } from "../../utils/declarationValueIndex/index.js"
import { getDeclarationValue } from "../../utils/getDeclarationValue/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { setDeclarationValue } from "../../utils/setDeclarationValue/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `color-hex-case`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

const HEX = /^#[\da-z]+/i
const CONTAINS_HEX = /#[\da-z]+/i
const IGNORED_FUNCTIONS = new Set([`url`])

/**
 * Enforces lowercase or uppercase case for hex color values.
 * @type {import('stylelint').Rule}
 */
function rule (primary) {
	return (root, result) => {
		let validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [`lower`, `upper`],
		})

		if (!validOptions) return

		root.walkDecls((decl) => {
			if (!CONTAINS_HEX.test(decl.value)) return

			let parsedValue = valueParser(getDeclarationValue(decl))
			let needsFix = false

			parsedValue.walk((node) => {
				let { value } = node

				if (isIgnoredFunction(node)) return false

				if (!isHexColor(node)) return

				let expected = primary === `lower` ? value.toLowerCase() : value.toUpperCase()

				if (value === expected) return

				const problemIndex = declarationValueIndex(decl) + node.sourceIndex

				report({
					message: messages.expected,
					messageArgs: [value, expected],
					node: decl,
					index: problemIndex,
					endIndex: problemIndex,
					result,
					ruleName,
					fix () {
						node.value = expected
						needsFix = true
					},
				})
			})

			if (needsFix) setDeclarationValue(decl, parsedValue.toString())
		})
	}
}

/**
 * Checks if a node is an ignored function (e.g., url()).
 * @param {import('postcss-value-parser').Node} node - The value parser node to check.
 * @returns {boolean} True if the node is an ignored function, false otherwise.
 */
function isIgnoredFunction ({ type, value }) {
	return type === `function` && IGNORED_FUNCTIONS.has(value.toLowerCase())
}

/**
 * Checks if a node is a hex color value.
 * @param {import('postcss-value-parser').Node} node - The value parser node to check.
 * @returns {boolean} True if the node is a hex color, false otherwise.
 */
function isHexColor ({ type, value }) {
	return type === `word` && HEX.test(value)
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
