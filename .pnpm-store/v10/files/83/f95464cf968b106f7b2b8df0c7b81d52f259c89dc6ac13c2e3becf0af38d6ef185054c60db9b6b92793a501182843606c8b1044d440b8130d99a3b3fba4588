import valueParser from "postcss-value-parser"
import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { getDeclarationValue } from "../../utils/getDeclarationValue/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { setDeclarationValue } from "../../utils/setDeclarationValue/index.js"
import { isNumber } from "../../utils/validateTypes/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `function-max-empty-lines`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expected: (max) => `Expected no more than ${max} empty ${max === 1 ? `line` : `lines`}`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Gets the index of the start of a declaration's value.
 * @param {import('postcss').Declaration} decl - The CSS declaration node.
 * @returns {number} The index of the start of the declaration's value.
 */
function placeIndexOnValueStart (decl) {
	if (decl.raws.between === null) throw new Error(`\`between\` must be present`)

	return decl.prop.length + decl.raws.between.length - 1
}

/**
 * Limits the number of adjacent empty lines within functions.
 * @type {import('stylelint').Rule}
 */
function rule (primary) {
	let maxAdjacentNewlines = primary + 1

	return (root, result) => {
		let validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: isNumber,
		})

		if (!validOptions) return

		let violatedCRLFNewLinesRegex = new RegExp(`(?:\r\n){${maxAdjacentNewlines + 1},}`)
		let violatedLFNewLinesRegex = new RegExp(`\n{${maxAdjacentNewlines + 1},}`)
		let allowedLFNewLinesString = `\n`.repeat(maxAdjacentNewlines)
		let allowedCRLFNewLinesString = `\r\n`.repeat(maxAdjacentNewlines)

		root.walkDecls((decl) => {
			if (!decl.value.includes(`(`)) return

			let stringValue = getDeclarationValue(decl)

			/** @type {Array<[string, string]>} */
			let splittedValue = []
			let sourceIndexStart = 0

			valueParser(stringValue).walk((node) => {
				// ignore non functions or sass lists
				if (node.type !== `function` || node.value.length === 0) return

				let stringifiedNode = valueParser.stringify(node)

				if (!violatedLFNewLinesRegex.test(stringifiedNode) && !violatedCRLFNewLinesRegex.test(stringifiedNode)) return

				const problemIndex = placeIndexOnValueStart(decl) + node.sourceIndex

				report({
					message: messages.expected,
					messageArgs: [primary],
					node: decl,
					index: problemIndex,
					endIndex: problemIndex,
					result,
					ruleName,
					fix () {
						let newNodeString = stringifiedNode
							.replaceAll(new RegExp(violatedLFNewLinesRegex, `gm`), allowedLFNewLinesString)
							.replaceAll(new RegExp(violatedCRLFNewLinesRegex, `gm`), allowedCRLFNewLinesString)

						splittedValue.push([
							stringValue.slice(sourceIndexStart, node.sourceIndex),
							newNodeString,
						])
						sourceIndexStart = node.sourceIndex + stringifiedNode.length
					},
				})
			})

			if (splittedValue.length > 0) {
				let updatedValue = splittedValue.reduce((acc, curr) => acc + curr[0] + curr[1], ``) + stringValue.slice(sourceIndexStart)

				setDeclarationValue(decl, updatedValue)
			}
		})
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
