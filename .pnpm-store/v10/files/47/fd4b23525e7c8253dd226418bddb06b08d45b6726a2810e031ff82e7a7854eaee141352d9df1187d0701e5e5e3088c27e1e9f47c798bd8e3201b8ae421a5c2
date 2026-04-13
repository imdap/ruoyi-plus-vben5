import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { passesAllNamesMatchPatternFilter } from '../../utils/context-matching/passes-all-names-match-pattern-filter.js'
import { computePropertyOrVariableDeclaratorName } from './compute-property-or-variable-declarator-name.js'
import { passesCallingFunctionNamePatternFilter } from './passes-calling-function-name-pattern-filter.js'
import { passesDeclarationMatchesPatternFilter } from './passes-declaration-matches-pattern-filter.js'
import { passesDeclarationCommentMatchesFilter } from './passes-declaration-comment-matches-filter.js'
import { passesAstSelectorFilter } from '../../utils/context-matching/passes-ast-selector-filter.js'
import { computeParentNodesWithTypes } from '../../utils/compute-parent-nodes-with-types.js'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
import { objectParentTypes } from './types.js'
function computeMatchedContextOptions({
  isDestructuredObject,
  matchedAstSelectors,
  sourceCode,
  nodeObject,
  context,
}) {
  let nodeNames = nodeObject.properties
    .filter(
      property =>
        property.type !== AST_NODE_TYPES.SpreadElement &&
        property.type !== AST_NODE_TYPES.RestElement,
    )
    .map(property =>
      computePropertyOrVariableDeclaratorName({ node: property, sourceCode }),
    )
  let parentNodes = computeParentNodesWithTypes({
    allowedTypes: [...objectParentTypes],
    consecutiveOnly: false,
    node: nodeObject,
    maxParent: null,
  })
  return context.options.find(options =>
    isContextOptionMatching({
      isDestructuredObject,
      matchedAstSelectors,
      parentNodes,
      sourceCode,
      nodeObject,
      nodeNames,
      options,
    }),
  )
}
function isContextOptionMatching({
  isDestructuredObject,
  matchedAstSelectors,
  parentNodes,
  sourceCode,
  nodeObject,
  nodeNames,
  options,
}) {
  if (!options.useConfigurationIf) {
    return true
  }
  return (
    passesAllNamesMatchPatternFilter({
      allNamesMatchPattern: options.useConfigurationIf.allNamesMatchPattern,
      nodeNames,
    }) &&
    passesObjectTypeFilter({
      objectType: options.useConfigurationIf.objectType,
      isDestructuredObject,
    }) &&
    passesCallingFunctionNamePatternFilter({
      callingFunctionNamePattern:
        options.useConfigurationIf.callingFunctionNamePattern,
      parentNodes,
      sourceCode,
    }) &&
    passesDeclarationMatchesPatternFilter({
      declarationMatchesPattern:
        options.useConfigurationIf.declarationMatchesPattern,
      parentNodes,
      sourceCode,
    }) &&
    passesHasNumericKeysOnlyFilter({
      hasNumericKeysOnlyFilter: options.useConfigurationIf.hasNumericKeysOnly,
      object: nodeObject,
    }) &&
    passesDeclarationCommentMatchesFilter({
      declarationCommentMatchesPattern:
        options.useConfigurationIf.declarationCommentMatchesPattern,
      parentNodes,
      sourceCode,
    }) &&
    passesAstSelectorFilter({
      matchesAstSelector: options.useConfigurationIf.matchesAstSelector,
      matchedAstSelectors,
    })
  )
}
function passesHasNumericKeysOnlyFilter({ hasNumericKeysOnlyFilter, object }) {
  let hasOnlyNumericKeys = hasNumericKeysOnly()
  switch (hasNumericKeysOnlyFilter) {
    case void 0:
      return true
    case false:
      return !hasOnlyNumericKeys
    case true:
      return hasOnlyNumericKeys
    /* v8 ignore next 2 -- @preserve Exhaustive guard. */
    default:
      throw new UnreachableCaseError(hasNumericKeysOnlyFilter)
  }
  function hasNumericKeysOnly() {
    switch (object.type) {
      case AST_NODE_TYPES.ObjectExpression:
        return object.properties.every(
          property =>
            property.type === AST_NODE_TYPES.Property &&
            property.key.type === AST_NODE_TYPES.Literal &&
            typeof property.key.value === 'number',
        )
      case AST_NODE_TYPES.ObjectPattern:
        return false
      /* v8 ignore next 2 */
      default:
        throw new UnreachableCaseError(object)
    }
  }
}
function passesObjectTypeFilter({ isDestructuredObject, objectType }) {
  switch (objectType) {
    case 'non-destructured':
      return !isDestructuredObject
    case 'destructured':
      return isDestructuredObject
    case void 0:
      return true
    /* v8 ignore next 2 -- @preserve Exhaustive guard. */
    default:
      throw new UnreachableCaseError(objectType)
  }
}
export { computeMatchedContextOptions }
