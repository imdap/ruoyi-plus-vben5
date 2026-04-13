import setupDefaults from './setupDefaults'

import eqNull from './eqNull'

/**
  * 获取一个全局唯一标识
  *
  * @param {String} prefix 前缀
  * @return {Number}
  */
function uniqueId (prefix) {
  return '' + (eqNull(prefix) ? '' : prefix) + (setupDefaults.keyId++)
}

export default uniqueId
