import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { passesAllNamesMatchPatternFilter } from '../../utils/context-matching/passes-all-names-match-pattern-filter.js'
import { passesDeclarationMatchesPatternFilter } from './passes-declaration-matches-pattern-filter.js'
import { passesDeclarationCommentMatchesFilter } from './passes-declaration-comment-matches-filter.js'
import { passesAstSelectorFilter } from '../../utils/context-matching/passes-ast-selector-filter.js'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
import { computeNodeName } from './compute-node-name.js'
function computeMatchedContextOptions({
  matchedAstSelectors,
  parentNodes,
  sourceCode,
  elements,
  context,
}) {
  return context.options.find(options =>
    isContextOptionMatching({
      nodeNames: elements.map(node => computeNodeName({ sourceCode, node })),
      matchedAstSelectors,
      parentNodes,
      sourceCode,
      elements,
      options,
    }),
  )
}
function isContextOptionMatching({
  matchedAstSelectors,
  parentNodes,
  sourceCode,
  nodeNames,
  elements,
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
    passesDeclarationMatchesPatternFilter({
      declarationMatchesPattern:
        options.useConfigurationIf.declarationMatchesPattern,
      parentNodes,
      sourceCode,
    }) &&
    passesHasNumericKeysOnlyFilter({
      hasNumericKeysOnlyFilter: options.useConfigurationIf.hasNumericKeysOnly,
      typeElements: elements,
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
function passesHasNumericKeysOnlyFilter({
  hasNumericKeysOnlyFilter,
  typeElements,
}) {
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
    return typeElements.every(isNumericKey)
    function isNumericKey(typeElement) {
      return (
        typeElement.type === AST_NODE_TYPES.TSPropertySignature &&
        typeElement.key.type === AST_NODE_TYPES.Literal &&
        typeof typeElement.key.value === 'number'
      )
    }
  }
}
export { computeMatchedContextOptions }
