import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { declarationColonSpaceChecker } from "../../utils/declarationColonSpaceChecker/index.js"
import { declarationValueIndex } from "../../utils/declarationValueIndex/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { ruleMessages, validateOptions } } = stylelint

let shortName = `declaration-colon-space-before`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedBefore: () => `Expected single space before ":"`,
	rejectedBefore: () => `Unexpected whitespace before ":"`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Requires a single space or disallows whitespace before the colon of declarations.
 * @type {import('stylelint').Rule}
 */
function rule (primary) {
	let checker = whitespaceChecker(`space`, primary, messages)

	return (root, result) => {
		let validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [`always`, `never`],
		})

		if (!validOptions) return

		declarationColonSpaceChecker({
			root,
			result,
			locationChecker: checker.before,
			checkedRuleName: ruleName,
			fix: (decl, index) => {
				let colonIndex = index - declarationValueIndex(decl)
				let between = decl.raws.between

				if (between === null) throw new Error(`\`between\` must be present`)

				if (primary === `always`) {
					decl.raws.between = between.slice(0, colonIndex).replace(/\s*$/, ` `) + between.slice(colonIndex)

					return true
				}

				if (primary === `never`) {
					decl.raws.between = between.slice(0, colonIndex).replace(/\s*$/, ``) + between.slice(colonIndex)

					return true
				}

				return false
			},
		})
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
