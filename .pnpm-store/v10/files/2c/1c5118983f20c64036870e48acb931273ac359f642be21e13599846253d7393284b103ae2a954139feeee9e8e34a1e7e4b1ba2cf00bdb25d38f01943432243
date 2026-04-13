import {
  NewlinesBetweenOption,
  CommonGroupsOptions,
} from '../types/common-groups-options.js'
/**
 * Parameters for determining newlines requirement between nodes.
 *
 * Contains group indices and configuration options needed to calculate the
 * required number of newlines between two nodes.
 */
export interface GetNewlinesBetweenOptionParameters {
  /**
   * Configuration options for newlines and groups.
   */
  options: CommonGroupsOptions<string, unknown, unknown>
  /**
   * Group index of the next/second node.
   */
  nextNodeGroupIndex: number
  /**
   * Group index of the current/first node.
   */
  nodeGroupIndex: number
}
/**
 * Get the `newlinesBetween` option to use between two consecutive nodes. The
 * result is based on the global `newlinesBetween` option and the custom groups,
 * which can override the global option.
 *
 * - If the two nodes are in the same custom group, the `newlinesInside` option of
 *   the group is used.
 *
 * @param props - The function arguments.
 * @param props.nextNodeGroupIndex - The next node index to sort.
 * @param props.nodeGroupIndex - The current node index to sort.
 * @param props.options - Newlines between related options.
 * @returns - The `newlinesBetween` option to use.
 */
export declare function getNewlinesBetweenOption({
  nextNodeGroupIndex,
  nodeGroupIndex,
  options,
}: GetNewlinesBetweenOptionParameters): NewlinesBetweenOption
