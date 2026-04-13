import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { computePropertyOrVariableDeclaratorName } from './compute-property-or-variable-declarator-name.js'
import { matchesScopedExpressions } from '../../utils/scoped-regex/matches-scoped-expressions.js'
let allowedTypes = [AST_NODE_TYPES.VariableDeclarator, AST_NODE_TYPES.Property]
function passesDeclarationMatchesPatternFilter({
  declarationMatchesPattern,
  parentNodes,
  sourceCode,
}) {
  return matchesScopedExpressions({
    nodeValuesComputer: buildNodeValuesComputer(sourceCode),
    scopedRegexOption: declarationMatchesPattern,
    allowedNodeTypes: new Set(allowedTypes),
    parentNodes,
  })
}
function buildNodeValuesComputer(sourceCode) {
  return node => [
    computePropertyOrVariableDeclaratorName({
      sourceCode,
      node,
    }),
  ]
}
export { passesDeclarationMatchesPatternFilter }
