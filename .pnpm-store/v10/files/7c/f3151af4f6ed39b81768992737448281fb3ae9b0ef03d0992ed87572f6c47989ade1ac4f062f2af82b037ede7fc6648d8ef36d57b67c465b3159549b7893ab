import { AST_NODE_TYPES } from '@typescript-eslint/utils'
function isNodeFunctionType(node) {
  if (
    node.type === AST_NODE_TYPES.TSMethodSignature ||
    node.type === AST_NODE_TYPES.TSFunctionType
  ) {
    return true
  }
  if (
    node.type === AST_NODE_TYPES.TSUnionType ||
    node.type === AST_NODE_TYPES.TSIntersectionType
  ) {
    return node.types.every(isNodeFunctionType)
  }
  if (node.type === AST_NODE_TYPES.TSPropertySignature && node.typeAnnotation) {
    return isNodeFunctionType(node.typeAnnotation.typeAnnotation)
  }
  return false
}
export { isNodeFunctionType }
