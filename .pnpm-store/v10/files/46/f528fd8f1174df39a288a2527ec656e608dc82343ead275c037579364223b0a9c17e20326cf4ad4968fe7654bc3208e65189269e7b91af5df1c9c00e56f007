import { JSONSchema4 } from '@typescript-eslint/utils/json-schema'
import { TSESTree } from '@typescript-eslint/types'
import { RegexOption, TypeOption } from '../../types/common-options.js'
import { ScopedRegexOption } from '../../types/scoped-regex-option.js'
import { AllCommonOptions } from '../../types/all-common-options.js'
import { SortingNode } from '../../types/sorting-node.js'
import { NodeOfType } from '../../types/node-of-type.js'
/**
 * Configuration options for the sort-object-types rule.
 *
 * Controls how object type properties, methods, and index signatures are sorted
 * within TypeScript type literals and interfaces.
 */
export type Options = Partial<
  {
    /**
     * Conditional configuration based on pattern matching. Allows applying the
     * rule only when specific conditions are met.
     */
    useConfigurationIf: {
      /**
       * Regular expression pattern to match against the comment declaration.
       * The rule is only applied to declaration comments with matching
       * names.
       */
      declarationCommentMatchesPattern?: ScopedRegexOption
      /**
       * Regular expression pattern to match against the type declaration
       * name. The rule is only applied to declarations with matching names.
       */
      declarationMatchesPattern?: ScopedRegexOption
      /**
       * Regular expression pattern to match against all member names. The
       * rule is only applied when all member names match this pattern.
       */
      allNamesMatchPattern?: RegexOption
      /**
       * Specifies whether to only match types that have exclusively numeric
       * keys.
       */
      hasNumericKeysOnly?: boolean
      /**
       * An ESLint AST selector to match against the node being sorted. The
       * rule is only applied when the node matches this selector.
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
 * Extended sorting node for object type members.
 *
 * Represents an object type member with additional metadata needed for sorting,
 * including whether the member is optional/required and its type annotation
 * value.
 */
export interface SortObjectTypesSortingNode extends SortingNode<TSESTree.TypeElement> {
  /**
   * The string representation of the member's type annotation. Used when
   * sorting by value instead of name.
   */
  value: string
}
interface AdditionalSortOptions {
  sortBy: SortByOption
}
export declare let objectTypeParentTypes: readonly [
  TSESTree.AST_NODE_TYPES.TSTypeAliasDeclaration,
  TSESTree.AST_NODE_TYPES.TSInterfaceDeclaration,
  TSESTree.AST_NODE_TYPES.TSPropertySignature,
  TSESTree.AST_NODE_TYPES.VariableDeclarator,
  TSESTree.AST_NODE_TYPES.PropertyDefinition,
]
export type ObjectTypeParentType = (typeof objectTypeParentTypes)[number]
export type ObjectTypeParent = NodeOfType<ObjectTypeParentType>
/**
 * Union type of all available selectors for object type members.
 *
 * Selectors identify the type of object member for grouping and sorting
 * purposes.
 */
export type Selector = (typeof allSelectors)[number]
/**
 * Union type of all available modifiers for object type members.
 *
 * Modifiers provide additional context about member characteristics, such as
 * whether they are optional, required, or span multiple lines.
 */
export type Modifier = (typeof allModifiers)[number]
/**
 * Match options for a custom group.
 */
interface CustomGroupMatchOptions {
  /**
   * Regular expression pattern to match against the member's type annotation
   * value. Only applicable to properties.
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
 * Array of all available selectors for object type members.
 *
 * Used for validation and configuration in the ESLint rule.
 */
export declare let allSelectors: readonly [
  'index-signature',
  'member',
  'method',
  'property',
]
/**
 * Array of all available modifiers for object type members.
 *
 * Used for validation and configuration in the ESLint rule.
 */
export declare let allModifiers: readonly ['optional', 'required', 'multiline']
declare const SORT_BY_OPTION: readonly ['name', 'value']
type SortByOption = (typeof SORT_BY_OPTION)[number]
/**
 * Additional sort options JSON schema, used by ESLint to validate rule options.
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
