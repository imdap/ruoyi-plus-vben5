/**
 * Gets the value of a CSS declaration.
 * @param {import('postcss').Declaration} decl - The CSS declaration node.
 * @returns {string} The declaration value, including raw whitespace.
 */
export function getDeclarationValue (decl) {
	let raws = decl.raws

	return (raws.value && raws.value.raw) || decl.value
}
