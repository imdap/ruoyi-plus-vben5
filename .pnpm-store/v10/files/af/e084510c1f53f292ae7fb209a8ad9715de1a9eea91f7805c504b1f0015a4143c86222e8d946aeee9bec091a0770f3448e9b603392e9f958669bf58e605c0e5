function partitionPatternsByScope(patternOrPatterns) {
  if (!Array.isArray(patternOrPatterns)) {
    let isDeepScopePattern = isDeepScopedPattern(patternOrPatterns)
    return {
      shallowScopePatterns: isDeepScopePattern ? [] : [patternOrPatterns],
      deepScopePatterns: isDeepScopePattern ? [patternOrPatterns] : [],
    }
  }
  let deepScopedPatterns = []
  let shallowScopedPatterns = []
  for (let pattern of patternOrPatterns) {
    let isDeepScopePattern = isDeepScopedPattern(pattern)
    if (isDeepScopePattern) {
      deepScopedPatterns.push(pattern)
    } else {
      shallowScopedPatterns.push(pattern)
    }
  }
  return {
    shallowScopePatterns: shallowScopedPatterns,
    deepScopePatterns: deepScopedPatterns,
  }
}
function isDeepScopedPattern(pattern) {
  if (typeof pattern !== 'object') {
    return false
  }
  if (!('scope' in pattern)) {
    return false
  }
  return pattern.scope === 'deep'
}
export { partitionPatternsByScope }
