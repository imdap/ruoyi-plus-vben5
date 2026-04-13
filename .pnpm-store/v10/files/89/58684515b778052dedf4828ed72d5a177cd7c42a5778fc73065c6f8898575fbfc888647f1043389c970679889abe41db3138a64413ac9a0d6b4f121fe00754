/**
 * Gets the index of the parameters in an at-rule.
 * @param {import('postcss').AtRule} atRule - The at-rule node.
 * @returns {number} The index of the parameters.
 */
export function atRuleParamIndex (atRule) {
	// Initial 1 is for the `@`
	let index = 1 + atRule.name.length

	if (atRule.raws.afterName) index += atRule.raws.afterName.length

	return index
}
