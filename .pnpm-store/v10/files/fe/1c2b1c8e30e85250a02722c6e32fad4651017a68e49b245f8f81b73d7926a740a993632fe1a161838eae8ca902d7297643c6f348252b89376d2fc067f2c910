import { JSONSchema4 } from '@typescript-eslint/utils/json-schema'
import { RegexOption, TypeOption } from '../../types/common-options.js'
import { AllCommonOptions } from '../../types/all-common-options.js'
export type MessageId =
  | typeof MISSED_SPACING_ERROR_ID
  | typeof EXTRA_SPACING_ERROR_ID
  | typeof GROUP_ORDER_ERROR_ID
  | typeof ORDER_ERROR_ID
export declare const ORDER_ERROR_ID = 'unexpectedJSXPropsOrder'
export declare const GROUP_ORDER_ERROR_ID = 'unexpectedJSXPropsGroupOrder'
export declare const EXTRA_SPACING_ERROR_ID =
  'extraSpacingBetweenJSXPropsMembers'
export declare const MISSED_SPACING_ERROR_ID =
  'missedSpacingBetweenJSXPropsMembers'
/**
 * Configuration options for the sort-jsx-props rule.
 *
 * This rule enforces consistent ordering of JSX element props/attributes to
 * improve code readability and maintainability.
 */
export type Options = Partial<
  {
    /**
     * Conditional configuration based on pattern matching. Allows applying the
     * rule only to specific JSX elements.
     */
    useConfigurationIf: {
      /**
       * Regular expression pattern to match against all prop names. The rule
       * is only applied when all prop names match this pattern.
       */
      allNamesMatchPattern?: RegexOption
      /**
       * Regular expression pattern to match against JSX element tag names.
       * The rule is only applied to elements with matching tag names.
       */
      tagMatchesPattern?: RegexOption
      /**
       * AST selector to match against JSXElement nodes.
       */
      matchesAstSelector?: string
    }
  } & Omit<
    AllCommonOptions<
      TypeOption,
      AdditionalSortOptions,
      CustomGroupMatchOptions
    >,
    'partitionByComment'
  >
>[]
/**
 * Union type of all available JSX prop modifiers. Used to identify specific
 * characteristics of JSX props.
 */
export type Modifier = (typeof allModifiers)[number]
/**
 * Union type of all available JSX prop selectors. Used to categorize different
 * types of JSX props.
 */
export type Selector = (typeof allSelectors)[number]
/**
 * Additional configuration for a single custom group.
 *
 * @example
 *
 * ```ts
 * {
 *   "selector": "prop",
 *   "modifiers": ["shorthand"]
 * }
 * ```
 */
interface CustomGroupMatchOptions {
  /**
   * Regular expression pattern to match prop values. Props with values
   * matching this pattern will be included in this custom group.
   */
  elementValuePattern?: RegexOption
  /**
   * List of modifiers that props must have to be included in this group. Can
   * include 'shorthand' for props without values or 'multiline' for
   * multi-line props.
   */
  modifiers?: Modifier[]
  /**
   * The selector type for this group. Can be 'prop' for regular props,
   * 'multiline' for multi-line props, or 'shorthand' for shorthand props.
   */
  selector?: Selector
}
type AdditionalSortOptions = object
/**
 * Complete list of available JSX prop selectors. Used for validation and JSON
 * schema generation.
 */
export declare let allSelectors: readonly ['prop']
/**
 * Complete list of available JSX prop modifiers. Used for validation and JSON
 * schema generation.
 */
export declare let allModifiers: readonly ['shorthand', 'multiline']
/**
 * Additional custom group match options JSON schema. Used by ESLint to validate
 * rule options at configuration time.
 */
export declare let additionalCustomGroupMatchOptionsJsonSchema: Record<
  string,
  JSONSchema4
>
export {}
