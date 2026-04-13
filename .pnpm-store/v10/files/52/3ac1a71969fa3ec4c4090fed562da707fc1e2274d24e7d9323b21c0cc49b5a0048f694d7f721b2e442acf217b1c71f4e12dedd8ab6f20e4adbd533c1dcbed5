import { getEslintDisabledRules } from './get-eslint-disabled-rules.js'
import { matches } from './matches.js'
function isPartitionComment({ partitionByComment, comment }) {
  if (getEslintDisabledRules(comment.value) || !partitionByComment) {
    return false
  }
  let trimmedComment = comment.value.trim()
  if (
    Array.isArray(partitionByComment) ||
    typeof partitionByComment === 'boolean' ||
    typeof partitionByComment === 'string'
  ) {
    return isTrimmedCommentPartitionComment({
      partitionByComment,
      trimmedComment,
    })
  }
  let relevantPartitionByComment
  if (comment.type === 'Block' && 'block' in partitionByComment) {
    relevantPartitionByComment = partitionByComment.block
  }
  if (comment.type === 'Line' && 'line' in partitionByComment) {
    relevantPartitionByComment = partitionByComment.line
  }
  return (
    relevantPartitionByComment !== void 0 &&
    isTrimmedCommentPartitionComment({
      partitionByComment: relevantPartitionByComment,
      trimmedComment,
    })
  )
}
function isTrimmedCommentPartitionComment({
  partitionByComment,
  trimmedComment,
}) {
  if (typeof partitionByComment === 'boolean') {
    return partitionByComment
  }
  return matches(trimmedComment, partitionByComment)
}
export { isPartitionComment }
