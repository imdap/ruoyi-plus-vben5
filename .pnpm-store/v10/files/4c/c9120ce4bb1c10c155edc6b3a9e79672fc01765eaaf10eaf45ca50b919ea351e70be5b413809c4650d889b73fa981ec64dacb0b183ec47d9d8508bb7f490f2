import { reactive, h, computed, PropType, watch } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { getConfig, getIcon, getI18n, createEvent, useSize, renderEmptyElement } from '../../ui'
import { getSlotVNs } from '../../ui/src/vn'
import XEUtils from 'xe-utils'

import type { VxeLoadingPropTypes, LoadingReactData, VxeLoadingPrivateComputed, LoadingMethods, LoadingPrivateMethods, VxeLoadingEmits, VxeLoadingConstructor, VxeLoadingPrivateMethods, ValueOf } from '../../../types'

export default defineVxeComponent({
  name: 'VxeLoading',
  props: {
    modelValue: Boolean as PropType<VxeLoadingPropTypes.ModelValue>,
    icon: {
      type: String as PropType<VxeLoadingPropTypes.Icon>,
      default: () => getConfig().loading.icon
    },
    showIcon: {
      type: Boolean as PropType<VxeLoadingPropTypes.ShowIcon>,
      default: () => getConfig().loading.showIcon
    },
    text: {
      type: String as PropType<VxeLoadingPropTypes.Text>,
      default: () => getConfig().loading.text
    },
    showText: {
      type: Boolean as PropType<VxeLoadingPropTypes.ShowText>,
      default: () => getConfig().loading.showText
    },
    status: String as PropType<VxeLoadingPropTypes.Status>,
    size: {
      type: String as PropType<VxeLoadingPropTypes.Size>,
      default: () => getConfig().loading.size || getConfig().size
    }
  },
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const reactData = reactive<LoadingReactData>({
      initialized: false
    })

    const computeMaps: VxeLoadingPrivateComputed = {
      computeSize
    }

    const $xeLoading = {
      xID,
      props,
      context,
      reactData,

      getComputeMaps: () => computeMaps
    } as unknown as VxeLoadingConstructor & VxeLoadingPrivateMethods

    const computeLoadingIcon = computed(() => {
      return props.icon || getIcon().LOADING
    })

    const computeLoadingText = computed(() => {
      const { text } = props
      return XEUtils.isString(text) ? text : getI18n('vxe.loading.text')
    })

    const handleInit = () => {
      if (!reactData.initialized) {
        reactData.initialized = !!reactData.initialized
      }
    }

    const dispatchEvent = (type: ValueOf<VxeLoadingEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $loading: $xeLoading }, params))
    }

    const loadingMethods: LoadingMethods = {
      dispatchEvent
    }

    const loadingPrivateMethods: LoadingPrivateMethods = {
    }

    Object.assign($xeLoading, loadingMethods, loadingPrivateMethods)

    const renderVN = () => {
      const { modelValue, showIcon, status } = props
      const { initialized } = reactData
      const vSize = computeSize.value
      const defaultSlot = slots.default
      const textSlot = slots.text
      const iconSlot = slots.icon
      const loadingIcon = computeLoadingIcon.value
      const loadingText = computeLoadingText.value

      if (!initialized && !modelValue) {
        return renderEmptyElement($xeLoading)
      }

      return h('div', {
        class: ['vxe-loading', {
          [`size--${vSize}`]: vSize,
          [`theme--${status}`]: status,
          'is--visible': modelValue
        }]
      }, defaultSlot
        ? [
            h('div', {
              class: 'vxe-loading--wrapper'
            }, getSlotVNs(defaultSlot({})))
          ]
        : [
            h('div', {
              class: 'vxe-loading--chunk'
            }, [
              showIcon && (iconSlot || loadingIcon)
                ? h('div', {
                  class: 'vxe-loading--icon'
                }, iconSlot
                  ? getSlotVNs(iconSlot({}))
                  : [
                      h('i', {
                        class: loadingIcon
                      })
                    ])
                : h('div', {
                  class: 'vxe-loading--spinner'
                }),
              textSlot || loadingText
                ? h('div', {
                  class: 'vxe-loading--text'
                }, textSlot ? getSlotVNs(textSlot({})) : `${loadingText}`)
                : null
            ])
          ])
    }

    watch(() => props.modelValue, () => {
      handleInit()
    })

    handleInit()

    $xeLoading.renderVN = renderVN

    return $xeLoading
  },
  render () {
    return this.renderVN()
  }
})
