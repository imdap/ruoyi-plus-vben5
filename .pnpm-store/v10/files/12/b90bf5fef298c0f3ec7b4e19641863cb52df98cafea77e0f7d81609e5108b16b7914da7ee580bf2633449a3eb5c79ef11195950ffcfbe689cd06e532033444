import { App, VNode, ComponentPublicInstance, DefineComponent, Prop } from 'vue'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

type SafeProp<T> = {
  [K in keyof T]: T[K] extends string ? T[K] : Prop<T[K]>
}

/**
 * 组件类型
 */
export type DefineVxeComponentApp<
  P = { [key: string]: any },
  E = { [key: string]: any },
  S = { [key: string]: (...args: any[]) => any },
  M = { [key: string]: any }
> = ({
  new (): M & {
    $props: P & E,
    $slots: S
  }
} & {
  props: SafeProp<Required<P>>
  install(app: App): void
})

/**
 * 全局组件
 */
export type DefineVxeGlobalComponent<
  P = { [key: string]: any },
  E = { [key: string]: any },
  S = { [key: string]: (...args: any[]) => any },
> = ({
  new (): {
    $props: P & E,
    $slots: S
  }
} & {
  install(app: App): void
})

/**
 * 组件配置
 */
export type DefineVxeComponentOptions<P, E> = DefineComponent<P & E>

/**
 * 组件实例
 */
export type DefineVxeComponentInstance<P, M> = ComponentPublicInstance<P, M>

/**
 * 组件通用的基础参数
 */
export interface VxeComponentBaseOptions {
  xID: string
}

/**
 * 组件事件参数
 */
export interface VxeComponentEventParams {
  $event: Event
}

/**
 * 全局事件默认参数
 */
export interface VxeComponentEvent<E = Event> {
  $event: E
  stopPropagation(): void
  preventDefault(): void
}

/**
 * 组件尺寸类型
 */
export type VxeComponentSizeType = null | '' | 'large' | 'medium' | 'small' | 'mini'

/**
 * 组件对齐方式
 */
export type VxeComponentAlignType = null | '' | 'left' | 'right' | 'center'

/**
 * 组件状态
 */
export type VxeComponentStatusType = null | '' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'error' | 'perfect'

/**
 * 组件样式类型
 */
export type VxeComponentStyleType = Record<string, string | number>

/**
 * 组件 className 类型
 */
export type VxeComponentClassNameType = Record<string, boolean>

/**
 * 组件插槽类型
 */
export type VxeComponentSlotType = VNode | string

/**
 * 权限码类型
 */
export type VxeComponentPermissionCodeType = string | number

/**
 * 权限码判断结果
 */
export type VxeComponentPermissionResult = boolean | {
  visible: boolean
  disabled: boolean
}

/**
 * 权限码判断方法
 */
export type VxeComponentPermissionMethod = (params: {
  code: VxeComponentPermissionCodeType
}) => VxeComponentPermissionResult

/**
 * 权限码信息
 */
export interface VxeComponentPermissionInfo {
  code?: VxeComponentPermissionCodeType
  visible: boolean
  disabled: boolean
}

type CamelToKebabRest<S extends string> = S extends `${infer First}${infer Rest}`? `${First extends Lowercase<First> ? '' : '-'}${Lowercase<First>}${CamelToKebabRest<Rest>}`: S
type CamelToKebab<S extends string> = S extends `${infer First}${infer Rest}`? `${Lowercase<First>}${CamelToKebabRest<Rest>}`: S

/**
 * 将带驼峰字符串转成字符串,例如： ProjectName 转为 project-name
 */
export type VxeComponentKebabCaseKeys<T> = {
  [K in keyof T as K extends string ? CamelToKebab<K> : K]: T[K]
}

/**
 * 将指定的属性设置为必选类型
 */
export type VxeWithRequired<T, K extends keyof T> = T & {
  [P in K]-?: T[P]
}
