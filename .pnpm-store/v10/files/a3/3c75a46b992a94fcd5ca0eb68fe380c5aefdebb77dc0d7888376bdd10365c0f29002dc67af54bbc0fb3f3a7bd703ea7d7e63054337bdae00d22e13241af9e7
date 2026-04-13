import valueParser from "postcss-value-parser"
import stylelint from "stylelint"

import { declarationValueIndex } from "../declarationValueIndex/index.js"
import { getDeclarationValue } from "../getDeclarationValue/index.js"
import { isStandardSyntaxFunction } from "../isStandardSyntaxFunction/index.js"
import { setDeclarationValue } from "../setDeclarationValue/index.js"

const COMMENT_PATTERN = / *\/(?:\*.*?\*\/(?!\S)|\/.*)/

let { utils: { report } } = stylelint

/** @typedef {import('postcss-value-parser').Node} ValueParserNode */
/** @typedef {import('postcss-value-parser').DivNode} ValueParserDivNode */
/**
 * A function that checks whitespace at a specific location.
 * @typedef {(args: { source: string, index: number, err: (message: string) => void }) => void} LocationChecker
 */

/**
 * Checks whitespace around commas in function arguments.
 * @param {{
 *   root: import('postcss').Root,
 *   locationChecker: LocationChecker,
 *   fix: ((node: ValueParserDivNode, index: number, nodes: ValueParserNode[]) => boolean),
 *   result: import('stylelint').PostcssResult,
 *   checkedRuleName: string,
 * }} opts - The options object
 */
export function functionCommaSpaceChecker (opts) {
	opts.root.walkDecls((decl) => {
		let declValue = getDeclarationValue(decl)

		let hasFixed
		let parsedValue = valueParser(declValue)

		parsedValue.walk((valueNode) => {
			if (valueNode.type !== `function`) return

			if (!isStandardSyntaxFunction(valueNode)) return

			// Ignore `url()` arguments, which may contain data URIs or other funky stuff
			if (valueNode.value.toLowerCase() === `url`) return

			let argumentStrings = valueNode.nodes.map((node) => valueParser.stringify(node))

			let functionArguments = (() => {
				// Remove function name and parens
				let result = valueNode.before + argumentStrings.join(``) + valueNode.after

				// 1. Remove comments including preceding whitespace (when only succeeded by whitespace)
				// 2. Remove all other comments, but leave adjacent whitespace intact
				result = result.replace(COMMENT_PATTERN, ``)

				return result
			})()

			/**
			 * Gets the index of the comma for checking.
			 * @param {ValueParserDivNode} commaNode The comma node.
			 * @param {number} nodeIndex The index of the comma node.
			 * @returns {number} The index of the comma for checking.
			 */
			function getCommaCheckIndex (commaNode, nodeIndex) {
				let commaBefore = valueNode.before + argumentStrings.slice(0, nodeIndex).join(``) + commaNode.before

				// 1. Remove comments including preceding whitespace (when only succeeded by whitespace)
				// 2. Remove all other comments, but leave adjacent whitespace intact
				commaBefore = commaBefore.replace(COMMENT_PATTERN, ``)

				return commaBefore.length
			}

			/** @type {{ commaNode: ValueParserDivNode, checkIndex: number, nodeIndex: number }[]} */
			let commaDataList = []

			for (let [nodeIndex, node] of valueNode.nodes.entries()) {
				if (node.type !== `div` || node.value !== `,`) continue

				let checkIndex = getCommaCheckIndex(node, nodeIndex)

				commaDataList.push({
					commaNode: node,
					checkIndex,
					nodeIndex,
				})
			}

			function createErrHandler (commaNode, nodeIndex) {
				return (message) => {
					let index = declarationValueIndex(decl) + commaNode.sourceIndex + commaNode.before.length

					report({
						index,
						endIndex: index,
						message,
						node: decl,
						result: opts.result,
						ruleName: opts.checkedRuleName,
						fix: opts.fix
							? () => {
								hasFixed = true

								return opts.fix(commaNode, nodeIndex, valueNode.nodes)
							}
							: undefined,
					})
				}
			}

			for (let { commaNode, checkIndex, nodeIndex } of commaDataList) {
				opts.locationChecker({
					source: functionArguments,
					index: checkIndex,
					err: createErrHandler(commaNode, nodeIndex),
				})
			}
		})

		if (hasFixed) setDeclarationValue(decl, parsedValue.toString())
	})
}
