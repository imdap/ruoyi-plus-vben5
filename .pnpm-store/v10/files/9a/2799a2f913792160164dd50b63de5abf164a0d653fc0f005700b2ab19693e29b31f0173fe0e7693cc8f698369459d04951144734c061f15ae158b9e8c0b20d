import { isAtRule, isRule } from "../typeGuards/index.js"

/**
 * Gets the string before a block in a statement.
 * @param {import('postcss').Container} statement - The PostCSS container node.
 * @param {{ noRawBefore?: boolean }} [options] - Options object
 * @returns {string} The string before the block.
 */
export function beforeBlockString (statement, { noRawBefore = false } = {}) {
	let result = ``

	let before = statement.raws.before || ``

	if (!noRawBefore) result += before

	if (isRule(statement)) result += statement.selector
	else if (isAtRule(statement)) result += `@${statement.name}${statement.raws.afterName || ``}${statement.params}`
	else return ``

	result += statement.raws.between || ``

	return result
}
