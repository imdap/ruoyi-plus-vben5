import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import {
  ORDER_ERROR,
  GROUP_ORDER_ERROR,
  EXTRA_SPACING_ERROR,
  MISSED_SPACING_ERROR,
} from '../utils/report-errors.js'
import { defaultOptions, jsonSchema } from './sort-array-includes.js'
import { buildAstListeners } from '../utils/build-ast-listeners.js'
import { createEslintRule } from '../utils/create-eslint-rule.js'
import { sortArray } from './sort-arrays/sort-array.js'
let cachedGroupsByModifiersAndSelectors = /* @__PURE__ */ new Map()
const ORDER_ERROR_ID = 'unexpectedSetsOrder'
const GROUP_ORDER_ERROR_ID = 'unexpectedSetsGroupOrder'
const EXTRA_SPACING_ERROR_ID = 'extraSpacingBetweenSetsMembers'
const MISSED_SPACING_ERROR_ID = 'missedSpacingBetweenSetsMembers'
const sortSets = createEslintRule({
  meta: {
    messages: {
      [MISSED_SPACING_ERROR_ID]: MISSED_SPACING_ERROR,
      [EXTRA_SPACING_ERROR_ID]: EXTRA_SPACING_ERROR,
      [GROUP_ORDER_ERROR_ID]: GROUP_ORDER_ERROR,
      [ORDER_ERROR_ID]: ORDER_ERROR,
    },
    docs: {
      url: 'https://perfectionist.dev/rules/sort-sets',
      description: 'Enforce sorted sets.',
      recommended: true,
    },
    schema: jsonSchema,
    type: 'suggestion',
    fixable: 'code',
  },
  create: context =>
    buildAstListeners({
      nodeTypes: [AST_NODE_TYPES.NewExpression, AST_NODE_TYPES.ArrayExpression],
      sorter: sortPotentiallyValidArray,
      context,
    }),
  defaultOptions: [defaultOptions],
  name: 'sort-sets',
})
function sortPotentiallyValidArray({ matchedAstSelectors, context, node }) {
  if (!isValidArray()) {
    return
  }
  sortArray({
    availableMessageIds: {
      missedSpacingBetweenMembers: MISSED_SPACING_ERROR_ID,
      extraSpacingBetweenMembers: EXTRA_SPACING_ERROR_ID,
      unexpectedGroupOrder: GROUP_ORDER_ERROR_ID,
      unexpectedOrder: ORDER_ERROR_ID,
    },
    mustHaveMatchedContextOptions: false,
    cachedGroupsByModifiersAndSelectors,
    matchedAstSelectors,
    defaultOptions,
    context,
    node,
  })
  function isValidArray() {
    if (node.parent.type !== AST_NODE_TYPES.NewExpression) {
      return false
    }
    if (node.parent.callee.type !== AST_NODE_TYPES.Identifier) {
      return false
    }
    if (node.parent.callee.name !== 'Set') {
      return false
    }
    if (node.parent.arguments[0] !== node) {
      return false
    }
    return true
  }
}
export { sortSets as default }
