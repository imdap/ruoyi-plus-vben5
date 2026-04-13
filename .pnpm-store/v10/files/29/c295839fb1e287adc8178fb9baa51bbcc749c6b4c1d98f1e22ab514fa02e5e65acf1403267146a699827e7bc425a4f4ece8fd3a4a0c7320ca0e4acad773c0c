import { AST_NODE_TYPES } from '@typescript-eslint/utils'
function computeNodeName(expression) {
  if (expression.type === AST_NODE_TYPES.Identifier) {
    return expression.name
  }
  if ('property' in expression) {
    return computeNodeName(expression.property)
  }
  throw new Error(
    'Unexpected heritage clause expression. Please report this issue here: https://github.com/azat-io/eslint-plugin-perfectionist/issues',
  )
}
export { computeNodeName }
