import { h, provide, PropType, inject, computed, reactive, watch, onMounted, nextTick, onUnmounted } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, createEvent, useSize } from '../../ui'
import VxeRadioComponent from './radio'
import VxeRadioButtonComponent from './button'

import type { VxeRadioGroupPropTypes, RadioGroupInternalData, VxeRadioGroupConstructor, RadioGroupReactData, VxeRadioGroupEmits, VxeRadioGroupPrivateMethods, RadioGroupPrivateMethods, RadioGroupPrivateComputed, RadioGroupMethods, VxeFormConstructor, VxeFormPrivateMethods, VxeFormDefines, ValueOf } from '../../../types'

function createInternalData (): RadioGroupInternalData {
  return {
    // isLoaded: false
  }
}

export default defineVxeComponent({
  name: 'VxeRadioGroup',
  props: {
    modelValue: [String, Number, Boolean] as PropType<VxeRadioGroupPropTypes.ModelValue>,
    disabled: {
      type: Boolean as PropType<VxeRadioGroupPropTypes.Disabled>,
      default: null
    },
    type: String as PropType<VxeRadioGroupPropTypes.Type>,
    options: Array as PropType<VxeRadioGroupPropTypes.Options>,
    optionProps: Object as PropType<VxeRadioGroupPropTypes.OptionProps>,
    strict: {
      type: Boolean as PropType<VxeRadioGroupPropTypes.Strict>,
      default: () => getConfig().radioGroup.strict
    },
    size: {
      type: String as PropType<VxeRadioGroupPropTypes.Size>,
      default: () => getConfig().radioGroup.size || getConfig().size
    },
    defaultConfig: Object as PropType<VxeRadioGroupPropTypes.DefaultConfig>
  },
  emits: [
    'update:modelValue',
    'change',
    'default-change'
  ] as VxeRadioGroupEmits,
  setup (props, context) {
    const { slots, emit } = context

    const $xeForm = inject<VxeFormConstructor & VxeFormPrivateMethods | null>('$xeForm', null)
    const formItemInfo = inject<VxeFormDefines.ProvideItemInfo | null>('xeFormItemInfo', null)

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const reactData = reactive<RadioGroupReactData>({
    })

    const internalData = createInternalData()

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

    const computeDefaultOpts = computed(() => {
      return Object.assign({}, props.defaultConfig)
    })

    const computeMaps: RadioGroupPrivateComputed = {
      computeIsDisabled
    }

    const $xeRadioGroup = {
      xID,
      props,
      context,
      reactData,
      name: XEUtils.uniqueId('xe_group_'),

      getComputeMaps: () => computeMaps
    } as unknown as VxeRadioGroupConstructor & VxeRadioGroupPrivateMethods

    const computePropsOpts = computed(() => {
      return Object.assign({}, props.optionProps)
    })

    const computeLabelField = computed(() => {
      const propsOpts = computePropsOpts.value
      return propsOpts.label || 'label'
    })

    const computeValueField = computed(() => {
      const propsOpts = computePropsOpts.value
      return propsOpts.value || 'value'
    })

    const computeDisabledField = computed(() => {
      const propsOpts = computePropsOpts.value
      return propsOpts.disabled || 'disabled'
    })

    const emitModel = (value: any) => {
      emit('update:modelValue', value)
    }

    const emitDefaultValue = (value: any) => {
      emitModel(value)
      dispatchEvent('default-change', { value }, null)
    }

    const dispatchEvent = (type: ValueOf<VxeRadioGroupEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $radioGroup: $xeRadioGroup }, params))
    }

    const radioGroupMethods: RadioGroupMethods = {
      dispatchEvent
    }

    const radioGroupPrivateMethods: RadioGroupPrivateMethods = {
      handleChecked (params, evnt) {
        const { checkedValue, checkedLabel } = params
        const value = checkedValue
        emitModel(value)
        dispatchEvent('change', { value, label: value, checkedValue, checkedLabel }, evnt)
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value)
        }
      }
    }

    const loadData = (datas: any[]) => {
      const { isLoaded } = internalData
      const defaultOpts = computeDefaultOpts.value
      const valueField = computeValueField.value
      if (!isLoaded) {
        const { selectMode } = defaultOpts
        if (datas.length > 0 && XEUtils.eqNull(props.modelValue)) {
          if (selectMode === 'first' || selectMode === 'last') {
            const selectItem = XEUtils[selectMode](datas)
            if (selectItem) {
              nextTick(() => {
                if (XEUtils.eqNull(props.modelValue)) {
                  emitDefaultValue(selectItem[valueField])
                }
              })
            }
          }
          internalData.isLoaded = true
        }
      }
      return nextTick()
    }

    Object.assign($xeRadioGroup, radioGroupMethods, radioGroupPrivateMethods)

    const renderVN = () => {
      const { options, type } = props
      const vSize = computeSize.value
      const defaultSlot = slots.default
      const valueField = computeValueField.value as 'value'
      const labelField = computeLabelField.value as 'label'
      const disabledField = computeDisabledField.value as 'disabled'
      const btnComp = type === 'button' ? VxeRadioButtonComponent : VxeRadioComponent

      return h('div', {
        class: ['vxe-radio-group', {
          [`size--${vSize}`]: vSize
        }]
      }, defaultSlot
        ? defaultSlot({})
        : (options
            ? options.map(item => {
              return h(btnComp, {
                key: item[valueField],
                checkedValue: item[valueField],
                content: item[labelField],
                disabled: item[disabledField]
              })
            })
            : []))
    }

    watch(() => props.options, (val) => {
      loadData(val || [])
    })

    onMounted(() => {
      nextTick(() => {
        const { options } = props
        if (options) {
          loadData(options)
        }
      })
    })

    onUnmounted(() => {
      XEUtils.assign(internalData, createInternalData())
    })

    provide('$xeRadioGroup', $xeRadioGroup)

    $xeRadioGroup.renderVN = renderVN

    return $xeRadioGroup
  },
  render () {
    return this.renderVN()
  }
})
