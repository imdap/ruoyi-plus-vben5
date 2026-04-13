import { h, onUnmounted, inject, ref, Ref, onMounted, PropType } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { XEOptionProvide, createOption, watchOption, destroyOption, assembleOption } from './util'

import type { VxeSelectConstructor, VxeOptionEmits, VxeOptionPropTypes } from '../../../types'

export default defineVxeComponent({
  name: 'VxeOption',
  props: {
    value: [String, Number, Boolean] as PropType<VxeOptionPropTypes.Value>,
    label: {
      type: [String, Number, Boolean] as PropType<VxeOptionPropTypes.Label>,
      default: ''
    },
    visible: {
      type: Boolean as PropType<VxeOptionPropTypes.Visible>,
      default: null
    },
    className: [String, Function] as PropType<VxeOptionPropTypes.ClassName>,
    disabled: Boolean as PropType<VxeOptionPropTypes.Disabled>
  },
  emits: [] as VxeOptionEmits,
  setup (props, { slots }) {
    const elem = ref() as Ref<HTMLDivElement>
    const $xeSelect = inject('$xeSelect', {} as VxeSelectConstructor)
    const $xeOptgroup = inject<XEOptionProvide | null>('$xeOptgroup', null)
    const optionConfig = createOption($xeSelect, props)
    optionConfig.slots = slots

    watchOption(props, optionConfig)

    onMounted(() => {
      const el = elem.value
      assembleOption($xeSelect, el, optionConfig, $xeOptgroup)
    })

    onUnmounted(() => {
      destroyOption($xeSelect, optionConfig)
    })

    return () => {
      return h('div', {
        ref: elem
      })
    }
  }
})
