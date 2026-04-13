import { RenderFunction, SetupContext, Ref, ComputedRef } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf, VxeComponentSizeType } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeNumberInput: DefineVxeComponentApp<VxeNumberInputProps, VxeNumberInputEventProps, VxeNumberInputSlots, VxeNumberInputMethods>
export type VxeNumberInputComponent = DefineVxeComponentOptions<VxeNumberInputProps, VxeNumberInputEventProps>

export type VxeNumberInputInstance = DefineVxeComponentInstance<VxeNumberInputProps, VxeNumberInputConstructor>

export interface VxeNumberInputConstructor extends VxeComponentBaseOptions, VxeNumberInputMethods {
  props: VxeNumberInputProps
  context: SetupContext<VxeNumberInputEmits>
  reactData: NumberInputReactData
  getRefMaps(): NumberInputPrivateRef
  getComputeMaps(): NumberInputPrivateComputed
  renderVN: RenderFunction
}

export interface NumberInputPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeNumberInputPrivateRef extends NumberInputPrivateRef { }

export namespace VxeNumberInputPropTypes {
  export type Size = VxeComponentSizeType
  export type ModelValue = string | number | null
  export type ClassName = string
  export type Immediate = boolean
  export type Name = string
  export type Type = 'number' | 'integer' | 'float' | 'amount'
  export type Clearable = boolean
  export type Readonly = boolean
  export type Disabled = boolean
  export type Placeholder = string
  export type MaxLength = string | number | null
  export type Multiple = boolean
  export type AutoComplete = string
  export type Align = string
  export type Form = string
  export type Min = string | number | null
  export type Max = string | number | null
  export type Step = string | number | null
  export type Exponential = boolean
  /**
   * @deprecated
   */
  export type Controls = boolean
  export interface ControlConfig {
    /**
     * 是否启用，支持局部/全局启用
     */
    enabled?: boolean
    /**
     * 只对 enabled 启用后有效，是否显示控制按钮
     */
    showButton?: boolean
    /**
     * 只对 enabled 启用后有效，是否启用鼠标滚轮操作
     */
    isWheel?: boolean
    /**
     * 只对 enabled 启用后有效，是否启用方向键操作
     */
    isArrow?: boolean
    /**
     * 按钮的布局方式
     */
    layout?: 'left' | 'right' | 'default' | ''
  }
  export type Digits = string | number | null
  export type AutoFill = boolean
  export type Editable = boolean
  export type PlusIcon = string
  export type MinusIcon = string
  export type PrefixIcon = string
  export interface PrefixConfig {
    icon?: string
    content?: string
    status?: VxeComponentSizeType
  }
  export type SuffixIcon = string
  export interface SuffixConfig {
    icon?: string
    content?: string
    status?: VxeComponentSizeType
  }

  export type ShowCurrency = boolean
  export type CurrencySymbol = string | null

  /**
   * 请使用 AutoComplete
   * @deprecated
   */
  export type Autocomplete = string
  /**
   * 请使用 MaxLength
   * @deprecated
   */
  export type Maxlength = string | number
}

export interface VxeNumberInputProps {
  size?: VxeNumberInputPropTypes.Size
  modelValue?: VxeNumberInputPropTypes.ModelValue
  className?: VxeNumberInputPropTypes.ClassName
  immediate?: VxeNumberInputPropTypes.Immediate
  name?: VxeNumberInputPropTypes.Name
  type?: VxeNumberInputPropTypes.Type
  clearable?: VxeNumberInputPropTypes.Clearable
  readonly?: VxeNumberInputPropTypes.Readonly
  disabled?: VxeNumberInputPropTypes.Disabled
  placeholder?: VxeNumberInputPropTypes.Placeholder
  maxLength?: VxeNumberInputPropTypes.MaxLength
  multiple?: VxeNumberInputPropTypes.Multiple
  autoComplete?: VxeNumberInputPropTypes.AutoComplete
  align?: VxeNumberInputPropTypes.Align
  form?: VxeNumberInputPropTypes.Form

  /**
   * 最小值
   */
  min?: VxeNumberInputPropTypes.Min
  /**
   * 最大值
   */
  max?: VxeNumberInputPropTypes.Max
  /**
   * 数字间隔，当启用控制按钮时有效
   */
  step?: VxeNumberInputPropTypes.Step
  /**
   * 是否允许输入科学计数
   */
  exponential?: VxeNumberInputPropTypes.Exponential

  /**
   * 已废弃，请使用 control-config.showButton
   * @deprecated
   */
  controls?: VxeNumberInputPropTypes.Controls
  /**
   * 控制按钮配置项
   */
  controlConfig?: VxeNumberInputPropTypes.ControlConfig

  /**
   * 小数位数
   */
  digits?: VxeNumberInputPropTypes.Digits
  /**
   * 只对 type=float,amount 有效，当输入的小数位数不足时，自动给小数后面补 0
   */
  autoFill?: VxeNumberInputPropTypes.AutoFill

  /**
   * 文本框是否允许输入
   */
  editable?: VxeNumberInputPropTypes.Editable

  /**
   * 自定义增加按钮图标
   */
  plusIcon?: VxeNumberInputPropTypes.PlusIcon
  /**
   * 自定义减少按钮图标
   */
  minusIcon?: VxeNumberInputPropTypes.MinusIcon

  prefixIcon?: VxeNumberInputPropTypes.PrefixIcon
  prefixConfig?: VxeNumberInputPropTypes.PrefixConfig
  suffixIcon?: VxeNumberInputPropTypes.SuffixIcon
  suffixConfig?: VxeNumberInputPropTypes.SuffixConfig

  /**
   * 只对 type=amount 有效，是否显示前缀货币符号
   */
  showCurrency?: VxeNumberInputPropTypes.ShowCurrency
  /**
   * 只对 type=amount 有效，自定义货币符号
   */
  currencySymbol?: VxeNumberInputPropTypes.CurrencySymbol

  /**
   * 请使用 autoComplete
   * @deprecated
   */
  autocomplete?: VxeNumberInputPropTypes.AutoComplete
  /**
   * 请使用 autoComplete
   * @deprecated
   */
  maxlength?: VxeNumberInputPropTypes.MaxLength
}

export interface NumberInputPrivateComputed {
  computeControlOpts: ComputedRef<VxeNumberInputPropTypes.ControlConfig>
}
export interface VxeNumberInputPrivateComputed extends NumberInputPrivateComputed { }

export interface NumberInputReactData {
  isFocus: boolean
  isActivated: boolean
  inputValue: VxeNumberInputPropTypes.ModelValue | undefined
}

export interface NumberInputInternalData {
  dnTimeout?: undefined | number
  ainTimeout?: undefined | number
  isMouseDown?: boolean
  isUM?: boolean
}

export interface NumberInputMethods {
  dispatchEvent(type: ValueOf<VxeNumberInputEmits>, params: Record<string, any>, evnt: Event | null): void
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
export interface VxeNumberInputMethods extends NumberInputMethods { }

export interface NumberInputPrivateMethods { }
export interface VxeNumberInputPrivateMethods extends NumberInputPrivateMethods { }

export type VxeNumberInputEmits = [
  'update:modelValue',
  'input',
  'change',
  'keydown',
  'keyup',
  'wheel',
  'click',
  'focus',
  'blur',
  'clear',
  'lazy-change',
  'plus-number',
  'minus-number',
  'prefix-click',
  'suffix-click',

  // 已废弃
  'prev-number',
  'next-number',
]

export namespace VxeNumberInputDefines {
  export interface NumberInputEventParams extends VxeComponentEventParams {
    $numberInput: VxeNumberInputConstructor
  }

  export interface NumberInputParams {
    value: number
  }
  export interface InputEventParams extends NumberInputEventParams, NumberInputParams { }

  export interface ChangeParams extends NumberInputParams {}
  export interface ChangeEventParams extends NumberInputEventParams, ChangeParams { }

  export interface PlusNumberEventParams extends NumberInputEventParams, NumberInputParams { }
  export interface MinusNumberEventParams extends NumberInputEventParams, NumberInputParams { }
}

export type VxeNumberInputEventProps = {
  'onUpdate:modelValue'?: VxeNumberInputEvents.UpdateModelValue
  onInput?: VxeNumberInputEvents.Input
  onChange?: VxeNumberInputEvents.Change
  onPlusNumber?: VxeNumberInputEvents.PlusNumber
  onMinusNumber?: VxeNumberInputEvents.MinusNumber
}

export interface VxeNumberInputListeners {
  'update:modelValue'?: VxeNumberInputEvents.UpdateModelValue
  input?: VxeNumberInputEvents.Input
  change?: VxeNumberInputEvents.Change
  plusNumber?: VxeNumberInputEvents.PlusNumber
  minusNumber?: VxeNumberInputEvents.MinusNumber
}

export namespace VxeNumberInputEvents {
  export type UpdateModelValue = (modelValue: VxeNumberInputPropTypes.ModelValue) => void
  export type Input = (params: VxeNumberInputDefines.InputEventParams) => void
  export type Change = (params: VxeNumberInputDefines.ChangeEventParams) => void
  export type PlusNumber = (params: VxeNumberInputDefines.PlusNumberEventParams) => void
  export type MinusNumber = (params: VxeNumberInputDefines.MinusNumberEventParams) => void
}

export namespace VxeNumberInputSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeNumberInputSlots {
  default?: (params: VxeNumberInputSlotTypes.DefaultSlotParams) => any
  prefix: (params: VxeNumberInputSlotTypes.DefaultSlotParams) => any
  suffix: (params: VxeNumberInputSlotTypes.DefaultSlotParams) => any
}

export const NumberInput: typeof VxeNumberInput
export default VxeNumberInput
