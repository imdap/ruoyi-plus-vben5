const HAS_EMPTY_LINE = /\n[\r\t ]*\n/

/**
 * Checks if a string contains at least one empty line.
 * @param {string | undefined} string - The string to check.
 * @returns {boolean} True if the string contains an empty line, false otherwise.
 */
export function hasEmptyLine (string) {
	if (string === `` || string === undefined) return false

	return HAS_EMPTY_LINE.test(string)
}
