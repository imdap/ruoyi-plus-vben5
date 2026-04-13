import { RegexOption, TypeOption } from '../../types/common-options.js'
import { AllCommonOptions } from '../../types/all-common-options.js'
export type MessageId =
  | typeof MISSED_SPACING_ERROR_ID
  | typeof EXTRA_SPACING_ERROR_ID
  | typeof GROUP_ORDER_ERROR_ID
  | typeof ORDER_ERROR_ID
export declare const ORDER_ERROR_ID = 'unexpectedHeritageClausesOrder'
export declare const GROUP_ORDER_ERROR_ID =
  'unexpectedHeritageClausesGroupOrder'
export declare const EXTRA_SPACING_ERROR_ID =
  'extraSpacingBetweenHeritageClauses'
export declare const MISSED_SPACING_ERROR_ID =
  'missedSpacingBetweenHeritageClauses'
export type Options = Partial<
  {
    /**
     * Conditional configuration based on pattern matching.
     */
    useConfigurationIf: {
      /**
       * Regular expression pattern to match against all heritage clause
       * names. The rule is only applied when all names match this pattern.
       */
      allNamesMatchPattern?: RegexOption
      /**
       * AST selector to match against ClassDeclaration or
       * TSInterfaceDeclaration nodes.
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
