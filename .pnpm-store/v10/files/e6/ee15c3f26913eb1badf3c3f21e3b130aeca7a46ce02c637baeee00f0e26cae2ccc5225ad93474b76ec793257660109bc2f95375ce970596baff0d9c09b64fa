import { computeOrderedValue } from './compute-ordered-value.js'
function buildLineLengthComparator({ order }) {
  return (a, b) => {
    let aSize = a.size
    let bSize = b.size
    let result = aSize - bSize
    return computeOrderedValue(result, order)
  }
}
export { buildLineLengthComparator }
