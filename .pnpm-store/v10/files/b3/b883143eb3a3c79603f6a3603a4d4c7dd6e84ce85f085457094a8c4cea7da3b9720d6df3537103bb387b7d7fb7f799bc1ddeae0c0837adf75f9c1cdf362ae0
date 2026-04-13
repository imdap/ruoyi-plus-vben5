import each from './each'
import includes from './includes'
import isFunction from './isFunction'
import property from './property'

/**
 * 数组去重
 * 
 * @param {*} array  数组
 * @param {*} iterate 字段或回调
 * @param {*} context 
 * @returns 
 */
function uniq (array, iterate, context) {
  var result = []
  if (iterate) {
    if (!isFunction(iterate)) {
      iterate = property(iterate)
    }
    var val, valMap = {}
    each(array, function (item, key) {
      val = iterate.call(context, item, key, array)
      if (!valMap[val]) {
        valMap[val] = 1
        result.push(item)
      }
    })
  } else {
    each(array, function (value) {
      if (!includes(result, value)) {
        result.push(value)
      }
    })
  }
  return result
}

export default uniq
