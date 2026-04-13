import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf, VxeComponentSizeType } from '@vxe-ui/core'
import { VxeImagePreviewProps, VxeImagePreviewPropTypes, VxeImagePreviewListeners } from './image-preview'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeImage: DefineVxeComponentApp<VxeImageProps, VxeImageEventProps, VxeImageSlots, VxeImageMethods>
export type VxeImageComponent = DefineVxeComponentOptions<VxeImageProps, VxeImageEventProps>

export type VxeImageInstance = DefineVxeComponentInstance<VxeImageProps, VxeImageConstructor>

export interface VxeImageConstructor extends VxeComponentBaseOptions, VxeImageMethods {
  props: VxeImageProps
  context: SetupContext<VxeImageEmits>
  reactData: ImageReactData
  internalData: ImageInternalData
  getRefMaps(): ImagePrivateRef
  getComputeMaps(): ImagePrivateComputed
  renderVN: RenderFunction
}

export interface ImagePrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeImagePrivateRef extends ImagePrivateRef { }

export namespace VxeImagePropTypes {
  export type Src = string | string[] | {
    url?: string
    alt?: string | number
  }[]
  export type Alt = number | string
  export type Loading = '' | 'lazy'
  export type Title = number | string
  export type Width = number | string
  export type Height = number | string
  export type Circle = boolean
  export type MaskClosable = boolean
  export type ToolbarConfig = VxeImagePreviewPropTypes.ToolbarConfig
  export type ShowPreview = boolean
  export type ShowPrintButton = boolean
  export type ShowDownloadButton = boolean
  export type Draggable = boolean | string | null
  export type ZIndex = number
  export type Size = VxeComponentSizeType
  export type GetThumbnailUrlMethod = ((params: {
    $image: VxeImageConstructor
    url: string
  }) => string)
}

export interface VxeImageProps {
  src?: VxeImagePropTypes.Src
  alt?: VxeImagePropTypes.Alt
  loading?: VxeImagePropTypes.Loading
  title?: VxeImagePropTypes.Title
  width?: VxeImagePropTypes.Width
  height?: VxeImagePropTypes.Height
  circle?: VxeImagePropTypes.Circle
  maskClosable?: VxeImagePropTypes.MaskClosable
  toolbarConfig?: VxeImagePropTypes.ToolbarConfig
  showPreview?: VxeImagePropTypes.ShowPreview
  showPrintButton?: VxeImagePropTypes.ShowPrintButton
  showDownloadButton?: VxeImagePropTypes.ShowDownloadButton
  draggable?: VxeImagePropTypes.Draggable
  zIndex?: VxeImagePropTypes.ZIndex
  size?: VxeImagePropTypes.Size
  getThumbnailUrlMethod?: VxeImagePropTypes.GetThumbnailUrlMethod
}

export interface ImagePrivateComputed {
}
export interface VxeImagePrivateComputed extends ImagePrivateComputed { }

export interface ImageReactData {
}
export interface ImageInternalData {
 dgTime?: number
 mdTime?: number
}

export interface ImageMethods {
  dispatchEvent(type: ValueOf<VxeImageEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeImageMethods extends ImageMethods { }

export interface ImagePrivateMethods {}
export interface VxeImagePrivateMethods extends ImagePrivateMethods { }

export type VxeImageEmits = [
  'click',
  'change',
  'rotate',
  'dragstart',
  'drag',
  'dragend'
]

export namespace VxeImageDefines {
  export interface ImageEventParams extends VxeComponentEventParams {
    $image: VxeImageConstructor
  }

  export interface ClickEventParams extends ImageEventParams {
    url: string
  }

  export interface ChangeEventParams extends ImageEventParams {
    url: string
    activeIndex: number
  }

  export interface RotateEventParams extends ImageEventParams {
    url: string
    rotateValue: number
  }

  export interface DragstartEventParams extends ImageEventParams {}
  export interface DragEventParams extends ImageEventParams {}
  export interface DragendEventParams extends ImageEventParams {}

  export type PreviewImageFunction = (options: VxeImagePreviewProps & {
    activeIndex?: VxeImagePreviewPropTypes.ModelValue
    escClosable?: boolean
    events?: VxeImagePreviewListeners
  }) => Promise<any>
}

export type VxeImageEventProps = {
  onClick?: VxeImageEvents.Click
  onChange?: VxeImageEvents.Change
  onRotate?: VxeImageEvents.Rotate
  onDragstart?: VxeImageEvents.Dragstart
  onDrag?: VxeImageEvents.Drag
  onDragend?: VxeImageEvents.Dragend
}

export interface VxeImageListeners {
  click?: VxeImageEvents.Click
  change?: VxeImageEvents.Change
  rotate?: VxeImageEvents.Rotate
  dragstart?: VxeImageEvents.Dragstart
  drag?: VxeImageEvents.Drag
  dragend?: VxeImageEvents.Dragend
}

export namespace VxeImageEvents {
  export type Click = (params: VxeImageDefines.ClickEventParams) => void
  export type Change = (params: VxeImageDefines.ChangeEventParams) => void
  export type Rotate = (params: VxeImageDefines.RotateEventParams) => void
  export type Dragstart = (params: VxeImageDefines.DragstartEventParams) => void
  export type Drag = (params: VxeImageDefines.DragEventParams) => void
  export type Dragend = (params: VxeImageDefines.DragendEventParams) => void
}

export namespace VxeImageSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeImageSlots {
  default: (params: VxeImageSlotTypes.DefaultSlotParams) => any
}

export const Image: typeof VxeImage
export default VxeImage
