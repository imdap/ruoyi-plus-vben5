import isFunction from './isFunction'
import isString from './isString'
import isArray from './isArray'
import hasOwnProp from './hasOwnProp'

function helperCreateiterateIndexOf (callback) {
  return function (obj, iterate, context) {
    if (obj && isFunction(iterate)) {
      if (isArray(obj) || isString(obj)) {
        return callback(obj, iterate, context)
      }
      for (var key in obj) {
        if (hasOwnProp(obj, key)) {
          if (iterate.call(context, obj[key], key, obj)) {
            return key
          }
        }
      }
    }
    return -1
  }
}

export default helperCreateiterateIndexOf
