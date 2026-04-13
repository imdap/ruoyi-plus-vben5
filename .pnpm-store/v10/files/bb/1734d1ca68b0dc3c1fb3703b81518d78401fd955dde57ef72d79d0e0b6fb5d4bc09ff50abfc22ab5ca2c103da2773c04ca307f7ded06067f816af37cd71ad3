import keys from './keys'

import slice from './slice'
import includes from './includes'
import arrayEach from './arrayEach'

import assign from './assign'

/**
  * 将一个或者多个对象值解构到目标对象
  *
  * @param {Object} destination 目标对象
  * @param {...Object}
  * @return {Boolean}
  */
function destructuring (destination, sources) {
  if (destination && sources) {
    var rest = assign.apply(this, [{}].concat(slice(arguments, 1)))
    var restKeys = keys(rest)
    arrayEach(keys(destination), function (key) {
      if (includes(restKeys, key)) {
        destination[key] = rest[key]
      }
    })
  }
  return destination
}

export default destructuring
