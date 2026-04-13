import { JSONSchema4 } from '@typescript-eslint/utils/json-schema'
import { TSESTree } from '@typescript-eslint/types'
import { SortingNodeWithDependencies } from '../../utils/sort-nodes-by-dependencies.js'
import { RegexOption, TypeOption } from '../../types/common-options.js'
import { ScopedRegexOption } from '../../types/scoped-regex-option.js'
import { AllCommonOptions } from '../../types/all-common-options.js'
import { NodeOfType } from '../../types/node-of-type.js'
export type MessageId =
  | typeof DEPENDENCY_ORDER_ERROR_ID
  | typeof MISSED_SPACING_ERROR_ID
  | typeof EXTRA_SPACING_ERROR_ID
  | typeof GROUP_ORDER_ERROR_ID
  | typeof ORDER_ERROR_ID
export declare const ORDER_ERROR_ID = 'unexpectedObjectsOrder'
export declare const GROUP_ORDER_ERROR_ID = 'unexpectedObjectsGroupOrder'
export declare const EXTRA_SPACING_ERROR_ID = 'extraSpacingBetweenObjectMembers'
export declare const MISSED_SPACING_ERROR_ID =
  'missedSpacingBetweenObjectMembers'
export declare const DEPENDENCY_ORDER_ERROR_ID =
  'unexpectedObjectsDependencyOrder'
/**
 * Configuration options for the sort-objects rule.
 *
 * Controls how object properties and methods are sorted within object literals
 * and object patterns in JavaScript/TypeScript.
 */
export type Options = Partial<
  {
    /**
     * Conditional configuration based on pattern matching. Allows applying the
     * rule only when specific conditions are met.
     */
    useConfigurationIf: {
      /**
       * Regular expression pattern to match against the comment associated to
       * the name of the object.
       */
      declarationCommentMatchesPattern?: ScopedRegexOption
      /**
       * Specifies whether to only match destructured objects or regular
       * objects.
       */
      objectType?: 'non-destructured' | 'destructured'
      /**
       * Regular expression pattern to match against the name of the function
       * that contains this object. Useful for applying different sorting
       * rules to objects passed to specific functions.
       */
      callingFunctionNamePattern?: ScopedRegexOption
      /**
       * Regular expression pattern to match against the object's declaration
       * name. The rule is only applied to declarations with matching names.
       */
      declarationMatchesPattern?: ScopedRegexOption
      /**
       * Regular expression pattern to match against all property names. The
       * rule is only applied when all property names match this pattern.
       */
      allNamesMatchPattern?: RegexOption
      /**
       * Specifies whether to only match objects that have exclusively numeric
       * keys.
       */
      hasNumericKeysOnly?: boolean
      /**
       * AST selector to match against ObjectExpression or ObjectPattern
       * nodes.
       */
      matchesAstSelector?: string
    }
    /**
     * Enables experimental dependency detection.
     */
    useExperimentalDependencyDetection: boolean
    /**
     * Whether to partition object members by computed keys.
     */
    partitionByComputedKey: boolean
    /**
     * Whether to sort styled-components CSS properties. When true, sorts CSS
     * properties within styled-components template literals.
     *
     * @default true
     */
    styledComponents: boolean
  } & AllCommonOptions<
    TypeOption,
    AdditionalSortOptions,
    CustomGroupMatchOptions
  >
>[]
export type SortObjectsSortingNode = {
  /**
   * The string representation of the property's value. Used when sorting by
   * value instead of name.
   */
  value: string
} & SortingNodeWithDependencies<SortObjectsNode>
export type SortObjectsNode = TSESTree.Property
interface AdditionalSortOptions {
  sortBy: SortByOption
}
export declare let objectParentTypes: readonly [
  TSESTree.AST_NODE_TYPES.VariableDeclarator,
  TSESTree.AST_NODE_TYPES.CallExpression,
  TSESTree.AST_NODE_TYPES.Property,
]
export type ObjectParentType = (typeof objectParentTypes)[number]
export type ObjectParent = NodeOfType<ObjectParentType>
/**
 * Union type of all available modifiers for object members.
 *
 * Modifiers provide additional context about member characteristics, such as
 * whether they are optional, required, or span multiple lines.
 */
export type Modifier = (typeof allModifiers)[number]
/**
 * Union type of all available selectors for object members.
 *
 * Selectors identify the type of object member for grouping and sorting
 * purposes.
 */
export type Selector = (typeof allSelectors)[number]
/**
 * Match options for a custom group.
 */
interface CustomGroupMatchOptions {
  /**
   * Regular expression pattern to match against the member's value. Only
   * applicable to properties with literal values.
   */
  elementValuePattern?: RegexOption
  /**
   * Array of modifiers that members must have to match this group. Only
   * modifiers allowed for the specified selector type are valid.
   */
  modifiers?: Modifier[]
  /**
   * The selector type this group matches. Determines what kind of object
   * members belong to this group.
   */
  selector?: Selector
}
/**
 * Array of all available selectors for object members.
 *
 * Used for validation and configuration in the ESLint rule.
 */
export declare let allSelectors: readonly ['member', 'method', 'property']
/**
 * Array of all available modifiers for object members.
 *
 * Used for validation and configuration in the ESLint rule.
 */
export declare let allModifiers: readonly ['multiline']
declare const SORT_BY_OPTION: readonly ['name', 'value']
type SortByOption = (typeof SORT_BY_OPTION)[number]
/**
 * Additional sort options JSON schema, Used by ESLint to validate rule options.
 */
export declare let additionalSortOptionsJsonSchema: Record<string, JSONSchema4>
/**
 * Additional custom group match options JSON schema. Used by ESLint to validate
 * rule options at configuration time.
 */
export declare let additionalCustomGroupMatchOptionsJsonSchema: Record<
  string,
  JSONSchema4
>
export {}
