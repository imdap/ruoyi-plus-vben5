import {
  CommonGroupsOptions,
  AnyOfCustomGroup,
} from '../types/common-groups-options.js'
/**
 * Parameters for computing the group of an element.
 *
 * @template CustomGroupMatchOptions - Type of custom group match options.
 */
interface ComputeGroupParameters<CustomGroupMatchOptions> {
  /**
   * Configuration options for grouping.
   */
  options: Pick<
    CommonGroupsOptions<string, unknown, CustomGroupMatchOptions>,
    'customGroups' | 'groups'
  >
  /**
   * Function to test if an element matches a custom group. Takes a custom
   * group configuration and returns true if the element matches.
   */
  customGroupMatcher: CustomGroupMatcher<CustomGroupMatchOptions>
  /**
   * List of predefined groups that the element belongs to. These are checked
   * after custom groups as a fallback.
   */
  predefinedGroups: string[]
}
type CustomGroupMatcher<MatchOptions> = (
  customGroup: AnyOfCustomGroup<MatchOptions> | Partial<MatchOptions>,
) => boolean
/**
 * Determines which group an element belongs to based on custom and predefined
 * groups.
 *
 * The function checks groups in the following priority order:
 *
 * 1. Custom groups (if defined) - checked first, highest priority
 * 2. Predefined groups - checked as fallback
 * 3. Returns 'unknown' if no matching group is found.
 *
 * Only groups that exist in options.groups are considered valid.
 *
 * @example
 *
 * ```ts
 * const group = computeGroup({
 *   options: {
 *     groups: ['react', 'external', 'internal'],
 *     customGroups: [{ groupName: 'react', anyOf: ['react', 'react-*'] }],
 *   },
 *   customGroupMatcher: customGroup => customGroup.anyOf.includes('react'),
 *   predefinedGroups: ['external'],
 *   name: 'react-dom',
 * })
 * // Returns: 'react'
 * ```
 *
 * @template CustomGroupMatchOptions - Type of custom group match options.
 * @param params - Parameters for group computation.
 * @param params.options - Configuration with available groups and custom
 *   groups.
 * @param params.customGroupMatcher - Matcher function for custom groups.
 * @param params.predefinedGroups - Fallback predefined groups to check.
 * @returns The matched group name or 'unknown' if no group matches.
 */
export declare function computeGroup<CustomGroupMatchOptions>({
  customGroupMatcher,
  predefinedGroups,
  options,
}: ComputeGroupParameters<CustomGroupMatchOptions>): 'unknown' | string
export {}
