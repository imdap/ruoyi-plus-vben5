/** @typedef {import('postcss').Declaration} Declaration */

/**
 * Sets the value of a CSS declaration.
 * @param {Declaration} decl - The CSS declaration node.
 * @param {string} value - The new value to set.
 * @returns {Declaration} The declaration that was passed in.
 */
export function setDeclarationValue (decl, value) {
	let raws = decl.raws

	if (raws.value) raws.value.raw = value
	else decl.value = value

	return decl
}
