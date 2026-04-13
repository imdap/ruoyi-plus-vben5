/**
 * Checks whether a property is an SCSS variable.
 * @param {string} property - The property name to check.
 * @returns {boolean} True if the property is an SCSS variable, false otherwise.
 */
export function isScssVariable (property) {
	// SCSS var (e.g. $var: x), list (e.g. $list: (x)) or map (e.g. $map: (key:value))
	if (property.startsWith(`$`)) return true

	// SCSS var within a namespace (e.g. namespace.$var: x)
	if (property.includes(`.$`)) return true

	return false
}
