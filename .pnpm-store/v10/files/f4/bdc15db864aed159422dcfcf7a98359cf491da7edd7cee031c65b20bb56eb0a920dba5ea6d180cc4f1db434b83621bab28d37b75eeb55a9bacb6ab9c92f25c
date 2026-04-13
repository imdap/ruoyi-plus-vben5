/**
 * Checks if a comment has standard syntax.
 * @param {import('postcss').Comment} comment - The comment node to check.
 * @returns {boolean} True if the comment has standard syntax, false otherwise.
 */
export function isStandardSyntaxComment (comment) {
	// We check both here because the Sass parser uses `raws.inline` to indicate
	// inline comments, while the Less parser uses `inline`.
	if (`inline` in comment) return false

	if (`inline` in comment.raws) return false

	return true
}
