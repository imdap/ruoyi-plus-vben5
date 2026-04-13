import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf } from '@vxe-ui/core'
import { VxeRadioPropTypes } from './radio'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeRadioButton: DefineVxeComponentApp<VxeRadioButtonProps, VxeRadioButtonEventProps, VxeRadioButtonSlots, VxeRadioButtonMethods>
export type VxeRadioButtonComponent = DefineVxeComponentOptions<VxeRadioButtonProps, VxeRadioButtonEventProps>

export type VxeRadioButtonInstance = DefineVxeComponentInstance<VxeRadioButtonProps, VxeRadioButtonConstructor>

export interface VxeRadioButtonConstructor extends VxeComponentBaseOptions, VxeRadioButtonMethods {
  props: VxeRadioButtonProps
  context: SetupContext<VxeRadioButtonEmits>
  reactData: RadioButtonReactData
  getRefMaps(): RadioButtonPrivateRef
  getComputeMaps(): RadioButtonPrivateComputed
  renderVN: RenderFunction
}

export interface RadioButtonPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeRadioButtonPrivateRef extends RadioButtonPrivateRef { }

export namespace VxeRadioButtonPropTypes {
  export type Size = VxeRadioPropTypes.Size
  export type ModelValue = any
  export type Strict = boolean
  export type CheckedValue = VxeRadioPropTypes.CheckedValue
  export type Title = string | number
  export type Content = string | number
  export type Disabled = boolean

  /**
   * 已废弃，被 CheckedValue 替换
   */
  export type Label = VxeRadioPropTypes.Label
}

export interface VxeRadioButtonProps {
  size?: VxeRadioButtonPropTypes.Size
  modelValue?: VxeRadioButtonPropTypes.ModelValue
  /**
   * 严格模式，不允许取消
   */
  strict?: VxeRadioButtonPropTypes.Strict
  checkedValue?: VxeRadioButtonPropTypes.CheckedValue
  title?: VxeRadioButtonPropTypes.Title
  content?: VxeRadioButtonPropTypes.Content
  disabled?: VxeRadioButtonPropTypes.Disabled

  /**
   * 已废弃，被 checkedValue 替换
   */
  label?: VxeRadioButtonPropTypes.Label
}

export interface RadioButtonPrivateComputed {
}
export interface VxeRadioButtonPrivateComputed extends RadioButtonPrivateComputed { }

export interface RadioButtonReactData {
}

export interface RadioButtonMethods {
  dispatchEvent(type: ValueOf<VxeRadioButtonEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeRadioButtonMethods extends RadioButtonMethods { }

export interface RadioButtonPrivateMethods { }
export interface VxeRadioButtonPrivateMethods extends RadioButtonPrivateMethods { }

export type VxeRadioButtonEmits = [
  'update:modelValue',
  'change'
]

export namespace VxeRadioButtonDefines {
  interface RadioButtonEventParams extends VxeComponentEventParams {
    $radioButton: VxeRadioButtonConstructor
  }

  export interface ChangeParams {
    label: any
  }
  export interface ChangeEventParams extends RadioButtonEventParams, ChangeParams { }
}

export type VxeRadioButtonEventProps = {
  'onUpdate:modelValue'?: VxeRadioButtonEvents.UpdateModelValue
  onChange?: VxeRadioButtonEvents.Change
}

export interface VxeRadioButtonListeners {
  'update:modelValue'?: VxeRadioButtonEvents.UpdateModelValue
  change?: VxeRadioButtonEvents.Change
}

export namespace VxeRadioButtonEvents {
  export type UpdateModelValue = (modelValue: VxeRadioButtonPropTypes.ModelValue) => void
  export type Change = (params: VxeRadioButtonDefines.ChangeEventParams) => void
}

export namespace VxeRadioButtonSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeRadioButtonSlots {
  default?: (params: VxeRadioButtonSlotTypes.DefaultSlotParams) => any
}

export const RadioButton: typeof VxeRadioButton
export default VxeRadioButton
