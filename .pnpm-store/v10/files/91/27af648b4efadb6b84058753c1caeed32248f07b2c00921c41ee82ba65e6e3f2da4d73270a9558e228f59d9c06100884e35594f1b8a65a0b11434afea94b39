import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
function computeIdentifierNameDetails(node) {
  switch (node.type) {
    case AST_NODE_TYPES.PrivateIdentifier:
      return {
        nameWithoutStartingHash: node.name,
        name: `#${node.name}`,
        hasPrivateHash: true,
      }
    case AST_NODE_TYPES.Identifier:
      return buildNonPrivateHashDetails(node.name)
    case AST_NODE_TYPES.Literal:
      return buildNonPrivateHashDetails(`${node.value}`)
    /* v8 ignore next 2 -- @preserve Exhaustive guard. */
    default:
      throw new UnreachableCaseError(node)
  }
}
function buildNonPrivateHashDetails(name) {
  return {
    nameWithoutStartingHash: name,
    hasPrivateHash: false,
    name,
  }
}
export { computeIdentifierNameDetails }
