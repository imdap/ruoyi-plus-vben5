import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
function computeNodeParentName(node, sourceCode) {
  switch (node.type) {
    case AST_NODE_TYPES.TSTypeAliasDeclaration:
    case AST_NODE_TYPES.TSInterfaceDeclaration:
      return node.id.name
    case AST_NODE_TYPES.TSPropertySignature:
    case AST_NODE_TYPES.PropertyDefinition:
      return computePropertyName(node, sourceCode)
    case AST_NODE_TYPES.VariableDeclarator:
      return computeVariableDeclaratorName(node, sourceCode)
    /* v8 ignore next 2 -- @preserve Exhaustive guard. */
    default:
      throw new UnreachableCaseError(node)
  }
}
function computePropertyName(propertySignature, sourceCode) {
  switch (propertySignature.key.type) {
    case AST_NODE_TYPES.Identifier:
      return propertySignature.key.name
    case AST_NODE_TYPES.Literal:
      return String(propertySignature.key.value)
    /* v8 ignore next 2 -- @preserve Unsure how we can reach that case */
    default:
      return sourceCode.getText(propertySignature.key)
  }
}
function computeVariableDeclaratorName(variableDeclarator, sourceCode) {
  if (!variableDeclarator.id.typeAnnotation) {
    return sourceCode.getText(variableDeclarator.id)
  }
  return sourceCode.text.slice(
    variableDeclarator.id.range[0],
    variableDeclarator.id.typeAnnotation.range[0],
  )
}
export { computeNodeParentName }
