import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
function computeNodeName({ sourceCode, node }) {
  switch (node.type) {
    case AST_NODE_TYPES.TSConstructSignatureDeclaration:
    case AST_NODE_TYPES.TSCallSignatureDeclaration:
      return formatName(sourceCode.getText(node))
    case AST_NODE_TYPES.TSPropertySignature:
      return computePropertySignatureName(node, sourceCode)
    case AST_NODE_TYPES.TSMethodSignature:
      return computeMethodSignatureName(node, sourceCode)
    case AST_NODE_TYPES.TSIndexSignature:
      return computeIndexSignatureName(node, sourceCode)
    /* v8 ignore next 2 -- @preserve Exhaustive guard. */
    default:
      throw new UnreachableCaseError(node)
  }
}
function computePropertySignatureName(node, sourceCode) {
  switch (node.key.type) {
    case AST_NODE_TYPES.Identifier:
      return node.key.name
    case AST_NODE_TYPES.Literal:
      return `${node.key.value}`
    default: {
      let endIndex =
        node.typeAnnotation?.range.at(0) ??
        node.range.at(1) - (node.optional ? '?'.length : 0)
      return sourceCode.text.slice(node.range.at(0), endIndex)
    }
  }
}
function computeMethodSignatureName(node, sourceCode) {
  if ('name' in node.key) {
    return node.key.name
  }
  return formatName(sourceCode.getText(node))
}
function computeIndexSignatureName(node, sourceCode) {
  let endIndex = node.typeAnnotation?.range.at(0) ?? node.range.at(1)
  return formatName(sourceCode.text.slice(node.range.at(0), endIndex))
}
function formatName(value) {
  return value.replace(/[,;]$/u, '')
}
export { computeNodeName }
