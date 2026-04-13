function populateSortingNodeGroupsWithDependencies({
  dependenciesBySortingNode,
  sortingNodeGroups,
}) {
  return sortingNodeGroups.map(sortingNodes =>
    computeSortingNodeGroupWithDependencies({
      dependenciesBySortingNode,
      sortingNodes,
    }),
  )
}
function computeSortingNodeGroupWithDependencies({
  dependenciesBySortingNode,
  sortingNodes,
}) {
  return sortingNodes.map(computeSortingNodeWithDependencies)
  function computeSortingNodeWithDependencies(sortingNode) {
    return {
      ...sortingNode,
      dependencies: computeSortingNodeDependencies({
        dependenciesBySortingNode,
        sortingNode,
      }),
    }
  }
}
function computeSortingNodeDependencies({
  dependenciesBySortingNode,
  sortingNode,
}) {
  let dependencies = dependenciesBySortingNode.get(sortingNode)
  if (!dependencies) {
    return []
  }
  return dependencies.flatMap(({ dependencyNames }) => dependencyNames)
}
export { populateSortingNodeGroupsWithDependencies }
