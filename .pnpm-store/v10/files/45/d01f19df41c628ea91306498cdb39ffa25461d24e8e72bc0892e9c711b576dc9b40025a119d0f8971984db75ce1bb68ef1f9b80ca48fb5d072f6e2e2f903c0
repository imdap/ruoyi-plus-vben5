import { TSESTree } from '@typescript-eslint/types'
import { SortingNode } from '../types/sorting-node.js'
/**
 * Sorting node enhanced with dependency information.
 *
 * Extends the base SortingNode with arrays tracking what this node depends on
 * and what it represents as a dependency.
 *
 * @template Node - Type of the AST node.
 */
export interface SortingNodeWithDependencies<
  Node extends TSESTree.Node = TSESTree.Node,
> extends SortingNode<Node> {
  dependencyNames: string[]
  dependencies: string[]
}
/**
 * Additional options for dependency-based sorting.
 */
interface ExtraOptions {
  /**
   * Whether to exclude ESLint-disabled nodes from dependency resolution.
   */
  ignoreEslintDisabledNodes: boolean
}
/**
 * Returns nodes topologically sorted by their dependencies.
 *
 * @param nodes - The nodes to sort.
 * @param [extraOptions] - Additional sorting options.
 * @returns The nodes sorted in topological order.
 */
/**
 * Sorts nodes using topological sorting based on their dependencies.
 *
 * Implements a depth-first search algorithm to ensure that dependencies appear
 * before the nodes that depend on them. This is crucial for maintaining logical
 * order in code where some elements reference others.
 *
 * Nodes involved in circular dependencies are excluded from dependency-based
 * ordering and retain their original relative positions.
 *
 * @example
 *
 * ```ts
 * // TypeScript interfaces with inheritance
 * const nodes = [
 *   {
 *     name: 'AdminUser',
 *     dependencies: ['AdminUser'],
 *     dependencyNames: ['User'],
 *   },
 *   { name: 'User', dependencies: ['User'], dependencyNames: [] },
 *   {
 *     name: 'GuestUser',
 *     dependencies: ['GuestUser'],
 *     dependencyNames: ['User'],
 *   },
 * ]
 * sortNodesByDependencies(nodes)
 * // Returns: [User, AdminUser, GuestUser]
 * // User must come first as others depend on it
 * ```
 *
 * @example
 *
 * ```ts
 * // React components with hook dependencies
 * const nodes = [
 *   {
 *     name: 'MyComponent',
 *     dependencies: ['MyComponent'],
 *     dependencyNames: ['useAuth', 'useData'],
 *   },
 *   {
 *     name: 'useData',
 *     dependencies: ['useData'],
 *     dependencyNames: ['useApi'],
 *   },
 *   { name: 'useApi', dependencies: ['useApi'], dependencyNames: [] },
 *   { name: 'useAuth', dependencies: ['useAuth'], dependencyNames: [] },
 * ]
 * sortNodesByDependencies(nodes)
 * // Returns: [useApi, useData, useAuth, MyComponent]
 * // Hooks are ordered by their dependency chain
 * ```
 *
 * @example
 *
 * ```ts
 * // Object properties with computed values
 * const config = {
 *   baseUrl: 'https://api.example.com',
 *   apiUrl: `${this.baseUrl}/v1`, // Depends on baseUrl
 *   authUrl: `${this.apiUrl}/auth`, // Depends on apiUrl
 *   headers: {
 *     'API-Key': this.apiKey, // Depends on apiKey
 *   },
 *   apiKey: process.env.API_KEY,
 * }
 * // After sorting: baseUrl, apiKey, apiUrl, authUrl, headers
 * ```
 *
 * @template T - Type of sorting node with dependencies.
 * @param nodes - Array of nodes to sort by dependencies.
 * @param extraOptions - Additional sorting options.
 * @returns Topologically sorted array of nodes.
 */
export declare function sortNodesByDependencies<
  T extends Pick<
    SortingNodeWithDependencies,
    'isEslintDisabled' | 'dependencyNames' | 'dependencies'
  >,
>(nodes: T[], extraOptions: ExtraOptions): T[]
export {}
