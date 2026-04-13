/**
 * Checks whether a function is standard (i.e. not a preprocessor construct).
 * @param {import('postcss-value-parser').Node} node - The function node to check.
 * @returns {boolean} True if the function is standard syntax, false otherwise.
 */
export function isStandardSyntaxFunction (node) {
	// Function nodes without names are things in parentheses like Sass lists
	if (!node.value) return false

	if (node.value.startsWith(`#{`)) return false

	// CSS-in-JS interpolation
	if (node.value.startsWith(`\${`)) return false

	// CSS-in-JS syntax
	if (node.value.startsWith(`\``)) return false

	return true
}
