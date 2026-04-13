import stylelint from "stylelint"

import { addNamespace } from "../../utils/addNamespace/index.js"
import { getRuleDocUrl } from "../../utils/getRuleDocUrl/index.js"

let { utils: { report, ruleMessages, validateOptions } } = stylelint

let shortName = `no-empty-first-line`

export let ruleName = addNamespace(shortName)

export let noEmptyFirstLineTest = /^\s*[\r\n]/

export let messages = ruleMessages(ruleName, {
	rejected: `Unexpected empty line`,
})

let meta = {
	url: getRuleDocUrl(shortName),
	fixable: true,
}

/**
 * Disallows empty first lines.
 * @type {import('stylelint').Rule}
 */
function rule (primary) {
	return (root, result) => {
		let validOptions = validateOptions(result, ruleName, { actual: primary })

		// @ts-expect-error -- TS2339: Property 'inline' does not exist on type 'Source'. Property 'lang' does not exist on type 'Source'.
		if (!validOptions || root.source.inline || root.source.lang === `object-literal`) return

		let rootString = (root.source && root.source.input.css) || ``

		if (!rootString.trim()) return

		if (noEmptyFirstLineTest.test(rootString)) {
			report({
				message: messages.rejected,
				node: root,
				result,
				ruleName,
				fix () {
					if (root.first === null) throw new Error(`The root node must have the first node.`)

					if (root.first.raws.before === null) throw new Error(`The first node must have spaces before.`)

					root.first.raws.before = root.first.raws.before.replace(noEmptyFirstLineTest, ``)
				},
			})
		}
	}
}

rule.ruleName = ruleName
rule.messages = messages
rule.meta = meta

export default rule
