import { TSESLint } from '@typescript-eslint/utils'
import { NewlinesBetweenValueGetter } from './get-newlines-between-errors.js'
import { CommonGroupsOptions } from '../types/common-groups-options.js'
import { SortingNode } from '../types/sorting-node.js'
/**
 * Parameters for generating newlines-between fixes.
 *
 * @template T - Type of sorting node extending the base SortingNode.
 */
interface MakeNewlinesBetweenFixesParameters<T extends SortingNode> {
  /**
   * Optional function to customize newlines between specific nodes. Allows
   * overriding the default newlines behavior for specific cases.
   */
  newlinesBetweenValueGetter?: NewlinesBetweenValueGetter<T>
  /**
   * Configuration options for groups and newlines.
   */
  options: CommonGroupsOptions<string, unknown, unknown>
  /**
   * ESLint source code object for accessing text and locations.
   */
  sourceCode: TSESLint.SourceCode
  /**
   * ESLint fixer object for creating fix operations.
   */
  fixer: TSESLint.RuleFixer
  /**
   * Array of nodes in their sorted order.
   */
  sortedNodes: T[]
  /**
   * Array of nodes in their original order.
   */
  nodes: T[]
}
/**
 * Generates fixes for adjusting newlines between groups of sorted elements.
 *
 * Processes pairs of adjacent nodes to ensure the correct number of newlines
 * between them based on their group membership and configuration. The
 * function:
 *
 * - Skips nodes in different partitions (they're sorted independently)
 * - Skips cases where group order would be violated
 * - Respects 'ignore' settings that preserve existing spacing
 * - Calculates required newlines based on group configuration
 * - Applies custom newlines getter if provided.
 *
 * @example
 *
 * ```ts
 * // Configuration with newlines between groups
 * const options = {
 *   groups: ['imports', 'types', 'functions'],
 *   newlinesBetween: 1, // 1 newline between groups
 * }
 *
 * // Original: imports and types with no separation
 * // After fix: adds 1 blank line between import and type groups
 * ```
 *
 * @example
 *
 * ```ts
 * // Custom newlines getter
 * const newlinesBetweenValueGetter = ({
 *   left,
 *   right,
 *   computedNewlinesBetween,
 * }) => {
 *   // Add extra newline before main function
 *   if (right.name === 'main') {
 *     return computedNewlinesBetween + 1
 *   }
 *   return computedNewlinesBetween
 * }
 * ```
 *
 * @template T - Type of sorting node.
 * @param params - Parameters for generating newlines fixes.
 * @returns Array of ESLint fix operations to adjust spacing.
 */
export declare function makeNewlinesBetweenFixes<T extends SortingNode>({
  newlinesBetweenValueGetter,
  sortedNodes,
  sourceCode,
  options,
  fixer,
  nodes,
}: MakeNewlinesBetweenFixesParameters<T>): TSESLint.RuleFix[]
export {}
