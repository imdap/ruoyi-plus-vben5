import { isScssVariable } from "../isScssVariable/index.js"
import { isRule } from "../typeGuards/index.js"

/**
 * Checks whether a declaration is standard (i.e. not a preprocessor construct).
 * @param {import('postcss').Declaration | import('postcss-less').Declaration} decl - The declaration node to check.
 * @returns {boolean} True if the declaration is standard syntax, false otherwise.
 */
export function isStandardSyntaxDeclaration (decl) {
	let prop = decl.prop
	let parent = decl.parent

	// SCSS var; covers map and list declarations
	if (isScssVariable(prop)) return false

	// Less var (e.g. @var: x), but exclude variable interpolation (e.g. @{var})
	if (prop[0] === `@` && prop[1] !== `{`) return false

	// Less map declaration
	if (parent && parent.type === `atrule` && parent.raws.afterName === `:`) return false

	// Less map (e.g. #my-map() { myprop: red; })
	if (parent && isRule(parent) && parent.selector && parent.selector.startsWith(`#`) && parent.selector.endsWith(`()`)) return false

	// Sass nested properties (e.g. border: { style: solid; color: red; })
	if (parent && isRule(parent) && parent.selector && parent.selector.at(-1) === `:` && parent.selector.slice(0, 2) !== `--`) return false

	// Less &:extend
	if (`extend` in decl && decl.extend) return false

	return true
}
