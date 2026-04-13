import { ref, h, inject, reactive, PropType, computed, onBeforeUnmount } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { getConfig, createEvent, useSize } from '../../ui'
import XEUtils from 'xe-utils'
import { toCssUnit } from '../../ui/src/dom'
import { openPreviewImage } from './util'

import type { VxeImagePropTypes, ImageReactData, ImageInternalData, VxeImageEmits, ImagePrivateRef, VxeImagePrivateComputed, VxeImageConstructor, VxeImagePrivateMethods, ImageMethods, ImagePrivateMethods, VxeImageGroupConstructor, VxeImageGroupPrivateMethods, ValueOf } from '../../../types'

function createInternalData (): ImageInternalData {
  return {
    // dgTime: 0,
    // mdTime: 0
  }
}

function createReactData (): ImageReactData {
  return {
  }
}

export default defineVxeComponent({
  name: 'VxeImage',
  props: {
    src: [String, Array] as PropType<VxeImagePropTypes.Src>,
    alt: [String, Number] as PropType<VxeImagePropTypes.Alt>,
    loading: String as PropType<VxeImagePropTypes.Loading>,
    title: [String, Number] as PropType<VxeImagePropTypes.Title>,
    width: [String, Number] as PropType<VxeImagePropTypes.Width>,
    height: [String, Number] as PropType<VxeImagePropTypes.Height>,
    circle: Boolean as PropType<VxeImagePropTypes.Circle>,
    draggable: {
      type: Boolean as PropType<VxeImagePropTypes.Draggable>,
      default: () => getConfig().image.draggable
    },
    zIndex: Number as PropType<VxeImagePropTypes.ZIndex>,
    maskClosable: {
      type: Boolean as PropType<VxeImagePropTypes.MaskClosable>,
      default: () => getConfig().image.maskClosable
    },
    toolbarConfig: Object as PropType<VxeImagePropTypes.ToolbarConfig>,
    showPreview: {
      type: Boolean as PropType<VxeImagePropTypes.ShowPreview>,
      default: () => getConfig().image.showPreview
    },
    showPrintButton: {
      type: Boolean as PropType<VxeImagePropTypes.ShowPrintButton>,
      default: () => getConfig().image.showPrintButton
    },
    showDownloadButton: {
      type: Boolean as PropType<VxeImagePropTypes.ShowDownloadButton>,
      default: () => getConfig().image.showDownloadButton
    },
    size: {
      type: String as PropType<VxeImagePropTypes.Size>,
      default: () => getConfig().image.size || getConfig().size
    },
    getThumbnailUrlMethod: Function as PropType<VxeImagePropTypes.GetThumbnailUrlMethod>
  },
  emits: [
    'click',
    'change',
    'rotate',
    'dragstart',
    'drag',
    'dragend'
  ] as VxeImageEmits,
  setup (props, context) {
    const { emit } = context

    const xID = XEUtils.uniqueId()

    const $xeImageGroup = inject<(VxeImageGroupConstructor & VxeImageGroupPrivateMethods) | null>('$xeImageGroup', null)

    const refElem = ref<HTMLDivElement>()

    const { computeSize } = useSize(props)

    const internalData = createInternalData()
    const reactData = reactive(createReactData())

    const refMaps: ImagePrivateRef = {
      refElem
    }

    const computeWrapperStyle = computed(() => {
      const { width, height, circle } = props
      const stys: Record<string, string> = {}
      if (width) {
        stys.width = toCssUnit(width)
      } else {
        if (circle) {
          if (height) {
            stys.width = toCssUnit(height)
          }
        }
      }
      if (height) {
        stys.height = toCssUnit(height)
      } else {
        if (circle) {
          if (width) {
            stys.height = toCssUnit(width)
          }
        }
      }
      return stys
    })

    const computeImgStyle = computed(() => {
      const { width, height } = props
      const stys: Record<string, string> = {}
      if (width && height) {
        stys.maxWidth = toCssUnit(width)
        stys.maxHeight = toCssUnit(height)
      } else {
        if (width) {
          stys.width = toCssUnit(width)
        }
        if (height) {
          stys.height = toCssUnit(height)
        }
      }
      return stys
    })

    const computeImgList = computed(() => {
      const { src } = props
      if (src) {
        return (XEUtils.isArray(src) ? src : [src]).map(item => {
          if (XEUtils.isString(item)) {
            return {
              url: item,
              alt: ''
            }
          }
          return {
            url: item.url,
            alt: item.alt
          }
        })
      }
      return []
    })

    const computeImgItem = computed(() => {
      const imgList = computeImgList.value
      return imgList[0]
    })

    const computeImgUrl = computed(() => {
      const imgItem = computeImgItem.value
      return imgItem ? `${imgItem.url || ''}` : ''
    })

    const computeImgThumbnailUrl = computed(() => {
      const getThumbnailUrlFn = props.getThumbnailUrlMethod || getConfig().image.getThumbnailUrlMethod
      const imgUrl = computeImgUrl.value
      return getThumbnailUrlFn ? getThumbnailUrlFn({ url: imgUrl, $image: $xeImage }) : ''
    })

    const computeMaps: VxeImagePrivateComputed = {
      computeSize
    }

    const $xeImage = {
      xID,
      props,
      context,
      reactData,
      internalData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeImageConstructor & VxeImagePrivateMethods

    const dispatchEvent = (type: ValueOf<VxeImageEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $image: $xeImage }, params))
    }

    const imageMethods: ImageMethods = {
      dispatchEvent
    }

    const clickEvent = (evnt: MouseEvent) => {
      const { showPreview, toolbarConfig, showPrintButton, showDownloadButton, maskClosable, zIndex } = props
      const { mdTime, dgTime } = internalData
      if (mdTime && dgTime && dgTime > mdTime) {
        return
      }
      const imgList = computeImgList.value
      const imgUrl = computeImgUrl.value
      if ($xeImageGroup) {
        $xeImageGroup.handleClickImgEvent(evnt, { url: imgUrl })
      } else {
        if (showPreview && imgUrl) {
          openPreviewImage({
            urlList: imgList,
            toolbarConfig,
            showPrintButton,
            showDownloadButton,
            maskClosable,
            zIndex,
            events: {
              change (eventParams) {
                dispatchEvent('change', eventParams, eventParams.$event)
              },
              rotate (eventParams) {
                dispatchEvent('rotate', eventParams, eventParams.$event)
              }
            }
          })
        }
        dispatchEvent('click', { url: imgUrl }, evnt)
      }
    }

    const mousedownEvent = () => {
      internalData.mdTime = Date.now()
    }

    const handleDragstartEvent = (evnt: DragEvent) => {
      internalData.dgTime = Date.now()
      dispatchEvent('dragstart', {}, evnt)
    }

    const handleDragEvent = (evnt: DragEvent) => {
      dispatchEvent(evnt.type as 'dragstart' | 'drag' | 'dragend', {}, evnt)
    }

    const imagePrivateMethods: ImagePrivateMethods = {
    }

    Object.assign($xeImage, imageMethods, imagePrivateMethods)

    const renderVN = () => {
      const { alt, loading, circle, draggable } = props
      const wrapperStyle = computeWrapperStyle.value
      const imgStyle = computeImgStyle.value
      const imgUrl = computeImgUrl.value
      const imgThumbnailUrl = computeImgThumbnailUrl.value
      const vSize = computeSize.value
      let imgDrag
      if (!XEUtils.eqNull(draggable)) {
        imgDrag = !!(draggable === true || draggable === 'true')
      }
      return h('div', {
        class: ['vxe-image', {
          [`size--${vSize}`]: vSize,
          'is--circle': circle
        }],
        style: wrapperStyle
      }, [
        h('img', {
          ref: refElem,
          class: 'vxe-image-img',
          src: imgThumbnailUrl || imgUrl,
          alt,
          loading,
          draggable: imgDrag,
          style: imgStyle,
          onMousedown: mousedownEvent,
          onClick: clickEvent,
          onDragstart: handleDragstartEvent,
          onDrag: handleDragEvent,
          onDragend: handleDragEvent
        })
      ])
    }

    onBeforeUnmount(() => {
      XEUtils.assign(reactData, createReactData())
      XEUtils.assign(internalData, createInternalData())
    })

    $xeImage.renderVN = renderVN

    return $xeImage
  },
  render () {
    return this.renderVN()
  }
})
