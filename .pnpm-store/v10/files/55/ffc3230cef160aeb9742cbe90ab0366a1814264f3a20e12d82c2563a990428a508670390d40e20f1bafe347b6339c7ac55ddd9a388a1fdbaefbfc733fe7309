import { TSESLint } from '@typescript-eslint/utils'
import { SortModulesSortingNode, DependencyDetection } from './types.js'
type SortingNodeWithoutDependencies = Omit<
  SortModulesSortingNode,
  'dependencies'
>
export declare function computeDependenciesBySortingNode({
  dependencyDetection,
  sortingNodes,
  sourceCode,
}: {
  sortingNodes: SortingNodeWithoutDependencies[]
  dependencyDetection: DependencyDetection
  sourceCode: TSESLint.SourceCode
}): Map<SortingNodeWithoutDependencies, SortingNodeWithoutDependencies[]>
export {}
