import { hasInterpolation } from "../hasInterpolation/index.js"
import { isScssVariable } from "../isScssVariable/index.js"

/**
 * Checks whether a property is standard (i.e. not a preprocessor construct).
 * @param {string} property - The property to check.
 * @returns {boolean} True if the property is standard syntax, false otherwise.
 */
export function isStandardSyntaxProperty (property) {
	// SCSS var
	if (isScssVariable(property)) return false

	// Less var (e.g. @var: x)
	if (property.startsWith(`@`)) return false

	// Less append property value with space (e.g. transform+_: scale(2))
	if (property.endsWith(`+`) || property.endsWith(`+_`)) return false

	// SCSS or Less interpolation
	if (hasInterpolation(property)) return false

	return true
}
