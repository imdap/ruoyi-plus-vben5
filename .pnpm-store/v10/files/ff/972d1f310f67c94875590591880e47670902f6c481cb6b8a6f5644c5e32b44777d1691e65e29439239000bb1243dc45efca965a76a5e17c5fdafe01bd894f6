import { makeNewlinesBetweenFixes } from './make-newlines-between-fixes.js'
import { makeCommentAfterFixes } from './make-comment-after-fixes.js'
import { makeCommentAboveFixes } from './make-comment-above-fixes.js'
import { makeOrderFixes } from './make-order-fixes.js'
function makeFixes({
  ignoreFirstNodeHighestBlockComment,
  newlinesBetweenValueGetter,
  hasCommentAboveMissing,
  sortedNodes,
  sourceCode,
  options,
  fixer,
  nodes,
}) {
  let orderFixes = makeOrderFixes({
    ignoreFirstNodeHighestBlockComment,
    sortedNodes,
    sourceCode,
    options,
    nodes,
    fixer,
  })
  let commentAfterFixes = makeCommentAfterFixes({
    sortedNodes,
    sourceCode,
    nodes,
    fixer,
  })
  if (commentAfterFixes.length > 0) {
    return [...orderFixes, ...commentAfterFixes]
  }
  if (options?.groups) {
    let newlinesFixes = makeNewlinesBetweenFixes({
      options: {
        ...options,
        newlinesBetween: options.newlinesBetween,
        groups: options.groups,
      },
      newlinesBetweenValueGetter,
      sortedNodes,
      sourceCode,
      fixer,
      nodes,
    })
    if (newlinesFixes.length > 0) {
      return [...orderFixes, ...newlinesFixes]
    }
  }
  if (orderFixes.length > 0) {
    return orderFixes
  }
  if (!hasCommentAboveMissing || !options?.groups) {
    return []
  }
  return makeCommentAboveFixes({
    options: {
      ...options,
      groups: options.groups,
    },
    sortedNodes,
    sourceCode,
    fixer,
  })
}
export { makeFixes }
