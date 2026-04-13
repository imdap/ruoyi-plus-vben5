/** @type {number} */
const EXIT_CODE_INVALID_CONFIG = 78

/** @typedef {Error & { code: number }} ConfigurationError */

/**
 * Creates a configuration error from text and sets the CLI exit code.
 * @param {string} text - The error message text.
 * @returns {ConfigurationError} The configuration error object with exit code.
 */
export function configurationError (text) {
	let err = /** @type {ConfigurationError} */ (new Error(text))

	err.code = EXIT_CODE_INVALID_CONFIG

	return err
}
