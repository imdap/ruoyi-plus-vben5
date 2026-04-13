import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `no-missing-end-of-source-newline`

export let ruleName = addNamespace(shortName)

export let messages = ruleMessages(ruleName, {
	rejected: `Unexpected missing end-of-source newline`,
})

export let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Disallows missing end-of-source newlines.
 * @type {import('stylelint').Rule}
 */
function rule (primary, _secondaryOptions, context) {
	return (root, result) => {
		let validOptions = validateOptions(result, ruleName, { actual: primary })

		if (!validOptions) return

		if (root.source === null) throw new Error(`The root node must have a source property`)

		// @ts-expect-error -- TS2339: Property 'inline' does not exist on type 'Source'.
		if (root.source.inline || root.source.lang === `object-literal`) return

		let rootString = root.source.input.css

		if (!rootString.trim() || rootString.endsWith(`\n`)) return

		const problemIndex = rootString.length - 1

		report({
			message: messages.rejected,
			node: root,
			index: problemIndex,
			endIndex: problemIndex,
			result,
			ruleName,
			fix () {
				root.raws.after = context.newline
			},
		})
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
