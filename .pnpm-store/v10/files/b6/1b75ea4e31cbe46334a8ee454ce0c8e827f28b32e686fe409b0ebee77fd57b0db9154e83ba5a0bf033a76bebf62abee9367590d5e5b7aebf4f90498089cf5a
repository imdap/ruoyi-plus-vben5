import { AST_NODE_TYPES } from '@typescript-eslint/utils'
function computeNodeName({ sourceCode, node }) {
  if (node.type !== AST_NODE_TYPES.ArrayExpression) {
    return sourceCode.getText(node)
  }
  let [left] = node.elements
  if (!left) {
    return 'undefined'
  }
  return left.type === AST_NODE_TYPES.Literal ?
      left.raw
    : sourceCode.getText(left)
}
export { computeNodeName }
