import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentStatusType, VxeComponentEventParams, ValueOf, VxeComponentSizeType } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeSegmented: DefineVxeComponentApp<VxeSegmentedProps, VxeSegmentedEventProps, VxeSegmentedSlots, VxeSegmentedMethods>
export type VxeSegmentedComponent = DefineVxeComponentOptions<VxeSegmentedProps, VxeSegmentedEventProps>

export type VxeSegmentedInstance = DefineVxeComponentInstance<VxeSegmentedProps, VxeSegmentedConstructor>

export interface VxeSegmentedConstructor extends VxeComponentBaseOptions, VxeSegmentedMethods {
  props: VxeSegmentedProps
  context: SetupContext<VxeSegmentedEmits>
  reactData: SegmentedReactData
  getRefMaps(): SegmentedPrivateRef
  getComputeMaps(): SegmentedPrivateComputed
  renderVN: RenderFunction
}

export interface SegmentedPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeSegmentedPrivateRef extends SegmentedPrivateRef { }

export namespace VxeSegmentedPropTypes {
  export type ModelValue = undefined | null | string | number
  export type Size = VxeComponentSizeType
  export type Type = null | '' | 'default' | 'round' | 'inside'
  export type Disabled = boolean
  export type Name = string
  export type Width = string | number
  export type Height = string | number
  export type Status = VxeComponentStatusType
  export interface Option {
    value: string | number
    label: string | number
    disabled?: boolean
    width?: string | number
    icon?: string
    [key: string]: any
  }
  export type Options = Option[]
  export interface OptionConfig {
    width?: string | number
  }
}

export interface VxeSegmentedProps {
  modelValue?: VxeSegmentedPropTypes.ModelValue
  size?: VxeSegmentedPropTypes.Size
  type?: VxeSegmentedPropTypes.Type
  disabled?: VxeSegmentedPropTypes.Disabled
  name?: VxeSegmentedPropTypes.Name
  width?: VxeSegmentedPropTypes.Width
  height?: VxeSegmentedPropTypes.Height
  status?: VxeSegmentedPropTypes.Status
  options?: VxeSegmentedPropTypes.Options
  optionConfig?: VxeSegmentedPropTypes.OptionConfig
}

export interface SegmentedPrivateComputed {
}
export interface VxeSegmentedPrivateComputed extends SegmentedPrivateComputed { }

export interface SegmentedReactData {
  groupName: string
  selectStyle: {
    display: string
    left: string
    width: string
  }
}

export interface SegmentedMethods {
  dispatchEvent(type: ValueOf<VxeSegmentedEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeSegmentedMethods extends SegmentedMethods { }

export interface SegmentedPrivateMethods { }
export interface VxeSegmentedPrivateMethods extends SegmentedPrivateMethods { }

export type VxeSegmentedEmits = [
  'update:modelValue',
  'change'
]

export namespace VxeSegmentedDefines {
  export interface SegmentedEventParams extends VxeComponentEventParams {
    $segmented: VxeSegmentedConstructor
  }

  export interface ChangeEventParams extends SegmentedEventParams {
    value: any
  }
}

export type VxeSegmentedEventProps = {
  'onUpdate:modelValue'?: VxeSegmentedEvents.UpdateModelValue
  onChange?: VxeSegmentedEvents.Change
}

export interface VxeSegmentedListeners {
  'update:modelValue'?: VxeSegmentedEvents.UpdateModelValue
  change?: VxeSegmentedEvents.Change
}

export namespace VxeSegmentedEvents {
  export type UpdateModelValue = (modelValue: VxeSegmentedPropTypes.ModelValue) => void
  export type Change = (params: VxeSegmentedDefines.ChangeEventParams) => void
}

export namespace VxeSegmentedSlotTypes {
  export interface DefaultSlotParams {
    option: VxeSegmentedPropTypes.Option
  }
}

export interface VxeSegmentedSlots {
  default?: (params: VxeSegmentedSlotTypes.DefaultSlotParams) => any
}

export const Segmented: typeof VxeSegmented
export default VxeSegmented
