import { isPartitionComment } from './is-partition-comment.js'
import { getCommentsBefore } from './get-comments-before.js'
import { getLinesBetween } from './get-lines-between.js'
function shouldPartition({
  tokenValueToIgnoreBefore,
  lastSortingNode,
  sortingNode,
  sourceCode,
  options,
}) {
  let shouldPartitionByComment =
    options.partitionByComment &&
    hasPartitionComment({
      comments: getCommentsBefore({
        tokenValueToIgnoreBefore,
        node: sortingNode.node,
        sourceCode,
      }),
      partitionByComment: options.partitionByComment,
    })
  if (shouldPartitionByComment) {
    return true
  }
  return !!(
    options.partitionByNewLine &&
    lastSortingNode &&
    getLinesBetween(sourceCode, lastSortingNode, sortingNode)
  )
}
function hasPartitionComment({ partitionByComment, comments }) {
  return comments.some(comment =>
    isPartitionComment({
      partitionByComment,
      comment,
    }),
  )
}
export { shouldPartition }
