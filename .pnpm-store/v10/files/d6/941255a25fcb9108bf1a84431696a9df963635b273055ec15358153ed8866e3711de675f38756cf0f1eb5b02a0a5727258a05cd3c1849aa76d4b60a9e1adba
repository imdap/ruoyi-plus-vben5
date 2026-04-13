import { JSONSchema4 } from '@typescript-eslint/utils/json-schema'
import { TSESTree } from '@typescript-eslint/types'
import { SortingNodeWithDependencies } from '../../utils/sort-nodes-by-dependencies.js'
import { RegexOption, TypeOption } from '../../types/common-options.js'
import { AllCommonOptions } from '../../types/all-common-options.js'
export type MessageId =
  | typeof DEPENDENCY_ORDER_ERROR_ID
  | typeof MISSED_SPACING_ERROR_ID
  | typeof EXTRA_SPACING_ERROR_ID
  | typeof GROUP_ORDER_ERROR_ID
  | typeof ORDER_ERROR_ID
export declare const ORDER_ERROR_ID = 'unexpectedClassesOrder'
export declare const GROUP_ORDER_ERROR_ID = 'unexpectedClassesGroupOrder'
export declare const EXTRA_SPACING_ERROR_ID = 'extraSpacingBetweenClassMembers'
export declare const MISSED_SPACING_ERROR_ID =
  'missedSpacingBetweenClassMembers'
export declare const DEPENDENCY_ORDER_ERROR_ID =
  'unexpectedClassesDependencyOrder'
/**
 * Configuration options for the sort-classes rule.
 *
 * This rule enforces consistent ordering of class members (properties, methods,
 * constructors, etc.) to improve code readability and maintainability.
 */
export type Options = Partial<
  {
    /**
     * Conditional configuration based on pattern matching.
     */
    useConfigurationIf: {
      /**
       * Regular expression pattern to match against all class element names.
       */
      allNamesMatchPattern?: RegexOption
      /**
       * AST selector to match against ClassBody nodes.
       */
      matchesAstSelector?: string
    }
    /**
     * Regex patterns for function names whose callback argument dependencies
     * are ignored during class-member sorting. Dependencies inside these
     * callbacks won't influence the ordering.
     */
    ignoreCallbackDependenciesPatterns: RegexOption
    /**
     * Enables experimental dependency detection.
     */
    useExperimentalDependencyDetection: boolean
  } & AllCommonOptions<
    TypeOption,
    AdditionalSortOptions,
    CustomGroupMatchOptions
  >
>[]
export interface SortClassesSortingNode extends SortingNodeWithDependencies<TSESTree.ClassElement> {
  overloadSignatureImplementation:
    | TSESTree.TSAbstractMethodDefinition
    | TSESTree.MethodDefinition
    | null
  nameDetails: NodeNameDetails | null
  isStatic: boolean
}
export interface NodeNameDetails {
  nameWithoutStartingHash: string
  hasPrivateHash: boolean
  name: string
}
/**
 * Union type of all available class member selectors. Used to identify and
 * categorize different types of class members.
 */
export type Selector = (typeof allSelectors)[number]
/**
 * Union type of all available class member modifiers. Includes access
 * modifiers, async, static, abstract, and other TypeScript modifiers.
 */
export type Modifier = (typeof allModifiers)[number]
/**
 * Defines a custom group configuration for class members.
 *
 * Allows categorizing class members based on their selector type (method,
 * property, etc.) and various patterns matching their names, values, or
 * decorators.
 */
interface CustomGroupMatchOptions {
  /**
   * Pattern to match decorator names (e.g., '@Component').
   */
  decoratorNamePattern?: RegexOption
  /**
   * Pattern to match the value of the member (for properties with
   * initializers).
   */
  elementValuePattern?: RegexOption
  /**
   * List of modifiers that members must have to be included in this group.
   */
  modifiers?: Modifier[]
  /**
   * The type of class member this group applies to.
   */
  selector?: Selector
}
type AdditionalSortOptions = object
/**
 * Complete list of available class member selectors. Used for validation and
 * JSON schema generation.
 */
export declare let allSelectors: readonly [
  'accessor-property',
  'index-signature',
  'constructor',
  'static-block',
  'get-method',
  'set-method',
  'function-property',
  'property',
  'method',
]
/**
 * Complete list of available class member modifiers. Used for validation and
 * JSON schema generation.
 */
export declare let allModifiers: readonly [
  'async',
  'protected',
  'private',
  'public',
  'static',
  'abstract',
  'override',
  'readonly',
  'decorated',
  'declare',
  'optional',
]
/**
 * Additional custom group match options JSON schema. Used by ESLint to validate
 * rule options at configuration time.
 *
 * Note: Ideally, we should generate as many schemas as there are selectors, and
 * ensure that users do not enter invalid modifiers for a given selector.
 */
export declare let additionalCustomGroupMatchOptionsJsonSchema: Record<
  string,
  JSONSchema4
>
export {}
