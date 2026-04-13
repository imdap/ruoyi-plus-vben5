import {
  buildCustomGroupSelectorJsonSchema,
  buildCustomGroupModifiersJsonSchema,
} from '../../utils/json-schemas/common-groups-json-schemas.js'
import { buildRegexJsonSchema } from '../../utils/json-schemas/common-json-schemas.js'
let allSelectors = [
  'enum',
  'function',
  'interface',
  // 'module',
  // 'namespace',
  'type',
  'class',
]
let allModifiers = ['async', 'declare', 'decorated', 'default', 'export']
let additionalCustomGroupMatchOptionsJsonSchema = {
  modifiers: buildCustomGroupModifiersJsonSchema(allModifiers),
  selector: buildCustomGroupSelectorJsonSchema(allSelectors),
  decoratorNamePattern: buildRegexJsonSchema(),
}
const USAGE_TYPE_OPTION = 'usage'
export {
  USAGE_TYPE_OPTION,
  additionalCustomGroupMatchOptionsJsonSchema,
  allModifiers,
  allSelectors,
}
