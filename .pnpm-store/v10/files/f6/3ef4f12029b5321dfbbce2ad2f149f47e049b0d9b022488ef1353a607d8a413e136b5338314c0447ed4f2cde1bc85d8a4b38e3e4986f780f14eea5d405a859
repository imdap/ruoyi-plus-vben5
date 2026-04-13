/**
 * Removes empty lines after a node. Mutates the node.
 * @template {import('postcss').Rule | import('postcss').AtRule} T
 * @param {T} node - The PostCSS node to modify.
 * @param {string} newline - The newline character to use.
 * @returns {T} The modified node.
 */
export function removeEmptyLinesAfter (node, newline) {
	node.raws.after = node.raws.after ? node.raws.after.replaceAll(/(\r?\n\s*\n)+/g, newline) : ``

	return node
}
