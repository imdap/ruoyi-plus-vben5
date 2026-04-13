import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentSizeType, VxeComponentStatusType, VxeComponentBaseOptions, VxeComponentEventParams } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeRate: DefineVxeComponentApp<VxeRateProps, VxeRateEventProps, VxeRateSlots, VxeRateMethods>
export type VxeRateComponent = DefineVxeComponentOptions<VxeRateProps, VxeRateEventProps>

export type VxeRateInstance = DefineVxeComponentInstance<VxeRateProps, VxeRateConstructor>

export interface VxeRateConstructor extends VxeComponentBaseOptions, VxeRateMethods {
  props: VxeRateProps
  context: SetupContext<VxeRateEmits>
  reactData: RateReactData
  getRefMaps(): RatePrivateRef
  getComputeMaps(): RatePrivateComputed
  renderVN: RenderFunction
}

export interface RatePrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeRatePrivateRef extends RatePrivateRef { }

export namespace VxeRatePropTypes {
  export type Size = VxeComponentSizeType
  export type ModelValue = undefined | null | number | string
  export type Readonly = boolean
  export type Disabled = boolean
  export type Status = VxeComponentStatusType
}

export interface VxeRateProps {
  size?: VxeRatePropTypes.Size
  modelValue?: VxeRatePropTypes.ModelValue
  readonly?: VxeRatePropTypes.Readonly
  disabled?: VxeRatePropTypes.Disabled
  status?: VxeRatePropTypes.Status
}

export interface RatePrivateComputed {
}
export interface VxeRatePrivateComputed extends RatePrivateComputed { }

export interface RateReactData {
  activeValue: VxeRatePropTypes.ModelValue | null
}

export interface RateMethods {
}
export interface VxeRateMethods extends RateMethods { }

export interface RatePrivateMethods { }
export interface VxeRatePrivateMethods extends RatePrivateMethods { }

export type VxeRateEmits = [
  'update:modelValue',
  'change'
]

export namespace VxeRateDefines {
  export interface RateEventParams extends VxeComponentEventParams {
    $rate: VxeRateConstructor
  }
}

export type VxeRateEventProps = {
  'onUpdate:modelValue'?: VxeRateEvents.UpdateModelValue
}

export interface VxeRateListeners {
  'update:modelValue'?: VxeRateEvents.UpdateModelValue
}

export namespace VxeRateEvents {
  export type UpdateModelValue = (modelValue: VxeRatePropTypes.ModelValue) => void
}

export namespace VxeRateSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeRateSlots {
  default?: (params: VxeRateSlotTypes.DefaultSlotParams) => any
}

export const Rate: typeof VxeRate
export default VxeRate
