import { ComparatorByOptionsComputer } from './compare/default-comparator-by-options-computer.js'
import { CommonOptions } from '../types/common-options.js'
import { SortingNode } from '../types/sorting-node.js'
/**
 * Parameters for the core sorting operation.
 *
 * @template Node - Type of sorting node.
 * @template Options - Sorting options type extending common options.
 */
interface SortNodesParameters<
  Node extends SortingNode,
  Options extends Pick<CommonOptions, 'fallbackSort'>,
> {
  comparatorByOptionsComputer: ComparatorByOptionsComputer<Options, Node>
  isNodeIgnored?(node: Node): boolean
  ignoreEslintDisabledNodes: boolean
  options: Options
  nodes: Node[]
}
/**
 * Core sorting function that performs the actual node sorting.
 *
 * This is the fundamental sorting engine of the Perfectionist plugin. It
 * handles the actual comparison and ordering of nodes while preserving the
 * positions of ignored elements. The function separates nodes into two
 * categories:
 *
 * 1. Nodes to be sorted (non-ignored)
 * 2. Nodes to keep in place (ignored or ESLint-disabled).
 *
 * After sorting, ignored nodes are reinserted at their original positions,
 * ensuring that intentionally placed elements remain untouched.
 *
 * @param params - Parameters for sorting operation.
 * @returns Sorted array with ignored nodes preserved at original positions.
 */
export declare function sortNodes<
  Node extends SortingNode,
  Options extends Pick<CommonOptions, 'fallbackSort'>,
>({
  comparatorByOptionsComputer,
  ignoreEslintDisabledNodes,
  isNodeIgnored,
  options,
  nodes,
}: SortNodesParameters<Node, Options>): Node[]
export {}
