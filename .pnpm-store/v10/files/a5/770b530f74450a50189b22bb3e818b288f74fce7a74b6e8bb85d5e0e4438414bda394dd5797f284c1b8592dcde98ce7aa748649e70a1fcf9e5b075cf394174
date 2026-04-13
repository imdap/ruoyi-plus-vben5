/**
 * Checks whether an at-rule is standard (i.e. not a preprocessor construct).
 * @param {import('postcss').AtRule | import('postcss-less').AtRule} atRule - The at-rule node to check.
 * @returns {boolean} True if the at-rule is standard, false otherwise.
 */
export function isStandardSyntaxAtRule (atRule) {
	// Ignore scss `@content` inside mixins
	if (!atRule.nodes && atRule.params === ``) return false

	// Ignore Less mixins
	if (`mixin` in atRule && atRule.mixin) return false

	// Ignore Less detached ruleset `@detached-ruleset: { background: red; }; .top { @detached-ruleset(); }`
	if ((`variable` in atRule && atRule.variable) || (!atRule.nodes && atRule.raws.afterName === `` && atRule.params[0] === `(`)) return false

	return true
}
