import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
function computeDependencyNames(pattern) {
  switch (pattern.type) {
    case AST_NODE_TYPES.AssignmentPattern:
      return computeDependencyNames(pattern.left)
    case AST_NODE_TYPES.ObjectPattern:
      return pattern.properties.flatMap(extractNamesFromObjectPatternProperty)
    case AST_NODE_TYPES.ArrayPattern:
      return pattern.elements.flatMap(extractNamesFromArrayPatternElement)
    case AST_NODE_TYPES.Identifier:
      return [pattern.name]
    /* v8 ignore next 2 */
    default:
      return []
  }
  function extractNamesFromArrayPatternElement(element) {
    if (!element) {
      return []
    }
    if (element.type === AST_NODE_TYPES.RestElement) {
      return computeDependencyNames(element.argument)
    }
    return computeDependencyNames(element)
  }
  function extractNamesFromObjectPatternProperty(property) {
    switch (property.type) {
      case AST_NODE_TYPES.RestElement:
        return computeDependencyNames(property.argument)
      case AST_NODE_TYPES.Property:
        return computeDependencyNames(property.value)
      /* v8 ignore next 2 -- @preserve Exhaustive guard. */
      default:
        throw new UnreachableCaseError(property)
    }
  }
}
export { computeDependencyNames }
