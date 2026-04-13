import { ref, h, reactive, inject, onMounted, onUnmounted, createCommentVNode } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { createEvent } from '../../ui'
import { assemblePageBreak, destroyPageBreak } from './util'

import type { PrintPageBreakReactData, PrintPageBreakPrivateRef, ValueOf, PrintPageBreakPrivateMethods, PrintPageBreakMethods, VxePrintPageBreakEmits, VxePrintDefines, VxePrintPageBreakPrivateComputed, VxePrintConstructor, VxePrintPrivateMethods, VxePrintPageBreakConstructor, VxePrintPageBreakPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxePrintPageBreak',
  props: {},
  emits: [] as VxePrintPageBreakEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()
    const $xePrint = inject<(VxePrintConstructor & VxePrintPrivateMethods) | null>('$xePrint', null)

    const refElem = ref<HTMLDivElement>()

    const reactData = reactive<PrintPageBreakReactData>({
    })

    const refMaps: PrintPageBreakPrivateRef = {
      refElem
    }

    const computeMaps: VxePrintPageBreakPrivateComputed = {
    }

    const pageBreakConfig = reactive<VxePrintDefines.PageBreakConfig>({
      id: xID,
      slots
    })

    const $xePrintPageBreak = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxePrintPageBreakConstructor & VxePrintPageBreakPrivateMethods

    const dispatchEvent = (type: ValueOf<VxePrintPageBreakEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $print: $xePrint }, params))
    }

    const printPageBreakMethods: PrintPageBreakMethods = {
      dispatchEvent
    }

    const printPageBreakPrivateMethods: PrintPageBreakPrivateMethods = {
    }

    Object.assign($xePrintPageBreak, printPageBreakMethods, printPageBreakPrivateMethods)

    if (!$xePrint) {
      $xePrintPageBreak.renderVN = () => {
        return createCommentVNode()
      }
      return $xePrintPageBreak
    }

    const renderVN = () => {
      return h('div', {
        ref: refElem
      })
    }

    onMounted(() => {
      const elem = refElem.value
      if ($xePrint && elem) {
        assemblePageBreak($xePrint, elem, pageBreakConfig)
      }
    })

    onUnmounted(() => {
      if ($xePrint) {
        destroyPageBreak($xePrint, pageBreakConfig)
      }
    })

    $xePrintPageBreak.renderVN = renderVN

    return $xePrintPageBreak
  },
  render () {
    return this.renderVN()
  }
})
