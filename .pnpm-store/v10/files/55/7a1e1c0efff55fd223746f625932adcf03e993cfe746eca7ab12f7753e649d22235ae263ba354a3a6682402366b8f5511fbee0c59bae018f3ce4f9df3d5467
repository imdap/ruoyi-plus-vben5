import valueParser from "postcss-value-parser"

import { blurInterpolation } from "../blurInterpolation/index.js"
import { isStandardSyntaxValue } from "../isStandardSyntaxValue/index.js"

/**
 * Gets the dimension (number and unit) from a value node.
 * @param {import('postcss-value-parser').Node} node - The value parser node.
 * @returns {{unit: null, number: null} | valueParser.Dimension} The dimension object, or null values if not found
 */
export function getDimension (node) {
	if (!node || !node.value) {
		return {
			unit: null,
			number: null,
		}
	}

	// Ignore non-word nodes
	if (node.type !== `word`) {
		return {
			unit: null,
			number: null,
		}
	}

	// Ignore non standard syntax
	if (!isStandardSyntaxValue(node.value)) {
		return {
			unit: null,
			number: null,
		}
	}

	// Ignore HEX
	if (node.value.startsWith(`#`)) {
		return {
			unit: null,
			number: null,
		}
	}

	// Remove non standard stuff
	let value = blurInterpolation(node.value, ``)
		// ignore hack unit
		.replace(`\\0`, ``)
		.replace(`\\9`, ``)

	let parsedUnit = valueParser.unit(value)

	if (!parsedUnit) {
		return {
			unit: null,
			number: null,
		}
	}

	return parsedUnit
}
