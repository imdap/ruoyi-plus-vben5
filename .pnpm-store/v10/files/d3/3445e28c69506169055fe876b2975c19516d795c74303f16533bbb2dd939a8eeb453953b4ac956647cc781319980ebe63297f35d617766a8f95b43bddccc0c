import styleSearch from "style-search"
import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { isOnlyWhitespace } from "../../utils/isOnlyWhitespace/index.js"
import { isStandardSyntaxComment } from "../../utils/isStandardSyntaxComment/index.js"
import { optionsMatches } from "../../utils/optionsMatches/index.js"
import { isAtRule, isComment, isDeclaration, isRule } from "../../utils/typeGuards/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `no-eol-whitespace`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	rejected: `Unexpected whitespace at end of line`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

let whitespacesToReject = new Set([` `, `\t`])

/**
 * Fixes whitespace at the end of a string.
 * @param {string} str - The string to fix.
 * @returns {string} The fixed string.
 */
function fixString (str) {
	return str.replace(/[ \t]+$/, ``)
}

/**
 * Finds the start index of EOL whitespace error.
 * @param {number} lastEOLIndex - The last end-of-line index.
 * @param {string} string - The source code string.
 * @param {{ ignoreEmptyLines: boolean, isRootFirst: boolean }} options - The options object
 * @returns {number} The error start index, or -1 if no error.
 */
function findErrorStartIndex (lastEOLIndex, string, { ignoreEmptyLines, isRootFirst }) {
	let eolWhitespaceIndex = lastEOLIndex - 1

	// If the character before newline is not whitespace, ignore
	if (!whitespacesToReject.has(string.charAt(eolWhitespaceIndex))) return -1

	if (ignoreEmptyLines) {
		// If there is only whitespace between the previous newline and
		// this newline, ignore
		let beforeNewlineIndex = string.lastIndexOf(`\n`, eolWhitespaceIndex)

		if (beforeNewlineIndex >= 0 || isRootFirst) {
			let line = string.slice(Math.max(0, beforeNewlineIndex), eolWhitespaceIndex)

			if (isOnlyWhitespace(line)) return -1
		}
	}

	return eolWhitespaceIndex
}

/**
 * Disallows end-of-line whitespace.
 * @type {import('stylelint').Rule}
 */
function rule (primary, secondaryOptions) {
	return (root, result) => {
		let validOptions = validateOptions(
			result,
			ruleName,
			{
				actual: primary,
			},
			{
				optional: true,
				actual: secondaryOptions,
				possible: {
					ignore: [`empty-lines`],
				},
			},
		)

		if (!validOptions) return

		let ignoreEmptyLines = optionsMatches(secondaryOptions, `ignore`, `empty-lines`)

		let rootString = (root.source && root.source.input.css) || ``

		/**
		 * Reports EOL whitespace violations from the specified index.
		 * @param {number} index - The index to report from.
		 */
		function reportFromIndex (index) {
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

		eachEolWhitespace(rootString, reportFromIndex, true)

		let errorIndex = findErrorStartIndex(rootString.length, rootString, {
			ignoreEmptyLines,
			isRootFirst: true,
		})

		if (errorIndex > -1) reportFromIndex(errorIndex)

		/**
		 * Iterate each whitespace at the end of each line of the given string.
		 * @param {string} string - the source code string.
		 * @param {(index: number) => void} callback - callback the whitespace index at the end of each line.
		 * @param {boolean} isRootFirst - set `true` if the given string is the first token of the root.
		 * @returns {void}
		 */
		function eachEolWhitespace (string, callback, isRootFirst) {
			styleSearch(
				{
					source: string,
					target: [`\n`, `\r`],
					comments: `check`,
				},
				(match) => {
					let index = findErrorStartIndex(match.startIndex, string, {
						ignoreEmptyLines,
						isRootFirst,
					})

					if (index > -1) callback(index)
				},
			)
		}

		function fix () {
			let isRootFirst = true

			root.walk((node) => {
				fixText(
					node.raws.before,
					(fixed) => {
						node.raws.before = fixed
					},
					isRootFirst,
				)
				isRootFirst = false

				if (isAtRule(node)) {
					fixText(node.raws.afterName, (fixed) => {
						node.raws.afterName = fixed
					})

					let rawsParams = node.raws.params

					if (rawsParams) {
						fixText(rawsParams.raw, (fixed) => {
							rawsParams.raw = fixed
						})
					}
					else {
						fixText(node.params, (fixed) => {
							node.params = fixed
						})
					}
				}

				if (isRule(node)) {
					let rawsSelector = node.raws.selector

					if (rawsSelector) {
						fixText(rawsSelector.raw, (fixed) => {
							rawsSelector.raw = fixed
						})
					}
					else {
						fixText(node.selector, (fixed) => {
							node.selector = fixed
						})
					}
				}

				if (isAtRule(node) || isRule(node) || isDeclaration(node)) {
					fixText(node.raws.between, (fixed) => {
						node.raws.between = fixed
					})
				}

				if (isDeclaration(node)) {
					let rawsValue = node.raws.value

					if (rawsValue) {
						fixText(rawsValue.raw, (fixed) => {
							rawsValue.raw = fixed
						})
					}
					else {
						fixText(node.value, (fixed) => {
							node.value = fixed
						})
					}
				}

				if (isComment(node)) {
					fixText(node.raws.left, (fixed) => {
						node.raws.left = fixed
					})

					if (isStandardSyntaxComment(node)) {
						fixText(node.raws.right, (fixed) => {
							node.raws.right = fixed
						})
					}
					else node.raws.right = node.raws.right && fixString(node.raws.right)

					fixText(node.text, (fixed) => {
						node.text = fixed
					})
				}

				if (isAtRule(node) || isRule(node)) {
					fixText(node.raws.after, (fixed) => {
						node.raws.after = fixed
					})
				}
			})

			fixText(
				root.raws.after,
				(fixed) => {
					root.raws.after = fixed
				},
				isRootFirst,
			)

			if (typeof root.raws.after === `string`) {
				let lastEOL = Math.max(
					root.raws.after.lastIndexOf(`\n`),
					root.raws.after.lastIndexOf(`\r`),
				)

				if (lastEOL !== root.raws.after.length - 1) root.raws.after = root.raws.after.slice(0, lastEOL + 1) + fixString(root.raws.after.slice(lastEOL + 1))
			}
		}

		/**
		 * Fixes EOL whitespace in a text value.
		 * @param {string | undefined} value - The value to fix.
		 * @param {(text: string) => void} fixFn - The function to apply the fix.
		 * @param {boolean} [isRootFirst] - Whether this is the first token of the root.
		 */
		function fixText (value, fixFn, isRootFirst = false) {
			if (!value) return

			let fixed = ``
			let lastIndex = 0

			eachEolWhitespace(
				value,
				(index) => {
					let newlineIndex = index + 1

					fixed += fixString(value.slice(lastIndex, newlineIndex))
					lastIndex = newlineIndex
				},
				isRootFirst,
			)

			if (lastIndex) {
				fixed += value.slice(lastIndex)
				fixFn(fixed)
			}
		}
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
