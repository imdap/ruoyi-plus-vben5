import eqNull from './eqNull'
import isNumber from './isNumber'
import toNumberString from './toNumberString'

function toValueString (obj) {
  if (isNumber(obj)) {
    return toNumberString(obj)
  }
  return '' + (eqNull(obj) ? '' : obj)
}

export default toValueString
