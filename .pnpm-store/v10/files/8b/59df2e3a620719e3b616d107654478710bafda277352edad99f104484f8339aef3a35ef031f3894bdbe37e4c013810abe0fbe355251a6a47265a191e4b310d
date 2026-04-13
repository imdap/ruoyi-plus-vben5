import { buildStringFormatter } from './build-string-formatter.js'
import { computeOrderedValue } from './compute-ordered-value.js'
function compareAlphabetically(
  a,
  b,
  { specialCharacters, ignoreCase, locales, order },
) {
  let formatString = buildStringFormatter({
    specialCharacters,
    ignoreCase,
  })
  let result = formatString(a).localeCompare(formatString(b), locales)
  return computeOrderedValue(result, order)
}
export { compareAlphabetically }
