import { VxeGridConstructor } from '../components/grid'
import { VxeToolbarPropTypes } from '../components/toolbar'
import { VxeTableConstructor } from '../components/table'
import { VxeGanttConstructor } from '../components/gantt'
import { VxeDatePickerConstructor, VxeDatePickerDefines } from '../components/date-picker'
import { VxeDateRangePickerConstructor, VxeDateRangePickerDefines } from '../components/date-range-picker'

/* eslint-disable no-use-before-define */

declare module '@vxe-ui/core' {
  export namespace VxeGlobalCommandsHandles {
    export interface CommandsOptions {
      /**
       * 日期选择器 - 自定义日期快捷按钮指令方法
       */
      datePickerCommandMethod?: (params: DatePickerCommandMethodParams) => void
      /**
       * 日期范围选择器 - 自定义日期快捷按钮指令方法
       */
      dateRangePickerCommandMethod?: (params: DateRangePickerCommandMethodParams) => void
      /**
       * 表格 - 自定义工具栏或数据代理的指令方法
       */
      tableCommandMethod?: (params: TableCommandMethodParams, ...args: any[]) => void

      /**
       * 已废弃，请使用 tableCommandMethod
       * @deprecated
       */
      commandMethod?: (params: TableCommandMethodParams, ...args: any[]) => void
    }

    export interface DatePickerCommandMethodParams {
      $datePicker: VxeDatePickerConstructor
      option: VxeDatePickerDefines.ShortcutOption
      code: string | undefined
      value: string
    }

    export interface DateRangePickerCommandMethodParams {
      $dateRangePicker: VxeDateRangePickerConstructor
      option: VxeDateRangePickerDefines.ShortcutOption
      code: string | undefined
      value: string | string[]
      startValue: string
      endValue: string
    }

    export interface TableCommandMethodParams {
      $table: VxeTableConstructor
      $grid: VxeGridConstructor | null | undefined
      $gantt: VxeGanttConstructor | null | undefined
      button: VxeToolbarPropTypes.ButtonConfig | null | undefined
      code: string | undefined
    }
  }
}
