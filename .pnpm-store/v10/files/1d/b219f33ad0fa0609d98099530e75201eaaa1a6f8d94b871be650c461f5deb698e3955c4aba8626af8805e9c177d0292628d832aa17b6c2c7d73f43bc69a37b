import { computeComparators } from './compare/compute-comparators.js'
function sortNodes({
  comparatorByOptionsComputer,
  ignoreEslintDisabledNodes,
  isNodeIgnored,
  options,
  nodes,
}) {
  let nonIgnoredNodes = []
  let ignoredNodeIndices = []
  for (let [index, sortingNode] of nodes.entries()) {
    if (
      (sortingNode.isEslintDisabled && ignoreEslintDisabledNodes) ||
      isNodeIgnored?.(sortingNode)
    ) {
      ignoredNodeIndices.push(index)
    } else {
      nonIgnoredNodes.push(sortingNode)
    }
  }
  let comparators = computeComparators(comparatorByOptionsComputer, options)
  let sortedNodes = [...nonIgnoredNodes].toSorted((a, b) => {
    for (let comparator of comparators) {
      let result = comparator(a, b)
      if (result) {
        return result
      }
    }
    return 0
  })
  for (let ignoredIndex of ignoredNodeIndices) {
    sortedNodes.splice(ignoredIndex, 0, nodes[ignoredIndex])
  }
  return sortedNodes
}
export { sortNodes }
