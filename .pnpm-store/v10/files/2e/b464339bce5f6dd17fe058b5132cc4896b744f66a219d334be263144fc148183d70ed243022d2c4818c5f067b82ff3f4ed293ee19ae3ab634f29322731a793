import { ref, h, reactive, PropType } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, createEvent } from '../../ui'

import type { MentionReactData, VxeMentionPropTypes, MentionPrivateRef, VxeMentionEmits, VxeMentionPrivateComputed, MentionMethods, MentionPrivateMethods, VxeMentionConstructor, VxeMentionPrivateMethods, ValueOf } from '../../../types'

export default defineVxeComponent({
  name: 'VxeMention',
  props: {
    size: {
      type: String as PropType<VxeMentionPropTypes.Size>,
      default: () => getConfig().mention.size || getConfig().size
    }
  },
  emits: [
  ] as VxeMentionEmits,
  setup (props, context) {
    const { emit } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()

    const reactData = reactive<MentionReactData>({})

    const refMaps: MentionPrivateRef = {
      refElem
    }

    const computeMaps: VxeMentionPrivateComputed = {
    }

    const $xeMention = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeMentionConstructor & VxeMentionPrivateMethods

    const dispatchEvent = (type: ValueOf<VxeMentionEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $mention: $xeMention }, params))
    }

    const tagMethods: MentionMethods = {
      dispatchEvent
    }

    const tagPrivateMethods: MentionPrivateMethods = {
    }

    Object.assign($xeMention, tagMethods, tagPrivateMethods)

    const renderVN = () => {
      return h('div', {
        ref: refElem,
        class: 'vxe-mention'
      })
    }

    $xeMention.renderVN = renderVN

    return $xeMention
  },
  render () {
    return this.renderVN()
  }
})
