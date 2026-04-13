import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { passesAllNamesMatchPatternFilter } from '../../utils/context-matching/passes-all-names-match-pattern-filter.js'
import { passesAstSelectorFilter } from '../../utils/context-matching/passes-ast-selector-filter.js'
import { computeNodeName } from './compute-node-name.js'
function computeMatchedContextOptions({ matchedAstSelectors, context, node }) {
  return context.options.find(options =>
    isContextOptionMatching({ matchedAstSelectors, options, node }),
  )
}
function isContextOptionMatching({ matchedAstSelectors, options, node }) {
  if (!options.useConfigurationIf) {
    return true
  }
  let nodeNames = node.specifiers
    .filter(specifier => specifier.type === AST_NODE_TYPES.ImportSpecifier)
    .map(specifier => computeNodeName(specifier, !!options.ignoreAlias))
  return (
    passesAllNamesMatchPatternFilter({
      allNamesMatchPattern: options.useConfigurationIf.allNamesMatchPattern,
      nodeNames,
    }) &&
    passesAstSelectorFilter({
      matchesAstSelector: options.useConfigurationIf.matchesAstSelector,
      matchedAstSelectors,
    })
  )
}
export { computeMatchedContextOptions }
