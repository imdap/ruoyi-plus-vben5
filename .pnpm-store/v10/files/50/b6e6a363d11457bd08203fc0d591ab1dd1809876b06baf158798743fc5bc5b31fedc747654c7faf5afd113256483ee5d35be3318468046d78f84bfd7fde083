import { assert as nodeAssert } from "node:console"

/**
 * Checks if the value is a boolean or a Boolean object.
 * @param {unknown} value - The value to check.
 * @returns {value is boolean} True if the value is a boolean, false otherwise.
 */
export function isBoolean (value) {
	// oxlint-disable-next-line unicorn/no-instanceof-builtins
	return typeof value === `boolean` || value instanceof Boolean
}

/**
 * Checks if the value is a function or a Function object.
 * @param {unknown} value - The value to check.
 * @returns {value is Function} True if the value is a function, false otherwise.
 */
export function isFunction (value) {
	// oxlint-disable-next-line unicorn/no-instanceof-builtins
	return typeof value === `function` || value instanceof Function
}

/**
 * Checks if the value is *nullish*.
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Nullish
 * @param {unknown} value - The value to check.
 * @returns {value is null | undefined} True if the value is null or undefined, false otherwise.
 */
export function isNullish (value) {
	return value === null || value === undefined
}

/**
 * Checks if the value is a number or a Number object.
 * @param {unknown} value - The value to check.
 * @returns {value is number} True if the value is a number, false otherwise.
 */
export function isNumber (value) {
	// oxlint-disable-next-line unicorn/no-instanceof-builtins
	return typeof value === `number` || value instanceof Number
}

/**
 * Checks if the value is an object.
 * @param {unknown} value - The value to check.
 * @returns {value is object} True if the value is an object, false otherwise.
 */
export function isObject (value) {
	return value !== null && typeof value === `object`
}

/**
 * Checks if the value is a regular expression.
 * @param {unknown} value - The value to check.
 * @returns {value is RegExp} True if the value is a RegExp, false otherwise.
 */
export function isRegExp (value) {
	return value instanceof RegExp
}

/**
 * Checks if the value is a string or a String object.
 * @param {unknown} value - The value to check.
 * @returns {value is string} True if the value is a string, false otherwise.
 */
export function isString (value) {
	// oxlint-disable-next-line unicorn/no-instanceof-builtins
	return typeof value === `string` || value instanceof String
}

/**
 * Asserts that the value is truthy.
 * @param {unknown} value - The value to assert.
 * @param {string} [message] - The error message to display if the assertion fails.
 * @returns {void}
 * @throws {Error} - Throws an error if the value is not truthy
 */
export function assert (value, message) {
	if (message) nodeAssert(value, message)
	else nodeAssert(value)
}

/**
 * Asserts that the value is a function or a Function object.
 * @param {unknown} value - The value to assert.
 * @returns {void}
 * @throws {Error} - Throws an error if the value is not a function
 */
export function assertFunction (value) {
	nodeAssert(isFunction(value), `"${value}" must be a function`)
}

/**
 * Asserts that the value is a string or a String object.
 * @param {unknown} value - The value to assert.
 * @returns {void}
 * @throws {Error} - Throws an error if the value is not a string
 */
export function assertString (value) {
	nodeAssert(isString(value), `"${value}" must be a string`)
}
