import {
  buildCustomGroupSelectorJsonSchema,
  buildCustomGroupModifiersJsonSchema,
} from '../../utils/json-schemas/common-groups-json-schemas.js'
let allSelectors = [
  'side-effect-style',
  'tsconfig-path',
  'side-effect',
  'external',
  'internal',
  'builtin',
  'sibling',
  'subpath',
  'import',
  'parent',
  'index',
  'style',
  'type',
]
let allModifiers = [
  'default',
  'multiline',
  'named',
  'require',
  'side-effect',
  'singleline',
  'ts-equals',
  'type',
  'value',
  'wildcard',
]
let additionalCustomGroupMatchOptionsJsonSchema = {
  modifiers: buildCustomGroupModifiersJsonSchema(allModifiers),
  selector: buildCustomGroupSelectorJsonSchema(allSelectors),
}
const SORT_BY_OPTION = ['specifier', 'path']
let additionalSortOptionsJsonSchema = {
  sortBy: {
    enum: [...SORT_BY_OPTION],
    type: 'string',
  },
}
const TYPE_IMPORT_FIRST_TYPE_OPTION = 'type-import-first'
export {
  TYPE_IMPORT_FIRST_TYPE_OPTION,
  additionalCustomGroupMatchOptionsJsonSchema,
  additionalSortOptionsJsonSchema,
  allModifiers,
  allSelectors,
}
