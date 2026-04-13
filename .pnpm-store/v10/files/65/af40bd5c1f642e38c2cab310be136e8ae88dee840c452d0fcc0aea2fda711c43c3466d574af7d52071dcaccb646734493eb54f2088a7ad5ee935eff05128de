import { computeNodesInCircularDependencies } from './compute-nodes-in-circular-dependencies.js'
import { getCommentAboveThatShouldExist } from './get-comment-above-that-should-exist.js'
import { isNodeDependentOnOtherNode } from './is-node-dependent-on-other-node.js'
import { getNewlinesBetweenErrors } from './get-newlines-between-errors.js'
import { createNodeIndexMap } from './create-node-index-map.js'
import { getGroupIndex } from './get-group-index.js'
import { reportErrors } from './report-errors.js'
import { pairwise } from './pairwise.js'
function reportAllErrors({
  ignoreFirstNodeHighestBlockComment,
  sortNodesExcludingEslintDisabled,
  newlinesBetweenValueGetter,
  availableMessageIds,
  context,
  options,
  nodes,
}) {
  let { sourceCode } = context
  let sortedNodes = sortNodesExcludingEslintDisabled(false)
  let sortedNodesExcludingEslintDisabled =
    sortNodesExcludingEslintDisabled(true)
  let nodeIndexMap = createNodeIndexMap(sortedNodes)
  let nodesInCircularDependencies =
    availableMessageIds.unexpectedDependencyOrder ?
      computeNodesInCircularDependencies(nodes)
    : /* @__PURE__ */ new Set()
  pairwise(nodes, (left, right) => {
    let leftInfo =
      left ?
        {
          groupIndex: getGroupIndex(options.groups, left),
          index: nodeIndexMap.get(left),
        }
      : null
    let rightGroupIndex = getGroupIndex(options.groups, right)
    let rightIndex = nodeIndexMap.get(right)
    let indexOfRightExcludingEslintDisabled =
      sortedNodesExcludingEslintDisabled.indexOf(right)
    let messageIds = []
    let firstUnorderedNodeDependentOnRight
    if (availableMessageIds.unexpectedDependencyOrder) {
      firstUnorderedNodeDependentOnRight = getFirstUnorderedNodeDependentOn({
        nodes,
        node: right,
        nodesInCircularDependencies,
      })
    }
    if (
      leftInfo &&
      (firstUnorderedNodeDependentOnRight ||
        leftInfo.index > rightIndex ||
        (left?.isEslintDisabled &&
          leftInfo.index >= indexOfRightExcludingEslintDisabled))
    ) {
      if (firstUnorderedNodeDependentOnRight) {
        messageIds.push(availableMessageIds.unexpectedDependencyOrder)
      } else {
        messageIds.push(
          (
            leftInfo.groupIndex === rightGroupIndex ||
              !availableMessageIds.unexpectedGroupOrder
          ) ?
            availableMessageIds.unexpectedOrder
          : availableMessageIds.unexpectedGroupOrder,
        )
      }
    }
    if (
      left &&
      availableMessageIds.missedSpacingBetweenMembers &&
      availableMessageIds.extraSpacingBetweenMembers
    ) {
      messageIds.push(
        ...getNewlinesBetweenErrors({
          options: {
            ...options,
            newlinesBetween: options.newlinesBetween,
          },
          missedSpacingError: availableMessageIds.missedSpacingBetweenMembers,
          extraSpacingError: availableMessageIds.extraSpacingBetweenMembers,
          leftGroupIndex: leftInfo.groupIndex,
          newlinesBetweenValueGetter,
          rightGroupIndex,
          sourceCode,
          right,
          left,
        }),
      )
    }
    let commentAboveMissing
    if (availableMessageIds.missedCommentAbove) {
      let commentAboveThatShouldExist = getCommentAboveThatShouldExist({
        leftGroupIndex: leftInfo?.groupIndex ?? null,
        sortingNode: right,
        rightGroupIndex,
        sourceCode,
        options,
      })
      if (commentAboveThatShouldExist && !commentAboveThatShouldExist.exists) {
        commentAboveMissing = commentAboveThatShouldExist.comment
        messageIds.push(availableMessageIds.missedCommentAbove)
      }
    }
    reportErrors({
      sortedNodes: sortedNodesExcludingEslintDisabled,
      ignoreFirstNodeHighestBlockComment,
      firstUnorderedNodeDependentOnRight,
      newlinesBetweenValueGetter,
      commentAboveMissing,
      messageIds,
      sourceCode,
      options,
      context,
      nodes,
      right,
      left,
    })
  })
}
function getFirstUnorderedNodeDependentOn({
  nodesInCircularDependencies,
  nodes,
  node,
}) {
  let nodesDependentOnNode = nodes.filter(
    currentlyOrderedNode =>
      !nodesInCircularDependencies.has(currentlyOrderedNode) &&
      isNodeDependentOnOtherNode(node, currentlyOrderedNode),
  )
  return nodesDependentOnNode.find(firstNodeDependentOnNode => {
    let currentIndexOfNode = nodes.indexOf(node)
    let currentIndexOfFirstNodeDependentOnNode = nodes.indexOf(
      firstNodeDependentOnNode,
    )
    return currentIndexOfFirstNodeDependentOnNode < currentIndexOfNode
  })
}
export { reportAllErrors }
