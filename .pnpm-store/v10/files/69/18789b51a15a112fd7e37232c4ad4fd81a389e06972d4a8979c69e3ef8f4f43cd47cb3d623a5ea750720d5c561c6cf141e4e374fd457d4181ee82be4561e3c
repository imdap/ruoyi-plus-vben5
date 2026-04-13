import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, VxeComponentSizeType, VxeComponentSlotType, ValueOf } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeDrawer: DefineVxeComponentApp<VxeDrawerProps, VxeDrawerEventProps, VxeDrawerSlots, VxeDrawerMethods>
export type VxeDrawerComponent = DefineVxeComponentOptions<VxeDrawerProps, VxeDrawerEventProps>

export type VxeDrawerInstance = DefineVxeComponentInstance<VxeDrawerProps, VxeDrawerConstructor>

export interface VxeDrawerConstructor extends VxeComponentBaseOptions, VxeDrawerMethods {
  props: VxeDrawerProps
  context: SetupContext<VxeDrawerEmits>
  reactData: DrawerReactData
  getRefMaps(): DrawerPrivateRef
  getComputeMaps(): DrawerPrivateComputed
  renderVN: RenderFunction
}

export interface DrawerPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeDrawerPrivateRef extends DrawerPrivateRef { }

/**
 * 窗口类型
 */
export type DrawerPosition = 'top' | 'bottom' | 'left' | 'right'

/**
 * 窗口事件类型
 */
export type DrawerEventTypes = 'model' | 'mask' | 'close' | 'confirm' | 'cancel' | 'exit' | 'exist'

export namespace VxeDrawerPropTypes {
  export type Size = VxeComponentSizeType
  export type ModelValue = boolean
  export type ID = string | null
  export type Loading = boolean
  export type ClassName = string
  export type Position = DrawerPosition
  export type Title = string | number
  export type Content = number | string | null
  export type ShowCancelButton = boolean | null
  export type CancelButtonText = string
  export type ShowConfirmButton = boolean | null
  export type ConfirmButtonText = string
  export type LockView = boolean
  export type LockScroll = boolean
  export type Mask = boolean
  export type MaskClosable = boolean
  export type EscClosable = boolean
  export type CancelClosable = boolean
  export type ConfirmClosable = boolean
  export type ShowHeader = boolean
  export type ShowFooter = boolean
  export type ShowClose = boolean
  export type Width = number | string
  export type Height = number | string
  export type Resize = boolean
  export type ZIndex = number
  export type DestroyOnClose = boolean
  export type ShowTitleOverflow = boolean
  export type Transfer = boolean
  export type Padding = boolean
  export type BeforeHideMethod = (params: VxeDrawerDefines.DrawerVisibleParams) => Promise<any>
  export type Slots = VxeDrawerSlots
}

export interface VxeDrawerProps {
  size?: VxeDrawerPropTypes.Size
  modelValue?: VxeDrawerPropTypes.ModelValue
  id?: VxeDrawerPropTypes.ID
  loading?: VxeDrawerPropTypes.Loading
  className?: VxeDrawerPropTypes.ClassName
  position?: VxeDrawerPropTypes.Position
  title?: VxeDrawerPropTypes.Title
  content?: VxeDrawerPropTypes.Content
  showCancelButton?: VxeDrawerPropTypes.ShowCancelButton
  cancelButtonText?: VxeDrawerPropTypes.CancelButtonText
  showConfirmButton?: VxeDrawerPropTypes.ShowConfirmButton
  confirmButtonText?: VxeDrawerPropTypes.ConfirmButtonText
  lockView?: VxeDrawerPropTypes.LockView
  lockScroll?: VxeDrawerPropTypes.LockScroll
  mask?: VxeDrawerPropTypes.Mask
  maskClosable?: VxeDrawerPropTypes.MaskClosable
  escClosable?: VxeDrawerPropTypes.EscClosable
  cancelClosable?: VxeDrawerPropTypes.CancelClosable
  confirmClosable?: VxeDrawerPropTypes.ConfirmClosable
  showHeader?: VxeDrawerPropTypes.ShowHeader
  showFooter?: VxeDrawerPropTypes.ShowFooter
  showClose?: VxeDrawerPropTypes.ShowClose
  width?: VxeDrawerPropTypes.Width
  height?: VxeDrawerPropTypes.Height
  resize?: VxeDrawerPropTypes.Resize
  zIndex?: VxeDrawerPropTypes.ZIndex
  destroyOnClose?: VxeDrawerPropTypes.DestroyOnClose
  showTitleOverflow?: VxeDrawerPropTypes.ShowTitleOverflow
  transfer?: VxeDrawerPropTypes.Transfer
  padding?: VxeDrawerPropTypes.Padding
  beforeHideMethod?: VxeDrawerPropTypes.BeforeHideMethod
  slots?: VxeDrawerPropTypes.Slots
}

export interface DrawerPrivateComputed {
}
export interface VxeDrawerPrivateComputed extends DrawerPrivateComputed { }

export interface DrawerReactData {
  initialized: boolean
  visible: boolean
  contentVisible: boolean
  drawerZIndex: number
  resizeFlag: number
}

export interface DrawerMethods {
  dispatchEvent(type: ValueOf<VxeDrawerEmits>, params: Record<string, any>, evnt: Event | null): void
  /**
   * 手动打开窗口
   */
  open(): Promise<any>
  /**
   * 手动关闭窗口
   */
  close(): Promise<any>
  /**
   * 获取当前窗口元素
   */
  getBox(): HTMLElement
}
export interface VxeDrawerMethods extends DrawerMethods { }

export interface DrawerPrivateMethods { }
export interface VxeDrawerPrivateMethods extends DrawerPrivateMethods { }

export type VxeDrawerEmits = [
  'update:modelValue',
  'show',
  'hide',
  'before-hide',
  'close',
  'confirm',
  'cancel',
  'resize'
]

/**
 * 全局窗口控制器
 */
export interface DrawerController {
  /**
   * 创建窗口
   * @param options 参数
   */
  open(options: VxeDrawerDefines.DrawerOptions): Promise<DrawerEventTypes>
  /**
   * 获取动态的活动窗口
   * @param id 窗口唯一标识
   */
  get(id: string): VxeDrawerConstructor & VxeDrawerMethods
  /**
   * 关闭动态的活动窗口，如果为空则关闭所有
   * @param id 窗口唯一标识
   */
  close(id?: VxeDrawerPropTypes.ID): Promise<any>
}

export namespace VxeDrawerDefines {
  export interface DrawerEventParams extends VxeComponentEventParams {
    $drawer: VxeDrawerConstructor
  }

  export interface DrawerOptions extends VxeDrawerProps, VxeDrawerEventProps {
    key?: string | number
  }

  export interface DrawerVisibleParams {
    type: DrawerEventTypes
  }

  interface DrawerBaseParams extends DrawerVisibleParams { }

  export interface ShowParams extends DrawerBaseParams { }
  export interface ShowEventParams extends DrawerEventParams, ShowParams { }

  export interface HideParams extends DrawerBaseParams { }
  export interface HideEventParams extends DrawerEventParams, HideParams { }

  export interface BeforeHideParams extends DrawerBaseParams { }
  export interface BeforeHideEventParams extends DrawerEventParams, BeforeHideParams { }

  export interface ConfirmParams extends DrawerBaseParams { }
  export interface ConfirmEventParams extends DrawerEventParams, ConfirmParams { }

  export interface CancelParams extends DrawerBaseParams { }
  export interface CancelEventParams extends DrawerEventParams, CancelParams { }

  export interface CloseParams extends DrawerBaseParams { }
  export interface CloseEventParams extends DrawerEventParams, CloseParams { }

  export interface ResizeParams extends DrawerBaseParams { }
  export interface ResizeEventParams extends DrawerEventParams, ResizeParams { }
}

export type VxeDrawerEventProps = {
  'onUpdate:modelValue'?: VxeDrawerEvents.UpdateModelValue
  onShow?: VxeDrawerEvents.Show
  onHide?: VxeDrawerEvents.Hide
  onBeforeHide?: VxeDrawerEvents.BeforeHide
  onConfirm?: VxeDrawerEvents.Confirm
  onCancel?: VxeDrawerEvents.Cancel
  onClose?: VxeDrawerEvents.Close
  onResize?: VxeDrawerEvents.Resize
}

export interface VxeDrawerListeners {
  'update:modelValue'?: VxeDrawerEvents.UpdateModelValue
  show?: VxeDrawerEvents.Show
  hide?: VxeDrawerEvents.Hide
  beforeHide?: VxeDrawerEvents.BeforeHide
  confirm?: VxeDrawerEvents.Confirm
  cancel?: VxeDrawerEvents.Cancel
  close?: VxeDrawerEvents.Close
  resize?: VxeDrawerEvents.Resize
}

export namespace VxeDrawerEvents {
  export type UpdateModelValue = (modelValue: VxeDrawerPropTypes.ModelValue) => void
  export type Show = (params: VxeDrawerDefines.ShowEventParams) => void
  export type Hide = (params: VxeDrawerDefines.HideEventParams) => void
  export type BeforeHide = (params: VxeDrawerDefines.BeforeHideEventParams) => void
  export type Confirm = (params: VxeDrawerDefines.ConfirmEventParams) => void
  export type Cancel = (params: VxeDrawerDefines.CancelEventParams) => void
  export type Close = (params: VxeDrawerDefines.CloseEventParams) => void
  export type Resize = (params: VxeDrawerDefines.ResizeEventParams) => void
}

export namespace VxeDrawerSlotTypes {

  export interface DefaultSlotParams {
    $drawer: VxeDrawerConstructor
  }
  export interface LeftSlotParams extends DefaultSlotParams { }
  export interface RightSlotParams extends DefaultSlotParams { }
  export interface AsideSlotParams extends DefaultSlotParams { }
  export interface HeaderSlotParams extends DefaultSlotParams { }
  export interface TitleSlotParams extends DefaultSlotParams { }
  export interface CornerSlotParams extends DefaultSlotParams { }
  export interface FooterSlotParams extends DefaultSlotParams { }
  export interface LeftfootSlotParams extends DefaultSlotParams { }
  export interface RightfootSlotParams extends DefaultSlotParams { }
}

export interface VxeDrawerSlots {
  /**
   * 自定义内容模板
   */
  default?: (params: VxeDrawerSlotTypes.DefaultSlotParams) => VxeComponentSlotType[] | VxeComponentSlotType
  /**
   * 自定义左侧内容模板
   */
  left?: (params: VxeDrawerSlotTypes.LeftSlotParams) => VxeComponentSlotType[] | VxeComponentSlotType
  /**
   * 自定义右侧内容模板
   */
  right?: (params: VxeDrawerSlotTypes.RightSlotParams) => VxeComponentSlotType[] | VxeComponentSlotType
  /**
   * 自定义侧边栏的模板
   */
  aside?: (params: VxeDrawerSlotTypes.AsideSlotParams) => VxeComponentSlotType[] | VxeComponentSlotType
  /**
   * 自定义头部的模板
   */
  header?: (params: VxeDrawerSlotTypes.HeaderSlotParams) => VxeComponentSlotType[] | VxeComponentSlotType
  /**
   * 自定义标题的模板（如果使用了 header 插槽，则该插槽无效）
   */
  title?: (params: VxeDrawerSlotTypes.TitleSlotParams) => VxeComponentSlotType[] | VxeComponentSlotType
  /**
   * 自定义右上角的模板
   */
  corner?: (params: VxeDrawerSlotTypes.TitleSlotParams) => VxeComponentSlotType[] | VxeComponentSlotType
  /**
   * 自定义底部的模板
   */
  footer?: (params: VxeDrawerSlotTypes.FooterSlotParams) => VxeComponentSlotType[] | VxeComponentSlotType
  /**
   * 自定义底部左侧的模板
   */
  leftfoot?: (params: VxeDrawerSlotTypes.LeftfootSlotParams) => VxeComponentSlotType[] | VxeComponentSlotType
  /**
   * 自定义底部右侧的模板
   */
  rightfoot?: (params: VxeDrawerSlotTypes.RightfootSlotParams) => VxeComponentSlotType[] | VxeComponentSlotType
}

export const Drawer: typeof VxeDrawer
export default VxeDrawer
