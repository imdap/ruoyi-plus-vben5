import { TSESLint } from '@typescript-eslint/utils'
import { TSESTree } from '@typescript-eslint/types'
/**
 * Parameters for generating comment-after fixes for a single node.
 */
interface MakeSingleNodeCommentAfterFixesParameters {
  /**
   * The node in its sorted position.
   */
  sortedNode: TSESTree.Token | TSESTree.Node
  /**
   * The node in its original position.
   */
  node: TSESTree.Token | TSESTree.Node
  /**
   * ESLint source code object for accessing comments and tokens.
   */
  sourceCode: TSESLint.SourceCode
  /**
   * ESLint fixer object for creating fix operations.
   */
  fixer: TSESLint.RuleFixer
}
/**
 * Generates fixes to move inline trailing comments with their associated nodes.
 *
 * When a node is moved during sorting, this function ensures that any inline
 * comment on the same line (trailing comment) is moved along with it. This
 * preserves the relationship between code and its inline documentation.
 *
 * The function:
 *
 * - Detects inline comments after the sorted node
 * - Skips processing if nodes would end up on the same line
 * - Removes the comment from its original position
 * - Inserts it after the node's new position.
 *
 * @example
 *
 * ```ts
 * // Original:
 * const b = 2 // second value
 * const a = 1 // first value
 *
 * // After sorting (with comment fixes):
 * const a = 1 // first value
 * const b = 2 // second value
 * ```
 *
 * @param params - Parameters for generating comment fixes.
 * @returns Array of ESLint fix operations, empty if no inline comment exists.
 */
export declare function makeSingleNodeCommentAfterFixes({
  sortedNode,
  sourceCode,
  fixer,
  node,
}: MakeSingleNodeCommentAfterFixesParameters): TSESLint.RuleFix[]
export {}
