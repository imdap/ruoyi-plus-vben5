import { beforeBlockString } from "../beforeBlockString/index.js"
import { hasBlock } from "../hasBlock/index.js"
import { rawNodeString } from "../rawNodeString/index.js"

/**
 * Returns a CSS statement's block — the string that starts with `{` and ends with `}`.
 * If the statement has no block (e.g. `@import url(foo.css);`), returns an empty string.
 * @param {import('postcss').Container} statement - The PostCSS container node.
 * @returns {string} The block string content.
 */
export function blockString (statement) {
	if (!hasBlock(statement)) return ``

	return rawNodeString(statement).slice(beforeBlockString(statement).length)
}
