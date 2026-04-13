import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf, VxeComponentStyleType, VxeComponentSizeType } from '@vxe-ui/core'
import { VxeDatePanelPropTypes, VxeDatePanelDefines } from './date-panel'
import { VxeButtonGroupPropTypes } from './button-group'
import { VxeButtonProps } from './button'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeDateRangePicker: DefineVxeComponentApp<VxeDateRangePickerProps, VxeDateRangePickerEventProps, VxeDateRangePickerSlots, VxeDateRangePickerMethods>
export type VxeDateRangePickerComponent = DefineVxeComponentOptions<VxeDateRangePickerProps, VxeDateRangePickerEventProps>

export type VxeDateRangePickerInstance = DefineVxeComponentInstance<VxeDateRangePickerProps, VxeDateRangePickerConstructor>

export interface VxeDateRangePickerConstructor extends VxeComponentBaseOptions, VxeDateRangePickerMethods {
  props: VxeDateRangePickerProps
  context: SetupContext<VxeDateRangePickerEmits>
  reactData: DateRangePickerReactData
  getRefMaps(): DateRangePickerPrivateRef
  getComputeMaps(): DateRangePickerPrivateComputed
  renderVN: RenderFunction
}

export interface DateRangePickerPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
  refInput: Ref<HTMLInputElement>
}
export interface VxeDateRangePickerPrivateRef extends DateRangePickerPrivateRef { }

export namespace VxeDateRangePickerPropTypes {
  export type Size = VxeComponentSizeType
  export type ModelValue = (string | number | Date)[] | string | null
  export type StartValue = string | number | Date | null
  export type EndValue = string | number | Date | null
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
  export type AutoComplete = string
  export type Form = string

  // export type StartDate = string | number | Date
  // export type EndDate = string | number | Date
  export type DefaultDate = string | number | Date | (string | number | Date)[]
  export type DefaultTime = string | number | Date | (string | number | Date)[]
  export type MinDate = string | number | Date
  export type MaxDate = string | number | Date

  export type StartDay = 0 | 1 | 2 | 3 | 4 | 5 | 6
  export type SelectDay = 0 | 1 | 2 | 3 | 4 | 5 | 6
  export type LabelFormat = string
  export type ValueFormat = string
  export type TimeFormat = string
  export type ValueType = 'auto' | 'string' | 'array' | '' | null
  export type Editable = boolean
  export type FestivalMethod = VxeDatePanelPropTypes.FestivalMethod
  export type DisabledMethod = VxeDatePanelPropTypes.DisabledMethod
  export type Separator = string | number
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
    className?: string | ((params: { $dateRangePicker: VxeDateRangePickerConstructor }) => string)
  }
  export interface ShortcutConfig {
    enabled?: boolean
    position?: 'top' | 'bottom' | 'left' | 'right' | 'header' | 'footer' | null
    align?: VxeButtonGroupPropTypes.Align
    mode?: VxeButtonGroupPropTypes.Mode
    options?: VxeDateRangePickerDefines.ShortcutOption[]
    /**
     * 点击按钮后自动关闭弹窗面板
     */
    autoClose?: boolean
    clickMethod?: (params: VxeDateRangePickerDefines.ShortcutClickParams) => void
  }
}

export interface VxeDateRangePickerProps {
  size?: VxeDateRangePickerPropTypes.Size
  modelValue?: VxeDateRangePickerPropTypes.ModelValue
  startValue?: VxeDateRangePickerPropTypes.StartValue
  endValue?: VxeDateRangePickerPropTypes.EndValue
  className?: VxeDateRangePickerPropTypes.ClassName
  immediate?: VxeDateRangePickerPropTypes.Immediate
  name?: VxeDateRangePickerPropTypes.Name
  type?: VxeDateRangePickerPropTypes.Type
  clearable?: VxeDateRangePickerPropTypes.Clearable
  zIndex?: VxeDateRangePickerPropTypes.ZIndex
  readonly?: VxeDateRangePickerPropTypes.Readonly
  disabled?: VxeDateRangePickerPropTypes.Disabled
  placeholder?: VxeDateRangePickerPropTypes.Placeholder
  autoComplete?: VxeDateRangePickerPropTypes.AutoComplete
  form?: VxeDateRangePickerPropTypes.Form

  // startDate?: VxeDateRangePickerPropTypes.StartDate
  // endDate?: VxeDateRangePickerPropTypes.EndDate
  defaultDate?: VxeDateRangePickerPropTypes.DefaultDate
  defaultTime?: VxeDateRangePickerPropTypes.DefaultTime
  minDate?: VxeDateRangePickerPropTypes.MinDate
  maxDate?: VxeDateRangePickerPropTypes.MaxDate

  startDay?: VxeDateRangePickerPropTypes.StartDay
  labelFormat?: VxeDateRangePickerPropTypes.LabelFormat
  valueFormat?: VxeDateRangePickerPropTypes.ValueFormat
  /**
   * 绑定值类型，支持字符串和数组，默认自动识别
   */
  valueType?: VxeDateRangePickerPropTypes.ValueType
  timeFormat?: VxeDateRangePickerPropTypes.TimeFormat
  editable?: VxeDateRangePickerPropTypes.Editable
  festivalMethod?: VxeDateRangePickerPropTypes.FestivalMethod
  disabledMethod?: VxeDateRangePickerPropTypes.DisabledMethod

  separator?: VxeDateRangePickerPropTypes.Separator

  timeConfig?: VxeDateRangePickerPropTypes.TimeConfig

  /**
   * 只对 type=date,week,month,quarter,year 有效，选择完日期后自动关闭
   */
  autoClose?: VxeDateRangePickerPropTypes.AutoClose
  popupConfig?: VxeDateRangePickerPropTypes.PopupConfig
  shortcutConfig?: VxeDateRangePickerPropTypes.ShortcutConfig

  /**
   * 只对 type=week 有效，选中日期后指定为一周的哪一天
   */
  selectDay?: VxeDateRangePickerPropTypes.SelectDay

  prefixIcon?: VxeDateRangePickerPropTypes.PrefixIcon
  suffixIcon?: VxeDateRangePickerPropTypes.SuffixIcon
  /**
   * 已废弃，请使用 popupConfig.placement
   * @deprecated
   */
  placement?: VxeDateRangePickerPropTypes.Placement
  /**
   * 已废弃，请使用 popupConfig.transfer
   * @deprecated
   */
  transfer?: VxeDateRangePickerPropTypes.Transfer

  showClearButton?: VxeDateRangePickerPropTypes.ShowClearButton
  showConfirmButton?: VxeDateRangePickerPropTypes.ShowConfirmButton
}

export interface DateRangePickerPrivateComputed {
}
export interface VxeDateRangePickerPrivateComputed extends DateRangePickerPrivateComputed { }

export interface DateRangePickerReactData {
  initialized: boolean
  panelIndex: number
  visiblePanel: boolean
  isAniVisible: boolean
  panelStyle: VxeComponentStyleType
  panelPlacement: VxeDateRangePickerPropTypes.Placement
  isActivated: boolean
  startValue: any
  endValue: any
}

export interface DateRangePickerInternalData {
  selectStatus?: boolean
  hpTimeout?: number
}

export interface DateRangePickerMethods {
  dispatchEvent(type: ValueOf<VxeDateRangePickerEmits>, params: Record<string, any>, evnt: Event | null): void
  /**
   * 修改绑定值
   */
  setModelValue(startValue: string, endValue: string): void
  /**
   * 修改绑定值并触发相关事件
   */
  setModelValueByEvent(evnt: Event, startValue: string, endValue: string): void
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
export interface VxeDateRangePickerMethods extends DateRangePickerMethods { }

export interface DateRangePickerPrivateMethods { }
export interface VxeDateRangePickerPrivateMethods extends DateRangePickerPrivateMethods { }

export type VxeDateRangePickerEmits = [
  'update:modelValue',
  'update:startValue',
  'update:endValue',
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

export namespace VxeDateRangePickerDefines {
  export interface DateRangePickerEventParams extends VxeComponentEventParams {
    $dateRangePicker: VxeDateRangePickerConstructor
  }

  export type DateFestivalInfo = VxeDatePanelDefines.DateFestivalInfo
  export type DateFestivalParams = VxeDatePanelDefines.DateFestivalParams
  export type DateDisabledParams = VxeDatePanelDefines.DateDisabledParams

  export interface ShortcutOption extends VxeButtonProps {
    code?: string
    clickMethod?: (params: VxeDateRangePickerDefines.ShortcutClickParams) => void
  }

  export interface DateRangePickerParams {
    value: string
    startValue: string
    endValue: string
  }
  export interface InputEventParams extends DateRangePickerEventParams, DateRangePickerParams { }

  export interface ChangeParams extends DateRangePickerParams {
    isFinish: boolean
  }
  export interface ChangeEventParams extends DateRangePickerEventParams, ChangeParams { }

  export interface ClearEventParams extends DateRangePickerEventParams {}
  export interface ConfirmEventParams extends DateRangePickerEventParams {}

  export interface ShortcutClickParams {
    $dateRangePicker: VxeDateRangePickerConstructor
    option: VxeDateRangePickerDefines.ShortcutOption
  }
  export interface ShortcutClickEventParams extends DateRangePickerEventParams, ShortcutClickParams {}
}

export type VxeDateRangePickerEventProps = {
  'onUpdate:modelValue'?: VxeDateRangePickerEvents.UpdateModelValueValue
  'onUpdate:startValue'?: VxeDateRangePickerEvents.UpdateStartValueValue
  'onUpdate:endValue'?: VxeDateRangePickerEvents.UpdateEndValueValue
  onInput?: VxeDateRangePickerEvents.Input
  onChange?: VxeDateRangePickerEvents.Change
  onClear?: VxeDateRangePickerEvents.Clear
  onConfirm?: VxeDateRangePickerEvents.Confirm
  onShortcutClick?: VxeDateRangePickerEvents.ShortcutClick
}

export interface VxeDateRangePickerListeners {
  'update:modelValue'?: VxeDateRangePickerEvents.UpdateModelValueValue
  'update:startValue'?: VxeDateRangePickerEvents.UpdateStartValueValue
  'update:endValue'?: VxeDateRangePickerEvents.UpdateEndValueValue
  input?: VxeDateRangePickerEvents.Input
  change?: VxeDateRangePickerEvents.Change
  clear?: VxeDateRangePickerEvents.Clear
  confirm?: VxeDateRangePickerEvents.Confirm
  shortcutClick?: VxeDateRangePickerEvents.ShortcutClick
}

export namespace VxeDateRangePickerEvents {
  export type UpdateModelValueValue = (modelValue: VxeDateRangePickerPropTypes.ModelValue) => void
  export type UpdateStartValueValue = (modelValue: VxeDateRangePickerPropTypes.StartValue) => void
  export type UpdateEndValueValue = (modelValue: VxeDateRangePickerPropTypes.EndValue) => void
  export type Input = (params: VxeDateRangePickerDefines.InputEventParams) => void
  export type Change = (params: VxeDateRangePickerDefines.ChangeEventParams) => void
  export type Clear = (params: VxeDateRangePickerDefines.ClearEventParams) => void
  export type Confirm = (params: VxeDateRangePickerDefines.ConfirmEventParams) => void
  export type ShortcutClick = (params: VxeDateRangePickerDefines.ShortcutClickEventParams) => void
}

export namespace VxeDateRangePickerSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeDateRangePickerSlots {
  default?: (params: VxeDateRangePickerSlotTypes.DefaultSlotParams) => any
  prefix?: (params: VxeDateRangePickerSlotTypes.DefaultSlotParams) => any
  suffix?: (params: VxeDateRangePickerSlotTypes.DefaultSlotParams) => any
  header?: (params: VxeDateRangePickerSlotTypes.DefaultSlotParams) => any
  footer?: (params: VxeDateRangePickerSlotTypes.DefaultSlotParams) => any
  top?: (params: VxeDateRangePickerSlotTypes.DefaultSlotParams) => any
  bottom?: (params: VxeDateRangePickerSlotTypes.DefaultSlotParams) => any
  left?: (params: VxeDateRangePickerSlotTypes.DefaultSlotParams) => any
  right?: (params: VxeDateRangePickerSlotTypes.DefaultSlotParams) => any
}

export const DateRangePicker: typeof VxeDateRangePicker
export default VxeDateRangePicker
