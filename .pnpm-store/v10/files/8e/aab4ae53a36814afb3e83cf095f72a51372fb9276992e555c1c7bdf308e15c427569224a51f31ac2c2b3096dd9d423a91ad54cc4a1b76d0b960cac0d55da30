function doesSortingNodeHaveOneOfDependencyNames(sortingNode, dependencyNames) {
  let sortingNodeDependencyNames = new Set(sortingNode.dependencyNames)
  return dependencyNames.some(dependencyName =>
    sortingNodeDependencyNames.has(dependencyName),
  )
}
export { doesSortingNodeHaveOneOfDependencyNames }
