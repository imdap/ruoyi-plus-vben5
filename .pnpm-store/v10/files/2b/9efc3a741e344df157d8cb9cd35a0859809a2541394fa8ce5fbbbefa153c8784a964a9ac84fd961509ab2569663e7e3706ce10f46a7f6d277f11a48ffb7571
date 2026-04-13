import { buildSortingNodeByNodeMap } from '../build-sorting-node-by-node-map.js'
function populateSortingNodeGroupsWithOverloadSignature({
  overloadSignatureGroups,
  sortingNodeGroups,
}) {
  return sortingNodeGroups.map(sortingNodes =>
    populateSortingNodeGroupWithOverloadSignature({
      overloadSignatureGroups,
      sortingNodes,
    }),
  )
}
function buildUpdatedSortingNode({
  overloadSignatureGroups,
  sortingNodeByNode,
  sortingNode,
}) {
  let overloadSignatureImplementation = computeOverloadSignatureImplementation({
    overloadSignatureGroups,
    node: sortingNode.node,
  })
  if (!overloadSignatureImplementation) {
    return {
      ...sortingNode,
      overloadSignatureImplementation: null,
    }
  }
  let implementationSortingNode = sortingNodeByNode.get(
    overloadSignatureImplementation,
  )
  if (!implementationSortingNode) {
    return {
      ...sortingNode,
      overloadSignatureImplementation: null,
    }
  }
  let {
    addSafetySemicolonWhenInline,
    isEslintDisabled,
    node,
    ...relevantImplementationSortingNodeFields
  } = implementationSortingNode
  return {
    ...sortingNode,
    ...relevantImplementationSortingNodeFields,
    overloadSignatureImplementation,
  }
}
function populateSortingNodeGroupWithOverloadSignature({
  overloadSignatureGroups,
  sortingNodes,
}) {
  let sortingNodeByNode = buildSortingNodeByNodeMap(sortingNodes)
  return sortingNodes.map(sortingNode =>
    buildUpdatedSortingNode({
      overloadSignatureGroups,
      sortingNodeByNode,
      sortingNode,
    }),
  )
}
function computeOverloadSignatureImplementation({
  overloadSignatureGroups,
  node,
}) {
  let matchingOverloadSignature = overloadSignatureGroups.find(
    overloadSignatureGroup =>
      overloadSignatureGroup.doesNodeBelongToGroup(node),
  )
  if (!matchingOverloadSignature) {
    return null
  }
  return matchingOverloadSignature.implementation
}
export { populateSortingNodeGroupsWithOverloadSignature }
