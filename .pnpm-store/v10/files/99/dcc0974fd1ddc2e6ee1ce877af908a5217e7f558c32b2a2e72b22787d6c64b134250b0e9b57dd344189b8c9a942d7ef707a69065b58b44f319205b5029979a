import styleSearch from "style-search"
import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { beforeBlockString } from "../../utils/beforeBlockString/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { hasBlock } from "../../utils/hasBlock/index.js"
import { isStyledSyntaxDeclaration } from "../../utils/isStyledSyntaxDeclaration/index.js"
import { isStyledSyntaxNode } from "../../utils/isStyledSyntaxNode/index.js"
import { optionsMatches } from "../../utils/optionsMatches/index.js"
import { isAtRule, isDeclaration, isRoot, isRule } from "../../utils/typeGuards/index.js"
import { assertString, isBoolean, isNumber, isString } from "../../utils/validateTypes/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `indentation`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expected: (x) => `Expected indentation of ${x}`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Specifies indentation.
 * @type {import('stylelint').Rule}
 */
function rule (primary, secondaryOptions = {}) {
	return (root, result) => {
		let validOptions = validateOptions(
			result,
			ruleName,
			{
				actual: primary,
				possible: [isNumber, `tab`],
			},
			{
				actual: secondaryOptions,
				possible: {
					baseIndentLevel: [isNumber, `auto`],
					except: [`block`, `value`, `param`],
					ignore: [`value`, `param`, `inside-parens`],
					indentInsideParens: [`twice`, `once-at-root-twice-in-block`],
					indentClosingBrace: [isBoolean],
				},
				optional: true,
			},
		)

		if (!validOptions) return

		let spaceCount = isNumber(primary) ? primary : null
		let indentChar = spaceCount === null ? `\t` : ` `.repeat(spaceCount)
		let warningWord = primary === `tab` ? `tab` : `space`

		/** @type {number | 'auto'} */
		let baseIndentLevel = secondaryOptions.baseIndentLevel

		/** @type {boolean} */
		let indentClosingBrace = secondaryOptions.indentClosingBrace

		/**
		 * Returns a human-readable expectation string based on indentation level.
		 * @param {number} level - The indentation level.
		 * @returns {string} The formatted expectation string.
		 */
		function legibleExpectation (level) {
			let count = spaceCount === null ? level : level * spaceCount
			let quantifiedWarningWord = count === 1 ? warningWord : `${warningWord}s`

			return `${count} ${quantifiedWarningWord}`
		}

		// Cycle through all nodes using walk.
		root.walk((node) => {
			if (isRoot(node)) {
				// Ignore nested template literals root in css-in-js lang
				return
			}

			let nodeLevel = indentationLevel(node)
			let styledDeclarationLevel = isStyledSyntaxNode(node) ? getStyledDeclarationLevel(node) : 0

			// Cut out any * and _ hacks from `before`
			let before = (node.raws.before || ``).replace(/[*_]$/, ``)
			let after = typeof node.raws.after === `string` ? node.raws.after : ``
			let parent = node.parent

			if (!parent) throw new Error(`A parent node must be present`)

			let expectedOpeningBraceIndentation = indentChar.repeat(nodeLevel)

			// Only inspect the spaces before the node
			// if this is the first node in root
			// or there is a newline in the `before` string.
			// (If there is no newline before a node,
			// there is no "indentation" to check.)
			let isFirstChild = parent.type === `root` && parent.first === node
			let lastIndexOfNewline = before.lastIndexOf(`\n`)

			// Inspect whitespace in the `before` string that is
			// *after* the *last* newline character,
			// because anything besides that is not indentation for this node:
			// it is some other kind of separation, checked by some separate rule
			if ((lastIndexOfNewline !== -1 || (isFirstChild && (!getDocument(parent) || (parent.raws.codeBefore && parent.raws.codeBefore.endsWith(`\n`))))) && before.slice(lastIndexOfNewline + 1) !== expectedOpeningBraceIndentation) {
				report({
					message: messages.expected,
					messageArgs: [legibleExpectation(nodeLevel - styledDeclarationLevel)],
					node,
					result,
					ruleName,
					fix () {
						if (isFirstChild && isString(node.raws.before)) node.raws.before = node.raws.before.replace(/^[ \t]*(?=\S|$)/, expectedOpeningBraceIndentation)

						node.raws.before = fixIndentation(node.raws.before, expectedOpeningBraceIndentation)
					},
				})
			}

			// Only blocks have the `after` string to check.
			// Only inspect `after` strings that start with a newline;
			// otherwise there's no indentation involved.
			// And check `indentClosingBrace` to see if it should be indented an extra level.
			let closingBraceLevel = indentClosingBrace ? nodeLevel + 1 : nodeLevel
			let expectedClosingBraceIndentation = indentChar.repeat(closingBraceLevel)

			if ((isRule(node) || isAtRule(node)) && hasBlock(node) && after && after.includes(`\n`) && after.slice(after.lastIndexOf(`\n`) + 1) !== expectedClosingBraceIndentation) {
				const problemIndex = node.toString().length - 1

				report({
					message: messages.expected,
					messageArgs: [legibleExpectation(closingBraceLevel - styledDeclarationLevel)],
					node,
					index: problemIndex,
					endIndex: problemIndex,
					result,
					ruleName,
					fix () {
						node.raws.after = fixIndentation(node.raws.after, expectedClosingBraceIndentation)
					},
				})
			}

			// If this is a declaration, check the value
			if (isDeclaration(node)) checkValue(node, nodeLevel)

			// If this is a rule, check the selector
			if (isRule(node)) checkSelector(node, nodeLevel)

			// If this is an at rule, check the params
			if (isAtRule(node)) checkAtRuleParams(node, nodeLevel)
		})

		/**
		 * Roughly calculates the indentation level of the line where styled expression starts.
		 * Required to format the error text relative to this level, not the beginning of a line.
		 * @param {import('postcss').Node} node - The node to calculate level for.
		 * @returns {number} The calculated indentation level.
		 */
		function getStyledDeclarationLevel (node) {
			// Content of the line where styled expressions starts
			const expressionStartLine = node.parent.parent.source.input.css.split(`\n`)[node.parent.source.start.line - 1]
			// Indent characters (spaces/tabs) before the content of the line where the styled expressions starts
			const indentCharacters = expressionStartLine.match(/^[ \t]*/g)?.[0] ?? ``

			return Math.ceil(indentCharacters.length / indentChar.length)
		}

		/**
		 * Calculates the indentation level for a node.
		 * @param {import('postcss').Node} node - The node to calculate level for.
		 * @param {number} [level] - The current level.
		 * @returns {number} The calculated indentation level.
		 */
		function indentationLevel (node, level = 0) {
			if (!node.parent) throw new Error(`A parent node must be present`)

			let calculatedLevel = level

			if (isStyledSyntaxNode(node)) {
				const isMultilineDeclaration = !!node.parent.source?.input.css.includes(`\n`)

				if (isMultilineDeclaration) calculatedLevel += 1

				calculatedLevel += getStyledDeclarationLevel(node)
			}

			if (isRoot(node.parent)) return calculatedLevel + getRootBaseIndentLevel(node.parent, baseIndentLevel, primary)

			// Indentation level equals the ancestor nodes
			// separating this node from root; so recursively
			// run this operation
			calculatedLevel = indentationLevel(node.parent, calculatedLevel + 1)

			// If `secondaryOptions.except` includes "block",
			// blocks are taken down one from their calculated level
			// (all blocks are the same level as their parents)
			if (optionsMatches(secondaryOptions, `except`, `block`) && (isRule(node) || isAtRule(node)) && hasBlock(node)) calculatedLevel -= 1

			return calculatedLevel
		}

		/**
		 * Checks the value of a declaration for proper indentation.
		 * @param {import('postcss').Declaration} decl - The declaration to check.
		 * @param {number} declLevel - The indentation level of the declaration.
		 */
		function checkValue (decl, declLevel) {
			if (!decl.value.includes(`\n`)) return

			if (isStyledSyntaxDeclaration(decl) && decl.value.includes(`\${`)) return

			if (optionsMatches(secondaryOptions, `ignore`, `value`)) return

			let declString = decl.toString()
			let valueLevel = optionsMatches(secondaryOptions, `except`, `value`) ? declLevel : declLevel + 1

			checkMultilineBit(declString, valueLevel, decl)
		}

		/**
		 * Checks a selector for proper indentation.
		 * @param {import('postcss').Rule} ruleNode - The rule node to check.
		 * @param {number} ruleLevel - The indentation level of the rule.
		 */
		function checkSelector (ruleNode, ruleLevel) {
			let selector = ruleNode.selector
			let level = ruleLevel

			// Less mixins have params, and they should be indented extra
			// @ts-expect-error -- TS2339: Property 'params' does not exist on type 'Rule'.
			if (ruleNode.params) level += 1

			// Add extra indentation level for multiline pseudos
			// https://github.com/stylelint-stylistic/stylelint-stylistic/issues/30
			if ((/:\w+\(\s*\r?\n/).test(selector)) level += 1

			checkMultilineBit(selector, level, ruleNode)
		}

		/**
		 * Checks at-rule parameters for proper indentation.
		 * @param {import('postcss').AtRule} atRule - The at-rule to check.
		 * @param {number} ruleLevel - The indentation level of the rule.
		 */
		function checkAtRuleParams (atRule, ruleLevel) {
			if (optionsMatches(secondaryOptions, `ignore`, `param`)) return

			// @nest and SCSS's @at-root rules should be treated like regular rules, not expected
			// to have their params (selectors) indented
			let paramLevel = optionsMatches(secondaryOptions, `except`, `param`) || atRule.name === `nest` || atRule.name === `at-root` ? ruleLevel : ruleLevel + 1

			checkMultilineBit(beforeBlockString(atRule).trim(), paramLevel, atRule)
		}

		/**
		 * Checks a multiline bit for proper newline indentation.
		 * @param {string} source - The source string to check.
		 * @param {number} newlineIndentLevel - The expected indentation level.
		 * @param {import('postcss').Node} node - The node being checked.
		 */
		function checkMultilineBit (source, newlineIndentLevel, node) {
			if (!source.includes(`\n`)) return

			// Data for current node fixing
			/** @type {Array<{ expectedIndentation: string, currentIndentation: string, startIndex: number }>} */
			let fixPositions = []

			// `outsideParens` because function arguments and also non-standard parenthesized stuff like
			// Sass maps are ignored to allow for arbitrary indentation
			let parentheticalDepth = 0

			let ignoreInsideParans = optionsMatches(secondaryOptions, `ignore`, `inside-parens`)

			styleSearch(
				{
					source,
					target: `\n`,
					// @ts-expect-error -- The `outsideParens` option is unsupported. Why?
					outsideParens: ignoreInsideParans,
				},
				(match, matchCount) => {
					let precedesClosingParenthesis = (/^[ \t]*\)/).test(source.slice(match.startIndex + 1))

					if (ignoreInsideParans && (precedesClosingParenthesis || match.insideParens)) return

					let expectedIndentLevel = newlineIndentLevel

					// Modifications for parenthetical content
					if (!ignoreInsideParans && match.insideParens) {
						// If the first match in is within parentheses, reduce the parenthesis penalty
						if (matchCount === 1) parentheticalDepth -= 1

						// Account for windows line endings
						let newlineIndex = match.startIndex

						if (source[match.startIndex - 1] === `\r`) newlineIndex -= 1

						let followsOpeningParenthesis = (/\([ \t]*$/).test(source.slice(0, newlineIndex))

						if (followsOpeningParenthesis) parentheticalDepth += 1

						let followsOpeningBrace = (/\{[ \t]*$/).test(source.slice(0, newlineIndex))

						if (followsOpeningBrace) parentheticalDepth += 1

						let startingClosingBrace = (/^[ \t]*\}/).test(source.slice(match.startIndex + 1))

						if (startingClosingBrace) parentheticalDepth -= 1

						expectedIndentLevel += parentheticalDepth

						// Past this point, adjustments to parentheticalDepth affect next line
						if (precedesClosingParenthesis) parentheticalDepth -= 1

						switch (secondaryOptions.indentInsideParens) {
							case `twice`:
								if (!precedesClosingParenthesis || indentClosingBrace) expectedIndentLevel += 1

								break
							case `once-at-root-twice-in-block`:
								if (node.parent === node.root()) {
									if (precedesClosingParenthesis && !indentClosingBrace) expectedIndentLevel -= 1

									break
								}

								if (!precedesClosingParenthesis || indentClosingBrace) expectedIndentLevel += 1

								break
							default:
								if (precedesClosingParenthesis && !indentClosingBrace) expectedIndentLevel -= 1
						}
					}

					// Starting at the index after the newline, we want to
					// check that the whitespace characters (excluding newlines) before the first
					// non-whitespace character equal the expected indentation
					let afterNewlineSpaceMatches = (/^([ \t]*)\S/).exec(source.slice(match.startIndex + 1))

					if (!afterNewlineSpaceMatches) return

					let afterNewlineSpace = afterNewlineSpaceMatches[1] || ``
					let expectedIndentation = indentChar.repeat(Math.max(expectedIndentLevel, 0))

					if (afterNewlineSpace !== expectedIndentation) {
						const problemIndex = match.startIndex + afterNewlineSpace.length + 1

						report({
							message: messages.expected,
							messageArgs: [legibleExpectation(expectedIndentLevel)],
							node,
							index: problemIndex,
							endIndex: problemIndex,
							result,
							ruleName,
							fix () {
								// Adding fixes position in reverse order, because if we change indent in the beginning of the string it will break all following fixes for that string
								fixPositions.unshift({
									expectedIndentation,
									currentIndentation: afterNewlineSpace,
									startIndex: match.startIndex,
								})
							},
						})
					}
				},
			)

			if (fixPositions.length > 0) {
				if (isRule(node)) {
					for (let fixPosition of fixPositions) {
						node.selector = replaceIndentation(
							node.selector,
							fixPosition.currentIndentation,
							fixPosition.expectedIndentation,
							fixPosition.startIndex,
						)
					}
				}

				if (isDeclaration(node)) {
					let declProp = node.prop
					let declBetween = node.raws.between

					if (!isString(declBetween)) throw new TypeError(`The \`between\` property must be a string`)

					for (let fixPosition of fixPositions) {
						if (fixPosition.startIndex < declProp.length + declBetween.length) {
							node.raws.between = replaceIndentation(
								declBetween,
								fixPosition.currentIndentation,
								fixPosition.expectedIndentation,
								fixPosition.startIndex - declProp.length,
							)
						}
						else {
							node.value = replaceIndentation(
								node.value,
								fixPosition.currentIndentation,
								fixPosition.expectedIndentation,
								fixPosition.startIndex - declProp.length - declBetween.length,
							)
						}
					}
				}

				if (isAtRule(node)) {
					let atRuleName = node.name
					let atRuleAfterName = node.raws.afterName
					let atRuleParams = node.params

					if (!isString(atRuleAfterName)) throw new TypeError(`The \`afterName\` property must be a string`)

					for (let fixPosition of fixPositions) {
						// 1 — it's a @ length
						if (fixPosition.startIndex < 1 + atRuleName.length + atRuleAfterName.length) {
							node.raws.afterName = replaceIndentation(
								atRuleAfterName,
								fixPosition.currentIndentation,
								fixPosition.expectedIndentation,
								fixPosition.startIndex - atRuleName.length - 1,
							)
						}
						else {
							node.params = replaceIndentation(
								atRuleParams,
								fixPosition.currentIndentation,
								fixPosition.expectedIndentation,
								fixPosition.startIndex - atRuleName.length - atRuleAfterName.length - 1,
							)
						}
					}
				}
			}
		}
	}
}

/**
 * Gets the base indentation level for the root node.
 * @param {import('postcss').Root} root - The root node.
 * @param {number | 'auto'} baseIndentLevel - The base indent level option.
 * @param {string} space - The space character.
 * @returns {number} The calculated base indentation level.
 */
function getRootBaseIndentLevel (root, baseIndentLevel, space) {
	let document = getDocument(root)

	if (!document) return 0

	if (!root.source) throw new Error(`The root node must have a source`)

	/** @type {import('postcss').Source & { baseIndentLevel?: number }} */
	let source = root.source

	let indentLevel = source.baseIndentLevel

	if (isNumber(indentLevel) && Number.isSafeInteger(indentLevel)) return indentLevel

	let newIndentLevel = inferRootIndentLevel(root, baseIndentLevel, () => inferDocIndentSize(document, space))

	source.baseIndentLevel = newIndentLevel

	return newIndentLevel
}

/**
 * Gets the document node from a PostCSS node.
 * @param {import('postcss').Node} node - The node to get document from.
 * @returns {import('postcss').Document | undefined} The document node or undefined.
 */
function getDocument (node) {
	// @ts-expect-error -- TS2339: Property 'document' does not exist on type 'Node'.
	let document = node.document

	if (document) return document

	let root = node.root()

	// @ts-expect-error -- TS2339: Property 'document' does not exist on type 'Node'.
	return root && root.document
}

/**
 * Infers the document indent size from the source.
 * @param {import('postcss').Document} document - The document node.
 * @param {string} space - The space character.
 * @returns {number} The inferred indent size.
 */
function inferDocIndentSize (document, space) {
	if (!document.source) throw new Error(`The document node must have a source`)

	/** @type {import('postcss').Source & { indentSize?: number }} */
	let docSource = document.source

	let indentSize = docSource.indentSize

	if (isNumber(indentSize) && Number.isSafeInteger(indentSize)) return indentSize

	let source = document.source.input.css
	let indents = source.match(/^ *(?=\S)/gm)

	/** @type {Map<number, number>} */
	let scores = (new Map())
	let lastIndentSize = 0
	let lastLeadingSpacesLength = 0

	/**
	 * Records a vote for an indent size based on leading spaces length.
	 *
	 * @param {number} leadingSpacesLength - The length of leading spaces.
	 */
	function vote (leadingSpacesLength) {
		if (leadingSpacesLength) {
			lastIndentSize = Math.abs(leadingSpacesLength - lastLeadingSpacesLength) || lastIndentSize

			if (lastIndentSize > 1) {
				let score = scores.get(lastIndentSize)

				if (score) scores.set(lastIndentSize, score + 1)
				else scores.set(lastIndentSize, 1)
			}
		}
		else lastIndentSize = 0

		lastLeadingSpacesLength = leadingSpacesLength
	}

	if (indents) {
		for (let leadingSpaces of indents) vote(leadingSpaces.length)

		let bestScore = 0

		for (let [indentSizeDate, score] of scores.entries()) {
			if (score > bestScore) {
				bestScore = score
				indentSize = indentSizeDate
			}
		}
	}

	indentSize = Number(indentSize) || (indents && indents[0] && indents[0].length > 0) || Number(space) || 2
	docSource.indentSize = indentSize

	return indentSize
}

/**
 * Infers the root indentation level from the source.
 * @param {import('postcss').Root} root - The root node.
 * @param {number | 'auto'} baseIndentLevel - The base indent level option.
 * @param {() => number} indentSize - Function to get the indent size.
 * @returns {number} The inferred root indentation level.
 */
function inferRootIndentLevel (root, baseIndentLevel, indentSize) {
	/**
	 * Gets the indentation level from a string.
	 *
	 * @param {string} indent - The indentation string.
	 * @returns {number} The calculated indentation level.
	 */
	function getIndentLevel (indent) {
		let tabMatch = indent.match(/\t/g)
		let tabCount = tabMatch ? tabMatch.length : 0

		let spaceMatch = indent.match(/ /g)
		let spaceCount = spaceMatch ? Math.round(spaceMatch.length / indentSize()) : 0

		return tabCount + spaceCount
	}

	let newBaseIndentLevel = 0

	if (!isNumber(baseIndentLevel) || !Number.isSafeInteger(baseIndentLevel)) {
		if (!root.source) throw new Error(`The root node must have a source`)

		let source = root.source.input.css

		source = source.replace(/^[^\r\n]+/, (firstLine) => {
			let match = root.raws.codeBefore && (/(?:^|\n)([ \t]*)$/).exec(root.raws.codeBefore)

			if (match) return match[1] + firstLine

			return ``
		})

		let indentions = source.match(/^[ \t]*(?=\S)/gm)

		if (indentions) return Math.min(...indentions.map((indent) => getIndentLevel(indent)))

		newBaseIndentLevel = 1
	}
	else newBaseIndentLevel = baseIndentLevel

	let indents = []
	let foundIndents = root.raws.codeBefore?.match(/(?:^|\n)([\t ]*)\S/gm)

	// The indent level of the CSS code block in non-CSS-like files is determined by the indent of first non-empty line before it.
	if (foundIndents) {
		let i = foundIndents.length - 1

		while (i >= 0) {
			let foundIndent = foundIndents[i]

			assertString(foundIndent)

			if ((/^\s*</).test(foundIndent)) {
				let current = getIndentLevel(foundIndent)

				indents.push(Array.from({ length: current }).fill(`  `).join(``))
				break
			}
			i -= 1
		}
	}

	let after = root.raws.after

	if (after) {
		let afterEnd

		if (after.endsWith(`\n`)) {
			// @ts-expect-error -- TS2339: Property 'document' does not exist on type 'Root'.
			let document = root.document

			if (document) {
				let nextRoot = document.nodes[document.nodes.indexOf(root) + 1]

				afterEnd = nextRoot ? nextRoot.raws.codeBefore : document.raws.codeAfter
			}
			else {
				// Nested root node in css-in-js lang
				let parent = root.parent

				if (!parent) throw new Error(`The root node must have a parent`)

				let nextRoot = parent.nodes[parent.nodes.indexOf(root) + 1]

				afterEnd = nextRoot ? nextRoot.raws.codeBefore : root.raws.codeAfter
			}
		}
		else afterEnd = after

		if (afterEnd) indents.push(afterEnd.match(/^[ \t]*/)[0])
	}

	if (indents.length > 0) return Math.max(...indents.map((indent) => getIndentLevel(indent))) + newBaseIndentLevel

	return newBaseIndentLevel
}

/**
 * Fixes indentation in a string by replacing newlines followed by whitespace.
 * @param {string | undefined} str - The string to fix.
 * @param {string} whitespace - The whitespace to use for indentation.
 * @returns {string | undefined} The fixed string.
 */
function fixIndentation (str, whitespace) {
	if (!isString(str)) return str

	return str.replaceAll(/\n[ \t]*(?=\S|$)/g, `\n${whitespace}`)
}

/**
 * Replaces indentation in a string at the specified position.
 * @param {string} input - The input string.
 * @param {string} searchString - The string to search for.
 * @param {string} replaceString - The string to replace with.
 * @param {number} startIndex - The index to start at.
 * @returns {string} The modified string.
 */
function replaceIndentation (input, searchString, replaceString, startIndex) {
	let offset = startIndex + 1
	let stringStart = input.slice(0, offset)
	let stringEnd = input.slice(offset + searchString.length)

	return stringStart + replaceString + stringEnd
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
