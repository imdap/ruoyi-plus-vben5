import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, VxeComponentSizeType, VxeComponentStyleType, ValueOf } from '@vxe-ui/core'
import { VxeIconPropTypes } from './icon'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeTooltip: DefineVxeComponentApp<VxeTooltipProps, VxeTooltipEventProps, VxeTooltipSlots, VxeTooltipMethods>
export type VxeTooltipComponent = DefineVxeComponentOptions<VxeTooltipProps, VxeTooltipEventProps>

export type VxeTooltipInstance = DefineVxeComponentInstance<VxeTooltipProps, VxeTooltipConstructor>

export interface VxeTooltipConstructor extends VxeComponentBaseOptions, VxeTooltipMethods {
  props: VxeTooltipProps
  context: SetupContext<VxeTooltipEmits>
  reactData: TooltipReactData
  getRefMaps(): TooltipPrivateRef
  getComputeMaps(): TooltipPrivateComputed
  renderVN: RenderFunction
}

export interface TooltipPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeTooltipPrivateRef extends TooltipPrivateRef { }

export namespace VxeTooltipPropTypes {
  export type Size = VxeComponentSizeType
  export type ModelValue = boolean
  export type Selector = string | HTMLElement
  export type Trigger = 'hover' | 'click' | 'manual' | '' | null
  export type Theme = '' | 'light' | 'dark'
  export type Content = string | number
  export type UseHTML = boolean
  export type ZIndex = string | number
  export type PopupClassName = string | ((params: { $tooltip: VxeTooltipConstructor }) => string)
  export type Width = string | number
  export type Height = string | number
  export type MinWidth = string | number
  export type MinHeight = string | number
  export type MaxWidth = string | number
  export type MaxHeight = string | number
  export type Placement = 'top' | 'bottom' | ''
  export type DefaultPlacement = 'top' | 'bottom' | ''
  export type IsArrow = boolean
  export type Enterable = boolean
  export type EnterDelay = number
  export type LeaveDelay = number
  export type LeaveMethod = (params: { $event: MouseEvent }) => boolean
}

export interface VxeTooltipProps {
  size?: VxeTooltipPropTypes.Size
  modelValue?: VxeTooltipPropTypes.ModelValue
  selector?: VxeTooltipPropTypes.Selector
  trigger?: VxeTooltipPropTypes.Trigger
  theme?: VxeTooltipPropTypes.Theme
  content?: VxeTooltipPropTypes.Content
  useHTML?: VxeTooltipPropTypes.UseHTML
  popupClassName?: VxeTooltipPropTypes.PopupClassName
  Width?: VxeTooltipPropTypes.Width
  height?: VxeTooltipPropTypes.Height
  minWidth?: VxeTooltipPropTypes.MinWidth
  minHeight?: VxeTooltipPropTypes.MinHeight
  maxWidth?: VxeTooltipPropTypes.MaxWidth
  maxHeight?: VxeTooltipPropTypes.MaxHeight
  zIndex?: VxeTooltipPropTypes.ZIndex
  placement?: VxeTooltipPropTypes.Placement
  defaultPlacement?: VxeTooltipPropTypes.DefaultPlacement
  isArrow?: VxeTooltipPropTypes.IsArrow
  enterable?: VxeTooltipPropTypes.Enterable
  enterDelay?: VxeTooltipPropTypes.EnterDelay
  leaveDelay?: VxeTooltipPropTypes.LeaveDelay
  leaveMethod?: VxeTooltipPropTypes.LeaveMethod
}

export interface TooltipPrivateComputed {
}
export interface VxeTooltipPrivateComputed extends TooltipPrivateComputed { }

export interface TooltipReactData {
  target: HTMLElement | null
  isUpdate: boolean
  visible: boolean
  tipPos: null | {
    x: number
    y: number
    oLeft: number
    oTop: number
  }
  tipContent: string | number | undefined
  tipActive: boolean
  tipTarget: HTMLElement | null
  tipZindex: number
  tipStore: {
    style: VxeComponentStyleType
    placement: any
    arrowStyle: VxeComponentStyleType
  }
}

export interface TooltipInternalData {
  showDelayTip?(): any
}

export interface TooltipMethods {
  dispatchEvent(type: ValueOf<VxeTooltipEmits>, params: Record<string, any>, evnt: Event | null): void
  /**
   * 显示
   */
  openByEvent(evnt: Event, target?: any, content?: VxeTooltipPropTypes.Content): Promise<void>
  /**
   * 显示
   */
  open(target?: any, content?: VxeTooltipPropTypes.Content): Promise<void>
  /**
   * 已废弃，请使用 open
   * @deprecated
   */
  toVisible(target?: HTMLElement, content?: VxeTooltipPropTypes.Content): Promise<void>
  /**
   * 隐藏
   */
  close(): Promise<any>
  updatePlacement(): Promise<any>
  isActived(): boolean
  setActived(actived: boolean): void
}
export interface VxeTooltipMethods extends TooltipMethods { }

export interface TooltipPrivateMethods { }
export interface VxeTooltipPrivateMethods extends TooltipPrivateMethods { }

export type VxeTooltipEmits = [
  'update:modelValue'
]

export namespace VxeTooltipDefines {
  export interface TooltipEventParams extends VxeComponentEventParams {
    $tooltip: VxeTooltipConstructor
  }

  export interface TooltipHelperOption {
    useHTML?: VxeTooltipPropTypes.UseHTML
    content?: VxeTooltipPropTypes.Content
    enterable?: VxeTooltipPropTypes.Enterable
    theme?: VxeTooltipPropTypes.Theme
    icon?: VxeIconPropTypes.ClassName
    iconStatus?: VxeIconPropTypes.Status

    /**
     * 已废弃，请使用 content
     * @deprecated
     */
    message?: string
  }
}

export type VxeTooltipEventProps = {
  'onUpdate:modelValue'?: VxeTooltipEvents.UpdateModelValue
}

export interface VxeTooltipListeners {
  'update:modelValue'?: VxeTooltipEvents.UpdateModelValue
}

export namespace VxeTooltipEvents {
  export type UpdateModelValue = (modelValue: VxeTooltipPropTypes.ModelValue) => void
}

export namespace VxeTooltipSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeTooltipSlots {
  default?: (params: VxeTooltipSlotTypes.DefaultSlotParams) => any
  content?: (params: VxeTooltipSlotTypes.DefaultSlotParams) => any
}

export const Tooltip: typeof VxeTooltip
export default VxeTooltip
