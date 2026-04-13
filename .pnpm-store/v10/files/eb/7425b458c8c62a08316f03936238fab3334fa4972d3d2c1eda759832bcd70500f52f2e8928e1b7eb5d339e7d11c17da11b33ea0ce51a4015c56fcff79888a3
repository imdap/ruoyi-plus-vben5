import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
function computeNodeName(node, ignoreAlias) {
  if (!ignoreAlias) {
    return node.local.name
  }
  switch (node.imported.type) {
    case AST_NODE_TYPES.Identifier:
      return node.imported.name
    case AST_NODE_TYPES.Literal:
      return node.imported.value
    /* v8 ignore next 2 -- @preserve Exhaustive guard. */
    default:
      throw new UnreachableCaseError(node.imported)
  }
}
export { computeNodeName }
