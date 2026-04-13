import { getNewlinesBetweenOption } from './get-newlines-between-option.js'
import { getLinesBetween } from './get-lines-between.js'
import { getGroupIndex } from './get-group-index.js'
import { getNodeRange } from './get-node-range.js'
function makeNewlinesBetweenFixes({
  newlinesBetweenValueGetter,
  sortedNodes,
  sourceCode,
  options,
  fixer,
  nodes,
}) {
  let fixes = []
  for (let i = 0; i < sortedNodes.length - 1; i++) {
    let sortingNode = nodes.at(i)
    let nextSortingNode = nodes.at(i + 1)
    let sortedSortingNode = sortedNodes.at(i)
    let nextSortedSortingNode = sortedNodes.at(i + 1)
    if (sortedSortingNode.partitionId !== nextSortedSortingNode.partitionId) {
      continue
    }
    let nodeGroupIndex = getGroupIndex(options.groups, sortedSortingNode)
    let nextNodeGroupIndex = getGroupIndex(
      options.groups,
      nextSortedSortingNode,
    )
    if (nodeGroupIndex > nextNodeGroupIndex) {
      continue
    }
    let newlinesBetween = getNewlinesBetweenOption({
      nextNodeGroupIndex,
      nodeGroupIndex,
      options,
    })
    newlinesBetween =
      newlinesBetweenValueGetter?.({
        computedNewlinesBetween: newlinesBetween,
        right: nextSortedSortingNode,
        left: sortedSortingNode,
      }) ?? newlinesBetween
    if (newlinesBetween === 'ignore') {
      continue
    }
    let currentNodeRange = getNodeRange({
      node: sortingNode.node,
      sourceCode,
    })
    let nextNodeRangeStart = getNodeRange({
      node: nextSortingNode.node,
      sourceCode,
    }).at(0)
    let linesBetweenMembers = getLinesBetween(
      sourceCode,
      sortingNode,
      nextSortingNode,
    )
    if (linesBetweenMembers === newlinesBetween) {
      continue
    }
    let rangeToReplace = [currentNodeRange.at(1), nextNodeRangeStart]
    let textBetweenNodes = sourceCode.text.slice(
      currentNodeRange.at(1),
      nextNodeRangeStart,
    )
    let rangeReplacement = computeRangeReplacement({
      isOnSameLine:
        sortingNode.node.loc.end.line === nextSortingNode.node.loc.start.line,
      textBetweenNodes,
      newlinesBetween,
    })
    fixes.push(fixer.replaceTextRange(rangeToReplace, rangeReplacement))
  }
  return fixes
}
function computeRangeReplacement({
  textBetweenNodes,
  newlinesBetween,
  isOnSameLine,
}) {
  let textBetweenNodesWithoutInvalidNewlines =
    getStringWithoutInvalidNewlines(textBetweenNodes)
  if (newlinesBetween === 0) {
    return textBetweenNodesWithoutInvalidNewlines
  }
  let rangeReplacement = textBetweenNodesWithoutInvalidNewlines
  for (let index = 0; index < newlinesBetween; index++) {
    rangeReplacement = addNewlineBeforeFirstNewline(rangeReplacement)
  }
  if (!isOnSameLine) {
    return rangeReplacement
  }
  return addNewlineBeforeFirstNewline(rangeReplacement)
}
function addNewlineBeforeFirstNewline(value) {
  let firstNewlineIndex = value.indexOf('\n')
  if (firstNewlineIndex === -1) {
    return `${value}
`
  }
  return `${value.slice(0, firstNewlineIndex)}
${value.slice(firstNewlineIndex)}`
}
function getStringWithoutInvalidNewlines(value) {
  return value.replaceAll(/\n\s*\n/gu, '\n').replaceAll(/\n+/gu, '\n')
}
export { makeNewlinesBetweenFixes }
