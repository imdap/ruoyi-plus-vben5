/* eslint-disable valid-typeof */
import staticStrUndefined from './staticStrUndefined'

/**
  * 判断是否WeakSet对象
  *
  * @param {Object} obj 对象
  * @return {Boolean}
 */
var supportWeakSet = typeof WeakSet !== staticStrUndefined
function isWeakSet (obj) {
  return supportWeakSet && obj instanceof WeakSet
}

export default isWeakSet
