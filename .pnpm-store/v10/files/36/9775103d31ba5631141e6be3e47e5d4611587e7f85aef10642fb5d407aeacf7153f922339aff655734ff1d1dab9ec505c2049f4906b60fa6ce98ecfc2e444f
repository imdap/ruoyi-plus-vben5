import { isStandardSyntaxSelector } from "../isStandardSyntaxSelector/index.js"

/**
 * Checks whether a Node is a standard rule.
 * @param {import('postcss').Rule | import('postcss-less').Rule} rule - The rule node to check.
 * @returns {boolean} True if the rule is standard syntax, false otherwise.
 */
export function isStandardSyntaxRule (rule) {
	if (rule.type !== `rule`) return false

	// Ignore Less &:extend rule
	if (`extend` in rule && rule.extend) return false

	if (!isStandardSyntaxSelector(rule.selector)) return false

	return true
}
