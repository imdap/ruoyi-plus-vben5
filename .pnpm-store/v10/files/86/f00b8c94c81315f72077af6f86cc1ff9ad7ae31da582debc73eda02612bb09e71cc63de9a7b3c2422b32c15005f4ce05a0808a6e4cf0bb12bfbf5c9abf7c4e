import { computeDeepScopeReferences } from './compute-deep-scope-references.js'
import { rangeContainsRange } from './range-contains-range.js'
function computeDependenciesBySortingNode({
  additionalIdentifierDependenciesComputer,
  shouldIgnoreSortingNodeComputer,
  shouldIgnoreIdentifierComputer,
  sortingNodes,
  sourceCode,
}) {
  let returnValue = /* @__PURE__ */ new Map()
  let references = sortingNodes.flatMap(sortingNode =>
    computeDeepScopeReferences(sortingNode.node, sourceCode),
  )
  for (let reference of new Set(references)) {
    let { identifier, resolved } = reference
    if (!resolved) {
      continue
    }
    let referencingSortingNode = findSortingNodeContainingIdentifier(
      sortingNodes,
      identifier,
    )
    if (!referencingSortingNode) {
      continue
    }
    if (shouldIgnoreSortingNodeComputer?.(referencingSortingNode)) {
      continue
    }
    let referencedNodes = returnValue.get(referencingSortingNode) ?? []
    returnValue.set(referencingSortingNode, referencedNodes)
    referencedNodes.push(
      ...computeMainIdentifierDependencies({
        shouldIgnoreSortingNodeComputer,
        shouldIgnoreIdentifierComputer,
        referencingSortingNode,
        sortingNodes,
        identifier,
        resolved,
      }),
      ...(additionalIdentifierDependenciesComputer?.({
        referencingSortingNode,
        reference,
      }) ?? []),
    )
  }
  return returnValue
}
function computeMainIdentifierDependencies({
  shouldIgnoreSortingNodeComputer,
  shouldIgnoreIdentifierComputer,
  referencingSortingNode,
  sortingNodes,
  identifier,
  resolved,
}) {
  if (
    shouldIgnoreIdentifierComputer?.({
      referencingSortingNode,
      identifier,
    })
  ) {
    return []
  }
  let [firstIdentifier] = resolved.identifiers
  if (!firstIdentifier) {
    return []
  }
  let referencedSortingNode = findSortingNodeContainingIdentifier(
    sortingNodes,
    firstIdentifier,
  )
  if (!referencedSortingNode) {
    return []
  }
  if (shouldIgnoreSortingNodeComputer?.(referencedSortingNode)) {
    return []
  }
  if (referencedSortingNode === referencingSortingNode) {
    return []
  }
  return [referencedSortingNode]
}
function findSortingNodeContainingIdentifier(sortingNodes, identifier) {
  return sortingNodes.find(sortingNode =>
    rangeContainsRange(sortingNode.node.range, identifier.range),
  )
}
export { computeDependenciesBySortingNode }
