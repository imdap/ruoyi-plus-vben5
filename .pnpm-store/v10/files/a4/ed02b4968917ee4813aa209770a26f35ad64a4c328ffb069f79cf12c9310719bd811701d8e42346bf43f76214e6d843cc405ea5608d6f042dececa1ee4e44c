import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
function computeNodeName(node, ignoreAlias) {
  let identifierToCheck = ignoreAlias ? node.local : node.exported
  switch (identifierToCheck.type) {
    case AST_NODE_TYPES.Identifier:
      return identifierToCheck.name
    case AST_NODE_TYPES.Literal:
      return identifierToCheck.value
    /* v8 ignore next 2 -- @preserve Exhaustive guard. */
    default:
      throw new UnreachableCaseError(identifierToCheck)
  }
}
export { computeNodeName }
