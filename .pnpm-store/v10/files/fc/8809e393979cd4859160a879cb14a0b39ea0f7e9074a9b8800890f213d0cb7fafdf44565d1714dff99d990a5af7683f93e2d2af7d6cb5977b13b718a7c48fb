import { TSESTree } from '@typescript-eslint/types'
import { TSESLint } from '@typescript-eslint/utils'
import {
  DependencyDetection,
  SortModulesNode,
  Modifier,
  Selector,
} from './types.js'
interface ParsableNodeDetails {
  nodeDetails: {
    dependencyDetection: DependencyDetection
    addSafetySemicolonWhenInline: boolean
    dependencies: string[]
    modifiers: Modifier[]
    decorators: string[]
    selector: Selector
    name: string
  }
  shouldPartitionAfterNode?: never
  moduleBlock?: never
}
interface NonParsableNodeDetails {
  moduleBlock: TSESTree.TSModuleBlock | null
  shouldPartitionAfterNode: boolean
  nodeDetails?: never
}
type Details = NonParsableNodeDetails | ParsableNodeDetails
/**
 * Compute details about a module-related node.
 *
 * @param params - The parameters object.
 * @param params.sourceCode - The source code object.
 * @param params.node - The AST node to compute details for.
 * @param params.useExperimentalDependencyDetection - Whether to use
 *   experimental dependency detection.
 * @returns The computed details about the node, such as whether it should be
 *   ignored, if a module block was found, and information about the node.
 */
export declare function computeNodeDetails({
  useExperimentalDependencyDetection,
  sourceCode,
  node,
}: {
  useExperimentalDependencyDetection: boolean
  sourceCode: TSESLint.SourceCode
  node: SortModulesNode
}): Details
export {}
