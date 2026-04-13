import { AST_NODE_TYPES } from '@typescript-eslint/utils'
function computeNodeName({ sourceCode, node }) {
  return node.id.type === AST_NODE_TYPES.Literal ?
      node.id.value
    : sourceCode.getText(node.id)
}
export { computeNodeName }
