import { TSESTree } from '@typescript-eslint/types'
import { RegexOption } from '../../../types/common-options.js'
import { Modifier, Selector } from '../types.js'
/**
 * Computes details related to a static block.
 *
 * @param params - Parameters object.
 * @param params.staticBlock - The static block node to compute information for.
 * @param params.ignoreCallbackDependenciesPatterns - Patterns to ignore when
 *   computing dependencies.
 * @param params.useExperimentalDependencyDetection - Whether to use
 *   experimental dependency detection.
 * @param params.className - The name of the class containing the property.
 * @returns An object containing various details about the static block.
 */
export declare function computeStaticBlockDetails({
  ignoreCallbackDependenciesPatterns,
  useExperimentalDependencyDetection,
  staticBlock,
  className,
}: {
  ignoreCallbackDependenciesPatterns: RegexOption
  useExperimentalDependencyDetection: boolean
  staticBlock: TSESTree.StaticBlock
  className: undefined | string
}): {
  dependencies: string[]
  selectors: Selector[]
  modifiers: Modifier[]
}
