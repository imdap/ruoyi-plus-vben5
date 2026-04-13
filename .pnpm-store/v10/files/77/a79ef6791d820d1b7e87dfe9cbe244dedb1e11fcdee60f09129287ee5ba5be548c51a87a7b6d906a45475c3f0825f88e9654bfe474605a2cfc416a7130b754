import { RenderFunction, SetupContext, Ref, ComputedRef } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf, VxeComponentSizeType } from '@vxe-ui/core'
import { VxeSplitPaneProps, VxeSplitPanePropTypes } from './split-pane'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */
/**
 * @deprecated
 */
export declare const VxeSplit: DefineVxeComponentApp<VxeSplitProps, VxeSplitEventProps, VxeSplitSlots, VxeSplitMethods>
export type VxeSplitComponent = DefineVxeComponentOptions<VxeSplitProps, VxeSplitEventProps>
/**
 * @deprecated
 */
export type VxeSplitInstance = DefineVxeComponentInstance<VxeSplitProps, VxeSplitConstructor>
/**
 * @deprecated
 */
export interface VxeSplitConstructor extends VxeComponentBaseOptions, VxeSplitMethods {
  props: VxeSplitProps
  context: SetupContext<VxeSplitEmits>
  reactData: SplitReactData
  getRefMaps(): SplitPrivateRef
  getComputeMaps(): SplitPrivateComputed
  renderVN: RenderFunction
}
/**
 * @deprecated
 */
export interface SplitPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeSplitPrivateRef extends SplitPrivateRef { }
/**
 * @deprecated
 */
export namespace VxeSplitPropTypes {
  export type Size = VxeComponentSizeType
  export type Height = string | number
  export type Width = string | number
  export type Padding = boolean
  export type Vertical = boolean
  export type Border = boolean
  export type Resize = boolean
  export type Items = VxeSplitPaneProps[]
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
/**
 * @deprecated
 */
export type VxeSplitProps = {
  size?: VxeSplitPropTypes.Size
  /**
   * 高度
   */
  height?: VxeSplitPropTypes.Height
  /**
   * 宽度
   */
  width?: VxeSplitPropTypes.Width
  /**
   * 显示边距
   */
  padding?: VxeSplitPropTypes.Padding
  /**
   * 使用垂直布局
   */
  vertical?: VxeSplitPropTypes.Vertical
  /**
   * 是否带有边框
   */
  border?: VxeSplitPropTypes.Border
  /**
   * 是否允许拖拽
   */
  resize?: VxeSplitPropTypes.Resize
  /**
   * 面板列表
   */
  items?: VxeSplitPropTypes.Items
  /**
   * 面板的配置项
   */
  itemConfig?: VxeSplitPropTypes.ItemConfig
  /**
   * 拖动条配置项
   */
  barConfig?: VxeSplitPropTypes.BarConfig
  /**
   * 拖拽配置项
   */
  resizeConfig?: VxeSplitPropTypes.ResizeConfig
  /**
   * 折叠按钮配置项
   */
  actionConfig?: VxeSplitPropTypes.ActionConfig
}
/**
 * @deprecated
 */
export interface SplitPrivateComputed {
  computeItemOpts: ComputedRef<VxeSplitPropTypes.ItemConfig>
  computeBarOpts: ComputedRef<VxeSplitPropTypes.BarConfig>
  computeActionOpts: ComputedRef<VxeSplitPropTypes.ActionConfig>
}
export interface VxeSplitPrivateComputed extends SplitPrivateComputed { }
/**
 * @deprecated
 */
export interface SplitReactData {
  staticItems: VxeSplitDefines.PaneConfig[]
  itemList: VxeSplitDefines.PaneConfig[]
  barWidth: number
  barHeight: number
}
/**
 * @deprecated
 */
export interface SplitInternalData {
  wrapperWidth: number
  wrapperHeight: number
}
/**
 * @deprecated
 */
export interface SplitMethods {
  dispatchEvent(type: ValueOf<VxeSplitEmits>, params: Record<string, any>, evnt: Event | null): void
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
  loadItem(list: VxeSplitPaneProps[]): Promise<void>
  /**
   * 重新加载面板配置，区别就是会重置
   */
  reloadItem(list: VxeSplitPaneProps[]): Promise<void>
}
export interface VxeSplitMethods extends SplitMethods { }

export interface SplitPrivateMethods { }
export interface VxeSplitPrivateMethods extends SplitPrivateMethods { }
/**
 * @deprecated
 */
export type VxeSplitEmits = [
  'action-dblclick',
  'action-click',
  'toggle-expand',
  'resize-start',
  'resize-drag',
  'resize-end'
]
/**
 * @deprecated
 */
export namespace VxeSplitDefines {
  export interface SplitEventParams extends VxeComponentEventParams {
    $split: VxeSplitConstructor
  }

  export interface PaneConfig extends VxeSplitPaneProps {
    id: string
    isExpand: boolean
    renderWidth: number
    foldWidth: number
    resizeWidth: number
    renderHeight: number
    resizeHeight: number
    foldHeight: number
  }

  export interface ActionClickEventParams extends SplitEventParams {
    prevItem: PaneConfig
    nextItem: PaneConfig
  }
  export interface ActionDblclickEventParams extends ActionClickEventParams {}
  export interface ToggleExpandEventParams extends SplitEventParams {
    prevItem: PaneConfig
    nextItem: PaneConfig
    expanded: boolean
    item: PaneConfig
  }
  export interface ResizeStartEventParams extends SplitEventParams {
    prevItem: PaneConfig
    nextItem: PaneConfig
  }
  export interface ResizeDragEventParams extends SplitEventParams {
    prevItem: PaneConfig
    nextItem: PaneConfig
  }
  export interface ResizeEndEventParams extends SplitEventParams {
    item: PaneConfig
    name: VxeSplitPanePropTypes.Name
    offsetHeight: number
    offsetWidth: number
  }
}
/**
 * @deprecated
 */
export type VxeSplitEventProps = {
  onActionDblclick?: VxeSplitEvents.ActionDblclick
  onActionClick?: VxeSplitEvents.ActionClick
  onToggleExpand?: VxeSplitEvents.ToggleExpand
  onResizeStart?: VxeSplitEvents.ResizeStart
  onResizeDrag?: VxeSplitEvents.ResizeDrag
  onResizeEnd?: VxeSplitEvents.ResizeEnd
}
/**
 * @deprecated
 */
export interface VxeSplitListeners {
  actionDblclick?: VxeSplitEvents.ActionDblclick
  actionClick?: VxeSplitEvents.ActionClick
  toggleExpand?: VxeSplitEvents.ToggleExpand
  resizeStart?: VxeSplitEvents.ResizeStart
  resizeDrag?: VxeSplitEvents.ResizeDrag
  resizeEnd?: VxeSplitEvents.ResizeEnd
}
/**
 * @deprecated
 */
export namespace VxeSplitEvents {
  export type ActionDblclick = (params: VxeSplitDefines.ActionDblclickEventParams) => void
  export type ActionClick = (params: VxeSplitDefines.ActionClickEventParams) => void
  export type ToggleExpand = (params: VxeSplitDefines.ToggleExpandEventParams) => void
  export type ResizeStart = (params: VxeSplitDefines.ResizeStartEventParams) => void
  export type ResizeDrag = (params: VxeSplitDefines.ResizeDragEventParams) => void
  export type ResizeEnd = (params: VxeSplitDefines.ResizeEndEventParams) => void
}
/**
 * @deprecated
 */
export namespace VxeSplitSlotTypes {
  export interface DefaultSlotParams {
  }
}
/**
 * @deprecated
 */
export interface VxeSplitSlots {
  /**
   * 自定义插槽模板
   */
  [key: string]: ((params: {
    name: VxeSplitPanePropTypes.Name
    isExpand: boolean
  }) => any) | undefined

  default?: (params: VxeSplitSlotTypes.DefaultSlotParams) => any
}
/**
 * @deprecated
 */
export const Split: typeof VxeSplit
export default VxeSplit
