import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { matchesScopedExpressions } from '../../utils/scoped-regex/matches-scoped-expressions.js'
function passesCallingFunctionNamePatternFilter({
  callingFunctionNamePattern,
  parentNodes,
  sourceCode,
}) {
  return matchesScopedExpressions({
    allowedNodeTypes: /* @__PURE__ */ new Set([AST_NODE_TYPES.CallExpression]),
    nodeValuesComputer: buildNodeValuesComputer(sourceCode),
    scopedRegexOption: callingFunctionNamePattern,
    parentNodes,
  })
}
function buildNodeValuesComputer(sourceCode) {
  return node => [sourceCode.getText(node.callee)]
}
export { passesCallingFunctionNamePatternFilter }
