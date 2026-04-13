import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf } from '@vxe-ui/core'
import { VxeAnchorLinkProps, VxeAnchorLinkPropTypes, VxeAnchorLinkDefines } from './anchor-link'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeAnchor: DefineVxeComponentApp<VxeAnchorProps, VxeAnchorEventProps, VxeAnchorSlots, VxeAnchorMethods>
export type VxeAnchorComponent = DefineVxeComponentOptions<VxeAnchorProps, VxeAnchorEventProps>

export type VxeAnchorInstance = DefineVxeComponentInstance<VxeAnchorProps, VxeAnchorConstructor>

export interface VxeAnchorConstructor extends VxeComponentBaseOptions, VxeAnchorMethods {
  props: VxeAnchorProps
  context: SetupContext<VxeAnchorEmits>
  reactData: AnchorReactData
  getRefMaps(): AnchorPrivateRef
  getComputeMaps(): AnchorPrivateComputed
  renderVN: RenderFunction
}

export interface AnchorPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeAnchorPrivateRef extends AnchorPrivateRef { }

export namespace VxeAnchorPropTypes {
  export type ModelValue = string | null
  export type Options = VxeAnchorLinkProps[]
  export type Container = string | HTMLElement | ((params: {
    $anchor: VxeAnchorConstructor
  }) => HTMLElement)
  export type ShowMarker = boolean
}

export type VxeAnchorProps = {
  modelValue?: VxeAnchorPropTypes.ModelValue
  options?: VxeAnchorPropTypes.Options
  container?: VxeAnchorPropTypes.Container
  showMarker?: VxeAnchorPropTypes.ShowMarker
}

export interface AnchorPrivateComputed {
}
export interface VxeAnchorPrivateComputed extends AnchorPrivateComputed { }

export interface AnchorReactData {
  activeHref: VxeAnchorPropTypes.ModelValue | undefined
  staticLinks: VxeAnchorLinkDefines.LinkConfig[]
  containerElem: HTMLElement | null
}

export interface AnchorMethods {
  dispatchEvent(type: ValueOf<VxeAnchorEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeAnchorMethods extends AnchorMethods { }

export interface AnchorPrivateMethods {
  handleClickLink(evnt: KeyboardEvent, href?: VxeAnchorLinkPropTypes.Href): void
}
export interface VxeAnchorPrivateMethods extends AnchorPrivateMethods { }

export type VxeAnchorEmits = [
  'update:modelValue',
  'change',
  'click'
]

export namespace VxeAnchorDefines {
  export interface AnchorEventParams extends VxeComponentEventParams {
    $anchor: VxeAnchorConstructor
  }

  export interface ChangeEventParams extends AnchorEventParams {}
  export interface ClickEventParams extends AnchorEventParams {}
}

export type VxeAnchorEventProps = {
  'onUpdate:modelValue'?: VxeAnchorEvents.UpdateModelValue
  onChange?: VxeAnchorEvents.Change
  onClick?: VxeAnchorEvents.Click
}

export interface VxeAnchorListeners {
  'update:modelValue'?: VxeAnchorEvents.UpdateModelValue
  change?: VxeAnchorEvents.Change
  click?: VxeAnchorEvents.Click
}

export namespace VxeAnchorEvents {
  export type UpdateModelValue = (modelValue: VxeAnchorPropTypes.ModelValue) => void
  export type Change = (params: VxeAnchorDefines.ChangeEventParams) => void
  export type Click = (params: VxeAnchorDefines.ClickEventParams) => void
}

export namespace VxeAnchorSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeAnchorSlots {
  default?: (params: VxeAnchorSlotTypes.DefaultSlotParams) => any
}

export const Anchor: typeof VxeAnchor
export default VxeAnchor
