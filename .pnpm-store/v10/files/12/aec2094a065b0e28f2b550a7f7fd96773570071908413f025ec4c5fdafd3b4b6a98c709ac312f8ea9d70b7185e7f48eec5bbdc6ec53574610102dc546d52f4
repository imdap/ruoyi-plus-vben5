import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, VxeComponentSizeType, ValueOf } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeCheckbox: DefineVxeComponentApp<VxeCheckboxProps, VxeCheckboxEventProps, VxeCheckboxSlots, VxeCheckboxMethods>
export type VxeCheckboxComponent = DefineVxeComponentOptions<VxeCheckboxProps, VxeCheckboxEventProps>

export type VxeCheckboxInstance = DefineVxeComponentInstance<VxeCheckboxProps, VxeCheckboxConstructor>

export interface VxeCheckboxConstructor extends VxeComponentBaseOptions, VxeCheckboxMethods {
  props: VxeCheckboxProps
  context: SetupContext<VxeCheckboxEmits>
  reactData: CheckboxReactData
  getRefMaps(): CheckboxPrivateRef
  getComputeMaps(): CheckboxPrivateComputed
  renderVN: RenderFunction
}

export interface CheckboxPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeCheckboxPrivateRef extends CheckboxPrivateRef { }

export namespace VxeCheckboxPropTypes {
  export type Size = VxeComponentSizeType
  export type ModelValue = string | number | boolean
  export type Label = string | number
  export type Indeterminate = boolean
  export type Title = string | number
  export type CheckedValue = string | number | boolean
  export type UncheckedValue = string | number | boolean
  export type Content = string | number
  export type Disabled = boolean
}

export type VxeCheckboxProps = {
  size?: VxeCheckboxPropTypes.Size
  /**
   * 绑定值
   */
  modelValue?: VxeCheckboxPropTypes.ModelValue
  /**
   * 只对 checkbox-group 有效，值
   */
  label?: VxeCheckboxPropTypes.Label
  /**
   * 是否不确定状态
   */
  indeterminate?: VxeCheckboxPropTypes.Indeterminate
  /**
   * 原生 title 属性
   */
  title?: VxeCheckboxPropTypes.Title
  checkedValue?: VxeCheckboxPropTypes.CheckedValue
  uncheckedValue?: VxeCheckboxPropTypes.UncheckedValue
  /**
   * 内容
   */
  content?: VxeCheckboxPropTypes.Content
  /**
   * 是否禁用
   */
  disabled?: VxeCheckboxPropTypes.Disabled
}

export interface CheckboxPrivateComputed {
}
export interface VxeCheckboxPrivateComputed extends CheckboxPrivateComputed { }

export interface CheckboxReactData {
}

export interface CheckboxMethods {
  dispatchEvent(type: ValueOf<VxeCheckboxEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeCheckboxMethods extends CheckboxMethods { }

export interface CheckboxPrivateMethods { }
export interface VxeCheckboxPrivateMethods extends CheckboxPrivateMethods { }

export type VxeCheckboxEmits = [
  'update:modelValue',
  'change'
]

export namespace VxeCheckboxDefines {
  export interface CheckboxEventParams extends VxeComponentEventParams {
    $checkbox: VxeCheckboxConstructor
  }

  export interface ChangeParams {
    checked: boolean
    label: any
  }
  export interface ChangeEventParams extends CheckboxEventParams, ChangeParams { }
}

export type VxeCheckboxEventProps = {
  'onUpdate:modelValue'?: VxeCheckboxEvents.UpdateModelValue
  onChange?: VxeCheckboxEvents.Change
}

export interface VxeCheckboxListeners {
  'update:modelValue'?: VxeCheckboxEvents.UpdateModelValue
  change?: VxeCheckboxEvents.Change
}

export namespace VxeCheckboxEvents {
  export type UpdateModelValue = (modelValue: VxeCheckboxPropTypes.ModelValue) => void
  export type Change = (params: VxeCheckboxDefines.ChangeEventParams) => void
}

export namespace VxeCheckboxSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeCheckboxSlots {
  default?: (params: VxeCheckboxSlotTypes.DefaultSlotParams) => any
}

export const Checkbox: typeof VxeCheckbox
export default VxeCheckbox
