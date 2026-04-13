import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentStatusType, VxeComponentSizeType, VxeComponentBaseOptions, VxeComponentEventParams } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeSlider: DefineVxeComponentApp<VxeSliderProps, VxeSliderEventProps, VxeSliderSlots, VxeSliderMethods>
export type VxeSliderComponent = DefineVxeComponentOptions<VxeSliderProps, VxeSliderEventProps>

export type VxeSliderInstance = DefineVxeComponentInstance<VxeSliderProps, VxeSliderConstructor>

export interface VxeSliderConstructor extends VxeComponentBaseOptions, VxeSliderMethods {
  props: VxeSliderProps
  context: SetupContext<VxeSliderEmits>
  reactData: SliderReactData
  getRefMaps(): SliderPrivateRef
  getComputeMaps(): SliderPrivateComputed
  renderVN: RenderFunction
}

export interface SliderPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeSliderPrivateRef extends SliderPrivateRef { }

export namespace VxeSliderPropTypes {
  export type Size = VxeComponentSizeType
  export type ModelValue = number | string | null | (number | string | null)[]
  export type Max = number | string
  export type Min = number | string
  export type Vertical = boolean
  export type Range = boolean
  export type Status = VxeComponentStatusType
  export type Step = number | string
  export type Readonly = boolean
  export type Disabled = boolean
}

export interface VxeSliderProps {
  size?: VxeSliderPropTypes.Size
  modelValue?: VxeSliderPropTypes.ModelValue
  max?: VxeSliderPropTypes.Max
  min?: VxeSliderPropTypes.Min
  vertical?: VxeSliderPropTypes.Vertical
  range?: VxeSliderPropTypes.Range
  status?: VxeSliderPropTypes.Status
  step?: VxeSliderPropTypes.Step
  readonly?: VxeSliderPropTypes.Readonly
  disabled?: VxeSliderPropTypes.Disabled
}

export interface SliderPrivateComputed {
}
export interface VxeSliderPrivateComputed extends SliderPrivateComputed { }

export interface SliderReactData {
  startValue: number
  endValue: number
}

export interface SliderMethods {
}
export interface VxeSliderMethods extends SliderMethods { }

export interface SliderPrivateMethods { }
export interface VxeSliderPrivateMethods extends SliderPrivateMethods { }

export type VxeSliderEmits = [
  'update:modelValue',
  'change',
  'track-dragstart',
  'track-dragover',
  'track-dragend'
]

export namespace VxeSliderDefines {
  export interface SliderEventParams extends VxeComponentEventParams {
    $slider: VxeSliderConstructor
  }

  export interface ChangeEventParams extends SliderEventParams {
    startValue: number
    endValue: number
  }

  export interface TrackDragstartEventParams extends SliderEventParams {
    startValue: number
    endValue: number
  }
  export interface TrackDragoverEventParams extends TrackDragstartEventParams {}
  export interface TrackDragendEventParams extends TrackDragstartEventParams {}
}

export type VxeSliderEventProps = {
  'onUpdate:modelValue'?: VxeSliderEvents.UpdateModelValue
  onChange?: VxeSliderEvents.Change
  onTrackDragstart?: VxeSliderEvents.TrackDragstart
  onTrackDragover?: VxeSliderEvents.TrackDragover
  onTrackDragend?: VxeSliderEvents.TrackDragend
}

export interface VxeSliderListeners {
  'update:modelValue'?: VxeSliderEvents.UpdateModelValue
  change?: VxeSliderEvents.Change
  trackDragstart?: VxeSliderEvents.TrackDragstart
  trackDragover?: VxeSliderEvents.TrackDragover
  trackDragend?: VxeSliderEvents.TrackDragend
}

export namespace VxeSliderEvents {
  export type UpdateModelValue = (modelValue: VxeSliderPropTypes.ModelValue) => void
  export type Change = (params: VxeSliderDefines.ChangeEventParams) => void
  export type TrackDragstart = (params: VxeSliderDefines.TrackDragstartEventParams) => void
  export type TrackDragover = (params: VxeSliderDefines.TrackDragoverEventParams) => void
  export type TrackDragend = (params: VxeSliderDefines.TrackDragendEventParams) => void
}

export namespace VxeSliderSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeSliderSlots {
  default?: (params: VxeSliderSlotTypes.DefaultSlotParams) => any
}

export const Slider: typeof VxeSlider
export default VxeSlider
