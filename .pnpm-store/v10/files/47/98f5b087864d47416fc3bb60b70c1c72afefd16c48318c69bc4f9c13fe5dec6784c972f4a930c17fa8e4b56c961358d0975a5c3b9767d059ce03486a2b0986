import { TSESLint } from '@typescript-eslint/utils'
import { Options } from './sort-exports/types.js'
declare const ORDER_ERROR_ID = 'unexpectedExportsOrder'
declare const GROUP_ORDER_ERROR_ID = 'unexpectedExportsGroupOrder'
declare const EXTRA_SPACING_ERROR_ID = 'extraSpacingBetweenExports'
declare const MISSED_SPACING_ERROR_ID = 'missedSpacingBetweenExports'
declare const MISSED_COMMENT_ABOVE_ERROR_ID = 'missedCommentAboveExport'
type MessageId =
  | typeof MISSED_COMMENT_ABOVE_ERROR_ID
  | typeof MISSED_SPACING_ERROR_ID
  | typeof EXTRA_SPACING_ERROR_ID
  | typeof GROUP_ORDER_ERROR_ID
  | typeof ORDER_ERROR_ID
declare const _default: TSESLint.RuleModule<
  MessageId,
  Options,
  {
    recommended?: boolean
  },
  TSESLint.RuleListener
> & {
  name: string
}
export default _default
