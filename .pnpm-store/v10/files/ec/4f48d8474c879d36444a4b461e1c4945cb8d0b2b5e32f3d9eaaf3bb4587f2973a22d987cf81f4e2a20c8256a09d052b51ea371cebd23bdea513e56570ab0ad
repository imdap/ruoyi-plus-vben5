import {
  buildCustomGroupSelectorJsonSchema,
  buildCustomGroupModifiersJsonSchema,
} from '../../utils/json-schemas/common-groups-json-schemas.js'
const ORDER_ERROR_ID = 'unexpectedNamedImportsOrder'
const GROUP_ORDER_ERROR_ID = 'unexpectedNamedImportsGroupOrder'
const EXTRA_SPACING_ERROR_ID = 'extraSpacingBetweenNamedImports'
const MISSED_SPACING_ERROR_ID = 'missedSpacingBetweenNamedImports'
let allSelectors = ['import']
let allModifiers = ['value', 'type']
let additionalCustomGroupMatchOptionsJsonSchema = {
  modifiers: buildCustomGroupModifiersJsonSchema(allModifiers),
  selector: buildCustomGroupSelectorJsonSchema(allSelectors),
}
export {
  EXTRA_SPACING_ERROR_ID,
  GROUP_ORDER_ERROR_ID,
  MISSED_SPACING_ERROR_ID,
  ORDER_ERROR_ID,
  additionalCustomGroupMatchOptionsJsonSchema,
  allModifiers,
  allSelectors,
}
