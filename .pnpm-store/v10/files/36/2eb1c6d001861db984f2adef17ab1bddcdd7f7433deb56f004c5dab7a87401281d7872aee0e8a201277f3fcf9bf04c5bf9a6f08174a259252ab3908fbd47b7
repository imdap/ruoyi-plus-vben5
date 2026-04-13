function computeDeepScopeReferences(node, sourceCode) {
  return computeScopeReference(sourceCode.getScope(node))
  function computeScopeReference(scope) {
    return [
      ...scope.references,
      ...scope.childScopes.flatMap(computeScopeReference),
    ]
  }
}
export { computeDeepScopeReferences }
