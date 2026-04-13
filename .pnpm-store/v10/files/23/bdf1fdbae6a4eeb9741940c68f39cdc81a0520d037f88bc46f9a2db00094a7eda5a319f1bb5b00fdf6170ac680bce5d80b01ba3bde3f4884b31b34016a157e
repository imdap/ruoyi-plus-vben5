import { AST_NODE_TYPES } from '@typescript-eslint/utils'
function computeNodeValue({ isDestructuredObject, sourceCode, property }) {
  switch (property.value.type) {
    case AST_NODE_TYPES.ArrowFunctionExpression:
    case AST_NODE_TYPES.FunctionExpression:
      return null
    case AST_NODE_TYPES.AssignmentPattern:
      switch (property.value.right.type) {
        case AST_NODE_TYPES.ArrowFunctionExpression:
        case AST_NODE_TYPES.FunctionExpression:
          return null
        default:
          return sourceCode.getText(property.value.right)
      }
    default:
      return isDestructuredObject ? null : sourceCode.getText(property.value)
  }
}
export { computeNodeValue }
