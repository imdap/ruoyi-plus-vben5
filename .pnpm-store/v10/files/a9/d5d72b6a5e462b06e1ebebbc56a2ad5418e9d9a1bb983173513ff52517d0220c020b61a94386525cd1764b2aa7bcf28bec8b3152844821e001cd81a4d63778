import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, VxeComponentSizeType, ValueOf, VxeComponentSlotType } from '@vxe-ui/core'
import { VxeTreeProps, VxeTreePropTypes, VxeTreeSlotTypes } from './tree'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeTreeSelect: DefineVxeComponentApp<VxeTreeSelectProps, VxeTreeSelectEventProps, VxeTreeSelectSlots, VxeTreeSelectMethods>
export type VxeTreeSelectComponent = DefineVxeComponentOptions<VxeTreeSelectProps, VxeTreeSelectEventProps>

export type VxeTreeSelectInstance = DefineVxeComponentInstance<VxeTreeSelectProps, VxeTreeSelectConstructor>

export interface VxeTreeSelectConstructor extends VxeComponentBaseOptions, VxeTreeSelectMethods {
  props: VxeTreeSelectProps
  context: SetupContext<VxeTreeSelectEmits>
  reactData: TreeSelectReactData
  getRefMaps(): TreeSelectPrivateRef
  getComputeMaps(): TreeSelectPrivateComputed
  renderVN: RenderFunction
}

export interface TreeSelectPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeTreeSelectPrivateRef extends TreeSelectPrivateRef { }

export namespace VxeTreeSelectPropTypes {
  export type Size = VxeComponentSizeType
  export type ModelValue = any
  export type Clearable = boolean
  /**
   * 已废弃，请使用 PopupConfig.zIndex
   * @deprecated
   */
  export type ZIndex = number
  export type Placeholder = string
  export type Readonly = boolean
  export type Loading = boolean
  export type Disabled = boolean
  export type AutoClose = boolean
  export type ShowTotalButoon = boolean
  export type ShowCheckedButoon = boolean
  export type ShowExpandButton = boolean
  export type ShowClearButton = boolean
  export type ClassName = string | ((params: { $treeSelect: VxeTreeSelectConstructor }) => string)
  /**
   * 已废弃，请使用 PopupConfig.className
   * @deprecated
   */
  export type PopupClassName = string | ((params: { $treeSelect: VxeTreeSelectConstructor }) => string)
  export type Multiple = boolean
  export type PrefixIcon = string
  export type Placement = 'top' | 'bottom'
  export type Filterable = boolean
  export type FilterConfig = VxeTreePropTypes.FilterConfig
  export interface Option {
    value?: string | number
    label?: string | number
    children?: Option[]

    [key: string]: any
  }
  export type LazyOptions<D = Option> = D[]
  export type Options<D = Option> = D[]
  export interface OptionProps {
    value?: string
    label?: string
    disabled?: string
    children?: string

    /**
     * @deprecated
     */
    hasChild?: string
    /**
     * @deprecated
     */
    parent?: string
  }
  export type Remote = boolean
  /**
   * 已废弃，被 remote-config.queryMethod 替换
   * @deprecated
   */
  export type RemoteMethod = (params: { searchValue: string }) => Promise<void> | void
  export interface RemoteConfig {
    /**
     * 是否启用
     */
    enabled?: boolean
    /**
     * 当列表为空时，是否默认自动调用远程查询方法
     */
    autoLoad?: boolean
    /**
     * 远程查询方法
     */
    queryMethod?(params: {
      $treeSelect: VxeTreeSelectConstructor
      searchValue: string
      value: ModelValue | undefined
    }): Promise<void> | void
  }

  export type Transfer = boolean
  export interface PopupConfig {
    /**
     * 设置弹出面板方向
     */
    placement?: 'top' | 'bottom' | '' | null
    /**
     * 默认弹出面板方向
     */
    defaultPlacement?: 'top' | 'bottom' | '' | null
    /**
     * 触发方式
     */
    trigger?: 'default' | 'icon' | 'manual' | '' | null
    transfer?: boolean
    width?: number | string
    height?: number | string
    zIndex?: number | string
    className?: string | ((params: { $treeSelect: VxeTreeSelectConstructor }) => string)
  }
  export interface TreeConfig<D = any> extends Omit<VxeTreeProps<D>, 'data' | 'size' | 'menuConfig'> {
    slots?: {
      icon?: string | ((params: VxeTreeSlotTypes.IconSlotParams) => VxeComponentSlotType | VxeComponentSlotType[])
      title?: string | ((params: VxeTreeSlotTypes.TitleSlotParams) =>VxeComponentSlotType | VxeComponentSlotType[])
      extra?: string | ((params: VxeTreeSlotTypes.ExtraSlotParams) => VxeComponentSlotType | VxeComponentSlotType[])
    }
  }
  export interface MenuConfig<D = any> extends VxeTreePropTypes.MenuConfig<D> {}

  export interface VirtualYConfig {
    /**
     * 指定大于指定行时自动启动纵向虚拟滚动，如果为 0 则总是启用，如果为 -1 则关闭
     */
    gt?: number
    /**
     * 指定每次渲染的数据额外数据，额外数据越大渲染次数就越少，但每次渲染耗时就越久
     */
    oSize?: number
    /**
     * 是否启用
     */
    enabled?: boolean
  }
}

export interface VxeTreeSelectProps<D = any> {
  size?: VxeTreeSelectPropTypes.Size
  modelValue?: VxeTreeSelectPropTypes.ModelValue
  clearable?: VxeTreeSelectPropTypes.Clearable
  placeholder?: VxeTreeSelectPropTypes.Placeholder
  readonly?: VxeTreeSelectPropTypes.Readonly
  loading?: VxeTreeSelectPropTypes.Loading
  disabled?: VxeTreeSelectPropTypes.Disabled
  autoClose?: VxeTreeSelectPropTypes.AutoClose
  showTotalButoon?: VxeTreeSelectPropTypes.ShowTotalButoon
  showCheckedButoon?: VxeTreeSelectPropTypes.ShowCheckedButoon
  showClearButton?: VxeTreeSelectPropTypes.ShowClearButton
  showExpandButton?: VxeTreeSelectPropTypes.ShowExpandButton
  className?: VxeTreeSelectPropTypes.ClassName
  multiple?: VxeTreeSelectPropTypes.Multiple
  prefixIcon?: VxeTreeSelectPropTypes.PrefixIcon
  placement?: VxeTreeSelectPropTypes.Placement
  filterable?: VxeTreeSelectPropTypes.Filterable
  filterConfig?: VxeTreeSelectPropTypes.FilterConfig
  lazyOptions?: VxeTreeSelectPropTypes.LazyOptions<D>
  options?: VxeTreeSelectPropTypes.Options<D>
  optionProps?: VxeTreeSelectPropTypes.OptionProps
  remote?: VxeTreeSelectPropTypes.Remote
  remoteConfig?: VxeTreeSelectPropTypes.RemoteConfig
  transfer?: VxeTreeSelectPropTypes.Transfer
  popupConfig?: VxeTreeSelectPropTypes.PopupConfig
  treeConfig?: VxeTreeSelectPropTypes.TreeConfig<D>
  menuConfig?: VxeTreeSelectPropTypes.MenuConfig<D>
  virtualYConfig?: VxeTreeSelectPropTypes.VirtualYConfig

  /**
   * 已废弃，请使用 popup-config.zIndex
   * @deprecated
   */
  zIndex?: VxeTreeSelectPropTypes.ZIndex
  /**
   * 已废弃，被 remote-config.queryMethod 替换
   * @deprecated
   */
  remoteMethod?: VxeTreeSelectPropTypes.RemoteMethod
  /**
   * 已废弃，请使用 popup-config.className
   * @deprecated
   */
  popupClassName?: VxeTreeSelectPropTypes.PopupClassName
}

export interface TreeSelectPrivateComputed {
}
export interface VxeTreeSelectPrivateComputed extends TreeSelectPrivateComputed { }

export interface TreeSelectReactData {
  initialized: boolean
  searchValue: string
  searchLoading: boolean
  panelIndex: number
  panelStyle: any
  panelPlacement: any
  triggerFocusPanel: boolean
  visiblePanel: boolean
  isAniVisible: boolean
  isActivated: boolean
}

export interface TreeSelectInternalData {
  hpTimeout?: undefined | number
  fullOptionList: any[]
  fullNodeMaps: Record<string, {
    item: any
    index: number
    items: any[]
    parent: any
    nodes: any[]
  }>
}

export interface TreeSelectMethods {
  dispatchEvent(type: ValueOf<VxeTreeSelectEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeTreeSelectMethods extends TreeSelectMethods { }

export interface TreeSelectPrivateMethods { }
export interface VxeTreeSelectPrivateMethods extends TreeSelectPrivateMethods { }

export type VxeTreeSelectEmits = [
  'update:modelValue',
  'change',
  'all-change',
  'clear',
  'blur',
  'focus',
  'click',
  'node-click'
]

export namespace VxeTreeSelectDefines {
  export interface TreeSelectEventParams extends VxeComponentEventParams {
    $treeSelect: VxeTreeSelectConstructor
  }

  export interface ChangeEventParams<D = any> extends TreeSelectEventParams {
    value: any
    option: D
  }

  export interface ClearEventParams extends TreeSelectEventParams {
    value: any
  }

  export interface FocusEventParams extends TreeSelectEventParams { }
  export interface BlurEventParams extends TreeSelectEventParams { }
  export interface ClickEventParams extends TreeSelectEventParams { }
}

export interface VxeTreeSelectEventProps<D = any> {
  'onUpdate:modelValue'?: VxeTreeSelectEvents.UpdateModelValue
  onChange?: VxeTreeSelectEvents.Change<D>
  onClear?: VxeTreeSelectEvents.Clear
  onFocus?: VxeTreeSelectEvents.Focus
  onBlur?: VxeTreeSelectEvents.Blur
  onClick?: VxeTreeSelectEvents.Click
}

export interface VxeTreeSelectListeners<D = any> {
  'update:modelValue'?: VxeTreeSelectEvents.UpdateModelValue
  change?: VxeTreeSelectEvents.Change<D>
  clear?: VxeTreeSelectEvents.Clear
  focus?: VxeTreeSelectEvents.Focus
  blur?: VxeTreeSelectEvents.Blur
  click?: VxeTreeSelectEvents.Click
}

export namespace VxeTreeSelectEvents {
  export type UpdateModelValue = (modelValue: VxeTreeSelectPropTypes.ModelValue) => void
  export type Change<D = any> = (params: VxeTreeSelectDefines.ChangeEventParams<D>) => void
  export type Clear = (params: VxeTreeSelectDefines.ClearEventParams) => void
  export type Focus = (params: VxeTreeSelectDefines.FocusEventParams) => void
  export type Blur = (params: VxeTreeSelectDefines.BlurEventParams) => void
  export type Click = (params: VxeTreeSelectDefines.ClickEventParams) => void
}

export namespace VxeTreeSelectSlotTypes {
  export interface DefaultSlotParams {
    node: any
    isExpand: boolean
  }

  export interface PrefixSlotParams {}
  export interface HeaderSlotParams {}
  export interface FooterSlotParams {}
}

export interface VxeTreeSelectSlots {
  [key: string]: ((params: VxeTreeSelectSlotTypes.DefaultSlotParams) => any) | undefined

  prefix?: (params: VxeTreeSelectSlotTypes.PrefixSlotParams) => any
  header?: (params: VxeTreeSelectSlotTypes.HeaderSlotParams) => any
  footer?: (params: VxeTreeSelectSlotTypes.FooterSlotParams) => any
}

export const TreeSelect: typeof VxeTreeSelect
export default VxeTreeSelect
