/**
 * Checks whether the Node is processed by `postcss-styled-syntax`.
 * @param {import('postcss').Node} node - The node to check.
 * @returns {boolean} True if the node is processed by postcss-styled-syntax, false otherwise.
 */
export function isStyledSyntaxNode (node) {
	return node.parent?.raws.styledSyntaxRangeStart !== undefined
}
