import styleSearch from "style-search"
import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { isStandardSyntaxAtRule } from "../../utils/isStandardSyntaxAtRule/index.js"
import { isStandardSyntaxRule } from "../../utils/isStandardSyntaxRule/index.js"
import { isAtRule } from "../../utils/typeGuards/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `no-extra-semicolons`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	rejected: `Unexpected extra semicolon`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Gets the offset by node.
 * @param {import('postcss').Node} node - The PostCSS node.
 * @returns {number} The offset index.
 */
function getOffsetByNode (node) {
	// @ts-expect-error -- TS2339: Property 'document' does not exist on type 'Document | Container<ChildNode>'
	if (node.parent && node.parent.document) return 0

	let root = node.root()

	if (!root.source) throw new Error(`The root node must have a source`)

	if (!node.source) throw new Error(`The node must have a source`)

	if (!node.source.start) throw new Error(`The source must have a start position`)

	let string = root.source.input.css
	let nodeColumn = node.source.start.column
	let nodeLine = node.source.start.line
	let line = 1
	let column = 1
	let index = 0

	for (let i = 0; i < string.length; i += 1) {
		if (column === nodeColumn && nodeLine === line) {
			index = i
			break
		}

		if (string[i] === `\n`) {
			column = 1
			line += 1
		}
		else column += 1
	}

	return index
}

/**
 * Disallows extra semicolons.
 * @type {import('stylelint').Rule}
 */
function rule (primary) {
	return (root, result) => {
		let validOptions = validateOptions(result, ruleName, { actual: primary })

		if (!validOptions) return

		let fix = null

		if (root.raws.after && root.raws.after.trim().length > 0) {
			let rawAfterRoot = root.raws.after

			/** @type {number[]} */
			let fixSemiIndices = []

			styleSearch({ source: rawAfterRoot, target: `;` }, (match) => {
				fix = () => {
					fixSemiIndices.push(match.startIndex)
				}

				if (!root.source) throw new Error(`The root node must have a source`)

				complain(root.source.input.css.length - rawAfterRoot.length + match.startIndex)
			})

			// fix
			if (fixSemiIndices.length > 0) root.raws.after = removeIndices(rawAfterRoot, fixSemiIndices)
		}

		root.walk((node) => {
			if (isAtRule(node) && !isStandardSyntaxAtRule(node)) return

			if (node.type === `rule` && !isStandardSyntaxRule(node)) return

			if (node.raws.before && node.raws.before.trim().length > 0) {
				let rawBeforeNode = node.raws.before
				let allowedSemi = 0

				let rawBeforeIndexStart = 0

				/** @type {number[]} */
				let fixSemiIndices = []

				styleSearch({ source: rawBeforeNode, target: `;` }, (match, count) => {
					if (count === allowedSemi) return

					fix = () => {
						fixSemiIndices.push(match.startIndex - rawBeforeIndexStart)
					}

					complain(getOffsetByNode(node) - rawBeforeNode.length + match.startIndex)
				})

				// fix
				if (fixSemiIndices.length > 0) node.raws.before = removeIndices(rawBeforeNode, fixSemiIndices)
			}

			if (typeof node.raws.after === `string` && node.raws.after.trim().length > 0) {
				let rawAfterNode = node.raws.after

				// If the last child is a Less mixin followed by more than one semicolon, node.raws.after will be populated with that semicolon. Since we ignore Less mixins, exit here
				if (`last` in node && node.last && node.last.type === `atrule` && !isStandardSyntaxAtRule(node.last)) return

				/** @type {number[]} */
				let fixSemiIndices = []

				styleSearch({ source: rawAfterNode, target: `;` }, (match) => {
					fix = () => {
						fixSemiIndices.push(match.startIndex)
					}

					let index = getOffsetByNode(node) + node.toString().length - 1 - rawAfterNode.length + match.startIndex

					complain(index)
				})

				// fix
				if (fixSemiIndices.length > 0) node.raws.after = removeIndices(rawAfterNode, fixSemiIndices)
			}

			if (typeof node.raws.ownSemicolon === `string`) {
				let rawOwnSemicolon = node.raws.ownSemicolon
				let allowedSemi = 0

				/** @type {number[]} */
				let fixSemiIndices = []

				styleSearch({ source: rawOwnSemicolon, target: `;` }, (match, count) => {
					if (count === allowedSemi) return

					fix = () => {
						fixSemiIndices.push(match.startIndex)
					}

					let index = getOffsetByNode(node) + node.toString().length - rawOwnSemicolon.length + match.startIndex

					complain(index)
				})

				// fix
				if (fixSemiIndices.length > 0) node.raws.ownSemicolon = removeIndices(rawOwnSemicolon, fixSemiIndices)
			}
		})

		/**
		 * Reports an extra semicolon violation.
		 * @param {number} index - The index of the violation.
		 */
		function complain (index) {
			report({
				message: messages.rejected,
				node: root,
				index,
				endIndex: index,
				result,
				ruleName,
				fix,
			})
		}
	}
}

/**
 * Removes characters at the specified indices from a string.
 * @param {string} str - The input string.
 * @param {number[]} indices - The indices to remove.
 * @returns {string} The string with characters removed.
 */
function removeIndices (str, indices) {
	let result = str

	for (let index of indices.toReversed()) result = result.slice(0, index) + result.slice(index + 1)

	return result
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
