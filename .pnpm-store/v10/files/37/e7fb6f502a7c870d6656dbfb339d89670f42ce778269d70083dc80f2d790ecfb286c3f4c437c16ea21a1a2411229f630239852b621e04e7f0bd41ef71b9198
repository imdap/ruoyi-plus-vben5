import { ref, h, reactive, PropType } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, createEvent } from '../../ui'

import type { TimelineReactData, VxeTimelinePropTypes, TimelinePrivateRef, VxeTimelineEmits, VxeTimelinePrivateComputed, TimelineMethods, TimelinePrivateMethods, VxeTimelineConstructor, VxeTimelinePrivateMethods, ValueOf } from '../../../types'

export default defineVxeComponent({
  name: 'VxeTimeline',
  props: {
    size: {
      type: String as PropType<VxeTimelinePropTypes.Size>,
      default: () => getConfig().timeline.size || getConfig().size
    }
  },
  emits: [
  ] as VxeTimelineEmits,
  setup (props, context) {
    const { emit } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()

    const reactData = reactive<TimelineReactData>({})

    const refMaps: TimelinePrivateRef = {
      refElem
    }

    const computeMaps: VxeTimelinePrivateComputed = {
    }

    const $xeTimeline = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeTimelineConstructor & VxeTimelinePrivateMethods

    const dispatchEvent = (type: ValueOf<VxeTimelineEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $timeline: $xeTimeline }, params))
    }

    const tagMethods: TimelineMethods = {
      dispatchEvent
    }

    const tagPrivateMethods: TimelinePrivateMethods = {
    }

    Object.assign($xeTimeline, tagMethods, tagPrivateMethods)

    const renderVN = () => {
      return h('div', {
        ref: refElem,
        class: 'vxe-timeline'
      })
    }

    $xeTimeline.renderVN = renderVN

    return $xeTimeline
  },
  render () {
    return this.renderVN()
  }
})
