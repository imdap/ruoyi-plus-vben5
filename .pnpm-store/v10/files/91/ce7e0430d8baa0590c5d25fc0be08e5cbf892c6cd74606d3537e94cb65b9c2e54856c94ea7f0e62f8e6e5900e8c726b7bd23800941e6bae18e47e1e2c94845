import { JSONSchema4 } from '@typescript-eslint/utils/json-schema'
import { TSESTree } from '@typescript-eslint/types'
import { RegexOption, TypeOption } from '../../types/common-options.js'
import { AllCommonOptions } from '../../types/all-common-options.js'
import { SortingNode } from '../../types/sorting-node.js'
export type MessageId =
  | typeof MISSED_SPACING_ERROR_ID
  | typeof EXTRA_SPACING_ERROR_ID
  | typeof GROUP_ORDER_ERROR_ID
  | typeof ORDER_ERROR_ID
export declare const ORDER_ERROR_ID = 'unexpectedNamedImportsOrder'
export declare const GROUP_ORDER_ERROR_ID = 'unexpectedNamedImportsGroupOrder'
export declare const EXTRA_SPACING_ERROR_ID = 'extraSpacingBetweenNamedImports'
export declare const MISSED_SPACING_ERROR_ID =
  'missedSpacingBetweenNamedImports'
/**
 * Configuration options for the sort-named-imports rule.
 *
 * Controls how named imports are sorted within import statements.
 */
export type Options = Partial<
  {
    /**
     * Conditional configuration based on pattern matching.
     */
    useConfigurationIf: {
      /**
       * Regular expression pattern to match against all named import element
       * names. The rule is only applied when all names match this pattern.
       */
      allNamesMatchPattern?: RegexOption
      /**
       * AST selector to match against ImportDeclaration nodes.
       */
      matchesAstSelector?: string
    }
    /**
     * Whether to ignore import aliases when sorting. When true, sorts by the
     * original name rather than the alias.
     *
     * @default false
     */
    ignoreAlias: boolean
  } & AllCommonOptions<
    TypeOption,
    AdditionalSortOptions,
    CustomGroupMatchOptions
  >
>[]
/**
 * Extended sorting node for named import specifiers.
 */
export type SortNamedImportsSortingNode = SortingNode<TSESTree.ImportClause>
/**
 * Union type of all available modifiers for named imports.
 *
 * Modifiers distinguish between type imports and value imports.
 */
export type Modifier = (typeof allModifiers)[number]
/**
 * Union type of all available selectors for named imports.
 *
 * Currently only includes the 'import' selector.
 */
export type Selector = (typeof allSelectors)[number]
/**
 * Match options for a custom group.
 */
interface CustomGroupMatchOptions {
  /**
   * Array of modifiers that imports must have to match this group. Can
   * include 'type' for type imports or 'value' for value imports.
   */
  modifiers?: Modifier[]
  /**
   * The selector type this group matches. Currently only 'import' is
   * available for named imports.
   */
  selector?: Selector
}
type AdditionalSortOptions = object
/**
 * Array of all available selectors for named imports.
 *
 * Used for validation and configuration in the ESLint rule.
 */
export declare let allSelectors: readonly ['import']
/**
 * Array of all available modifiers for named imports.
 *
 * Used for validation and configuration in the ESLint rule.
 */
export declare let allModifiers: readonly ['value', 'type']
/**
 * Additional custom group match options JSON schema. Used by ESLint to validate
 * rule options at configuration time.
 */
export declare let additionalCustomGroupMatchOptionsJsonSchema: Record<
  string,
  JSONSchema4
>
export {}
