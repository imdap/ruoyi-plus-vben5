import staticEncodeURIComponent from './staticEncodeURIComponent'

import each from './each'
import isArray from './isArray'
import isNull from './isNull'
import isUndefined from './isUndefined'
import isPlainObject from './isPlainObject'

function stringifyParams (resultVal, resultKey, isArr) {
  var _arr
  var result = []
  each(resultVal, function (item, key) {
    _arr = isArray(item)
    if (isPlainObject(item) || _arr) {
      result = result.concat(stringifyParams(item, resultKey + '[' + key + ']', _arr))
    } else {
      result.push(staticEncodeURIComponent(resultKey + '[' + (isArr ? '' : key) + ']') + '=' + staticEncodeURIComponent(isNull(item) ? '' : item))
    }
  })
  return result
}

/**
 * 序列化查询参数
 *
 * @param {Object} query 查询参数
 */
function serialize (query) {
  var _arr
  var params = []
  each(query, function (item, key) {
    if (!isUndefined(item)) {
      _arr = isArray(item)
      if (isPlainObject(item) || _arr) {
        params = params.concat(stringifyParams(item, key, _arr))
      } else {
        params.push(staticEncodeURIComponent(key) + '=' + staticEncodeURIComponent(isNull(item) ? '' : item))
      }
    }
  })
  return params.join('&').replace(/%20/g, '+')
}

export default serialize
