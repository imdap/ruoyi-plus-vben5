import { RenderFunction, SetupContext, ComputedRef, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf, VxeComponentSlotType, VxeComponentAlignType, VxeComponentStatusType } from '@vxe-ui/core'
import { GridPrivateRef, VxeGridProps, VxeGridPropTypes, GridPrivateComputed, GridReactData, GridInternalData, GridMethods, GridPrivateMethods, VxeGridEmits, VxeGridSlots, VxeGridListeners, VxeGridEventProps, VxeGridMethods } from './grid'
import { VxeTablePropTypes } from './table'
import { VxeGanttViewInstance, VxeGanttViewPrivateMethods } from './gantt-module/gantt-view'
import { VxeTooltipPropTypes } from './tooltip'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeGantt: DefineVxeComponentApp<VxeGanttProps, VxeGanttEventProps, VxeGanttSlots, VxeGanttMethods>
export type VxeGanttComponent = DefineVxeComponentOptions<VxeGanttProps, VxeGanttEventProps>

export type VxeGanttInstance<D = any> = DefineVxeComponentInstance<VxeGanttProps<D>, VxeGanttConstructor<D>>

export interface VxeGanttConstructor<D = any> extends VxeComponentBaseOptions, VxeGanttMethods<D> {
  props: VxeGanttProps
  context: SetupContext<VxeGanttEmits>
  reactData: GanttReactData
  internalData: GanttInternalData
  getRefMaps(): GanttPrivateRef
  getComputeMaps(): GanttPrivateComputed
  renderVN: RenderFunction
}

export interface GanttPrivateRef<D = any> extends GridPrivateRef<D> {
  refGanttView: Ref<(VxeGanttViewInstance & VxeGanttViewPrivateMethods) | undefined>
  refGanttContainerElem: Ref<HTMLDivElement | undefined>
  refClassifyWrapperElem: Ref<HTMLDivElement | undefined>
}
export interface VxeGanttPrivateRef<D = any> extends GanttPrivateRef<D> { }

export namespace VxeGanttPropTypes {
  export type Size = VxeGridPropTypes.Size
  export type Layouts = VxeGanttDefines.LayoutKey[] | VxeGanttDefines.LayoutKey[][]
  export type Column<D = any> = VxeGridPropTypes.Column<D>
  export type Columns<D = any> = Column<D>[]
  export interface Link<D = any> extends VxeGanttDefines.LinkStyleConfig {
    /**
     * 线类型
     */
    type: VxeGanttDependencyType
    /**
     * 从指定行
     */
    from: D | string | number
    /**
     * 到目标行
     */
    to: D | string | number
  }
  export type Links<D = any> = Link<D>[]
  export interface PagerConfig extends VxeGridPropTypes.PagerConfig {}
  export interface ProxyConfig<D = any> extends VxeGridPropTypes.ProxyConfig<D> {}
  export interface ToolbarConfig extends VxeGridPropTypes.ToolbarConfig {}
  export interface FormConfig extends VxeGridPropTypes.FormConfig {}
  export interface ZoomConfig extends VxeGridPropTypes.ZoomConfig {}

  export interface TaskConfig {
    /**
     * 标题的字段名
     */
    titleField?: string
    /**
     * 开始日期的字段名
     */
    startField?: string
    /**
     * 结束日期的字段名
     */
    endField?: string
    /**
     * 任务类型
     */
    typeField?: string
    /**
     * 进度的字段名
     */
    progressField?: string
    /**
     * 自定义解析日期的格式 yyyy-MM-dd HH:mm:ss
     */
    dateFormat?: string
  }

  export interface TaskViewScaleConfig {
    /**
     * 年配置
     */
    year?: VxeGanttDefines.ScaleDefaultOptions
    /**
     * 季度配置
     */
    quarter?: VxeGanttDefines.ScaleDefaultOptions
    /**
     * 月配置
     */
    month?: VxeGanttDefines.ScaleDefaultOptions
    /**
     * 周配置
     */
    week?: VxeGanttDefines.ScaleWeekOptions
    /**
     * 星期配置
     */
    day?: VxeGanttDefines.ScaleDefaultOptions
    /**
     * 天配置
     */
    date?: VxeGanttDefines.ScaleDefaultOptions
    /**
     * 小时配置
     */
    hour?: VxeGanttDefines.ScaleDefaultOptions
    /**
     * 分钟配置
     */
    minute?: VxeGanttDefines.ScaleDefaultOptions
    /**
     * 秒配置
     */
    second?: VxeGanttDefines.ScaleDefaultOptions
  }

  export interface TaskNowLineConfig {
    /**
     * 此刻线的显示方式：start（显示到左侧）,center（显示居中），end（显示到右侧），progress（显示实际进度）
     */
    mode?: 'start' | 'progress' | 'center' | 'end'
    /**
     * 字体颜色
     */
    fontColor?: string
    /**
     * 线背景颜色
     */
    bgColor?: string
    /**
     * 线宽度
     */
    width?: number | string
  }

  export interface TaskViewConfig<D = any> {
    /**
     * 高亮此刻线
     */
    showNowLine?: boolean
    /**
     * 日期轴配置项
     */
    scales?: VxeGanttDefines.ColumnScaleType[] | VxeGanttDefines.ColumnScaleConfig[]
    /**
     * 表格样式
     */
    tableStyle?: {
      /**
       * 边框
       */
      border?: VxeTablePropTypes.Border
      /**
       * 宽度
       */
      width?: number | string
      minWidth?: number | string
      maxWidth?: number | string
    }
    /**
     * 网格样式
     */
    gridding?: {
      /**
       * 左侧间距多少列
       */
      leftSpacing?: number
      /**
       * 右侧间距多少列
       */
      rightSpacing?: number
    }
    /**
     * 任务视图样式
     */
    viewStyle?: {
      /**
       * 边框
       */
      border?: VxeTablePropTypes.Border
      /**
       * 单元格宽度
       */
      cellWidth?: number | string
      /**
       * 给行附加 className
       */
      rowClassName?: string | ((params: {
        source: string
        type: string
        scaleType: VxeGanttDefines.ColumnScaleType
        row: D
        rowIndex: number
        $rowIndex: number
        _rowIndex: number
      }) => void | null | string | { [key: string]: boolean | null | undefined })
      /**
       * 行样式
       */
      rowStyle?: Partial<CSSStyleDeclaration> | ((params: {
        source: string
        type: string
        scaleType: VxeGanttDefines.ColumnScaleType
        row: D
        rowIndex: number
        $rowIndex: number
        _rowIndex: number
      }) => void | null | Partial<CSSStyleDeclaration>)
      /**
       * 给单元格附加 className
       */
      cellClassName?: string | ((params: {
        source: string
        type: string
        scaleType: VxeGanttDefines.ColumnScaleType
        dateObj: VxeGanttDefines.ScaleDateObj
        column?: VxeGanttDefines.ViewColumn<D>
        row: D
        rowIndex: number
        $rowIndex: number
        _rowIndex: number
      }) => void | null | string | { [key: string]: boolean | null | undefined })
      /**
       * 单元格样式
       */
      cellStyle?: Partial<CSSStyleDeclaration> | ((params: {
        source: string
        type: string
        scaleType: VxeGanttDefines.ColumnScaleType
        dateObj: VxeGanttDefines.ScaleDateObj
        column?: VxeGanttDefines.ViewColumn<D>
        row: D
        rowIndex: number
        $rowIndex: number
        _rowIndex: number
      }) => void | null | Partial<CSSStyleDeclaration>)
    }
  }

  export interface TaskSplitConfig {
    /**
     * 是否启用
     */
    enabled?: boolean
    /**
     * 是否允许拖拽调整视图宽度
     */
    resize?: boolean
    /**
     * 是否显示左侧表格的折叠按钮
     */
    showCollapseTableButton?: boolean
    /**
     * 是否显示右侧任务的折叠按钮
     */
    showCollapseTaskButton?: boolean
  }

  export interface TaskLinkConfig<D = any> extends VxeGanttDefines.LinkStyleConfig {
    /**
     * 是否启用
     */
    enabled?: boolean
    /**
     * 当鼠标点击依赖线时，是否要高亮当前依赖线
     */
    isCurrent?: boolean
    /**
     * 当鼠标移到依赖线时，是否要高亮当前依赖线
     */
    isHover?: boolean
    /**
     * 是否允许双击依赖线删除
     */
    isDblclickToRemove?: boolean
    /**
     * 依赖线被删除之前的方法，可以通过返回 false 阻止删除
     */
    beforeRemoveMethod?(params: {
      $gantt: VxeGanttConstructor<D>
      linkItem: VxeGanttDefines.LinkConfObj
      fromRow: D
      toRow: D
    }): Promise<boolean> | boolean
    /**
     * 依赖线删除之后的方法
     */
    afterRemoveMethod?(params: {
      $gantt: VxeGanttConstructor<D>
      linkItem: VxeGanttDefines.LinkConfObj
      fromRow: D
      toRow: D
    }): void
    /**
     * 拖拽开始时是否允许依赖线创建的方法，该方法的返回值用来决定是否允许被拖拽
     */
    createStartMethod?(params: {
      $gantt: VxeGanttConstructor<D>
      fromRow: D
      fromPoint: 'start' | 'end'
    }): boolean
    /**
     * 拖拽依赖线创建结束时的方法，该方法的返回值用来决定是否允依赖线许被创建
     */
    createEndMethod?(params: {
      $gantt: VxeGanttConstructor<D>
      fromRow: D
      fromPoint: 'start' | 'end'
      toRow: D
      toPoint: 'start' | 'end'
    }): Promise<boolean> | boolean
    /**
     * 自定义拖拽结束时依赖线创建被赋值的方法
     */
    createSetMethod?(params: {
      $gantt: VxeGanttConstructor<D>
      fromRow: D
      fromPoint: 'start' | 'end'
      toRow: D
      toPoint: 'start' | 'end'
      link: {
        from: string
        to: string
        type: VxeGanttDependencyType
      }
    }): void
  }

  export interface TaskBarConfig<D = any> {
    /**
     * 是否显示进度条
     */
    showProgress?: boolean
    /**
     * 是否在任务条显示内容
     */
    showContent?: boolean
    /**
     * 是否在任务条显示提示信息
     */
    showTooltip?: boolean
    /**
     * 自定义任务条内容方法
     */
    contentMethod?(params: {
      scaleType: VxeGanttDefines.ColumnScaleType
      title: string
      progress?: string | number
      row: D
    }): string | number
    /**
     * 任务条样式
     */
    barStyle?: VxeGanttDefines.BarStyleConfig | ((params: {
      scaleType: VxeGanttDefines.ColumnScaleType
      $gantt: VxeGanttConstructor<D>
      row: D
    }) => VxeGanttDefines.BarStyleConfig)
    /**
     * 是否启用拖拽移动日期
     */
    moveable?: boolean
    /**
     * 是否启用拖拽调整日期
     */
    resizable?: boolean
    /**
     * 是否允许自定义创建依赖线
     */
    linkCreatable?: boolean
  }

  /**
   * 里程碑类型配置项
   */
  export interface TaskBarMilestoneConfig<D = any> {
    /**
     * 自定义图标
     */
    icon?: string | ((params: {
      $gantt: VxeGanttConstructor<D>
      row: D
    }) => string)
    /**
     * 图标状态颜色
     */
    iconStatus?: VxeComponentStatusType | ((params: {
      $gantt: VxeGanttConstructor<D>
      row: D
    }) => VxeComponentStatusType)
    /**
     * 自定义图标样式
     */
    iconStyle?: CSSStyleDeclaration | ((params: {
      $gantt: VxeGanttConstructor<D>
      row: D
    }) => void | null | Partial<CSSStyleDeclaration>)
    /**
     * 是否显示图标
     */
    showIcon?: boolean
  }

  /**
   * 子视图类型配置项
   */
  export interface TaskBarSubviewConfig<D = any> {
    /**
     * 是否启用
     */
    enabled?: boolean
    /**
     * 是否显示任务总览
     */
    showOverview?: boolean
    /**
     * 子视图任务条样式
     */
    barStyle?: CSSStyleDeclaration | ((params: {
      source: string
      type: string
      scaleType: VxeGanttDefines.ColumnScaleType
      row: D
      rowIndex: number
      $rowIndex: number
      _rowIndex: number
    }) => void | null | Partial<CSSStyleDeclaration>)
  }

  export interface TaskBarTooltipConfig<D = any> {
    theme?: VxeTooltipPropTypes.Theme
    enterable?: VxeTooltipPropTypes.Enterable
    enterDelay?: VxeTooltipPropTypes.EnterDelay
    leaveDelay?: VxeTooltipPropTypes.LeaveDelay
    width?: VxeTooltipPropTypes.Width
    height?: VxeTooltipPropTypes.Height
    minWidth?: VxeTooltipPropTypes.MinWidth
    minHeight?: VxeTooltipPropTypes.MinHeight
    maxWidth?: VxeTooltipPropTypes.MaxWidth
    maxHeight?: VxeTooltipPropTypes.MaxHeight
    useHTML?: VxeTooltipPropTypes.UseHTML
    contentMethod?(params: {
      $gantt: VxeGanttConstructor<D>
      scaleType: VxeGanttDefines.ColumnScaleType
      row: D
      rowIndex: number
      $rowIndex: number
      _rowIndex: number
    }): string | null | void
  }

  export interface TaskBarResizeConfig<D = any> {
    /**
     * 是否允许拖拽调整任务起始日期
     */
    allowStart?: boolean
    /**
     * 是否允许拖拽调整任务条结束日期
     */
    allowEnd?: boolean
    /**
     * 拖拽开始时是否允许行拖拽调整任务日期的方法，该方法的返回值用来决定是否允许被拖拽
     */
    resizeStartMethod?(params: {
      $gantt: VxeGanttConstructor<D>
      resizeType: 'start' | 'end'
      row: D
      startDate: Date
      endDate: Date
    }): boolean
    /**
     * 拖拽结束时是否允许行拖拽调整任务日期的方法，该方法的返回值用来决定是否允许被拖拽调整日期范围
     */
    resizeEndMethod?(params: {
      $gantt: VxeGanttConstructor<D>
      resizeType: 'start' | 'end'
      row: D
      startDate: Date
      endDate: Date
      targetStartDate: Date
      targetEndDate: Date
    }): Promise<boolean> | boolean
    /**
     * 自定义拖拽结束时赋值的方法
     */
    resizeSetMethod?(params: {
      $gantt: VxeGanttConstructor<D>
      resizeType: 'start' | 'end'
      row: D
      startDate: Date
      endDate: Date
      targetStartDate: Date
      targetEndDate: Date
      startValue: any
      endValue: any
    }): void
  }

  export interface TaskBarMoveConfig<D = any> {
    /**
     * 拖拽开始时是否允许行拖拽移动任务日期的方法，该方法的返回值用来决定是否允许被拖拽
     */
    moveStartMethod?(params: {
      $gantt: VxeGanttConstructor<D>
      row: D
      startDate: Date
      endDate: Date
    }): boolean
    /**
     * 拖拽移动任务日期结束时的方法，该方法的返回值用来决定是否允许被拖拽移动到指定日期
     */
    moveEndMethod?(params: {
      $gantt: VxeGanttConstructor<D>
      row: D
      startDate: Date
      endDate: Date
      targetStartDate: Date
      targetEndDate: Date
    }): Promise<boolean> | boolean
    /**
     * 自定义拖拽结束时任务日期被赋值的方法
     */
    moveSetMethod?(params: {
      $gantt: VxeGanttConstructor<D>
      row: D
      startDate: Date
      endDate: Date
      targetStartDate: Date
      targetEndDate: Date
      startValue: any
      endValue: any
    }): void
  }
}

export interface VxeGanttProps<D = any> extends Omit<VxeGridProps<D>, 'layouts'> {
  /**
   * 依赖线
   */
  links?: VxeGanttPropTypes.Links<D>
  layouts?: VxeGanttPropTypes.Layouts
  taskConfig?: VxeGanttPropTypes.TaskConfig
  taskViewScaleConfig?: VxeGanttPropTypes.TaskViewScaleConfig
  taskNowLineConfig?: VxeGanttPropTypes.TaskNowLineConfig
  taskViewConfig?: VxeGanttPropTypes.TaskViewConfig<D>
  taskSplitConfig?: VxeGanttPropTypes.TaskSplitConfig
  taskLinkConfig?: VxeGanttPropTypes.TaskLinkConfig
  taskBarConfig?: VxeGanttPropTypes.TaskBarConfig<D>
  taskBarMilestoneConfig?: VxeGanttPropTypes.TaskBarMilestoneConfig<D>
  taskBarSubviewConfig?: VxeGanttPropTypes.TaskBarSubviewConfig<D>
  taskBarTooltipConfig?: VxeGanttPropTypes.TaskBarTooltipConfig<D>
  taskBarResizeConfig?: VxeGanttPropTypes.TaskBarResizeConfig<D>
  taskBarMoveConfig?: VxeGanttPropTypes.TaskBarMoveConfig<D>
}

export interface GanttPrivateComputed<D = any> extends GridPrivateComputed<D> {
  computeTaskOpts: ComputedRef<VxeGanttPropTypes.TaskConfig>
  computeTaskNowLineOpts: ComputedRef<VxeGanttPropTypes.TaskNowLineConfig>
  computeTaskViewOpts: ComputedRef<VxeGanttPropTypes.TaskViewConfig<D>>
  computeTaskViewScaleOpts: ComputedRef<VxeGanttPropTypes.TaskViewScaleConfig>
  computeTaskBarOpts: ComputedRef<VxeGanttPropTypes.TaskBarConfig<D>>
  computeTaskBarMoveOpts: ComputedRef<VxeGanttPropTypes.TaskBarMoveConfig<D>>
  computeTaskBarResizeOpts: ComputedRef<VxeGanttPropTypes.TaskBarResizeConfig<D>>
  computeTaskSplitOpts: ComputedRef<VxeGanttPropTypes.TaskSplitConfig>
  computeTaskBarMilestoneOpts: ComputedRef<VxeGanttPropTypes.TaskBarMilestoneConfig<D>>
  computeTaskBarSubviewOpts: ComputedRef<VxeGanttPropTypes.TaskBarSubviewConfig<D>>
  computeTaskBarTooltipOpts: ComputedRef<VxeGanttPropTypes.TaskBarTooltipConfig>
  computeTaskLinkOpts: ComputedRef<VxeGanttPropTypes.TaskLinkConfig>
  computeTaskViewScales: ComputedRef<VxeGanttDefines.ColumnScaleType[] | VxeGanttDefines.ColumnScaleConfig[] | undefined>
  computeScaleUnit: ComputedRef<VxeGanttDefines.ColumnScaleType>
  computeMinScale: ComputedRef<VxeGanttDefines.ColumnScaleObj>
  computeWeekScale: ComputedRef<VxeGanttDefines.ColumnScaleObj | null | undefined>
  computeTitleField: ComputedRef<string>
  computeStartField: ComputedRef<string>
  computeEndField: ComputedRef<string>
  computeTypeField: ComputedRef<string>
  computeProgressField: ComputedRef<string>
  computeScrollbarOpts: ComputedRef<VxeTablePropTypes.ScrollbarConfig>
  computeScrollbarXToTop: ComputedRef<boolean>
  computeScrollbarYToLeft: ComputedRef<boolean>
}
export interface VxeGanttPrivateComputed<D = any> extends GanttPrivateComputed<D> { }

export interface GanttReactData<D = any> extends GridReactData<D> {
  showLeftView: boolean
  showRightView: boolean
  taskScaleList: VxeGanttDefines.ColumnScaleObj[]
  tableLinks: VxeGanttDefines.LinkConfObj[]

  // 存放 bar tooltip 相关信息
  barTipStore: {
    row: D | null
    content: string
    visible: boolean
    params?: null | {
      row: D | null
      rowIndex: number
      $rowIndex: number
      _rowIndex: number
    }
  }

  dragLinkFromStore: {
    rowid: string | null
    type: 0 | 1
  }
  activeLink: VxeGanttDefines.LinkConfObj | null
  activeBarRowid: any
  isActiveCeLe: boolean
  linkList: VxeGanttDefines.LinkConfObj[]
  upLinkFlag: number

  nowTime: number
  currLeftSpacing: number
  currRightSpacing: number
}

export interface GanttInternalData extends GridInternalData {
  linkFromConfMaps: Record<string, VxeGanttDefines.LinkConfObj[]>
  linkFromKeyMaps: Record<string, VxeGanttDefines.LinkConfObj>
  linkUniqueMaps: Record<string, VxeGanttDefines.LinkConfObj>
  resizeTableWidth: number
  barTipTimeout?: any

  dragBarRow?: any
  dragLineRow?: any
  dragLinkToStore: {
    rowid: string | null
    type: 0 | 1
  }

  _msTout?: any
}

export interface GanttMethods<D = any> extends Omit<GridMethods<D>, 'dispatchEvent'> {
  dispatchEvent(type: ValueOf<VxeGanttEmits>, params: Record<string, any>, evnt: Event | null): void
  /**
   * 刷新任务视图
   */
  refreshTaskView(): Promise<any>

  /**
   * 表格视图是否显示
   */
  hasTableViewVisible(): boolean
  /**
   * 显示表格视图
   */
  showTableView(): Promise<void>
  /**
   * 隐藏表格视图
   */
  hideTableView(): Promise<void>
  /**
   * 任务视图是否显示
   */
  hasTaskViewVisible(): boolean
  /**
   * 显示任务视图
   */
  showTaskView(): Promise<void>
  /**
   * 隐藏任务视图
   */
  hideTaskView(): Promise<void>
  /**
   * 手动关闭任务条提示
   */
  closeTaskBarTooltip(): Promise<void>
  /**
   * 如果有滚动条，则滚动到对应的任务视图
   */
  scrollToTaskView(rowOrRowid: any): Promise<any>
}
export interface VxeGanttMethods<D = any> extends GanttMethods<D>, Omit<VxeGridMethods<D>, 'dispatchEvent'> { }

export interface GanttPrivateMethods<D = any> extends GridPrivateMethods<D> {
  callSlot<T = any>(slotFunc: ((params: T) => VxeComponentSlotType | VxeComponentSlotType[]) | string | null, params: T): VxeComponentSlotType[]

  /**
   * @private
   */
  handleTaskCellClickEvent(evnt: MouseEvent, params: VxeGanttDefines.TaskCellClickParams): void
  /**
   * @private
   */
  handleTaskCellDblclickEvent(evnt: MouseEvent, params: VxeGanttDefines.TaskCellClickParams): void
  /**
   * @private
   */
  handleTaskHeaderContextmenuEvent(evnt: Event, params: VxeGanttDefines.TaskHeaderContextmenuParams): void
  /**
   * @private
   */
  handleTaskBodyContextmenuEvent(evnt: Event, params: VxeGanttDefines.TaskBodyContextmenuParams): void
  /**
   * @private
   */
  handleTaskFooterContextmenuEvent(evnt: Event, params: VxeGanttDefines.TaskFooterContextmenuParams): void
  /**
   * @private
   */
  handleTaskBarContextmenuEvent(evnt: Event, params: VxeGanttDefines.TaskBarContextmenuParams): void
  /**
   * @private
   */
  handleTaskBarClickEvent(evnt: MouseEvent, params: VxeGanttDefines.TaskBarClickParams): void
  /**
   * @private
   */
  handleTaskBarDblclickEvent(evnt: MouseEvent, params: VxeGanttDefines.TaskBarClickParams): void
  /**
   * @private
   */
  triggerTaskBarTooltipEvent(evnt: MouseEvent, params: VxeGanttDefines.TaskBarMouseoverParams): void
  /**
   * @private
   */
  handleTaskBarTooltipLeaveEvent(evnt: MouseEvent, params: VxeGanttDefines.TaskBarMouseoverParams): void
}
export interface VxeGanttPrivateMethods<D = any> extends GanttPrivateMethods<D> {}

export type VxeGanttEmits = [
  ...VxeGridEmits,

  'task-cell-click',
  'task-cell-dblclick',
  'task-bar-mouseenter',
  'task-bar-mouseleave',
  'task-bar-click',
  'task-bar-dblclick',
  'task-view-cell-click',
  'task-view-cell-dblclick',
  'task-move-start',
  'task-move-drag',
  'task-move-end',
  'task-resize-start',
  'task-resize-drag',
  'task-resize-end',
  'task-link-click',
  'task-link-dblclick',
  'task-link-remove'
]

/**
 * 依赖线枚举类型
 */
export enum VxeGanttDependencyType {
  /**
   * 结束后才开始，表示一个任务必须在另一个任务开始之前完成
   */
  FinishToStart = 0,
  /**
   * 开始到结束，表示从某个过程的开始到结束的整个过程
   */
  StartToFinish = 1,
  /**
   * 开始后才开始，表示一个活动结束了，另一个活动才能开始，它们之间按先后顺序进行
   */
  StartToStart = 2,
  /**
   * 完成到完成，表示一个任务必须在另一个任务完成之后才能完成
   */
  FinishToFinish = 3
}

/**
 * 任务渲染类型
 */
export enum VxeGanttTaskType {
  /**
   * 里程碑类型，该类型节点不需要结束日期
   */
  Milestone = 'milestone',
  /**
   * 子视图类型，该类型会将子任务渲染到一行，无需开始日期和结束日期
   */
  Subview = 'subview'
}

export namespace VxeGanttDefines {
  export interface GanttEventParams<D = any> extends VxeComponentEventParams {
    $gantt: VxeGanttConstructor<D>
  }

  export type LayoutKey = 'Form' | 'Toolbar' | 'Top' | 'Gantt' | 'Bottom' | 'Pager'

  export interface LinkConfObj<D = any> extends VxeGanttPropTypes.Link<D> {
    key: string
    leColorKey: string
    leStatus: VxeComponentStatusType | undefined
    leColor: string | undefined
    leType: LineType | undefined
    leWidth: string | number | undefined
    swArrow: boolean | undefined
  }

  export type LineType = 'dashed' | 'solid' | 'flowDashed'

  export interface LinkStyleConfig {
    /**
     * 线颜色
     */
    lineColor?: string
    /**
     * 线状态颜色,如果需要自定义颜色使用 lineColor
     */
    lineStatus?: VxeComponentStatusType
    /**
     * 线宽度
     */
    lineWidth?: number | string
    /**
     * 线类型
     */
    lineType?: LineType
    /**
     * 显示箭头
     */
    showArrow?: boolean
  }

  export interface BarStyleConfig {
    /**
     * 圆角
     */
    round?: boolean
    /**
     * 任务条的背景颜色
     */
    bgColor?: string
    /**
     * 任务条的字体颜色
     */
    fontColor?: string
    /**
     * 已完成部分任务条的背景颜色
     */
    completedBgColor?: string
    /**
     * 子任务视图概况任务条的背景颜色
     */
    overviewBgColor?: string
  }

  export interface GroupColumn<D = any> {
    scaleItem: ColumnScaleObj
    columns: ViewColumn<D>[]
  }

  export interface ViewColumn<D = any> {
    field: string
    title: string
    dateObj: VxeGanttDefines.ScaleDateObj
    childCount?: number
    children?: ViewColumn<D>[]
  }

  export interface ScaleDateObj {
    date: Date
    yy: string
    yyyy: string
    M: string
    MM: string
    d: string
    dd: string
    H: string
    HH: string
    m: string
    mm: string
    s: string
    ss: string
    q: number
    W: string
    WW: string
    e: number
    E: number
  }

  export interface ScaleDefaultOptions {
    /**
     * 日期跨度间隔
     */
    step?: number
    /**
     * 日期绑定值的格式
     */
    valueFormat?: string
    /**
     * 自定义时间轴-列头单元格标题
     */
    titleMethod?: (params: VxeGanttSlotTypes.TaskViewCellTitleSlotParams) => string | number
    /**
     * 自定义时间轴-自定义标题日期格式
     */
    titleFormat?: string
    /**
     * 自定义时间轴-列头单元格样式
     */
    headerCellStyle?: CSSStyleDeclaration | ((params: VxeGanttSlotTypes.TaskViewHeaderCellStyleSlotParams) => void | null | Partial<CSSStyleDeclaration>)
    /**
     * 自定义插槽模板
     */
    slots?: {
      /**
       * 自定义标题
       */
      title?: string | ((params: VxeGanttSlotTypes.TaskViewCellTitleSlotParams) => VxeComponentSlotType | VxeComponentSlotType[])
    }
  }

  export interface ScaleWeekOptions extends ScaleDefaultOptions {
    /**
     * 设置每周的起始日期是星期几
     */
    startDay?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  }

  /**
   * 日期轴类型
   */
  export type ColumnScaleType = 'second' | 'minute' | 'hour' | 'date' | 'day' | 'week' | 'month' | 'quarter' | 'year'

   export interface ColumnScaleConfig extends ScaleDefaultOptions, ScaleWeekOptions {
    type: ColumnScaleType
    align?: VxeComponentAlignType
  }

  export interface ColumnScaleObj extends ScaleDefaultOptions, ScaleWeekOptions {
    type: ColumnScaleType
    align?: VxeComponentAlignType
    level: number
  }

  export interface RowCacheItem<D = any> {
    row: D
    rowid: string
    oLeftSize: number
    oWidthSize: number
  }

  export interface TaskCellClickParams<D = any> {
    row: D
    column: VxeGanttPropTypes.Column<D>
  }
  export interface TaskBarClickParams<D = any> {
    row: D
  }
  export interface TaskCellClickEventParams<D = any> extends TaskCellClickParams<D>, GanttEventParams {}
  export interface TaskCellDblclickEventParams<D = any> extends TaskCellClickEventParams<D> {}
  export interface TaskBarClickEventParams<D = any> extends TaskBarClickParams<D>, GanttEventParams {}
  export interface TaskBarDblclickEventParams<D = any> extends TaskBarClickEventParams<D> {}

  export interface TaskBarMouseoverParams<D = any> extends GanttEventParams {
    scaleType: VxeGanttDefines.ColumnScaleType
    row: D
    rowIndex: number
    $rowIndex: number
    _rowIndex: number
  }

  export interface TaskHeaderContextmenuParams<D = any> {
    source: string
    type: string
    column: ViewColumn<D>
    $rowIndex: number
  }
  export interface TaskBodyContextmenuParams<D = any> {
    source: string
    type: string
    row?: D
    rowIndex: number
    $rowIndex: number
    _rowIndex: number
    column?: ViewColumn<D>
  }
  export interface TaskFooterContextmenuParams<D = any> {
    source: string
    type: string
    column?: ViewColumn<D>
    $rowIndex: number
  }
  export interface TaskBarContextmenuParams<D = any> {
    source: string
    type: string
    row: D
    rowIndex: number
    $rowIndex: number
    _rowIndex: number
  }

  export interface TaskViewCellClickEventParams<D = any> extends GanttEventParams<D> {
    row: D
    column: ViewColumn<D>
  }
  export interface TaskViewCellDblclickEventParams<D = any> extends TaskViewCellClickEventParams<D> {}

  export interface TaskMoveStartEventParams<D = any> extends GanttEventParams<D> {
    $gantt: VxeGanttConstructor<D>
    row: D
    startDate: Date
    endDate: Date
  }
  export interface TaskMoveDragEventParams<D = any> extends TaskMoveStartEventParams<D> {}
  export interface TaskMoveEndEventParams<D = any> extends TaskMoveStartEventParams<D> {
    targetStartDate: Date
    targetEndDate: Date
  }
  export interface TaskResizeStartEventParams<D = any> extends GanttEventParams<D> {
    $gantt: VxeGanttConstructor<D>
    resizeType: 'start' | 'end'
    row: D
    startDate: Date
    endDate: Date
  }
  export interface TaskResizeDragEventParams<D = any> extends TaskResizeStartEventParams<D> {}
  export interface TaskResizeEndEventParams<D = any> extends TaskResizeStartEventParams<D> {
    targetStartDate: Date
    targetEndDate: Date
  }

  export interface TaskLinkClickEventParams<D = any> extends GanttEventParams<D> {
    linkItem: VxeGanttDefines.LinkConfObj
    fromRow: D
    toRow: D
  }
  export interface TaskLinkDblclickEventParams<D = any> extends TaskLinkClickEventParams<D> {}
  export interface TaskLinkRemoveEventParams<D = any> extends TaskLinkClickEventParams<D> {}
}

export interface VxeGanttEventProps<D = any> extends VxeGridEventProps<D> {
  onTaskCellClick?: VxeGanttEvents.TaskCellClick<D>
  onTaskCellDblclick?: VxeGanttEvents.TaskCellDblclick<D>
  onTaskBarClick?: VxeGanttEvents.TaskBarClick<D>
  onTaskBarDblclick?: VxeGanttEvents.TaskBarDblclick<D>
  onTaskViewCellClick?: VxeGanttEvents.TaskViewCellClick<D>
  onTaskViewCellDblclick?: VxeGanttEvents.TaskViewCellDblclick<D>
  onTaskMoveStart?: VxeGanttEvents.TaskMoveStart<D>
  onTaskMoveDrag?: VxeGanttEvents.TaskMoveDrag<D>
  onTaskMoveEnd?: VxeGanttEvents.TaskMoveEnd<D>
  onTaskResizeStart?: VxeGanttEvents.TaskResizeStart<D>
  onTaskResizeDrag?: VxeGanttEvents.TaskResizeDrag<D>
  onTaskResizeEnd?: VxeGanttEvents.TaskResizeEnd<D>
  onTaskLinkClick?: VxeGanttEvents.TaskLinkRemove<D>
  onTaskLinkDblclick?: VxeGanttEvents.TaskLinkDblclick<D>
  onTaskLinkRemove?: VxeGanttEvents.TaskLinkRemove<D>
}

export interface VxeGanttListeners<D = any> extends VxeGridListeners<D> {
  taskCellClick?: VxeGanttEvents.TaskCellClick<D>
  taskCellDblclick?: VxeGanttEvents.TaskCellDblclick<D>
  taskBarClick?: VxeGanttEvents.TaskBarClick<D>
  taskBarDblclick?: VxeGanttEvents.TaskBarDblclick<D>
  taskViewCellClick?: VxeGanttEvents.TaskViewCellClick<D>
  taskViewCellDblclick?: VxeGanttEvents.TaskViewCellDblclick<D>
  taskMoveStart?: VxeGanttEvents.TaskMoveStart<D>
  taskMoveDrag?: VxeGanttEvents.TaskMoveDrag<D>
  taskMoveEnd?: VxeGanttEvents.TaskMoveEnd<D>
  taskResizeStart?: VxeGanttEvents.TaskResizeStart<D>
  taskResizeDrag?: VxeGanttEvents.TaskResizeDrag<D>
  taskResizeEnd?: VxeGanttEvents.TaskResizeEnd<D>
  taskLinkClick?: VxeGanttEvents.TaskLinkClick<D>
  taskLinkDblclick?: VxeGanttEvents.TaskLinkDblclick<D>
  taskLinkRemove?: VxeGanttEvents.TaskLinkRemove<D>
}

export namespace VxeGanttEvents {
  export type TaskCellClick<D = any> = (params: VxeGanttDefines.TaskCellClickEventParams<D>) => void
  export type TaskCellDblclick<D = any> = (params: VxeGanttDefines.TaskCellDblclickEventParams<D>) => void
  export type TaskBarClick<D = any> = (params: VxeGanttDefines.TaskBarClickEventParams<D>) => void
  export type TaskBarDblclick<D = any> = (params: VxeGanttDefines.TaskBarDblclickEventParams<D>) => void
  export type TaskViewCellClick<D = any> = (params: VxeGanttDefines.TaskViewCellClickEventParams<D>) => void
  export type TaskViewCellDblclick<D = any> = (params: VxeGanttDefines.TaskViewCellDblclickEventParams<D>) => void
  export type TaskMoveStart<D = any> = (params: VxeGanttDefines.TaskMoveStartEventParams<D>) => void
  export type TaskMoveDrag<D = any> = (params: VxeGanttDefines.TaskMoveDragEventParams<D>) => void
  export type TaskMoveEnd<D = any> = (params: VxeGanttDefines.TaskMoveEndEventParams<D>) => void
  export type TaskResizeStart<D = any> = (params: VxeGanttDefines.TaskResizeStartEventParams<D>) => void
  export type TaskResizeDrag<D = any> = (params: VxeGanttDefines.TaskResizeDragEventParams<D>) => void
  export type TaskResizeEnd<D = any> = (params: VxeGanttDefines.TaskResizeEndEventParams<D>) => void
  export type TaskLinkClick<D = any> = (params: VxeGanttDefines.TaskLinkClickEventParams<D>) => void
  export type TaskLinkDblclick<D = any> = (params: VxeGanttDefines.TaskLinkDblclickEventParams<D>) => void
  export type TaskLinkRemove<D = any> = (params: VxeGanttDefines.TaskLinkRemoveEventParams<D>) => void
}

export namespace VxeGanttSlotTypes {
  export interface DefaultSlotParams<D = any> {
    $gantt: VxeGanttConstructor<D>
  }

  export interface TaskBarSlotParams<D = any> {
    row: D
  }

  export interface TaskBarOverviewSlotParams<D = any> {
    row: D
  }

  export interface TaskViewCellTitleSlotParams {
    title: string | number
    dateObj: VxeGanttDefines.ScaleDateObj
    scaleObj: VxeGanttDefines.ColumnScaleObj
    $rowIndex: number
  }
  export interface TaskViewHeaderCellStyleSlotParams extends TaskViewCellTitleSlotParams {}

  export interface TaskBarTooltipSlotParams<D = any> {
    row: D
    rowIndex: number
    $rowIndex: number
    _rowIndex: number
    tooltipContent: string
  }

  export interface TaskTaskNowLineSlotParams {
  }
}

export interface VxeGanttSlots<D = any> extends VxeGridSlots<D> {
  /**
   * 自定义任务模板
   */
  taskBar?(params: VxeGanttSlotTypes.TaskBarSlotParams<D>): any
  'task-bar'?(params: VxeGanttSlotTypes.TaskBarSlotParams<D>): any
  /**
   * 自定义任务总览模板
   */
  taskBarOverview?(params: VxeGanttSlotTypes.TaskBarOverviewSlotParams<D>): any
  'task-bar-overview'?(params: VxeGanttSlotTypes.TaskBarOverviewSlotParams<D>): any
  /**
   * 自定义任务提示模板
   */
  taskBarTooltip?(params: VxeGanttSlotTypes.TaskBarTooltipSlotParams<D>): any
  'task-bar-tooltip'?(params: VxeGanttSlotTypes.TaskBarTooltipSlotParams<D>): any
  /**
   * 自定义任务此刻线模板
   */
  taskNowLine?(params: VxeGanttSlotTypes.TaskTaskNowLineSlotParams): any
  'task-now-line'?(params: VxeGanttSlotTypes.TaskTaskNowLineSlotParams): any
}

export * from './gantt-module'
export * from './gantt-plugins'

export const Gantt: typeof VxeGantt
export default VxeGantt
