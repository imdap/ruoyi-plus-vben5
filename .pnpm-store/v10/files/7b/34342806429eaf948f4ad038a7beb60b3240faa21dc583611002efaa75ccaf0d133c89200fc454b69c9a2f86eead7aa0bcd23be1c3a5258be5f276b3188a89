import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
function computeNodeName({ sourceCode, node }) {
  switch (node.type) {
    case AST_NODE_TYPES.TSImportEqualsDeclaration:
      return computeImportEqualsDeclarationName(node)
    case AST_NODE_TYPES.VariableDeclaration: {
      let callExpression = node.declarations[0].init
      let { value } = callExpression.arguments[0]
      return value.toString()
    }
    case AST_NODE_TYPES.ImportDeclaration:
      return node.source.value
    /* v8 ignore next 2 -- @preserve Exhaustive guard. */
    default:
      throw new UnreachableCaseError(node)
  }
  function computeImportEqualsDeclarationName(declaration) {
    switch (declaration.moduleReference.type) {
      case AST_NODE_TYPES.TSExternalModuleReference:
        return declaration.moduleReference.expression.value
      case AST_NODE_TYPES.TSQualifiedName:
      case AST_NODE_TYPES.Identifier:
        return sourceCode.getText(declaration.moduleReference)
      /* v8 ignore next 2 -- @preserve Exhaustive guard. */
      default:
        throw new UnreachableCaseError(declaration.moduleReference)
    }
  }
}
export { computeNodeName }
