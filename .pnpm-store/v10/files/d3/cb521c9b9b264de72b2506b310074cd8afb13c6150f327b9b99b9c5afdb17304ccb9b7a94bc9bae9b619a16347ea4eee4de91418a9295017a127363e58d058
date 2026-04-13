import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
function computeNodeName(node) {
  switch (node.name.type) {
    case AST_NODE_TYPES.JSXNamespacedName:
      return `${node.name.namespace.name}:${node.name.name.name}`
    case AST_NODE_TYPES.JSXIdentifier:
      return node.name.name
    /* v8 ignore next 2 -- @preserve Exhaustive guard. */
    default:
      throw new UnreachableCaseError(node.name)
  }
}
export { computeNodeName }
