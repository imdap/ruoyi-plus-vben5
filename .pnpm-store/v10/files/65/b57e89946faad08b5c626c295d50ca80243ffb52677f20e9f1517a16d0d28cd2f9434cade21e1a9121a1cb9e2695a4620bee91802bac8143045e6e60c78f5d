import { UnreachableCaseError } from '../unreachable-case-error.js'
function computeOrderedValue(value, order) {
  switch (order) {
    case 'desc':
      return -value
    case 'asc':
      return value
    /* v8 ignore next 2 -- @preserve Exhaustive guard. */
    default:
      throw new UnreachableCaseError(order)
  }
}
export { computeOrderedValue }
