import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import {
  buildUseConfigurationIfJsonSchema,
  matchesAstSelectorJsonSchema,
  buildCommonJsonSchemas,
} from '../utils/json-schemas/common-json-schemas.js'
import {
  partitionByNewLineJsonSchema,
  partitionByCommentJsonSchema,
} from '../utils/json-schemas/common-partition-json-schemas.js'
import {
  ORDER_ERROR,
  GROUP_ORDER_ERROR,
  EXTRA_SPACING_ERROR,
  MISSED_SPACING_ERROR,
} from '../utils/report-errors.js'
import { buildCommonGroupsJsonSchemas } from '../utils/json-schemas/common-groups-json-schemas.js'
import { additionalCustomGroupMatchOptionsJsonSchema } from './sort-arrays/types.js'
import { buildAstListeners } from '../utils/build-ast-listeners.js'
import { createEslintRule } from '../utils/create-eslint-rule.js'
import { sortArray } from './sort-arrays/sort-array.js'
let cachedGroupsByModifiersAndSelectors = /* @__PURE__ */ new Map()
const ORDER_ERROR_ID = 'unexpectedArrayIncludesOrder'
const GROUP_ORDER_ERROR_ID = 'unexpectedArrayIncludesGroupOrder'
const EXTRA_SPACING_ERROR_ID = 'extraSpacingBetweenArrayIncludesMembers'
const MISSED_SPACING_ERROR_ID = 'missedSpacingBetweenArrayIncludesMembers'
let defaultOptions = {
  fallbackSort: { type: 'unsorted' },
  newlinesInside: 'newlinesBetween',
  specialCharacters: 'keep',
  partitionByComment: false,
  partitionByNewLine: false,
  newlinesBetween: 'ignore',
  useConfigurationIf: {},
  type: 'alphabetical',
  groups: ['literal'],
  ignoreCase: true,
  locales: 'en-US',
  customGroups: [],
  alphabet: '',
  order: 'asc',
}
let jsonSchema = {
  items: {
    properties: {
      ...buildCommonJsonSchemas(),
      ...buildCommonGroupsJsonSchemas({
        additionalCustomGroupMatchProperties:
          additionalCustomGroupMatchOptionsJsonSchema,
      }),
      useConfigurationIf: buildUseConfigurationIfJsonSchema({
        additionalProperties: {
          matchesAstSelector: matchesAstSelectorJsonSchema,
        },
      }),
      partitionByComment: partitionByCommentJsonSchema,
      partitionByNewLine: partitionByNewLineJsonSchema,
    },
    additionalProperties: false,
    type: 'object',
  },
  uniqueItems: true,
  type: 'array',
}
const sortArrayIncludes = createEslintRule({
  meta: {
    messages: {
      [MISSED_SPACING_ERROR_ID]: MISSED_SPACING_ERROR,
      [EXTRA_SPACING_ERROR_ID]: EXTRA_SPACING_ERROR,
      [GROUP_ORDER_ERROR_ID]: GROUP_ORDER_ERROR,
      [ORDER_ERROR_ID]: ORDER_ERROR,
    },
    docs: {
      description: 'Enforce sorted arrays before include method.',
      url: 'https://perfectionist.dev/rules/sort-array-includes',
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
  name: 'sort-array-includes',
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
    if (node.parent.type !== AST_NODE_TYPES.MemberExpression) {
      return false
    }
    if (node.parent.property.type !== AST_NODE_TYPES.Identifier) {
      return false
    }
    if (node.parent.property.name !== 'includes') {
      return false
    }
    if (node.parent.parent.type !== AST_NODE_TYPES.CallExpression) {
      return false
    }
    if (node.parent.parent.callee !== node.parent) {
      return false
    }
    return true
  }
}
export { sortArrayIncludes as default, defaultOptions, jsonSchema }
