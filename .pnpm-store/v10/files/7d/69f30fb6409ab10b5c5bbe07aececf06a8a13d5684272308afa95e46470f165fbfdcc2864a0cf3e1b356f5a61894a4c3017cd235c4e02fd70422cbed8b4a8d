import { VxeComponentStyleType, VxeComponentClassNameType, VxeComponentSlotType, VxeComponentAlignType } from '@vxe-ui/core'
import { VxeTableConstructor, VxeTablePropTypes, VxeTableDefines } from '../components/table'
import { VxeFormItemPropTypes, VxeFormItemSlotTypes, FormItemContentRenderParams, FormItemVisibleParams, FormItemResetParams } from '../components/form-item'
import { VxeGridConstructor, VxeGridPropTypes } from '../components/grid'
import { VxeColumnPropTypes, VxeColumnDefines } from '../components/column'
import { VxeToolbarPropTypes } from '../components/toolbar'
import { VxeButtonConstructor, VxeButtonPropTypes } from '../components/button'
import { VxeIconPickerConstructor, VxeIconPickerDefines } from '../components/icon-picker'
import { VxeFormConstructor, VxeFormDefines, VxeFormProps } from '../components/form'
import { VxeFormDesignDefines, VxeFormDesignConstructor } from '../components/form-design'
import { VxeFormViewDefines, VxeFormViewConstructor } from '../components/form-view'
import { VxeListDesignDefines } from '../components/list-design'
import { VxeTreeSelectPropTypes } from '../components/tree-select'

/* eslint-disable no-use-before-define */

// 表格
declare module '@vxe-ui/core' {
  export interface VxeGlobalRendererOptions {
    /**
     * 表格 - 设置筛选容器 class
     */
    tableFilterClassName?: string | ((params: VxeGlobalRendererHandles.RenderTableFilterParams<any>) => string | VxeComponentClassNameType)
    /**
     * 表格 - 筛选容器是否显示尾部
     */
    showTableFilterFooter?: boolean
    /**
     * 表格 - 自定义筛选渲染内容
     */
    renderTableFilter?(renderOpts: VxeGlobalRendererHandles.RenderTableFilterOptions, renderParams: VxeGlobalRendererHandles.RenderTableFilterParams<any>): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 表格 - 自定义浮动筛选渲染内容
     */
    renderTableFloatingFilter?(renderOpts: VxeGlobalRendererHandles.RenderTableFloatingFilterOptions, renderParams: VxeGlobalRendererHandles.RenderTableFloatingFilterParams<any>): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 表格 - 定义筛选选项数据
     */
    createTableFilterOptions?(params: VxeGlobalRendererHandles.CreateTableFilterOptionsParams): VxeColumnPropTypes.FilterItem[]
    /**
     * 表格 - 筛选面板自适应表格高度
     */
    tableFilterAutoHeight?: boolean
    /**
     * 表格 - 自定义筛选逻辑方法
     */
    tableFilterMethod?(params: VxeGlobalRendererHandles.TableFilterMethodParams<any>): boolean
    /**
     * 表格 - 自定义筛选远程逻辑方法
     */
    tableFilterRemoteMethod?(params: VxeGlobalRendererHandles.TableFilterRemoteMethod<any>): boolean
    /**
     * 表格 - 自定义筛选重置逻辑方法
     */
    tableFilterResetMethod?(params: VxeGlobalRendererHandles.TableFilterResetMethodParams<any>): void
    /**
     * 表格 - 自定义筛选还原逻辑方法
     */
    tableFilterRecoverMethod?(params: VxeGlobalRendererHandles.TableFilterRecoverMethodParams<any>): void
    /**
     * 表格 - 默认筛选处理方法，如果同时存在，会被 tableFilterMethod 覆盖
     */
    tableFilterDefaultMethod?(params: VxeGlobalRendererHandles.TableFilterMethodParams<any>): boolean

    /**
     * 表格 - 单元格对齐方式
     */
    tableCellAlign?: VxeComponentAlignType
    /**
     * 表格 - 表头单元格对齐方式
     */
    tableHeaderCellAlign?: VxeComponentAlignType
    /**
     * 表格 - 列尾单元格对齐方式
     */
    tableFooterCellAlign?: VxeComponentAlignType
    /**
     * 表格 - 单元格设置 class
     */
    tableCellClassName?: string | ((params: VxeGlobalRendererHandles.RenderTableDefaultParams<any>) => string | VxeComponentClassNameType)
    /**
     * 表格 - 单元格设置样式
     */
    tableCellStyle?: VxeComponentStyleType | ((params: VxeGlobalRendererHandles.RenderTableDefaultParams<any>) => VxeComponentStyleType)
    /**
     * 表格 - 渲染头部
     */
    renderTableHeader?(renderOpts: VxeGlobalRendererHandles.RenderTableHeaderOptions, renderParams: VxeGlobalRendererHandles.RenderTableHeaderParams<any>): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 表格 - 渲染单元格
     */
    renderTableDefault?(renderOpts: VxeGlobalRendererHandles.RenderTableDefaultOptions, renderParams: VxeGlobalRendererHandles.RenderTableDefaultParams<any>): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 表格 - 渲染尾部
     */
    renderTableFooter?(renderOpts: VxeGlobalRendererHandles.RenderTableFooterOptions, renderParams: VxeGlobalRendererHandles.RenderTableFooterParams<any>): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 表格 - 自定义单元格导出逻辑
     */
    tableExportMethod?(params: VxeGlobalRendererHandles.TableExportMethodParams<any>): string
    /**
     * 表格 - 自定义表尾单元格导出逻辑
     */
    tableFooterExportMethod?(params: VxeGlobalRendererHandles.TableFooterExportMethodParams<any>): string
    /**
     * 表格 - 自定义单元格格式化方法
     */
    tableCellFormatter?(renderOpts: VxeGlobalRendererHandles.RenderTableDefaultOptions, params: VxeGlobalRendererHandles.TableCellFormatterParams<any>): string
    /**
     * 表格 - 自定义单元格复制方法
     */
    tableCellCopyMethod?(renderOpts: VxeGlobalRendererHandles.RenderTableDefaultOptions, params: VxeGlobalRendererHandles.TableCellCopyMethodParams<any>): string
    /**
     * 表格 - 自定义单元格剪贴方法
     */
    tableCellCutMethod?(renderOpts: VxeGlobalRendererHandles.RenderTableDefaultOptions, params: VxeGlobalRendererHandles.TableCellCutMethodParams<any>): void
    /**
     * 表格 - 自定义单元格粘贴方法
     */
    tableCellPasteMethod?(renderOpts: VxeGlobalRendererHandles.RenderTableDefaultOptions, params: VxeGlobalRendererHandles.TableCellPasteMethodParams<any>): void

    /**
     * 表格 - 激活编辑状态时，设置自动聚焦的 class
     */
    tableAutoFocus?: boolean | string | ((params: VxeGlobalRendererHandles.RenderTableEditParams<any> | VxeGlobalRendererHandles.RenderTableCellParams<any>) => HTMLElement | null)
    /**
     * 表格 - 激活编辑状态时，设置是否自动选中 tableAutoFocus 指定的元素
     */
    tableAutoSelect?: boolean
    /**
     * 表格 - 渲染编辑状态时，与 renderTableCell 配合使用
     */
    renderTableEdit?(renderOpts: VxeGlobalRendererHandles.RenderTableEditOptions<any>, renderParams: VxeGlobalRendererHandles.RenderTableEditParams<any>): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 表格 - 渲染非编辑状态时，与 renderTableEdit 配合使用
     */
    renderTableCell?(renderOpts: VxeGlobalRendererHandles.RenderTableCellOptions<any>, renderParams: VxeGlobalRendererHandles.RenderTableCellParams<any>): VxeComponentSlotType | VxeComponentSlotType[]

    /**
     * 表格 - 展开行渲染
     */
    renderTableExpand?(renderOpts: VxeGlobalRendererHandles.RenderTableExpandOptions, renderParams: VxeGlobalRendererHandles.RenderTableExpandParams<any>): VxeComponentSlotType | VxeComponentSlotType[]

    /**
     * 表格 - 空数据时渲染
     */
    renderTableEmpty?(renderOpts: VxeGlobalRendererHandles.RenderTableEmptyOptions, renderParams: VxeGlobalRendererHandles.RenderTableEmptyParams): VxeComponentSlotType | VxeComponentSlotType[]

    /**
     * 已废弃，请使用 tableFilterMethod
     * @deprecated
     */
    filterMethod?(params: VxeGlobalRendererHandles.TableFilterMethodParams<any>): boolean
    /**
     * 已废弃，请使用 tableFilterRemoteMethod
     * @deprecated
     */
    filterRemoteMethod?(params: VxeGlobalRendererHandles.TableFilterRemoteMethod<any>): boolean
    /**
     * 已废弃，请使用 tableFilterResetMethod
     * @deprecated
     */
    filterResetMethod?(params: VxeGlobalRendererHandles.TableFilterResetMethodParams<any>): void
    /**
     * 已废弃，请使用 tableFilterRecoverMethod
     * @deprecated
     */
    filterRecoverMethod?(params: VxeGlobalRendererHandles.TableFilterRecoverMethodParams<any>): void
    /**
     * 已废弃，请使用 tableFilterDefaultMethod
     * @deprecated
     */
    defaultFilterMethod?(params: VxeGlobalRendererHandles.TableFilterMethodParams<any>): boolean
    /**
     * 已废弃，请使用 tableFilterDefaultMethod
     * @deprecated
     */
    defaultTableFilterMethod?(params: VxeGlobalRendererHandles.TableFilterMethodParams<any>): boolean
    /**
     * 已废弃，请使用 tableFilterClassName
     * @deprecated
     */
    filterClassName?: string | ((params: VxeGlobalRendererHandles.RenderTableFilterParams<any>) => string | VxeComponentClassNameType)
    /**
     * 已废弃，请使用 showTableFilterFooter
     * @deprecated
     */
    isFooter?: boolean
    /**
     * 已废弃，请使用 showTableFilterFooter
     * @deprecated
     */
    showFilterFooter?: boolean
    /**
     * 已废弃，请使用 tableCellClassName
     * @deprecated
     */
    cellClassName?: string | ((params: VxeGlobalRendererHandles.RenderTableDefaultParams<any>) => string | VxeComponentClassNameType)
    /**
     * 已废弃，请使用 tableCellStyle
     * @deprecated
     */
    cellStyle?: VxeComponentStyleType | ((params: VxeGlobalRendererHandles.RenderTableDefaultParams<any>) => VxeComponentStyleType)
    /**
     * 已废弃，请使用 tableAutoFocus
     * @deprecated
     */
    autofocus?: string | ((params: VxeGlobalRendererHandles.RenderTableEditParams<any> | VxeGlobalRendererHandles.RenderTableCellParams<any>) => HTMLElement | null)
    /**
     * 已废弃，请使用 tableAutoFocus
     * @deprecated
     */
    tableAutofocus?: string | ((params: VxeGlobalRendererHandles.RenderTableEditParams<any> | VxeGlobalRendererHandles.RenderTableCellParams<any>) => HTMLElement | null)
    /**
     * 已废弃，请使用 tableAutoSelect
     * @deprecated
     */
    autoselect?: boolean
    /**
     * 已废弃，请使用 tableExportMethod
     * @deprecated
     */
    exportMethod?(params: VxeGlobalRendererHandles.TableExportMethodParams<any>): string
    /**
     * 已废弃，请使用 tableFooterExportMethod
     * @deprecated
     */
    footerExportMethod?(params: VxeGlobalRendererHandles.TableFooterExportMethodParams<any>): string
    /**
     * 已废弃，请使用 renderTableHeader
     * @deprecated
     */
    renderHeader?(renderOpts: VxeGlobalRendererHandles.RenderTableHeaderOptions, renderParams: VxeGlobalRendererHandles.RenderTableHeaderParams<any>): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 已废弃，请使用 renderTableFooter
     * @deprecated
     */
    renderFooter?(renderOpts: VxeGlobalRendererHandles.RenderTableFooterOptions, renderParams: VxeGlobalRendererHandles.RenderTableFooterParams<any>): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 已废弃，请使用 renderTableFilter
     * @deprecated
     */
    renderFilter?(renderOpts: VxeGlobalRendererHandles.RenderTableFilterOptions, renderParams: VxeGlobalRendererHandles.RenderTableFilterParams<any>): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 已废弃，请使用 renderTableDefault
     * @deprecated
     */
    renderDefault?(renderOpts: VxeGlobalRendererHandles.RenderTableDefaultOptions, renderParams: VxeGlobalRendererHandles.RenderTableDefaultParams<any>): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 已废弃，请使用 renderTableEdit
     * @deprecated
     */
    renderEdit?(renderOpts: VxeGlobalRendererHandles.RenderTableEditOptions<any>, renderParams: VxeGlobalRendererHandles.RenderTableEditParams<any>): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 已废弃，请使用 renderTableCell
     * @deprecated
     */
    renderCell?(renderOpts: VxeGlobalRendererHandles.RenderTableCellOptions<any>, renderParams: VxeGlobalRendererHandles.RenderTableCellParams<any>): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 已废弃，请使用 renderTableExpand
     * @deprecated
     */
    renderExpand?(renderOpts: VxeGlobalRendererHandles.RenderTableExpandOptions, renderParams: VxeGlobalRendererHandles.RenderTableExpandParams<any>): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * @deprecated 已废弃
     */
    className?: string
    /**
     * 已废弃，请使用 renderTableEmptyView
     * @deprecated
     */
    renderEmpty?(renderOpts: VxeGlobalRendererHandles.RenderTableEmptyOptions, renderParams: VxeGlobalRendererHandles.RenderTableEmptyParams): VxeComponentSlotType | VxeComponentSlotType[]
    renderTableEmptyView?(renderOpts: VxeGlobalRendererHandles.RenderTableEmptyOptions, renderParams: VxeGlobalRendererHandles.RenderTableEmptyParams): VxeComponentSlotType | VxeComponentSlotType[]
  }

  export namespace VxeGlobalRendererHandles {
    /**
     * @deprecated
     */
    export interface RenderFilterOptions extends RenderTableFilterOptions {}
    export interface RenderTableFilterOptions extends VxeColumnPropTypes.FilterRender {}
    export interface RenderTableFloatingFilterOptions extends VxeColumnPropTypes.FilterRender {}

    export interface CreateTableFilterOptionsParams<D = any> {
      $table: VxeTableConstructor<D>
      column: VxeTableDefines.ColumnInfo<D>
    }

    export interface RenderParams {}

    /**
     * @deprecated
     */
    export interface RenderFilterParams<D = any> extends RenderTableFilterParams<D> {}
    export interface RenderTableFilterParams<D = any> {
      $table: VxeTableConstructor<D>
      $panel: any
      column: {
        filters: VxeTableDefines.FilterOption[]
      } & VxeTableDefines.ColumnInfo<D>
      columnIndex: number
      $columnIndex: number
      $rowIndex: number
    }

    export interface RenderTableFloatingFilterParams<D = any> {
      $table: VxeTableConstructor<D>
      option: VxeTableDefines.FilterOption
      column: {
        filters: VxeTableDefines.FilterOption[]
      } & VxeTableDefines.ColumnInfo<D>
      columnIndex: number
      $columnIndex: number
    }

    /**
     * @deprecated
     */
    export interface FilterMethodParams<D = any> extends TableFilterMethodParams<D> {}
    export interface TableFilterMethodParams<D = any> {
      $table: VxeTableConstructor<D>
      value: any
      option: VxeTableDefines.FilterOption
      cellValue: any
      row: any
      column: VxeTableDefines.ColumnInfo<D>
    }

    /**
     * @deprecated
     */
    export interface FilterRemoteMethod<D = any> extends TableFilterRemoteMethod<D> {}
    export interface TableFilterRemoteMethod<D = any> extends VxeTableDefines.FilterChangeParams<D> {
      $table: VxeTableConstructor<D>
    }

    /**
     * @deprecated
     */
    export interface FilterResetMethodParams<D = any> extends TableFilterResetMethodParams<D> {}
    export interface TableFilterResetMethodParams<D = any> {
      $table: VxeTableConstructor<D>
      options: VxeTableDefines.FilterOption[]
      column: VxeTableDefines.ColumnInfo<D>
    }

    /**
     * @deprecated
     */
    export interface FilterRecoverMethodParams<D = any> extends TableFilterRecoverMethodParams<D> {}
    export interface TableFilterRecoverMethodParams<D = any> {
      $table: VxeTableConstructor<D>
      option: VxeTableDefines.FilterOption
      column: VxeTableDefines.ColumnInfo<D>
    }

    /**
     * @deprecated
     */
    export interface RenderHeaderOptions extends RenderTableHeaderOptions { }
    export interface RenderTableHeaderOptions extends VxeGlobalRendererHandles.RenderOptions { }

    /**
     * @deprecated
     */
    export interface RenderHeaderParams<D = any> extends RenderTableHeaderParams<D> {}
    export interface RenderTableHeaderParams<D = any> {
      $table: VxeTableConstructor<D>
      column: VxeTableDefines.ColumnInfo<D>
      columnIndex: number
      $columnIndex: number
      $rowIndex: number
    }

    export interface RenderDefaultOptions<D = any> extends RenderTableDefaultOptions<D> {}
    export interface RenderTableDefaultOptions<D = any> extends VxeColumnPropTypes.CellRender<D> {}

    /**
     * @deprecated
     */
    export interface RenderDefaultParams<D = any> extends RenderTableDefaultParams<D> {}
    export interface RenderTableDefaultParams<D = any> extends RenderTableEditParams<D> {}

    /**
     * @deprecated
     */
    export interface RenderFooterOptions extends RenderTableFooterOptions { }
    export interface RenderTableFooterOptions extends VxeGlobalRendererHandles.RenderOptions { }

    /**
     * @deprecated
     */
    export interface RenderFooterParams<D = any> extends RenderTableFooterParams<D>{}
    export interface RenderTableFooterParams<D = any> {
      $table: VxeTableConstructor<D>
      column: VxeTableDefines.ColumnInfo<D>
      columnIndex: number
      _columnIndex: number
      $columnIndex: number
      $rowIndex: number
      items: any[]
      row: any
      data: D[][]
    }

    export interface ExportMethodParams<D = any> extends TableExportMethodParams<D> {}
    export interface TableExportMethodParams<D = any> {
      $table: VxeTableConstructor<D>
      row: D
      column: VxeTableDefines.ColumnInfo<D>
      options: VxeTablePropTypes.ExportHandleOptions
    }

    export interface FooterExportMethodParams<D = any> extends TableFooterExportMethodParams<D> {}
    export interface TableFooterExportMethodParams<D = any> {
      $table: VxeTableConstructor<D>
      items: any[]
      _columnIndex: number
      column: VxeTableDefines.ColumnInfo<D>
      options: VxeTablePropTypes.ExportHandleOptions
    }

    export interface TableCellFormatterParams<D = any> extends VxeColumnDefines.CellFormatterParams<D> {}

    export interface TableCellCopyMethodParams<D = any> extends VxeColumnDefines.CellCopyParams<D> {}
    export interface TableCellCutMethodParams<D = any> extends VxeColumnDefines.CellCutParams<D> {}
    export interface TableCellPasteMethodParams<D = any> extends VxeColumnDefines.CellPasteParams<D> {}

    /**
     * @deprecated
     */
    export interface RenderEditOptions<D = any> extends RenderTableEditOptions<D> {}
    export interface RenderTableEditOptions<D = any, P = any> extends VxeColumnPropTypes.EditRender<D, P> {}

    /**
     * @deprecated
     */
    export interface RenderEditParams<D = any> extends RenderTableEditParams<D> {}
    export interface RenderTableEditParams<D = any> extends VxeTableDefines.CellRenderBodyParams<D> {}

    /**
     * @deprecated
     */
    export interface RenderCellOptions<D = any> extends RenderTableCellOptions<D> {}
    export interface RenderTableCellOptions<D = any, P = any> extends VxeColumnPropTypes.CellRender<D, P> {}

    /**
     * @deprecated
     */
    export interface RenderCellParams<D = any> extends RenderTableCellParams<D> {}
    export interface RenderTableCellParams<D = any> {
      $table: VxeTableConstructor<D>
      $grid: VxeGridConstructor<D> | null | undefined
      column: VxeTableDefines.ColumnInfo<D>
      columnIndex: number
      $columnIndex: number
      rowid: string
      row: D
      rowIndex: number
      $rowIndex: number
      isHidden: boolean
      fixed: VxeColumnPropTypes.Fixed
      type: string
    }

    /**
     * @deprecated
     */
    export interface RenderExpandOptions extends RenderTableExpandOptions {}
    export interface RenderTableExpandOptions extends VxeColumnPropTypes.ContentRender { }

    /**
     * @deprecated
     */
    export interface RenderExpandParams<D = any> extends RenderTableExpandParams<D> {}
    export interface RenderTableExpandParams<D = any> extends RenderTableEditParams<D> {}

    export type RenderTableEmptyOptions = VxeTablePropTypes.EmptyRender

    /**
     * @deprecated
     */
    export interface RenderEmptyParams<D = any> extends RenderTableEmptyParams<D> {}
    export interface RenderTableEmptyParams<D = any> {
      $table: VxeTableConstructor<D>
    }

    /**
   * 渲染选项
   */
  export interface RenderOptions {
    /**
     * 渲染器名称
     */
    name?: string
    /**
     * 目标组件渲染的参数
     */
    props?: { [key: string]: any }
    /**
     * 目标组件渲染的属性
     */
    attrs?: { [key: string]: any }
    /**
     * 目标组件渲染的事件
     */
    events?: { [key: string]: (...args: any[]) => any }
    /**
     * 多目标渲染
     */
    children?: any[]
    /**
     * 渲染类型
     */
    cellType?: VxeColumnPropTypes.CellType
  }

    /**
     * 选项参数
     */
    export interface RenderOptionProps extends VxeTreeSelectPropTypes.OptionProps {
      value?: string
      label?: string
      disabled?: string
      key?: string
    }

    /**
     * 分组选项参数
     */
    export interface RenderOptionGroupProps {
      options?: string
      label?: string
      key?: string
    }
  }
}

// 工具栏
declare module '@vxe-ui/core' {
  export interface VxeGlobalRendererOptions {
    /**
     * 工具栏 - 左侧按钮设置 class
     */
    toolbarButtonClassName?: string | ((params: VxeGlobalRendererHandles.RenderButtonParams<any>) => string | VxeComponentClassNameType)
    /**
     * 工具栏 - 渲染左侧按钮
     */
    renderToolbarButton?(renderOpts: VxeGlobalRendererHandles.RenderButtonOptions, renderParams: VxeGlobalRendererHandles.RenderButtonParams<any>): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 工具栏 - 右侧按钮设置 class
     */
    toolbarToolClassName?: string | ((params: VxeGlobalRendererHandles.RenderToolParams<any>) => string | VxeComponentClassNameType)
    /**
     * 工具栏 - 渲染右侧按钮
     */
    renderToolbarTool?(renderOpts: VxeGlobalRendererHandles.RenderToolOptions, renderParams: VxeGlobalRendererHandles.RenderToolParams<any>): VxeComponentSlotType | VxeComponentSlotType[]
  }

  export namespace VxeGlobalRendererHandles {

    export interface RenderButtonOptions extends VxeToolbarPropTypes.ButtonRender { }
    export interface RenderButtonParams<D = any> {
      $grid: VxeGridConstructor<D> | null | undefined
      $table: VxeTableConstructor<D>
      button: VxeToolbarPropTypes.ButtonConfig
    }

    export interface RenderToolOptions extends VxeToolbarPropTypes.ToolRender { }
    export interface RenderToolParams<D = any> {
      $grid: VxeGridConstructor<D> | null | undefined
      $table: VxeTableConstructor<D>
      tool: VxeToolbarPropTypes.ToolConfig
    }
  }
}

// 表单
declare module '@vxe-ui/core' {
  export interface VxeGlobalRendererOptions {
    /**
     * 表单项 - 设置自动聚焦元素 class
     */
    formItemAutoFocus?: boolean | string | ((params: VxeGlobalRendererHandles.RenderFormItemAutoFocusParams) => HTMLElement | null)
    /**
     * 表单项 - 设置表单项的 class
     */
    formItemClassName?: string | ((params: VxeGlobalRendererHandles.RenderFormItemTitleParams) => string | VxeComponentClassNameType)
    /**
     * 表单项 - 设置表单项的样式
     */
    formItemStyle?: VxeComponentStyleType | ((params: VxeGlobalRendererHandles.RenderFormItemTitleParams) => VxeComponentStyleType)
    /**
     * 表单项 - 设置表单项内容元素的 class
     */
    formItemContentClassName?: string | ((params: VxeGlobalRendererHandles.RenderFormItemTitleParams) => string | VxeComponentClassNameType)
    /**
     * 表单项 - 设置表单项内容元素的样式
     */
    formItemContentStyle?: VxeComponentStyleType | ((params: VxeGlobalRendererHandles.RenderFormItemTitleParams) => VxeComponentStyleType)
    /**
     * 表单项 - 设置表单项标题元素的 class
     */
    formItemTitleClassName?: string | ((params: VxeGlobalRendererHandles.RenderFormItemTitleParams) => string | VxeComponentClassNameType)
    /**
     * 表单项 - 设置表单项标题元素的样式
     */
    formItemTitleStyle?: VxeComponentStyleType | ((params: VxeGlobalRendererHandles.RenderFormItemTitleParams) => VxeComponentStyleType)
    /**
     * 表单项 - 渲染表单项标题
     */
    renderFormItemTitle?(renderOpts: VxeGlobalRendererHandles.RenderFormItemTitleOptions, renderParams: VxeGlobalRendererHandles.RenderFormItemTitleParams): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 表单项 - 渲染表单项内容
     */
    renderFormItemContent?(renderOpts: VxeGlobalRendererHandles.RenderFormItemContentOptions, renderParams: VxeGlobalRendererHandles.RenderFormItemContentParams): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 表单项 - 自定义表单项被显示隐藏逻辑
     */
    formItemVisibleMethod?(params: VxeGlobalRendererHandles.FormItemVisibleMethodParams): boolean
    /**
     * 表单项 - 自定义表单项被重置时的逻辑
     */
    formItemResetMethod?(params: VxeGlobalRendererHandles.FormItemResetMethodParams): void

    /**
     * 已废弃，请使用 formItemClassName
     * @deprecated
     */
    itemClassName?: string | ((params: VxeGlobalRendererHandles.RenderFormItemTitleParams) => string | VxeComponentClassNameType)
    /**
     * 已废弃，请使用 formItemStyle
     * @deprecated
     */
    itemStyle?: VxeComponentStyleType | ((params: VxeGlobalRendererHandles.RenderFormItemTitleParams) => VxeComponentStyleType)
    /**
     * 已废弃，请使用 formItemContentClassName
     * @deprecated
     */
    itemContentClassName?: string | ((params: VxeGlobalRendererHandles.RenderFormItemTitleParams) => string | VxeComponentClassNameType)
    /**
     * 已废弃，请使用 formItemContentStyle
     * @deprecated
     */
    itemContentStyle?: VxeComponentStyleType | ((params: VxeGlobalRendererHandles.RenderFormItemTitleParams) => VxeComponentStyleType)
    /**
     * 已废弃，请使用 formItemTitleClassName
     * @deprecated
     */
    itemTitleClassName?: string | ((params: VxeGlobalRendererHandles.RenderFormItemTitleParams) => string | VxeComponentClassNameType)
    /**
     * 已废弃，请使用 formItemTitleStyle
     * @deprecated
     */
    itemTitleStyle?: VxeComponentStyleType | ((params: VxeGlobalRendererHandles.RenderFormItemTitleParams) => VxeComponentStyleType)
    /**
     * 已废弃，请使用 renderFormItemTitle
     * @deprecated
     */
    renderItemTitle?(renderOpts: VxeGlobalRendererHandles.RenderFormItemTitleOptions, renderParams: VxeGlobalRendererHandles.RenderFormItemTitleParams): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 已废弃，请使用 renderFormItemContent
     * @deprecated
     */
    renderItem?(renderOpts: VxeGlobalRendererHandles.RenderFormItemContentOptions, renderParams: VxeGlobalRendererHandles.RenderFormItemContentParams): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 已废弃，请使用 renderFormItemContent
     * @deprecated
     */
    renderItemContent?(renderOpts: VxeGlobalRendererHandles.RenderFormItemContentOptions, renderParams: VxeGlobalRendererHandles.RenderFormItemContentParams): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 已废弃，请使用 formItemVisibleMethod
     * @deprecated
     */
    itemVisibleMethod?(params: VxeGlobalRendererHandles.FormItemVisibleMethodParams): boolean
    /**
     * 已废弃，请使用 formItemResetMethod
     * @deprecated
     */
    itemResetMethod?(params: VxeGlobalRendererHandles.FormItemResetMethodParams): void
  }

  export namespace VxeGlobalRendererHandles {
    export interface RenderFormItemAutoFocusParams {
      $form: VxeFormConstructor
      $grid: VxeGridConstructor | null | undefined
      data: any
      item: VxeFormDefines.ItemInfo
      field: string
    }

    /**
     * @deprecated
     */
    export type RenderItemTitleOptions = RenderFormItemTitleOptions
    export interface RenderFormItemTitleOptions extends VxeFormItemPropTypes.ItemRender {}

    /**
     * @deprecated
     */
    export type RenderItemTitleParams = RenderFormItemTitleParams
    export interface RenderFormItemTitleParams extends VxeFormItemSlotTypes.TitleSlotParams {}

    /**
     * @deprecated
     */
    export type RenderItemContentOptions = RenderFormItemContentOptions
    export interface RenderFormItemContentOptions extends VxeFormItemPropTypes.ItemRender {}

    /**
     * @deprecated
     */
    export type RenderItemContentParams = RenderFormItemContentParams
    export interface RenderFormItemContentParams extends FormItemContentRenderParams {}

    /**
     * @deprecated
     */
    export type ItemVisibleMethodParams = FormItemVisibleMethodParams
    export interface FormItemVisibleMethodParams extends FormItemVisibleParams {}

    /**
     * @deprecated
     */
    export type ItemResetMethodParams = FormItemResetMethodParams
    export interface FormItemResetMethodParams extends FormItemResetParams {}
  }
}

// 表单设计器
declare module '@vxe-ui/core' {
  export interface VxeGlobalRendererOptions {
    /**
     * 表单设计器 - 渲染左侧控件项
     */
    renderFormDesignWidgetItem?(renderOpts: VxeGlobalRendererHandles.RenderFormDesignWidgetItemOptions, renderParams: VxeGlobalRendererHandles.RenderFormDesignWidgetItemParams): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 表单设计器 - 创建设计器-表单属性数据
     */
    createFormDesignSettingFormConfig?(params: VxeGlobalRendererHandles.CreateFormDesignSettingFormConfigParams): Record<string, any>
    /**
     * 表单设计器 - 渲染设计器-属性表单
     */
    renderFormDesignSettingFormView?(renderOpts: VxeGlobalRendererHandles.RenderFormDesignSettingFormViewOptions, renderParams: VxeGlobalRendererHandles.RenderFormDesignSettingFormViewParams): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 表单设计器 - 渲染设计器-电脑端表单
     */
    renderFormDesignStyleFormView?(renderOpts: VxeGlobalRendererHandles.RenderFormDesignStyleFormViewOptions, renderParams: VxeGlobalRendererHandles.RenderFormDesignStyleFormViewParams): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 表单设计器 - 渲染设计器-手机端表单
     */
    renderFormDesignMobileStyleFormView?(renderOpts: VxeGlobalRendererHandles.RenderFormDesignMobileStyleFormViewOptions, renderParams: VxeGlobalRendererHandles.RenderFormDesignMobileStyleFormViewParams): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 表单设计器 - 创建控件-定义控件信息和控件表单数据
     */
    createFormDesignWidgetConfig?(params: VxeGlobalRendererHandles.CreateFormDesignWidgetConfigParams): VxeGlobalRendererHandles.CreateFormDesignWidgetConfigObj
    /**
     * 表单设计器 - 渲染右侧-控件属性表单
     */
    renderFormDesignWidgetFormView?(renderOpts: VxeGlobalRendererHandles.RenderFormDesignWidgetFormViewOptions, renderParams: VxeGlobalRendererHandles.RenderFormDesignWidgetFormViewParams): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 表单设计器 - 控件渲染器（表单-设计时）
     * 如果不设置，则使用 renderFormDesignWidgetView 渲染
     */
    renderFormDesignWidgetEdit?(renderOpts: VxeGlobalRendererHandles.RenderFormDesignWidgetEditOptions, renderParams: VxeGlobalRendererHandles.RenderFormDesignWidgetEditParams): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 表单设计器 - 控件渲染器（表单-预览时 - 电脑端）
     * 如果不设置，则使用 renderFormDesignWidgetView 渲染
     */
    renderFormDesignWidgetPreview?(renderOpts: VxeGlobalRendererHandles.RenderFormDesignWidgetPreviewOptions, renderParams: VxeGlobalRendererHandles.RenderFormDesignWidgetPreviewParams): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 表单设计器 - 控件渲染器（表单-预览时 - 手机端）
     * 如果不设置，则使用 renderFormDesignWidgetView 渲染
     */
    renderFormDesignWidgetMobilePreview?(renderOpts: VxeGlobalRendererHandles.RenderFormDesignWidgetMobilePreviewOptions, renderParams: VxeGlobalRendererHandles.RenderFormDesignWidgetMobilePreviewParams): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 表单设计器 - 控件渲染器（表单-默认）
     */
    renderFormDesignWidgetView?(renderOpts: VxeGlobalRendererHandles.RenderFormDesignWidgetViewOptions, renderParams: VxeGlobalRendererHandles.RenderFormDesignWidgetViewParams): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 表单设计器 - 子表渲染器（表格-默认）
     */
    renderFormDesignWidgetSubtableDefaultView?(renderOpts: VxeGlobalRendererHandles.RenderFormDesignWidgetSubtableDefaultViewOptions, renderParams: VxeGlobalRendererHandles.RenderFormDesignWidgetSubtableDefaultViewParams): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 表单设计器 - 子表渲染器（表格-查看）
     * 如果不设置，则使用 renderFormDesignWidgetSubtableDefaultView 渲染
     */
    renderFormDesignWidgetSubtableCellView?(renderOpts: VxeGlobalRendererHandles.RenderFormDesignWidgetSubtableCellViewOptions, renderParams: VxeGlobalRendererHandles.RenderFormDesignWidgetSubtableCellViewParams): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 表单设计器 - 子表渲染器（表格-编辑）
     */
    renderFormDesignWidgetSubtableEditView?(renderOpts: VxeGlobalRendererHandles.RenderFormDesignWidgetSubtableEditViewOptions, renderParams: VxeGlobalRendererHandles.RenderFormDesignWidgetSubtableEditViewParams): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 表单设计器 - 自定义子表列的解析
     */
    parseFormDesignWidgetSubtableColumn?(params: VxeGlobalRendererHandles.ParseFormDesignWidgetSubtableColumnParams): VxeGridPropTypes.Column
    /**
     * 表单设计器 - 创建控件字段的默认值
     */
    createFormDesignWidgetFieldValue?(params: VxeGlobalRendererHandles.CreateFormDesignWidgetFieldValue): any
    /**
     * 表单设计器 - 创建控件字段的校验规则
     */
    createFormDesignWidgetFieldRules?(params: VxeGlobalRendererHandles.CreateFormDesignWidgetFieldRules): VxeFormDefines.FormRule[]

    /**
     * 表单视图 - 创建渲染电脑端表单
     */
    createFormViewFormConfig?(params: VxeGlobalRendererHandles.CreateFormViewFormConfigParams): VxeFormProps
    /**
     * 表单视图 - 创建渲染手机端端表单
     */
    createFormViewMobileFormConfig?(params: VxeGlobalRendererHandles.CreateFormViewMobileFormConfigParams): VxeFormProps
  }

  export namespace VxeGlobalRendererHandles {
    export interface FormDesignWidgetNameParams {
      name: string
    }
    export interface FormDesignWidgetCustomGroupParams {}
    export interface CreateFormDesignSettingFormConfigParams {}
    export interface CreateFormDesignWidgetConfigParams {
      name: string
      $formDesign: null | VxeFormDesignConstructor
    }
    export interface CreateFormDesignWidgetConfigObj<D = any> {
      /**
       * 自定义控件字段名
       */
      field?: string | ((params: {
        name: string
        $formDesign: null | VxeFormDesignConstructor
      }) => string)
      /**
       * 控件名称
       */
      title?: string | number | ((params: {
        name: string
        $formDesign: null | VxeFormDesignConstructor
      }) => string)
      /**
       * 是否唯一
       */
      unique?: boolean
      /**
       * 允许拖动的范围
       */
      scope?: '' | 'all' | 'subtable'
      /**
       * 是否允许列表查询
       */
      query?: boolean
      /**
       * 内置分组
       */
      group?: VxeFormDesignDefines.WidgetGroup
      /**
       * 自定义分组名称
       */
      customGroup?: string | number | ((params: {
        name: string
        $formDesign: null | VxeFormDesignConstructor
      }) => string)
      /**
       * 控件图标
       */
      icon?: string | ((params: {
        widget: VxeGlobalRendererHandles.CreateFormDesignWidgetConfigObj
      }) => VxeComponentSlotType | VxeComponentSlotType[])
      /**
       * 控件参数
       */
      options?: D
      children?: VxeFormDesignDefines.WidgetObjItem[]
    }

    export interface RenderFormDesignWidgetItemOptions {}
    export interface RenderFormDesignWidgetItemParams {
      $formDesign: null | VxeFormDesignConstructor
    }

    export interface RenderFormDesignWidgetPreviewOptions extends RenderFormDesignWidgetViewOptions {}
    export interface RenderFormDesignWidgetPreviewParams<D = any> extends RenderFormDesignWidgetViewParams<D> {}

    export interface RenderFormDesignWidgetMobilePreviewOptions extends RenderFormDesignWidgetPreviewOptions {}
    export interface RenderFormDesignWidgetMobilePreviewParams<D = any> extends RenderFormDesignWidgetPreviewParams<D> {}

    export interface RenderFormDesignWidgetSubtableDefaultViewOptions<D = any> extends VxeGlobalRendererHandles.RenderTableDefaultOptions<D> {}
    export interface RenderFormDesignWidgetSubtableDefaultViewParams<D = any> extends Omit<VxeGlobalRendererHandles.RenderTableDefaultParams<D>, '$table'> {
      $table: VxeTableConstructor<D> | null
      widget: VxeFormDesignDefines.WidgetObjItem
    }

    export interface RenderFormDesignWidgetSubtableCellViewOptions<D = any> extends VxeGlobalRendererHandles.RenderTableCellOptions<D> {}
    export interface RenderFormDesignWidgetSubtableCellViewParams<D = any> extends Omit<VxeGlobalRendererHandles.RenderTableCellParams<D>, '$table'> {
      $table: VxeTableConstructor<D> | null
      widget: VxeFormDesignDefines.WidgetObjItem
    }

    export interface RenderFormDesignWidgetSubtableEditViewOptions<D = any> extends VxeGlobalRendererHandles.RenderTableEditOptions<D> {}
    export interface RenderFormDesignWidgetSubtableEditViewParams<D = any> extends Omit<VxeGlobalRendererHandles.RenderTableEditParams<D>, '$table'> {
      $table: VxeTableConstructor<D> | null
      widget: VxeFormDesignDefines.WidgetObjItem
    }

    export interface ParseFormDesignWidgetSubtableColumnParams {
      $formView: null | VxeFormViewConstructor
      name: string
      widget: VxeFormDesignDefines.WidgetObjItem
      readonly: boolean
    }

    export interface RenderFormDesignWidgetViewOptions {
      name: string
    }
    export interface RenderFormDesignWidgetViewParams<D = any> {
      $formView: null | VxeFormViewConstructor
      $formDesign: null | VxeFormDesignConstructor
      readonly: boolean
      disabled: boolean
      widget: VxeFormDesignDefines.WidgetObjItem<D>
      isEditMode: boolean
      isViewMode: boolean
    }

    export interface CreateFormDesignWidgetFieldValue<D = any> {
      $formView: null | VxeFormViewConstructor
      widget: VxeFormDesignDefines.WidgetObjItem<D>
    }
    export interface CreateFormDesignWidgetFieldRules<D = any> extends CreateFormDesignWidgetFieldValue<D> {}
    export interface RenderFormDesignWidgetEditOptions extends RenderFormDesignWidgetFormViewOptions {}
    export interface RenderFormDesignWidgetFormViewOptions {
      name: string
    }
    export interface RenderFormDesignWidgetFormViewParams<D = any> {
      $formView: null | VxeFormViewConstructor
      $formDesign: VxeFormDesignConstructor
      widget: VxeFormDesignDefines.WidgetObjItem<D>
      isEditMode: boolean
      isViewMode: boolean
    }
    export interface RenderFormDesignWidgetEditParams<D = any> extends RenderFormDesignWidgetViewParams<D> {}
    export interface RenderFormDesignSettingFormViewOptions {}
    export interface RenderFormDesignSettingFormViewParams<D = VxeFormDesignDefines.DefaultSettingFormDataObjVO> {
      $formDesign: VxeFormDesignConstructor
      formConfig: D & VxeFormDesignDefines.DefaultSettingFormDataObjVO
    }

    export interface RenderFormDesignStyleFormViewOptions {}
    export interface RenderFormDesignStyleFormViewParams<D = any> extends VxeFormDesignDefines.FormDesignDefaultParams {
      $formDesign: VxeFormDesignConstructor
      formConfig: D
    }

    export interface RenderFormDesignMobileStyleFormViewOptions {}
    export interface RenderFormDesignMobileStyleFormViewParams<D = any> extends RenderFormDesignStyleFormViewParams<D> {}

    export interface CreateFormViewFormConfigParams<D = any> extends VxeFormViewDefines.CreateFormConfigParams<D> {}
    export interface CreateFormViewMobileFormConfigParams<D = any> extends CreateFormViewFormConfigParams<D> {}
  }
}

// 列表设计器
declare module '@vxe-ui/core' {
  export interface VxeGlobalRendererOptions {
    /**
     * 列表设计器 - 创建设计器-表单属性数据
     */
    createListDesignSettingFormConfig?(params: VxeGlobalRendererHandles.CreateListDesignSettingFormConfigParams): Record<string, any>

    createListDesignSettingActionButtonConfig?:(params: VxeGlobalRendererHandles.CreateListDesignSettingActionButtonConfigParams) => VxeGlobalRendererHandles.CreateListDesignSettingActionButtonConfigResult
    listDesignSettingActionButtonMethod?:(params: VxeGlobalRendererHandles.ListDesignSettingActionButtonMethodParams) => void
    renderListDesignSettingActionButtonFormView?(renderOpts: VxeGlobalRendererHandles.RenderListDesignSettingActionButtonFormViewOptions, renderParams: VxeGlobalRendererHandles.RenderListDesignSettingActionButtonFormViewParams): VxeComponentSlotType | VxeComponentSlotType[]
  }
  export namespace VxeGlobalRendererHandles {
    export interface CreateListDesignSettingFormConfigParams {
      name: string
    }

    export interface CreateListDesignSettingActionButtonConfigParams {
      name: string
    }
    export interface CreateListDesignSettingActionButtonConfigResult extends Partial<Omit<VxeListDesignDefines.DefaultSettingFormActionButton, 'name'>> {
      name: string | ((params: { name: string }) => string)
    }

    export interface ListDesignSettingActionButtonMethodParams {
      name: string
    }

    export interface RenderListDesignSettingActionButtonFormViewOptions {
      name: string
    }
    export interface RenderListDesignSettingActionButtonFormViewParams {}
  }
}

// 按钮
declare module '@vxe-ui/core' {
  export interface VxeGlobalRendererOptions {
    /**
     * 按钮 - 渲染前缀
     */
    renderButtonPrefix?(renderOpts: VxeGlobalRendererHandles.RenderButtonPrefixOptions, renderParams: VxeGlobalRendererHandles.RenderButtonPrefixParams): VxeComponentSlotType | VxeComponentSlotType[]
    /**
     * 按钮 - 渲染后缀
     */
    renderButtonSuffix?(renderOpts: VxeGlobalRendererHandles.RenderButtonSuffixOptions, renderParams: VxeGlobalRendererHandles.RenderButtonSuffixParams): VxeComponentSlotType | VxeComponentSlotType[]
  }
  export namespace VxeGlobalRendererHandles {

    export interface RenderButtonPrefixOptions extends VxeButtonPropTypes.PrefixRender { }
    export interface RenderButtonPrefixParams {
      $button: VxeButtonConstructor
    }

    export interface RenderButtonSuffixOptions extends VxeButtonPropTypes.SuffixRender { }
    export interface RenderButtonSuffixParams {
      $button: VxeButtonConstructor
    }
  }
}

// 图标选择器
declare module '@vxe-ui/core' {
  export interface VxeGlobalRendererOptions {
    /**
     * 图标选择器 - 渲染图标
     */
    renderIconPickerOptionIcon?(renderOpts: VxeGlobalRendererHandles.RenderIconPickerOptionIconOptions, renderParams: VxeGlobalRendererHandles.RenderIconPickerOptionIconParams): VxeComponentSlotType | VxeComponentSlotType[]
  }

  export namespace VxeGlobalRendererHandles {

    export interface RenderIconPickerOptionIconOptions extends VxeIconPickerDefines.OptionIconRender { }
    export interface RenderIconPickerOptionIconParams {
      $iconPicker: VxeIconPickerConstructor
      option: VxeIconPickerDefines.IconItemObj
    }
  }
}
