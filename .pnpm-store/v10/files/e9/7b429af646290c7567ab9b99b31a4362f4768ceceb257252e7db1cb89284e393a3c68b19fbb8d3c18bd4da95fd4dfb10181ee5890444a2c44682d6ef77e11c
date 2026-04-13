import template from './template'

/**
 * 字符串格式化占位符
 * @param { string } str 
 * @param { object | any[] } obj 
 */
function toFormatString (str, obj) {
  return template(str, obj,{ tmplRE: /\{([.\w[\]\s]+)\}/g })
}

export default toFormatString
