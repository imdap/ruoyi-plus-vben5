import { VxeTableDefines } from '../table'

/* eslint-disable no-use-before-define */

export interface TableEditMethods<D = any> {
  /**
   * 往表格插入临时数据，从第一行新增一行或多行新数据
   */
  insert(records: any): Promise<{ row: D, rows: D[] }>
  /**
   * 往表格指定行中插入临时数据
   * 如果 row 为空则从插入到顶部，如果为树结构，则插入到目标节点顶部
   * 如果 row 为 -1 则从插入到底部，如果为树结构，则插入到目标节点底部
   * 如果 row 为有效行则插入到该行的位置，如果为树结构，则有插入到效的目标节点该行的位置
   */
  insertAt(records: any, targetRowOrRowid?: any | -1 | null): Promise<{ row: D, rows: D[] }>
  /**
   * 与 insertAt 行为一致，区别就是会插入指定目标的到下一行
   */
  insertNextAt(records: any, targetRowOrRowid?: any | -1 | null): Promise<{ row: D, rows: D[] }>
  /**
   * 用于树结构，往指定节点插入子级临时数据，从子级的第一行新增一行或多行新数据
   */
  insertChild(records: any, parentRowOrParentId: any): Promise<{ row: D, rows: D[] }>
  /**
   * 用于树结构，往指定节点插入子级临时数据
   * 如果 row 为空则从插入到顶部，如果为树结构，则插入到目标节点顶部
   * 如果 row 为 -1 则从插入到底部，如果为树结构，则插入到目标节点底部
   * 如果 row 为有效行则插入到该行的位置，如果为树结构，则有插入到效的目标节点该行的位置
   */
  insertChildAt(records: any, parentRowOrParentId: any, targetRowOrRowid: any | -1 | null): Promise<{ row: D, rows: D[] }>
  /**
   * 与 insertChildAt 行为一致，区别就是会插入指定目标子级的到下一行
   */
  insertChildNextAt(records: any, parentRowOrParentId: any, targetRowOrRowid: any | -1 | null): Promise<{ row: D, rows: D[] }>
  /**
   * 删除指定行数据，指定 row 或 [row, ...] 删除多条数据，如果为空则删除所有数据
   */
  remove(rows?: any | any[]): Promise<{ row: D, rows: D[] }>
  /**
   * 删除复选框选中的行数据
   */
  removeCheckboxRow(): Promise<{ row: D, rows: D[] }>
  /**
   * 删除单选框选中的行数据
   */
  removeRadioRow(): Promise<{ row: D, rows: D[] }>
  /**
   * 删除当前行选中的行数据
   */
  removeCurrentRow(): Promise<{ row: D, rows: D[] }>
  /**
   * 获取表格数据集
   * 获取新增、删除、更改的数据
   */
  getRecordset(): {
    insertRecords: D[]
    removeRecords: D[]
    updateRecords: D[]
    pendingRecords: D[]
  }
  /**
   * 用于 edit-config，获取新增的临时数据
   */
  getInsertRecords(): D[]
  /**
   * 获取已删除的数据
   */
  getRemoveRecords(): D[]
  /**
   * 用于 edit-config，获取已修改的数据
   */
  getUpdateRecords(): D[]
  /**
   * 已废弃，请使用 getEditCell
   * @deprecated
   */
  getActiveRecord(): {
    row: D
    column: VxeTableDefines.ColumnInfo<D>
    /**
     * 请使用 getRowIndex(row)
     * @deprecated
     */
    rowIndex: number
    /**
     * 请使用 getVMRowIndex(row)
     * @deprecated
     */
    $rowIndex: number
    /**
     * 请使用 getColumnIndex(column)
     * @deprecated
     */
    columnIndex: number
    /**
     * 请使用 getVMColumnIndex(column)
     * @deprecated
     */
    $columnIndex: number
    /**
     * 已废弃
     * @deprecated
     */
    cell: HTMLElement
  }
  /**
   * 已废弃，请使用 getEditCell
   * @deprecated
   */
  getEditRecord(): {
    row: D
    column: VxeTableDefines.ColumnInfo<D>
    /**
     * 请使用 getRowIndex(row)
     * @deprecated
     */
    rowIndex: number
    /**
     * 请使用 getVMRowIndex(row)
     * @deprecated
     */
    $rowIndex: number
    /**
     * 请使用 getColumnIndex(column)
     * @deprecated
     */
    columnIndex: number
    /**
     * 请使用 getVMColumnIndex(column)
     * @deprecated
     */
    $columnIndex: number
    /**
     * 已废弃
     * @deprecated
     */
    cell: HTMLElement
  }
  /**
   * 用于 edit-config，获取已激活编辑的单元格信息
   */
  getEditCell(): {
    row: D
    column: VxeTableDefines.ColumnInfo<D>
  } | null
  /**
   * 用于 mouse-config.selected，获取选中的单元格信息
   */
  getSelectedCell(): {
    row: D
    column: VxeTableDefines.ColumnInfo<D>
  } | null
  /**
   * 请使用 clearEdit()
   * @deprecated
   */
  clearActived(row?: any): Promise<any>
  /**
   * 手动清除单元格激活状态
   */
  clearEdit(row?: any): Promise<any>
  /**
   * 手动清除单元格选中状态
   */
  clearSelected(): Promise<any>
  /**
   * 请使用 isEditByRow
   * @deprecated
   */
  isActiveByRow(row: any): boolean
  /**
   * 用于 edit-config，判断行是否为激活编辑状态
   * @param row 指定行
   */
  isEditByRow(row: any): boolean
  /**
   * 请使用 setEditRow
   * @deprecated
   */
  setActiveRow(row: any): Promise<void>
  /**
   * 用于 edit-config，激活行编辑并默认激活第一个列，也可以指定列；如果第二个参数为 true，则默认自动激活第一个可编辑列；也可以传指定列
   * @param row 指定行
   */
  setEditRow(row: any, fieldOrColumn?: boolean | string | VxeTableDefines.ColumnInfo<any>): Promise<void>
  /**
   * 请使用 setEditCell
   * @deprecated
   */
  setActiveCell(row: any, fieldOrColumn: string | VxeTableDefines.ColumnInfo<any>): Promise<void>
  /**
   * 用于 edit-config，激活单元格编辑
   * @param row 指定行
   * @param field 字段名
   */
  setEditCell(row: any, fieldOrColumn: string | VxeTableDefines.ColumnInfo<any>): Promise<void>
  /**
   * 用于 mouse-config.mouse-config，选中某个单元格
   * @param row 指定行
   * @param field 字段名
   */
  setSelectCell(row: any, fieldOrColumn: string | VxeTableDefines.ColumnInfo<any>): Promise<void>
}

export interface TableEditPrivateMethods<D = any> {
  /**
   * @private
   */
  handleEdit(params: any, evnt?: any): Promise<any>
  /**
   * @private
   */
  handleClearEdit(evnt: Event | null, row?: any): Promise<any>
  /**
   * @private
   */
  handleFocus(params: any, evnt?: any): void
  /**
   * @private
   */
  handleSelected(params: any, evnt: any): Promise<any>
  /**
   * @private
   */
  addCellSelectedClass(): void

  /**
   * @private
   * @deprecated
   */
  handleActived(params: any, evnt?: any): Promise<any>
}

declare module '../grid' {
  export interface VxeGridMethods<D = any> extends TableEditMethods<D> { }
}

declare module '../table' {
  export interface VxeTableMethods<D = any> extends TableEditMethods<D> { }
  export interface VxeTablePrivateMethods<D = any> extends TableEditPrivateMethods<D> { }
}
