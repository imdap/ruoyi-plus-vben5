import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import {
  buildCustomGroupSelectorJsonSchema,
  buildCustomGroupModifiersJsonSchema,
} from '../../utils/json-schemas/common-groups-json-schemas.js'
import { buildRegexJsonSchema } from '../../utils/json-schemas/common-json-schemas.js'
const ORDER_ERROR_ID = 'unexpectedObjectsOrder'
const GROUP_ORDER_ERROR_ID = 'unexpectedObjectsGroupOrder'
const EXTRA_SPACING_ERROR_ID = 'extraSpacingBetweenObjectMembers'
const MISSED_SPACING_ERROR_ID = 'missedSpacingBetweenObjectMembers'
const DEPENDENCY_ORDER_ERROR_ID = 'unexpectedObjectsDependencyOrder'
let objectParentTypes = [
  AST_NODE_TYPES.VariableDeclarator,
  AST_NODE_TYPES.CallExpression,
  AST_NODE_TYPES.Property,
]
let allSelectors = ['member', 'method', 'property']
let allModifiers = ['multiline']
const SORT_BY_OPTION = ['name', 'value']
let additionalSortOptionsJsonSchema = {
  sortBy: {
    enum: [...SORT_BY_OPTION],
    type: 'string',
  },
}
let additionalCustomGroupMatchOptionsJsonSchema = {
  modifiers: buildCustomGroupModifiersJsonSchema(allModifiers),
  selector: buildCustomGroupSelectorJsonSchema(allSelectors),
  elementValuePattern: buildRegexJsonSchema(),
}
export {
  DEPENDENCY_ORDER_ERROR_ID,
  EXTRA_SPACING_ERROR_ID,
  GROUP_ORDER_ERROR_ID,
  MISSED_SPACING_ERROR_ID,
  ORDER_ERROR_ID,
  additionalCustomGroupMatchOptionsJsonSchema,
  additionalSortOptionsJsonSchema,
  allModifiers,
  allSelectors,
  objectParentTypes,
}
