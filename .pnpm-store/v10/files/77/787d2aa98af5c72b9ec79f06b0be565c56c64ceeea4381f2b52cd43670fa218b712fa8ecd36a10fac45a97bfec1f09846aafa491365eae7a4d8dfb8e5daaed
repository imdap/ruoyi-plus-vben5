import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, VxeComponentSlotType, ValueOf } from '@vxe-ui/core'
import { VxeTableDefines, VxeTablePropTypes, VxeTableConstructor, VxeTablePrivateMethods, VxeTableSlotTypes } from './table'
import { VxeGridConstructor } from './grid'
import { VxeTooltipDefines } from './tooltip'
import { VxeGlobalRendererHandles } from '../ui'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeColumn: DefineVxeComponentApp<VxeColumnProps, VxeColumnEventProps, VxeColumnSlots, VxeColumnMethods>
export type VxeColumnComponent = DefineVxeComponentOptions<VxeColumnProps, VxeColumnEventProps>

export type VxeColumnInstance = DefineVxeComponentInstance<VxeColumnProps, VxeColumnConstructor>

export interface VxeColumnConstructor extends VxeComponentBaseOptions, VxeColumnMethods {
  props: VxeColumnProps
  context: SetupContext<VxeColumnEmits>
  reactData: ColumnReactData
  getRefMaps(): ColumnPrivateRef
  getComputeMaps(): ColumnPrivateComputed
  renderVN: RenderFunction
}

export interface ColumnPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeColumnPrivateRef extends ColumnPrivateRef { }

export namespace VxeColumnPropTypes {
  export type ColId = string | number
  export type Type = 'seq' | 'radio' | 'checkbox' | 'expand' | 'html' | null
  export type Field = string
  export type Title = string | number
  export type Width = number | string
  export type MinWidth = number | string
  export type MaxWidth = number | string
  export type Resizable = boolean
  export type Fixed = 'left' | 'right' | '' | null | undefined
  export type Align = 'left' | 'center' | 'right' | '' | null | undefined
  export type HeaderAlign = Align
  export type FooterAlign = Align
  export type ShowOverflow = VxeTablePropTypes.ShowOverflow
  export type ShowHeaderOverflow = ShowOverflow
  export type ShowFooterOverflow = ShowOverflow
  export type ClassName<D = any> = string | ((params: VxeGlobalRendererHandles.RenderTableCellParams<D>) => string | any[] | { [key: string]: boolean })
  export type HeaderClassName<D = any> = string | ((params: VxeGlobalRendererHandles.RenderTableHeaderParams<D>) => string | any[] | { [key: string]: boolean })
  export type FooterClassName<D = any> = string | ((params: VxeGlobalRendererHandles.RenderTableFooterParams<D>) => string | any[] | { [key: string]: boolean })
  export type Padding = boolean
  export type VerticalAlign = '' | 'top' | 'center' | null

  export type Formatter<D = any> = ((params: VxeColumnDefines.CellFormatterParams<D>) => string | number) | any[] | string

  export type HeaderFormatter = ((params: {
    cellTitle: any
    cellValue: any
    column: VxeTableDefines.ColumnInfo
    _columnIndex: number
  }) => string | number) | any[] | string

  export type FooterFormatter<D = any> = ((params: {
    cellValue: any
    itemValue: any
    column: VxeTableDefines.ColumnInfo<D>
    row: any
    items: any[]
    _columnIndex: number
  }) => string | number) | any[] | string

  export type Sortable = boolean
  export type SortBy<D = any> = string | ((params: {
    row: D
    column: VxeTableDefines.ColumnInfo<D>
  }) => string | number)
  export type SortType = 'auto' | 'string' | 'number' | null

  export interface FilterItem<OD = any> {
    label?: string | number
    value?: any
    data?: OD
    resetValue?: any
    checked?: boolean
  }
  /**
   * 请使用 FilterItem
   * @deprecated
   */
  export interface Filter extends FilterItem {}
  export type Filters<OD = any> = FilterItem<OD>[]

  export type FilterMultiple = boolean

  interface FilterMethodParams<D = any> {
    $table: VxeTableConstructor<D>
    value: any
    option: VxeTableDefines.FilterOption
    cellValue: any
    row: D
    column: VxeTableDefines.ColumnInfo<D>
  }
  export type FilterMethod<D = any> = (params: FilterMethodParams<D>) => boolean

  interface FilterResetMethodParams<D = any> {
    $table: VxeTableConstructor<D>
    options: VxeTableDefines.FilterOption[]
    column: VxeTableDefines.ColumnInfo<D>
  }
  export type FilterResetMethod<D = any> = (params: FilterResetMethodParams<D>) => void

  interface FilterRecoverMethodParams<D = any> {
    $table: VxeTableConstructor<D>
    option: VxeTableDefines.FilterOption
    column: VxeTableDefines.ColumnInfo<D>
  }
  export type FilterRecoverMethod<D = any> = (params: FilterRecoverMethodParams<D>) => void

  /**
   * 筛选渲染配置项
   */
  export interface FilterRender {
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

    startField?: string
    endField?: string

    enabled?: boolean
    options?: any[]
    optionProps?: VxeGlobalRendererHandles.RenderOptionProps
    optionGroups?: any[]
    optionGroupProps?: VxeGlobalRendererHandles.RenderOptionGroupProps
    content?: string
    cellType?: VxeColumnPropTypes.CellType
  }

  export type FloatingFilters = boolean

  /**
   * 设置为分组节点
   */
  export type RowGroupNode = boolean
  /**
   * 设置为树节点
   */
  export type TreeNode = boolean
  /**
   * 设置为拖拽排序
   */
  export type DragSort = boolean
  /**
   * 设置为行高拖拽
   */
  export type RowResize = boolean
  export type Visible = boolean

  /**
   * 指定聚合函数
   */
  export type AggFunc = VxeTableDefines.AggFuncType | boolean | '' | null | undefined

  interface ExportMethodParams<D = any> {
    $table: VxeTableConstructor<D>
    row: D
    column: VxeTableDefines.ColumnInfo<D>
    options: VxeTablePropTypes.ExportHandleOptions
  }
  export type ExportMethod<D = any> = (params: ExportMethodParams<D>) => string | number

  interface HeaderExportParams<D = any> {
    $table: VxeTableConstructor<D>
    column: VxeTableDefines.ColumnInfo<D>
    options: VxeTablePropTypes.ExportHandleOptions
  }
  export type HeaderExportMethod<D = any> = (params: HeaderExportParams<D>) => string | number

  interface FooterExportParams<D = any> {
    $table: VxeTableConstructor<D>
    /**
     * @deprecated
     */
    items: any[]
    /**
     * @deprecated
     */
    itemIndex: number
    row: any
    column: VxeTableDefines.ColumnInfo<D>
    _columnIndex: number
    options: VxeTablePropTypes.ExportHandleOptions
  }
  export type FooterExportMethod<D = any> = (params: FooterExportParams<D>) => string | number

  /**
   * 已废弃，被 TitlePrefix 替换
   * @deprecated
   */
  export type TitleHelp = VxeTooltipDefines.TooltipHelperOption

  export type TitlePrefix = VxeTooltipDefines.TooltipHelperOption
  export type TitleSuffix = VxeTooltipDefines.TooltipHelperOption

  export type CellType = 'auto' | 'number' | 'string' | 'date' | '' | null

  export interface CellRender<D = any, P = Record<string, any>> {
    /**
     * 渲染器名称
     */
    name?: string
    /**
     * 目标组件渲染的参数
     */
    props?: P
    /**
     * 目标组件渲染的属性
     */
    attrs?: Record<string, any>
    /**
     * 多目标渲染
     */
    children?: any[]

    startField?: string
    endField?: string

    events?: Record<string, (cellParams: VxeColumnSlotTypes.DefaultSlotParams<D>, ...args: any[]) => any>
    options?: any[]
    optionProps?: VxeGlobalRendererHandles.RenderOptionProps
    optionGroups?: any[]
    optionGroupProps?: VxeGlobalRendererHandles.RenderOptionGroupProps
    content?: string

    /**
     * 只对特定功能有效，当值为负数时，自动显示为红色
     */
    showNegativeStatus?: boolean
  }

  /**
   * 编辑渲染配置项
   */
  export interface EditRender<D = any, P = Record<string, any>> {
    /**
     * 渲染器名称
     */
    name?: string
    /**
     * 目标组件渲染的参数
     */
    props?: P
    /**
     * 目标组件渲染的属性
     */
    attrs?: Record<string, any>
    /**
     * 多目标渲染
     */
    children?: any[]

    startField?: string
    endField?: string

    events?: Record<string, (cellParams: VxeColumnSlotTypes.EditSlotParams<D>, ...args: any[]) => any>
    enabled?: boolean
    options?: any[]
    optionProps?: VxeGlobalRendererHandles.RenderOptionProps
    optionGroups?: any[]
    optionGroupProps?: VxeGlobalRendererHandles.RenderOptionGroupProps
    autoFocus?: boolean | string
    autoSelect?: boolean
    defaultValue?: ((params: { column: VxeTableDefines.ColumnInfo<D> }) => any) | null | undefined | string | number | RegExp | object | any[] | Date
    immediate?: boolean
    content?: string
    placeholder?: string

    /**
     * 只对 VxeNumberInput 有效，当值为负数时，自动显示为红色
     */
    showNegativeStatus?: boolean

    /**
     * 已废弃，请使用 autoFocus
     * @deprecated
     */
    autofocus?: string
    /**
     * 已废弃，请使用 autoSelect
     * @deprecated
     */
    autoselect?: boolean
  }

  /**
   * 内容渲染配置项
   */
  export interface ContentRender<D = any, P = Record<string, any>> {
    /**
     * 渲染器名称
     */
    name?: string
    /**
     * 目标组件渲染的参数
     */
    props?: P
    /**
     * 目标组件渲染的属性
     */
    attrs?: Record<string, any>
    /**
     * 目标组件渲染的事件
     */
    events?: Record<string, (cellParams: VxeColumnSlotTypes.ContentSlotParams<D>, ...args: any[]) => any>
    /**
     * 多目标渲染
     */
    children?: any[]

    options?: any[]
    optionProps?: VxeGlobalRendererHandles.RenderOptionProps
    optionGroups?: any[]
    optionGroupProps?: VxeGlobalRendererHandles.RenderOptionGroupProps
  }

  export interface WidgetRender<D = any, P = Record<string, any>> {
    /**
     * 渲染器名称
     */
    name?: string
    /**
     * 目标组件渲染的参数
     */
    props?: P
  }

  export type CopyMethod<D = any> = (params: VxeColumnDefines.CellCopyParams<D>) => string

  export type CutMethod<D = any> = (params: VxeColumnDefines.CellCutParams<D>) => void

  export type PasteMethod<D = any> = (params: VxeColumnDefines.CellPasteParams<D>) => void

  export type Params = any

  export type Slots<D = any> = {
    /**
     * 自定义标题模板
     */
    title?: string | ((params: VxeColumnSlotTypes.TitleSlotParams<D>) => VxeComponentSlotType[] | VxeComponentSlotType) | null
    /**
     * 只对 sortable 有效，自定义表头排序的模板
     */
    sort?: string | ((params: VxeColumnSlotTypes.SortSlotParams<D>) => VxeComponentSlotType[] | VxeComponentSlotType) | null
    /**
     * 只对 type=radio 有效，自定义单选框模板
     */
    radio?: string | ((params: VxeColumnSlotTypes.RadioSlotParams<D>) => VxeComponentSlotType[] | VxeComponentSlotType) | null
    /**
     * 只对 type=checkbox 有效，自定义复选框模板
     */
    checkbox?: string | ((params: VxeColumnSlotTypes.CheckboxSlotParams<D>) => VxeComponentSlotType[] | VxeComponentSlotType) | null
    /**
     * 自定义显示内容模板
     */
    default?: string | ((params: VxeColumnSlotTypes.DefaultSlotParams<D>) => VxeComponentSlotType[] | VxeComponentSlotType) | null
    /**
     * 自定义表头内容的模板
     */
    header?: string | ((params: VxeColumnSlotTypes.HeaderSlotParams<D>) => VxeComponentSlotType[] | VxeComponentSlotType) | null
    /**
     * 自定义表尾内容的模板
     */
    footer?: string | ((params: VxeColumnSlotTypes.FooterSlotParams<D>) => VxeComponentSlotType[] | VxeComponentSlotType) | null
    /**
     * 只对 type=expand 有效，自定义展开后的内容模板
     */
    content?: string | ((params: VxeColumnSlotTypes.ContentSlotParams<D>) => VxeComponentSlotType[] | VxeComponentSlotType) | null
    /**
     * 只对 filter-render 启用时有效，自定义筛选模板
     */
    filter?: string | ((params: VxeColumnSlotTypes.FilterSlotParams<D>) => VxeComponentSlotType[] | VxeComponentSlotType) | null
    /**
     * 只对 floating-filters 和 filter-render 启用时有效，自定义浮动筛选模板
     */
    floatingFilter?: string | ((params: VxeColumnSlotTypes.FloatingFilterSlotParams<D>) => VxeComponentSlotType[] | VxeComponentSlotType) | null
    'floating-filter'?: string | ((params: VxeColumnSlotTypes.FloatingFilterSlotParams<D>) => VxeComponentSlotType[] | VxeComponentSlotType) | null
    /**
     * 只对 edit-render 启用时有效，自定义可编辑组件模板
     */
    edit?: string | ((params: VxeColumnSlotTypes.EditSlotParams<D>) => VxeComponentSlotType[] | VxeComponentSlotType) | null
    /**
     * 只对 edit-render 启用时有效，自定义可编辑组件模板
     */
    valid?: string | ((params: VxeColumnSlotTypes.ValidSlotParams<D>) => VxeComponentSlotType[] | VxeComponentSlotType) | null
    /**
     * 只对 row-config.drag 开启后有效，自定义行拖拽按钮图标
     */
    rowDragIcon?: string | ((params: VxeTableSlotTypes.RowDragIconSlotParams<D>) => VxeComponentSlotType[] | VxeComponentSlotType) | null
    'row-drag-icon'?: string | ((params: VxeTableSlotTypes.RowDragIconSlotParams<D>) => VxeComponentSlotType[] | VxeComponentSlotType) | null
    /**
     * 只对 column-config.drag 开启后有效，自定义列拖拽按钮图标
     */
    columnDragIcon?: string | ((params: VxeTableSlotTypes.ColumnDragIconSlotParams<D>) => VxeComponentSlotType[] | VxeComponentSlotType) | null
    'column-drag-icon'?: string | ((params: VxeTableSlotTypes.ColumnDragIconSlotParams<D>) => VxeComponentSlotType[] | VxeComponentSlotType) | null
    /**
     * 只对 aggregate-config 开启后有效，自定义分组列内容模板
     */
    groupContent?: string | ((params: VxeTableSlotTypes.ColumnGroupContentSlotParams<D>) => VxeComponentSlotType[] | VxeComponentSlotType) | null
    'group-content'?: string | ((params: VxeTableSlotTypes.ColumnGroupContentSlotParams<D>) => VxeComponentSlotType[] | VxeComponentSlotType) | null
    /**
     * 只对 agg-func 开启后有效，自定义分组列聚合数据模板
     */
    groupValues?: string | ((params: VxeTableSlotTypes.ColumnGroupValuesSlotParams<D>) => VxeComponentSlotType[] | VxeComponentSlotType) | null
    'group-values'?: string | ((params: VxeTableSlotTypes.ColumnGroupValuesSlotParams<D>) => VxeComponentSlotType[] | VxeComponentSlotType) | null

    /**
     * 已废弃
     * @deprecated
     */
    icon?: string | ((params: VxeColumnSlotTypes.IconSlotParams<D>) => VxeComponentSlotType[] | VxeComponentSlotType) | null
  }
}

export interface VxeColumnProps<D = any> {
  colId?: VxeColumnPropTypes.ColId
  /**
   * 渲染类型
   */
  type?: VxeColumnPropTypes.Type
  /**
   * 列字段名
   */
  field?: VxeColumnPropTypes.Field
  /**
   * 列标题
   */
  title?: VxeColumnPropTypes.Title
  /**
   * 列宽度
   */
  width?: VxeColumnPropTypes.Width
  /**
   * 列最小宽度，把剩余宽度按比例分配
   */
  minWidth?: VxeColumnPropTypes.MinWidth
  /**
   * 列最大宽度
   */
  maxWidth?: VxeColumnPropTypes.MaxWidth
  /**
   * 是否允许拖动列宽调整大小
   */
  resizable?: VxeColumnPropTypes.Resizable
  /**
   * 将列固定在左侧或者右侧
   */
  fixed?: VxeColumnPropTypes.Fixed
  /**
   * 列对齐方式
   */
  align?: VxeColumnPropTypes.Align
  /**
   * 表头对齐方式
   */
  headerAlign?: VxeColumnPropTypes.HeaderAlign
  /**
   * 表尾列的对齐方式
   */
  footerAlign?: VxeColumnPropTypes.FooterAlign
  /**
   * 当内容过长时显示为省略号
   */
  showOverflow?: VxeColumnPropTypes.ShowOverflow
  /**
   * 当表头内容过长时显示为省略号
   */
  showHeaderOverflow?: VxeColumnPropTypes.ShowHeaderOverflow
  /**
   * 当表尾内容过长时显示为省略号
   */
  showFooterOverflow?: VxeColumnPropTypes.ShowFooterOverflow
  /**
   * 给单元格附加 className
   */
  className?: VxeColumnPropTypes.ClassName<D>
  /**
   * 给表头单元格附加 className
   */
  headerClassName?: VxeColumnPropTypes.HeaderClassName<D>
  /**
   * 给表尾单元格附加 className
   */
  footerClassName?: VxeColumnPropTypes.FooterClassName<D>
  /**
   * 格式化显示内容
   */
  formatter?: VxeColumnPropTypes.Formatter<D>
  /**
   * 格式化表头显示内容
   */
  headerFormatter?: VxeColumnPropTypes.HeaderFormatter
  /**
   * 格式化表尾显示内容
   */
  footerFormatter?: VxeColumnPropTypes.FooterFormatter<D>
  /**
   * 单元格默认高度
   */
  padding?: VxeColumnPropTypes.Padding
  /**
   * 垂直对齐方式
   */
  verticalAlign?: VxeColumnPropTypes.VerticalAlign
  /**
   * 是否允许排序
   */
  sortable?: VxeColumnPropTypes.Sortable
  /**
   * 自定义排序的属性
   */
  sortBy?: VxeColumnPropTypes.SortBy<D>
  /**
   * 排序的字段类型，比如字符串转数值等
   */
  sortType?: VxeColumnPropTypes.SortType
  /**
   * 配置筛选条件数组
   */
  filters?: VxeColumnPropTypes.Filters
  /**
   * 筛选是否允许多选
   */
  filterMultiple?: VxeColumnPropTypes.FilterMultiple
  /**
   * 自定义筛选方法
   */
  filterMethod?: VxeColumnPropTypes.FilterMethod<D>
  /**
   * 筛选模板配置项
   */
  filterRender?: VxeColumnPropTypes.FilterRender
  /**
   * 是否启用浮动筛选
   */
  floatingFilters?: VxeColumnPropTypes.FloatingFilters
  /**
   * 设置为分组节点
   */
  rowGroupNode?: VxeColumnPropTypes.RowGroupNode
  /**
   * 设置为树节点
   */
  treeNode?: VxeColumnPropTypes.TreeNode
  /**
   * 设置为拖拽排序
   */
  dragSort?: VxeColumnPropTypes.DragSort
  /**
   * 设置为行高拖拽
   */
  rowResize?: VxeColumnPropTypes.RowResize
  /**
   * 是否可视
   */
  visible?: VxeColumnPropTypes.Visible
   /**
   * 指定聚合函数
   */
  aggFunc?: VxeColumnPropTypes.AggFunc
  /**
   * 自定义表尾单元格数据导出方法
   */
  headerExportMethod?: VxeColumnPropTypes.HeaderExportMethod<D>
  /**
   * 自定义单元格数据导出方法
   */
  exportMethod?: VxeColumnPropTypes.ExportMethod<D>
  /**
   * 自定义表尾单元格数据导出方法
   */
  footerExportMethod?: VxeColumnPropTypes.FooterExportMethod<D>
  /**
   * 已废弃，被 titlePrefix 替换
   * @deprecated
   */
  titleHelp?: VxeColumnPropTypes.TitleHelp
  /**
   * 标题前缀图标配置项
   */
  titlePrefix?: VxeColumnPropTypes.TitlePrefix
  /**
   * 标题后缀图标配置项
   */
  titleSuffix?: VxeColumnPropTypes.TitleSuffix
  /**
   * 单元格值类型
   */
  cellType?: VxeColumnPropTypes.CellType
  /**
   * 单元格渲染配置项
   */
  cellRender?: VxeColumnPropTypes.CellRender<D>
  /**
   * 单元格编辑渲染配置项
   */
  editRender?: VxeColumnPropTypes.EditRender<D>
  /**
   * 内容渲染配置项
   */
  contentRender?: VxeColumnPropTypes.ContentRender
  /**
   * 用于 clip-config.isCopy，重写单元格复制取值的方法，将单元格复制到剪贴板
   */
  copyMethod?: VxeColumnPropTypes.CopyMethod
  /**
   * 用于 clip-config.isCut，重写单元格剪贴值清除的方法，将剪贴单元格的值清除
   */
  cutMethod?: VxeColumnPropTypes.CutMethod
  /**
   * 用于 clip-config.isPaste，重写单元格粘贴赋值的方法，从剪贴板赋值到单元格
   */
  pasteMethod?: VxeColumnPropTypes.PasteMethod
  /**
   * 额外的参数
   */
  params?: VxeColumnPropTypes.Params
}

export interface ColumnPrivateComputed {
}
export interface VxeColumnPrivateComputed extends ColumnPrivateComputed { }

export interface ColumnReactData {
}

export interface ColumnMethods {
  dispatchEvent(type: ValueOf<VxeColumnEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeColumnMethods extends ColumnMethods { }

export interface ColumnPrivateMethods { }
export interface VxeColumnPrivateMethods extends ColumnPrivateMethods { }

export type VxeColumnEmits = []

export namespace VxeColumnDefines {
  export interface ColumnEventParams extends VxeComponentEventParams {
    $table: VxeTableConstructor
  }

  export interface CellFormatterParams<D = any> {
    cellValue: any
    column: VxeTableDefines.ColumnInfo<D>
    row: D
  }

  export interface CellCopyParams<D = any> {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    $grid: VxeGridConstructor<D> | null | undefined
    isCut: boolean
    row: D
    column: VxeTableDefines.ColumnInfo<D>
    cellValue: any
  }

  export interface CellCutParams<D = any> {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    $grid: VxeGridConstructor<D> | null | undefined
    row: D,
    column: VxeTableDefines.ColumnInfo<D>
    cellValue: any
    clipData: {
      text?: string
      html?: string
    }
  }

  export interface CellPasteParams<D = any> {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    $grid: VxeGridConstructor<D> | null | undefined
    isCut: boolean
    row: D,
    column: VxeTableDefines.ColumnInfo<D>
    cellValue: any
    clipData: {
      text?: string
      html?: string
    }
  }
}

export type VxeColumnEventProps = {}

export interface VxeColumnListeners { }

export namespace VxeColumnEvents { }

export namespace VxeColumnSlotTypes {
  export interface FilterSlotParams<D = any> {
    $panel: any
    column: {
      filters: VxeTableDefines.FilterOption[]
    } & VxeTableDefines.ColumnInfo<D>
    columnIndex: number
    $columnIndex: number
    $rowIndex: number
    option: VxeColumnPropTypes.FilterItem
  }
  export interface FloatingFilterSlotParams<D = any> extends VxeTableDefines.CellFloatingFilterParams<D> { }

  export interface EditSlotParams<D = any> extends VxeTableDefines.CellRenderBodyParams<D> { }

  export interface FooterSlotParams<D = any> {
    row: D
    rowIndex: number
    column: VxeTableDefines.ColumnInfo<D>
    columnIndex: number
    _columnIndex: number
    $columnIndex: number
    $rowIndex: number
    items: any[]
    data: D[][]
  }

  export interface HeaderSlotParams<D = any> extends VxeTableDefines.CellRenderHeaderParams<D> { }
  export interface TitleSlotParams<D = any> extends HeaderSlotParams<D> { }
  export interface SortSlotParams<D = any> extends HeaderSlotParams<D> { }

  export interface ContentSlotParams<D = any> extends VxeTableDefines.CellRenderBodyParams<D> { }

  export interface DefaultSlotParams<D = any> extends VxeTableDefines.CellRenderBodyParams<D> { }

  export interface CheckboxSlotParams<D = any> extends DefaultSlotParams<D> {
    checked: boolean
    indeterminate: boolean
  }
  export interface RadioSlotParams<D = any> extends DefaultSlotParams<D> {
    checked: boolean
  }
  export interface IconSlotParams<D = any> extends DefaultSlotParams<D> { }

  export interface ValidSlotParams<D = any> extends DefaultSlotParams<D> {
    rule: VxeTableDefines.ValidatorRule<D>
    content: string
  }
}

export interface VxeColumnSlots<D = any> {
  /**
   * 自定义显示内容模板
   */
  default?: (params: VxeColumnSlotTypes.DefaultSlotParams<D>) => any
  /**
   * 自定义表头内容的模板
   */
  header?: (params: VxeColumnSlotTypes.HeaderSlotParams<D>) => any
  /**
   * 自定义表尾内容的模板
   */
  footer?: (params: VxeColumnSlotTypes.FooterSlotParams<D>) => any
  /**
   * 自定义标题模板
   */
  title?: (params: VxeColumnSlotTypes.TitleSlotParams<D>) => any
  /**
   * 只对 sortable 有效，自定义标题模板
   */
  sort?: (params: VxeColumnSlotTypes.SortSlotParams<D>) => any
  /**
   * 只对 type=checkbox 有效，自定义复选框模板
   */
  checkbox?: (params: VxeColumnSlotTypes.CheckboxSlotParams<D>) => any
  /**
   * 只对 type=radio 有效，自定义单选框模板
   */
  radio?: (params: VxeColumnSlotTypes.RadioSlotParams<D>) => any
  /**
   * 只对 type=expand 有效，自定义展开后的内容模板
   */
  content?: (params: VxeColumnSlotTypes.ContentSlotParams<D>) => any
  /**
   * 只对 filter-render 启用时有效，自定义筛选模板
   */
  filter?: (params: VxeColumnSlotTypes.FilterSlotParams<D>) => any
  /**
   * 只对 floating-filters 和 filter-render 启用时有效，自定义浮动筛选模板
   */
  floatingFilter?: (params: VxeColumnSlotTypes.FloatingFilterSlotParams<D>) => any
  'floating-filter'?: (params: VxeColumnSlotTypes.FloatingFilterSlotParams<D>) => any
  /**
   * 只对 edit-render 启用时有效，自定义可编辑组件模板
   */
  edit?: (params: VxeColumnSlotTypes.EditSlotParams<D>) => any
   /**
   * 只对 edit-render 启用时有效，自定义展示错误校验模板
   */
  valid?: (params: VxeColumnSlotTypes.ValidSlotParams<D>) => any
  /**
   * 只对 row-config.drag 开启后有效，自定义行拖拽按钮图标
   */
  rowDragIcon?: (params: VxeTableSlotTypes.RowDragIconSlotParams<D>) => any
  'row-drag-icon'?: (params: VxeTableSlotTypes.RowDragIconSlotParams<D>) => any
  /**
   * 只对 column-config.drag 开启后有效，自定义列拖拽按钮图标
   */
  columnDragIcon?: (params: VxeTableSlotTypes.ColumnDragIconSlotParams<D>) => any
  'column-drag-icon'?: (params: VxeTableSlotTypes.ColumnDragIconSlotParams<D>) => any
  /**
   * 只对 aggregate-config 开启后有效，自定义分组列内容模板
   */
  groupContent?: (params: VxeTableSlotTypes.ColumnGroupContentSlotParams<D>) => any
  'group-content'?: (params: VxeTableSlotTypes.ColumnGroupContentSlotParams<D>) => any
  /**
   * 只对 agg-func 开启后有效，自定义分组列聚合数据模板
   */
  groupValues?: (params: VxeTableSlotTypes.ColumnGroupValuesSlotParams<D>) => any
  'group-values'?: (params: VxeTableSlotTypes.ColumnGroupValuesSlotParams<D>) => any

  /**
   * 已废弃
   * @deprecated
   */
  icon?: (params: VxeColumnSlotTypes.IconSlotParams<D>) => any
}

export const Column: typeof VxeColumn
export default VxeColumn
