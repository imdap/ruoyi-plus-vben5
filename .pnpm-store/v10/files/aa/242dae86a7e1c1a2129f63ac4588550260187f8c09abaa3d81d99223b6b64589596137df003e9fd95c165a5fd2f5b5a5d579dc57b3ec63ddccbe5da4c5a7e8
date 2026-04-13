import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { TSESTree } from '@typescript-eslint/types'
import { ScopedRegexOption } from '../../types/scoped-regex-option.js'
import { NodeOfType } from '../../types/node-of-type.js'
export type NodeValuesComputer<T extends AST_NODE_TYPES> = (
  node: NodeOfType<T>,
) => string[]
/**
 * Checks whether any of the parent nodes match the scoped regex patterns.
 *
 * @param params - The parameters object.
 * @param params.nodeValuesComputer - Function to compute the string values of a
 *   node to match against.
 * @param params.scopedRegexOption - The scoped regex option to match against.
 * @param params.allowedNodeTypes - The set of allowed node types to consider.
 * @param params.parentNodes - The parent nodes to check.
 * @returns True if any parent node matches the scoped regex patterns, false
 *   otherwise.
 */
export declare function matchesScopedExpressions<T extends AST_NODE_TYPES>({
  nodeValuesComputer,
  scopedRegexOption,
  allowedNodeTypes,
  parentNodes,
}: {
  scopedRegexOption: ScopedRegexOption | undefined
  nodeValuesComputer: NodeValuesComputer<T>
  parentNodes: TSESTree.Node[]
  allowedNodeTypes: Set<T>
}): boolean
