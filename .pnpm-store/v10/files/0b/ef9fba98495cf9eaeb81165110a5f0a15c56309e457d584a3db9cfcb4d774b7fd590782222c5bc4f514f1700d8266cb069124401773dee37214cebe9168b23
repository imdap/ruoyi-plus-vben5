import stylelint from "stylelint"

import { isStandardSyntaxCombinator } from "../isStandardSyntaxCombinator/index.js"
import { isStandardSyntaxRule } from "../isStandardSyntaxRule/index.js"
import { parseSelector } from "../parseSelector/index.js"

let { utils: { report } } = stylelint

/**
 * A function that checks whitespace at a specific location.
 * @typedef {(args: { source: string, index: number, errTarget: string, err: (message: string) => void }) => void} LocationChecker
 */

/**
 * Checks whitespace around selector combinators.
 * @param {{
 *   root: import('postcss').Root,
 *   result: import('stylelint').PostcssResult,
 *   locationChecker: LocationChecker,
 *   locationType: 'before' | 'after',
 *   checkedRuleName: string,
 *   fix: ((combinator: import('postcss-selector-parser').Combinator) => boolean),
 * }} opts - The options object
 * @returns {void}
 */
export function selectorCombinatorSpaceChecker (opts) {
	let hasFixed

	opts.root.walkRules((rule) => {
		if (!isStandardSyntaxRule(rule)) return

		hasFixed = false

		let selector = rule.raws.selector ? rule.raws.selector.raw : rule.selector

		let fixedSelector = parseSelector(selector, opts.result, rule, (selectorTree) => {
			selectorTree.walkCombinators((node) => {
				// Ignore non-standard combinators
				if (!isStandardSyntaxCombinator(node)) return

				// Ignore spaced descendant combinator
				if ((/\s/).test(node.value)) return

				// Check the exist of node in prev of the combinator.
				// in case some that aren't the first begin with combinators (nesting syntax)
				if (opts.locationType === `before` && !node.prev()) return

				let parentParentNode = node.parent && node.parent.parent

				// Ignore pseudo-classes selector like `.foo:nth-child(2n + 1) {}`
				if (parentParentNode && parentParentNode.type === `pseudo`) return

				let sourceIndex = node.sourceIndex
				let index = node.value.length > 1 && opts.locationType === `before` ? sourceIndex : sourceIndex + node.value.length - 1

				check(selector, node, index, rule, sourceIndex)
			})
		})

		if (hasFixed && fixedSelector) {
			if (rule.raws.selector) rule.raws.selector.raw = fixedSelector
			else rule.selector = fixedSelector
		}
	})

	/**
	 * Checks a combinator for whitespace violations.
	 * @param {string} source - The source string.
	 * @param {import('postcss-selector-parser').Combinator} combinator - The combinator node.
	 * @param {number} index - The index to check.
	 * @param {import('postcss').Node} node - The parent node.
	 * @param {number} sourceIndex - The source index of the combinator.
	 */
	function check (source, combinator, index, node, sourceIndex) {
		opts.locationChecker({
			source,
			index,
			errTarget: combinator.value,
			err: (message) => {
				report({
					message,
					node,
					index: sourceIndex,
					endIndex: sourceIndex,
					result: opts.result,
					ruleName: opts.checkedRuleName,
					fix: opts.fix
						? () => {
							hasFixed = true

							return opts.fix(combinator)
						}
						: undefined,
				})
			},
		})
	}
}
