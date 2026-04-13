/** @typedef {import('postcss').Node} PostcssNode */

/**
 * Gets the next non-comment node in a PostCSS AST at or after a given node.
 * @param {PostcssNode | void} startNode - The starting node.
 * @returns {PostcssNode | null} The next non-comment node, or null if none exists.
 */
export function nextNonCommentNode (startNode) {
	if (!startNode || !startNode.next) return null

	if (startNode.type === `comment`) return nextNonCommentNode(startNode.next())

	return startNode
}
