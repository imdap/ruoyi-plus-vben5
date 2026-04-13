import { h, reactive, provide, PropType } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { getConfig, createEvent, useSize, usePermission, renderEmptyElement } from '../../ui'
import XEUtils from 'xe-utils'
import VxeButtonComponent from './button'

import type { VxeButtonGroupPropTypes, VxeButtonGroupEmits, ButtonGroupReactData, VxeButtonGroupConstructor, VxeButtonGroupPrivateMethods, ButtonGroupMethods, ButtonPrivateComputed, ValueOf, ButtonGroupPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeButtonGroup',
  props: {
    options: Array as PropType<VxeButtonGroupPropTypes.Options>,
    mode: String as PropType<VxeButtonGroupPropTypes.Mode>,
    status: String as PropType<VxeButtonGroupPropTypes.Status>,
    round: Boolean as PropType<VxeButtonGroupPropTypes.Round>,
    vertical: Boolean as PropType<VxeButtonGroupPropTypes.Vertical>,
    circle: Boolean as PropType<VxeButtonGroupPropTypes.Circle>,
    align: String as PropType<VxeButtonGroupPropTypes.Align>,
    className: [String, Function] as PropType<VxeButtonGroupPropTypes.ClassName>,
    disabled: Boolean as PropType<VxeButtonGroupPropTypes.Disabled>,
    permissionCode: [String, Number] as PropType<VxeButtonGroupPropTypes.PermissionCode>,
    size: {
      type: String as PropType<VxeButtonGroupPropTypes.Size>,
      default: () => getConfig().buttonGroup.size || getConfig().size
    }
  },
  emits: [
    'click',
    'contextmenu'
  ] as VxeButtonGroupEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const reactData = reactive<ButtonGroupReactData>({
    })

    const computeMaps: ButtonPrivateComputed = {}

    const $xeButtonGroup = {
      xID,
      props,
      context,
      reactData,

      getComputeMaps: () => computeMaps
    } as unknown as VxeButtonGroupConstructor & VxeButtonGroupPrivateMethods

    useSize(props)

    const { computePermissionInfo } = usePermission(props)

    const dispatchEvent = (type: ValueOf<VxeButtonGroupEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $buttonGroup: $xeButtonGroup }, params))
    }

    const buttonGroupMethods: ButtonGroupMethods = {
      dispatchEvent
    }

    const buttonGroupPrivateMethods: ButtonGroupPrivateMethods = {
      handleClick (params, evnt) {
        const { options } = props
        const { name } = params
        const option = options ? options.find(item => item.name === name) : null
        buttonGroupMethods.dispatchEvent('click', { ...params, option }, evnt)
      }
    }

    const contextmenuEvent = (evnt: MouseEvent) => {
      dispatchEvent('contextmenu', {}, evnt)
    }

    Object.assign($xeButtonGroup, buttonGroupMethods, buttonGroupPrivateMethods)

    const renderVN = () => {
      const { className, options, vertical } = props
      const permissionInfo = computePermissionInfo.value
      const defaultSlot = slots.default
      if (!permissionInfo.visible) {
        return renderEmptyElement($xeButtonGroup)
      }
      return h('div', {
        class: ['vxe-button-group', className ? (XEUtils.isFunction(className) ? className({ $buttonGroup: $xeButtonGroup }) : className) : '', {
          'is--vertical': vertical
        }],
        onContextmenu: contextmenuEvent
      }, defaultSlot
        ? defaultSlot({})
        : (options
            ? options.map((item, index) => {
              return h(VxeButtonComponent, {
                key: index,
                ...item
              })
            })
            : []))
    }

    $xeButtonGroup.renderVN = renderVN

    provide('$xeButtonGroup', $xeButtonGroup)

    return $xeButtonGroup
  },
  render () {
    return this.renderVN()
  }
})
