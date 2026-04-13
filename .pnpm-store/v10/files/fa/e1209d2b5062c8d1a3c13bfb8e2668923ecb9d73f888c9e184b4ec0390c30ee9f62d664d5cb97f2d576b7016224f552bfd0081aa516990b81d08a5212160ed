/** @typedef {import('postcss').Node} Node */
/** @typedef {import('postcss').Source} NodeSource */

/**
 * Checks if a node is a PostCSS Root node.
 * @param {Node} node - The node to check.
 * @returns {node is import('postcss').Root} True if the node is a Root, false otherwise.
 */
export function isRoot (node) {
	return node.type === `root`
}

/**
 * Checks if a node is a PostCSS Rule node.
 * @param {Node} node - The node to check.
 * @returns {node is import('postcss').Rule} True if the node is a Rule, false otherwise.
 */
export function isRule (node) {
	return node.type === `rule`
}

/**
 * Checks if a node is a PostCSS AtRule node.
 * @param {Node} node - The node to check.
 * @returns {node is import('postcss').AtRule} True if the node is an AtRule, false otherwise.
 */
export function isAtRule (node) {
	return node.type === `atrule`
}

/**
 * Checks if a node is a PostCSS Comment node.
 * @param {Node} node - The node to check.
 * @returns {node is import('postcss').Comment} True if the node is a Comment, false otherwise.
 */
export function isComment (node) {
	return node.type === `comment`
}

/**
 * Checks if a node is a PostCSS Declaration node.
 * @param {Node} node - The node to check.
 * @returns {node is import('postcss').Declaration} True if the node is a Declaration, false otherwise.
 */
export function isDeclaration (node) {
	return node.type === `decl`
}

/**
 * Checks if a node is a PostCSS Document node.
 * @param {Node} node - The node to check.
 * @returns {node is import('postcss').Document} True if the node is a Document, false otherwise.
 */
export function isDocument (node) {
	return node.type === `document`
}

/**
 * Checks if a value parser node is a Function node.
 * @param {import('postcss-value-parser').Node} node - The node to check.
 * @returns {node is import('postcss-value-parser').FunctionNode} True if the node is a Function, false otherwise.
 */
export function isValueFunction (node) {
	return node.type === `function`
}

/**
 * Checks if a node has a source property.
 * @param {Node} node - The node to check.
 * @returns {node is (Node & {source: NodeSource})} True if the node has a source, false otherwise
 */
export function hasSource (node) {
	return Boolean(node.source)
}
