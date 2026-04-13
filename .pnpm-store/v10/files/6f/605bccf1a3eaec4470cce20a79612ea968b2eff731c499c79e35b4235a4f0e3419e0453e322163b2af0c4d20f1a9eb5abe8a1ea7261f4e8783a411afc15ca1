import { ref, h, PropType, inject, reactive, computed } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, getIcon, createEvent, useSize } from '../../ui'

import type { RateReactData, VxeRateEmits, RateMethods, VxeRatePropTypes, RatePrivateMethods, VxeFormDefines, ValueOf, VxeFormConstructor, VxeFormPrivateMethods, RatePrivateRef, VxeRatePrivateComputed, VxeRateConstructor, VxeRatePrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeRate',
  props: {
    modelValue: [Number, String] as PropType<VxeRatePropTypes.ModelValue>,
    disabled: {
      type: Boolean as PropType<VxeRatePropTypes.Disabled>,
      default: null
    },
    readonly: {
      type: Boolean as PropType<VxeRatePropTypes.Readonly>,
      default: null
    },
    size: {
      type: String as PropType<VxeRatePropTypes.Size>,
      default: () => getConfig().rate.size || getConfig().size
    },
    status: String as PropType<VxeRatePropTypes.Status>
  },
  emits: [
    'update:modelValue',
    'change'
  ] as VxeRateEmits,
  setup (props, context) {
    const { emit } = context

    const $xeForm = inject<VxeFormConstructor & VxeFormPrivateMethods | null>('$xeForm', null)
    const formItemInfo = inject<VxeFormDefines.ProvideItemInfo | null>('xeFormItemInfo', null)

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const refElem = ref<HTMLDivElement>()

    const reactData = reactive<RateReactData>({
      activeValue: null
    })

    const refMaps: RatePrivateRef = {
      refElem
    }

    const computeIsDisabled = computed(() => {
      const { disabled } = props
      if (disabled === null) {
        if ($xeForm) {
          return $xeForm.props.readonly || $xeForm.props.disabled
        }
        return false
      }
      return disabled
    })

    const computeIsReadonly = computed(() => {
      const { readonly } = props
      if (readonly === null) {
        if ($xeForm) {
          return $xeForm.props.readonly || $xeForm.props.disabled
        }
        return false
      }
      return readonly
    })

    const computeNumVal = computed(() => {
      const { modelValue } = props
      const { activeValue } = reactData
      return XEUtils.toNumber(activeValue === null ? modelValue : activeValue)
    })

    const computeItemList = computed(() => {
      return [1, 2, 3, 4, 5].map(num => {
        return {
          value: num,
          label: num
        }
      })
    })

    const computeMaps: VxeRatePrivateComputed = {
    }

    const $xeRate = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeRateConstructor & VxeRatePrivateMethods

    const dispatchEvent = (type: ValueOf<VxeRateEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $rate: $xeRate }, params))
    }

    const collapsePaneMethods: RateMethods = {
      dispatchEvent
    }

    const collapsePanePrivateMethods: RatePrivateMethods = {
    }

    const emitModel = (value: any) => {
      emit('update:modelValue', value)
    }

    const mouseenterEvent = (evnt: MouseEvent, item: any) => {
      const isDisabled = computeIsDisabled.value
      const isReadonly = computeIsReadonly.value
      if (!(isDisabled || isReadonly)) {
        const value = item.value
        reactData.activeValue = value
      }
    }

    const mouseleaveEvent = () => {
      reactData.activeValue = null
    }

    const clickEvent = (evnt: MouseEvent, item: any) => {
      const isDisabled = computeIsDisabled.value
      const isReadonly = computeIsReadonly.value
      if (!(isDisabled || isReadonly)) {
        const value = item.value
        emitModel(value)
        dispatchEvent('change', { value }, evnt)
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value)
        }
      }
    }

    Object.assign($xeRate, collapsePaneMethods, collapsePanePrivateMethods)

    const renderVN = () => {
      const { status } = props
      const isDisabled = computeIsDisabled.value
      const isReadonly = computeIsReadonly.value
      const itemList = computeItemList.value
      const vSize = computeSize.value
      const numVal = computeNumVal.value

      return h('div', {
        ref: refElem,
        class: ['vxe-rate', {
          [`size--${vSize}`]: vSize,
          [`theme--${status}`]: status,
          'is--disabled': isDisabled,
          'is--readonly': isReadonly
        }]
      }, itemList.map(item => {
        const isChecked = numVal >= item.value
        return h('div', {
          class: ['vxe-rte--item', {
            'is--checked': isChecked
          }],
          onMouseenter (evnt) {
            if (!(isDisabled || isReadonly)) {
              mouseenterEvent(evnt, item)
            }
          },
          onMouseleave: mouseleaveEvent,
          onClick (evnt) {
            if (!(isDisabled || isReadonly)) {
              clickEvent(evnt, item)
            }
          }
        }, [
          h('i', {
            class: isChecked ? getIcon().RATE_CHECKED : getIcon().RATE_UNCHECKED
          })
        ])
      }))
    }

    $xeRate.renderVN = renderVN

    return $xeRate
  },
  render () {
    return this.renderVN()
  }
})
