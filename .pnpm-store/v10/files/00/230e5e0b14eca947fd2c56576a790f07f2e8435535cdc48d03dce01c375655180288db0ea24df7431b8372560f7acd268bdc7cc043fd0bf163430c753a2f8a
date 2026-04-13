import { populateSortingNodeGroupsWithDependencies } from '../../utils/populate-sorting-node-groups-with-dependencies.js'
import { computeDependenciesBySortingNode } from './compute-dependencies-by-sorting-node.js'
import { isNodeDependentOnOtherNode } from '../../utils/is-node-dependent-on-other-node.js'
import { buildSortingNodeByNodeMap } from '../../utils/build-sorting-node-by-node-map.js'
import { sortNodesByDependencies } from '../../utils/sort-nodes-by-dependencies.js'
import { computeOrderedValue } from '../../utils/compare/compute-ordered-value.js'
import { computeDependencies } from './compute-dependencies.js'
function buildUsageComparator({
  useExperimentalDependencyDetection,
  ignoreEslintDisabledNodes,
  sortingNodes,
  sourceCode,
  options,
}) {
  let { updatedSortingNodeByNode, orderByUnsortedNode, orderBySortedNode } =
    buildOrderByNodeMaps({
      useExperimentalDependencyDetection,
      ignoreEslintDisabledNodes,
      sortingNodes,
      sourceCode,
    })
  return (a, b) => {
    let nodeA = a.node
    let nodeB = b.node
    let sortedOrderA = orderBySortedNode.get(nodeA)
    let unsortedOrderA = orderByUnsortedNode.get(nodeA)
    let sortedOrderB = orderBySortedNode.get(nodeB)
    let unsortedOrderB = orderByUnsortedNode.get(nodeB)
    let sortedOrderedValue = computeOrderedValue(
      sortedOrderA - sortedOrderB,
      options.order,
    )
    let unsortedOrderedValue = computeOrderedValue(
      unsortedOrderA - unsortedOrderB,
      options.order,
    )
    if (sortedOrderedValue !== unsortedOrderedValue) {
      return sortedOrderedValue
    }
    let aWithUpdatedDependencies = updatedSortingNodeByNode.get(nodeA)
    let bWithUpdatedDependencies = updatedSortingNodeByNode.get(nodeB)
    if (
      isNodeDependentOnOtherNode(
        aWithUpdatedDependencies,
        bWithUpdatedDependencies,
      ) ||
      isNodeDependentOnOtherNode(
        bWithUpdatedDependencies,
        aWithUpdatedDependencies,
      )
    ) {
      return sortedOrderedValue
    }
    return 0
  }
}
function buildOrderByNodeMaps({
  useExperimentalDependencyDetection,
  ignoreEslintDisabledNodes,
  sortingNodes,
  sourceCode,
}) {
  let sortingNodesWithUpdatedDependencies
  if (useExperimentalDependencyDetection) {
    let dependenciesBySortingNode = computeDependenciesBySortingNode({
      dependencyDetection: 'soft',
      sortingNodes,
      sourceCode,
    })
    sortingNodesWithUpdatedDependencies =
      populateSortingNodeGroupsWithDependencies({
        sortingNodeGroups: [sortingNodes],
        dependenciesBySortingNode,
      })[0]
  } else {
    sortingNodesWithUpdatedDependencies = sortingNodes.map(
      computeSortingNodeWithUpdatedDependencies,
    )
  }
  let sortedSortingNodes = sortNodesByDependencies(
    sortingNodesWithUpdatedDependencies,
    { ignoreEslintDisabledNodes },
  )
  return {
    updatedSortingNodeByNode: buildSortingNodeByNodeMap(
      sortingNodesWithUpdatedDependencies,
    ),
    orderBySortedNode: buildOrderByNodeMap(sortedSortingNodes),
    orderByUnsortedNode: buildOrderByNodeMap(sortingNodes),
  }
  function computeSortingNodeWithUpdatedDependencies({
    isEslintDisabled,
    dependencyNames,
    node,
  }) {
    let dependencies = computeDependencies(node, { type: 'soft' })
    let dependencyNamesSet = new Set(dependencyNames)
    return {
      dependencies: dependencies.filter(
        dependency => !dependencyNamesSet.has(dependency),
      ),
      isEslintDisabled,
      dependencyNames,
      node,
    }
  }
}
function buildOrderByNodeMap(sortingNodes) {
  let returnValue = /* @__PURE__ */ new Map()
  for (let [i, { node }] of sortingNodes.entries()) {
    returnValue.set(node, i)
  }
  return returnValue
}
export { buildUsageComparator }
