import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { beforeBlockString } from "../../utils/beforeBlockString/index.js"
import { blockString } from "../../utils/blockString/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { hasBlock } from "../../utils/hasBlock/index.js"
import { hasEmptyBlock } from "../../utils/hasEmptyBlock/index.js"
import { optionsMatches } from "../../utils/optionsMatches/index.js"
import { rawNodeString } from "../../utils/rawNodeString/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `block-opening-brace-newline-after`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedAfter: () => `Expected newline after "{"`,
	expectedAfterMultiLine: () => `Expected newline after "{" of a multi-line block`,
	rejectedAfterMultiLine: () => `Unexpected whitespace after "{" of a multi-line block`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Requires a newline after the opening brace of blocks.
 * @type {import('stylelint').Rule}
 */
function rule (primary, secondaryOptions, context) {
	let checker = whitespaceChecker(`newline`, primary, messages)

	return (root, result) => {
		let validOptions = validateOptions(
			result,
			ruleName,
			{
				actual: primary,
				possible: [`always`, `rules`, `always-multi-line`, `never-multi-line`],
			},
			{
				actual: secondaryOptions,
				possible: {
					ignore: [`rules`],
				},
				optional: true,
			},
		)

		if (!validOptions) return

		// Check both kinds of statement: rules and at-rules
		if (!optionsMatches(secondaryOptions, `ignore`, `rules`)) root.walkRules(check)

		root.walkAtRules(check)

		/**
		 * Checks a statement for opening brace newline violations.
		 * @param {import('postcss').Rule | import('postcss').AtRule} statement - The rule or at-rule to check.
		 */
		function check (statement) {
			// Return early if blockless or has an empty block
			if (!hasBlock(statement) || hasEmptyBlock(statement)) return

			let backupCommentNextBefores = (new Map())

			/**
			 * Gets the next node with checking newlines after comment.
			 *
			 * @param {import('postcss').ChildNode | undefined} startNode - The starting node.
			 * @returns {import('postcss').ChildNode | undefined} The next non-comment node.
			 */
			function nextNode (startNode) {
				if (!startNode || !startNode.next) return

				if (startNode.type === `comment`) {
					let reNewLine = /\r?\n/
					let newLineMatch = reNewLine.test(startNode.raws.before || ``)

					let next = startNode.next()

					if (next && newLineMatch && !reNewLine.test(next.raws.before || ``)) {
						backupCommentNextBefores.set(next, next.raws.before)
						next.raws.before = startNode.raws.before
					}

					return nextNode(next)
				}

				return startNode
			}

			// Allow an end-of-line comment
			let nodeToCheck = nextNode(statement.first)

			if (!nodeToCheck) return

			const problemIndex = beforeBlockString(statement, { noRawBefore: true }).length + 1

			checker.afterOneOnly({
				source: rawNodeString(nodeToCheck),
				index: -1,
				lineCheckStr: blockString(statement),
				err: (m) => {
					report({
						message: m,
						node: statement,
						index: problemIndex,
						endIndex: problemIndex,
						result,
						ruleName,
						fix () {
							let nodeToCheckRaws = nodeToCheck.raws

							if (typeof nodeToCheckRaws.before !== `string`) return

							if (primary.startsWith(`always`)) {
								let index = nodeToCheckRaws.before.search(/\r?\n/)

								nodeToCheckRaws.before = index >= 0 ? nodeToCheckRaws.before.slice(index) : context.newline + nodeToCheckRaws.before

								backupCommentNextBefores.delete(nodeToCheck)

								return
							}

							if (primary === `never-multi-line`) {
								// Restore the `before` of the node next to the comment node.
								for (let [node, before] of backupCommentNextBefores.entries()) node.raws.before = before

								backupCommentNextBefores.clear()

								// Fix
								let reNewLine = /\r?\n/
								let fixTarget = statement.first

								while (fixTarget) {
									let fixTargetRaws = fixTarget.raws

									if (typeof fixTargetRaws.before !== `string`) continue

									if (reNewLine.test(fixTargetRaws.before || ``)) fixTargetRaws.before = fixTargetRaws.before.replaceAll(/\r?\n/g, ``)

									if (fixTarget.type !== `comment`) break

									fixTarget = fixTarget.next()
								}

								nodeToCheckRaws.before = ``
							}
						},
					})
				},
			})

			// Restore the `before` of the node next to the comment node.
			for (let [node, before] of backupCommentNextBefores.entries()) node.raws.before = before
		}
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
