import { partitionPatternsByScope } from './partition-patterns-by-scope.js'
import { matches } from '../matches.js'
function matchesScopedExpressions({
  nodeValuesComputer,
  scopedRegexOption,
  allowedNodeTypes,
  parentNodes,
}) {
  if (!scopedRegexOption) {
    return true
  }
  let { shallowScopePatterns, deepScopePatterns } =
    partitionPatternsByScope(scopedRegexOption)
  return (
    matchesShallowScopedExpressions({
      patterns: shallowScopePatterns,
      nodeValuesComputer,
      allowedNodeTypes,
      parentNodes,
    }) ||
    matchesDeepScopedExpressions({
      patterns: deepScopePatterns,
      nodeValuesComputer,
      allowedNodeTypes,
      parentNodes,
    })
  )
}
function matchesShallowScopedExpressions({
  nodeValuesComputer,
  allowedNodeTypes,
  parentNodes,
  patterns,
}) {
  let [firstParent] = parentNodes
  if (!firstParent) {
    return false
  }
  if (!isNodeTypeAmong(firstParent, allowedNodeTypes)) {
    return false
  }
  return matchesParentExpression({
    parentNode: firstParent,
    nodeValuesComputer,
    patterns,
  })
}
function matchesDeepScopedExpressions({
  nodeValuesComputer,
  allowedNodeTypes,
  parentNodes,
  patterns,
}) {
  let relevantParentNodes = parentNodes.filter(parent =>
    isNodeTypeAmong(parent, allowedNodeTypes),
  )
  return relevantParentNodes.some(parentNode =>
    matchesParentExpression({
      nodeValuesComputer,
      parentNode,
      patterns,
    }),
  )
}
function matchesParentExpression({ nodeValuesComputer, parentNode, patterns }) {
  let nodeValues = nodeValuesComputer(parentNode)
  return patterns.some(nodeValueMatchesPattern)
  function nodeValueMatchesPattern(pattern) {
    return nodeValues.some(nodeValue => matches(nodeValue, pattern))
  }
}
function isNodeTypeAmong(node, types) {
  return types.has(node.type)
}
export { matchesScopedExpressions }
