import { matchesScopedExpressions } from '../../utils/scoped-regex/matches-scoped-expressions.js'
import { computeNodeParentName } from './compute-node-parent-name.js'
import { objectTypeParentTypes } from './types.js'
function passesDeclarationMatchesPatternFilter({
  declarationMatchesPattern,
  parentNodes,
  sourceCode,
}) {
  return matchesScopedExpressions({
    nodeValuesComputer: buildNodeValuesComputer(sourceCode),
    allowedNodeTypes: new Set(objectTypeParentTypes),
    scopedRegexOption: declarationMatchesPattern,
    parentNodes,
  })
}
function buildNodeValuesComputer(sourceCode) {
  return node => [computeNodeParentName(node, sourceCode)]
}
export { passesDeclarationMatchesPatternFilter }
