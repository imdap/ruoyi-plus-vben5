import { RenderFunction, SetupContext, Ref, ComputedRef } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf, VxeComponentSizeType } from '@vxe-ui/core'
import { VxeSplitterPanelProps, VxeSplitterPanelPropTypes } from './splitter-panel'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeSplitter: DefineVxeComponentApp<VxeSplitterProps, VxeSplitterEventProps, VxeSplitterSlots, VxeSplitterMethods>
export type VxeSplitterComponent = DefineVxeComponentOptions<VxeSplitterProps, VxeSplitterEventProps>

export type VxeSplitterInstance = DefineVxeComponentInstance<VxeSplitterProps, VxeSplitterConstructor>

export interface VxeSplitterConstructor extends VxeComponentBaseOptions, VxeSplitterMethods {
  props: VxeSplitterProps
  context: SetupContext<VxeSplitterEmits>
  reactData: SplitterReactData
  getRefMaps(): SplitterPrivateRef
  getComputeMaps(): SplitterPrivateComputed
  renderVN: RenderFunction
}

export interface SplitterPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeSplitterPrivateRef extends SplitterPrivateRef { }

export namespace VxeSplitterPropTypes {
  export type Size = VxeComponentSizeType
  export type Height = string | number
  export type Width = string | number
  export type Padding = boolean
  export type Vertical = boolean
  export type Border = boolean
  export type Resize = boolean
  export type Items = VxeSplitterPanelProps[]
  export interface ItemConfig {
    minWidth?: string | number
    minHeight?: string | number
  }
  export interface BarConfig {
    width?: string | number
    height?: string | number
  }
  export interface ResizeConfig {
    /**
     * 是否实时同步渲染
     */
    immediate?: boolean
    /**
     * 是否显示拖拽提示
     */
    showTip?: boolean
  }
  export interface ActionConfig {
    /**
     * 是否启用
     */
    enabled?: boolean
    /**
     * 触发方式
     */
    trigger?: 'click' | 'dblclick' | '' | null
    /**
     * 显示往向前折叠按钮
     */
    showPrevButton?: boolean
    /**
     * 显示往向后折叠按钮
     */
    showNextButton?: boolean
    /**
     * 自定义展开图标
     */
    openIcon?: string
    /**
     * 自定义关闭图标
     */
    closeIcon?: string

    /**
     * 折叠方向
     * 支持向前和向后折叠
     * @deprecated
     */
    direction?: 'prev' | 'next' | '' | null
  }
}

export interface VxeSplitterProps {
  size?: VxeSplitterPropTypes.Size
  /**
   * 高度
   */
  height?: VxeSplitterPropTypes.Height
  /**
   * 宽度
   */
  width?: VxeSplitterPropTypes.Width
  /**
   * 显示边距
   */
  padding?: VxeSplitterPropTypes.Padding
  /**
   * 使用垂直布局
   */
  vertical?: VxeSplitterPropTypes.Vertical
  /**
   * 是否带有边框
   */
  border?: VxeSplitterPropTypes.Border
  /**
   * 是否允许拖拽
   */
  resize?: VxeSplitterPropTypes.Resize
  /**
   * 面板列表
   */
  items?: VxeSplitterPropTypes.Items
  /**
   * 面板的配置项
   */
  itemConfig?: VxeSplitterPropTypes.ItemConfig
  /**
   * 拖动条配置项
   */
  barConfig?: VxeSplitterPropTypes.BarConfig
  /**
   * 拖拽配置项
   */
  resizeConfig?: VxeSplitterPropTypes.ResizeConfig
  /**
   * 折叠按钮配置项
   */
  actionConfig?: VxeSplitterPropTypes.ActionConfig
}

export interface SplitterPrivateComputed {
  computeItemOpts: ComputedRef<VxeSplitterPropTypes.ItemConfig>
  computeBarOpts: ComputedRef<VxeSplitterPropTypes.BarConfig>
  computeActionOpts: ComputedRef<VxeSplitterPropTypes.ActionConfig>
}
export interface VxeSplitterPrivateComputed extends SplitterPrivateComputed { }

export interface SplitterReactData {
  staticItems: VxeSplitterDefines.PaneConfig[]
  itemList: VxeSplitterDefines.PaneConfig[]
  barWidth: number
  barHeight: number
}

export interface SplitterInternalData {
  wrapperWidth: number
  wrapperHeight: number
}

export interface SplitterMethods {
  dispatchEvent(type: ValueOf<VxeSplitterEmits>, params: Record<string, any>, evnt: Event | null): void
  /**
   * 设置指定面板的展开状态
   */
  setItemExpand(name: VxeSplitterPanelPropTypes.Name, expanded: boolean): Promise<void>
  /**
   * 切换指定面板的展开状态
   */
  toggleItemExpand(name: VxeSplitterPanelPropTypes.Name): Promise<void>
  /**
   * 获取指定面板的展开状态
   */
  getItemExpand(name: VxeSplitterPanelPropTypes.Name): boolean
  /**
   * 重新计算布局
   */
  recalculate(): Promise<void>
  /**
   * 重置面板
   */
  reset(): Promise<void>
  /**
   * 加载面板配置
   */
  loadItem(list: VxeSplitterPanelProps[]): Promise<void>
  /**
   * 重新加载面板配置，区别就是会重置
   */
  reloadItem(list: VxeSplitterPanelProps[]): Promise<void>
}
export interface VxeSplitterMethods extends SplitterMethods { }

export interface SplitterPrivateMethods { }
export interface VxeSplitterPrivateMethods extends SplitterPrivateMethods { }

export type VxeSplitterEmits = [
  'action-dblclick',
  'action-click',
  'toggle-expand',
  'resize-start',
  'resize-drag',
  'resize-end'
]

export namespace VxeSplitterDefines {
  export interface SplitterEventParams extends VxeComponentEventParams {
    $splitter: VxeSplitterConstructor
  }

  export interface PaneConfig extends VxeSplitterPanelProps {
    id: string
    isExpand: boolean
    renderWidth: number
    foldWidth: number
    resizeWidth: number
    renderHeight: number
    resizeHeight: number
    foldHeight: number
  }

  export interface ActionClickEventParams extends SplitterEventParams {
    prevItem: PaneConfig
    nextItem: PaneConfig
  }
  export interface ActionDblclickEventParams extends ActionClickEventParams {}
  export interface ToggleExpandEventParams extends SplitterEventParams {
    prevItem: PaneConfig
    nextItem: PaneConfig
    expanded: boolean
    item: PaneConfig
  }
  export interface ResizeStartEventParams extends SplitterEventParams {
    prevItem: PaneConfig
    nextItem: PaneConfig
  }
  export interface ResizeDragEventParams extends SplitterEventParams {
    prevItem: PaneConfig
    nextItem: PaneConfig
  }
  export interface ResizeEndEventParams extends SplitterEventParams {
    item: PaneConfig
    name: VxeSplitterPanelPropTypes.Name
    offsetHeight: number
    offsetWidth: number
  }
}

export type VxeSplitterEventProps = {
  onActionDblclick?: VxeSplitterEvents.ActionDblclick
  onActionClick?: VxeSplitterEvents.ActionClick
  onToggleExpand?: VxeSplitterEvents.ToggleExpand
  onResizeStart?: VxeSplitterEvents.ResizeStart
  onResizeDrag?: VxeSplitterEvents.ResizeDrag
  onResizeEnd?: VxeSplitterEvents.ResizeEnd
}

export interface VxeSplitterListeners {
  actionDblclick?: VxeSplitterEvents.ActionDblclick
  actionClick?: VxeSplitterEvents.ActionClick
  toggleExpand?: VxeSplitterEvents.ToggleExpand
  resizeStart?: VxeSplitterEvents.ResizeStart
  resizeDrag?: VxeSplitterEvents.ResizeDrag
  resizeEnd?: VxeSplitterEvents.ResizeEnd
}

export namespace VxeSplitterEvents {
  export type ActionDblclick = (params: VxeSplitterDefines.ActionDblclickEventParams) => void
  export type ActionClick = (params: VxeSplitterDefines.ActionClickEventParams) => void
  export type ToggleExpand = (params: VxeSplitterDefines.ToggleExpandEventParams) => void
  export type ResizeStart = (params: VxeSplitterDefines.ResizeStartEventParams) => void
  export type ResizeDrag = (params: VxeSplitterDefines.ResizeDragEventParams) => void
  export type ResizeEnd = (params: VxeSplitterDefines.ResizeEndEventParams) => void
}

export namespace VxeSplitterSlotTypes {
  export interface DefaultSlotParams {
  }
}

export interface VxeSplitterSlots {
  /**
   * 自定义插槽模板
   */
  [key: string]: ((params: {
    name: VxeSplitterPanelPropTypes.Name
    isExpand: boolean
  }) => any) | undefined

  default?: (params: VxeSplitterSlotTypes.DefaultSlotParams) => any
}

export const Splitter: typeof VxeSplitter
export default VxeSplitter
