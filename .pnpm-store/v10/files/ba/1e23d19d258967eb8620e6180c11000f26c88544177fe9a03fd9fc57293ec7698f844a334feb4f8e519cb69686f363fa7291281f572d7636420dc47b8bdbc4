import { TSESTree } from '@typescript-eslint/types'
import { AllCommonOptions } from '../../types/all-common-options.js'
import { TypeOption } from '../../types/common-options.js'
import { SortingNode } from '../../types/sorting-node.js'
export type Options = Partial<
  {
    sortOnParameters: boolean
    sortOnProperties: boolean
    sortOnAccessors: boolean
    sortOnMethods: boolean
    sortOnClasses: boolean
  } & AllCommonOptions<
    TypeOption,
    AdditionalSortOptions,
    CustomGroupMatchOptions
  >
>[]
export type SortDecoratorsSortingNode = SortingNode<TSESTree.Decorator>
/**
 * Match options for a custom group.
 */
type CustomGroupMatchOptions = object
type AdditionalSortOptions = object
export {}
