import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, VxeComponentSizeType, ValueOf, VxeComponentStatusType } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeTag: DefineVxeComponentApp<VxeTagProps, VxeTagEventProps, VxeTagSlots, VxeTagMethods>
export type VxeTagComponent = DefineVxeComponentOptions<VxeTagProps, VxeTagEventProps>

export type VxeTagInstance = DefineVxeComponentInstance<VxeTagProps, VxeTagConstructor>

export interface VxeTagConstructor extends VxeComponentBaseOptions, VxeTagMethods {
  props: VxeTagProps
  context: SetupContext<VxeTagEmits>
  reactData: TagReactData
  getRefMaps(): TagPrivateRef
  getComputeMaps(): TagPrivateComputed
  renderVN: RenderFunction
}

export interface TagPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeTagPrivateRef extends TagPrivateRef { }

export namespace VxeTagPropTypes {
  export type Border = boolean
  export type Status = VxeComponentStatusType
  export type Visible = boolean
  export type Title = string | number
  export type Icon = string
  export type CloseIcon = string
  export type Content = string | number
  export type Round = boolean
  export type Size = VxeComponentSizeType
  export type Closable = boolean
  export type Color = 'gray' | 'orangered' | 'orange' | 'green' | 'blue' | 'purple' | 'pinkpurple' | 'magenta' | 'chocolate' | 'cyan'
  export type Loading = boolean
}

export type VxeTagProps = {
  border?: VxeTagPropTypes.Border
  status?: VxeTagPropTypes.Status
  visible?: VxeTagPropTypes.Visible
  title?: VxeTagPropTypes.Title
  icon?: VxeTagPropTypes.Icon
  closeIcon?: VxeTagPropTypes.CloseIcon
  content?: VxeTagPropTypes.Content
  round?: VxeTagPropTypes.Round
  size?: VxeTagPropTypes.Size
  closable?: VxeTagPropTypes.Closable
  color?: VxeTagPropTypes.Color
  loading?: VxeTagPropTypes.Loading
}

export interface TagPrivateComputed {
}
export interface VxeTagPrivateComputed extends TagPrivateComputed { }

export interface TagReactData {
  showTag: boolean
}

export interface TagMethods {
  dispatchEvent(type: ValueOf<VxeTagEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeTagMethods extends TagMethods { }

export interface TagPrivateMethods { }
export interface VxeTagPrivateMethods extends TagPrivateMethods { }

export type VxeTagEmits = [
  'click',
  'dblclick',
  'close',
  'update:visible'
]

export namespace VxeTagDefines {
  export interface TagEventParams extends VxeComponentEventParams {
    $tag: VxeTagConstructor
  }

  export interface ClickEventParams extends TagEventParams { }
  export interface CloseEventParams extends TagEventParams { }
}

export type VxeTagEventProps = {
  onClick?: VxeTagEvents.Click
  onClose?: VxeTagEvents.Close
}

export interface VxeTagListeners {
  click?: VxeTagEvents.Click
  close?: VxeTagEvents.Close
}

export namespace VxeTagEvents {
  export type Click = (params: VxeTagDefines.ClickEventParams) => void
  export type Close = (params: VxeTagDefines.CloseEventParams) => void
}

export namespace VxeTagSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeTagSlots {
  default?: (params: VxeTagSlotTypes.DefaultSlotParams) => any
  icon?: (params: VxeTagSlotTypes.DefaultSlotParams) => any
  closeIcon?: (params: VxeTagSlotTypes.DefaultSlotParams) => any
  'close-icon'?: (params: VxeTagSlotTypes.DefaultSlotParams) => any
}

export const Tag: typeof VxeTag
export default VxeTag
