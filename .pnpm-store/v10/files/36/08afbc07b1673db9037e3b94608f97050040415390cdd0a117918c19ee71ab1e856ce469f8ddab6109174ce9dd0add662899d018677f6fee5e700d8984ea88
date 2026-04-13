import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf, VxeComponentSizeType } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeTour: DefineVxeComponentApp<VxeTourProps, VxeTourEventProps, VxeTourSlots, VxeTourMethods>
export type VxeTourComponent = DefineVxeComponentOptions<VxeTourProps, VxeTourEventProps>

export type VxeTourInstance = DefineVxeComponentInstance<VxeTourProps, VxeTourConstructor>

export interface VxeTourConstructor extends VxeComponentBaseOptions, VxeTourMethods {
  props: VxeTourProps
  context: SetupContext<VxeTourEmits>
  reactData: TourReactData
  getRefMaps(): TourPrivateRef
  getComputeMaps(): TourPrivateComputed
  renderVN: RenderFunction
}

export interface TourPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeTourPrivateRef extends TourPrivateRef { }

export namespace VxeTourPropTypes {
  export type Size = VxeComponentSizeType
}

export type VxeTourProps = {
  size?: VxeTourPropTypes.Size
}

export interface TourPrivateComputed {
}
export interface VxeTourPrivateComputed extends TourPrivateComputed { }

export interface TourReactData {
}

export interface TourMethods {
  dispatchEvent(type: ValueOf<VxeTourEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeTourMethods extends TourMethods { }

export interface TourPrivateMethods { }
export interface VxeTourPrivateMethods extends TourPrivateMethods { }

export type VxeTourEmits = [
]

export namespace VxeTourDefines {
  export interface TourEventParams extends VxeComponentEventParams {
    $tour: VxeTourConstructor
  }

  export interface ClickEventParams extends TourEventParams { }
  export interface CloseEventParams extends TourEventParams { }
}

export type VxeTourEventProps = {
}

export interface VxeTourListeners {
}

export namespace VxeTourEvents {
}

export namespace VxeTourSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeTourSlots {
}

export const Tour: typeof VxeTour
export default VxeTour
