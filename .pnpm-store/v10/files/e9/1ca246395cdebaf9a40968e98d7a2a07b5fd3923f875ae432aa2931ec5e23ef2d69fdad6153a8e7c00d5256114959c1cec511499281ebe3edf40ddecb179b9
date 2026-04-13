import { AST_NODE_TYPES, AST_TOKEN_TYPES } from '@typescript-eslint/utils'
import { computeDependenciesBySortingNode as computeDependenciesBySortingNode$1 } from '../../utils/compute-dependencies-by-sorting-node.js'
import { computeParentNodesWithTypes } from '../../utils/compute-parent-nodes-with-types.js'
import { computeIdentifierNameDetails } from './compute-identifier-name-details.js'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
import { matches } from '../../utils/matches.js'
function computeDependenciesBySortingNode({
  ignoreCallbackDependenciesPatterns,
  sortingNodes,
  sourceCode,
  classBody,
}) {
  let staticSortingNodes = sortingNodes.filter(node => node.isStatic)
  let dependenciesBySortingNode = computeDependenciesBySortingNode$1({
    additionalIdentifierDependenciesComputer:
      buildAdditionalIdentifierDependenciesComputer({
        ignoreCallbackDependenciesPatterns,
        staticSortingNodes,
        classBody,
      }),
    shouldIgnoreSortingNodeComputer: sortingNode =>
      shouldIgnoreDependencyComputation(sortingNode.node),
    sortingNodes,
    sourceCode,
  })
  let thisDependenciesBySortingNode =
    computeThisExpressionDependenciesBySortingNode({
      ignoreCallbackDependenciesPatterns,
      sortingNodes,
      sourceCode,
    })
  for (let [sortingNode, dependencies] of thisDependenciesBySortingNode) {
    let existingDependencies = dependenciesBySortingNode.get(sortingNode) ?? []
    dependenciesBySortingNode.set(sortingNode, [
      ...existingDependencies,
      ...dependencies,
    ])
  }
  return dependenciesBySortingNode
}
function computeIdentifierOrThisExpressionDependency({
  ignoreCallbackDependenciesPatterns,
  sortingNodes,
  classElement,
  node,
}) {
  if (shouldIgnoreCallbackDependency()) {
    return null
  }
  let { parent } = node
  if (parent.type !== AST_NODE_TYPES.MemberExpression) {
    return null
  }
  let dependencyName = computeDependencyNameFromMemberExpression(parent)
  if (!dependencyName) {
    return null
  }
  return (
    sortingNodes.find(
      currentSortingNode => currentSortingNode.name === dependencyName.name,
    ) ?? null
  )
  function computeDependencyNameFromMemberExpression(memberExpression) {
    switch (memberExpression.property.type) {
      case AST_NODE_TYPES.PrivateIdentifier:
      case AST_NODE_TYPES.Identifier:
      case AST_NODE_TYPES.Literal:
        return computeIdentifierNameDetails(memberExpression.property)
      /* v8 ignore next 2 -- @preserve Unhandled cases */
      default:
        return null
    }
  }
  function shouldIgnoreCallbackDependency() {
    let [firstCallExpressionParent] = computeParentNodesWithTypes({
      allowedTypes: [AST_NODE_TYPES.CallExpression],
      maxParent: classElement,
      consecutiveOnly: false,
      node,
    })
    if (!firstCallExpressionParent) {
      return false
    }
    if (!('name' in firstCallExpressionParent.callee)) {
      return false
    }
    return matches(
      firstCallExpressionParent.callee.name,
      ignoreCallbackDependenciesPatterns,
    )
  }
}
function computeThisExpressionDependenciesBySortingNode({
  ignoreCallbackDependenciesPatterns,
  sortingNodes,
  sourceCode,
}) {
  let dependenciesBySortingNode = /* @__PURE__ */ new Map()
  let staticSortingNodes = sortingNodes.filter(node => node.isStatic)
  let nonStaticSortingNodes = sortingNodes.filter(node => !node.isStatic)
  let relevantSortingNodes = sortingNodes.filter(
    sortingNode => !shouldIgnoreDependencyComputation(sortingNode.node),
  )
  for (let sortingNode of relevantSortingNodes) {
    let thisExpressions = computeThisExpressionsInsideClassElement({
      classElement: sortingNode.node,
      sourceCode,
    })
    let dependencies = thisExpressions
      .map(thisExpression =>
        computeIdentifierOrThisExpressionDependency({
          sortingNodes:
            sortingNode.isStatic ? staticSortingNodes : nonStaticSortingNodes,
          ignoreCallbackDependenciesPatterns,
          classElement: sortingNode.node,
          node: thisExpression,
        }),
      )
      .filter(dependency => dependency !== null)
    if (dependencies.length === 0) {
      continue
    }
    dependenciesBySortingNode.set(sortingNode, dependencies)
  }
  return dependenciesBySortingNode
}
function buildAdditionalIdentifierDependenciesComputer({
  ignoreCallbackDependenciesPatterns,
  staticSortingNodes,
  classBody,
}) {
  return ({ referencingSortingNode, reference }) => {
    let resolvedClassIdentifier = reference.resolved?.identifiers[0]
    if (!resolvedClassIdentifier) {
      return []
    }
    let classIdentifier = classBody.parent.id
    if (reference.resolved?.identifiers[0] !== classIdentifier) {
      return []
    }
    let dependency = computeIdentifierOrThisExpressionDependency({
      classElement: referencingSortingNode.node,
      ignoreCallbackDependenciesPatterns,
      sortingNodes: staticSortingNodes,
      node: reference.identifier,
    })
    return dependency ? [dependency] : []
  }
}
function shouldIgnoreDependencyComputation(node) {
  switch (node.type) {
    case AST_NODE_TYPES.TSAbstractPropertyDefinition:
    case AST_NODE_TYPES.TSAbstractMethodDefinition:
    case AST_NODE_TYPES.StaticBlock:
      return false
    case AST_NODE_TYPES.TSAbstractAccessorProperty:
    case AST_NODE_TYPES.AccessorProperty:
    case AST_NODE_TYPES.MethodDefinition:
    case AST_NODE_TYPES.TSIndexSignature:
      return true
    case AST_NODE_TYPES.PropertyDefinition:
      return (
        node.value?.type === AST_NODE_TYPES.ArrowFunctionExpression ||
        node.value?.type === AST_NODE_TYPES.FunctionExpression
      )
    /* v8 ignore next 2 -- @preserve Exhaustive guard. */
    default:
      throw new UnreachableCaseError(node)
  }
}
function computeThisExpressionsInsideClassElement({
  classElement,
  sourceCode,
}) {
  let thisTokens = sourceCode.getTokens(classElement).filter(isThisToken)
  return thisTokens
    .map(computeTokenNode)
    .filter(node => node?.type === AST_NODE_TYPES.ThisExpression)
  function computeTokenNode(token) {
    return sourceCode.getNodeByRangeIndex(token.range[0])
  }
  function isThisToken(token) {
    return token.type === AST_TOKEN_TYPES.Keyword && token.value === 'this'
  }
}
export { computeDependenciesBySortingNode }
