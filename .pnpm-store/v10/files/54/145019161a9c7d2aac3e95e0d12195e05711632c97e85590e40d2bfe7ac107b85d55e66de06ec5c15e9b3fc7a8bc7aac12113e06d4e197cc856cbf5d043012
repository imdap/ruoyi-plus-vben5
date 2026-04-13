import { computeNodesInCircularDependencies } from './compute-nodes-in-circular-dependencies.js'
import { isNodeDependentOnOtherNode } from './is-node-dependent-on-other-node.js'
function sortNodesByDependencies(nodes, extraOptions) {
  let nodesInCircularDependencies = computeNodesInCircularDependencies(nodes)
  let result = []
  let visitedNodes = /* @__PURE__ */ new Set()
  function visitNode(sortingNode) {
    if (visitedNodes.has(sortingNode)) {
      return
    }
    let dependentNodes = nodes
      .filter(node => !nodesInCircularDependencies.has(node))
      .filter(node => isNodeDependentOnOtherNode(node, sortingNode))
    for (let dependentNode of dependentNodes) {
      if (
        !extraOptions.ignoreEslintDisabledNodes ||
        !dependentNode.isEslintDisabled
      ) {
        visitNode(dependentNode)
      }
    }
    visitedNodes.add(sortingNode)
    result.push(sortingNode)
  }
  for (let node of nodes) {
    visitNode(node)
  }
  return result
}
export { sortNodesByDependencies }
