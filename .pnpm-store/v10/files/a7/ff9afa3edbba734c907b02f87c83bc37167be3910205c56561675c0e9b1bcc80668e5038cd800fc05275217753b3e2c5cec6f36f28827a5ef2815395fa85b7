import { hasBlock } from "../hasBlock/index.js"

/**
 * Checks if a statement has an empty block.
 * @param {import('postcss').Rule | import('postcss').AtRule} statement - The PostCSS rule or at-rule node.
 * @returns {boolean} True if the statement has a block and it is empty.
 */
export function hasEmptyBlock (statement) {
	return hasBlock(statement) && statement.nodes.length === 0
}
