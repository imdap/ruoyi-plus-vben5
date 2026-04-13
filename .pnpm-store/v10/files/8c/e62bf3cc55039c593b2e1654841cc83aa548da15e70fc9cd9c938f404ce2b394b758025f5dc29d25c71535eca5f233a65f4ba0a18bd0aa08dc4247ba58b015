import { TSESTree } from '@typescript-eslint/types'
import { TSESLint } from '@typescript-eslint/utils'
import { SortingNodeWithDependencies } from './sort-nodes-by-dependencies.js'
export declare function computeDependenciesOutsideFunctionsBySortingNode<
  Node extends TSESTree.Node,
  T extends Pick<SortingNodeWithDependencies<Node>, 'dependencyNames' | 'node'>,
>({
  sortingNodes,
  sourceCode,
}: {
  sourceCode: TSESLint.SourceCode
  sortingNodes: T[]
}): Map<T, T[]>
