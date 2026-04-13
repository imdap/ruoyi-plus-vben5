import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { computeIdentifierNameDetails } from '../compute-identifier-name-details.js'
function computeMethodOrPropertyNameDetails(node, sourceCode) {
  switch (node.key.type) {
    case AST_NODE_TYPES.PrivateIdentifier:
    case AST_NODE_TYPES.Identifier:
    case AST_NODE_TYPES.Literal:
      return computeIdentifierNameDetails(node.key)
    default:
      return {
        nameWithoutStartingHash: sourceCode.getText(node.key),
        name: sourceCode.getText(node.key),
        hasPrivateHash: false,
      }
  }
}
export { computeMethodOrPropertyNameDetails }
