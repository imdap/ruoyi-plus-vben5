import { isGroupWithOverridesOption } from './is-group-with-overrides-option.js'
import { getCommentsBefore } from './get-comments-before.js'
function getCommentAboveThatShouldExist({
  rightGroupIndex,
  leftGroupIndex,
  sortingNode,
  sourceCode,
  options,
}) {
  if (leftGroupIndex !== null && leftGroupIndex >= rightGroupIndex) {
    return null
  }
  let rightGroup = options.groups[rightGroupIndex]
  if (!rightGroup || !isGroupWithOverridesOption(rightGroup)) {
    return null
  }
  let rightGroupCommentAbove = rightGroup.commentAbove
  if (!rightGroupCommentAbove) {
    return null
  }
  let matchingCommentsAbove = getCommentsBefore({
    node: sortingNode.node,
    sourceCode,
  }).find(comment => commentMatches(comment.value, rightGroupCommentAbove))
  return {
    comment: rightGroupCommentAbove,
    exists: !!matchingCommentsAbove,
  }
}
function commentMatches(comment, expected) {
  return comment.toLowerCase().includes(expected.toLowerCase().trim())
}
export { getCommentAboveThatShouldExist }
