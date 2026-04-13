import { ref, h, reactive, computed, PropType, inject } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, createEvent, useSize } from '../../ui'
import { toCssUnit } from '../../ui/src/dom'

import type { ColReactData, VxeColPropTypes, ColPrivateRef, VxeColEmits, ColMethods, ColPrivateMethods, VxeColPrivateComputed, VxeColConstructor, VxeColPrivateMethods, ValueOf, VxeRowConstructor, VxeRowPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeCol',
  props: {
    span: [Number, String] as PropType<VxeColPropTypes.Span>,
    align: String as PropType<VxeColPropTypes.Align>,
    width: [Number, String] as PropType<VxeColPropTypes.Width>,
    fill: Boolean as PropType<VxeColPropTypes.Fill>,
    ellipsis: Boolean as PropType<VxeColPropTypes.Ellipsis>,
    size: {
      type: String as PropType<VxeColPropTypes.Size>,
      default: () => getConfig().col.size || getConfig().size
    }
  },
  emits: [],
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    useSize(props)

    const refElem = ref<HTMLDivElement>()

    const reactData = reactive<ColReactData>({
    })

    const refMaps: ColPrivateRef = {
      refElem
    }

    const $xeRow = inject<(VxeRowConstructor & VxeRowPrivateMethods) | null>('$xeRow', null)

    const computeRowGutter = computed(() => {
      if ($xeRow) {
        return $xeRow.props.gutter
      }
      return null
    })

    const computeRowVertical = computed(() => {
      if ($xeRow) {
        return $xeRow.props.vertical
      }
      return null
    })

    const computeColStyle = computed(() => {
      const { width } = props
      const rowGutter = computeRowGutter.value
      const rowVertical = computeRowVertical.value
      const style: Record<string, string | number> = {}
      if (rowGutter) {
        let [lrGutter, tbGutter] = XEUtils.isArray(rowGutter) ? rowGutter : [rowGutter]
        if (rowVertical) {
          tbGutter = lrGutter
          lrGutter = ''
        }
        if (lrGutter) {
          const padding = XEUtils.isNumber(lrGutter) ? toCssUnit(lrGutter / 2) : `calc(${toCssUnit(lrGutter)} / 2)`
          style.paddingLeft = padding
          style.paddingRight = padding
        }
        if (tbGutter) {
          const padding = XEUtils.isNumber(tbGutter) ? toCssUnit(tbGutter / 2) : `calc(${toCssUnit(tbGutter)} / 2)`
          style.paddingTop = padding
          style.paddingBottom = padding
        }
      }
      if (width) {
        style.width = toCssUnit(width)
      }
      return style
    })

    const computeMaps: VxeColPrivateComputed = {
    }

    const $xeCol = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeColConstructor & VxeColPrivateMethods

    const dispatchEvent = (type: ValueOf<VxeColEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $col: $xeCol }, params))
    }

    const colMethods: ColMethods = {
      dispatchEvent
    }

    const colPrivateMethods: ColPrivateMethods = {
    }

    Object.assign($xeCol, colMethods, colPrivateMethods)

    const renderVN = () => {
      const { span, fill, align, width, ellipsis } = props
      const colStyle = computeColStyle.value
      const defaultSlot = slots.default
      return h('div', {
        ref: refElem,
        class: ['vxe-col', span ? `span${span}` : '', align ? `align--${align}` : '', {
          'is--span': !!span,
          'is--width': !!width,
          'is--fill': fill,
          'is--ellipsis': ellipsis
        }],
        style: colStyle
      }, [
        h('div', {
          class: 'vxe-col--inner'
        }, defaultSlot ? defaultSlot({}) : [])
      ])
    }

    $xeCol.renderVN = renderVN

    return $xeCol
  },
  render () {
    return this.renderVN()
  }
})
