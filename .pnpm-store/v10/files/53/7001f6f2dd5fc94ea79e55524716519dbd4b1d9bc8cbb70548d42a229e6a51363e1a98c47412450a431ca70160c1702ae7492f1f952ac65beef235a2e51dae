import { TSESTree } from '@typescript-eslint/types'
import { RegexOption } from '../../types/common-options.js'
/**
 * Computes the dependencies of a class member AST node.
 *
 * @deprecated - To remove when experimental dependency detection is the only.
 * @param params - Parameters object.
 * @param params.ignoreCallbackDependenciesPatterns - Patterns to ignore
 *   callback dependencies.
 * @param params.useExperimentalDependencyDetection - Whether to use
 *   experimental dependency detection.
 * @param params.isMemberStatic - Indicates if the member is static.
 * @param params.expression - The AST node expression to analyze.
 * @param params.className - The name of the class, if available.
 * @returns The names of the dependencies.
 */
export declare function computeDependencies({
  ignoreCallbackDependenciesPatterns,
  useExperimentalDependencyDetection,
  isMemberStatic,
  expression,
  className,
}: {
  expression: TSESTree.StaticBlock | TSESTree.Expression
  ignoreCallbackDependenciesPatterns: RegexOption
  useExperimentalDependencyDetection: boolean
  className: undefined | string
  isMemberStatic: boolean
}): string[]
