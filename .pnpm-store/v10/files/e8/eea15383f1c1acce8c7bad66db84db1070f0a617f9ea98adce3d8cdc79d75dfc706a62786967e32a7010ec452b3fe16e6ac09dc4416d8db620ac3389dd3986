import { TSESLint } from '@typescript-eslint/utils'
import { NewlinesBetweenValueGetter } from './get-newlines-between-errors.js'
import { CommonPartitionOptions } from '../types/common-partition-options.js'
import { CommonGroupsOptions } from '../types/common-groups-options.js'
import { SortingNode } from '../types/sorting-node.js'
export declare const RIGHT = 'right'
export declare const LEFT = 'left'
export declare const ORDER_ERROR: 'Expected "{{right}}" to come before "{{left}}".'
export declare const DEPENDENCY_ORDER_ERROR: 'Expected dependency "{{right}}" to come before "{{nodeDependentOnRight}}".'
export declare const GROUP_ORDER_ERROR: 'Expected "{{right}}" ({{rightGroup}}) to come before "{{left}}" ({{leftGroup}}).'
export declare const EXTRA_SPACING_ERROR: 'Extra spacing between "{{left}}" and "{{right}}".'
export declare const MISSED_SPACING_ERROR: 'Missed spacing between "{{left}}" and "{{right}}".'
export declare const MISSED_COMMENT_ABOVE_ERROR: 'Missed comment "{{missedCommentAbove}}" above "{{right}}".'
/**
 * Parameters for reporting ESLint errors with auto-fix support.
 *
 * @template MessageIds - Union of available message IDs for the rule.
 * @template T - Type of sorting node extending the base SortingNode.
 */
interface ReportErrorsParameters<
  MessageIds extends string,
  T extends SortingNode,
> {
  options?: Pick<CommonPartitionOptions, 'partitionByComment'> &
    CommonGroupsOptions<string, unknown, unknown>
  newlinesBetweenValueGetter?: NewlinesBetweenValueGetter<T>
  context: TSESLint.RuleContext<MessageIds, unknown[]>
  ignoreFirstNodeHighestBlockComment?: boolean
  firstUnorderedNodeDependentOnRight?: T
  sourceCode: TSESLint.SourceCode
  commentAboveMissing?: string
  messageIds: MessageIds[]
  sortedNodes: T[]
  left: null | T
  nodes: T[]
  right: T
}
/**
 * Reports ESLint errors with contextual data and auto-fix support.
 *
 * Generates ESLint error reports for each provided message ID, including:
 *
 * - Contextual data for error messages (element names, groups, dependencies)
 * - Auto-fix function that applies all necessary corrections
 * - Node location for error highlighting.
 *
 * The function supports dynamic message templates with placeholders that are
 * replaced with actual values:
 *
 * - {{left}} / {{right}} - Element names in the comparison
 * - {{leftGroup}} / {{rightGroup}} - Group names
 * - {{nodeDependentOnRight}} - Name of dependent element
 * - {{missedCommentAbove}} - Missing comment text.
 *
 * @example
 *
 * ```ts
 * // Reporting import order violation
 * reportErrors({
 *   messageIds: ['unexpectedOrder'],
 *   left: { name: 'useState', group: 'react' },
 *   right: { name: 'React', group: 'react' },
 *   // Error: "Expected 'React' to come before 'useState'"
 * })
 * ```
 *
 * @example
 *
 * ```ts
 * // Reporting dependency violation in TypeScript interfaces
 * reportErrors({
 * messageIds: ['unexpectedDependencyOrder'],
 * right: { name: 'User', ... },
 * firstUnorderedNodeDependentOnRight: { name: 'AdminUser extends User', ... },
 * // Error: "Expected 'User' to come before 'AdminUser extends User' due to dependency"
 * });
 * ```
 *
 * @example
 *
 * ```ts
 * // Reporting missing newlines between import groups
 * reportErrors({
 *   messageIds: ['missedSpacingBetweenMembers'],
 *   left: { name: 'React', group: 'external' },
 *   right: { name: './utils', group: 'internal' },
 *   // Error: "Expected newline between external and internal imports"
 * })
 * ```
 *
 * @template MessageIds - Union of message IDs.
 * @template T - Type of sorting node.
 * @param params - Parameters for error reporting.
 */
export declare function reportErrors<
  MessageIds extends string,
  T extends SortingNode,
>({
  firstUnorderedNodeDependentOnRight,
  ignoreFirstNodeHighestBlockComment,
  newlinesBetweenValueGetter,
  commentAboveMissing,
  sortedNodes,
  messageIds,
  sourceCode,
  context,
  options,
  nodes,
  right,
  left,
}: ReportErrorsParameters<MessageIds, T>): void
export {}
