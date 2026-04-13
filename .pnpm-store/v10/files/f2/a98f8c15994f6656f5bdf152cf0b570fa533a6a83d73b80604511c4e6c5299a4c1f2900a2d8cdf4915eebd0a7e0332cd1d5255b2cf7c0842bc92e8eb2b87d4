import { AST_NODE_TYPES } from '@typescript-eslint/utils'
function isKnownClassElement(member) {
  switch (member.type) {
    case AST_NODE_TYPES.TSAbstractPropertyDefinition:
    case AST_NODE_TYPES.TSAbstractMethodDefinition:
    case AST_NODE_TYPES.TSAbstractAccessorProperty:
    case AST_NODE_TYPES.PropertyDefinition:
    case AST_NODE_TYPES.MethodDefinition:
    case AST_NODE_TYPES.AccessorProperty:
    case AST_NODE_TYPES.TSIndexSignature:
    case AST_NODE_TYPES.StaticBlock:
      return true
    default:
      return false
  }
}
export { isKnownClassElement }
