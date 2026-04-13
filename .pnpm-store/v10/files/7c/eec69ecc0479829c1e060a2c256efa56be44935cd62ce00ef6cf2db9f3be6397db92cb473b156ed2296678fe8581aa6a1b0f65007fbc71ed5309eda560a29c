import { ref, h, reactive, PropType } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, useSize, usePermission, createEvent, renderEmptyElement } from '../../ui'
import { getSlotVNs } from '../../ui/src/vn'

import type { VxeTipPropTypes, TipReactData, VxeTipEmits, TipMethods, TipPrivateMethods, TipPrivateRef, VxeTipPrivateComputed, VxeTipConstructor, VxeTipPrivateMethods, ValueOf } from '../../../types'

export default defineVxeComponent({
  name: 'VxeTip',
  props: {
    title: {
      type: [String, Number] as PropType<VxeTipPropTypes.Title>,
      default: () => getConfig().tip.title
    },
    content: [String, Number] as PropType<VxeTipPropTypes.Content>,
    status: String as PropType<VxeTipPropTypes.Status>,
    icon: {
      type: String as PropType<VxeTipPropTypes.Icon>,
      default: () => getConfig().tip.icon
    },
    /**
     * 权限码
     */
    permissionCode: [String, Number] as PropType<VxeTipPropTypes.PermissionCode>,
    size: {
      type: String as PropType<VxeTipPropTypes.Size>,
      default: () => getConfig().tip.size || getConfig().size
    }
  },
  emits: [
  ] as VxeTipEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const { computePermissionInfo } = usePermission(props)

    const refElem = ref<HTMLDivElement>()

    const reactData = reactive<TipReactData>({
    })

    const refMaps: TipPrivateRef = {
      refElem
    }

    const computeMaps: VxeTipPrivateComputed = {
    }

    const $xeTip = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeTipConstructor & VxeTipPrivateMethods

    const dispatchEvent = (type: ValueOf<VxeTipEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $tip: $xeTip }, params))
    }

    const tipMethods: TipMethods = {
      dispatchEvent
    }

    const tipPrivateMethods: TipPrivateMethods = {
    }

    Object.assign($xeTip, tipMethods, tipPrivateMethods)

    const renderVN = () => {
      const { status, content, icon, title } = props
      const defaultSlot = slots.default
      const titleSlot = slots.title
      const iconSlot = slots.icon
      const permissionInfo = computePermissionInfo.value
      const vSize = computeSize.value

      if (!permissionInfo.visible) {
        return renderEmptyElement($xeTip)
      }
      return h('div', {
        ref: refElem,
        class: ['vxe-tip', {
          [`size--${vSize}`]: vSize,
          [`theme--${status}`]: status,
          'has--title': !!(titleSlot || title)
        }]
      }, [
        iconSlot || icon
          ? h('div', {
            class: 'vxe-tip--icon'
          }, iconSlot
            ? getSlotVNs(iconSlot({}))
            : [
                h('i', {
                  class: icon
                })
              ])
          : renderEmptyElement($xeTip),
        h('div', {
          class: 'vxe-tip--body'
        }, [
          titleSlot || title
            ? h('div', {
              class: 'vxe-tip--title'
            }, titleSlot ? getSlotVNs(titleSlot({})) : XEUtils.toValueString(title))
            : renderEmptyElement($xeTip),
          h('div', {
            class: 'vxe-tip--content'
          }, defaultSlot ? getSlotVNs(defaultSlot({})) : XEUtils.toValueString(content))
        ])
      ])
    }

    $xeTip.renderVN = renderVN

    return $xeTip
  },
  render () {
    return this.renderVN()
  }
})
