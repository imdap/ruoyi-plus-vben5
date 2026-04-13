import { buildSubgroupOrderComparator } from './build-subgroup-order-comparator.js'
import { buildLineLengthComparator } from './build-line-length-comparator.js'
import { compareAlphabetically } from './compare-alphabetically.js'
import { UnreachableCaseError } from '../unreachable-case-error.js'
import { compareByCustomSort } from './compare-by-custom-sort.js'
import { unsortedComparator } from './unsorted-comparator.js'
import { compareNaturally } from './compare-naturally.js'
let defaultComparatorByOptionsComputer = options => {
  switch (options.type) {
    case 'subgroup-order':
      if (!options.groups) {
        return unsortedComparator
      }
      return buildSubgroupOrderComparator({
        ...options,
        groups: options.groups,
      })
    case 'alphabetical':
      return (a, b) => compareAlphabetically(a.name, b.name, options)
    case 'line-length':
      return buildLineLengthComparator(options)
    case 'unsorted':
      return unsortedComparator
    case 'natural':
      return (a, b) => compareNaturally(a.name, b.name, options)
    case 'custom':
      return (a, b) => compareByCustomSort(a.name, b.name, options)
    /* v8 ignore next 2 -- @preserve Exhaustive guard. */
    default:
      throw new UnreachableCaseError(options.type)
  }
}
export { defaultComparatorByOptionsComputer }
