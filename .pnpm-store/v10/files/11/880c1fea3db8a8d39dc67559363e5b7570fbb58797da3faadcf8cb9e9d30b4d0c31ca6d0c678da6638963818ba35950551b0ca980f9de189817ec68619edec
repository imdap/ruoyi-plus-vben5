import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import {
  ORDER_ERROR,
  GROUP_ORDER_ERROR,
  EXTRA_SPACING_ERROR,
  MISSED_SPACING_ERROR,
} from '../utils/report-errors.js'
import { sortObjectTypeElements } from './sort-object-types/sort-object-type-elements.js'
import { defaultOptions, jsonSchema } from './sort-object-types.js'
import { buildAstListeners } from '../utils/build-ast-listeners.js'
import { createEslintRule } from '../utils/create-eslint-rule.js'
const ORDER_ERROR_ID = 'unexpectedInterfacePropertiesOrder'
const GROUP_ORDER_ERROR_ID = 'unexpectedInterfacePropertiesGroupOrder'
const EXTRA_SPACING_ERROR_ID = 'extraSpacingBetweenInterfaceMembers'
const MISSED_SPACING_ERROR_ID = 'missedSpacingBetweenInterfaceMembers'
const sortInterfaces = createEslintRule({
  meta: {
    messages: {
      [MISSED_SPACING_ERROR_ID]: MISSED_SPACING_ERROR,
      [EXTRA_SPACING_ERROR_ID]: EXTRA_SPACING_ERROR,
      [GROUP_ORDER_ERROR_ID]: GROUP_ORDER_ERROR,
      [ORDER_ERROR_ID]: ORDER_ERROR,
    },
    docs: {
      url: 'https://perfectionist.dev/rules/sort-interfaces',
      description: 'Enforce sorted interface properties.',
      recommended: true,
    },
    schema: jsonSchema,
    type: 'suggestion',
    fixable: 'code',
  },
  create: context =>
    buildAstListeners({
      nodeTypes: [AST_NODE_TYPES.TSInterfaceDeclaration],
      sorter: sortInterface,
      context,
    }),
  defaultOptions: [defaultOptions],
  name: 'sort-interfaces',
})
function sortInterface({ matchedAstSelectors, context, node }) {
  sortObjectTypeElements({
    availableMessageIds: {
      missedSpacingBetweenMembers: MISSED_SPACING_ERROR_ID,
      extraSpacingBetweenMembers: EXTRA_SPACING_ERROR_ID,
      unexpectedGroupOrder: GROUP_ORDER_ERROR_ID,
      unexpectedOrder: ORDER_ERROR_ID,
    },
    elements: node.body.body,
    matchedAstSelectors,
    parentNodes: [node],
    context,
  })
}
export { sortInterfaces as default }
