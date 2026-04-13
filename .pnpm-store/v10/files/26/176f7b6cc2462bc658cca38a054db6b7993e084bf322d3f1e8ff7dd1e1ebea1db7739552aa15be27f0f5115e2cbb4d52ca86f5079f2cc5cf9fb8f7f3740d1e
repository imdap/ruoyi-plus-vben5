import { TSESLint } from '@typescript-eslint/utils'
import { TSESTree } from '@typescript-eslint/types'
/**
 * Extracts the name of a Map element for sorting purposes.
 *
 * For array expressions (key-value pairs), extracts the first element as the
 * key. Returns the literal raw value for literals, or the source code text for
 * other expressions.
 *
 * @param params - Parameters object.
 * @param params.sourceCode - The ESLint source code object.
 * @param params.node - The Map element expression to get the name from.
 * @returns The name to use for sorting this Map element.
 */
export declare function computeNodeName({
  sourceCode,
  node,
}: {
  sourceCode: TSESLint.SourceCode
  node: TSESTree.Expression
}): string
