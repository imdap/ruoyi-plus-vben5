import styleSearch from "style-search"
import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { optionsMatches } from "../../utils/optionsMatches/index.js"
import { assert, isNumber, isRegExp, isString } from "../../utils/validateTypes/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `max-line-length`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expected: (max) => `Expected line length to be no more than ${max} ${max === 1 ? `character` : `characters`}`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
}

/**
 * Limits the length of a line.
 * @type {import('stylelint').Rule}
 */
function rule (primary, secondaryOptions) {
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
					ignore: [`non-comments`, `comments`],
					ignorePattern: [isString, isRegExp],
				},
				optional: true,
			},
		)

		if (!validOptions) return

		if (root.source === null) throw new Error(`The root node must have a source`)

		let EXCLUDED_PATTERNS = [
			/url\(\s*(\S.*\S)\s*\)/gi, // allow tab, whitespace in url content
			/@import\s+(['"].*['"])/gi,
		]

		let ignoreNonComments = optionsMatches(secondaryOptions, `ignore`, `non-comments`)
		let ignoreComments = optionsMatches(secondaryOptions, `ignore`, `comments`)
		let rootString = root.source.input.css
		// Array of skipped sub strings, i.e `url(...)`, `@import "..."`
		/** @type {Array<[number, number]>} */
		let skippedSubStrings = []
		let skippedSubStringsIndex = 0

		for (let pattern of EXCLUDED_PATTERNS) {
			for (let match of rootString.matchAll(pattern)) {
				let subMatch = match[1] || ``
				let startOfSubString = (match.index || 0) + (match[0] || ``).indexOf(subMatch)

				skippedSubStrings.push([startOfSubString, startOfSubString + subMatch.length])
			}
		}

		skippedSubStrings = skippedSubStrings.toSorted((a, b) => a[0] - b[0])

		// Check first line
		checkNewline({ endIndex: 0 })
		// Check subsequent lines
		styleSearch({ source: rootString, target: [`\n`], comments: `check` }, (match) => checkNewline(match))

		/**
		 * Reports a line length violation.
		 * @param {number} index - The index of the violation.
		 */
		function complain (index) {
			report({
				index,
				endIndex: index,
				result,
				ruleName,
				message: messages.expected,
				messageArgs: [primary],
				node: root,
			})
		}

		/**
		 * Attempts to pop a skipped substring from the current line.
		 * @param {number} start - The start index of the line.
		 * @param {number} end - The end index of the line.
		 * @returns {number} The length of the excluded substring, or 0 if none.
		 */
		function tryToPopSubString (start, end) {
			let skippedSubString = skippedSubStrings[skippedSubStringsIndex]

			assert(skippedSubString)

			let [startSubString, endSubString] = skippedSubString

			// Excluded substring does not presented in current line
			if (end < startSubString) return 0

			// Compute excluded substring size regarding to current line indexes
			let excluded = Math.min(end, endSubString) - Math.max(start, startSubString)

			// Current substring is out of range for next lines
			if (endSubString <= end) skippedSubStringsIndex += 1

			return excluded
		}

		/**
		 * Checks a newline for line length violations.
		 * @param {import('style-search').StyleSearchMatch | { endIndex: number }} match - The style search match
		 * @returns {void}
		 */
		function checkNewline (match) {
			let nextNewlineIndex = rootString.indexOf(`\n`, match.endIndex)

			if (rootString[nextNewlineIndex - 1] === `\r`) nextNewlineIndex -= 1

			// Accommodate last line
			if (nextNewlineIndex === -1) nextNewlineIndex = rootString.length

			let rawLineLength = nextNewlineIndex - match.endIndex
			let excludedLength = skippedSubStrings[skippedSubStringsIndex] ? tryToPopSubString(match.endIndex, nextNewlineIndex) : 0
			let lineText = rootString.slice(match.endIndex, nextNewlineIndex)

			// Case sensitive ignorePattern match
			if (optionsMatches(secondaryOptions, `ignorePattern`, lineText)) return

			// If the line's length is less than or equal to the specified
			// max, ignore it ... So anything below is liable to be complained about.
			// **Note that the length of any url arguments or import urls
			// are excluded from the calculation.**
			if (rawLineLength - excludedLength <= primary) return

			let complaintIndex = nextNewlineIndex - 1

			if (ignoreComments) {
				if (`insideComment` in match && match.insideComment) return

				// This trimming business is to notice when the line starts a
				// comment but that comment is indented, e.g.
				//       /* something here */
				let nextTwoChars = rootString.slice(match.endIndex).trim().slice(0, 2)

				if (nextTwoChars === `/*` || nextTwoChars === `//`) return
			}

			if (ignoreNonComments) {
				if (`insideComment` in match && match.insideComment) return complain(complaintIndex)

				// This trimming business is to notice when the line starts a
				// comment but that comment is indented, e.g.
				//       /* something here */
				let nextTwoChars = rootString.slice(match.endIndex).trim().slice(0, 2)

				if (nextTwoChars !== `/*` && nextTwoChars !== `//`) return

				return complain(complaintIndex)
			}

			// If there are no spaces besides initial (indent) spaces, ignore it
			let lineString = rootString.slice(match.endIndex, nextNewlineIndex)

			if (!lineString.replace(/^\s+/, ``).includes(` `)) return

			return complain(complaintIndex)
		}
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
