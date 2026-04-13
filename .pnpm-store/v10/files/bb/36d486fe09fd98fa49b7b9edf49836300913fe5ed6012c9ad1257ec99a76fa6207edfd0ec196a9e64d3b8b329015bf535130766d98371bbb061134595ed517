import { isObject, isString } from "../validateTypes/index.js"

/**
 * Gets the index of a declaration's value.
 * @param {import('postcss').Declaration} decl - The CSS declaration node.
 * @returns {number} The starting index of the declaration's value.
 */
export function declarationValueIndex (decl) {
	let raws = decl.raws
	let prop = raws.prop
	let count = 0

	let items = [
		isObject(prop) && `prefix` in prop && prop.prefix,
		(isObject(prop) && `raw` in prop && prop.raw) || decl.prop,
		isObject(prop) && `suffix` in prop && prop.suffix,
		raws.between || `:`,
		raws.value && `prefix` in raws.value && raws.value.prefix,
	]

	for (let str of items) if (isString(str)) count += str.length

	return count
}
