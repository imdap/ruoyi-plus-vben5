import styleSearch from "style-search"
import stylelint from "stylelint"

import { declarationValueIndex } from "../declarationValueIndex/index.js"

let { utils: { report } } = stylelint

/** @typedef {import('postcss').Declaration} Declaration */

/**
 * A function that checks whitespace at a specific location.
 * @typedef {(args: { source: string, index: number, err: (message: string) => void }) => void} LocationChecker
 */

/**
 * Checks whitespace around bang operators in declarations.
 * @param {{
 *   root: import('postcss').Root,
 *   locationChecker: LocationChecker,
 *   result: import('stylelint').PostcssResult,
 *   checkedRuleName: string,
 *   fix: ((decl: Declaration, index: number) => boolean),
 * }} opts - The options object
 * @returns {void}
 */
export function declarationBangSpaceChecker (opts) {
	opts.root.walkDecls((decl) => {
		let indexOffset = declarationValueIndex(decl)
		let declString = decl.toString()
		let valueString = decl.toString().slice(indexOffset)

		if (!valueString.includes(`!`)) return

		styleSearch({ source: valueString, target: `!` }, (match) => {
			check(declString, match.startIndex + indexOffset, decl)
		})
	})

	/**
	 * Checks a bang operator for whitespace violations.
	 * @param {string} source - The source string.
	 * @param {number} index - The index to check.
	 * @param {Declaration} decl - The declaration node.
	 */
	function check (source, index, decl) {
		opts.locationChecker({
			source,
			index,
			err: (message) => {
				report({
					message,
					node: decl,
					index,
					endIndex: index,
					result: opts.result,
					ruleName: opts.checkedRuleName,
					fix: opts.fix ? () => opts.fix(decl, index) : undefined,
				})
			},
		})
	}
}
