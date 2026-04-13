import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, VxeComponentSizeType, ValueOf } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeList: DefineVxeComponentApp<VxeListProps, VxeListEventProps, VxeListSlots, VxeListMethods>
export type VxeListComponent = DefineVxeComponentOptions<VxeListProps, VxeListEventProps>

export type VxeListInstance = DefineVxeComponentInstance<VxeListProps, VxeListConstructor>

export interface VxeListConstructor extends VxeComponentBaseOptions, VxeListMethods {
  props: VxeListProps
  context: SetupContext<VxeListEmits>
  reactData: ListReactData
  internalData: ListInternalData
  getRefMaps(): ListPrivateRef
  getComputeMaps(): ListPrivateComputed
  renderVN: RenderFunction
}

export interface ListPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeListPrivateRef extends ListPrivateRef { }

export namespace VxeListPropTypes {
  export type Size = VxeComponentSizeType
  export type Data = any[]
  export type Height = number | string
  export type MaxHeight = number | string
  export type Loading = boolean
  export type AutoResize = boolean
  export type ClassName = string | ((params: { $list: VxeListConstructor }) => string)
  export type SyncResize = boolean | string | number

  export interface VirtualYConfig {
    /**
     * 指定大于指定行时自动启动纵向虚拟滚动，如果为 0 则总是启用，如果为 -1 则关闭
     */
    gt?: number
    /**
     * 指定每次渲染的数据额外数据，额外数据越大渲染次数就越少，但每次渲染耗时就越久
     */
    oSize?: number
    /**
     * 指定列表项的 className
     */
    sItem?: string
    /**
     * 是否启用
     */
    enabled?: boolean
  }

  /**
   * 已被 VirtualYConfig 替换
   * @deprecated
   */
  export interface ScrollY {
    /**
     * 指定大于指定行时自动启动纵向虚拟滚动，如果为 0 则总是启用，如果为 -1 则关闭
     */
    gt?: number
    /**
     * 指定每次渲染的数据额外数据，额外数据越大渲染次数就越少，但每次渲染耗时就越久
     */
    oSize?: number
    /**
     * 指定列表项的 className
     */
    sItem?: string
    /**
     * 是否启用
     */
    enabled?: boolean
  }
}

export interface VxeListProps<D = any> {
  size?: VxeListPropTypes.Size
  data?: D[]
  height?: VxeListPropTypes.Height
  maxHeight?: VxeListPropTypes.MaxHeight
  loading?: VxeListPropTypes.Loading
  autoResize?: VxeListPropTypes.AutoResize
  syncResize?: VxeListPropTypes.SyncResize
  className?: VxeListPropTypes.ClassName
  virtualYConfig?: VxeListPropTypes.VirtualYConfig

  /**
   * 已废弃，被 virtual-y-config 替换
   * @deprecated
   */
  scrollY?: VxeListPropTypes.ScrollY
}

export interface ListPrivateComputed {
}
export interface VxeListPrivateComputed extends ListPrivateComputed { }

export interface ListReactData {
  scrollYLoad: boolean
  bodyHeight: number
  customHeight: number
  customMaxHeight: number
  parentHeight: number
  topSpaceHeight: number
  items: any[]
}

export interface ListInternalData {
  resizeObserver: ResizeObserver | undefined
  fullData: any[]
  lastScrollLeft: number
  lastScrollTop: number
  scrollYStore: {
    startIndex: number
    endIndex: number
    visibleSize: number
    offsetSize: number
    rowHeight: number
  }
}

export interface ListMethods {
  dispatchEvent(type: ValueOf<VxeListEmits>, params: Record<string, any>, evnt: Event | null): void
  /**
   * 加载数据
   * @param data 列表数据
   */
  loadData(data: any[]): Promise<any>

  /**
   * 加载数据
   * @param data 列表数据
   */
  reloadData(data: any[]): Promise<any>

  /**
   * 重新计算列表
   */
  recalculate(): Promise<void>

  /**
   * 如果有滚动条，则滚动到对应的位置
   */
  scrollTo(x: {
    top?: number | null
    left?: number | null
  } | number | null | undefined, y?: number | null): Promise<void>

  /**
   * 刷新滚动操作，手动同步滚动相关位置
   */
  refreshScroll(): Promise<void>

  /**
   * 手动清除滚动相关信息，还原到初始状态
   */
  clearScroll(): Promise<void>
}
export interface VxeListMethods extends ListMethods { }

export interface ListPrivateMethods { }
export interface VxeListPrivateMethods extends ListPrivateMethods { }

export type VxeListEmits = [
  'scroll'
]

export namespace VxeListDefines {
  export interface ListEventParams extends VxeComponentEventParams {
    $list: VxeListConstructor
  }

  export interface ScrollParams { }
  export interface ScrollEventParams extends ListEventParams, ScrollParams { }
}

export type VxeListEventProps = {
  onScroll?: VxeListEvents.Scroll
}

export interface VxeListListeners {
  scroll?: VxeListEvents.Scroll
}

export namespace VxeListEvents {
  export type Scroll = (params: VxeListDefines.ScrollEventParams) => void
}

export namespace VxeListSlotTypes {
  export interface DefaultSlotParams {
    $list: VxeListConstructor
    items: any[]
  }
}

export interface VxeListSlots {
  default?: (params: VxeListSlotTypes.DefaultSlotParams) => any
}

export const List: typeof VxeList
export default VxeList
