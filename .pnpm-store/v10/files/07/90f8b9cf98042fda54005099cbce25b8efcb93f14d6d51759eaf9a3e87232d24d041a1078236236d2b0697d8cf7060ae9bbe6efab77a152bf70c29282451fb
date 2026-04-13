import isString from './isString'
import isNumber from './isNumber'

/**
  * 判断是否Element对象
  *
  * @param {Object} obj 对象
  * @return {Boolean}
  */
function isElement (obj) {
  return !!(obj && isString(obj.nodeName) && isNumber(obj.nodeType))
}

export default isElement
