import { TSESLint } from '@typescript-eslint/utils'
import { TSESTree } from '@typescript-eslint/types'
interface GetCommentsBeforeParameters {
  tokenValueToIgnoreBefore?: string
  sourceCode: TSESLint.SourceCode
  node: TSESTree.Node
}
/**
 * Returns a list of comments before a given node, excluding ones that are right
 * after code. Includes comment blocks, ignore shebang comments.
 *
 * @param params - Parameters object.
 * @param params.node - The node to get comments before.
 * @param params.sourceCode - The source code object.
 * @param [params.tokenValueToIgnoreBefore] - Allows the following token to
 *   directly precede the node.
 * @returns An array of comments before the given node.
 */
export declare function getCommentsBefore({
  tokenValueToIgnoreBefore,
  sourceCode,
  node,
}: GetCommentsBeforeParameters): TSESTree.Comment[]
export {}
