import styleSearch from "style-search"
import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { optionsMatches } from "../../utils/optionsMatches/index.js"
import { isNumber } from "../../utils/validateTypes/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `max-empty-lines`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expected: (max) => `Expected no more than ${max} empty ${max === 1 ? `line` : `lines`}`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Limits the number of adjacent empty lines.
 * @type {import('stylelint').Rule}
 */
function rule (primary, secondaryOptions) {
	let emptyLines = 0
	let lastIndex = -1

	return (root, result) => {
		let validOptions = validateOptions(
			result,
			ruleName,
			{
				actual: primary,
				possible: isNumber,
			},
			{
				actual: secondaryOptions,
				possible: {
					ignore: [`comments`],
				},
				optional: true,
			},
		)

		if (!validOptions) return

		let ignoreComments = optionsMatches(secondaryOptions, `ignore`, `comments`)
		let getChars = replaceEmptyLines.bind(null, primary)

		/**
		 * 1. walk nodes & replace enterchar
		 * 2. deal with special case.
		 */
		function fix () {
			root.walk((node) => {
				if (node.type === `comment` && !ignoreComments) {
					node.raws.left = getChars(node.raws.left)
					node.raws.right = getChars(node.raws.right)
				}

				if (node.raws.before) node.raws.before = getChars(node.raws.before)
			})

			// first node
			let firstNodeRawsBefore = root.first && root.first.raws.before
			// root raws
			let rootRawsAfter = root.raws.after

			// not document node
			// @ts-expect-error -- TS2339: Property 'document' does not exist on type 'Root'.
			if ((root.document && root.document.constructor.name) !== `Document`) {
				if (firstNodeRawsBefore) root.first.raws.before = getChars(firstNodeRawsBefore, true)

				if (rootRawsAfter) {
					// when max set 0, should be treated as 1 in this situation.
					root.raws.after = replaceEmptyLines(primary === 0 ? 1 : primary, rootRawsAfter, true)
				}
			}
			else if (rootRawsAfter) {
				// `css in js` or `html`
				root.raws.after = replaceEmptyLines(primary === 0 ? 1 : primary, rootRawsAfter)
			}
		}

		emptyLines = 0
		lastIndex = -1

		let rootString = root.toString()

		styleSearch(
			{
				source: rootString,
				target: (/\r\n/).test(rootString) ? `\r\n` : `\n`,
				comments: ignoreComments ? `skip` : `check`,
			},
			(match) => {
				checkMatch(rootString, match.startIndex, match.endIndex, root)
			},
		)

		/**
		 * Checks a match for empty line violations.
		 * @param {string} source - The source string.
		 * @param {number} matchStartIndex - The start index of the match.
		 * @param {number} matchEndIndex - The end index of the match.
		 * @param {import('postcss').Root} node - The root node.
		 */
		function checkMatch (source, matchStartIndex, matchEndIndex, node) {
			let eof = matchEndIndex === source.length
			let problem = false

			// Additional check for beginning of file
			if (!matchStartIndex || lastIndex === matchStartIndex) emptyLines += 1
			else emptyLines = 0

			lastIndex = matchEndIndex

			if (emptyLines > primary) problem = true

			if (!eof && !problem) return

			if (problem) {
				report({
					message: messages.expected,
					messageArgs: [primary],
					node,
					index: matchStartIndex,
					endIndex: matchStartIndex,
					result,
					ruleName,
					fix,
				})
			}

			// Additional check for end of file
			if (eof && primary) {
				emptyLines += 1

				if (emptyLines > primary && isEofNode(result.root, node)) {
					report({
						message: messages.expected,
						messageArgs: [primary],
						node,
						index: matchEndIndex,
						endIndex: matchEndIndex,
						result,
						ruleName,
						fix,
					})
				}
			}
		}
	}
}

/**
 * Replaces excessive empty lines in a string with the allowed maximum.
 * @param {number} maxLines - The maximum number of allowed adjacent empty lines.
 * @param {unknown} str - The string to process.
 * @param {boolean} [isSpecialCase] - Whether this is a special case (end of file).
 * @returns {string} The string with excessive empty lines replaced.
 */
function replaceEmptyLines (maxLines, str, isSpecialCase = false) {
	let repeatTimes = isSpecialCase ? maxLines : maxLines + 1

	if (repeatTimes === 0 || typeof str !== `string`) return ``

	let emptyLFLines = `\n`.repeat(repeatTimes)
	let emptyCRLFLines = `\r\n`.repeat(repeatTimes)

	return (/(?:\r\n)+/).test(str)
		? str.replaceAll(/(\r\n)+/g, ($1) => {
			if ($1.length / 2 > repeatTimes) return emptyCRLFLines

			return $1
		})
		: str.replaceAll(/(\n)+/g, ($1) => {
			if ($1.length > repeatTimes) return emptyLFLines

			return $1
		})
}

/**
 * Checks whether the given node is the last node of file.
 * @param {import('stylelint').PostcssResult['root']} document - The document node with `postcss-html` and `postcss-jsx`.
 * @param {import('postcss').Root} root - The root node of CSS.
 * @returns {boolean} True if the node is the last node of file, false otherwise.
 */
function isEofNode (document, root) {
	if (!document || document.constructor.name !== `Document` || !(`type` in document)) return true

	// In the `postcss-html` and `postcss-jsx` syntax, checks that there is text after the given node.
	let after

	if (root === document.last) after = document.raws && document.raws.codeAfter
	else {
		// @ts-expect-error -- TS2345: Argument of type 'Root' is not assignable to parameter of type 'number | ChildNode'.
		let rootIndex = document.index(root)

		let nextNode = document.nodes[rootIndex + 1]

		after = nextNode && nextNode.raws && nextNode.raws.codeBefore
	}

	return !String(after).trim()
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
