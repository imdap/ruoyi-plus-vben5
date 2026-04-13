import { TSESLint } from '@typescript-eslint/utils'
import { SortEnumsSortingNode } from './types.js'
type SortingNodeWithoutDependencies = Omit<SortEnumsSortingNode, 'dependencies'>
export declare function computeDependenciesBySortingNode({
  sortingNodes,
  sourceCode,
  enumName,
}: {
  sortingNodes: SortingNodeWithoutDependencies[]
  sourceCode: TSESLint.SourceCode
  enumName: string
}): Map<SortingNodeWithoutDependencies, SortingNodeWithoutDependencies[]>
export {}
