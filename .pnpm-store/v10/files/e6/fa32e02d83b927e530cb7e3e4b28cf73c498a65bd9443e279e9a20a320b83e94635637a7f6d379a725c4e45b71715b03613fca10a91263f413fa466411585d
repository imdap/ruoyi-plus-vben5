import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { declarationValueIndex } from "../../utils/declarationValueIndex/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"
import { isStandardSyntaxDeclaration } from "../../utils/isStandardSyntaxDeclaration/index.js"
import { whitespaceChecker } from "../../utils/whitespaceChecker/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `declaration-colon-newline-after`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	expectedAfter: () => `Expected newline after ":"`,
	expectedAfterMultiLine: () => `Expected newline after ":" with a multi-line declaration`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Requires a newline after the colon of declarations.
 * @type {import('stylelint').Rule}
 */
function rule (primary, _secondaryOptions, context) {
	let checker = whitespaceChecker(`newline`, primary, messages)

	return (root, result) => {
		let validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [`always`, `always-multi-line`],
		})

		if (!validOptions) return

		root.walkDecls((decl) => {
			if (!isStandardSyntaxDeclaration(decl)) return

			// Get the raw prop, and only the prop
			let endOfPropIndex = declarationValueIndex(decl) + (decl.raws.between || ``).length - 1

			// The extra characters tacked onto the end ensure that there is a character to check
			// after the colon. Otherwise, with `background:pink` the character after the
			let propPlusColon = `${decl.toString().slice(0, endOfPropIndex)}xxx`

			for (let i = 0, l = propPlusColon.length; i < l; i += 1) {
				if (propPlusColon[i] !== `:`) continue

				let indexToCheck = (/^[^\S\r\n]*\/\*/).test(propPlusColon.slice(i + 1)) ? propPlusColon.indexOf(`*/`, i) + 1 : i

				checker.afterOneOnly({
					source: propPlusColon,
					index: indexToCheck,
					lineCheckStr: decl.value,
					err: (m) => {
						report({
							message: m,
							node: decl,
							index: indexToCheck,
							endIndex: indexToCheck,
							result,
							ruleName,
							fix () {
								let between = decl.raws.between

								if (between === null) throw new Error(`\`between\` must be present`)

								let betweenStart = declarationValueIndex(decl) - between.length
								let sliceIndex = indexToCheck - betweenStart + 1
								let betweenBefore = between.slice(0, sliceIndex)
								let betweenAfter = between.slice(sliceIndex)

								decl.raws.between = (/^\s*\n/).test(betweenAfter) ? betweenBefore + betweenAfter.replace(/^[^\S\r\n]*/, ``) : betweenBefore + context.newline + betweenAfter
							},
						})
					},
				})
			}
		})
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
