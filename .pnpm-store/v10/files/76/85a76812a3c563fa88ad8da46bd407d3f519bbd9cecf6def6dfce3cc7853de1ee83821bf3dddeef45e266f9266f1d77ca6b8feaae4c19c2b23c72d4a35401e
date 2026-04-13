import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { passesAllNamesMatchPatternFilter } from '../../utils/context-matching/passes-all-names-match-pattern-filter.js'
import { passesAstSelectorFilter } from '../../utils/context-matching/passes-ast-selector-filter.js'
import { computeNodeName } from './compute-node-name.js'
import { matches } from '../../utils/matches.js'
function computeMatchedContextOptions({
  matchedAstSelectors,
  sourceCode,
  context,
  node,
}) {
  let nodeNames = node.openingElement.attributes
    .filter(attribute => attribute.type !== AST_NODE_TYPES.JSXSpreadAttribute)
    .map(attribute => computeNodeName(attribute))
  return context.options.find(options =>
    isContextOptionMatching({
      matchedAstSelectors,
      sourceCode,
      nodeNames,
      options,
      node,
    }),
  )
}
function isContextOptionMatching({
  matchedAstSelectors,
  sourceCode,
  nodeNames,
  options,
  node,
}) {
  if (!options.useConfigurationIf) {
    return true
  }
  return (
    passesAllNamesMatchPatternFilter({
      allNamesMatchPattern: options.useConfigurationIf.allNamesMatchPattern,
      nodeNames,
    }) &&
    passesTagMatchesPatternFilter({
      tagMatchesPattern: options.useConfigurationIf.tagMatchesPattern,
      sourceCode,
      node,
    }) &&
    passesAstSelectorFilter({
      matchesAstSelector: options.useConfigurationIf.matchesAstSelector,
      matchedAstSelectors,
    })
  )
}
function passesTagMatchesPatternFilter({
  tagMatchesPattern,
  sourceCode,
  node,
}) {
  if (!tagMatchesPattern) {
    return true
  }
  return matches(
    sourceCode.getText(node.openingElement.name),
    tagMatchesPattern,
  )
}
export { computeMatchedContextOptions }
