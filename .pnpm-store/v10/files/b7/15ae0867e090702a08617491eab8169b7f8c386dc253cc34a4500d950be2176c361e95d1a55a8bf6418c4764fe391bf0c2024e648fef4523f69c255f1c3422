import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
function computePropertyOrVariableDeclaratorName({ sourceCode, node }) {
  switch (node.type) {
    case AST_NODE_TYPES.VariableDeclarator:
      return computeIdentifierName({ node: node.id, sourceCode })
    case AST_NODE_TYPES.Property:
      return computeIdentifierName({ node: node.key, sourceCode })
    /* v8 ignore next 2 -- @preserve Exhaustive guard. */
    default:
      throw new UnreachableCaseError(node)
  }
}
function computeIdentifierName({ sourceCode, node }) {
  switch (node.type) {
    case AST_NODE_TYPES.Identifier:
      return node.name
    case AST_NODE_TYPES.Literal:
      return `${node.value}`
    default:
      return sourceCode.getText(node)
  }
}
export { computePropertyOrVariableDeclaratorName }
