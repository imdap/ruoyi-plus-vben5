import { isWhitespace } from "../isWhitespace/index.js"

/**
 * Returns a boolean indicating whether the input string is only whitespace.
 * @param {string} input - The string to check.
 * @returns {boolean} True if the string contains only whitespace, false otherwise.
 */
export function isOnlyWhitespace (input) {
	for (let element of input) if (!isWhitespace(element)) return false

	return true
}
