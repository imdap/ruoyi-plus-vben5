import { unsortedComparator } from './unsorted-comparator.js'
function computeComparators(comparatorByOptionsComputer, options) {
  let mainComparator = comparatorByOptionsComputer(options)
  if (mainComparator === unsortedComparator) {
    return []
  }
  let fallbackComparator = comparatorByOptionsComputer({
    ...options,
    ...options.fallbackSort,
  })
  return [mainComparator, fallbackComparator]
}
export { computeComparators }
