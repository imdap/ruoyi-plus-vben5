import { defaultComparatorByOptionsComputer } from '../../utils/compare/default-comparator-by-options-computer.js'
import { buildLineLengthComparator } from '../../utils/compare/build-line-length-comparator.js'
import { compareAlphabetically } from '../../utils/compare/compare-alphabetically.js'
import { compareByCustomSort } from '../../utils/compare/compare-by-custom-sort.js'
import { unsortedComparator } from '../../utils/compare/unsorted-comparator.js'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
import { compareNaturally } from '../../utils/compare/compare-naturally.js'
let comparatorByOptionsComputer = options => {
  switch (options.sortBy) {
    case 'value':
      return byValueComparatorComputer(options)
    case 'name':
      return defaultComparatorByOptionsComputer(options)
    /* v8 ignore next 2 -- @preserve Exhaustive guard. */
    default:
      throw new UnreachableCaseError(options.sortBy)
  }
}
let byValueComparatorComputer = options => {
  switch (options.type) {
    /* v8 ignore next 2 -- @preserve Untested for now as not a relevant sort for this rule. */
    case 'subgroup-order':
      return defaultComparatorByOptionsComputer(options)
    case 'alphabetical':
      return (a, b) => compareAlphabetically(a.value, b.value, options)
    case 'line-length':
      return buildLineLengthComparator(options)
    case 'unsorted':
      return unsortedComparator
    case 'natural':
      return (a, b) => compareNaturally(a.value, b.value, options)
    case 'custom':
      return (a, b) => compareByCustomSort(a.value, b.value, options)
    /* v8 ignore next 2 -- @preserve Exhaustive guard. */
    default:
      throw new UnreachableCaseError(options.type)
  }
}
export { comparatorByOptionsComputer }
