import { AST_NODE_TYPES } from '@typescript-eslint/utils'
function computeNodeName({ sourceCode, type }) {
  let name = sourceCode.getText(type)
  if (
    type.type !== AST_NODE_TYPES.TSUnionType &&
    type.type !== AST_NODE_TYPES.TSIntersectionType
  ) {
    return name
  }
  return name.replace(/^\s*[&|]\s*/u, '')
}
export { computeNodeName }
