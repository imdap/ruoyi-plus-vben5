import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { computeDependenciesBySortingNode } from './compute-dependencies-by-sorting-node.js'
import { computeParentNodesWithTypes } from './compute-parent-nodes-with-types.js'
function computeDependenciesOutsideFunctionsBySortingNode({
  sortingNodes,
  sourceCode,
}) {
  return computeDependenciesBySortingNode({
    shouldIgnoreIdentifierComputer: buildShouldIgnoreIdentifierComputer(),
    sortingNodes,
    sourceCode,
  })
  function buildShouldIgnoreIdentifierComputer() {
    return ({ referencingSortingNode, identifier }) => {
      let ignoredParentNodes = computeParentNodesWithTypes({
        allowedTypes: [
          AST_NODE_TYPES.FunctionExpression,
          AST_NODE_TYPES.ArrowFunctionExpression,
        ],
        maxParent: referencingSortingNode.node,
        consecutiveOnly: false,
        node: identifier,
      })
      return ignoredParentNodes.length > 0
    }
  }
}
export { computeDependenciesOutsideFunctionsBySortingNode }
