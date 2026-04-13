import { TSESTree } from '@typescript-eslint/types'
import { TSESLint } from '@typescript-eslint/utils'
import { SortingNodeWithDependencies } from './sort-nodes-by-dependencies.js'
export type ShouldIgnoreIdentifierComputer<T> = (parameters: {
  identifier: TSESTree.JSXIdentifier | TSESTree.Identifier
  referencingSortingNode: T
}) => boolean
export type AdditionalIdentifierDependenciesComputer<T> = (parameters: {
  reference: TSESLint.Scope.Reference
  referencingSortingNode: T
}) => T[]
export type ShouldIgnoreSortingNodeComputer<T> = (sortingNode: T) => boolean
/**
 * Compute the list of dependencies for each sorting node.
 *
 * @param params - The parameters object.
 * @param params.additionalIdentifierDependenciesComputer - A function to
 *   compute additional dependencies for an identifier.
 * @param params.shouldIgnoreSortingNodeComputer - A function to determine if a
 *   sorting node should be ignored.
 * @param params.shouldIgnoreIdentifierComputer - A function to determine if an
 *   identifier should be ignored.
 * @param params.sortingNodes - The sorting nodes to compute dependencies for.
 * @param params.sourceCode - The source code object.
 * @returns A map of sorting nodes to their dependencies.
 */
export declare function computeDependenciesBySortingNode<
  Node extends TSESTree.Node,
  T extends Pick<SortingNodeWithDependencies<Node>, 'dependencyNames' | 'node'>,
>({
  additionalIdentifierDependenciesComputer,
  shouldIgnoreSortingNodeComputer,
  shouldIgnoreIdentifierComputer,
  sortingNodes,
  sourceCode,
}: {
  additionalIdentifierDependenciesComputer?: AdditionalIdentifierDependenciesComputer<T>
  shouldIgnoreSortingNodeComputer?: ShouldIgnoreSortingNodeComputer<T>
  shouldIgnoreIdentifierComputer?: ShouldIgnoreIdentifierComputer<T>
  sourceCode: TSESLint.SourceCode
  sortingNodes: T[]
}): Map<T, T[]>
