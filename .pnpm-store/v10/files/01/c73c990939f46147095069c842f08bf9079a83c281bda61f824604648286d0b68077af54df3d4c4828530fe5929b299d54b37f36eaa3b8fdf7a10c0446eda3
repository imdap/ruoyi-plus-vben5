import { ref, h, reactive, provide, PropType, computed } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, createEvent, useSize } from '../../ui'
import { toCssUnit } from '../../ui/src/dom'

import type { VxeRowPropTypes, RowReactData, RowPrivateRef, VxeRowEmits, RowMethods, RowPrivateMethods, VxeRowPrivateComputed, VxeRowConstructor, VxeRowPrivateMethods, ValueOf } from '../../../types'

export default defineVxeComponent({
  name: 'VxeRow',
  props: {
    gutter: [Number, String, Array] as PropType<VxeRowPropTypes.Gutter>,
    wrap: {
      type: Boolean as PropType<VxeRowPropTypes.Wrap>,
      default: () => getConfig().row.wrap
    },
    vertical: Boolean as PropType<VxeRowPropTypes.Vertical>,
    size: {
      type: String as PropType<VxeRowPropTypes.Size>,
      default: () => getConfig().row.size || getConfig().size
    }
  },
  emits: [
    'click'
  ] as VxeRowEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    useSize(props)

    const refElem = ref<HTMLDivElement>()

    const reactData = reactive<RowReactData>({
    })

    const refMaps: RowPrivateRef = {
      refElem
    }

    const computeRowStyle = computed(() => {
      const { gutter, vertical } = props
      const style: Record<string, string | number> = {}
      if (gutter) {
        let [lrGutter, tbGutter] = XEUtils.isArray(gutter) ? gutter : [gutter]
        if (vertical) {
          tbGutter = lrGutter
          lrGutter = ''
        }
        if (lrGutter) {
          const offsetSize = XEUtils.isNumber(lrGutter) ? toCssUnit(-(lrGutter / 2)) : `calc(${toCssUnit(lrGutter)} / 2 * -1)`
          style.marginLeft = offsetSize
          style.marginRight = offsetSize
        }
        if (tbGutter) {
          const offsetSize = XEUtils.isNumber(tbGutter) ? toCssUnit(-(tbGutter / 2)) : `calc(${toCssUnit(tbGutter)} / 2 * -1)`
          style.marginTop = offsetSize
          style.marginBottom = offsetSize
        }
      }
      return style
    })

    const computeMaps: VxeRowPrivateComputed = {
    }

    const $xeRow = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeRowConstructor & VxeRowPrivateMethods

    const clickEvent = (evnt: Event) => {
      dispatchEvent('click', {}, evnt)
    }

    const dispatchEvent = (type: ValueOf<VxeRowEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $row: $xeRow }, params))
    }

    const rowMethods: RowMethods = {
      dispatchEvent
    }

    const rowPrivateMethods: RowPrivateMethods = {
    }

    Object.assign($xeRow, rowMethods, rowPrivateMethods)

    const renderVN = () => {
      const { vertical, wrap } = props
      const rowStyle = computeRowStyle.value
      const defaultSlot = slots.default
      return h('div', {
        ref: refElem,
        class: ['vxe-row', {
          'is--vertical': vertical,
          'is--wrap': wrap
        }],
        style: rowStyle,
        onClick: clickEvent
      }, defaultSlot ? defaultSlot({}) : [])
    }

    provide('$xeRow', $xeRow)

    $xeRow.renderVN = renderVN

    return $xeRow
  },
  render () {
    return this.renderVN()
  }
})
