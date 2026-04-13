import { GroupsOptions } from '../types/common-groups-options.js'
/**
 * Validates that consecutive objects in groups are merged into single objects.
 *
 * Prevents configuration confusion by ensuring that spacing and object-based
 * groups are consolidated.
 *
 * @example
 *
 * ```ts
 * // Invalid: Consecutive objects
 * validateObjectsInsideGroups({
 *   groups: [
 *     'react',
 *     { newlinesBetween: 1 },
 *     { newlinesBetween: 2 }, // Error: consecutive objects
 *     { group: 'group', commentAbove: '// External libraries' },
 *     'external',
 *   ],
 * })
 * // Throws: Consecutive `newlinesBetween` objects are not allowed
 * ```
 *
 * @example
 *
 * ```ts
 * // Valid: Merged into single object
 * validateObjectsInsideGroups({
 *   groups: [
 *     'react',
 *     {
 *       newlinesBetween: 1,
 *       commentAbove: '// External libraries',
 *     },
 *     'external',
 *   ],
 * })
 * // Correct: Single object with both directives
 * ```
 *
 * @example
 *
 * ```ts
 * // Valid: Non-consecutive objects
 * validateObjectsInsideGroups({
 *   groups: [
 *     'react',
 *     { newlinesBetween: 1 },
 *     'external',
 *     { newlinesBetween: 1 },
 *     'internal',
 *   ],
 * })
 * // OK: Objects separated by string groups
 * ```
 *
 * @param options - Configuration object containing groups.
 * @throws {Error} If consecutive objects are found in groups.
 */
export declare function validateObjectsInsideGroups({
  groups,
}: {
  groups: GroupsOptions
}): void
