import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf, VxeComponentSizeType } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxePasswordInput: DefineVxeComponentApp<VxePasswordInputProps, VxePasswordInputEventProps, VxePasswordInputSlots, VxePasswordInputMethods>
export type VxePasswordInputComponent = DefineVxeComponentOptions<VxePasswordInputProps, VxePasswordInputEventProps>

export type VxePasswordInputInstance = DefineVxeComponentInstance<VxePasswordInputProps, VxePasswordInputConstructor>

export interface VxePasswordInputConstructor extends VxeComponentBaseOptions, VxePasswordInputMethods {
  props: VxePasswordInputProps
  context: SetupContext<VxePasswordInputEmits>
  reactData: PasswordInputReactData
  getRefMaps(): PasswordInputPrivateRef
  getComputeMaps(): PasswordInputPrivateComputed
  renderVN: RenderFunction
}

export interface PasswordInputPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxePasswordInputPrivateRef extends PasswordInputPrivateRef { }

export namespace VxePasswordInputPropTypes {
  export type Size = VxeComponentSizeType
  export type ModelValue = string | null
  export type Immediate = boolean
  export type ClassName = string
  export type Name = string
  export type Clearable = boolean
  export type Readonly = boolean
  export type Disabled = boolean
  export type MaxLength = string | number
  export type Placeholder = string
  export type AutoComplete = string
  export type PrefixIcon = string
  export type SuffixIcon = string
  export type Controls = boolean
  /**
   * 请使用 AutoComplete
   * @deprecated
   */
  export type Autocomplete = string
}

export interface VxePasswordInputProps {
  size?: VxePasswordInputPropTypes.Size
  modelValue?: VxePasswordInputPropTypes.ModelValue
  immediate?: VxePasswordInputPropTypes.Immediate
  className?: VxePasswordInputPropTypes.ClassName
  name?: VxePasswordInputPropTypes.Name
  clearable?: VxePasswordInputPropTypes.Clearable
  readonly?: VxePasswordInputPropTypes.Readonly
  disabled?: VxePasswordInputPropTypes.Disabled
  maxLength?: VxePasswordInputPropTypes.MaxLength
  autoComplete?: VxePasswordInputPropTypes.AutoComplete
  placeholder?: VxePasswordInputPropTypes.Placeholder
  prefixIcon?: VxePasswordInputPropTypes.PrefixIcon
  suffixIcon?: VxePasswordInputPropTypes.SuffixIcon
  controls?: VxePasswordInputPropTypes.Controls
  /**
   * 请使用 AutoComplete
   * @deprecated
   */
  autocomplete?: VxePasswordInputPropTypes.Autocomplete
}

export interface PasswordInputPrivateComputed {
}
export interface VxePasswordInputPrivateComputed extends PasswordInputPrivateComputed { }

export interface PasswordInputReactData {
  showPwd: boolean
  isActivated: boolean
  inputValue: undefined | VxePasswordInputPropTypes.ModelValue
}

export interface PasswordInputMethods {
  dispatchEvent(type: ValueOf<VxePasswordInputEmits>, params: Record<string, any>, evnt: Event | null): void
  /**
   * 获取焦点
   */
  focus(): Promise<any>
  /**
   * 失去焦点
   */
  blur(): Promise<any>
  /**
   * 选中内容
   */
  select(): Promise<any>
}
export interface VxePasswordInputMethods extends PasswordInputMethods { }

export interface PasswordInputPrivateMethods { }
export interface VxePasswordInputPrivateMethods extends PasswordInputPrivateMethods { }

export type VxePasswordInputEmits = [
  'update:modelValue',
  'input',
  'change',
  'click',
  'focus',
  'blur',
  'clear',
  'lazy-change',
  'toggle-visible',
  'prefix-click',
  'suffix-click'
]

export namespace VxePasswordInputDefines {
  export interface PasswordInputEventParams extends VxeComponentEventParams {
    $passwordInput: VxePasswordInputConstructor
  }
}

export type VxePasswordInputEventProps = {
  'onUpdate:modelValue'?: VxePasswordInputEvents.UpdateModelValue
}

export interface VxePasswordInputListeners {
  'update:modelValue'?: VxePasswordInputEvents.UpdateModelValue
}

export namespace VxePasswordInputEvents {
  export type UpdateModelValue = (modelValue: VxePasswordInputPropTypes.ModelValue) => void
}

export namespace VxePasswordInputSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxePasswordInputSlots {
  default?: (params: VxePasswordInputSlotTypes.DefaultSlotParams) => any
  prefix: (params: VxePasswordInputSlotTypes.DefaultSlotParams) => any
  suffix: (params: VxePasswordInputSlotTypes.DefaultSlotParams) => any
}

export const PasswordInput: typeof VxePasswordInput
export default VxePasswordInput
