import { UnreachableCaseError } from '../unreachable-case-error.js'
function buildStringFormatter({ specialCharacters, ignoreCase }) {
  return value => {
    let valueToCompare = value
    if (ignoreCase) {
      valueToCompare = valueToCompare.toLowerCase()
    }
    switch (specialCharacters) {
      case 'remove':
        valueToCompare = valueToCompare.replaceAll(
          /[^a-z\u{C0}-\u{24F}\u{1E00}-\u{1EFF}]+/giu,
          '',
        )
        break
      case 'trim':
        valueToCompare = valueToCompare.replaceAll(
          /^[^a-z\u{C0}-\u{24F}\u{1E00}-\u{1EFF}]+/giu,
          '',
        )
        break
      case 'keep':
        break
      /* v8 ignore next 2 -- @preserve Exhaustive guard. */
      default:
        throw new UnreachableCaseError(specialCharacters)
    }
    return valueToCompare.replaceAll(/\s/gu, '')
  }
}
export { buildStringFormatter }
