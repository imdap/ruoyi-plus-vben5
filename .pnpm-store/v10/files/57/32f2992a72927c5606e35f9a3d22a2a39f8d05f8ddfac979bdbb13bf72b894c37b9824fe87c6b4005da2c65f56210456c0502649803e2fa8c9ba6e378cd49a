import { h, provide, PropType, computed, inject, reactive, onUnmounted, watch, onMounted, nextTick } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { getConfig, createEvent, useSize } from '../../ui'
import XEUtils from 'xe-utils'
import VxeCheckboxComponent from './checkbox'

import type { VxeCheckboxGroupConstructor, CheckboxGroupInternalData, VxeCheckboxGroupEmits, ValueOf, CheckboxGroupReactData, VxeCheckboxGroupPrivateMethods, CheckboxGroupPrivateMethods, CheckboxGroupPrivateComputed, CheckboxGroupMethods, VxeCheckboxGroupPropTypes, VxeFormConstructor, VxeFormPrivateMethods, VxeFormDefines } from '../../../types'

function createInternalData (): CheckboxGroupInternalData {
  return {
    // isLoaded: false
  }
}

export default defineVxeComponent({
  name: 'VxeCheckboxGroup',
  props: {
    modelValue: Array as PropType<VxeCheckboxGroupPropTypes.ModelValue>,
    options: Array as PropType<VxeCheckboxGroupPropTypes.Options>,
    optionProps: Object as PropType<VxeCheckboxGroupPropTypes.OptionProps>,
    disabled: {
      type: Boolean as PropType<VxeCheckboxGroupPropTypes.Disabled>,
      default: null
    },
    max: {
      type: [String, Number] as PropType<VxeCheckboxGroupPropTypes.Max>,
      default: null
    },
    size: {
      type: String as PropType<VxeCheckboxGroupPropTypes.Size>,
      default: () => getConfig().checkboxGroup.size || getConfig().size
    },
    defaultConfig: Object as PropType<VxeCheckboxGroupPropTypes.DefaultConfig>
  },
  emits: [
    'update:modelValue',
    'change',
    'default-change'
  ] as VxeCheckboxGroupEmits,
  setup (props, context) {
    const { slots, emit } = context
    const $xeForm = inject<VxeFormConstructor & VxeFormPrivateMethods | null>('$xeForm', null)
    const formItemInfo = inject<VxeFormDefines.ProvideItemInfo | null>('xeFormItemInfo', null)

    const xID = XEUtils.uniqueId()

    const reactData: CheckboxGroupReactData = reactive({
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

    const computeIsMaximize = computed(() => {
      const { modelValue, max } = props
      if (max) {
        return (modelValue ? modelValue.length : 0) >= XEUtils.toNumber(max)
      }
      return false
    })

    const computeDefaultOpts = computed(() => {
      return Object.assign({}, props.defaultConfig)
    })

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

    const computeMaps: CheckboxGroupPrivateComputed = {
      computeIsMaximize,
      computeIsDisabled
    }

    const $xeCheckboxGroup = {
      xID,
      props,
      context,
      reactData,

      getComputeMaps: () => computeMaps
    } as unknown as VxeCheckboxGroupConstructor & VxeCheckboxGroupPrivateMethods

    useSize(props)

    const dispatchEvent = (type: ValueOf<VxeCheckboxGroupEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $checkboxGroup: $xeCheckboxGroup }, params))
    }

    const emitModel = (value: any) => {
      emit('update:modelValue', value)
    }

    const emitDefaultValue = (value: any) => {
      emitModel(value)
      dispatchEvent('default-change', { value }, null)
    }

    const checkboxGroupMethods: CheckboxGroupMethods = {
      dispatchEvent
    }

    const checkboxGroupPrivateMethods: CheckboxGroupPrivateMethods = {
      handleChecked (params, evnt) {
        const { checked, label } = params
        const checklist = props.modelValue || []
        const checkIndex = checklist.indexOf(label)
        if (checked) {
          if (checkIndex === -1) {
            checklist.push(label)
          }
        } else {
          checklist.splice(checkIndex, 1)
        }
        emitModel(checklist)
        $xeCheckboxGroup.dispatchEvent('change', Object.assign({ }, params, { checklist, value: checklist }), evnt)
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, checklist)
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
          if (selectMode === 'all') {
            nextTick(() => {
              emitDefaultValue(datas.map(item => item[valueField]))
            })
          } else if (selectMode === 'first' || selectMode === 'last') {
            const selectItem = XEUtils[selectMode](datas)
            if (selectItem) {
              nextTick(() => {
                if (XEUtils.eqNull(props.modelValue)) {
                  emitDefaultValue([selectItem[valueField]])
                }
              })
            }
          }
          internalData.isLoaded = true
        }
      }
      return nextTick()
    }

    Object.assign($xeCheckboxGroup, checkboxGroupMethods, checkboxGroupPrivateMethods)

    const renderVN = () => {
      const { options } = props
      const defaultSlot = slots.default
      const valueField = computeValueField.value as 'value'
      const labelField = computeLabelField.value as 'label'
      const disabledField = computeDisabledField.value as 'disabled'
      return h('div', {
        class: 'vxe-checkbox-group'
      }, defaultSlot
        ? defaultSlot({})
        : (options
            ? options.map(item => {
              return h(VxeCheckboxComponent, {
                key: item[valueField],
                label: item[valueField],
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

    provide('$xeCheckboxGroup', $xeCheckboxGroup)

    $xeCheckboxGroup.renderVN = renderVN

    return renderVN
  }
})
