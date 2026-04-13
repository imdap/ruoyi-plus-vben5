import { TSESLint } from '@typescript-eslint/utils'
import { Options } from './sort-imports/types.js'
declare const ORDER_ERROR_ID = 'unexpectedImportsOrder'
declare const GROUP_ORDER_ERROR_ID = 'unexpectedImportsGroupOrder'
declare const EXTRA_SPACING_ERROR_ID = 'extraSpacingBetweenImports'
declare const MISSED_SPACING_ERROR_ID = 'missedSpacingBetweenImports'
declare const MISSED_COMMENT_ABOVE_ERROR_ID = 'missedCommentAboveImport'
declare const DEPENDENCY_ORDER_ERROR_ID = 'unexpectedImportsDependencyOrder'
export type MessageId =
  | typeof MISSED_COMMENT_ABOVE_ERROR_ID
  | typeof DEPENDENCY_ORDER_ERROR_ID
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
