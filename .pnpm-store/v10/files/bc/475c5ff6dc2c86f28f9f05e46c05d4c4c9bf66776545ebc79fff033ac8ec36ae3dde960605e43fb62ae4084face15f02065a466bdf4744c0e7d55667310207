import { JSONSchema4 } from '@typescript-eslint/utils/json-schema'
import { Options } from './sort-arrays/types.js'
declare const ORDER_ERROR_ID = 'unexpectedArrayIncludesOrder'
declare const GROUP_ORDER_ERROR_ID = 'unexpectedArrayIncludesGroupOrder'
declare const EXTRA_SPACING_ERROR_ID = 'extraSpacingBetweenArrayIncludesMembers'
declare const MISSED_SPACING_ERROR_ID =
  'missedSpacingBetweenArrayIncludesMembers'
type MessageId =
  | typeof MISSED_SPACING_ERROR_ID
  | typeof EXTRA_SPACING_ERROR_ID
  | typeof GROUP_ORDER_ERROR_ID
  | typeof ORDER_ERROR_ID
export declare let defaultOptions: Required<Options[number]>
export declare let jsonSchema: JSONSchema4
declare const _default: import('@typescript-eslint/utils/ts-eslint').RuleModule<
  MessageId,
  Options,
  {
    recommended?: boolean
  },
  import('@typescript-eslint/utils/ts-eslint').RuleListener
> & {
  name: string
}
export default _default
