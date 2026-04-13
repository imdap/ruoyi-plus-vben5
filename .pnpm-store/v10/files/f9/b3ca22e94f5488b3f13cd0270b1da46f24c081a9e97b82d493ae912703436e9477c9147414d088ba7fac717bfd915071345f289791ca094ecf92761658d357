import XEUtils from 'xe-utils'
import DomZIndex from 'dom-zindex'
import { VxeCore } from './core'
import { globalConfigStore } from './configStore'
import { setTheme } from './theme'

import { VxeGlobalConfig } from '../../types'

/**
* 全局参数设置
*/
export function setConfig (options?: VxeGlobalConfig) {
  if (options) {
    if (options.zIndex) {
      DomZIndex.setCurrent(options.zIndex)
    }
    if (options.theme) {
      setTheme(options.theme)
    }
    XEUtils.merge(globalConfigStore, options)
  }
  return VxeCore
}

/**
* 获取全局参数
*/
export function getConfig (key: keyof VxeGlobalConfig, defaultValue?: any) {
  return arguments.length ? XEUtils.get(globalConfigStore, key, defaultValue) : globalConfigStore
}
