import { CommonOptions, TypeOption } from '../../types/common-options.js'
import { GroupsOptions } from '../../types/common-groups-options.js'
import { SortingNode } from '../../types/sorting-node.js'
export type ComparatorByOptionsComputer<S, T extends SortingNode> = (
  options: S,
) => Comparator<T>
export type Comparator<T extends SortingNode> = (a: T, b: T) => number
type Options = Pick<
  CommonOptions<TypeOption>,
  'specialCharacters' | 'ignoreCase' | 'alphabet' | 'locales' | 'order' | 'type'
> &
  Pick<CommonOptions, 'fallbackSort'> & {
    groups?: GroupsOptions
  }
export declare let defaultComparatorByOptionsComputer: ComparatorByOptionsComputer<
  Options,
  SortingNode
>
export {}
