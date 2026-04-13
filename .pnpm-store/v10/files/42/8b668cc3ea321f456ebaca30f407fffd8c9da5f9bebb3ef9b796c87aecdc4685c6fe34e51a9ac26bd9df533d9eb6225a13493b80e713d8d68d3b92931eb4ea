import { SortingNodeWithDependencies } from './sort-nodes-by-dependencies.js'
/**
 * Detects nodes that are part of circular dependency chains.
 *
 * Uses a depth-first search (DFS) algorithm with three-color marking to
 * identify cycles in the dependency graph. When a cycle is detected, all nodes
 * in that cycle are added to the result set.
 *
 * The algorithm tracks three states for each node:
 *
 * - Not visited: Node hasn't been processed yet
 * - Visiting: Currently in the DFS path (gray in three-color marking)
 * - Visited: Completely processed (black in three-color marking).
 *
 * A cycle is detected when we encounter a node that is already in the
 * "visiting" state, meaning we've found a back edge in the graph.
 *
 * @example
 *
 * ```ts
 * const nodes = [
 *   { name: 'A', dependencies: ['B'], dependencyNames: ['A'] },
 *   { name: 'B', dependencies: ['C'], dependencyNames: ['B'] },
 *   { name: 'C', dependencies: ['A'], dependencyNames: ['C'] },
 * ]
 * const circularNodes = computeNodesInCircularDependencies(nodes)
 * // Returns: Set containing all three nodes (A, B, C)
 * ```
 *
 * @template T - Type of sorting node with dependencies.
 * @param elements - Array of nodes with dependency information.
 * @returns Set of nodes that participate in circular dependencies.
 */
export declare function computeNodesInCircularDependencies<
  T extends Pick<
    SortingNodeWithDependencies,
    'dependencyNames' | 'dependencies'
  >,
>(elements: T[]): Set<T>
