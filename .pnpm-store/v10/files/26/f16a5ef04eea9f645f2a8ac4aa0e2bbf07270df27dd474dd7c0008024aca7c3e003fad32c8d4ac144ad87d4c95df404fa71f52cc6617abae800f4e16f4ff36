import { TSESTree } from '@typescript-eslint/types'
import { SortingNodeWithDependencies } from './sort-nodes-by-dependencies.js'
type WithDependencies<T> = {
  dependencies: string[]
} & T
/**
 * Populate sorting node groups based on the dependencies matrix.
 *
 * @param params - The parameters object.
 * @param params.dependenciesBySortingNode - A map of sorting nodes to their
 *   dependencies.
 * @param params.sortingNodeGroups - An array of sorting node groups.
 * @returns An array of sorting node groups with their dependencies.
 */
export declare function populateSortingNodeGroupsWithDependencies<
  Node extends TSESTree.Node,
  T extends Pick<SortingNodeWithDependencies<Node>, 'dependencyNames' | 'node'>,
>({
  dependenciesBySortingNode,
  sortingNodeGroups,
}: {
  dependenciesBySortingNode: Map<T, T[]>
  sortingNodeGroups: T[][]
}): WithDependencies<T>[][]
export {}
