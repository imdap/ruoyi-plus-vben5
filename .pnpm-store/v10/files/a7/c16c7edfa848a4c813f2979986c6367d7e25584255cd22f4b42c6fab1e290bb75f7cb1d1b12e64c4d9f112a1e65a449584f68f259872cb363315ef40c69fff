import {
  buildCustomGroupSelectorJsonSchema,
  buildCustomGroupModifiersJsonSchema,
} from '../../utils/json-schemas/common-groups-json-schemas.js'
import { buildRegexJsonSchema } from '../../utils/json-schemas/common-json-schemas.js'
const ORDER_ERROR_ID = 'unexpectedJSXPropsOrder'
const GROUP_ORDER_ERROR_ID = 'unexpectedJSXPropsGroupOrder'
const EXTRA_SPACING_ERROR_ID = 'extraSpacingBetweenJSXPropsMembers'
const MISSED_SPACING_ERROR_ID = 'missedSpacingBetweenJSXPropsMembers'
let allSelectors = ['prop']
let allModifiers = ['shorthand', 'multiline']
let additionalCustomGroupMatchOptionsJsonSchema = {
  modifiers: buildCustomGroupModifiersJsonSchema(allModifiers),
  selector: buildCustomGroupSelectorJsonSchema(allSelectors),
  elementValuePattern: buildRegexJsonSchema(),
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
