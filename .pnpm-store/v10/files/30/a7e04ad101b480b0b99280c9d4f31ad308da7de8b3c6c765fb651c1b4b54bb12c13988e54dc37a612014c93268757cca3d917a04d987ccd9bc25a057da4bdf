import { TSESTree } from '@typescript-eslint/types'
import { SortingNode } from '../types/sorting-node.js'
/**
 * Creates a Map for efficient lookup of node positions in the sorted array.
 *
 * Builds an index map that associates each sorting node with its position in
 * the array. This is used to quickly determine the relative order of nodes
 * without repeated array searches, improving performance when generating error
 * messages for incorrectly sorted elements.
 *
 * @example
 *
 * ```ts
 * const nodes = [
 *   { name: 'foo', node: fooNode },
 *   { name: 'bar', node: barNode },
 *   { name: 'baz', node: bazNode },
 * ]
 * const indexMap = createNodeIndexMap(nodes)
 * indexMap.get(nodes[0]) // Returns: 0
 * indexMap.get(nodes[2]) // Returns: 2
 * ```
 *
 * @template Node - Type of the AST node.
 * @param nodes - Array of sorting nodes in their sorted order.
 * @returns Map where keys are sorting nodes and values are their indices.
 */
export declare function createNodeIndexMap<Node extends TSESTree.Node>(
  nodes: SortingNode<Node>[],
): Map<SortingNode, number>
