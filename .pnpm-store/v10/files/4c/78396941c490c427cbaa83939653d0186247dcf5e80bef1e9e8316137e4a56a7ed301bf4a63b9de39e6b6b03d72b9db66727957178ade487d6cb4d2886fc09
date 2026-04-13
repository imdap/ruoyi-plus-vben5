import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
function computeNodeName({ sourceCode, node }) {
  switch (node.id.type) {
    case AST_NODE_TYPES.ObjectPattern:
    case AST_NODE_TYPES.ArrayPattern:
      return sourceCode.text.slice(...node.id.range)
    case AST_NODE_TYPES.Identifier:
      return node.id.name
    /* v8 ignore next 2 -- @preserve Exhaustive guard. */
    default:
      throw new UnreachableCaseError(node.id)
  }
}
export { computeNodeName }
