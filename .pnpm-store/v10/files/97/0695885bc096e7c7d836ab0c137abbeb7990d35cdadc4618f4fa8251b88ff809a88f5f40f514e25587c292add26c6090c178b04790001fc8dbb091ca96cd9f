import { defaultComparatorByOptionsComputer } from '../../utils/compare/default-comparator-by-options-computer.js'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
import { buildUsageComparator } from './build-usage-comparator.js'
function buildComparatorByOptionsComputer({
  useExperimentalDependencyDetection,
  ignoreEslintDisabledNodes,
  sortingNodes,
  sourceCode,
}) {
  return options => {
    switch (options.type) {
      case 'subgroup-order':
      case 'alphabetical':
      case 'line-length':
      case 'unsorted':
      case 'natural':
      case 'custom':
        return defaultComparatorByOptionsComputer({
          ...options,
          type: options.type,
        })
      case 'usage':
        return buildUsageComparator({
          useExperimentalDependencyDetection,
          ignoreEslintDisabledNodes,
          sortingNodes,
          sourceCode,
          options,
        })
      /* v8 ignore next 2 -- @preserve Exhaustive guard. */
      default:
        throw new UnreachableCaseError(options.type)
    }
  }
}
export { buildComparatorByOptionsComputer }
