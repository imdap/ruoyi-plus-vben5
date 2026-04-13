import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { matchesScopedExpressions } from '../../utils/scoped-regex/matches-scoped-expressions.js'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
import { objectParentTypes } from './types.js'
function passesDeclarationCommentMatchesFilter({
  declarationCommentMatchesPattern,
  parentNodes,
  sourceCode,
}) {
  return matchesScopedExpressions({
    nodeValuesComputer: buildNodeValuesComputer(sourceCode),
    scopedRegexOption: declarationCommentMatchesPattern,
    allowedNodeTypes: new Set(objectParentTypes),
    parentNodes,
  })
}
function computeRelevantNodeForComment(objectParent) {
  let objectParentType = objectParent.type
  switch (objectParentType) {
    case AST_NODE_TYPES.VariableDeclarator: {
      let variableDeclaration = objectParent.parent
      if (
        variableDeclaration.parent?.type ===
        AST_NODE_TYPES.ExportNamedDeclaration
      ) {
        return variableDeclaration.parent
      }
      return variableDeclaration
    }
    case AST_NODE_TYPES.CallExpression:
    case AST_NODE_TYPES.Property:
      return objectParent
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
