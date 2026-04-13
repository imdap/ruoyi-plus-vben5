import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { declarationBangSpaceChecker } from "../../utils/declarationBangSpaceChecker/index.js"
import { declarationValueIndex } from "../../utils/declarationValueIndex/index.js"
import { getDeclarationValue } from "../../utils/getDeclarationValue/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { setDeclarationValue } from "../../utils/setDeclarationValue/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { ruleMessages, validateOptions } } = stylelint

let shortName = `declaration-bang-space-before`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedBefore: () => `Expected single space before "!"`,
	rejectedBefore: () => `Unexpected whitespace before "!"`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Requires a single space or disallows whitespace before the bang of declarations.
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
			locationChecker: checker.before,
			checkedRuleName: ruleName,
			fix: (decl, index) => {
				let bangIndex = index - declarationValueIndex(decl)
				let value = getDeclarationValue(decl)
				let target

				/** @type {(val: string) => void} */
				let setFixed

				if (bangIndex < value.length) {
					target = value
					setFixed = (val) => {
						setDeclarationValue(decl, val)
					}
				}
				else if (decl.important) {
					target = decl.raws.important || ` !important`
					bangIndex -= value.length
					setFixed = (val) => {
						decl.raws.important = val
					}
				}
				else return false // not standard

				let targetBefore = target.slice(0, bangIndex)
				let targetAfter = target.slice(bangIndex)

				if (primary === `always`) {
					setFixed(`${targetBefore.replace(/\s*$/, ``)} ${targetAfter}`)

					return true
				}

				if (primary === `never`) {
					setFixed(targetBefore.replace(/\s*$/, ``) + targetAfter)

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
