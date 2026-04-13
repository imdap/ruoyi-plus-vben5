import { ref, h, reactive, computed, onMounted, watch, PropType, onUnmounted } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, createEvent, globalEvents } from '../../ui'
import { toCssUnit } from '../../ui/src/dom'
import { getContentUrl } from './util'

import type { WatermarkReactData, VxeWatermarkEmits, WatermarkMethods, VxeWatermarkPropTypes, WatermarkPrivateMethods, ValueOf, VxeComponentStyleType, WatermarkPrivateRef, VxeWatermarkPrivateComputed, VxeWatermarkConstructor, VxeWatermarkPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeWatermark',
  props: {
    width: String as PropType<VxeWatermarkPropTypes.Width>,
    height: String as PropType<VxeWatermarkPropTypes.Height>,
    imageUrl: String as PropType<VxeWatermarkPropTypes.ImageUrl>,
    rotate: {
      type: [Number, String] as PropType<VxeWatermarkPropTypes.Rotate>,
      default: () => getConfig().watermark.rotate
    },
    gap: {
      type: [Array, Number, String] as PropType<VxeWatermarkPropTypes.Gap>,
      default: () => XEUtils.clone(getConfig().watermark.gap, true)
    },
    content: [String, Array] as PropType<VxeWatermarkPropTypes.Content>,
    font: Object as PropType<VxeWatermarkPropTypes.Font>,
    offset: Object as PropType<VxeWatermarkPropTypes.Offset>,
    zIndex: [String, Number] as PropType<VxeWatermarkPropTypes.ZIndex>
  },
  emits: [
  ] as VxeWatermarkEmits,
  setup (props, context) {
    const { emit } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()

    const reactData = reactive<WatermarkReactData>({
      markUrl: ''
    })

    const refMaps: WatermarkPrivateRef = {
      refElem
    }

    const computeFontOpts = computed(() => {
      return XEUtils.assign({}, XEUtils.clone(getConfig().watermark.font, true), props.font)
    })

    const computeWrapperStyle = computed(() => {
      const { width, height, zIndex } = props
      const { markUrl } = reactData
      const stys: VxeComponentStyleType = {}
      if (width) {
        stys.width = toCssUnit(width)
      }
      if (height) {
        stys.height = toCssUnit(height)
      }
      if (markUrl) {
        stys.backgroundImage = `url(${markUrl})`
      }
      if (zIndex) {
        stys.zIndex = zIndex
      }
      return stys
    })

    const computeMaps: VxeWatermarkPrivateComputed = {
    }

    const $xeWatermark = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeWatermarkConstructor & VxeWatermarkPrivateMethods

    const dispatchEvent = (type: ValueOf<VxeWatermarkEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $watermark: $xeWatermark }, params))
    }

    const collapsePaneMethods: WatermarkMethods = {
      dispatchEvent
    }

    const updateMarkStyle = () => {
      const { content, gap, rotate, offset } = props
      const el = refElem.value
      const fontOpts = computeFontOpts.value
      if (el) {
        if (content) {
          getContentUrl(content, getComputedStyle(el).fontSize, {
            font: fontOpts,
            rotate,
            gap,
            offset
          }).then(url => {
            reactData.markUrl = url
          })
        }
      }
    }

    const collapsePanePrivateMethods: WatermarkPrivateMethods = {
    }

    Object.assign($xeWatermark, collapsePaneMethods, collapsePanePrivateMethods)

    const renderVN = () => {
      const wrapperStyle = computeWrapperStyle.value
      return h('div', {
        ref: refElem,
        class: 'vxe-watermark',
        style: wrapperStyle
      })
    }

    watch(() => props.imageUrl, () => {
      updateMarkStyle()
    })

    watch(() => props.content, () => {
      updateMarkStyle()
    })

    watch(() => props.gap, () => {
      updateMarkStyle()
    })

    watch(() => props.rotate, () => {
      updateMarkStyle()
    })

    watch(() => props.width, () => {
      updateMarkStyle()
    })

    watch(() => props.height, () => {
      updateMarkStyle()
    })

    watch(() => props.font, () => {
      updateMarkStyle()
    })

    onMounted(() => {
      updateMarkStyle()
      globalEvents.on($xeWatermark, 'resize', XEUtils.throttle(() => {
        updateMarkStyle()
      }, 300, { trailing: true, leading: true }))
    })

    onUnmounted(() => {
      globalEvents.off($xeWatermark, 'resize')
    })

    $xeWatermark.renderVN = renderVN

    return $xeWatermark
  },
  render () {
    return this.renderVN()
  }
})
