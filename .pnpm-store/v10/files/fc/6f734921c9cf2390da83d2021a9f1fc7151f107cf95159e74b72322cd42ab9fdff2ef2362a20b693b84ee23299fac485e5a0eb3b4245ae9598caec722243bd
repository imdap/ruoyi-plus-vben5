import {
  buildCustomGroupSelectorJsonSchema,
  buildCustomGroupModifiersJsonSchema,
} from '../../utils/json-schemas/common-groups-json-schemas.js'
const ORDER_ERROR_ID = 'unexpectedNamedExportsOrder'
const GROUP_ORDER_ERROR_ID = 'unexpectedNamedExportsGroupOrder'
const EXTRA_SPACING_ERROR_ID = 'extraSpacingBetweenNamedExports'
const MISSED_SPACING_ERROR_ID = 'missedSpacingBetweenNamedExports'
let allSelectors = ['export']
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
