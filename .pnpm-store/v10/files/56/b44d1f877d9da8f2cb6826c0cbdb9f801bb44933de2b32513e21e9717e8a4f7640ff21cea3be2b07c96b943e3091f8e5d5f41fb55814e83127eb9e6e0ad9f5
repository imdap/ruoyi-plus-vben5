import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf, VxeComponentSizeType } from '@vxe-ui/core'
import { VxeImagePropTypes } from './image'
import { VxeImagePreviewProps } from './image-preview'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeUpload: DefineVxeComponentApp<VxeUploadProps, VxeUploadEventProps, VxeUploadSlots, VxeUploadMethods>
export type VxeUploadComponent = DefineVxeComponentOptions<VxeUploadProps, VxeUploadEventProps>

export type VxeUploadInstance = DefineVxeComponentInstance<VxeUploadProps, VxeUploadConstructor>

export interface VxeUploadConstructor extends VxeComponentBaseOptions, VxeUploadMethods {
  props: VxeUploadProps
  context: SetupContext<VxeUploadEmits>
  reactData: UploadReactData
  getRefMaps(): UploadPrivateRef
  getComputeMaps(): UploadPrivateComputed
  renderVN: RenderFunction
}

export interface UploadPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeUploadPrivateRef extends UploadPrivateRef { }

export namespace VxeUploadPropTypes {
  export type ModelValue = VxeUploadDefines.FileObjItem | VxeUploadDefines.FileObjItem[] | string | string[]
  export type Size = VxeComponentSizeType
  export type ShowList = boolean
  export interface MoreConfig {
    maxCount?: number
    showMoreButton?: boolean
    layout?: '' | 'vertical' | 'horizontal'
    moreButtonText?: string | ((params: {
      $upload: VxeUploadConstructor
      options: VxeUploadDefines.FileObjItem[]
    }) => string | number)
  }
  export type Mode = null | '' | 'all' | 'image'
  export type Readonly = boolean
  export type Disabled = boolean
  export type AutoSubmit = boolean
  export type ImageTypes = string[]
  export interface ImageConfig {
    width?: VxeImagePropTypes.Width
    height?: VxeImagePropTypes.Height
    circle?: VxeImagePropTypes.Circle
  }
  /**
   * 已废弃，被 imageConfig 替换
   * @deprecated
   */
  export interface ImageStyle {
    width?: VxeImagePropTypes.Width
    height?: VxeImagePropTypes.Height
  }
  export type FileTypes = string[]
  export type SingleMode = boolean
  export type DragSort = boolean
  export type DragToUpload = boolean
  export type DragPlaceholder = string
  export type PasteToUpload = boolean
  export type KeyField = string
  export type UrlMode = boolean
  export type UrlArgs = boolean
  export type Multiple = boolean
  export type LimitSize = number | string
  export type ShowLimitSize = boolean
  export type LimitSizeText = number | string | ((params: {
    maxSize: number
  }) => number | string)
  export type LimitCount = number | string
  export type ShowLimitCount = boolean
  export type LimitCountText = number | string | ((params: {
    maxCount: number
  }) => number | string)
  export type NameField = string
  export type TypeField = string
  export type UrlField = string
  export type SizeField = string
  export type ShowTip = boolean
  export type MaxSimultaneousUploads = number | string
  export type TipText = number | string | ((params: {}) => number | string)
  export type ButtonText = number | string | ((params: {}) => number | string)
  export type ButtonIcon = string
  export type ShowButtonText = boolean
  export type ShowButtonIcon = boolean
  export type ShowRemoveButton = boolean
  export type ShowDownloadButton = boolean
  export type ShowPreview = boolean
  export type ShowErrorStatus = boolean
  export type ShowProgress = boolean
  export type ProgressText = number | string | ((params: {}) => number | string)
  export type ShowSubmitButton = boolean
  export type AutoHiddenButton = boolean
  export type ShowUploadButton = boolean
  export interface PreviewImageConfig extends Omit<VxeImagePreviewProps, 'modelValue' | 'urlList' | 'urlField'> {}
  export type PreviewMethod = undefined | ((params: {
    $upload: VxeUploadConstructor
    option: VxeUploadDefines.FileObjItem
  }) => Promise<any>)
 export type BeforeSelectMethod = undefined | ((params: {
    $upload: VxeUploadConstructor
    file: File,
  }) => boolean)
  export type UploadMethod = undefined | ((params: {
    $upload: VxeUploadConstructor
    file: File,
    option: VxeUploadDefines.FileObjItem
    updateProgress: (percentNum: number) => void
  }) => Promise<any>)
  export type BeforeRemoveMethod = undefined | ((params: {
    $upload: VxeUploadConstructor
    option: VxeUploadDefines.FileObjItem
  }) => boolean | Promise<boolean>)
  export type RemoveMethod = undefined | ((params: {
    $upload: VxeUploadConstructor
    option: VxeUploadDefines.FileObjItem
  }) => Promise<any>)
  export type BeforeDownloadMethod = undefined | ((params: {
    $upload: VxeUploadConstructor
    option: VxeUploadDefines.FileObjItem
  }) => boolean | Promise<boolean>)
  export type DownloadMethod = undefined | ((params: {
    $upload: VxeUploadConstructor
    option: VxeUploadDefines.FileObjItem
  }) => Promise<any>)
  export type GetUrlMethod = undefined | ((params: {
    $upload: VxeUploadConstructor
    option: VxeUploadDefines.FileObjItem
  }) => string)
  export type GetThumbnailUrlMethod = undefined | ((params: {
    $upload: VxeUploadConstructor
    option: VxeUploadDefines.FileObjItem
  }) => string)

  /**
   * 已废弃，请使用 TipText
   * @deprecated
   */
  export type HintText = string
}

export interface VxeUploadProps {
  modelValue?: VxeUploadPropTypes.ModelValue
  size?: VxeUploadPropTypes.Size
  showList?: VxeUploadPropTypes.ShowList
  moreConfig?: VxeUploadPropTypes.MoreConfig
  mode?: VxeUploadPropTypes.Mode
  readonly?: VxeUploadPropTypes.Readonly
  disabled?: VxeUploadPropTypes.Disabled
  autoSubmit?: VxeUploadPropTypes.AutoSubmit
  imageTypes?: VxeUploadPropTypes.ImageTypes
  imageConfig?: VxeUploadPropTypes.ImageConfig
  /**
   * 已废弃，被 imageConfig 替换
   * @deprecated
   */
  imageStyle?: VxeUploadPropTypes.ImageStyle
  fileTypes?: VxeUploadPropTypes.FileTypes
  multiple?: VxeUploadPropTypes.Multiple
  singleMode?: VxeUploadPropTypes.SingleMode
  dragSort?: VxeUploadPropTypes.DragSort
  dragToUpload?: VxeUploadPropTypes.DragToUpload
  dragPlaceholder?: VxeUploadPropTypes.DragPlaceholder
  pasteToUpload?: VxeUploadPropTypes.PasteToUpload
  keyField?: VxeUploadPropTypes.KeyField
  urlMode?: VxeUploadPropTypes.UrlMode
  urlArgs?: VxeUploadPropTypes.UrlArgs
  /**
   * 限制文件大小，单位M
   */
  limitSize?: VxeUploadPropTypes.LimitSize
  showLimitSize?: VxeUploadPropTypes.ShowLimitSize
  limitSizeText?: VxeUploadPropTypes.LimitSizeText
  limitCount?: VxeUploadPropTypes.LimitCount
  showLimitCount?: VxeUploadPropTypes.ShowLimitCount
  limitCountText?: VxeUploadPropTypes.LimitCountText
  nameField?: VxeUploadPropTypes.NameField
  typeField?: VxeUploadPropTypes.TypeField
  urlField?: VxeUploadPropTypes.UrlField
  sizeField?: VxeUploadPropTypes.SizeField
  buttonText?: VxeUploadPropTypes.ButtonText
  buttonIcon?: VxeUploadPropTypes.ButtonIcon
  showButtonText?: VxeUploadPropTypes.ShowButtonText
  showUploadButton?: VxeUploadPropTypes.ShowUploadButton
  showButtonIcon?: VxeUploadPropTypes.ShowButtonIcon
  showRemoveButton?: VxeUploadPropTypes.ShowRemoveButton
  showDownloadButton?: VxeUploadPropTypes.ShowDownloadButton
  showPreview?: VxeUploadPropTypes.ShowPreview
  previewImageConfig?: VxeUploadPropTypes.PreviewImageConfig
  showErrorStatus?: VxeUploadPropTypes.ShowErrorStatus
  showProgress?: VxeUploadPropTypes.ShowProgress
  progressText?: VxeUploadPropTypes.ProgressText
  showSubmitButton?: VxeUploadPropTypes.ShowSubmitButton
  autoHiddenButton?: VxeUploadPropTypes.AutoHiddenButton
  showTip?: VxeUploadPropTypes.ShowTip
  tipText?: VxeUploadPropTypes.TipText
  /**
   * 用于 autoSubmit=false，最大同时上传数量
   */
  maxSimultaneousUploads?: VxeUploadPropTypes.MaxSimultaneousUploads
  previewMethod?: VxeUploadPropTypes.PreviewMethod
  beforeSelectMethod?: VxeUploadPropTypes.BeforeSelectMethod
  uploadMethod?: VxeUploadPropTypes.UploadMethod
  beforeRemoveMethod?: VxeUploadPropTypes.BeforeRemoveMethod
  removeMethod?: VxeUploadPropTypes.RemoveMethod
  beforeDownloadMethod?: VxeUploadPropTypes.BeforeDownloadMethod
  downloadMethod?: VxeUploadPropTypes.DownloadMethod
  getUrlMethod?: VxeUploadPropTypes.GetUrlMethod
  getThumbnailUrlMethod?: VxeUploadPropTypes.GetThumbnailUrlMethod

  /**
   * 已废弃，请使用 tipText
   * @deprecated
   */
  hintText?: VxeUploadPropTypes.HintText
}

export interface UploadPrivateComputed {
}
export interface VxeUploadPrivateComputed extends UploadPrivateComputed { }

export interface UploadReactData {
  isDragUploadStatus: boolean
  showMorePopup: boolean
  isActivated: boolean
  fileList: VxeUploadDefines.FileObjItem[]
  fileCacheMaps: Record<string, VxeUploadDefines.FileCacheItem>
  isDragMove: boolean
  dragIndex: number
  dragTipText: string
}

export interface UploadInternalData {
  moreId: string
  imagePreviewTypes: string[]
  prevDragIndex: number
  prevDragPos?: 'top' | 'bottom' | 'left' | 'right' | ''
}

export interface UploadMethods {
  dispatchEvent(type: ValueOf<VxeUploadEmits>, params: Record<string, any>, evnt: Event | null): void
  /**
   * 手动调用选择文件
   */
  choose(): Promise<{
    status: boolean
    files: File[]
    file: File | null
  }>
  /**
   * 获取未上传的文件对象
   */
  getPendingFiles (): File[]
  /**
   * 用于 auto-upload 模式，手动调用上传附件；如果传 true，这包含未上传和上传失败的都会重新提交
   */
  submit(isFull?: boolean): Promise<void>
  /**
   * 获取更多弹窗的可视状态
   */
  getMoreVisible(): boolean
  /**
   * 打开更多弹窗
   */
  openMore(): Promise<void>
  /**
   * 区别就是会触发对应的事件
   */
  openMoreByEvent(event: Event): Promise<void>
  /**
   * 关闭更多弹窗
   */
  closeMore(): Promise<void>
}
export interface VxeUploadMethods extends UploadMethods { }

export interface UploadPrivateMethods { }
export interface VxeUploadPrivateMethods extends UploadPrivateMethods { }

export type VxeUploadEmits = [
  'update:modelValue',
  'add',
  'remove',
  'remove-fail',
  'download',
  'download-fail',
  'upload-success',
  'upload-error',
  'sort-dragend',
  'more-visible'
]

export namespace VxeUploadDefines {
  export interface UploadEventParams extends VxeComponentEventParams {
    $upload: VxeUploadConstructor
  }

  export type SaveFileFunction = (options: {
    filename: string
    type: string
    content: string | Blob
  } | {
    filename: string
    type?: string
    content: Blob
  }) => Promise<any>

  export type ReadFileFunction = (options?: {
    multiple?: boolean
    types?: string[]
    message?: boolean
  }) => Promise<{
    status: boolean
    files: File[]
    file: File
  }>

  export interface FileCacheItem {
    file: File
    loading: boolean
    status: 'error' | 'success' | 'pending'
    percent: number
  }

  export interface FileObjItem {
    [key: string]: any
  }

  export interface AddParams {
    options: VxeUploadDefines.FileObjItem[]
    option: VxeUploadDefines.FileObjItem
  }
  export interface AddEventParams extends UploadEventParams, AddParams { }

  export interface RemoveEventParams extends UploadEventParams {
    options: VxeUploadDefines.FileObjItem[]
    option: VxeUploadDefines.FileObjItem
  }
  export interface RemoveFailEventParams extends RemoveEventParams {}

  export interface DownloadEventParams extends UploadEventParams {
    options: VxeUploadDefines.FileObjItem[]
    option: VxeUploadDefines.FileObjItem
  }
  export interface DownloadFailEventParams extends DownloadEventParams {}

  export interface UploadSuccessEventParams extends UploadEventParams {
    options: VxeUploadDefines.FileObjItem[]
    option: VxeUploadDefines.FileObjItem
    data: any
  }

  export interface UploadErrorEventParams extends UploadSuccessEventParams {}

  export interface MoreVisibleEventParams {
    visible: boolean
  }
}

export type VxeUploadEventProps = {
  'onUpdate:modelValue'?: VxeUploadEvents.UpdateModelValue
  onAdd?: VxeUploadEvents.Add
  onRemove?: VxeUploadEvents.Remove
  onRemoveFail?: VxeUploadEvents.RemoveFail
  onDownload?: VxeUploadEvents.Download
  onDownloadFail?: VxeUploadEvents.DownloadFail
  onUploadSuccess?: VxeUploadEvents.UploadSuccess
  onUploadError?: VxeUploadEvents.UploadError
  onMoreVisible?: VxeUploadEvents.MoreVisible
}

export interface VxeUploadListeners {
  'update:modelValue'?: VxeUploadEvents.UpdateModelValue
  add?: VxeUploadEvents.Add
  remove?: VxeUploadEvents.Remove
  removeFail?: VxeUploadEvents.RemoveFail
  download?: VxeUploadEvents.Download
  downloadFail?: VxeUploadEvents.DownloadFail
  uploadSuccess?: VxeUploadEvents.UploadSuccess
  uploadError?: VxeUploadEvents.UploadError
  moreVisible?: VxeUploadEvents.MoreVisible
}

export namespace VxeUploadEvents {
  export type UpdateModelValue = (modelValue: VxeUploadPropTypes.ModelValue) => void
  export type Add = (params: VxeUploadDefines.AddEventParams) => void
  export type Remove = (params: VxeUploadDefines.RemoveEventParams) => void
  export type RemoveFail = (params: VxeUploadDefines.RemoveFailEventParams) => void
  export type Download = (params: VxeUploadDefines.DownloadEventParams) => void
  export type DownloadFail = (params: VxeUploadDefines.DownloadFailEventParams) => void
  export type UploadSuccess = (params: VxeUploadDefines.UploadSuccessEventParams) => void
  export type UploadError = (params: VxeUploadDefines.UploadErrorEventParams) => void
  export type MoreVisible = (params: VxeUploadDefines.MoreVisibleEventParams) => void
}

export namespace VxeUploadSlotTypes {
  export interface DefaultSlotParams {
    options: VxeUploadDefines.FileObjItem[]
    isMoreView: boolean
  }
  export interface TipSlotParams extends DefaultSlotParams {}

  export interface OptionSlotParams {
    options: VxeUploadDefines.FileObjItem[]
    option: VxeUploadDefines.FileObjItem
    isMoreView: boolean
  }
  export interface ActionSlotParams extends OptionSlotParams {}
  export interface NameSlotParams extends OptionSlotParams {}

  export interface MoreButtonSlotParams {
    options: VxeUploadDefines.FileObjItem[]
  }

  export interface MoreContentSlotParams {
    options: VxeUploadDefines.FileObjItem[]
  }
}

export interface VxeUploadSlots {
  default?: (params: VxeUploadSlotTypes.DefaultSlotParams) => any
  tip?: (params: VxeUploadSlotTypes.TipSlotParams) => any
  action?: (params: VxeUploadSlotTypes.ActionSlotParams) => any
  corner?: (params: VxeUploadSlotTypes.ActionSlotParams) => any
  name?: (params: VxeUploadSlotTypes.NameSlotParams) => any
  option?: (params: VxeUploadSlotTypes.OptionSlotParams) => any
  moreButton?: (params: VxeUploadSlotTypes.MoreButtonSlotParams) => any
  'more-button'?: (params: VxeUploadSlotTypes.MoreButtonSlotParams) => any
  moreContent?: (params: VxeUploadSlotTypes.MoreContentSlotParams) => any
  'more-content'?: (params: VxeUploadSlotTypes.MoreContentSlotParams) => any
}

export const Upload: typeof VxeUpload
export default VxeUpload
