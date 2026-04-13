import { ComparatorByOptionsComputer } from './compare/default-comparator-by-options-computer.js'
import { GroupsOptions } from '../types/common-groups-options.js'
import { CommonOptions } from '../types/common-options.js'
import { SortingNode } from '../types/sorting-node.js'
export type OptionsByGroupIndexComputer<Options> = (
  groupIndex: number,
) => Options
/**
 * Parameters for sorting nodes by groups.
 *
 * @template Node - Type of sorting node.
 * @template Options - Sorting options type extending common options.
 */
interface SortNodesByGroupsParameters<Node extends SortingNode, Options> {
  isNodeIgnoredForGroup?(props: {
    groupOptions: Options
    groupIndex: number
    node: Node
  }): boolean
  comparatorByOptionsComputer: ComparatorByOptionsComputer<Options, Node>
  optionsByGroupIndexComputer: OptionsByGroupIndexComputer<Options>
  isNodeIgnored?(node: Node): boolean
  ignoreEslintDisabledNodes: boolean
  groups: GroupsOptions
  nodes: Node[]
}
/**
 * Sorts nodes by distributing them into groups and sorting each group
 * independently.
 *
 * This is the core sorting function used by all Perfectionist rules. It
 * implements a two-phase sorting strategy:
 *
 * 1. Distribute nodes into their respective groups based on group configuration
 * 2. Sort each group independently using group-specific options.
 *
 * Ignored nodes (ESLint-disabled or manually ignored) maintain their original
 * positions to preserve intentional code organization.
 *
 * @example
 *
 * ```ts
 * // React component with grouped imports
 * const nodes = [
 *   { name: './Button', group: 'internal' },
 *   { name: 'react', group: 'external' },
 *   { name: '@mui/material', group: 'external' },
 *   { name: './utils', group: 'internal' },
 * ]
 *
 * sortNodesByGroups({
 *   groups: ['external', 'internal'],
 *   nodes,
 *   optionsByGroupIndexComputer: index => ({
 *     options: { type: 'alphabetical', order: 'asc' },
 *   }),
 * })
 * // Returns: ['@mui/material', 'react', './Button', './utils']
 * // External group sorted first, then internal group
 * ```
 *
 * @example
 *
 * ```ts
 * // Class members with different sorting for each group
 * class UserService {
 * // Static members group - sorted alphabetically
 * static VERSION = '1.0.0';
 * static API_URL = 'https://api.example.com';
 *
 * // Properties group - sorted by line length
 * id: string;
 * cache: Map<string, User>;
 *
 * // Methods group - sorted naturally
 * async getUser() { ... }
 * async updateUser() { ... }
 * }
 * ```
 *
 * @example
 *
 * ```ts
 * // Object with ignored properties
 * const config = {
 *   apiUrl: 'https://api.example.com',
 *   timeout: 5000,
 *   // eslint-disable-next-line
 *   DEBUG_MODE: true, // This stays in place due to ESLint disable
 *   retries: 3,
 * }
 * // DEBUG_MODE maintains its position despite sorting
 * ```
 *
 * @template T - Type of sorting node.
 * @template Options - Type of sorting options.
 * @param params - Parameters for group-based sorting.
 * @returns Array of nodes sorted within their groups.
 */
export declare function sortNodesByGroups<
  T extends SortingNode,
  Options extends Pick<CommonOptions, 'fallbackSort'>,
>({
  comparatorByOptionsComputer,
  optionsByGroupIndexComputer,
  ignoreEslintDisabledNodes,
  isNodeIgnoredForGroup,
  isNodeIgnored,
  groups,
  nodes,
}: SortNodesByGroupsParameters<T, Options>): T[]
export {}
