function buildAstListeners({ nodeTypes, context, sorter }) {
  let emptyMatchedAstSelectors = /* @__PURE__ */ new Set()
  let matchedAstSelectorsByNode = /* @__PURE__ */ new WeakMap()
  let allAstSelectors = [
    ...new Set(
      context.options
        .map(option => option.useConfigurationIf?.matchesAstSelector)
        .filter(matchesAstSelector => matchesAstSelector !== void 0),
    ),
  ]
  let allAstSelectorMatchers = allAstSelectors.map(astSelector => [
    astSelector,
    buildMatchedAstSelectorsCollector({
      matchedAstSelectorsByNode,
      astSelector,
      nodeTypes,
    }),
  ])
  return {
    ...Object.fromEntries(allAstSelectorMatchers),
    ...Object.fromEntries(nodeTypes.map(buildNodeTypeExitListener)),
  }
  function buildNodeTypeExitListener(nodeType) {
    return [
      `${nodeType}:exit`,
      node =>
        sorter({
          matchedAstSelectors:
            matchedAstSelectorsByNode.get(node) ?? emptyMatchedAstSelectors,
          context,
          node,
        }),
    ]
  }
}
function buildMatchedAstSelectorsCollector({
  matchedAstSelectorsByNode,
  astSelector,
  nodeTypes,
}) {
  return collectMatchedAstSelectors
  function collectMatchedAstSelectors(node) {
    if (!isNodeOfType(node)) {
      return
    }
    let matchedAstSelectors = matchedAstSelectorsByNode.get(node)
    if (!matchedAstSelectors) {
      matchedAstSelectors = /* @__PURE__ */ new Set()
      matchedAstSelectorsByNode.set(node, matchedAstSelectors)
    }
    matchedAstSelectors.add(astSelector)
  }
  function isNodeOfType(node) {
    return nodeTypes.includes(node.type)
  }
}
export { buildAstListeners }
