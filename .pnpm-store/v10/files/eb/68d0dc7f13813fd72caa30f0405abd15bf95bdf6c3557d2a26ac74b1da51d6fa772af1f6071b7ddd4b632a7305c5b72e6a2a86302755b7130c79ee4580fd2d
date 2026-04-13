import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf, VxeComponentStatusType, VxeComponentSizeType } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeBacktop: DefineVxeComponentApp<VxeBacktopProps, VxeBacktopEventProps, VxeBacktopSlots, VxeBacktopMethods>
export type VxeBacktopComponent = DefineVxeComponentOptions<VxeBacktopProps, VxeBacktopEventProps>

export type VxeBacktopInstance = DefineVxeComponentInstance<VxeBacktopProps, VxeBacktopConstructor>

export interface VxeBacktopConstructor extends VxeComponentBaseOptions, VxeBacktopMethods {
  props: VxeBacktopProps
  context: SetupContext<VxeBacktopEmits>
  internalData: BacktopInternalData
  reactData: BacktopReactData
  getRefMaps(): BacktopPrivateRef
  getComputeMaps(): BacktopPrivateComputed
  renderVN: RenderFunction
}

export interface BacktopPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeBacktopPrivateRef extends BacktopPrivateRef { }

export namespace VxeBacktopPropTypes {
  export type Target = string
  export type Size = VxeComponentSizeType
  export type Right = string | number
  export type Bottom = string | number
  export type Circle = boolean
  export type Icon = string
  export type ShowIcon = boolean
  export type ShowTop = boolean
  export type ShowBottom = boolean
  export type Content = string | number
  export type ShowContent = boolean
  export type Shadow = boolean
  export type Status = VxeComponentStatusType
  export type ZIndex = string | number
  export type Threshold = string | number
  export type Position = null | '' | 'absolute' | 'fixed'
}

export interface VxeBacktopProps {
  target?: VxeBacktopPropTypes.Target
  size?: VxeBacktopPropTypes.Size
  right?: VxeBacktopPropTypes.Right
  bottom?: VxeBacktopPropTypes.Bottom
  circle?: VxeBacktopPropTypes.Circle
  icon?: VxeBacktopPropTypes.Icon
  showIcon?: VxeBacktopPropTypes.ShowIcon
  showTop?: VxeBacktopPropTypes.ShowTop
  showBottom?: VxeBacktopPropTypes.ShowBottom
  content?: VxeBacktopPropTypes.Content
  showContent?: VxeBacktopPropTypes.ShowContent
  shadow?: VxeBacktopPropTypes.Shadow
  status?: VxeBacktopPropTypes.Status
  zIndex?: VxeBacktopPropTypes.ZIndex
  threshold?: VxeBacktopPropTypes.Threshold
  position?: VxeBacktopPropTypes.Position
}

export interface BacktopPrivateComputed {
}
export interface VxeBacktopPrivateComputed extends BacktopPrivateComputed { }

export interface BacktopInternalData {
  targetEl: HTMLElement | null
}

export interface BacktopReactData {
  showBtn: boolean
  backtopZindex: number
}

export interface BacktopMethods {
  dispatchEvent(type: ValueOf<VxeBacktopEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeBacktopMethods extends BacktopMethods { }

export interface BacktopPrivateMethods { }
export interface VxeBacktopPrivateMethods extends BacktopPrivateMethods { }

export type VxeBacktopEmits = [
  'click'
]

export namespace VxeBacktopDefines {
  export interface BacktopEventParams extends VxeComponentEventParams {
    $backtop: VxeBacktopConstructor
  }

  export interface ClickEventParams extends BacktopEventParams { }
}

export type VxeBacktopEventProps = {
  onClick?: VxeBacktopEvents.Click
}

export interface VxeBacktopListeners {
  click?: VxeBacktopEvents.Click
}

export namespace VxeBacktopEvents {
  export type Click = (params: VxeBacktopDefines.ClickEventParams) => void
}

export namespace VxeBacktopSlotTypes {
  export interface DefaultSlotParams {}
  export interface TopSlotParams {}
  export interface BottomParams {}
}

export interface VxeBacktopSlots {
  default?: (params: VxeBacktopSlotTypes.DefaultSlotParams) => any
  top?: (params: VxeBacktopSlotTypes.TopSlotParams) => any
  bottom?: (params: VxeBacktopSlotTypes.BottomParams) => any
}

export const Backtop: typeof VxeBacktop
export default VxeBacktop
