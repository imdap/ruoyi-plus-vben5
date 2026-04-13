import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import {
  buildCustomGroupSelectorJsonSchema,
  buildCustomGroupModifiersJsonSchema,
} from '../../utils/json-schemas/common-groups-json-schemas.js'
import { buildRegexJsonSchema } from '../../utils/json-schemas/common-json-schemas.js'
let objectTypeParentTypes = [
  AST_NODE_TYPES.TSTypeAliasDeclaration,
  AST_NODE_TYPES.TSInterfaceDeclaration,
  AST_NODE_TYPES.TSPropertySignature,
  AST_NODE_TYPES.VariableDeclarator,
  AST_NODE_TYPES.PropertyDefinition,
]
let allSelectors = ['index-signature', 'member', 'method', 'property']
let allModifiers = ['optional', 'required', 'multiline']
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
  additionalCustomGroupMatchOptionsJsonSchema,
  additionalSortOptionsJsonSchema,
  allModifiers,
  allSelectors,
  objectTypeParentTypes,
}
