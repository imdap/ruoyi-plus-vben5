import { h, onUnmounted, provide, inject, ref, Ref, onMounted, PropType } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { XEOptionProvide, createOption, watchOption, destroyOption, assembleOption } from './util'

import type { VxeSelectConstructor, VxeOptgroupEmits, VxeOptgroupPropTypes } from '../../../types'

export default defineVxeComponent({
  name: 'VxeOptgroup',
  props: {
    label: {
      type: [String, Number, Boolean] as PropType<VxeOptgroupPropTypes.Label>,
      default: ''
    },
    visible: {
      type: Boolean as PropType<VxeOptgroupPropTypes.Visible>,
      default: null
    },
    className: [String, Function] as PropType<VxeOptgroupPropTypes.ClassName>,
    disabled: Boolean as PropType<VxeOptgroupPropTypes.Disabled>
  },
  emits: [] as VxeOptgroupEmits,
  setup (props, { slots }) {
    const elem = ref() as Ref<HTMLDivElement>
    const $xeSelect = inject('$xeSelect', {} as VxeSelectConstructor)
    const optionConfig = createOption($xeSelect, props)
    const $xeOptgroup: XEOptionProvide = { optionConfig }
    optionConfig.options = []

    provide('$xeOptgroup', $xeOptgroup)

    watchOption(props, optionConfig)

    onMounted(() => {
      const el = elem.value
      assembleOption($xeSelect, el, optionConfig)
    })

    onUnmounted(() => {
      destroyOption($xeSelect, optionConfig)
    })

    return () => {
      const defaultSlot = slots.default
      return h('div', {
        ref: elem
      }, defaultSlot ? defaultSlot({}) : [])
    }
  }
})
