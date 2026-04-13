import { SortModulesNode } from './types.js'
interface HardDependencyDetection {
  searchStaticMethodsAndFunctionProperties: boolean
  type: 'hard'
}
interface SoftDependencyDetection {
  searchStaticMethodsAndFunctionProperties?: never
  type: 'soft'
}
type DependencyDetection = HardDependencyDetection | SoftDependencyDetection
/**
 * Computes the dependencies of a given AST node.
 *
 * @deprecated - To remove when experimental dependency detection is the only
 *   option.
 * @param node - The AST node to analyze.
 * @param dependencyDetection - The dependency detection strategy. Hard
 *   dependencies consider dependencies impacting compilation, while soft
 *   dependencies also consider type references.
 * @returns The names of the dependencies.
 */
export declare function computeDependencies(
  node: SortModulesNode,
  dependencyDetection: DependencyDetection,
): string[]
export {}
