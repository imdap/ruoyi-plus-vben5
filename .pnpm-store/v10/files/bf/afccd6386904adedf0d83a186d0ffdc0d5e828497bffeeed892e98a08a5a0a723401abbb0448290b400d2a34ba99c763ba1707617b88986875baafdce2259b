import { AST_NODE_TYPES } from '@typescript-eslint/utils'
function computeNodeName({ sourceCode, node }) {
  return node.type === AST_NODE_TYPES.Literal ?
      `${node.value}`
    : sourceCode.getText(node)
}
export { computeNodeName }
