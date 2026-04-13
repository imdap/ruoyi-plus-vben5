import { TSESTree } from '@typescript-eslint/types'
import { TSESLint } from '@typescript-eslint/utils'
/**
 * Computes the name of a union/intersection member.
 *
 * Multi-line parenthesized unions/intersections can include leading `|` or `&`
 * in raw source text, while formatter output often omits them. To keep sorting
 * stable across both forms, the leading separator prefix is normalized.
 *
 * @param params - Parameters object.
 * @param params.sourceCode - ESLint source code object for text extraction.
 * @param params.type - Type node represented by the member text.
 * @returns Normalized member text used for sorting and matching.
 */
export declare function computeNodeName({
  sourceCode,
  type,
}: {
  sourceCode: TSESLint.SourceCode
  type: TSESTree.TypeNode
}): string
