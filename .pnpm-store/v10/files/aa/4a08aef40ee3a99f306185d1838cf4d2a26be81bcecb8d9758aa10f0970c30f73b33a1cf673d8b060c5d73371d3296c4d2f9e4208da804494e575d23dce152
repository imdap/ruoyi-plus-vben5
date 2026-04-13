import { TSESLint } from '@typescript-eslint/utils'
import { NewlinesBetweenValueGetter } from './get-newlines-between-errors.js'
import { CommonPartitionOptions } from '../types/common-partition-options.js'
import { CommonGroupsOptions } from '../types/common-groups-options.js'
import { SortingNode } from '../types/sorting-node.js'
/**
 * Parameters for comprehensive error reporting across all sorting rules.
 *
 * @template MessageIds - Union of available message IDs for the rule.
 * @template T - Type of sorting node extending the base SortingNode.
 */
interface ReportAllErrorsParameters<
  MessageIds extends string,
  T extends SortingNode,
> {
  /**
   * Available message IDs for different types of violations.
   *
   * Each rule can customize these messages to provide context-specific error
   * descriptions. Not all message types are required - only provide those
   * relevant to the specific rule.
   *
   * @example
   *
   * ```ts
   * // Class members rule with all message types
   * availableMessageIds: {
   * unexpectedOrder: 'unexpectedClassesOrder',
   * unexpectedGroupOrder: 'unexpectedClassesGroupOrder',
   * unexpectedDependencyOrder: 'unexpectedClassesDependencyOrder',
   * missedSpacingBetweenMembers: 'missedSpacingBetweenClassMembers',
   * extraSpacingBetweenMembers: 'extraSpacingBetweenClassMembers',
   * missedCommentAbove: 'missedCommentAboveClassMember'
   * }
   * ```
   */
  availableMessageIds: {
    /**
     * Message when required spacing between members is missing.
     */
    missedSpacingBetweenMembers?: MessageIds
    /**
     * Message when there's extra spacing where it shouldn't be.
     */
    extraSpacingBetweenMembers?: MessageIds
    /**
     * Message when a dependency order is violated.
     */
    unexpectedDependencyOrder?: MessageIds
    /**
     * Message when elements are in wrong groups.
     */
    unexpectedGroupOrder: MessageIds
    /**
     * Message when a required comment above a group is missing.
     */
    missedCommentAbove?: MessageIds
    /**
     * Message for general ordering violations within a group.
     */
    unexpectedOrder: MessageIds
  }
  /**
   * Configuration options for sorting and grouping.
   *
   * Extends MakeFixesParameters options with groups configuration. Includes
   * all sorting preferences, partition settings, newlines configuration, and
   * custom group definitions.
   *
   * @example
   *
   * ```ts
   * options: {
   * type: 'alphabetical',
   * order: 'asc',
   * groups: ['static-property', 'property', 'constructor', 'method'],
   * newlinesBetween: 1,
   * partitionByComment: true
   * }
   * ```
   */
  options: Pick<CommonPartitionOptions, 'partitionByComment'> &
    CommonGroupsOptions<string, unknown, unknown>
  /**
   * Function to get sorted nodes with or without ESLint-disabled nodes.
   *
   * This function is called twice by reportAllErrors:
   *
   * 1. With `false` to get all nodes for position mapping
   * 2. With `true` to get nodes excluding disabled ones for error checking.
   *
   * This dual-call pattern ensures that ESLint-disabled nodes maintain their
   * positions while not being considered for ordering violations.
   *
   * @param ignoreEslintDisabledNodes - Whether to exclude ESLint-disabled
   *   nodes.
   * @returns Array of sorted nodes.
   */
  sortNodesExcludingEslintDisabled(ignoreEslintDisabledNodes: boolean): T[]
  /**
   * Optional function to determine newlines between specific node pairs.
   *
   * Allows rules to customize spacing logic for special cases, such as
   * overload signatures in TypeScript or getter/setter pairs.
   *
   * @example
   *
   * ```ts
   * // Classes: Keep overload signatures together
   * newlinesBetweenValueGetter: ({
   *   left,
   *   right,
   *   computedNewlinesBetween,
   * }) => {
   *   if (
   *     left.overloadSignaturesGroupId ===
   *     right.overloadSignaturesGroupId
   *   ) {
   *     return 0 // No newlines between overloads
   *   }
   *   return computedNewlinesBetween
   * }
   * ```
   */
  newlinesBetweenValueGetter?: NewlinesBetweenValueGetter<T>
  /**
   * ESLint rule context for reporting errors.
   *
   * Used to access rule configuration, report violations, and provide fixes.
   * The context includes the rule ID, options, settings, and methods for
   * interacting with ESLint.
   */
  context: TSESLint.RuleContext<MessageIds, unknown[]>
  /**
   * Whether to ignore the highest block comment above the first node.
   *
   * When true, preserves file-level documentation comments at the top of
   * sorted blocks. This is useful for maintaining copyright headers, file
   * descriptions, or other important documentation.
   */
  ignoreFirstNodeHighestBlockComment?: boolean
  /**
   * Array of all nodes to check for ordering violations.
   *
   * These are the nodes in their current order in the source code. The
   * function will compare this order against the sorted order to identify and
   * report all violations.
   */
  nodes: T[]
}
/**
 * Detects and reports all sorting violations in a comprehensive manner.
 *
 * Performs a complete analysis of sorting errors including:
 *
 * - Order violations (elements in wrong positions)
 * - Group order violations (elements in wrong groups)
 * - Dependency violations (dependent elements before their dependencies)
 * - Spacing issues (missing or extra newlines between groups)
 * - Missing comment separators above groups.
 *
 * The function uses pairwise comparison to check each adjacent pair of nodes
 * and accumulates all applicable error messages for each violation.
 *
 * @example
 *
 * ```ts
 * // Import statements with violations
 * import { useState } from 'react' // Should be after React import
 * import React from 'react' // Group order violation
 * import type { User } from './types.js' // Missing newline between groups
 * ```
 *
 * @example
 *
 * ```ts
 * // Object properties with dependency violation
 * const config = {
 *   apiUrl: process.env.API_URL,
 *   baseUrl: this.apiUrl + '/v1', // Depends on apiUrl
 *   timeout: 5000,
 *   headers: {
 *     Authorization: this.token, // Should be after token definition
 *   },
 *   token: getAuthToken(),
 * }
 * ```
 *
 * @template MessageIds - Union of available message IDs.
 * @template T - Type of sorting node.
 * @param params - Parameters for error detection and reporting.
 */
export declare function reportAllErrors<
  MessageIds extends string,
  T extends SortingNode = SortingNode,
>({
  ignoreFirstNodeHighestBlockComment,
  sortNodesExcludingEslintDisabled,
  newlinesBetweenValueGetter,
  availableMessageIds,
  context,
  options,
  nodes,
}: ReportAllErrorsParameters<MessageIds, T>): void
export {}
