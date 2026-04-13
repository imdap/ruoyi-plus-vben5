import { getGroupIndex } from './get-group-index.js'
import { sortNodes } from './sort-nodes.js'
function sortNodesByGroups({
  comparatorByOptionsComputer,
  optionsByGroupIndexComputer,
  ignoreEslintDisabledNodes,
  isNodeIgnoredForGroup,
  isNodeIgnored,
  groups,
  nodes,
}) {
  let nodesByNonIgnoredGroupIndex = {}
  let ignoredNodeIndices = []
  for (let [index, sortingNode] of nodes.entries()) {
    if (
      (sortingNode.isEslintDisabled && ignoreEslintDisabledNodes) ||
      isNodeIgnored?.(sortingNode)
    ) {
      ignoredNodeIndices.push(index)
      continue
    }
    let groupIndex = getGroupIndex(groups, sortingNode)
    nodesByNonIgnoredGroupIndex[groupIndex] ??= []
    nodesByNonIgnoredGroupIndex[groupIndex].push(sortingNode)
  }
  let sortedNodes = []
  for (let groupIndexString of Object.keys(
    nodesByNonIgnoredGroupIndex,
  ).toSorted((a, b) => Number(a) - Number(b))) {
    let groupIndex = Number(groupIndexString)
    let options = optionsByGroupIndexComputer(groupIndex)
    let nodesToPush = nodesByNonIgnoredGroupIndex[groupIndex]
    let groupIgnoredNodes = new Set(
      nodesToPush.filter(node =>
        isNodeIgnoredForGroup?.({
          groupOptions: options,
          groupIndex,
          node,
        }),
      ),
    )
    sortedNodes.push(
      ...sortNodes({
        isNodeIgnored: node => groupIgnoredNodes.has(node),
        ignoreEslintDisabledNodes: false,
        comparatorByOptionsComputer,
        nodes: nodesToPush,
        options,
      }),
    )
  }
  for (let ignoredIndex of ignoredNodeIndices) {
    sortedNodes.splice(ignoredIndex, 0, nodes[ignoredIndex])
  }
  return sortedNodes
}
export { sortNodesByGroups }
