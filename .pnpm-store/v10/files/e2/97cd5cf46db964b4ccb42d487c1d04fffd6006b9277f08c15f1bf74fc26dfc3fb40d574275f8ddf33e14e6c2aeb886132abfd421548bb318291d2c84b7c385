import { ref, h, reactive, PropType } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { getConfig, useSize, createEvent } from '../../ui'
import XEUtils from 'xe-utils'

import type { VxeLayoutContainerPropTypes, LayoutContainerReactData, LayoutContainerPrivateMethods, VxeLayoutContainerEmits, LayoutContainerMethods, LayoutContainerPrivateRef, VxeLayoutContainerPrivateComputed, VxeLayoutContainerConstructor, VxeLayoutContainerPrivateMethods, ValueOf } from '../../../types'

export default defineVxeComponent({
  name: 'VxeLayoutContainer',
  props: {
    vertical: Boolean as PropType<VxeLayoutContainerPropTypes.Vertical>,
    size: {
      type: String as PropType<VxeLayoutContainerPropTypes.Size>,
      default: () => getConfig().layoutContainer.size || getConfig().size
    }
  },
  emits: [] as VxeLayoutContainerEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()

    const { computeSize } = useSize(props)

    const reactData = reactive<LayoutContainerReactData>({
    })

    const refMaps: LayoutContainerPrivateRef = {
      refElem
    }

    const computeMaps: VxeLayoutContainerPrivateComputed = {
      computeSize
    }

    const $xeLayoutContainer = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeLayoutContainerConstructor & VxeLayoutContainerPrivateMethods

    const dispatchEvent = (type: ValueOf<VxeLayoutContainerEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $layoutContainer: $xeLayoutContainer }, params))
    }

    const layoutContainerMethods: LayoutContainerMethods = {
      dispatchEvent
    }

    const layoutContainerPrivateMethods: LayoutContainerPrivateMethods = {
    }

    Object.assign($xeLayoutContainer, layoutContainerMethods, layoutContainerPrivateMethods)

    const renderVN = () => {
      const { vertical } = props
      const vSize = computeSize.value
      const defaultSlot = slots.default

      return h('div', {
        ref: refElem,
        class: ['vxe-layout-container', {
          [`size--${vSize}`]: vSize,
          'is--vertical': vertical
        }]
      }, defaultSlot ? defaultSlot({}) : [])
    }

    $xeLayoutContainer.renderVN = renderVN

    return $xeLayoutContainer
  },
  render () {
    return this.renderVN()
  }
})
