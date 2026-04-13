import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, VxeComponentSizeType, ValueOf } from '@vxe-ui/core'
import { VxeTreeProps, VxeTreePropTypes } from './tree'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeCascader: DefineVxeComponentApp<VxeCascaderProps, VxeCascaderEventProps, VxeCascaderSlots, VxeCascaderMethods>
export type VxeCascaderComponent = DefineVxeComponentOptions<VxeCascaderProps, VxeCascaderEventProps>

export type VxeCascaderInstance = DefineVxeComponentInstance<VxeCascaderProps, VxeCascaderConstructor>

export interface VxeCascaderConstructor extends VxeComponentBaseOptions, VxeCascaderMethods {
  props: VxeCascaderProps
  context: SetupContext<VxeCascaderEmits>
  reactData: CascaderReactData
  getRefMaps(): CascaderPrivateRef
  getComputeMaps(): CascaderPrivateComputed
  renderVN: RenderFunction
}

export interface CascaderPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeCascaderPrivateRef extends CascaderPrivateRef { }

export namespace VxeCascaderPropTypes {
  export type Size = VxeComponentSizeType
  export type ModelValue = any
  export type Clearable = boolean
  export type ZIndex = number
  export type Placeholder = string
  export type Readonly = boolean
  export type Loading = boolean
  export type Disabled = boolean
  export type AutoClose = boolean
  export type ShowTotalButoon = boolean
  export type ShowCheckedButoon = boolean
  export type ShowClearButton = boolean
  export type ClassName = string | ((params: { $cascader: VxeCascaderConstructor }) => string)
  /**
   * 已废弃，请使用 VxeCascaderPropTypes.PopupConfig
   * @deprecated
   */
  export type PopupClassName = string | ((params: { $cascader: VxeCascaderConstructor }) => string)
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
  export type Transform = boolean
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
      $cascader: VxeCascaderConstructor
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
    width?: number | string
    height?: number | string
    itemWidth?: number | string
    itemHeight?: number | string
    className?: string | ((params: { $cascader: VxeCascaderConstructor }) => string)
  }
  export type TreeConfig<D = any> = Omit<VxeTreeProps<D>, 'data' | 'size'>
}

export interface VxeCascaderProps<D = any> {
  size?: VxeCascaderPropTypes.Size
  modelValue?: VxeCascaderPropTypes.ModelValue
  clearable?: VxeCascaderPropTypes.Clearable
  zIndex?: VxeCascaderPropTypes.ZIndex
  placeholder?: VxeCascaderPropTypes.Placeholder
  readonly?: VxeCascaderPropTypes.Readonly
  loading?: VxeCascaderPropTypes.Loading
  disabled?: VxeCascaderPropTypes.Disabled
  autoClose?: VxeCascaderPropTypes.AutoClose
  showTotalButoon?: VxeCascaderPropTypes.ShowTotalButoon
  showCheckedButoon?: VxeCascaderPropTypes.ShowCheckedButoon
  showClearButton?: VxeCascaderPropTypes.ShowClearButton
  className?: VxeCascaderPropTypes.ClassName
  multiple?: VxeCascaderPropTypes.Multiple
  prefixIcon?: VxeCascaderPropTypes.PrefixIcon
  placement?: VxeCascaderPropTypes.Placement
  filterable?: VxeCascaderPropTypes.Filterable
  filterConfig?: VxeCascaderPropTypes.FilterConfig
  transform?: VxeCascaderPropTypes.Transform
  lazyOptions?: VxeCascaderPropTypes.LazyOptions<D>
  options?: VxeCascaderPropTypes.Options<D>
  optionProps?: VxeCascaderPropTypes.OptionProps
  remote?: VxeCascaderPropTypes.Remote
  remoteConfig?: VxeCascaderPropTypes.RemoteConfig
  transfer?: VxeCascaderPropTypes.Transfer
  popupConfig?: VxeCascaderPropTypes.PopupConfig
  treeConfig?: VxeCascaderPropTypes.TreeConfig<D>

  /**
   * 已废弃，被 remote-config.queryMethod 替换
   * @deprecated
   */
  remoteMethod?: VxeCascaderPropTypes.RemoteMethod
  /**
   * 已废弃，请使用 popup-config.className
   * @deprecated
   */
  popupClassName?: VxeCascaderPropTypes.PopupClassName
}

export interface CascaderPrivateComputed {
}
export interface VxeCascaderPrivateComputed extends CascaderPrivateComputed { }

export interface CascaderReactData {
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

export interface CascaderInternalData {
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

export interface CascaderMethods {
  dispatchEvent(type: ValueOf<VxeCascaderEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeCascaderMethods extends CascaderMethods { }

export interface CascaderPrivateMethods { }
export interface VxeCascaderPrivateMethods extends CascaderPrivateMethods { }

export type VxeCascaderEmits = [
  'update:modelValue',
  'change',
  'all-change',
  'clear',
  'blur',
  'focus',
  'click',
  'node-click'
]

export namespace VxeCascaderDefines {
  export interface CascaderEventParams extends VxeComponentEventParams {
    $cascader: VxeCascaderConstructor
  }

  export interface ChangeEventParams<D = any> extends CascaderEventParams {
    value: any
    option: D
  }

  export interface ClearEventParams extends CascaderEventParams {
    value: any
  }

  export interface FocusEventParams extends CascaderEventParams { }
  export interface BlurEventParams extends CascaderEventParams { }
  export interface ClickEventParams extends CascaderEventParams { }
}

export interface VxeCascaderEventProps<D = any> {
  'onUpdate:modelValue'?: VxeCascaderEvents.UpdateModelValue
  onChange?: VxeCascaderEvents.Change<D>
  onClear?: VxeCascaderEvents.Clear
  onFocus?: VxeCascaderEvents.Focus
  onBlur?: VxeCascaderEvents.Blur
  onClick?: VxeCascaderEvents.Click
}

export interface VxeCascaderListeners<D = any> {
  'update:modelValue'?: VxeCascaderEvents.UpdateModelValue
  change?: VxeCascaderEvents.Change<D>
  clear?: VxeCascaderEvents.Clear
  focus?: VxeCascaderEvents.Focus
  blur?: VxeCascaderEvents.Blur
  click?: VxeCascaderEvents.Click
}

export namespace VxeCascaderEvents {
  export type UpdateModelValue = (modelValue: VxeCascaderPropTypes.ModelValue) => void
  export type Change<D = any> = (params: VxeCascaderDefines.ChangeEventParams<D>) => void
  export type Clear = (params: VxeCascaderDefines.ClearEventParams) => void
  export type Focus = (params: VxeCascaderDefines.FocusEventParams) => void
  export type Blur = (params: VxeCascaderDefines.BlurEventParams) => void
  export type Click = (params: VxeCascaderDefines.ClickEventParams) => void
}

export namespace VxeCascaderSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeCascaderSlots {
  default?: (params: VxeCascaderSlotTypes.DefaultSlotParams) => any
}

export const Cascader: typeof VxeCascader
export default VxeCascader
