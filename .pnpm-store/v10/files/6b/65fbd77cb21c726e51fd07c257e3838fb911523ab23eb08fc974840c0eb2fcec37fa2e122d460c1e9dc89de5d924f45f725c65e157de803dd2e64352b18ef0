import { TSESTree } from '@typescript-eslint/types'
import { TSESLint } from '@typescript-eslint/utils'
import { SortClassesSortingNode } from './types.js'
import { RegexOption } from '../../types/common-options.js'
type SortingNodeWithoutDependencies = Omit<
  SortClassesSortingNode,
  'dependencies'
>
export declare function computeDependenciesBySortingNode({
  ignoreCallbackDependenciesPatterns,
  sortingNodes,
  sourceCode,
  classBody,
}: {
  ignoreCallbackDependenciesPatterns: RegexOption
  sortingNodes: SortingNodeWithoutDependencies[]
  sourceCode: TSESLint.SourceCode
  classBody: TSESTree.ClassBody
}): Map<SortingNodeWithoutDependencies, SortingNodeWithoutDependencies[]>
export {}
