import { ref, h, reactive, watch, computed, TransitionGroup, PropType, inject, onBeforeUnmount, onMounted, nextTick } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { VxeUI, getConfig, getI18n, getIcon, useSize, createEvent, globalEvents, renderEmptyElement } from '../../ui'
import { getSlotVNs } from '../../ui/src/vn'
import { errLog, warnLog } from '../../ui/src/log'
import { initTpImg, getTpImg, getEventTargetNode, toCssUnit } from '../../ui/src/dom'
import { readLocalFile } from './util'
import VxeButtonComponent from '../../button/src/button'

import type { VxeUploadDefines, VxeUploadPropTypes, UploadReactData, UploadInternalData, UploadPrivateMethods, UploadMethods, VxeUploadEmits, UploadPrivateRef, VxeUploadPrivateComputed, VxeUploadConstructor, VxeUploadPrivateMethods, VxeFormDefines, VxeFormConstructor, VxeFormPrivateMethods, ValueOf, VxeComponentEventParams } from '../../../types'
import type { VxeTableConstructor, VxeTablePrivateMethods } from '../../../types/components/table'

function createReactData (): UploadReactData {
  return {
    isDragUploadStatus: false,
    showMorePopup: false,
    isActivated: false,
    fileList: [],
    fileCacheMaps: {},
    isDragMove: false,
    dragIndex: -1,
    dragTipText: ''
  }
}

function createInternalData (): UploadInternalData {
  return {
    moreId: XEUtils.uniqueId('upload'),
    imagePreviewTypes: ['jpg', 'jpeg', 'png', 'gif'],
    prevDragIndex: -1
    // prevDragPos: ''
  }
}

export default defineVxeComponent({
  name: 'VxeUpload',
  props: {
    modelValue: [Array, String, Object] as PropType<VxeUploadPropTypes.ModelValue>,
    showList: {
      type: Boolean as PropType<VxeUploadPropTypes.ShowList>,
      default: () => getConfig().upload.showList
    },
    moreConfig: Object as PropType<VxeUploadPropTypes.MoreConfig>,
    readonly: {
      type: Boolean as PropType<VxeUploadPropTypes.Readonly>,
      default: null
    },
    disabled: {
      type: Boolean as PropType<VxeUploadPropTypes.Disabled>,
      default: null
    },
    autoSubmit: {
      type: Boolean as PropType<VxeUploadPropTypes.AutoSubmit>,
      default: () => getConfig().upload.autoSubmit
    },
    mode: {
      type: String as PropType<VxeUploadPropTypes.Mode>,
      default: () => getConfig().upload.mode
    },
    imageTypes: {
      type: Array as PropType<VxeUploadPropTypes.ImageTypes>,
      default: () => XEUtils.clone(getConfig().upload.imageTypes, true)
    },
    imageConfig: {
      type: Object as PropType<VxeUploadPropTypes.ImageConfig>,
      default: () => XEUtils.clone(getConfig().upload.imageConfig, true)
    },
    /**
     * 已废弃，被 image-config 替换
     * @deprecated
     */
    imageStyle: {
      type: Object as PropType<VxeUploadPropTypes.ImageStyle>,
      default: () => XEUtils.clone(getConfig().upload.imageStyle, true)
    },
    fileTypes: {
      type: Array as PropType<VxeUploadPropTypes.FileTypes>,
      default: () => XEUtils.clone(getConfig().upload.fileTypes, true)
    },
    dragSort: Boolean as PropType<VxeUploadPropTypes.DragSort>,
    dragToUpload: {
      type: Boolean as PropType<VxeUploadPropTypes.DragToUpload>,
      default: () => XEUtils.clone(getConfig().upload.dragToUpload, true)
    },
    dragPlaceholder: {
      type: String as PropType<VxeUploadPropTypes.DragPlaceholder>,
      default: () => getConfig().upload.dragPlaceholder
    },
    pasteToUpload: {
      type: Boolean as PropType<VxeUploadPropTypes.PasteToUpload>,
      default: () => XEUtils.clone(getConfig().upload.pasteToUpload, true)
    },
    keyField: String as PropType<VxeUploadPropTypes.KeyField>,
    singleMode: Boolean as PropType<VxeUploadPropTypes.SingleMode>,
    urlMode: Boolean as PropType<VxeUploadPropTypes.UrlMode>,
    urlArgs: {
      type: Boolean as PropType<VxeUploadPropTypes.UrlArgs>,
      default: () => getConfig().upload.urlArgs
    },
    multiple: Boolean as PropType<VxeUploadPropTypes.Multiple>,
    limitSize: {
      type: [String, Number] as PropType<VxeUploadPropTypes.LimitSize>,
      default: () => getConfig().upload.limitSize
    },
    showLimitSize: {
      type: Boolean as PropType<VxeUploadPropTypes.ShowLimitSize>,
      default: () => getConfig().upload.showLimitSize
    },
    limitSizeText: {
      type: [String, Number, Function] as PropType<VxeUploadPropTypes.LimitSizeText>,
      default: () => getConfig().upload.limitSizeText
    },
    limitCount: {
      type: [String, Number] as PropType<VxeUploadPropTypes.LimitCount>,
      default: () => getConfig().upload.limitCount
    },
    showLimitCount: {
      type: Boolean as PropType<VxeUploadPropTypes.ShowLimitCount>,
      default: () => getConfig().upload.showLimitCount
    },
    limitCountText: {
      type: [String, Number, Function] as PropType<VxeUploadPropTypes.LimitCountText>,
      default: () => getConfig().upload.limitCountText
    },
    nameField: {
      type: String as PropType<VxeUploadPropTypes.NameField>,
      default: () => getConfig().upload.nameField
    },
    typeField: {
      type: String as PropType<VxeUploadPropTypes.TypeField>,
      default: () => getConfig().upload.typeField
    },
    urlField: {
      type: String as PropType<VxeUploadPropTypes.UrlField>,
      default: () => getConfig().upload.urlField
    },
    sizeField: {
      type: String as PropType<VxeUploadPropTypes.SizeField>,
      default: () => getConfig().upload.sizeField
    },
    showErrorStatus: {
      type: Boolean as PropType<VxeUploadPropTypes.ShowErrorStatus>,
      default: () => getConfig().upload.showErrorStatus
    },
    showProgress: {
      type: Boolean as PropType<VxeUploadPropTypes.ShowProgress>,
      default: () => getConfig().upload.showProgress
    },
    progressText: {
      type: [String, Number, Function] as PropType<VxeUploadPropTypes.ProgressText>,
      default: () => getConfig().upload.progressText
    },
    previewImageConfig: Object as PropType<VxeUploadPropTypes.PreviewImageConfig>,
    showSubmitButton: Boolean as PropType<VxeUploadPropTypes.ShowSubmitButton>,
    autoHiddenButton: {
      type: Boolean as PropType<VxeUploadPropTypes.AutoHiddenButton>,
      default: () => getConfig().upload.autoHiddenButton
    },
    showUploadButton: {
      type: Boolean as PropType<VxeUploadPropTypes.ShowUploadButton>,
      default: () => getConfig().upload.showUploadButton
    },
    buttonText: {
      type: [String, Number, Function] as PropType<VxeUploadPropTypes.ButtonText>,
      default: () => getConfig().upload.buttonText
    },
    buttonIcon: {
      type: String as PropType<VxeUploadPropTypes.ButtonIcon>,
      default: () => getConfig().upload.buttonIcon
    },
    showButtonText: {
      type: Boolean as PropType<VxeUploadPropTypes.ShowButtonText>,
      default: () => getConfig().upload.showButtonText
    },
    showButtonIcon: {
      type: Boolean as PropType<VxeUploadPropTypes.ShowButtonIcon>,
      default: () => getConfig().upload.showButtonIcon
    },
    showRemoveButton: {
      type: Boolean as PropType<VxeUploadPropTypes.ShowRemoveButton>,
      default: () => getConfig().upload.showRemoveButton
    },
    showDownloadButton: {
      type: Boolean as PropType<VxeUploadPropTypes.ShowDownloadButton>,
      default: () => getConfig().upload.showDownloadButton
    },
    showPreview: {
      type: Boolean as PropType<VxeUploadPropTypes.ShowPreview>,
      default: () => getConfig().upload.showPreview
    },
    showTip: {
      type: Boolean as PropType<VxeUploadPropTypes.ShowTip>,
      default: () => null
    },
    maxSimultaneousUploads: {
      type: Number as PropType<VxeUploadPropTypes.MaxSimultaneousUploads>,
      default: () => getConfig().upload.maxSimultaneousUploads
    },
    tipText: [String, Number, Function] as PropType<VxeUploadPropTypes.TipText>,
    hintText: String as PropType<VxeUploadPropTypes.HintText>,
    previewMethod: Function as PropType<VxeUploadPropTypes.PreviewMethod>,
    beforeSelectMethod: Function as PropType<VxeUploadPropTypes.BeforeSelectMethod>,
    uploadMethod: Function as PropType<VxeUploadPropTypes.UploadMethod>,
    beforeRemoveMethod: Function as PropType<VxeUploadPropTypes.BeforeRemoveMethod>,
    removeMethod: Function as PropType<VxeUploadPropTypes.RemoveMethod>,
    beforeDownloadMethod: Function as PropType<VxeUploadPropTypes.BeforeDownloadMethod>,
    downloadMethod: Function as PropType<VxeUploadPropTypes.DownloadMethod>,
    getUrlMethod: Function as PropType<VxeUploadPropTypes.GetUrlMethod>,
    getThumbnailUrlMethod: Function as PropType<VxeUploadPropTypes.GetThumbnailUrlMethod>,
    size: {
      type: String as PropType<VxeUploadPropTypes.Size>,
      default: () => getConfig().upload.size || getConfig().size
    }
  },
  emits: [
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
  ] as VxeUploadEmits,
  setup (props, context) {
    const { emit, slots } = context

    const $xeForm = inject<VxeFormConstructor & VxeFormPrivateMethods | null>('$xeForm', null)
    const formItemInfo = inject<VxeFormDefines.ProvideItemInfo | null>('xeFormItemInfo', null)
    const $xeTable = inject<(VxeTableConstructor & VxeTablePrivateMethods) | null>('$xeTable', null)

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const refElem = ref<HTMLDivElement>()
    const refPopupElem = ref<HTMLDivElement>()
    const refDragLineElem = ref<HTMLDivElement>()
    const refModalDragLineElem = ref<HTMLDivElement>()

    const reactData = reactive(createReactData())

    const internalData = createInternalData()

    const refMaps: UploadPrivateRef = {
      refElem
    }

    const computeFormReadonly = computed(() => {
      const { readonly } = props
      if (readonly === null) {
        if ($xeForm) {
          return $xeForm.props.readonly
        }
        return false
      }
      return readonly
    })

    const computeIsDisabled = computed(() => {
      const { disabled } = props
      if (disabled === null) {
        if ($xeForm) {
          return $xeForm.props.disabled
        }
        return false
      }
      return disabled
    })

    const computeKeyField = computed(() => {
      return props.keyField || '_X_KEY'
    })

    const computeIsImage = computed(() => {
      return props.mode === 'image'
    })

    const computeNameProp = computed(() => {
      return props.nameField || 'name'
    })

    const computeTypeProp = computed(() => {
      return props.typeField || 'type'
    })

    const computeUrlProp = computed(() => {
      return props.urlField || 'url'
    })

    const computeSizeProp = computed(() => {
      return props.sizeField || 'size'
    })

    const computeLimitMaxSize = computed(() => {
      return XEUtils.toNumber(props.limitSize) * 1024 * 1024
    })

    const computeLimitMaxCount = computed(() => {
      return props.multiple ? XEUtils.toNumber(props.limitCount) : 1
    })

    const computePreviewImageOpts = computed(() => {
      const { showDownloadButton } = props
      return Object.assign({
        showDownloadButton
      }, getConfig().upload.previewImageConfig, props.previewImageConfig)
    })

    const computeOverCount = computed(() => {
      const { multiple } = props
      const { fileList } = reactData
      const limitMaxCount = computeLimitMaxCount.value
      if (multiple) {
        if (limitMaxCount) {
          return fileList.length >= limitMaxCount
        }
        return true
      }
      return fileList.length >= 1
    })

    const computeLimitSizeUnit = computed(() => {
      const limitSize = XEUtils.toNumber(props.limitSize)
      if (limitSize) {
        if (limitSize > 1048576) {
          return `${limitSize / 1048576}T`
        }
        if (limitSize > 1024) {
          return `${limitSize / 1024}G`
        }
        return `${limitSize}M`
      }
      return ''
    })

    const computedShowTipText = computed(() => {
      const { showTip, tipText } = props
      if (XEUtils.isBoolean(showTip)) {
        return showTip
      }
      const defShowTip = getConfig().upload.showTip
      if (XEUtils.isBoolean(defShowTip)) {
        return defShowTip
      }
      if (tipText) {
        return true
      }
      return false
    })

    const computedDefTipText = computed(() => {
      const { limitSize, fileTypes, multiple, limitCount } = props
      const tipText = props.tipText || props.hintText
      const isImage = computeIsImage.value
      const limitSizeUnit = computeLimitSizeUnit.value
      if (XEUtils.isString(tipText)) {
        return tipText
      }
      if (XEUtils.isFunction(tipText)) {
        return `${tipText({})}`
      }
      const defTips: string[] = []
      if (isImage) {
        if (multiple && limitCount) {
          defTips.push(getI18n('vxe.upload.imgCountHint', [limitCount]))
        }
        if (limitSize && limitSizeUnit) {
          defTips.push(getI18n('vxe.upload.imgSizeHint', [limitSizeUnit]))
        }
      } else {
        if (fileTypes && fileTypes.length) {
          defTips.push(getI18n('vxe.upload.fileTypeHint', [fileTypes.join('/')]))
        }
        if (limitSize && limitSizeUnit) {
          defTips.push(getI18n('vxe.upload.fileSizeHint', [limitSizeUnit]))
        }
        if (multiple && limitCount) {
          defTips.push(getI18n('vxe.upload.fileCountHint', [limitCount]))
        }
      }
      return defTips.join(getI18n('vxe.base.comma'))
    })

    const computeImageOpts = computed(() => {
      return Object.assign({}, props.imageConfig || props.imageStyle)
    })

    const computeImgStyle = computed(() => {
      const imageOpts = computeImageOpts.value
      const { width, height } = imageOpts
      const stys: Record<string, string> = {}
      if (width) {
        stys.width = toCssUnit(width)
      }
      if (height) {
        stys.height = toCssUnit(height)
      }
      return stys
    })

    const computeMoreOpts = computed(() => {
      return Object.assign({ showMoreButton: true }, props.moreConfig)
    })

    const computeMaps: VxeUploadPrivateComputed = {
    }

    const $xeUpload = {
      xID,
      props,
      context,
      reactData,
      internalData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeUploadConstructor & VxeUploadPrivateMethods

    const getUniqueKey = () => {
      return XEUtils.uniqueId()
    }

    const getFieldKey = (item: VxeUploadDefines.FileObjItem) => {
      const keyField = computeKeyField.value
      return item[keyField]
    }

    const updateFileList = () => {
      const { modelValue, multiple } = props
      const formReadonly = computeFormReadonly.value
      const keyField = computeKeyField.value
      const nameProp = computeNameProp.value
      const typeProp = computeTypeProp.value
      const urlProp = computeUrlProp.value
      const sizeProp = computeSizeProp.value
      const fileList = modelValue
        ? (modelValue ? (XEUtils.isArray(modelValue) ? modelValue : [modelValue]) : []).map(item => {
            if (!item || XEUtils.isString(item)) {
              const url = `${item || ''}`
              const urlObj = XEUtils.parseUrl(item)
              const name = (urlObj ? urlObj.searchQuery[nameProp] : '') || parseFileName(url)
              return {
                [nameProp]: name,
                [typeProp]: (urlObj ? urlObj.searchQuery[typeProp] : '') || parseFileType(name),
                [urlProp]: url,
                [sizeProp]: XEUtils.toNumber(urlObj ? urlObj.searchQuery[sizeProp] : 0) || 0,
                [keyField]: getUniqueKey()
              }
            }
            const name = item[nameProp] || ''
            item[nameProp] = name
            item[typeProp] = item[typeProp] || parseFileType(name)
            item[urlProp] = item[urlProp] || ''
            item[sizeProp] = item[sizeProp] || 0
            item[keyField] = item[keyField] || getUniqueKey()
            return item
          })
        : []
      reactData.fileList = (formReadonly || multiple) ? fileList : (fileList.slice(0, 1))
    }

    const parseFileName = (url: string) => {
      return decodeURIComponent(`${url || ''}`).split('/').pop() || ''
    }

    const parseFileType = (name: string) => {
      // 这里不用split('.').pop()因为没有后缀时会返回自身
      const index = name.lastIndexOf('.')
      if (index > 0) {
        return name.substring(index + 1).toLowerCase()
      }
      return ''
    }

    const dispatchEvent = (type: ValueOf<VxeUploadEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $upload: $xeUpload }, params))
    }

    const emitModel = (value: any) => {
      emit('update:modelValue', value)
    }

    const handleChange = (value: VxeUploadDefines.FileObjItem[]) => {
      const { singleMode, urlMode, urlArgs } = props
      const urlProp = computeUrlProp.value
      const nameProp = computeNameProp.value
      let restList = value ? value.slice(0) : []
      if (urlMode) {
        restList = restList.map(item => {
          const url = item[urlProp]
          if (url && urlArgs) {
            const urlObj = XEUtils.parseUrl(url)
            if (!urlObj.searchQuery[nameProp]) {
              if (url.indexOf('blob:') === -1) {
                return `${url}${url.indexOf('?') === -1 ? '?' : '&'}${nameProp}=${encodeURIComponent(item[nameProp] || '')}`
              }
            }
          }
          return url
        })
      }
      emitModel(singleMode ? (restList[0] || null) : restList)
    }

    const getThumbnailFileUrl = (item: VxeUploadDefines.FileObjItem) => {
      const getThumbnailUrlFn = props.getThumbnailUrlMethod || getConfig().upload.getThumbnailUrlMethod
      if (getThumbnailUrlFn) {
        return getThumbnailUrlFn({
          $upload: $xeUpload,
          option: item
        })
      }
      return getFileUrl(item)
    }

    const getFileUrl = (item: VxeUploadDefines.FileObjItem) => {
      const getUrlFn = props.getUrlMethod || getConfig().upload.getUrlMethod
      const urlProp = computeUrlProp.value
      return getUrlFn
        ? getUrlFn({
          $upload: $xeUpload,
          option: item
        })
        : item[urlProp]
    }

    const handleDefaultFilePreview = (item: VxeUploadDefines.FileObjItem) => {
      const { imageTypes, showDownloadButton } = props
      const typeProp = computeTypeProp.value
      const previewImageOpts = computePreviewImageOpts.value
      const beforeDownloadFn = props.beforeDownloadMethod || getConfig().upload.beforeDownloadMethod
      const { imagePreviewTypes } = internalData
      // 如果是预览图片
      if (imagePreviewTypes.concat(imageTypes || []).some(type => `${type}`.toLowerCase() === `${item[typeProp]}`.toLowerCase())) {
        if (VxeUI.previewImage) {
          VxeUI.previewImage({
            ...previewImageOpts,
            urlList: [getFileUrl(item)],
            showDownloadButton,
            beforeDownloadMethod: beforeDownloadFn
              ? () => {
                  return beforeDownloadFn({
                    $upload: $xeUpload,
                    option: item
                  })
                }
              : undefined
          })
        }
      }
    }

    const handlePreviewFileEvent = (evnt: MouseEvent, item: VxeUploadDefines.FileObjItem) => {
      const previewFn = props.previewMethod || getConfig().upload.previewMethod
      if (props.showPreview) {
        if (previewFn) {
          previewFn({
            $upload: $xeUpload,
            option: item
          })
        } else {
          handleDefaultFilePreview(item)
        }
      }
    }

    const handlePreviewImageEvent = (evnt: MouseEvent, item: VxeUploadDefines.FileObjItem, index: number) => {
      const { showDownloadButton } = props
      const { fileList } = reactData
      const previewImageOpts = computePreviewImageOpts.value
      const previewFn = props.previewMethod || getConfig().upload.previewMethod
      const beforeDownloadFn = props.beforeDownloadMethod || getConfig().upload.beforeDownloadMethod
      if (props.showPreview) {
        if (previewFn) {
          previewFn({
            $upload: $xeUpload,
            option: item
          })
        } else if (VxeUI.previewImage) {
          VxeUI.previewImage({
            ...previewImageOpts,
            urlList: fileList.map(item => getFileUrl(item)),
            activeIndex: index,
            showDownloadButton,
            beforeDownloadMethod: beforeDownloadFn
              ? ({ index }) => {
                  return beforeDownloadFn({
                    $upload: $xeUpload,
                    option: fileList[index]
                  })
                }
              : undefined
          })
        }
      }
    }

    const handleUploadResult = (item: VxeUploadDefines.FileObjItem, file: File) => {
      const { showErrorStatus } = props
      const fileKey = getFieldKey(item)
      const uploadFn = props.uploadMethod || getConfig().upload.uploadMethod
      if (uploadFn) {
        return Promise.resolve(
          uploadFn({
            $upload: $xeUpload,
            file,
            option: item,
            updateProgress (percentNum) {
              const { fileCacheMaps } = reactData
              const cacheItem = fileCacheMaps[getFieldKey(item)]
              if (cacheItem) {
                cacheItem.percent = Math.max(0, Math.min(99, XEUtils.toNumber(percentNum)))
              }
            }
          })
        ).then(res => {
          const { fileCacheMaps } = reactData
          const cacheItem = fileCacheMaps[fileKey]
          if (cacheItem) {
            cacheItem.percent = 100
            cacheItem.status = 'success'
          }
          Object.assign(item, res)
          dispatchEvent('upload-success', { option: item, data: res }, null)
        }).catch((res) => {
          const { fileCacheMaps } = reactData
          const cacheItem = fileCacheMaps[fileKey]
          if (cacheItem) {
            cacheItem.status = 'error'
          }
          if (showErrorStatus) {
            Object.assign(item, res)
          } else {
            reactData.fileList = reactData.fileList.filter(obj => getFieldKey(obj) !== fileKey)
          }
          dispatchEvent('upload-error', { option: item, data: res }, null)
        }).finally(() => {
          const { fileCacheMaps } = reactData
          const cacheItem = fileCacheMaps[fileKey]
          if (cacheItem) {
            cacheItem.loading = false
          }
        })
      } else {
        const { fileCacheMaps } = reactData
        const cacheItem = fileCacheMaps[fileKey]
        if (cacheItem) {
          cacheItem.loading = false
        }
      }
      return Promise.resolve()
    }

    const handleReUpload = (item: VxeUploadDefines.FileObjItem) => {
      const { uploadMethod, urlMode } = props
      const { fileCacheMaps } = reactData
      const fileKey = getFieldKey(item)
      const cacheItem = fileCacheMaps[fileKey]
      const uploadFn = uploadMethod || getConfig().upload.uploadMethod
      if (uploadFn && cacheItem) {
        const file = cacheItem.file
        cacheItem.loading = true
        cacheItem.status = 'pending'
        cacheItem.percent = 0
        handleUploadResult(item, file).then(() => {
          if (urlMode) {
            handleChange(reactData.fileList)
          }
        })
      }
    }
    const handleUploadFile = (files: File[], evnt: Event | null) => {
      const { multiple, urlMode, showLimitSize, limitSizeText, showLimitCount, limitCountText, autoSubmit } = props
      const { fileList } = reactData
      const beforeSelectFn = props.beforeSelectMethod || getConfig().upload.beforeSelectMethod
      const uploadFn = props.uploadMethod || getConfig().upload.uploadMethod
      const keyField = computeKeyField.value
      const nameProp = computeNameProp.value
      const typeProp = computeTypeProp.value
      const urlProp = computeUrlProp.value
      const sizeProp = computeSizeProp.value
      const limitMaxSize = computeLimitMaxSize.value
      const limitMaxCount = computeLimitMaxCount.value
      const limitSizeUnit = computeLimitSizeUnit.value
      let selectFiles = files

      if (multiple && limitMaxCount) {
        // 校验文件数量
        if (showLimitCount && fileList.length >= limitMaxCount) {
          if (VxeUI.modal) {
            VxeUI.modal.notification({
              title: getI18n('vxe.modal.errTitle'),
              status: 'error',
              content: limitCountText ? `${XEUtils.isFunction(limitCountText) ? limitCountText({ maxCount: limitMaxCount }) : limitCountText}` : getI18n('vxe.upload.overCountErr', [limitMaxCount])
            })
          }
          return
        }
        const overNum = selectFiles.length - (limitMaxCount - fileList.length)
        if (showLimitCount && overNum > 0) {
          const overExtraList = selectFiles.slice(limitMaxCount - fileList.length)
          if (limitCountText) {
            VxeUI.modal.notification({
              title: getI18n('vxe.modal.errTitle'),
              status: 'error',
              content: `${XEUtils.isFunction(limitCountText) ? limitCountText({ maxCount: limitMaxCount }) : limitCountText}`
            })
          } else if (VxeUI.modal) {
            VxeUI.modal.notification({
              title: getI18n('vxe.modal.errTitle'),
              status: 'error',
              width: null,
              slots: {
                default () {
                  return h('div', {
                    class: 'vxe-upload--file-message-over-error'
                  }, [
                    h('div', {}, getI18n('vxe.upload.overCountExtraErr', [limitMaxCount, overNum])),
                    h('div', {
                      class: 'vxe-upload--file-message-over-extra'
                    }, overExtraList.map((file, index) => {
                      return h('div', {
                        key: index,
                        class: 'vxe-upload--file-message-over-extra-item'
                      }, file.name)
                    }))
                  ])
                }
              }
            })
          }
        }
        selectFiles = selectFiles.slice(0, limitMaxCount - fileList.length)
      }

      // 校验文件大小
      if (showLimitSize && limitMaxSize) {
        for (let i = 0; i < files.length; i++) {
          const file = files[0]
          if (file.size > limitMaxSize) {
            if (VxeUI.modal) {
              VxeUI.modal.notification({
                title: getI18n('vxe.modal.errTitle'),
                status: 'error',
                content: limitSizeText ? `${XEUtils.isFunction(limitSizeText) ? limitSizeText({ maxSize: limitMaxSize }) : limitSizeText}` : getI18n('vxe.upload.overSizeErr', [limitSizeUnit])
              })
            }
            return
          }
        }
      }

      const cacheMaps = Object.assign({}, reactData.fileCacheMaps)
      const newFileList = multiple ? fileList : []
      const uploadPromiseRests: any[] = []
      selectFiles.forEach(file => {
        const { name } = file
        const fileKey = getUniqueKey()
        const fileObj: VxeUploadDefines.FileObjItem = {
          [nameProp]: name,
          [typeProp]: parseFileType(name),
          [sizeProp]: file.size,
          [urlProp]: URL.createObjectURL(file),
          [keyField]: fileKey
        }
        if (uploadFn) {
          cacheMaps[fileKey] = {
            file: file,
            loading: !!autoSubmit,
            status: 'pending',
            percent: 0
          }
        }
        const item = reactive(fileObj)
        if (!beforeSelectFn || beforeSelectFn({ $upload: $xeUpload, file })) {
          if (uploadFn && autoSubmit) {
            uploadPromiseRests.push(
              handleUploadResult(item, file)
            )
          }
          newFileList.push(item)
        }
      })
      reactData.fileList = newFileList
      reactData.fileCacheMaps = cacheMaps
      newFileList.forEach(item => {
        dispatchEvent('add', { option: item }, evnt)
      })
      Promise.all(urlMode ? uploadPromiseRests : []).then(() => {
        handleChange(newFileList)
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt as any, formItemInfo.itemConfig.field, newFileList)
        }
      })
    }

    const handleChoose = (evnt: MouseEvent | null) => {
      const { multiple, imageTypes, fileTypes } = props
      const isDisabled = computeIsDisabled.value
      const isImage = computeIsImage.value
      if (isDisabled) {
        return Promise.resolve({
          status: false,
          files: [],
          file: null
        })
      }
      return readLocalFile({
        multiple,
        types: isImage ? imageTypes : fileTypes
      }).then((params) => {
        handleUploadFile(params.files, evnt)
        return params
      })
    }

    const clickEvent = (evnt: MouseEvent) => {
      handleChoose(evnt).catch(() => {
        // 错误文件类型
      })
    }

    const handleRemoveEvent = (evnt: MouseEvent, item: VxeUploadDefines.FileObjItem, index: number) => {
      const { fileList } = reactData
      fileList.splice(index, 1)
      handleChange(fileList)
      // 自动更新校验状态
      if ($xeForm && formItemInfo) {
        $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, fileList)
      }
      dispatchEvent('remove', { option: item }, evnt)
    }

    const removeFileEvent = (evnt: MouseEvent, item: VxeUploadDefines.FileObjItem, index: number) => {
      const beforeRemoveFn = props.beforeRemoveMethod || getConfig().upload.beforeRemoveMethod
      const removeFn = props.removeMethod || getConfig().upload.removeMethod
      Promise.resolve(
        beforeRemoveFn
          ? beforeRemoveFn({
            $upload: $xeUpload,
            option: item
          })
          : true
      ).then(status => {
        if (status) {
          if (removeFn) {
            Promise.resolve(
              removeFn({
                $upload: $xeUpload,
                option: item
              })
            ).then(() => {
              handleRemoveEvent(evnt, item, index)
            }).catch(e => e)
          } else {
            handleRemoveEvent(evnt, item, index)
          }
        } else {
          dispatchEvent('remove-fail', { option: item }, evnt)
        }
      })
    }

    const handleDownloadEvent = (evnt: MouseEvent, item: VxeUploadDefines.FileObjItem) => {
      dispatchEvent('download', { option: item }, evnt)
    }

    const downloadFileEvent = (evnt: MouseEvent, item: VxeUploadDefines.FileObjItem) => {
      const beforeDownloadFn = props.beforeDownloadMethod || getConfig().upload.beforeDownloadMethod
      const downloadFn = props.downloadMethod || getConfig().upload.downloadMethod
      Promise.resolve(
        beforeDownloadFn
          ? beforeDownloadFn({
            $upload: $xeUpload,
            option: item
          })
          : true
      ).then(status => {
        if (status) {
          if (downloadFn) {
            Promise.resolve(
              downloadFn({
                $upload: $xeUpload,
                option: item
              })
            ).then(() => {
              handleDownloadEvent(evnt, item)
            }).catch(e => e)
          } else {
            handleDownloadEvent(evnt, item)
          }
        } else {
          dispatchEvent('download-fail', { option: item }, evnt)
        }
      })
    }

    const handleUploadDragleaveEvent = (evnt: DragEvent) => {
      const targetElem = evnt.currentTarget as HTMLDivElement
      const { clientX, clientY } = evnt
      if (targetElem) {
        const { x: targetX, y: targetY, height: targetHeight, width: targetWidth } = targetElem.getBoundingClientRect()
        if (clientX < targetX || clientX > targetX + targetWidth || clientY < targetY || clientY > targetY + targetHeight) {
          reactData.isDragUploadStatus = false
        }
      }
    }

    const handleUploadDragoverEvent = (evnt: DragEvent) => {
      const dataTransfer = evnt.dataTransfer
      if (dataTransfer) {
        const { items } = dataTransfer
        if (items && items.length) {
          evnt.preventDefault()
          reactData.isDragUploadStatus = true
        }
      }
    }

    const uploadTransferFileEvent = (evnt: Event, files: File[]) => {
      const { imageTypes, fileTypes } = props
      const { imagePreviewTypes } = internalData
      const isImage = computeIsImage.value
      if (isImage) {
        const pasteImgTypes = imagePreviewTypes.concat(imageTypes && imageTypes.length ? imageTypes : [])
        files = files.filter(file => {
          const fileType = `${file.type.split('/')[1] || ''}`.toLowerCase()
          if (pasteImgTypes.some(type => `${type}`.toLowerCase() === fileType)) {
            return true
          }
          return false
        })
      } else {
        if (fileTypes && fileTypes.length) {
          const errTypes: string[] = []
          files.forEach(file => {
            const fileType = parseFileType(file.name)
            if (!fileTypes.some(type => `${type}`.toLowerCase() === fileType)) {
              errTypes.push(fileType)
            }
          })
          if (errTypes.length) {
            if (VxeUI.modal) {
              VxeUI.modal.message({
                content: getI18n('vxe.error.notType', [errTypes.join(', ')]),
                status: 'error'
              })
            }
            return
          }
        }
      }
      // 如果全部不满足条件
      if (!files.length) {
        if (VxeUI.modal) {
          VxeUI.modal.notification({
            title: getI18n('vxe.modal.errTitle'),
            status: 'error',
            content: getI18n('vxe.upload.uploadTypeErr')
          })
        }
        return
      }
      handleUploadFile(files, evnt)
    }

    const handleUploadDropEvent = (evnt: DragEvent) => {
      const dataTransfer = evnt.dataTransfer
      if (dataTransfer) {
        const { items } = dataTransfer
        if (items && items.length) {
          evnt.preventDefault()
          const files = handleTransferFiles(items)
          if (files.length) {
            uploadTransferFileEvent(evnt, files)
          }
        }
      }
      reactData.isDragUploadStatus = false
    }

    const handleTransferFiles = (items: DataTransferItemList) => {
      const files: File[] = []
      XEUtils.arrayEach(items, item => {
        const file = item.getAsFile()
        if (file) {
          files.push(file)
        }
      })
      return files
    }

    const handleMoreEvent = (evntParams: VxeComponentEventParams) => {
      const formReadonly = computeFormReadonly.value
      const isImage = computeIsImage.value

      const evnt = evntParams.$event
      if (VxeUI.modal) {
        VxeUI.modal.open({
          id: internalData.moreId,
          title: formReadonly ? getI18n('vxe.upload.morePopup.readTitle') : getI18n(`vxe.upload.morePopup.${isImage ? 'imageTitle' : 'fileTitle'}`),
          width: 660,
          height: 500,
          escClosable: true,
          showMaximize: true,
          resize: true,
          maskClosable: true,
          slots: {
            default () {
              const { showErrorStatus, dragToUpload, dragSort, dragPlaceholder } = props
              const { isActivated, isDragMove, isDragUploadStatus, dragIndex } = reactData
              const { fileList } = reactData
              const isDisabled = computeIsDisabled.value
              const moreContSlot = slots.moreContent || slots['more-content']

              const ons: Record<string, any> = {}
              if (dragToUpload && dragIndex === -1) {
                ons.onDragover = handleUploadDragoverEvent
                ons.onDragleave = handleUploadDragleaveEvent
                ons.onDrop = handleUploadDropEvent
              }

              return h('div', {
                ref: refPopupElem,
                class: ['vxe-upload--more-popup', {
                  'is--readonly': formReadonly,
                  'is--disabled': isDisabled,
                  'is--active': isActivated,
                  'show--error': showErrorStatus,
                  'is--drag': isDragUploadStatus
                }],
                ...ons
              }, moreContSlot
                ? getSlotVNs(moreContSlot({ options: fileList }))
                : [
                    isImage
                      ? (
                          dragSort
                            ? h(TransitionGroup, {
                              name: `vxe-upload--drag-list${isDragMove ? '' : '-disabled'}`,
                              tag: 'div',
                              class: 'vxe-upload--image-more-list'
                            }, {
                              default: () => renderImageItemList(fileList, true).concat(renderImageAction(true))
                            })
                            : h('div', {
                              class: 'vxe-upload--image-more-list'
                            }, renderImageItemList(fileList, true).concat(renderImageAction(true)))
                        )
                      : h('div', {
                        class: 'vxe-upload--file-more-list'
                      }, [
                        renderFileAction(true),
                        dragSort
                          ? h(TransitionGroup, {
                            name: `vxe-upload--drag-list${isDragMove ? '' : '-disabled'}`,
                            tag: 'div',
                            class: 'vxe-upload--file-list'
                          }, {
                            default: () => renderFileItemList(fileList, false)
                          })
                          : h('div', {
                            class: 'vxe-upload--file-list'
                          }, renderFileItemList(fileList, true))
                      ]),
                    dragSort
                      ? h('div', {
                        ref: refModalDragLineElem,
                        class: 'vxe-upload--drag-line'
                      })
                      : renderEmptyElement($xeUpload),
                    isDragUploadStatus
                      ? h('div', {
                        class: 'vxe-upload--drag-placeholder'
                      }, dragPlaceholder || getI18n('vxe.upload.dragPlaceholder'))
                      : renderEmptyElement($xeUpload)
                  ])
            }
          },
          onShow () {
            reactData.showMorePopup = true
          },
          onHide ({ $event }) {
            reactData.showMorePopup = false
            if ($event) {
              dispatchEvent('more-visible', { visible: false }, $event)
            }
          }
        })
        if (evnt) {
          dispatchEvent('more-visible', { visible: true }, evnt)
        }
      }
    }

    const showDropTip = (evnt: DragEvent, dragEl: HTMLElement, dragPos: string) => {
      const { showMorePopup } = reactData
      const el = refElem.value
      const popupEl = refPopupElem.value
      const wrapperEl = showMorePopup ? popupEl : el
      if (!wrapperEl) {
        return
      }
      const wrapperRect = wrapperEl.getBoundingClientRect()
      const ddLineEl = refDragLineElem.value
      const mdLineEl = refModalDragLineElem.value
      const currDLineEl = showMorePopup ? mdLineEl : ddLineEl
      if (currDLineEl) {
        const dragRect = dragEl.getBoundingClientRect()
        currDLineEl.style.display = 'block'
        currDLineEl.style.top = `${Math.max(1, dragRect.y - wrapperRect.y)}px`
        currDLineEl.style.left = `${Math.max(1, dragRect.x - wrapperRect.x)}px`
        currDLineEl.style.height = `${dragRect.height}px`
        currDLineEl.style.width = `${dragRect.width - 1}px`
        currDLineEl.setAttribute('drag-pos', dragPos)
      }
    }

    const hideDropTip = () => {
      const ddLineEl = refDragLineElem.value
      const mdLineEl = refModalDragLineElem.value
      if (ddLineEl) {
        ddLineEl.style.display = ''
      }
      if (mdLineEl) {
        mdLineEl.style.display = ''
      }
    }

    // 拖拽
    const handleDragSortDragstartEvent = (evnt: DragEvent) => {
      evnt.stopPropagation()
      if (evnt.dataTransfer) {
        evnt.dataTransfer.setDragImage(getTpImg(), 0, 0)
      }
      const dragEl = evnt.currentTarget as HTMLElement
      const parentEl = dragEl.parentElement as HTMLDivElement
      const dragIndex = XEUtils.findIndexOf(Array.from(parentEl.children), item => dragEl === item)
      reactData.isDragMove = true
      reactData.dragIndex = dragIndex
      setTimeout(() => {
        reactData.isDragMove = false
      }, 500)
    }

    const handleDragSortDragoverEvent = (evnt: DragEvent) => {
      evnt.stopPropagation()
      evnt.preventDefault()
      const { dragIndex } = reactData
      if (dragIndex === -1) {
        return
      }
      const isImage = computeIsImage.value
      const dragEl = evnt.currentTarget as HTMLElement
      const parentEl = dragEl.parentElement as HTMLDivElement
      const currIndex = XEUtils.findIndexOf(Array.from(parentEl.children), item => dragEl === item)
      let dragPos: 'top' | 'bottom' | 'left' | 'right' | '' = ''
      if (isImage) {
        const offsetX = evnt.clientX - dragEl.getBoundingClientRect().x
        dragPos = offsetX < dragEl.clientWidth / 2 ? 'left' : 'right'
      } else {
        const offsetY = evnt.clientY - dragEl.getBoundingClientRect().y
        dragPos = offsetY < dragEl.clientHeight / 2 ? 'top' : 'bottom'
      }
      if (dragIndex === currIndex) {
        showDropTip(evnt, dragEl, dragPos)
        return
      }
      showDropTip(evnt, dragEl, dragPos)
      internalData.prevDragIndex = currIndex
      internalData.prevDragPos = dragPos
    }

    const handleDragSortDragendEvent = (evnt: DragEvent) => {
      const { fileList, dragIndex } = reactData
      const { prevDragIndex, prevDragPos } = internalData
      const oldIndex = dragIndex
      const targetIndex = prevDragIndex
      const dragOffsetIndex = prevDragPos === 'bottom' || prevDragPos === 'right' ? 1 : 0
      const oldItem = fileList[oldIndex]
      const newItem = fileList[targetIndex]
      if (oldItem && newItem) {
        fileList.splice(oldIndex, 1)
        const ptfIndex = XEUtils.findIndexOf(fileList, item => newItem === item)
        const nIndex = ptfIndex + dragOffsetIndex
        fileList.splice(nIndex, 0, oldItem)
        dispatchEvent('sort-dragend', {
          oldItem: oldItem,
          newItem: newItem,
          dragPos: prevDragPos as any,
          offsetIndex: dragOffsetIndex,
          _index: {
            newIndex: nIndex,
            oldIndex: oldIndex
          }
        }, evnt)
      }
      hideDropTip()
      reactData.dragIndex = -1
    }

    const handleItemMousedownEvent = (evnt: MouseEvent) => {
      if ($xeTable) {
        evnt.stopPropagation()
      }
      reactData.isActivated = true
    }

    const handleGlobalPasteEvent = (evnt: ClipboardEvent) => {
      const { pasteToUpload } = props
      const { isActivated } = reactData
      if (!isActivated || !pasteToUpload) {
        return
      }
      const clipboardData: DataTransfer = evnt.clipboardData || (evnt as any).originalEvent.clipboardData
      if (!clipboardData) {
        return
      }
      const { items } = clipboardData
      if (!items) {
        return
      }
      const files = handleTransferFiles(items)
      if (files.length) {
        evnt.preventDefault()
        uploadTransferFileEvent(evnt, files)
      }
    }

    const handleGlobalMousedownEvent = (evnt: MouseEvent) => {
      const el = refElem.value
      const popupEl = refPopupElem.value
      let isActivated = getEventTargetNode(evnt, el).flag
      if (!isActivated && popupEl) {
        const parentEl = popupEl.parentElement || popupEl
        const modalEl = parentEl ? parentEl.parentElement : parentEl
        isActivated = getEventTargetNode(evnt, modalEl).flag
      }
      reactData.isActivated = isActivated
    }

    const handleGlobalBlurEvent = () => {
      reactData.isActivated = false
    }

    const uploadMethods: UploadMethods = {
      dispatchEvent,
      choose () {
        return handleChoose(null)
      },
      getPendingFiles () {
        const { fileList, fileCacheMaps } = reactData
        const pendingFiles: File[] = []
        fileList.forEach(item => {
          const fileKey = getFieldKey(item)
          const cacheItem = fileCacheMaps[fileKey]
          if (cacheItem && cacheItem.status === 'pending') {
            pendingFiles.push(cacheItem.file)
          }
        })
        return pendingFiles
      },
      submit (isFull) {
        const { maxSimultaneousUploads } = props
        const msNum = XEUtils.toNumber(maxSimultaneousUploads || 1) || 1
        const { fileList, fileCacheMaps } = reactData
        const allPendingList = fileList.filter(item => {
          const fileKey = getFieldKey(item)
          const cacheItem = fileCacheMaps[fileKey]
          return cacheItem && (cacheItem.status === 'pending' || (isFull && cacheItem.status === 'error'))
        })

        const handleSubmit = (item: VxeUploadDefines.FileObjItem): Promise<void> => {
          const fileKey = getFieldKey(item)
          const cacheItem = fileCacheMaps[fileKey]
          if (cacheItem) {
            const file = cacheItem.file
            if (file && (cacheItem.status === 'pending' || (isFull && cacheItem.status === 'error'))) {
              cacheItem.loading = true
              cacheItem.percent = 0
              return handleUploadResult(item, file).then(handleNextSubmit)
            }
          }
          return handleNextSubmit()
        }

        const handleNextSubmit = (): Promise<void> => {
          if (allPendingList.length) {
            const item = allPendingList[0]
            allPendingList.splice(0, 1)
            return handleSubmit(item).then(handleNextSubmit)
          }
          return Promise.resolve()
        }

        return Promise.all(allPendingList.splice(0, msNum).map(handleSubmit)).then(() => {
          // 完成
        })
      },
      getMoreVisible () {
        return reactData.showMorePopup
      },
      openMore () {
        handleMoreEvent({ $event: new Event('click') })
        return nextTick()
      },
      openMoreByEvent (evnt) {
        handleMoreEvent({ $event: evnt })
        return nextTick()
      },
      closeMore () {
        if (VxeUI.modal) {
          VxeUI.modal.close(internalData.moreId)
        }
        return nextTick()
      }
    }

    const uploadPrivateMethods: UploadPrivateMethods = {
    }

    Object.assign($xeUpload, uploadMethods, uploadPrivateMethods)

    const renderFileItemList = (currList: VxeUploadDefines.FileObjItem[], isMoreView: boolean) => {
      const { showRemoveButton, showDownloadButton, showProgress, progressText, showPreview, showErrorStatus, dragSort, autoSubmit, showSubmitButton } = props
      const { fileList, fileCacheMaps } = reactData
      const isDisabled = computeIsDisabled.value
      const formReadonly = computeFormReadonly.value
      const nameProp = computeNameProp.value
      const typeProp = computeTypeProp.value
      const optionSlot = slots.option
      const actionSlot = slots.action
      const cornerSlot = slots.corner
      const nameSlot = slots.name

      const ons: Record<string, any> = {}
      if (dragSort && currList.length > 1) {
        ons.onDragstart = handleDragSortDragstartEvent
        ons.onDragover = handleDragSortDragoverEvent
        ons.onDragend = handleDragSortDragendEvent
      }

      return currList.map((item, index) => {
        const fileKey = getFieldKey(item)
        const cacheItem = fileCacheMaps[fileKey]
        let isLoading = false
        let isError = false
        let isPending = false
        const fileName = `${item[nameProp] || ''}`
        if (cacheItem) {
          isLoading = cacheItem.loading
          isError = cacheItem.status === 'error'
          isPending = cacheItem.status === 'pending'
        }
        return h('div', {
          key: dragSort ? fileKey : index,
          class: ['vxe-upload--file-item', {
            'is--preview': showPreview,
            'is--loading': isLoading,
            'is--pending': isPending,
            'is--error': isError
          }],
          fileid: fileKey,
          draggable: dragSort ? true : null,
          ...ons
        }, optionSlot
          ? getSlotVNs(optionSlot({ option: item, isMoreView, options: fileList }))
          : [
              h('div', {
                class: 'vxe-upload--file-item-icon'
              }, [
                h('i', {
                  class: getIcon()[`UPLOAD_FILE_TYPE_${`${item[typeProp]}`.toLocaleUpperCase() as 'DEFAULT'}`] || getIcon().UPLOAD_FILE_TYPE_DEFAULT
                })
              ]),
              h('div', {
                class: 'vxe-upload--file-item-name',
                title: fileName,
                onClick (evnt) {
                  if (!isLoading && !isError) {
                    handlePreviewFileEvent(evnt, item)
                  }
                }
              }, nameSlot ? getSlotVNs(nameSlot({ option: item, isMoreView, options: fileList })) : fileName),
              isLoading
                ? h('div', {
                  class: 'vxe-upload--file-item-loading-icon'
                }, [
                  h('i', {
                    class: getIcon().UPLOAD_LOADING
                  })
                ])
                : renderEmptyElement($xeUpload),
              showProgress && isLoading && cacheItem
                ? h('div', {
                  class: 'vxe-upload--file-item-loading-text'
                }, progressText ? XEUtils.toFormatString(`${XEUtils.isFunction(progressText) ? progressText({}) : progressText}`, { percent: cacheItem.percent }) : getI18n('vxe.upload.uploadProgress', [cacheItem.percent]))
                : renderEmptyElement($xeUpload),
              !isLoading && ((isError && showErrorStatus) || (isPending && showSubmitButton && !autoSubmit))
                ? h('div', {
                  class: 'vxe-upload--file-item-rebtn'
                }, [
                  h(VxeButtonComponent, {
                    icon: isError ? getIcon().UPLOAD_IMAGE_RE_UPLOAD : getIcon().UPLOAD_IMAGE_UPLOAD,
                    mode: 'text',
                    status: 'primary',
                    content: isError ? getI18n('vxe.upload.reUpload') : getI18n('vxe.upload.manualUpload'),
                    onClick () {
                      handleReUpload(item)
                    }
                  })
                ])
                : renderEmptyElement($xeUpload),
              h('div', {
                class: 'vxe-upload--file-item-btn-wrapper'
              }, actionSlot
                ? getSlotVNs(actionSlot({ option: item, isMoreView, options: fileList, readonly: formReadonly }))
                : [
                    cornerSlot
                      ? h('div', {
                        class: 'vxe-upload--file-item-action'
                      }, getSlotVNs(cornerSlot({ option: item, isMoreView, options: fileList, readonly: formReadonly })))
                      : renderEmptyElement($xeUpload),
                    showDownloadButton && !(isLoading || isPending)
                      ? h('div', {
                        class: 'vxe-upload--file-item-download-btn',
                        onClick (evnt: MouseEvent) {
                          downloadFileEvent(evnt, item)
                        }
                      }, [
                        h('i', {
                          class: getIcon().UPLOAD_FILE_DOWNLOAD
                        })
                      ])
                      : renderEmptyElement($xeUpload),
                    showRemoveButton && !formReadonly && !isDisabled && !isLoading
                      ? h('div', {
                        class: 'vxe-upload--file-item-remove-btn',
                        onClick (evnt: MouseEvent) {
                          removeFileEvent(evnt, item, index)
                        }
                      }, [
                        h('i', {
                          class: getIcon().UPLOAD_FILE_REMOVE
                        })
                      ])
                      : renderEmptyElement($xeUpload)
                  ])
            ])
      })
    }

    const renderFileAction = (isMoreView: boolean) => {
      const { showUploadButton, buttonText, buttonIcon, showButtonText, showButtonIcon, autoHiddenButton } = props
      const { fileList } = reactData
      const isDisabled = computeIsDisabled.value
      const formReadonly = computeFormReadonly.value
      const showTipText = computedShowTipText.value
      const defTipText = computedDefTipText.value
      const overCount = computeOverCount.value
      const defaultSlot = slots.default
      const tipSlot = slots.tip || slots.hint

      if (formReadonly || !showUploadButton) {
        return renderEmptyElement($xeUpload)
      }
      return h('div', {
        class: 'vxe-upload--file-action'
      }, [
        autoHiddenButton && overCount
          ? renderEmptyElement($xeUpload)
          : h('div', {
            class: 'vxe-upload--file-action-btn',
            onClick: clickEvent
          }, defaultSlot
            ? getSlotVNs(defaultSlot({ isMoreView, options: fileList, $upload: $xeUpload }))
            : [
                h(VxeButtonComponent, {
                  class: 'vxe-upload--file-action-button',
                  content: (isMoreView || showButtonText) ? (buttonText ? `${XEUtils.isFunction(buttonText) ? buttonText({}) : buttonText}` : getI18n('vxe.upload.fileBtnText')) : '',
                  icon: showButtonIcon ? (buttonIcon || getIcon().UPLOAD_FILE_ADD) : '',
                  disabled: isDisabled
                })
              ]),
        showTipText && (defTipText || tipSlot)
          ? h('div', {
            class: 'vxe-upload--file-action-tip'
          }, tipSlot ? getSlotVNs(tipSlot({ isMoreView, options: fileList, $upload: $xeUpload })) : `${defTipText}`)
          : renderEmptyElement($xeUpload)
      ])
    }

    const rendeFileMode = () => {
      const { showList, moreConfig, dragSort } = props
      const { fileList, isDragMove } = reactData
      const moreOpts = computeMoreOpts.value
      const { maxCount, showMoreButton, layout, moreButtonText } = moreOpts
      const isHorizontal = layout === 'horizontal'
      const moreBtnSlot = slots.moreButton || slots['more-button']

      let currList = fileList
      let overMaxNum = 0
      let isMoreMax = false
      let isMiniMore = false
      if (XEUtils.isNumber(maxCount) && fileList.length > maxCount) {
        isMoreMax = true
        isMiniMore = maxCount === 0
        overMaxNum = fileList.length - maxCount
        currList = fileList.slice(0, maxCount)
      }

      return h('div', {
        key: 'all',
        class: 'vxe-upload--file-wrapper'
      }, showList
        ? [
            showMoreButton && moreConfig && isHorizontal
              ? renderEmptyElement($xeUpload)
              : renderFileAction(true),
            h('div', {
              class: ['vxe-upload--file-list-wrapper', {
                'is--horizontal': isHorizontal
              }]
            }, [
              currList.length
                ? (
                    dragSort
                      ? h(TransitionGroup, {
                        name: `vxe-upload--drag-list${isDragMove ? '' : '-disabled'}`,
                        tag: 'div',
                        class: 'vxe-upload--file-list'
                      }, {
                        default: () => renderFileItemList(currList, false)
                      })
                      : h('div', {
                        class: 'vxe-upload--file-list'
                      }, renderFileItemList(currList, false))
                  )
                : renderEmptyElement($xeUpload),
              showMoreButton && overMaxNum
                ? h('div', {
                  class: 'vxe-upload--file-over-more'
                }, moreBtnSlot
                  ? getSlotVNs(moreBtnSlot({ options: fileList }))
                  : [
                      h(VxeButtonComponent, {
                        mode: 'text',
                        content: moreButtonText ? (XEUtils.isFunction(moreButtonText) ? moreButtonText({ $upload: $xeUpload, options: fileList }) : XEUtils.toFormatString(moreButtonText, [fileList.length])) : getI18n(isMoreMax && isMiniMore ? 'vxe.upload.moreFileBtnText' : 'vxe.upload.moreBtnText', [fileList.length]),
                        status: 'primary',
                        onClick: handleMoreEvent
                      })
                    ])
                : renderEmptyElement($xeUpload),
              showMoreButton && moreConfig && isHorizontal
                ? renderFileAction(false)
                : renderEmptyElement($xeUpload)
            ])
          ]
        : [
            renderFileAction(false)
          ])
    }

    const renderImageItemList = (currList: VxeUploadDefines.FileObjItem[], isMoreView: boolean) => {
      const { showRemoveButton, showProgress, progressText, showPreview, showErrorStatus, dragSort, autoSubmit, showSubmitButton } = props
      const { fileList, fileCacheMaps } = reactData
      const isDisabled = computeIsDisabled.value
      const formReadonly = computeFormReadonly.value
      const imageOpts = computeImageOpts.value
      const imgStyle = computeImgStyle.value
      const optionSlot = slots.option
      const actionSlot = slots.action
      const cornerSlot = slots.corner

      const ons: Record<string, any> = {
        onMousedown: handleItemMousedownEvent
      }
      if (dragSort && currList.length > 1) {
        ons.onDragstart = handleDragSortDragstartEvent
        ons.onDragover = handleDragSortDragoverEvent
        ons.onDragend = handleDragSortDragendEvent
      }

      return currList.map((item, index) => {
        const fileKey = getFieldKey(item)
        const cacheItem = fileCacheMaps[fileKey]
        let isLoading = false
        let isError = false
        let isPending = false
        if (cacheItem) {
          isLoading = cacheItem.loading
          isError = cacheItem.status === 'error'
          isPending = cacheItem.status === 'pending'
        }
        return h('div', {
          key: dragSort ? fileKey : index,
          class: ['vxe-upload--image-item', {
            'is--preview': showPreview,
            'is--circle': imageOpts.circle,
            'is--loading': isLoading,
            'is--pending': isPending,
            'is--error': isError
          }],
          fileid: fileKey,
          draggable: dragSort ? true : null,
          ...ons
        }, optionSlot
          ? getSlotVNs(optionSlot({ option: item, isMoreView, options: fileList }))
          : [
              h('div', {
                class: 'vxe-upload--image-item-box',
                style: isMoreView ? null : imgStyle,
                onClick (evnt) {
                  if (!isLoading && !isError) {
                    handlePreviewImageEvent(evnt, item, index)
                  }
                }
              }, [
                isLoading && cacheItem
                  ? h('div', {
                    class: 'vxe-upload--image-item-loading'
                  }, [
                    h('div', {
                      class: 'vxe-upload--image-item-loading-icon'
                    }, [
                      h('i', {
                        class: getIcon().UPLOAD_LOADING
                      })
                    ]),
                    showProgress
                      ? h('div', {
                        class: 'vxe-upload--image-item-loading-text'
                      }, progressText ? XEUtils.toFormatString(`${XEUtils.isFunction(progressText) ? progressText({}) : progressText}`, { percent: cacheItem.percent }) : getI18n('vxe.upload.uploadProgress', [cacheItem.percent]))
                      : renderEmptyElement($xeUpload)
                  ])
                  : renderEmptyElement($xeUpload),
                h('div', {
                  class: 'vxe-upload--image-item-img-wrapper',
                  title: getI18n('vxe.upload.viewItemTitle')
                }, [
                  h('img', {
                    class: 'vxe-upload--image-item-img',
                    src: getThumbnailFileUrl(item)
                  })
                ]),
                !isLoading && ((isError && showErrorStatus) || (isPending && showSubmitButton && !autoSubmit))
                  ? h('div', {
                    class: 'vxe-upload--image-item-rebtn'
                  }, [
                    h(VxeButtonComponent, {
                      icon: isError ? getIcon().UPLOAD_IMAGE_RE_UPLOAD : getIcon().UPLOAD_IMAGE_UPLOAD,
                      mode: 'text',
                      status: 'primary',
                      content: isError ? getI18n('vxe.upload.reUpload') : getI18n('vxe.upload.manualUpload'),
                      onClick () {
                        handleReUpload(item)
                      }
                    })
                  ])
                  : renderEmptyElement($xeUpload),
                h('div', {
                  class: 'vxe-upload--image-item-btn-wrapper',
                  onClick (evnt) {
                    evnt.stopPropagation()
                  }
                }, actionSlot
                  ? getSlotVNs(actionSlot({ option: item, isMoreView, options: fileList, readonly: formReadonly }))
                  : [
                      cornerSlot
                        ? h('div', {
                          class: 'vxe-upload--file-item-action'
                        }, getSlotVNs(cornerSlot({ option: item, isMoreView, options: fileList, readonly: formReadonly })))
                        : renderEmptyElement($xeUpload),
                      showRemoveButton && !formReadonly && !isDisabled && !isLoading
                        ? h('div', {
                          class: 'vxe-upload--image-item-remove-btn',
                          onClick (evnt: MouseEvent) {
                            evnt.stopPropagation()
                            removeFileEvent(evnt, item, index)
                          }
                        }, [
                          h('i', {
                            class: getIcon().UPLOAD_IMAGE_REMOVE
                          })
                        ])
                        : renderEmptyElement($xeUpload)
                    ])
              ])
            ])
      })
    }

    const renderImageAction = (isMoreView: boolean) => {
      const { showUploadButton, buttonText, buttonIcon, showButtonText, showButtonIcon, autoHiddenButton } = props
      const { fileList } = reactData
      const formReadonly = computeFormReadonly.value
      const showTipText = computedShowTipText.value
      const defTipText = computedDefTipText.value
      const overCount = computeOverCount.value
      const imgStyle = computeImgStyle.value
      const defaultSlot = slots.default
      const tipSlot = slots.tip || slots.hint

      if (formReadonly || !showUploadButton || (autoHiddenButton && overCount)) {
        return renderEmptyElement($xeUpload)
      }
      return h('div', {
        key: 'action',
        class: 'vxe-upload--image-action'
      }, [
        h('div', {
          class: 'vxe-upload--image-action-btn',
          onClick: clickEvent
        }, defaultSlot
          ? defaultSlot({ isMoreView, options: fileList, $upload: $xeUpload })
          : [
              h('div', {
                class: 'vxe-upload--image-action-box',
                style: isMoreView ? null : imgStyle
              }, [
                showButtonIcon
                  ? h('div', {
                    class: 'vxe-upload--image-action-icon'
                  }, [
                    h('i', {
                      class: buttonIcon || getIcon().UPLOAD_IMAGE_ADD
                    })
                  ])
                  : renderEmptyElement($xeUpload),
                isMoreView || showButtonText
                  ? h('div', {
                    class: 'vxe-upload--image-action-content'
                  }, buttonText ? `${XEUtils.isFunction(buttonText) ? buttonText({}) : buttonText}` : getI18n('vxe.upload.imgBtnText'))
                  : renderEmptyElement($xeUpload),
                showTipText && (defTipText || tipSlot)
                  ? h('div', {
                    class: 'vxe-upload--image-action-hint'
                  }, tipSlot ? getSlotVNs(tipSlot({ isMoreView, options: fileList, $upload: $xeUpload })) : `${defTipText}`)
                  : renderEmptyElement($xeUpload)
              ])
            ])
      ])
    }

    const renderImageMode = () => {
      const { showList, dragSort } = props
      const { fileList, isDragMove } = reactData
      const moreOpts = computeMoreOpts.value
      const moreBtnSlot = slots.moreButton || slots['more-button']

      const { maxCount, showMoreButton, moreButtonText } = moreOpts
      let currList = fileList
      let overMaxNum = 0
      let isMoreMax = false
      let isMiniMore = false
      if (XEUtils.isNumber(maxCount) && fileList.length > maxCount) {
        isMoreMax = true
        isMiniMore = maxCount === 0
        overMaxNum = fileList.length - maxCount
        currList = fileList.slice(0, maxCount)
      }

      return h('div', {
        key: 'image',
        class: 'vxe-upload--image-wrapper'
      }, showList
        ? [
            dragSort
              ? h(TransitionGroup, {
                name: `vxe-upload--drag-list${isDragMove ? '' : '-disabled'}`,
                tag: 'div',
                class: 'vxe-upload--image-list'
              }, {
                default: () => renderImageItemList(currList, false).concat([
                  showMoreButton && overMaxNum
                    ? h('div', {
                      key: 'om',
                      class: 'vxe-upload--image-over-more'
                    }, moreBtnSlot
                      ? getSlotVNs(moreBtnSlot({ options: fileList }))
                      : [
                          h(VxeButtonComponent, {
                            mode: 'text',
                            content: moreButtonText ? (XEUtils.isFunction(moreButtonText) ? moreButtonText({ $upload: $xeUpload, options: fileList }) : XEUtils.toFormatString(moreButtonText, [fileList.length])) : getI18n(isMoreMax && isMiniMore ? 'vxe.upload.moreImgBtnText' : 'vxe.upload.moreBtnText', [fileList.length]),
                            status: 'primary',
                            onClick: handleMoreEvent
                          })
                        ])
                    : renderEmptyElement($xeUpload),
                  renderImageAction(false)
                ])
              })
              : h('div', {
                class: 'vxe-upload--image-list'
              }, renderImageItemList(currList, false).concat([
                showMoreButton && overMaxNum
                  ? h('div', {
                    class: 'vxe-upload--image-over-more'
                  }, moreBtnSlot
                    ? getSlotVNs(moreBtnSlot({ options: fileList }))
                    : [
                        h(VxeButtonComponent, {
                          mode: 'text',
                          content: moreButtonText ? (XEUtils.isFunction(moreButtonText) ? moreButtonText({ $upload: $xeUpload, options: fileList }) : XEUtils.toFormatString(moreButtonText, [fileList.length])) : getI18n(isMoreMax && isMiniMore ? 'vxe.upload.moreImgBtnText' : 'vxe.upload.moreBtnText', [fileList.length]),
                          status: 'primary',
                          onClick: handleMoreEvent
                        })
                      ])
                  : renderEmptyElement($xeUpload),
                renderImageAction(false)
              ]))
          ]
        : [
            h('div', {
              class: 'vxe-upload--image-list'
            }, [
              renderImageAction(false)
            ])
          ])
    }

    const renderVN = () => {
      const { showErrorStatus, dragToUpload, pasteToUpload, dragSort, dragPlaceholder } = props
      const { isDragUploadStatus, showMorePopup, isActivated, dragIndex } = reactData
      const vSize = computeSize.value
      const isDisabled = computeIsDisabled.value
      const formReadonly = computeFormReadonly.value
      const isImage = computeIsImage.value

      const ons: Record<string, any> = {
        onMousedown: handleItemMousedownEvent
      }
      if (dragToUpload && dragIndex === -1) {
        ons.onDragover = handleUploadDragoverEvent
        ons.onDragleave = handleUploadDragleaveEvent
        ons.onDrop = handleUploadDropEvent
      }

      return h('div', {
        ref: refElem,
        class: ['vxe-upload', {
          [`size--${vSize}`]: vSize,
          'is--active': isActivated,
          'is--readonly': formReadonly,
          'is--disabled': isDisabled,
          'is--paste': pasteToUpload,
          'show--error': showErrorStatus,
          'is--drag': isDragUploadStatus
        }],
        ...ons
      }, [
        isImage ? renderImageMode() : rendeFileMode(),
        dragSort
          ? h('div', {
            ref: refDragLineElem,
            class: 'vxe-upload--drag-line'
          })
          : renderEmptyElement($xeUpload),
        isDragUploadStatus && !showMorePopup
          ? h('div', {
            class: 'vxe-upload--drag-placeholder'
          }, dragPlaceholder || getI18n('vxe.upload.dragPlaceholder'))
          : renderEmptyElement($xeUpload)
      ])
    }

    const listFlag = ref(0)
    watch(() => props.modelValue ? props.modelValue.length : 0, () => {
      listFlag.value++
    })
    watch(() => props.modelValue, () => {
      listFlag.value++
    })
    watch(listFlag, () => {
      updateFileList()
    })

    onMounted(() => {
      if (props.multiple && props.singleMode) {
        errLog('vxe.error.errConflicts', ['[upload] multiple', 'single-mode'])
      }
      if (props.imageStyle) {
        warnLog('vxe.error.delProp', ['[upload] image-style', 'image-config'])
      }

      if (props.dragSort) {
        initTpImg()
      }
      globalEvents.on($xeUpload, 'paste', handleGlobalPasteEvent)
      globalEvents.on($xeUpload, 'mousedown', handleGlobalMousedownEvent)
      globalEvents.on($xeUpload, 'blur', handleGlobalBlurEvent)
    })

    onBeforeUnmount(() => {
      reactData.isDragUploadStatus = false
      globalEvents.off($xeUpload, 'paste')
      globalEvents.off($xeUpload, 'mousedown')
      globalEvents.off($xeUpload, 'blur')
      XEUtils.assign(reactData, createReactData())
      XEUtils.assign(internalData, createInternalData())
    })

    updateFileList()

    $xeUpload.renderVN = renderVN

    return $xeUpload
  },
  render () {
    return this.renderVN()
  }
})
