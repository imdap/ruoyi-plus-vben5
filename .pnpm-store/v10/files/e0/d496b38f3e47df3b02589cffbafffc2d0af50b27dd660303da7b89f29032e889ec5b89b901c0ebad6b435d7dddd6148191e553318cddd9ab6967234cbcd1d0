import {
  buildCustomGroupSelectorJsonSchema,
  buildCustomGroupModifiersJsonSchema,
} from '../../utils/json-schemas/common-groups-json-schemas.js'
let allSelectors = ['export']
let allModifiers = [
  'value',
  'type',
  'named',
  'wildcard',
  'multiline',
  'singleline',
]
let additionalCustomGroupMatchOptionsJsonSchema = {
  modifiers: buildCustomGroupModifiersJsonSchema(allModifiers),
  selector: buildCustomGroupSelectorJsonSchema(allSelectors),
}
export {
  additionalCustomGroupMatchOptionsJsonSchema,
  allModifiers,
  allSelectors,
}
