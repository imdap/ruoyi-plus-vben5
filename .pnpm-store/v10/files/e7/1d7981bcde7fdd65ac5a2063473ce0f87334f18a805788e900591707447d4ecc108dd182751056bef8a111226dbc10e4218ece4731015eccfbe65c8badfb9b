import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf, VxeComponentStyleType, VxeComponentSizeType } from '@vxe-ui/core'
import { VxeDatePanelPropTypes, VxeDatePanelDefines } from './date-panel'
import { VxeButtonGroupPropTypes } from './button-group'
import { VxeButtonProps } from './button'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeDatePicker: DefineVxeComponentApp<VxeDatePickerProps, VxeDatePickerEventProps, VxeDatePickerSlots, VxeDatePickerMethods>
export type VxeDatePickerComponent = DefineVxeComponentOptions<VxeDatePickerProps, VxeDatePickerEventProps>

export type VxeDatePickerInstance = DefineVxeComponentInstance<VxeDatePickerProps, VxeDatePickerConstructor>

export interface VxeDatePickerConstructor extends VxeComponentBaseOptions, VxeDatePickerMethods {
  props: VxeDatePickerProps
  context: SetupContext<VxeDatePickerEmits>
  reactData: DatePickerReactData
  getRefMaps(): DatePickerPrivateRef
  getComputeMaps(): DatePickerPrivateComputed
  renderVN: RenderFunction
}

export interface DatePickerPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
  refInput: Ref<HTMLInputElement>
}
export interface VxeDatePickerPrivateRef extends DatePickerPrivateRef { }

export namespace VxeDatePickerPropTypes {
  export type Size = VxeComponentSizeType
  export type ModelValue = string | number | Date | null
  export type ClassName = string
  export type Immediate = boolean
  export type Name = string
  export type Type = VxeDatePanelPropTypes.Type
  export type Clearable = boolean
  /**
   * 已废弃，请使用 PopupConfig.zIndex
   * @deprecated
   */
  export type ZIndex = number
  export type Readonly = boolean
  export type Disabled = boolean
  export type Placeholder = string
  export type Multiple = boolean
  export type LimitCount = string | number
  export type AutoComplete = string
  export type Form = string
  export type StartDate = string | number | Date
  export type EndDate = string | number | Date
  export type DefaultDate = string | number | Date
  export type DefaultTime = string | number | Date
  export type MinDate = string | number | Date
  export type MaxDate = string | number | Date
  export type StartDay = 0 | 1 | 2 | 3 | 4 | 5 | 6
  export type SelectDay = 0 | 1 | 2 | 3 | 4 | 5 | 6
  export type LabelFormat = string
  export type ValueFormat = string
  export type TimeFormat = string
  export type Editable = boolean
  export type FestivalMethod = VxeDatePanelPropTypes.FestivalMethod
  export type DisabledMethod = VxeDatePanelPropTypes.DisabledMethod
  export type AutoClose = boolean
  export type PrefixIcon = string
  export type SuffixIcon = string
  /**
   * 已废弃，请使用 PopupConfig.placement
   * @deprecated
   */
  export type Placement = 'top' | 'bottom' | '' | null
  /**
   * 已废弃，请使用 PopupConfig.transfer
   * @deprecated
   */
  export type Transfer = boolean
  export type ShowClearButton = boolean | null
  export type ShowConfirmButton = boolean | null

  export interface TimeConfig extends VxeDatePanelPropTypes.TimeConfig {}

  export interface PopupConfig {
    /**
     * 设置弹出面板方向
     */
    placement?: 'top' | 'bottom' | '' | null
    /**
     * 默认弹出面板方向
     */
    defaultPlacement?: 'top' | 'bottom' | '' | null
    /**
     * 触发方式
     */
    trigger?: 'default' | 'icon' | 'manual' | '' | null
    transfer?: boolean
    width?: number | string
    height?: number | string
    zIndex?: number | string
    className?: string | ((params: { $datePicker: VxeDatePickerConstructor }) => string)
  }
  export interface ShortcutConfig {
    enabled?: boolean
    position?: 'top' | 'bottom' | 'left' | 'right' | 'header' | 'footer' | null
    align?: VxeButtonGroupPropTypes.Align
    mode?: VxeButtonGroupPropTypes.Mode
    options?: VxeDatePickerDefines.ShortcutOption[]
    /**
     * 点击按钮后自动关闭弹窗面板
     */
    autoClose?: boolean
    clickMethod?: (params: VxeDatePickerDefines.ShortcutClickParams) => void
  }
}

export interface VxeDatePickerProps {
  size?: VxeDatePickerPropTypes.Size
  modelValue?: VxeDatePickerPropTypes.ModelValue
  className?: VxeDatePickerPropTypes.ClassName
  immediate?: VxeDatePickerPropTypes.Immediate
  name?: VxeDatePickerPropTypes.Name
  type?: VxeDatePickerPropTypes.Type
  clearable?: VxeDatePickerPropTypes.Clearable
  zIndex?: VxeDatePickerPropTypes.ZIndex
  readonly?: VxeDatePickerPropTypes.Readonly
  disabled?: VxeDatePickerPropTypes.Disabled
  placeholder?: VxeDatePickerPropTypes.Placeholder
  multiple?: VxeDatePickerPropTypes.Multiple
  limitCount?: VxeDatePickerPropTypes.LimitCount
  autoComplete?: VxeDatePickerPropTypes.AutoComplete
  form?: VxeDatePickerPropTypes.Form

  /**
   * 日期面板的起始周为星期几
   */
  startDate?: VxeDatePickerPropTypes.StartDate
  endDate?: VxeDatePickerPropTypes.EndDate
  defaultDate?: VxeDatePickerPropTypes.DefaultDate
  defaultTime?: VxeDatePickerPropTypes.DefaultTime
  minDate?: VxeDatePickerPropTypes.MinDate
  maxDate?: VxeDatePickerPropTypes.MaxDate

  startDay?: VxeDatePickerPropTypes.StartDay
  labelFormat?: VxeDatePickerPropTypes.LabelFormat
  valueFormat?: VxeDatePickerPropTypes.ValueFormat
  timeFormat?: VxeDatePickerPropTypes.TimeFormat
  editable?: VxeDatePickerPropTypes.Editable
  festivalMethod?: VxeDatePickerPropTypes.FestivalMethod
  disabledMethod?: VxeDatePickerPropTypes.DisabledMethod

  timeConfig?: VxeDatePickerPropTypes.TimeConfig

  popupConfig?: VxeDatePickerPropTypes.PopupConfig
  shortcutConfig?: VxeDatePickerPropTypes.ShortcutConfig
  /**
   * 只对 type=date,week,month,quarter,year 有效，选择完日期后自动关闭
   */
  autoClose?: VxeDatePickerPropTypes.AutoClose

  /**
   * 只对 type=week 有效，选中日期后指定为一周的哪一天
   */
  selectDay?: VxeDatePickerPropTypes.SelectDay

  prefixIcon?: VxeDatePickerPropTypes.PrefixIcon
  suffixIcon?: VxeDatePickerPropTypes.SuffixIcon
  /**
   * 已废弃，请使用 popupConfig.placement
   * @deprecated
   */
  placement?: VxeDatePickerPropTypes.Placement
  /**
   * 已废弃，请使用 popupConfig.transfer
   * @deprecated
   */
  transfer?: VxeDatePickerPropTypes.Transfer

  showClearButton?: VxeDatePickerPropTypes.ShowClearButton
  showConfirmButton?: VxeDatePickerPropTypes.ShowConfirmButton
}

export interface DatePickerPrivateComputed {
}
export interface VxeDatePickerPrivateComputed extends DatePickerPrivateComputed { }

export interface DatePickerReactData {
  initialized: boolean
  panelIndex: number
  visiblePanel: boolean
  isAniVisible: boolean
  panelStyle: VxeComponentStyleType
  panelPlacement: VxeDatePickerPropTypes.Placement
  isActivated: boolean
  inputValue: any
  inputLabel: string
}

export interface DatePickerInternalData {
  hpTimeout?: undefined | number
}

export interface DatePickerMethods {
  dispatchEvent(type: ValueOf<VxeDatePickerEmits>, params: Record<string, any>, evnt: Event | null): void
  /**
   * 修改绑定值
   */
  setModelValue(value: string): void
  /**
   * 修改绑定值并触发相关事件
   */
  setModelValueByEvent(evnt: Event, value: string): void
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
  /**
   * 弹出面板，用于带下拉面板的功能，
   */
  showPanel(): Promise<any>
  /**
   * 关闭面板，用于带下拉面板的功能，
   */
  hidePanel(): Promise<any>
  updatePlacement(): Promise<any>
}
export interface VxeDatePickerMethods extends DatePickerMethods { }

export interface DatePickerPrivateMethods { }
export interface VxeDatePickerPrivateMethods extends DatePickerPrivateMethods { }

export type VxeDatePickerEmits = [
  'update:modelValue',
  'input',
  'change',
  'keydown',
  'keyup',
  'click',
  'focus',
  'blur',
  'clear',
  'confirm',
  'prefix-click',
  'suffix-click',
  'date-prev',
  'date-today',
  'date-next',
  'shortcut-click'
]

export namespace VxeDatePickerDefines {
  export interface DatePickerEventParams extends VxeComponentEventParams {
    $datePicker: VxeDatePickerConstructor
  }

  export type DateFestivalInfo = VxeDatePanelDefines.DateFestivalInfo
  export type DateFestivalParams = VxeDatePanelDefines.DateFestivalParams
  export type DateDisabledParams = VxeDatePanelDefines.DateDisabledParams

  export interface ShortcutOption extends VxeButtonProps {
    code?: string
    clickMethod?: (params: VxeDatePickerDefines.ShortcutClickParams) => void
  }

  export interface DatePickerParams {
    value: string
  }
  export interface InputEventParams extends DatePickerEventParams, DatePickerParams { }

  export interface ChangeParams extends DatePickerParams {}
  export interface ChangeEventParams extends DatePickerEventParams, ChangeParams { }

  export interface ClearEventParams extends DatePickerEventParams {}
  export interface ConfirmEventParams extends DatePickerEventParams {}

  export interface ShortcutClickParams {
    $datePicker: VxeDatePickerConstructor
    option: VxeDatePickerDefines.ShortcutOption
  }
  export interface ShortcutClickEventParams extends DatePickerEventParams, ShortcutClickParams {}
}

export type VxeDatePickerEventProps = {
  'onUpdate:modelValue'?: VxeDatePickerEvents.UpdateModelValue
  onInput?: VxeDatePickerEvents.Input
  onChange?: VxeDatePickerEvents.Change
  onClear?: VxeDatePickerEvents.Clear
  onConfirm?: VxeDatePickerEvents.Confirm
  onShortcutClick?: VxeDatePickerEvents.ShortcutClick
}

export interface VxeDatePickerListeners {
  'update:modelValue'?: VxeDatePickerEvents.UpdateModelValue
  input?: VxeDatePickerEvents.Input
  change?: VxeDatePickerEvents.Change
  clear?: VxeDatePickerEvents.Clear
  confirm?: VxeDatePickerEvents.Confirm
  shortcutClick?: VxeDatePickerEvents.ShortcutClick
}

export namespace VxeDatePickerEvents {
  export type UpdateModelValue = (modelValue: VxeDatePickerPropTypes.ModelValue) => void
  export type Input = (params: VxeDatePickerDefines.InputEventParams) => void
  export type Change = (params: VxeDatePickerDefines.ChangeEventParams) => void
  export type Clear = (params: VxeDatePickerDefines.ClearEventParams) => void
  export type Confirm = (params: VxeDatePickerDefines.ConfirmEventParams) => void
  export type ShortcutClick = (params: VxeDatePickerDefines.ShortcutClickEventParams) => void
}

export namespace VxeDatePickerSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeDatePickerSlots {
  default?: (params: VxeDatePickerSlotTypes.DefaultSlotParams) => any
  prefix?: (params: VxeDatePickerSlotTypes.DefaultSlotParams) => any
  suffix?: (params: VxeDatePickerSlotTypes.DefaultSlotParams) => any
  header?: (params: VxeDatePickerSlotTypes.DefaultSlotParams) => any
  footer?: (params: VxeDatePickerSlotTypes.DefaultSlotParams) => any
  top?: (params: VxeDatePickerSlotTypes.DefaultSlotParams) => any
  bottom?: (params: VxeDatePickerSlotTypes.DefaultSlotParams) => any
  left?: (params: VxeDatePickerSlotTypes.DefaultSlotParams) => any
  right?: (params: VxeDatePickerSlotTypes.DefaultSlotParams) => any
}

export const DatePicker: typeof VxeDatePicker
export default VxeDatePicker
