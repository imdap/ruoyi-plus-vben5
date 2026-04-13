import styleSearch from "style-search"

let rangeOperators = [`>=`, `<=`, `>`, `<`, `=`]

/** @typedef {import('style-search').StyleSearchMatch} StyleSearchMatch */

/**
 * Finds media operator matches in an at-rule and invokes a callback for each.
 * @template {import('postcss').AtRule} T
 * @param {T} atRule - The at-rule to search.
 * @param {(match: StyleSearchMatch, params: string, atRule: T) => void} cb - The callback to invoke for each match.
 */
export function findMediaOperator (atRule, cb) {
	if (atRule.name.toLowerCase() !== `media`) return

	let params = atRule.raws.params ? atRule.raws.params.raw : atRule.params

	styleSearch({ source: params, target: rangeOperators }, (match) => {
		let before = params[match.startIndex - 1]

		if (before === `>` || before === `<`) return

		cb(match, params, atRule)
	})
}
