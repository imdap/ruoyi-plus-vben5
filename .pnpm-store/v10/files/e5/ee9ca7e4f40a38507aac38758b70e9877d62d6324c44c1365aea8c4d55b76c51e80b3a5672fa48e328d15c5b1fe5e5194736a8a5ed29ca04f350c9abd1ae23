import { TSESTree } from '@typescript-eslint/types'
import { RegexOption, TypeOption } from '../../types/common-options.js'
import { AllCommonOptions } from '../../types/all-common-options.js'
import { SortingNode } from '../../types/sorting-node.js'
export type Options = Partial<
  {
    /**
     * Conditional configuration based on pattern matching.
     */
    useConfigurationIf: {
      /**
       * Regular expression pattern to match against all attribute key names.
       * The rule is only applied when all names match this pattern.
       */
      allNamesMatchPattern?: RegexOption
      /**
       * AST selector to match against ImportDeclaration or
       * ExportNamedDeclaration nodes.
       */
      matchesAstSelector?: string
    }
  } & AllCommonOptions<
    TypeOption,
    AdditionalSortOptions,
    CustomGroupMatchOptions
  >
>[]
export type SortImportAttributesSortingNode =
  SortingNode<TSESTree.ImportAttribute>
/**
 * Match options for a custom group.
 */
type CustomGroupMatchOptions = object
type AdditionalSortOptions = object
export {}
