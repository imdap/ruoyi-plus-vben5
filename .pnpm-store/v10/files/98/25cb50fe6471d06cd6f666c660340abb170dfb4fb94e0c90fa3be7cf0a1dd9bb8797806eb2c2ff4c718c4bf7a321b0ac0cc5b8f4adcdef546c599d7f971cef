import { ref, h, computed, reactive, PropType } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, createEvent, useSize, renderEmptyElement } from '../../ui'

import type { BadgeReactData, VxeBadgeEmits, VxeBadgePropTypes, BadgeMethods, BadgePrivateMethods, ValueOf, BadgePrivateRef, VxeBadgePrivateComputed, VxeBadgeConstructor, VxeBadgePrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeBadge',
  props: {
    count: [String, Number] as PropType<VxeBadgePropTypes.Count>,
    dot: Boolean as PropType<VxeBadgePropTypes.Dot>,
    content: [String, Number] as PropType<VxeBadgePropTypes.Content>,
    size: {
      type: String as PropType<VxeBadgePropTypes.Size>,
      default: () => getConfig().badge.size || getConfig().size
    }
  },
  emits: [
  ] as VxeBadgeEmits,
  setup (props, context) {
    const { emit, slots } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()

    const { computeSize } = useSize(props)

    const reactData = reactive<BadgeReactData>({
    })

    const refMaps: BadgePrivateRef = {
      refElem
    }

    const computeCountNum = computed(() => {
      const { count } = props
      return count ? XEUtils.toNumber(count) : 0
    })

    const computeMaps: VxeBadgePrivateComputed = {
    }

    const $xeBadge = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeBadgeConstructor & VxeBadgePrivateMethods

    const dispatchEvent = (type: ValueOf<VxeBadgeEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $badge: $xeBadge }, params))
    }

    const collapsePaneMethods: BadgeMethods = {
      dispatchEvent
    }

    const collapsePanePrivateMethods: BadgePrivateMethods = {
    }

    Object.assign($xeBadge, collapsePaneMethods, collapsePanePrivateMethods)

    const renderVN = () => {
      const { dot, content } = props
      const vSize = computeSize.value
      const countNum = computeCountNum.value
      const defaultSlot = slots.default
      return h('div', {
        ref: refElem,
        class: ['vxe-badge', {
          [`size--${vSize}`]: vSize,
          'is--dot': dot
        }]
      }, [
        defaultSlot || content
          ? h('div', {
            class: 'vxe-badge--content'
          }, defaultSlot ? defaultSlot({}) : `${content || ''}`)
          : [],
        countNum
          ? h('span', {
            class: 'vxe-badge--count'
          }, countNum > 99 ? '99+' : `${countNum}`)
          : renderEmptyElement($xeBadge)
      ])
    }

    $xeBadge.renderVN = renderVN

    return $xeBadge
  },
  render () {
    return this.renderVN()
  }
})
