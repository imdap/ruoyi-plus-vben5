import { RenderFunction, SetupContext, Ref, ComputedRef } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeImagePreview: DefineVxeComponentApp<VxeImagePreviewProps, VxeImagePreviewEventProps, VxeImagePreviewSlots, VxeImagePreviewMethods>
export type VxeImagePreviewComponent = DefineVxeComponentOptions<VxeImagePreviewProps, VxeImagePreviewEventProps>

export type VxeImagePreviewInstance = DefineVxeComponentInstance<VxeImagePreviewProps, VxeImagePreviewConstructor>

export interface VxeImagePreviewConstructor extends VxeComponentBaseOptions, VxeImagePreviewMethods {
  props: VxeImagePreviewProps
  context: SetupContext<VxeImagePreviewEmits>
  reactData: ImagePreviewReactData
  getRefMaps(): ImagePreviewPrivateRef
  getComputeMaps(): ImagePreviewPrivateComputed
  renderVN: RenderFunction
}

export interface ImagePreviewPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeImagePreviewPrivateRef extends ImagePreviewPrivateRef { }

export namespace VxeImagePreviewPropTypes {
  export type ModelValue = null | number
  export type Url = string
  export type UrlList = any[]
  export type UrlField = string
  export type MaskClosable = boolean
  export type MarginSize = string | number
  export type ZIndex = number
  export type ShowPrintButton = boolean
  export type ShowDownloadButton = boolean
  export interface ToolbarConfig {
    layouts?: ('PageNumber' | 'ZoomOut' | 'ZoomIn' | 'PctFull' | 'Pct11' | 'RotateLeft' | 'RotateRight' | 'Print' | 'Download')[]
    zoomOut?: boolean | {
      icon?: string
    }
    zoomIn?: boolean | {
      icon?: string
    }
    pctFull?: boolean | {
      icon?: string
    }
    pct11?: boolean | {
      icon?: string
    }
    rotateLeft?: boolean | {
      icon?: string
    }
    rotateRight?: boolean | {
      icon?: string
    }
    print?: boolean | {
      icon?: string
    }
    download?: boolean | {
      icon?: string
      beforeDownloadMethod?: BeforeDownloadMethod
      downloadMethod?: DownloadMethod
    }
  }
  export type BeforeDownloadMethod = undefined | ((params: {
    $imagePreview: VxeImagePreviewConstructor
    url: any
    index: number
  }) => boolean | Promise<boolean>)
  export type DownloadMethod = undefined | ((params: {
    $imagePreview: VxeImagePreviewConstructor
    url: any
    index: number
  }) => Promise<any>)
}

export type VxeImagePreviewProps = {
  modelValue?: VxeImagePreviewPropTypes.ModelValue
  urlList?: VxeImagePreviewPropTypes.UrlList
  urlField?: VxeImagePreviewPropTypes.UrlField
  maskClosable?: VxeImagePreviewPropTypes.MaskClosable
  marginSize?: VxeImagePreviewPropTypes.MarginSize
  zIndex?: VxeImagePreviewPropTypes.ZIndex
  toolbarConfig?: VxeImagePreviewPropTypes.ToolbarConfig
  showPrintButton?: VxeImagePreviewPropTypes.ShowPrintButton
  showDownloadButton?: VxeImagePreviewPropTypes.ShowDownloadButton
  downloadMethod?: VxeImagePreviewPropTypes.DownloadMethod
  beforeDownloadMethod?: VxeImagePreviewPropTypes.BeforeDownloadMethod
}

export interface ImagePreviewPrivateComputed {
  computeImgList: ComputedRef<string[]>
}
export interface VxeImagePreviewPrivateComputed extends ImagePreviewPrivateComputed { }

export interface ImagePreviewReactData {
  activeIndex: undefined | VxeImagePreviewPropTypes.ModelValue
  offsetPct11: boolean
  offsetScale: number
  offsetRotate: number
  offsetLeft: number
  offsetTop: number
}

export interface ImagePreviewMethods {
  dispatchEvent(type: ValueOf<VxeImagePreviewEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeImagePreviewMethods extends ImagePreviewMethods { }

export interface ImagePreviewPrivateMethods {
}
export interface VxeImagePreviewPrivateMethods extends ImagePreviewPrivateMethods { }

export type VxeImagePreviewEmits = [
  'update:modelValue',
  'change',
  'download',
  'download-fail',
  'rotate',
  'close'
]

export namespace VxeImagePreviewDefines {
  export interface ImagePreviewEventParams extends VxeComponentEventParams {
    $imagePreview: VxeImagePreviewConstructor
  }

  export type ToolbarCode = 'zoomOut' | 'zoomIn' | 'pctFull' | 'pct11' | 'rotateLeft' | 'rotateRight' | 'print' | 'download'

  export type ChangeParams = {
    url: string
    activeIndex: number
  }
  export interface ChangeEventParams extends ImagePreviewEventParams, ChangeParams { }

  export interface RotateEventParams extends ImagePreviewEventParams {
    url: string
    rotateValue: number
  }
}

export type VxeImagePreviewEventProps = {
  onChange?: VxeImagePreviewEvents.Change
  onRotate?: VxeImagePreviewEvents.Rotate
}

export interface VxeImagePreviewListeners {
  change?: VxeImagePreviewEvents.Change
  rotate?: VxeImagePreviewEvents.Rotate
}

export namespace VxeImagePreviewEvents {
  export type Change = (params: VxeImagePreviewDefines.ChangeEventParams) => void
  export type Rotate = (params: VxeImagePreviewDefines.RotateEventParams) => void
}

export namespace VxeImagePreviewSlotTypes {
  export interface DefaultSlotParams {
    [key: string]: any
  }
}

export interface VxeImagePreviewSlots {
  default: (params: VxeImagePreviewSlotTypes.DefaultSlotParams) => any
}

export const ImagePreview: typeof VxeImagePreview
export default VxeImagePreview
