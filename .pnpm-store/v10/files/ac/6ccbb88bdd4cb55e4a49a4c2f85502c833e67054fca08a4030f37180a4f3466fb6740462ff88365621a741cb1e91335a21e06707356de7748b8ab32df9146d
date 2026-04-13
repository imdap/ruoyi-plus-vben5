import { matchesStringOrRegExp } from "../matchesStringOrRegExp/index.js"

/**
 * Checks if an options object's propertyName contains a user-defined string or regex that matches the passed in input.
 * @param {{ [x: string]: any; }} options - The options object
 * @param {string} propertyName - The property name to check.
 * @param {unknown} input - The input to match.
 * @returns {boolean} True if a match is found, false otherwise.
 */
export function optionsMatches (options, propertyName, input) {
	return Boolean(options && options[propertyName] && typeof input === `string` && matchesStringOrRegExp(input, options[propertyName]))
}
