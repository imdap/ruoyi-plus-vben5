import { defineTableRender } from './table'
import { defineFormRender } from './form'
import { defineFormDesignRender } from './form-design'
import { globalConfig, componentMaps } from './store'
import XEUtils from 'xe-utils'

import type { VxeUIPluginObject, VxeGlobalInterceptorHandles } from 'vxe-pc-ui'
import type { VxeUIPluginRenderAntdOptions } from '../types'

function getEventTarget (evnt: Event) {
  const target = evnt.target as HTMLElement | null
  if (target && (target as any).shadowRoot && evnt.composed) {
    return evnt.composedPath()[0] as HTMLElement || target
  }
  return target
}

/**
 * 检查触发源是否属于目标节点
 */
function getEventTargetNode (evnt: any, container: HTMLElement, className: string) {
  let targetElem
  let target = getEventTarget(evnt)
  const rootEl = document.documentElement || document.querySelector('html')
  while (target && target.nodeType && target !== rootEl) {
    if (className && target.className && target.className.split && target.className.split(' ').indexOf(className) > -1) {
      targetElem = target
    } else if (target === container) {
      return { flag: className ? !!targetElem : true, container, targetElem: targetElem }
    }
    target = target.parentElement
  }
  return { flag: false }
}

function toComponentName (name: string) {
  if (name) {
    return name.slice(0, 1).toUpperCase() + name.slice(1)
  }
  return name
}

export const VxeUIPluginRenderAntd: VxeUIPluginObject = {
  component (comp: any) {
    if (comp && comp.name) {
      const kcName = XEUtils.kebabCase(comp.name)
      const ccName = toComponentName(XEUtils.camelCase(comp.name))
      componentMaps[kcName] = comp
      componentMaps[ccName] = comp
    } else {
      console.error('[VUE_APP_VXE_PLUGIN_VERSION] error component.', comp)
    }
  },
  install (VxeUI, options?: VxeUIPluginRenderAntdOptions) {
    const pluginOpts = Object.assign({}, options)

    if (options) {
      Object.assign(globalConfig, options)
    }

    // 检查版本
    if (VxeUI.checkVersion) {
      const pVersion = 4
      const sVersion = 11
      if (!VxeUI.checkVersion(VxeUI.tableVersion, pVersion, sVersion)) {
        console.error(`[VUE_APP_VXE_PLUGIN_VERSION] ${VxeUI.getI18n('vxe.error.errorVersion', [`vxe-table@${VxeUI.tableVersion || '?'}`, `vxe-table v${pVersion}.${sVersion}+`])} VUE_APP_VXE_PLUGIN_DESCRIBE`)
      }
    } else {
      if (!/^(4)\./.test(VxeUI.uiVersion || VxeUI.tableVersion)) {
        console.error('[VUE_APP_VXE_PLUGIN_VERSION] Requires VUE_APP_VXE_TABLE_VERSION+ version. VUE_APP_VXE_PLUGIN_DESCRIBE')
      }
    }

    /**
     * 事件兼容性处理
     */
    const handleClearEvent = (params: VxeGlobalInterceptorHandles.InterceptorClearFilterParams | VxeGlobalInterceptorHandles.InterceptorClearEditParams | VxeGlobalInterceptorHandles.InterceptorClearAreasParams) => {
      const { $event } = params
      const bodyElem = document.body
      const prefixCls = `${pluginOpts.prefixCls || 'ant'}`.replace(/-$/, '')
      if (
        // 下拉框
        getEventTargetNode($event, bodyElem, `${prefixCls}-select-dropdown`).flag ||
        // 级联
        getEventTargetNode($event, bodyElem, `${prefixCls}-cascader-menus`).flag ||
        // 日期
        getEventTargetNode($event, bodyElem, `${prefixCls}-picker-dropdown`).flag ||
        getEventTargetNode($event, bodyElem, `${prefixCls}-calendar-picker-container`).flag ||
        // 时间选择
        getEventTargetNode($event, bodyElem, `${prefixCls}-time-picker-panel`).flag
      ) {
        return false
      }
    }

    defineTableRender(VxeUI)
    defineFormRender(VxeUI)
    defineFormDesignRender(VxeUI)

    VxeUI.interceptor.add('event.clearFilter', handleClearEvent)
    VxeUI.interceptor.add('event.clearEdit', handleClearEvent)
    VxeUI.interceptor.add('event.clearAreas', handleClearEvent)

    // 兼容老版本
    VxeUI.interceptor.add('event.clearActived', handleClearEvent)
  }
}

if (typeof window !== 'undefined') {
  if (window.VxeUI && window.VxeUI.use) {
    window.VxeUI.use(VxeUIPluginRenderAntd)
  }
  if ((window as any).antd) {
    globalConfig.Antd = (window as any).antd
  }
}

export default VxeUIPluginRenderAntd
