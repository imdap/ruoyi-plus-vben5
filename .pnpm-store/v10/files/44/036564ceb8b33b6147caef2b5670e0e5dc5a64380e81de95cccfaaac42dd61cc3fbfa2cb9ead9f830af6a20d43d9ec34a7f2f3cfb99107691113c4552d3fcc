import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, VxeComponentSizeType, VxeComponentStyleType, ValueOf } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxePulldown: DefineVxeComponentApp<VxePulldownProps, VxePulldownEventProps, VxePulldownSlots, VxePulldownMethods>
export type VxePulldownComponent = DefineVxeComponentOptions<VxePulldownProps, VxePulldownEventProps>

export type VxePulldownInstance = DefineVxeComponentInstance<VxePulldownProps, VxePulldownConstructor>

export interface VxePulldownConstructor extends VxeComponentBaseOptions, VxePulldownMethods {
  props: VxePulldownProps
  context: SetupContext<VxePulldownEmits>
  reactData: PulldownReactData
  getRefMaps(): PulldownPrivateRef
  getComputeMaps(): PulldownPrivateComputed
  renderVN: RenderFunction
}

export interface PulldownPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxePulldownPrivateRef extends PulldownPrivateRef { }

export namespace VxePulldownPropTypes {
  export type ModelValue = boolean
  export type Size = VxeComponentSizeType
  export type Disabled = boolean
  /**
   * 已废弃，请使用 PopupConfig.zIndex
   * @deprecated
   */
  export type ZIndex = number
  export type Placement = '' | 'top' | 'bottom'
  /**
   * 已废弃，请使用 PopupConfig.trigger
   * @deprecated
   */
  export type Trigger = '' | 'manual' | 'click'
  export interface Option {
    label?: string | number
    value?: string | number
    disabled?: string | number
  }
  export type Options = Option[]
  export type ClassName = string | ((params: { $pulldown: VxePulldownConstructor }) => string)
  /**
   * 已废弃，请使用 PopupConfig.className
   * @deprecated
   */
  export type PopupClassName = string | ((params: { $pulldown: VxePulldownConstructor }) => string)
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
    trigger?: 'click' | 'manual' | 'default' | '' | null
    transfer?: boolean
    width?: number | string
    height?: number | string
    zIndex?: number | string
    className?: string | ((params: { $pulldown: VxePulldownConstructor }) => string)
  }
  export type ShowPopupShadow = boolean
  export type DestroyOnClose = boolean
  export type Transfer = boolean
}

export interface VxePulldownProps {
  size?: VxePulldownPropTypes.Size
  modelValue?: VxePulldownPropTypes.ModelValue
  /**
   * 是否禁用
   */
  disabled?: VxePulldownPropTypes.Disabled
  /**
   * 已废弃，请使用 popup-config.zIndex
   * @deprecated
   */
  zIndex?: VxePulldownPropTypes.ZIndex
  options?: VxePulldownPropTypes.Options
  className?: VxePulldownPropTypes.ClassName
  /**
   * 已废弃，请使用 popup-config.className
   * @deprecated
   */
  popupClassName?: VxePulldownPropTypes.PopupClassName
  /**
   * 固定显示下拉面板的方向
   */
  placement?: VxePulldownPropTypes.Placement
  /**
   * 已废弃，请使用 popup-config.trigger
   * @deprecated
   */
  trigger?: VxePulldownPropTypes.Trigger
  popupConfig?: VxePulldownPropTypes.PopupConfig
  showPopupShadow?: VxePulldownPropTypes.ShowPopupShadow
  /**
   * 在下拉容器关闭时销毁内容
   */
  destroyOnClose?: VxePulldownPropTypes.DestroyOnClose
  /**
   * 是否将弹框容器插入于 body 内（对于嵌入到表格或者弹窗中被遮挡时需要设置为 true）
   */
  transfer?: VxePulldownPropTypes.Transfer
}

export interface PulldownPrivateComputed {
}
export interface VxePulldownPrivateComputed extends PulldownPrivateComputed { }

export interface PulldownReactData {
  initialized: boolean
  panelIndex: number
  panelStyle: VxeComponentStyleType
  panelPlacement: string | null
  visiblePanel: boolean
  isAniVisible: boolean
  isActivated: boolean
}

export interface PulldownInternalData {
  hpTimeout?: undefined | number
}

export interface PulldownMethods {
  dispatchEvent(type: ValueOf<VxePulldownEmits>, params: Record<string, any>, evnt: Event | null): void
  /**
   * 判断下拉面板是否可视
   */
  isPanelVisible(): boolean

  /**
   * 切换下拉面板
   */
  togglePanel(): Promise<void>

  /**
   * 显示下拉面板
   */
  showPanel(): Promise<void>

  /**
   * 隐藏下拉面板
   */
  hidePanel(): Promise<void>
}
export interface VxePulldownMethods extends PulldownMethods { }

export interface PulldownPrivateMethods { }
export interface VxePulldownPrivateMethods extends PulldownPrivateMethods { }

export type VxePulldownEmits = [
  'update:modelValue',
  'click',
  'option-click',
  'show-panel',
  'hide-panel',
  'visible-change'
]

export namespace VxePulldownDefines {
  export interface PulldownEventParams extends VxeComponentEventParams {
    $pulldown: VxePulldownConstructor
  }

  export interface ClickEventParams extends PulldownEventParams {}

  export interface OptionClickEventParams extends PulldownEventParams {
    option: VxePulldownPropTypes.Option
  }

  export interface ShowPanelEventParams extends PulldownEventParams {}
  export interface HidePanelEventParams extends PulldownEventParams {}

  export interface VisibleChangeEventParams extends PulldownEventParams {
    visible: boolean
  }
}

export type VxePulldownEventProps = {
  onClick?: VxePulldownEvents.Click
  onOptionClick?: VxePulldownEvents.OptionClick
  onShowPanel?: VxePulldownEvents.ShowPanel
  onHidePanel?: VxePulldownEvents.HidePanel
  onVisibleChange?: VxePulldownEvents.VisibleChange
}

export interface VxePulldownListeners {
  click?: VxePulldownEvents.Click
  optionClick?: VxePulldownEvents.OptionClick
  showPanel?: VxePulldownEvents.ShowPanel
  hidePanel?: VxePulldownEvents.HidePanel
  visibleChange?: VxePulldownEvents.VisibleChange
}

export namespace VxePulldownEvents {
  export type Click = (params: VxePulldownDefines.ClickEventParams) => void
  export type OptionClick = (params: VxePulldownDefines.OptionClickEventParams) => void
  export type ShowPanel = (params: VxePulldownDefines.ShowPanelEventParams) => void
  export type HidePanel = (params: VxePulldownDefines.HidePanelEventParams) => void
  export type VisibleChange = (params: VxePulldownDefines.VisibleChangeEventParams) => void
}

export namespace VxePulldownSlotTypes {
  export interface DefaultSlotParams {
    [key: string]: any
  }
  export interface OptionSlotParams {
    option: any
  }
}

export interface VxePulldownSlots {
  header?: (params: VxePulldownSlotTypes.DefaultSlotParams) => any
  default?: (params: VxePulldownSlotTypes.DefaultSlotParams) => any
  option?: (params: VxePulldownSlotTypes.OptionSlotParams) => any
  footer?: (params: VxePulldownSlotTypes.DefaultSlotParams) => any
  dropdown?: (params: VxePulldownSlotTypes.DefaultSlotParams) => any
}

export const Pulldown: typeof VxePulldown
export default VxePulldown
