import { ref, h, reactive, PropType } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { createEvent } from '../../ui'
import XEUtils from 'xe-utils'

import type { VxeLayoutHeaderPropTypes, LayoutHeaderReactData, LayoutHeaderMethods, LayoutHeaderPrivateMethods, VxeLayoutHeaderEmits, LayoutHeaderPrivateRef, VxeLayoutHeaderPrivateComputed, VxeLayoutHeaderConstructor, VxeLayoutHeaderPrivateMethods, ValueOf } from '../../../types'

export default defineVxeComponent({
  name: 'VxeLayoutHeader',
  props: {
    fixed: Boolean as PropType<VxeLayoutHeaderPropTypes.Fixed>
  },
  emits: [] as VxeLayoutHeaderEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()

    const reactData = reactive<LayoutHeaderReactData>({
    })

    const refMaps: LayoutHeaderPrivateRef = {
      refElem
    }

    const computeMaps: VxeLayoutHeaderPrivateComputed = {
    }

    const $xeLayoutHeader = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeLayoutHeaderConstructor & VxeLayoutHeaderPrivateMethods

    const dispatchEvent = (type: ValueOf<VxeLayoutHeaderEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $layoutHeader: $xeLayoutHeader }, params))
    }

    const layoutHeaderMethods: LayoutHeaderMethods = {
      dispatchEvent
    }

    const layoutHeaderPrivateMethods: LayoutHeaderPrivateMethods = {
    }

    Object.assign($xeLayoutHeader, layoutHeaderMethods, layoutHeaderPrivateMethods)

    const renderVN = () => {
      const { fixed } = props
      const defaultSlot = slots.default

      return h('header', {
        ref: refElem,
        class: ['vxe-layout-header', {
          'is--fixed': fixed
        }]
      }, defaultSlot ? defaultSlot({}) : [])
    }

    $xeLayoutHeader.renderVN = renderVN

    return $xeLayoutHeader
  },
  render () {
    return this.renderVN()
  }
})
