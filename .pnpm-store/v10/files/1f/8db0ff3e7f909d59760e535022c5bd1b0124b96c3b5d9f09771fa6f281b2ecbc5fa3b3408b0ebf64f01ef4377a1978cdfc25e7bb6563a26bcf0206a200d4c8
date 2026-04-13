import XEUtils from 'xe-utils'
import { getConfig } from '@vxe-ui/core'
import DomZIndex from 'dom-zindex'

export function isEnableConf (conf: any): boolean {
  return conf && conf.enabled !== false
}

export function nextZIndex () {
  return DomZIndex.getNext()
}

export function getLastZIndex () {
  return DomZIndex.getCurrent()
}

export function nextSubZIndex () {
  return DomZIndex.getSubNext()
}

export function getSubLastZIndex () {
  return DomZIndex.getSubCurrent()
}

export function getGlobalDefaultConfig (value: any, globalValue: any) {
  if (XEUtils.eqNull(value)) {
    return globalValue
  }
  return value
}

export function getFuncText (content: string | number | boolean | null | undefined, args?: any) {
  if (XEUtils.eqNull(content)) {
    return ''
  }
  const translate = getConfig().translate
  return `${translate ? translate('' + content, args) : content}`
}

/**
 * 判断值为：'' | null | undefined 时都属于空值
 */
export function eqEmptyValue (cellValue: any) {
  return cellValue === null || cellValue === undefined || cellValue === ''
}

export function handleBooleanDefaultValue (value: boolean | undefined | null) {
  return XEUtils.isBoolean(value) ? value : null
}
