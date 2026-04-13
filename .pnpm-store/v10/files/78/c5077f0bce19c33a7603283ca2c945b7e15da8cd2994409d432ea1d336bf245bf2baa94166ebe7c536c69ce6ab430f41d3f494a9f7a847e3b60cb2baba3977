import { h } from 'vue'
import XEUtils from 'xe-utils'
import { VxeCore } from './core'
import { iconConfigStore } from './iconStore'
import { getSlotVNs } from './vm'

import { VxeGlobalIcon, VxeGlobalIconConfig } from '../../types'

export function setIcon (options?: VxeGlobalIcon) {
  if (options) {
    Object.assign(iconConfigStore, options)
  }
  return VxeCore
}

export function getIcon (key: keyof VxeGlobalIcon) {
  return arguments.length ? XEUtils.get(iconConfigStore, key) : iconConfigStore
}

export function renderGlobalIcon (name: keyof VxeGlobalIcon) {
  const icon = getIcon(name) as VxeGlobalIconConfig
  return renderCustomIcon(icon, name)
}

export function renderCustomIcon (icon: VxeGlobalIconConfig, name: string) {
  if (XEUtils.isFunction(icon)) {
    return h('span', {}, getSlotVNs(icon({ name })))
  }
  return h('i', {
    class: icon
  })
}
