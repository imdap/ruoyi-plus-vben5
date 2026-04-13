/* eslint-disable valid-typeof */
import staticStrUndefined from './staticStrUndefined'

/**
  * 判断是否Symbol对象
  *
  * @param {Object} obj 对象
  * @return {Boolean}
  */
var supportSymbol = typeof Symbol !== staticStrUndefined
function isSymbol (obj) {
  return supportSymbol && Symbol.isSymbol ? Symbol.isSymbol(obj) : (typeof obj === 'symbol')
}

export default isSymbol
