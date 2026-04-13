import { ref, h, reactive } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { createEvent } from '../../ui'

import type { TimelineItemReactData, TimelineItemPrivateRef, VxeTimelineItemEmits, VxeTimelineItemPrivateComputed, TimelineItemMethods, TimelineItemPrivateMethods, VxeTimelineItemConstructor, VxeTimelineItemPrivateMethods, ValueOf } from '../../../types'

export default defineVxeComponent({
  name: 'VxeTimelineItem',
  props: {
  },
  emits: [
  ] as VxeTimelineItemEmits,
  setup (props, context) {
    const { emit } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()

    const reactData = reactive<TimelineItemReactData>({})

    const refMaps: TimelineItemPrivateRef = {
      refElem
    }

    const computeMaps: VxeTimelineItemPrivateComputed = {
    }

    const $xeTimelineItem = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeTimelineItemConstructor & VxeTimelineItemPrivateMethods

    const dispatchEvent = (type: ValueOf<VxeTimelineItemEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $timelineItem: $xeTimelineItem }, params))
    }

    const tagMethods: TimelineItemMethods = {
      dispatchEvent
    }

    const tagPrivateMethods: TimelineItemPrivateMethods = {
    }

    Object.assign($xeTimelineItem, tagMethods, tagPrivateMethods)

    const renderVN = () => {
      return h('div', {
        ref: refElem,
        class: 'vxe-timeline-item'
      })
    }

    $xeTimelineItem.renderVN = renderVN

    return $xeTimelineItem
  },
  render () {
    return this.renderVN()
  }
})
