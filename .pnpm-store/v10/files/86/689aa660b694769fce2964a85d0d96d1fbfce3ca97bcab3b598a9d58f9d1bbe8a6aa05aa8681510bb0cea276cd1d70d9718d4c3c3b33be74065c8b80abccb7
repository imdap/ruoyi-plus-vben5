import { RenderFunction, SetupContext, Ref, ComputedRef } from 'vue'
import { VxeComponentBaseOptions, DefineVxeComponentInstance } from '@vxe-ui/core'
import { VxeTableConstructor, VxeTableMethods, VxeTablePrivateMethods } from '../table'
import { VxeGanttDefines } from '../gantt'

/* eslint-disable no-use-before-define */

export interface VxeGanttViewConstructor extends VxeComponentBaseOptions, VxeGanttViewMethods {
  props: VxeGanttViewProps
  context: SetupContext<VxeGanttViewEmits>
  reactData: GanttViewReactData
  internalData: GanttViewInternalData
  getRefMaps(): GanttViewPrivateRef
  getComputeMaps(): GanttViewPrivateComputed
  renderVN: RenderFunction
}
export type VxeGanttViewInstance = DefineVxeComponentInstance<VxeGanttViewProps, VxeGanttViewConstructor>

interface VxeGanttViewProps {
}

export interface GanttViewReactData {
  // 是否启用了横向 X 可视渲染方式加载
  scrollXLoad: boolean
  // 是否启用了纵向 Y 可视渲染方式加载
  scrollYLoad: boolean
  // 是否存在纵向滚动条
  overflowY: boolean
  // 是否存在横向滚动条
  overflowX: boolean
  // 纵向滚动条的宽度
  scrollbarWidth: number
  // 横向滚动条的高度
  scrollbarHeight: number

  // 最后滚动时间戳
  lastScrollTime: number
  lazScrollLoading: boolean

  scrollVMLoading: boolean
  scrollYHeight: number
  scrollYTop: number
  isScrollYBig: boolean
  scrollXLeft: number
  scrollXWidth: number
  isScrollXBig: boolean

  minViewDate: Date | null
  maxViewDate: Date | null
  tableData: any[]
  tableColumn: VxeGanttDefines.ViewColumn[]
  headerGroups: VxeGanttDefines.GroupColumn[]

  viewCellWidth: number
}

export interface GanttViewInternalData {
  xeTable: (VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods) | null
  // 渲染所有列
  visibleColumn: VxeGanttDefines.ViewColumn[]
  startMaps: Record<string, any>
  endMaps: Record<string, any>
  chartMaps: Record<string, VxeGanttDefines.RowCacheItem>
  todayDateMaps: Record<string, string>
  elemStore: {
    [key: string]: Ref<HTMLElement> | null
  }
  // 存放横向 X 虚拟滚动相关的信息
  scrollXStore: {
    preloadSize: number
    offsetSize: number
    visibleSize: number
    visibleStartIndex: number
    visibleEndIndex: number
    startIndex: number
    endIndex: number
  }
  // 最后滚动位置
  lastScrollLeft: number
  lastScrollTop: number

  // 刷新布局
  rceTimeout?: undefined | number
  rceRunTime?: undefined | number

  // 滚动属性
  intoRunScroll?: boolean
  inVirtualScroll?: boolean
  inWheelScroll?: boolean

  inHeaderScroll?: boolean
  inBodyScroll?: boolean
  inFooterScroll?: boolean
  scrollRenderType?: '' | 'left' | 'right'
  // 同步滚动
  lcsTimeout?: undefined | number
  lcsRunTime?: undefined | number

  // 横向虚拟
  lxRunTime?: undefined | number
  lxTimeout?: undefined | number
  // 纵向虚拟
  lyRunTime?: undefined | number
  lyTimeout?: undefined | number
}

export interface GanttViewPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
  refScrollXHandleElem: Ref<HTMLDivElement | undefined>
  refScrollYHandleElem: Ref<HTMLDivElement | undefined>
}

export interface GanttViewPrivateComputed {
  computeScaleDateList: ComputedRef<Date[]>
  computeNowLineLeft: ComputedRef<number>
}

export interface VxeGanttViewPrivateMethods {
  /**
   * @private
   */
  handleUpdateStyle(): void
  /**
   * @private
   */
  handleUpdateCurrentRow(row?: any): void
  /**
   * @private
   */
  handleUpdateHoverRow(row?: any): void
  /**
   * @private
   */
  handleLazyRecalculate(): Promise<void>
  /**
   * @private
   */
  triggerHeaderScrollEvent(evnt: Event): void
  /**
   * @private
   */
  triggerBodyScrollEvent(evnt: Event): void
  /**
   * @private
   */
  // triggerFooterScrollEvent(evnt: Event): void
  /**
   * @private
   */
  triggerVirtualScrollXEvent(evnt: Event): void
  /**
   * @private
   */
  triggerVirtualScrollYEvent(evnt: Event): void
  /**
   * @private
   */
  handleUpdateSXSpace(): void
  /**
   * @private
   */
  handleUpdateSYSpace(): void
  /**
   * @private
   */
  handleUpdateSYStatus(scrollYLoad: boolean): void
}

export interface VxeGanttViewMethods {
  refreshData(): Promise<void>
  updateViewData(force?: boolean): Promise<void>
  connectUpdate(params: {
    $table: VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods
  }): Promise<void>
}

type VxeGanttViewEmits = []
