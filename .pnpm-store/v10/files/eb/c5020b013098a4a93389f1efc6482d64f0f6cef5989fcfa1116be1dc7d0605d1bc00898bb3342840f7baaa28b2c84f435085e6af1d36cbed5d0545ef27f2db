import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
function computeArrayElements(expression) {
  switch (expression.type) {
    case AST_NODE_TYPES.ArrayExpression:
      return expression.elements
    case AST_NODE_TYPES.NewExpression:
      if (expression.callee.type !== AST_NODE_TYPES.Identifier) {
        return null
      }
      if (expression.callee.name !== 'Array') {
        return null
      }
      return expression.arguments
    /* v8 ignore next 2 -- @preserve Exhaustive guard. */
    default:
      throw new UnreachableCaseError(expression)
  }
}
export { computeArrayElements }
