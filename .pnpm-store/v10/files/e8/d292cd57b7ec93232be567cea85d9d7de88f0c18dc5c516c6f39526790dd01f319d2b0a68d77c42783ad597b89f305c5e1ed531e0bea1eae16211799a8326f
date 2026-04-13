import { RegexOption, TypeOption } from '../../types/common-options.js'
import { AllCommonOptions } from '../../types/all-common-options.js'
export type MessageId =
  | typeof MISSED_SPACING_ERROR_ID
  | typeof EXTRA_SPACING_ERROR_ID
  | typeof GROUP_ORDER_ERROR_ID
  | typeof ORDER_ERROR_ID
export declare const ORDER_ERROR_ID = 'unexpectedMapElementsOrder'
export declare const GROUP_ORDER_ERROR_ID = 'unexpectedMapElementsGroupOrder'
export declare const EXTRA_SPACING_ERROR_ID =
  'extraSpacingBetweenMapElementsMembers'
export declare const MISSED_SPACING_ERROR_ID =
  'missedSpacingBetweenMapElementsMembers'
/**
 * Configuration options for the sort-maps rule.
 *
 * This rule enforces consistent ordering of Map elements to improve code
 * readability and maintainability.
 */
export type Options = Partial<
  {
    /**
     * Conditional configuration based on pattern matching. Allows applying the
     * rule only when specific conditions are met.
     */
    useConfigurationIf: {
      /**
       * Regular expression pattern to match against all Map element keys. The
       * rule is only applied when all keys match this pattern.
       */
      allNamesMatchPattern?: RegexOption
      /**
       * AST selector to match against NewExpression nodes targeting Map
       * constructions.
       */
      matchesAstSelector?: string
    }
  } & AllCommonOptions<
    TypeOption,
    AdditionalSortOptions,
    CustomGroupMatchOptions
  >
>[]
/**
 * Match options for a custom group.
 */
type CustomGroupMatchOptions = object
type AdditionalSortOptions = object
export {}
