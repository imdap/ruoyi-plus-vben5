import { VxeComponentSizeType } from '../tool'

import { VxeGlobalThemeName, VxeComponentPermissionCodeType, VxeComponentPermissionResult } from '../../types'

/**
 * 全局参数对象
 */
export interface VxeGlobalConfig {
  /**
   * 企业版 - 设置授权 ID
   */
  authId?: string
  /**
   * 企业版 - 是否在控制台打印授权信息
   */
  showAuthLog?: boolean
  /**
   * 企业版 - 授权状态监听
   */
  onAuth?(params: {
    status: boolean
    code: number
    msg: string
  }): void

  /**
   * 权限码全局判断方法，返回 { visible, disabled }
   */
  permissionMethod?:(params: {
    code: VxeComponentPermissionCodeType
  }) => VxeComponentPermissionResult
  /**
   * 全局默认 z-index
   */
  zIndex?: number
  /**
   * 全局组件尺寸
   */
  size?: VxeComponentSizeType
  /**
   * 支持对组件中特定的字段进行翻译
   * @param key
   * @param args
   * @returns string
   */
  translate?:(key: string, args?: any) => string
  /**
   * 自定义方式对组件内置的语言进行翻译
   * @param key
   * @param args
   * @returns string
   */
  i18n?:(key: string, args?: any) => string | number

  /**
   * 已废弃，请使用 VxeUI.setConfig({ table: { resizeInterval: 300 } })
   * @deprecated
   */
  resizeInterval?: number
  /**
   * 已废弃，请使用 VxeUI.tableVersion
   * @deprecated
   */
  version?: string | number
  /**
   * 已废弃，请使用 VxeUI.setTheme('dark')
   * @deprecated
   */
  theme?: VxeGlobalThemeName
}
