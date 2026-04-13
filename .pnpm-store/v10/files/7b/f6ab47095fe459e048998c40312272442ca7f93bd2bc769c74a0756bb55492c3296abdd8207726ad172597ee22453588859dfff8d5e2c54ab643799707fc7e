import { makeFixes } from './make-fixes.js'
const NODE_DEPENDENT_ON_RIGHT = 'nodeDependentOnRight'
const RIGHT = 'right'
const RIGHT_GROUP = 'rightGroup'
const LEFT = 'left'
const LEFT_GROUP = 'leftGroup'
const MISSED_COMMENT_ABOVE = 'missedCommentAbove'
const ORDER_ERROR = `Expected "{{${RIGHT}}}" to come before "{{${LEFT}}}".`
const DEPENDENCY_ORDER_ERROR = `Expected dependency "{{${RIGHT}}}" to come before "{{${NODE_DEPENDENT_ON_RIGHT}}}".`
const GROUP_ORDER_ERROR = `Expected "{{${RIGHT}}}" ({{${RIGHT_GROUP}}}) to come before "{{${LEFT}}}" ({{${LEFT_GROUP}}}).`
const EXTRA_SPACING_ERROR = `Extra spacing between "{{${LEFT}}}" and "{{${RIGHT}}}".`
const MISSED_SPACING_ERROR = `Missed spacing between "{{${LEFT}}}" and "{{${RIGHT}}}".`
const MISSED_COMMENT_ABOVE_ERROR = `Missed comment "{{${MISSED_COMMENT_ABOVE}}}" above "{{${RIGHT}}}".`
function reportErrors({
  firstUnorderedNodeDependentOnRight,
  ignoreFirstNodeHighestBlockComment,
  newlinesBetweenValueGetter,
  commentAboveMissing,
  sortedNodes,
  messageIds,
  sourceCode,
  context,
  options,
  nodes,
  right,
  left,
}) {
  for (let messageId of messageIds) {
    context.report({
      data: {
        [NODE_DEPENDENT_ON_RIGHT]: firstUnorderedNodeDependentOnRight?.name,
        [MISSED_COMMENT_ABOVE]: commentAboveMissing,
        [LEFT]: toSingleLine(left?.name ?? ''),
        [RIGHT]: toSingleLine(right.name),
        [RIGHT_GROUP]: right.group,
        [LEFT_GROUP]: left?.group,
      },
      fix: fixer =>
        makeFixes({
          hasCommentAboveMissing: !!commentAboveMissing,
          ignoreFirstNodeHighestBlockComment,
          newlinesBetweenValueGetter,
          sortedNodes,
          sourceCode,
          options,
          fixer,
          nodes,
        }),
      node: right.node,
      messageId,
    })
  }
}
function toSingleLine(string) {
  return string.replaceAll(/\s{2,}/gu, ' ').trim()
}
export {
  DEPENDENCY_ORDER_ERROR,
  EXTRA_SPACING_ERROR,
  GROUP_ORDER_ERROR,
  LEFT,
  MISSED_COMMENT_ABOVE_ERROR,
  MISSED_SPACING_ERROR,
  ORDER_ERROR,
  RIGHT,
  reportErrors,
}
