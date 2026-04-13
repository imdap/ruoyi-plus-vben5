import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { matchesScopedExpressions } from '../../utils/scoped-regex/matches-scoped-expressions.js'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
import { objectTypeParentTypes } from './types.js'
function passesDeclarationCommentMatchesFilter({
  declarationCommentMatchesPattern,
  parentNodes,
  sourceCode,
}) {
  return matchesScopedExpressions({
    nodeValuesComputer: buildNodeValuesComputer(sourceCode),
    scopedRegexOption: declarationCommentMatchesPattern,
    allowedNodeTypes: new Set(objectTypeParentTypes),
    parentNodes,
  })
}
function computeRelevantNodeForComment(objectParent) {
  let objectParentType = objectParent.type
  switch (objectParentType) {
    case AST_NODE_TYPES.TSInterfaceDeclaration:
    case AST_NODE_TYPES.TSTypeAliasDeclaration:
    case AST_NODE_TYPES.TSPropertySignature:
    case AST_NODE_TYPES.PropertyDefinition:
      return objectParent
    case AST_NODE_TYPES.VariableDeclarator:
      return objectParent.parent
    /* v8 ignore next 2 -- @preserve Exhaustive guard. */
    default:
      throw new UnreachableCaseError(objectParentType)
  }
}
function buildNodeValuesComputer(sourceCode) {
  return node => {
    let nodeForComment = computeRelevantNodeForComment(node)
    return sourceCode
      .getCommentsBefore(nodeForComment)
      .map(comment => comment.value.trim())
  }
}
export { passesDeclarationCommentMatchesFilter }
