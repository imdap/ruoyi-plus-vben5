import { TSESLint } from '@typescript-eslint/utils'
import { CommonGroupsOptions } from '../types/common-groups-options.js'
import { SortingNode } from '../types/sorting-node.js'
/**
 * Parameters for generating comment-above fixes.
 */
interface MakeCommentAboveFixesParameters {
  /**
   * Configuration options containing groups and custom groups.
   */
  options: Pick<
    CommonGroupsOptions<string, unknown, unknown>,
    'customGroups' | 'groups'
  >
  /**
   * ESLint source code object for accessing comments and tokens.
   */
  sourceCode: TSESLint.SourceCode
  /**
   * Sorted array of nodes to process for comment fixes.
   */
  sortedNodes: SortingNode[]
  /**
   * ESLint fixer object for creating fix operations.
   */
  fixer: TSESLint.RuleFixer
}
/**
 * Generates fixes for adding or removing comment separators above groups.
 *
 * Processes sorted nodes to ensure that comment separators defined in the
 * groups configuration are properly placed. This includes:
 *
 * - Adding missing comment separators above groups
 * - Removing auto-generated comments that are no longer needed
 * - Ensuring comments are in the correct position after sorting.
 *
 * The function handles the first node specially (checking if it needs a
 * comment) and then processes pairs of adjacent nodes to determine comment
 * placement.
 *
 * @example
 *
 * ```ts
 * // Configuration with commentAbove
 * const groups = ['imports', { commentAbove: 'Components' }, 'components']
 *
 * // Will add '// Components' comment above the components group
 * // Will remove any misplaced auto-generated comments
 * ```
 *
 * @param params - Parameters for generating fixes.
 * @returns Array of ESLint fix operations to apply.
 */
export declare function makeCommentAboveFixes({
  sortedNodes,
  sourceCode,
  options,
  fixer,
}: MakeCommentAboveFixesParameters): TSESLint.RuleFix[]
export {}
