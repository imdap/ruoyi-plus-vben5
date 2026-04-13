import { ref, h, reactive, PropType } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, getIcon, createEvent, renderEmptyElement } from '../../ui'
import { getSlotVNs } from '../../ui/src/vn'

import type { VxeAlertPropTypes, AlertReactData, AlertPrivateRef, VxeAlertEmits, AlertMethods, AlertPrivateMethods, VxeAlertPrivateComputed, VxeAlertConstructor, VxeAlertPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeAlert',
  props: {
    title: {
      type: [String, Number] as PropType<VxeAlertPropTypes.Title>,
      default: () => getConfig().alert.title
    },
    content: [String, Number] as PropType<VxeAlertPropTypes.Content>,
    status: String as PropType<VxeAlertPropTypes.Status>,
    showIcon: Boolean as PropType<VxeAlertPropTypes.ShowIcon>,
    showClose: Boolean as PropType<VxeAlertPropTypes.ShowClose>,
    icon: {
      type: String as PropType<VxeAlertPropTypes.Icon>,
      default: () => getConfig().alert.icon
    }
  },
  emits: [
    'close'
  ] as VxeAlertEmits,
  setup (props, context) {
    const { emit, slots } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()

    const reactData = reactive<AlertReactData>({
    })

    const refMaps: AlertPrivateRef = {
      refElem
    }

    const computeMaps: VxeAlertPrivateComputed = {
    }

    const $xeAlert = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeAlertConstructor & VxeAlertPrivateMethods

    const alertMethods: AlertMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, createEvent(evnt, { $alert: $xeAlert }, params))
      }
    }

    const closeEvent = (evnt: MouseEvent) => {
      alertMethods.dispatchEvent('close', {}, evnt)
    }

    const alertPrivateMethods: AlertPrivateMethods = {
    }

    Object.assign($xeAlert, alertMethods, alertPrivateMethods)

    const renderVN = () => {
      const { status, content, icon, title, showIcon, showClose } = props
      const defaultSlot = slots.default
      const titleSlot = slots.title
      const iconSlot = slots.icon
      return h('div', {
        ref: refElem,
        class: ['vxe-alert', {
          [`theme--${status}`]: status
        }]
      }, [
        iconSlot || (showIcon && status) || icon
          ? h('div', {
            class: 'vxe-alert--icon'
          }, iconSlot
            ? getSlotVNs(iconSlot({}))
            : [
                h('i', {
                  class: icon || getIcon()[`ALERT_${status?.toUpperCase()}` as 'ALERT_SUCCESS']
                })
              ])
          : renderEmptyElement($xeAlert),
        h('div', {
          class: 'vxe-alert--body'
        }, [
          titleSlot || title
            ? h('div', {
              class: 'vxe-alert--title'
            }, titleSlot ? getSlotVNs(titleSlot({})) : XEUtils.toValueString(title))
            : renderEmptyElement($xeAlert),
          h('div', {
            class: 'vxe-alert--content'
          }, defaultSlot ? getSlotVNs(defaultSlot({})) : XEUtils.toValueString(content))
        ]),
        showClose
          ? h('div', {
            class: 'vxe-alert--close-btn',
            onClick: closeEvent
          }, [
            h('i', {
              class: getIcon().ALERT_CLOSE
            })
          ])
          : renderEmptyElement($xeAlert)
      ])
    }

    $xeAlert.renderVN = renderVN

    return $xeAlert
  },
  render () {
    return this.renderVN()
  }
})
