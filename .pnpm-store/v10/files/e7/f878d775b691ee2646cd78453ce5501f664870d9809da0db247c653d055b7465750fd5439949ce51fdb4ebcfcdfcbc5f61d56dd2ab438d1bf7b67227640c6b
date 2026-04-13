import { ref, h, reactive, PropType } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { createEvent } from '../../ui'
import XEUtils from 'xe-utils'

import type { VxeLayoutFooterPropTypes, LayoutFooterReactData, LayoutFooterPrivateMethods, LayoutFooterMethods, VxeLayoutFooterEmits, LayoutFooterPrivateRef, VxeLayoutFooterPrivateComputed, VxeLayoutFooterConstructor, ValueOf, VxeLayoutFooterPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeLayoutFooter',
  props: {
    fixed: Boolean as PropType<VxeLayoutFooterPropTypes.Fixed>,
    align: String as PropType<VxeLayoutFooterPropTypes.Align>
  },
  emits: [] as VxeLayoutFooterEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()

    const reactData = reactive<LayoutFooterReactData>({
    })

    const refMaps: LayoutFooterPrivateRef = {
      refElem
    }

    const computeMaps: VxeLayoutFooterPrivateComputed = {
    }

    const $xeLayoutFooter = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeLayoutFooterConstructor & VxeLayoutFooterPrivateMethods

    const dispatchEvent = (type: ValueOf<VxeLayoutFooterEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $layoutFooter: $xeLayoutFooter }, params))
    }

    const layoutFooterMethods: LayoutFooterMethods = {
      dispatchEvent
    }

    const layoutFooterPrivateMethods: LayoutFooterPrivateMethods = {
    }

    Object.assign($xeLayoutFooter, layoutFooterMethods, layoutFooterPrivateMethods)

    const renderVN = () => {
      const { fixed, align } = props
      const defaultSlot = slots.default

      return h('footer', {
        ref: refElem,
        class: ['vxe-layout-footer', align ? `align--${align}` : '', {
          'is--fixed': fixed
        }]
      }, defaultSlot ? defaultSlot({}) : [])
    }

    $xeLayoutFooter.renderVN = renderVN

    return $xeLayoutFooter
  },
  render () {
    return this.renderVN()
  }
})
