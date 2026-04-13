function isNodeDependentOnOtherNode(sortingNode1, sortingNode2) {
  if (sortingNode1 === sortingNode2) {
    return false
  }
  return sortingNode1.dependencyNames.some(dependency =>
    sortingNode2.dependencies.includes(dependency),
  )
}
export { isNodeDependentOnOtherNode }
