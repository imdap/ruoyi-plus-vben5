import { VxeTableConstructor, VxeTableDefines, VxeTablePropTypes } from '../components/table'
import { VxeGridConstructor } from '../components/grid'

declare module '@vxe-ui/core' {
  export namespace VxeGlobalInterceptorHandles {
    export interface InterceptorOptions {
      /**
       * 表格 - 事件处理方法
       */
      tableInterceptorMethod?: (params: any) => any
    }

    export type HookType = 'created' | 'mounted' | 'activated' | 'beforeUnmount' | 'unmounted'
    export type EventType = 'event.clearEdit' | 'event.clearActived' | 'event.clearFilter' | 'event.clearAreas' | 'event.showMenu' | 'event.keydown' | 'event.export' | 'event.import'
    export type Type = HookType | EventType

    export interface InterceptorParams {
      $grid: VxeGridConstructor | null | undefined
      $table: VxeTableConstructor
      $event: Event
    }

    export interface InterceptorKeydownParams extends InterceptorParams { }
    export interface InterceptorClearFilterParams extends InterceptorParams { }
    export interface InterceptorClearEditParams extends InterceptorParams { }
    export interface InterceptorClearAreasParams extends InterceptorParams { }

    export interface InterceptorExportParams extends InterceptorParams {
      options: VxeTablePropTypes.ExportHandleOptions
      columns: VxeTableDefines.ColumnInfo<any>[]
      colgroups: VxeTableDefines.ColumnInfo<any>[][]
      datas: any[]
    }

    export interface InterceptorImportParams extends InterceptorParams {
      file: File
      options: VxeTablePropTypes.ExportHandleOptions
      columns: VxeTableDefines.ColumnInfo<any>[]
      datas: any[]
    }

    export interface InterceptorShowMenuParams extends InterceptorParams {
      type: 'header' | 'body' | 'footer'
      options: VxeTableDefines.MenuFirstOption[][]
      columns: VxeTableDefines.ColumnInfo<any>[]
      row?: any
      rowIndex?: number
      column?: VxeTableDefines.ColumnInfo<any>
      columnIndex?: number
    }
  }
}
