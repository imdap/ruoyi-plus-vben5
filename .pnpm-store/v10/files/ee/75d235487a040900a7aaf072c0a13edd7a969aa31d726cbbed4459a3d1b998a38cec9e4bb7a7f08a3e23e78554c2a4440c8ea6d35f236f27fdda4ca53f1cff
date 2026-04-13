import { h, PropType } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { getConfig, createEvent, useSize } from '../../ui'
import XEUtils from 'xe-utils'

import type { VxeIconPropTypes, VxeIconEmits, IconMethods, IconPrivateMethods, VxeIconConstructor, VxeIconPrivateMethods, ValueOf } from '../../../types'

export default defineVxeComponent({
  name: 'VxeIcon',
  props: {
    name: String as PropType<VxeIconPropTypes.Name>,
    className: String as PropType<VxeIconPropTypes.ClassName>,
    roll: Boolean as PropType<VxeIconPropTypes.Roll>,
    status: String as PropType<VxeIconPropTypes.Status>,
    size: {
      type: String as PropType<VxeIconPropTypes.Size>,
      default: () => getConfig().icon.size || getConfig().size
    }
  },
  emits: [
    'click'
  ] as VxeIconEmits,
  setup (props, context) {
    const { emit } = context

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const $xeIcon = {
      xID,
      props,
      context

    } as unknown as VxeIconConstructor & VxeIconPrivateMethods

    const clickEvent = (evnt: KeyboardEvent) => {
      emit('click', createEvent(evnt, { }))
    }

    const dispatchEvent = (type: ValueOf<VxeIconEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $icon: $xeIcon }, params))
    }

    const iconMethods: IconMethods = {
      dispatchEvent
    }

    const iconPrivateMethods: IconPrivateMethods = {
    }

    Object.assign($xeIcon, iconMethods, iconPrivateMethods)

    const renderVN = () => {
      const { name, roll, status, className } = props
      const vSize = computeSize.value

      return h('i', {
        class: ['vxe-icon', `vxe-icon-${name}`, `${className || ''}`, {
          [`size--${vSize}`]: vSize,
          [`theme--${status}`]: status,
          roll: roll
        }],
        onClick: clickEvent
      })
    }

    $xeIcon.renderVN = renderVN

    return $xeIcon
  },
  render () {
    return this.renderVN()
  }
})
