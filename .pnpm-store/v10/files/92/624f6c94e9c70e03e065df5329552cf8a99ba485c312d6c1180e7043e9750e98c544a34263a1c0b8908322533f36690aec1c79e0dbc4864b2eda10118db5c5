import { compare } from 'natural-orderby'
import { buildStringFormatter } from './build-string-formatter.js'
import { computeOrderedValue } from './compute-ordered-value.js'
function compareNaturally(
  a,
  b,
  { specialCharacters, ignoreCase, locales, order },
) {
  let naturalCompare = compare({
    locale: locales.toString(),
  })
  let formatString = buildStringFormatter({
    specialCharacters,
    ignoreCase,
  })
  let result = naturalCompare(formatString(a), formatString(b))
  return computeOrderedValue(result, order)
}
export { compareNaturally }
