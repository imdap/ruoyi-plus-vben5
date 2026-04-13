import { RenderFunction, SetupContext, Ref, ComputedRef } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentSizeType, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf, VxeComponentSlotType } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeModal: DefineVxeComponentApp<VxeModalProps, VxeModalEventProps, VxeModalSlots, VxeModalMethods>
export type VxeModalComponent = DefineVxeComponentOptions<VxeModalProps, VxeModalEventProps>

export type VxeModalInstance = DefineVxeComponentInstance<VxeModalProps, VxeModalConstructor>

export interface VxeModalConstructor extends VxeComponentBaseOptions, VxeModalMethods {
  props: VxeModalProps
  context: SetupContext<VxeModalEmits>
  reactData: ModalReactData
  getRefMaps(): ModalPrivateRef
  getComputeMaps(): ModalPrivateComputed
  renderVN: RenderFunction
}

export interface ModalPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeModalPrivateRef extends ModalPrivateRef { }

/**
 * 窗口类型
 */
export type ModalType = 'alert' | 'confirm' | 'message' | 'notification' | 'modal'

/**
 * 窗口状态
 */
export type ModalStatus = 'info' | 'success' | 'warning' | 'question' | 'error' | 'loading'

export type ModalPosition = {
  top?: number
  left?: number
}

/**
 * 窗口事件类型
 */
export type ModalEventTypes = 'model' | 'mask' | 'close' | 'confirm' | 'cancel' | 'exit' | 'exist'

export namespace VxeModalPropTypes {
  export type Size = VxeComponentSizeType
  export type ModelValue = boolean
  export type ID = string | null
  export type Type = ModalType
  export type Loading = boolean
  export type Status = ModalStatus
  export type IconStatus = string
  export type ClassName = string
  export type Top = number | string
  export type Position = 'center' | 'top-left' | 'top-right' | ModalPosition
  export type Title = string | number
  export type Duration = number | string
  export type Content = number | string | null
  /**
   * 请使用 content
   * @deprecated
   */
  export type Message = Content
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
  export type Resize = boolean
  export type ShowHeader = boolean
  export type ShowFooter = boolean
  export type ShowZoom = boolean
  export interface ZoomConfig {
    minimizeLayout?: null | '' | 'vertical' | 'horizontal'
    minimizeMaxSize?: number
    minimizeOffsetMethod?(params: {
      $modal: VxeModalConstructor,
      top: number
      left: number
    }): {
      top: number
      left: number
    }
    minimizeVerticalOffset?: {
      top?: number
      left?: number
    }
    minimizeHorizontalOffset?: {
      top?: number
      left?: number
    }
  }
  export type ShowMaximize = boolean
  export type ShowMinimize = boolean
  export type ShowClose = boolean
  export type DblclickZoom = boolean
  export type Width = number | string | null
  export type Height = number | string | null
  export type MinWidth = number | string | null
  export type MinHeight = number | string | null
  export type ZIndex = number
  export type MarginSize = number | string
  export type Fullscreen = boolean
  export type Draggable = boolean
  export type Remember = boolean
  export type DestroyOnClose = boolean
  export type ShowTitleOverflow = boolean
  export type Transfer = boolean
  export type Storage = boolean
  export type StorageKey = string
  export type Animat = boolean
  export type Padding = boolean
  export type BeforeHideMethod = (params: {
    type: ModalEventTypes
  }) => Promise<any>
  export type Slots = VxeModalSlots
}

export interface VxeModalProps {
  size?: VxeModalPropTypes.Size
  modelValue?: VxeModalPropTypes.ModelValue
  id?: VxeModalPropTypes.ID
  type?: VxeModalPropTypes.Type
  loading?: VxeModalPropTypes.Loading
  status?: VxeModalPropTypes.Status
  iconStatus?: VxeModalPropTypes.IconStatus
  className?: VxeModalPropTypes.ClassName
  top?: VxeModalPropTypes.Top
  position?: VxeModalPropTypes.Position
  title?: VxeModalPropTypes.Title
  duration?: VxeModalPropTypes.Duration
  content?: VxeModalPropTypes.Content
  showCancelButton?: VxeModalPropTypes.ShowCancelButton
  cancelButtonText?: VxeModalPropTypes.CancelButtonText
  showConfirmButton?: VxeModalPropTypes.ShowConfirmButton
  confirmButtonText?: VxeModalPropTypes.ConfirmButtonText
  lockView?: VxeModalPropTypes.LockView
  lockScroll?: VxeModalPropTypes.LockScroll
  mask?: VxeModalPropTypes.Mask
  maskClosable?: VxeModalPropTypes.MaskClosable
  escClosable?: VxeModalPropTypes.EscClosable
  cancelClosable?: VxeModalPropTypes.CancelClosable
  confirmClosable?: VxeModalPropTypes.ConfirmClosable
  resize?: VxeModalPropTypes.Resize
  showHeader?: VxeModalPropTypes.ShowHeader
  showFooter?: VxeModalPropTypes.ShowFooter
  showZoom?: VxeModalPropTypes.ShowZoom
  zoomConfig?: VxeModalPropTypes.ZoomConfig
  showMaximize?: VxeModalPropTypes.ShowMaximize
  showMinimize?: VxeModalPropTypes.ShowMinimize
  showClose?: VxeModalPropTypes.ShowClose
  dblclickZoom?: VxeModalPropTypes.DblclickZoom
  draggable?: VxeModalPropTypes.Draggable
  width?: VxeModalPropTypes.Width
  height?: VxeModalPropTypes.Height
  minWidth?: VxeModalPropTypes.MinWidth
  minHeight?: VxeModalPropTypes.MinHeight
  zIndex?: VxeModalPropTypes.ZIndex
  marginSize?: VxeModalPropTypes.MarginSize
  fullscreen?: VxeModalPropTypes.Fullscreen
  remember?: VxeModalPropTypes.Remember
  destroyOnClose?: VxeModalPropTypes.DestroyOnClose
  showTitleOverflow?: VxeModalPropTypes.ShowTitleOverflow
  transfer?: VxeModalPropTypes.Transfer
  storage?: VxeModalPropTypes.Storage
  storageKey?: VxeModalPropTypes.StorageKey
  animat?: VxeModalPropTypes.Animat
  padding?: VxeModalPropTypes.Padding
  beforeHideMethod?: VxeModalPropTypes.BeforeHideMethod
  slots?: VxeModalPropTypes.Slots
  /**
   * @deprecated 已废弃，请使用 content
   */
  message?: VxeModalPropTypes.Content
}

export interface ModalPrivateComputed {
  computeSize: ComputedRef<VxeModalPropTypes.Size>
  computeZoomOpts: ComputedRef<VxeModalPropTypes.ZoomConfig>
}
export interface VxeModalPrivateComputed extends ModalPrivateComputed { }

export interface ModalReactData {
  initialized: boolean
  visible: boolean
  contentVisible: boolean
  modalTop: number
  modalZindex: number
  prevZoomStatus: '' | 'minimize' | 'maximize'
  zoomStatus: '' | 'minimize' | 'maximize'
  revertLocat: {
    left: number
    top: number
    width: number
    height: number
  } | null
  prevLocat: {
    left: number
    top: number
    width: number
    height: number
  } | null
  firstOpen: boolean
  resizeFlag: number
}

export interface ModalInternalData {
  msgTimeout: undefined | number
}

export interface ModalMethods {
  dispatchEvent(type: ValueOf<VxeModalEmits>, params: Record<string, any>, evnt: Event | null): void
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
  /**
   * 获取窗口位置
   */
  getPosition(): {
    top?: number
    left?: number
  } | null
  /**
   * 设置窗口位置
   */
  setPosition(top?: number, left?: number): Promise<any>
  /**
   * 判断是否处于最小化
   */
  isMinimized(): boolean
  /**
   * 判断是否处于最大化
   */
  isMaximized(): boolean
  /**
   * 在窗口最大化/还原/最小化之间切换状态
   */
  zoom(type?: '' | 'minimize' | 'maximize' | 'revert'): Promise<'minimize' | 'maximize' | 'revert'>
  /**
   * 如果窗口处于常规状态，则最小化窗口
   */
  minimize(): Promise<{
    status: boolean
  }>
  /**
   * 如果窗口处于常规状态，则最大化窗口
   */
  maximize(): Promise<{
    status: boolean
  }>
  /**
   * 如果窗口处于最大化状态，则还原窗口
   */
  revert(): Promise<{
    status: boolean
  }>
}
export interface VxeModalMethods extends ModalMethods { }

export interface ModalPrivateMethods { }
export interface VxeModalPrivateMethods extends ModalPrivateMethods { }

export type VxeModalEmits = [
  'update:modelValue',
  'show',
  'hide',
  'before-hide',
  'close',
  'confirm',
  'cancel',
  'zoom',
  'resize',
  'move'
]

export namespace VxeModalDefines {
  export interface ModalOptions extends VxeModalProps, VxeModalEventProps {
    key?: string | number
  }

  export interface MessageOptions extends Omit<VxeModalProps, 'type'>, VxeModalEventProps {
    key?: string | number
  }

  export interface NotificationOptions extends Omit<VxeModalProps, 'type'>, VxeModalEventProps {
    key?: string | number
  }

  export interface AlertOptions extends Omit<VxeModalProps, 'top' | 'duration'>, VxeModalEventProps {
    key?: string | number
  }

  export interface ConfirmOptions extends Omit<VxeModalProps, 'top' | 'duration'>, VxeModalEventProps {
    key?: string | number
  }

  interface ModalEventParams extends VxeComponentEventParams {
    $modal: VxeModalConstructor
  }

  interface ModalBaseParams {
    type: ModalEventTypes
  }

  export interface ShowParams extends ModalBaseParams { }
  export interface ShowEventParams extends ModalEventParams, ShowParams { }

  export interface HideParams extends ModalBaseParams { }
  export interface HideEventParams extends ModalEventParams, HideParams { }

  export interface BeforeHideParams extends ModalBaseParams { }
  export interface BeforeHideEventParams extends ModalEventParams, BeforeHideParams { }

  export interface ConfirmParams extends ModalBaseParams { }
  export interface ConfirmEventParams extends ModalEventParams, ConfirmParams { }

  export interface CancelParams extends ModalBaseParams { }
  export interface CancelEventParams extends ModalEventParams, CancelParams { }

  export interface CloseParams extends ModalBaseParams { }
  export interface CloseEventParams extends ModalEventParams, CloseParams { }

  export interface ZoomParams extends ModalBaseParams { }
  export interface ZoomEventParams extends ModalEventParams, ZoomParams { }

  export interface ResizeParams extends ModalBaseParams { }
  export interface ResizeEventParams extends ModalEventParams, ResizeParams { }

  export interface MoveParams extends ModalBaseParams { }
  export interface MoveEventParams extends ModalEventParams, MoveParams { }
}

export type VxeModalEventProps = {
  'onUpdate:modelValue'?: VxeModalEvents.UpdateModelValue
  onShow?: VxeModalEvents.Show
  onHide?: VxeModalEvents.Hide
  onBeforeHide?: VxeModalEvents.BeforeHide
  onConfirm?: VxeModalEvents.Confirm
  onCancel?: VxeModalEvents.Cancel
  onClose?: VxeModalEvents.Close
  onZoom?: VxeModalEvents.Zoom
  onResize?: VxeModalEvents.Resize
  onMove?: VxeModalEvents.Move
}

export interface VxeModalListeners {
  'update:modelValue'?: VxeModalEvents.UpdateModelValue
  show?: VxeModalEvents.Show
  hide?: VxeModalEvents.Hide
  beforeHide?: VxeModalEvents.BeforeHide
  confirm?: VxeModalEvents.Confirm
  cancel?: VxeModalEvents.Cancel
  close?: VxeModalEvents.Close
  zoom?: VxeModalEvents.Zoom
  resize?: VxeModalEvents.Resize
  move?: VxeModalEvents.Move
}

/**
 * 全局窗口控制器
 */
export interface ModalController {
  /**
   * 创建窗口
   * @param options 参数
   */
  open(options: VxeModalDefines.ModalOptions): Promise<ModalEventTypes>
  /**
   * 创建提示框
   * @param content 消息内容
   * @param title 标题
   * @param options 参数
   */
  alert(content: VxeModalPropTypes.Content, title?: VxeModalPropTypes.Title, options?: VxeModalDefines.AlertOptions): Promise<ModalEventTypes>
  /**
   * 创建提示框
   * @param options 参数
   */
  alert(options: VxeModalDefines.AlertOptions): Promise<ModalEventTypes>
  /**
   * 创建确认框
   * @param content 消息内容
   * @param title 标题
   * @param options 参数
   */
  confirm(content: VxeModalPropTypes.Content, title?: VxeModalPropTypes.Title, options?: VxeModalDefines.ConfirmOptions): Promise<ModalEventTypes>
  /**
   * 创建确认框
   * @param options 参数
   */
  confirm(options: VxeModalDefines.ConfirmOptions): Promise<ModalEventTypes>
  /**
   * 创建消息提示
   * @param content 消息内容
   * @param title 标题
   * @param options 参数
   */
  message(content: VxeModalPropTypes.Content, options?: VxeModalDefines.MessageOptions): Promise<ModalEventTypes>
  /**
   * 创建消息提示
   * @param options 参数
   */
  message(options: VxeModalDefines.MessageOptions): Promise<ModalEventTypes>
  /**
   * 创建消息通知
   * @param content 消息内容
   * @param title 标题
   * @param options 参数
   */
  notification(content: VxeModalPropTypes.Content, title?: VxeModalPropTypes.Title, options?: VxeModalDefines.NotificationOptions): Promise<ModalEventTypes>
  /**
   * 创建消息通知
   * @param options 参数
   */
  notification(options: VxeModalDefines.NotificationOptions): Promise<ModalEventTypes>
  /**
   * 获取动态的活动窗口
   * @param id 窗口唯一标识
   */
  get(id: string): VxeModalConstructor
  /**
   * 关闭动态的活动窗口，如果为空则关闭所有
   * @param id 窗口唯一标识
   */
  close(id?: VxeModalPropTypes.ID): Promise<any>
}

/**
 * @deprecated
 */
export interface ModalDefaultSlotParams {
  $modal: VxeModalConstructor
}
/**
 * @deprecated
 */
export interface ModalHeaderSlotParams extends ModalDefaultSlotParams { }
/**
 * @deprecated
 */
export interface ModalTitleSlotParams extends ModalDefaultSlotParams { }
/**
 * @deprecated
 */
export interface ModalFooterSlotParams extends ModalDefaultSlotParams { }

interface ModalVisibleParams {
  type: ModalEventTypes
}

export namespace VxeModalEvents {
  export type UpdateModelValue = (modelValue: VxeModalPropTypes.ModelValue) => void
  export type Show = (params: VxeModalDefines.ShowEventParams) => void
  export type Hide = (params: VxeModalDefines.HideEventParams) => void
  export type BeforeHide = (params: VxeModalDefines.BeforeHideEventParams) => void
  export type Confirm = (params: VxeModalDefines.ConfirmEventParams) => void
  export type Cancel = (params: VxeModalDefines.CancelEventParams) => void
  export type Close = (params: VxeModalDefines.CloseEventParams) => void
  export type Zoom = (params: VxeModalDefines.ZoomEventParams) => void
  export type Resize = (params: VxeModalDefines.ResizeEventParams) => void
  export type Move = (params: VxeModalDefines.MoveEventParams) => void
}

export namespace VxeModalSlotTypes {
  export interface DefaultSlotParams {
    $modal: VxeModalConstructor
  }

  export interface LeftSlotParams extends DefaultSlotParams { }
  export interface RightSlotParams extends DefaultSlotParams { }
  export interface AsideSlotParams extends DefaultSlotParams { }
  export interface HeaderSlotParams extends DefaultSlotParams { }
  export interface TitleSlotParams extends DefaultSlotParams {
    minimized: boolean
    maximized: boolean
  }
  export interface CornerSlotParams extends DefaultSlotParams { }
  export interface FooterSlotParams extends DefaultSlotParams { }
  export interface LeftfootSlotParams extends DefaultSlotParams { }
  export interface RightfootSlotParams extends DefaultSlotParams { }
}

export interface VxeModalSlots {
  /**
   * 自定义内容模板
   */
  default?: (params: VxeModalSlotTypes.DefaultSlotParams) => VxeComponentSlotType[] | VxeComponentSlotType
  /**
   * 自定义左侧内容模板
   */
  left?: (params: VxeModalSlotTypes.LeftSlotParams) => VxeComponentSlotType[] | VxeComponentSlotType
  /**
   * 自定义右侧内容模板
   */
  right?: (params: VxeModalSlotTypes.RightSlotParams) => VxeComponentSlotType[] | VxeComponentSlotType
  /**
   * 自定义侧边栏的模板
   */
  aside?: (params: VxeModalSlotTypes.AsideSlotParams) => VxeComponentSlotType[] | VxeComponentSlotType
  /**
   * 自定义头部的模板
   */
  header?: (params: VxeModalSlotTypes.HeaderSlotParams) => VxeComponentSlotType[] | VxeComponentSlotType
  /**
   * 自定义标题的模板（如果使用了 header 插槽，则该插槽无效）
   */
  title?: (params: VxeModalSlotTypes.TitleSlotParams) => VxeComponentSlotType[] | VxeComponentSlotType
  /**
   * 自定义右上角的模板
   */
  corner?: (params: VxeModalSlotTypes.CornerSlotParams) => VxeComponentSlotType[] | VxeComponentSlotType
  /**
   * 自定义底部的模板
   */
  footer?: (params: VxeModalSlotTypes.FooterSlotParams) => VxeComponentSlotType[] | VxeComponentSlotType
  /**
   * 自定义底部左侧的模板
   */
  leftfoot?: (params: VxeModalSlotTypes.LeftfootSlotParams) => VxeComponentSlotType[] | VxeComponentSlotType
  /**
   * 自定义底部右侧的模板
   */
  rightfoot?: (params: VxeModalSlotTypes.RightfootSlotParams) => VxeComponentSlotType[] | VxeComponentSlotType
}

export const Modal: typeof VxeModal
export default VxeModal
