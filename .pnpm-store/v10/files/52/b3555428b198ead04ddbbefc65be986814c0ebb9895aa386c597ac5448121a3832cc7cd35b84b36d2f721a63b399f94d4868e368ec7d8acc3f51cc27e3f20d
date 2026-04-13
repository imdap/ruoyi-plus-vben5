import { VNode } from 'vue'
import { VxeGlobalConfig } from './global-config'
import { VxeGlobalData } from './global-data'
import { VxeGlobalIcon, VxeGlobalIconConfig } from './global-icon'
import { VxeGlobalThemeName } from './global-theme'
import { VxeGlobalI18nLocale } from './global-lang'
import { VxeGlobalEvents, VxeGlobalEventKey, VxeGlobalCreateEventMethod } from './global-event'
import { VxeGlobalResize } from './global-resize'
import { VxeGlobalRenderer } from './renderer'
import { VxeGlobalValidators } from './validators'
import { VxeGlobalMenus } from './menus'
import { VxeGlobalFormats } from './formats'
import { VxeGlobalCommands } from './commands'
import { VxeGlobalInterceptor } from './interceptor'
import { VxeGlobalClipboard } from './clipboard'
import { VxeGlobalPermission } from './permission'
import { VxeGlobalComponentMethod, VxeGlobalGetComponentMethod, VxeGlobalHasComponentMethod } from './components'
import { VxeGlobalUseFns } from './useFn'
import { VxeGlobalHooks } from './hooks'
import { VxeGlobalLog } from './log'
import { VxeComponentBaseOptions, VxeComponentSlotType } from '../tool'

/* eslint-disable no-use-before-define */

export function setTheme(name: VxeGlobalThemeName): VxeUIExport

export function getTheme(): VxeGlobalThemeName

export function setConfig(options?: VxeGlobalConfig): VxeUIExport
export function getConfig(): Required<VxeGlobalConfig>
export function getConfig(key: keyof VxeGlobalConfig, defaultValue?: any): any

export function setIcon(options?: VxeGlobalIcon): VxeUIExport
export function getIcon(): Required<VxeGlobalIcon>
export function getIcon(key: keyof VxeGlobalIcon): any
export function renderGlobalIcon(name: keyof VxeGlobalIcon): VNode
export function renderCustomIcon(icon: VxeGlobalIconConfig, name: string): VNode

export function hasLanguage(locale: VxeGlobalI18nLocale): boolean
export function getLanguage(): VxeGlobalI18nLocale
export function setLanguage(locale: VxeGlobalI18nLocale): VxeUIExport
export function setI18n(locale: VxeGlobalI18nLocale, data: Record<string, any>): VxeUIExport
export function getI18n(key: string, args?: any): string

export function getSlotVNs(vns: VxeComponentSlotType | VxeComponentSlotType[] | undefined): VxeComponentSlotType[]

export const component: VxeGlobalComponentMethod
export const getComponent: VxeGlobalGetComponentMethod
export const hasComponent: VxeGlobalHasComponentMethod

export const coreVersion: string

export function renderEmptyElement(_vm: VxeComponentBaseOptions): VNode

export function checkVersion(version: string, pVersion: number, sVersion?: number): boolean

export const renderer: VxeGlobalRenderer

export const validators: VxeGlobalValidators

export const menus: VxeGlobalMenus

export const formats: VxeGlobalFormats

export const commands: VxeGlobalCommands

export const interceptor: VxeGlobalInterceptor

export const clipboard: VxeGlobalClipboard

export const permission: VxeGlobalPermission

export const globalEvents: VxeGlobalEvents

export const globalResize: VxeGlobalResize

export const globalStore: VxeGlobalData

export const log: VxeGlobalLog

export const useFns: VxeGlobalUseFns

export const hooks: VxeGlobalHooks

export interface VxeUIPluginObject {
  install(vxeui: VxeUIExport, ...options: any[]): void
  [key: string]: any
}

export function use (plugin: VxeUIPluginObject, ...options: any[]): VxeUIExport

/**
 * Vxe UI core library
 */
export interface VxeUIExport {
  /**
   * 核心版本号
   */
  coreVersion: string
  /**
   * UI 版本号
   */
  uiVersion: string
  /**
   * Table 版本号
   */
  tableVersion: string
  /**
   * Design 版本号
   */
  designVersion: string
  /**
   * Gantt 版本号
   */
  ganttVersion: string
  /**
   * 渲染一个空元素
   */
  renderEmptyElement: typeof renderEmptyElement
  /**
   * 设置全局主题
   */
  setTheme: typeof setTheme
  /**
   * 获取全局主题
   */
  getTheme: typeof getTheme
  /**
   * 设置全局参数
   */
  setConfig: typeof setConfig
  /**
   * 获取全局参数
   */
  getConfig: typeof getConfig
  /**
   * 设置全局图标
   */
  setIcon: typeof setIcon
  /**
   * 渲染全局配置图标
   */
  renderGlobalIcon : typeof renderGlobalIcon
  /**
   * 渲染自定义图标
   */
  renderCustomIcon : typeof renderCustomIcon
  /**
   * 判断是否已经安装了该语言包，如果已安装则返回 true
   */
  hasLanguage: typeof hasLanguage
  /**
   * 获取当前显示语言
   */
  getLanguage: typeof getLanguage
  /**
   * 设置组件当前语言
   */
  setLanguage: typeof setLanguage
  /**
   * 设置组件语言数据
   */
  setI18n: typeof setI18n
  /**
   * 获取组件语言值
   */
  getI18n: typeof getI18n

  /**
   * 获取全局图标
   */
  getIcon: typeof getIcon,

  /**
   * 全局渲染器
   */
  renderer: VxeGlobalRenderer
  /**
   * 全局校验扩展
   */
  validators: VxeGlobalValidators
  /**
   * 全局右键菜单扩展
   */
  menus: VxeGlobalMenus
  /**
   * 全局格式化对象
   */
  formats: VxeGlobalFormats
  /**
   * 全局操作指令
   */
  commands: VxeGlobalCommands
  /**
   * 全局事件拦截处理对象
   */
  interceptor: VxeGlobalInterceptor
  /**
   * 全局剪贴板
   */
  clipboard: VxeGlobalClipboard
  /**
   * 全局权限控制
   */
  permission: VxeGlobalPermission

  /**
   * 全局事件管理
   */
  globalEvents: VxeGlobalEvents
  createEvent: VxeGlobalCreateEventMethod
  GLOBAL_EVENT_KEYS: VxeGlobalEventKey

  /**
   * 全局观察者事件
   */
  globalResize: VxeGlobalResize

  /**
   * 全局数据对象
   */
  globalStore: VxeGlobalData

  /**
   * 全局日志
   */
  log: VxeGlobalLog

  getSlotVNs: typeof getSlotVNs

  /**
   * 注册的组件
   */
  component: VxeGlobalComponentMethod

  /**
   * 获取已注册的组件
   */
  getComponent: VxeGlobalGetComponentMethod

  /**
   * 判断组件是否已注册
   */
  hasComponent: VxeGlobalHasComponentMethod

  /**
   * 扩展插件
   */
  hooks: VxeGlobalHooks

  /**
   * 通用 Use API 函数
   */
  useFns: VxeGlobalUseFns

  /**
   * 检查版本号是否匹配
   */
  checkVersion: typeof checkVersion

  /**
   * 安装插件
   */
  use: (plugin: VxeUIPluginObject, ...options: any[]) => VxeUIExport
}

/**
 * Vxe UI core library
 */
export const VxeUI: VxeUIExport

export * from './global-config'
export * from './global-data'
export * from './global-icon'
export * from './global-theme'
export * from './global-lang'
export * from './global-event'
export * from './global-resize'

export * from './renderer'
export * from './validators'
export * from './menus'
export * from './formats'
export * from './commands'
export * from './interceptor'
export * from './clipboard'
export * from './permission'
export * from './log'

export * from './components'
export * from './useFn'
export * from './hooks'

export default VxeUI
