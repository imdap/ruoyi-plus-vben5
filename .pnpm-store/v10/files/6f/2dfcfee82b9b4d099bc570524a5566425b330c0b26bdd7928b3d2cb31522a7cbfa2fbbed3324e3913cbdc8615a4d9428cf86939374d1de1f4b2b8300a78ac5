import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { isPropertyOrAccessorNode } from './is-property-or-accessor-node.js'
function isArrowFunctionNode(node) {
  return (
    isPropertyOrAccessorNode(node) &&
    node.value !== null &&
    node.value.type === AST_NODE_TYPES.ArrowFunctionExpression
  )
}
export { isArrowFunctionNode }
