import uniq from './uniq'
import toArray from './toArray'

/**
  * 将多个数的值返回唯一的并集数组
  *
  * @param {...Array} 数组
  * @return {Array}
  */
function union () {
  var args = arguments
  var result = []
  var index = 0
  var len = args.length
  for (; index < len; index++) {
    result = result.concat(toArray(args[index]))
  }
  return uniq(result)
}

export default union
