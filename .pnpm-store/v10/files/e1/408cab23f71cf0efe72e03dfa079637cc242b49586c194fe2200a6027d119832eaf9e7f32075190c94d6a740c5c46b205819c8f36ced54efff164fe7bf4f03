import { VxeFormDefines } from '../components/form'
import { VxeTableDefines } from '../components/table'

/* eslint-disable no-use-before-define */

declare module '@vxe-ui/core' {
  export namespace VxeGlobalFormatsHandles {
    export interface FormatsOptions {
      /**
       * 表单 - 自定义表单项格式化方法
       */
      formItemFormatMethod?: (params: FormItemFormatMethodParams, ...args: any[]) => string | number
      /**
       * 表格 - 自定义单元格格式化方法
       */
      tableCellFormatMethod?: (params: TableCellFormatMethodParams, ...args: any[]) => string | number
      /**
       * 表格 - 自定义表头单元格格式化方法
       */
      tableHeaderCellFormatMethod?: (params: TableHeaderCellFormatMethodParams, ...args: any[]) => string | number
      /**
       * 表格 - 自定义表尾单元格格式化方法
       */
      tableFooterCellFormatMethod?: (params: TableFooterCellFormatMethodParams, ...args: any[]) => string | number

      /**
       * 已废弃，请使用 tableCellFormatMethod
       * @deprecated
       */
      cellFormatMethod?: (params: TableCellFormatMethodParams, ...args: any[]) => string | number
    }

    export interface FormItemFormatMethodParams {
      itemValue: any
      data: any
      item: VxeFormDefines.ItemInfo
      field: string
    }

    export interface TableCellFormatMethodParams {
      cellValue: any
      row: any
      column: VxeTableDefines.ColumnInfo
    }

    export interface TableHeaderCellFormatMethodParams {
      cellValue: any
      cellTitle: any
      column: VxeTableDefines.ColumnInfo
      _columnIndex: number
    }

    export interface TableFooterCellFormatMethodParams {
      cellValue: any
      itemValue: any
      column: VxeTableDefines.ColumnInfo
      row: any
      items: any[]
      _columnIndex: number
    }
  }
}
