import { ASTUtils } from '@typescript-eslint/utils'
import { getEslintDisabledRules } from './get-eslint-disabled-rules.js'
import { isPartitionComment } from './is-partition-comment.js'
import { getCommentsBefore } from './get-comments-before.js'
function getNodeRange({
  ignoreHighestBlockComment,
  sourceCode,
  options,
  node,
}) {
  let start = node.range.at(0)
  let end = node.range.at(1)
  if (ASTUtils.isParenthesized(node, sourceCode)) {
    let bodyOpeningParen = sourceCode.getTokenBefore(
      node,
      ASTUtils.isOpeningParenToken,
    )
    let bodyClosingParen = sourceCode.getTokenAfter(
      node,
      ASTUtils.isClosingParenToken,
    )
    start = bodyOpeningParen.range.at(0)
    end = bodyClosingParen.range.at(1)
  }
  let comments = getCommentsBefore({
    sourceCode,
    node,
  })
  let highestBlockComment = comments.find(comment => comment.type === 'Block')
  let relevantTopComment
  for (let i = comments.length - 1; i >= 0; i--) {
    let comment = comments[i]
    let eslintDisabledRules = getEslintDisabledRules(comment.value)
    if (
      isPartitionComment({
        partitionByComment: options?.partitionByComment ?? false,
        comment,
      }) ||
      eslintDisabledRules?.eslintDisableDirective === 'eslint-disable' ||
      eslintDisabledRules?.eslintDisableDirective === 'eslint-enable'
    ) {
      break
    }
    let previousCommentOrNodeStartLine =
      i === comments.length - 1 ?
        node.loc.start.line
      : comments[i + 1].loc.start.line
    if (comment.loc.end.line !== previousCommentOrNodeStartLine - 1) {
      break
    }
    if (ignoreHighestBlockComment && comment === highestBlockComment) {
      break
    }
    relevantTopComment = comment
  }
  if (relevantTopComment) {
    start = relevantTopComment.range.at(0)
  }
  return [start, end]
}
export { getNodeRange }
