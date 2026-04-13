import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { TSESTree } from '@typescript-eslint/types'
import { NodeOfType } from '../types/node-of-type.js'
/**
 * Finds all parent nodes matching one of the specified AST node types.
 *
 * @param options - Options for the search.
 * @param options.allowedTypes - Array of AST node types to match.
 * @param options.consecutiveOnly - If true, stops searching after the first
 *   non-matching parent node is found.
 * @param options.node - Starting node to search from.
 * @param options.maxParent - Optional maximum exclusive parent node to stop the
 *   search at.
 * @returns List of matching parent nodes.
 */
export declare function computeParentNodesWithTypes<
  NodeType extends AST_NODE_TYPES,
>({
  consecutiveOnly,
  allowedTypes,
  maxParent,
  node,
}: {
  maxParent: TSESTree.Node | null
  consecutiveOnly: boolean
  allowedTypes: NodeType[]
  node: TSESTree.Node
}): NodeOfType<NodeType>[]
