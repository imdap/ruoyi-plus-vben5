/**
 * Checks whether a combinator is standard (i.e. not a reference combinator).
 * @param {import('postcss-selector-parser').Combinator} node - The combinator node to check.
 * @returns {boolean} True if the combinator is standard, false otherwise.
 */
export function isStandardSyntaxCombinator (node) {
	// if it's not a combinator, then it's not a standard combinator
	if (node.type !== `combinator`) return false

	// Ignore reference combinators like `/deep/`
	if (node.value.startsWith(`/`) || node.value.endsWith(`/`)) return false

	// ignore the combinators that are the first or last node in their container
	if (node.parent !== undefined && node.parent !== null) {
		let parent = node.parent

		if (node === parent.first) return false

		if (node === parent.last) return false
	}

	return true
}
