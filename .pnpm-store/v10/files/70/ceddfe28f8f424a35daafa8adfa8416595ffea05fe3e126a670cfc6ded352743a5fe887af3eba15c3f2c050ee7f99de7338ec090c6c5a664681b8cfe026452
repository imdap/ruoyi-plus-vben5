import { VxeFormDefines } from '../components/form'
import { VxeTableDefines } from '../components/table'

/* eslint-disable no-use-before-define */

declare module '@vxe-ui/core' {
  export namespace VxeGlobalValidatorsHandles {
    export interface ValidatorsOptions {

      /**
       * 表单 - 自定义表单项校验方法
       */
      formItemValidatorMethod?: FormItemValidatorMethod

      /**
       * 表格 - 自定义单元格校验方法
       */
      tableCellValidatorMethod?: TableCellValidatorMethod

      /**
       * 已废弃，请使用 tableCellValidatorMethod
       * @deprecated
       */
      cellValidatorMethod?: TableCellValidatorMethod
      /**
       * 已废弃，请使用 formItemValidatorMethod
       * @deprecated
       */
      itemValidatorMethod?: FormItemValidatorMethod
    }

    export type FormItemValidatorMethod = (params: FormItemValidatorParams, ...args: any[]) => void | Error | Promise<any>
    export interface FormItemValidatorParams extends VxeFormDefines.RuleValidatorParams {}

    export type TableCellValidatorMethod<D = any> = (params: TableCellValidatorParams<D>, ...args: any[]) => void | Error | Promise<any>
    export interface TableCellValidatorParams<D = any> extends VxeTableDefines.RuleValidatorParams<D> {}
  }
}
