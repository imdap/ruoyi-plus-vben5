import { CommonGroupsOptions } from '../types/common-groups-options.js'
import { CommonOptions } from '../types/common-options.js'
type Options = Pick<
  CommonGroupsOptions<string, unknown, unknown>,
  'customGroups' | 'groups'
> &
  CommonOptions
/**
 * Retrieves sorting options potentially overridden by a custom group or group
 * with settings configuration.
 *
 * Checks if the group at the specified index is a custom group with its own
 * sorting configuration. If so, returns the overridden options (type, order,
 * fallbackSort). Otherwise, returns the original options.
 *
 * Custom groups can override:
 *
 * - Sort type (e.g., use 'natural' instead of global 'alphabetical')
 * - Sort order (e.g., use 'desc' instead of global 'asc')
 * - Fallback sort configuration.
 *
 * @example
 *
 * ```ts
 * const options = {
 *   type: 'alphabetical',
 *   order: 'asc',
 *   fallbackSort: { type: 'natural' },
 *   groups: ['custom-group', 'other'],
 *   customGroups: [
 *     {
 *       groupName: 'custom-group',
 *       type: 'natural',
 *       order: 'desc',
 *     },
 *   ],
 * }
 * const overridden = computeOverriddenOptionsByGroupIndex(options, 0)
 * // Returns: { type: 'natural', order: 'desc', fallbackSort: { type: 'natural' } }
 * ```
 *
 * @param options - Combined group and sorting options.
 * @param groupIndex - Index of the group to check for overrides.
 * @returns Sorting options, potentially overridden by custom group
 *   configuration.
 */
export declare function computeOverriddenOptionsByGroupIndex<T extends Options>(
  options: T,
  groupIndex: number,
): T
export {}
