import { TSESTree } from '@typescript-eslint/types'
import { TSESLint } from '@typescript-eslint/utils'
import { CommonPartitionOptions } from '../types/common-partition-options.js'
/**
 * Parameters for determining the complete range of a node.
 *
 * Configures how to calculate the node's range including associated comments
 * and parentheses.
 */
interface GetNodeRangeParameters {
  /**
   * Optional configuration for comment handling.
   */
  options?: Pick<CommonPartitionOptions, 'partitionByComment'>
  /**
   * Whether to exclude the highest-level block comment from the range. Useful
   * for preserving file-level documentation comments in their original
   * position.
   */
  ignoreHighestBlockComment?: boolean
  /**
   * ESLint source code object for accessing comments and tokens.
   */
  sourceCode: TSESLint.SourceCode
  /**
   * AST node to get the range for.
   */
  node: TSESTree.Node
}
/**
 * Determines the complete range of a node including its associated comments.
 *
 * Calculates the full range that should be considered when moving or analyzing
 * a node. This includes:
 *
 * - The node itself
 * - Parentheses surrounding the node (if any)
 * - Preceding comments that "belong" to the node.
 *
 * The function intelligently determines which comments should be included by:
 *
 * - Including comments directly above the node (no empty lines between)
 * - Stopping at partition comments (used to separate sections)
 * - Stopping at ESLint disable/enable comments
 * - Optionally excluding the highest block comment (e.g., file headers).
 *
 * @example
 *
 * ```ts
 * // Source code:
 * // This comment belongs to the function
 * // So does this one
 * function foo() {}
 *
 * const range = getNodeRange({ node: functionNode, sourceCode })
 * // Returns range including both comments
 * ```
 *
 * @example
 *
 * ```ts
 * // Source code:
 * /* File header comment *\/
 * // Function comment
 * function bar() { }
 *
 * const range = getNodeRange({
 * node: functionNode,
 * sourceCode,
 * ignoreHighestBlockComment: true
 * });
 * // Returns range including line comment but not block comment
 * ```
 *
 * @param params - Parameters for range calculation.
 * @returns Tuple of [start, end] positions including relevant comments.
 */
export declare function getNodeRange({
  ignoreHighestBlockComment,
  sourceCode,
  options,
  node,
}: GetNodeRangeParameters): TSESTree.Range
export {}
