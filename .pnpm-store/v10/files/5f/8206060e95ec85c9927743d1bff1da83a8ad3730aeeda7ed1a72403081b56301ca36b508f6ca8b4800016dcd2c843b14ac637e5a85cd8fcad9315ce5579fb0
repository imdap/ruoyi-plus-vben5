import { AST_NODE_TYPES } from '@typescript-eslint/utils'
function computeExpressionNumberValue(expression) {
  switch (expression.type) {
    case AST_NODE_TYPES.BinaryExpression:
      return computeBinaryExpressionNumberValue(
        expression.left,
        expression.right,
        expression.operator,
      )
    case AST_NODE_TYPES.UnaryExpression:
      return computeUnaryExpressionNumberValue(
        expression.argument,
        expression.operator,
      )
    case AST_NODE_TYPES.Literal:
      return typeof expression.value === 'number' ? expression.value : null
    default:
      return null
  }
}
function computeBinaryExpressionNumberValue(
  leftExpression,
  rightExpression,
  operator,
) {
  let left = computeExpressionNumberValue(leftExpression)
  let right = computeExpressionNumberValue(rightExpression)
  if (left === null || right === null) {
    return null
  }
  switch (operator) {
    case '**':
      return left ** right
    case '>>':
      return left >> right
    case '<<':
      return left << right
    case '+':
      return left + right
    case '-':
      return left - right
    case '*':
      return left * right
    case '/':
      return left / right
    case '%':
      return left % right
    case '|':
      return left | right
    case '&':
      return left & right
    case '^':
      return left ^ right
    /* v8 ignore next 2 -- @preserve Unsure if we can reach it. */
    default:
      return null
  }
}
function computeUnaryExpressionNumberValue(argumentExpression, operator) {
  let argument = computeExpressionNumberValue(argumentExpression)
  if (argument === null) {
    return null
  }
  switch (operator) {
    case '+':
      return argument
    case '-':
      return -argument
    case '~':
      return ~argument
    /* v8 ignore next 2 -- @preserve Unsure if we can reach it. */
    default:
      return null
  }
}
export { computeExpressionNumberValue }
