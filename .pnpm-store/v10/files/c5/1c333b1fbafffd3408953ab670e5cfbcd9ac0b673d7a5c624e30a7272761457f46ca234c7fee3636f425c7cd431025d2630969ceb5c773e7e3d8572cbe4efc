import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import {
  ORDER_ERROR,
  GROUP_ORDER_ERROR,
  EXTRA_SPACING_ERROR,
  MISSED_SPACING_ERROR,
} from '../utils/report-errors.js'
import { sortUnionOrIntersectionTypes } from './sort-union-types/sort-union-or-intersection-types.js'
import { buildAstListeners } from '../utils/build-ast-listeners.js'
import { createEslintRule } from '../utils/create-eslint-rule.js'
import { jsonSchema } from './sort-union-types.js'
let cachedGroupsByModifiersAndSelectors = /* @__PURE__ */ new Map()
const ORDER_ERROR_ID = 'unexpectedIntersectionTypesOrder'
const GROUP_ORDER_ERROR_ID = 'unexpectedIntersectionTypesGroupOrder'
const EXTRA_SPACING_ERROR_ID = 'extraSpacingBetweenIntersectionTypes'
const MISSED_SPACING_ERROR_ID = 'missedSpacingBetweenIntersectionTypes'
let defaultOptions = {
  fallbackSort: { type: 'unsorted' },
  newlinesInside: 'newlinesBetween',
  specialCharacters: 'keep',
  newlinesBetween: 'ignore',
  partitionByComment: false,
  partitionByNewLine: false,
  useConfigurationIf: {},
  type: 'alphabetical',
  ignoreCase: true,
  locales: 'en-US',
  customGroups: [],
  alphabet: '',
  order: 'asc',
  groups: [],
}
const sortIntersectionTypes = createEslintRule({
  meta: {
    messages: {
      [MISSED_SPACING_ERROR_ID]: MISSED_SPACING_ERROR,
      [EXTRA_SPACING_ERROR_ID]: EXTRA_SPACING_ERROR,
      [GROUP_ORDER_ERROR_ID]: GROUP_ORDER_ERROR,
      [ORDER_ERROR_ID]: ORDER_ERROR,
    },
    docs: {
      url: 'https://perfectionist.dev/rules/sort-intersection-types',
      description: 'Enforce sorted intersection types.',
      recommended: true,
    },
    schema: jsonSchema,
    type: 'suggestion',
    fixable: 'code',
  },
  create: context =>
    buildAstListeners({
      nodeTypes: [AST_NODE_TYPES.TSIntersectionType],
      sorter: sortIntersectionType,
      context,
    }),
  defaultOptions: [defaultOptions],
  name: 'sort-intersection-types',
})
function sortIntersectionType({ matchedAstSelectors, context, node }) {
  sortUnionOrIntersectionTypes({
    availableMessageIds: {
      missedSpacingBetweenMembers: MISSED_SPACING_ERROR_ID,
      extraSpacingBetweenMembers: EXTRA_SPACING_ERROR_ID,
      unexpectedGroupOrder: GROUP_ORDER_ERROR_ID,
      unexpectedOrder: ORDER_ERROR_ID,
    },
    cachedGroupsByModifiersAndSelectors,
    tokenValueToIgnoreBefore: '&',
    matchedAstSelectors,
    defaultOptions,
    context,
    node,
  })
}
export { sortIntersectionTypes as default }
