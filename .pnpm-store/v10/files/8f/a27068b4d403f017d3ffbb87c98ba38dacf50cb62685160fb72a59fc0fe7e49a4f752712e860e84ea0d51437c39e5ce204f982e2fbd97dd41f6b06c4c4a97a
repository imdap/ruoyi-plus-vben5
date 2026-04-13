import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { declarationBangSpaceChecker } from "../../utils/declarationBangSpaceChecker/index.js"
import { declarationValueIndex } from "../../utils/declarationValueIndex/index.js"
import { getDeclarationValue } from "../../utils/getDeclarationValue/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { setDeclarationValue } from "../../utils/setDeclarationValue/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { ruleMessages, validateOptions } } = stylelint

let shortName = `declaration-bang-space-after`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedAfter: () => `Expected single space after "!"`,
	rejectedAfter: () => `Unexpected whitespace after "!"`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Requires a single space or disallows whitespace after the bang of declarations.
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

		declarationBangSpaceChecker({
			root,
			result,
			locationChecker: checker.after,
			checkedRuleName: ruleName,
			fix: (decl, index) => {
				let bangIndex = index - declarationValueIndex(decl)
				let declValue = getDeclarationValue(decl)
				let target

				/** @type {(value: string) => void} */
				let setFixed

				if (bangIndex < declValue.length) {
					target = declValue
					setFixed = (value) => {
						setDeclarationValue(decl, value)
					}
				}
				else if (decl.important) {
					target = decl.raws.important || ` !important`
					bangIndex -= declValue.length
					setFixed = (value) => {
						decl.raws.important = value
					}
				}
				else return false // not standard

				let targetBefore = target.slice(0, bangIndex + 1)
				let targetAfter = target.slice(bangIndex + 1)

				if (primary === `always`) {
					setFixed(targetBefore + targetAfter.replace(/^\s*/, ` `))

					return true
				}

				if (primary === `never`) {
					setFixed(targetBefore + targetAfter.replace(/^\s*/, ``))

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
