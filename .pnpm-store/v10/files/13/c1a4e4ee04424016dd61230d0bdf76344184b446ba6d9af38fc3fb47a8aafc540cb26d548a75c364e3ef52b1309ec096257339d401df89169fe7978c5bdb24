import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf, VxeComponentStyleType, VxeComponentSizeType } from '@vxe-ui/core'
import { VxeContextMenuPropTypes, VxeContextMenuDefines } from './context-menu'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeCalendar: DefineVxeComponentApp<VxeCalendarProps, VxeCalendarEventProps, VxeCalendarSlots, VxeCalendarMethods>
export type VxeCalendarComponent = DefineVxeComponentOptions<VxeCalendarProps, VxeCalendarEventProps>

export type VxeCalendarInstance = DefineVxeComponentInstance<VxeCalendarProps, VxeCalendarConstructor>

export interface VxeCalendarConstructor extends VxeComponentBaseOptions, VxeCalendarMethods {
  props: VxeCalendarProps
  context: SetupContext<VxeCalendarEmits>
  reactData: CalendarReactData
  getRefMaps(): CalendarPrivateRef
  getComputeMaps(): CalendarPrivateComputed
  renderVN: RenderFunction
}

export interface CalendarPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeCalendarPrivateRef extends CalendarPrivateRef { }

export namespace VxeCalendarPropTypes {
  export type Size = VxeComponentSizeType
  export type ModelValue = string | number | Date | null
  export type ClassName = string
  export type Type = 'date' | 'week' | 'month' | 'quarter' | 'year'
  export type Width = string | number
  export type Height = string | number
  export type Multiple = boolean
  export type MinDate = string | number | Date
  export type MaxDate = string | number | Date
  export type StartDay = 0 | 1 | 2 | 3 | 4 | 5 | 6
  export type SelectDay = 0 | 1 | 2 | 3 | 4 | 5 | 6
  export type LabelFormat = string
  export type ValueFormat = string
  export type FestivalMethod = (params: VxeCalendarDefines.DateFestivalParams) => VxeCalendarDefines.DateFestivalInfo | null | void
  export type DisabledMethod = (params: VxeCalendarDefines.DateDisabledParams) => boolean
  export type CellStyle = (params: VxeCalendarDefines.CellStyleParams) => void | null | Partial<CSSStyleDeclaration>

  export interface MenuConfig {
    /**
     * 是否启用
     */
    enabled?: boolean
    /**
     * 菜单配置
     */
    options: VxeContextMenuPropTypes.Options
    /**
     * 该函数的返回值用来决定是否允许显示右键菜单（对于需要对菜单进行权限控制时可能会用到）
     */
    visibleMethod?(params: {
      $calendar: VxeCalendarConstructor
      options: VxeContextMenuPropTypes.Options
      date: Date
      type: string
      viewType: VxeCalendarDefines.DatePanelType
    }): boolean
  }
}

export type VxeCalendarProps = {
  size?: VxeCalendarPropTypes.Size
  modelValue?: VxeCalendarPropTypes.ModelValue
  className?: VxeCalendarPropTypes.ClassName
  type?: VxeCalendarPropTypes.Type
  width?: VxeCalendarPropTypes.Width
  height?: VxeCalendarPropTypes.Height
  multiple?: VxeCalendarPropTypes.Multiple
  minDate?: VxeCalendarPropTypes.MinDate
  maxDate?: VxeCalendarPropTypes.MaxDate
  startDay?: VxeCalendarPropTypes.StartDay
  selectDay?: VxeCalendarPropTypes.SelectDay
  labelFormat?: VxeCalendarPropTypes.LabelFormat
  valueFormat?: VxeCalendarPropTypes.ValueFormat
  festivalMethod?: VxeCalendarPropTypes.FestivalMethod
  disabledMethod?: VxeCalendarPropTypes.DisabledMethod
  cellStyle?: VxeCalendarPropTypes.CellStyle
  menuConfig?: VxeCalendarPropTypes.MenuConfig
}

export interface CalendarPrivateComputed {
}
export interface VxeCalendarPrivateComputed extends CalendarPrivateComputed { }

export interface CalendarReactData {
  selectValue: VxeCalendarPropTypes.ModelValue | undefined
  inputValue: any
  datePanelValue: Date | null
  datePanelLabel: string
  datePanelType: VxeCalendarDefines.DatePanelType
  selectMonth: any
  currentDate: any
}

export interface CalendarInternalData {
  yearSize: number
  monthSize: number
  quarterSize: number
}

export interface CalendarMethods {
  dispatchEvent(type: ValueOf<VxeCalendarEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeCalendarMethods extends CalendarMethods { }

export interface CalendarPrivateMethods { }
export interface VxeCalendarPrivateMethods extends CalendarPrivateMethods { }

export type VxeCalendarEmits = [
  'update:modelValue',
  'change',
  'cell-click',
  'date-prev',
  'date-today',
  'date-next',
  'view-change',
  'cell-menu',
  'menu-click'
]

export namespace VxeCalendarDefines {
  export interface CalendarEventParams extends VxeComponentEventParams {
    $calendar: VxeCalendarConstructor
  }

  export type DatePanelType = 'year' | 'quarter' | 'month' | 'week' | 'day' | 'date'

  interface DateFestivalItem {
    /**
     * 显示名称
     */
    label?: string
    /**
     * 标记为重要信息
     */
    important?: boolean
    className?: string
    style?: VxeComponentStyleType
  }

  /**
   * 日期节日对象
   */
  export interface DateFestivalInfo extends DateFestivalItem {
    /**
     * 显示左上角小圆点通知
     */
    notice?: boolean
    /**
     * 显示右上角信息
     */
    extra?: string | DateFestivalItem
  }

  export interface DateFestivalParams {
    $calendar: VxeCalendarConstructor
    type: string
    viewType: DatePanelType
    date: Date
  }

  export interface DateDisabledParams {
    $calendar: VxeCalendarConstructor
    type: string
    viewType: DatePanelType
    date: Date
  }

  export interface CellStyleParams {
    $calendar: VxeCalendarConstructor
    type: string
    viewType: DatePanelType
    date: Date
  }

  export interface InputEventParams extends CalendarEventParams {
    value: string
  }
  export interface ChangeEventParams extends CalendarEventParams {
    value: string
  }
  export interface ClickEventParams extends CalendarEventParams {
    type: string
    viewType: DatePanelType
    date: Date
  }
  export interface DatePrevEventParams extends CalendarEventParams {
    type: DatePanelType
   }
  export interface DateTodayEventParams extends CalendarEventParams {
    type: DatePanelType
  }
  export interface DateNextEventParams extends CalendarEventParams {
    type: DatePanelType
  }
  export interface ViewChangeEventParams extends CalendarEventParams {
    viewType: DatePanelType
    viewDates: Date[]
  }
  export interface CellMemuEventParams extends CalendarEventParams {
    type: string
    viewType: DatePanelType
    date: Date
  }
  export interface MenuClickEventParams extends CellMemuEventParams {
    date: Date
    menu: VxeContextMenuDefines.MenuFirstOption | VxeContextMenuDefines.MenuChildOption
  }
}

export type VxeCalendarEventProps = {
  'onUpdate:modelValue'?: VxeCalendarEvents.UpdateModelValue
  onInput?: VxeCalendarEvents.Input
  onChange?: VxeCalendarEvents.Change
  onClick?: VxeCalendarEvents.Click
  onDatePrev?: VxeCalendarEvents.DatePrev
  onDateToday?: VxeCalendarEvents.DateToday
  onDateNext?: VxeCalendarEvents.DateNext
  onViewChange?: VxeCalendarEvents.ViewChange
  onCellMemu?: VxeCalendarEvents.CellMemu
  onMenuClick?: VxeCalendarEvents.MenuClick
}

export interface VxeCalendarListeners {
  'update:modelValue'?: VxeCalendarEvents.UpdateModelValue
  input?: VxeCalendarEvents.Input
  change?: VxeCalendarEvents.Change
  click?: VxeCalendarEvents.Click
  datePrev?: VxeCalendarEvents.DatePrev
  dateToday?: VxeCalendarEvents.DateToday
  dateNext?: VxeCalendarEvents.DateNext
  viewChange?: VxeCalendarEvents.ViewChange
  cellMenu?: VxeCalendarEvents.CellMemu
  memuClick?: VxeCalendarEvents.MenuClick
}

export namespace VxeCalendarEvents {
  export type UpdateModelValue = (modelValue: VxeCalendarPropTypes.ModelValue) => void
  export type Input = (params: VxeCalendarDefines.InputEventParams) => void
  export type Change = (params: VxeCalendarDefines.ChangeEventParams) => void
  export type Click = (params: VxeCalendarDefines.ClickEventParams) => void
  export type DatePrev = (params: VxeCalendarDefines.DatePrevEventParams) => void
  export type DateToday = (params: VxeCalendarDefines.DateTodayEventParams) => void
  export type DateNext = (params: VxeCalendarDefines.DateNextEventParams) => void
  export type ViewChange = (params: VxeCalendarDefines.ViewChangeEventParams) => void
  export type CellMemu = (params: VxeCalendarDefines.CellMemuEventParams) => void
  export type MenuClick = (params: VxeCalendarDefines.MenuClickEventParams) => void
}

export namespace VxeCalendarSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeCalendarSlots {
  default?: (params: VxeCalendarSlotTypes.DefaultSlotParams) => any
}

export const Calendar: typeof VxeCalendar
export default VxeCalendar
