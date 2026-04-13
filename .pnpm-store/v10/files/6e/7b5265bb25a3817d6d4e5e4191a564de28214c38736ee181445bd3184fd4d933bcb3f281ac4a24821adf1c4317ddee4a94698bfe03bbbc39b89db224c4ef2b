import { TSESTree } from '@typescript-eslint/types'
import { PartitionByCommentOption } from '../types/common-partition-options.js'
/**
 * Parameters for checking if a comment is a partition comment.
 */
interface IsPartitionCommentParameters {
  /**
   * Configuration for partition comments. Can be boolean, string/regex
   * pattern, array of patterns, or object with block/line specific settings.
   */
  partitionByComment: PartitionByCommentOption
  /**
   * The comment node to check.
   */
  comment: TSESTree.Comment
}
/**
 * Determines if a comment should be treated as a partition separator.
 *
 * Partition comments divide code into independent sections that are sorted
 * separately. This prevents elements from being moved across these boundaries
 * during sorting operations.
 *
 * The function handles various configuration formats:
 *
 * - `true`: All comments are partition comments
 * - `false`: No comments are partition comments
 * - String/Regex: Comments matching the pattern are partitions
 * - Array: Comments matching any pattern in the array are partitions
 * - Object: Different patterns for block and line comments.
 *
 * ESLint disable comments are never treated as partition comments to avoid
 * interfering with ESLint's functionality.
 *
 * @example
 *
 * ```ts
 * // Configuration: partitionByComment: true
 * isPartitionComment({ partitionByComment: true, comment })
 * // Returns: true for any non-ESLint-disable comment
 * ```
 *
 * @example
 *
 * ```ts
 * // Configuration: partitionByComment: 'Section:'
 * const comment = { value: ' Section: Utils ', type: 'Line' }
 * isPartitionComment({ partitionByComment: 'Section:', comment })
 * // Returns: true (comment contains 'Section:')
 * ```
 *
 * @example
 *
 * ```ts
 * // Configuration: partitionByComment: { block: true, line: '^-' }
 * const blockComment = { value: ' Helper functions ', type: 'Block' }
 * const lineComment = { value: '--- Utils ---', type: 'Line' }
 * isPartitionComment({
 *   partitionByComment: { block: true, line: '^-' },
 *   comment: blockComment,
 * })
 * // Returns: true (all block comments are partitions)
 * isPartitionComment({
 *   partitionByComment: { block: true, line: '^-' },
 *   comment: lineComment,
 * })
 * // Returns: true (line comment starts with '-')
 * ```
 *
 * @param params - Parameters for partition check.
 * @returns True if the comment is a partition separator, false otherwise.
 */
export declare function isPartitionComment({
  partitionByComment,
  comment,
}: IsPartitionCommentParameters): boolean
export {}
