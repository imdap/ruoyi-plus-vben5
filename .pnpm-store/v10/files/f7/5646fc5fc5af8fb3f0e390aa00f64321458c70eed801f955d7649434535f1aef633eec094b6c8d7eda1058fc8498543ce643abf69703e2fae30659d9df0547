import { VxeTableDefines } from '../table'
import { VxeColumnPropTypes } from '../column'

/* eslint-disable @typescript-eslint/no-unused-vars,no-use-before-define */

export interface TableValidatorMethods<D = any> {
  /**
   * 手动清除校验
   */
  clearValidate(rows?: any, fieldOrColumn?: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any> | VxeColumnPropTypes.Field[] | VxeTableDefines.ColumnInfo<any>[]): Promise<void>
  /**
   * 完整校验行，默认校验当前表格数据，和 validate 的区别就是默认校验当前表格数据并且给有效数据中的每一行进行校验
   * @param rows 指定行
   */
  fullValidate(rows?: boolean | object | any[] | ((errMap: VxeTableDefines.ValidatorErrorMapParams<D>) => void), callback?: (errMap: VxeTableDefines.ValidatorErrorMapParams<D>) => void): Promise<VxeTableDefines.ValidatorErrorMapParams<D>>
  /**
   * 快速校验行，默认校验当前表格数据，如果存在记录不通过的记录，则返回不再继续校验（异步校验除外）；
   * 如果第一个参数为 true 则校验当前表格数据，如果指定 row 或 rows 则校验指定一行或多行，如果不指定数据，则默认只校验临时变动的数据，例如新增或修改。该回调函数会在校验结束后被调用 callback(errMap)。若不传入回调函数，则会返回一个 promise
   * @param rows 指定行
   */
  validate(rows?: boolean | object | any[] | ((errMap?: VxeTableDefines.ValidatorErrorMapParams<D>) => void), callback?: (errMap?: VxeTableDefines.ValidatorErrorMapParams<D>) => void): Promise<VxeTableDefines.ValidatorErrorMapParams<D>>

  /**
   * 完整校验单元格，默认校验当前表格数据，如果存在记录不通过的记录，则返回不再继续校验（异步校验除外）；
   * 如果第一个参数为 true 则校验当前表格数据，如果指定 row 或 rows 则校验指定一行或多行，如果不指定数据，则默认只校验临时变动的数据，例如新增或修改。返回一个 promise
   * @param rows 指定行
   * @param fieldOrColumn 指定字段
   */
  fullValidateField(rows?: boolean | object | any[], fieldOrColumn?: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any> | VxeColumnPropTypes.Field[] | VxeTableDefines.ColumnInfo<any>[]): Promise<VxeTableDefines.ValidatorErrorMapParams<D>>
  /**
   * 快速校定单元格，默认校验当前表格数据，如果存在记录不通过的记录，则返回不再继续校验（异步校验除外）；
   * 如果第一个参数为 true 则校验当前表格数据，如果指定 row 或 rows 则校验指定一行或多行，如果不指定数据，则默认只校验临时变动的数据，例如新增或修改。返回一个 promise
   * @param rows 指定行
   * @param fieldOrColumn 指定字段
   */
  validateField(rows?: boolean | object | any[], fieldOrColumn?: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any> | VxeColumnPropTypes.Field[] | VxeTableDefines.ColumnInfo<any>[]): Promise<VxeTableDefines.ValidatorErrorMapParams<D>>
}

export interface TableValidatorPrivateMethods<D = any> {
  validCellRules(type: any, row: any, column: VxeTableDefines.ColumnInfo<any>, val?: any): Promise<any>
  hasCellRules(type: any, row: any, column: VxeTableDefines.ColumnInfo<any>): boolean
  triggerValidate(type: any): Promise<any>
  showValidTooltip(params: any): void
}

declare module '../grid' {
  export interface VxeGridMethods<D = any> extends TableValidatorMethods<D> { }
}

declare module '../table' {
  export interface VxeTableMethods<D = any> extends TableValidatorMethods<D> { }
  export interface VxeTablePrivateMethods<D = any> extends TableValidatorPrivateMethods<D> { }
}
