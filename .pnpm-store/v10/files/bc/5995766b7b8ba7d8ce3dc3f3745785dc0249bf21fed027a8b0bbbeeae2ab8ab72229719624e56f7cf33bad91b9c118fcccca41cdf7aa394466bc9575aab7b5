import helperNumberDecimal from './helperNumberDecimal'
import toNumberString from './toNumberString'
import multiply from './multiply'

function helperNumberAdd (addend, augend) {
  var str1 = toNumberString(addend)
  var str2 = toNumberString(augend)
  var ratio = Math.pow(10, Math.max(helperNumberDecimal(str1), helperNumberDecimal(str2)))
  return (multiply(addend, ratio) + multiply(augend, ratio)) / ratio
}

export default helperNumberAdd
