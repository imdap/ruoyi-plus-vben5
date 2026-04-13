import { convertBooleanToSign } from '../convert-boolean-to-sign.js'
import { buildStringFormatter } from './build-string-formatter.js'
import { computeOrderedValue } from './compute-ordered-value.js'
let alphabetCache = /* @__PURE__ */ new Map()
function compareByCustomSort(
  a,
  b,
  { specialCharacters, ignoreCase, alphabet, order },
) {
  let formatString = buildStringFormatter({
    specialCharacters,
    ignoreCase,
  })
  let indexByCharacters = alphabetCache.get(alphabet)
  if (!indexByCharacters) {
    indexByCharacters = /* @__PURE__ */ new Map()
    for (let [index, character] of [...alphabet].entries()) {
      indexByCharacters.set(character, index)
    }
    alphabetCache.set(alphabet, indexByCharacters)
  }
  let aValue = formatString(a)
  let bValue = formatString(b)
  let minLength = Math.min(aValue.length, bValue.length)
  for (let i = 0; i < minLength; i++) {
    let aCharacter = aValue[i]
    let bCharacter = bValue[i]
    let indexOfA = indexByCharacters.get(aCharacter)
    let indexOfB = indexByCharacters.get(bCharacter)
    indexOfA ??= Infinity
    indexOfB ??= Infinity
    if (indexOfA !== indexOfB) {
      return computeOrderedValue(
        convertBooleanToSign(indexOfA - indexOfB > 0),
        order,
      )
    }
  }
  if (aValue.length === bValue.length) {
    return 0
  }
  return computeOrderedValue(
    convertBooleanToSign(aValue.length - bValue.length > 0),
    order,
  )
}
export { compareByCustomSort }
