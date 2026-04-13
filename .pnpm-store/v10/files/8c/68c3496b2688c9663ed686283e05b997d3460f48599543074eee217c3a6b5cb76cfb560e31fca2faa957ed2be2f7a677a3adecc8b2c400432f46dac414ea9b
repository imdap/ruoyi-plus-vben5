import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { blockString } from "../../utils/blockString/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { rawNodeString } from "../../utils/rawNodeString/index.js"
import { isAtRule, isRule } from "../../utils/typeGuards/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `declaration-block-semicolon-space-after`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedAfter: () => `Expected single space after ";"`,
	rejectedAfter: () => `Unexpected whitespace after ";"`,
	expectedAfterSingleLine: () => `Expected single space after ";" in a single-line declaration block`,
	rejectedAfterSingleLine: () => `Unexpected whitespace after ";" in a single-line declaration block`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Requires a single space or disallows whitespace after the semicolons of declaration blocks.
 * @type {import('stylelint').Rule}
 */
function rule (primary) {
	let checker = whitespaceChecker(`space`, primary, messages)

	return (root, result) => {
		let validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [`always`, `never`, `always-single-line`, `never-single-line`],
		})

		if (!validOptions) return

		root.walkDecls((decl) => {
			// Ignore last declaration if there's no trailing semicolon
			let parentRule = decl.parent

			if (!parentRule) throw new Error(`A parent node must be present`)

			if (!isAtRule(parentRule) && !isRule(parentRule)) return

			if (!parentRule.raws.semicolon && parentRule.last === decl) return

			let nextDecl = decl.next()

			if (!nextDecl) return

			const problemIndex = decl.toString().length + 1

			checker.after({
				source: rawNodeString(nextDecl),
				index: -1,
				lineCheckStr: blockString(parentRule),
				err: (m) => {
					report({
						message: m,
						node: decl,
						index: problemIndex,
						endIndex: problemIndex,
						result,
						ruleName,
						fix () {
							if (primary.startsWith(`always`)) {
								nextDecl.raws.before = ` `

								return
							}

							if (primary.startsWith(`never`)) nextDecl.raws.before = ``
						},
					})
				},
			})
		})
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
