import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { blockString } from "../../utils/blockString/index.js"
import { getDeclarationValue } from "../../utils/getDeclarationValue/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { isCustomProperty } from "../../utils/isCustomProperty/index.js"
import { setDeclarationValue } from "../../utils/setDeclarationValue/index.js"
import { isAtRule, isRule } from "../../utils/typeGuards/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `declaration-block-semicolon-space-before`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedBefore: () => `Expected single space before ";"`,
	rejectedBefore: () => `Unexpected whitespace before ";"`,
	expectedBeforeSingleLine: () => `Expected single space before ";" in a single-line declaration block`,
	rejectedBeforeSingleLine: () => `Unexpected whitespace before ";" in a single-line declaration block`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Requires a single space or disallows whitespace before the semicolons of declaration blocks.
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
			let parentRule = decl.parent

			if (!parentRule) throw new Error(`A parent node must be present`)

			if (!isAtRule(parentRule) && !isRule(parentRule)) return

			// Ignore last declaration if there's no trailing semicolon
			if (!parentRule.raws.semicolon && parentRule.last === decl) return

			const value = getDeclarationValue(decl)
			let isCustomPropertyWithOnlySpaces = false

			if (isCustomProperty(decl.prop)) {
				// Stored for future safe replacement
				isCustomPropertyWithOnlySpaces = (/^\s+$/).test(value)

				// https://github.com/stylelint-stylistic/stylelint-stylistic/issues/50
				if (primary.startsWith(`never`) && value === ` `) return
			}

			const declString = decl.toString()
			const problemIndex = decl.toString().length - 1

			checker.before({
				source: declString,
				index: declString.length,
				lineCheckStr: blockString(parentRule),
				err: (message) => {
					report({
						message,
						node: decl,
						index: problemIndex,
						endIndex: problemIndex,
						result,
						ruleName,
						fix () {
							if (primary.startsWith(`always`)) {
								if (decl.important) decl.raws.important = ` !important `
								else setDeclarationValue(decl, value.replace(/\s*$/, ` `))

								return
							}

							if (primary.startsWith(`never`)) {
								if (decl.raws.important) decl.raws.important = decl.raws.important.replace(/\s*$/, ``)
								else {
									const newValue = isCustomPropertyWithOnlySpaces
										? ` `
										: value.replace(/\s*$/, ``)

									setDeclarationValue(decl, newValue)
								}
							}
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
