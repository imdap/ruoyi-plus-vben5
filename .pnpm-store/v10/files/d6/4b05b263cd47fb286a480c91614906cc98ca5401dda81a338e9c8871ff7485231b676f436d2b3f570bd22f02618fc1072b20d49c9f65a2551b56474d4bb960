import helperDeleteProperty from './helperDeleteProperty'

import isFunction from './isFunction'
import isArray from './isArray'
import each from './each'
import arrayEach from './arrayEach'
import lastEach from './lastEach'
import clear from './clear'
import eqNull from './eqNull'

function pluckProperty (name) {
  return function (obj, key) {
    return key === name
  }
}

/**
  * 移除对象属性
  *
  * @param {Object/Array} obj 对象/数组
  * @param {Function/String} iterate 方法或属性
  * @param {Object} context 上下文
  * @return {Object/Array}
  */
function remove (obj, iterate, context) {
  if (obj) {
    if (!eqNull(iterate)) {
      var removeKeys = []
      var rest = []
      if (!isFunction(iterate)) {
        iterate = pluckProperty(iterate)
      }
      each(obj, function (item, index, rest) {
        if (iterate.call(context, item, index, rest)) {
          removeKeys.push(index)
        }
      })
      if (isArray(obj)) {
        lastEach(removeKeys, function (item, key) {
          rest.push(obj[item])
          obj.splice(item, 1)
        })
      } else {
        rest = {}
        arrayEach(removeKeys, function (key) {
          rest[key] = obj[key]
          helperDeleteProperty(obj, key)
        })
      }
      return rest
    }
    return clear(obj)
  }
  return obj
}

export default remove
