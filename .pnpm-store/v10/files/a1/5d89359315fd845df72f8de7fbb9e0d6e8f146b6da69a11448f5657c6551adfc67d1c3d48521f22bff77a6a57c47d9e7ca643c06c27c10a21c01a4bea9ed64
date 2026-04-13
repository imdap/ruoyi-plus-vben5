import { computed, h, provide, PropType } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { getConfig, createEvent, useSize } from '@vxe-ui/core'
import { openPreviewImage } from './util'
import XEUtils from 'xe-utils'
import VxeImageComponent from './image'

import type { VxeImageGroupPropTypes, VxeImageGroupEmits, VxeImageGroupConstructor, VxeImageGroupPrivateMethods, ImageGroupMethods, ButtonPrivateComputed, ImageGroupPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeImageGroup',
  props: {
    urlList: [Array, String] as PropType<VxeImageGroupPropTypes.UrlList>,
    showPreview: {
      type: Boolean as PropType<VxeImageGroupPropTypes.ShowPreview>,
      default: () => getConfig().imageGroup.showPreview
    },
    imageStyle: Object as PropType<VxeImageGroupPropTypes.ImageStyle>,
    zIndex: Number as PropType<VxeImageGroupPropTypes.ZIndex>,
    size: {
      type: String as PropType<VxeImageGroupPropTypes.Size>,
      default: () => getConfig().imageGroup.size || getConfig().size
    },
    toolbarConfig: Object as PropType<VxeImageGroupPropTypes.ToolbarConfig>,
    showPrintButton: {
      type: Boolean as PropType<VxeImageGroupPropTypes.ShowPrintButton>,
      default: () => getConfig().imageGroup.showPrintButton
    },
    showDownloadButton: {
      type: Boolean as PropType<VxeImageGroupPropTypes.ShowDownloadButton>,
      default: () => getConfig().imageGroup.showDownloadButton
    },
    getThumbnailUrlMethod: Function as PropType<VxeImageGroupPropTypes.GetThumbnailUrlMethod>
  },
  emits: [
    'click',
    'change',
    'rotate'
  ] as VxeImageGroupEmits,
  setup (props, context) {
    const { emit } = context

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const computeImgList = computed(() => {
      const { urlList } = props
      if (urlList) {
        return (XEUtils.isArray(urlList) ? urlList : [urlList]).map(item => {
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

    const computeImgStyleOpts = computed(() => {
      return Object.assign({}, getConfig().imageGroup.imageStyle, props.imageStyle)
    })

    const computeGetThumbnailUrlMethod = computed(() => {
      return props.getThumbnailUrlMethod || getConfig().imageGroup.getThumbnailUrlMethod
    })

    const computeMaps: ButtonPrivateComputed = {
      computeSize
    }

    const $xeImageGroup = {
      xID,
      props,
      context,

      getComputeMaps: () => computeMaps
    } as unknown as VxeImageGroupConstructor & VxeImageGroupPrivateMethods

    const imageGroupMethods: ImageGroupMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, createEvent(evnt, { $imageGroup: $xeImageGroup }, params))
      }
    }

    const imageGroupPrivateMethods: ImageGroupPrivateMethods = {
      handleClickImgEvent (evnt, params) {
        const { showPreview, toolbarConfig, showPrintButton, showDownloadButton, zIndex } = props
        const { url } = params
        const imgList = computeImgList.value
        if (showPreview && url) {
          openPreviewImage({
            activeIndex: Math.max(0, XEUtils.findIndexOf(imgList, item => item.url === url)),
            urlList: imgList,
            toolbarConfig,
            showPrintButton,
            showDownloadButton,
            zIndex,
            events: {
              change (eventParams) {
                $xeImageGroup.dispatchEvent('change', eventParams, eventParams.$event)
              },
              rotate (eventParams) {
                $xeImageGroup.dispatchEvent('rotate', eventParams, eventParams.$event)
              }
            }
          })
        }
        $xeImageGroup.dispatchEvent('click', { url, urlList: imgList }, evnt)
      }
    }

    Object.assign($xeImageGroup, imageGroupMethods, imageGroupPrivateMethods)

    const renderVN = () => {
      const imgList = computeImgList.value
      const vSize = computeSize.value
      const imgStyleOpts = computeImgStyleOpts.value
      const getThumbnailUrlMethod = computeGetThumbnailUrlMethod.value
      return h('div', {
        class: ['vxe-image-group', {
          [`size--${vSize}`]: vSize
        }]
      }, imgList
        ? imgList.map((item, index) => {
          return h(VxeImageComponent, {
            key: index,
            src: item.url,
            alt: item.alt,
            width: imgStyleOpts.width,
            height: imgStyleOpts.height,
            getThumbnailUrlMethod
          })
        })
        : [])
    }

    $xeImageGroup.renderVN = renderVN

    provide('$xeImageGroup', $xeImageGroup)

    return $xeImageGroup
  },
  render () {
    return this.renderVN()
  }
})
