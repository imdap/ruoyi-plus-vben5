import { ref, h, reactive, computed, provide, PropType } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { toCssUnit } from '../../ui/src/dom'
import { getConfig, useSize, createEvent } from '../../ui'
import VxeLoadingComponent from '../../loading/src/loading'
import XEUtils from 'xe-utils'

import type { VxeLayoutAsidePropTypes, LayoutAsideReactData, VxeLayoutAsideEmits, LayoutAsidePrivateRef, LayoutAsideMethods, LayoutAsidePrivateMethods, VxeLayoutAsidePrivateComputed, VxeLayoutAsideConstructor, VxeLayoutAsidePrivateMethods, ValueOf } from '../../../types'

export default defineVxeComponent({
  name: 'VxeLayoutAside',
  props: {
    width: [String, Number] as PropType<VxeLayoutAsidePropTypes.Width>,
    collapsed: Boolean as PropType<VxeLayoutAsidePropTypes.Collapsed>,
    collapseWidth: [String, Number] as PropType<VxeLayoutAsidePropTypes.CollapseWidth>,
    loading: Boolean as PropType<VxeLayoutAsidePropTypes.Loading>,
    padding: Boolean as PropType<VxeLayoutAsidePropTypes.Padding>,
    size: {
      type: String as PropType<VxeLayoutAsidePropTypes.Size>,
      default: () => getConfig().layoutAside.size || getConfig().size
    }
  },
  emits: [] as VxeLayoutAsideEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()

    const { computeSize } = useSize(props)

    const reactData = reactive<LayoutAsideReactData>({})

    const refMaps: LayoutAsidePrivateRef = {
      refElem
    }

    const computeWrapperWidth = computed(() => {
      const { width, collapsed, collapseWidth } = props
      if (collapsed) {
        if (collapseWidth) {
          return toCssUnit(collapseWidth)
        }
      } else {
        if (width) {
          return toCssUnit(width)
        }
      }
      return ''
    })

    const computeMaps: VxeLayoutAsidePrivateComputed = {
      computeSize
    }

    const $xeLayoutAside = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeLayoutAsideConstructor & VxeLayoutAsidePrivateMethods

    const dispatchEvent = (type: ValueOf<VxeLayoutAsideEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $layoutAside: $xeLayoutAside }, params))
    }

    const layoutAsideMethods: LayoutAsideMethods = {
      dispatchEvent
    }

    const layoutAsidePrivateMethods: LayoutAsidePrivateMethods = {
    }

    Object.assign($xeLayoutAside, layoutAsideMethods, layoutAsidePrivateMethods)

    const renderVN = () => {
      const { width, collapsed, loading, padding } = props
      const wrapperWidth = computeWrapperWidth.value
      const vSize = computeSize.value
      const defaultSlot = slots.default

      return h('aside', {
        ref: refElem,
        class: ['vxe-layout-aside', {
          [`size--${vSize}`]: vSize,
          'is--padding': padding,
          'is--default-width': !width,
          'is--collapse': collapsed,
          'is--loading': loading
        }],
        style: wrapperWidth
          ? {
              width: wrapperWidth
            }
          : null
      }, [
        h('div', {
          class: 'vxe-layout-aside--inner'
        }, defaultSlot ? defaultSlot({}) : []),
        /**
         * 加载中
         */
        h(VxeLoadingComponent, {
          class: 'vxe-list-view--loading',
          modelValue: loading
        })
      ])
    }

    provide('$xeLayoutAside', $xeLayoutAside)

    $xeLayoutAside.renderVN = renderVN

    return $xeLayoutAside
  },
  render () {
    return this.renderVN()
  }
})
