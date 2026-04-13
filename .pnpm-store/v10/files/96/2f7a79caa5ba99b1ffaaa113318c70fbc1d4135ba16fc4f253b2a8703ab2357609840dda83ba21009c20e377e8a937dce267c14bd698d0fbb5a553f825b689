import { TSESLint } from '@typescript-eslint/utils'
import { Options } from './sort-modules/types.js'
declare const ORDER_ERROR_ID = 'unexpectedModulesOrder'
declare const GROUP_ORDER_ERROR_ID = 'unexpectedModulesGroupOrder'
declare const EXTRA_SPACING_ERROR_ID = 'extraSpacingBetweenModulesMembers'
declare const MISSED_SPACING_ERROR_ID = 'missedSpacingBetweenModulesMembers'
declare const DEPENDENCY_ORDER_ERROR_ID = 'unexpectedModulesDependencyOrder'
type MessageId =
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
