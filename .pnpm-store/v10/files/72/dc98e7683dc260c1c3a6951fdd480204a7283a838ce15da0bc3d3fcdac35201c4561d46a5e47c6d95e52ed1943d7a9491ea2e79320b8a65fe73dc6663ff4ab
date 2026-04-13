import { JSONSchema4 } from '@typescript-eslint/utils/json-schema'
import { TSESTree } from '@typescript-eslint/types'
import { SortingNodeWithDependencies } from '../../utils/sort-nodes-by-dependencies.js'
import { RegexOption, TypeOption } from '../../types/common-options.js'
import { AllCommonOptions } from '../../types/all-common-options.js'
export type SortModulesNode =
  | TSESTree.ExportDefaultDeclaration
  | TSESTree.ExportNamedDeclaration
  | TSESTree.TSInterfaceDeclaration
  | TSESTree.TSTypeAliasDeclaration
  | TSESTree.FunctionDeclaration
  | TSESTree.TSModuleDeclaration
  | TSESTree.TSDeclareFunction
  | TSESTree.TSEnumDeclaration
  | TSESTree.ClassDeclaration
/**
 * Configuration options for the sort-modules rule.
 *
 * This rule enforces consistent ordering of module-level declarations (classes,
 * interfaces, functions, types, enums) to improve code organization.
 */
export type Options = [
  Partial<
    {
      /**
       * Enables experimental dependency detection.
       */
      useExperimentalDependencyDetection: boolean
    } & AllCommonOptions<
      CustomTypeOption,
      AdditionalSortOptions,
      CustomGroupMatchOptions
    >
  >,
]
/**
 * Represents a sorting node for a module statement.
 */
export type SortModulesSortingNode = {
  overloadSignatureImplementation: SortModulesNode | null
  dependencyDetection: DependencyDetection
} & SortingNodeWithDependencies<SortModulesNode>
/**
 * Union type of all available module member selectors. Used to categorize
 * different types of module-level declarations.
 */
export type Selector = (typeof allSelectors)[number]
/**
 * Union type of all available module member modifiers. Used to identify
 * specific characteristics of module declarations.
 */
export type Modifier = (typeof allModifiers)[number]
export type DependencyDetection = 'soft' | 'hard'
/**
 * Additional configuration for a single custom group.
 *
 * Custom groups allow fine-grained control over how module members are grouped
 * and sorted based on their types, modifiers, and patterns.
 */
interface CustomGroupMatchOptions {
  /**
   * Regular expression pattern to match decorator names. Members with
   * decorators matching this pattern will be included in this custom group.
   */
  decoratorNamePattern?: RegexOption
  /**
   * List of modifiers that members must have to be included in this group.
   */
  modifiers?: Modifier[]
  /**
   * The type of module member this group applies to.
   */
  selector?: Selector
}
type CustomTypeOption = typeof USAGE_TYPE_OPTION | TypeOption
type AdditionalSortOptions = object
/**
 * Complete list of available module member selectors. Used for validation and
 * JSON schema generation.
 */
export declare let allSelectors: readonly [
  'enum',
  'function',
  'interface',
  'type',
  'class',
]
/**
 * Complete list of available module member modifiers. Used for validation and
 * JSON schema generation.
 */
export declare let allModifiers: readonly [
  'async',
  'declare',
  'decorated',
  'default',
  'export',
]
/**
 * Ideally, we should generate as many schemas as there are selectors, and
 * ensure that users do not enter invalid modifiers for a given selector.
 */
export declare let additionalCustomGroupMatchOptionsJsonSchema: Record<
  string,
  JSONSchema4
>
export declare const USAGE_TYPE_OPTION = 'usage'
export {}
