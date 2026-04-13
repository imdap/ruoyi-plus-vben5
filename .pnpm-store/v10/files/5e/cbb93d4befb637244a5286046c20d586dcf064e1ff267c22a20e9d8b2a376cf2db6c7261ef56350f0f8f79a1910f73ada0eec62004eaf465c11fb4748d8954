/**
 * Stringifies a PostCSS node including its raw "before" string.
 * @param {import('postcss').Node} node - The PostCSS node to stringify.
 * @returns {string} The stringified node including raw before string.
 */
export function rawNodeString (node) {
	let result = ``

	if (node.raws.before) result += node.raws.before

	result += node.toString()

	return result
}
