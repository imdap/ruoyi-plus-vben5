import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, VxeComponentSizeType, ValueOf } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeTextarea: DefineVxeComponentApp<VxeTextareaProps, VxeTextareaEventProps, VxeTextareaSlots, VxeTextareaMethods>
export type VxeTextareaComponent = DefineVxeComponentOptions<VxeTextareaProps, VxeTextareaEventProps>

export type VxeTextareaInstance = DefineVxeComponentInstance<VxeTextareaProps, VxeTextareaConstructor>

export interface VxeTextareaConstructor extends VxeComponentBaseOptions, VxeTextareaMethods {
  props: VxeTextareaProps
  context: SetupContext<VxeTextareaEmits>
  reactData: TextareaReactData
  getRefMaps(): TextareaPrivateRef
  getComputeMaps(): TextareaPrivateComputed
  renderVN: RenderFunction
}

export interface TextareaPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
  refTextarea: Ref<HTMLTextAreaElement>
}
export interface VxeTextareaPrivateRef extends TextareaPrivateRef { }

export namespace VxeTextareaPropTypes {
  export type Size = VxeComponentSizeType
  export type ModelValue = string | number | null
  export type ClassName = string
  export type Immediate = boolean
  export type Name = string
  export type Readonly = boolean
  export type Editable = boolean
  export type Disabled = boolean
  export type Placeholder = string
  export type MaxLength = string | number | null
  export type Trim = boolean
  export type Rows = string | number | null
  export type Cols = string | number | null
  export type ShowWordCount = boolean
  export type CountMethod = (params: {
    value: string
  }) => number
  export type Autosize = {
    minRows?: number | null
    maxRows?: number | null
  }
  export type Form = string
  export type Resize = string

  /**
   * 已废弃，请使用 MaxLength
   * @deprecated
   */
  export type Maxlength = string | number
}

export type VxeTextareaProps = {
  size?: VxeTextareaPropTypes.Size
  /**
   * 绑定值
   */
  modelValue?: VxeTextareaPropTypes.ModelValue
  className?: VxeTextareaPropTypes.ClassName
  immediate?: VxeTextareaPropTypes.Immediate
  /**
   * 原生 name 属性
   */
  name?: VxeTextareaPropTypes.Name
  /**
   * 是否只读
   */
  readonly?: VxeTextareaPropTypes.Readonly
  editable?: VxeTextareaPropTypes.Editable
  /**
   * 是否禁用
   */
  disabled?: VxeTextareaPropTypes.Disabled
  /**
   * 当值为空时，显示的占位符
   */
  placeholder?: VxeTextareaPropTypes.Placeholder
  /**
   * 最大长度
   */
  maxLength?: VxeTextareaPropTypes.MaxLength
  /**
   * 自动去掉左右空格
   */
  trim?: VxeTextareaPropTypes.Trim
  /**
   * 原生 rows 属性
   */
  rows?: VxeTextareaPropTypes.Rows
  /**
   * 原生 cols 属性
   */
  cols?: VxeTextareaPropTypes.Cols
  /**
   * 是否显示字数统计
   */
  showWordCount?: VxeTextareaPropTypes.ShowWordCount
  /**
   * 自定义字数统计方法
   */
  countMethod?: VxeTextareaPropTypes.CountMethod
  /**
   * 自适应文本高度
   */
  autosize?: VxeTextareaPropTypes.Autosize
  /**
   * 原生 form 属性
   */
  form?: VxeTextareaPropTypes.Form
  /**
   * 调整文本域大小的方式
   */
  resize?: VxeTextareaPropTypes.Resize

  /**
   * 已废弃，请使用 MaxLength
   * @deprecated
   */
  maxlength?: VxeTextareaPropTypes.Maxlength
}

export interface TextareaPrivateComputed {
}
export interface VxeTextareaPrivateComputed extends TextareaPrivateComputed { }

export interface TextareaReactData {
  inputValue: any
}

export interface TextareaMethods {
  dispatchEvent(type: ValueOf<VxeTextareaEmits>, params: Record<string, any>, evnt: Event | null): void
  /**
   * 获取焦点
   */
  focus(): Promise<any>
  /**
   * 失去焦点
   */
  blur(): Promise<any>
}
export interface VxeTextareaMethods extends TextareaMethods { }

export interface TextareaPrivateMethods { }
export interface VxeTextareaPrivateMethods extends TextareaPrivateMethods { }

export type VxeTextareaEmits = [
  'update:modelValue',
  'input',
  'keydown',
  'keyup',
  'click',
  'change',
  'focus',
  'blur',
  'lazy-change'
]

export namespace VxeTextareaDefines {
  export interface TextareaEventParams extends VxeComponentEventParams {
    $textarea: VxeTextareaConstructor
  }

  export interface InputParams {
    value: string
  }
  export interface InputEventParams extends TextareaEventParams, InputParams { }

  export interface ChangeParams extends InputParams {}
  export interface ChangeEventParams extends TextareaEventParams, ChangeParams { }

  export interface KeyupParams extends InputParams {}
  export interface KeyupEventParams extends TextareaEventParams, KeyupParams {
    $event: KeyboardEvent
  }

  export interface KeydownParams extends InputParams {}
  export interface KeydownEventParams extends TextareaEventParams, KeydownParams {
    $event: KeyboardEvent
  }

  export interface ClickParams extends InputParams {}
  export interface ClickEventParams extends TextareaEventParams, ClickParams {
    $event: MouseEvent
  }

  export interface FocusParams extends InputParams {}
  export interface FocusEventParams extends TextareaEventParams, FocusParams { }

  export interface BlurParams extends InputParams {}
  export interface BlurEventParams extends TextareaEventParams, BlurParams { }

  export interface LazyChangeEventParams extends TextareaEventParams { }
}

export type VxeTextareaEventProps = {
  'onUpdate:modelValue'?: VxeTextareaEvents.UpdateModelValue
  onInput?: VxeTextareaEvents.Input
  onChange?: VxeTextareaEvents.Change
  onKeydown?: VxeTextareaEvents.Keydown
  onKeyup?: VxeTextareaEvents.Keyup
  onClick?: VxeTextareaEvents.Click
  onFocus?: VxeTextareaEvents.Focus
  onBlur?: VxeTextareaEvents.Blur
  onLazyChange?: VxeTextareaEvents.LazyChange
}

export interface VxeTextareaListeners {
  'update:modelValue'?: VxeTextareaEvents.UpdateModelValue
  input?: VxeTextareaEvents.Input
  change?: VxeTextareaEvents.Change
  keydown?: VxeTextareaEvents.Keydown
  keyup?: VxeTextareaEvents.Keyup
  click?: VxeTextareaEvents.Click
  focus?: VxeTextareaEvents.Focus
  blur?: VxeTextareaEvents.Blur
  lazyChange?: VxeTextareaEvents.LazyChange
}

export namespace VxeTextareaEvents {
  export type UpdateModelValue = (modelValue: VxeTextareaPropTypes.ModelValue) => void
  export type Input = (params: VxeTextareaDefines.InputEventParams) => void
  export type Change = (params: VxeTextareaDefines.ChangeEventParams) => void
  export type Keydown = (params: VxeTextareaDefines.KeydownEventParams) => void
  export type Keyup = (params: VxeTextareaDefines.KeyupEventParams) => void
  export type Click = (params: VxeTextareaDefines.ClickEventParams) => void
  export type Focus = (params: VxeTextareaDefines.FocusEventParams) => void
  export type Blur = (params: VxeTextareaDefines.BlurEventParams) => void
  export type LazyChange = (params: VxeTextareaDefines.LazyChangeEventParams) => void
}

export namespace VxeTextareaSlotTypes {
  export interface DefaultSlotParams {
    [key: string]: any
  }
}

export interface VxeTextareaSlots {
  default?: (params: VxeTextareaSlotTypes.DefaultSlotParams) => any
}

export const Textarea: typeof VxeTextarea
export default VxeTextarea
