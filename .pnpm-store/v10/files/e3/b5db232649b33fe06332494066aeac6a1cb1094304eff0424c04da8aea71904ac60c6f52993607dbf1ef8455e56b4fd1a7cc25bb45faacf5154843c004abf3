import { ref, h, reactive, PropType, computed } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { getConfig, useSize, createEvent, renderEmptyElement } from '../../ui'
import VxeLoadingComponent from '../../loading'
import VxeUIBacktopComponent from '../../backtop'
import XEUtils from 'xe-utils'

import type { LayoutBodyInternalData, VxeLayoutBodyPropTypes, LayoutBodyReactData, LayoutBodyPrivateRef, VxeLayoutBodyEmits, LayoutBodyMethods, LayoutBodyPrivateMethods, VxeLayoutBodyPrivateComputed, VxeLayoutBodyConstructor, VxeLayoutBodyPrivateMethods, ValueOf } from '../../../types'

function createInternalData (): LayoutBodyInternalData {
  return {}
}

function createReactData (): LayoutBodyReactData {
  return {}
}

export default defineVxeComponent({
  name: 'VxeLayoutBody',
  props: {
    loading: Boolean as PropType<VxeLayoutBodyPropTypes.Loading>,
    padding: Boolean as PropType<VxeLayoutBodyPropTypes.Padding>,
    showBacktop: {
      type: Boolean as PropType<VxeLayoutBodyPropTypes.ShowBacktop>,
      default: () => getConfig().layoutBody.showBacktop
    },
    backtopConfig: Object as PropType<VxeLayoutBodyPropTypes.BacktopConfig>,
    size: {
      type: String as PropType<VxeLayoutBodyPropTypes.Size>,
      default: () => getConfig().layoutBody.size || getConfig().size
    }
  },
  emits: [],
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()
    const backtopId = `vxe_layout_body_backtop_${xID}`

    const refElem = ref<HTMLDivElement>()

    const { computeSize } = useSize(props)

    const internalData = createInternalData()
    const reactData = reactive(createReactData())

    const refMaps: LayoutBodyPrivateRef = {
      refElem
    }

    const computeBacktopOpts = computed(() => {
      return Object.assign({}, getConfig().layoutBody.backtopConfig, props.backtopConfig, {
        target: '#' + backtopId
      })
    })

    const computeMaps: VxeLayoutBodyPrivateComputed = {
      computeSize
    }

    const $xeLayoutBody = {
      xID,
      props,
      context,
      internalData,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeLayoutBodyConstructor & VxeLayoutBodyPrivateMethods

    const dispatchEvent = (type: ValueOf<VxeLayoutBodyEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $layoutBody: $xeLayoutBody }, params))
    }

    const layoutBodyMethods: LayoutBodyMethods = {
      dispatchEvent
    }

    const layoutBodyPrivateMethods: LayoutBodyPrivateMethods = {
    }

    Object.assign($xeLayoutBody, layoutBodyMethods, layoutBodyPrivateMethods)

    const renderVN = () => {
      const { loading, padding, showBacktop } = props
      const backtopOpts = computeBacktopOpts.value
      const vSize = computeSize.value
      const defaultSlot = slots.default
      const backtopSlot = slots.backtop
      const backtopTopSlot = slots.backtopTop || slots['backtop-top']
      const backtopBottomSlot = slots.backtopBottom || slots['backtop-bottom']
      const backtopScopeSlots: {
        default?: any
        top?: any
        bottom?: any
      } = {}
      if (backtopSlot) {
        backtopScopeSlots.default = backtopSlot
      }
      if (backtopTopSlot) {
        backtopScopeSlots.top = backtopTopSlot
      }
      if (backtopBottomSlot) {
        backtopScopeSlots.bottom = backtopBottomSlot
      }
      return h('div', {
        ref: refElem,
        class: ['vxe-layout-body', {
          [`size--${vSize}`]: vSize,
          'is--loading': loading,
          'is--padding': padding
        }]
      }, [
        h('div', {
          id: showBacktop ? backtopId : '',
          class: 'vxe-layout-body--inner'
        }, defaultSlot ? defaultSlot({}) : []),
        /**
         * 加载中
         */
        h(VxeLoadingComponent, {
          class: 'vxe-list-view--loading',
          modelValue: loading
        }),
        /**
         * 回到顶部
         */
        showBacktop
          ? h(VxeUIBacktopComponent, backtopOpts, backtopScopeSlots)
          : renderEmptyElement($xeLayoutBody)
      ])
    }

    $xeLayoutBody.renderVN = renderVN

    return $xeLayoutBody
  },
  render () {
    return this.renderVN()
  }
})
