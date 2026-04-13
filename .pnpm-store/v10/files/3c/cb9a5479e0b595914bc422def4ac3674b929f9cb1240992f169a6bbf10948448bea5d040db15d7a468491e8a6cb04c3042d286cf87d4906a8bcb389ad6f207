import { VxeTableDefines } from '../table'
import { VxeColumnPropTypes } from '../column'

/* eslint-disable no-use-before-define */

export interface VxeFilterPanel {
  /**
   * 筛选所有发生改变
   * @param evnt 事件
   * @param checked 是否选中
   */
  changeAllOption(evnt: Event | null, checked: boolean): void
  /**
   * 筛选选项发生改变
   * @param evnt 事件
   * @param checked 是否选中
   * @param option 选项对象
   */
  changeOption(evnt: Event | null, checked: boolean, option: VxeTableDefines.FilterOption): void
  /**
   * 确认筛选
   */
  confirmFilter(evnt?: Event): void
  /**
   * 重置筛选
   */
  resetFilter(evnt?: Event): void
}

export interface TableFilterMethods<D = any> {
  /**
   * 手动弹出筛选
   * @param fieldOrColumn
   */
  openFilter(fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any>):Promise<void>
  /**
   * 用于 filters，修改筛选列表，update 是否同时更新数据，如果不传，则可以手动调用 updateData() 更新数据；如果需要同时触发对应的事件，请使用 setFilterByEvent
   */
  setFilter(fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any>, options: VxeColumnPropTypes.Filters, update?: boolean): Promise<void>
  /**
   * 手动清空筛选条件；如果需要同时触发对应的事件，请使用 clearFilterByEvent
   */
  clearFilter(fieldOrColumn?: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any> | null): Promise<void>
  /**
   * 用于在自定义面板中使用，手动确认筛选
   */
  saveFilterPanel(): Promise<any>
  /**
   * 用于在自定义面板中使用，手动确认筛选并触发 filter-change 事件
   */
  saveFilterPanelByEvent(event: Event): Promise<any>
  /**
   * 用于在自定义面板中使用，手动重置筛选
   */
  resetFilterPanel(): Promise<any>
  /**
   * 用于在自定义面板中使用，手动重置筛选并触发 filter-change 事件
   */
  resetFilterPanelByEvent(event: Event): Promise<any>
  /**
   * 对指定列手动确认筛选
   */
  saveFilter(fieldOrColumn?: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo | null): Promise<any>
  /**
   * 对指定列手动确认筛选并触发 filter-change 事件
   */
  saveFilterByEvent(event: Event, fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo | null): Promise<any>
  /**
   * 对指定列手动重置筛选
   */
  resetFilter(fieldOrColumn?: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo | null): Promise<any>
  /**
   * 对指定列手动重置筛选并触发 filter-change 事件
   */
  resetFilterByEvent(event: Event, fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo | null): Promise<any>
  /**
   * 获取当前筛选的所有列信息
   */
  getCheckedFilters(): VxeTableDefines.FilterCheckedParams<D>[]
  /**
   * 更新筛选选项的状态
   */
  updateFilterOptionStatus(item: VxeTableDefines.FilterOption | VxeColumnPropTypes.FilterItem, checked: boolean): Promise<void>
}

export interface TableFilterPrivateMethods<D = any> {
  /**
   * @private
   */
  checkFilterOptions(): void
  /**
   * @private
   */
  handleClearFilter(column: any): void
  /**
   * @private
   */
  triggerFilterEvent(evnt: any, column: any, params: any): void
  /**
   * @private
   */
  handleOpenFilterColumn(evnt: any, btnEl: HTMLElement | null, cellEl: HTMLElement, column: any, params: any): void
  /**
   * @private
   */
  handleColumnConfirmFilter(column: VxeTableDefines.ColumnInfo, evnt: Event | null): Promise<any>
  /**
   * @private
   */
  confirmFilterEvent(evnt: Event | null, column?: VxeTableDefines.ColumnInfo | null): void
  /**
   * @private
   */
  handleFilterChangeRadioOption (evnt: Event, checked: boolean, item: any): void
  /**
   * @private
   */
  handleFilterChangeMultipleOption (evnt: Event, checked: boolean, item: any): void
  /**
   * @private
   */
  handleFilterChangeOption (evnt: Event, checked: boolean, item: any): void
  /**
   * @private
   */
  handleFilterConfirmFilter (evnt: Event | null, column: VxeTableDefines.ColumnInfo | null): void
  /**
   * @private
   */
  handleFilterResetFilter (evnt: Event | null, column: VxeTableDefines.ColumnInfo | null): void
}

declare module '../grid' {
  export interface VxeGridMethods<D = any> extends TableFilterMethods<D> { }
}

declare module '../table' {
  export interface VxeTableMethods<D = any> extends TableFilterMethods<D> { }
  export interface VxeTablePrivateMethods<D = any> extends TableFilterPrivateMethods<D> { }
}
