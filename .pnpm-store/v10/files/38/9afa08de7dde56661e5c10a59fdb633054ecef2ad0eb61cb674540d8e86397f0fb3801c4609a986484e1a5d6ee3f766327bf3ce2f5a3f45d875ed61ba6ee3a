import helperNumberDecimal from './helperNumberDecimal'
import toNumberString from './toNumberString'

function helperMultiply (multiplier, multiplicand) {
  var str1 = toNumberString(multiplier)
  var str2 = toNumberString(multiplicand)
  return parseInt(str1.replace('.', '')) * parseInt(str2.replace('.', '')) / Math.pow(10, helperNumberDecimal(str1) + helperNumberDecimal(str2))
}

export default helperMultiply
