import setupDefaults from './setupDefaults'

import toValueString from './toValueString'
import trim from './trim'

import get from './get'

/**
 * 解析动态字符串模板
 * @param {atring} str 字符串模板
 * @param {any | any[]} args 对象
 * @param {any} options 
 */
function template (str, args, options) {
  return toValueString(str).replace((options || setupDefaults).tmplRE || /\{{2}([.\w[\]\s]+)\}{2}/g, function (match, key) {
    return get(args, trim(key))
  })
}

export default template
